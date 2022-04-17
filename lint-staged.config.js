module.exports = {
  '*.{js,jsx,ts,tsx}': ['eslint --fix', 'prettier --write'],
  'package.json': ['prettier --write'],
  '*.vue': ['eslint --fix', 'stylelint --fix', 'prettier --write'],
  '*.{scss,sass,less,css,html}': ['stylelint --fix', 'prettier --write'],
  '*.md': ['prettier --write']
}
