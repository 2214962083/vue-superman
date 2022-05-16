//  copy from https://github.com/PavelDymkov/babel-plugin-auto-import/blob/master/src/index.js

const ImportType = {
  DEFAULT: 1,
  MEMBER: 2,
  ANONYMOUS: 3
}

const not = cond => !cond
const basename = _path => _path.split('/').pop()

export default function ({types: t}) {
  return {
    visitor: {
      Identifier(path, {opts: options, file}) {
        if (not(path.isReferencedIdentifier())) return

        const {node: identifier, scope} = path

        if (isDefined(identifier, scope)) return

        const {declarations} = options

        if (not(Array.isArray(declarations))) return

        const filename = file.opts.filename ? basename(file.opts.filename) : ''

        declarations.some(handleDeclaration, {
          path,
          identifier,
          filename
        })
      }
    }
  }

  function isDefined(identifier, {bindings, parent}) {
    const variables = Object.keys(bindings)

    if (variables.some(has, identifier)) return true

    return parent ? isDefined(identifier, parent) : false
  }

  function has(identifier) {
    const {name} = this

    return identifier == name
  }

  function handleDeclaration(declaration) {
    const {path, identifier, filename} = this

    if (not(declaration)) return

    let importType = null

    if (hasDefault(declaration, identifier)) {
      importType = ImportType.DEFAULT
    } else if (hasMember(declaration, identifier)) {
      importType = ImportType.MEMBER
    } else if (hasAnonymous(declaration, identifier)) {
      importType = ImportType.ANONYMOUS
    }

    if (importType) {
      const program = path.findParent(isProgram)
      const pathToModule = getPathToModule(declaration, filename)

      insertImport(program, identifier, importType, pathToModule)

      return true
    }
  }

  function hasDefault(declaration, identifier) {
    return declaration['default'] == identifier.name
  }

  function hasMember(declaration, identifier) {
    const members = Array.isArray(declaration.members) ? declaration.members : []

    return members.some(has, identifier)
  }

  function hasAnonymous(declaration, identifier) {
    const anonymous = Array.isArray(declaration.anonymous) ? declaration.anonymous : []

    return anonymous.some(has, identifier)
  }

  function insertImport(program, identifier, type, pathToModule) {
    const programBody = program.get('body')

    const currentImportDeclarations = programBody.reduce(toImportDeclarations, [])

    let importDidAppend

    importDidAppend = currentImportDeclarations.some(importAlreadyExists, {
      identifier,
      type,
      pathToModule
    })

    if (importDidAppend) return

    importDidAppend = currentImportDeclarations.some(addToImportDeclaration, {identifier, type, pathToModule})

    if (importDidAppend) return

    const specifiers = []

    if (type == ImportType.DEFAULT) {
      specifiers.push(t.importDefaultSpecifier(identifier))
    } else if (type == ImportType.MEMBER) {
      specifiers.push(t.importSpecifier(identifier, identifier))
      // eslint-disable-next-line no-empty
    } else if (type == ImportType.ANONYMOUS) {
    }

    const importDeclaration = t.importDeclaration(specifiers, t.stringLiteral(pathToModule))

    program.unshiftContainer('body', importDeclaration)
  }

  function isProgram(path) {
    return path.isProgram()
  }

  function toImportDeclarations(list, currentPath) {
    if (currentPath.isImportDeclaration()) list.push(currentPath)

    return list
  }

  function importAlreadyExists({node: importDeclaration}) {
    const {identifier, type, pathToModule} = this

    if (importDeclaration.source.value == pathToModule) {
      if (type == ImportType.ANONYMOUS) return true

      return importDeclaration.specifiers.some(checkSpecifierLocalName, identifier)
    }
  }

  function checkSpecifierLocalName(specifier) {
    const identifier = this

    return specifier.local.name == identifier.name
  }

  function addToImportDeclaration(importDeclarationPath) {
    const {identifier, type, pathToModule} = this
    const {node} = importDeclarationPath

    if (node.source.value != pathToModule) return false

    const {specifiers} = node

    if (type == ImportType.DEFAULT) {
      if (not(specifiers.some(hasImportDefaultSpecifier))) {
        const specifier = t.importDefaultSpecifier(identifier)

        importDeclarationPath.unshiftContainer('specifiers', specifier)

        return true
      }
    }

    if (type == ImportType.MEMBER) {
      if (not(specifiers.some(hasSpecifierWithName, identifier))) {
        const specifier = t.importSpecifier(identifier, identifier)

        importDeclarationPath.pushContainer('specifiers', specifier)

        return true
      }
    }
  }

  function hasImportDefaultSpecifier(node) {
    return t.isImportDefaultSpecifier(node)
  }

  function hasSpecifierWithName(node) {
    if (not(t.isImportSpecifier(node))) return false

    const {name} = this

    return node.imported.name == name
  }

  function getPathToModule(declaration, filename) {
    if (declaration.path.includes('[name]')) {
      const pattern = declaration.nameReplacePattern || '\\.js$'
      const newSubString = declaration.nameReplaceString || ''

      const name = filename.replace(new RegExp(pattern), newSubString)

      return declaration.path.replace('[name]', name)
    }

    return declaration.path
  }
}
