## 1. medusa cli
### run
```bash
  pnpm medusa db:setup                      Create the database, run migrations and sync links
  pnpm medusa db:migrate                    Migrate the database by executing pending migrations
```
### all check
```bash
Usage: medusa <command> [options]

Commands:
  medusa new [root] [starter]          Create a new Medusa project.
  medusa db:setup                      Create the database, run migrations and sync links
  medusa db:create                     Create the database used by your application
  medusa db:migrate                    Migrate the database by executing pending migrations
  medusa db:migrate:scripts            Run all migration scripts
  medusa db:rollback [modules...]      Rollback last batch of executed migrations for a given module
  medusa db:generate [modules...]      Generate migrations for a given module
  medusa plugin:db:generate            Generate migrations for modules in a plugin
  medusa db:sync-links                 Sync database schema with the links defined by your application and Medusa core
  medusa plugin:build                  Build plugin source for publishing to a package registry
  medusa plugin:develop                Start plugin development process in watch mode. Changes will be re-published to the local packages registry
  medusa plugin:publish                Publish the plugin to the local packages registry
  medusa plugin:add [plugin_names...]  Add the specified plugin to the project from the local packages registry
  medusa telemetry                     Enable or disable collection of anonymous usage data.
  medusa codemod <codemod-name>        Run automated code transformations
  medusa develop                       Start development server. Watches file and rebuilds when something changes
  medusa start                         Start production server.
  medusa build                         Build your project.
  medusa user                          Create a user
  medusa exec [file] [args..]          Run a function defined in a file.
  medusa mcloud [args..]               Run mcloud CLI commands through Medusa CLI.

Options:
      --verbose                Turn on verbose output  [boolean] [default: false]
      --no-color, --no-colors  Turn off the color in output  [boolean] [default: false]
      --json                   Turn on the JSON logger  [boolean] [default: false]
  -h, --help                   Show help  [boolean]
  -v, --version                Show the version of the Medusa CLI and the Medusa package in the current project  [boolean]

```
## 2. module init
### run
```bash
pnpm medusa db:setup
pnpm add @medusajs/medusa 
npm init -y
tsc --init
```
### tsc all check
```bash
tsc: The TypeScript Compiler - Version 6.0.3

COMMON COMMANDS

  tsc
  Compiles the current project (tsconfig.json in the working directory.)

  tsc app.ts util.ts
  Ignoring tsconfig.json, compiles the specified files with default compiler options.

  tsc -b
  Build a composite project in the working directory.

  tsc --init
  Creates a tsconfig.json with the recommended settings in the working directory.

  tsc -p ./path/to/tsconfig.json
  Compiles the TypeScript project located at the specified path.

  tsc --help --all
  An expanded version of this information, showing all possible compiler options

  tsc --noEmit
  tsc --target esnext
  Compiles the current project, with additional settings.

COMMAND LINE FLAGS

--help, -h
Print this message.

--watch, -w
Watch input files.

--all
Show all compiler options.

--version, -v
Print the compiler's version.

--init
Initializes a TypeScript project and creates a tsconfig.json file.

--project, -p
Compile the project given the path to its configuration file, or to a folder with a 'tsconfig.json'.

--showConfig
Print the final configuration instead of building.

--ignoreConfig
Ignore the tsconfig found and build with commandline options and files.

--build, -b
Build one or more projects and their dependencies, if out of date

COMMON COMPILER OPTIONS

--pretty
Enable color and formatting in TypeScript's output to make compiler errors easier to read.
type: boolean
default: true

--declaration, -d
Generate .d.ts files from TypeScript and JavaScript files in your project.
type: boolean
default: `false`, unless `composite` is set

--declarationMap
Create sourcemaps for d.ts files.
type: boolean
default: false

--emitDeclarationOnly
Only output d.ts files and not JavaScript files.
type: boolean
default: false

--sourceMap
Create source map files for emitted JavaScript files.
type: boolean
default: false

--noEmit
Disable emitting files from a compilation.
type: boolean
default: false

--target, -t
Set the JavaScript language version for emitted JavaScript and include compatible library declarations.
one of: es6/es2015, es2016, es2017, es2018, es2019, es2020, es2021, es2022, es2023, es2024, es2025, esnext
default: es2025

--module, -m
Specify what module code is generated.
one of: commonjs, es6/es2015, es2020, es2022, esnext, node16, node18, node20, nodenext, preserve
default: undefined

--lib
Specify a set of bundled library declaration files that describe the target runtime environment.
one or more: es5, es6/es2015, es7/es2016, es2017, es2018, es2019, es2020, es2021, es2022, es2023, es2024, es2025, esnext, dom, dom.iterable, dom.asynciterable, webworker, webworker.importscripts, webworker.iterable, webworker.asynciterable, scripthost, es2015.core, es2015.collection, es2015.generator, es2015.iterable, es2015.promise, es2015.proxy, es2015.reflect, es2015.symbol, es2015.symbol.wellknown, es2016.array.include, es2016.intl, es2017.arraybuffer, es2017.date, es2017.object, es2017.sharedmemory, es2017.string, es2017.intl, es2017.typedarrays, es2018.asyncgenerator, es2018.asynciterable/esnext.asynciterable, es2018.intl, es2018.promise, es2018.regexp, es2019.array, es2019.object, es2019.string, es2019.symbol/esnext.symbol, es2019.intl, es2020.bigint/esnext.bigint, es2020.date, es2020.promise, es2020.sharedmemory, es2020.string, es2020.symbol.wellknown, es2020.intl, es2020.number, es2021.promise, es2021.string, es2021.weakref/esnext.weakref, es2021.intl, es2022.array, es2022.error, es2022.intl, es2022.object, es2022.string, es2022.regexp, es2023.array, es2023.collection, es2023.intl, es2024.arraybuffer, es2024.collection, es2024.object/esnext.object, es2024.promise, es2024.regexp/esnext.regexp, es2024.sharedmemory, es2024.string/esnext.string, es2025.collection, es2025.float16/esnext.float16, es2025.intl, es2025.iterator/esnext.iterator, es2025.promise/esnext.promise, es2025.regexp, esnext.array, esnext.collection, esnext.date, esnext.decorators, esnext.disposable, esnext.error, esnext.intl, esnext.sharedmemory, esnext.temporal, esnext.typedarrays, decorators, decorators.legacy
default: undefined

--allowJs
Allow JavaScript files to be a part of your program. Use the 'checkJs' option to get errors from these files.
type: boolean
default: `false`, unless `checkJs` is set

--checkJs
Enable error reporting in type-checked JavaScript files.
type: boolean
default: false

--jsx
Specify what JSX code is generated.
one of: preserve, react, react-native, react-jsx, react-jsxdev
default: undefined

--outFile
Specify a file that bundles all outputs into one JavaScript file. If 'declaration' is true, also designates a file that bundles all .d.ts output.

--outDir
Specify an output folder for all emitted files.

--removeComments
Disable emitting comments.
type: boolean
default: false

--strict
Enable all strict type-checking options.
type: boolean
default: true

--types
Specify type package names to be included without being referenced in a source file.

--esModuleInterop
Emit additional JavaScript to ease support for importing CommonJS modules. This enables 'allowSyntheticDefaultImports' for type compatibility.
type: boolean
default: true

You can learn about all of the compiler options at https://aka.ms/tsc
```
## 3. dependency
### 3.1 dependencies
* @medusajs/cli@2.15.3 
* @medusajs/medusa@2.15.3 
* @medusajs/framework@2.15.3

### 3.2 dev dependencies
* ts-node@10.9.2
* typescript@6.0.3
* @types/node@20.12.11
### 3.3 transpiler tsc
* module compile lai  `commonjs` và `esm` là  `node16` -> `nodenext`
## 4. cấu hình kết nối
* tham khảo: https://docs.medusajs.com/learn/configurations/medusa-config
* 