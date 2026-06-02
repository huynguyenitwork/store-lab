============================================================
# https://mikro-orm.io/docs/
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
  * pnpm
```
# for postgresql (works with cockroachdb too)  
npm install @mikro-orm/core @mikro-orm/postgresql  
```

```
# for postgresql (works with cockroachdb too)  
pnpm add @mikro-orm/core @mikro-orm/postgresql  
  
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
  * ==defineEntity + class==
  * defineEntity
  * ==decorators==
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
# https://mikro-orm.io/blog
============================================================
[Skip to main content](https://mikro-orm.io/blog#__docusaurus_skipToContent_fallback)
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
All posts
### 2026
  * [MikroORM 7.1: Loaded](https://mikro-orm.io/blog/mikro-orm-7-1-released)
  * [MikroORM 7: Unchained](https://mikro-orm.io/blog/mikro-orm-7-released)
### 2025
  * [MikroORM 6.6](https://mikro-orm.io/blog/mikro-orm-6-6-released)
  * [MikroORM 6.5](https://mikro-orm.io/blog/mikro-orm-6-5-released)
### 2024
  * [MikroORM 6.4](https://mikro-orm.io/blog/mikro-orm-6-4-released)
  * [MikroORM 6.3: Schema first?](https://mikro-orm.io/blog/mikro-orm-6-3-released)
  * [MikroORM 6.2: Say hello to SQL Server (and libSQL)](https://mikro-orm.io/blog/mikro-orm-6-2-released)
  * [MikroORM 6: Polished](https://mikro-orm.io/blog/mikro-orm-6-released)
### 2023
  * [MikroORM 5.8 released](https://mikro-orm.io/blog/mikro-orm-5-8-released)
### 2022
  * [MikroORM 5: Stricter, Safer, Smarter](https://mikro-orm.io/blog/mikro-orm-5-released)
### 2020
  * [MikroORM 4.1: Let’s talk about performance](https://mikro-orm.io/blog/mikro-orm-4-1-released)
  * [MikroORM 4: Filling the Gaps](https://mikro-orm.io/blog/mikro-orm-4-released)
  * [MikroORM 3: Knex.js, CLI, Schema Updates, Entity Generator and more…](https://mikro-orm.io/blog/mikro-orm-3-released)
### 2019
  * [Handling Transactions and Concurrency in MikroORM](https://mikro-orm.io/blog/handling-transactions-and-concurrency-in-mikroorm)
  * [Introducing MikroORM, TypeScript data-mapper ORM with Identity Map](https://mikro-orm.io/blog/introducing-mikroorm-typescript-data-mapper-orm-with-identity-map)
## [MikroORM 7.1: Loaded](https://mikro-orm.io/blog/mikro-orm-7-1-released)
22 min read
[![Martin Adámek](https://avatars1.githubusercontent.com/u/615580?s=460&v=4)](https://github.com/B4nan)
[Martin Adámek](https://github.com/B4nan)
Author of MikroORM
[MikroORM v7.1](https://github.com/mikro-orm/mikro-orm/releases/tag/v7.1.0) is out. The first minor on top of [v7](https://mikro-orm.io/blog/mikro-orm-7-released) is a feature-packed one — a new relation flavor, per-parent collection limiting, database triggers, PostgreSQL partitioning, union-target polymorphic M:N, server-side row cloning, query cancellation via `AbortSignal`, stored procedures and functions, a new PGlite driver, typed Kysely across DI-driven projects, and a lot more. Let's go through the highlights.
![](https://mikro-orm.io/assets/images/og-v7-1-b748eba8a28fd6897da9cf286c0204d3.png)
**Tags:**
  * [typescript](https://mikro-orm.io/blog/tags/typescript)
  * [javascript](https://mikro-orm.io/blog/tags/javascript)
  * [node](https://mikro-orm.io/blog/tags/node)
  * [sql](https://mikro-orm.io/blog/tags/sql)
[**Read More**](https://mikro-orm.io/blog/mikro-orm-7-1-released)
## [MikroORM 7: Unchained](https://mikro-orm.io/blog/mikro-orm-7-released)
36 min read
[![Martin Adámek](https://avatars1.githubusercontent.com/u/615580?s=460&v=4)](https://github.com/B4nan)
[Martin Adámek](https://github.com/B4nan)
Author of MikroORM
After a year and a half of active development, I am thrilled to announce that MikroORM v7 is finally stable. This is the biggest release yet, and the subtitle says it all - Unchained. We broke free from knex, dropped all core dependencies to zero, shipped native ESM, removed the hard coupling to Node.js, and added a bunch of new features on top. Let's dive in!
![](https://mikro-orm.io/assets/images/unchained-34f8dd620a9f884d8bf9199d46b3e5a9.jpg)
**Tags:**
  * [typescript](https://mikro-orm.io/blog/tags/typescript)
  * [javascript](https://mikro-orm.io/blog/tags/javascript)
  * [node](https://mikro-orm.io/blog/tags/node)
  * [sql](https://mikro-orm.io/blog/tags/sql)
[**Read More**](https://mikro-orm.io/blog/mikro-orm-7-released)
## [MikroORM 6.6](https://mikro-orm.io/blog/mikro-orm-6-6-released)
6 min read
[![Martin Adámek](https://avatars1.githubusercontent.com/u/615580?s=460&v=4)](https://github.com/B4nan)
[Martin Adámek](https://github.com/B4nan)
Author of MikroORM
[MikroORM v6.6](https://github.com/mikro-orm/mikro-orm/releases/tag/v6.6.0) is out. This release builds on top of the [previous version](https://mikro-orm.io/blog/mikro-orm-6-5-released), improving the configurability of the filters on relations and adding more features to the entity generator.
**Tags:**
  * [typescript](https://mikro-orm.io/blog/tags/typescript)
  * [javascript](https://mikro-orm.io/blog/tags/javascript)
  * [node](https://mikro-orm.io/blog/tags/node)
  * [sql](https://mikro-orm.io/blog/tags/sql)
[**Read More**](https://mikro-orm.io/blog/mikro-orm-6-6-released)
## [MikroORM 6.5](https://mikro-orm.io/blog/mikro-orm-6-5-released)
8 min read
[![Martin Adámek](https://avatars1.githubusercontent.com/u/615580?s=460&v=4)](https://github.com/B4nan)
[Martin Adámek](https://github.com/B4nan)
Author of MikroORM
[MikroORM v6.5](https://github.com/mikro-orm/mikro-orm/releases/tag/v6.5.0) is out. This is quite a big release, adding a new way to define entities, new relation loading strategy, improvements in filters, transaction management, and many more.
**Tags:**
  * [typescript](https://mikro-orm.io/blog/tags/typescript)
  * [javascript](https://mikro-orm.io/blog/tags/javascript)
  * [node](https://mikro-orm.io/blog/tags/node)
  * [sql](https://mikro-orm.io/blog/tags/sql)
[**Read More**](https://mikro-orm.io/blog/mikro-orm-6-5-released)
## [MikroORM 6.4](https://mikro-orm.io/blog/mikro-orm-6-4-released)
11 min read
[![Martin Adámek](https://avatars1.githubusercontent.com/u/615580?s=460&v=4)](https://github.com/B4nan)
[Martin Adámek](https://github.com/B4nan)
Author of MikroORM
[MikroORM v6.4](https://github.com/mikro-orm/mikro-orm/releases/tag/v6.4.0) is out. This release brings lots of smaller improvements all over the board, let's talk about some of them!
**Tags:**
  * [typescript](https://mikro-orm.io/blog/tags/typescript)
  * [javascript](https://mikro-orm.io/blog/tags/javascript)
  * [node](https://mikro-orm.io/blog/tags/node)
  * [sql](https://mikro-orm.io/blog/tags/sql)
[**Read More**](https://mikro-orm.io/blog/mikro-orm-6-4-released)
## [MikroORM 6.3: Schema first?](https://mikro-orm.io/blog/mikro-orm-6-3-released)
5 min read
[![Martin Adámek](https://avatars1.githubusercontent.com/u/615580?s=460&v=4)](https://github.com/B4nan)
[Martin Adámek](https://github.com/B4nan)
Author of MikroORM
[MikroORM v6.3](https://github.com/mikro-orm/mikro-orm/releases/tag/v6.3.0) is out, and this is yet another packed release. It simplifies project setup, greatly improves the Entity Generator and brings the `Loaded` type support to `QueryBuilder`.
**Tags:**
  * [typescript](https://mikro-orm.io/blog/tags/typescript)
  * [javascript](https://mikro-orm.io/blog/tags/javascript)
  * [node](https://mikro-orm.io/blog/tags/node)
  * [sql](https://mikro-orm.io/blog/tags/sql)
[**Read More**](https://mikro-orm.io/blog/mikro-orm-6-3-released)
## [MikroORM 6.2: Say hello to SQL Server (and libSQL)](https://mikro-orm.io/blog/mikro-orm-6-2-released)
5 min read
[![Martin Adámek](https://avatars1.githubusercontent.com/u/615580?s=460&v=4)](https://github.com/B4nan)
[Martin Adámek](https://github.com/B4nan)
Author of MikroORM
I am pleased to announce [MikroORM v6.2](https://github.com/mikro-orm/mikro-orm/releases/tag/v6.2.0). This release is special, after a very long time, two new SQL drivers are added, namely the Microsoft SQL Server (`@mikro-orm/mssql` package) and libSQL driver (`@mikro-orm/libsql` package). And there is more!
**Tags:**
  * [typescript](https://mikro-orm.io/blog/tags/typescript)
  * [javascript](https://mikro-orm.io/blog/tags/javascript)
  * [node](https://mikro-orm.io/blog/tags/node)
  * [sql](https://mikro-orm.io/blog/tags/sql)
[**Read More**](https://mikro-orm.io/blog/mikro-orm-6-2-released)
## [MikroORM 6: Polished](https://mikro-orm.io/blog/mikro-orm-6-released)
20 min read
[![Martin Adámek](https://avatars1.githubusercontent.com/u/615580?s=460&v=4)](https://github.com/B4nan)
[Martin Adámek](https://github.com/B4nan)
Author of MikroORM
After more than a year in the development, I am thrilled to announce the next major version of MikroORM has just become stable. It brings many improvements throughout the whole system, and doubles down on type-safety and strictness.
![](https://mikro-orm.io/assets/images/improving-72dbe2591f1b332382c450a3aa344c19.jpg)
**Tags:**
  * [typescript](https://mikro-orm.io/blog/tags/typescript)
  * [javascript](https://mikro-orm.io/blog/tags/javascript)
  * [node](https://mikro-orm.io/blog/tags/node)
  * [sql](https://mikro-orm.io/blog/tags/sql)
[**Read More**](https://mikro-orm.io/blog/mikro-orm-6-released)
## [MikroORM 5.8 released](https://mikro-orm.io/blog/mikro-orm-5-8-released)
6 min read
[![Martin Adámek](https://avatars1.githubusercontent.com/u/615580?s=460&v=4)](https://github.com/B4nan)
[Martin Adámek](https://github.com/B4nan)
Author of MikroORM
After a longer pause, I am pleased to announce next feature release - [MikroORM v5.8](https://github.com/mikro-orm/mikro-orm/releases/tag/v5.8.0), probably the last one before [v6](https://github.com/mikro-orm/mikro-orm/discussions/3593). While I don't blog about the feature releases very often, I feel like this one deserves more attention. Why?
**Tags:**
  * [typescript](https://mikro-orm.io/blog/tags/typescript)
  * [javascript](https://mikro-orm.io/blog/tags/javascript)
  * [node](https://mikro-orm.io/blog/tags/node)
  * [sql](https://mikro-orm.io/blog/tags/sql)
[**Read More**](https://mikro-orm.io/blog/mikro-orm-5-8-released)
## [MikroORM 5: Stricter, Safer, Smarter](https://mikro-orm.io/blog/mikro-orm-5-released)
16 min read
[![Martin Adámek](https://avatars1.githubusercontent.com/u/615580?s=460&v=4)](https://github.com/B4nan)
[Martin Adámek](https://github.com/B4nan)
Author of MikroORM
The next major version of MikroORM has been just released. The title says: Stricter, Safer, Smarter – why?
![](https://cdn-images-1.medium.com/max/430/0*atMJ3hrlUosSpnQy.jpg)
  * Greatly improved type safety (e.g. populate and partial loading hints)
  * Auto-flush mode (so we never lose in-memory changes)
  * Automatic refreshing of loaded entities (say goodby to refresh: true)
  * Reworked schema diffing with automatic down migrations support
  * and [many many more](https://github.com/mikro-orm/mikro-orm/blob/master/CHANGELOG.md#500-rc0-2022-01-23)...
> This time it took almost a year to get here – initial work on v5 started [back in March 2021](https://github.com/mikro-orm/mikro-orm/issues/1623).
**Tags:**
  * [typescript](https://mikro-orm.io/blog/tags/typescript)
  * [javascript](https://mikro-orm.io/blog/tags/javascript)
  * [node](https://mikro-orm.io/blog/tags/node)
  * [sql](https://mikro-orm.io/blog/tags/sql)
[**Read More**](https://mikro-orm.io/blog/mikro-orm-5-released)
[ Older entries](https://mikro-orm.io/blog/page/2)
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
  * [@mikro-orm/migrations](https://mikro-orm.io/api/migrations)
  * [@mikro-orm/postgresql](https://mikro-orm.io/api/postgresql)
  * [@mikro-orm/reflection](https://mikro-orm.io/api/reflection)
# API
### Packages
  * [v7.1.2 @mikro-orm/cli](https://mikro-orm.io/api/cli)
  * [v7.1.2 @mikro-orm/core](https://mikro-orm.io/api/core)
  * [v7.1.2 @mikro-orm/entity-generator](https://mikro-orm.io/api/entity-generator)
  * [v7.1.2 @mikro-orm/libsql](https://mikro-orm.io/api/libsql)
  * [v7.1.2 @mikro-orm/migrations](https://mikro-orm.io/api/migrations)
  * [v7.1.2 @mikro-orm/postgresql](https://mikro-orm.io/api/postgresql)
  * [v7.1.2 @mikro-orm/reflection](https://mikro-orm.io/api/reflection)
  * [v7.1.2 @mikro-orm/seeder](https://mikro-orm.io/api/seeder)
  * [v7.1.2 @mikro-orm/sql](https://mikro-orm.io/api/sql)