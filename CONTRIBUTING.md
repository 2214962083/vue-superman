# Contributing

Thanks for being interested in contributing to this project!

## Development

To improve our development process, we've provide a playground, you can use any package in playground. Vue Superman uses a monorepo structure and packages/package can be consumed in isolation.

### Setup

This project depends on node v14+ and pnpm 6.x

If you don't have pnpm installed, you should execute:

```bash
npm i -g pnpm@6.32.17
```

Clone this repo to your local machine and install the dependencies.

```bash
pnpm bootstrap
```

We use VuePress for rapid development and documenting. You can start it locally by

```bash
cd packages/doc-site
pnpm dev
```

### Commit Convention

Before you create a Pull Request, please check whether your commits comply with
the commit conventions used in this repository.

When you create a commit we kindly ask you to follow the convention
`category(scope or module): message` in your commit message while using one of
the following categories:

- `feat / feature`: all changes that introduce completely new code or new
  features
- `fix`: changes that fix a bug (ideally you will additionally reference an
  issue if present)
- `refactor`: any code related change that is not a fix nor a feature
- `docs`: changing existing or creating new documentation (i.e. README, docs for
  usage of a lib or cli usage)
- `build`: all changes regarding the build of the software, changes to
  dependencies or the addition of new dependencies
- `test`: all changes regarding tests (adding new tests or changing existing
  ones)
- `ci`: all changes regarding the configuration of continuous integration (i.e.
  github actions, ci system)
- `chore`: all changes to the repository that do not fit into any of the above
  categories

If you are interested in the detailed specification you can visit
https://www.conventionalcommits.org/ or check out the
[Angular Commit Message Guidelines](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines).

### Steps to PR

todo...

## Code Style

Don't worry about the code style as long as you install the dev dependencies. Git hooks will format and fix them for you on committing.

## Thanks

Thank you again for being interested in this project! You are awesome!
