============================================================
# https://mikro-orm.io/docs
============================================================
[Skip to main content](https://mikro-orm.io/docs/quick-start#__docusaurus_skipToContent_fallback)
⭐️ If you like MikroORM, give it a star on [GitHub](https://github.com/mikro-orm/mikro-orm) and consider [sponsoring](https://github.com/sponsors/mikro-orm) its development! ⭐️
[![MikroORM](https://mikro-orm.io/img/logo.svg)](https://mikro-orm.io/)
[7.1](https://mikro-orm.io/docs/quick-start)
  * [Next](https://mikro-orm.io/docs/next/quick-start)
  * [7.1](https://mikro-orm.io/docs/quick-start)
  * [7.0](https://mikro-orm.io/docs/7.0/quick-start)
  * [6.6](https://mikro-orm.io/docs/6.6/quick-start)
  * [5.9](https://mikro-orm.io/docs/5.9/quick-start)
[Docs](https://mikro-orm.io/docs/quick-start)[API](https://mikro-orm.io/api)[Blog](https://mikro-orm.io/blog)[Changelog](https://mikro-orm.io/changelog)
[latest: v7.1.3](https://mikro-orm.io/versions)[Discord](https://discord.gg/w8bjxFHS7X "Chat on Discord")[GitHub](https://github.com/mikro-orm/mikro-orm "View on GitHub")[Twitter](https://twitter.com/MikroORM "Twitter")
Search`Ctrl``K`
  * [Quick Start](https://mikro-orm.io/docs/quick-start)
  * [Getting Started](https://mikro-orm.io/docs/guide)
    * [Chapter 1: First Entity](https://mikro-orm.io/docs/guide/first-entity)
    * [Chapter 2: Relationships](https://mikro-orm.io/docs/guide/relationships)
    * [Chapter 3: Project Setup](https://mikro-orm.io/docs/guide/project-setup)
    * [Chapter 4: Advanced](https://mikro-orm.io/docs/guide/advanced)
    * [Chapter 5: Type-safety](https://mikro-orm.io/docs/guide/type-safety)
  * [Core Concepts](https://mikro-orm.io/docs/core-concepts)
  * [Modeling](https://mikro-orm.io/docs/modeling)
  * [Querying](https://mikro-orm.io/docs/querying)
  * [Schema & Database](https://mikro-orm.io/docs/schema-database)
  * [Advanced](https://mikro-orm.io/docs/advanced)
  * [Configuration](https://mikro-orm.io/docs/configuration)
  * [Integrations](https://mikro-orm.io/docs/integrations)
  * [Recipes](https://mikro-orm.io/docs/recipes)
  * [Reference](https://mikro-orm.io/docs/reference)
  * [Example Integrations](https://mikro-orm.io/docs/examples)
  * [Upgrading](https://mikro-orm.io/docs/upgrading)
Version: 7.1
On this page
# Quick Start
In this guide, you will learn how to quickly bootstrap a simple project using MikroORM. For a deeper dive, check out the [Getting Started guide](https://mikro-orm.io/docs/guide) which follows.
> If you prefer to take a peek at an existing project, there are [several example repositories](https://mikro-orm.io/docs/examples) available.
## Installation[​](https://mikro-orm.io/docs/quick-start#installation "Direct link to Installation")
First install the module via package manager of your choice. Do not forget to install the database driver as well:
  * npm
  * Yarn
  * pnpm
  * Bun
```
# for mongodb  
npm install @mikro-orm/core @mikro-orm/mongodb  
  
# for mysql (works with mariadb too)  
npm install @mikro-orm/core @mikro-orm/mysql  
  
# for mariadb (works with mysql too)  
npm install @mikro-orm/core @mikro-orm/mariadb  
  
# for postgresql (works with cockroachdb too)  
npm install @mikro-orm/core @mikro-orm/postgresql  
  
# for pglite (embedded PostgreSQL in WASM)  
npm install @mikro-orm/core @mikro-orm/pglite  
  
# for sqlite  
npm install @mikro-orm/core @mikro-orm/sqlite  
  
# for libsql/turso  
npm install @mikro-orm/core @mikro-orm/libsql  
  
# for mssql  
npm install @mikro-orm/core @mikro-orm/mssql  
  
# for oracle  
npm install @mikro-orm/core @mikro-orm/oracledb  
```
```
# for mongodb  
yarn add @mikro-orm/core @mikro-orm/mongodb  
  
# for mysql (works with mariadb too)  
yarn add @mikro-orm/core @mikro-orm/mysql  
  
# for mariadb (works with mysql too)  
yarn add @mikro-orm/core @mikro-orm/mariadb  
  
# for postgresql (works with cockroachdb too)  
yarn add @mikro-orm/core @mikro-orm/postgresql  
  
# for pglite (embedded PostgreSQL in WASM)  
yarn add @mikro-orm/core @mikro-orm/pglite  
  
# for sqlite  
yarn add @mikro-orm/core @mikro-orm/sqlite  
  
# for libsql/turso  
yarn add @mikro-orm/core @mikro-orm/libsql  
  
# for mssql  
yarn add @mikro-orm/core @mikro-orm/mssql  
  
# for oracle  
yarn add @mikro-orm/core @mikro-orm/oracledb  
```
```
# for mongodb  
pnpm add @mikro-orm/core @mikro-orm/mongodb  
  
# for mysql (works with mariadb too)  
pnpm add @mikro-orm/core @mikro-orm/mysql  
  
# for mariadb (works with mysql too)  
pnpm add @mikro-orm/core @mikro-orm/mariadb  
  
# for postgresql (works with cockroachdb too)  
pnpm add @mikro-orm/core @mikro-orm/postgresql  
  
# for pglite (embedded PostgreSQL in WASM)  
pnpm add @mikro-orm/core @mikro-orm/pglite  
  
# for sqlite  
pnpm add @mikro-orm/core @mikro-orm/sqlite  
  
# for libsql/turso  
pnpm add @mikro-orm/core @mikro-orm/libsql  
  
# for mssql  
pnpm add @mikro-orm/core @mikro-orm/mssql  
  
# for oracle  
pnpm add @mikro-orm/core @mikro-orm/oracledb  
```
```
# for mongodb  
bun add @mikro-orm/core @mikro-orm/mongodb  
  
# for mysql (works with mariadb too)  
bun add @mikro-orm/core @mikro-orm/mysql  
  
# for mariadb (works with mysql too)  
bun add @mikro-orm/core @mikro-orm/mariadb  
  
# for postgresql (works with cockroachdb too)  
bun add @mikro-orm/core @mikro-orm/postgresql  
  
# for pglite (embedded PostgreSQL in WASM)  
bun add @mikro-orm/core @mikro-orm/pglite  
  
# for sqlite  
bun add @mikro-orm/core @mikro-orm/sqlite  
  
# for libsql/turso  
bun add @mikro-orm/core @mikro-orm/libsql  
  
# for mssql  
bun add @mikro-orm/core @mikro-orm/mssql  
  
# for oracle  
bun add @mikro-orm/core @mikro-orm/oracledb  
```
Then call `MikroORM.init` as part of bootstrapping your app:
```
import { MikroORM } from '@mikro-orm/postgresql'; // or any other driver package  
  
const orm = await MikroORM.init({  
  entities: ['./dist/entities'], // path to your JS entities (dist), relative to `baseDir`  
  dbName: 'my-db-name',  
});  
console.log(orm.em); // access EntityManager via `em` property  
```
> To access driver specific methods like `em.createQueryBuilder()` you need to import the `MikroORM`/`EntityManager`/`EntityRepository` class from the driver package. Alternatively you can cast the `orm.em` to `EntityManager` exported from the driver package:
> 
```
> 
import { EntityManager } from '@mikro-orm/postgresql';  
> 
> 
> 
const em = orm.em as EntityManager;  
> 
> 
> 
const qb = em.createQueryBuilder(...);  
> 
> 
```
You can read more about all the possible configuration options in [Advanced Configuration](https://mikro-orm.io/docs/configuration) section.
## Entity Discovery[​](https://mikro-orm.io/docs/quick-start#entity-discovery "Direct link to Entity Discovery")
You can provide entities directly or use folder-based discovery with glob patterns:
```
const orm = await MikroORM.init({  
  // explicit entity references (recommended)  
  entities: [User, Article, Tag],  
  // or folder-based discovery  
  entities: ['./dist/app/**/*.entity.js'],  
  entitiesTs: ['./src/app/**/*.entity.ts'],  
  // ...  
});  
```
If you are experiencing problems with folder-based discovery, try using `mikro-orm debug` CLI command to check what paths are actually being used.
For detailed information about using decorators (legacy and ES spec) and metadata providers, see the [Using Decorators guide](https://mikro-orm.io/docs/using-decorators). For glob-based entity discovery, see [Folder-based Discovery](https://mikro-orm.io/docs/folder-based-discovery).
> For larger projects, you can use `npx mikro-orm discovery:export` to auto-generate a barrel file with all your entity imports. See [Folder-based Discovery](https://mikro-orm.io/docs/folder-based-discovery#generating-a-barrel-file-with-discoveryexport) for details.
## Synchronous initialization[​](https://mikro-orm.io/docs/quick-start#synchronous-initialization "Direct link to Synchronous initialization")
As opposed to the async [`MikroORM.init`](https://mikro-orm.io/api/core/class/MikroORM#init) method, you can prefer to use synchronous variant with the constructor: [`new MikroORM()`](https://mikro-orm.io/api/core/class/MikroORM#constructor).
```
const orm = new MikroORM({ ... });  
```
This method has some limitations:
  * folder-based discovery not supported
  * ORM extensions are not auto-loaded
  * when metadata cache is enabled, `FileCacheAdapter` needs to be explicitly set in the config
## RequestContext helper[​](https://mikro-orm.io/docs/quick-start#requestcontext-helper "Direct link to RequestContext helper")
Now you will need to fork entity manager for each request so their [identity maps](https://mikro-orm.io/identity-map/) will not collide. To do so, use the `RequestContext` helper:
```
const app = express();  
  
app.use((req, res, next) => {  
  RequestContext.create(orm.em, next);  
});  
```
> You should register this middleware as the last one just before request handlers and before any of your custom middleware that is using the ORM. There might be issues when you register it before request processing middleware like `queryParser` or `bodyParser`, so definitely register the context after them.
More info about `RequestContext` is described [here](https://mikro-orm.io/docs/identity-map#request-context).
## Entity definition[​](https://mikro-orm.io/docs/quick-start#entity-definition "Direct link to Entity definition")
Now you can start defining your entities. MikroORM supports multiple approaches:
  * defineEntity + class
  * defineEntity
  * decorators
The `defineEntity` helper with a class extension gives you clean named types and a natural place for custom methods:
./entities/Book.ts
```
import { defineEntity, p } from '@mikro-orm/core';  
  
const BookSchema = defineEntity({  
  name: 'Book',  
  properties: {  
    id: p.bigint().primary(),  
    title: p.string(),  
    author: () => p.manyToOne(Author),  
    tags: () => p.manyToMany(BookTag),  
  },  
});  
  
export class Book extends BookSchema.class {}  
BookSchema.setClass(Book);  
```
The `defineEntity` helper provides full type inference without decorators:
./entities/Book.ts
```
import { defineEntity, InferEntity, p } from '@mikro-orm/core';  
  
export const Book = defineEntity({  
  name: 'Book',  
  properties: {  
    id: p.bigint().primary(),  
    title: p.string(),  
    author: () => p.manyToOne(Author),  
    tags: () => p.manyToMany(BookTag),  
  },  
});  
  
export type IBook = InferEntity<typeof Book>;  
```
Decorators require additional setup - see the [Using Decorators guide](https://mikro-orm.io/docs/using-decorators) for configuration details:
./entities/Book.ts
```
import { Collection } from '@mikro-orm/core';  
import { Entity, PrimaryKey, Property, ManyToOne, ManyToMany } from '@mikro-orm/decorators/legacy';  
  
@Entity()  
export class Book {  
  
  @PrimaryKey()  
  id!: bigint;  
  
  @Property()  
  title!: string;  
  
  @ManyToOne(() => Author)  
  author!: Author;  
  
  @ManyToMany(() => BookTag)  
  tags = new Collection<BookTag>(this);  
  
}  
```
For UUID primary keys, use `p.uuid()` with `defineEntity`, `@PrimaryKey({ type: 'uuid' })` with decorators, or `{ type: 'uuid', primary: true }` with `EntitySchema`.
More information can be found in the [Defining Entities section](https://mikro-orm.io/docs/defining-entities) in docs.
## EntityManager[​](https://mikro-orm.io/docs/quick-start#entitymanager "Direct link to EntityManager")
When you have your entities defined, you can start using ORM via `EntityManager`.
To save entity state to database, you need to persist it. Persist determines whether to use `insert` or `update` and computes appropriate change-set. Entity references that are not persisted yet (does not have identifier) will be cascade persisted automatically.
```
// use em.create() to create entity instances  
const author = em.create(Author, {  
  name: 'Jon Snow',  
  email: 'snow@wall.st',  
  born: new Date(),  
});  
  
const publisher = em.create(Publisher, { name: '7K publisher' });  
  
const book1 = em.create(Book, {  
  title: 'My Life on The Wall, part 1',  
  author,  
  publisher,  
});  
const book2 = em.create(Book, {  
  title: 'My Life on The Wall, part 2',  
  author,  
  publisher,  
});  
const book3 = em.create(Book, {  
  title: 'My Life on The Wall, part 3',  
  author,  
  publisher,  
});  
  
// em.create() auto-persists by default, so just flush  
await em.flush();  
```
To fetch entities from database you can use `find()` and `findOne()` of `EntityManager`:
```
const authors = em.findAll(Author, {  
  populate: ['books'],  
});  
  
for (const author of authors) {  
  console.log(author); // instance of Author entity  
  console.log(author.name); // Jon Snow  
  
  for (const book of author.books) { // iterating books collection  
    console.log(book); // instance of Book entity  
    console.log(book.title); // My Life on The Wall, part 1/2/3  
  }  
}  
```
Take a look at docs about [working with `EntityManager`](https://mikro-orm.io/docs/entity-manager).
## Setting up the Commandline Tool[​](https://mikro-orm.io/docs/quick-start#setting-up-the-commandline-tool "Direct link to Setting up the Commandline Tool")
MikroORM ships with a number of command line tools that are very helpful during development, like `SchemaGenerator` and `EntityGenerator`. You can call this command from the NPM binary directory or use `npx`:
```
# install the CLI package first!  
$ yarn add --dev @mikro-orm/cli  
  
# manually  
$ node node_modules/.bin/mikro-orm  
  
# via npx  
$ npx mikro-orm  
  
# or via yarn  
$ yarn mikro-orm  
```
> To work with the CLI, first install `@mikro-orm/cli` package locally. The version needs to be aligned with the `@mikro-orm/core` package.
For CLI to be able to access your database, you will need to create a configuration file that exports your ORM configuration(s).
By default, the following paths, relative to the current working directory, are searched in this order:
  1. `./src/mikro-orm.config.ts`
  2. `./mikro-orm.config.ts`
  3. `./dist/mikro-orm.config.js`
  4. `./build/mikro-orm.config.js`
  5. `./src/mikro-orm.config.js`
  6. `./mikro-orm.config.js`
You can set up array of possible paths to ORM config files in `package.json`. The `package.json` file can be located in the current working directory, or in one of its parent folders.
./package.json
```
{  
  "name": "your-app",  
  "dependencies": { ... },  
  "mikro-orm": {  
    "configPaths": [  
      "./src/mikro-orm.config.ts",  
      "./dist/mikro-orm.config.js"  
    ]  
  }  
}  
```
Another way to control these CLI-related settings is with the environment variables:
  * `MIKRO_ORM_CLI_CONFIG`: the path to ORM config file
  * `MIKRO_ORM_CLI_PREFER_TS`: enforce use of the TS paths (e.g. `entitiesTs` or `pathTs`)
  * `MIKRO_ORM_CLI_TS_LOADER`: set preferred TS loader (one of `oxc`, `swc`, `tsx`, `jiti`, `tsimp`)
  * `MIKRO_ORM_CLI_TS_CONFIG_PATH`: path to the tsconfig.json (for TS support)
  * `MIKRO_ORM_CLI_ALWAYS_ALLOW_TS`: enable `.ts` files to use without detected TS support
  * `MIKRO_ORM_CLI_VERBOSE`: enable verbose logging (e.g. print queries used in seeder or schema diffing)
MikroORM will always try to load the first available config file, based on the order in `configPaths`. When the TypeScript support is not detected, TS config files will be ignored. You can enforce using TS config files via `MIKRO_ORM_CLI_PREFER_TS` environment variable or `preferTs` flag in your `package.json`:
./package.json
```
"mikro-orm": {  
  "preferTs": true  
}  
```
You can also specify the config path via `--config` option, when it points to a TS file, the `preferTs` flag will be enabled implicitly:
```
$ npx mikro-orm debug --config ./my-config.ts  
```
Your configuration file may export multiple configuration objects in an array. The different configurations must have a `contextName` in them. If no `contextName` is specified, it is treated as the name "default". You can use the `MIKRO_ORM_CONTEXT_NAME` environment variable or the `--contextName` command line option to pick a configuration with a particular `contextName` to use for the CLI. See [below](https://mikro-orm.io/docs/quick-start#configuration-file-structure) for details on the config object.
All available commands are listed in the CLI help:
```
$ npx mikro-orm  
  
Usage: mikro-orm <command> [options]  
  
Commands:  
  mikro-orm cache:clear             Clear metadata cache  
  mikro-orm cache:generate          Generate metadata cache  
  mikro-orm generate-entities       Generate entities based on current database  
                                    schema  
  mikro-orm database:create         Create your database if it does not exist  
  mikro-orm database:import <file>  Imports the SQL file to the database  
  mikro-orm seeder:run              Seed the database using the seeder class  
  mikro-orm seeder:create <seeder>  Create a new seeder class  
  mikro-orm schema:create           Create database schema based on current  
                                    metadata  
  mikro-orm schema:drop             Drop database schema based on current  
                                    metadata  
  mikro-orm schema:update           Update database schema based on current  
                                    metadata  
  mikro-orm schema:fresh            Drop and recreate database schema based on  
                                    current metadata  
  mikro-orm migration:create        Create new migration with current schema  
                                    diff  
  mikro-orm migration:up            Migrate up to the latest version  
  mikro-orm migration:down          Migrate one step down  
  mikro-orm migration:list          List all executed migrations  
  mikro-orm migration:check         Check if migrations are needed. Useful for  
                                    bash scripts.  
  mikro-orm migration:pending       List all pending migrations  
  mikro-orm migration:fresh         Clear the database and rerun all migrations  
  mikro-orm debug                   Debug CLI configuration  
  
Options:  
      --config       Set path to the ORM configuration file              [array]  
      --contextName  Set name of config to load out of the ORM configuration  
                     file. Used when config file exports an array or a function  
                                                   [string] [default: "default"]  
  -v, --version      Show version number                               [boolean]  
  -h, --help         Show help                                         [boolean]  
  
Examples:  
  mikro-orm schema:update --run  Runs schema synchronization  
```
To verify your setup, you can use `mikro-orm debug` command.
## Configuration file structure[​](https://mikro-orm.io/docs/quick-start#configuration-file-structure "Direct link to Configuration file structure")
Preferred way of creating to the configuration object is with the `defineConfig` helper. It will provide intellisense even in JavaScript files, without the need for type hints via jsdoc:
```
import { defineConfig } from '@mikro-orm/sqlite';  
  
export default defineConfig({  
  entities: [Author, Book, BookTag],  
  dbName: 'my-db-name',  
  // this is inferred as you import `defineConfig` from sqlite package  
  // driver: SqliteDriver,  
});  
```
Using `defineConfig` also automatically infers the driver option for you if you import the helper from the driver package. This means you don't have to provide the `driver` option explicitly.
Alternatively, you can use the `Partial<Options>` type:
./src/mikro-orm.config.ts
```
import { Options } from '@mikro-orm/sqlite';  
  
const config: Partial<Options> = {  
  entities: [Author, Book, BookTag],  
  dbName: 'my-db-name',  
  driver: SqliteDriver,  
};  
  
export default config;  
```
You can also export array of different configs for different purposes. For example, you may export one config object for CLI, and another for your app. Each config in the array needs to have a distinct `contextName` value (omitting it is same as setting it to "default"), like so:
```
import { defineConfig } from '@mikro-orm/postgresql';  
  
export default [  
  defineConfig({  
    contextName: 'default',  
    entities: [Author, Book, BookTag],  
    dbName: 'my-db-name',  
    user: 'app',  
    // other credentials and settings  
  }),  
  defineConfig({  
    contextName: 'super',  
    entities: [Author, Book, BookTag],  
    dbName: 'my-db-name',  
    user: 'admin',  
    // other credentials and settings  
  }),  
];  
```
Which in turn enables you to run `MikroORM.init()` in your app without arguments (and connect with the user "app"), while in CLI (where you may need higher privileges), you can use
```
$ npx mikro-orm --contextName=super  
```
You can also export a function, which will be called with a `contextName` parameter. That function should return a configuration object for the provided `contextName`, a promise resolving to a configuration object for that `contextName`, or nothing if you wish to error on that name instead. This can be particularly useful in multi-tenant setups.
For example, if you have
```
import { defineConfig } from '@mikro-orm/postgresql';  
  
export default (contextName: string) => defineConfig({  
  entities: [Author, Book, BookTag],  
  dbName: `tenant_${contextName}`,  
  user: 'app',  
  // other credentials and settings  
});  
```
then you will need to start your app with the `MIKRO_ORM_CONTEXT_NAME` environment variable set to `example1` to load the database `tenant_example1`, and similarly, when running CLI, you can use
```
$ npx mikro-orm --contextName=example1  
```
to operate on that particular tenant's database instance. Not specifying either option will point you to the "tenant_default" database.
You can also combine arrays and factory functions. Array members will be preferred, and any functions in the array will be executed from top to bottom. The first function to return an object will be what ends up being used.
For example, you can have in your config file
```
import { defineConfig } from '@mikro-orm/postgresql';  
  
export default [  
  defineConfig({  
    contextName: 'default',  
    entities: [Author, Book, BookTag],  
    dbName: 'demo',  
    user: 'app',  
    // other credentials and settings  
  }),  
  defineConfig({  
    contextName: 'super',  
    entities: [Author, Book, BookTag],  
    dbName: 'demo',  
    user: 'admin',  
    // other credentials and settings  
  }),  
  (contextName: string) => {  
    if (!contextName.startsWith('use:')) {  
        return;  
    }  
    return defineConfig({  
      contextName,  
      entities: [Author, Book, BookTag],  
      dbName: `tenant_${contextName.split(':', 2)[1]}`,  
      user: 'app',  
      // other credentials and settings  
    });  
  },  
  (contextName: string) => {  
    if (!contextName.startsWith('edit:')) {  
      return;  
    }  
    return defineConfig({  
      contextName,  
      entities: [Author, Book, BookTag],  
      dbName: `tenant_${contextName.split(':', 2)[1]}`,  
      user: 'admin',  
      // other credentials and settings  
    });  
  }  
];  
```
which will let you run the "demo" database with "app" user whenever you do not specify `MIKRO_ORM_CONTEXT_NAME` or the `--contextName` option in CLI. Specifying "super" for the name will run the "demo" database with the "admin" user, specifying "use:example1" will load the "tenant_example1" database with the "app" user, and specifying "edit:example1" will load the "tenant_example1" database with the "admin" user.
[](https://github.com/mikro-orm/mikro-orm/edit/master/docs/versioned_docs/version-7.1/quick-start.md)
Last updated on **May 20, 2026** by **Martin Adámek**
[Next Getting Started Guide](https://mikro-orm.io/docs/guide)
  * [Installation](https://mikro-orm.io/docs/quick-start#installation)
  * [Entity Discovery](https://mikro-orm.io/docs/quick-start#entity-discovery)
  * [Synchronous initialization](https://mikro-orm.io/docs/quick-start#synchronous-initialization)
  * [RequestContext helper](https://mikro-orm.io/docs/quick-start#requestcontext-helper)
  * [Entity definition](https://mikro-orm.io/docs/quick-start#entity-definition)
  * [EntityManager](https://mikro-orm.io/docs/quick-start#entitymanager)
  * [Setting up the Commandline Tool](https://mikro-orm.io/docs/quick-start#setting-up-the-commandline-tool)
  * [Configuration file structure](https://mikro-orm.io/docs/quick-start#configuration-file-structure)
#### Docs
  * [Quick Start](https://mikro-orm.io/docs/quick-start)
  * [Getting Started](https://mikro-orm.io/docs/guide)
  * [Migration from v6 to v7](https://mikro-orm.io/docs/upgrading-v6-to-v7)
  * [Version 6.6 docs](https://mikro-orm.io/docs/6.6/quick-start)
#### Community
  * [Discord](https://discord.gg/w8bjxFHS7X)
  * [Slack](https://join.slack.com/t/mikroorm/shared_invite/enQtNTM1ODYzMzM4MDk3LWM4ZDExMjU5ZDhmNjA2MmM3MWMwZmExNjhhNDdiYTMwNWM0MGY5ZTE3ZjkyZTMzOWExNDgyYmMzNDE1NDI5NjA)
  * [Stack Overflow](https://stackoverflow.com/questions/ask?tags=mikro-orm)
#### Social
  * [Blog](https://mikro-orm.io/blog)
  * [Twitter](https://twitter.com/MikroORM)
  * [GitHub](https://github.com/mikro-orm/mikro-orm)
  * [GitHub Sponsors](https://github.com/sponsors/mikro-orm)
![MikroORM](https://mikro-orm.io/img/logo-header.svg)
Copyright © 2018-2026 Martin Adámek. Built with Docusaurus.
============================================================
# https://mikro-orm.io/docs/quick-start
============================================================
[Skip to main content](https://mikro-orm.io/docs/quick-start#__docusaurus_skipToContent_fallback)
⭐️ If you like MikroORM, give it a star on [GitHub](https://github.com/mikro-orm/mikro-orm) and consider [sponsoring](https://github.com/sponsors/mikro-orm) its development! ⭐️
[ ![MikroORM](https://mikro-orm.io/img/logo.svg)![MikroORM](https://mikro-orm.io/img/logo-dark.svg) ](https://mikro-orm.io/)
[7.1](https://mikro-orm.io/docs/quick-start)
  * [Next](https://mikro-orm.io/docs/next/quick-start)
  * [7.1](https://mikro-orm.io/docs/quick-start)
  * [7.0](https://mikro-orm.io/docs/7.0/quick-start)
  * [6.6](https://mikro-orm.io/docs/6.6/quick-start)
  * [5.9](https://mikro-orm.io/docs/5.9/quick-start)
[Docs](https://mikro-orm.io/docs/quick-start)[API](https://mikro-orm.io/api)[Blog](https://mikro-orm.io/blog)[Changelog](https://mikro-orm.io/changelog)
[latest: v7.1.3](https://mikro-orm.io/versions)[Discord](https://discord.gg/w8bjxFHS7X "Chat on Discord")[GitHub](https://github.com/mikro-orm/mikro-orm "View on GitHub")[Twitter](https://twitter.com/MikroORM "Twitter")
Search
  * [Quick Start](https://mikro-orm.io/docs/quick-start)
  * [Getting Started](https://mikro-orm.io/docs/guide)
    * [Chapter 1: First Entity](https://mikro-orm.io/docs/guide/first-entity)
    * [Chapter 2: Relationships](https://mikro-orm.io/docs/guide/relationships)
    * [Chapter 3: Project Setup](https://mikro-orm.io/docs/guide/project-setup)
    * [Chapter 4: Advanced](https://mikro-orm.io/docs/guide/advanced)
    * [Chapter 5: Type-safety](https://mikro-orm.io/docs/guide/type-safety)
  * [Core Concepts](https://mikro-orm.io/docs/core-concepts)
  * [Modeling](https://mikro-orm.io/docs/modeling)
  * [Querying](https://mikro-orm.io/docs/querying)
  * [Schema & Database](https://mikro-orm.io/docs/schema-database)
  * [Advanced](https://mikro-orm.io/docs/advanced)
  * [Configuration](https://mikro-orm.io/docs/configuration)
  * [Integrations](https://mikro-orm.io/docs/integrations)
  * [Recipes](https://mikro-orm.io/docs/recipes)
  * [Reference](https://mikro-orm.io/docs/reference)
  * [Example Integrations](https://mikro-orm.io/docs/examples)
  * [Upgrading](https://mikro-orm.io/docs/upgrading)
Version: 7.1
On this page
# Quick Start
In this guide, you will learn how to quickly bootstrap a simple project using MikroORM. For a deeper dive, check out the [Getting Started guide](https://mikro-orm.io/docs/guide) which follows.
> If you prefer to take a peek at an existing project, there are [several example repositories](https://mikro-orm.io/docs/examples) available.
## Installation[​](https://mikro-orm.io/docs/quick-start#installation "Direct link to Installation")
First install the module via package manager of your choice. Do not forget to install the database driver as well:
  * npm
  * Yarn
  * pnpm
  * Bun
```
# for mongodb  
npm install @mikro-orm/core @mikro-orm/mongodb  
  
# for mysql (works with mariadb too)  
npm install @mikro-orm/core @mikro-orm/mysql  
  
# for mariadb (works with mysql too)  
npm install @mikro-orm/core @mikro-orm/mariadb  
  
# for postgresql (works with cockroachdb too)  
npm install @mikro-orm/core @mikro-orm/postgresql  
  
# for pglite (embedded PostgreSQL in WASM)  
npm install @mikro-orm/core @mikro-orm/pglite  
  
# for sqlite  
npm install @mikro-orm/core @mikro-orm/sqlite  
  
# for libsql/turso  
npm install @mikro-orm/core @mikro-orm/libsql  
  
# for mssql  
npm install @mikro-orm/core @mikro-orm/mssql  
  
# for oracle  
npm install @mikro-orm/core @mikro-orm/oracledb  
```
```
# for mongodb  
yarn add @mikro-orm/core @mikro-orm/mongodb  
  
# for mysql (works with mariadb too)  
yarn add @mikro-orm/core @mikro-orm/mysql  
  
# for mariadb (works with mysql too)  
yarn add @mikro-orm/core @mikro-orm/mariadb  
  
# for postgresql (works with cockroachdb too)  
yarn add @mikro-orm/core @mikro-orm/postgresql  
  
# for pglite (embedded PostgreSQL in WASM)  
yarn add @mikro-orm/core @mikro-orm/pglite  
  
# for sqlite  
yarn add @mikro-orm/core @mikro-orm/sqlite  
  
# for libsql/turso  
yarn add @mikro-orm/core @mikro-orm/libsql  
  
# for mssql  
yarn add @mikro-orm/core @mikro-orm/mssql  
  
# for oracle  
yarn add @mikro-orm/core @mikro-orm/oracledb  
```
```
# for mongodb  
pnpm add @mikro-orm/core @mikro-orm/mongodb  
  
# for mysql (works with mariadb too)  
pnpm add @mikro-orm/core @mikro-orm/mysql  
  
# for mariadb (works with mysql too)  
pnpm add @mikro-orm/core @mikro-orm/mariadb  
  
# for postgresql (works with cockroachdb too)  
pnpm add @mikro-orm/core @mikro-orm/postgresql  
  
# for pglite (embedded PostgreSQL in WASM)  
pnpm add @mikro-orm/core @mikro-orm/pglite  
  
# for sqlite  
pnpm add @mikro-orm/core @mikro-orm/sqlite  
  
# for libsql/turso  
pnpm add @mikro-orm/core @mikro-orm/libsql  
  
# for mssql  
pnpm add @mikro-orm/core @mikro-orm/mssql  
  
# for oracle  
pnpm add @mikro-orm/core @mikro-orm/oracledb  
```
```
# for mongodb  
bun add @mikro-orm/core @mikro-orm/mongodb  
  
# for mysql (works with mariadb too)  
bun add @mikro-orm/core @mikro-orm/mysql  
  
# for mariadb (works with mysql too)  
bun add @mikro-orm/core @mikro-orm/mariadb  
  
# for postgresql (works with cockroachdb too)  
bun add @mikro-orm/core @mikro-orm/postgresql  
  
# for pglite (embedded PostgreSQL in WASM)  
bun add @mikro-orm/core @mikro-orm/pglite  
  
# for sqlite  
bun add @mikro-orm/core @mikro-orm/sqlite  
  
# for libsql/turso  
bun add @mikro-orm/core @mikro-orm/libsql  
  
# for mssql  
bun add @mikro-orm/core @mikro-orm/mssql  
  
# for oracle  
bun add @mikro-orm/core @mikro-orm/oracledb  
```
Then call `MikroORM.init` as part of bootstrapping your app:
```
import { MikroORM } from '@mikro-orm/postgresql'; // or any other driver package  
  
const orm = await MikroORM.init({  
  entities: ['./dist/entities'], // path to your JS entities (dist), relative to `baseDir`  
  dbName: 'my-db-name',  
});  
console.log(orm.em); // access EntityManager via `em` property  
```
> To access driver specific methods like `em.createQueryBuilder()` you need to import the `MikroORM`/`EntityManager`/`EntityRepository` class from the driver package. Alternatively you can cast the `orm.em` to `EntityManager` exported from the driver package:
> 
```
> 
import { EntityManager } from '@mikro-orm/postgresql';  
> 
> 
> 
const em = orm.em as EntityManager;  
> 
> 
> 
const qb = em.createQueryBuilder(...);  
> 
> 
```
You can read more about all the possible configuration options in [Advanced Configuration](https://mikro-orm.io/docs/configuration) section.
## Entity Discovery[​](https://mikro-orm.io/docs/quick-start#entity-discovery "Direct link to Entity Discovery")
You can provide entities directly or use folder-based discovery with glob patterns:
```
const orm = await MikroORM.init({  
  // explicit entity references (recommended)  
  entities: [User, Article, Tag],  
  // or folder-based discovery  
  entities: ['./dist/app/**/*.entity.js'],  
  entitiesTs: ['./src/app/**/*.entity.ts'],  
  // ...  
});  
```
If you are experiencing problems with folder-based discovery, try using `mikro-orm debug` CLI command to check what paths are actually being used.
For detailed information about using decorators (legacy and ES spec) and metadata providers, see the [Using Decorators guide](https://mikro-orm.io/docs/using-decorators). For glob-based entity discovery, see [Folder-based Discovery](https://mikro-orm.io/docs/folder-based-discovery).
> For larger projects, you can use `npx mikro-orm discovery:export` to auto-generate a barrel file with all your entity imports. See [Folder-based Discovery](https://mikro-orm.io/docs/folder-based-discovery#generating-a-barrel-file-with-discoveryexport) for details.
## Synchronous initialization[​](https://mikro-orm.io/docs/quick-start#synchronous-initialization "Direct link to Synchronous initialization")
As opposed to the async [`MikroORM.init`](https://mikro-orm.io/api/core/class/MikroORM#init) method, you can prefer to use synchronous variant with the constructor: [`new MikroORM()`](https://mikro-orm.io/api/core/class/MikroORM#constructor).
```
const orm = new MikroORM({ ... });  
```
This method has some limitations:
  * folder-based discovery not supported
  * ORM extensions are not auto-loaded
  * when metadata cache is enabled, `FileCacheAdapter` needs to be explicitly set in the config
## RequestContext helper[​](https://mikro-orm.io/docs/quick-start#requestcontext-helper "Direct link to RequestContext helper")
Now you will need to fork entity manager for each request so their [identity maps](https://mikro-orm.io/identity-map/) will not collide. To do so, use the `RequestContext` helper:
```
const app = express();  
  
app.use((req, res, next) => {  
  RequestContext.create(orm.em, next);  
});  
```
> You should register this middleware as the last one just before request handlers and before any of your custom middleware that is using the ORM. There might be issues when you register it before request processing middleware like `queryParser` or `bodyParser`, so definitely register the context after them.
More info about `RequestContext` is described [here](https://mikro-orm.io/docs/identity-map#request-context).
## Entity definition[​](https://mikro-orm.io/docs/quick-start#entity-definition "Direct link to Entity definition")
Now you can start defining your entities. MikroORM supports multiple approaches:
  * defineEntity + class
  * defineEntity
  * decorators
The `defineEntity` helper with a class extension gives you clean named types and a natural place for custom methods:
./entities/Book.ts
```
import { defineEntity, p } from '@mikro-orm/core';  
  
const BookSchema = defineEntity({  
  name: 'Book',  
  properties: {  
    id: p.bigint().primary(),  
    title: p.string(),  
    author: () => p.manyToOne(Author),  
    tags: () => p.manyToMany(BookTag),  
  },  
});  
  
export class Book extends BookSchema.class {}  
BookSchema.setClass(Book);  
```
The `defineEntity` helper provides full type inference without decorators:
./entities/Book.ts
```
import { defineEntity, InferEntity, p } from '@mikro-orm/core';  
  
export const Book = defineEntity({  
  name: 'Book',  
  properties: {  
    id: p.bigint().primary(),  
    title: p.string(),  
    author: () => p.manyToOne(Author),  
    tags: () => p.manyToMany(BookTag),  
  },  
});  
  
export type IBook = InferEntity<typeof Book>;  
```
Decorators require additional setup - see the [Using Decorators guide](https://mikro-orm.io/docs/using-decorators) for configuration details:
./entities/Book.ts
```
import { Collection } from '@mikro-orm/core';  
import { Entity, PrimaryKey, Property, ManyToOne, ManyToMany } from '@mikro-orm/decorators/legacy';  
  
@Entity()  
export class Book {  
  
  @PrimaryKey()  
  id!: bigint;  
  
  @Property()  
  title!: string;  
  
  @ManyToOne(() => Author)  
  author!: Author;  
  
  @ManyToMany(() => BookTag)  
  tags = new Collection<BookTag>(this);  
  
}  
```
For UUID primary keys, use `p.uuid()` with `defineEntity`, `@PrimaryKey({ type: 'uuid' })` with decorators, or `{ type: 'uuid', primary: true }` with `EntitySchema`.
More information can be found in the [Defining Entities section](https://mikro-orm.io/docs/defining-entities) in docs.
## EntityManager[​](https://mikro-orm.io/docs/quick-start#entitymanager "Direct link to EntityManager")
When you have your entities defined, you can start using ORM via `EntityManager`.
To save entity state to database, you need to persist it. Persist determines whether to use `insert` or `update` and computes appropriate change-set. Entity references that are not persisted yet (does not have identifier) will be cascade persisted automatically.
```
// use em.create() to create entity instances  
const author = em.create(Author, {  
  name: 'Jon Snow',  
  email: 'snow@wall.st',  
  born: new Date(),  
});  
  
const publisher = em.create(Publisher, { name: '7K publisher' });  
  
const book1 = em.create(Book, {  
  title: 'My Life on The Wall, part 1',  
  author,  
  publisher,  
});  
const book2 = em.create(Book, {  
  title: 'My Life on The Wall, part 2',  
  author,  
  publisher,  
});  
const book3 = em.create(Book, {  
  title: 'My Life on The Wall, part 3',  
  author,  
  publisher,  
});  
  
// em.create() auto-persists by default, so just flush  
await em.flush();  
```
To fetch entities from database you can use `find()` and `findOne()` of `EntityManager`:
```
const authors = em.findAll(Author, {  
  populate: ['books'],  
});  
  
for (const author of authors) {  
  console.log(author); // instance of Author entity  
  console.log(author.name); // Jon Snow  
  
  for (const book of author.books) { // iterating books collection  
    console.log(book); // instance of Book entity  
    console.log(book.title); // My Life on The Wall, part 1/2/3  
  }  
}  
```
Take a look at docs about [working with `EntityManager`](https://mikro-orm.io/docs/entity-manager).
## Setting up the Commandline Tool[​](https://mikro-orm.io/docs/quick-start#setting-up-the-commandline-tool "Direct link to Setting up the Commandline Tool")
MikroORM ships with a number of command line tools that are very helpful during development, like `SchemaGenerator` and `EntityGenerator`. You can call this command from the NPM binary directory or use `npx`:
```
# install the CLI package first!  
$ yarn add --dev @mikro-orm/cli  
  
# manually  
$ node node_modules/.bin/mikro-orm  
  
# via npx  
$ npx mikro-orm  
  
# or via yarn  
$ yarn mikro-orm  
```
> To work with the CLI, first install `@mikro-orm/cli` package locally. The version needs to be aligned with the `@mikro-orm/core` package.
For CLI to be able to access your database, you will need to create a configuration file that exports your ORM configuration(s).
By default, the following paths, relative to the current working directory, are searched in this order:
  1. `./src/mikro-orm.config.ts`
  2. `./mikro-orm.config.ts`
  3. `./dist/mikro-orm.config.js`
  4. `./build/mikro-orm.config.js`
  5. `./src/mikro-orm.config.js`
  6. `./mikro-orm.config.js`
You can set up array of possible paths to ORM config files in `package.json`. The `package.json` file can be located in the current working directory, or in one of its parent folders.
./package.json
```
{  
  "name": "your-app",  
  "dependencies": { ... },  
  "mikro-orm": {  
    "configPaths": [  
      "./src/mikro-orm.config.ts",  
      "./dist/mikro-orm.config.js"  
    ]  
  }  
}  
```
Another way to control these CLI-related settings is with the environment variables:
  * `MIKRO_ORM_CLI_CONFIG`: the path to ORM config file
  * `MIKRO_ORM_CLI_PREFER_TS`: enforce use of the TS paths (e.g. `entitiesTs` or `pathTs`)
  * `MIKRO_ORM_CLI_TS_LOADER`: set preferred TS loader (one of `oxc`, `swc`, `tsx`, `jiti`, `tsimp`)
  * `MIKRO_ORM_CLI_TS_CONFIG_PATH`: path to the tsconfig.json (for TS support)
  * `MIKRO_ORM_CLI_ALWAYS_ALLOW_TS`: enable `.ts` files to use without detected TS support
  * `MIKRO_ORM_CLI_VERBOSE`: enable verbose logging (e.g. print queries used in seeder or schema diffing)
MikroORM will always try to load the first available config file, based on the order in `configPaths`. When the TypeScript support is not detected, TS config files will be ignored. You can enforce using TS config files via `MIKRO_ORM_CLI_PREFER_TS` environment variable or `preferTs` flag in your `package.json`:
./package.json
```
"mikro-orm": {  
  "preferTs": true  
}  
```
You can also specify the config path via `--config` option, when it points to a TS file, the `preferTs` flag will be enabled implicitly:
```
$ npx mikro-orm debug --config ./my-config.ts  
```
Your configuration file may export multiple configuration objects in an array. The different configurations must have a `contextName` in them. If no `contextName` is specified, it is treated as the name "default". You can use the `MIKRO_ORM_CONTEXT_NAME` environment variable or the `--contextName` command line option to pick a configuration with a particular `contextName` to use for the CLI. See [below](https://mikro-orm.io/docs/quick-start#configuration-file-structure) for details on the config object.
All available commands are listed in the CLI help:
```
$ npx mikro-orm  
  
Usage: mikro-orm <command> [options]  
  
Commands:  
  mikro-orm cache:clear             Clear metadata cache  
  mikro-orm cache:generate          Generate metadata cache  
  mikro-orm generate-entities       Generate entities based on current database  
                                    schema  
  mikro-orm database:create         Create your database if it does not exist  
  mikro-orm database:import <file>  Imports the SQL file to the database  
  mikro-orm seeder:run              Seed the database using the seeder class  
  mikro-orm seeder:create <seeder>  Create a new seeder class  
  mikro-orm schema:create           Create database schema based on current  
                                    metadata  
  mikro-orm schema:drop             Drop database schema based on current  
                                    metadata  
  mikro-orm schema:update           Update database schema based on current  
                                    metadata  
  mikro-orm schema:fresh            Drop and recreate database schema based on  
                                    current metadata  
  mikro-orm migration:create        Create new migration with current schema  
                                    diff  
  mikro-orm migration:up            Migrate up to the latest version  
  mikro-orm migration:down          Migrate one step down  
  mikro-orm migration:list          List all executed migrations  
  mikro-orm migration:check         Check if migrations are needed. Useful for  
                                    bash scripts.  
  mikro-orm migration:pending       List all pending migrations  
  mikro-orm migration:fresh         Clear the database and rerun all migrations  
  mikro-orm debug                   Debug CLI configuration  
  
Options:  
      --config       Set path to the ORM configuration file              [array]  
      --contextName  Set name of config to load out of the ORM configuration  
                     file. Used when config file exports an array or a function  
                                                   [string] [default: "default"]  
  -v, --version      Show version number                               [boolean]  
  -h, --help         Show help                                         [boolean]  
  
Examples:  
  mikro-orm schema:update --run  Runs schema synchronization  
```
To verify your setup, you can use `mikro-orm debug` command.
## Configuration file structure[​](https://mikro-orm.io/docs/quick-start#configuration-file-structure "Direct link to Configuration file structure")
Preferred way of creating to the configuration object is with the `defineConfig` helper. It will provide intellisense even in JavaScript files, without the need for type hints via jsdoc:
```
import { defineConfig } from '@mikro-orm/sqlite';  
  
export default defineConfig({  
  entities: [Author, Book, BookTag],  
  dbName: 'my-db-name',  
  // this is inferred as you import `defineConfig` from sqlite package  
  // driver: SqliteDriver,  
});  
```
Using `defineConfig` also automatically infers the driver option for you if you import the helper from the driver package. This means you don't have to provide the `driver` option explicitly.
Alternatively, you can use the `Partial<Options>` type:
./src/mikro-orm.config.ts
```
import { Options } from '@mikro-orm/sqlite';  
  
const config: Partial<Options> = {  
  entities: [Author, Book, BookTag],  
  dbName: 'my-db-name',  
  driver: SqliteDriver,  
};  
  
export default config;  
```
You can also export array of different configs for different purposes. For example, you may export one config object for CLI, and another for your app. Each config in the array needs to have a distinct `contextName` value (omitting it is same as setting it to "default"), like so:
```
import { defineConfig } from '@mikro-orm/postgresql';  
  
export default [  
  defineConfig({  
    contextName: 'default',  
    entities: [Author, Book, BookTag],  
    dbName: 'my-db-name',  
    user: 'app',  
    // other credentials and settings  
  }),  
  defineConfig({  
    contextName: 'super',  
    entities: [Author, Book, BookTag],  
    dbName: 'my-db-name',  
    user: 'admin',  
    // other credentials and settings  
  }),  
];  
```
Which in turn enables you to run `MikroORM.init()` in your app without arguments (and connect with the user "app"), while in CLI (where you may need higher privileges), you can use
```
$ npx mikro-orm --contextName=super  
```
You can also export a function, which will be called with a `contextName` parameter. That function should return a configuration object for the provided `contextName`, a promise resolving to a configuration object for that `contextName`, or nothing if you wish to error on that name instead. This can be particularly useful in multi-tenant setups.
For example, if you have
```
import { defineConfig } from '@mikro-orm/postgresql';  
  
export default (contextName: string) => defineConfig({  
  entities: [Author, Book, BookTag],  
  dbName: `tenant_${contextName}`,  
  user: 'app',  
  // other credentials and settings  
});  
```
then you will need to start your app with the `MIKRO_ORM_CONTEXT_NAME` environment variable set to `example1` to load the database `tenant_example1`, and similarly, when running CLI, you can use
```
$ npx mikro-orm --contextName=example1  
```
to operate on that particular tenant's database instance. Not specifying either option will point you to the "tenant_default" database.
You can also combine arrays and factory functions. Array members will be preferred, and any functions in the array will be executed from top to bottom. The first function to return an object will be what ends up being used.
For example, you can have in your config file
```
import { defineConfig } from '@mikro-orm/postgresql';  
  
export default [  
  defineConfig({  
    contextName: 'default',  
    entities: [Author, Book, BookTag],  
    dbName: 'demo',  
    user: 'app',  
    // other credentials and settings  
  }),  
  defineConfig({  
    contextName: 'super',  
    entities: [Author, Book, BookTag],  
    dbName: 'demo',  
    user: 'admin',  
    // other credentials and settings  
  }),  
  (contextName: string) => {  
    if (!contextName.startsWith('use:')) {  
        return;  
    }  
    return defineConfig({  
      contextName,  
      entities: [Author, Book, BookTag],  
      dbName: `tenant_${contextName.split(':', 2)[1]}`,  
      user: 'app',  
      // other credentials and settings  
    });  
  },  
  (contextName: string) => {  
    if (!contextName.startsWith('edit:')) {  
      return;  
    }  
    return defineConfig({  
      contextName,  
      entities: [Author, Book, BookTag],  
      dbName: `tenant_${contextName.split(':', 2)[1]}`,  
      user: 'admin',  
      // other credentials and settings  
    });  
  }  
];  
```
which will let you run the "demo" database with "app" user whenever you do not specify `MIKRO_ORM_CONTEXT_NAME` or the `--contextName` option in CLI. Specifying "super" for the name will run the "demo" database with the "admin" user, specifying "use:example1" will load the "tenant_example1" database with the "app" user, and specifying "edit:example1" will load the "tenant_example1" database with the "admin" user.
[](https://github.com/mikro-orm/mikro-orm/edit/master/docs/versioned_docs/version-7.1/quick-start.md)
Last updated on **May 20, 2026** by **Martin Adámek**
[Next Getting Started Guide](https://mikro-orm.io/docs/guide)
  * [Installation](https://mikro-orm.io/docs/quick-start#installation)
  * [Entity Discovery](https://mikro-orm.io/docs/quick-start#entity-discovery)
  * [Synchronous initialization](https://mikro-orm.io/docs/quick-start#synchronous-initialization)
  * [RequestContext helper](https://mikro-orm.io/docs/quick-start#requestcontext-helper)
  * [Entity definition](https://mikro-orm.io/docs/quick-start#entity-definition)
  * [EntityManager](https://mikro-orm.io/docs/quick-start#entitymanager)
  * [Setting up the Commandline Tool](https://mikro-orm.io/docs/quick-start#setting-up-the-commandline-tool)
  * [Configuration file structure](https://mikro-orm.io/docs/quick-start#configuration-file-structure)
#### Docs
  * [Quick Start](https://mikro-orm.io/docs/quick-start)
  * [Getting Started](https://mikro-orm.io/docs/guide)
  * [Migration from v6 to v7](https://mikro-orm.io/docs/upgrading-v6-to-v7)
  * [Version 6.6 docs](https://mikro-orm.io/docs/6.6/quick-start)
#### Community
  * [Discord](https://discord.gg/w8bjxFHS7X)
  * [Slack](https://join.slack.com/t/mikroorm/shared_invite/enQtNTM1ODYzMzM4MDk3LWM4ZDExMjU5ZDhmNjA2MmM3MWMwZmExNjhhNDdiYTMwNWM0MGY5ZTE3ZjkyZTMzOWExNDgyYmMzNDE1NDI5NjA)
  * [Stack Overflow](https://stackoverflow.com/questions/ask?tags=mikro-orm)
#### Social
  * [Blog](https://mikro-orm.io/blog)
  * [Twitter](https://twitter.com/MikroORM)
  * [GitHub](https://github.com/mikro-orm/mikro-orm)
  * [GitHub Sponsors](https://github.com/sponsors/mikro-orm)
![MikroORM](https://mikro-orm.io/img/logo-header.svg)
Copyright © 2018-2026 Martin Adámek. Built with Docusaurus.
============================================================
# https://mikro-orm.io/
============================================================
[Skip to main content](https://mikro-orm.io/#__docusaurus_skipToContent_fallback)
⭐️ If you like MikroORM, give it a star on [GitHub](https://github.com/mikro-orm/mikro-orm) and consider [sponsoring](https://github.com/sponsors/mikro-orm) its development! ⭐️
[![MikroORM](https://mikro-orm.io/img/logo.svg)](https://mikro-orm.io/)
[7.1](https://mikro-orm.io/docs/quick-start)
  * [Next](https://mikro-orm.io/docs/next/quick-start)
  * [7.1](https://mikro-orm.io/docs/quick-start)
  * [7.0](https://mikro-orm.io/docs/7.0/quick-start)
  * [6.6](https://mikro-orm.io/docs/6.6/quick-start)
  * [5.9](https://mikro-orm.io/docs/5.9/installation)
[Docs](https://mikro-orm.io/docs/quick-start)[API](https://mikro-orm.io/api)[Blog](https://mikro-orm.io/blog)[Changelog](https://mikro-orm.io/changelog)
[latest: v7.1.3](https://mikro-orm.io/versions)[Discord](https://discord.gg/w8bjxFHS7X "Chat on Discord")[GitHub](https://github.com/mikro-orm/mikro-orm "View on GitHub")[Twitter](https://twitter.com/MikroORM "Twitter")
Search`Ctrl``K`
# TypeScript ORM built on _proven patterns_
Based on Data Mapper, Unit of Work, and Identity Map patterns. Build type-safe, performant database layers with minimal boilerplate.
$npm install @mikro-orm/postgresql
[Get Started](https://mikro-orm.io/docs/guide)[GitHub](https://github.com/mikro-orm/mikro-orm)
[](https://github.com/sponsors/b4nan)
## Why MikroORM?
A modern ORM that gets out of your way and lets you focus on your domain
### [Unit of Work & Identity Map Automatic change tracking and batched queries. All changes are wrapped in implicit transactions when you call em.flush().](https://mikro-orm.io/docs/unit-of-work)### [Fully Type-Safe Type-safe queries, populate hints, and entity operations. Even string-based filters and relations are validated at compile time.](https://mikro-orm.io/docs/type-safe-relations)### [Multiple Entity Definition Styles Choose your style: defineEntity with full type inference, decorators, or EntitySchema. No lock-in to a single approach.](https://mikro-orm.io/docs/defining-entities)### [Filters & Soft Delete Global and entity-level query filters for multi-tenancy, soft deletes, and more. Applied automatically to every query.](https://mikro-orm.io/docs/filters)### [SQL & NoSQL First-class support for MongoDB, PostgreSQL, MySQL, MariaDB, SQLite, libSQL, MS SQL Server, and more.](https://mikro-orm.io/docs/usage-with-sql)### [Schema Management Prototype with SchemaGenerator, version with Migrations, or introspect existing databases with EntityGenerator.](https://mikro-orm.io/docs/migrations)### [Smart Populate & Loading Type-checked populate hints with auto-joined loading strategies. Control exactly what gets loaded and how.](https://mikro-orm.io/docs/populating-relations)### [Events & Lifecycle Powerful event system with entity lifecycle hooks, onFlush events, and metadata-aware QueryBuilder.](https://mikro-orm.io/docs/events)### [Seeding & Factories Seed your database with realistic test data using entity factories. Define reusable blueprints and generate data for development and testing.](https://mikro-orm.io/docs/seeding)### [First-Class Kysely Integration Use Kysely's type-safe SQL query builder directly with your MikroORM entities. Full autocompletion for table and column names.](https://mikro-orm.io/docs/kysely)
### [Unit of Work & Identity Map Automatic change tracking and batched queries. All changes are wrapped in implicit transactions when you call em.flush().](https://mikro-orm.io/docs/unit-of-work)### [Fully Type-Safe Type-safe queries, populate hints, and entity operations. Even string-based filters and relations are validated at compile time.](https://mikro-orm.io/docs/type-safe-relations)### [Multiple Entity Definition Styles Choose your style: defineEntity with full type inference, decorators, or EntitySchema. No lock-in to a single approach.](https://mikro-orm.io/docs/defining-entities)### [Filters & Soft Delete Global and entity-level query filters for multi-tenancy, soft deletes, and more. Applied automatically to every query.](https://mikro-orm.io/docs/filters)### [SQL & NoSQL First-class support for MongoDB, PostgreSQL, MySQL, MariaDB, SQLite, libSQL, MS SQL Server, and more.](https://mikro-orm.io/docs/usage-with-sql)### [Schema Management Prototype with SchemaGenerator, version with Migrations, or introspect existing databases with EntityGenerator.](https://mikro-orm.io/docs/migrations)### [Smart Populate & Loading Type-checked populate hints with auto-joined loading strategies. Control exactly what gets loaded and how.](https://mikro-orm.io/docs/populating-relations)### [Events & Lifecycle Powerful event system with entity lifecycle hooks, onFlush events, and metadata-aware QueryBuilder.](https://mikro-orm.io/docs/events)### [Seeding & Factories Seed your database with realistic test data using entity factories. Define reusable blueprints and generate data for development and testing.](https://mikro-orm.io/docs/seeding)### [First-Class Kysely Integration Use Kysely's type-safe SQL query builder directly with your MikroORM entities. Full autocompletion for table and column names.](https://mikro-orm.io/docs/kysely)### [Unit of Work & Identity Map Automatic change tracking and batched queries. All changes are wrapped in implicit transactions when you call em.flush().](https://mikro-orm.io/docs/unit-of-work)### [Fully Type-Safe Type-safe queries, populate hints, and entity operations. Even string-based filters and relations are validated at compile time.](https://mikro-orm.io/docs/type-safe-relations)### [Multiple Entity Definition Styles Choose your style: defineEntity with full type inference, decorators, or EntitySchema. No lock-in to a single approach.](https://mikro-orm.io/docs/defining-entities)### [Filters & Soft Delete Global and entity-level query filters for multi-tenancy, soft deletes, and more. Applied automatically to every query.](https://mikro-orm.io/docs/filters)### [SQL & NoSQL First-class support for MongoDB, PostgreSQL, MySQL, MariaDB, SQLite, libSQL, MS SQL Server, and more.](https://mikro-orm.io/docs/usage-with-sql)### [Schema Management Prototype with SchemaGenerator, version with Migrations, or introspect existing databases with EntityGenerator.](https://mikro-orm.io/docs/migrations)### [Smart Populate & Loading Type-checked populate hints with auto-joined loading strategies. Control exactly what gets loaded and how.](https://mikro-orm.io/docs/populating-relations)### [Events & Lifecycle Powerful event system with entity lifecycle hooks, onFlush events, and metadata-aware QueryBuilder.](https://mikro-orm.io/docs/events)### [Seeding & Factories Seed your database with realistic test data using entity factories. Define reusable blueprints and generate data for development and testing.](https://mikro-orm.io/docs/seeding)### [First-Class Kysely Integration Use Kysely's type-safe SQL query builder directly with your MikroORM entities. Full autocompletion for table and column names.](https://mikro-orm.io/docs/kysely)
## Supported Databases
One API, multiple database backends
[![PostgreSQL](https://mikro-orm.io/img/databases/postgresql.svg)PostgreSQL](https://mikro-orm.io/docs/usage-with-sql)[![MySQL](https://mikro-orm.io/img/databases/mysql.svg)MySQL](https://mikro-orm.io/docs/usage-with-sql)[![MariaDB](https://mikro-orm.io/img/databases/mariadb.svg)MariaDB](https://mikro-orm.io/docs/usage-with-sql)[![SQLite](https://mikro-orm.io/img/databases/sqlite.svg)SQLite](https://mikro-orm.io/docs/usage-with-sqlite)[![MongoDB](https://mikro-orm.io/img/databases/mongodb.svg)MongoDB](https://mikro-orm.io/docs/usage-with-mongo)[![MS SQL](https://mikro-orm.io/img/databases/mssql.svg)MS SQL](https://mikro-orm.io/docs/usage-with-sql#ms-sql-server-limitations)[![libSQL](https://mikro-orm.io/img/databases/libsql.svg)libSQL](https://mikro-orm.io/docs/usage-with-sqlite#using-libsql--turso)[![CockroachDB](https://mikro-orm.io/img/databases/cockroachdb.svg)CockroachDB](https://mikro-orm.io/docs/usage-with-cockroachdb)[![Oracle](https://mikro-orm.io/img/databases/oracle.svg)Oracle](https://mikro-orm.io/docs/usage-with-sql#oracle-limitations)[![Turso](https://mikro-orm.io/img/databases/turso.svg)Turso](https://mikro-orm.io/docs/usage-with-sqlite#using-turso-embedded-database)[![Cloudflare D1](https://mikro-orm.io/img/databases/cloudflare-d1.svg)Cloudflare D1](https://mikro-orm.io/docs/usage-with-sqlite#using-cloudflare-d1)[![PGlite](https://mikro-orm.io/img/databases/pglite.svg)PGlite](https://mikro-orm.io/docs/usage-with-pglite)
## Define, Query, Done
Define entities your way, query with a clean type-safe API
defineEntityreflect-metadatats-morphEntitySchema
```
import { defineEntity, InferEntity, p } from '@mikro-orm/core';  
  
export const Book = defineEntity({  
  name: 'Book',  
  properties: {  
    id: p.number().primary(),  
    title: p.string(),  
    author: () => p.manyToOne(Author).ref(),  
    tags: () => p.manyToMany(Tag),  
  },  
});  
  
export type IBook = InferEntity<typeof Book>;  
```
EntityManagerQueryBuilderKyselyLoaded Type
```
// fully type-safe queries  
const books = await em.find(Book, {  
  author: { name: 'Tolkien' },  
}, {  
  populate: ['author.profile'], // type-checked!  
  orderBy: { title: 'asc' },  
});  
  
// all changes are tracked automatically  
books[0].title = 'Updated Title';  
em.remove(books[1]);  
  
// single flush = one transaction, batched queries  
await em.flush();  
```
## Join the Community
[](https://github.com/mikro-orm/mikro-orm)[](https://github.com/sponsors/b4nan)[](https://discord.gg/w8bjxFHS7X)
#### Docs
  * [Quick Start](https://mikro-orm.io/docs/quick-start)
  * [Getting Started](https://mikro-orm.io/docs/guide)
  * [Migration from v6 to v7](https://mikro-orm.io/docs/upgrading-v6-to-v7)
  * [Version 6.6 docs](https://mikro-orm.io/docs/6.6/quick-start)
#### Community
  * [Discord](https://discord.gg/w8bjxFHS7X)
  * [Slack](https://join.slack.com/t/mikroorm/shared_invite/enQtNTM1ODYzMzM4MDk3LWM4ZDExMjU5ZDhmNjA2MmM3MWMwZmExNjhhNDdiYTMwNWM0MGY5ZTE3ZjkyZTMzOWExNDgyYmMzNDE1NDI5NjA)
  * [Stack Overflow](https://stackoverflow.com/questions/ask?tags=mikro-orm)
#### Social
  * [Blog](https://mikro-orm.io/blog)
  * [Twitter](https://twitter.com/MikroORM)
  * [GitHub](https://github.com/mikro-orm/mikro-orm)
  * [GitHub Sponsors](https://github.com/sponsors/mikro-orm)
![MikroORM](https://mikro-orm.io/img/logo-header.svg)
Copyright © 2018-2026 Martin Adámek. Built with Docusaurus.
============================================================
# https://mikro-orm.io/docs/5.9/installation
============================================================
[Skip to main content](https://mikro-orm.io/docs/5.9/installation#__docusaurus_skipToContent_fallback)
⭐️ If you like MikroORM, give it a star on [GitHub](https://github.com/mikro-orm/mikro-orm) and consider [sponsoring](https://github.com/sponsors/mikro-orm) its development! ⭐️
[![MikroORM](https://mikro-orm.io/img/logo.svg)](https://mikro-orm.io/)
[5.9](https://mikro-orm.io/docs/5.9/installation)
  * [Next](https://mikro-orm.io/docs/next/quick-start)
  * [7.1](https://mikro-orm.io/docs/quick-start)
  * [7.0](https://mikro-orm.io/docs/7.0/quick-start)
  * [6.6](https://mikro-orm.io/docs/6.6/quick-start)
  * [5.9](https://mikro-orm.io/docs/5.9/installation)
[Docs](https://mikro-orm.io/docs/quick-start)[API](https://mikro-orm.io/api)[Blog](https://mikro-orm.io/blog)[Changelog](https://mikro-orm.io/changelog)
[latest: v7.1.3](https://mikro-orm.io/versions)[Discord](https://discord.gg/w8bjxFHS7X "Chat on Discord")[GitHub](https://github.com/mikro-orm/mikro-orm "View on GitHub")[Twitter](https://twitter.com/MikroORM "Twitter")
Search`Ctrl``K`
  * [Overview](https://mikro-orm.io/docs/5.9/installation)
    * [Installation & Usage](https://mikro-orm.io/docs/5.9/installation)
    * [Defining Entities](https://mikro-orm.io/docs/5.9/defining-entities)
    * [Modeling Entity Relationships](https://mikro-orm.io/docs/5.9/relationships)
    * [Entity Manager](https://mikro-orm.io/docs/5.9/entity-manager)
    * [Unit of Work](https://mikro-orm.io/docs/5.9/unit-of-work)
  * [Fundamentals](https://mikro-orm.io/docs/5.9/fundamentals)
  * [Advanced Features](https://mikro-orm.io/docs/5.9/advanced)
  * [Reference](https://mikro-orm.io/docs/5.9/reference)
  * [Usage with Different Drivers](https://mikro-orm.io/docs/5.9/drivers)
  * [Recipes](https://mikro-orm.io/docs/5.9/recipes)
  * [Example Integrations](https://mikro-orm.io/docs/5.9/examples)
  * [Upgrading](https://mikro-orm.io/docs/5.9/upgrading)
This is documentation for MikroORM **5.9** , which is no longer actively maintained.
For up-to-date documentation, see the **[latest version](https://mikro-orm.io/docs/quick-start)** (7.1).
  * [](https://mikro-orm.io/)
  * Overview
Version: 5.9
On this page
# Installation & Usage
First install the module via `yarn` or `npm` and do not forget to install the driver package as well:
> Since v4, we should install the driver package, but not the db connector itself, e.g. install `@mikro-orm/sqlite`, but not `sqlite3` as that is already included in the driver package.
```
yarn add @mikro-orm/core @mikro-orm/mongodb     # for mongo  
yarn add @mikro-orm/core @mikro-orm/mysql       # for mysql/mariadb  
yarn add @mikro-orm/core @mikro-orm/mariadb     # for mysql/mariadb  
yarn add @mikro-orm/core @mikro-orm/postgresql  # for postgresql  
yarn add @mikro-orm/core @mikro-orm/sqlite      # for sqlite  
```
or
```
npm i -s @mikro-orm/core @mikro-orm/mongodb     # for mongo  
npm i -s @mikro-orm/core @mikro-orm/mysql       # for mysql/mariadb  
npm i -s @mikro-orm/core @mikro-orm/mariadb     # for mysql/mariadb  
npm i -s @mikro-orm/core @mikro-orm/postgresql  # for postgresql  
npm i -s @mikro-orm/core @mikro-orm/sqlite      # for sqlite  
```
Next we will need to enable support for [decorators](https://www.typescriptlang.org/docs/handbook/decorators.html) as well as `esModuleInterop` in `tsconfig.json` via:
```
"experimentalDecorators": true,  
"emitDecoratorMetadata": true,  
"esModuleInterop": true,  
```
Then call `MikroORM.init` as part of bootstrapping our app:
> To access driver specific methods like `em.createQueryBuilder()` we need to specify the driver type when calling `MikroORM.init<D>()`. Alternatively we can cast the `orm.em` to `EntityManager` exported from the driver package:
> 
```
> 
import { EntityManager } from '@mikro-orm/postgresql';  
> 
> 
> 
const em = orm.em as EntityManager;  
> 
> 
> 
const qb = em.createQueryBuilder(...);  
> 
> 
```
```
import type { PostgreSqlDriver } from '@mikro-orm/postgresql'; // or any other driver package  
  
const orm = await MikroORM.init<PostgreSqlDriver>({  
  entities: ['./dist/entities'], // path to our JS entities (dist), relative to `baseDir`  
  entitiesTs: ['./src/entities'], // path to our TS entities (src), relative to `baseDir`  
  dbName: 'my-db-name',  
  type: 'postgresql',  
});  
console.log(orm.em); // access EntityManager via `em` property  
```
> Read more about all the possible configuration options in [Advanced Configuration](https://mikro-orm.io/docs/5.9/configuration) section.
We can also provide paths where we store our entities via `entities` array. Internally it uses [`globby`](https://github.com/sindresorhus/globby) so we can use [globbing patterns](https://github.com/sindresorhus/globby#globbing-patterns), including negative globs.
```
const orm = await MikroORM.init<PostgreSqlDriver>({  
  entities: ['./dist/app/**/entities'],  
  entitiesTs: ['./src/app/**/entities'],  
  // ...  
});  
```
If we are experiencing problems with folder based discovery, try using `mikro-orm debug` CLI command to check what paths are actually being used.
> Since v4, we can also use file globs, like `./dist/app/**/entities/*.entity.js`.
We can also set the configuration via [environment variables](https://mikro-orm.io/docs/5.9/configuration#using-environment-variables).
> We can pass additional options to the underlying driver (e.g. `mysql2`) via `driverOptions`. The object will be deeply merged, overriding all internally used options.
## Possible issues with circular dependencies[​](https://mikro-orm.io/docs/5.9/installation#possible-issues-with-circular-dependencies "Direct link to Possible issues with circular dependencies")
Our entities will most probably contain circular dependencies (e.g. if we use bi-directional relationship). While this is fine, there might be issues caused by wrong order of entities during discovery, especially when we are using the folder based way.
The errors caused by circular dependencies are usually similar to this one:
```
TypeError: Cannot read property 'name' of undefined  
    at Function.className (/path/to/project/node_modules/mikro-orm/dist/utils/Utils.js:253:28)  
    at TsMorphMetadataProvider.extractType (/path/to/project/node_modules/mikro-orm/dist/metadata/TsMorphMetadataProvider.js:37:34)  
    at TsMorphMetadataProvider.initProperties (/path/to/project/node_modules/mikro-orm/dist/metadata/TsMorphMetadataProvider.js:25:31)  
    at TsMorphMetadataProvider.loadEntityMetadata (/path/to/project/node_modules/mikro-orm/dist/metadata/TsMorphMetadataProvider.js:16:9)  
    at MetadataDiscovery.discoverEntity (/path/to/project/node_modules/mikro-orm/dist/metadata/MetadataDiscovery.js:109:9)  
    at MetadataDiscovery.discoverDirectory (/path/to/project/node_modules/mikro-orm/dist/metadata/MetadataDiscovery.js:80:13)  
    at Function.runSerial (/path/to/project/node_modules/mikro-orm/dist/utils/Utils.js:303:22)  
    at MetadataDiscovery.findEntities (/path/to/project/node_modules/mikro-orm/dist/metadata/MetadataDiscovery.js:56:13)  
    at MetadataDiscovery.discover (/path/to/project/node_modules/mikro-orm/dist/metadata/MetadataDiscovery.js:30:9)  
    at Function.init (/path/to/project/node_modules/mikro-orm/dist/MikroORM.js:45:24)  
    at Function.handleSchemaCommand (/path/to/project/node_modules/mikro-orm/dist/cli/SchemaCommandFactory.js:51:21)  
```
If we encounter this, we have basically two options:
  * Use entity references in `entities` array to have control over the order of discovery. We might need to play with the actual order we provide here, or possibly with the order of import statements.
  * Use strings instead of references (e.g. `@OneToMany('Book', 'author')`). The downside here is that we will lose the typechecking capabilities of the decorators.
## Entity Discovery in TypeScript[​](https://mikro-orm.io/docs/5.9/installation#entity-discovery-in-typescript "Direct link to Entity Discovery in TypeScript")
In v4 the default metadata provider is `ReflectMetadataProvider`. If we want to use `ts-morph` based discovery (that reads actual TS types via the compiler API), we need to install `@mikro-orm/reflection`.
```
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';  
  
const orm = await MikroORM.init<PostgreSqlDriver>({  
  metadataProvider: TsMorphMetadataProvider,  
  // ...  
});  
```
Read more about the differences in [Metadata Providers section](https://mikro-orm.io/docs/5.9/metadata-providers).
```
const orm = await MikroORM.init<PostgreSqlDriver>({  
  entities: ['./dist/entities/**/*.js'], // path to our JS entities (dist), relative to `baseDir`  
  entitiesTs: ['./src/entities/**/*.ts'], // path to our TS entities (source), relative to `baseDir`  
  // ...  
});  
```
> It is important that `entities` will point to the compiled JS files, and `entitiesTs` will point to the TS source files. We should not mix those.
> For `ts-morph` discovery to work in production, we need to deploy `.d.ts` declaration files. Be sure to enable `compilerOptions.declaration` in our `tsconfig.json`.
We can also use different [metadata provider](https://mikro-orm.io/docs/5.9/metadata-providers) or even write custom one:
  * `ReflectMetadataProvider` that uses `reflect-metadata` instead of `ts-morph`
  * `JavaScriptMetadataProvider` that allows us to manually provide the entity schema (mainly for Vanilla JS)
> Using [`EntitySchema`](https://mikro-orm.io/docs/5.9/entity-schema) is another way to define our entities, which is better suited than using `JavaScriptMetadataProvider`.
```
const orm = await MikroORM.init<PostgreSqlDriver>({  
  // default in v4, so not needed to specify explicitly  
  metadataProvider: ReflectMetadataProvider,  
  // ...  
});  
```
## Request Context[​](https://mikro-orm.io/docs/5.9/installation#request-context "Direct link to Request Context")
Then we will need to fork Entity Manager for each request so their identity maps will not collide. To do so, we can use the `RequestContext` helper:
```
const app = express();  
  
app.use((req, res, next) => {  
  RequestContext.create(orm.em, next);  
});  
```
> If the `next` handler needs to be awaited (like in Koa), use `RequestContext.createAsync()` instead.
> 
```
> 
app.use((ctx, next) => RequestContext.createAsync(orm.em, next));  
> 
> 
```
More info about `RequestContext` is described [here](https://mikro-orm.io/docs/5.9/identity-map#request-context).
## Setting up the Commandline Tool[​](https://mikro-orm.io/docs/5.9/installation#setting-up-the-commandline-tool "Direct link to Setting up the Commandline Tool")
MikroORM ships with a number of command line tools that are very helpful during development, like `SchemaGenerator` and `EntityGenerator`. We can call this command from the NPM binary directory or use `npx`:
> To work with the CLI, first install `@mikro-orm/cli` package locally. The version needs to be aligned with the `@mikro-orm/core` package.
```
# install the CLI package first!  
$ yarn add @mikro-orm/cli  
  
# manually  
$ node node_modules/.bin/mikro-orm  
  
# via npx  
$ npx mikro-orm  
  
# or via yarn  
$ yarn mikro-orm  
```
For CLI to be able to access our database, we will need to create `mikro-orm.config.js` file that exports our ORM configuration.
> ORM configuration file can export the Promise, like: `export default Promise.resolve({...});`.
TypeScript is also supported, just enable `useTsNode` flag in our `package.json` file. By default, when `useTsNode` is not enabled, CLI will ignore `.ts` files, so if you want to out-out of this behaviour, enable the `alwaysAllowTs` option. This would be useful if you want to use MikroORM with [Bun](https://bun.sh), which has TypeScript support out of the box. There we can also set up array of possible paths to `mikro-orm.config` file, as well as use different file name. The `package.json` file can be located in the current working directory, or in one of its parent folders.
We can use these environment variables to override CLI settings:
  * `MIKRO_ORM_CLI`: the path to ORM config file
  * `MIKRO_ORM_CLI_USE_TS_NODE`: register ts-node
  * `MIKRO_ORM_CLI_TS_CONFIG_PATH`: path to the tsconfig.json (for ts-node)
  * `MIKRO_ORM_CLI_ALWAYS_ALLOW_TS`: enable `.ts` files to use without ts-node
> Do not forget to install `ts-node` when enabling `useTsNode` flag.
> The `useTsNode` is used only when executing the CLI, it is not respected when running our app.
MikroORM will always try to load the first available config file, based on the order in `configPaths`. This means that if we specify the first item as the TS config, but we do not have `ts-node` enabled and installed, it will fail to load it.
./package.json
```
{  
  "name": "our-app",  
  "dependencies": { ... },  
  "mikro-orm": {  
    "useTsNode": true,  
    "configPaths": [  
      "./src/mikro-orm.config.ts",  
      "./dist/mikro-orm.config.js"  
    ]  
  }  
}  
```
./src/mikro-orm.config.ts
```
export default {  
  entities: [Author, Book, BookTag], // no need for `entitiesTs` this way  
  dbName: 'my-db-name',  
  type: 'mongo', // one of `mongo` | `mysql` | `mariadb` | `postgresql` | `sqlite`  
};  
```
To have the config type-safe, we can define the options variable first, with the `Options` type:
```
import { Options } from '@mikro-orm/core';  
  
const config: Options = {  
  // ...  
};  
  
export default config;  
```
Alternatively, we can use the `defineConfig` helper that should provide intellisense even in JavaScript files, without the need for type hints via jsdoc:
```
import { defineConfig } from '@mikro-orm/core';  
  
export default defineConfig({  
  // ...  
});  
```
When we have `useTsNode` disabled and `ts-node` is not already registered and detected, TS config files will be ignored.
Once we have the CLI config properly set up, we can omit the `MikroORM.init()` options parameter, and the CLI config will be automatically used. This process may fail if we use bundlers that use tree shaking. As the config file is not referenced anywhere statically, it would not be compiled - for that the best approach is to provide the config explicitly:
```
import config from './mikro-orm.config';  
const orm = await MikroORM.init(config);  
```
> We can also use different names for this file, simply rename it in the `configPaths` array our in `package.json`. We can also use `MIKRO_ORM_CLI` environment variable with the path to override `configPaths` value.
Now we should be able to start using the CLI. All available commands are listed in the CLI help:
```
Usage: mikro-orm <command> [options]  
  
Commands:  
  mikro-orm cache:clear             Clear metadata cache  
  mikro-orm cache:generate          Generate metadata cache for production  
  mikro-orm generate-entities       Generate entities based on current database  
                                    schema  
  mikro-orm database:import <file>  Imports the SQL file to the database  
  mikro-orm schema:create           Create database schema based on current  
                                    metadata  
  mikro-orm schema:drop             Drop database schema based on current  
                                    metadata  
  mikro-orm schema:update           Update database schema based on current  
                                    metadata  
  mikro-orm migration:create        Create new migration with current schema  
                                    diff  
  mikro-orm migration:up            Migrate up to the latest version  
  mikro-orm migration:down          Migrate one step down  
  mikro-orm migration:list          List all executed migrations  
  mikro-orm migration:pending       List all pending migrations  
  mikro-orm debug                   Debug CLI configuration  
  
Options:  
  -v, --version  Show version number                                   [boolean]  
  -h, --help     Show help                                             [boolean]  
  
Examples:  
  mikro-orm schema:update --run  Runs schema synchronization  
```
To verify our setup, we can use `mikro-orm debug` command.
> When we have CLI config properly set up, we can omit the `options` parameter when calling `MikroORM.init()`.
> Note: When importing a dump file we need `multipleStatements: true` in our configuration. Please check the configuration documentation for more information.
Now we can start [defining our entities](https://mikro-orm.io/docs/5.9/defining-entities).
[](https://github.com/mikro-orm/mikro-orm/edit/master/docs/versioned_docs/version-5.9/installation.md)
Last updated on **Mar 17, 2026** by **Martin Adámek**
[Next Defining Entities](https://mikro-orm.io/docs/5.9/defining-entities)
  * [Possible issues with circular dependencies](https://mikro-orm.io/docs/5.9/installation#possible-issues-with-circular-dependencies)
  * [Entity Discovery in TypeScript](https://mikro-orm.io/docs/5.9/installation#entity-discovery-in-typescript)
  * [Request Context](https://mikro-orm.io/docs/5.9/installation#request-context)
  * [Setting up the Commandline Tool](https://mikro-orm.io/docs/5.9/installation#setting-up-the-commandline-tool)
#### Docs
  * [Quick Start](https://mikro-orm.io/docs/quick-start)
  * [Getting Started](https://mikro-orm.io/docs/guide)
  * [Migration from v6 to v7](https://mikro-orm.io/docs/upgrading-v6-to-v7)
  * [Version 6.6 docs](https://mikro-orm.io/docs/6.6/quick-start)
#### Community
  * [Discord](https://discord.gg/w8bjxFHS7X)
  * [Slack](https://join.slack.com/t/mikroorm/shared_invite/enQtNTM1ODYzMzM4MDk3LWM4ZDExMjU5ZDhmNjA2MmM3MWMwZmExNjhhNDdiYTMwNWM0MGY5ZTE3ZjkyZTMzOWExNDgyYmMzNDE1NDI5NjA)
  * [Stack Overflow](https://stackoverflow.com/questions/ask?tags=mikro-orm)
#### Social
  * [Blog](https://mikro-orm.io/blog)
  * [Twitter](https://twitter.com/MikroORM)
  * [GitHub](https://github.com/mikro-orm/mikro-orm)
  * [GitHub Sponsors](https://github.com/sponsors/mikro-orm)
![MikroORM](https://mikro-orm.io/img/logo-header.svg)
Copyright © 2018-2026 Martin Adámek. Built with Docusaurus.
============================================================
# https://mikro-orm.io/docs/5.9/defining-entities
============================================================
[Skip to main content](https://mikro-orm.io/docs/5.9/defining-entities#__docusaurus_skipToContent_fallback)
⭐️ If you like MikroORM, give it a star on [GitHub](https://github.com/mikro-orm/mikro-orm) and consider [sponsoring](https://github.com/sponsors/mikro-orm) its development! ⭐️
[ ![MikroORM](https://mikro-orm.io/img/logo.svg)![MikroORM](https://mikro-orm.io/img/logo-dark.svg) ](https://mikro-orm.io/)
[5.9](https://mikro-orm.io/docs/5.9/defining-entities)
  * [Next](https://mikro-orm.io/docs/next/defining-entities)
  * [7.1](https://mikro-orm.io/docs/defining-entities)
  * [7.0](https://mikro-orm.io/docs/7.0/defining-entities)
  * [6.6](https://mikro-orm.io/docs/6.6/defining-entities)
  * [5.9](https://mikro-orm.io/docs/5.9/defining-entities)
[Docs](https://mikro-orm.io/docs/quick-start)[API](https://mikro-orm.io/api)[Blog](https://mikro-orm.io/blog)[Changelog](https://mikro-orm.io/changelog)
[latest: v7.1.3](https://mikro-orm.io/versions)[Discord](https://discord.gg/w8bjxFHS7X "Chat on Discord")[GitHub](https://github.com/mikro-orm/mikro-orm "View on GitHub")[Twitter](https://twitter.com/MikroORM "Twitter")
Search
  * [Overview](https://mikro-orm.io/docs/5.9/installation)
    * [Installation & Usage](https://mikro-orm.io/docs/5.9/installation)
    * [Defining Entities](https://mikro-orm.io/docs/5.9/defining-entities)
    * [Modeling Entity Relationships](https://mikro-orm.io/docs/5.9/relationships)
    * [Entity Manager](https://mikro-orm.io/docs/5.9/entity-manager)
    * [Unit of Work](https://mikro-orm.io/docs/5.9/unit-of-work)
  * [Fundamentals](https://mikro-orm.io/docs/5.9/fundamentals)
  * [Advanced Features](https://mikro-orm.io/docs/5.9/advanced)
  * [Reference](https://mikro-orm.io/docs/5.9/reference)
  * [Usage with Different Drivers](https://mikro-orm.io/docs/5.9/drivers)
  * [Recipes](https://mikro-orm.io/docs/5.9/recipes)
  * [Example Integrations](https://mikro-orm.io/docs/5.9/examples)
  * [Upgrading](https://mikro-orm.io/docs/5.9/upgrading)
This is documentation for MikroORM **5.9** , which is no longer actively maintained.
For up-to-date documentation, see the **[latest version](https://mikro-orm.io/docs/defining-entities)** (7.1).
  * [](https://mikro-orm.io/)
  * Overview
Version: 5.9
On this page
# Defining Entities
Entities are simple javascript objects (so called POJO) without restrictions and without the need to extend base classes. Using [entity constructors](https://mikro-orm.io/docs/5.9/entity-constructors) works as well - they are never executed for managed entities (loaded from database). Every entity is required to have a primary key.
Entities can be defined in two ways:
  * Decorated classes - the attributes of the entity, as well as each property are provided via decorators. We use `@Entity()` decorator on the class. Entity properties are decorated either with `@Property` decorator, or with one of reference decorators: `@ManyToOne`, `@OneToMany`, `@OneToOne` and `@ManyToMany`. Check out the full [decorator reference](https://mikro-orm.io/docs/5.9/decorators).
  * `EntitySchema` helper - With `EntitySchema` helper we define the schema programmatically. We can use regular classes as well as interfaces. This approach also allows to re-use partial entity definitions (e.g. traits/mixins). Read more about this in [Defining Entities via EntitySchema section](https://mikro-orm.io/docs/5.9/entity-schema).
Moreover, how the metadata extraction from decorators happens is controlled via `MetadataProvider`. Two main metadata providers are:
  * `ReflectMetadataProvider` - uses `reflect-metadata` to read the property types. Faster but simpler and more verbose.
  * `TsMorphMetadataProvider` - uses `ts-morph` to read the type information from the TypeScript compiled API. Heavier (requires full TS as a dependency), but allows DRY entity definition. With `ts-morph` we are able to extract the type as it is defined in the code, including interface names, as well as optionality of properties.
Read more about them in the [Metadata Providers section](https://mikro-orm.io/docs/5.9/metadata-providers).
> Current set of decorators in MikroORM is designed to work with the `tsc`. Using `babel` and `swc` is also possible, but requires some additional setup. Read more about it [here](https://mikro-orm.io/docs/5.9/usage-with-transpilers). For notes about `webpack`, read the [deployment section](https://mikro-orm.io/docs/5.9/deployment).
> `ts-morph` is compatible only with the `tsc` approach.
> From v3 we can also use default exports when defining your entity.
Example definition of a `Book` entity follows. We can switch the tabs to see the difference for various ways:
  * reflect-metadata
  * ts-morph
  * EntitySchema
./entities/Book.ts
```
@Entity()  
export class Book extends CustomBaseEntity {  
  
  @Property()  
  title!: string;  
  
  @ManyToOne(() => Author)  
  author!: Author;  
  
  @ManyToOne(() => Publisher, { ref: true, nullable: true })  
  publisher?: Ref<Publisher>;  
  
  @ManyToMany({ entity: 'BookTag', fixedOrder: true })  
  tags = new Collection<BookTag>(this);  
  
}  
```
./entities/Book.ts
```
@Entity()  
export class Book extends CustomBaseEntity {  
  
  @Property()  
  title!: string;  
  
  @ManyToOne()  
  author!: Author;  
  
  @ManyToOne()  
  publisher?: Ref<Publisher>;  
  
  @ManyToMany({ fixedOrder: true })  
  tags = new Collection<BookTag>(this);  
  
}  
```
./entities/Book.ts
```
export interface IBook extends CustomBaseEntity {  
  title: string;  
  author: Author;  
  publisher?: Ref<Publisher>;  
  tags: Collection<BookTag>;  
}  
  
export const Book = new EntitySchema<IBook, CustomBaseEntity>({  
  name: 'Book',  
  extends: 'CustomBaseEntity',  
  properties: {  
    title: { type: 'string' },  
    author: { reference: 'm:1', entity: 'Author' },  
    publisher: { reference: 'm:1', entity: 'Publisher', ref: true, nullable: true },  
    tags: { reference: 'm:n', entity: 'BookTag', fixedOrder: true },  
  },  
});  
```
> Including `{ wrappedEntity: true }` in your `Ref` property definitions will wrap the reference, providing access to helper methods like `.load` and `.unwrap`, which can be helpful for loading data and changing the type of your references where you plan to use them.
Here is another example of `Author` entity, that was referenced from the `Book` one, this time defined for mongo:
  * reflect-metadata
  * ts-morph
  * EntitySchema
./entities/Author.ts
```
@Entity()  
export class Author {  
  
  @PrimaryKey()  
  _id!: ObjectId;  
  
  @SerializedPrimaryKey()  
  id!: string;  
  
  @Property()  
  createdAt: Date = new Date();  
  
  @Property({ onUpdate: () => new Date() })  
  updatedAt: Date = new Date();  
  
  @Property()  
  name!: string;  
  
  @Property()  
  email!: string;  
  
  @Property({ nullable: true })  
  age?: number;  
  
  @Property()  
  termsAccepted: boolean = false;  
  
  @Property({ nullable: true })  
  identities?: string[];  
  
  @Property({ nullable: true })  
  born?: Date;  
  
  @OneToMany(() => Book, book => book.author)  
  books = new Collection<Book>(this);  
  
  @ManyToMany(() => Author)  
  friends = new Collection<Author>(this);  
  
  @ManyToOne(() => Book, { nullable: true })  
  favouriteBook?: Book;  
  
  @Property({ version: true })  
  version!: number;  
  
  constructor(name: string, email: string) {  
    this.name = name;  
    this.email = email;  
  }  
  
}  
```
./entities/Author.ts
```
@Entity()  
export class Author {  
  
  @PrimaryKey()  
  _id!: ObjectId;  
  
  @SerializedPrimaryKey()  
  id!: string;  
  
  @Property()  
  createdAt = new Date();  
  
  @Property({ onUpdate: () => new Date() })  
  updatedAt = new Date();  
  
  @Property()  
  name!: string;  
  
  @Property()  
  email!: string;  
  
  @Property()  
  age?: number;  
  
  @Property()  
  termsAccepted = false;  
  
  @Property()  
  identities?: string[];  
  
  @Property()  
  born?: Date;  
  
  @OneToMany(() => Book, book => book.author)  
  books = new Collection<Book>(this);  
  
  @ManyToMany()  
  friends = new Collection<Author>(this);  
  
  @ManyToOne()  
  favouriteBook?: Book;  
  
  @Property({ version: true })  
  version!: number;  
  
  constructor(name: string, email: string) {  
    this.name = name;  
    this.email = email;  
  }  
  
}  
```
./entities/Author.ts
```
export class Author {  
  
  _id!: ObjectId;  
  id!: string;  
  createdAt = new Date();  
  updatedAt = new Date();  
  name!: string;  
  email!: string;  
  age?: number;  
  termsAccepted = false;  
  identities?: string[];  
  born?: Date;  
  books = new Collection<Book>(this);  
  friends = new Collection<Author>(this);  
  favouriteBook?: Book;  
  version!: number;  
  
  constructor(name: string, email: string) {  
    this.name = name;  
    this.email = email;  
  }  
  
}  
  
export const AuthorSchema = new EntitySchema<Author>({  
  class: Author,  
  properties: {  
    _id: { type: 'ObjectId', primary: true },  
    id: { type: String, serializedPrimaryKey: true },  
    createdAt: { type: Date },  
    updatedAt: { type: Date, onUpdate: () => new Date() },  
    name: { type: String },  
    email: { type: String },  
    age: { type: Number, nullable: true },  
    termsAccepted: { type: Boolean }  
    identities: { type: 'string[]', nullable: true }  
    born: { type: Date, nullable: true }  
    books: { reference: '1:m', entity: () => Book, mappedBy: book => book.author }  
    friends: { reference: 'm:n', entity: () => Author }  
    favouriteBook: { reference: 'm:1', entity: () => Book, nullable: true };  
    version: { type: Number, version: true };  
  },  
});  
```
More information about modelling relationships can be found on [modelling relationships page](https://mikro-orm.io/docs/5.9/relationships).
For an example of Vanilla JavaScript usage, take a look [here](https://mikro-orm.io/docs/5.9/usage-with-js).
## Optional Properties[​](https://mikro-orm.io/docs/5.9/defining-entities#optional-properties "Direct link to Optional Properties")
With the default `reflect-metadata` provider, we need to mark each optional property as `nullable: true`. When using `ts-morph`, if you define the property as optional (marked with `?`), this will be automatically considered as nullable property (mainly for SQL schema generator).
  * reflect-metadata
  * ts-morph
  * EntitySchema
./entities/Author.ts
```
@ManyToOne(() => Book, { nullable: true })  
favouriteBook?: Book;  
```
./entities/Author.ts
```
@ManyToOne()  
favouriteBook?: Book;  
```
./entities/Author.ts
```
properties: {  
  favouriteBook: { reference: 'm:1', entity: () => Book, nullable: true },  
},  
```
## Default values[​](https://mikro-orm.io/docs/5.9/defining-entities#default-values "Direct link to Default values")
We can set default value of a property in 2 ways:
  1. Use runtime default value of the property. This approach should be preferred as long as we are not using any native database function like `now()`. With this approach our entities will have the default value set even before it is actually persisted into the database (e.g. when we instantiate new entity via `new Author()` or `em.create(Author, { ... })`.
  * reflect-metadata
  * ts-morph
  * EntitySchema
./entities/Author.ts
```
@Property()  
foo: number = 1;  
  
@Property()  
bar: string = 'abc';  
  
@Property()  
baz: Date = new Date();  
```
./entities/Author.ts
```
@Property()  
foo = 1;  
  
@Property()  
bar = 'abc';  
  
@Property()  
baz = new Date();  
```
./entities/Author.ts
```
properties: {  
  foo: { type: Number, onCreate: () => 1 },  
  bar: { type: String, onCreate: () => 'abc' },  
  baz: { type: Date, onCreate: () => new Date() },  
},  
```
  1. Use `default` parameter of `@Property` decorator. This way the actual default value will be provided by the database, and automatically mapped to the entity property after it is being persisted (after flush). To use SQL functions like `now()`, use `defaultRaw`.
> Since v4 you should use `defaultRaw` for SQL functions, as `default` with string values will be automatically quoted.
  * reflect-metadata
  * ts-morph
  * EntitySchema
./entities/Author.ts
```
@Property({ default: 1 })  
foo!: number;  
  
@Property({ default: 'abc' })  
bar!: string;  
  
@Property({ defaultRaw: 'now' })  
baz!: Date;  
```
./entities/Author.ts
```
@Property({ default: 1 })  
foo!: number;  
  
@Property({ default: 'abc' })  
bar!: string;  
  
@Property({ defaultRaw: 'now' })  
baz!: Date;  
```
./entities/Author.ts
```
properties: {  
  foo: { type: Number, default: 1 },  
  bar: { type: String, default: 'abc' },  
  baz: { type: Date, defaultRaw: 'now' },  
},  
```
## Enums[​](https://mikro-orm.io/docs/5.9/defining-entities#enums "Direct link to Enums")
To define an enum property, use `@Enum()` decorator. Enums can be either numeric or string values.
For schema generator to work properly in case of string enums, we need to define the enum in the same file as where it is used, so its values can be automatically discovered. If we want to define the enum in another file, we should re-export it also in place where we use it.
Another possibility is to provide the reference to the enum implementation in the decorator via `@Enum(() => UserRole)`.
> We can also set enum items manually via `items: string[]` attribute.
  * reflect-metadata
  * ts-morph
  * EntitySchema
./entities/Author.ts
```
import { OutsideEnum } from './OutsideEnum.ts';  
  
@Entity()  
export class User {  
  
  @Enum(() => UserRole)  
  role!: UserRole; // string enum  
  
  @Enum(() => UserStatus)  
  status!: UserStatus; // numeric/const enum  
  
  @Enum(() => OutsideEnum)  
  outside!: OutsideEnum; // string enum defined outside of this file  
  
  @Enum({ items: () => OutsideNullableEnum, nullable: true })  
  outsideNullable?: OutsideNullableEnum; // string enum defined outside of this file, may be null  
  
}  
  
export enum UserRole {  
  ADMIN = 'admin',  
  MODERATOR = 'moderator',  
  USER = 'user',  
}  
  
export const enum UserStatus {  
  DISABLED,  
  ACTIVE,  
}  
  
// or we could reexport OutsideEnum  
// export { OutsideEnum } from './OutsideEnum.ts';  
```
./entities/Author.ts
```
import { OutsideEnum } from './OutsideEnum.ts';  
  
@Entity()  
export class User {  
  
  @Enum(() => UserRole)  
  role!: UserRole; // string enum  
  
  @Enum(() => UserStatus)  
  status!: UserStatus; // numeric enum  
  
  @Enum(() => OutsideEnum)  
  outside!: OutsideEnum; // string enum defined outside of this file  
  
  @Enum({ items: () => OutsideNullableEnum })  
  outsideNullable?: OutsideNullableEnum; // string enum defined outside of this file, may be null  
  
}  
  
export enum UserRole {  
  ADMIN = 'admin',  
  MODERATOR = 'moderator',  
  USER = 'user',  
}  
  
export const enum UserStatus {  
  DISABLED,  
  ACTIVE,  
}  
  
// or we could reexport OutsideEnum  
// export { OutsideEnum } from './OutsideEnum.ts';  
```
./entities/Author.ts
```
properties: {  
  // string enum  
  role: { enum: true, items: () => UserRole },  
  // numeric enum  
  status: { enum: true, items: () => UserStatus },  
  // string enum defined outside of this file  
  outside: { enum: true, items: () => OutsideEnum },  
  // string enum defined outside of this file, may be null  
  outsideNullable: { enum: true, items: () => OutsideNullableEnum, nullable: true },  
},  
```
## Enum arrays[​](https://mikro-orm.io/docs/5.9/defining-entities#enum-arrays "Direct link to Enum arrays")
We can also use array of values for enum, in that case, `EnumArrayType` type will be used automatically, that will validate items on flush.
  * reflect-metadata
  * ts-morph
  * EntitySchema
./entities/User.ts
```
enum Role {  
  User = 'user',  
  Admin = 'admin',  
}  
  
@Enum({ items: () => Role, array: true, default: [Role.User] })  
roles: Role[] = [Role.User];  
```
./entities/User.ts
```
enum Role {  
  User = 'user',  
  Admin = 'admin',  
}  
  
@Enum({ default: [Role.User] })  
roles = [Role.User];  
```
./entities/User.ts
```
enum Role {  
  User = 'user',  
  Admin = 'admin',  
}  
  
properties: {  
  roles: { enum: true, array: true, default: [Role.User], items: () => Role },  
},  
```
## Mapping directly to primary keys[​](https://mikro-orm.io/docs/5.9/defining-entities#mapping-directly-to-primary-keys "Direct link to Mapping directly to primary keys")
Sometimes we might want to work only with the primary key of a relation. To do that, we can use `mapToPk` option on M:1 and 1:1 relations:
  * reflect-metadata
  * ts-morph
  * EntitySchema
./entities/User.ts
```
@ManyToOne(() => User, { mapToPk: true })  
user: number;  
```
./entities/User.ts
```
@ManyToOne(() => User, { mapToPk: true })  
user: number;  
```
./entities/User.ts
```
properties: {  
  user: { entity: () => User, mapToPk: true },  
},  
```
For composite keys, this will give us ordered tuple representing the raw PKs, which is the internal format of composite PK:
  * reflect-metadata
  * ts-morph
  * EntitySchema
./entities/User.ts
```
@ManyToOne(() => User, { mapToPk: true })  
user: [string, string]; // [first_name, last_name]  
```
./entities/User.ts
```
@ManyToOne(() => User, { mapToPk: true })  
user: [string, string]; // [first_name, last_name]  
```
./entities/User.ts
```
properties: {  
  user: { entity: () => User, mapToPk: true },  
},  
```
## Formulas[​](https://mikro-orm.io/docs/5.9/defining-entities#formulas "Direct link to Formulas")
`@Formula()` decorator can be used to map some SQL snippet to your entity. The SQL fragment can be as complex as you want and even include subselects.
  * reflect-metadata
  * ts-morph
  * EntitySchema
./entities/Box.ts
```
@Formula('obj_length * obj_height * obj_width')  
objectVolume?: number;  
```
./entities/Box.ts
```
@Formula('obj_length * obj_height * obj_width')  
objectVolume?: number;  
```
./entities/Box.ts
```
properties: {  
  objectVolume: { formula: 'obj_length * obj_height * obj_width' },  
},  
```
Formulas will be added to the select clause automatically. In case you are facing problems with `NonUniqueFieldNameException`, you can define the formula as a callback that will receive the entity alias in the parameter:
  * reflect-metadata
  * ts-morph
  * EntitySchema
./entities/Box.ts
```
@Formula(alias => `${alias}.obj_length * ${alias}.obj_height * ${alias}.obj_width`)  
objectVolume?: number;  
```
./entities/Box.ts
```
@Formula(alias => `${alias}.obj_length * ${alias}.obj_height * ${alias}.obj_width`)  
objectVolume?: number;  
```
./entities/Box.ts
```
properties: {  
  objectVolume: { formula: alias => `${alias}.obj_length * ${alias}.obj_height * ${alias}.obj_width` },  
},  
```
## Indexes[​](https://mikro-orm.io/docs/5.9/defining-entities#indexes "Direct link to Indexes")
We can define indexes via `@Index()` decorator, for unique indexes, we can use `@Unique()` decorator. We can use it either on entity class, or on entity property.
To define complex indexes, we can use index expressions. They allow us to specify the final `create index` query and an index name - this name is then used for index diffing, so the schema generator will only try to create it if it's not there yet, or remove it, if it's no longer defined in the entity. Index expressions are not bound to any property, rather to the entity itself (we can still define them on both entity and property level).
  * reflect-metadata
  * ts-morph
  * EntitySchema
./entities/Author.ts
```
@Entity()  
@Index({ properties: ['name', 'age'] }) // compound index, with generated name  
@Index({ name: 'custom_idx_name', properties: ['name'] }) // simple index, with custom name  
@Unique({ properties: ['name', 'email'] })  
export class Author {  
  
  @Property()  
  @Unique()  
  email!: string;  
  
  @Property()  
  @Index() // generated name  
  age?: number;  
  
  @Index({ name: 'born_index' })  
  @Property()  
  born?: Date;  
  
  @Index({ name: 'custom_index_expr', expression: 'alter table `author` add index `custom_index_expr`(`title`)' })  
  @Property()  
  title!: string;  
  
}  
```
./entities/Author.ts
```
@Entity()  
@Index({ properties: ['name', 'age'] }) // compound index, with generated name  
@Index({ name: 'custom_idx_name', properties: ['name'] }) // simple index, with custom name  
@Unique({ properties: ['name', 'email'] })  
export class Author {  
  
  @Property()  
  @Unique()  
  email!: string;  
  
  @Property()  
  @Index() // generated name  
  age?: number;  
  
  @Index({ name: 'born_index' })  
  @Property()  
  born?: Date;  
  
  @Index({ name: 'custom_index_expr', expression: 'alter table `author` add index `custom_index_expr`(`title`)' })  
  @Property()  
  title!: string;  
  
}  
  
```
./entities/Author.ts
```
export const AuthorSchema = new EntitySchema<Author, CustomBaseEntity>({  
  class: Author,  
  indexes: [  
    { properties: ['name', 'age'] }, // compound index, with generated name  
    { name: 'custom_idx_name', properties: ['name'] }, // simple index, with custom name  
    { name: 'custom_index_expr', expression: 'alter table `author` add index `custom_index_expr`(`title`)' },  
  ],  
  uniques: [  
    { properties: ['name', 'email'] },  
  ],  
  properties: {  
    email: { type: 'string', unique: true }, // generated name  
    age: { type: 'number', nullable: true, index: true }, // generated name  
    born: { type: Date, nullable: true, index: 'born_index' },  
    title: { type: 'string' },  
  },  
});  
```
## Check constraints[​](https://mikro-orm.io/docs/5.9/defining-entities#check-constraints "Direct link to Check constraints")
We can define check constraints via `@Check()` decorator. We can use it either on entity class, or on entity property. It has a required `expression` property, that can be either a string or a callback, that receives map of property names to column names. Note that we need to use the generic type argument if we want TypeScript suggestions for the property names.
> Check constraints are currently supported only in postgres driver.
  * reflect-metadata
  * ts-morph
  * EntitySchema
./entities/Book.ts
```
@Entity()  
// with generated name based on the table name  
@Check({ expression: 'price1 >= 0' })  
// with explicit name  
@Check({ name: 'foo', expression: columns => `${columns.price1} >= 0` })  
// with explicit type argument we get autocomplete on `columns`  
@Check<Book>({ expression: columns => `${columns.price1} >= 0` })  
export class Book {  
  
  @PrimaryKey()  
  id!: number;  
  
  @Property()  
  price1!: number;  
  
  @Property()  
  @Check({ expression: 'price2 >= 0' })  
  price2!: number;  
  
  @Property({ check: columns => `${columns.price3} >= 0` })  
  price3!: number;  
  
}  
```
./entities/Book.ts
```
@Entity()  
// with generated name based on the table name  
@Check({ expression: 'price1 >= 0' })  
// with explicit name  
@Check({ name: 'foo', expression: columns => `${columns.price1} >= 0` })  
// with explicit type argument we get autocomplete on `columns`  
@Check<Book>({ expression: columns => `${columns.price1} >= 0` })  
export class Book {  
  
  @PrimaryKey()  
  id!: number;  
  
  @Property()  
  price1!: number;  
  
  @Property()  
  @Check({ expression: 'price2 >= 0' })  
  price2!: number;  
  
  @Property({ check: columns => `${columns.price3} >= 0` })  
  price3!: number;  
  
}  
```
./entities/Book.ts
```
export const BookSchema = new EntitySchema<Book>({  
  class: Book,  
  checks: [  
    { expression: 'price1 >= 0' },  
    { name: 'foo', expression: columns => `${columns.price1} >= 0` },  
    { expression: columns => `${columns.price1} >= 0` },  
    { propertyName: 'price2', expression: 'price2 >= 0' },  
    { propertyName: 'price3', expression: columns => `${columns.price3} >= 0` },  
  ],  
  properties: {  
    id: { type: 'number', primary: true },  
    price1: { type: 'number' },  
    price2: { type: 'number' },  
    price3: { type: 'number' },  
  },  
});  
```
## Custom Types[​](https://mikro-orm.io/docs/5.9/defining-entities#custom-types "Direct link to Custom Types")
We can define custom types by extending `Type` abstract class. It has 4 optional methods:
  * `convertToDatabaseValue(value: any, platform: Platform): any`
Converts a value from its JS representation to its database representation of this type.
  * `convertToJSValue(value: any, platform: Platform): any`
Converts a value from its database representation to its JS representation of this type.
  * `toJSON(value: any, platform: Platform): any`
Converts a value from its JS representation to its serialized JSON form of this type. By default converts to the database value.
  * `getColumnType(prop: EntityProperty, platform: Platform): string`
Gets the SQL declaration snippet for a field of this type.
More information can be found in [Custom Types](https://mikro-orm.io/docs/5.9/custom-types) section.
## Lazy scalar properties[​](https://mikro-orm.io/docs/5.9/defining-entities#lazy-scalar-properties "Direct link to Lazy scalar properties")
We can mark any property as `lazy: true` to omit it from the select clause. This can be handy for properties that are too large, and you want to have them available only sometimes, like a full text of an article.
  * reflect-metadata
  * ts-morph
  * EntitySchema
./entities/Book.ts
```
@Property({ columnType: 'text', lazy: true })  
text: string;  
```
./entities/Book.ts
```
@Property({ columnType: 'text', lazy: true })  
text: string;  
```
./entities/Book.ts
```
properties: {  
  text: { columnType: 'text', lazy: true },  
}  
```
We can use `populate` parameter to load them.
```
const b1 = await em.find(Book, 1); // this will omit the `text` property  
const b2 = await em.find(Book, 1, { populate: ['text'] }); // this will load the `text` property  
```
> If the entity is already loaded and you need to populate a lazy scalar property, you might need to pass `refresh: true` in the `FindOptions`.
## Virtual Properties[​](https://mikro-orm.io/docs/5.9/defining-entities#virtual-properties "Direct link to Virtual Properties")
We can define our properties as virtual, either as a method, or via JavaScript `get/set`.
Following example defines User entity with `firstName` and `lastName` database fields, that are both hidden from the serialized response, replaced with virtual properties `fullName` (defined as a classic method) and `fullName2` (defined as a JavaScript getter).
> For JavaScript getter you need to provide `{ persist: false }` option otherwise the value would be stored in the database.
  * reflect-metadata
  * ts-morph
  * EntitySchema
./entities/User.ts
```
@Entity()  
export class User {  
  
  @Property({ hidden: true })  
  firstName!: string;  
  
  @Property({ hidden: true })  
  lastName!: string;  
  
  @Property({ name: 'fullName' })  
  getFullName() {  
    return `${this.firstName} ${this.lastName}`;  
  }  
  
  @Property({ persist: false })  
  get fullName2() {  
    return `${this.firstName} ${this.lastName}`;  
  }  
  
}  
```
./entities/User.ts
```
@Entity()  
export class User {  
  
  @Property({ hidden: true })  
  firstName!: string;  
  
  @Property({ hidden: true })  
  lastName!: string;  
  
  @Property({ name: 'fullName' })  
  getFullName() {  
    return `${this.firstName} ${this.lastName}`;  
  }  
  
  @Property({ persist: false })  
  get fullName2() {  
    return `${this.firstName} ${this.lastName}`;  
  }  
  
}  
```
./entities/User.ts
```
export class User {  
  firstName!: string;  
  lastName!: string;  
  
  getFullName() {  
    return `${this.firstName} ${this.lastName}`;  
  }  
  
  get fullName2() {  
    return `${this.firstName} ${this.lastName}`;  
  }  
}  
  
properties: {  
  firstName: { type: String, hidden: true },  
  lastName: { type: String, hidden: true },  
  fullName: { type: 'method', persist: false, getter: true, getterName: 'getFullName' },  
  fullName2: { type: 'method', persist: false, getter: true },  
}  
```
```
const repo = em.getRepository(User);  
const author = repo.create({ firstName: 'Jon', lastName: 'Snow' });  
  
console.log(author.getFullName()); // 'Jon Snow'  
console.log(author.fullName2); // 'Jon Snow'  
console.log(wrap(author).toJSON()); // { fullName: 'Jon Snow', fullName2: 'Jon Snow' }  
```
## Entity file names[​](https://mikro-orm.io/docs/5.9/defining-entities#entity-file-names "Direct link to Entity file names")
Starting with MikroORM 4.2, there is no limitation for entity file names. It is now also possible to define multiple entities in a single file using folder based discovery.
## Using custom base entity[​](https://mikro-orm.io/docs/5.9/defining-entities#using-custom-base-entity "Direct link to Using custom base entity")
We can define our own base entity with properties that are required on all entities, like primary key and created/updated time. Single table inheritance is also supported.
Read more about this topic in [Inheritance Mapping](https://mikro-orm.io/docs/5.9/inheritance-mapping) section.
> If you are initializing the ORM via `entities` option, you need to specify all your base entities as well.
  * reflect-metadata
  * ts-morph
  * EntitySchema
./entities/CustomBaseEntity.ts
```
import { v4 } from 'uuid';  
  
export abstract class CustomBaseEntity {  
  
  @PrimaryKey()  
  uuid: string = v4();  
  
  @Property()  
  createdAt: Date = new Date();  
  
  @Property({ onUpdate: () => new Date() })  
  updatedAt: Date = new Date();  
  
}  
```
./entities/CustomBaseEntity.ts
```
import { v4 } from 'uuid';  
  
export abstract class CustomBaseEntity {  
  
  @PrimaryKey()  
  uuid = v4();  
  
  @Property()  
  createdAt = new Date();  
  
  @Property({ onUpdate: () => new Date() })  
  updatedAt = new Date();  
  
}  
```
./entities/CustomBaseEntity.ts
```
import { v4 } from 'uuid';  
  
export interface CustomBaseEntity {  
  uuid: string;  
  createdAt: Date;  
  updatedAt: Date;  
}  
  
export const schema = new EntitySchema<CustomBaseEntity>({  
  name: 'CustomBaseEntity',  
  abstract: true,  
  properties: {  
    uuid: { type: 'uuid', onCreate: () => v4(), primary: true },  
    createdAt: { type: 'Date', onCreate: () => new Date(), nullable: true },  
    updatedAt: { type: 'Date', onCreate: () => new Date(), onUpdate: () => new Date(), nullable: true },  
  },  
});  
```
There is a special case, when we need to annotate the base entity - if we are using folder based discovery, and the base entity is not using any decorators (e.g. it does not define any decorated property). In that case, we need to mark it as abstract:
```
@Entity({ abstract: true })  
export abstract class CustomBaseEntity {  
  // ...  
}  
```
## SQL Generated columns[​](https://mikro-orm.io/docs/5.9/defining-entities#sql-generated-columns "Direct link to SQL Generated columns")
Knex currently does not support generated columns, so the schema generator cannot properly diff them. To work around this, we can set `ignoreSchemaChanges` on a property to avoid a perpetual diff from the schema generator
  * reflect-metadata
  * ts-morph
  * EntitySchema
./entities/Book.ts
```
@Entity  
export class Book {  
  
  @Property()  
  title!: string;  
  
  @Property({  
    columnType: 'VARCHAR GENERATED ALWAYS AS (LOWER(`title`)) VIRTUAL',  
    ignoreSchemaChanges: ['type', 'extra'],  
  })  
  titleLower!: string;  
  
}  
```
./entities/Book.ts
```
@Entity  
export class Book {  
  
  @Property()  
  title!: string;  
  
  @Property({  
    columnType: 'VARCHAR GENERATED ALWAYS AS (LOWER(`title`)) VIRTUAL',  
    ignoreSchemaChanges: ['type', 'extra'],  
  })  
  titleLower!: string;  
  
}  
```
./entities/Book.ts
```
export interface IBook {  
  title: string;  
  titleLower: string;  
}  
  
export const Book = new EntitySchema<IBook>({  
  name: 'Book',  
  properties: {  
    title: { type: String },  
    titleLower: { type: String, columnType: 'VARCHAR GENERATED ALWAYS AS (LOWER(`title`)) VIRTUAL', ignoreSchemaChanges: ['type', 'extra'] },  
  },  
});  
```
## Examples of entity definition with various primary keys[​](https://mikro-orm.io/docs/5.9/defining-entities#examples-of-entity-definition-with-various-primary-keys "Direct link to Examples of entity definition with various primary keys")
### Using id as primary key (SQL drivers)[​](https://mikro-orm.io/docs/5.9/defining-entities#using-id-as-primary-key-sql-drivers "Direct link to Using id as primary key \(SQL drivers\)")
  * reflect-metadata
  * ts-morph
  * EntitySchema
./entities/Book.ts
```
@Entity()  
export class Book {  
  
  @PrimaryKey()  
  id!: number; // string is also supported  
  
  @Property()  
  title!: string;  
  
  @ManyToOne(() => Author)  
  author!: Author;  
  
  @ManyToOne(() => Publisher, { ref: true, nullable: true })  
  publisher?: Ref<Publisher>;  
  
}  
```
./entities/Book.ts
```
@Entity()  
export class Book {  
  
  @PrimaryKey()  
  id!: number; // string is also supported  
  
  @Property()  
  title!: string;  
  
  @ManyToOne()  
  author!: Author;  
  
  @ManyToOne()  
  publisher?: Ref<Publisher>;  
  
}  
```
./entities/Book.ts
```
export interface Book {  
  id: number;  
  title: string;  
  author: Author;  
}  
  
export const BookSchema = new EntitySchema<Book>({  
  name: 'Book',  
  properties: {  
    id: { type: Number, primary: true },  
    title: { type: String },  
    author: { reference: 'm:1', entity: 'Author' },  
    publisher: { reference: 'm:1', entity: 'Publisher', ref: true, nullable: true },  
  },  
});  
```
### Using UUID as primary key (SQL drivers)[​](https://mikro-orm.io/docs/5.9/defining-entities#using-uuid-as-primary-key-sql-drivers "Direct link to Using UUID as primary key \(SQL drivers\)")
  * reflect-metadata
  * ts-morph
  * EntitySchema
./entities/Book.ts
```
import { v4 } from 'uuid';  
  
@Entity()  
export class Book {  
  
  @PrimaryKey()  
  uuid: string = v4();  
  
  @Property()  
  title!: string;  
  
  @ManyToOne(() => Author)  
  author!: Author;  
  
}  
```
./entities/Book.ts
```
import { v4 } from 'uuid';  
  
@Entity()  
export class Book {  
  
  @PrimaryKey()  
  uuid = v4();  
  
  @Property()  
  title!: string;  
  
  @ManyToOne()  
  author!: Author;  
  
}  
```
./entities/Book.ts
```
export interface IBook {  
  uuid: string;  
  title: string;  
  author: Author;  
}  
  
export const Book = new EntitySchema<IBook>({  
  name: 'Book',  
  properties: {  
    uuid: { type: 'uuid', onCreate: () => v4(), primary: true },  
    title: { type: 'string' },  
    author: { entity: () => Author, reference: 'm:1' },  
  },  
});  
```
### Using PostgreSQL built-in [gen_random_uuid](https://www.postgresql.org/docs/current/functions-uuid.html) function as primary key[​](https://mikro-orm.io/docs/5.9/defining-entities#using-postgresql-built-in-gen_random_uuid-function-as-primary-key "Direct link to using-postgresql-built-in-gen_random_uuid-function-as-primary-key")
  * reflect-metadata
  * ts-morph
  * EntitySchema
./entities/Book.ts
```
@Entity()  
export class Book {  
  
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })  
  uuid: string;  
  
  @Property()  
  title!: string;  
  
  @ManyToOne(() => Author)  
  author!: Author;  
  
}  
```
./entities/Book.ts
```
@Entity()  
export class Book {  
  
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })  
  uuid: string;  
  
  @Property()  
  title!: string;  
  
  @ManyToOne()  
  author!: Author;  
  
}  
```
./entities/Book.ts
```
export class Book {  
  uuid: string;  
  title!: string;  
  author!: Author;  
}  
  
export const BookSchema = new EntitySchema<Book>({  
  class: Book,  
  properties: {  
    uuid: { type: 'uuid', defaultRaw: 'gen_random_uuid()', primary: true },  
    title: { type: 'string' },  
    author: { entity: () => Author, reference: 'm:1' },  
  },  
});  
```
### Using BigInt as primary key (MySQL and PostgreSQL)[​](https://mikro-orm.io/docs/5.9/defining-entities#using-bigint-as-primary-key-mysql-and-postgresql "Direct link to Using BigInt as primary key \(MySQL and PostgreSQL\)")
We can use `BigIntType` to support `bigint`s. By default, it will represent the value as a `string`.
  * reflect-metadata
  * ts-morph
  * EntitySchema
./entities/CustomBaseEntity.ts
```
@Entity()  
export class Book {  
  
  @PrimaryKey({ type: BigIntType })  
  id: string;  
  
}  
```
./entities/CustomBaseEntity.ts
```
@Entity()  
export class Book {  
  
  @PrimaryKey({ type: BigIntType })  
  id: string;  
  
}  
```
./entities/CustomBaseEntity.ts
```
properties: {  
  id: { type: BigIntType },  
},  
```
If you want to use native `bigint`s, read the following guide: [Using native BigInt PKs](https://mikro-orm.io/docs/5.9/using-bigint-pks).
### Example of Mongo entity[​](https://mikro-orm.io/docs/5.9/defining-entities#example-of-mongo-entity "Direct link to Example of Mongo entity")
  * reflect-metadata
  * ts-morph
  * EntitySchema
./entities/Book.ts
```
@Entity()  
export class Book {  
  
  @PrimaryKey()  
  _id!: ObjectId;  
  
  @SerializedPrimaryKey()  
  id!: string; // string variant of PK, will be handled automatically  
  
  @Property()  
  title!: string;  
  
  @ManyToOne(() => Author)  
  author!: Author;  
  
}  
```
./entities/Book.ts
```
@Entity()  
export class Book {  
  
  @PrimaryKey()  
  _id!: ObjectId;  
  
  @SerializedPrimaryKey()  
  id!: string; // string variant of PK, will be handled automatically  
  
  @Property()  
  title!: string;  
  
  @ManyToOne()  
  author!: Author;  
  
}  
```
./entities/Book.ts
```
export interface IBook {  
  _id: ObjectId;  
  id: string;  
  title: string;  
  author: Author;  
}  
  
export const Book = new EntitySchema<IBook>({  
  name: 'Book',  
  properties: {  
    _id: { type: 'ObjectId', primary: true },  
    id: { type: String, serializedPrimaryKey: true },  
    title: { type: String },  
  },  
});  
```
### Using MikroORM's BaseEntity (previously WrappedEntity)[​](https://mikro-orm.io/docs/5.9/defining-entities#using-mikroorms-baseentity-previously-wrappedentity "Direct link to Using MikroORM's BaseEntity \(previously WrappedEntity\)")
From v4 `BaseEntity` class is provided with `init`, `isInitialized`, `assign` and other methods that are otherwise available via the `wrap()` helper.
> Usage of the `BaseEntity` is optional.
```
import { BaseEntity } from '@mikro-orm/core';  
  
@Entity()  
export class Book extends BaseEntity<Book, 'id'> {  
  
  @PrimaryKey()  
  id!: number;  
  
  @Property()  
  title!: string;  
  
  @ManyToOne()  
  author!: Author;  
  
}  
  
const book = new Book();  
console.log(book.isInitialized()); // true  
```
Having the entities set up, we can now start [using entity manager](https://mikro-orm.io/docs/5.9/entity-manager) and [repositories](https://mikro-orm.io/docs/5.9/repositories) as described in following sections.
[](https://github.com/mikro-orm/mikro-orm/edit/master/docs/versioned_docs/version-5.9/defining-entities.md)
Last updated on **Mar 17, 2026** by **Martin Adámek**
[Previous Installation & Usage](https://mikro-orm.io/docs/5.9/installation)[Next Modeling Entity Relationships](https://mikro-orm.io/docs/5.9/relationships)
  * [Optional Properties](https://mikro-orm.io/docs/5.9/defining-entities#optional-properties)
  * [Default values](https://mikro-orm.io/docs/5.9/defining-entities#default-values)
  * [Enums](https://mikro-orm.io/docs/5.9/defining-entities#enums)
  * [Enum arrays](https://mikro-orm.io/docs/5.9/defining-entities#enum-arrays)
  * [Mapping directly to primary keys](https://mikro-orm.io/docs/5.9/defining-entities#mapping-directly-to-primary-keys)
  * [Formulas](https://mikro-orm.io/docs/5.9/defining-entities#formulas)
  * [Indexes](https://mikro-orm.io/docs/5.9/defining-entities#indexes)
  * [Check constraints](https://mikro-orm.io/docs/5.9/defining-entities#check-constraints)
  * [Custom Types](https://mikro-orm.io/docs/5.9/defining-entities#custom-types)
  * [Lazy scalar properties](https://mikro-orm.io/docs/5.9/defining-entities#lazy-scalar-properties)
  * [Virtual Properties](https://mikro-orm.io/docs/5.9/defining-entities#virtual-properties)
  * [Entity file names](https://mikro-orm.io/docs/5.9/defining-entities#entity-file-names)
  * [Using custom base entity](https://mikro-orm.io/docs/5.9/defining-entities#using-custom-base-entity)
  * [SQL Generated columns](https://mikro-orm.io/docs/5.9/defining-entities#sql-generated-columns)
  * [Examples of entity definition with various primary keys](https://mikro-orm.io/docs/5.9/defining-entities#examples-of-entity-definition-with-various-primary-keys)
    * [Using id as primary key (SQL drivers)](https://mikro-orm.io/docs/5.9/defining-entities#using-id-as-primary-key-sql-drivers)
    * [Using UUID as primary key (SQL drivers)](https://mikro-orm.io/docs/5.9/defining-entities#using-uuid-as-primary-key-sql-drivers)
    * [Using PostgreSQL built-in gen_random_uuid function as primary key](https://mikro-orm.io/docs/5.9/defining-entities#using-postgresql-built-in-gen_random_uuid-function-as-primary-key)
    * [Using BigInt as primary key (MySQL and PostgreSQL)](https://mikro-orm.io/docs/5.9/defining-entities#using-bigint-as-primary-key-mysql-and-postgresql)
    * [Example of Mongo entity](https://mikro-orm.io/docs/5.9/defining-entities#example-of-mongo-entity)
    * [Using MikroORM's BaseEntity (previously WrappedEntity)](https://mikro-orm.io/docs/5.9/defining-entities#using-mikroorms-baseentity-previously-wrappedentity)
#### Docs
  * [Quick Start](https://mikro-orm.io/docs/quick-start)
  * [Getting Started](https://mikro-orm.io/docs/guide)
  * [Migration from v6 to v7](https://mikro-orm.io/docs/upgrading-v6-to-v7)
  * [Version 6.6 docs](https://mikro-orm.io/docs/6.6/quick-start)
#### Community
  * [Discord](https://discord.gg/w8bjxFHS7X)
  * [Slack](https://join.slack.com/t/mikroorm/shared_invite/enQtNTM1ODYzMzM4MDk3LWM4ZDExMjU5ZDhmNjA2MmM3MWMwZmExNjhhNDdiYTMwNWM0MGY5ZTE3ZjkyZTMzOWExNDgyYmMzNDE1NDI5NjA)
  * [Stack Overflow](https://stackoverflow.com/questions/ask?tags=mikro-orm)
#### Social
  * [Blog](https://mikro-orm.io/blog)
  * [Twitter](https://twitter.com/MikroORM)
  * [GitHub](https://github.com/mikro-orm/mikro-orm)
  * [GitHub Sponsors](https://github.com/sponsors/mikro-orm)
![MikroORM](https://mikro-orm.io/img/logo-header.svg)
Copyright © 2018-2026 Martin Adámek. Built with Docusaurus.
============================================================
# https://mikro-orm.io/docs/5.9/relationships
============================================================
[Skip to main content](https://mikro-orm.io/docs/5.9/relationships#__docusaurus_skipToContent_fallback)
⭐️ If you like MikroORM, give it a star on [GitHub](https://github.com/mikro-orm/mikro-orm) and consider [sponsoring](https://github.com/sponsors/mikro-orm) its development! ⭐️
[![MikroORM](https://mikro-orm.io/img/logo.svg)](https://mikro-orm.io/)
[5.9](https://mikro-orm.io/docs/5.9/relationships)
  * [Next](https://mikro-orm.io/docs/next/relationships)
  * [7.1](https://mikro-orm.io/docs/relationships)
  * [7.0](https://mikro-orm.io/docs/7.0/relationships)
  * [6.6](https://mikro-orm.io/docs/6.6/relationships)
  * [5.9](https://mikro-orm.io/docs/5.9/relationships)
[Docs](https://mikro-orm.io/docs/quick-start)[API](https://mikro-orm.io/api)[Blog](https://mikro-orm.io/blog)[Changelog](https://mikro-orm.io/changelog)
[latest: v7.1.3](https://mikro-orm.io/versions)[Discord](https://discord.gg/w8bjxFHS7X "Chat on Discord")[GitHub](https://github.com/mikro-orm/mikro-orm "View on GitHub")[Twitter](https://twitter.com/MikroORM "Twitter")
Search`Ctrl``K`
  * [Overview](https://mikro-orm.io/docs/5.9/relationships)
    * [Installation & Usage](https://mikro-orm.io/docs/5.9/installation)
    * [Defining Entities](https://mikro-orm.io/docs/5.9/defining-entities)
    * [Modeling Entity Relationships](https://mikro-orm.io/docs/5.9/relationships)
    * [Entity Manager](https://mikro-orm.io/docs/5.9/entity-manager)
    * [Unit of Work](https://mikro-orm.io/docs/5.9/unit-of-work)
  * [Fundamentals](https://mikro-orm.io/docs/5.9/fundamentals)
  * [Advanced Features](https://mikro-orm.io/docs/5.9/advanced)
  * [Reference](https://mikro-orm.io/docs/5.9/reference)
  * [Usage with Different Drivers](https://mikro-orm.io/docs/5.9/drivers)
  * [Recipes](https://mikro-orm.io/docs/5.9/recipes)
  * [Example Integrations](https://mikro-orm.io/docs/5.9/examples)
  * [Upgrading](https://mikro-orm.io/docs/5.9/upgrading)
This is documentation for MikroORM **5.9** , which is no longer actively maintained.
For up-to-date documentation, see the **[latest version](https://mikro-orm.io/docs/relationships)** (7.1).
  * [](https://mikro-orm.io/)
  * Overview
Version: 5.9
On this page
# Modeling Entity Relationships
There are 4 types of entity relationships in MikroORM:
  * ManyToOne
  * OneToMany
  * OneToOne
  * ManyToMany
Relations can be unidirectional and bidirectional. Unidirectional are defined only on one side (the owning side). Bidirectional are defined on both sides, while one is owning side (where references are store), marked by `inversedBy` attribute pointing to the inverse side. On the inversed side we define it with `mappedBy` attribute pointing back to the owner:
> When modeling bidirectional relationship, you can also omit the `inversedBy` attribute, defining `mappedBy` on the inverse side is enough as it will be auto-wired.
## ManyToOne[​](https://mikro-orm.io/docs/5.9/relationships#manytoone "Direct link to ManyToOne")
> Many instances of the current Entity refer to One instance of the referred Entity.
There are multiple ways how to define the relationship, all of following is equivalent:
```
@Entity()  
export class Book {  
  
  @ManyToOne() // plain decorator is enough, type will be sniffer via reflection!  
  author1!: Author;  
  
  @ManyToOne(() => Author) // you can specify type manually as a callback  
  author2!: Author;  
  
  @ManyToOne('Author') // or as a string  
  author3!: Author;  
  
  @ManyToOne({ entity: () => Author }) // or use options object  
  author4!: Author;  
  
}  
```
You can also specify how operations on given entity should [cascade](https://mikro-orm.io/docs/5.9/cascading) to the referred entity.
## OneToMany[​](https://mikro-orm.io/docs/5.9/relationships#onetomany "Direct link to OneToMany")
> One instance of the current Entity has Many instances (references) to the referred Entity.
Again, all of following is equivalent:
```
@Entity()  
export class Author {  
  
  @OneToMany(() => Book, book => book.author)  
  books1 = new Collection<Book>(this);  
  
  @OneToMany('Book', 'author')  
  books2 = new Collection<Book>(this);  
  
  @OneToMany({ mappedBy: book => book.author }) // referenced entity type can be sniffer too  
  books3 = new Collection<Book>(this);  
  
  @OneToMany({ entity: () => Book, mappedBy: 'author', orphanRemoval: true })  
  books4 = new Collection<Book>(this);  
  
}  
```
As you can see, OneToMany is the inverse side of ManyToOne (which is the owning side). More about how collections work can be found on [collections page](https://mikro-orm.io/docs/5.9/collections).
You can also specify how operations on given entity should [cascade](https://mikro-orm.io/docs/5.9/cascading) to the referred entities. There is also more aggressive remove mode called [Orphan Removal](https://mikro-orm.io/docs/5.9/cascading#orphan-removal) (`books4` example).
## OneToOne[​](https://mikro-orm.io/docs/5.9/relationships#onetoone "Direct link to OneToOne")
> One instance of the current Entity refers to One instance of the referred Entity.
This is a variant of ManyToOne, where there is always just one entity on both sides. This means that the foreign key column is also unique.
### Owning Side[​](https://mikro-orm.io/docs/5.9/relationships#owning-side "Direct link to Owning Side")
```
@Entity()  
export class User {  
  
  // when none of `owner/inverseBy/mappedBy` is provided, it will be considered owning side  
  @OneToOne()  
  bestFriend1!: User;  
  
  // side with `inversedBy` is the owning one, to define inverse side use `mappedBy`  
  @OneToOne({ inversedBy: 'bestFriend1' })  
  bestFriend2!: User;  
  
  // when defining it like this, you need to specifically mark the owning side with `owner: true`  
  @OneToOne(() => User, user => user.bestFriend2, { owner: true })  
  bestFriend3!: User;  
  
}  
```
### Inverse Side[​](https://mikro-orm.io/docs/5.9/relationships#inverse-side "Direct link to Inverse Side")
```
@Entity()  
export class User {  
  
  @OneToOne({ mappedBy: 'bestFriend1', orphanRemoval: true })  
  bestFriend1!: User;  
  
  @OneToOne(() => User, user => user.bestFriend2, { orphanRemoval: true })  
  bestFriend2!: User;  
  
}  
```
As you can see, relationships can be also self-referencing (all of them. OneToOne also supports [Orphan Removal](https://mikro-orm.io/docs/5.9/cascading#orphan-removal).
## ManyToMany[​](https://mikro-orm.io/docs/5.9/relationships#manytomany "Direct link to ManyToMany")
> Many instances of the current Entity refers to Many instances of the referred Entity.
Here are examples of how you can define ManyToMany relationship:
### Owning Side[​](https://mikro-orm.io/docs/5.9/relationships#owning-side-1 "Direct link to Owning Side")
```
@Entity()  
export class Book {  
  
  // when none of `owner/inverseBy/mappedBy` is provided, it will be considered owning side  
  @ManyToMany()  
  tags1 = new Collection<BookTag>(this);  
  
  @ManyToMany(() => BookTag, 'books', { owner: true })  
  tags2 = new Collection<BookTag>(this);  
  
  @ManyToMany(() => BookTag, 'books', { owner: true })  
  tags3 = new Collection<BookTag>(this);  
  
  @ManyToMany(() => BookTag, 'books', { owner: true })  
  tags4 = new Collection<BookTag>(this);  
  
  // to define uni-directional many to many, simply provide only  
  @ManyToMany(() => Author)  
  friends: Collection<Author> = new Collection<Author>(this);  
  
}  
```
### Inverse Side[​](https://mikro-orm.io/docs/5.9/relationships#inverse-side-1 "Direct link to Inverse Side")
```
@Entity()  
export class BookTag {  
  
  // inverse side has to point to the owning side via `mappedBy` attribute/parameter  
  @ManyToMany(() => Book, book => book.tags)  
  books = new Collection<Book>(this);  
  
}  
```
Again, more information about how collections work can be found on [collections page](https://mikro-orm.io/docs/5.9/collections).
## Relations in ESM projects[​](https://mikro-orm.io/docs/5.9/relationships#relations-in-esm-projects "Direct link to Relations in ESM projects")
If you use ESM in your TypeScript project with `reflect-metadata`, you might fall into issues with circular dependencies, seeing errors like this:
ReferenceError: Cannot access 'Author' before initialization
To get around them, use the `Rel` mapped type. It is an identity type, which disables the problematic inference from `reflect-metadata`, that causes ESM projects to fail.
```
import { Rel } from '@mikro-orm/core';  
  
@Entity()  
export class Book {  
  
  @ManyToOne(() => Author)  
  author!: Rel<Author>;  
  
}  
```
[](https://github.com/mikro-orm/mikro-orm/edit/master/docs/versioned_docs/version-5.9/relationships.md)
Last updated on **Feb 10, 2024** by **Vasil Rangelov**
[Previous Defining Entities](https://mikro-orm.io/docs/5.9/defining-entities)[Next Entity Manager](https://mikro-orm.io/docs/5.9/entity-manager)
  * [ManyToOne](https://mikro-orm.io/docs/5.9/relationships#manytoone)
  * [OneToMany](https://mikro-orm.io/docs/5.9/relationships#onetomany)
  * [OneToOne](https://mikro-orm.io/docs/5.9/relationships#onetoone)
    * [Owning Side](https://mikro-orm.io/docs/5.9/relationships#owning-side)
    * [Inverse Side](https://mikro-orm.io/docs/5.9/relationships#inverse-side)
  * [ManyToMany](https://mikro-orm.io/docs/5.9/relationships#manytomany)
    * [Owning Side](https://mikro-orm.io/docs/5.9/relationships#owning-side-1)
    * [Inverse Side](https://mikro-orm.io/docs/5.9/relationships#inverse-side-1)
  * [Relations in ESM projects](https://mikro-orm.io/docs/5.9/relationships#relations-in-esm-projects)
#### Docs
  * [Quick Start](https://mikro-orm.io/docs/quick-start)
  * [Getting Started](https://mikro-orm.io/docs/guide)
  * [Migration from v6 to v7](https://mikro-orm.io/docs/upgrading-v6-to-v7)
  * [Version 6.6 docs](https://mikro-orm.io/docs/6.6/quick-start)
#### Community
  * [Discord](https://discord.gg/w8bjxFHS7X)
  * [Slack](https://join.slack.com/t/mikroorm/shared_invite/enQtNTM1ODYzMzM4MDk3LWM4ZDExMjU5ZDhmNjA2MmM3MWMwZmExNjhhNDdiYTMwNWM0MGY5ZTE3ZjkyZTMzOWExNDgyYmMzNDE1NDI5NjA)
  * [Stack Overflow](https://stackoverflow.com/questions/ask?tags=mikro-orm)
#### Social
  * [Blog](https://mikro-orm.io/blog)
  * [Twitter](https://twitter.com/MikroORM)
  * [GitHub](https://github.com/mikro-orm/mikro-orm)
  * [GitHub Sponsors](https://github.com/sponsors/mikro-orm)
![MikroORM](https://mikro-orm.io/img/logo-header.svg)
Copyright © 2018-2026 Martin Adámek. Built with Docusaurus.
============================================================
# https://mikro-orm.io/docs/5.9/entity-manager
============================================================
[Skip to main content](https://mikro-orm.io/docs/5.9/entity-manager#__docusaurus_skipToContent_fallback)
⭐️ If you like MikroORM, give it a star on [GitHub](https://github.com/mikro-orm/mikro-orm) and consider [sponsoring](https://github.com/sponsors/mikro-orm) its development! ⭐️
[![MikroORM](https://mikro-orm.io/img/logo.svg)](https://mikro-orm.io/)
[5.9](https://mikro-orm.io/docs/5.9/entity-manager)
  * [Next](https://mikro-orm.io/docs/next/entity-manager)
  * [7.1](https://mikro-orm.io/docs/entity-manager)
  * [7.0](https://mikro-orm.io/docs/7.0/entity-manager)
  * [6.6](https://mikro-orm.io/docs/6.6/entity-manager)
  * [5.9](https://mikro-orm.io/docs/5.9/entity-manager)
[Docs](https://mikro-orm.io/docs/quick-start)[API](https://mikro-orm.io/api)[Blog](https://mikro-orm.io/blog)[Changelog](https://mikro-orm.io/changelog)
[latest: v7.1.3](https://mikro-orm.io/versions)[Discord](https://discord.gg/w8bjxFHS7X "Chat on Discord")[GitHub](https://github.com/mikro-orm/mikro-orm "View on GitHub")[Twitter](https://twitter.com/MikroORM "Twitter")
Search`Ctrl``K`
  * [Overview](https://mikro-orm.io/docs/5.9/entity-manager)
    * [Installation & Usage](https://mikro-orm.io/docs/5.9/installation)
    * [Defining Entities](https://mikro-orm.io/docs/5.9/defining-entities)
    * [Modeling Entity Relationships](https://mikro-orm.io/docs/5.9/relationships)
    * [Entity Manager](https://mikro-orm.io/docs/5.9/entity-manager)
    * [Unit of Work](https://mikro-orm.io/docs/5.9/unit-of-work)
  * [Fundamentals](https://mikro-orm.io/docs/5.9/fundamentals)
  * [Advanced Features](https://mikro-orm.io/docs/5.9/advanced)
  * [Reference](https://mikro-orm.io/docs/5.9/reference)
  * [Usage with Different Drivers](https://mikro-orm.io/docs/5.9/drivers)
  * [Recipes](https://mikro-orm.io/docs/5.9/recipes)
  * [Example Integrations](https://mikro-orm.io/docs/5.9/examples)
  * [Upgrading](https://mikro-orm.io/docs/5.9/upgrading)
This is documentation for MikroORM **5.9** , which is no longer actively maintained.
For up-to-date documentation, see the **[latest version](https://mikro-orm.io/docs/entity-manager)** (7.1).
  * [](https://mikro-orm.io/)
  * Overview
Version: 5.9
On this page
# Working with Entity Manager
## Persist and Flush[​](https://mikro-orm.io/docs/5.9/entity-manager#persist-and-flush "Direct link to Persist and Flush")
There are 2 methods we should first describe to understand how persisting works in MikroORM: `em.persist()` and `em.flush()`.
`em.persist(entity)` is used to mark new entities for future persisting. It will make the entity managed by given `EntityManager` and once `flush` will be called, it will be written to the database.
To understand `flush`, lets first define what managed entity is: An entity is managed if it’s fetched from the database (via `em.find()`, `em.findOne()` or via other managed entity) or registered as new through `em.persist()`.
`em.flush()` will go through all managed entities, compute appropriate change sets and perform according database queries. As an entity loaded from database becomes managed automatically, we do not have to call persist on those, and flush is enough to update them.
```
const book = await em.findOne(Book, 1);  
book.title = 'How to persist things...';  
  
// no need to persist `book` as its already managed by the EM  
await em.flush();  
```
## Persisting and Cascading[​](https://mikro-orm.io/docs/5.9/entity-manager#persisting-and-cascading "Direct link to Persisting and Cascading")
To save entity state to database, we need to persist it. Persist determines whether to use `insert` or `update` and computes appropriate change-set. Entity references that are not persisted yet (does not have identifier) will be cascade persisted automatically.
```
// use constructors in our entities for required parameters  
const author = new Author('Jon Snow', 'snow@wall.st');  
author.born = new Date();  
  
const publisher = new Publisher('7K publisher');  
  
const book1 = new Book('My Life on The Wall, part 1', author);  
book1.publisher = publisher;  
const book2 = new Book('My Life on The Wall, part 2', author);  
book2.publisher = publisher;  
const book3 = new Book('My Life on The Wall, part 3', author);  
book3.publisher = publisher;  
  
// just persist books, author and publisher will be automatically cascade persisted  
await em.persistAndFlush([book1, book2, book3]);  
  
// or one by one  
em.persist(book1);  
em.persist(book2);  
em.persist(book3);  
await em.flush(); // flush everything to database at once  
```
## Entity references[​](https://mikro-orm.io/docs/5.9/entity-manager#entity-references "Direct link to Entity references")
MikroORM represents every entity as an object, even those that are not fully loaded. Those are called entity references - they are in fact regular entity class instances, but only with their primary key available. This makes it possible to create them without querying the database. References are stored in the identity map just like any other entity.
```
const userRef = em.getReference(User, 1);  
console.log(userRef);  
```
This will log something like `(User) { id: 1 }`, note the class name being wrapped in parens - this tells you the entity is not-initialized state and represents just the primary key.
Here is an example of common actions you can do with a reference instead of a fully loaded entity:
```
// setting relation properties  
author.favouriteBook = em.getReference(Book, 1);  
  
// removing entity by reference  
em.remove(em.getReference(Book, 2));  
  
// adding entity to collection by reference  
author.books.add(em.getReference(Book, 3));  
```
The concept can be combined with the so-called `Reference` wrapper for added type safety as described in the [Type-safe Relations section](https://mikro-orm.io/docs/5.9/type-safe-relations).
## Entity state and `WrappedEntity`[​](https://mikro-orm.io/docs/5.9/entity-manager#entity-state-and-wrappedentity "Direct link to entity-state-and-wrappedentity")
During entity discovery (which happens when you call `MikroORM.init()`), the ORM will patch the entity prototype and generate a lazy getter for the `WrappedEntity` - a class holding various metadata and state information about the entity. Each entity instance will have one, available under a hidden `__helper` property - to access its API in a type-safe way, use the `wrap()` helper:
```
import { wrap } from '@mikro-orm/core';  
  
const userRef = em.getReference(User, 1);  
console.log('userRef is initialized:', wrap(userRef).isInitialized()); // false  
  
await wrap(userRef).init();  
console.log('userRef is initialized:', wrap(userRef).isInitialized()); // true  
```
> You can also extend the `BaseEntity` provided by MikroORM. It defines all the public methods available via `wrap()` helper, so you could do `userRef.isInitialized()` or `userRef.init()`.
The `WrappedEntity` instance also holds the state of the entity at the time it was loaded or flushed - this state is then used by the Unit of Work during flush to compute the differences. Another use case is serialization, we can use the `toObject()`, `toPOJO()` and `toJSON()` methods to convert the entity instance to a plain JavaScript object.
## Removing entities[​](https://mikro-orm.io/docs/5.9/entity-manager#removing-entities "Direct link to Removing entities")
To delete entities via `EntityManager`, we have two possibilities:
  1. Mark entity instance via `em.remove()` - this means we first need to have the entity instance. But don't worry, you can get one even without loading it from the database - via `em.getReference()`.
  2. Fire `DELETE` query via `em.nativeDelete()` - when all you want is a simple delete query, it can be simple as that.
Let's test the first approach with removing by entity instance:
```
// using reference is enough, no need for a fully initialized entity  
const book1 = em.getReference(Book, 1);  
await em.remove(book1).flush();  
```
## Fetching Entities with EntityManager[​](https://mikro-orm.io/docs/5.9/entity-manager#fetching-entities-with-entitymanager "Direct link to Fetching Entities with EntityManager")
To fetch entities from database we can use `find()` and `findOne()`:
```
const author = await em.findOne(Author, 123);  
const books = await em.find(Book, {});  
  
for (const author of authors) {  
  console.log(author.name); // Jon Snow  
  
  for (const book of author.books) {  
    console.log(book.title); // initialized  
    console.log(book.author.isInitialized()); // true  
    console.log(book.author.id);  
    console.log(book.author.name); // Jon Snow  
    console.log(book.publisher); // just reference  
    console.log(book.publisher.isInitialized()); // false  
    console.log(book.publisher.id);  
    console.log(book.publisher.name); // undefined  
  }  
}  
```
To populate entity relations, we can use `populate` parameter.
```
const books = await em.find(Book, { foo: 1 }, { populate: ['author.friends'] });  
```
You can also use `em.populate()` helper to populate relations (or to ensure they are fully populated) on already loaded entities. This is also handy when loading entities via `QueryBuilder`:
```
const authors = await em.createQueryBuilder(Author).select('*').getResult();  
await em.populate(authors, { populate: ['books.tags'] });  
  
// now our Author entities will have `books` collections populated,  
// as well as they will have their `tags` collections populated.  
console.log(authors[0].books[0].tags[0]); // initialized BookTag  
```
### Conditions Object (`FilterQuery<T>`)[​](https://mikro-orm.io/docs/5.9/entity-manager#conditions-object-filterqueryt "Direct link to conditions-object-filterqueryt")
Querying entities via conditions object (`where` in `em.find(Entity, where: FilterQuery<T>)`) supports many different ways:
```
// search by entity properties  
const users = await em.find(User, { firstName: 'John' });  
  
// for searching by reference we can use primary key directly  
const id = 1;  
const users = await em.find(User, { organization: id });  
  
// or pass unpopulated reference (including `Reference` wrapper)  
const ref = await em.getReference(Organization, id);  
const users = await em.find(User, { organization: ref });  
  
// fully populated entities as also supported  
const ent = await em.findOne(Organization, id);  
const users = await em.find(User, { organization: ent });  
  
// complex queries with operators  
const users = await em.find(User, { $and: [{ id: { $nin: [3, 4] } }, { id: { $gt: 2 } }] });  
  
// we can also search for array of primary keys directly  
const users = await em.find(User, [1, 2, 3, 4, 5]);  
  
// and in findOne all of this works, plus we can search by single primary key  
const user1 = await em.findOne(User, 1);  
```
As we can see in the fifth example, one can also use operators like `$and`, `$or`, `$gte`, `$gt`, `$lte`, `$lt`, `$in`, `$nin`, `$eq`, `$ne`, `$like`, `$re` and `$fulltext`. More about that can be found in [Query Conditions](https://mikro-orm.io/docs/5.9/query-conditions) section.
#### Using custom classes in `FilterQuery`[​](https://mikro-orm.io/docs/5.9/entity-manager#using-custom-classes-in-filterquery "Direct link to using-custom-classes-in-filterquery")
If we decide to abstract the filter options in our own object then we might run into the problem that the find option does not return the results we'd expect. This is due to the fact that the `FilterQuery` should be provided as a plain object (POJO), and not a class instance with prototype.
If we want to provide our own `FilterQuery` DTO, then our DTO class should extend the `PlainObject` class. This way MikroORM knows it should be treated as such.
```
import { PlainObject } from '@mikro-orm/core';  
  
class Filter extends PlainObject {  
  name: string;  
}  
  
const where = new Filter();  
where.name = 'Jon';  
const res = await em.find(Author, where);  
```
#### Mitigating `Type instantiation is excessively deep and possibly infinite.ts(2589)` error[​](https://mikro-orm.io/docs/5.9/entity-manager#mitigating-type-instantiation-is-excessively-deep-and-possibly-infinitets2589-error "Direct link to mitigating-type-instantiation-is-excessively-deep-and-possibly-infinitets2589-error")
Sometimes we might be facing TypeScript errors caused by too complex query for it to properly infer all types. Usually it can be solved by providing the type argument explicitly.
You can also opt in to use repository instead, as there the type inference should not be problematic.
> As a last resort, we can always type cast the query to `any`.
```
const books = await em.find<Book>(Book, { ... our complex query ... });  
// or  
const books = await em.getRepository(Book).find({ ... our complex query ... });  
// or  
const books = await em.find<any>(Book, { ... our complex query ... }) as Book[];  
```
Another problem we might be facing is `RangeError: Maximum call stack size exceeded` error thrown during TypeScript compilation (usually from file `node_modules/typescript/lib/typescript.js`). The solution to this is the same, just provide the type argument explicitly.
### Searching by referenced entity fields[​](https://mikro-orm.io/docs/5.9/entity-manager#searching-by-referenced-entity-fields "Direct link to Searching by referenced entity fields")
You can also search by referenced entity properties. Simply pass nested where condition like this and all requested relationships will be automatically joined. Currently it will only join them so we can search and sort by those. To populate entities, do not forget to pass the populate parameter as well.
```
// find author of a book that has tag specified by name  
const author = await em.findOne(Author, { books: { tags: { name: 'Tag name' } } });  
console.log(author.books.isInitialized()); // false, as it only works for query and sort  
  
const author = await em.findOne(Author, { books: { tags: { name: 'Tag name' } } }, { populate: ['books.tags'] });  
console.log(author.books.isInitialized()); // true, because it was populated  
console.log(author.books[0].tags.isInitialized()); // true, because it was populated  
console.log(author.books[0].tags[0].isInitialized()); // true, because it was populated  
```
> This feature is fully available only for SQL drivers. In MongoDB always we need to query from the owning side - so in the example above, first load book tag by name, then associated book, then the author. Another option is to denormalize the schema.
### Fetching Partial Entities[​](https://mikro-orm.io/docs/5.9/entity-manager#fetching-partial-entities "Direct link to Fetching Partial Entities")
> This feature is supported only for `SELECT_IN` loading strategy.
When fetching single entity, we can choose to select only parts of an entity via `options.fields`:
```
const author = await em.findOne(Author, '...', { fields: ['name', 'born'] });  
console.log(author.id); // PK is always selected  
console.log(author.name); // Jon Snow  
console.log(author.email); // undefined  
```
From v4.4 it is also possible to specify fields for nested relations:
```
const author = await em.findOne(Author, '...', { fields: ['name', 'books.title', 'books.author', 'books.price'] });  
```
Or with an alternative object syntax:
```
const author = await em.findOne(Author, '...', { fields: ['name', { books: ['title', 'author', 'price'] }] });  
```
It is also possible to use multiple levels:
```
const author = await em.findOne(Author, '...', { fields: ['name', { books: ['title', 'price', 'author', { author: ['email'] }] }] });  
```
Primary keys are always selected even if we omit them. On the other hand, we are responsible for selecting the FKs - if we omit such property, the relation might not be loaded properly. In the following example the books would not be linked the author, because we did not specify the `books.author` field to be loaded.
```
// this will load both author and book entities, but they won't be connected due to the missing FK in select  
const author = await em.findOne(Author, '...', { fields: ['name', { books: ['title', 'price'] });  
```
> Same problem can occur in mongo with M:N collections - those are stored as array property on the owning entity, so we need to make sure to mark such properties too.
### Fetching Paginated Results[​](https://mikro-orm.io/docs/5.9/entity-manager#fetching-paginated-results "Direct link to Fetching Paginated Results")
If we are going to paginate our results, we can use `em.findAndCount()` that will return total count of entities before applying limit and offset.
```
const [authors, count] = await em.findAndCount(Author, { ... }, { limit: 10, offset: 50 });  
console.log(authors.length); // based on limit parameter, e.g. 10  
console.log(count); // total count, e.g. 1327  
```
### Handling Not Found Entities[​](https://mikro-orm.io/docs/5.9/entity-manager#handling-not-found-entities "Direct link to Handling Not Found Entities")
When we call `em.findOne()` and no entity is found based on our criteria, `null` will be returned. If we rather have an `Error` instance thrown, we can use `em.findOneOrFail()`:
```
const author = await em.findOne(Author, { name: 'does-not-exist' });  
console.log(author === null); // true  
  
try {  
  const author = await em.findOneOrFail(Author, { name: 'does-not-exist' });  
  // author will be always found here  
} catch (e) {  
  console.error('Not found', e);  
}  
```
You can customize the error either globally via `findOneOrFailHandler` option, or locally via `failHandler` option in `findOneOrFail` call.
```
try {  
  const author = await em.findOneOrFail(Author, { name: 'does-not-exist' }, {  
    failHandler: (entityName: string, where: Record<string, any> | IPrimaryKey) => new Error(`Failed: ${entityName} in ${util.inspect(where)}`)  
  });  
} catch (e) {  
  console.error(e); // our custom error  
}  
```
### Using custom SQL fragments[​](https://mikro-orm.io/docs/5.9/entity-manager#using-custom-sql-fragments "Direct link to Using custom SQL fragments")
It is possible to use any SQL fragment in our `WHERE` query or `ORDER BY` clause:
> The `expr()` helper is an identity function - all it does is to return its parameter. We can use it to bypass the strict type checks in `FilterQuery`.
```
const users = await em.find(User, { [expr('lower(email)')]: 'foo@bar.baz' }, {  
  orderBy: { [`(point(loc_latitude, loc_longitude) <@> point(0, 0))`]: 'ASC' },  
});  
```
This will produce following query:
```
select `e0`.*  
from `user` as `e0`  
where lower(email) = 'foo@bar.baz'  
order by (point(loc_latitude, loc_longitude) <@> point(0, 0)) asc  
```
## Updating references (not loaded entities)[​](https://mikro-orm.io/docs/5.9/entity-manager#updating-references-not-loaded-entities "Direct link to Updating references \(not loaded entities\)")
Since v5.5, we can update references via Unit of Work, just like if it was a loaded entity. This way it is possible to issue update queries without loading the entity.
```
const ref = em.getReference(Author, 123);  
ref.name = 'new name';  
ref.email = 'new email';  
await em.flush();  
```
This is a rough equivalent to calling `em.nativeUpdate()`, with one significant difference - we use the flush operation which handles event execution, so all life cycle hooks as well as flush events will be fired.
## Upsert[​](https://mikro-orm.io/docs/5.9/entity-manager#upsert "Direct link to Upsert")
We can use `em.upsert()` create or update the entity, based on whether it is already present in the database. This method performs an `insert on conflict merge` query ensuring the database is in sync, returning a managed entity instance. The method accepts either `entityName` together with the entity `data`, or just entity instance.
```
// insert into "author" ("age", "email") values (33, 'foo@bar.com') on conflict ("email") do update set "age" = 33  
const author = await em.upsert(Author, { email: 'foo@bar.com', age: 33 });  
```
The entity data needs to contain either the primary key, or any other unique property. Let's consider the following example, where `Author.email` is a unique property:
```
// insert into "author" ("age", "email") values (33, 'foo@bar.com') on conflict ("email") do update set "age" = 33  
// select "id" from "author" where "email" = 'foo@bar.com'  
const author = await em.upsert(Author, { email: 'foo@bar.com', age: 33 });  
```
Depending on the driver support, this will either use a returning query, or a separate select query, to fetch the primary key if it's missing from the `data`.
If the entity is already present in current context, there won't be any queries - instead, the entity data will be assigned and an explicit `flush` will be required for those changes to be persisted.
You can also use detached entity instance, after the `em.upsert()` call it will become managed.
```
const author = em.create(Author, { email: 'foo@bar.com', age: 33 });  
await em.upsert(author);  
```
Since v5.6 there is also `em.upsertMany()` with similar signature:
```
const [author1, author2, author3] = await em.upsertMany(Author, [  
  { email: 'a1', age: 41 },  
  { email: 'a2', age: 42 },  
  { email: 'a3', age: 43 },  
]);  
```
By default, the EntityManager will prefer using the primary key, and fallback to the first unique property with a value. Sometimes this might not be the wanted behaviour, one example is when you generate the primary key via property initializer, e.g. with `uuid.v4()`. For those advanced cases, you can control how the underlying upserting logic works via the following options:
  * `onConflictFields?: (keyof T)[]` to control the conflict clause
  * `onConflictAction?: 'ignore' | 'merge'` used ignore and merge as that is how the QB methods are called
  * `onConflictMergeFields?: (keyof T)[]` to control the merge clause
  * `onConflictExcludeFields?: (keyof T)[]` to omit fields from the merge clause
```
const [author1, author2, author3] = await em.upsertMany(Author, [{ ... }, { ... }, { ... }], {  
  onConflictFields: ['email'], // specify a manual set of fields pass to the on conflict clause  
  onConflictAction: 'merge',  
  onConflictExcludeFields: ['id'],  
});  
```
This will generate query similar to the following:
```
insert into "author"   
  ("id", "current_age", "email", "foo")  
  values  
    (1, 41, 'a1', true),  
    (2, 42, 'a2', true),  
    (5, 43, 'a3', true)  
  on conflict ("email")   
  do update set  
    "current_age" = excluded."current_age",  
    "foo" = excluded."foo"   
  returning "_id", "current_age", "foo", "bar"  
```
## Refreshing entity state[​](https://mikro-orm.io/docs/5.9/entity-manager#refreshing-entity-state "Direct link to Refreshing entity state")
We can use `em.refresh(entity)` to synchronize the entity state with database. This is a shortcut for calling `em.findOne()` with `refresh: true` and disabled auto-flush.
> This results in loss of any changes done to that entity.
```
const author = await em.findOneOrFail(Author, { name: 'Jon' });  
console.log(author.name); // 'Jon'  
  
// changes to entity will be lost!  
author.name = '123';  
  
// refresh the value, ignore any changes  
await em.refresh(author);  
console.log(author.name); // 'Jon'  
```
## Batch inserts, updates and deletes[​](https://mikro-orm.io/docs/5.9/entity-manager#batch-inserts-updates-and-deletes "Direct link to Batch inserts, updates and deletes")
When you flush changes made to one entity type, only one query per given operation (create/update/delete) will be executed.
```
for (let i = 1; i <= 5; i++) {  
  const u = new User(`Peter ${i}`, `peter+${i}@foo.bar`);  
  em.persist(u);  
}  
  
await em.flush();  
  
// insert into `user` (`name`, `email`) values  
//   ('Peter 1', 'peter+1@foo.bar'),  
//   ('Peter 2', 'peter+2@foo.bar'),  
//   ('Peter 3', 'peter+3@foo.bar'),  
//   ('Peter 4', 'peter+4@foo.bar'),  
//   ('Peter 5', 'peter+5@foo.bar');  
```
```
for (const user of users) {  
  user.name += ' changed!';  
}  
  
await em.flush();  
  
// update `user` set  
//   `name` = case  
//     when (`id` = 1) then 'Peter 1 changed!'  
//     when (`id` = 2) then 'Peter 2 changed!'  
//     when (`id` = 3) then 'Peter 3 changed!'  
//     when (`id` = 4) then 'Peter 4 changed!'  
//     when (`id` = 5) then 'Peter 5 changed!'  
//     else `priority` end  
//   where `id` in (1, 2, 3, 4, 5)  
```
```
em.remove(users);  
await em.flush();  
  
// delete from `user` where `id` in (1, 2, 3, 4, 5)  
```
## Disabling identity map and change set tracking[​](https://mikro-orm.io/docs/5.9/entity-manager#disabling-identity-map-and-change-set-tracking "Direct link to Disabling identity map and change set tracking")
Sometimes we might want to disable identity map and change set tracking for some query. This is possible via `disableIdentityMap` option. Behind the scenes, it will create new context, load the entities inside that, and clear it afterwards, so the main identity map will stay clean.
> As opposed to _managed_ entities, such entities are called _detached_. To be able to work with them, we first need to merge them via `em.merge()`.
```
const users = await em.find(User, { email: 'foo@bar.baz' }, {  
  disableIdentityMap: true,  
  populate: ['cars.brand'],  
});  
users[0].name = 'changed';  
await em.flush(); // calling flush have no effect, as the entity is not managed  
```
> Keep in mind that this can also have [negative effect on the performance](https://stackoverflow.com/questions/9259480/entity-framework-mergeoption-notracking-bad-performance).
## Type of Fetched Entities[​](https://mikro-orm.io/docs/5.9/entity-manager#type-of-fetched-entities "Direct link to Type of Fetched Entities")
Both `em.find` and `em.findOne()` methods have generic return types. All of following examples are equal and will let typescript correctly infer the entity type:
```
const author1 = await em.findOne<Author>(Author.name, 123);  
const author2 = await em.findOne<Author>('Author', 123);  
const author3 = await em.findOne(Author, 123);  
```
As the last one is the least verbose, it should be preferred.
## Entity Repositories[​](https://mikro-orm.io/docs/5.9/entity-manager#entity-repositories "Direct link to Entity Repositories")
Although we can use `EntityManager` directly, much more convenient way is to use [`EntityRepository` instead](https://mikro-orm.io/repositories/). You can register our repositories in dependency injection container like [InversifyJS](http://inversify.io/) so we do not need to get them from `EntityManager` each time.
For more examples, take a look at [`tests/EntityManager.mongo.test.ts`](https://github.com/mikro-orm/mikro-orm/blob/master/tests/EntityManager.mongo.test.ts) or [`tests/EntityManager.mysql.test.ts`](https://github.com/mikro-orm/mikro-orm/blob/master/tests/EntityManager.mysql.test.ts).
## Custom Property Ordering[​](https://mikro-orm.io/docs/5.9/entity-manager#custom-property-ordering "Direct link to Custom Property Ordering")
Entity properties provide some support for custom ordering via the `customOrder` attribute. This is useful for values that have a natural order that doesn't align with their underlying data representation. Consider the code below, the natural sorting order would be `high`, `low`, `medium`. However we can provide the `customOrder` to indicate how the enum values should be sorted.
```
enum Priority { Low = 'low', Medium = 'medium', High = 'high' }  
@Entity()  
class Task {  
  @PrimaryKey()  
  id!: number  
  
  @Property()  
  label!: string  
  
  @Enum({  
    items: () => Priority,  
    customOrder: [Priority.Low, Priority.Medium, Priority.High]  
  })  
  priority!: Priority  
}  
  
// ...  
  
await em.persistAndFlush([  
  em.create(Task, { label: 'A', priority: Priority.Low }),  
  em.create(Task, { label: 'B', priority: Priority.Medium }),  
  em.create(Task, { label: 'C', priority: Priority.High })  
]);  
  
const tasks = await em.find(Task, {}, { orderBy: { priority: QueryOrder.ASC } });  
for (const t of tasks) {  
  console.log(t.label);  
}  
// Logs A, B, C  
```
[](https://github.com/mikro-orm/mikro-orm/edit/master/docs/versioned_docs/version-5.9/entity-manager.md)
Last updated on **Feb 10, 2024** by **Vasil Rangelov**
[Previous Modeling Entity Relationships](https://mikro-orm.io/docs/5.9/relationships)[Next Unit of Work](https://mikro-orm.io/docs/5.9/unit-of-work)
  * [Persist and Flush](https://mikro-orm.io/docs/5.9/entity-manager#persist-and-flush)
  * [Persisting and Cascading](https://mikro-orm.io/docs/5.9/entity-manager#persisting-and-cascading)
  * [Entity references](https://mikro-orm.io/docs/5.9/entity-manager#entity-references)
  * [Entity state and `WrappedEntity`](https://mikro-orm.io/docs/5.9/entity-manager#entity-state-and-wrappedentity)
  * [Removing entities](https://mikro-orm.io/docs/5.9/entity-manager#removing-entities)
  * [Fetching Entities with EntityManager](https://mikro-orm.io/docs/5.9/entity-manager#fetching-entities-with-entitymanager)
    * [Conditions Object (`FilterQuery<T>`)](https://mikro-orm.io/docs/5.9/entity-manager#conditions-object-filterqueryt)
    * [Searching by referenced entity fields](https://mikro-orm.io/docs/5.9/entity-manager#searching-by-referenced-entity-fields)
    * [Fetching Partial Entities](https://mikro-orm.io/docs/5.9/entity-manager#fetching-partial-entities)
    * [Fetching Paginated Results](https://mikro-orm.io/docs/5.9/entity-manager#fetching-paginated-results)
    * [Handling Not Found Entities](https://mikro-orm.io/docs/5.9/entity-manager#handling-not-found-entities)
    * [Using custom SQL fragments](https://mikro-orm.io/docs/5.9/entity-manager#using-custom-sql-fragments)
  * [Updating references (not loaded entities)](https://mikro-orm.io/docs/5.9/entity-manager#updating-references-not-loaded-entities)
  * [Upsert](https://mikro-orm.io/docs/5.9/entity-manager#upsert)
  * [Refreshing entity state](https://mikro-orm.io/docs/5.9/entity-manager#refreshing-entity-state)
  * [Batch inserts, updates and deletes](https://mikro-orm.io/docs/5.9/entity-manager#batch-inserts-updates-and-deletes)
  * [Disabling identity map and change set tracking](https://mikro-orm.io/docs/5.9/entity-manager#disabling-identity-map-and-change-set-tracking)
  * [Type of Fetched Entities](https://mikro-orm.io/docs/5.9/entity-manager#type-of-fetched-entities)
  * [Entity Repositories](https://mikro-orm.io/docs/5.9/entity-manager#entity-repositories)
  * [Custom Property Ordering](https://mikro-orm.io/docs/5.9/entity-manager#custom-property-ordering)
#### Docs
  * [Quick Start](https://mikro-orm.io/docs/quick-start)
  * [Getting Started](https://mikro-orm.io/docs/guide)
  * [Migration from v6 to v7](https://mikro-orm.io/docs/upgrading-v6-to-v7)
  * [Version 6.6 docs](https://mikro-orm.io/docs/6.6/quick-start)
#### Community
  * [Discord](https://discord.gg/w8bjxFHS7X)
  * [Slack](https://join.slack.com/t/mikroorm/shared_invite/enQtNTM1ODYzMzM4MDk3LWM4ZDExMjU5ZDhmNjA2MmM3MWMwZmExNjhhNDdiYTMwNWM0MGY5ZTE3ZjkyZTMzOWExNDgyYmMzNDE1NDI5NjA)
  * [Stack Overflow](https://stackoverflow.com/questions/ask?tags=mikro-orm)
#### Social
  * [Blog](https://mikro-orm.io/blog)
  * [Twitter](https://twitter.com/MikroORM)
  * [GitHub](https://github.com/mikro-orm/mikro-orm)
  * [GitHub Sponsors](https://github.com/sponsors/mikro-orm)
![MikroORM](https://mikro-orm.io/img/logo-header.svg)
Copyright © 2018-2026 Martin Adámek. Built with Docusaurus.
============================================================
# https://mikro-orm.io/docs/5.9/unit-of-work
============================================================
[Skip to main content](https://mikro-orm.io/docs/5.9/unit-of-work#__docusaurus_skipToContent_fallback)
⭐️ If you like MikroORM, give it a star on [GitHub](https://github.com/mikro-orm/mikro-orm) and consider [sponsoring](https://github.com/sponsors/mikro-orm) its development! ⭐️
[![MikroORM](https://mikro-orm.io/img/logo.svg)](https://mikro-orm.io/)
[5.9](https://mikro-orm.io/docs/5.9/unit-of-work)
  * [Next](https://mikro-orm.io/docs/next/unit-of-work)
  * [7.1](https://mikro-orm.io/docs/unit-of-work)
  * [7.0](https://mikro-orm.io/docs/7.0/unit-of-work)
  * [6.6](https://mikro-orm.io/docs/6.6/unit-of-work)
  * [5.9](https://mikro-orm.io/docs/5.9/unit-of-work)
[Docs](https://mikro-orm.io/docs/quick-start)[API](https://mikro-orm.io/api)[Blog](https://mikro-orm.io/blog)[Changelog](https://mikro-orm.io/changelog)
[latest: v7.1.3](https://mikro-orm.io/versions)[Discord](https://discord.gg/w8bjxFHS7X "Chat on Discord")[GitHub](https://github.com/mikro-orm/mikro-orm "View on GitHub")[Twitter](https://twitter.com/MikroORM "Twitter")
Search`Ctrl``K`
  * [Overview](https://mikro-orm.io/docs/5.9/unit-of-work)
    * [Installation & Usage](https://mikro-orm.io/docs/5.9/installation)
    * [Defining Entities](https://mikro-orm.io/docs/5.9/defining-entities)
    * [Modeling Entity Relationships](https://mikro-orm.io/docs/5.9/relationships)
    * [Entity Manager](https://mikro-orm.io/docs/5.9/entity-manager)
    * [Unit of Work](https://mikro-orm.io/docs/5.9/unit-of-work)
  * [Fundamentals](https://mikro-orm.io/docs/5.9/fundamentals)
  * [Advanced Features](https://mikro-orm.io/docs/5.9/advanced)
  * [Reference](https://mikro-orm.io/docs/5.9/reference)
  * [Usage with Different Drivers](https://mikro-orm.io/docs/5.9/drivers)
  * [Recipes](https://mikro-orm.io/docs/5.9/recipes)
  * [Example Integrations](https://mikro-orm.io/docs/5.9/examples)
  * [Upgrading](https://mikro-orm.io/docs/5.9/upgrading)
This is documentation for MikroORM **5.9** , which is no longer actively maintained.
For up-to-date documentation, see the **[latest version](https://mikro-orm.io/docs/unit-of-work)** (7.1).
  * [](https://mikro-orm.io/)
  * Overview
Version: 5.9
On this page
# Unit of Work and Transactions
MikroORM uses the Identity Map pattern to track objects. Whenever you fetch an object from the database, MikroORM will keep a reference to this object inside its `UnitOfWork`.
This allows MikroORM room for optimizations. If you call the EntityManager and ask for an entity with a specific ID twice, it will return the same instance:
```
const authorRepository = em.getRepository(Author);  
const jon1 = await authorRepository.findOne(1);  
const jon2 = await authorRepository.findOne(1);  
  
// identity map in action  
console.log(jon1 === jon2); // true  
```
Only one SELECT query will be fired against the database here. In the second `findOne()` call MikroORM will check the identity map first and will skip the database round trip as it will find the entity already loaded.
The identity map being indexed by primary keys only allows shortcuts when you ask for objects by primary key. When you query by other properties, you will still get the same reference, but two separate database calls will be made:
```
const authorRepository = em.getRepository(Author);  
const jon1 = await authorRepository.findOne({ name: 'Jon Snow' });  
const jon2 = await authorRepository.findOne({ name: 'Jon Snow' });  
  
// identity map in action  
console.log(jon1 === jon2); // true  
```
MikroORM only knows objects by id, so a query for different criteria has to go to the database, even if it was executed just before. But instead of creating a second `Author` object MikroORM first gets the primary key from the row and checks if it already has an object inside the `UnitOfWork` with that primary key.
## Persisting Managed Entities[​](https://mikro-orm.io/docs/5.9/unit-of-work#persisting-managed-entities "Direct link to Persisting Managed Entities")
The identity map has a second use-case. When you call `em.flush()`, MikroORM will ask the identity map for all objects that are currently managed. This means you don't have to call `em.persist()` over and over again to pass known objects to the `EntityManager`. This is a NO-OP for known entities, but leads to much code written that is confusing to other developers.
The following code WILL update your database with the changes made to the `Author` object, even if you did not call `em.persist()`:
```
const authorRepository = em.getRepository(Author);  
const jon = await authorRepository.findOne(1);  
jon.email = 'foo@bar.com';  
await authorRepository.flush(); // calling em.flush() has same effect  
```
## How MikroORM Detects Changes[​](https://mikro-orm.io/docs/5.9/unit-of-work#how-mikroorm-detects-changes "Direct link to How MikroORM Detects Changes")
MikroORM is a data-mapper that tries to achieve persistence-ignorance (PI). This means you map JS objects into a relational database that do not necessarily know about the database at all. A natural question would now be, "how does MikroORM even detect objects have changed?".
For this MikroORM keeps a second map inside the `UnitOfWork`. Whenever you fetch an object from the database MikroORM will keep a copy of all the properties and associations inside the `UnitOfWork`.
Now whenever you call `em.flush()` MikroORM will iterate over all entities you previously marked for persisting via `em.persist()`. For each object it will compare the original property and association values with the values that are currently set on the object. If changes are detected then the object is queued for a UPDATE operation. Only the fields that actually changed are updated.
## Implicit Transactions[​](https://mikro-orm.io/docs/5.9/unit-of-work#implicit-transactions "Direct link to Implicit Transactions")
First and most important implication of having Unit of Work is that it allows handling transactions automatically.
When you call `em.flush()`, all computed changes are queried inside a database transaction (if supported by given driver). This means that you can control the boundaries of transactions simply by calling `em.persist()` and once all your changes are ready, simply calling `flush()` will run them inside a transaction.
> You can also control the transaction boundaries manually via `em.transactional(cb)`.
```
const user = await em.findOne(User, 1);  
user.email = 'foo@bar.com';  
const car = new Car();  
user.cars.add(car);  
  
// thanks to bi-directional cascading we only need to persist user entity  
// flushing will create a transaction, insert new car and update user with new email  
await em.persistAndFlush(user);  
```
You can find more information about transactions in [Transactions and concurrency](https://mikro-orm.io/docs/5.9/transactions) page.
## Flush Modes[​](https://mikro-orm.io/docs/5.9/unit-of-work#flush-modes "Direct link to Flush Modes")
The flushing strategy is given by the `flushMode` of the current running `EntityManager`.
  * `FlushMode.COMMIT` - The `EntityManager` delays the flush until the current Transaction is committed.
  * `FlushMode.AUTO` - This is the default mode, and it flushes the `EntityManager` only if necessary.
  * `FlushMode.ALWAYS` - Flushes the `EntityManager` before every query.
`FlushMode.AUTO` will try to detect changes on the entity we are querying, and flush if there is an overlap:
```
// querying for author will trigger auto-flush if we have new author persisted  
const a1 = new Author(...);  
em.persist(a1);  
const r1 = await em.find(Author, {});  
  
// querying author won't trigger auto-flush if we have new book, but no changes on author  
const b4 = new Book(...);  
em.persist(b4);  
const r2 = await em.find(Author, {});  
  
// but querying for book will trigger auto-flush  
const r3 = await em.find(Book, {});  
```
Changes on managed entities are also detected, although this works only based on simple dirty checks, no query analyses in place.
```
const book = await em.findOne(Book, 1);  
book.price = 1000;  
  
// triggers auto-flush because of the changed `price`  
const r1 = await em.find(Book, { price: { $gt: 500 } });  
  
// triggers auto-flush too, the book entity is dirty  
const r2 = await em.find(Book, { name: /foo.*/ });  
```
We can set the flush mode on different places:
  * in the ORM config via `Options.flushMode`
  * for given `EntityManager` instance (and its forks) via `em.setFlushMode()`
  * for given `EntityManager` fork via `em.fork({ flushMode })`
  * for given QueryBuilder instance via `qb.setFlushMode()`
  * for given transaction scope via `em.transactional(..., { flushMode })`
### Change tracking and performance considerations[​](https://mikro-orm.io/docs/5.9/unit-of-work#change-tracking-and-performance-considerations "Direct link to Change tracking and performance considerations")
When we use the default `FlushMode.AUTO`, we need to detect changes done on managed entities. To do this, every property is dynamically redefined as a `get/set` pair. While this should be all transparent to end users, it can lead to performance issues if we need to read some properties very often (e.g. millions of times).
> Scalar primary keys are never defined as `get/set` pairs.
To mitigate this, we can disable change tracking on a property level. Changing such properties will no longer trigger the auto flush mechanism, but they will be respected during explicit `flush()` call.
```
@Property({ trackChanges: false })  
code!: string;  
```
> This part of documentation is highly inspired by [doctrine internals docs](https://www.doctrine-project.org/projects/doctrine-orm/en/2.6/reference/unitofwork.html) as the behaviour here is pretty much the same.
[](https://github.com/mikro-orm/mikro-orm/edit/master/docs/versioned_docs/version-5.9/unit-of-work.md)
Last updated on **Oct 24, 2023** by **Martin Adámek**
[Previous Entity Manager](https://mikro-orm.io/docs/5.9/entity-manager)[Next Fundamentals](https://mikro-orm.io/docs/5.9/fundamentals)
  * [Persisting Managed Entities](https://mikro-orm.io/docs/5.9/unit-of-work#persisting-managed-entities)
  * [How MikroORM Detects Changes](https://mikro-orm.io/docs/5.9/unit-of-work#how-mikroorm-detects-changes)
  * [Implicit Transactions](https://mikro-orm.io/docs/5.9/unit-of-work#implicit-transactions)
  * [Flush Modes](https://mikro-orm.io/docs/5.9/unit-of-work#flush-modes)
    * [Change tracking and performance considerations](https://mikro-orm.io/docs/5.9/unit-of-work#change-tracking-and-performance-considerations)
#### Docs
  * [Quick Start](https://mikro-orm.io/docs/quick-start)
  * [Getting Started](https://mikro-orm.io/docs/guide)
  * [Migration from v6 to v7](https://mikro-orm.io/docs/upgrading-v6-to-v7)
  * [Version 6.6 docs](https://mikro-orm.io/docs/6.6/quick-start)
#### Community
  * [Discord](https://discord.gg/w8bjxFHS7X)
  * [Slack](https://join.slack.com/t/mikroorm/shared_invite/enQtNTM1ODYzMzM4MDk3LWM4ZDExMjU5ZDhmNjA2MmM3MWMwZmExNjhhNDdiYTMwNWM0MGY5ZTE3ZjkyZTMzOWExNDgyYmMzNDE1NDI5NjA)
  * [Stack Overflow](https://stackoverflow.com/questions/ask?tags=mikro-orm)
#### Social
  * [Blog](https://mikro-orm.io/blog)
  * [Twitter](https://twitter.com/MikroORM)
  * [GitHub](https://github.com/mikro-orm/mikro-orm)
  * [GitHub Sponsors](https://github.com/sponsors/mikro-orm)
![MikroORM](https://mikro-orm.io/img/logo-header.svg)
Copyright © 2018-2026 Martin Adámek. Built with Docusaurus.
============================================================
# https://mikro-orm.io/docs/5.9/fundamentals
============================================================
[Skip to main content](https://mikro-orm.io/docs/5.9/fundamentals#__docusaurus_skipToContent_fallback)
⭐️ If you like MikroORM, give it a star on [GitHub](https://github.com/mikro-orm/mikro-orm) and consider [sponsoring](https://github.com/sponsors/mikro-orm) its development! ⭐️
[![MikroORM](https://mikro-orm.io/img/logo.svg)](https://mikro-orm.io/)
[5.9](https://mikro-orm.io/docs/5.9/fundamentals)
  * [Next](https://mikro-orm.io/docs/next/quick-start)
  * [7.1](https://mikro-orm.io/docs/quick-start)
  * [7.0](https://mikro-orm.io/docs/7.0/quick-start)
  * [6.6](https://mikro-orm.io/docs/6.6/fundamentals)
  * [5.9](https://mikro-orm.io/docs/5.9/fundamentals)
[Docs](https://mikro-orm.io/docs/quick-start)[API](https://mikro-orm.io/api)[Blog](https://mikro-orm.io/blog)[Changelog](https://mikro-orm.io/changelog)
[latest: v7.1.3](https://mikro-orm.io/versions)[Discord](https://discord.gg/w8bjxFHS7X "Chat on Discord")[GitHub](https://github.com/mikro-orm/mikro-orm "View on GitHub")[Twitter](https://twitter.com/MikroORM "Twitter")
Search`Ctrl``K`
  * [Overview](https://mikro-orm.io/docs/5.9/fundamentals)
  * [Fundamentals](https://mikro-orm.io/docs/5.9/fundamentals)
    * [Identity Map](https://mikro-orm.io/docs/5.9/identity-map)
    * [Collections](https://mikro-orm.io/docs/5.9/collections)
    * [Type-Safe Relations](https://mikro-orm.io/docs/5.9/type-safe-relations)
    * [Entity Repository](https://mikro-orm.io/docs/5.9/repositories)
    * [Transactions and Concurrency](https://mikro-orm.io/docs/5.9/transactions)
    * [Inheritance Mapping](https://mikro-orm.io/docs/5.9/inheritance-mapping)
    * [Cascading](https://mikro-orm.io/docs/5.9/cascading)
    * [Filters](https://mikro-orm.io/docs/5.9/filters)
    * [Deployment](https://mikro-orm.io/docs/5.9/deployment)
    * [Using Query Builder](https://mikro-orm.io/docs/5.9/query-builder)
    * [Result cache](https://mikro-orm.io/docs/5.9/caching)
    * [Logging](https://mikro-orm.io/docs/5.9/logging)
  * [Advanced Features](https://mikro-orm.io/docs/5.9/advanced)
  * [Reference](https://mikro-orm.io/docs/5.9/reference)
  * [Usage with Different Drivers](https://mikro-orm.io/docs/5.9/drivers)
  * [Recipes](https://mikro-orm.io/docs/5.9/recipes)
  * [Example Integrations](https://mikro-orm.io/docs/5.9/examples)
  * [Upgrading](https://mikro-orm.io/docs/5.9/upgrading)
This is documentation for MikroORM **5.9** , which is no longer actively maintained.
For up-to-date documentation, see the **[latest version](https://mikro-orm.io/docs/quick-start)** (7.1).
Version: 5.9
# Fundamentals
## [ 📄️Identity Map MikroORM uses identity map in background, so we will always get the same instance of one entity.](https://mikro-orm.io/docs/5.9/identity-map)## [ 📄️Collections OneToMany and ManyToMany properties are stored in a Collection wrapper.](https://mikro-orm.io/docs/5.9/collections)## [ 📄️Type-Safe Relations Entity relations are mapped to entity references - instances of the entity that have at least the primary key available. This reference is stored in identity map, so you will get the same object reference when fetching the same document from database.](https://mikro-orm.io/docs/5.9/type-safe-relations)## [ 📄️Entity Repository Entity Repositories are thin layers on top of EntityManager. They act as an extension point, so we can add custom methods, or even alter the existing ones. The default, EntityRepository implementation just forwards the calls to underlying EntityManager instance.](https://mikro-orm.io/docs/5.9/repositories)## [ 📄️Transactions and Concurrency Starting v3.4, transactions are also supported in MongoDB driver.](https://mikro-orm.io/docs/5.9/transactions)## [ 📄️Inheritance Mapping Mapped Superclasses](https://mikro-orm.io/docs/5.9/inheritance-mapping)## [ 📄️Cascading From v4.2, cascade merging is no longer configurable (and is kept enabled for all relations).](https://mikro-orm.io/docs/5.9/cascading)## [ 📄️Filters MikroORM has the ability to pre-define filter criteria and attach those filters to given entities. The application can then decide at runtime whether certain filters should be enabled and what their parameter values should be. Filters can be used like database views, but they are parameterized inside the application.](https://mikro-orm.io/docs/5.9/filters)## [ 📄️Deployment Under the hood, MikroORM uses ts-morph to read TypeScript source files of all entities to be able to detect all types. Thanks to this, defining the type is enough for runtime validation.](https://mikro-orm.io/docs/5.9/deployment)## [ 📄️Using Query Builder Since v4, we need to make sure we are working with correctly typed EntityManager or EntityRepository to have access to createQueryBuilder() method.](https://mikro-orm.io/docs/5.9/query-builder)## [ 📄️Result cache MikroORM has simple result caching mechanism. It works with those methods of EntityManager: find(), findOne(), findAndCount(), findOneOrFail(), count(), as well as with QueryBuilder result methods (including execute).](https://mikro-orm.io/docs/5.9/caching)## [ 📄️Logging For development purposes it might come handy to enable logging and debug mode:](https://mikro-orm.io/docs/5.9/logging)[Previous Unit of Work](https://mikro-orm.io/docs/5.9/unit-of-work)[Next Identity Map](https://mikro-orm.io/docs/5.9/identity-map)
#### Docs
  * [Quick Start](https://mikro-orm.io/docs/quick-start)
  * [Getting Started](https://mikro-orm.io/docs/guide)
  * [Migration from v6 to v7](https://mikro-orm.io/docs/upgrading-v6-to-v7)
  * [Version 6.6 docs](https://mikro-orm.io/docs/6.6/quick-start)
#### Community
  * [Discord](https://discord.gg/w8bjxFHS7X)
  * [Slack](https://join.slack.com/t/mikroorm/shared_invite/enQtNTM1ODYzMzM4MDk3LWM4ZDExMjU5ZDhmNjA2MmM3MWMwZmExNjhhNDdiYTMwNWM0MGY5ZTE3ZjkyZTMzOWExNDgyYmMzNDE1NDI5NjA)
  * [Stack Overflow](https://stackoverflow.com/questions/ask?tags=mikro-orm)
#### Social
  * [Blog](https://mikro-orm.io/blog)
  * [Twitter](https://twitter.com/MikroORM)
  * [GitHub](https://github.com/mikro-orm/mikro-orm)
  * [GitHub Sponsors](https://github.com/sponsors/mikro-orm)
![MikroORM](https://mikro-orm.io/img/logo-header.svg)
Copyright © 2018-2026 Martin Adámek. Built with Docusaurus.
============================================================
# https://mikro-orm.io/docs/5.9/advanced
============================================================
[Skip to main content](https://mikro-orm.io/docs/5.9/advanced#__docusaurus_skipToContent_fallback)
⭐️ If you like MikroORM, give it a star on [GitHub](https://github.com/mikro-orm/mikro-orm) and consider [sponsoring](https://github.com/sponsors/mikro-orm) its development! ⭐️
[![MikroORM](https://mikro-orm.io/img/logo.svg)](https://mikro-orm.io/)
[5.9](https://mikro-orm.io/docs/5.9/advanced)
  * [Next](https://mikro-orm.io/docs/next/advanced)
  * [7.1](https://mikro-orm.io/docs/advanced)
  * [7.0](https://mikro-orm.io/docs/7.0/advanced)
  * [6.6](https://mikro-orm.io/docs/6.6/advanced)
  * [5.9](https://mikro-orm.io/docs/5.9/advanced)
[Docs](https://mikro-orm.io/docs/quick-start)[API](https://mikro-orm.io/api)[Blog](https://mikro-orm.io/blog)[Changelog](https://mikro-orm.io/changelog)
[latest: v7.1.3](https://mikro-orm.io/versions)[Discord](https://discord.gg/w8bjxFHS7X "Chat on Discord")[GitHub](https://github.com/mikro-orm/mikro-orm "View on GitHub")[Twitter](https://twitter.com/MikroORM "Twitter")
Search`Ctrl``K`
  * [Overview](https://mikro-orm.io/docs/5.9/advanced)
  * [Fundamentals](https://mikro-orm.io/docs/5.9/fundamentals)
  * [Advanced Features](https://mikro-orm.io/docs/5.9/advanced)
    * [Smart Nested Populate](https://mikro-orm.io/docs/5.9/nested-populate)
    * [Smart Query Conditions](https://mikro-orm.io/docs/5.9/query-conditions)
    * [Propagation](https://mikro-orm.io/docs/5.9/propagation)
    * [Loading Strategies](https://mikro-orm.io/docs/5.9/loading-strategies)
    * [Serializing](https://mikro-orm.io/docs/5.9/serializing)
    * [Updating Entity Values](https://mikro-orm.io/docs/5.9/entity-helper)
    * [Events and Hooks](https://mikro-orm.io/docs/5.9/events)
    * [Composite Primary Keys](https://mikro-orm.io/docs/5.9/composite-keys)
    * [Custom Types](https://mikro-orm.io/docs/5.9/custom-types)
    * [Virtual Entities](https://mikro-orm.io/docs/5.9/virtual-entities)
    * [Embeddables](https://mikro-orm.io/docs/5.9/embeddables)
    * [Defining Entities via EntitySchema](https://mikro-orm.io/docs/5.9/entity-schema)
    * [Using JSON properties](https://mikro-orm.io/docs/5.9/json-properties)
    * [Metadata Providers](https://mikro-orm.io/docs/5.9/metadata-providers)
    * [Metadata Cache](https://mikro-orm.io/docs/5.9/metadata-cache)
    * [Schema Generator](https://mikro-orm.io/docs/5.9/schema-generator)
    * [Entity Generator](https://mikro-orm.io/docs/5.9/entity-generator)
    * [Naming Strategy](https://mikro-orm.io/docs/5.9/naming-strategy)
    * [Property Validation](https://mikro-orm.io/docs/5.9/property-validation)
    * [Migrations](https://mikro-orm.io/docs/5.9/migrations)
    * [Seeding](https://mikro-orm.io/docs/5.9/seeding)
    * [Read Replica Connections](https://mikro-orm.io/docs/5.9/read-connections)
  * [Reference](https://mikro-orm.io/docs/5.9/reference)
  * [Usage with Different Drivers](https://mikro-orm.io/docs/5.9/drivers)
  * [Recipes](https://mikro-orm.io/docs/5.9/recipes)
  * [Example Integrations](https://mikro-orm.io/docs/5.9/examples)
  * [Upgrading](https://mikro-orm.io/docs/5.9/upgrading)
This is documentation for MikroORM **5.9** , which is no longer actively maintained.
For up-to-date documentation, see the **[latest version](https://mikro-orm.io/docs/advanced)** (7.1).
Version: 5.9
# Advanced Features
## [ 📄️Smart Nested Populate MikroORM is capable of loading large nested structures while maintaining good performance, querying each database table only once. Imagine you have this nested structure:](https://mikro-orm.io/docs/5.9/nested-populate)## [ 📄️Smart Query Conditions When you want to make complex queries, we can easily end up with a lot of boilerplate code full of curly brackets:](https://mikro-orm.io/docs/5.9/query-conditions)## [ 📄️Propagation By default, MikroORM will propagate all changes made to one side of bi-directional relations to the other side, keeping them in sync. This works for all relations, including M1. As part of the discovery process, all M1 properties are re-defined as getter/setter.](https://mikro-orm.io/docs/5.9/propagation)## [ 📄️Loading Strategies JOINED loading strategy is SQL only feature.](https://mikro-orm.io/docs/5.9/loading-strategies)## [ 📄️Serializing By default, all entities are monkey patched with toObject() and toJSON methods:](https://mikro-orm.io/docs/5.9/serializing)## [ 📄️Updating Entity Values Updating Entity Values with assign()](https://mikro-orm.io/docs/5.9/entity-helper)## [ 📄️Events and Hooks There are two ways to hook to the lifecycle of an entity:](https://mikro-orm.io/docs/5.9/events)## [ 📄️Composite Primary Keys Support for composite keys was added in version 3.5](https://mikro-orm.io/docs/5.9/composite-keys)## [ 📄️Custom Types You can define custom types by extending Type abstract class. It has several optional methods:](https://mikro-orm.io/docs/5.9/custom-types)## [ 📄️Virtual Entities Virtual entities don't represent any database table. Instead, they dynamically resolve to an SQL query (or an aggregation in mongo), allowing to map any kind of results onto an entity. Such entities are mean for read purposes, they don't have a primary key and therefore cannot be tracked for changes. In a sense they are similar to (currently unsupported) database views.](https://mikro-orm.io/docs/5.9/virtual-entities)## [ 📄️Embeddables Support for embeddables was added in version 4.0](https://mikro-orm.io/docs/5.9/embeddables)## [ 📄️Defining Entities via EntitySchema With EntitySchema helper we define the schema programmatically.](https://mikro-orm.io/docs/5.9/entity-schema)## [ 📄️Using JSON properties Defining JSON properties](https://mikro-orm.io/docs/5.9/json-properties)## [ 📄️Metadata Providers As part of entity discovery process, MikroORM uses so called MetadataProvider to get necessary type information about our entities' properties.](https://mikro-orm.io/docs/5.9/metadata-providers)## [ 📄️Metadata Cache In v4 and later versions, we need to explicitly install @mikro-orm/reflection to use TsMorphMetadataProvider.](https://mikro-orm.io/docs/5.9/metadata-cache)## [ 📄️Schema Generator SchemaGenerator can do harm to your database. It will drop or alter tables, indexes, sequences and such. Please use this tool with caution in development and not on a production server. It is meant for helping you develop your Database Schema, but NOT with migrating schema from A to B in production. A safe approach would be generating the SQL on development server and saving it into SQL Migration files that are executed manually on the production server.](https://mikro-orm.io/docs/5.9/schema-generator)## [ 📄️Entity Generator To generate entities from existing database schema, you can use EntityGenerator helper.](https://mikro-orm.io/docs/5.9/entity-generator)## [ 📄️Naming Strategy When mapping our entities to database tables and columns, their names will be defined by naming strategy. There are 3 basic naming strategies we can choose from:](https://mikro-orm.io/docs/5.9/naming-strategy)## [ 📄️Property Validation Required properties](https://mikro-orm.io/docs/5.9/property-validation)## [ 📄️Migrations To use migrations we need to first install @mikro-orm/migrations package for SQL driver or @mikro-orm/migrations-mongodb for MongoDB.](https://mikro-orm.io/docs/5.9/migrations)## [ 📄️Seeding When initializing your application or testing it can be exhausting to create sample data for your database. The solution is to use seeding. Create factories for your entities and use them in the seed script or combine multiple seed scripts.](https://mikro-orm.io/docs/5.9/seeding)## [ 📄️Read Replica Connections Users can specify multiple read connections via replicas option. You can provide only fields that differ from master connection, rest will be taken from it.](https://mikro-orm.io/docs/5.9/read-connections)[Previous Logging](https://mikro-orm.io/docs/5.9/logging)[Next Smart Nested Populate](https://mikro-orm.io/docs/5.9/nested-populate)
#### Docs
  * [Quick Start](https://mikro-orm.io/docs/quick-start)
  * [Getting Started](https://mikro-orm.io/docs/guide)
  * [Migration from v6 to v7](https://mikro-orm.io/docs/upgrading-v6-to-v7)
  * [Version 6.6 docs](https://mikro-orm.io/docs/6.6/quick-start)
#### Community
  * [Discord](https://discord.gg/w8bjxFHS7X)
  * [Slack](https://join.slack.com/t/mikroorm/shared_invite/enQtNTM1ODYzMzM4MDk3LWM4ZDExMjU5ZDhmNjA2MmM3MWMwZmExNjhhNDdiYTMwNWM0MGY5ZTE3ZjkyZTMzOWExNDgyYmMzNDE1NDI5NjA)
  * [Stack Overflow](https://stackoverflow.com/questions/ask?tags=mikro-orm)
#### Social
  * [Blog](https://mikro-orm.io/blog)
  * [Twitter](https://twitter.com/MikroORM)
  * [GitHub](https://github.com/mikro-orm/mikro-orm)
  * [GitHub Sponsors](https://github.com/sponsors/mikro-orm)
![MikroORM](https://mikro-orm.io/img/logo-header.svg)
Copyright © 2018-2026 Martin Adámek. Built with Docusaurus.
============================================================
# https://mikro-orm.io/docs/unit-of-work
============================================================
[Skip to main content](https://mikro-orm.io/docs/unit-of-work#__docusaurus_skipToContent_fallback)
⭐️ If you like MikroORM, give it a star on [GitHub](https://github.com/mikro-orm/mikro-orm) and consider [sponsoring](https://github.com/sponsors/mikro-orm) its development! ⭐️
[![MikroORM](https://mikro-orm.io/img/logo.svg)](https://mikro-orm.io/)
[7.1](https://mikro-orm.io/docs/unit-of-work)
  * [Next](https://mikro-orm.io/docs/next/unit-of-work)
  * [7.1](https://mikro-orm.io/docs/unit-of-work)
  * [7.0](https://mikro-orm.io/docs/7.0/unit-of-work)
  * [6.6](https://mikro-orm.io/docs/6.6/unit-of-work)
  * [5.9](https://mikro-orm.io/docs/5.9/unit-of-work)
[Docs](https://mikro-orm.io/docs/quick-start)[API](https://mikro-orm.io/api)[Blog](https://mikro-orm.io/blog)[Changelog](https://mikro-orm.io/changelog)
[latest: v7.1.3](https://mikro-orm.io/versions)[Discord](https://discord.gg/w8bjxFHS7X "Chat on Discord")[GitHub](https://github.com/mikro-orm/mikro-orm "View on GitHub")[Twitter](https://twitter.com/MikroORM "Twitter")
Search`Ctrl``K`
  * [Quick Start](https://mikro-orm.io/docs/quick-start)
  * [Getting Started](https://mikro-orm.io/docs/guide)
    * [Chapter 1: First Entity](https://mikro-orm.io/docs/guide/first-entity)
    * [Chapter 2: Relationships](https://mikro-orm.io/docs/guide/relationships)
    * [Chapter 3: Project Setup](https://mikro-orm.io/docs/guide/project-setup)
    * [Chapter 4: Advanced](https://mikro-orm.io/docs/guide/advanced)
    * [Chapter 5: Type-safety](https://mikro-orm.io/docs/guide/type-safety)
  * [Core Concepts](https://mikro-orm.io/docs/core-concepts)
    * [Architecture](https://mikro-orm.io/docs/architecture)
    * [Entity Manager](https://mikro-orm.io/docs/entity-manager)
    * [Unit of Work](https://mikro-orm.io/docs/unit-of-work)
    * [Identity Map](https://mikro-orm.io/docs/identity-map)
    * [Transactions and Concurrency](https://mikro-orm.io/docs/transactions)
    * [Entity Repository](https://mikro-orm.io/docs/repositories)
    * [Collections](https://mikro-orm.io/docs/collections)
    * [The wrap() Helper](https://mikro-orm.io/docs/wrap-helper)
  * [Modeling](https://mikro-orm.io/docs/modeling)
  * [Querying](https://mikro-orm.io/docs/querying)
  * [Schema & Database](https://mikro-orm.io/docs/schema-database)
  * [Advanced](https://mikro-orm.io/docs/advanced)
  * [Configuration](https://mikro-orm.io/docs/configuration)
  * [Integrations](https://mikro-orm.io/docs/integrations)
  * [Recipes](https://mikro-orm.io/docs/recipes)
  * [Reference](https://mikro-orm.io/docs/reference)
  * [Example Integrations](https://mikro-orm.io/docs/examples)
  * [Upgrading](https://mikro-orm.io/docs/upgrading)
  * [](https://mikro-orm.io/)
  * [Core Concepts](https://mikro-orm.io/docs/core-concepts)
Version: 7.1
On this page
# Unit of Work and Transactions
MikroORM uses the Identity Map pattern to track objects. Whenever you fetch an object from the database, MikroORM will keep a reference to this object inside its `UnitOfWork`.
This allows MikroORM room for optimizations. If you call the EntityManager and ask for an entity with a specific ID twice, it will return the same instance:
```
const jon1 = await em.findOne(Author, 1);  
const jon2 = await em.findOne(Author, 1);  
  
// identity map in action  
console.log(jon1 === jon2); // true  
```
Only one SELECT query will be fired against the database here. In the second `findOne()` call MikroORM will check the identity map first and will skip the database round trip as it will find the entity already loaded.
The identity map being indexed by primary keys only allows shortcuts when you ask for objects by primary key. When you query by other properties, you will still get the same reference, but two separate database calls will be made:
```
const jon1 = await em.findOne(Author, { name: 'Jon Snow' });  
const jon2 = await em.findOne(Author, { name: 'Jon Snow' });  
  
// identity map in action  
console.log(jon1 === jon2); // true  
```
MikroORM only knows objects by id, so a query for different criteria has to go to the database, even if it was executed just before. But instead of creating a second `Author` object MikroORM first gets the primary key from the row and checks if it already has an object inside the `UnitOfWork` with that primary key.
## Persisting Managed Entities[​](https://mikro-orm.io/docs/unit-of-work#persisting-managed-entities "Direct link to Persisting Managed Entities")
The identity map has a second use-case. When you call `em.flush()`, MikroORM will ask the identity map for all objects that are currently managed. This means you don't have to call `em.persist()` over and over again to pass known objects to the `EntityManager`. This is a NO-OP for known entities, but leads to much code written that is confusing to other developers.
The following code WILL update your database with the changes made to the `Author` object, even if you did not call `em.persist()`:
```
const jon = await em.findOne(Author, 1);  
jon.email = 'foo@bar.com';  
await em.flush();  
```
## Entities with explicit primary key[​](https://mikro-orm.io/docs/unit-of-work#entities-with-explicit-primary-key "Direct link to Entities with explicit primary key")
When you `em.persist()` a new entity which has the primary key value, it will be automatically added to the identity map. This means that a following call to `em.findOne()` based on its primary key will just return the same unmanaged entity instance instead of querying the database.
> Such entity is added to the identity map, but still remains unmanaged - it does not have a reference to the `EntityManager` yet.
```
// primary key value provided, will be added to the identity map  
const jon = em.create(Author, {  
  id: 1,  
  name: 'Jon',  
  email: 'foo@bar.com',  
});  
  
// this will not query the database  
const jon2 = await em.findOne(Author, 1);  
console.log(jon === jon2); // true  
await em.flush(); // this inserts the entity  
```
If you called `em.persist()` an entity without the primary key value, the `em.findOne()` call would detect it as well and flush automatically to get the value first.
```
// primary key value not provided  
const jon = em.create(Author, {  
  name: 'Jon',  
  email: 'foo@bar.com',  
});  
  
// this will trigger auto flush and insert the entity, then query for it  
const jon2 = await em.findOne(Author, 1);  
console.log(jon === jon2); // true  
await em.flush(); // this is a no-op  
```
## How MikroORM Detects Changes[​](https://mikro-orm.io/docs/unit-of-work#how-mikroorm-detects-changes "Direct link to How MikroORM Detects Changes")
MikroORM is a data-mapper that tries to achieve persistence-ignorance (PI). This means you map JS objects into a relational database that do not necessarily know about the database at all. A natural question would now be, "how does MikroORM even detect objects have changed?".
For this MikroORM keeps a second map inside the `UnitOfWork`. Whenever you fetch an object from the database MikroORM will keep a copy of all the properties and associations inside the `UnitOfWork`.
Now whenever you call `em.flush()` MikroORM will iterate over all entities you previously marked for persisting via `em.persist()`. For each object it will compare the original property and association values with the values that are currently set on the object. If changes are detected then the object is queued for a UPDATE operation. Only the fields that actually changed are updated.
## Implicit Transactions[​](https://mikro-orm.io/docs/unit-of-work#implicit-transactions "Direct link to Implicit Transactions")
First and most important implication of having Unit of Work is that it allows handling transactions automatically.
When you call `em.flush()`, all computed changes are queried inside a database transaction (if supported by given driver). This means that you can control the boundaries of transactions simply by calling `em.persist()` and once all your changes are ready, simply calling `flush()` will run them inside a transaction.
> You can also control the transaction boundaries manually via `em.transactional(cb)`.
```
const user = await em.findOne(User, 1);  
user.email = 'foo@bar.com';  
const car = new Car();  
user.cars.add(car);  
  
// thanks to bi-directional cascading you only need to persist user entity  
// flushing will create a transaction, insert new car and update user with new email  
await em.persist(user).flush();  
```
You can find more information about transactions in [Transactions and concurrency](https://mikro-orm.io/docs/transactions) page.
## Flush Modes[​](https://mikro-orm.io/docs/unit-of-work#flush-modes "Direct link to Flush Modes")
The flushing strategy is given by the `flushMode` of the current running `EntityManager`.
  * `FlushMode.COMMIT` - The `EntityManager` delays the flush until the current Transaction is committed.
  * `FlushMode.AUTO` - This is the default mode, and it flushes the `EntityManager` only if necessary.
  * `FlushMode.ALWAYS` - Flushes the `EntityManager` before every query.
`FlushMode.AUTO` will try to detect changes on the entity you are querying, and flush if there is an overlap:
```
// querying for author will trigger auto-flush if you have new author persisted  
const a1 = new Author(...);  
em.persist(a1);  
const r1 = await em.find(Author, {});  
  
// querying author won't trigger auto-flush if you have new book, but no changes on author  
const b4 = new Book(...);  
em.persist(b4);  
const r2 = await em.find(Author, {});  
  
// but querying for book will trigger auto-flush  
const r3 = await em.find(Book, {});  
```
Changes on managed entities are not detected automatically, you need to call `em.persist` if you want such changes to trigger auto flush.
```
const book = await em.findOne(Book, 1);  
book.price = 1000;  
em.persist(book);  
  
// triggers auto-flush because of the changed `price`  
const r1 = await em.find(Book, { price: { $gt: 500 } });  
  
// triggers auto-flush too, the book entity is dirty  
const r2 = await em.find(Book, { name: /foo.*/ });  
```
You can set the flush mode on different places:
  * in the ORM config via `Options.flushMode`
  * for given `EntityManager` instance (and its forks) via `em.setFlushMode()`
  * for given `EntityManager` fork via `em.fork({ flushMode })`
  * for given QueryBuilder instance via `qb.setFlushMode()`
  * for given transaction scope via `em.transactional(..., { flushMode })`
  * for given `em.find` (or similar) call via `em.find(..., { flushMode })`
> This part of documentation is highly inspired by [doctrine internals docs](https://www.doctrine-project.org/projects/doctrine-orm/en/2.6/reference/unitofwork.html) as the behaviour here is pretty much the same.
[](https://github.com/mikro-orm/mikro-orm/edit/master/docs/versioned_docs/version-7.1/unit-of-work.md)
Last updated on **May 20, 2026** by **Martin Adámek**
[Previous Entity Manager](https://mikro-orm.io/docs/entity-manager)[Next Identity Map](https://mikro-orm.io/docs/identity-map)
  * [Persisting Managed Entities](https://mikro-orm.io/docs/unit-of-work#persisting-managed-entities)
  * [Entities with explicit primary key](https://mikro-orm.io/docs/unit-of-work#entities-with-explicit-primary-key)
  * [How MikroORM Detects Changes](https://mikro-orm.io/docs/unit-of-work#how-mikroorm-detects-changes)
  * [Implicit Transactions](https://mikro-orm.io/docs/unit-of-work#implicit-transactions)
  * [Flush Modes](https://mikro-orm.io/docs/unit-of-work#flush-modes)
#### Docs
  * [Quick Start](https://mikro-orm.io/docs/quick-start)
  * [Getting Started](https://mikro-orm.io/docs/guide)
  * [Migration from v6 to v7](https://mikro-orm.io/docs/upgrading-v6-to-v7)
  * [Version 6.6 docs](https://mikro-orm.io/docs/6.6/quick-start)
#### Community
  * [Discord](https://discord.gg/w8bjxFHS7X)
  * [Slack](https://join.slack.com/t/mikroorm/shared_invite/enQtNTM1ODYzMzM4MDk3LWM4ZDExMjU5ZDhmNjA2MmM3MWMwZmExNjhhNDdiYTMwNWM0MGY5ZTE3ZjkyZTMzOWExNDgyYmMzNDE1NDI5NjA)
  * [Stack Overflow](https://stackoverflow.com/questions/ask?tags=mikro-orm)
#### Social
  * [Blog](https://mikro-orm.io/blog)
  * [Twitter](https://twitter.com/MikroORM)
  * [GitHub](https://github.com/mikro-orm/mikro-orm)
  * [GitHub Sponsors](https://github.com/sponsors/mikro-orm)
![MikroORM](https://mikro-orm.io/img/logo-header.svg)
Copyright © 2018-2026 Martin Adámek. Built with Docusaurus.
============================================================
# https://mikro-orm.io/docs/type-safe-relations
============================================================
[Skip to main content](https://mikro-orm.io/docs/type-safe-relations#__docusaurus_skipToContent_fallback)
⭐️ If you like MikroORM, give it a star on [GitHub](https://github.com/mikro-orm/mikro-orm) and consider [sponsoring](https://github.com/sponsors/mikro-orm) its development! ⭐️
[ ![MikroORM](https://mikro-orm.io/img/logo.svg)![MikroORM](https://mikro-orm.io/img/logo-dark.svg) ](https://mikro-orm.io/)
[7.1](https://mikro-orm.io/docs/type-safe-relations)
  * [Next](https://mikro-orm.io/docs/next/type-safe-relations)
  * [7.1](https://mikro-orm.io/docs/type-safe-relations)
  * [7.0](https://mikro-orm.io/docs/7.0/type-safe-relations)
  * [6.6](https://mikro-orm.io/docs/6.6/type-safe-relations)
  * [5.9](https://mikro-orm.io/docs/5.9/type-safe-relations)
[Docs](https://mikro-orm.io/docs/quick-start)[API](https://mikro-orm.io/api)[Blog](https://mikro-orm.io/blog)[Changelog](https://mikro-orm.io/changelog)
[latest: v7.1.3](https://mikro-orm.io/versions)[Discord](https://discord.gg/w8bjxFHS7X "Chat on Discord")[GitHub](https://github.com/mikro-orm/mikro-orm "View on GitHub")[Twitter](https://twitter.com/MikroORM "Twitter")
Search
  * [Quick Start](https://mikro-orm.io/docs/quick-start)
  * [Getting Started](https://mikro-orm.io/docs/guide)
    * [Chapter 1: First Entity](https://mikro-orm.io/docs/guide/first-entity)
    * [Chapter 2: Relationships](https://mikro-orm.io/docs/guide/relationships)
    * [Chapter 3: Project Setup](https://mikro-orm.io/docs/guide/project-setup)
    * [Chapter 4: Advanced](https://mikro-orm.io/docs/guide/advanced)
    * [Chapter 5: Type-safety](https://mikro-orm.io/docs/guide/type-safety)
  * [Core Concepts](https://mikro-orm.io/docs/core-concepts)
  * [Modeling](https://mikro-orm.io/docs/modeling)
    * [Defining Entities](https://mikro-orm.io/docs/defining-entities)
    * [Modeling Entity Relationships](https://mikro-orm.io/docs/relationships)
    * [Type-Safe Relations](https://mikro-orm.io/docs/type-safe-relations)
    * [Inheritance Mapping](https://mikro-orm.io/docs/inheritance-mapping)
    * [Indexes and Unique Constraints](https://mikro-orm.io/docs/indexes)
    * [Embeddables](https://mikro-orm.io/docs/embeddables)
    * [Composite Primary Keys](https://mikro-orm.io/docs/composite-keys)
    * [JSON Properties](https://mikro-orm.io/docs/json-properties)
    * [Custom Types](https://mikro-orm.io/docs/custom-types)
  * [Querying](https://mikro-orm.io/docs/querying)
  * [Schema & Database](https://mikro-orm.io/docs/schema-database)
  * [Advanced](https://mikro-orm.io/docs/advanced)
  * [Configuration](https://mikro-orm.io/docs/configuration)
  * [Integrations](https://mikro-orm.io/docs/integrations)
  * [Recipes](https://mikro-orm.io/docs/recipes)
  * [Reference](https://mikro-orm.io/docs/reference)
  * [Example Integrations](https://mikro-orm.io/docs/examples)
  * [Upgrading](https://mikro-orm.io/docs/upgrading)
  * [](https://mikro-orm.io/)
  * [Modeling](https://mikro-orm.io/docs/modeling)
Version: 7.1
On this page
# Type-Safe Relations
Entity relations are mapped to entity references - instances of the entity that have at least the primary key available. This reference is stored in the identity map, so you will get the same object reference when fetching the same document from the database.
```
@ManyToOne(() => Author)  
author!: Author;  
```
The problem with this approach is that TypeScript has no way of knowing whether the relation is loaded or not. The `author` property is always typed as `Author`, even when it's just an uninitialized reference.
```
const book = await em.findOne(Book, 1);  
console.log(book.author instanceof Author); // true  
console.log(wrap(book.author).isInitialized()); // false  
console.log(book.author.name); // undefined - Author is not loaded!  
```
MikroORM provides several tools to make working with relations type-safe:
  * **`Reference`wrapper** - wraps relations to distinguish between loaded and unloaded state
  * **`Loaded`type** - tracks which relations are populated at the type level
  * **`$`accessor** - provides type-safe synchronous access to loaded relations
##  `Reference` Wrapper[​](https://mikro-orm.io/docs/type-safe-relations#reference-wrapper "Direct link to reference-wrapper")
The `Reference` wrapper wraps an entity reference and provides methods to safely access it:
  * `load(): Promise<T>` - loads the entity if not already loaded
  * `unwrap(): T` - returns the underlying entity (unsafe, may be uninitialized)
  * `isInitialized(): boolean` - checks if the entity is loaded
  * `getEntity(): T` - returns the entity, throws if not initialized
  * `$` or `get()` - synchronous access (only available when loaded)
### Defining References[​](https://mikro-orm.io/docs/type-safe-relations#defining-references "Direct link to Defining References")
Use the `Ref<T>` type and `ref: true` option to define a reference property:
  * defineEntity + class
  * defineEntity
  * reflect-metadata
  * ts-morph
./entities/Book.ts
```
import { defineEntity, p } from '@mikro-orm/core';  
  
const BookSchema = defineEntity({  
  name: 'Book',  
  properties: {  
    id: p.integer().primary(),  
    author: p.manyToOne(() => Author).ref(),  
  },  
});  
  
export class Book extends BookSchema.class {}  
BookSchema.setClass(Book);  
```
./entities/Book.ts
```
import { defineEntity, p } from '@mikro-orm/core';  
  
export const Book = defineEntity({  
  name: 'Book',  
  properties: {  
    id: p.integer().primary(),  
    author: () => p.manyToOne(Author).ref(),  
  },  
});  
```
./entities/Book.ts
```
import { Entity, Ref, ManyToOne, PrimaryKey, ref } from '@mikro-orm/core';  
  
@Entity()  
export class Book {  
  
  @PrimaryKey()  
  id!: number;  
  
  @ManyToOne(() => Author, { ref: true })  
  author: Ref<Author>;  
  
  constructor(author: Author) {  
    this.author = ref(author);  
  }  
  
}  
```
./entities/Book.ts
```
import { Entity, Ref, ManyToOne, PrimaryKey, ref } from '@mikro-orm/core';  
  
@Entity()  
export class Book {  
  
  @PrimaryKey()  
  id!: number;  
  
  @ManyToOne()  
  author: Ref<Author>;  
  
  constructor(author: Author) {  
    this.author = ref(author);  
  }  
  
}  
```
### Using References[​](https://mikro-orm.io/docs/type-safe-relations#using-references "Direct link to Using References")
```
const book = await em.findOne(Book, 1);  
  
// The reference is not loaded yet  
book.author;                    // Ref<Author>  
book.author.isInitialized();    // false  
book.author.id;                 // OK - PK is always available  
book.author.name;               // TS error - no 'name' on Ref<Author>  
  
// Load the reference  
const author = await book.author.load();  
author.name;                    // OK - now it's loaded  
  
// Or load and access a specific property  
const name = await book.author.load('name');  
```
When the relation is populated, you get a `LoadedReference` which allows synchronous access via `$`:
```
const book = await em.findOne(Book, 1, { populate: ['author'] });  
  
book.author;                    // LoadedReference<Author>  
book.author.$.name;             // OK - type-safe synchronous access  
book.author.get().name;         // same as above, alternative syntax  
```
### Reference Methods[​](https://mikro-orm.io/docs/type-safe-relations#reference-methods "Direct link to Reference Methods")  
| Method  | Description  |  
| --- | --- |  
| `load()`  | Loads the entity, returns `Promise<T>`  |  
| `load(prop)`  | Loads the entity and returns the specified property  |  
| `unwrap()`  | Returns the underlying entity (unsafe)  |  
| `isInitialized()`  | Returns `true` if the entity is loaded  |  
| `getEntity()`  | Returns the entity, throws if not initialized  |  
| `getProperty(prop)`  | Returns a property, throws if not initialized  |  
|  `$` / `get()`  | Synchronous access (only on `LoadedReference`)  |  
```
const book = await em.findOne(Book, 1);  
  
// These throw if not initialized  
book.author.getEntity();           // Error: Reference<Author> not initialized  
book.author.getProperty('name');   // Error: Reference<Author> not initialized  
  
// Load first, then access synchronously  
await book.author.load();  
book.author.getEntity().name;      // OK  
book.author.getProperty('name');   // OK  
```
> Unlike `wrap(entity).init()` which always refreshes from the database, `Reference.load()` only queries if the entity is not already in the Identity Map.
##  `LazyRef<T>` — type-only reference[​](https://mikro-orm.io/docs/type-safe-relations#lazyreft--type-only-reference "Direct link to lazyreft--type-only-reference")
When you want **compile-time populate-state safety** without the `.$` / `.get()` indirection that `Reference` requires, use `LazyRef<T>`. It is a **type-only** marker — at runtime the property holds the entity instance directly (same as a plain relation without `ref: true`), but TypeScript restricts access to the primary key until `Loaded<>` narrows it.
```
@ManyToOne(() => Author)  
author!: LazyRef<Author>;  
```
Or with `defineEntity`:
```
const BookSchema = defineEntity({  
  name: 'Book',  
  properties: {  
    author: () => p.manyToOne(AuthorSchema).lazyRef(),  
  },  
});  
```
### Semantics[​](https://mikro-orm.io/docs/type-safe-relations#semantics "Direct link to Semantics")  
|   | `LazyRef<T>`  | `Ref<T>`  |  
| --- | --- | --- |  
| Runtime value  | entity instance (stub or hydrated)  |  `Reference` wrapper  |  
|  `instanceof T` (runtime)  | `true`  | `false`  |  
| Access unloaded PK  |  `ref.id` ✅  |  `ref.id` ✅  |  
| Access unloaded non-PK  | compile error ✅  | compile error ✅  |  
| Access loaded prop  |  `loaded.author.name` (no `.$`)  | `loaded.author.$.name`  |  
|  `load()` / `loadOrFail()` method  | ❌ — use `Loadable` mixin on the target  | ✅ built-in  |  
> **Note on`instanceof`** : the table's `instanceof T` row is about the runtime JS check — `book.author instanceof Author` returns `true` at runtime. TypeScript's control-flow narrowing through `instanceof`, however, does **not** strip `LazyRef<T>`'s brand, so `if (book.author instanceof Author) { /* book.author.name is still a compile error here */ }` still won't give you full entity access. Use `unref()` or `Loaded<>` narrowing for compile-time access.
### Usage[​](https://mikro-orm.io/docs/type-safe-relations#usage "Direct link to Usage")
```
const book = await em.findOneOrFail(Book, 1);  
book.author.id;     // ok — PK is always accessible  
book.author.name;   // compile error — not loaded  
  
const loaded = await em.findOneOrFail(Book, 1, { populate: ['author'] });  
loaded.author.name; // ok — Loaded<Book, 'author'> narrows LazyRef<Author> to Author  
```
> **Scope** : `LazyRef<T>` is for to-one relations only (`@ManyToOne`, `@OneToOne`). Collections already have their own indirection via `Collection<T>`.
> **Caveat** : the safety is purely compile-time. JS code, `as any` casts, or code paths that bypass `Loaded<>` can freely read any property at runtime — and on an _unpopulated_ relation (a stub with only the PK set) those reads will return `undefined`. If the relation has already been populated, the underlying entity is fully hydrated and reads behave normally; the caveat applies only to the stub case. Same footgun as plain non-`Ref` relations.
> **Type performance** : `LazyRef<T>` adds one conditional branch in the `Loaded<>` / `AutoPath` narrowing paths. The cost is comparable to `Ref<T>` (in fact slightly cheaper for loaded narrowing, since no `LoadedReference` intersection is produced). See `tests/bench/types/lazy-ref.ts` for measurements.
###  `unref()` — escape hatch when you can't thread `Loaded<>` through[​](https://mikro-orm.io/docs/type-safe-relations#unref--escape-hatch-when-you-cant-thread-loaded-through "Direct link to unref--escape-hatch-when-you-cant-thread-loaded-through")
When you know a relation is populated but the surrounding code is typed as bare `Book` rather than `Loaded<Book, 'author'>`, use `unref()` to narrow a `LazyRef<T>` (or `Ref<T>`) back to `T`.
```
import { unref } from '@mikro-orm/core';  
  
function logAuthor(book: Book) {  
  // `book.author` is `LazyRef<Author>` — `.name` would be a compile error  
  console.log(unref(book.author).name);  
}  
```
`unref()` is the inverse of `ref()` and works on any of:
  * `Ref<T>` / `Reference<T>` (entity) — calls `.unwrap()`, returns `T`
  * `LazyRef<T>` — identity cast at runtime (the underlying value is already `T`), returns `T`
  * plain `T` — passthrough, returns `T`
  * `ScalarReference<V>` / `ScalarRef<V>` — calls `.unwrap()`, returns `V | undefined` (the scalar may be unbound)
  * `null` / `undefined` — passthrough
Like a plain `as` cast, `unref()` is a compile-time narrowing only for entity relations — if the entity is a stub that was never populated, non-PK properties are still `undefined` at runtime. Use it when you're confident the relation is loaded; prefer threading `Loaded<>` through signatures when you can.
##  `Loadable` mixin — `load()` / `loadOrFail()` on entities[​](https://mikro-orm.io/docs/type-safe-relations#loadable-mixin--load--loadorfail-on-entities "Direct link to loadable-mixin--load--loadorfail-on-entities")
If you are using plain relations or `LazyRef<T>` and want the `load()` / `loadOrFail()` ergonomics that `Reference` provides on the wrapper, opt into the `Loadable` mixin on your entity class. It adds the two methods to the entity prototype so you can call them directly on the relation target.
```
import { BaseEntity, Loadable, LoadableBaseEntity } from '@mikro-orm/core';  
  
// convenience: BaseEntity pre-composed with the mixin  
class User extends LoadableBaseEntity {  
  // ...  
}  
  
// standalone — no inherited base  
class Product extends Loadable() {  
  // ...  
}  
  
// or compose with your own base class  
class Article extends Loadable(MyBase) {  
  // ...  
}  
  
const user = orm.em.getReference(User, 1);  
const loaded = await user.load();          // Promise<User | null>  
const loadedOrThrows = await user.loadOrFail(); // Promise<User>  
```
Opt-in by design: `BaseEntity` itself does **not** gain these methods, so entities with existing `load` / `loadOrFail` properties are unaffected.
##  `Loaded` Type[​](https://mikro-orm.io/docs/type-safe-relations#loaded-type "Direct link to loaded-type")
The `Loaded<Entity, Hints>` type tracks which relations are populated at compile time. All `em.find*` methods return this type:
```
// Type: Loaded<User, never>[]  
const users = await em.find(User, {});  
  
// Type: Loaded<User, 'identity' | 'friends'>[]  
const usersWithRelations = await em.find(User, {}, {  
  populate: ['identity', 'friends'],  
});  
```
Given the following `User` entity:
  * defineEntity + class
  * defineEntity
  * reflect-metadata
  * ts-morph
./entities/User.ts
```
import { defineEntity, p } from '@mikro-orm/core';  
  
const UserSchema = defineEntity({  
  name: 'User',  
  properties: {  
    id: p.integer().primary(),  
    identity: p.manyToOne(() => Identity).ref(),  
    friends: p.manyToMany(() => User),  
  },  
});  
  
export class User extends UserSchema.class {}  
UserSchema.setClass(User);  
```
./entities/User.ts
```
import { defineEntity, p } from '@mikro-orm/core';  
  
export const User = defineEntity({  
  name: 'User',  
  properties: {  
    id: p.integer().primary(),  
    identity: () => p.manyToOne(Identity).ref(),  
    friends: () => p.manyToMany(User),  
  },  
});  
```
./entities/User.ts
```
import { Entity, PrimaryKey, ManyToOne, ManyToMany, Collection, Ref, ref } from '@mikro-orm/core';  
  
@Entity()  
export class User {  
  
  @PrimaryKey()  
  id!: number;  
  
  @ManyToOne(() => Identity, { ref: true })  
  identity: Ref<Identity>;  
  
  @ManyToMany(() => User)  
  friends = new Collection<User>(this);  
  
  constructor(identity: Identity) {  
    this.identity = ref(identity);  
  }  
  
}  
```
./entities/User.ts
```
import { Entity, PrimaryKey, ManyToOne, ManyToMany, Collection, Ref, ref } from '@mikro-orm/core';  
  
@Entity()  
export class User {  
  
  @PrimaryKey()  
  id!: number;  
  
  @ManyToOne()  
  identity: Ref<Identity>;  
  
  @ManyToMany(() => User)  
  friends = new Collection<User>(this);  
  
  constructor(identity: Identity) {  
    this.identity = ref(identity);  
  }  
  
}  
```
### Type-Safe Access with `$`[​](https://mikro-orm.io/docs/type-safe-relations#type-safe-access-with- "Direct link to type-safe-access-with-")
When a relation is in the `Loaded` hints, you can access it synchronously via the `$` symbol:
```
// Type: Loaded<User, 'identity'>  
const user = await em.findOneOrFail(User, 1, { populate: ['identity'] });  
  
// Type-safe synchronous access  
console.log(user.identity.$.email);  
```
Without the populate hint, accessing `$` is a compile error:
```
// Type: Loaded<User, never>  
const user = await em.findOneOrFail(User, 1);  
  
// TS Error: Property '$' does not exist on type 'Ref<Identity>'  
console.log(user.identity.$.email);  
```
> If you don't like symbols with magic names like `$`, you can use the `get()` method, which is an alias for it.
### Using `Loaded` in Function Signatures[​](https://mikro-orm.io/docs/type-safe-relations#using-loaded-in-function-signatures "Direct link to using-loaded-in-function-signatures")
You can require populated relations in your function parameters:
```
function sendWelcomeEmail(user: Loaded<User, 'identity'>) {  
  // Type-safe - identity is guaranteed to be loaded  
  const email = user.identity.$.email;  
  mailer.send(email, 'Welcome!');  
}  
  
// Works - identity is populated  
const user1 = await em.findOneOrFail(User, 1, { populate: ['identity'] });  
sendWelcomeEmail(user1);  
  
// Compile error - identity not populated  
const user2 = await em.findOneOrFail(User, 1);  
sendWelcomeEmail(user2);  
```
### Collections[​](https://mikro-orm.io/docs/type-safe-relations#collections "Direct link to Collections")
The `$` accessor also works with `Collection`:
```
// Type: Loaded<User, 'friends'>  
const user = await em.findOneOrFail(User, 1, { populate: ['friends'] });  
  
// Type-safe iteration over loaded collection  
for (const friend of user.friends.$) {  
  console.log(friend.email);  
}  
```
> Note: `Loaded` is purely a compile-time construct. You can bypass it with type assertions, but this defeats the purpose of type safety.
## Assigning References[​](https://mikro-orm.io/docs/type-safe-relations#assigning-references "Direct link to Assigning References")
When assigning to a `Ref<T>` property, you need to wrap the entity:
```
import { ref } from '@mikro-orm/core';  
  
const book = await em.findOne(Book, 1);  
  
// Using ref() helper  
book.author = ref(someAuthor);  
  
// Using getReference with wrapped option  
book.author = em.getReference(Author, 2, { wrapped: true });  
  
// Using toReference()  
book.author = wrap(someAuthor).toReference();  
```
> `ref(e)` is a shortcut for `wrap(e).toReference()`, which is the same as `Reference.create(e)`.
### Creating References Without EntityManager[​](https://mikro-orm.io/docs/type-safe-relations#creating-references-without-entitymanager "Direct link to Creating References Without EntityManager")
You can create references inside entity constructors using `rel()`:
  * defineEntity + class
  * defineEntity
  * reflect-metadata
  * ts-morph
./entities/Book.ts
```
import { defineEntity, p, rel } from '@mikro-orm/core';  
  
const BookSchema = defineEntity({  
  name: 'Book',  
  properties: {  
    id: p.integer().primary(),  
    author: p.manyToOne(() => Author).ref(),  
  },  
});  
  
// Usage: create book with author reference  
const book = em.create(Book, { author: rel(Author, authorId) });  
  
export class Book extends BookSchema.class {}  
BookSchema.setClass(Book);  
```
./entities/Book.ts
```
import { defineEntity, p, rel } from '@mikro-orm/core';  
  
export const Book = defineEntity({  
  name: 'Book',  
  properties: {  
    id: p.integer().primary(),  
    author: () => p.manyToOne(Author).ref(),  
  },  
});  
  
// Usage: create book with author reference  
const book = em.create(Book, { author: rel(Author, authorId) });  
```
./entities/Book.ts
```
import { Entity, ManyToOne, PrimaryKey, Ref, rel } from '@mikro-orm/core';  
  
@Entity()  
export class Book {  
  
  @PrimaryKey()  
  id!: number;  
  
  @ManyToOne(() => Author, { ref: true })  
  author!: Ref<Author>;  
  
  constructor(authorId: number) {  
    this.author = rel(Author, authorId);  
  }  
  
}  
```
./entities/Book.ts
```
import { Entity, ManyToOne, PrimaryKey, Ref, rel } from '@mikro-orm/core';  
  
@Entity()  
export class Book {  
  
  @PrimaryKey()  
  id!: number;  
  
  @ManyToOne()  
  author!: Ref<Author>;  
  
  constructor(authorId: number) {  
    this.author = rel(Author, authorId);  
  }  
  
}  
```
Another way is to use `toReference()` method available as part of the [`wrap()` helper](https://mikro-orm.io/docs/wrap-helper):
```
const author = new Author(...);  
book.author = wrap(author).toReference();  
```
## Primary Key Access[​](https://mikro-orm.io/docs/type-safe-relations#primary-key-access "Direct link to Primary Key Access")
The `Ref<T>` type includes the entity's primary key, allowing direct access without loading:
```
const book = await em.findOne(Book, 1);  
console.log(book.author.id); // OK - PK is always available  
```
MikroORM detects the PK property by checking for `_id`, `uuid`, or `id` in that order. For custom PK names, use the `PrimaryKeyProp` symbol:
  * defineEntity + class
  * defineEntity
  * reflect-metadata
  * ts-morph
./entities/Author.ts
```
import { defineEntity, p } from '@mikro-orm/core';  
  
const AuthorSchema = defineEntity({  
  name: 'Author',  
  properties: {  
    myPrimaryKey: p.integer().primary(),  
  },  
});  
  
export class Author extends AuthorSchema.class {}  
AuthorSchema.setClass(Author);  
  
// PrimaryKeyProp is inferred automatically with defineEntity  
```
./entities/Author.ts
```
import { defineEntity, p, PrimaryKeyProp } from '@mikro-orm/core';  
  
export const Author = defineEntity({  
  name: 'Author',  
  properties: {  
    myPrimaryKey: p.integer().primary(),  
  },  
});  
  
// PrimaryKeyProp is inferred automatically with defineEntity  
```
./entities/Author.ts
```
import { Entity, PrimaryKey, PrimaryKeyProp } from '@mikro-orm/core';  
  
@Entity()  
export class Author {  
  
  @PrimaryKey()  
  myPrimaryKey!: number;  
  
  [PrimaryKeyProp]?: 'myPrimaryKey';  
  
}  
```
./entities/Author.ts
```
import { Entity, PrimaryKey, PrimaryKeyProp } from '@mikro-orm/core';  
  
@Entity()  
export class Author {  
  
  @PrimaryKey()  
  myPrimaryKey!: number;  
  
  [PrimaryKeyProp]?: 'myPrimaryKey';  
  
}  
```
```
// Now works with custom PK name  
const book = await em.findOne(Book, 1);  
console.log(book.author.myPrimaryKey);  
```
For MongoDB, both `id` (string) and `_id` (ObjectId) are available:
  * defineEntity + class
  * defineEntity
  * reflect-metadata
  * ts-morph
./entities/Book.ts
```
import { defineEntity, p } from '@mikro-orm/core';  
  
const BookSchema = defineEntity({  
  name: 'Book',  
  properties: {  
    _id: p.type(ObjectId).primary(),  
    id: p.string().serializedPrimaryKey(),  
    author: p.manyToOne(() => Author).ref(),  
  },  
});  
  
export class Book extends BookSchema.class {}  
BookSchema.setClass(Book);  
```
./entities/Book.ts
```
import { defineEntity, p } from '@mikro-orm/core';  
  
export const Book = defineEntity({  
  name: 'Book',  
  properties: {  
    _id: p.type(ObjectId).primary(),  
    id: p.string().serializedPrimaryKey(),  
    author: () => p.manyToOne(Author).ref(),  
  },  
});  
```
./entities/Book.ts
```
import { Entity, PrimaryKey, SerializedPrimaryKey, ManyToOne, Ref } from '@mikro-orm/core';  
  
@Entity()  
export class Book {  
  
  @PrimaryKey()  
  _id!: ObjectId;  
  
  @SerializedPrimaryKey()  
  id!: string;  
  
  @ManyToOne(() => Author, { ref: true })  
  author!: Ref<Author>;  
  
}  
```
./entities/Book.ts
```
import { Entity, PrimaryKey, SerializedPrimaryKey, ManyToOne, Ref } from '@mikro-orm/core';  
  
@Entity()  
export class Book {  
  
  @PrimaryKey()  
  _id!: ObjectId;  
  
  @SerializedPrimaryKey()  
  id!: string;  
  
  @ManyToOne()  
  author!: Ref<Author>;  
  
}  
```
```
const book = await em.findOne(Book, 1);  
console.log(book.author.id);  // string  
console.log(book.author._id); // ObjectId  
```
##  `ScalarReference` Wrapper[​](https://mikro-orm.io/docs/type-safe-relations#scalarreference-wrapper "Direct link to scalarreference-wrapper")
For lazy-loaded scalar properties (not relations), use `ScalarRef<T>`:
```
@Property({ lazy: true, ref: true })  
passwordHash!: Ref<string>;  
  
@Property({ type: 'json', lazy: true, ref: true })  
metadata!: ScalarRef<Record<string, unknown>>;  
```
```
const user = await em.findOne(User, 1);  
  
// Load the lazy scalar  
const hash = await user.passwordHash.load();  
  
// Or populate it  
const userWithHash = await em.findOne(User, 1, {  
  populate: ['passwordHash'],  
});  
console.log(userWithHash.passwordHash.$);  
```
> For primitive types like `string` or `number`, `Ref<T>` automatically resolves to `ScalarReference`. For object types, use `ScalarRef<T>` explicitly.
### Nullable Scalars[​](https://mikro-orm.io/docs/type-safe-relations#nullable-scalars "Direct link to Nullable Scalars")
When a scalar reference is nullable, the wrapper is always truthy. Check the value after loading:
```
@Property({ type: 'json', nullable: true, lazy: true, ref: true })  
config!: ScalarRef<Config | null>;  
```
```
const entity = await em.findOne(Entity, 1, { populate: ['config'] });  
  
// The wrapper exists, but the value might be null  
if (entity.config.$) {  
  // Safe to use  
  console.log(entity.config.$.setting);  
}  
```
[](https://github.com/mikro-orm/mikro-orm/edit/master/docs/versioned_docs/version-7.1/type-safe-relations.md)
Last updated on **May 20, 2026** by **Martin Adámek**
[Previous Modeling Entity Relationships](https://mikro-orm.io/docs/relationships)[Next Inheritance Mapping](https://mikro-orm.io/docs/inheritance-mapping)
  * [`Reference` Wrapper](https://mikro-orm.io/docs/type-safe-relations#reference-wrapper)
    * [Defining References](https://mikro-orm.io/docs/type-safe-relations#defining-references)
    * [Using References](https://mikro-orm.io/docs/type-safe-relations#using-references)
    * [Reference Methods](https://mikro-orm.io/docs/type-safe-relations#reference-methods)
  * [`LazyRef<T>` — type-only reference](https://mikro-orm.io/docs/type-safe-relations#lazyreft--type-only-reference)
    * [Semantics](https://mikro-orm.io/docs/type-safe-relations#semantics)
    * [Usage](https://mikro-orm.io/docs/type-safe-relations#usage)
    * [`unref()` — escape hatch when you can't thread `Loaded<>` through](https://mikro-orm.io/docs/type-safe-relations#unref--escape-hatch-when-you-cant-thread-loaded-through)
  * [`Loadable` mixin — `load()` / `loadOrFail()` on entities](https://mikro-orm.io/docs/type-safe-relations#loadable-mixin--load--loadorfail-on-entities)
  * [`Loaded` Type](https://mikro-orm.io/docs/type-safe-relations#loaded-type)
    * [Type-Safe Access with `$`](https://mikro-orm.io/docs/type-safe-relations#type-safe-access-with-)
    * [Using `Loaded` in Function Signatures](https://mikro-orm.io/docs/type-safe-relations#using-loaded-in-function-signatures)
    * [Collections](https://mikro-orm.io/docs/type-safe-relations#collections)
  * [Assigning References](https://mikro-orm.io/docs/type-safe-relations#assigning-references)
    * [Creating References Without EntityManager](https://mikro-orm.io/docs/type-safe-relations#creating-references-without-entitymanager)
  * [Primary Key Access](https://mikro-orm.io/docs/type-safe-relations#primary-key-access)
  * [`ScalarReference` Wrapper](https://mikro-orm.io/docs/type-safe-relations#scalarreference-wrapper)
    * [Nullable Scalars](https://mikro-orm.io/docs/type-safe-relations#nullable-scalars)
#### Docs
  * [Quick Start](https://mikro-orm.io/docs/quick-start)
  * [Getting Started](https://mikro-orm.io/docs/guide)
  * [Migration from v6 to v7](https://mikro-orm.io/docs/upgrading-v6-to-v7)
  * [Version 6.6 docs](https://mikro-orm.io/docs/6.6/quick-start)
#### Community
  * [Discord](https://discord.gg/w8bjxFHS7X)
  * [Slack](https://join.slack.com/t/mikroorm/shared_invite/enQtNTM1ODYzMzM4MDk3LWM4ZDExMjU5ZDhmNjA2MmM3MWMwZmExNjhhNDdiYTMwNWM0MGY5ZTE3ZjkyZTMzOWExNDgyYmMzNDE1NDI5NjA)
  * [Stack Overflow](https://stackoverflow.com/questions/ask?tags=mikro-orm)
#### Social
  * [Blog](https://mikro-orm.io/blog)
  * [Twitter](https://twitter.com/MikroORM)
  * [GitHub](https://github.com/mikro-orm/mikro-orm)
  * [GitHub Sponsors](https://github.com/sponsors/mikro-orm)
![MikroORM](https://mikro-orm.io/img/logo-header.svg)
Copyright © 2018-2026 Martin Adámek. Built with Docusaurus.
============================================================
# https://mikro-orm.io/docs/filters
============================================================
[Skip to main content](https://mikro-orm.io/docs/filters#__docusaurus_skipToContent_fallback)
⭐️ If you like MikroORM, give it a star on [GitHub](https://github.com/mikro-orm/mikro-orm) and consider [sponsoring](https://github.com/sponsors/mikro-orm) its development! ⭐️
[ ![MikroORM](https://mikro-orm.io/img/logo.svg)![MikroORM](https://mikro-orm.io/img/logo-dark.svg) ](https://mikro-orm.io/)
[7.1](https://mikro-orm.io/docs/filters)
  * [Next](https://mikro-orm.io/docs/next/filters)
  * [7.1](https://mikro-orm.io/docs/filters)
  * [7.0](https://mikro-orm.io/docs/7.0/filters)
  * [6.6](https://mikro-orm.io/docs/6.6/filters)
  * [5.9](https://mikro-orm.io/docs/5.9/filters)
[Docs](https://mikro-orm.io/docs/quick-start)[API](https://mikro-orm.io/api)[Blog](https://mikro-orm.io/blog)[Changelog](https://mikro-orm.io/changelog)
[latest: v7.1.3](https://mikro-orm.io/versions)[Discord](https://discord.gg/w8bjxFHS7X "Chat on Discord")[GitHub](https://github.com/mikro-orm/mikro-orm "View on GitHub")[Twitter](https://twitter.com/MikroORM "Twitter")
Search
  * [Quick Start](https://mikro-orm.io/docs/quick-start)
  * [Getting Started](https://mikro-orm.io/docs/guide)
    * [Chapter 1: First Entity](https://mikro-orm.io/docs/guide/first-entity)
    * [Chapter 2: Relationships](https://mikro-orm.io/docs/guide/relationships)
    * [Chapter 3: Project Setup](https://mikro-orm.io/docs/guide/project-setup)
    * [Chapter 4: Advanced](https://mikro-orm.io/docs/guide/advanced)
    * [Chapter 5: Type-safety](https://mikro-orm.io/docs/guide/type-safety)
  * [Core Concepts](https://mikro-orm.io/docs/core-concepts)
  * [Modeling](https://mikro-orm.io/docs/modeling)
  * [Querying](https://mikro-orm.io/docs/querying)
    * [Query Conditions](https://mikro-orm.io/docs/query-conditions)
    * [Populating relations](https://mikro-orm.io/docs/populating-relations)
    * [Loading Strategies](https://mikro-orm.io/docs/loading-strategies)
    * [Filters](https://mikro-orm.io/docs/filters)
    * [Query Builder](https://mikro-orm.io/docs/query-builder)
    * [Using raw SQL query fragments](https://mikro-orm.io/docs/raw-queries)
    * [Kysely](https://mikro-orm.io/docs/kysely)
  * [Schema & Database](https://mikro-orm.io/docs/schema-database)
  * [Advanced](https://mikro-orm.io/docs/advanced)
  * [Configuration](https://mikro-orm.io/docs/configuration)
  * [Integrations](https://mikro-orm.io/docs/integrations)
  * [Recipes](https://mikro-orm.io/docs/recipes)
  * [Reference](https://mikro-orm.io/docs/reference)
  * [Example Integrations](https://mikro-orm.io/docs/examples)
  * [Upgrading](https://mikro-orm.io/docs/upgrading)
  * [](https://mikro-orm.io/)
  * [Querying](https://mikro-orm.io/docs/querying)
Version: 7.1
On this page
# Filters
MikroORM has the ability to pre-define filter criteria and attach those filters to given entities. The application can then decide at runtime whether certain filters should be enabled and what their parameter values should be. Filters can be used like database views, but they are parameterized inside the application.
> Filter can be defined at the entity level, dynamically via EM (global filters) or in the ORM configuration.
Filters are applied to those methods of `EntityManager`: `find()`, `findOne()`, `findAndCount()`, `findOneOrFail()`, `count()`, `nativeUpdate()` and `nativeDelete()`.
> The `cond` parameter can be a callback, possibly asynchronous.
```
@Entity()  
@Filter({ name: 'expensive', cond: { price: { $gt: 1000 } } })  
@Filter({ name: 'long', cond: { 'length(text)': { $gt: 10000 } } })  
@Filter({ name: 'hasAuthor', cond: { author: { $ne: null } }, default: true })  
@Filter({ name: 'writtenBy', cond: args => ({ author: { name: args.name } }) })  
export class Book {  
  ...  
}  
  
const books1 = await orm.em.find(Book, {}, {  
  filters: ['long', 'expensive'],  
});  
const books2 = await orm.em.find(Book, {}, {  
  filters: { hasAuthor: false, long: true, writtenBy: { name: 'God' } },  
});  
```
## Properties of filter[​](https://mikro-orm.io/docs/filters#properties-of-filter "Direct link to Properties of filter")
There are three parameters you can use:
  * `name` - can be used to enable a filter on the query. Can also be used to pass a parameter
  * `cond` - is the condition that should be added to the query when the filter is enabled. This can be a callback, even async
  * `default` - indicates if the filter is enabled by default on the query
## Parameters[​](https://mikro-orm.io/docs/filters#parameters "Direct link to Parameters")
You can define the `cond` dynamically as a callback. This callback can also be asynchronous. It will get three arguments:
  * `args` - dictionary of parameters provided by user
  * `type` - type of operation that is being filtered, one of `'read'`, `'update'`, `'delete'`
  * `em` - current instance of `EntityManager`
```
import type { EntityManager } from '@mikro-orm/mysql';  
  
@Entity()  
@Filter({ name: 'writtenBy', cond: async (args, type, em: EntityManager) => {  
  if (type === 'update') {  
    return {}; // do not apply when updating  
  }  
  
  return {  
    author: { name: args.name },  
    publishedAt: { $lte: raw('now()') },  
  };  
} })  
export class Book {  
  ...  
}  
  
const books = await orm.em.find(Book, {}, {  
  filters: { writtenBy: { name: 'God' } },  
});  
```
### Filters without parameters[​](https://mikro-orm.io/docs/filters#filters-without-parameters "Direct link to Filters without parameters")
If you want to have a filter condition that does not need arguments, but you want to access the `type` parameter, you will need to explicitly set `args: false`, otherwise error will be raised due to missing parameters:
```
@Filter({  
  name: 'withoutParams',  
  cond(_, type) {  
    return { ... };  
  },  
  args: false,  
  default: true,  
})  
```
## Global filters[​](https://mikro-orm.io/docs/filters#global-filters "Direct link to Global filters")
You can also register filters dynamically via `EntityManager` API. These are called global filters. They are enabled by default (unless disabled via last parameter in `addFilter()` method), and applied to all entities. You can limit the global filter to only specified entities.
Each global filter name must be unique within a single `EntityManager`. Calling `addFilter()` again with the same name replaces the previous definition.
> Filters as well as filter params set on the EM will be copied to all its forks.
```
// bound to entity, enabled by default  
em.addFilter('writtenBy', args => ({ author: args.id }), Book);  
  
// global, enabled by default, for all entities  
em.addFilter('tenant', args => { ... });  
  
// global, enabled by default, for only specified entities  
em.addFilter('tenant', args => { ... }, [Author, Book]);  
...  
  
// set params (probably in some middleware)  
em.setFilterParams('tenant', { tenantId: 123 });  
em.setFilterParams('writtenBy', { id: 321 });  
```
Global filters can be also registered via ORM configuration:
```
MikroORM.init({  
  filters: { tenant: { cond: args => ({ tenant: args.tenant }), entity: ['Author', 'User'] } },  
  ...  
})  
```
## Using filters[​](https://mikro-orm.io/docs/filters#using-filters "Direct link to Using filters")
You can control what filters will be applied via `filter` parameter in `FindOptions`. You can either provide an array of names of filters you want to enable, or options object, where you can also disable a filter (that was enabled by default), or pass some parameters to those that are expecting them.
> By passing `filters: false` you can also disable all the filters for given call.
```
em.find(Book, {}); // same as `{ tenantId: 123 }`  
em.find(Book, {}, { filters: ['writtenBy'] }); // same as `{ author: 321, tenantId: 123 }`  
em.find(Book, {}, { filters: { tenant: false } }); // disabled tenant filter, so truly `{}`  
em.find(Book, {}, { filters: false }); // disabled all filters, so truly `{}`  
```
## Filters and relationships[​](https://mikro-orm.io/docs/filters#filters-and-relationships "Direct link to Filters and relationships")
Since v6, filters are applied to the relations too, as part of `JOIN ON` condition. If a filter exists on a M:1 or 1:1 relation target, such an entity will be automatically joined, and when the foreign key is defined as `NOT NULL`, it will result in an `INNER JOIN` rather than `LEFT JOIN`. For nullable properties, we use a `LEFT JOIN` combined with a `WHERE` condition that ensures the filter is applied (and the row discarded) when the value is present (while not discarding the root entity if the value is `NULL`).
This is especially important for implementing soft deletes via filters, as the foreign key might point to a soft-deleted entity. When this happens, the automatic `INNER JOIN` will result in such a record not being returned at all. You can disable this behavior via `autoJoinRefsForFilters` ORM option.
To disable filters on relations completely, use `filtersOnRelations: false` in your ORM config. Note that with disabled filters on relations, `select-in` loading strategy will behave differently, since a separate query will be used to load each relation, effectively applying filters on that level instead of via a `JOIN` conditions. Disabling filters on relations also disable the `autoJoinRefsForFilters` option unless enabled explicitly.
You can also control relation filters on the entity definition level. This is useful when you want to provide default options for filters used on a relation. Those values will be merged with the ones provided via `FindOptions` or `em.fork()`.
```
// Disable all filters by setting:  
@ManyToOne({ filters: false })  
book!: Book;  
  
// Disable a specific filter by setting:  
@ManyToOne({ filters: { [filterName]: false } })  
book!: Book;  
  
// Set the param that will be passed to the filter callback:  
@ManyToOne({ filters: { [filterName]: { foo: bar } } })  
book!: Book;  
```
## Strict relation filters[​](https://mikro-orm.io/docs/filters#strict-relation-filters "Direct link to Strict relation filters")
Filters can be also marked as `strict`, which results in discarding the owning entity even if a nullable relation is filtered out. This is handy for other use cases, like checking for a tenant.
```
em.addFilter('tenant', { tenant: tenantId }, User, { strict: true });  
```
A strict filter will still issue a `LEFT JOIN` on the nullable relation, adding a `WHERE` query that will discard the owning entity if the value is defined and the filter disallows it.
## QueryBuilder[​](https://mikro-orm.io/docs/filters#querybuilder "Direct link to QueryBuilder")
Filters are normally applied only to the queries done via `EntityManager`, to use them in your `QueryBuilder`, you can use the `qb.applyFilters()` method. It takes a single argument, which is equivalent of `FindOptions.filters`.
```
const qb = em.createQueryBuilder(Author);  
await qb.applyFilters({ tenant: { tenant: 123 } }); // `tenant` filter with `{ tenant: 123 }` parameter  
const authors = await qb.getResult();  
```
## Naming of filters[​](https://mikro-orm.io/docs/filters#naming-of-filters "Direct link to Naming of filters")
When toggling filters via `FindOptions`, you do not care about the entity name. This means that when you have multiple filters defined on different entities, but with the same name, they will be controlled via single toggle in the `FindOptions`.
```
@Entity()  
@Filter({ name: 'tenant', cond: args => ({ tenant: args.tenant }) })  
export class Author {  
  ...  
}  
  
@Entity()  
@Filter({ name: 'tenant', cond: args => ({ tenant: args.tenant }) })  
export class Book {  
  ...  
}  
  
// this will apply the tenant filter to both Author and Book entities (with SELECT_IN loading strategy)  
const authors = await orm.em.find(Author, {}, {  
  populate: ['books'],  
  filters: { tenant: { tenant: 123 } }, // `tenant` filter with `{ tenant: 123 }` parameter  
});  
```
[](https://github.com/mikro-orm/mikro-orm/edit/master/docs/versioned_docs/version-7.1/filters.md)
Last updated on **May 20, 2026** by **Martin Adámek**
[Previous Loading Strategies](https://mikro-orm.io/docs/loading-strategies)[Next Query Builder](https://mikro-orm.io/docs/query-builder)
  * [Properties of filter](https://mikro-orm.io/docs/filters#properties-of-filter)
  * [Parameters](https://mikro-orm.io/docs/filters#parameters)
    * [Filters without parameters](https://mikro-orm.io/docs/filters#filters-without-parameters)
  * [Global filters](https://mikro-orm.io/docs/filters#global-filters)
  * [Using filters](https://mikro-orm.io/docs/filters#using-filters)
  * [Filters and relationships](https://mikro-orm.io/docs/filters#filters-and-relationships)
  * [Strict relation filters](https://mikro-orm.io/docs/filters#strict-relation-filters)
  * [QueryBuilder](https://mikro-orm.io/docs/filters#querybuilder)
  * [Naming of filters](https://mikro-orm.io/docs/filters#naming-of-filters)
#### Docs
  * [Quick Start](https://mikro-orm.io/docs/quick-start)
  * [Getting Started](https://mikro-orm.io/docs/guide)
  * [Migration from v6 to v7](https://mikro-orm.io/docs/upgrading-v6-to-v7)
  * [Version 6.6 docs](https://mikro-orm.io/docs/6.6/quick-start)
#### Community
  * [Discord](https://discord.gg/w8bjxFHS7X)
  * [Slack](https://join.slack.com/t/mikroorm/shared_invite/enQtNTM1ODYzMzM4MDk3LWM4ZDExMjU5ZDhmNjA2MmM3MWMwZmExNjhhNDdiYTMwNWM0MGY5ZTE3ZjkyZTMzOWExNDgyYmMzNDE1NDI5NjA)
  * [Stack Overflow](https://stackoverflow.com/questions/ask?tags=mikro-orm)
#### Social
  * [Blog](https://mikro-orm.io/blog)
  * [Twitter](https://twitter.com/MikroORM)
  * [GitHub](https://github.com/mikro-orm/mikro-orm)
  * [GitHub Sponsors](https://github.com/sponsors/mikro-orm)
![MikroORM](https://mikro-orm.io/img/logo-header.svg)
Copyright © 2018-2026 Martin Adámek. Built with Docusaurus.
============================================================
# https://mikro-orm.io/docs/usage-with-sql
============================================================
[Skip to main content](https://mikro-orm.io/docs/usage-with-sql#__docusaurus_skipToContent_fallback)
⭐️ If you like MikroORM, give it a star on [GitHub](https://github.com/mikro-orm/mikro-orm) and consider [sponsoring](https://github.com/sponsors/mikro-orm) its development! ⭐️
[![MikroORM](https://mikro-orm.io/img/logo.svg)](https://mikro-orm.io/)
[7.1](https://mikro-orm.io/docs/usage-with-sql)
  * [Next](https://mikro-orm.io/docs/next/usage-with-sql)
  * [7.1](https://mikro-orm.io/docs/usage-with-sql)
  * [7.0](https://mikro-orm.io/docs/7.0/usage-with-sql)
  * [6.6](https://mikro-orm.io/docs/6.6/usage-with-sql)
  * [5.9](https://mikro-orm.io/docs/5.9/usage-with-sql)
[Docs](https://mikro-orm.io/docs/quick-start)[API](https://mikro-orm.io/api)[Blog](https://mikro-orm.io/blog)[Changelog](https://mikro-orm.io/changelog)
[latest: v7.1.3](https://mikro-orm.io/versions)[Discord](https://discord.gg/w8bjxFHS7X "Chat on Discord")[GitHub](https://github.com/mikro-orm/mikro-orm "View on GitHub")[Twitter](https://twitter.com/MikroORM "Twitter")
Search`Ctrl``K`
  * [Quick Start](https://mikro-orm.io/docs/quick-start)
  * [Getting Started](https://mikro-orm.io/docs/guide)
    * [Chapter 1: First Entity](https://mikro-orm.io/docs/guide/first-entity)
    * [Chapter 2: Relationships](https://mikro-orm.io/docs/guide/relationships)
    * [Chapter 3: Project Setup](https://mikro-orm.io/docs/guide/project-setup)
    * [Chapter 4: Advanced](https://mikro-orm.io/docs/guide/advanced)
    * [Chapter 5: Type-safety](https://mikro-orm.io/docs/guide/type-safety)
  * [Core Concepts](https://mikro-orm.io/docs/core-concepts)
  * [Modeling](https://mikro-orm.io/docs/modeling)
  * [Querying](https://mikro-orm.io/docs/querying)
  * [Schema & Database](https://mikro-orm.io/docs/schema-database)
  * [Advanced](https://mikro-orm.io/docs/advanced)
  * [Configuration](https://mikro-orm.io/docs/configuration)
  * [Integrations](https://mikro-orm.io/docs/integrations)
    * [Usage with SQL drivers](https://mikro-orm.io/docs/usage-with-sql)
    * [Usage with SQLite](https://mikro-orm.io/docs/usage-with-sqlite)
    * [Usage with PGlite](https://mikro-orm.io/docs/usage-with-pglite)
    * [Usage with CockroachDB](https://mikro-orm.io/docs/usage-with-cockroachdb)
    * [Usage with MongoDB](https://mikro-orm.io/docs/usage-with-mongo)
    * [Usage with NestJS](https://mikro-orm.io/docs/usage-with-nestjs)
    * [Usage with Next.js](https://mikro-orm.io/docs/usage-with-nextjs)
    * [Usage with AdonisJS](https://mikro-orm.io/docs/usage-with-adonis)
    * [Usage with Jest](https://mikro-orm.io/docs/usage-with-jest)
    * [Usage with Vanilla JS](https://mikro-orm.io/docs/usage-with-js)
    * [Usage with transpilers](https://mikro-orm.io/docs/usage-with-transpilers)
    * [Usage with AdminJS](https://mikro-orm.io/docs/usage-with-adminjs)
  * [Recipes](https://mikro-orm.io/docs/recipes)
  * [Reference](https://mikro-orm.io/docs/reference)
  * [Example Integrations](https://mikro-orm.io/docs/examples)
  * [Upgrading](https://mikro-orm.io/docs/upgrading)
  * [](https://mikro-orm.io/)
  * [Integrations](https://mikro-orm.io/docs/integrations)
Version: 7.1
On this page
# Usage with SQL drivers
MikroORM supports several SQL databases out of the box. Install the driver package for your database:
  * npm
  * Yarn
  * pnpm
  * Bun
```
# for postgresql (works with cockroachdb too)  
npm install @mikro-orm/postgresql  
  
# for pglite (embedded PostgreSQL in WASM)  
npm install @mikro-orm/pglite  
  
# for mysql (works with mariadb too)  
npm install @mikro-orm/mysql  
  
# for mariadb (works with mysql too)  
npm install @mikro-orm/mariadb  
  
# for sqlite  
npm install @mikro-orm/sqlite  
  
# for libsql/turso  
npm install @mikro-orm/libsql  
  
# for mssql  
npm install @mikro-orm/mssql  
  
# for oracle  
npm install @mikro-orm/oracledb  
```
```
# for postgresql (works with cockroachdb too)  
yarn add @mikro-orm/postgresql  
  
# for pglite (embedded PostgreSQL in WASM)  
yarn add @mikro-orm/pglite  
  
# for mysql (works with mariadb too)  
yarn add @mikro-orm/mysql  
  
# for mariadb (works with mysql too)  
yarn add @mikro-orm/mariadb  
  
# for sqlite  
yarn add @mikro-orm/sqlite  
  
# for libsql/turso  
yarn add @mikro-orm/libsql  
  
# for mssql  
yarn add @mikro-orm/mssql  
  
# for oracle  
yarn add @mikro-orm/oracledb  
```
```
# for postgresql (works with cockroachdb too)  
pnpm add @mikro-orm/postgresql  
  
# for pglite (embedded PostgreSQL in WASM)  
pnpm add @mikro-orm/pglite  
  
# for mysql (works with mariadb too)  
pnpm add @mikro-orm/mysql  
  
# for mariadb (works with mysql too)  
pnpm add @mikro-orm/mariadb  
  
# for sqlite  
pnpm add @mikro-orm/sqlite  
  
# for libsql/turso  
pnpm add @mikro-orm/libsql  
  
# for mssql  
pnpm add @mikro-orm/mssql  
  
# for oracle  
pnpm add @mikro-orm/oracledb  
```
```
# for postgresql (works with cockroachdb too)  
bun add @mikro-orm/postgresql  
  
# for pglite (embedded PostgreSQL in WASM)  
bun add @mikro-orm/pglite  
  
# for mysql (works with mariadb too)  
bun add @mikro-orm/mysql  
  
# for mariadb (works with mysql too)  
bun add @mikro-orm/mariadb  
  
# for sqlite  
bun add @mikro-orm/sqlite  
  
# for libsql/turso  
bun add @mikro-orm/libsql  
  
# for mssql  
bun add @mikro-orm/mssql  
  
# for oracle  
bun add @mikro-orm/oracledb  
```
> The driver package has `@mikro-orm/core` as a peer dependency, which most package managers install automatically. If you plan to use additional packages like `@mikro-orm/cli`, `@mikro-orm/migrations`, or `@mikro-orm/seeder`, install `@mikro-orm/core` explicitly to ensure all packages share the same instance:
>   * npm
>   * Yarn
>   * pnpm
>   * Bun
> 
> 
```
> 
npm install @mikro-orm/core @mikro-orm/postgresql @mikro-orm/migrations @mikro-orm/cli  
> 
> 
```
> 
```
> 
yarn add @mikro-orm/core @mikro-orm/postgresql @mikro-orm/migrations @mikro-orm/cli  
> 
> 
```
> 
```
> 
pnpm add @mikro-orm/core @mikro-orm/postgresql @mikro-orm/migrations @mikro-orm/cli  
> 
> 
```
> 
```
> 
bun add @mikro-orm/core @mikro-orm/postgresql @mikro-orm/migrations @mikro-orm/cli  
> 
> 
```
## Getting started[​](https://mikro-orm.io/docs/usage-with-sql#getting-started "Direct link to Getting started")
Create a configuration file and call `MikroORM.init()` to bootstrap the ORM. Import from your driver package to get access to driver-specific features like `QueryBuilder`:
```
import { MikroORM } from '@mikro-orm/postgresql'; // or any other SQL driver package  
  
const orm = await MikroORM.init({  
  entities: [Author, Book],  
  dbName: 'my-db-name',  
});  
```
You can also use the `defineConfig` helper for type-safe configuration:
```
import { defineConfig } from '@mikro-orm/postgresql';  
  
export default defineConfig({  
  entities: [Author, Book],  
  dbName: 'my-db-name',  
});  
```
> To access driver-specific methods like `em.createQueryBuilder()`, import `MikroORM`, `EntityManager`, or `EntityRepository` from the driver package rather than `@mikro-orm/core`.
## Schema management[​](https://mikro-orm.io/docs/usage-with-sql#schema-management "Direct link to Schema management")
MikroORM provides several tools for managing your database schema:
  * **[SchemaGenerator](https://mikro-orm.io/docs/schema-generator)** — create, update, or drop your schema directly from entity metadata. Useful for prototyping and development.
  * **[Migrations](https://mikro-orm.io/docs/migrations)** — version-controlled schema changes for production workflows.
  * **[EntityGenerator](https://mikro-orm.io/docs/entity-generator)** — introspect an existing database and generate entity files from it.
## QueryBuilder[​](https://mikro-orm.io/docs/usage-with-sql#querybuilder "Direct link to QueryBuilder")
The `QueryBuilder` provides a fluent, type-safe API for constructing SQL queries. It is metadata-aware and can automatically handle joins, aliasing, and column mapping:
```
const qb = em.createQueryBuilder(Author);  
qb.select('*')  
  .where({ name: { $like: '%test%' } })  
  .orderBy({ name: 'asc' })  
  .limit(10);  
  
const authors = await qb.getResultList();  
```
You can also use it for update and delete operations:
```
const qb = em.createQueryBuilder(Author);  
await qb.update({ name: 'updated' }).where({ id: 123 }).execute();  
  
await em.createQueryBuilder(Author).delete().where({ id: 456 }).execute();  
```
For more details, see the [QueryBuilder documentation](https://mikro-orm.io/docs/query-builder).
## Transactions[​](https://mikro-orm.io/docs/usage-with-sql#transactions "Direct link to Transactions")
All changes computed during `em.flush()` are executed [inside a database transaction](https://mikro-orm.io/docs/unit-of-work) by default — you don't need to manage transactions manually for typical operations.
When you need explicit control, use `em.transactional()`:
```
await em.transactional(async em => {  
  const author = new Author('God', 'hello@heaven.god');  
  em.persist(author);  
  // if an error occurs, all changes are rolled back  
});  
```
## ManyToMany relations with pivot tables[​](https://mikro-orm.io/docs/usage-with-sql#manytomany-relations-with-pivot-tables "Direct link to ManyToMany relations with pivot tables")
SQL drivers use pivot tables for `ManyToMany` relations. MikroORM manages these automatically — you only need to define the relation on your entities:
```
@ManyToMany(() => BookTag)  
tags = new Collection<BookTag>(this);  
```
To customize the pivot table name, use the `pivotTable` option:
```
@ManyToMany({ entity: () => BookTag, pivotTable: 'book2tag' })  
tags = new Collection<BookTag>(this);  
```
## Native queries[​](https://mikro-orm.io/docs/usage-with-sql#native-queries "Direct link to Native queries")
When you need to bypass the ORM and execute raw SQL:
```
// via QueryBuilder  
const qb = em.createQueryBuilder(Author);  
qb.select('*').where({ id: { $in: [1, 2, 3] } });  
const res = await qb.execute();  
  
// or raw SQL directly  
const result = await em.execute('SELECT 1 + 1 as result');  
```
For bulk operations that don't need change tracking, use the native methods:
```
// insert without creating an entity instance  
await em.insert(Author, { name: 'test', email: 'test@example.com' });  
  
// bulk update  
await em.nativeUpdate(Author, { active: false }, { active: true });  
  
// bulk delete  
await em.nativeDelete(Author, { active: false });  
```
These methods execute SQL directly and do not trigger lifecycle hooks.
## Using SQLite extensions[​](https://mikro-orm.io/docs/usage-with-sql#using-sqlite-extensions "Direct link to Using SQLite extensions")
SQLite extensions like [sqlean](https://github.com/nalgeon/sqlean) can add features that are missing by default (e.g., regexp). Load them via `pool.afterCreate`:
```
const orm = await MikroORM.init({  
  // ...  
  pool: {  
    afterCreate: (conn: any, done: any) => {  
      conn.loadExtension('/path/to/sqlean');  
      done(null, conn);  
    },  
  },  
});  
```
## Using Turso database[​](https://mikro-orm.io/docs/usage-with-sql#using-turso-database "Direct link to Using Turso database")
To connect to a remote [Turso](https://docs.turso.tech/introduction) database, use the `@mikro-orm/libsql` driver with the `password` option for the auth token:
```
import { defineConfig } from '@mikro-orm/libsql';  
  
export default defineConfig({  
  dbName: process.env.LIBSQL_URL,  
  password: process.env.LIBSQL_AUTH_TOKEN,  
});  
```
For embedded replicas with sync, use the `driverOptions`:
```
import { defineConfig } from '@mikro-orm/libsql';  
  
export default defineConfig({  
  dbName: 'local.db',  
  password: process.env.LIBSQL_AUTH_TOKEN,  
  driverOptions: {  
    syncUrl: process.env.LIBSQL_URL,  
    syncPeriod: 0.5, // 500ms  
  },  
});  
```
## Using Cloudflare D1 database[​](https://mikro-orm.io/docs/usage-with-sql#using-cloudflare-d1-database "Direct link to Using Cloudflare D1 database")
> **Experimental:** D1 support is experimental and has significant limitations. Use with caution.
[Cloudflare D1](https://developers.cloudflare.com/d1/) is a serverless SQLite database. Use MikroORM with D1 by passing a Kysely D1 dialect via `driverOptions`:
```
import { MikroORM } from '@mikro-orm/sqlite';  
import { D1Dialect } from 'kysely-d1';  
  
export default {  
  async fetch(request: Request, env: Env) {  
    const orm = await MikroORM.init({  
      entities: [...],  
      // the `dbName` is not used when a dialect is provided, but it's still required  
      dbName: 'd1',  
      driverOptions: new D1Dialect({ database: env.DB }),  
      // required: D1 does not support explicit transactions  
      implicitTransactions: false,  
    });  
  
    // ...  
  },  
};  
```
You can also pass a factory function if you need to create the dialect lazily:
```
MikroORM.init({  
  entities: [...],  
  dbName: 'd1',  
  driverOptions: () => new D1Dialect({ database: env.DB }),  
  implicitTransactions: false,  
});  
```
### D1 Limitations[​](https://mikro-orm.io/docs/usage-with-sql#d1-limitations "Direct link to D1 Limitations")
D1 has significant limitations compared to regular SQLite:
  * **No transaction support:** D1 does not support explicit transaction statements (`BEGIN TRANSACTION`). You must set `implicitTransactions: false` for `em.flush()` to work. This means changes are not applied atomically — if an error occurs mid-flush, some changes may be persisted while others are not.
  * **`em.transactional()`will not work:** Since there's no transaction support, wrapping code in `em.transactional()` provides no atomicity guarantees.
  * **No query streaming:** Large result sets cannot be streamed and must be fetched entirely into memory.
  * **Limited`ALTER TABLE` :** No support for `ALTER COLUMN` or `ADD CONSTRAINT`, which affects schema migrations.
See the [D1 SQL documentation](https://developers.cloudflare.com/d1/sql-api/sql-statements/) for more details on supported SQL statements.
## MS SQL Server limitations[​](https://mikro-orm.io/docs/usage-with-sql#ms-sql-server-limitations "Direct link to MS SQL Server limitations")
  * UUID values are returned in upper case
  * Cycles in cascade paths are not supported
  * Schema diffing capabilities are limited
  * No native support for fulltext search
  * Upsert support is limited
## Oracle limitations[​](https://mikro-orm.io/docs/usage-with-sql#oracle-limitations "Direct link to Oracle limitations")
  * Cycles in cascade paths are not supported
  * No `ON UPDATE` clause for foreign keys (Oracle does not support it natively)
  * No support for multiple statements in a single query
  * No support for tuple comparison in `WHERE` clauses
  * Foreign keys are not automatically indexed
## Custom driver[​](https://mikro-orm.io/docs/usage-with-sql#custom-driver "Direct link to Custom driver")
If you need to support a database that is not included, you can implement your own driver. See the [custom driver documentation](https://mikro-orm.io/docs/custom-driver) for details.
```
import { MyCustomDriver } from './MyCustomDriver.ts';  
  
const orm = await MikroORM.init({  
  entities: [Author, Book],  
  dbName: 'my-db-name',  
  driver: MyCustomDriver,  
});  
```
[](https://github.com/mikro-orm/mikro-orm/edit/master/docs/versioned_docs/version-7.1/usage-with-sql.md)
Last updated on **May 20, 2026** by **Martin Adámek**
[Previous Integrations](https://mikro-orm.io/docs/integrations)[Next Usage with SQLite](https://mikro-orm.io/docs/usage-with-sqlite)
  * [Getting started](https://mikro-orm.io/docs/usage-with-sql#getting-started)
  * [Schema management](https://mikro-orm.io/docs/usage-with-sql#schema-management)
  * [QueryBuilder](https://mikro-orm.io/docs/usage-with-sql#querybuilder)
  * [Transactions](https://mikro-orm.io/docs/usage-with-sql#transactions)
  * [ManyToMany relations with pivot tables](https://mikro-orm.io/docs/usage-with-sql#manytomany-relations-with-pivot-tables)
  * [Native queries](https://mikro-orm.io/docs/usage-with-sql#native-queries)
  * [Using SQLite extensions](https://mikro-orm.io/docs/usage-with-sql#using-sqlite-extensions)
  * [Using Turso database](https://mikro-orm.io/docs/usage-with-sql#using-turso-database)
  * [Using Cloudflare D1 database](https://mikro-orm.io/docs/usage-with-sql#using-cloudflare-d1-database)
    * [D1 Limitations](https://mikro-orm.io/docs/usage-with-sql#d1-limitations)
  * [MS SQL Server limitations](https://mikro-orm.io/docs/usage-with-sql#ms-sql-server-limitations)
  * [Oracle limitations](https://mikro-orm.io/docs/usage-with-sql#oracle-limitations)
  * [Custom driver](https://mikro-orm.io/docs/usage-with-sql#custom-driver)
#### Docs
  * [Quick Start](https://mikro-orm.io/docs/quick-start)
  * [Getting Started](https://mikro-orm.io/docs/guide)
  * [Migration from v6 to v7](https://mikro-orm.io/docs/upgrading-v6-to-v7)
  * [Version 6.6 docs](https://mikro-orm.io/docs/6.6/quick-start)
#### Community
  * [Discord](https://discord.gg/w8bjxFHS7X)
  * [Slack](https://join.slack.com/t/mikroorm/shared_invite/enQtNTM1ODYzMzM4MDk3LWM4ZDExMjU5ZDhmNjA2MmM3MWMwZmExNjhhNDdiYTMwNWM0MGY5ZTE3ZjkyZTMzOWExNDgyYmMzNDE1NDI5NjA)
  * [Stack Overflow](https://stackoverflow.com/questions/ask?tags=mikro-orm)
#### Social
  * [Blog](https://mikro-orm.io/blog)
  * [Twitter](https://twitter.com/MikroORM)
  * [GitHub](https://github.com/mikro-orm/mikro-orm)
  * [GitHub Sponsors](https://github.com/sponsors/mikro-orm)
![MikroORM](https://mikro-orm.io/img/logo-header.svg)
Copyright © 2018-2026 Martin Adámek. Built with Docusaurus.
============================================================
# https://mikro-orm.io/docs/migrations
============================================================
[Skip to main content](https://mikro-orm.io/docs/migrations#__docusaurus_skipToContent_fallback)
⭐️ If you like MikroORM, give it a star on [GitHub](https://github.com/mikro-orm/mikro-orm) and consider [sponsoring](https://github.com/sponsors/mikro-orm) its development! ⭐️
[ ![MikroORM](https://mikro-orm.io/img/logo.svg)![MikroORM](https://mikro-orm.io/img/logo-dark.svg) ](https://mikro-orm.io/)
[7.1](https://mikro-orm.io/docs/migrations)
  * [Next](https://mikro-orm.io/docs/next/migrations)
  * [7.1](https://mikro-orm.io/docs/migrations)
  * [7.0](https://mikro-orm.io/docs/7.0/migrations)
  * [6.6](https://mikro-orm.io/docs/6.6/migrations)
  * [5.9](https://mikro-orm.io/docs/5.9/migrations)
[Docs](https://mikro-orm.io/docs/quick-start)[API](https://mikro-orm.io/api)[Blog](https://mikro-orm.io/blog)[Changelog](https://mikro-orm.io/changelog)
[latest: v7.1.3](https://mikro-orm.io/versions)[Discord](https://discord.gg/w8bjxFHS7X "Chat on Discord")[GitHub](https://github.com/mikro-orm/mikro-orm "View on GitHub")[Twitter](https://twitter.com/MikroORM "Twitter")
Search
  * [Quick Start](https://mikro-orm.io/docs/quick-start)
  * [Getting Started](https://mikro-orm.io/docs/guide)
    * [Chapter 1: First Entity](https://mikro-orm.io/docs/guide/first-entity)
    * [Chapter 2: Relationships](https://mikro-orm.io/docs/guide/relationships)
    * [Chapter 3: Project Setup](https://mikro-orm.io/docs/guide/project-setup)
    * [Chapter 4: Advanced](https://mikro-orm.io/docs/guide/advanced)
    * [Chapter 5: Type-safety](https://mikro-orm.io/docs/guide/type-safety)
  * [Core Concepts](https://mikro-orm.io/docs/core-concepts)
  * [Modeling](https://mikro-orm.io/docs/modeling)
  * [Querying](https://mikro-orm.io/docs/querying)
  * [Schema & Database](https://mikro-orm.io/docs/schema-database)
    * [Schema Generator](https://mikro-orm.io/docs/schema-generator)
    * [Migrations](https://mikro-orm.io/docs/migrations)
    * [Seeding](https://mikro-orm.io/docs/seeding)
    * [Entity Generator](https://mikro-orm.io/docs/entity-generator)
    * [Naming Strategy](https://mikro-orm.io/docs/naming-strategy)
    * [Using Multiple Schemas](https://mikro-orm.io/docs/multiple-schemas)
    * [Virtual Entities](https://mikro-orm.io/docs/virtual-entities)
    * [View Entities](https://mikro-orm.io/docs/view-entities)
    * [Materialized Views](https://mikro-orm.io/docs/materialized-views)
    * [Stored Routines](https://mikro-orm.io/docs/stored-routines)
  * [Advanced](https://mikro-orm.io/docs/advanced)
  * [Configuration](https://mikro-orm.io/docs/configuration)
  * [Integrations](https://mikro-orm.io/docs/integrations)
  * [Recipes](https://mikro-orm.io/docs/recipes)
  * [Reference](https://mikro-orm.io/docs/reference)
  * [Example Integrations](https://mikro-orm.io/docs/examples)
  * [Upgrading](https://mikro-orm.io/docs/upgrading)
  * [](https://mikro-orm.io/)
  * [Schema & Database](https://mikro-orm.io/docs/schema-database)
Version: 7.1
On this page
# Migrations
MikroORM has integrated support for migrations. It allows you to generate migrations based on the current schema difference.
To use migrations, you need to first install `@mikro-orm/migrations` package for SQL driver or `@mikro-orm/migrations-mongodb` for MongoDB, and register the `Migrator` extension in your ORM config.
mikro-orm.config.ts
```
import { Migrator } from '@mikro-orm/migrations'; // or `@mikro-orm/migrations-mongodb`  
  
export default defineConfig({  
  // ...  
  extensions: [Migrator],  
})  
```
> Migrations are stored without an extension.
By default, each migration will be executed inside a transaction, and all of them will be wrapped in one master transaction, so if one of them fails, everything will be rolled back.
## Migration class[​](https://mikro-orm.io/docs/migrations#migration-class "Direct link to Migration class")
Migrations are classes that extend Migration abstract class:
```
import { Migration } from '@mikro-orm/migrations';  
  
export class Migration20191019195930 extends Migration {  
  
  async up(): Promise<void> {  
    this.addSql('select 1 + 1');  
  }  
  
}  
```
To support undoing those changed, you can implement the `down` method, which throws an error by default.
Migrations are by default wrapped in a transaction. You can override this behaviour on per migration basis by implementing the `isTransactional(): boolean` method.
`Configuration` object and driver instance are available in the `Migration` class context.
You can execute queries in the migration via `Migration.execute()` method, which will run queries in the same transaction as the rest of the migration. The `Migration.addSql()` method also accepts instances of the native query builder or `raw()` SQL fragments.
### Working with `EntityManager`[​](https://mikro-orm.io/docs/migrations#working-with-entitymanager "Direct link to working-with-entitymanager")
While the purpose of migrations is mainly to alter your SQL schema, you can as well use them to modify your data, either by using `this.execute()`, or through an `EntityManager`:
Using the `EntityManager` in migrations is possible, but discouraged, as it can lead to errors when your metadata change over time, since this will depend on your currently checked out app state, not on the time when the migration was generated. You should prefer using raw queries in your migrations.
```
import { Migration } from '@mikro-orm/migrations';  
import { User } from '../entities/User';  
  
export class Migration20191019195930 extends Migration {  
  
  async up(): Promise<void> {  
    const em = this.getEntityManager();  
    em.create(User, { ... });  
    await em.flush();  
  }  
  
}  
```
## Initial migration[​](https://mikro-orm.io/docs/migrations#initial-migration "Direct link to Initial migration")
> This is optional and only needed for the specific use case, when both entities and schema already exist.
If you want to start using migrations, and you already have the schema generated, you can do so by creating so-called initial migration:
> Initial migration can be created only if there are no migrations previously generated or executed.
```
npx mikro-orm migration:create --initial  
```
This will create the initial migration, containing the schema dump from `schema:create` command. The migration will be automatically marked as executed.
## Snapshots[​](https://mikro-orm.io/docs/migrations#snapshots "Direct link to Snapshots")
Creating new migration will automatically save the target schema snapshot into migrations folder. This snapshot will be then used if you try to create new migration, instead of using current database schema. This means that if you try to create new migration before you run the pending ones, you still get the right schema diff.
The snapshot file is written from two different sources depending on the command:
  * `migration:create` (and `migration:create --initial`) write it from the target schema derived from your entity metadata.
  * `migration:up` and `migration:down` rewrite it from the real database schema via introspection, after the migrations have been applied.
Both paths produce the same serialized shape for a given schema, so running migrations after `migration:create` does not normally rewrite the snapshot in a meaningful way. Some DB-specific details (e.g. postgres type aliases like `int` vs `int4`) can still produce small diffs.
> Snapshots should be versioned just like the regular migration files.
Snapshotting can be disabled via `migrations.snapshot: false` in the ORM config.
## Configuration[​](https://mikro-orm.io/docs/migrations#configuration "Direct link to Configuration")
> The `pattern` option has been replaced with `glob`.
> `migrations.path` and `migrations.pathTs` works the same way as `entities` and `entitiesTs` in entity discovery.
```
await MikroORM.init({  
  // default values:  
  migrations: {  
    tableName: 'mikro_orm_migrations',  
    path: './migrations',  
    pathTs: undefined,  
    glob: '!(*.d).{js,ts,cjs}',  
    silent: false,  
    transactional: true,  
    disableForeignKeys: false,  
    allOrNothing: true,  
    dropTables: true,  
    safe: false,  
    snapshot: true,  
    emit: 'ts',  
    generator: TSMigrationGenerator,  
    fileName: (timestamp: string, name?: string) => `Migration${timestamp}${name ? '_' + name : ''}`,  
  },  
})  
```
### Available options[​](https://mikro-orm.io/docs/migrations#available-options "Direct link to Available options")  
| Option  | Description  |  
| --- | --- |  
| `tableName: string`  | Name of the database table used to store migration execution log. Defaults to `'mikro_orm_migrations'`.  |  
| `path: string`  | Path to the folder containing compiled migration files. Defaults to `'./migrations'`. This should point to JavaScript files in production.  |  
| `pathTs: string`  | Path to the folder containing TypeScript migration source files. Used during development when using `tsx` or similar. If specified, `path` should point to the compiled output.  |  
| `glob: string`  | Glob pattern to match migration files. Defaults to `'!(*.d).{js,ts,cjs}'` (matches all .js, .ts, and .cjs files except .d.ts files).  |  
| `silent: boolean`  | Whether to suppress migration execution logs. Defaults to `false`.  |  
| `transactional: boolean`  | Whether to wrap each individual migration in a transaction. Defaults to `true`. If `false`, migrations will not be automatically wrapped in transactions.  |  
| `disableForeignKeys: boolean`  | Whether to disable foreign key checks during migrations. Defaults to `false`. When `true`, wraps migration statements with `set foreign_key_checks = 0` or equivalent.  |  
| `allOrNothing: boolean`  | Whether to wrap all migrations in a master transaction. Defaults to `true`. If any migration fails, all changes are rolled back.  |  
| `dropTables: boolean`  | Whether to allow dropping tables during migrations. Defaults to `true`. When `false`, table drop operations are skipped.  |  
| `safe: boolean`  | Whether to run migrations in safe mode. Defaults to `false`. When `true`, disables both table dropping and column dropping for safety.  |  
| `snapshot: boolean`  | Whether to save schema snapshots when creating new migrations. Defaults to `true`. Snapshots help with migration diffing and should be versioned alongside migration files.  |  
| `snapshotName: string`  | Custom name for schema snapshot files. By default, uses a generated name based on the migration timestamp.  |  
| `emit: 'js' | 'ts' | 'cjs'`  | Format for generated migration files. Defaults to `'ts'`. Use `'js'` for plain JavaScript, `'cjs'` for CommonJS format.  |  
| `generator: Constructor<IMigrationGenerator>`  | Migration generator class to use for creating migration file contents. Defaults to `TSMigrationGenerator` for TypeScript files. Can be customized to change formatting or structure.  |  
| `fileName: (timestamp: string, name?: string) => string`  | Function to generate migration file names. Receives a timestamp and optional name parameter. Defaults to `Migration${timestamp}${name ? '_' + name : ''}`.  |  
| `migrationsList: (MigrationObject | Constructor<Migration>)[]`  | Array of migration objects or classes to use instead of file-based discovery. Useful for bundled applications where file system access is limited.  |  
| `schema: string`  | Default target schema to run migrations against. The driver's "set current schema" statement is issued before each migration and the tracking table lives in this schema. See [Runtime schema context](https://mikro-orm.io/docs/migrations#runtime-schema-context). Not supported on MSSQL.  |  
| `includeWildcardSchema: boolean`  | When `true`, entities with `schema: '*'` are included in `migration:create` output and emitted as unqualified DDL, so the resulting migrations can be applied against any schema via `migrator.up({ schema })`. Defaults to `false`.  |  
### Example configuration[​](https://mikro-orm.io/docs/migrations#example-configuration "Direct link to Example configuration")
```
await MikroORM.init({  
  migrations: {  
    tableName: 'my_migrations',  
    path: 'dist/migrations',  
    pathTs: 'src/migrations',  
    glob: '*.{js,ts}',  
    silent: false,  
    transactional: true,  
    disableForeignKeys: true,  
    allOrNothing: true,  
    dropTables: false, // disable table dropping for safety  
    safe: false,  
    snapshot: true,  
    emit: 'ts',  
    fileName: (timestamp, name) => `${timestamp}_${name || 'migration'}`,  
  },  
});  
```
You can also override those options using the [environment variables](https://mikro-orm.io/docs/configuration#using-environment-variables):
  * `MIKRO_ORM_MIGRATIONS_TABLE_NAME`
  * `MIKRO_ORM_MIGRATIONS_PATH`
  * `MIKRO_ORM_MIGRATIONS_PATH_TS`
  * `MIKRO_ORM_MIGRATIONS_GLOB`
  * `MIKRO_ORM_MIGRATIONS_TRANSACTIONAL`
  * `MIKRO_ORM_MIGRATIONS_DISABLE_FOREIGN_KEYS`
  * `MIKRO_ORM_MIGRATIONS_ALL_OR_NOTHING`
  * `MIKRO_ORM_MIGRATIONS_DROP_TABLES`
  * `MIKRO_ORM_MIGRATIONS_SAFE`
  * `MIKRO_ORM_MIGRATIONS_SILENT`
  * `MIKRO_ORM_MIGRATIONS_EMIT`
  * `MIKRO_ORM_MIGRATIONS_SNAPSHOT`
  * `MIKRO_ORM_MIGRATIONS_SNAPSHOT_NAME`
## Running migrations in production[​](https://mikro-orm.io/docs/migrations#running-migrations-in-production "Direct link to Running migrations in production")
In production environment you might want to use compiled migration files. This should work almost out of box, all you need to do is to configure the migration path accordingly:
```
import { MikroORM, Utils } from '@mikro-orm/core';  
  
await MikroORM.init({  
  migrations: {  
    path: 'dist/migrations',  
    pathTs: 'src/migrations',  
  },  
  // or alternatively  
  // migrations: {  
  //   path: Utils.detectTypeScriptSupport() ? 'src/migrations' : 'dist/migrations',  
  // },  
  // ...  
});  
```
This should allow using CLI to generate TS migration files (as in CLI you probably have TS support enabled), while using compiled JS files in production.
## Using custom `MigrationGenerator`[​](https://mikro-orm.io/docs/migrations#using-custom-migrationgenerator "Direct link to using-custom-migrationgenerator")
When you generate new migrations, `MigrationGenerator` class is responsible for generating the file contents. You can provide your own implementation to do things like formatting the SQL statement.
```
import { TSMigrationGenerator } from '@mikro-orm/migrations';  
import { format } from 'sql-formatter';  
  
class CustomMigrationGenerator extends TSMigrationGenerator {  
  
  generateMigrationFile(className: string, diff: { up: string[]; down: string[] }): string {  
    const comment = '// this file was generated via custom migration generator\n\n';  
    return comment + super.generateMigrationFile(className, diff);  
  }  
  
  createStatement(sql: string, padLeft: number): string {  
    sql = format(sql, { language: 'postgresql' });  
    // a bit of indenting magic  
    sql = sql.split('\n').map((l, i) => i === 0 ? l : `${' '.repeat(padLeft + 13)}${l}`).join('\n');  
  
    return super.createStatement(sql, padLeft);  
  }  
  
}  
  
await MikroORM.init({  
  // ...  
  migrations: {  
    generator: CustomMigrationGenerator,  
  },  
});  
```
## Using via CLI[​](https://mikro-orm.io/docs/migrations#using-via-cli "Direct link to Using via CLI")
You can use it via CLI:
```
npx mikro-orm migration:create   # Create new migration with current schema diff  
npx mikro-orm migration:up       # Migrate up to the latest version  
npx mikro-orm migration:down     # Migrate one step down  
npx mikro-orm migration:list     # List all executed migrations  
npx mikro-orm migration:check    # Check if schema is up to date  
npx mikro-orm migration:pending  # List all pending migrations  
npx mikro-orm migration:fresh    # Drop the database and migrate up to the latest version  
npx mikro-orm migration:log      # Mark a migration as executed without running it  
npx mikro-orm migration:unlog    # Remove a migration from the executed list without reverting it  
npx mikro-orm migration:rollup   # Combine all executed migrations into a single migration  
```
> To create blank migration file, you can use `npx mikro-orm migration:create --blank`.
For `migration:up` and `migration:down` commands you can specify `--from` (`-f`), `--to` (`-t`) and `--only` (`-o`) options to run only a subset of migrations:
```
npx mikro-orm migration:up --from 2019101911 --to 2019102117  # the same as above  
npx mikro-orm migration:up --only 2019101923                  # apply a single migration  
npx mikro-orm migration:down --to 0                           # migrate down all migrations  
```
> To run TS migration files, make sure you have `tsx` installed in your project, the CLI will use it automatically.
For the `migration:fresh` command you can specify `--seed` to seed the database after migrating.
```
npx mikro-orm migration:fresh --seed              # seed the database with the default database seeder  
npx mikro-orm migration:fresh --seed=UsersSeeder  # seed the database with the UsersSeeder  
```
> You can specify the default database seeder in the orm config with the key `config.seeder.defaultSeeder`
The `migration:rollup` command combines all executed migrations into a single migration file. This is useful for cleaning up a large number of migrations that have accumulated over time. It works by extracting the source code from each migration's `up()` and `down()` methods and concatenating them into a new migration file — no database interaction required (other than updating the migration log), so there is no risk of data loss.
## Using the Migrator programmatically[​](https://mikro-orm.io/docs/migrations#using-the-migrator-programmatically "Direct link to Using the Migrator programmatically")
Or you can create a simple script where you initialize MikroORM like this:
./migrate.ts
```
import { MikroORM } from '@mikro-orm/core';  
import { Migrator } from '@mikro-orm/migrations';  
  
(async () => {  
  const orm = await MikroORM.init({  
    extensions: [Migrator],  
    dbName: 'your-db-name',  
    // ...  
  });  
  
  await orm.migrator.create(); // creates file Migration20191019195930.ts  
  await orm.migrator.up(); // runs migrations up to the latest  
  await orm.migrator.up('name'); // runs only given migration, up  
  await orm.migrator.up({ to: 'up-to-name' }); // runs migrations up to given version  
  await orm.migrator.down(); // migrates one step down  
  await orm.migrator.down('name'); // runs only given migration, down  
  await orm.migrator.down({ to: 'down-to-name' }); // runs migrations down to given version  
  await orm.migrator.down({ to: 0 }); // migrates down to the first version  
  await orm.migrator.rollup(); // combines all executed migrations into one  
  await orm.migrator.rollup(['Migration1', 'Migration2']); // combines specific migrations  
  await orm.migrator.up({ schema: 'tenant_42' }); // run against a specific schema, see "Runtime schema context"  
  
  await orm.close(true);  
})();  
```
Then run this script via `tsx` (or compile it to plain JS and use `node`):
```
$ tsx migrate  
```
## Providing transaction context[​](https://mikro-orm.io/docs/migrations#providing-transaction-context "Direct link to Providing transaction context")
In some cases, you might want to control the transaction context yourself:
```
await orm.em.transactional(async em => {  
  await migrator.up({ transaction: em.getTransactionContext() });  
});  
```
## Runtime schema context[​](https://mikro-orm.io/docs/migrations#runtime-schema-context "Direct link to Runtime schema context")
By default, migrations run against the schema baked into the SQL itself (or the connection's default schema for unqualified DDL). The runtime schema context lets you redirect existing migrations to another schema without regenerating them — useful for per-deployment-one-schema setups (e.g. PR preview environments) and for fanning a single set of migrations out across multiple tenant schemas.
When a runtime schema is resolved, the migrator prepends the driver's "set current schema" statement before each migration and resets it in a `finally` block so the pooled connection is not left pointing at the migration's target schema. The migration tracking table follows the same schema, so each target maintains an independent migration history.  
| Driver  | Set  | Reset  |  
| --- | --- | --- |  
| PostgreSQL  | `SET search_path TO "x"`  | `RESET search_path`  |  
| MySQL / MariaDB  | `USE `x``  | `USE `<config.dbName>``  |  
| Oracle  | `ALTER SESSION SET CURRENT_SCHEMA = "x"`  | `ALTER SESSION SET CURRENT_SCHEMA = "<dbName>"`  |  
| MSSQL  | unsupported — throws  | —  |  
| SQLite / libSQL  | schemaless — silent no-op  | —  |  
### Per-deployment-one-schema[​](https://mikro-orm.io/docs/migrations#per-deployment-one-schema "Direct link to Per-deployment-one-schema")
Set `migrations.schema` in your ORM config and existing unqualified migrations execute in that schema, with the tracking table alongside them:
```
await MikroORM.init({  
  migrations: {  
    schema: process.env.PR_PREVIEW_SCHEMA, // e.g. 'pr_1234'  
  },  
});  
```
### Multi-schema fan-out[​](https://mikro-orm.io/docs/migrations#multi-schema-fan-out "Direct link to Multi-schema fan-out")
Opt wildcard entities into `migration:create` via `migrations.includeWildcardSchema`, then apply the resulting unqualified migrations with `migrator.up({ schema })`:
```
await MikroORM.init({  
  migrations: {  
    includeWildcardSchema: true,  
  },  
});  
  
for (const tenant of tenants) {  
  await orm.migrator.up({ schema: tenant });  
}  
```
You can also inspect per-tenant migration state without mutating global config:
```
await orm.migrator.getExecuted({ schema: 'tenant_42' });  
await orm.migrator.getPending({ schema: 'tenant_42' });  
```
Tenant orchestration and failure recovery remain the caller's responsibility — the migrator exposes per-schema primitives, not a managed multi-tenant runner.
For unqualified DDL to be emitted by `migration:create`, neither `options.schema` nor `config.schema` may be set when generating the migration. If `config.schema` is set, wildcard tables will be qualified with it (useful for local dev runs). Generate migrations from an environment where `config.schema` is unset, then apply them with `migrator.up({ schema })`.
### CLI[​](https://mikro-orm.io/docs/migrations#cli "Direct link to CLI")
Both `migration:up` and `migration:down` accept a `--schema` (alias `-s`) flag:
```
npx mikro-orm migration:up --schema tenant_42  
npx mikro-orm migration:down --schema tenant_42  
```
### Caveats[​](https://mikro-orm.io/docs/migrations#caveats "Direct link to Caveats")
  * **`public`is not implicit.** The `search_path` (or equivalent) is set to the target schema only — queries referencing extensions or shared lookups in `public` must qualify them explicitly. Data-isolated deployments (PR previews, tenants) cannot accidentally read or write `public`.
  * **Requires transactional migrations.** Combining a runtime schema with `transactional: false` (or a migration that overrides `isTransactional()` to `false`) throws — without a pinned transaction, each statement may land on a different pooled connection and the set/reset would not cover the DDL.
  * **Sequential fan-out only.** `migrator.up({ schema })` stores the target schema as instance state on the shared `MigrationRunner` / `MigrationStorage`. Running `Promise.all([orm.migrator.up({ schema: 'a' }), orm.migrator.up({ schema: 'b' })])` on the same ORM instance would interleave set/reset calls and is unsupported. For true parallel deploys, run separate processes (each with its own `MikroORM.init`).
  * **`migrations.schema`does not fall back to`config.schema`.** It is opt-in for the migrator only.
  * **MongoDB.** The Mongo migrator throws a clear error when `{ schema }` is passed instead of silently ignoring it.
## Importing migrations statically[​](https://mikro-orm.io/docs/migrations#importing-migrations-statically "Direct link to Importing migrations statically")
If you do not want to dynamically import a folder (e.g. when bundling your code with webpack) you can import migrations directly. You can do that with an explicit migration name or the implicit filename as migration name.
```
import { MikroORM } from '@mikro-orm/core';  
import { Migrator } from '@mikro-orm/migrations';  
import { Migration20191019195930 } from '../migrations/Migration20191019195930.ts';  
import { Migration20191019195931 } from '../migrations/Migration20191019195931.ts';  
  
await MikroORM.init({  
  extensions: [Migrator],  
  migrations: {  
    migrationsList: [  
      // explicit migration name  
      {  
        name: 'CustomMigrationName',  
        class: Migration20191019195930,  
      },  
      // implicit migration name  
      Migration20191019195931  
    ],  
  },  
});  
```
With the help of [webpack's context module api](https://webpack.js.org/guides/dependency-management/#context-module-api) you can dynamically import the migrations making it possible to import all files in a folder.
```
import { MikroORM } from '@mikro-orm/core';  
import { Migrator } from '@mikro-orm/migrations';  
import { basename } from 'path';  
  
const migrations = {};  
  
function importAll(r) {  
  r.keys().forEach(  
    (key) => (migrations[basename(key)] = Object.values(r(key))[0])  
  );  
}  
  
importAll(require.context('../migrations', false, /\.ts$/));  
  
const migrationsList = Object.keys(migrations).map((migrationName) => ({  
  name: migrationName,  
  class: migrations[migrationName],  
}));  
  
await MikroORM.init({  
  extensions: [Migrator],  
  migrations: {  
    migrationsList,  
  },  
});  
```
## Using custom migration names[​](https://mikro-orm.io/docs/migrations#using-custom-migration-names "Direct link to Using custom migration names")
You can specify a custom migration name via `--name` CLI option. It will be appended to the generated prefix:
```
# generates file Migration20230421212713_add_email_property_to_user_table.ts  
npx mikro-orm migration:create --name=add_email_property_to_user_table  
```
You can customize the naming convention for your migration file by utilizing the `fileName` callback, or even use it to enforce migrations with names:
```
migrations: {  
  fileName: (timestamp: string, name?: string) => {  
    // force user to provide the name, otherwise you would end up with `Migration20230421212713_undefined`  
    if (!name) {  
      throw new Error('Specify migration name via `mikro-orm migration:create --name=...`');  
    }  
  
    return `Migration${timestamp}_${name}`;  
  },  
},  
```
When overriding the `migrations.fileName` strategy, keep in mind that your migration files need to be sortable, you should never start the filename with the custom `name` option as it could result in wrong order of execution.
## MongoDB support[​](https://mikro-orm.io/docs/migrations#mongodb-support "Direct link to MongoDB support")
Migrations for MongoDB use a separate package: `@mikro-orm/migrations-mongodb`, and should be otherwise compatible with the current CLI commands. Use `this.getCollection()` or `this.getDb()` to manipulate the database.
Avoid using entity class references in migrations. Entity definitions change over time, which can break older migrations. Use collection string names with `this.getCollection()` or the raw `Db` instance via `this.getDb()` instead.
### Available methods[​](https://mikro-orm.io/docs/migrations#available-methods "Direct link to Available methods")
The MongoDB `Migration` class provides the following helpers:
  * `this.getCollection(name)` — returns a typed MongoDB `Collection` instance by collection name
  * `this.getDb()` — returns the raw MongoDB `Db` instance for full access to the database
### Transactions[​](https://mikro-orm.io/docs/migrations#transactions "Direct link to Transactions")
The default options for `Migrator` will use transactions, and those impose some additional requirements in mongo, namely the collections need to exist upfront, and you need to run a replicaset. You might want to disable transactions for `migrations: { transactional: false }`.
You need to provide the transaction context manually to your queries via the MongoDB `session` option:
```
await this.getCollection('book').updateMany({}, { $set: { updatedAt: new Date() } }, { session: this.ctx });  
```
### Migration class[​](https://mikro-orm.io/docs/migrations#migration-class-1 "Direct link to Migration class")
Example migration in mongo:
```
import { Migration } from '@mikro-orm/migrations-mongodb';  
  
export class MigrationTest1 extends Migration {  
  
  async up(): Promise<void> {  
    // use `this.getCollection()` to work with a mongodb collection directly  
    await this.getCollection('book').updateMany({}, { $set: { updatedAt: new Date() } }, { session: this.ctx });  
  
    // or use `this.getDb()` for full access to the database  
    await this.getDb().collection('book').deleteMany({ foo: true }, { session: this.ctx });  
  }  
  
}  
```
## Limitations[​](https://mikro-orm.io/docs/migrations#limitations "Direct link to Limitations")
### MySQL[​](https://mikro-orm.io/docs/migrations#mysql "Direct link to MySQL")
There is no way to rollback DDL changes in MySQL. An implicit commit is forced for those queries automatically, so transactions are not working as expected.
  * <https://github.com/mikro-orm/mikro-orm/issues/217>
  * <https://dev.mysql.com/doc/refman/5.7/en/implicit-commit.html>
### MongoDB[​](https://mikro-orm.io/docs/migrations#mongodb "Direct link to MongoDB")
  * no nested transaction support
  * no schema diffing
  * only blank migrations are generated
## Debugging[​](https://mikro-orm.io/docs/migrations#debugging "Direct link to Debugging")
Sometimes the schema diffing might not work as expected and will produce unwanted queries. Often this is a problem with how you set up the `columnType` or `default/defaultRaw` options of your properties. You can use the `MIKRO_ORM_CLI_VERBOSE` environment variable to enable verbose logging of the CLI. This, in turn, enables logging of both the underlying queries used to extract the current schema and the logs in the `SchemaComparator`, which should help you understand why the ORM sees two columns as different and what particular options are different.
> Debugging issues with migrations is easier when you use `schema:update`, as you skip the Migrator layer on top of it and test the actual layer where those problems occur.
```
$ MIKRO_ORM_CLI_VERBOSE=1 npx mikro-orm schema:update --dump  
```
[](https://github.com/mikro-orm/mikro-orm/edit/master/docs/versioned_docs/version-7.1/migrations.md)
Last updated on **May 20, 2026** by **Martin Adámek**
[Previous Schema Generator](https://mikro-orm.io/docs/schema-generator)[Next Seeding](https://mikro-orm.io/docs/seeding)
  * [Migration class](https://mikro-orm.io/docs/migrations#migration-class)
    * [Working with `EntityManager`](https://mikro-orm.io/docs/migrations#working-with-entitymanager)
  * [Initial migration](https://mikro-orm.io/docs/migrations#initial-migration)
  * [Snapshots](https://mikro-orm.io/docs/migrations#snapshots)
  * [Configuration](https://mikro-orm.io/docs/migrations#configuration)
    * [Available options](https://mikro-orm.io/docs/migrations#available-options)
    * [Example configuration](https://mikro-orm.io/docs/migrations#example-configuration)
  * [Running migrations in production](https://mikro-orm.io/docs/migrations#running-migrations-in-production)
  * [Using custom `MigrationGenerator`](https://mikro-orm.io/docs/migrations#using-custom-migrationgenerator)
  * [Using via CLI](https://mikro-orm.io/docs/migrations#using-via-cli)
  * [Using the Migrator programmatically](https://mikro-orm.io/docs/migrations#using-the-migrator-programmatically)
  * [Providing transaction context](https://mikro-orm.io/docs/migrations#providing-transaction-context)
  * [Runtime schema context](https://mikro-orm.io/docs/migrations#runtime-schema-context)
    * [Per-deployment-one-schema](https://mikro-orm.io/docs/migrations#per-deployment-one-schema)
    * [Multi-schema fan-out](https://mikro-orm.io/docs/migrations#multi-schema-fan-out)
    * [CLI](https://mikro-orm.io/docs/migrations#cli)
    * [Caveats](https://mikro-orm.io/docs/migrations#caveats)
  * [Importing migrations statically](https://mikro-orm.io/docs/migrations#importing-migrations-statically)
  * [Using custom migration names](https://mikro-orm.io/docs/migrations#using-custom-migration-names)
  * [MongoDB support](https://mikro-orm.io/docs/migrations#mongodb-support)
    * [Available methods](https://mikro-orm.io/docs/migrations#available-methods)
    * [Transactions](https://mikro-orm.io/docs/migrations#transactions)
    * [Migration class](https://mikro-orm.io/docs/migrations#migration-class-1)
  * [Limitations](https://mikro-orm.io/docs/migrations#limitations)
    * [MySQL](https://mikro-orm.io/docs/migrations#mysql)
    * [MongoDB](https://mikro-orm.io/docs/migrations#mongodb)
  * [Debugging](https://mikro-orm.io/docs/migrations#debugging)
#### Docs
  * [Quick Start](https://mikro-orm.io/docs/quick-start)
  * [Getting Started](https://mikro-orm.io/docs/guide)
  * [Migration from v6 to v7](https://mikro-orm.io/docs/upgrading-v6-to-v7)
  * [Version 6.6 docs](https://mikro-orm.io/docs/6.6/quick-start)
#### Community
  * [Discord](https://discord.gg/w8bjxFHS7X)
  * [Slack](https://join.slack.com/t/mikroorm/shared_invite/enQtNTM1ODYzMzM4MDk3LWM4ZDExMjU5ZDhmNjA2MmM3MWMwZmExNjhhNDdiYTMwNWM0MGY5ZTE3ZjkyZTMzOWExNDgyYmMzNDE1NDI5NjA)
  * [Stack Overflow](https://stackoverflow.com/questions/ask?tags=mikro-orm)
#### Social
  * [Blog](https://mikro-orm.io/blog)
  * [Twitter](https://twitter.com/MikroORM)
  * [GitHub](https://github.com/mikro-orm/mikro-orm)
  * [GitHub Sponsors](https://github.com/sponsors/mikro-orm)
![MikroORM](https://mikro-orm.io/img/logo-header.svg)
Copyright © 2018-2026 Martin Adámek. Built with Docusaurus.
============================================================
# https://mikro-orm.io/docs/populating-relations
============================================================
[Skip to main content](https://mikro-orm.io/docs/populating-relations#__docusaurus_skipToContent_fallback)
⭐️ If you like MikroORM, give it a star on [GitHub](https://github.com/mikro-orm/mikro-orm) and consider [sponsoring](https://github.com/sponsors/mikro-orm) its development! ⭐️
[ ![MikroORM](https://mikro-orm.io/img/logo.svg)![MikroORM](https://mikro-orm.io/img/logo-dark.svg) ](https://mikro-orm.io/)
[7.1](https://mikro-orm.io/docs/populating-relations)
  * [Next](https://mikro-orm.io/docs/next/populating-relations)
  * [7.1](https://mikro-orm.io/docs/populating-relations)
  * [7.0](https://mikro-orm.io/docs/7.0/populating-relations)
  * [6.6](https://mikro-orm.io/docs/6.6/populating-relations)
  * [5.9](https://mikro-orm.io/docs/5.9/installation)
[Docs](https://mikro-orm.io/docs/quick-start)[API](https://mikro-orm.io/api)[Blog](https://mikro-orm.io/blog)[Changelog](https://mikro-orm.io/changelog)
[latest: v7.1.3](https://mikro-orm.io/versions)[Discord](https://discord.gg/w8bjxFHS7X "Chat on Discord")[GitHub](https://github.com/mikro-orm/mikro-orm "View on GitHub")[Twitter](https://twitter.com/MikroORM "Twitter")
Search
  * [Quick Start](https://mikro-orm.io/docs/quick-start)
  * [Getting Started](https://mikro-orm.io/docs/guide)
    * [Chapter 1: First Entity](https://mikro-orm.io/docs/guide/first-entity)
    * [Chapter 2: Relationships](https://mikro-orm.io/docs/guide/relationships)
    * [Chapter 3: Project Setup](https://mikro-orm.io/docs/guide/project-setup)
    * [Chapter 4: Advanced](https://mikro-orm.io/docs/guide/advanced)
    * [Chapter 5: Type-safety](https://mikro-orm.io/docs/guide/type-safety)
  * [Core Concepts](https://mikro-orm.io/docs/core-concepts)
  * [Modeling](https://mikro-orm.io/docs/modeling)
  * [Querying](https://mikro-orm.io/docs/querying)
    * [Query Conditions](https://mikro-orm.io/docs/query-conditions)
    * [Populating relations](https://mikro-orm.io/docs/populating-relations)
    * [Loading Strategies](https://mikro-orm.io/docs/loading-strategies)
    * [Filters](https://mikro-orm.io/docs/filters)
    * [Query Builder](https://mikro-orm.io/docs/query-builder)
    * [Using raw SQL query fragments](https://mikro-orm.io/docs/raw-queries)
    * [Kysely](https://mikro-orm.io/docs/kysely)
  * [Schema & Database](https://mikro-orm.io/docs/schema-database)
  * [Advanced](https://mikro-orm.io/docs/advanced)
  * [Configuration](https://mikro-orm.io/docs/configuration)
  * [Integrations](https://mikro-orm.io/docs/integrations)
  * [Recipes](https://mikro-orm.io/docs/recipes)
  * [Reference](https://mikro-orm.io/docs/reference)
  * [Example Integrations](https://mikro-orm.io/docs/examples)
  * [Upgrading](https://mikro-orm.io/docs/upgrading)
  * [](https://mikro-orm.io/)
  * [Querying](https://mikro-orm.io/docs/querying)
Version: 7.1
On this page
# Populating relations
`MikroORM` is capable of loading large nested structures while maintaining good performance, querying each database table only once. Imagine you have this nested structure:
  * `Book` has one `Publisher` (M:1), one `Author` (M:1) and many `BookTag`s (M:N)
  * `Publisher` has many `Test`s (M:N)
When you use nested populate while querying all `BookTag`s, this is what happens in the background:
```
const tags = await em.find(BookTag, {}, {  
  populate: ['books.publisher.tests', 'books.author'],  
});  
console.log(tags[0].books[0].publisher.tests[0].name); // prints name of nested test  
console.log(tags[0].books[0].author.name); // prints name of nested author  
```
  1. Load all `BookTag`s
  2. Load all `Book`s associated with previously loaded `BookTag`s
  3. Load all `Publisher`s associated with previously loaded `Book`s
  4. Load all `Test`s associated with previously loaded `Publisher`s
  5. Load all `Author`s associated with previously loaded `Book`s
For SQL drivers with pivot tables this means:
```
SELECT `e0`.* FROM `book_tag` AS `e0`;  
  
SELECT `e0`.*, `e1`.`book_id`, `e1`.`book_tag_id`  
  FROM `book` AS `e0` LEFT JOIN `book_to_book_tag` AS `e1` ON `e0`.`id` = `e1`.`book_id`  
  WHERE `e1`.`book_tag_id` IN (?, ?, ?, ?, ?)  
  ORDER BY `e1`.`id` ASC;  
  
SELECT `e0`.* FROM `publisher` AS `e0` WHERE `e0`.`id` IN (?, ?, ?);  
  
SELECT `e0`.*, `e1`.`test_id`, `e1`.`publisher_id`  
  FROM `test` AS `e0` LEFT JOIN `publisher_to_test` AS `e1` ON `e0`.`id` = `e1`.`test_id`  
  WHERE `e1`.`publisher_id` IN (?, ?, ?)  
  ORDER BY `e1`.`id` ASC;  
  
SELECT `e0`.* FROM `author` AS `e0` WHERE `e0`.`id` IN (?);  
```
For mongo driver it's even simpler as no pivot tables are involved:
```
db.getCollection("book-tag").find({}).toArray();  
db.getCollection("book").find({"tags":{"$in":[...]}}).toArray();  
db.getCollection("publisher").find({"_id":{"$in":[...]}}).toArray();  
db.getCollection("test").find({"_id":{"$in":[...]}}).toArray();  
db.getCollection("author").find({"_id":{"$in":[...]}}).toArray();  
```
## Populating all relations[​](https://mikro-orm.io/docs/populating-relations#populating-all-relations "Direct link to Populating all relations")
You can also populate all relationships by passing `populate: ['*']`. The result will be also strictly typed (the `Loaded` type respects the star hint).
```
const tags = await em.find(BookTag, {}, {  
  populate: ['*'],  
});  
```
> This will always use select-in strategy to deal with possible cycles.
> The `Loaded` type also narrows [`Ref<T>`](https://mikro-orm.io/docs/type-safe-relations#reference-wrapper) and [`LazyRef<T>`](https://mikro-orm.io/docs/type-safe-relations#lazyreft--type-only-reference) relations correctly — after `populate: ['*']` a `Ref<T>` becomes a `LoadedReference<T>` and a `LazyRef<T>` becomes the full `T`.
## Inferring populate hint from filter[​](https://mikro-orm.io/docs/populating-relations#inferring-populate-hint-from-filter "Direct link to Inferring populate hint from filter")
If you want to automatically select all the relations that are part of your filter query, use `populate: ['$infer']`:
```
// this will populate all the books and their authors, all via a single query  
const tags = await em.find(BookTag, {  
  books: { author: { name: '...' } },  
}, {  
  populate: ['$infer'],  
});  
```
> This will always use joined strategy as we already have the relations joined because they are in the filter. This feature is not available in MongoDB driver as there is no join support.
## Filter on populated entities[​](https://mikro-orm.io/docs/populating-relations#filter-on-populated-entities "Direct link to Filter on populated entities")
The request to populate can be ambiguous. For example, let's say as a hypothetical that there's a `Book` called `'One'` with tags `'Fiction'` and `'Hard Cover'`.
Then you run the following:
```
const books = await em.find(Book, { tags: { name: 'Fiction' } }, {  
  populate: ['tags'],  
});  
```
You're requesting books that have the tag of `'Fiction'` then asking to populate the tags on each book. Did you mean that you want to populate **all** tags on each book that matches the filter? If so, you'd expect that book `'One'` would have both `'Fiction'` and `'Hard Cover'` populated. Or did you mean that only the tags that match the outer filter should be populated? If so you'd expect that book `'One'` would only have `'Fiction'` in the populated collection because the outer filter specified that.
Both behaviors are useful in different cases, so MikroORM provides an option that allows you to control this called `populateWhere`. There are two options, `INFER` and `ALL`. The default is `ALL` which will ensure that all possible members of the collection are fetched in the populate (e.g. the first interpretation above).
You can specify this globally:
```
const orm = await MikroORM.init({  
    // We want our populate fetches to respect the outer filter passed in a where condition.  
    populateWhere: PopulateHint.INFER,  
});  
```
Or you can override this on a query by query basis:
```
const books = await em.find(Book, { tags: { name: 'Fiction' } }, {  
  populate: ['tags'],  
  populateWhere: PopulateHint.INFER,  
});  
```
Using `PopulateHint.INFER` in this case instructs MikroORM to interpret the find as per the second interpretation above.
A value provided on a specific query overrides whatever default is specified globally.
## Loading strategies[​](https://mikro-orm.io/docs/populating-relations#loading-strategies "Direct link to Loading strategies")
The way that MikroORM fetches the data based on populate hint is also configurable. By default, MikroORM uses a "select in" strategy which runs one separate query for each level of a populate. If you're using an SQL database you can also ask MikroORM to use a join for all tables involved in the populate and run it as a single query. This is again configurable globally or per query.
You can also use `populateHints` to override the strategy or join type for individual relations:
```
const tags = await em.find(BookTag, {}, {  
  populate: ['books.author'],  
  strategy: 'joined',  
  populateHints: {  
    'books.author': { strategy: 'select-in' },  
  },  
});  
```
You can also use `populateHints` to limit the number of items loaded per parent:
```
const users = await em.find(User, {}, {  
  populate: ['posts'],  
  populateHints: {  
    posts: { limit: 5, orderBy: { createdAt: 'desc' } },  
  },  
});  
```
For more information see the [Loading Strategies section](https://mikro-orm.io/docs/loading-strategies#per-parent-limiting).
## Populating already loaded entities[​](https://mikro-orm.io/docs/populating-relations#populating-already-loaded-entities "Direct link to Populating already loaded entities")
To populate existing entities, you can use `em.populate()`.
```
const authors = await em.createQueryBuilder(Author).select('*').getResult();  
await em.populate(authors, ['books.tags']);  
  
// now your Author entities will have `books` collections populated,  
// as well as they will have their `tags` collections populated.  
console.log(authors[0].books[0].tags[0]); // initialized BookTag  
```
[](https://github.com/mikro-orm/mikro-orm/edit/master/docs/versioned_docs/version-7.1/populating-relations.md)
Last updated on **May 20, 2026** by **Martin Adámek**
[Previous Query Conditions](https://mikro-orm.io/docs/query-conditions)[Next Loading Strategies](https://mikro-orm.io/docs/loading-strategies)
  * [Populating all relations](https://mikro-orm.io/docs/populating-relations#populating-all-relations)
  * [Inferring populate hint from filter](https://mikro-orm.io/docs/populating-relations#inferring-populate-hint-from-filter)
  * [Filter on populated entities](https://mikro-orm.io/docs/populating-relations#filter-on-populated-entities)
  * [Loading strategies](https://mikro-orm.io/docs/populating-relations#loading-strategies)
  * [Populating already loaded entities](https://mikro-orm.io/docs/populating-relations#populating-already-loaded-entities)
#### Docs
  * [Quick Start](https://mikro-orm.io/docs/quick-start)
  * [Getting Started](https://mikro-orm.io/docs/guide)
  * [Migration from v6 to v7](https://mikro-orm.io/docs/upgrading-v6-to-v7)
  * [Version 6.6 docs](https://mikro-orm.io/docs/6.6/quick-start)
#### Community
  * [Discord](https://discord.gg/w8bjxFHS7X)
  * [Slack](https://join.slack.com/t/mikroorm/shared_invite/enQtNTM1ODYzMzM4MDk3LWM4ZDExMjU5ZDhmNjA2MmM3MWMwZmExNjhhNDdiYTMwNWM0MGY5ZTE3ZjkyZTMzOWExNDgyYmMzNDE1NDI5NjA)
  * [Stack Overflow](https://stackoverflow.com/questions/ask?tags=mikro-orm)
#### Social
  * [Blog](https://mikro-orm.io/blog)
  * [Twitter](https://twitter.com/MikroORM)
  * [GitHub](https://github.com/mikro-orm/mikro-orm)
  * [GitHub Sponsors](https://github.com/sponsors/mikro-orm)
![MikroORM](https://mikro-orm.io/img/logo-header.svg)
Copyright © 2018-2026 Martin Adámek. Built with Docusaurus.
============================================================
# https://mikro-orm.io/docs/next/quick-start
============================================================
[Skip to main content](https://mikro-orm.io/docs/next/quick-start#__docusaurus_skipToContent_fallback)
⭐️ If you like MikroORM, give it a star on [GitHub](https://github.com/mikro-orm/mikro-orm) and consider [sponsoring](https://github.com/sponsors/mikro-orm) its development! ⭐️
[![MikroORM](https://mikro-orm.io/img/logo.svg)](https://mikro-orm.io/)
[Next](https://mikro-orm.io/docs/next/quick-start)
  * [Next](https://mikro-orm.io/docs/next/quick-start)
  * [7.1](https://mikro-orm.io/docs/quick-start)
  * [7.0](https://mikro-orm.io/docs/7.0/quick-start)
  * [6.6](https://mikro-orm.io/docs/6.6/quick-start)
  * [5.9](https://mikro-orm.io/docs/5.9/quick-start)
[Docs](https://mikro-orm.io/docs/quick-start)[API](https://mikro-orm.io/api)[Blog](https://mikro-orm.io/blog)[Changelog](https://mikro-orm.io/changelog)
[latest: v7.1.3](https://mikro-orm.io/versions)[Discord](https://discord.gg/w8bjxFHS7X "Chat on Discord")[GitHub](https://github.com/mikro-orm/mikro-orm "View on GitHub")[Twitter](https://twitter.com/MikroORM "Twitter")
Search`Ctrl``K`
  * [Quick Start](https://mikro-orm.io/docs/next/quick-start)
  * [Getting Started](https://mikro-orm.io/docs/next/guide)
    * [Chapter 1: First Entity](https://mikro-orm.io/docs/next/guide/first-entity)
    * [Chapter 2: Relationships](https://mikro-orm.io/docs/next/guide/relationships)
    * [Chapter 3: Project Setup](https://mikro-orm.io/docs/next/guide/project-setup)
    * [Chapter 4: Advanced](https://mikro-orm.io/docs/next/guide/advanced)
    * [Chapter 5: Type-safety](https://mikro-orm.io/docs/next/guide/type-safety)
  * [Core Concepts](https://mikro-orm.io/docs/next/core-concepts)
  * [Modeling](https://mikro-orm.io/docs/next/modeling)
  * [Querying](https://mikro-orm.io/docs/next/querying)
  * [Schema & Database](https://mikro-orm.io/docs/next/schema-database)
  * [Advanced](https://mikro-orm.io/docs/next/advanced)
  * [Configuration](https://mikro-orm.io/docs/next/configuration)
  * [Integrations](https://mikro-orm.io/docs/next/integrations)
  * [Recipes](https://mikro-orm.io/docs/next/recipes)
  * [Reference](https://mikro-orm.io/docs/next/reference)
  * [Example Integrations](https://mikro-orm.io/docs/next/examples)
  * [Upgrading](https://mikro-orm.io/docs/next/upgrading)
This is unreleased documentation for MikroORM **Next** version.
For up-to-date documentation, see the **[latest version](https://mikro-orm.io/docs/quick-start)** (7.1).
Version: Next
On this page
# Quick Start
In this guide, you will learn how to quickly bootstrap a simple project using MikroORM. For a deeper dive, check out the [Getting Started guide](https://mikro-orm.io/docs/next/guide) which follows.
> If you prefer to take a peek at an existing project, there are [several example repositories](https://mikro-orm.io/docs/next/examples) available.
## Installation[​](https://mikro-orm.io/docs/next/quick-start#installation "Direct link to Installation")
First install the module via package manager of your choice. Do not forget to install the database driver as well:
  * npm
  * Yarn
  * pnpm
  * Bun
```
# for mongodb  
npm install @mikro-orm/core @mikro-orm/mongodb  
  
# for mysql (works with mariadb too)  
npm install @mikro-orm/core @mikro-orm/mysql  
  
# for mariadb (works with mysql too)  
npm install @mikro-orm/core @mikro-orm/mariadb  
  
# for postgresql (works with cockroachdb too)  
npm install @mikro-orm/core @mikro-orm/postgresql  
  
# for pglite (embedded PostgreSQL in WASM)  
npm install @mikro-orm/core @mikro-orm/pglite  
  
# for sqlite  
npm install @mikro-orm/core @mikro-orm/sqlite  
  
# for libsql/turso  
npm install @mikro-orm/core @mikro-orm/libsql  
  
# for mssql  
npm install @mikro-orm/core @mikro-orm/mssql  
  
# for oracle  
npm install @mikro-orm/core @mikro-orm/oracledb  
```
```
# for mongodb  
yarn add @mikro-orm/core @mikro-orm/mongodb  
  
# for mysql (works with mariadb too)  
yarn add @mikro-orm/core @mikro-orm/mysql  
  
# for mariadb (works with mysql too)  
yarn add @mikro-orm/core @mikro-orm/mariadb  
  
# for postgresql (works with cockroachdb too)  
yarn add @mikro-orm/core @mikro-orm/postgresql  
  
# for pglite (embedded PostgreSQL in WASM)  
yarn add @mikro-orm/core @mikro-orm/pglite  
  
# for sqlite  
yarn add @mikro-orm/core @mikro-orm/sqlite  
  
# for libsql/turso  
yarn add @mikro-orm/core @mikro-orm/libsql  
  
# for mssql  
yarn add @mikro-orm/core @mikro-orm/mssql  
  
# for oracle  
yarn add @mikro-orm/core @mikro-orm/oracledb  
```
```
# for mongodb  
pnpm add @mikro-orm/core @mikro-orm/mongodb  
  
# for mysql (works with mariadb too)  
pnpm add @mikro-orm/core @mikro-orm/mysql  
  
# for mariadb (works with mysql too)  
pnpm add @mikro-orm/core @mikro-orm/mariadb  
  
# for postgresql (works with cockroachdb too)  
pnpm add @mikro-orm/core @mikro-orm/postgresql  
  
# for pglite (embedded PostgreSQL in WASM)  
pnpm add @mikro-orm/core @mikro-orm/pglite  
  
# for sqlite  
pnpm add @mikro-orm/core @mikro-orm/sqlite  
  
# for libsql/turso  
pnpm add @mikro-orm/core @mikro-orm/libsql  
  
# for mssql  
pnpm add @mikro-orm/core @mikro-orm/mssql  
  
# for oracle  
pnpm add @mikro-orm/core @mikro-orm/oracledb  
```
```
# for mongodb  
bun add @mikro-orm/core @mikro-orm/mongodb  
  
# for mysql (works with mariadb too)  
bun add @mikro-orm/core @mikro-orm/mysql  
  
# for mariadb (works with mysql too)  
bun add @mikro-orm/core @mikro-orm/mariadb  
  
# for postgresql (works with cockroachdb too)  
bun add @mikro-orm/core @mikro-orm/postgresql  
  
# for pglite (embedded PostgreSQL in WASM)  
bun add @mikro-orm/core @mikro-orm/pglite  
  
# for sqlite  
bun add @mikro-orm/core @mikro-orm/sqlite  
  
# for libsql/turso  
bun add @mikro-orm/core @mikro-orm/libsql  
  
# for mssql  
bun add @mikro-orm/core @mikro-orm/mssql  
  
# for oracle  
bun add @mikro-orm/core @mikro-orm/oracledb  
```
Then call `MikroORM.init` as part of bootstrapping your app:
```
import { MikroORM } from '@mikro-orm/postgresql'; // or any other driver package  
  
const orm = await MikroORM.init({  
  entities: ['./dist/entities'], // path to your JS entities (dist), relative to `baseDir`  
  dbName: 'my-db-name',  
});  
console.log(orm.em); // access EntityManager via `em` property  
```
> To access driver specific methods like `em.createQueryBuilder()` you need to import the `MikroORM`/`EntityManager`/`EntityRepository` class from the driver package. Alternatively you can cast the `orm.em` to `EntityManager` exported from the driver package:
> 
```
> 
import { EntityManager } from '@mikro-orm/postgresql';  
> 
> 
> 
const em = orm.em as EntityManager;  
> 
> 
> 
const qb = em.createQueryBuilder(...);  
> 
> 
```
You can read more about all the possible configuration options in [Advanced Configuration](https://mikro-orm.io/docs/next/configuration) section.
## Entity Discovery[​](https://mikro-orm.io/docs/next/quick-start#entity-discovery "Direct link to Entity Discovery")
You can provide entities directly or use folder-based discovery with glob patterns:
```
const orm = await MikroORM.init({  
  // explicit entity references (recommended)  
  entities: [User, Article, Tag],  
  // or folder-based discovery  
  entities: ['./dist/app/**/*.entity.js'],  
  entitiesTs: ['./src/app/**/*.entity.ts'],  
  // ...  
});  
```
If you are experiencing problems with folder-based discovery, try using `mikro-orm debug` CLI command to check what paths are actually being used.
For detailed information about using decorators (legacy and ES spec) and metadata providers, see the [Using Decorators guide](https://mikro-orm.io/docs/next/using-decorators). For glob-based entity discovery, see [Folder-based Discovery](https://mikro-orm.io/docs/next/folder-based-discovery).
> For larger projects, you can use `npx mikro-orm discovery:export` to auto-generate a barrel file with all your entity imports. See [Folder-based Discovery](https://mikro-orm.io/docs/next/folder-based-discovery#generating-a-barrel-file-with-discoveryexport) for details.
## Synchronous initialization[​](https://mikro-orm.io/docs/next/quick-start#synchronous-initialization "Direct link to Synchronous initialization")
As opposed to the async [`MikroORM.init`](https://mikro-orm.io/api/core/class/MikroORM#init) method, you can prefer to use synchronous variant with the constructor: [`new MikroORM()`](https://mikro-orm.io/api/core/class/MikroORM#constructor).
```
const orm = new MikroORM({ ... });  
```
This method has some limitations:
  * folder-based discovery not supported
  * ORM extensions are not auto-loaded
  * when metadata cache is enabled, `FileCacheAdapter` needs to be explicitly set in the config
## RequestContext helper[​](https://mikro-orm.io/docs/next/quick-start#requestcontext-helper "Direct link to RequestContext helper")
Now you will need to fork entity manager for each request so their [identity maps](https://mikro-orm.io/identity-map/) will not collide. To do so, use the `RequestContext` helper:
```
const app = express();  
  
app.use((req, res, next) => {  
  RequestContext.create(orm.em, next);  
});  
```
> You should register this middleware as the last one just before request handlers and before any of your custom middleware that is using the ORM. There might be issues when you register it before request processing middleware like `queryParser` or `bodyParser`, so definitely register the context after them.
More info about `RequestContext` is described [here](https://mikro-orm.io/docs/next/identity-map#request-context).
## Entity definition[​](https://mikro-orm.io/docs/next/quick-start#entity-definition "Direct link to Entity definition")
Now you can start defining your entities. MikroORM supports multiple approaches:
  * defineEntity + class
  * defineEntity
  * decorators
The `defineEntity` helper with a class extension gives you clean named types and a natural place for custom methods:
./entities/Book.ts
```
import { defineEntity, p } from '@mikro-orm/core';  
  
const BookSchema = defineEntity({  
  name: 'Book',  
  properties: {  
    id: p.bigint().primary(),  
    title: p.string(),  
    author: () => p.manyToOne(Author),  
    tags: () => p.manyToMany(BookTag),  
  },  
});  
  
export class Book extends BookSchema.class {}  
BookSchema.setClass(Book);  
```
The `defineEntity` helper provides full type inference without decorators:
./entities/Book.ts
```
import { defineEntity, InferEntity, p } from '@mikro-orm/core';  
  
export const Book = defineEntity({  
  name: 'Book',  
  properties: {  
    id: p.bigint().primary(),  
    title: p.string(),  
    author: () => p.manyToOne(Author),  
    tags: () => p.manyToMany(BookTag),  
  },  
});  
  
export type IBook = InferEntity<typeof Book>;  
```
Decorators require additional setup - see the [Using Decorators guide](https://mikro-orm.io/docs/next/using-decorators) for configuration details:
./entities/Book.ts
```
import { Collection } from '@mikro-orm/core';  
import { Entity, PrimaryKey, Property, ManyToOne, ManyToMany } from '@mikro-orm/decorators/legacy';  
  
@Entity()  
export class Book {  
  
  @PrimaryKey()  
  id!: bigint;  
  
  @Property()  
  title!: string;  
  
  @ManyToOne(() => Author)  
  author!: Author;  
  
  @ManyToMany(() => BookTag)  
  tags = new Collection<BookTag>(this);  
  
}  
```
For UUID primary keys, use `p.uuid()` with `defineEntity`, `@PrimaryKey({ type: 'uuid' })` with decorators, or `{ type: 'uuid', primary: true }` with `EntitySchema`.
More information can be found in the [Defining Entities section](https://mikro-orm.io/docs/next/defining-entities) in docs.
## EntityManager[​](https://mikro-orm.io/docs/next/quick-start#entitymanager "Direct link to EntityManager")
When you have your entities defined, you can start using ORM via `EntityManager`.
To save entity state to database, you need to persist it. Persist determines whether to use `insert` or `update` and computes appropriate change-set. Entity references that are not persisted yet (does not have identifier) will be cascade persisted automatically.
```
// use em.create() to create entity instances  
const author = em.create(Author, {  
  name: 'Jon Snow',  
  email: 'snow@wall.st',  
  born: new Date(),  
});  
  
const publisher = em.create(Publisher, { name: '7K publisher' });  
  
const book1 = em.create(Book, {  
  title: 'My Life on The Wall, part 1',  
  author,  
  publisher,  
});  
const book2 = em.create(Book, {  
  title: 'My Life on The Wall, part 2',  
  author,  
  publisher,  
});  
const book3 = em.create(Book, {  
  title: 'My Life on The Wall, part 3',  
  author,  
  publisher,  
});  
  
// em.create() auto-persists by default, so just flush  
await em.flush();  
```
To fetch entities from database you can use `find()` and `findOne()` of `EntityManager`:
```
const authors = em.findAll(Author, {  
  populate: ['books'],  
});  
  
for (const author of authors) {  
  console.log(author); // instance of Author entity  
  console.log(author.name); // Jon Snow  
  
  for (const book of author.books) { // iterating books collection  
    console.log(book); // instance of Book entity  
    console.log(book.title); // My Life on The Wall, part 1/2/3  
  }  
}  
```
Take a look at docs about [working with `EntityManager`](https://mikro-orm.io/docs/next/entity-manager).
## Setting up the Commandline Tool[​](https://mikro-orm.io/docs/next/quick-start#setting-up-the-commandline-tool "Direct link to Setting up the Commandline Tool")
MikroORM ships with a number of command line tools that are very helpful during development, like `SchemaGenerator` and `EntityGenerator`. You can call this command from the NPM binary directory or use `npx`:
```
# install the CLI package first!  
$ yarn add --dev @mikro-orm/cli  
  
# manually  
$ node node_modules/.bin/mikro-orm  
  
# via npx  
$ npx mikro-orm  
  
# or via yarn  
$ yarn mikro-orm  
```
> To work with the CLI, first install `@mikro-orm/cli` package locally. The version needs to be aligned with the `@mikro-orm/core` package.
For CLI to be able to access your database, you will need to create a configuration file that exports your ORM configuration(s).
By default, the following paths, relative to the current working directory, are searched in this order:
  1. `./src/mikro-orm.config.ts`
  2. `./mikro-orm.config.ts`
  3. `./dist/mikro-orm.config.js`
  4. `./build/mikro-orm.config.js`
  5. `./src/mikro-orm.config.js`
  6. `./mikro-orm.config.js`
You can set up array of possible paths to ORM config files in `package.json`. The `package.json` file can be located in the current working directory, or in one of its parent folders.
./package.json
```
{  
  "name": "your-app",  
  "dependencies": { ... },  
  "mikro-orm": {  
    "configPaths": [  
      "./src/mikro-orm.config.ts",  
      "./dist/mikro-orm.config.js"  
    ]  
  }  
}  
```
Another way to control these CLI-related settings is with the environment variables:
  * `MIKRO_ORM_CLI_CONFIG`: the path to ORM config file
  * `MIKRO_ORM_CLI_PREFER_TS`: enforce use of the TS paths (e.g. `entitiesTs` or `pathTs`)
  * `MIKRO_ORM_CLI_TS_LOADER`: set preferred TS loader (one of `oxc`, `swc`, `tsx`, `jiti`, `tsimp`)
  * `MIKRO_ORM_CLI_TS_CONFIG_PATH`: path to the tsconfig.json (for TS support)
  * `MIKRO_ORM_CLI_ALWAYS_ALLOW_TS`: enable `.ts` files to use without detected TS support
  * `MIKRO_ORM_CLI_VERBOSE`: enable verbose logging (e.g. print queries used in seeder or schema diffing)
MikroORM will always try to load the first available config file, based on the order in `configPaths`. When the TypeScript support is not detected, TS config files will be ignored. You can enforce using TS config files via `MIKRO_ORM_CLI_PREFER_TS` environment variable or `preferTs` flag in your `package.json`:
./package.json
```
"mikro-orm": {  
  "preferTs": true  
}  
```
You can also specify the config path via `--config` option, when it points to a TS file, the `preferTs` flag will be enabled implicitly:
```
$ npx mikro-orm debug --config ./my-config.ts  
```
Your configuration file may export multiple configuration objects in an array. The different configurations must have a `contextName` in them. If no `contextName` is specified, it is treated as the name "default". You can use the `MIKRO_ORM_CONTEXT_NAME` environment variable or the `--contextName` command line option to pick a configuration with a particular `contextName` to use for the CLI. See [below](https://mikro-orm.io/docs/next/quick-start#configuration-file-structure) for details on the config object.
All available commands are listed in the CLI help:
```
$ npx mikro-orm  
  
Usage: mikro-orm <command> [options]  
  
Commands:  
  mikro-orm cache:clear             Clear metadata cache  
  mikro-orm cache:generate          Generate metadata cache  
  mikro-orm generate-entities       Generate entities based on current database  
                                    schema  
  mikro-orm database:create         Create your database if it does not exist  
  mikro-orm database:import <file>  Imports the SQL file to the database  
  mikro-orm seeder:run              Seed the database using the seeder class  
  mikro-orm seeder:create <seeder>  Create a new seeder class  
  mikro-orm schema:create           Create database schema based on current  
                                    metadata  
  mikro-orm schema:drop             Drop database schema based on current  
                                    metadata  
  mikro-orm schema:update           Update database schema based on current  
                                    metadata  
  mikro-orm schema:fresh            Drop and recreate database schema based on  
                                    current metadata  
  mikro-orm migration:create        Create new migration with current schema  
                                    diff  
  mikro-orm migration:up            Migrate up to the latest version  
  mikro-orm migration:down          Migrate one step down  
  mikro-orm migration:list          List all executed migrations  
  mikro-orm migration:check         Check if migrations are needed. Useful for  
                                    bash scripts.  
  mikro-orm migration:pending       List all pending migrations  
  mikro-orm migration:fresh         Clear the database and rerun all migrations  
  mikro-orm debug                   Debug CLI configuration  
  
Options:  
      --config       Set path to the ORM configuration file              [array]  
      --contextName  Set name of config to load out of the ORM configuration  
                     file. Used when config file exports an array or a function  
                                                   [string] [default: "default"]  
  -v, --version      Show version number                               [boolean]  
  -h, --help         Show help                                         [boolean]  
  
Examples:  
  mikro-orm schema:update --run  Runs schema synchronization  
```
To verify your setup, you can use `mikro-orm debug` command.
## Configuration file structure[​](https://mikro-orm.io/docs/next/quick-start#configuration-file-structure "Direct link to Configuration file structure")
Preferred way of creating to the configuration object is with the `defineConfig` helper. It will provide intellisense even in JavaScript files, without the need for type hints via jsdoc:
```
import { defineConfig } from '@mikro-orm/sqlite';  
  
export default defineConfig({  
  entities: [Author, Book, BookTag],  
  dbName: 'my-db-name',  
  // this is inferred as you import `defineConfig` from sqlite package  
  // driver: SqliteDriver,  
});  
```
Using `defineConfig` also automatically infers the driver option for you if you import the helper from the driver package. This means you don't have to provide the `driver` option explicitly.
Alternatively, you can use the `Partial<Options>` type:
./src/mikro-orm.config.ts
```
import { Options } from '@mikro-orm/sqlite';  
  
const config: Partial<Options> = {  
  entities: [Author, Book, BookTag],  
  dbName: 'my-db-name',  
  driver: SqliteDriver,  
};  
  
export default config;  
```
You can also export array of different configs for different purposes. For example, you may export one config object for CLI, and another for your app. Each config in the array needs to have a distinct `contextName` value (omitting it is same as setting it to "default"), like so:
```
import { defineConfig } from '@mikro-orm/postgresql';  
  
export default [  
  defineConfig({  
    contextName: 'default',  
    entities: [Author, Book, BookTag],  
    dbName: 'my-db-name',  
    user: 'app',  
    // other credentials and settings  
  }),  
  defineConfig({  
    contextName: 'super',  
    entities: [Author, Book, BookTag],  
    dbName: 'my-db-name',  
    user: 'admin',  
    // other credentials and settings  
  }),  
];  
```
Which in turn enables you to run `MikroORM.init()` in your app without arguments (and connect with the user "app"), while in CLI (where you may need higher privileges), you can use
```
$ npx mikro-orm --contextName=super  
```
You can also export a function, which will be called with a `contextName` parameter. That function should return a configuration object for the provided `contextName`, a promise resolving to a configuration object for that `contextName`, or nothing if you wish to error on that name instead. This can be particularly useful in multi-tenant setups.
For example, if you have
```
import { defineConfig } from '@mikro-orm/postgresql';  
  
export default (contextName: string) => defineConfig({  
  entities: [Author, Book, BookTag],  
  dbName: `tenant_${contextName}`,  
  user: 'app',  
  // other credentials and settings  
});  
```
then you will need to start your app with the `MIKRO_ORM_CONTEXT_NAME` environment variable set to `example1` to load the database `tenant_example1`, and similarly, when running CLI, you can use
```
$ npx mikro-orm --contextName=example1  
```
to operate on that particular tenant's database instance. Not specifying either option will point you to the "tenant_default" database.
You can also combine arrays and factory functions. Array members will be preferred, and any functions in the array will be executed from top to bottom. The first function to return an object will be what ends up being used.
For example, you can have in your config file
```
import { defineConfig } from '@mikro-orm/postgresql';  
  
export default [  
  defineConfig({  
    contextName: 'default',  
    entities: [Author, Book, BookTag],  
    dbName: 'demo',  
    user: 'app',  
    // other credentials and settings  
  }),  
  defineConfig({  
    contextName: 'super',  
    entities: [Author, Book, BookTag],  
    dbName: 'demo',  
    user: 'admin',  
    // other credentials and settings  
  }),  
  (contextName: string) => {  
    if (!contextName.startsWith('use:')) {  
        return;  
    }  
    return defineConfig({  
      contextName,  
      entities: [Author, Book, BookTag],  
      dbName: `tenant_${contextName.split(':', 2)[1]}`,  
      user: 'app',  
      // other credentials and settings  
    });  
  },  
  (contextName: string) => {  
    if (!contextName.startsWith('edit:')) {  
      return;  
    }  
    return defineConfig({  
      contextName,  
      entities: [Author, Book, BookTag],  
      dbName: `tenant_${contextName.split(':', 2)[1]}`,  
      user: 'admin',  
      // other credentials and settings  
    });  
  }  
];  
```
which will let you run the "demo" database with "app" user whenever you do not specify `MIKRO_ORM_CONTEXT_NAME` or the `--contextName` option in CLI. Specifying "super" for the name will run the "demo" database with the "admin" user, specifying "use:example1" will load the "tenant_example1" database with the "app" user, and specifying "edit:example1" will load the "tenant_example1" database with the "admin" user.
[](https://github.com/mikro-orm/mikro-orm/edit/master/docs/docs/quick-start.md)
Last updated on **May 17, 2026** by **Martin Adámek**
[Next Getting Started Guide](https://mikro-orm.io/docs/next/guide)
  * [Installation](https://mikro-orm.io/docs/next/quick-start#installation)
  * [Entity Discovery](https://mikro-orm.io/docs/next/quick-start#entity-discovery)
  * [Synchronous initialization](https://mikro-orm.io/docs/next/quick-start#synchronous-initialization)
  * [RequestContext helper](https://mikro-orm.io/docs/next/quick-start#requestcontext-helper)
  * [Entity definition](https://mikro-orm.io/docs/next/quick-start#entity-definition)
  * [EntityManager](https://mikro-orm.io/docs/next/quick-start#entitymanager)
  * [Setting up the Commandline Tool](https://mikro-orm.io/docs/next/quick-start#setting-up-the-commandline-tool)
  * [Configuration file structure](https://mikro-orm.io/docs/next/quick-start#configuration-file-structure)
#### Docs
  * [Quick Start](https://mikro-orm.io/docs/quick-start)
  * [Getting Started](https://mikro-orm.io/docs/guide)
  * [Migration from v6 to v7](https://mikro-orm.io/docs/upgrading-v6-to-v7)
  * [Version 6.6 docs](https://mikro-orm.io/docs/6.6/quick-start)
#### Community
  * [Discord](https://discord.gg/w8bjxFHS7X)
  * [Slack](https://join.slack.com/t/mikroorm/shared_invite/enQtNTM1ODYzMzM4MDk3LWM4ZDExMjU5ZDhmNjA2MmM3MWMwZmExNjhhNDdiYTMwNWM0MGY5ZTE3ZjkyZTMzOWExNDgyYmMzNDE1NDI5NjA)
  * [Stack Overflow](https://stackoverflow.com/questions/ask?tags=mikro-orm)
#### Social
  * [Blog](https://mikro-orm.io/blog)
  * [Twitter](https://twitter.com/MikroORM)
  * [GitHub](https://github.com/mikro-orm/mikro-orm)
  * [GitHub Sponsors](https://github.com/sponsors/mikro-orm)
![MikroORM](https://mikro-orm.io/img/logo-header.svg)
Copyright © 2018-2026 Martin Adámek. Built with Docusaurus.
============================================================
# https://mikro-orm.io/api
============================================================
[Skip to main content](https://mikro-orm.io/api#__docusaurus_skipToContent_fallback)
⭐️ If you like MikroORM, give it a star on [GitHub](https://github.com/mikro-orm/mikro-orm) and consider [sponsoring](https://github.com/sponsors/mikro-orm) its development! ⭐️
[ ![MikroORM](https://mikro-orm.io/img/logo.svg)![MikroORM](https://mikro-orm.io/img/logo-dark.svg) ](https://mikro-orm.io/)
[7.1](https://mikro-orm.io/docs/quick-start)
  * [Next](https://mikro-orm.io/docs/next/quick-start)
  * [7.1](https://mikro-orm.io/docs/quick-start)
  * [7.0](https://mikro-orm.io/docs/7.0/quick-start)
  * [6.6](https://mikro-orm.io/docs/6.6/quick-start)
  * [5.9](https://mikro-orm.io/docs/5.9/installation)
[Docs](https://mikro-orm.io/docs/quick-start)[API](https://mikro-orm.io/api)[Blog](https://mikro-orm.io/blog)[Changelog](https://mikro-orm.io/changelog)
[latest: v7.1.3](https://mikro-orm.io/versions)[Discord](https://discord.gg/w8bjxFHS7X "Chat on Discord")[GitHub](https://github.com/mikro-orm/mikro-orm "View on GitHub")[Twitter](https://twitter.com/MikroORM "Twitter")
Search
  * [@mikro-orm/cli](https://mikro-orm.io/api/cli)
  * [@mikro-orm/core](https://mikro-orm.io/api/core)
  * [@mikro-orm/entity-generator](https://mikro-orm.io/api/entity-generator)
  * [@mikro-orm/libsql](https://mikro-orm.io/api/libsql)
  * [@mikro-orm/mariadb](https://mikro-orm.io/api/mariadb)
  * [@mikro-orm/migrations](https://mikro-orm.io/api/migrations)
  * [@mikro-orm/mongodb](https://mikro-orm.io/api/mongodb)
  * [@mikro-orm/mssql](https://mikro-orm.io/api/mssql)
  * [@mikro-orm/mysql](https://mikro-orm.io/api/mysql)
  * [@mikro-orm/oracledb](https://mikro-orm.io/api/oracledb)
  * [@mikro-orm/pglite](https://mikro-orm.io/api/pglite)
  * [@mikro-orm/postgresql](https://mikro-orm.io/api/postgresql)
  * [@mikro-orm/reflection](https://mikro-orm.io/api/reflection)
  * [@mikro-orm/seeder](https://mikro-orm.io/api/seeder)
  * [@mikro-orm/sql](https://mikro-orm.io/api/sql)
  * [@mikro-orm/sqlite](https://mikro-orm.io/api/sqlite)
# API
### Packages
  * [v7.1.2 @mikro-orm/cli](https://mikro-orm.io/api/cli)
  * [v7.1.2 @mikro-orm/core](https://mikro-orm.io/api/core)
  * [v7.1.2 @mikro-orm/entity-generator](https://mikro-orm.io/api/entity-generator)
  * [v7.1.2 @mikro-orm/libsql](https://mikro-orm.io/api/libsql)
  * [v7.1.2 @mikro-orm/mariadb](https://mikro-orm.io/api/mariadb)
  * [v7.1.2 @mikro-orm/migrations](https://mikro-orm.io/api/migrations)
  * [v7.1.2 @mikro-orm/mongodb](https://mikro-orm.io/api/mongodb)
  * [v7.1.2 @mikro-orm/mssql](https://mikro-orm.io/api/mssql)
  * [v7.1.2 @mikro-orm/mysql](https://mikro-orm.io/api/mysql)
  * [v7.1.2 @mikro-orm/oracledb](https://mikro-orm.io/api/oracledb)
  * [v7.1.2 @mikro-orm/pglite](https://mikro-orm.io/api/pglite)
  * [v7.1.2 @mikro-orm/postgresql](https://mikro-orm.io/api/postgresql)
  * [v7.1.2 @mikro-orm/reflection](https://mikro-orm.io/api/reflection)
  * [v7.1.2 @mikro-orm/seeder](https://mikro-orm.io/api/seeder)
  * [v7.1.2 @mikro-orm/sql](https://mikro-orm.io/api/sql)
  * [v7.1.2 @mikro-orm/sqlite](https://mikro-orm.io/api/sqlite)
#### Docs
  * [Quick Start](https://mikro-orm.io/docs/quick-start)
  * [Getting Started](https://mikro-orm.io/docs/guide)
  * [Migration from v6 to v7](https://mikro-orm.io/docs/upgrading-v6-to-v7)
  * [Version 6.6 docs](https://mikro-orm.io/docs/6.6/quick-start)
#### Community
  * [Discord](https://discord.gg/w8bjxFHS7X)
  * [Slack](https://join.slack.com/t/mikroorm/shared_invite/enQtNTM1ODYzMzM4MDk3LWM4ZDExMjU5ZDhmNjA2MmM3MWMwZmExNjhhNDdiYTMwNWM0MGY5ZTE3ZjkyZTMzOWExNDgyYmMzNDE1NDI5NjA)
  * [Stack Overflow](https://stackoverflow.com/questions/ask?tags=mikro-orm)
#### Social
  * [Blog](https://mikro-orm.io/blog)
  * [Twitter](https://twitter.com/MikroORM)
  * [GitHub](https://github.com/mikro-orm/mikro-orm)
  * [GitHub Sponsors](https://github.com/sponsors/mikro-orm)
![MikroORM](https://mikro-orm.io/img/logo-header.svg)
Copyright © 2018-2026 Martin Adámek. Built with Docusaurus.
