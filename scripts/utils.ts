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

export function copyFiles() {
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

export function getPackagesName(type: 'public' | 'all') {
  return packagesPaths.reduce((pkgNames, packagePath) => {
    const pkgJson = pathResolve(packagePath, 'package.json')

    const pkg = JSON.parse(readFileSync(pkgJson, 'utf8')) || {}

    if (type === 'public') {
      if (pkg.private) return pkgNames
      return [...pkgNames, pkg.name]
    } else {
      return [...pkgNames, pkg.name]
    }
  }, [] as string[])
}

export function build() {
  const filterPkgNames = getPackagesName('public').join(' ')
  const cmd = `pnpm -r --parallel run build --filter ${filterPkgNames}`
  console.log('start run command: ', cmd)
  execSync(cmd, {stdio: 'inherit'})
}

export function generateChangelog() {
  const pkgNames = getPackagesName('all')

  for (const pkgName of pkgNames) {
    const cmd = `pnpm exec conventional-changelog -p angular -i CHANGELOG.md -s --commit-path . -l ${pkgName} -r 0`
    console.log('start run command: ', cmd)
    execSync(cmd, {stdio: 'inherit', cwd: pathResolve('../packages', pkgName)})
  }
}

export function release() {
  generateChangelog()
  execSync('git add .', {stdio: 'inherit'})
  execSync(
    'pnpm exec bumpp package.json packages/*/package.json --push --tag --all --commit "build: the v%s release"',
    {
      stdio: 'inherit'
    }
  )
}
