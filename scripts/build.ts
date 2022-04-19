import {copyFileSync, readFileSync, existsSync} from 'fs'
import {execSync} from 'child_process'
import path from 'path'
import globby from 'globby'

const pathResolve = (..._path: string[]) => path.resolve(__dirname, ..._path)
const pathResolveUnix = (..._path: string[]) => pathResolve(..._path).replace(/\\/g, '/')

const packagesGlobPaths = pathResolveUnix('../packages/*/')
const packagesPaths = globby.sync(packagesGlobPaths, {onlyFiles: false, onlyDirectories: true})
const rootReadme = pathResolve('../', 'README.md')
const rootLicense = pathResolve('../', 'LICENSE')

function copyFiles() {
  packagesPaths.map(packagePath => {
    const pkgJson = pathResolve(packagePath, 'package.json')
    const readme = pathResolve(packagePath, 'README.md')
    const license = pathResolve(packagePath, 'LICENSE')

    const pkg = JSON.parse(readFileSync(pkgJson, 'utf8')) || {}
    if (pkg.private) return
    if (!existsSync(readme)) copyFileSync(rootReadme, readme)
    if (!existsSync(license)) copyFileSync(rootLicense, license)
  })
}

function getPublicPackagesName() {
  return packagesPaths.reduce((pkgNames, packagePath) => {
    const pkgJson = pathResolve(packagePath, 'package.json')

    const pkg = JSON.parse(readFileSync(pkgJson, 'utf8')) || {}
    if (pkg.private) return pkgNames
    return [...pkgNames, pkg.name]
  }, [] as string[])
}

function build() {
  const filterPkgNames = getPublicPackagesName().join(' ')
  const cmd = `pnpm -r --parallel run build --filter ${filterPkgNames}`
  console.log('start run command: ', cmd)
  execSync(cmd, {stdio: 'inherit'})
}

copyFiles()

build()
