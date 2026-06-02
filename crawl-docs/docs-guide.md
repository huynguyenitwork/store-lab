============================================================
# https://mikro-orm.io/docs/guide
============================================================
[Skip to main content](https://mikro-orm.io/docs/guide#__docusaurus_skipToContent_fallback)
⭐️ If you like MikroORM, give it a star on [GitHub](https://github.com/mikro-orm/mikro-orm) and consider [sponsoring](https://github.com/sponsors/mikro-orm) its development! ⭐️
[ ![MikroORM](https://mikro-orm.io/img/logo.svg)![MikroORM](https://mikro-orm.io/img/logo-dark.svg) ](https://mikro-orm.io/)
[7.1](https://mikro-orm.io/docs/guide)
  * [Next](https://mikro-orm.io/docs/next/guide)
  * [7.1](https://mikro-orm.io/docs/guide)
  * [7.0](https://mikro-orm.io/docs/7.0/guide)
  * [6.6](https://mikro-orm.io/docs/6.6/guide)
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
# Getting Started Guide
## Introduction[​](https://mikro-orm.io/docs/guide#introduction "Direct link to Introduction")
MikroORM is a TypeScript ORM for Node.js based on Data Mapper, Unit of Work, and Identity Map patterns. In this guide, you will learn what those words mean, how to set up a simple API project, how to test it, and many more.
This Getting Started Guide was written as a step-by-step tutorial, accompanied by working StackBlitz examples and a [GitHub repository with the final project](https://github.com/mikro-orm/guide). It will show you how to create a production-ready application from scratch, all the way down to a docker image you can deploy wherever you want.
To take a peek at the final project we will be building, try cloning the [`mikro-orm/guide` GitHub project](https://github.com/mikro-orm/guide).
```
git clone https://github.com/mikro-orm/guide.git  
```
This guide focuses on "code first" approach to developing the application, but MikroORM can also be used with a "schema first" approach. Check out [the "schema first" guide](https://mikro-orm.io/docs/schema-first-guide) for more details on that.
## The Stack[​](https://mikro-orm.io/docs/guide#the-stack "Direct link to The Stack")
The goal of this guide is to show off the most important features of MikroORM as well as some of the more niche ones. It will walk you through creating a simple API for a blog, with the following technologies:
  * [MikroORM](https://mikro-orm.io) with SQLite driver
  * [Fastify](https://www.fastify.io) as the web framework
  * [Vitest](https://vitest.dev) for testing
  * ECMAScript modules
  * JWT authentication
## MikroORM monorepo[​](https://mikro-orm.io/docs/guide#mikroorm-monorepo "Direct link to MikroORM monorepo")
The ORM consists of several packages, the important ones we will be using:
  * `@mikro-orm/core`: the main package with the ORM code
  * `@mikro-orm/cli`: the CLI package, needs to be installed locally
  * `@mikro-orm/sqlite`: the sqlite driver package (you can use a different driver too)
  * `@mikro-orm/migrations`: package for managing schema migrations
  * `@mikro-orm/seeder`: package for seeding the database with testing data
The `core` and driver packages are required, the rest of this list is optional and can be a dev dependency if you wish. We will use the `sqlite` driver, mainly for simplicity, as it does not require any additional setup and offers a handy in-memory database, which we will use in the tests.
> There are more packages, some also live outside the `mikro-orm/mikro-orm` monorepo, such as the `@mikro-orm/nestjs` or `@mikro-orm/sql-highlighter` - unlike the ones from the monorepo, those usually have different versioning line.
Full list of currently available drivers:
  * `@mikro-orm/mysql`
  * `@mikro-orm/mariadb`
  * `@mikro-orm/postgresql`
  * `@mikro-orm/pglite`
  * `@mikro-orm/sqlite`
  * `@mikro-orm/libsql`
  * `@mikro-orm/mssql`
  * `@mikro-orm/oracledb`
  * `@mikro-orm/mongodb`
## What are we building?[​](https://mikro-orm.io/docs/guide#what-are-we-building "Direct link to What are we building?")
We already mentioned what technologies will be used, and now more about the project. It will be a simple API for a blog, with authentication, publishing, and commenting. For that, we will use four regular entities: `User`, `Article`, `Comment`, and `Tag`. Later on, we will add one more entity, `ArticleListing`, a virtual entity represented by an SQL expression rather than a database table, and then convert it to a native database view.
And the API routes description:  
| Method  | URL  | Description  |  
| --- | --- | --- |  
| `POST`  | `/user/sign-up`  | Register new user  |  
| `POST`  | `/user/sign-in`  | Login existing user  |  
| `GET`  | `/user/profile`  | Get your full profile info  |  
| `PATCH`  | `/user/profile`  | Modify your profile  |  
| `POST`  | `/article`  | Create new article  |  
| `GET`  | `/article`  | List existing articles  |  
| `GET`  | `/article/:slug`  | Get article detail  |  
| `PATCH`  | `/article/:slug`  | Modify existing article  |  
| `DELETE`  | `/article/:slug`  | Delete existing article  |  
| `POST`  | `/article/:slug/comment`  | Post comment for existing article  |  
The code will be structured into self-contained modules: `user`, `article`, and `common` (for shared helpers).
The app will be using Node.js 24, TypeScript 5.9, and we will build it using a modern stack with ECMAScript modules enabled.
## What will we cover[​](https://mikro-orm.io/docs/guide#what-will-we-cover "Direct link to What will we cover")
Here is (an incomplete) list of features you will try going through this guide.
  * creating an app from scratch with TypeScript setup
  * defining entities with the `defineEntity` helper and `InferEntity` for full type inference
  * extending entities with custom methods via `setClass`
  * request context management via middleware/fastify hook
  * entity relations, advanced entity definition (e.g. lazy scalar properties)
  * advanced type safety (e.g. `Reference` wrapper and `Loaded` type)
  * events, including advanced use cases like soft-delete via `onFlush` event
  * basic testing via vitest
  * custom repositories
  * virtual entities
  * serialization
  * embeddables
[](https://github.com/mikro-orm/mikro-orm/edit/master/docs/versioned_docs/version-7.1/guide/00-introduction.md)
Last updated on **May 20, 2026** by **Martin Adámek**
[Previous Quick Start](https://mikro-orm.io/docs/quick-start)[Next Chapter 1: First Entity](https://mikro-orm.io/docs/guide/first-entity)
  * [Introduction](https://mikro-orm.io/docs/guide#introduction)
  * [The Stack](https://mikro-orm.io/docs/guide#the-stack)
  * [MikroORM monorepo](https://mikro-orm.io/docs/guide#mikroorm-monorepo)
  * [What are we building?](https://mikro-orm.io/docs/guide#what-are-we-building)
  * [What will we cover](https://mikro-orm.io/docs/guide#what-will-we-cover)
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
# https://mikro-orm.io/docs/next/quick-start
============================================================
[Skip to main content](https://mikro-orm.io/docs/next/quick-start#__docusaurus_skipToContent_fallback)
⭐️ If you like MikroORM, give it a star on [GitHub](https://github.com/mikro-orm/mikro-orm) and consider [sponsoring](https://github.com/sponsors/mikro-orm) its development! ⭐️
[ ![MikroORM](https://mikro-orm.io/img/logo.svg)![MikroORM](https://mikro-orm.io/img/logo-dark.svg) ](https://mikro-orm.io/)
[Next](https://mikro-orm.io/docs/next/quick-start)
  * [Next](https://mikro-orm.io/docs/next/quick-start)
  * [7.1](https://mikro-orm.io/docs/quick-start)
  * [7.0](https://mikro-orm.io/docs/7.0/quick-start)
  * [6.6](https://mikro-orm.io/docs/6.6/quick-start)
  * [5.9](https://mikro-orm.io/docs/5.9/quick-start)
[Docs](https://mikro-orm.io/docs/quick-start)[API](https://mikro-orm.io/api)[Blog](https://mikro-orm.io/blog)[Changelog](https://mikro-orm.io/changelog)
[latest: v7.1.3](https://mikro-orm.io/versions)[Discord](https://discord.gg/w8bjxFHS7X "Chat on Discord")[GitHub](https://github.com/mikro-orm/mikro-orm "View on GitHub")[Twitter](https://twitter.com/MikroORM "Twitter")
Search
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
# https://mikro-orm.io/docs/5.9/quick-start
============================================================
[Skip to main content](https://mikro-orm.io/docs/5.9/quick-start#__docusaurus_skipToContent_fallback)
⭐️ If you like MikroORM, give it a star on [GitHub](https://github.com/mikro-orm/mikro-orm) and consider [sponsoring](https://github.com/sponsors/mikro-orm) its development! ⭐️
[ ![MikroORM](https://mikro-orm.io/img/logo.svg)![MikroORM](https://mikro-orm.io/img/logo-dark.svg) ](https://mikro-orm.io/)
[5.9](https://mikro-orm.io/docs/5.9/quick-start)
  * [Next](https://mikro-orm.io/docs/next/quick-start)
  * [7.1](https://mikro-orm.io/docs/quick-start)
  * [7.0](https://mikro-orm.io/docs/7.0/quick-start)
  * [6.6](https://mikro-orm.io/docs/6.6/quick-start)
  * [5.9](https://mikro-orm.io/docs/5.9/quick-start)
[Docs](https://mikro-orm.io/docs/quick-start)[API](https://mikro-orm.io/api)[Blog](https://mikro-orm.io/blog)[Changelog](https://mikro-orm.io/changelog)
[latest: v7.1.3](https://mikro-orm.io/versions)[Discord](https://discord.gg/w8bjxFHS7X "Chat on Discord")[GitHub](https://github.com/mikro-orm/mikro-orm "View on GitHub")[Twitter](https://twitter.com/MikroORM "Twitter")
Search
  * [Overview](https://mikro-orm.io/docs/5.9/installation)
  * [Fundamentals](https://mikro-orm.io/docs/5.9/fundamentals)
  * [Advanced Features](https://mikro-orm.io/docs/5.9/advanced)
  * [Reference](https://mikro-orm.io/docs/5.9/reference)
  * [Usage with Different Drivers](https://mikro-orm.io/docs/5.9/drivers)
  * [Recipes](https://mikro-orm.io/docs/5.9/recipes)
    * [Quick Start](https://mikro-orm.io/docs/5.9/quick-start)
    * [Usage with NestJS](https://mikro-orm.io/docs/5.9/usage-with-nestjs)
    * [Usage with Vanilla JS](https://mikro-orm.io/docs/5.9/usage-with-js)
    * [Usage with transpilers](https://mikro-orm.io/docs/5.9/usage-with-transpilers)
    * [Usage with AdminJS](https://mikro-orm.io/docs/5.9/usage-with-adminjs)
    * [Using Entity Constructors](https://mikro-orm.io/docs/5.9/entity-constructors)
    * [Using Multiple Schemas](https://mikro-orm.io/docs/5.9/multiple-schemas)
    * [Using native BigInt PKs (MySQL and PostgreSQL)](https://mikro-orm.io/docs/5.9/using-bigint-pks)
    * [Using AsyncLocalStorage](https://mikro-orm.io/docs/5.9/async-local-storage)
    * [Creating Custom Driver](https://mikro-orm.io/docs/5.9/custom-driver)
  * [Example Integrations](https://mikro-orm.io/docs/5.9/examples)
  * [Upgrading](https://mikro-orm.io/docs/5.9/upgrading)
This is documentation for MikroORM **5.9** , which is no longer actively maintained.
For up-to-date documentation, see the **[latest version](https://mikro-orm.io/docs/quick-start)** (7.1).
  * [](https://mikro-orm.io/)
  * [Recipes](https://mikro-orm.io/docs/5.9/recipes)
Version: 5.9
# Quick Start
First install the module via `yarn` or `npm` and do not forget to install the database driver as well:
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
Next you will need to enable support for [decorators](https://www.typescriptlang.org/docs/handbook/decorators.html) as well as `esModuleInterop` in `tsconfig.json` via:
```
"experimentalDecorators": true,  
"emitDecoratorMetadata": true,  
"esModuleInterop": true  
```
Then call `MikroORM.init` as part of bootstrapping your app:
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
  entities: ['./dist/entities'], // path to your JS entities (dist), relative to `baseDir`  
  dbName: 'my-db-name',  
  type: 'postgresql',  
});  
console.log(orm.em); // access EntityManager via `em` property  
```
There are more ways to configure your entities, take a look at [installation page](https://mikro-orm.io/installation/).
> Read more about all the possible configuration options in [Advanced Configuration](https://mikro-orm.io/docs/configuration) section.
Then you will need to fork entity manager for each request so their [identity maps](https://mikro-orm.io/identity-map/) will not collide. To do so, use the `RequestContext` helper:
```
const app = express();  
  
app.use((req, res, next) => {  
  RequestContext.create(orm.em, next);  
});  
```
> You should register this middleware as the last one just before request handlers and before any of your custom middleware that is using the ORM. There might be issues when you register it before request processing middleware like `queryParser` or `bodyParser`, so definitely register the context after them.
More info about `RequestContext` is described [here](https://mikro-orm.io/identity-map/#request-context).
Now you can start defining your entities (in one of the `entities` folders). This is how simple entity can look like in mongo driver:
./entities/MongoBook.ts
```
@Entity()  
export class MongoBook {  
  
  @PrimaryKey()  
  _id: ObjectID;  
  
  @SerializedPrimaryKey()  
  id: string;  
  
  @Property()  
  title: string;  
  
  @ManyToOne()  
  author: Author;  
  
  @ManyToMany()  
  tags = new Collection<BookTag>(this);  
  
  constructor(title: string, author: Author) {  
    this.title = title;  
    this.author = author;  
  }  
  
}  
```
For SQL drivers, you can use `id: number` PK:
./entities/SqlBook.ts
```
@Entity()  
export class SqlBook {  
  
  @PrimaryKey()  
  id: number;  
  
}  
```
Or if you want to use UUID primary keys:
./entities/UuidBook.ts
```
import { v4 } from 'uuid';  
  
@Entity()  
export class UuidBook {  
  
  @PrimaryKey()  
  uuid = v4();  
  
}  
```
More information can be found in [defining entities section](https://mikro-orm.io/defining-entities/) in docs.
When you have your entities defined, you can start using ORM either via `EntityManager` or via `EntityRepository`s.
To save entity state to database, you need to persist it. Persist determines whether to use `insert` or `update` and computes appropriate change-set. Entity references that are not persisted yet (does not have identifier) will be cascade persisted automatically.
```
// use constructors in your entities for required parameters  
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
```
To fetch entities from database you can use `find()` and `findOne()` of `EntityManager`:
```
const authors = em.find(Author, {});  
  
for (const author of authors) {  
  console.log(author); // instance of Author entity  
  console.log(author.name); // Jon Snow  
  
  for (const book of author.books) { // iterating books collection  
    console.log(book); // instance of Book entity  
    console.log(book.title); // My Life on The Wall, part 1/2/3  
  }  
}  
```
More convenient way of fetching entities from database is by using `EntityRepository`, that carries the entity name so you do not have to pass it to every `find` and `findOne` calls:
```
const booksRepository = em.getRepository(Book);  
  
const books = await booksRepository.find({ author: '...' }, {  
  populate: ['author'],  
  limit: 1,  
  offset: 2,  
  orderBy: { title: QueryOrder.DESC },  
});  
  
console.log(books); // Book[]  
```
Take a look at docs about [working with `EntityManager`](https://mikro-orm.io/entity-manager/) or [using `EntityRepository` instead](https://mikro-orm.io/repositories/).
[](https://github.com/mikro-orm/mikro-orm/edit/master/docs/versioned_docs/version-5.9/quick-start.md)
Last updated on **Oct 24, 2023** by **Martin Adámek**
[Previous Recipes](https://mikro-orm.io/docs/5.9/recipes)[Next Usage with NestJS](https://mikro-orm.io/docs/5.9/usage-with-nestjs)
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
# https://mikro-orm.io/docs/next/guide/first-entity
============================================================
[Skip to main content](https://mikro-orm.io/docs/next/guide/first-entity#__docusaurus_skipToContent_fallback)
⭐️ If you like MikroORM, give it a star on [GitHub](https://github.com/mikro-orm/mikro-orm) and consider [sponsoring](https://github.com/sponsors/mikro-orm) its development! ⭐️
[ ![MikroORM](https://mikro-orm.io/img/logo.svg)![MikroORM](https://mikro-orm.io/img/logo-dark.svg) ](https://mikro-orm.io/)
[Next](https://mikro-orm.io/docs/next/guide/first-entity)
  * [Next](https://mikro-orm.io/docs/next/guide/first-entity)
  * [7.1](https://mikro-orm.io/docs/guide/first-entity)
  * [7.0](https://mikro-orm.io/docs/7.0/guide/first-entity)
  * [6.6](https://mikro-orm.io/docs/6.6/guide/first-entity)
  * [5.9](https://mikro-orm.io/docs/5.9/installation)
[Docs](https://mikro-orm.io/docs/quick-start)[API](https://mikro-orm.io/api)[Blog](https://mikro-orm.io/blog)[Changelog](https://mikro-orm.io/changelog)
[latest: v7.1.3](https://mikro-orm.io/versions)[Discord](https://discord.gg/w8bjxFHS7X "Chat on Discord")[GitHub](https://github.com/mikro-orm/mikro-orm "View on GitHub")[Twitter](https://twitter.com/MikroORM "Twitter")
Search
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
For up-to-date documentation, see the **[latest version](https://mikro-orm.io/docs/guide/first-entity)** (7.1).
  * [](https://mikro-orm.io/)
  * [Getting Started](https://mikro-orm.io/docs/next/guide)
Version: Next
On this page
# Chapter 1: First Entity
## Setting up[​](https://mikro-orm.io/docs/next/guide/first-entity#setting-up "Direct link to Setting up")
Before you start, ensure you meet the following pre-requisites first:
  1. Have Node.js version 22.11 or higher installed, but preferably version 24.
     * Visit [Node.js website](https://nodejs.org/en/download) to download or use [fnm](https://github.com/Schniz/fnm).
  2. Have NPM installed, or use any other package manager of your choice.
     * NPM comes bundled with Node.js, so you should already have it. If not, reinstall Node.js. To use other package managers, consider using [corepack](https://nodejs.org/api/corepack.html).
If not certain, confirm the prerequisites by running:
```
node -v  
npm -v  
```
## Creating a new project[​](https://mikro-orm.io/docs/next/guide/first-entity#creating-a-new-project "Direct link to Creating a new project")
Let's start with the basic folder structure. As we said we will have 3 modules, each having its own directory:
```
# create the project folder and `cd` into it  
mkdir blog-api && cd blog-api  
# create module folders, inside `src` folder  
mkdir -p src/modules/{user,article,common}  
```
Now add the dependencies:
  * npm
  * Yarn
  * pnpm
  * Bun
```
npm install @mikro-orm/core \  
            @mikro-orm/sqlite \  
            fastify  
```
```
yarn add @mikro-orm/core \  
            @mikro-orm/sqlite \  
            fastify  
```
```
pnpm add @mikro-orm/core \  
            @mikro-orm/sqlite \  
            fastify  
```
```
bun add @mikro-orm/core \  
            @mikro-orm/sqlite \  
            fastify  
```
And some development dependencies:
  * npm
  * Yarn
  * pnpm
  * Bun
```
npm install --save-dev @mikro-orm/cli \  
                       typescript \  
                       tsx \  
                       @types/node \  
                       vitest  
```
```
yarn add --dev @mikro-orm/cli \  
                       typescript \  
                       tsx \  
                       @types/node \  
                       vitest  
```
```
pnpm add --save-dev @mikro-orm/cli \  
                       typescript \  
                       tsx \  
                       @types/node \  
                       vitest  
```
```
bun add --dev @mikro-orm/cli \  
                       typescript \  
                       tsx \  
                       @types/node \  
                       vitest  
```
## ECMAScript Modules[​](https://mikro-orm.io/docs/next/guide/first-entity#ecmascript-modules "Direct link to ECMAScript Modules")
You probably heard about ECMAScript Modules (ESM), but this might easily be the first time you try them.
> You do not have to use ESM to use MikroORM. MikroORM can work in ESM projects, as well as CommonJS (CJS) projects.
In a nutshell, for ESM project we need to:
  * add `"type": "module"` to package.json
  * use `import/export` statements instead of `require` calls
  * use `.js` extension in those `import`s, even in TypeScript files
> You can read more about the ESM support in Node.js [here](https://nodejs.org/api/esm.html).
## Configuring TypeScript[​](https://mikro-orm.io/docs/next/guide/first-entity#configuring-typescript "Direct link to Configuring TypeScript")
We will use the following TypeScript config, so create the `tsconfig.json` file and copy it there. If you know what you are doing, you can adjust the configuration to fit your needs.
For ESM support to work, we need to set `module` and `moduleResolution` to `NodeNext` and target `ES2024`. We also enable `strict` mode. Lastly, we tell TypeScript to compile into `dist` folder via `outDir` and make it `include` all `*.ts` files inside `src` folder.
tsconfig.json
```
{  
  "compilerOptions": {  
    "module": "NodeNext",  
    "moduleResolution": "NodeNext",  
    "target": "ES2024",  
    "strict": true,  
    "outDir": "dist"  
  },  
  "include": [  
    "./src/**/*.ts"  
  ]  
}  
```
## Setting up CLI[​](https://mikro-orm.io/docs/next/guide/first-entity#setting-up-cli "Direct link to Setting up CLI")
Next, we will set up the CLI config for MikroORM. This config will be then automatically imported into your app too. We will use the `defineConfig` helper that provides intellisense even in JavaScript files.
> For tests, you can import the config and override some options before evaluating it.
src/mikro-orm.config.ts
```
import { defineConfig } from '@mikro-orm/sqlite';  
import { UserSchema } from './modules/user/user.entity.js';  
  
export default defineConfig({  
  // for simplicity, we use the SQLite database, as it's available pretty much everywhere  
  dbName: 'sqlite.db',  
  // explicitly list your entities - we'll create the User entity next  
  entities: [UserSchema],  
  // enable debug mode to log SQL queries and discovery information  
  debug: true,  
});  
```
We import the entity schema directly and pass it to the `entities` array. This is more explicit than folder-based discovery and gives you better control over what entities are registered.
> The `defineConfig` helper infers the driver type automatically, so no need to specify it explicitly.
Save this file into `src/mikro-orm.config.ts`, so it will get compiled together with the rest of your app.
> Alternatively, you can use `mikro-orm.config.js` file in the root of your project, such a file will get loaded automatically. Consult [the documentation](https://mikro-orm.io/docs/next/quick-start#setting-up-the-commandline-tool) for more info.
package.json
```
{  
  "type": "module",  
  "dependencies": { ... },  
  "devDependencies": { ... }  
}  
```
Lastly, add some NPM scripts to ease the development. We will build the app via `tsc`, test it via `vitest` and run it locally via `tsx`.
package.json
```
{  
  "type": "module",  
  "dependencies": { ... },  
  "devDependencies": { ... },  
  "scripts": {  
    "build": "tsc",  
    "start": "tsx src/server.ts",  
    "test": "vitest"  
  }  
}  
```
> We refer to a file `src/server.ts` in the `start` script, we will create that later, no need to worry about it right now.
Note that the config references the `User` entity which we haven't created yet. The CLI will fail until we create it, so let's do that next.
## First Entity[​](https://mikro-orm.io/docs/next/guide/first-entity#first-entity "Direct link to First Entity")
Check out the [Defining Entities](https://mikro-orm.io/docs/next/defining-entities) section which provides many examples of various property types as well as different ways to define your entities.
Time to create your first entity - the `User`! Create a `user.entity.ts` file in `src/modules/user` with the following contents:
user.entity.ts
```
import { defineEntity, type InferEntity, p } from '@mikro-orm/core';  
  
export const UserSchema = defineEntity({  
  name: 'User',  
  properties: {  
    id: p.integer().primary(),  
    fullName: p.string(),  
    email: p.string(),  
    password: p.string(),  
    bio: p.text().default(''),  
  },  
});  
  
export type IUser = InferEntity<typeof UserSchema>;  
```
So what do we have here? We use the `defineEntity` helper to create an entity schema for the `User`. The `InferEntity` type utility extracts the TypeScript type from the schema, giving us a `User` type we can use throughout our code.
The `p` export provides type-safe property builders like `p.string()`, `p.integer()`, `p.text()`, etc. These builders use a fluent API where you can chain options like `.primary()`, `.default()`, and more.
Properties with `.default()` or `.onCreate()` are automatically optional in `em.create()` calls - for example, `bio` has a default value of `''`, so it doesn't need to be provided.
### Using a custom class[​](https://mikro-orm.io/docs/next/guide/first-entity#using-a-custom-class "Direct link to Using a custom class")
If you need to add custom methods to your entity, you can extend the schema's auto-generated class via `setClass()`:
user.entity.ts
```
export const UserSchema = defineEntity({  
  name: 'User',  
  properties: {  
    // ...  
  },  
});  
  
export class User extends UserSchema.class {  
  // custom methods go here  
}  
  
UserSchema.setClass(User);  
```
This avoids redeclaring all properties in the class - they are inferred from the schema automatically. We will use this pattern in Chapter 2 when adding methods to the `User` entity.
### Defining the primary key[​](https://mikro-orm.io/docs/next/guide/first-entity#defining-the-primary-key "Direct link to Defining the primary key")
Every entity needs to have a primary key. You define it using the `.primary()` builder method. For a single numeric primary key, auto-increment is assumed automatically:
```
id: p.integer().primary(),  
```
In case you want to use `bigint` column type, use the `p.bigint()` builder. BigInts are mapped to `string` by default, as JavaScript `number` cannot safely represent large integers:
```
id: p.bigint().primary(),  
```
Another common use case is UUID. You can use `onCreate` to generate a value when the entity is first persisted:
```
import { v4 } from 'uuid';  
  
// ...  
uuid: p.uuid().primary().onCreate(() => v4()),  
```
### Scalar properties[​](https://mikro-orm.io/docs/next/guide/first-entity#scalar-properties "Direct link to Scalar properties")
To map regular database columns, we use the property builders from `defineEntity.properties`. Each builder corresponds to a data type:
  * `p.string()` - maps to `varchar`
  * `p.text()` - maps to `text` (for longer strings)
  * `p.integer()` - maps to `integer`
  * `p.boolean()` - maps to `boolean`
  * `p.datetime()` - maps to `datetime`/`timestamp`
  * `p.json<T>()` - maps to `json`/`jsonb` with typed content
For our `User.bio` we want to use `text` instead of `varchar`, and provide a default value:
```
bio: p.text().default(''),  
```
The `.default()` method sets both the runtime default and the database column default. Properties with defaults are automatically marked as optional in TypeScript (the `Opt` type is inferred).
You can chain additional options:
```
// with explicit column type  
bio: p.text().columnType('character varying(1000)'),  
  
// with length constraint  
description: p.string().length(1000),  
```
When using `.columnType()`, be careful about options like `length` or `precision/scale` - `columnType` is always used as-is. This means you need to pass the final value there, including the length, e.g. `.columnType('decimal(10,2)')`.
Now that we have both the config and the entity, test the CLI via `npx mikro-orm debug`:
```
Current MikroORM CLI configuration  
 - dependencies:  
   - mikro-orm 7.0.0  
   - node 24.11.1  
   - typescript 5.9.3  
 - package.json found  
 - TypeScript support enabled (tsx)  
 - configuration found  
 - database connection successful  
 - will use `entities` array (contains 1 references)  
```
## Initializing the ORM[​](https://mikro-orm.io/docs/next/guide/first-entity#initializing-the-orm "Direct link to Initializing the ORM")
The last missing step is to initialize the [`MikroORM`](https://mikro-orm.io/api/core/class/MikroORM) to get access to the [`EntityManager`](https://mikro-orm.io/api/core/class/EntityManager) and other handy tools (like the [`SchemaGenerator`](https://mikro-orm.io/api/sql/class/SqlSchemaGenerator)).
server.ts
```
import { MikroORM } from '@mikro-orm/sqlite';  
import config from './mikro-orm.config.js';  
  
const orm = await MikroORM.init(config);  
```
As opposed to the async [`MikroORM.init`](https://mikro-orm.io/api/core/class/MikroORM#init) method, you can prefer to use synchronous variant with the constructor: [`new MikroORM()`](https://mikro-orm.io/api/core/class/MikroORM#constructor).
```
const orm = new MikroORM(config);  
```
This method has some limitations:
  * folder-based discovery not supported
  * ORM extensions are not auto-loaded
  * when metadata cache is enabled, `FileCacheAdapter` needs to be explicitly set in the config
## Working with Entity Manager[​](https://mikro-orm.io/docs/next/guide/first-entity#working-with-entity-manager "Direct link to Working with Entity Manager")
So now you have the access to [`EntityManager`](https://mikro-orm.io/api/core/class/EntityManager), let's talk about how it works and how you can use it.
### Persist and Flush[​](https://mikro-orm.io/docs/next/guide/first-entity#persist-and-flush "Direct link to Persist and Flush")
There are 2 methods we should first describe to understand how persisting works in MikroORM: [`em.persist()`](https://mikro-orm.io/api/core/class/EntityManager#persist) and [`em.flush()`](https://mikro-orm.io/api/core/class/EntityManager#flush).
[`em.persist(entity)`](https://mikro-orm.io/api/core/class/EntityManager#persist) is used to mark new entities for future persisting. It will make the entity managed by the [`EntityManager`](https://mikro-orm.io/api/core/class/EntityManager) and once `flush` will be called, it will be written to the database.
We use [`em.create()`](https://mikro-orm.io/api/core/class/EntityManager#create) to create entity instances.
```
// create a new user entity instance  
const user = em.create(UserSchema, {  
  email: 'foo@bar.com',  
  fullName: 'Foo Bar',  
  password: '123456',  
});  
  
// em.create() automatically calls persist(), so we just need to flush  
await em.flush();  
  
// alternatively, you can persist manually:  
const user2 = em.create(UserSchema, { ... }, { persist: false });  
em.persist(user2);  
await em.flush();  
```
To understand `flush`, let's first define what managed entity is: An entity is managed if it's fetched from the database (via [`em.find()`](https://mikro-orm.io/api/core/class/EntityManager#find)) or registered as new through [`em.persist()`](https://mikro-orm.io/api/core/class/EntityManager#persist) and flushed later (only after the `flush` it becomes managed).
[`em.flush()`](https://mikro-orm.io/api/core/class/EntityManager#flush) will go through all managed entities, compute appropriate change sets and perform according database queries. As an entity loaded from the database becomes managed automatically, you do not have to call persist on those, and flush is enough to update them.
```
const user = await em.findOne(UserSchema, 1);  
user.bio = '...';  
  
// no need to persist `user` as it's already managed by the EM  
await em.flush();  
```
Let's try to create our first record in the database, add this to the `server.ts` file:
server.ts
```
import { MikroORM } from '@mikro-orm/sqlite';  
import config from './mikro-orm.config.js';  
import { UserSchema } from './modules/user/user.entity.js';  
  
const orm = await MikroORM.init(config);  
  
// create new user entity instance via em.create()  
const user = orm.em.create(UserSchema, {  
  email: 'foo@bar.com',  
  fullName: 'Foo Bar',  
  password: '123456',  
});  
  
// em.create() auto-persists, so just flush  
await orm.em.flush();  
  
// after the entity is flushed, it becomes managed, and has the PK available  
console.log('user id is:', user.id);  
```
Now run the script again via `npm start`, and you will see an error:
```
ValidationError: Using global EntityManager instance methods for context specific actions is disallowed.  
If you need to work with the global instance's identity map, use `allowGlobalContext` configuration option  
or `fork()` instead.  
```
Remember we said the `orm.em` is a global [`EntityManager`](https://mikro-orm.io/api/core/class/EntityManager) instance? Looks like it is not a good idea to use it, in fact, it is disallowed by default. Before we get to the bottom of this message, let's quickly define two more terms we haven't touched yet - the Identity Map and Unit of Work.
  * Unit of Work maintains a list of objects (entities) affected by a business transaction and coordinates the writing out of changes.
  * Identity Map ensures that each object (entity) gets loaded only once by keeping every loaded object in a map. Looks up objects using the map when referring to them.
MikroORM is a data-mapper that tries to achieve persistence-ignorance. This means you map JavaScript objects into a relational database that doesn't necessarily know about the database at all. How does it work?
### Unit of Work and Identity Map[​](https://mikro-orm.io/docs/next/guide/first-entity#unit-of-work-and-identity-map "Direct link to Unit of Work and Identity Map")
MikroORM uses the Identity Map pattern to track objects. Whenever you fetch an object from the database, MikroORM will keep a reference to this object inside its `UnitOfWork`. This allows MikroORM room for optimizations. If you call the EntityManager and ask for an entity with a specific ID twice, it will return the same instance:
```
const jon1 = await em.findOne(Author, 1);  
const jon2 = await em.findOne(Author, 1);  
  
// identity map in action  
console.log(jon1 === jon2); // true  
```
The Identity Map only knows objects by id, so a query for different criteria has to go to the database, even if it was executed just before. But instead of creating a second `Author` object MikroORM first gets the primary key from the row and checks if it already has an object inside the `UnitOfWork` with that primary key.
### Change Tracking[​](https://mikro-orm.io/docs/next/guide/first-entity#change-tracking "Direct link to Change Tracking")
The identity map has a second, more important use-case. Whenever you call [`em.flush()`](https://mikro-orm.io/api/core/class/EntityManager#flush), the ORM will iterate over the Identity Map, and for each entity it compares the original state with the values that are currently set on the entity. If changes are detected, the object is queued for an SQL `UPDATE` operation. Only the fields that changed are part of the update query.
The following code will update your database with the changes made to the `Author` object, even if you did not call [`em.persist()`](https://mikro-orm.io/api/core/class/EntityManager#persist):
```
const jon = await em.findOne(Author, 1);  
  
jon.email = 'foo@bar.com';  
  
await em.flush();  
```
### Implicit Transactions[​](https://mikro-orm.io/docs/next/guide/first-entity#implicit-transactions "Direct link to Implicit Transactions")
The most important implication of having Unit of Work is that it allows handling transactions automatically.
When you call [`em.flush()`](https://mikro-orm.io/api/core/class/EntityManager#flush), all computed changes are queried inside a database transaction. This means that you can control the boundaries of transactions by calling [`em.persist()`](https://mikro-orm.io/api/core/class/EntityManager#persist) and once all your changes are ready, calling `flush()` will run them inside a transaction.
> You can also control the transaction boundaries manually via `em.transactional(cb)`.
```
const user = await em.findOne(UserSchema, 1);  
  
user.email = 'foo@bar.com';  
  
await em.flush();  
```
You can find more information about transactions in [Transactions and concurrency](https://mikro-orm.io/docs/next/transactions) page.
### Why is Request Context needed?[​](https://mikro-orm.io/docs/next/guide/first-entity#why-is-request-context-needed "Direct link to Why is Request Context needed?")
Now back to the validation error about global context. With the freshly gained knowledge, we know [`EntityManager`](https://mikro-orm.io/api/core/class/EntityManager) maintains a reference to all the managed entities in the Identity Map. Imagine we would use a single Identity Map throughout our application (so a single global context, global [`EntityManager`](https://mikro-orm.io/api/core/class/EntityManager)). It will be shared across all request handlers, that can run in parallel.
  1. growing memory footprint
As there would be only one shared Identity Map, we can't just clear it after our request ends. There can be another request working with it so clearing the Identity Map from one request could break other requests running in parallel. This will result in a growing memory footprint, as every entity that became managed at some point in time would be kept in the Identity Map.
  2. unstable response of API endpoints
Every entity has `toJSON()` method, that automatically converts it to serialized form If we have only one shared Identity Map, the following situation may occur:
Let's say there are 2 endpoints
    1. `GET /article/:id` that returns just the article, without populating anything
    2. `GET /article-with-author/:id` that returns the article and its author populated
Now when someone requests the same article via both of those endpoints, we could end up with both returning the same output:
    1. `GET /article/1` returns `Article` without populating its property `author` property
    2. `GET /article-with-author/1` returns `Article`, this time with `author` populated
    3. `GET /article/1` returns `Article`, but this time also with `author` populated
This happens because the information about entity association being populated is stored in the Identity Map.
### Fork to the win![​](https://mikro-orm.io/docs/next/guide/first-entity#fork-to-the-win "Direct link to Fork to the win!")
So we understand the problem better now, what's the solution? The error suggests it - forking. With the `fork()` method we get a clean [`EntityManager`](https://mikro-orm.io/api/core/class/EntityManager) instance, that has a fresh Unit of Work with its own context and Identity Map.
server.ts
```
// fork first to have a separate context  
const em = orm.em.fork();  
  
// create and persist the user in the forked context  
const user = em.create(UserSchema, {  
  email: 'foo@bar.com',  
  fullName: 'Foo Bar',  
  password: '123456',  
});  
await em.flush();  
```
Running `npm start` again, you get past the global context validation error, but only to find another one:
```
TableNotFoundException: insert into `user` (`bio`, `email`, `full_name`, `password`) values ('', 'foo@bar.com', 'Foo Bar', '123456') - no such table: user  
```
We forgot to create the database schema. Fortunately, we have all the tools we need at hand. You can use the [`SchemaGenerator`](https://mikro-orm.io/api/sql/class/SqlSchemaGenerator) provided by MikroORM to create the schema, as well as to keep it in sync when you change your entities. For the initial testing, let's use the `refresh()` method, which is handy for testing - it will first drop the schema if it already exists and create it from scratch based on entity definition (metadata).
server.ts
```
// recreate the database schema  
await orm.schema.refresh();  
```
Finally, `npm start` should succeed, and if you enabled the debug mode in your config, you will see the SQL queries in the logs, as well as the `user.id` value at the very end.
```
[query] create table `user` (`id` integer not null primary key autoincrement, `full_name` text not null, `email` text not null, `password` text not null, `bio` text not null); [took 1 ms]  
[query] pragma foreign_keys = on; [took 0 ms]  
[query] begin  
[query] insert into `user` (`bio`, `email`, `full_name`, `password`) values ('', 'foo@bar.com', 'Foo Bar', '123456') [took 0 ms]  
[query] commit  
user id is: 1  
```
You can see the insert query being wrapped inside a transaction. That is another effect of the Unit of Work. The [`em.flush()`](https://mikro-orm.io/api/core/class/EntityManager#flush) call will perform all the queries inside a transaction. If something fails, the whole transaction will be rolled back.
### Fetching Entities[​](https://mikro-orm.io/docs/next/guide/first-entity#fetching-entities "Direct link to Fetching Entities")
We have our first entity stored in the database. To read it from there we can use `find()` and `findOne()` methods.
server.ts
```
// find user by PK, same as `em.findOne(UserSchema, { id: 1 })`  
const userById = await em.findOne(UserSchema, 1);  
// find user by email  
const userByEmail = await em.findOne(UserSchema, { email: 'foo@bar.com' });  
// find all users  
const allUsers = await em.find(UserSchema, {});  
```
We mentioned the Identity Map several times already - time to test how it works. We said the entity is managed, and the Unit of Work will track its changes, and compute them when we call `flush()`. We also said a new entity that is marked with `persist()` will become managed after flushing.
Put the following code into your `server.ts` file, right before the `orm.close()` call:
server.ts
```
// user entity is now managed, if we try to find it again, we get the same reference  
const myUser = await em.findOne(UserSchema, user.id);  
console.log('users are the same?', user === myUser)  
  
// modifying the user and flushing yields update queries  
user.bio = '...';  
await em.flush();  
```
Run the `npm start` again and verify the logs:
```
users are the same? true  
[query] begin  
[query] update `user` set `bio` = '...' where `id` = 1 [took 0 ms]  
[query] commit  
```
Next, let's try to do the same, but with an [`EntityManager`](https://mikro-orm.io/api/core/class/EntityManager) fork:
server.ts
```
// now try to create a new fork, does not matter if from `orm.em` or our existing `em` fork, as by default we get a clean one  
const em2 = em.fork();  
console.log('verify the EM ids are different:', em.id, em2.id);  
const myUser2 = await em2.findOneOrFail(UserSchema, user.id);  
console.log('users are no longer the same, as they came from different EM:', user === myUser2);  
```
Which logs the following:
```
verify the EM ids are different: 3 4  
[query] select `u0`.* from `user` as `u0` where `u0`.`id` = 1 limit 1 [took 0 ms]  
users are no longer the same, as they came from different EM: false  
```
We just used `em.findOneOrFail()` instead of `em.findOne()`, as you may have guessed, its purpose is to always return a value, or throw otherwise.
You can see there is a select query to load the user. This is because you used a new fork, that is clean by default—it has an empty Identity Map, and therefore it needs to load the entity from the database. In the previous example, you already had it present by the time you were calling `em.findOne()`. You queried the entity by its primary key, and such a query will always first check the identity map and prefer the results from it instead of querying the database.
### Refreshing loaded entities[​](https://mikro-orm.io/docs/next/guide/first-entity#refreshing-loaded-entities "Direct link to Refreshing loaded entities")
The behavior described above is often what you want and serves as a first-level cache, but what if you always want to reload that entity, regardless of the existing state? There are several options:
> [`FindOptions`](https://mikro-orm.io/api/core/interface/FindOptions) is the last parameter of `em.find/findOne` methods.
  1. fork first, to have a clear context
  2. use `disableIdentityMap: true` in the `FindOptions`
  3. use `em.refresh(entity)`
The first two have pretty much the same effect, using `disableIdentityMap` just does the forking for us behind the scenes. Let's talk about the last one - refreshing. With `em.refresh()`, the [`EntityManager`](https://mikro-orm.io/api/core/class/EntityManager) will ignore the contents of the Identity Map and always fetch the entity from the database.
server.ts
```
// change the user  
myUser2.bio = 'changed';  
  
// reload user with `em.refresh()`  
await em2.refresh(myUser2);  
console.log('changes are lost', myUser2);  
  
// let's try again  
myUser2!.bio = 'some change, will be saved';  
await em2.flush();  
```
Running the `npm start` script again, you get the following:
```
[query] select `u0`.* from `user` as `u0` where `u0`.`id` = 1 limit 1 [took 1 ms, 1 result]  
changes are lost User {  
  fullName: 'Foo Bar',  
  email: 'foo@bar.com',  
  password: '123456',  
  bio: '...',  
  id: 1  
}  
[query] begin  
[query] update `user` set `bio` = 'some change, will be saved' where `id` = 1 [took 0 ms, 1 row affected]  
[query] commit  
```
### Removing entities[​](https://mikro-orm.io/docs/next/guide/first-entity#removing-entities "Direct link to Removing entities")
We touched on creating, reading and updating entities, the last piece of the puzzle to the CRUD riddle is the delete operation. To delete entities via [`EntityManager`](https://mikro-orm.io/api/core/class/EntityManager), we have two possibilities:
  1. Mark entity instance via `em.remove()` - this means we first need to have the entity instance. But don't worry, you can get one even without loading it from the database - via [`em.getReference()`](https://mikro-orm.io/api/core/class/EntityManager#getReference).
  2. Fire `DELETE` query via `em.nativeDelete()` - when all you want is a simple delete query, it can be simple as that.
Let's test the first approach with removing by entity instance:
server.ts
```
// finally, remove the entity  
await em2.remove(myUser3!).flush();  
```
### Entity references[​](https://mikro-orm.io/docs/next/guide/first-entity#entity-references "Direct link to Entity references")
So what does the [`em.getReference()`](https://mikro-orm.io/api/core/class/EntityManager#getReference) method mentioned above do and what is an _entity reference_ in the first place?
MikroORM represents every entity as an object, even those that are not fully loaded. Those are called entity references - they are in fact regular entity class instances, but only with their primary key available. This makes it possible to create them without querying the database. References are stored in the identity map just like any other entity.
An alternative to the previous code snippet could be as well this:
```
const userRef = em.getReference(UserSchema, 1);  
await em.remove(userRef).flush();  
```
This concept is especially important for relationships and can be combined with the so-called `Reference` wrapper for added type safety, but we will get to that later.
### Entity state and `WrappedEntity`[​](https://mikro-orm.io/docs/next/guide/first-entity#entity-state-and-wrappedentity "Direct link to entity-state-and-wrappedentity")
We just said that entity reference is a regular entity, but only with a primary key. How does it work? During entity discovery (which happens when you call `MikroORM.init()`), the ORM will patch the entity prototype and generate a lazy getter for the `WrappedEntity` - a class holding various metadata and state information about the entity. Each entity instance will have one, available under a hidden `__helper` property - to access its API in a type-safe way, use the `wrap()` helper:
```
import { wrap } from '@mikro-orm/core';  
  
const userRef = em.getReference(UserSchema, 1);  
console.log('userRef is initialized:', wrap(userRef).isInitialized());  
  
await wrap(userRef).init();  
console.log('userRef is initialized:', wrap(userRef).isInitialized());  
```
The `WrappedEntity` instance also holds the state of the entity at the time it was loaded or flushed - this state is then used by the Unit of Work during flush to compute the differences. Another use case is serialization, we can use the `toObject()`, `toPOJO()` and `toJSON()` methods to convert the entity instance to a plain JavaScript object.
## Alternative Approaches[​](https://mikro-orm.io/docs/next/guide/first-entity#alternative-approaches "Direct link to Alternative Approaches")
In this guide, we use `defineEntity` with `InferEntity` for type inference, and `setClass` when custom methods are needed. However, MikroORM supports multiple ways to define entities:
### Using Decorators[​](https://mikro-orm.io/docs/next/guide/first-entity#using-decorators "Direct link to Using Decorators")
You can define entities using class decorators like `@Entity()`, `@Property()`, `@ManyToOne()`, etc. MikroORM v7 supports both legacy (experimental) decorators and the new ES spec decorators:
```
// Legacy decorators (requires experimentalDecorators)  
import { Entity, PrimaryKey, Property } from '@mikro-orm/decorators/legacy';  
  
// ES spec decorators (no config needed)  
import { Entity, PrimaryKey, Property } from '@mikro-orm/decorators/es';  
  
@Entity()  
export class User {  
  @PrimaryKey()  
  id!: number;  
  
  @Property()  
  fullName!: string;  
  
  @Property()  
  email!: string;  
}  
```
When using decorators, you'll need to choose a metadata provider to handle type inference. See the [Using Decorators](https://mikro-orm.io/docs/next/using-decorators) guide for a comprehensive overview of:
  * Legacy vs ES spec decorators and their differences
  * `TsMorphMetadataProvider` for DRY entity definitions
  * `ReflectMetadataProvider` for lightweight setup
### Folder-based Discovery[​](https://mikro-orm.io/docs/next/guide/first-entity#folder-based-discovery "Direct link to Folder-based Discovery")
Instead of explicitly listing entities, you can use glob patterns to discover entities automatically:
```
export default defineConfig({  
  entities: ['dist/**/*.entity.js'],  
  entitiesTs: ['src/**/*.entity.ts'],  
});  
```
This is particularly useful for large projects with many entities. See [Folder-based Discovery](https://mikro-orm.io/docs/next/folder-based-discovery) for details.
When using folder-based discovery in an ESM project with test runners like Vitest, you may encounter an error like `TypeError: Unknown file extension ".ts"` (ERR_UNKNOWN_FILE_EXTENSION). This happens because the dynamic import of your entities fails to resolve TypeScript files - MikroORM performs these imports internally, and tools like Vitest cannot automatically transform them.
To work around this, you can override the `dynamicImportProvider` option in your ORM config. This allows you to use an `import` call defined inside the context of your ESM application:
mikro-orm.config.ts
```
export default defineConfig({  
  // ...  
  // for vitest to get around `TypeError: Unknown file extension ".ts"` (ERR_UNKNOWN_FILE_EXTENSION)  
  dynamicImportProvider: id => import(id),  
});  
```
This tells MikroORM to use your application's import context instead of its own, allowing proper TypeScript file resolution.
Check the [Defining Entities](https://mikro-orm.io/docs/next/defining-entities) documentation for more examples of all entity definition approaches.
### Working with an Existing Database[​](https://mikro-orm.io/docs/next/guide/first-entity#working-with-an-existing-database "Direct link to Working with an Existing Database")
If you already have a database with tables and want to generate entity files from it, you can use the [Entity Generator](https://mikro-orm.io/docs/next/entity-generator). Install the `@mikro-orm/entity-generator` package and register the `EntityGenerator` extension:
```
import { EntityGenerator } from '@mikro-orm/entity-generator';  
  
export default defineConfig({  
  // ...  
  extensions: [EntityGenerator],  
});  
```
Then run it via CLI:
```
npx mikro-orm generate-entities --save --path=./src/modules  
```
This will introspect your database schema and generate entity files for each table. You can then adjust the generated files and continue with the code-first approach from there.
Alternatively, if you prefer to keep the database schema as the source of truth and regenerate entity files on every schema change, check out the [Schema First Guide](https://mikro-orm.io/docs/next/schema-first-guide).
## ⛳ Checkpoint 1[​](https://mikro-orm.io/docs/next/guide/first-entity#-checkpoint-1 "Direct link to ⛳ Checkpoint 1")
Currently, our app consists of a single `User` entity and a `server.ts` file where we tested how to work with it using [`EntityManager`](https://mikro-orm.io/api/core/class/EntityManager). You can find working StackBlitz for the current state here:
> We use in-memory database, SQLite feature available via special database name `:memory:`.
This is our [`server.ts` file](https://stackblitz.com/edit/mikro-orm-getting-started-guide-cp-1?file=src%2Fserver.ts) so far:
[](https://github.com/mikro-orm/mikro-orm/edit/master/docs/docs/guide/01-first-entity.md)
Last updated on **Mar 11, 2026** by **Martin Adámek**
[Previous Getting Started Guide](https://mikro-orm.io/docs/next/guide)[Next Chapter 2: Relationships](https://mikro-orm.io/docs/next/guide/relationships)
  * [Setting up](https://mikro-orm.io/docs/next/guide/first-entity#setting-up)
  * [Creating a new project](https://mikro-orm.io/docs/next/guide/first-entity#creating-a-new-project)
  * [ECMAScript Modules](https://mikro-orm.io/docs/next/guide/first-entity#ecmascript-modules)
  * [Configuring TypeScript](https://mikro-orm.io/docs/next/guide/first-entity#configuring-typescript)
  * [Setting up CLI](https://mikro-orm.io/docs/next/guide/first-entity#setting-up-cli)
  * [First Entity](https://mikro-orm.io/docs/next/guide/first-entity#first-entity)
    * [Using a custom class](https://mikro-orm.io/docs/next/guide/first-entity#using-a-custom-class)
    * [Defining the primary key](https://mikro-orm.io/docs/next/guide/first-entity#defining-the-primary-key)
    * [Scalar properties](https://mikro-orm.io/docs/next/guide/first-entity#scalar-properties)
  * [Initializing the ORM](https://mikro-orm.io/docs/next/guide/first-entity#initializing-the-orm)
  * [Working with Entity Manager](https://mikro-orm.io/docs/next/guide/first-entity#working-with-entity-manager)
    * [Persist and Flush](https://mikro-orm.io/docs/next/guide/first-entity#persist-and-flush)
    * [Unit of Work and Identity Map](https://mikro-orm.io/docs/next/guide/first-entity#unit-of-work-and-identity-map)
    * [Change Tracking](https://mikro-orm.io/docs/next/guide/first-entity#change-tracking)
    * [Implicit Transactions](https://mikro-orm.io/docs/next/guide/first-entity#implicit-transactions)
    * [Why is Request Context needed?](https://mikro-orm.io/docs/next/guide/first-entity#why-is-request-context-needed)
    * [Fork to the win!](https://mikro-orm.io/docs/next/guide/first-entity#fork-to-the-win)
    * [Fetching Entities](https://mikro-orm.io/docs/next/guide/first-entity#fetching-entities)
    * [Refreshing loaded entities](https://mikro-orm.io/docs/next/guide/first-entity#refreshing-loaded-entities)
    * [Removing entities](https://mikro-orm.io/docs/next/guide/first-entity#removing-entities)
    * [Entity references](https://mikro-orm.io/docs/next/guide/first-entity#entity-references)
    * [Entity state and `WrappedEntity`](https://mikro-orm.io/docs/next/guide/first-entity#entity-state-and-wrappedentity)
  * [Alternative Approaches](https://mikro-orm.io/docs/next/guide/first-entity#alternative-approaches)
    * [Using Decorators](https://mikro-orm.io/docs/next/guide/first-entity#using-decorators)
    * [Folder-based Discovery](https://mikro-orm.io/docs/next/guide/first-entity#folder-based-discovery)
    * [Working with an Existing Database](https://mikro-orm.io/docs/next/guide/first-entity#working-with-an-existing-database)
  * [⛳ Checkpoint 1](https://mikro-orm.io/docs/next/guide/first-entity#-checkpoint-1)
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
# https://mikro-orm.io/docs/next/guide/relationships
============================================================
[Skip to main content](https://mikro-orm.io/docs/next/guide/relationships#__docusaurus_skipToContent_fallback)
⭐️ If you like MikroORM, give it a star on [GitHub](https://github.com/mikro-orm/mikro-orm) and consider [sponsoring](https://github.com/sponsors/mikro-orm) its development! ⭐️
[ ![MikroORM](https://mikro-orm.io/img/logo.svg)![MikroORM](https://mikro-orm.io/img/logo-dark.svg) ](https://mikro-orm.io/)
[Next](https://mikro-orm.io/docs/next/guide/relationships)
  * [Next](https://mikro-orm.io/docs/next/guide/relationships)
  * [7.1](https://mikro-orm.io/docs/guide/relationships)
  * [7.0](https://mikro-orm.io/docs/7.0/guide/relationships)
  * [6.6](https://mikro-orm.io/docs/6.6/guide/relationships)
  * [5.9](https://mikro-orm.io/docs/5.9/installation)
[Docs](https://mikro-orm.io/docs/quick-start)[API](https://mikro-orm.io/api)[Blog](https://mikro-orm.io/blog)[Changelog](https://mikro-orm.io/changelog)
[latest: v7.1.3](https://mikro-orm.io/versions)[Discord](https://discord.gg/w8bjxFHS7X "Chat on Discord")[GitHub](https://github.com/mikro-orm/mikro-orm "View on GitHub")[Twitter](https://twitter.com/MikroORM "Twitter")
Search
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
For up-to-date documentation, see the **[latest version](https://mikro-orm.io/docs/guide/relationships)** (7.1).
  * [](https://mikro-orm.io/)
  * [Getting Started](https://mikro-orm.io/docs/next/guide)
Version: Next
On this page
# Chapter 2: Relationships
In this section, we will add more entities, define shared base properties, and create relationships between them.
## Created and updated timestamps[​](https://mikro-orm.io/docs/next/guide/relationships#created-and-updated-timestamps "Direct link to Created and updated timestamps")
Before we add more entities, let's refactor our existing `User` entity a bit. We would like to store timestamps of when the entity was created and when it was updated for the last time. With `defineEntity`, we add these using property builders:
user.entity.ts
```
createdAt: p.datetime().onCreate(() => new Date()),  
updatedAt: p.datetime().onCreate(() => new Date()).onUpdate(() => new Date()),  
```
The `.onUpdate()` callback is executed during the `flush` operation if the ORM detects the entity was updated. For create queries, `.onCreate()` is used to set the initial value.
## Base entity[​](https://mikro-orm.io/docs/next/guide/relationships#base-entity "Direct link to Base entity")
Now let's say we want to have these timestamps (and the primary key) on every entity in our app. With `defineEntity`, we can create a base entity that other entities extend. Put the following into `src/modules/common/base.entity.ts`:
base.entity.ts
```
import { defineEntity, p } from '@mikro-orm/core';  
  
export const BaseSchema = defineEntity({  
  name: 'BaseEntity',  
  abstract: true,  
  properties: {  
    id: p.integer().primary(),  
    createdAt: p.datetime().onCreate(() => new Date()),  
    updatedAt: p.datetime().onCreate(() => new Date()).onUpdate(() => new Date()),  
  },  
});  
```
This is an abstract entity (it won't have its own table). Other entities can extend it using the `extends` option:
> You can see the import with `.js` extension - this is mandatory for ESM projects. If your project is targeting CommonJS, drop it.
user.entity.ts
```
import { defineEntity, type InferEntity, p } from '@mikro-orm/core';  
import { BaseSchema } from '../common/base.entity.js';  
  
export const UserSchema = defineEntity({  
  name: 'User',  
  extends: BaseSchema,  
  properties: {  
    fullName: p.string(),  
    email: p.string(),  
    password: p.string(),  
    bio: p.text().default(''),  
  },  
});  
  
export type IUser = InferEntity<typeof UserSchema>;  
```
## More entities[​](https://mikro-orm.io/docs/next/guide/relationships#more-entities "Direct link to More entities")
Time to add the `Article` entity. It will have 4 string properties and one relationship - a ManyToOne relation pointing to the `User` entity. As you expected, it will go to the `src/modules/article/article.entity.ts` file.
article.entity.ts
```
import { defineEntity, InferEntity, p } from '@mikro-orm/core';  
import { BaseSchema } from '../common/base.entity.js';  
import { UserSchema } from '../user/user.entity.js';  
  
export const ArticleSchema = defineEntity({  
  name: 'Article',  
  extends: BaseSchema,  
  properties: {  
    slug: p.string().unique(),  
    title: p.string().index(),  
    description: p.string().length(1000),  
    text: p.text().lazy(),  
    author: () => p.manyToOne(UserSchema),  
  },  
});  
  
export type IArticle = InferEntity<typeof ArticleSchema>;  
```
Let's break this down, there are some new additions we haven't seen before:
  * `slug` property is marked as `.unique()`, this will result in a unique constraint over the column
  * `title` property is marked as `.index()`ed
  * `description` property has `.length(1000)`, the column will result in `varchar(1000)` with most SQL drivers
  * `text` property uses `.text()` for the text type, and is marked as `.lazy()`, meaning it won't be selected automatically
  * `author` property is our first relationship, defined with `p.manyToOne(UserSchema)`
Notice we use arrow functions for relations like `author: () => p.manyToOne(UserSchema)`. The arrow function wrapper is needed to handle circular references between entities.
> You can update your `mikro-orm.config.ts` to include the new `Article` entity in the `entities` array, but it is not strictly necessary. As long as the entity is part of some other discovered entity relationship, it will be discovered automatically.
## Types of relations[​](https://mikro-orm.io/docs/next/guide/relationships#types-of-relations "Direct link to Types of relations")
There are 4 types of entity relationships in MikroORM:
  * ManyToOne: Many instances of the current Entity refer to One instance of the referred Entity.
  * OneToMany: One instance of the current Entity has Many instances (references) to the referred Entity.
  * OneToOne: One instance of the current Entity refers to One instance of the referred Entity.
  * ManyToMany: Many instances of the current Entity refers to Many instances of the referred Entity.
Relations can be unidirectional and bidirectional. Unidirectional relation is defined only on one side (the owning side). Bidirectional ones are defined on both sides, while one is owning side (where references are stored), marked by `inversedBy` attribute pointing to the inverse side. On the inversed side you define it with `mappedBy` attribute pointing back to the owner.
> When modeling bidirectional relationship, you can also omit the `inversedBy` attribute, defining `mappedBy` on the inverse side is enough as it will be auto-wired.
Check the [Modeling Entity Relationships](https://mikro-orm.io/docs/next/relationships) section in the documentation for more details and examples for each of the types.
## Working with relations[​](https://mikro-orm.io/docs/next/guide/relationships#working-with-relations "Direct link to Working with relations")
Let's get back to the `server.ts` file and try a few things out with our new `Article` entity, namely with its `author` relation.
### Creating entity graph[​](https://mikro-orm.io/docs/next/guide/relationships#creating-entity-graph "Direct link to Creating entity graph")
We've been using [`em.create()`](https://mikro-orm.io/api/core/class/EntityManager#create) to create entity instances. This method allows you to create a deep entity graph, mapping foreign keys of your relations to entity references of the correct type. It will also call [`em.persist()`](https://mikro-orm.io/api/core/class/EntityManager#persist) on the created entity (unless disabled via `persistOnCreate` option).
> You can wipe most of the contents of `server.ts` file and keep only the initial part with ORM init, up to the point where the first `User` entity gets flushed, plus the `orm.close()` call at the end. We won't be using this code going forward, it is just a playground for you.
server.ts
```
// fork first to have a separate context  
const em = orm.em.fork();  
  
// create new user entity instance  
const user = em.create(UserSchema, {  
  email: 'foo@bar.com',  
  fullName: 'Foo Bar',  
  password: '123456',  
});  
  
// em.create auto-persists, so just flush  
await em.flush();  
  
// clear the context to simulate fresh request  
em.clear();  
  
// create the article instance  
const article = em.create(ArticleSchema, {  
  slug: 'foo',  
  title: 'Foo',  
  text: 'Lorem impsum dolor sit amet',  
  description: 'Foo is bar',  
  author: user.id,  
});  
  
// `em.create` calls `em.persist` automatically, so flush is enough  
await em.flush();  
console.log(article);  
```
`em.clear()`
If you carefully checked this snippet, you probably found that new mysterious [`em.clear()`](https://mikro-orm.io/api/core/class/EntityManager#clear) call. What does it do? It clears the context for the [`EntityManager`](https://mikro-orm.io/api/core/class/EntityManager), meaning it will detach all the entities it was managing. It will bring the [`EntityManager`](https://mikro-orm.io/api/core/class/EntityManager) to the same state as if you would create a fresh fork via [`em.fork()`](https://mikro-orm.io/api/core/class/EntityManager#fork). You won't usually need this in your app, but it is very handy for unit testing, to simulate new requests coming in. You may as well use forks explicitly if you want.
### Type inference with `defineEntity`[​](https://mikro-orm.io/docs/next/guide/relationships#type-inference-with-defineentity "Direct link to type-inference-with-defineentity")
One of the benefits of `defineEntity` is that optional properties are inferred automatically! When you use `.default()`, `.onCreate()`, or `.onUpdate()`, the property is automatically marked as optional in TypeScript.
In our `BaseEntity`, all three properties are optional:
  * `id` is a single numeric primary key, so auto-increment is assumed
  * `createdAt` uses `.onCreate()`
  * `updatedAt` uses `.onCreate()` and `.onUpdate()`
So TypeScript already knows these are optional in `em.create()` calls - no additional configuration needed!
Running the `npm start`, you will see the `Article` entity will get persisted and logged to the console:
```
[query] begin  
[query] insert into `article` (`author_id`, `created_at`, `description`, `slug`, `text`, `title`, `updated_at`) values (1, 1662908804371, 'Foo is bar', 'foo', 'Lorem impsum...', 'Foo', 1662908804371) [took 0 ms]  
[query] commit  
Article {  
  id: 1,  
  createdAt: 2022-09-11T15:06:44.371Z,  
  updatedAt: 2022-09-11T15:06:44.371Z,  
  slug: 'foo',  
  title: 'Foo',  
  description: 'Foo is bar',  
  text: 'Lorem impsum...',  
  author: (User) { id: 1 }  
}  
```
Remember the entity references and loaded state we discussed earlier? You can see that here in action, the `Article.author` is an entity reference with just the primary key. It is automatically logged as `(User)` so you can easily tell the loaded state of any entity, but it is in fact the very same `User` entity instance:
```
console.log('it really is a User', article.author instanceof User); // true  
console.log('but not initialized', wrap(article.author).isInitialized()); // false  
```
### Using `onCreate` for computed properties[​](https://mikro-orm.io/docs/next/guide/relationships#using-oncreate-for-computed-properties "Direct link to using-oncreate-for-computed-properties")
Every `Article` can be identified by a unique slug - a URL fragment that can be used to look up the article. Currently, it is just a regular string property, but we can do better here. The value should be always bound to the article title. For simplicity, we will use the following function:
```
function convertToSlug(text: string) {  
  return text.toLowerCase()  
             .replace(/[^\w ]+/g, '')  
             .replace(/ +/g, '-');  
}  
```
We want the URL to remain the same after the article gets created, so let's generate the slug using `.onCreate()`. Similarly, we can generate the description from the text:
article.entity.ts
```
import { defineEntity, InferEntity, p } from '@mikro-orm/core';  
import { BaseSchema } from '../common/base.entity.js';  
import { UserSchema } from '../user/user.entity.js';  
  
function convertToSlug(text: string) {  
  return text.toLowerCase()  
             .replace(/[^\w ]+/g, '')  
             .replace(/ +/g, '-');  
}  
  
export const ArticleSchema = defineEntity({  
  name: 'Article',  
  extends: BaseSchema,  
  properties: {  
    slug: p.string().unique().onCreate(article => convertToSlug(article.title)),  
    title: p.string().index(),  
    description: p.string().length(1000).onCreate(article => article.text.substring(0, 999) + '…'),  
    text: p.text().lazy(),  
    author: () => p.manyToOne(UserSchema),  
  },  
});  
  
export type IArticle = InferEntity<typeof ArticleSchema>;  
```
With `.onCreate()`, the `slug` and `description` properties are automatically optional in [`em.create()`](https://mikro-orm.io/api/core/class/EntityManager#create) - no additional type configuration needed!
```
const article = em.create(ArticleSchema, {  
  title: 'Foo is Bar',  
  text: 'Lorem impsum dolor sit amet',  
  author: user.id,  
});  
console.log(article);  
```
Running `npm start` you can see the `slug` and `description` populated with generated values:
```
Article {  
  id: 1,  
  createdAt: 2022-09-11T16:08:16.489Z,  
  updatedAt: 2022-09-11T16:08:16.489Z,  
  slug: 'foo-is-bar',  
  title: 'Foo is Bar',  
  description: 'Lorem impsum dolor sit amet…',  
  text: 'Lorem impsum dolor sit amet',  
  author: (User) { id: '1' }  
}  
```
## Populating relationships[​](https://mikro-orm.io/docs/next/guide/relationships#populating-relationships "Direct link to Populating relationships")
What if we want to fetch the `Article` together with the `author` relation? We can use `populate` hints for that:
server.ts
```
// clear the context to simulate fresh request  
em.clear();  
  
// find article by id and populate its author  
const articleWithAuthor = await em.findOne(ArticleSchema, article.id, { populate: ['author'] });  
console.log(articleWithAuthor);  
```
Run the `npm start` as usual:
```
Article {  
  id: 1,  
  createdAt: 2022-09-11T16:57:57.941Z,  
  updatedAt: 2022-09-11T16:57:57.941Z,  
  slug: 'foo-is-bar',  
  title: 'Foo is Bar',  
  description: 'Lorem impsum dolor sit amet…',  
  text: undefined,  
  author: User {  
    id: 1,  
    fullName: 'Foo Bar',  
    email: 'foo@bar.com',  
    password: '123456',  
    bio: ''  
  }  
}  
```
### Lazy scalar properties[​](https://mikro-orm.io/docs/next/guide/relationships#lazy-scalar-properties "Direct link to Lazy scalar properties")
You can see the `text` property being `undefined` - this is because we marked it as `lazy`, therefore the value is not automatically selected. If we add the `text` to populate hint, we will get the value:
server.ts
```
const articleWithAuthor = await em.findOne(ArticleSchema, article.id, {  
  populate: ['author', 'text'],  
});  
```
Or if the entity is already loaded, you can use `em.populate()`:
server.ts
```
const articleWithAuthor = await em.findOne(ArticleSchema, article.id, {  
  populate: ['author'],  
});  
await em.populate(articleWithAuthor!, ['text']);  
```
### Loading strategies[​](https://mikro-orm.io/docs/next/guide/relationships#loading-strategies "Direct link to Loading strategies")
You can see that both the `Article` and its `author` relation are loaded in a single joined query. This is thanks to the default loading strategy in MikroORM v7 called `LoadStrategy.BALANCED`. This strategy uses SQL joins for to-one relations (like ManyToOne and OneToOne) and separate queries for to-many relations (like OneToMany and ManyToMany). This approach avoids performance issues caused by cartesian products when loading collections - if you join multiple to-many relations, the result set can explode in size as rows multiply.
Since `Article.author` is a ManyToOne (to-one) relation, the balanced strategy uses a join. You can explicitly request a different strategy if needed:
  * `LoadStrategy.JOINED` - always use SQL joins for all relations
  * `LoadStrategy.SELECT_IN` - always use separate queries for all relations
server.ts
```
const articleWithAuthor = await em.findOne(ArticleSchema, article.id, {  
  populate: ['author', 'text'],  
  strategy: LoadStrategy.SELECT_IN, // use separate queries instead  
});  
```
This would produce two separate queries instead of one joined query.
> The balanced strategy provides a good default for most use cases. If you want to change the loading strategy globally, use the `loadStrategy` option in the ORM config.
### Serialization[​](https://mikro-orm.io/docs/next/guide/relationships#serialization "Direct link to Serialization")
What about the password? Seeing the logger `Article` entity with populated `author`, there is something you need to fix. You can see the user's password, in plain text! You will need to ensure it never leaks to the API response by adding `.hidden()` serialization flag. Moreover, you can mark it as `.lazy()`, just like you did with the `Article.text`, as you rarely want to select it.
user.entity.ts
```
import { defineEntity, type InferEntity, p } from '@mikro-orm/core';  
import { BaseSchema } from '../common/base.entity.js';  
  
export const UserSchema = defineEntity({  
  name: 'User',  
  extends: BaseSchema,  
  properties: {  
    fullName: p.string(),  
    email: p.string(),  
    password: p.string().hidden().lazy(),  
    bio: p.text().default(''),  
  },  
});  
  
export type IUser = InferEntity<typeof UserSchema>;  
```
After running `npm start`, when you load the `Article.author`, the password is no longer selected (thanks to `.lazy()`) and won't be serialized in API responses (thanks to `.hidden()`):
```
Article {  
  ...  
  author: User {  
    id: 1,  
    fullName: 'Foo Bar',  
    email: 'foo@bar.com',  
    bio: ''  
  }  
}  
```
The password is still stored in plain text in the database - don't worry, you will fix this shortly using `argon2` via lifecycle hooks!
## Collections: OneToMany and ManyToMany[​](https://mikro-orm.io/docs/next/guide/relationships#collections-onetomany-and-manytomany "Direct link to Collections: OneToMany and ManyToMany")
We have the `Article.author` property that defines the owning side of this relationship between `Article` and `User` entities. Now let's define the inverse side - for ManyToOne relation it is the OneToMany kind, represented by a `Collection` of `Article` entities. With `defineEntity`, you use `p.oneToMany()`:
user.entity.ts
```
export const UserSchema = defineEntity({  
  name: 'User',  
  extends: BaseSchema,  
  properties: {  
    fullName: p.string(),  
    email: p.string(),  
    password: p.string().hidden().lazy(),  
    bio: p.text().default(''),  
    articles: () => p.oneToMany(ArticleSchema).mappedBy('author'),  
  },  
});  
  
export type IUser = InferEntity<typeof UserSchema>;  
```
MikroORM represents the relation via the `Collection` class. Before diving into what it means, let's add one more entity to the `Article` module to test the ManyToMany relation too. It will be a `Tag` entity, so you can categorize the article based on some dynamically defined tags.
> The `Tag` entity semantically belongs to the `Article` module, so let's put it there, to the `src/modules/article/tag.entity.ts` file. Don't forget to add it to the `entities` array in your config!
tag.entity.ts
```
import { defineEntity, InferEntity, p } from '@mikro-orm/core';  
import { BaseSchema } from '../common/base.entity.js';  
import { ArticleSchema } from './article.entity.js';  
  
export const TagSchema = defineEntity({  
  name: 'Tag',  
  extends: BaseSchema,  
  properties: {  
    name: p.string().length(20),  
    articles: () => p.manyToMany(ArticleSchema).mappedBy('tags'),  
  },  
});  
  
export type ITag = InferEntity<typeof TagSchema>;  
```
And you need to define the owning side too, which is `Article.tags`:
article.entity.ts
```
export const ArticleSchema = defineEntity({  
  name: 'Article',  
  extends: BaseSchema,  
  properties: {  
    slug: p.string().unique().onCreate(article => convertToSlug(article.title)),  
    title: p.string().index(),  
    description: p.string().length(1000).onCreate(article => article.text.substring(0, 999) + '…'),  
    text: p.text().lazy(),  
    author: () => p.manyToOne(UserSchema),  
    tags: () => p.manyToMany(TagSchema),  
  },  
});  
```
It is enough to point to the owning side via `mappedBy` option from the inverse side (or vice versa). If you want to define the relation from owning side, use `inversedBy` option. A ManyToMany relation that does not define any of those two is always considered the owning side.
```
tags: () => p.manyToMany(TagSchema).inversedBy('articles'),  
```
### Working with collections[​](https://mikro-orm.io/docs/next/guide/relationships#working-with-collections "Direct link to Working with collections")
The `Collection` class implements the [iterable protocol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#the_iterable_protocol), so you can use `for of` loop to iterate through it.
Another way to access collection items is to use bracket syntax like when you access array items. Keep in mind that this approach will not check if the collection is initialized, while using the `getItems()` method will throw an error in this case.
> Note that array access in `Collection` is available only for reading already loaded items, you cannot add new items to `Collection` this way.
To get all entities stored in a `Collection`, you can use `getItems()` method. It will throw in case the `Collection` is not initialized. If you want to disable this validation, you can use `getItems(false)`. This will give you the entity instances managed by the identity map.
Alternatively, you can use `toArray()` which will serialize the `Collection` to an array of DTOs. Modifying those will have no effect on the actual entity instances.
`em.findOneOrFail()`
So far you used `em.findOne()` which can return `null` if the entity is not found in the database. This results in extensive usage of the non-null assertion operator in TypeScript, which can get messy. A better solution is to use `em.findOneOrFail()`, which always returns the entity or throws an error, namely an instance of `NotFoundError` provided by the ORM.
```
// clear the context to simulate fresh request  
em.clear();  
  
// populating User.articles collection  
const user = await em.findOneOrFail(UserSchema, 1, { populate: ['articles'] });  
console.log(user);  
  
// or you could lazy load the collection later via `init()` method  
if (!user.articles.isInitialized()) {  
  await user.articles.init();  
}  
  
// to ensure collection is loaded (but do nothing if it already is), use `loadItems()` method  
await user.articles.loadItems();  
  
for (const article of user.articles) {  
   console.log(article.title);  
   console.log(article.author.fullName); // the `article.author` is linked automatically thanks to the Identity Map  
}  
```
> `Collection.init()` will always query the database, while `Collection.loadItems()` does only if the collection is not yet initialized, so calling `Collection.loadItems()` is safe without previous `isInitialized()` check.
Running this, you get the following:
```
User {  
  id: 1,  
  createdAt: 2022-09-11T18:18:14.376Z,  
  updatedAt: 2022-09-11T18:18:14.376Z,  
  fullName: 'Foo Bar',  
  email: 'foo@bar.com',  
  password: undefined,  
  bio: '',  
  articles: Collection<Article> {  
    '0': Article {  
      id: 1,  
      createdAt: 2022-09-11T18:18:14.384Z,  
      updatedAt: 2022-09-11T18:18:14.384Z,  
      slug: 'foo-is-bar',  
      title: 'Foo is Bar',  
      description: 'Lorem impsum dolor sit amet…',  
      text: undefined,  
      author: [User],  
      tags: [Collection<Tag>]  
    },  
    initialized: true,  
    dirty: false  
  }  
}  
```
Now try to add some tags to the first article:
server.ts
```
// create some tags and assign them to the first article  
const [article] = user.articles;  
const newTag = em.create(TagSchema, { name: 'new' });  
const oldTag = em.create(TagSchema, { name: 'old' });  
article.tags.add(newTag, oldTag);  
await em.flush();  
console.log(article.tags);  
```
And just for the sake of it, try to remove one of the tags:
server.ts
```
// to remove items from collection, first initialize it using `init()`, `loadItems()` or `em.populate()`  
await em.populate(article, ['tags']);  
  
// remove 'old' tag by reference  
article.tags.remove(oldTag);  
  
// or via callback  
article.tags.remove(t => t.id === oldTag.id);  
  
await em.flush();  
```
Refer to the [Collections section](https://mikro-orm.io/docs/next/collections) in the docs for more information and examples.
## Cascading[​](https://mikro-orm.io/docs/next/guide/relationships#cascading "Direct link to Cascading")
When persisting or removing entities, MikroORM automatically cascades the operation to associated entities. By default, `Cascade.PERSIST` is enabled on all relations - this means that when you persist an entity, all its loaded associations are persisted too. This is why `em.create()` with nested data "just works".
You can control this behavior via the `.cascade()` builder method:
```
import { Cascade } from '@mikro-orm/core';  
  
// default: cascade persist only  
tags: () => p.manyToMany(TagSchema),  
  
// cascade both persist and remove  
tags: () => p.manyToMany(TagSchema).cascade(Cascade.PERSIST, Cascade.REMOVE),  
  
// cascade everything (persist + remove)  
tags: () => p.manyToMany(TagSchema).cascade(Cascade.ALL),  
  
// disable cascade entirely  
tags: () => p.manyToMany(TagSchema).cascade(),  
```
`Cascade.REMOVE` means removing the parent entity will also remove the related entities. Be careful with this on ManyToOne relations, as the removed entity might still be referenced elsewhere.
### Orphan removal[​](https://mikro-orm.io/docs/next/guide/relationships#orphan-removal "Direct link to Orphan removal")
In Chapter 3, when we add `Article.comments`, we use `orphanRemoval: true`. This is a more aggressive form of cascading: any entity removed from the collection will be deleted from the database entirely, rather than just having its foreign key set to `null`.
```
comments: () => p.oneToMany(CommentSchema).mappedBy('article').orphanRemoval(),  
```
This is useful when child entities have no meaning without their parent - a comment removed from an article's collection should be deleted, not left orphaned in the database.
### Propagation[​](https://mikro-orm.io/docs/next/guide/relationships#propagation "Direct link to Propagation")
MikroORM also propagates relation assignments automatically. When you set `comment.article = article`, the `article.comments` collection is updated too (and vice versa). This works for all bidirectional relations and is what makes the Identity Map consistent.
> The discovery phase (which happens during `MikroORM.init()` or `new MikroORM()`) is required for propagation to work. See the [Propagation](https://mikro-orm.io/docs/next/propagation) docs for more details.
Read more about [Cascading](https://mikro-orm.io/docs/next/cascading) in the documentation.
# Events and life cycle hooks
Time to improve the password hashing. Let's use the `argon2` package, which provides `hash` and `verify` functions. They are both async, so you cannot use `.onCreate()` directly. Instead, you need to use the lifecycle hooks via the `addHook()` method on the schema.
> Don't forget to install the `argon2` package via `npm install argon2`.
The plan is following:
  * the password will remain in plaintext when assigned via `em.create()`
  * `hashPassword` function will become an event handler via `addHook()`
  * you register it for both `beforeCreate` and `beforeUpdate` events
  * the handler receives `EventArgs` which includes `changeSet` with the computed difference
  * you check `changeSet.payload.password` to only hash when the password changed
user.entity.ts
```
import { defineEntity, type EventArgs, p } from '@mikro-orm/core';  
import { BaseSchema } from '../common/base.entity.js';  
import { ArticleSchema } from '../article/article.entity.js';  
import { hash, verify } from 'argon2';  
  
async function hashPassword(args: EventArgs<User>) {  
  // hash only if the password was changed  
  const password = args.changeSet?.payload.password;  
  
  if (typeof password === 'string') {  
    args.entity.password = await hash(password);  
  }  
}  
  
export const UserSchema = defineEntity({  
  name: 'User',  
  extends: BaseSchema,  
  properties: {  
    fullName: p.string(),  
    email: p.string(),  
    password: p.string().hidden().lazy(),  
    bio: p.text().default(''),  
    articles: () => p.oneToMany(ArticleSchema).mappedBy('author'),  
  },  
});  
  
// Extend the schema's auto-generated class to add custom methods  
export class User extends UserSchema.class {  
  async verifyPassword(password: string) {  
    return verify(this.password, password);  
  }  
}  
  
UserSchema.setClass(User);  
UserSchema.addHook('beforeCreate', hashPassword);  
UserSchema.addHook('beforeUpdate', hashPassword);  
```
Notice how we use `setClass()` to extend the schema's auto-generated class. This avoids redeclaring all properties in the class - they are inferred from the schema automatically. The `User` class only adds the `verifyPassword` method. After calling `setClass()`, MikroORM will use the custom `User` class for all entity instances, so `em.create(User, {...})` and `em.find(User, {})` both work.
> While `defineEntity` also accepts a `hooks` option, prefer using `addHook()` instead. The `hooks` option types its handlers as `EventArgs<any>`, losing type safety. With `addHook()`, the handler type is inferred from the argument, so you get proper type checking for `args.entity` and `args.changeSet`.
## ⛳ Checkpoint 2[​](https://mikro-orm.io/docs/next/guide/relationships#-checkpoint-2 "Direct link to ⛳ Checkpoint 2")
We added 2 new entities: `Article` and `Tag` and a `BaseEntity` that they extend. You can find working StackBlitz for the current state here:
> This uses an in-memory database, a SQLite feature available via special database name `:memory:`.
This is the [`server.ts` file](https://stackblitz.com/edit/mikro-orm-getting-started-guide-cp-2?file=src%2Fserver.ts) after this chapter:
[](https://github.com/mikro-orm/mikro-orm/edit/master/docs/docs/guide/02-relationships.md)
Last updated on **Mar 9, 2026** by **Martin Adámek**
[Previous Chapter 1: First Entity](https://mikro-orm.io/docs/next/guide/first-entity)[Next Chapter 3: Project Setup](https://mikro-orm.io/docs/next/guide/project-setup)
  * [Created and updated timestamps](https://mikro-orm.io/docs/next/guide/relationships#created-and-updated-timestamps)
  * [Base entity](https://mikro-orm.io/docs/next/guide/relationships#base-entity)
  * [More entities](https://mikro-orm.io/docs/next/guide/relationships#more-entities)
  * [Types of relations](https://mikro-orm.io/docs/next/guide/relationships#types-of-relations)
  * [Working with relations](https://mikro-orm.io/docs/next/guide/relationships#working-with-relations)
    * [Creating entity graph](https://mikro-orm.io/docs/next/guide/relationships#creating-entity-graph)
    * [Type inference with `defineEntity`](https://mikro-orm.io/docs/next/guide/relationships#type-inference-with-defineentity)
    * [Using `onCreate` for computed properties](https://mikro-orm.io/docs/next/guide/relationships#using-oncreate-for-computed-properties)
  * [Populating relationships](https://mikro-orm.io/docs/next/guide/relationships#populating-relationships)
    * [Lazy scalar properties](https://mikro-orm.io/docs/next/guide/relationships#lazy-scalar-properties)
    * [Loading strategies](https://mikro-orm.io/docs/next/guide/relationships#loading-strategies)
    * [Serialization](https://mikro-orm.io/docs/next/guide/relationships#serialization)
  * [Collections: OneToMany and ManyToMany](https://mikro-orm.io/docs/next/guide/relationships#collections-onetomany-and-manytomany)
    * [Working with collections](https://mikro-orm.io/docs/next/guide/relationships#working-with-collections)
  * [Cascading](https://mikro-orm.io/docs/next/guide/relationships#cascading)
    * [Orphan removal](https://mikro-orm.io/docs/next/guide/relationships#orphan-removal)
    * [Propagation](https://mikro-orm.io/docs/next/guide/relationships#propagation)
  * [⛳ Checkpoint 2](https://mikro-orm.io/docs/next/guide/relationships#-checkpoint-2)
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
# https://mikro-orm.io/docs/next/guide/project-setup
============================================================
[Skip to main content](https://mikro-orm.io/docs/next/guide/project-setup#__docusaurus_skipToContent_fallback)
⭐️ If you like MikroORM, give it a star on [GitHub](https://github.com/mikro-orm/mikro-orm) and consider [sponsoring](https://github.com/sponsors/mikro-orm) its development! ⭐️
[ ![MikroORM](https://mikro-orm.io/img/logo.svg)![MikroORM](https://mikro-orm.io/img/logo-dark.svg) ](https://mikro-orm.io/)
[Next](https://mikro-orm.io/docs/next/guide/project-setup)
  * [Next](https://mikro-orm.io/docs/next/guide/project-setup)
  * [7.1](https://mikro-orm.io/docs/guide/project-setup)
  * [7.0](https://mikro-orm.io/docs/7.0/guide/project-setup)
  * [6.6](https://mikro-orm.io/docs/6.6/guide/project-setup)
  * [5.9](https://mikro-orm.io/docs/5.9/installation)
[Docs](https://mikro-orm.io/docs/quick-start)[API](https://mikro-orm.io/api)[Blog](https://mikro-orm.io/blog)[Changelog](https://mikro-orm.io/changelog)
[latest: v7.1.3](https://mikro-orm.io/versions)[Discord](https://discord.gg/w8bjxFHS7X "Chat on Discord")[GitHub](https://github.com/mikro-orm/mikro-orm "View on GitHub")[Twitter](https://twitter.com/MikroORM "Twitter")
Search
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
For up-to-date documentation, see the **[latest version](https://mikro-orm.io/docs/guide/project-setup)** (7.1).
  * [](https://mikro-orm.io/)
  * [Getting Started](https://mikro-orm.io/docs/next/guide)
Version: Next
On this page
# Chapter 3: Project Setup
So far you were just toying around with your entities, let's start building something real. As mentioned earlier, you will use Fastify as a web server, and Vitest for testing it. Let's set that up, create your first endpoint and test it.
## Fastify[​](https://mikro-orm.io/docs/next/guide/project-setup#fastify "Direct link to Fastify")
Let's create new file `app.ts` inside `src` directory, and export a `bootstrap` function from it, where you create the fastify app instance. Remember how you were forking the [`EntityManager`](https://mikro-orm.io/api/core/class/EntityManager) to get around the global context validation? For web servers, you can leverage middlewares, or in fastify hooks, to achieve unique request contexts automatically. MikroORM provides a handy helper called `RequestContext` which can be used to create the fork for each request. The [`EntityManager`](https://mikro-orm.io/api/core/class/EntityManager) is aware of this class and tries to get the right context from it automatically.
`RequestContext` helper work?
Internally all [`EntityManager`](https://mikro-orm.io/api/core/class/EntityManager) methods that work with the Identity Map (e.g. [`em.find()`](https://mikro-orm.io/api/core/class/EntityManager#find) or [`em.getReference()`](https://mikro-orm.io/api/core/class/EntityManager#getReference)) first call `em.getContext()` to access the contextual fork. This method will first check if the code is running inside `RequestContext` handler and prefer the [`EntityManager`](https://mikro-orm.io/api/core/class/EntityManager) fork from it.
```
// we call em.find() on the global EM instance  
const res = await orm.em.find(Book, {});  
  
// but under the hood this resolves to  
const res = await orm.em.getContext().find(Book, {});  
  
// which then resolves to  
const res = await RequestContext.getEntityManager().find(Book, {});  
```
The `RequestContext.getEntityManager()` method then checks `AsyncLocalStorage` static instance used for creating new EM forks in the `RequestContext.create()` method.
The [`AsyncLocalStorage`](https://nodejs.org/api/async_context.html#class-asynclocalstorage) class from Node.js core is the magician here. It allows us to track the context throughout the async calls. It allows us to decouple the [`EntityManager`](https://mikro-orm.io/api/core/class/EntityManager) fork creation (usually in a middleware as shown in the previous section) from its usage through the global [`EntityManager`](https://mikro-orm.io/api/core/class/EntityManager) instance.
app.ts
```
import { MikroORM, RequestContext } from '@mikro-orm/core';  
import { fastify } from 'fastify';  
import config from './mikro-orm.config.js';  
  
export async function bootstrap(port = 3001) {  
  const orm = await MikroORM.init(config);  
  const app = fastify();  
  
  // register request context hook  
  app.addHook('onRequest', (request, reply, done) => {  
    RequestContext.create(orm.em, done);  
  });  
  
  // shut down the connection when closing the app  
  app.addHook('onClose', async () => {  
    await orm.close();  
  });  
  
  // register routes here  
  // ...  
  
  const url = await app.listen({ port });  
  
  return { app, url };  
}  
```
And use this function in the `server.ts` file - you can wipe all the code you had so far and replace it with the following:
server.ts
```
import { bootstrap }  from './app.js';  
  
try {  
  const { url } = await bootstrap();  
  console.log(`server started at ${url}`);  
} catch (e) {  
  console.error(e);  
}  
```
Now hitting the `npm start` again, you should see something like this:
```
[info] MikroORM version: 7.0.0  
[discovery] ORM entity discovery started  
[discovery] - processing entity User  
[discovery] - processing entity Article  
[discovery] - processing entity Tag  
[discovery] - processing entity BaseEntity  
[discovery] - entity discovery finished, found 5 entities, took 5 ms  
[info] MikroORM successfully connected to database sqlite.db  
server started at http://127.0.0.1:3001  
```
The server is running, good! To stop it, press `CTRL + C`.
### User profile endpoint[​](https://mikro-orm.io/docs/next/guide/project-setup#user-profile-endpoint "Direct link to User profile endpoint")
Let's add the first endpoint - `GET /article` which lists all existing articles. It is a public endpoint that can take `limit` and `offset` query parameters and return requested items together with the total count of all available articles.
You could use `em.count()` to get the number of entities, but since you want to return the count next to the paginated list of entities, there's a better way - `em.findAndCount()`. This method serves exactly this purpose, retuning the paginated list with the total count of items.
app.ts
```
app.get('/article', async request => {  
  const { limit, offset } = request.query as { limit?: number; offset?: number };  
  const [items, total] = await orm.em.findAndCount(ArticleSchema, {}, {  
    limit, offset,  
  });  
  
  return { items, total };  
});  
```
## Basic Dependency Injection container[​](https://mikro-orm.io/docs/next/guide/project-setup#basic-dependency-injection-container "Direct link to Basic Dependency Injection container")
Before getting to testing the first endpoint, let's refactor a bit to make the setup more future-proof. Add a new `src/db.ts` file, which will serve as a simple Dependency Injection (DI) container. It will export `initORM()` function that will first initialize the ORM and cache it into memory, so the following calls will return the same instance. Thanks to top-level await, you could just initialize the ORM and export it right ahead, but soon you will want to alter some options before doing so, for testing purposes, and having a function like this will help in achieving that.
> Note that you are importing all of `EntityManager`, `EntityRepository`, `MikroORM`, `Options` from the `@mikro-orm/sqlite` package - those exports are typed to the `SqliteDriver`.
db.ts
```
import { EntityManager, EntityRepository, MikroORM, Options } from '@mikro-orm/sqlite';  
import { UserSchema, type User } from './modules/user/user.entity.js';  
import { ArticleSchema, type IArticle } from './modules/article/article.entity.js';  
import { TagSchema, type ITag } from './modules/article/tag.entity.js';  
import config from './mikro-orm.config.js';  
  
export interface Services {  
  orm: MikroORM;  
  em: EntityManager;  
  article: EntityRepository<IArticle>;  
  user: EntityRepository<User>;  
  tag: EntityRepository<ITag>;  
}  
  
let cache: Services;  
  
export function initORM(options?: Partial<Options>): Services {  
  if (cache) {  
    return cache;  
  }  
  
  const orm = new MikroORM({  
    ...config,  
    ...options,  
  });  
  
  // save to cache before returning  
  return cache = {  
    orm,  
    em: orm.em,  
    article: orm.em.getRepository(ArticleSchema),  
    user: orm.em.getRepository(UserSchema),  
    tag: orm.em.getRepository(TagSchema),  
  };  
}  
```
And use it in the `app.ts` file instead of initializing the ORM directly:
app.ts
```
import { RequestContext } from '@mikro-orm/core';  
import { fastify } from 'fastify';  
import { initORM } from './db.js';  
  
export async function bootstrap(port = 3001) {  
  const db = initORM();  
  const app = fastify();  
  
  // register request context hook  
  app.addHook('onRequest', (request, reply, done) => {  
    RequestContext.create(db.em, done);  
  });  
  
  // shut down the connection when closing the app  
  app.addHook('onClose', async () => {  
    await db.orm.close();  
  });  
  
  // register routes here  
  app.get('/article', async request => {  
    const { limit, offset } = request.query as { limit?: number; offset?: number };  
    const [items, total] = await db.article.findAndCount({}, {  
      limit, offset,  
    });  
  
    return { items, total };  
  });  
  
  const url = await app.listen({ port });  
  
  return { app, url };  
}  
```
`EntityManager` and `EntityRepository` from driver package
While [`EntityManager`](https://mikro-orm.io/api/core/class/EntityManager) and [`EntityRepository`](https://mikro-orm.io/api/core/class/EntityRepository) classes are provided by the `@mikro-orm/core` package, those are only the base - driver agnostic - implementations. One example of what that means is the `QueryBuilder` - as an SQL concept, it has no place in the `@mikro-orm/core` package, instead, an extension of the [`EntityManager`](https://mikro-orm.io/api/core/class/EntityManager) called `SqlEntityManager` is provided by the SQL driver packages (it is defined in `@mikro-orm/sql` package and reexported in every SQL driver packages that depend on it). This `SqlEntityManager` class provides the additional SQL related methods, like `em.createQueryBuilder()`.
For convenience, the `SqlEntityManager` class is also reexported under [`EntityManager`](https://mikro-orm.io/api/core/class/EntityManager) alias. This means you can do `import { EntityManager } from '@mikro-orm/sqlite'` to access it.
Under the hood, MikroORM will always use this driver-specific [`EntityManager`](https://mikro-orm.io/api/core/class/EntityManager) implementation (you can verify that by `console.log(orm.em)`, it will be an instance of `SqlEntityManager`), but for TypeScript to understand it, you will need to use the driver package to import it. The same applies to the [`EntityRepository`](https://mikro-orm.io/api/core/class/EntityRepository) and `SqlEntityRepository` classes.
```
import { EntityManager, EntityRepository } from '@mikro-orm/sqlite'; // or any other driver package  
```
You can also use `MikroORM`, `defineConfig` and `Options` exported from the driver package, it works similarly, providing the driver type without the need to use generics.
### What is `EntityRepository`[​](https://mikro-orm.io/docs/next/guide/project-setup#what-is-entityrepository "Direct link to what-is-entityrepository")
Entity repositories are thin layers on top of [`EntityManager`](https://mikro-orm.io/api/core/class/EntityManager). They act as an extension point, so you can add custom methods, or even alter the existing ones. The default [`EntityRepository`](https://mikro-orm.io/api/core/class/EntityRepository) implementation just forwards the calls to the underlying [`EntityManager`](https://mikro-orm.io/api/core/class/EntityManager) instance.
[`EntityRepository`](https://mikro-orm.io/api/core/class/EntityRepository) class carries the entity type, so you do not have to pass it to every `find` or `findOne` calls.
Note that there is no such thing as "flushing a repository" - it is just a shortcut to [`em.flush()`](https://mikro-orm.io/api/core/class/EntityManager#flush). In other words, we always flush the whole Unit of Work, not just a single entity that this repository represents.
## Testing the endpoint[​](https://mikro-orm.io/docs/next/guide/project-setup#testing-the-endpoint "Direct link to Testing the endpoint")
The first endpoint is ready, let's test it. You already have `vitest` installed and available via `npm test`, now add a test case. Put it into the `test` folder and name the file with `.test.ts` extension so `vitest` knows it is a test file.
So how should you test the endpoint? Fastify offers an easy way to test endpoints via `app.inject()`, all you need to do is create the fastify app instance inside the test case (you already have the `bootstrap` method for that). But that would be testing against your production database, you don't want that!
Let's create one more utility file before getting to the first test, and put it into the `test` folder too, but without the `.test.ts` suffix - let's call it `utils.ts`. You will define a function called `initTestApp` that initializes the ORM with overridden options for testing, create the schema and bootstrap your fastify app, all in one go. It will take the `port` number as a parameter, again to allow easy parallel runs when testing - every test case will have its own in-memory database and a fastify app running on its own port.
utils.ts
```
import { bootstrap } from '../src/app.js';  
import { initORM } from '../src/db.js';  
import config from '../src/mikro-orm.config.js';  
  
export async function initTestApp(port: number) {  
  // this will create all the ORM services and cache them  
  const { orm } = initORM({  
    // first, include the main config  
    ...config,  
    // no need for debug information, it would only pollute the logs  
    debug: false,  
    // use in-memory database, this way tests can easily be parallelized  
    dbName: ':memory:',  
  });  
  
  // create the schema so the database can be used  
  await orm.schema.create();  
  
  const { app } = await bootstrap(port);  
  
  return app;  
}  
```
And now the test case, finally. Currently, there is no data as you are using an empty in-memory database, fresh for each test run, so the article listing endpoint will return just an empty array - you will handle that in a moment.
> Notice that you are using `beforeAll` hook to initialize the app and `afterAll` to tear it down - the `app.close()` will result in the `onClose` hook that calls `orm.close()`. Without that, the process would hang.
article.test.ts
```
import { afterAll, beforeAll, expect, test } from 'vitest';  
import { FastifyInstance } from 'fastify';  
import { initTestApp } from './utils.js';  
  
let app: FastifyInstance;  
  
beforeAll(async () => {  
  // use different ports to allow parallel testing  
  app = await initTestApp(30001);  
});  
  
afterAll(async () => {  
  // we close only the fastify app - it will close the database connection via onClose hook automatically  
  await app.close();  
});  
  
test('list all articles', async () => {  
  // mimic the http request via `app.inject()`  
  const res = await app.inject({  
    method: 'get',  
    url: '/article',  
  });  
  
  // assert it was successful response  
  expect(res.statusCode).toBe(200);  
  
  // with expected shape  
  expect(res.json()).toMatchObject({  
    items: [],  
    total: 0,  
  });  
});  
```
Now run `npm test`, you should be good to go:
```
 ✓ test/article.test.ts (1)  
  
Test Files  1 passed (1)  
    Tests  1 passed (1)  
  Start at  15:56:41  
  Duration  876ms (transform 264ms, setup 0ms, collect 300ms, tests 147ms)  
  
  
 PASS  Waiting for file changes...  
     press h to show help, press q to quit  
```
### Note about unit tests[​](https://mikro-orm.io/docs/next/guide/project-setup#note-about-unit-tests "Direct link to Note about unit tests")
It might be tempting to skip the `MikroORM.init()` phase in some of your unit tests that do not require database connection, but the `init` method is **doing more** than just establishing that. The most important part of that method is metadata discovery, where the ORM checks all the entity definitions and sets up the default values for various metadata options (mainly for naming strategy and bidirectional relations).
The discovery phase is **required for[propagation](https://mikro-orm.io/docs/next/propagation) to work**.
```
const orm = new MikroORM({  
  // ...  
});  
```
## Seeding the database[​](https://mikro-orm.io/docs/next/guide/project-setup#seeding-the-database "Direct link to Seeding the database")
There are many ways how to go about seeding your testing database. The obvious way is to do it directly in your test, for example in the `beforeAll` hook, right after you initialize the ORM.
One alternative to that is using the Seeder, an ORM package (available via `@mikro-orm/seeder`), which offers utilities to populate your database with (not necessarily) fake data.
> You will be using Seeder for populating the test database with fake data, but it is a valid approach to have a seeder that creates initial data for a production database too - you could create the default set of article tags this way, or the initial admin user. You can set up a hierarchy of seeders or call them one by one.
Let's install the seeder package and use the CLI to generate a test seeder:
  * npm
  * Yarn
  * pnpm
  * Bun
```
npm install @mikro-orm/seeder  
```
```
yarn add @mikro-orm/seeder  
```
```
pnpm add @mikro-orm/seeder  
```
```
bun add @mikro-orm/seeder  
```
Next step will be to register the SeedManager extension in your ORM config, this will make it available via `orm.seeder` property:
```
import { defineConfig } from '@mikro-orm/sqlite';  
import { SeedManager } from '@mikro-orm/seeder';  
  
export default defineConfig({  
  // ...  
  extensions: [SeedManager],  
});  
```
> Other extensions you can use are `SchemaGenerator`, `Migrator` and `EntityGenerator`. The `SchemaGenerator` (as well as `MongoSchemaGenerator`) is registered automatically as it does not require any 3rd party dependencies to be installed.
Now let's try to create a new seeder named `test`:
```
npx mikro-orm seeder:create test  
```
This will create `src/seeders` directory and a `TestSeeder.ts` file inside it, with a skeleton of your new seeder:
TestSeeder.ts
```
import type { EntityManager } from '@mikro-orm/core';  
import { Seeder } from '@mikro-orm/seeder';  
  
export class TestSeeder extends Seeder {  
  
  async run(em: EntityManager): Promise<void> {}  
  
}  
```
You can use the [`em.create()`](https://mikro-orm.io/api/core/class/EntityManager#create) function described earlier. It effectively calls `em.persist(entity)` before it returns the created entity, so you don't even need to do anything with the entity itself, calling [`em.create()`](https://mikro-orm.io/api/core/class/EntityManager#create) on its own will be enough. Time to test it!
TestSeeder.ts
```
export class TestSeeder extends Seeder {  
  
  async run(em: EntityManager): Promise<void> {  
    em.create(UserSchema, {  
      fullName: 'Foo Bar',  
      email: 'foo@bar.com',  
      password: 'password123',  
      articles: [  
        {  
          title: 'title 1/3',  
          description: 'desc 1/3',  
          text: 'text text text 1/3',  
          tags: [{ id: 1, name: 'foo1' }, { id: 2, name: 'foo2' }],  
        },  
        {  
          title: 'title 2/3',  
          description: 'desc 2/3',  
          text: 'text text text 2/3',  
          tags: [{ id: 2, name: 'foo2' }],  
        },  
        {  
          title: 'title 3/3',  
          description: 'desc 3/3',  
          text: 'text text text 3/3',  
          tags: [{ id: 2, name: 'foo2' }, { id: 3, name: 'foo3' }],  
        },  
      ],  
    });  
  }  
  
}  
```
Then you need to run the `TestSeeder`, let's do that in your `initTestApp` helper, right after calling `orm.schema.create()`:
utils.ts
```
await orm.schema.create();  
await orm.seeder.seed(TestSeeder);  
```
And adjust the test assertion, as you now get 3 articles in the feed:
article.test.ts
```
expect(res.json()).toMatchObject({  
  items: [  
    { author: 1, slug: 'title-13', title: 'title 1/3' },  
    { author: 1, slug: 'title-23', title: 'title 2/3' },  
    { author: 1, slug: 'title-33', title: 'title 3/3' },  
  ],  
  total: 3,  
});  
```
Now run `npm test` to verify things work as expected.
That should be enough for now, but don't worry, you will get back to this topic later on.
## SchemaGenerator[​](https://mikro-orm.io/docs/next/guide/project-setup#schemagenerator "Direct link to SchemaGenerator")
Earlier in the guide, when you needed to create the database for testing, you used the `SchemaGenerator` to recreate the database. Let's talk a bit more about this class.
[`SchemaGenerator`](https://mikro-orm.io/docs/next/schema-generator) is responsible for generating the SQL queries based on your entity metadata. In other words, it translates the entity definition into the Data Definition Language (DDL). Moreover, it can also understand your current database schema and compare it with the metadata, resulting in queries needed to put your schema in sync.
It can be used programmatically:
```
// to get the queries  
const diff = await orm.schema.getUpdateSchemaSQL();  
console.log(diff);  
  
// or to run the queries  
await orm.schema.update();  
```
> With the `orm.schema.update()` you could easily set up the same behavior as TypeORM has via `synchronize: true`, just put that into your app right after the ORM gets initialized (or into some app bootstrap code). Keep in mind this approach can be destructive and is discouraged - you should always verify what queries the `SchemaGenerator` produced before you run them!
Or via CLI:
> To run the queries, replace `--dump` with `--run`.
```
npx mikro-orm schema:create --dump  # Dumps create schema SQL  
npx mikro-orm schema:update --dump  # Dumps update schema SQL  
npx mikro-orm schema:drop --dump    # Dumps drop schema SQL  
```
Your production database (the one in `sqlite.db` file in the root of your project) is probably out of sync, as you were mostly using the in-memory database inside the tests. Let's try to sync it via the CLI. First, run it with the `--dump` (or `-d`) flag to see what queries it generates, then run them via `--run` (or `-r`):
```
# first check what gets generated  
npx mikro-orm schema:update --dump  
  
# and when its fine, sync the schema  
npx mikro-orm schema:update --run  
```
> If this command does not work and produces some invalid queries, you can always recreate the schema from scratch, by first calling `schema:drop --run`.
Working with `SchemaGenerator` can be handy when prototyping the initial app, or especially when testing, where you might want to have many databases with the latest schema, regardless of how your production schema looks like. But beware, it can be very dangerous when used on a real production database. Luckily, there's a solution for that - the migrations.
## Migrations[​](https://mikro-orm.io/docs/next/guide/project-setup#migrations "Direct link to Migrations")
> To use migrations you first need to install `@mikro-orm/migrations` package for SQL drivers (or `@mikro-orm/migrations-mongodb` for MongoDB), and register the `Migrator` extension in your ORM config.
MikroORM has integrated support for migrations. It allows you to generate migrations with current schema differences, as well as manage their execution. By default, each migration will be executed inside a transaction, and all of them will be wrapped in one master transaction, so if one of them fails, everything will be rolled back.
Let's install the migrations package and try to create your first migration:
  * npm
  * Yarn
  * pnpm
  * Bun
```
npm install @mikro-orm/migrations  
```
```
yarn add @mikro-orm/migrations  
```
```
pnpm add @mikro-orm/migrations  
```
```
bun add @mikro-orm/migrations  
```
Then register the `Migrator` extension in your ORM config:
```
import { defineConfig } from '@mikro-orm/sqlite';  
import { SeedManager } from '@mikro-orm/seeder';  
import { Migrator } from '@mikro-orm/migrations';  
  
export default defineConfig({  
  // ...  
  extensions: [SeedManager, Migrator],  
});  
```
And finally try to create your first migration:
```
npx mikro-orm migration:create  
```
If you followed the guide closely, you should see this message:
```
No changes required, schema is up-to-date  
```
That is because you just synchronized the schema by calling `npx mikro-orm schema:update --run` a moment ago. You have two options here, drop the schema first, or a less destructive one - an initial migration.
### Initial migration[​](https://mikro-orm.io/docs/next/guide/project-setup#initial-migration "Direct link to Initial migration")
If you want to start using migrations, and you already have the schema generated, the `--initial` flag will help with keeping the existing schema, while generating the first migration based only on the entity metadata. It can be used only if the schema is empty or fully up-to-date. The generated migration will be automatically marked as executed if your schema already exists - if not, you will need to execute it manually as any other migration, via `npx mikro-orm migration:up`.
> Initial migration can be created only if there are no migrations previously generated or executed. If you are starting fresh, and you have no schema yet, you don't need to use the `--inital` flag, a regular migration will do the job too.
```
npx mikro-orm migration:create --initial  
```
This will create the initial migration in the `src/migrations` directory, containing queries from `schema:create` command. The migration will be automatically marked as executed because your schema was already in sync.
### Migration class[​](https://mikro-orm.io/docs/next/guide/project-setup#migration-class "Direct link to Migration class")
Let's take a look at the generated migration. You can see there is a class that extends the `Migration` abstract class from the `@mikro-orm/migrations` package:
Migration20220913202829.ts
```
import { Migration } from '@mikro-orm/migrations';  
  
export class Migration20220913202829 extends Migration {  
  
  async up(): Promise<void> {  
    this.addSql('create table `tag` (`id` integer not null primary key autoincrement, `created_at` datetime not null, `updated_at` datetime not null, `name` text not null);');  
    // ...  
  }  
  
}  
```
To support undoing those changed, you can implement the `down` method, which throws an error by default.
MikroORM will generate the down migrations automatically (although not for the initial migration, for security concerns), with one exception - the SQLite driver, due to its limited capabilities. If you use any other driver, a down migration will be generated (unless it's an initial migration).
> You can also execute queries inside the `up()`/`down()` method via `this.execute('...')`, which will run queries in the same transaction as the rest of the migration. The `this.addSql('...)` method also accepts instances of the native query builder or `raw()` SQL fragments.
Read more about migrations in the [documentation](https://mikro-orm.io/docs/next/migrations).
### One more entity[​](https://mikro-orm.io/docs/next/guide/project-setup#one-more-entity "Direct link to One more entity")
The migrations are set up, let's test them by adding one more entity - the `Comment`, again belonging to the article module, so it goes into `src/modules/article/comment.entity.ts`.
comment.entity.ts
```
import { defineEntity, type InferEntity, p } from '@mikro-orm/core';  
import { ArticleSchema } from './article.entity.js';  
import { UserSchema } from '../user/user.entity.js';  
import { BaseSchema } from '../common/base.entity.js';  
  
export const CommentSchema = defineEntity({  
  name: 'Comment',  
  extends: BaseSchema,  
  properties: {  
    text: p.string(),  
    article: () => p.manyToOne(ArticleSchema).ref(),  
    author: () => p.manyToOne(UserSchema).ref(),  
  },  
});  
  
export type IComment = InferEntity<typeof CommentSchema>;  
```
and a OneToMany inverse side in `Article` entity:
```
comments: () => p.oneToMany(CommentSchema).mappedBy('article').eager().orphanRemoval(),  
```
Don't forget to add the repository to your simple DI container too:
```
export interface Services {  
  orm: MikroORM;  
  em: EntityManager;  
  user: UserRepository;  
  article: EntityRepository<IArticle>;  
  comment: EntityRepository<IComment>;  
  tag: EntityRepository<ITag>;  
}  
  
export function initORM(options?: Partial<Options>): Services {  
  // ...  
  
  return cache = {  
   orm,  
   em: orm.em,  
   user: orm.em.getRepository(UserSchema),  
   article: orm.em.getRepository(ArticleSchema),  
   comment: orm.em.getRepository(CommentSchema),  
   tag: orm.em.getRepository(TagSchema),  
  };  
}  
```
> This uses two new builder methods, `.eager()` and `.orphanRemoval()`:
>   * `.eager()` will automatically populate this relation, just like if you would use `populate: ['comments']` explicitly.
>   * `.orphanRemoval()` is a special type of cascading, any entity removed from such collection will be deleted from the database, as opposed to being just detached from the relationship (by setting the foreign key to `null`).
> 
Now create the migration via CLI and run it. And just for the sake of testing, also try the other migration-related commands:
```
# create new migration based on the schema difference  
npx mikro-orm migration:create  
  
# list pending migrations  
npx mikro-orm migration:pending  
  
# run the pending migrations  
npx mikro-orm migration:up  
  
# list executed migrations  
npx mikro-orm migration:list  
```
You should see output similar to this:
```
npx mikro-orm migration:create  
Migration20220913205718.ts successfully created  
```
```
npx mikro-orm migration:pending  
  
┌─────────────────────────┐  
│ Name              │  
├─────────────────────────┤  
│ Migration20220913205718 │  
└─────────────────────────┘  
```
```
npx mikro-orm migration:up  
  
Processing 'Migration20220913205718'  
Applied 'Migration20220913205718'  
Successfully migrated up to the latest version  
```
```
npx mikro-orm migration:list  
  
┌─────────────────────────┬──────────────────────────┐  
│ Name              │ Executed at          │  
├─────────────────────────┼──────────────────────────┤  
│ Migration20220913202829 │ 2022-09-13T18:57:12.000Z │  
│ Migration20220913205718 │ 2022-09-13T18:57:27.000Z │  
└─────────────────────────┴──────────────────────────┘  
```
Creating new migration will automatically save the target schema snapshot into the migrations folder. This snapshot will be then used if you try to create a new migration, instead of using the current database schema. This means that if you try to create new migration before you run the pending ones, you still get the right schema diff.
> Snapshots should be versioned just like the regular migration files.
Snapshotting can be disabled via `migrations.snapshot: false` in the ORM config.
### Running migrations automatically[​](https://mikro-orm.io/docs/next/guide/project-setup#running-migrations-automatically "Direct link to Running migrations automatically")
Before calling it a day, let's automate running the migrations a bit - you can use the `Migrator` programmatically, in a similar way like the `SchemaGenerator`. You want to run them during your app bootstrap cycle, before it starts to accept connections, so a good place for that is your `bootstrap` function, right after you initialize the ORM.
app.ts
```
export async function bootstrap(port = 3001, migrate = true) {  
  const db = initORM();  
  
  if (migrate) {  
    // sync the schema  
    await db.orm.migrator.up();  
  }  
  
  // ...  
}  
```
You need to do this conditionally, as you want to run the migrations only for the production database, not for your testing ones (as they use the `SchemaGenerator` directly, together with the `Seeder`). Don't forget to pass `false` when calling the `bootstrap()` function from your test case:
utils.ts
```
export async function initTestApp(port: number) {  
  const { orm } = initORM({ ... });  
  
  await orm.schema.create();  
  await orm.seeder.seed(TestSeeder);  
  
  const { app } = await bootstrap(port, false); // <-- here  
  
  return app;  
}  
```
## ⛳ Checkpoint 3[​](https://mikro-orm.io/docs/next/guide/project-setup#-checkpoint-3 "Direct link to ⛳ Checkpoint 3")
You now have 4 entities, a working web app with a single get endpoint and a basic test case for it. You also set up migrations and seeding. This is your `app.ts` right now:
> This uses an in-memory database, a SQLite feature available via special database name `:memory:`.
This is the [`app.ts` file](https://stackblitz.com/edit/mikro-orm-getting-started-guide-cp-3?file=src%2Fapp.ts) after this chapter:
[](https://github.com/mikro-orm/mikro-orm/edit/master/docs/docs/guide/03-project-setup.md)
Last updated on **May 5, 2026** by **Martin Adámek**
[Previous Chapter 2: Relationships](https://mikro-orm.io/docs/next/guide/relationships)[Next Chapter 4: Advanced](https://mikro-orm.io/docs/next/guide/advanced)
  * [Fastify](https://mikro-orm.io/docs/next/guide/project-setup#fastify)
    * [User profile endpoint](https://mikro-orm.io/docs/next/guide/project-setup#user-profile-endpoint)
  * [Basic Dependency Injection container](https://mikro-orm.io/docs/next/guide/project-setup#basic-dependency-injection-container)
    * [What is `EntityRepository`](https://mikro-orm.io/docs/next/guide/project-setup#what-is-entityrepository)
  * [Testing the endpoint](https://mikro-orm.io/docs/next/guide/project-setup#testing-the-endpoint)
    * [Note about unit tests](https://mikro-orm.io/docs/next/guide/project-setup#note-about-unit-tests)
  * [Seeding the database](https://mikro-orm.io/docs/next/guide/project-setup#seeding-the-database)
  * [SchemaGenerator](https://mikro-orm.io/docs/next/guide/project-setup#schemagenerator)
  * [Migrations](https://mikro-orm.io/docs/next/guide/project-setup#migrations)
    * [Initial migration](https://mikro-orm.io/docs/next/guide/project-setup#initial-migration)
    * [Migration class](https://mikro-orm.io/docs/next/guide/project-setup#migration-class)
    * [One more entity](https://mikro-orm.io/docs/next/guide/project-setup#one-more-entity)
    * [Running migrations automatically](https://mikro-orm.io/docs/next/guide/project-setup#running-migrations-automatically)
  * [⛳ Checkpoint 3](https://mikro-orm.io/docs/next/guide/project-setup#-checkpoint-3)
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
# https://mikro-orm.io/docs/next/guide/advanced
============================================================
[Skip to main content](https://mikro-orm.io/docs/next/guide/advanced#__docusaurus_skipToContent_fallback)
⭐️ If you like MikroORM, give it a star on [GitHub](https://github.com/mikro-orm/mikro-orm) and consider [sponsoring](https://github.com/sponsors/mikro-orm) its development! ⭐️
[ ![MikroORM](https://mikro-orm.io/img/logo.svg)![MikroORM](https://mikro-orm.io/img/logo-dark.svg) ](https://mikro-orm.io/)
[Next](https://mikro-orm.io/docs/next/guide/advanced)
  * [Next](https://mikro-orm.io/docs/next/guide/advanced)
  * [7.1](https://mikro-orm.io/docs/guide/advanced)
  * [7.0](https://mikro-orm.io/docs/7.0/guide/advanced)
  * [6.6](https://mikro-orm.io/docs/6.6/guide/advanced)
  * [5.9](https://mikro-orm.io/docs/5.9/installation)
[Docs](https://mikro-orm.io/docs/quick-start)[API](https://mikro-orm.io/api)[Blog](https://mikro-orm.io/blog)[Changelog](https://mikro-orm.io/changelog)
[latest: v7.1.3](https://mikro-orm.io/versions)[Discord](https://discord.gg/w8bjxFHS7X "Chat on Discord")[GitHub](https://github.com/mikro-orm/mikro-orm "View on GitHub")[Twitter](https://twitter.com/MikroORM "Twitter")
Search
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
For up-to-date documentation, see the **[latest version](https://mikro-orm.io/docs/guide/advanced)** (7.1).
  * [](https://mikro-orm.io/)
  * [Getting Started](https://mikro-orm.io/docs/next/guide)
Version: Next
On this page
# Chapter 4: Advanced
In this chapter, you will first implement all the methods of `/user` endpoint, including a basic JWT authentication provided via `@fastify/jwt` package, and proceed with the rest of the `/article` endpoints. This chapter touches on some of the more advanced concepts like custom repositories, virtual entities, `QueryBuilder`, flush events, and more.
## Improving route registration[​](https://mikro-orm.io/docs/next/guide/advanced#improving-route-registration "Direct link to Improving route registration")
Before jumping in and implementing the rest of the `User` and `Article` endpoint handlers, let's improve how the routes are registered. Create a `routes.ts` file in `src/modules/article`, and export a factory function from it:
modules/article/routes.ts
```
import { FastifyInstance } from 'fastify';  
import { initORM } from '../../db.js';  
  
export async function registerArticleRoutes(app: FastifyInstance) {  
  const db = initORM();  
  
  app.get('/', async request => {  
    const { limit, offset } = request.query as { limit?: number; offset?: number };  
    const [items, total] = await db.article.findAndCount({}, {  
      limit, offset,  
    });  
  
    return { items, total };  
  });  
}  
```
And create a placeholder for the `User` module too, in the `src/modules/user` folder:
modules/user/routes.ts
```
import { FastifyInstance } from 'fastify';  
import { initORM } from '../../db.js';  
  
export async function registerUserRoutes(app: FastifyInstance) {  
  // no routes yet  
}  
```
Now use them in your `bootstrap` function via `app.register()` method:
```
// register routes here  
-app.get('/article', async request => {  
-  ...  
-});  
+app.register(registerArticleRoutes, { prefix: 'article' });  
+app.register(registerUserRoutes, { prefix: 'user' });  
```
## Sign-up route[​](https://mikro-orm.io/docs/next/guide/advanced#sign-up-route "Direct link to Sign-up route")
Time to add the first `User` endpoint, for registering new users. It will be a `POST` endpoint, which will accept an object payload with `email`, `fullName` and `password` properties:
modules/user/routes.ts
```
export async function registerUserRoutes(app: FastifyInstance) {  
  const db = initORM();  
  
  // register new user  
  app.post('/sign-up', async request => {  
    const body = request.body as EntityData<User>;  
  
    if (!body.email || !body.fullName || !body.password) {  
      throw new Error('One of required fields is missing: email, fullName, password');  
    }  
  
    if ((await db.user.count({ email: body.email })) > 0) {  
      throw new Error('This email is already registered, maybe you want to sign in?');  
    }  
  
    const user = db.user.create({  
      fullName: body.fullName,  
      email: body.email,  
      password: body.password,  
      bio: body.bio ?? '',  
    });  
    await db.em.flush();  
  
    // after flush, we have the `user.id` set  
    console.log(`User ${user.id} created`);  
  
    return user;  
  });  
}  
```
## Custom repositories[​](https://mikro-orm.io/docs/next/guide/advanced#custom-repositories "Direct link to Custom repositories")
The check for existing users looks a bit too complex, let's create a custom repository method instead to make things more readable and maintainable.
modules/user/user.repository.ts
```
import { EntityRepository } from '@mikro-orm/sqlite';  
import { User } from './user.entity.js';  
  
export class UserRepository extends EntityRepository<User> {  
  
  async exists(email: string) {  
    const count = await this.count({ email });  
    return count > 0;  
  }  
  
}  
```
And use this repository in the `defineEntity` options. The `repository` option links the entity to your custom repository class:
user.entity.ts
```
import { defineEntity, type InferEntity, p } from '@mikro-orm/core';  
import { BaseSchema } from '../common/base.entity.js';  
import { UserRepository } from './user.repository.js';  
  
export const UserSchema = defineEntity({  
  name: 'User',  
  extends: BaseSchema,  
  repository: () => UserRepository,  
  properties: {  
    fullName: p.string(),  
    email: p.string(),  
    password: p.string().hidden().lazy(),  
    bio: p.text().default(''),  
    articles: () => p.oneToMany(ArticleSchema).mappedBy('author'),  
  },  
  // hooks remain the same  
});  
  
// setClass from Chapter 2 remains the same  
```
And don't forget to adjust the `Services` type:
```
export interface Services {  
  orm: MikroORM;  
  em: EntityManager;  
- user: EntityRepository<User>;  
+ user: UserRepository;  
  article: EntityRepository<IArticle>;  
  tag: EntityRepository<ITag>;  
}  
```
Now you can use it in the `sign-up` endpoint:
```
-if ((await db.user.count({ email: body.email })) > 0) {  
+if (await db.user.exists(body.email)) {  
  throw new Error('This email is already registered, maybe you want to sign in?');  
}  
```
## Authentication[​](https://mikro-orm.io/docs/next/guide/advanced#authentication "Direct link to Authentication")
Time to add the second `User` route, this time for logging in. Modify `routes.ts` again. Let's again use a custom repository method for the `login`, which will be implemented in a second:
modules/user/routes.ts
```
export async function registerUserRoutes(app: FastifyInstance) {  
  const db = initORM();  
  
  // register new user  
  app.post('/sign-up', async request => {  
    // ...  
  });  
  
  // login existing user  
  app.post('/sign-in', async request => {  
    const { email, password } = request.body as { email: string; password: string };  
    const user = await db.user.login(email, password);  
  
    return user;  
  });  
}  
```
And now the `login` method, which will try to load the `User` entity based on the password, and compare it via the `user.verifyPassword()` method. If no such combination of the `email` and `password` is found, an error is thrown.
modules/user/user.repository.ts
```
export class UserRepository extends EntityRepository<User> {  
  
  // ...  
  
  async login(email: string, password: string) {  
    // use a more generic error so you don't leak that such email is registered  
    const err = new Error('Invalid combination of email and password');  
    const user = await this.findOneOrFail({ email }, {  
      populate: ['password'], // password is a lazy property, we need to populate it  
      failHandler: () => err,  
    });  
  
    if (await user.verifyPassword(password)) {  
      return user;  
    }  
  
    throw err;  
  }  
  
}  
```
### Testing the `User` endpoints[​](https://mikro-orm.io/docs/next/guide/advanced#testing-the-user-endpoints "Direct link to testing-the-user-endpoints")
You now have two new endpoints, so test that they work as expected. Add a new test case for the `User` endpoints:
tests/user.test.ts
```
import { FastifyInstance } from 'fastify';  
import { afterAll, beforeAll, expect, test } from 'vitest';  
import { initTestApp } from './utils.js';  
  
let app: FastifyInstance;  
  
beforeAll(async () => {  
  // using different ports to allow parallel testing  
  app = await initTestApp(30002);  
});  
  
afterAll(async () => {  
  // closing only the fastify app - it will close the database connection via onClose hook automatically  
  await app.close();  
});  
  
test('login', async () => {  
  const res1 = await app.inject({  
    method: 'post',  
    url: '/user/sign-in',  
    payload: {  
      email: 'foo@bar.com',  
      password: 'password123',  
    },  
  });  
  
  expect(res1.statusCode).toBe(200);  
  expect(res1.json()).toMatchObject({  
    fullName: 'Foo Bar',  
  });  
  
  const res2 = await app.inject({  
    method: 'post',  
    url: '/user/sign-in',  
    payload: {  
      email: 'foo@bar.com',  
      password: 'password456',  
    },  
  });  
  
  expect(res2.statusCode).toBe(401);  
  expect(res2.json()).toMatchObject({ error: 'Invalid combination of email and password' });  
});  
```
When you run it with `npm test`, you should see a failed assertion:
```
 FAIL  test/user.test.ts > login  
AssertionError: expected 500 to be 401 // Object.is equality  
  
- Expected  
+ Received  
  
- 401  
+ 500  
```
That's because this isn't handled anywhere, the code just throws an error - let's deal with that now by integrating authentication into the application.
### JSON Web Tokens[​](https://mikro-orm.io/docs/next/guide/advanced#json-web-tokens "Direct link to JSON Web Tokens")
The plan is to add an authentication layer to the API. You will need to generate an authentication token that will hold the identity - let's use so-called JSON Web Token (JWT), an industry standard. You can leverage the `@fastify/jwt` plugin for encoding/decoding them with ease.
  * npm
  * Yarn
  * pnpm
  * Bun
```
npm install @fastify/jwt  
```
```
yarn add @fastify/jwt  
```
```
pnpm add @fastify/jwt  
```
```
bun add @fastify/jwt  
```
Now register this plugin in your `bootstrap()` function:
app.ts
```
import fastifyJWT from '@fastify/jwt';  
  
// ...  
  
// register JWT plugin  
app.register(fastifyJWT, {  
  secret: process.env.JWT_SECRET ?? '12345678', // fallback for testing  
});  
```
With the JWT plugin, the `request` object has a `user` property you can use to store data about the currently logged `User`, as well as two handy methods on the `app` object:
  * `app.jwt.sign()` to create the token from a payload
  * `request.jwtVerify()` to verify and decode the token back to the payload
The token payload stores the `user.id`. Add a new property to the `UserSchema` for it:
modules/user/user.entity.ts
```
token: p.string().persist(false).nullable(),  
```
The `.persist(false)` option means the property is virtual, it does not represent a database column (but can be mapped and serialized).
Before continuing, add one more utility - a custom `AuthError` class, which can be used to detect authentication issues (e.g. wrong password).
modules/common/utils.ts
```
export class AuthError extends Error {}  
```
And use it in the `UserRepository`:
modules/user/user.repository.ts
```
import { AuthError } from '../common/utils.js';  
  
export class UserRepository extends EntityRepository<User> {  
  
  // ...  
  
  async login(email: string, password: string) {  
    // use a more generic error so you don't leak that such email is registered  
    const err = new AuthError('Invalid combination of email and password');  
    const user = await this.findOneOrFail({ email }, {  
      populate: ['password'], // password is a lazy property, we need to populate it  
      failHandler: () => err,  
    });  
  
    if (await user.verifyPassword(password)) {  
      return user;  
    }  
  
    throw err;  
  }  
  
}  
```
Now generate the token in the `sign-up` and `sign-in` handlers:
modules/user/routes.ts
```
// register new user  
app.post('/sign-up', async request => {  
  // ...  
  
  const user = db.user.create({  
    fullName: body.fullName,  
    email: body.email,  
    password: body.password,  
    bio: body.bio ?? '',  
  });  
  await db.em.flush();  
  
  user.token = app.jwt.sign({ id: user.id })  
  
  return user;  
});  
  
// login existing user  
app.post('/sign-in', async request => {  
  const { email, password } = request.body as { email: string; password: string };  
  const user = await db.user.login(email, password);  
  user.token = app.jwt.sign({ id: user.id })  
  
  return user;  
});  
```
And finally, we can add the middleware to authenticate users based on the token to the `bootstrap()` function:
app.ts
```
// register auth hook after the ORM one to use the context  
app.addHook('onRequest', async request => {  
  try {  
    const ret = await request.jwtVerify<{ id: number }>();  
    request.user = await db.user.findOneOrFail(ret.id);  
  } catch (e) {  
    app.log.error(e);  
    // ignore token errors, we validate the request.user exists only where needed  
  }  
});  
  
// register global error handler to process 404 errors from `findOneOrFail` calls  
app.setErrorHandler((error, request, reply) => {  
  if (error instanceof AuthError) {  
    return reply.status(401).send({ error: error.message });  
  }  
  
  // we also handle not found errors automatically  
  // `NotFoundError` is an error thrown by the ORM via `em.findOneOrFail()` method  
  if (error instanceof NotFoundError) {  
    return reply.status(404).send({ error: error.message });  
  }  
  
  app.log.error(error);  
  reply.status(500).send({ error: error.message });  
});  
```
And that's it, the tests should be passing now again, with a basic authentication mechanism in place! When the server detects a user token in the request headers, it will automatically load the corresponding user and store it into the `request.user` property.
Let's implement the last two endpoints for getting the current user profile and modifying it. First, create one new utility method: `getUserFromToken`.
modules/common/utils.ts
```
import { FastifyRequest } from 'fastify';  
import { User } from '../user/user.entity.js';  
  
export function getUserFromToken(req: FastifyRequest): User {  
  if (!req.user) {  
    throw new Error('Please provide your token via Authorization header');  
  }  
  
  return req.user as User;  
}  
```
And now implement the handlers:
modules/user/routes.ts
```
app.get('/profile', async request => {  
  const user = getUserFromToken(request);  
  return user;  
});  
  
app.patch('/profile', async request => {  
  const user = getUserFromToken(request);  
  wrap(user).assign(request.body as EntityData<User>);  
  await db.em.flush();  
  return user;  
});  
```
Try implementing the tests for those endpoints now!
## Embeddables[​](https://mikro-orm.io/docs/next/guide/advanced#embeddables "Direct link to Embeddables")
Before moving back to the article endpoint, let's improve the user entity a bit. Say you want to have optional social handles for twitter, facebook or linkedin on the `User` entity. You can use [Embeddables](https://mikro-orm.io/docs/next/embeddables) for this, a feature which allows mapping multiple columns to an object.
With `defineEntity`, you can define an embeddable schema and embed it in your entity:
user.entity.ts
```
import { defineEntity, InferEntity, p } from '@mikro-orm/core';  
  
// Define the embeddable schema  
export const SocialSchema = defineEntity({  
  name: 'Social',  
  embeddable: true,  
  properties: {  
    twitter: p.string().nullable(),  
    facebook: p.string().nullable(),  
    linkedin: p.string().nullable(),  
  },  
});  
  
export type ISocial = InferEntity<typeof SocialSchema>;  
  
export const UserSchema = defineEntity({  
  name: 'User',  
  extends: BaseSchema,  
  repository: () => UserRepository,  
  properties: {  
    fullName: p.string(),  
    email: p.string(),  
    password: p.string().hidden().lazy(),  
    bio: p.text().default(''),  
    articles: () => p.oneToMany(ArticleSchema).mappedBy('author'),  
    social: () => p.embedded(SocialSchema).nullable(),  
  },  
  // hooks and setClass remain the same  
});  
```
Try using to CLI to check how this affects the database schema:
```
$ npx mikro-orm schema:update --dump  
  
alter table `user` add column `social_twitter` text null;  
alter table `user` add column `social_facebook` text null;  
alter table `user` add column `social_linkedin` text null;  
```
But maybe it would be a better idea to store the social handles into a JSON column - you can easily achieve that with embeddables too:
```
social: () => p.embedded(SocialSchema).object().nullable(),  
```
And test it again:
```
$ npx mikro-orm schema:update --dump  
  
alter table `user` add column `social` json null;  
```
Yeah, that looks good, let's create a migration for it:
```
$ npx mikro-orm migration:create  
  
Migration20231105213316.ts successfully created  
  
$ npx mikro-orm migration:up  
  
Processing 'Migration20231105213316'  
Applied 'Migration20231105213316'  
Successfully migrated up to the latest version  
```
## Validation via Zod[​](https://mikro-orm.io/docs/next/guide/advanced#validation-via-zod "Direct link to Validation via Zod")
One more thing in the user module: process this new `User.social` property in the `sign-up` endpoint. Since [`em.create()`](https://mikro-orm.io/api/core/class/EntityManager#create) is already being used, you can simply pass the social property:
modules/user/routes.ts
```
const user = db.em.create(User, {   // `User` is the class from setClass  
  fullName: body.fullName,  
  email: body.email,  
  password: body.password,  
  bio: body.bio ?? '',  
  social: body.social as ISocial,  
});  
await db.em.flush();  
```
Let's add some validation via Zod (you could pass `body` directly to `em.create()`):
```
-const user = db.em.create(User, {  
-  ...  
-});  
+const user = db.user.create(request.body as RequiredEntityData<User>);  
await db.em.flush();  
```
MikroORM will perform some basic validation automatically, but it is generally a good practice to validate the user input explicitly. Let's use [Zod](https://github.com/colinhacks/zod) for it, it will also help with making the TypeScript compiler happy without the type assertion.
First, install the `zod` package.
  * npm
  * Yarn
  * pnpm
  * Bun
```
npm install zod  
```
```
yarn add zod  
```
```
pnpm add zod  
```
```
bun add zod  
```
Then you can create the schema objects:
modules/user/routes.ts
```
const socialSchema = z.object({  
  twitter: z.string().optional(),  
  facebook: z.string().optional(),  
  linkedin: z.string().optional(),  
});  
  
const userSchema = z.object({  
  email: z.string(),  
  fullName: z.string(),  
  password: z.string(),  
  bio: z.string().optional(),  
  social: socialSchema.optional(),  
});  
  
app.post('/sign-up', async request => {  
  const dto = userSchema.parse(request.body);  
  
  if (await db.user.exists(dto.email)) {  
    throw new Error('This email is already registered, maybe you want to sign in?');  
  }  
  
  // thanks to zod, our `dto` is fully typed and passes the `em.create()` checks  
  const user = db.user.create(dto);  
  await db.em.flush(); // no need for explicit `em.persist()` when we use `em.create()`  
  
  // after flush, we have the `user.id` set  
  user.token = app.jwt.sign({ id: user.id });  
  
  return user;  
});  
```
This example only shows a very basic validation with Zod, which mirrors what MikroORM already handles - it will validate required properties and their types automatically. Check the [Property Validation](https://mikro-orm.io/docs/next/property-validation) section for more details.
## Rest of the Article endpoints[​](https://mikro-orm.io/docs/next/guide/advanced#rest-of-the-article-endpoints "Direct link to Rest of the Article endpoints")
Let's implement the rest of the article endpoints. You need a public one for the article detail, one for posting comments, one for updating the article and one for deleting it. The last two will only be allowed for the user who created the given article.
With the information you already have, implementing those endpoints should be pretty straightforward. The detail endpoint is really simple, all it does is using the `findOneOrFail()` method to get the `Article` based on its `slug`.
You should validate the request parameters before working with them! It's left out on purpose as it is outside of scope of this guide.
modules/article/routes.ts
```
app.get('/:slug', async request => {  
  const { slug } = request.params as { slug: string };  
  return db.article.findOneOrFail({ slug }, {  
    populate: ['author', 'comments.author', 'text'],  
  });  
});  
```
### Creating entities[​](https://mikro-orm.io/docs/next/guide/advanced#creating-entities "Direct link to Creating entities")
Then define the endpoint for creating comments - here the `getUserFromToken` helper is used to access the current user based on the token, try to find the article (again based on the `slug` property) and create the comment entity. Since [`em.create()`](https://mikro-orm.io/api/core/class/EntityManager#create) is used here, you don't have to [`em.persist()`](https://mikro-orm.io/api/core/class/EntityManager#persist) the new entity, as it happens automatically this way.
modules/article/routes.ts
```
app.post('/:slug/comment', async request => {  
  const { slug, text } = request.params as { slug: string; text: string };  
  const author = getUserFromToken(request);  
  const article = await db.article.findOneOrFail({ slug });  
  const comment = db.comment.create({ author, article, text });  
  
  // We can add the comment to `article.comments` collection,  
  // but in fact it is a no-op, as it will be automatically  
  // propagated by setting Comment.author property.  
  article.comments.add(comment);  
  
  // mention we don't need to persist anything explicitly  
  await db.em.flush();  
  
  return comment;  
});  
```
Creating a new article is very similar.
modules/article/routes.ts
```
app.post('/', async request => {  
  const { title, description, text } = request.body as { title: string; description: string; text: string };  
  const author = getUserFromToken(request);  
  const article = db.article.create({  
    title,  
    description,  
    text,  
    author,  
  });  
  
  await db.em.flush();  
  
  return article;  
});  
```
### Updating entities[​](https://mikro-orm.io/docs/next/guide/advanced#updating-entities "Direct link to Updating entities")
For updating, use `wrap(article).assign()`, a helper method which will map the data to entity graph correctly. It will transform foreign keys into entity references automatically.
> Alternatively, you can use `em.assign()`, which will also work for not managed entities.
modules/article/routes.ts
```
app.patch('/:id', async request => {  
  const user = getUserFromToken(request);  
  const params = request.params as { id: string };  
  const article = await db.article.findOneOrFail(+params.id);  
  verifyArticlePermissions(user, article);  
  wrap(article).assign(request.body as EntityData<IArticle>);  
  await db.em.flush();  
  
  return article;  
});  
```
Also validate that only the author of the article can change it:
modules/common/utils.ts
```
export function verifyArticlePermissions(user: User, article: IArticle): void {  
  if (article.author.id !== user.id) {  
    throw new Error('You are not the author of this article!');  
  }  
}  
```
### Upserting entities[​](https://mikro-orm.io/docs/next/guide/advanced#upserting-entities "Direct link to Upserting entities")
Alternatively, you could use `em.upsert()` instead to create or update the entity in one step. It will use `INSERT ON CONFLICT` query under the hood:
```
-const article = await db.article.findOneOrFail(+params.id);  
-wrap(article).assign(request.body as EntityData<IArticle>);  
-await db.em.flush();  
+const article = await db.article.upsert(request.body as IArticle);  
```
To upsert many entities in a batch, you can use `em.upsertMany()`, which will handle everything within a single query.
Read more about upserting in [Entity Manager](https://mikro-orm.io/docs/next/entity-manager#upsert) section.
### Removing entities[​](https://mikro-orm.io/docs/next/guide/advanced#removing-entities "Direct link to Removing entities")
There are several approaches to removing an entity. In this case, the entity is first loaded, if it does not exist, `notFound: true` is returned in the response, if it does, it's removed via `em.remove()`, which marks the entity for removal on the following `flush()` call.
modules/article/routes.ts
```
app.delete('/:id', async request => {  
  const user = getUserFromToken(request);  
  const params = request.params as { id: string };  
  const article = await db.article.findOne(+params.id);  
  
  if (!article) {  
    return { notFound: true };  
  }  
  
  verifyArticlePermissions(user, article);  
  // mention `nativeDelete` alternative if we don't care about validations much  
  await db.em.remove(article).flush();  
  
  return { success: true };  
});  
```
You could also use `em.nativeDelete()` or `QueryBuilder` to execute a `DELETE` query.
```
await db.article.nativeDelete(+params.id);  
```
### Batch inserts, updates and deletes[​](https://mikro-orm.io/docs/next/guide/advanced#batch-inserts-updates-and-deletes "Direct link to Batch inserts, updates and deletes")
While there is no such use case in this guide, a huge benefit of using the [`EntityManager`](https://mikro-orm.io/api/core/class/EntityManager) with Unit of Work approach is automatic batching - all the `INSERT`, `UPDATE` and `DELETE` queries will be batched automatically into a single query per entity.
#### Insert[​](https://mikro-orm.io/docs/next/guide/advanced#insert "Direct link to Insert")
```
for (let i = 1; i <= 5; i++) {  
  em.create(User, {  
    fullName: `Peter ${i}`,  
    email: `peter+${i}@foo.bar`,  
    password: '...',  
  });  
}  
  
await em.flush();  
```
```
insert into `user` (`name`, `email`) values  
  ('Peter 1', 'peter+1@foo.bar'),  
  ('Peter 2', 'peter+2@foo.bar'),  
  ('Peter 3', 'peter+3@foo.bar'),  
  ('Peter 4', 'peter+4@foo.bar'),  
  ('Peter 5', 'peter+5@foo.bar');  
```
#### Update[​](https://mikro-orm.io/docs/next/guide/advanced#update "Direct link to Update")
```
const users = await em.find(User, {});  
  
for (const user of users) {  
  user.name += ' changed!';  
}  
  
await em.flush();  
```
```
update `user` set  
  `name` = case  
    when (`id` = 1) then 'Peter 1 changed!'  
    when (`id` = 2) then 'Peter 2 changed!'  
    when (`id` = 3) then 'Peter 3 changed!'  
    when (`id` = 4) then 'Peter 4 changed!'  
    when (`id` = 5) then 'Peter 5 changed!'  
    else `priority` end  
  where `id` in (1, 2, 3, 4, 5);  
```
#### Delete[​](https://mikro-orm.io/docs/next/guide/advanced#delete "Direct link to Delete")
```
const users = await em.find(User, {});  
  
em.remove(users);  
  
await em.flush();  
```
```
delete from `user` where `id` in (1, 2, 3, 4, 5);  
```
## Disabling change tracking[​](https://mikro-orm.io/docs/next/guide/advanced#disabling-change-tracking "Direct link to Disabling change tracking")
Sometimes you might want to disable identity map and change set tracking for some query. This is possible via `disableIdentityMap` option. Behind the scenes, it will create new context, load the entities inside that, and clear it afterward, so the main identity map will stay clean, but the entities returned from a single find call will be still interconnected.
> As opposed to _managed_ entities, such entities are called _detached_. To be able to work with them, you first need to merge them via `em.merge()`.
```
const user = await db.user.findOneOrFail({ email: 'foo@bar.baz' }, {  
  disableIdentityMap: true,  
});  
user.name = 'changed';  
await db.em.flush(); // calling flush have no effect, as the entity is not managed  
```
## Virtual entities[​](https://mikro-orm.io/docs/next/guide/advanced#virtual-entities "Direct link to Virtual entities")
Let's now improve the first article endpoint - `em.findAndCount()` was used to get paginated results easily, but what if you want to customize the response? One way is with [Virtual entities](https://mikro-orm.io/docs/next/virtual-entities). They don't represent any database table, instead, they dynamically resolve to an SQL query, allowing you to map any kind of results onto an entity.
Virtual entities are meant for read purposes, they don't have a primary key and therefore cannot be tracked for changes. If you want an actual database view instead, see the [View entities](https://mikro-orm.io/docs/next/guide/advanced#view-entities) section later in this chapter.
To define a virtual entity with `defineEntity`, provide an `expression` option. It can be a string (SQL query) or a callback returning an SQL query or a `QueryBuilder` instance. Only scalar properties are supported.
modules/article/article-listing.entity.ts
```
import { defineEntity, InferEntity, EntityManager, p } from '@mikro-orm/core';  
import { ArticleSchema } from './article.entity.js';  
  
export const ArticleListingSchema = defineEntity({  
  name: 'ArticleListing',  
  expression: (em: EntityManager) => {  
    return em.getRepository(ArticleSchema).listArticlesQuery();  
  },  
  properties: {  
    slug: p.string(),  
    title: p.string(),  
    description: p.string(),  
    tags: p.array(),  
    author: p.integer(),  
    authorName: p.string(),  
    totalComments: p.integer(),  
  },  
});  
  
export type IArticleListing = InferEntity<typeof ArticleListingSchema>;  
```
Now create a custom repository for the `Article` entity too, and put two methods inside:
modules/article/article.repository.ts
```
import { FindOptions, sql, EntityRepository } from '@mikro-orm/sqlite';  
import { type IArticle, ArticleSchema } from './article.entity.js';  
import { type IArticleListing, ArticleListingSchema } from './article-listing.entity.js';  
  
// extending the EntityRepository exported from driver package, so we can access things like the QB factory  
export class ArticleRepository extends EntityRepository<IArticle> {  
  
  listArticlesQuery() {  
    // just a placeholder for now  
    return this.createQueryBuilder('a');  
  }  
  
  async listArticles(options: FindOptions<IArticleListing>) {  
    const [items, total] = await this.em.findAndCount(ArticleListingSchema, {}, options);  
    return { items, total };  
  }  
  
}  
```
And use this new `listArticles()` method in the endpoint:
modules/article/routes.ts
```
// list articles  
app.get('/', async request => {  
  const { limit, offset } = request.query as { limit?: number; offset?: number };  
  
  const { items, total } = await db.article.listArticles({  
    limit, offset,  
  });  
  
  return { items, total };  
});  
```
## Using QueryBuilder[​](https://mikro-orm.io/docs/next/guide/advanced#using-querybuilder "Direct link to Using QueryBuilder")
The `listArticlesQuery()` repository method will be a bit more complex. We want to load the articles together with the number of corresponding comments. To do that, we can use the `QueryBuilder` with a sub-query which will load the comments count for each selected article. Similarly, we want to load all the tags added to the article. To get the author's name, we can use a simple `JOIN`.
> You can find more details in the [Using Query Builder](https://mikro-orm.io/docs/next/query-builder) section.
Let's first do the easy things - we want to select `slug`, `title`, `description` and `author` columns:
modules/article/article.repository.ts
```
return this.createQueryBuilder('a')  
  .select(['slug', 'title', 'description', 'author']);  
```
Now let's join the `User` entity and select the author's name. To have a custom alias on the column, we will use `sql.ref()` helper:
modules/article/article.repository.ts
```
return this.createQueryBuilder('a')  
  .select(['slug', 'title', 'description', 'author'])  
  .addSelect(sql.ref('u.full_name').as('authorName'))  
  .join('author', 'u')  
```
And now the sub-queries - we will need two of them, both will use the same `sql.ref()` helper (this time without aliasing) and the `QueryBuilder.as()` method to alias the whole sub-query.
modules/article/article.repository.ts
```
import { FindOptions, sql, EntityRepository } from '@mikro-orm/sqlite';  
import { type IArticle, ArticleSchema } from './article.entity.js';  
import { type IArticleListing, ArticleListingSchema } from './article-listing.entity.js';  
import { CommentSchema } from './comment.entity.js';  
  
export class ArticleRepository extends EntityRepository<IArticle> {  
  
  // ...  
  
  listArticlesQuery() {  
    // sub-query for total number of comments  
    const totalComments = this.em.createQueryBuilder(CommentSchema)  
      .count()  
      .where({ article: sql.ref('a.id') })  
      // by calling `qb.as()` we alias the sub-query  
      .as('totalComments');  
  
    // sub-query for all used tags  
    const usedTags = this.em.createQueryBuilder(ArticleSchema, 'aa')  
      // we need to mark raw query fragment with `sql` helper  
      // otherwise it would be escaped  
      .select(sql`group_concat(distinct t.name)`)  
      .join('aa.tags', 't')  
      .where({ 'aa.id': sql.ref('a.id') })  
      .groupBy('aa.author')  
      .as('tags');  
  
    // build final query  
    return this.createQueryBuilder('a')  
      .select(['slug', 'title', 'description', 'author'])  
      .addSelect(sql.ref('u.full_name').as('authorName'))  
      .join('author', 'u')  
      .addSelect([totalComments, usedTags]);  
  }  
  
}  
```
Note how we used the `sql` helper function as a tagged template when adding the `group_concat` expression to the select clause. Read more about the support for [raw queries here](https://mikro-orm.io/docs/next/raw-queries).
### Executing the Query[​](https://mikro-orm.io/docs/next/guide/advanced#executing-the-query "Direct link to Executing the Query")
In our example, we just return the `QueryBuilder` instance and let the ORM execute it through our virtual entity, you may ask: how can you execute the query manually? There are two ways, the first is the `qb.execute()` method, which gives you raw results (plain objects). By default, it will return an array of items, mapping column names to property names automatically. You can use the first parameter to control the mode and form of result:
```
const res1 = await qb.execute('all'); // returns array of objects, default behavior  
const res2 = await qb.execute('get'); // returns single object  
const res3 = await qb.execute('run'); // returns object like `{ affectedRows: number, insertId: number, row: any }`  
```
The second argument can be used to disable the mapping of database columns to property names. In the following example, the `Article` entity has a `createdAt` property defined with implicit underscored field name `created_at`:
```
const res1 = await em.createQueryBuilder(ArticleSchema).select('*').execute('get', true);  
console.log(res1); // `createdAt` will be defined, while `created_at` will be missing  
  
const res2 = await em.createQueryBuilder(ArticleSchema).select('*').execute('get', false);  
console.log(res2); // `created_at` will be defined, while `createdAt` will be missing  
```
To get the entity instances from the `QueryBuilder` result, you can use the `getResult()` and `getSingleResult()` methods:
```
const article = await em.createQueryBuilder(ArticleSchema)  
  .select('*')  
  .where({ id: 1 })  
  .getSingleResult();  
console.log(article); // Article { id: 1, ... }  
  
const articles = await em.createQueryBuilder(ArticleSchema)  
  .select('*')  
  .getResult();  
console.log(articles[0] instanceof Article); // true  
```
> You can also use `qb.getResultList()` which is alias for `qb.getResult()`.
## Updating the tests[​](https://mikro-orm.io/docs/next/guide/advanced#updating-the-tests "Direct link to Updating the tests")
We just changed the shape of our API response, which is something we test already, so let's fix our broken tests. First, create some testing comments in our `TestSeeder`:
seeders/TestSeeder.ts
```
export class TestSeeder extends Seeder {  
  async run(em: EntityManager): Promise<void> {  
-   em.create(UserSchema, {  
+   const author = em.create(UserSchema, {  
      fullName: "Foo Bar",  
      email: "foo@bar.com",  
      // ...  
    });  
  
+   em.assign(author.articles[0], {  
+     comments: [  
+       { author, text: `random comment ${Math.random()}` },  
+       { author, text: `random comment ${Math.random()}` },  
+     ],  
+   });  
+  
+   em.assign(author.articles[1], {  
+     comments: [{ author, text: `random comment ${Math.random()}` }],  
+   });  
+  
+   em.assign(author.articles[2], {  
+     comments: [  
+       { author, text: `random comment ${Math.random()}` },  
+       { author, text: `random comment ${Math.random()}` },  
+       { author, text: `random comment ${Math.random()}` },  
+     ],  
+   });  
  }  
}  
```
test/article.test.ts
```
expect(res.json()).toMatchObject({  
  items: [  
-   { author: 1, slug: "title-13", title: "title 1/3" },  
-   { author: 1, slug: "title-23", title: "title 2/3" },  
-   { author: 1, slug: "title-33", title: "title 3/3" },  
+   {  
+     slug: expect.any(String),  
+     title: 'title 1/3',  
+     description: 'desc 1/3',  
+     tags: ['foo1', 'foo2'],  
+     authorName: 'Foo Bar',  
+     totalComments: 2,  
+   },  
+   {  
+     slug: expect.any(String),  
+     title: 'title 2/3',  
+     description: 'desc 2/3',  
+     tags: ['foo2'],  
+     authorName: 'Foo Bar',  
+     totalComments: 1,  
+   },  
+   {  
+     slug: expect.any(String),  
+     title: 'title 3/3',  
+     description: 'desc 3/3',  
+     tags: ['foo2', 'foo3'],  
+     authorName: 'Foo Bar',  
+     totalComments: 3,  
+   },  
  ],  
  total: 3,  
});  
```
## Result cache[​](https://mikro-orm.io/docs/next/guide/advanced#result-cache "Direct link to Result cache")
MikroORM has a simple [result caching](https://mikro-orm.io/docs/next/caching) mechanism, all you need to do is add `cache` option to your [`em.find()`](https://mikro-orm.io/api/core/class/EntityManager#find) options. The value can be one of:
  * `true` for default expiration (configurable globally, defaults to 1 second).
  * A number for explicit expiration (in milliseconds).
  * A tuple with first element being the `cacheKey` (`string`) and the second element the expiration (`number`). You can use the cacheKey to clear the cache via `em.clearCache()`.
Let's enable the caching for our article listing endpoint, with a 5-second expiration:
modules/article/routes.ts
```
// list articles  
app.get('/', async request => {  
  const { limit, offset } = request.query as { limit?: number; offset?: number };  
  
  const { items, total } = await db.article.listArticles({  
    limit, offset,  
    cache: 5_000, // 5 seconds  
  });  
  
  return { items, total };  
});  
```
Now when you enable [debug mode](https://mikro-orm.io/docs/next/logging) and try to access the endpoint several times within 5 seconds, you should see just the first request producing queries.
## View entities[​](https://mikro-orm.io/docs/next/guide/advanced#view-entities "Direct link to View entities")
The virtual entity we created earlier evaluates its SQL expression as a subquery every time you query it. If you'd prefer to have an actual database view instead, you can convert it to a [view entity](https://mikro-orm.io/docs/next/view-entities) by adding the `view: true` option. The `expression` then becomes the view definition — the database will create the view once, and queries will read from it directly.
Let's create a view version of our article listing:
modules/article/article-listing-view.entity.ts
```
import { defineEntity, InferEntity, p } from '@mikro-orm/core';  
  
export const ArticleListingViewSchema = defineEntity({  
  name: 'ArticleListingView',  
  view: true,  
  expression: `  
    select a.slug, a.title, a.description, a.author_id as author,  
           u.full_name as author_name,  
           (select count(*) from comment c where c.article_id = a.id) as total_comments,  
           (select group_concat(distinct t.name) from article_tags at2  
              join tag t on t.id = at2.tag_id  
              where at2.article_id = a.id) as tags  
    from article a  
    join user u on u.id = a.author_id  
  `,  
  properties: {  
    slug: p.string().primary(),  
    title: p.string(),  
    description: p.string(),  
    tags: p.array(),  
    author: p.integer(),  
    authorName: p.string(),  
    totalComments: p.integer(),  
  },  
});  
  
export type IArticleListingView = InferEntity<typeof ArticleListingViewSchema>;  
```
Unlike a virtual entity, a view entity has a primary key (`slug` in this case) and maps to a real database object. The key differences:
  * **Virtual entity** : expression is inlined as a subquery at query time, no primary key, no change tracking.
  * **View entity** : a `CREATE VIEW` statement is generated, the entity has a primary key and lives in the Identity Map. Still read-only by default.
Since view entities create actual database objects, you need to generate and run a migration:
```
npx mikro-orm migration:create  
npx mikro-orm migration:up  
```
If you use `orm.schema.create()` or `orm.schema.update()` (e.g. in tests), views are created automatically — no extra step needed.
View entities are read-only — the ORM will not generate `INSERT`, `UPDATE`, or `DELETE` statements for them. The `expression` is a plain SQL string used as the view definition.
## Soft delete via `onFlush` event[​](https://mikro-orm.io/docs/next/guide/advanced#soft-delete-via-onflush-event "Direct link to soft-delete-via-onflush-event")
Let's add soft delete support for comments. Instead of physically deleting a comment from the database, we'll set a `deletedAt` timestamp and use a [filter](https://mikro-orm.io/docs/next/filters) to automatically exclude soft-deleted records from queries.
First, add a `deletedAt` property and a filter to the `Comment` entity:
comment.entity.ts
```
export const CommentSchema = defineEntity({  
  name: 'Comment',  
  extends: BaseSchema,  
  properties: {  
    text: p.string(),  
    article: () => p.manyToOne(ArticleSchema).ref(),  
    author: () => p.manyToOne(UserSchema).ref(),  
    deletedAt: p.datetime().nullable(),  
  },  
  filters: {  
    softDelete: { cond: { deletedAt: null }, default: true },  
  },  
});  
```
The `filters` option with `default: true` means all queries for `Comment` will automatically add `WHERE deleted_at IS NULL` - soft-deleted comments are invisible by default.
Now implement an event subscriber that intercepts delete operations and converts them to soft deletes. The `onFlush` event fires after change sets are computed but before the actual database queries run - this is the perfect place to transform a `DELETE` into an `UPDATE`:
modules/common/soft-delete.subscriber.ts
```
import type { EventSubscriber, FlushEventArgs } from '@mikro-orm/core';  
import { ChangeSetType } from '@mikro-orm/core';  
  
export class SoftDeleteSubscriber implements EventSubscriber {  
  
  async onFlush(args: FlushEventArgs): Promise<void> {  
    const changeSets = args.uow.getChangeSets();  
  
    for (const cs of changeSets) {  
      if (cs.type !== ChangeSetType.DELETE) {  
        continue;  
      }  
  
      // only soft-delete entities that have a `deletedAt` property  
      if (!cs.meta.properties.deletedAt) {  
        continue;  
      }  
  
      // convert the DELETE to an UPDATE that sets `deletedAt`  
      cs.entity.deletedAt = new Date();  
      args.uow.computeChangeSet(cs.entity, ChangeSetType.UPDATE);  
    }  
  }  
  
}  
```
Register the subscriber in your ORM config:
mikro-orm.config.ts
```
import { SoftDeleteSubscriber } from './modules/common/soft-delete.subscriber.js';  
  
export default defineConfig({  
  // ...  
  subscribers: [new SoftDeleteSubscriber()],  
});  
```
Now when you call `em.remove(comment)` and `em.flush()`, the comment won't be physically deleted - instead, its `deletedAt` column will be set. And thanks to the filter, queries for comments will automatically exclude soft-deleted ones.
If you need to query soft-deleted records (e.g., for an admin panel or undo feature), you can disable the filter:
```
// include soft-deleted comments  
const allComments = await em.find(CommentSchema, {}, {  
  filters: { softDelete: false },  
});  
```
> The subscriber already checks for the `deletedAt` property generically - you can add the same `filters` option and `deletedAt` property to any entity that should support soft delete. See the [Events](https://mikro-orm.io/docs/next/events) and [Filters](https://mikro-orm.io/docs/next/filters) documentation for more details.
## Standalone scripts and CRON jobs[​](https://mikro-orm.io/docs/next/guide/advanced#standalone-scripts-and-cron-jobs "Direct link to Standalone scripts and CRON jobs")
Throughout this guide, we've been working within a web server context where `RequestContext` creates a fresh `EntityManager` fork for each request. But what about standalone scripts, data migrations, or CRON jobs that run outside of a web server?
### Standalone scripts[​](https://mikro-orm.io/docs/next/guide/advanced#standalone-scripts "Direct link to Standalone scripts")
For one-off scripts, you have two options. The simplest is to fork the `EntityManager` explicitly, just like we did in Chapter 1:
scripts/cleanup.ts
```
import { initORM } from '../src/db.js';  
  
const db = initORM();  
const em = db.em.fork();  
  
// work with the forked EntityManager  
const oldArticles = await em.find(ArticleSchema, {  
  createdAt: { $lt: new Date('2020-01-01') },  
});  
em.remove(oldArticles);  
await em.flush();  
  
await db.orm.close();  
```
Alternatively, if you want to use the global `EntityManager` directly (acceptable for scripts where there's no concurrent access), you can enable it in the config:
```
const db = initORM({ allowGlobalContext: true });  
  
// now you can use db.em directly  
const users = await db.em.find(User, {});  
```
Do not use `allowGlobalContext` as a workaround for missing request context in production. It silences the validation error but does not fix the underlying problem — you will still face growing memory footprint and unstable API responses caused by a shared Identity Map. Use it only for simple scripts and tests where there is no concurrent access. For everything else, set up a proper request context via `RequestContext` helper, `@CreateRequestContext()` decorator, or `em.fork()`. See [Identity Map — Why is Request Context needed?](https://mikro-orm.io/docs/next/identity-map#why-is-request-context-needed) for details.
### CRON jobs[​](https://mikro-orm.io/docs/next/guide/advanced#cron-jobs "Direct link to CRON jobs")
For recurring tasks that run alongside a web server, use `RequestContext.create()` to ensure each job execution gets its own isolated context:
src/cron.ts
```
import { RequestContext } from '@mikro-orm/core';  
import { initORM } from './db.js';  
  
export async function setupCronJobs() {  
  const db = initORM();  
  
  // run every hour  
  setInterval(async () => {  
    await RequestContext.create(db.em, async () => {  
      // this runs in its own context, safe from other concurrent operations  
      const expiredArticles = await db.article.find({  
        createdAt: { $lt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },  
      });  
      // ... process expired articles  
      await db.em.flush();  
    });  
  }, 60 * 60 * 1000);  
}  
```
The key rule is: never share an `EntityManager` across concurrent operations. Either fork it, or use `RequestContext` to isolate each operation.
## Deployment[​](https://mikro-orm.io/docs/next/guide/advanced#deployment "Direct link to Deployment")
Our app is ready, let's prepare the production build. Since we use `defineEntity` with explicit entity references (not folder-based discovery), we have two deployment options.
### Basic TypeScript compilation[​](https://mikro-orm.io/docs/next/guide/advanced#basic-typescript-compilation "Direct link to Basic TypeScript compilation")
The simplest approach is to compile TypeScript and run the output:
package.json
```
"scripts": {  
  "build": "tsc",  
  "start": "tsx src/server.ts",  
  "start:prod": "node dist/server.js",  
  "test": "vitest"  
},  
```
```
npm run build  
npm run start:prod  
```
### Bundling with Vite[​](https://mikro-orm.io/docs/next/guide/advanced#bundling-with-vite "Direct link to Bundling with Vite")
Since `defineEntity` doesn't require runtime file system access for entity discovery, our app is fully compatible with bundlers. This allows creating a single-file bundle with all dependencies included - perfect for containerized deployments or serverless environments.
First, install Vite:
  * npm
  * Yarn
  * pnpm
  * Bun
```
npm install vite --save-dev  
```
```
yarn add vite --dev  
```
```
pnpm add vite --save-dev  
```
```
bun add vite --dev  
```
Create a Vite configuration for SSR (server-side) bundling:
vite.config.ts
```
import { defineConfig } from 'vite';  
  
export default defineConfig({  
  build: {  
    ssr: 'src/server.ts',  
    outDir: 'dist',  
    sourcemap: true,  
    target: 'node22',  
  },  
  ssr: {  
    // bundle MikroORM packages into the output  
    noExternal: ['@mikro-orm/sqlite', '@mikro-orm/sql', '@mikro-orm/core'],  
  },  
});  
```
Add the bundle script to your package.json:
package.json
```
"scripts": {  
  "build": "tsc",  
  "bundle": "vite build",  
  "start": "tsx src/server.ts",  
  "start:prod": "node dist/server.js",  
  "test": "vitest"  
},  
```
Now you can create a bundled production build:
```
npm run bundle  
npm run start:prod  
```
## ⛳ Checkpoint 4[​](https://mikro-orm.io/docs/next/guide/advanced#-checkpoint-4 "Direct link to ⛳ Checkpoint 4")
Our app is shaping quite well, we now have all the endpoints implemented and covered with basic tests.
<https://codesandbox.io/p/sandbox/mikroorm-getting-started-guide-checkpoint-4-dhg2vj?file=src/app.ts>
app.ts
```
import { NotFoundError, RequestContext } from "@mikro-orm/core";  
import { fastify } from "fastify";  
import fastifyJWT from "@fastify/jwt";  
import { initORM } from "./db.js";  
import { registerArticleRoutes } from "./modules/article/routes.js";  
import { registerUserRoutes } from "./modules/user/routes.js";  
import { AuthError } from "./modules/common/utils.js";  
  
export async function bootstrap(port = 3001, migrate = true) {  
  const db = initORM();  
  
  if (migrate) {  
    // sync the schema  
    await db.orm.migrator.up();  
  }  
  
  const app = fastify();  
  
  // register JWT plugin  
  app.register(fastifyJWT, {  
    secret: process.env.JWT_SECRET ?? "12345678", // fallback for testing  
  });  
  
  // register request context hook  
  app.addHook("onRequest", (request, reply, done) => {  
    RequestContext.create(db.em, done);  
  });  
  
  // register auth hook after the ORM one to use the context  
  app.addHook("onRequest", async (request) => {  
    try {  
      const ret = await request.jwtVerify<{ id: number }>();  
      request.user = await db.user.findOneOrFail(ret.id);  
    } catch (e) {  
      app.log.error(e);  
      // ignore token errors, we validate the request.user exists only where needed  
    }  
  });  
  
  // register global error handler to process 404 errors from `findOneOrFail` calls  
  app.setErrorHandler((error, request, reply) => {  
    if (error instanceof AuthError) {  
      return reply.status(401).send({ error: error.message });  
    }  
  
    if (error instanceof NotFoundError) {  
      return reply.status(404).send({ error: error.message });  
    }  
  
    app.log.error(error);  
    reply.status(500).send({ error: error.message });  
  });  
  
  // shut down the connection when closing the app  
  app.addHook("onClose", async () => {  
    await db.orm.close();  
  });  
  
  // register routes here  
  app.register(registerArticleRoutes, { prefix: "article" });  
  app.register(registerUserRoutes, { prefix: "user" });  
  
  const url = await app.listen({ port });  
  
  return { app, url, db };  
}  
```
[](https://github.com/mikro-orm/mikro-orm/edit/master/docs/docs/guide/04-advanced.md)
Last updated on **May 5, 2026** by **Martin Adámek**
[Previous Chapter 3: Project Setup](https://mikro-orm.io/docs/next/guide/project-setup)[Next Chapter 5: Type-safety](https://mikro-orm.io/docs/next/guide/type-safety)
  * [Improving route registration](https://mikro-orm.io/docs/next/guide/advanced#improving-route-registration)
  * [Sign-up route](https://mikro-orm.io/docs/next/guide/advanced#sign-up-route)
  * [Custom repositories](https://mikro-orm.io/docs/next/guide/advanced#custom-repositories)
  * [Authentication](https://mikro-orm.io/docs/next/guide/advanced#authentication)
    * [Testing the `User` endpoints](https://mikro-orm.io/docs/next/guide/advanced#testing-the-user-endpoints)
    * [JSON Web Tokens](https://mikro-orm.io/docs/next/guide/advanced#json-web-tokens)
  * [Embeddables](https://mikro-orm.io/docs/next/guide/advanced#embeddables)
  * [Validation via Zod](https://mikro-orm.io/docs/next/guide/advanced#validation-via-zod)
  * [Rest of the Article endpoints](https://mikro-orm.io/docs/next/guide/advanced#rest-of-the-article-endpoints)
    * [Creating entities](https://mikro-orm.io/docs/next/guide/advanced#creating-entities)
    * [Updating entities](https://mikro-orm.io/docs/next/guide/advanced#updating-entities)
    * [Upserting entities](https://mikro-orm.io/docs/next/guide/advanced#upserting-entities)
    * [Removing entities](https://mikro-orm.io/docs/next/guide/advanced#removing-entities)
    * [Batch inserts, updates and deletes](https://mikro-orm.io/docs/next/guide/advanced#batch-inserts-updates-and-deletes)
  * [Disabling change tracking](https://mikro-orm.io/docs/next/guide/advanced#disabling-change-tracking)
  * [Virtual entities](https://mikro-orm.io/docs/next/guide/advanced#virtual-entities)
  * [Using QueryBuilder](https://mikro-orm.io/docs/next/guide/advanced#using-querybuilder)
    * [Executing the Query](https://mikro-orm.io/docs/next/guide/advanced#executing-the-query)
  * [Updating the tests](https://mikro-orm.io/docs/next/guide/advanced#updating-the-tests)
  * [Result cache](https://mikro-orm.io/docs/next/guide/advanced#result-cache)
  * [View entities](https://mikro-orm.io/docs/next/guide/advanced#view-entities)
  * [Soft delete via `onFlush` event](https://mikro-orm.io/docs/next/guide/advanced#soft-delete-via-onflush-event)
  * [Standalone scripts and CRON jobs](https://mikro-orm.io/docs/next/guide/advanced#standalone-scripts-and-cron-jobs)
    * [Standalone scripts](https://mikro-orm.io/docs/next/guide/advanced#standalone-scripts)
    * [CRON jobs](https://mikro-orm.io/docs/next/guide/advanced#cron-jobs)
  * [Deployment](https://mikro-orm.io/docs/next/guide/advanced#deployment)
    * [Basic TypeScript compilation](https://mikro-orm.io/docs/next/guide/advanced#basic-typescript-compilation)
    * [Bundling with Vite](https://mikro-orm.io/docs/next/guide/advanced#bundling-with-vite)
  * [⛳ Checkpoint 4](https://mikro-orm.io/docs/next/guide/advanced#-checkpoint-4)
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
# https://mikro-orm.io/docs/next/guide/type-safety
============================================================
[Skip to main content](https://mikro-orm.io/docs/next/guide/type-safety#__docusaurus_skipToContent_fallback)
⭐️ If you like MikroORM, give it a star on [GitHub](https://github.com/mikro-orm/mikro-orm) and consider [sponsoring](https://github.com/sponsors/mikro-orm) its development! ⭐️
[ ![MikroORM](https://mikro-orm.io/img/logo.svg)![MikroORM](https://mikro-orm.io/img/logo-dark.svg) ](https://mikro-orm.io/)
[Next](https://mikro-orm.io/docs/next/guide/type-safety)
  * [Next](https://mikro-orm.io/docs/next/guide/type-safety)
  * [7.1](https://mikro-orm.io/docs/guide/type-safety)
  * [7.0](https://mikro-orm.io/docs/7.0/guide/type-safety)
  * [6.6](https://mikro-orm.io/docs/6.6/guide/type-safety)
  * [5.9](https://mikro-orm.io/docs/5.9/installation)
[Docs](https://mikro-orm.io/docs/quick-start)[API](https://mikro-orm.io/api)[Blog](https://mikro-orm.io/blog)[Changelog](https://mikro-orm.io/changelog)
[latest: v7.1.3](https://mikro-orm.io/versions)[Discord](https://discord.gg/w8bjxFHS7X "Chat on Discord")[GitHub](https://github.com/mikro-orm/mikro-orm "View on GitHub")[Twitter](https://twitter.com/MikroORM "Twitter")
Search
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
For up-to-date documentation, see the **[latest version](https://mikro-orm.io/docs/guide/type-safety)** (7.1).
  * [](https://mikro-orm.io/)
  * [Getting Started](https://mikro-orm.io/docs/next/guide)
Version: Next
On this page
# Chapter 5: Type-safety
Now that we have a blog API with entities, relationships, and a QueryBuilder-powered listing, let's explore how MikroORM's type system keeps everything safe at compile time.
##  `Loaded` type and populate hints[​](https://mikro-orm.io/docs/next/guide/type-safety#loaded-type-and-populate-hints "Direct link to loaded-type-and-populate-hints")
If you check the return type of `em.find` and `em.findOne`, you might notice they don't return the entity directly - they return a `Loaded` type:
```
// res1 is of type `Loaded<Article, never>[]`  
const res1 = await em.find(ArticleSchema, {});  
  
// res2 is of type `Loaded<Article, 'author'>[]`  
const res2 = await em.find(ArticleSchema, {}, { populate: ['author'] });  
```
The `Loaded` type tracks which relations have been populated, and adds a special `$` symbol to them for type-safe synchronous access. This works great in combination with the `Reference` wrapper (covered next):
```
// article is of type `Loaded<Article, 'author'>`  
const article = await em.findOneOrFail(ArticleSchema, 1, { populate: ['author'] });  
  
// type-safe sync access to the loaded author:  
console.log(article.author.$.fullName);  
```
If you omit the `populate` hint, the type of `article` would be `Loaded<Article, never>` and the `article.author.$` symbol wouldn't be available - such call would end up with a compilation error.
```
// without populate, the type is `Loaded<Article, never>`  
const article2 = await em.findOneOrFail(ArticleSchema, 2);  
  
// TS2339: Property '$' does not exist on type '...'  
console.log(article2.author.$.fullName);  
```
Same works for the `Collection` wrapper on OneToMany/ManyToMany relations:
```
// user is of type `Loaded<User, 'articles'>`  
const user = await em.findOneOrFail(User, 1, { populate: ['articles'] });  
  
// type-safe sync access to loaded collection items:  
for (const article of user.articles.$) {  
  console.log(article.title);  
}  
```
> If you don't like symbols with magic names like `$`, you can use the `get()` method instead, which is an alias for it.
You can also use the `Loaded` type in your own functions to require that certain relations are populated:
```
function publishArticle(article: Loaded<Article, 'author'>) {  
  // we can safely access the author without any async loading  
  console.log(`Publishing "${article.title}" by ${article.author.$.fullName}`);  
}  
```
```
// works - author is populated  
const a1 = await em.findOneOrFail(ArticleSchema, 1, { populate: ['author'] });  
publishArticle(a1);  
  
// compile error - author is not populated  
const a2 = await em.findOneOrFail(ArticleSchema, 1);  
publishArticle(a2);  
```
> Keep in mind this is all just type-level information, you can easily trick it via type assertions.
##  `Reference` wrapper[​](https://mikro-orm.io/docs/next/guide/type-safety#reference-wrapper "Direct link to reference-wrapper")
When you define `manyToOne` or `oneToOne` relations, TypeScript will think the related entities are always loaded:
```
const article = await em.findOne(ArticleSchema, 1);  
console.log(article.author.fullName); // undefined, User is not loaded yet!  
```
You can overcome this by using the `Reference` wrapper. It wraps the entity, defining a `load(): Promise<T>` method that will lazy load the association if not already available. With `defineEntity`, you enable it via `.ref()`:
article.entity.ts
```
import { defineEntity, type InferEntity, p } from '@mikro-orm/core';  
import { BaseSchema } from '../common/base.entity.js';  
import { UserSchema } from '../user/user.entity.js';  
  
export const ArticleSchema = defineEntity({  
  name: 'Article',  
  extends: BaseSchema,  
  properties: {  
    // ...  
    // Use .ref() to wrap the relation in a Reference  
    author: () => p.manyToOne(UserSchema).ref(),  
  },  
});  
  
export type IArticle = InferEntity<typeof ArticleSchema>;  
```
Now the property type becomes `Ref<User>`, which prevents accidental access to unloaded properties:
```
const article1 = await em.findOne(ArticleSchema, 1);  
article1.author;       // Ref<User> (instance of Reference class)  
article1.author.fullName;  // type error! no `fullName` property on Ref<User>  
article1.author.id;    // ok, PK is always available on Ref  
  
const article2 = await em.findOne(ArticleSchema, 1, { populate: ['author'] });  
article2.author;          // LoadedReference<User>  
article2.author.$.fullName; // type-safe sync access after populate  
```
### Using `Reference.load()`[​](https://mikro-orm.io/docs/next/guide/type-safety#using-referenceload "Direct link to using-referenceload")
After retrieving a reference, you can load the full entity via the async `load()` method:
```
const article = await em.findOne(ArticleSchema, 1);  
const author = await article.author.load();  
author.fullName; // ok, author is now loaded  
  
await article.author.load(); // no additional query, already loaded  
```
> As opposed to `wrap(e).init()` which always refreshes the entity, `Reference.load()` will query the database only if the entity is not already loaded in the Identity Map.
###  `LazyRef<T>` — type-only alternative[​](https://mikro-orm.io/docs/next/guide/type-safety#lazyreft--type-only-alternative "Direct link to lazyreft--type-only-alternative")
If the `.$` / `.get()` indirection of `Reference` doesn't fit your style (e.g. when migrating from a non-`Ref` codebase), use `LazyRef<T>` instead. The runtime stays a plain entity — `article.author instanceof User` is `true`, no wrapper — but TypeScript still restricts non-PK access until `Loaded<>` narrows it:
article.entity.ts
```
author: () => p.manyToOne(UserSchema).lazyRef(),  
```
```
const article1 = await em.findOne(ArticleSchema, 1);  
article1.author.id;       // ok — PK always accessible  
article1.author.fullName; // type error — not loaded  
  
const article2 = await em.findOne(ArticleSchema, 1, { populate: ['author'] });  
article2.author.fullName; // ok — Loaded<> strips the LazyRef brand, no `.$` needed  
```
See [Type-safe Relations → `LazyRef<T>`](https://mikro-orm.io/docs/next/type-safe-relations#lazyreft--type-only-reference) for the full comparison with `Ref<T>` and the `unref()` escape hatch.
###  `ScalarReference` wrapper[​](https://mikro-orm.io/docs/next/guide/type-safety#scalarreference-wrapper "Direct link to scalarreference-wrapper")
Similarly to the `Reference` wrapper, you can also wrap scalars with `Ref` into a `ScalarReference` object. This is handy for lazy scalar properties.
The `Ref` type automatically resolves to `ScalarReference` for non-object types, so the following is correct:
```
// In our Article entity, the `text` property is lazy.  
// If we wrap it with .ref(), it becomes a ScalarReference:  
text: p.text().lazy().ref(),  
```
```
const article = await em.findOne(ArticleSchema, 1);  
const text = await article.text.load(); // loads the lazy text property  
```
If you use decorators with `reflect-metadata`, you'll need to explicitly set the `ref` option:
```
@ManyToOne(() => User, { ref: true })  
author!: Ref<User>;  
```
With `defineEntity`, the `.ref()` method handles this automatically.
## Strict partial loading with `fields`[​](https://mikro-orm.io/docs/next/guide/type-safety#strict-partial-loading-with-fields "Direct link to strict-partial-loading-with-fields")
The `Loaded` type also respects the partial loading hints (`fields` option). When used, the returned type will only allow accessing selected properties. Primary keys are always automatically selected and available.
```
// article is typed to `Selected<Article, 'author', 'title' | 'author.email'>`  
const article = await em.findOneOrFail(ArticleSchema, 1, {  
  fields: ['title', 'author.email'],  
  populate: ['author'],  
});  
  
const id = article.id;           // ok, PK is selected automatically  
const title = article.title;     // ok, title is selected  
const slug = article.slug;       // fail, not selected  
const authorId = article.author.id;    // ok, PK is selected automatically  
const email = article.author.email;    // ok, selected  
const name = article.author.fullName;  // fail, not selected  
```
## QueryBuilder type safety[​](https://mikro-orm.io/docs/next/guide/type-safety#querybuilder-type-safety "Direct link to QueryBuilder type safety")
In Chapter 4, we used `QueryBuilder` to build the article listing query. MikroORM's `QueryBuilder` has a fully type-safe API that tracks aliases, joined entities, and selected fields at the type level.
### Context-aware joins[​](https://mikro-orm.io/docs/next/guide/type-safety#context-aware-joins "Direct link to Context-aware joins")
Each `join`/`leftJoin` call adds to a `Context` type parameter that tracks which aliases are available and what entity types they point to:
```
const qb = em.createQueryBuilder(ArticleSchema, 'a')  
  .leftJoin('a.author', 'u');  // Context now knows alias 'u' maps to User  
```
After the join, TypeScript knows that `'u'` is a valid alias pointing to the `User` entity, and will validate any further usage of it.
### Strict `select`[​](https://mikro-orm.io/docs/next/guide/type-safety#strict-select "Direct link to strict-select")
The `select` method validates that field paths use known aliases and valid property names:
```
const qb = em.createQueryBuilder(ArticleSchema, 'a')  
  .leftJoin('a.author', 'u')  
  .select(['a.title', 'u.fullName']);  // ok: 'a' is Article, 'u' is User  
  
// compile error: 'x' is not a known alias  
em.createQueryBuilder(ArticleSchema, 'a')  
  .select(['a.title', 'x.invalid']);  
```
You can also use `addSelect` to add more fields, including raw SQL fragments:
```
em.createQueryBuilder(ArticleSchema, 'a')  
  .select(['a.slug', 'a.title'])  
  .leftJoin('a.author', 'u')  
  .addSelect(sql.ref('u.full_name').as('authorName'));  
```
### Strict `where`[​](https://mikro-orm.io/docs/next/guide/type-safety#strict-where "Direct link to strict-where")
The `where` method validates aliased object conditions against the known aliases and their entity types:
```
const qb = em.createQueryBuilder(ArticleSchema, 'a')  
  .leftJoin('a.author', 'u');  
  
// ok: 'u' maps to User, which has a `fullName` property  
qb.where({ 'u.fullName': 'Jon' });  
  
// ok: 'a' maps to Article, which has a `title` property  
qb.where({ 'a.title': 'Hello World' });  
  
// compile error: 'x' is not a known alias  
qb.where({ 'x.foo': 1 });  
```
This also works with nested conditions:
```
qb.where({  
  $or: [  
    { 'a.title': { $like: '%orm%' } },  
    { 'u.fullName': 'Jon' },  
  ],  
});  
```
### Result types with `joinAndSelect`[​](https://mikro-orm.io/docs/next/guide/type-safety#result-types-with-joinandselect "Direct link to result-types-with-joinandselect")
When you use `joinAndSelect` or `leftJoinAndSelect`, the `Hint` type parameter is updated automatically, so `getResultList()` returns properly typed `Loaded` entities:
```
const articles = await em.createQueryBuilder(ArticleSchema, 'a')  
  .leftJoinAndSelect('a.author', 'u')  
  .getResultList();  
// articles is `Loaded<Article, 'author'>[]`  
  
// type-safe access to loaded author:  
articles[0].author.$.fullName; // ok  
```
This is equivalent to using `em.find` with `populate: ['author']`, but with the flexibility of the QueryBuilder API.
### Result types with `select`[​](https://mikro-orm.io/docs/next/guide/type-safety#result-types-with-select "Direct link to result-types-with-select")
When you use `select` to pick specific fields, the `Fields` type parameter tracks which fields were selected:
```
const articles = await em.createQueryBuilder(ArticleSchema, 'a')  
  .select(['a.title', 'a.description'])  
  .getResultList();  
// articles is `Loaded<Article, never, 'title' | 'description'>[]`  
  
articles[0].title;       // ok, selected  
articles[0].description; // ok, selected  
articles[0].slug;        // fail, not selected  
articles[0].id;          // ok, PK is always available  
```
### Awaiting the QueryBuilder[​](https://mikro-orm.io/docs/next/guide/type-safety#awaiting-the-querybuilder "Direct link to Awaiting the QueryBuilder")
You can directly `await` a `QueryBuilder` instance. The return type depends on what kind of query you're building:
```
// SelectQueryBuilder → awaiting yields entity array  
const articles = await em.qb(ArticleSchema)  
  .select('*')  
  .where({ title: { $like: '%orm%' } })  
  .limit(5);  
// articles is Article[]  
  
// CountQueryBuilder → awaiting yields number  
const count = await em.qb(ArticleSchema)  
  .count()  
  .where({ title: { $like: '%orm%' } });  
// count is number  
  
// InsertQueryBuilder → awaiting yields QueryResult  
const res1 = await em.qb(ArticleSchema).insert({  
  title: 'New Article',  
  text: 'Content here',  
  author: 1,  
});  
// res1 is QueryResult<Article>  
console.log(res1.insertId);  
  
// UpdateQueryBuilder → awaiting yields QueryResult  
const res2 = await em.qb(ArticleSchema)  
  .update({ title: 'Updated' })  
  .where({ id: 1 });  
// res2 is QueryResult<Article>  
console.log(res2.affectedRows);  
  
// DeleteQueryBuilder → awaiting yields QueryResult  
const res3 = await em.qb(ArticleSchema)  
  .delete()  
  .where({ id: 1 });  
// res3 is QueryResult<Article>  
```
> `em.qb()` is a shortcut for `em.createQueryBuilder()`.
## Assigning to `Reference` properties[​](https://mikro-orm.io/docs/next/guide/type-safety#assigning-to-reference-properties "Direct link to assigning-to-reference-properties")
When you define a property as a `Reference` wrapper, you will need to assign a `Reference` instance to it instead of the entity. You can convert any entity to a `Reference` via `ref(entity)`, or use the `wrapped` option of `em.getReference()`:
> `ref(e)` is a shortcut for `wrap(e).toReference()`, which is the same as `Reference.create(e)`.
```
import { ref } from '@mikro-orm/core';  
  
const article = await em.findOne(ArticleSchema, 1);  
const repo = em.getRepository(User);  
  
article.author = repo.getReference(2, { wrapped: true });  
  
// same as:  
article.author = ref(repo.getReference(2));  
await em.flush();  
```
You can also create entity references without access to `EntityManager` using the `rel()` helper:
```
import { rel } from '@mikro-orm/core';  
  
const article = em.create(ArticleSchema, {  
  title: 'New Article',  
  text: 'Content here',  
  author: rel(User, 1),  
});  
```
[](https://github.com/mikro-orm/mikro-orm/edit/master/docs/docs/guide/05-type-safety.md)
Last updated on **May 17, 2026** by **Martin Adámek**
[Previous Chapter 4: Advanced](https://mikro-orm.io/docs/next/guide/advanced)[Next Core Concepts](https://mikro-orm.io/docs/next/core-concepts)
  * [`Loaded` type and populate hints](https://mikro-orm.io/docs/next/guide/type-safety#loaded-type-and-populate-hints)
  * [`Reference` wrapper](https://mikro-orm.io/docs/next/guide/type-safety#reference-wrapper)
    * [Using `Reference.load()`](https://mikro-orm.io/docs/next/guide/type-safety#using-referenceload)
    * [`LazyRef<T>` — type-only alternative](https://mikro-orm.io/docs/next/guide/type-safety#lazyreft--type-only-alternative)
    * [`ScalarReference` wrapper](https://mikro-orm.io/docs/next/guide/type-safety#scalarreference-wrapper)
  * [Strict partial loading with `fields`](https://mikro-orm.io/docs/next/guide/type-safety#strict-partial-loading-with-fields)
  * [QueryBuilder type safety](https://mikro-orm.io/docs/next/guide/type-safety#querybuilder-type-safety)
    * [Context-aware joins](https://mikro-orm.io/docs/next/guide/type-safety#context-aware-joins)
    * [Strict `select`](https://mikro-orm.io/docs/next/guide/type-safety#strict-select)
    * [Strict `where`](https://mikro-orm.io/docs/next/guide/type-safety#strict-where)
    * [Result types with `joinAndSelect`](https://mikro-orm.io/docs/next/guide/type-safety#result-types-with-joinandselect)
    * [Result types with `select`](https://mikro-orm.io/docs/next/guide/type-safety#result-types-with-select)
    * [Awaiting the QueryBuilder](https://mikro-orm.io/docs/next/guide/type-safety#awaiting-the-querybuilder)
  * [Assigning to `Reference` properties](https://mikro-orm.io/docs/next/guide/type-safety#assigning-to-reference-properties)
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
# https://mikro-orm.io/docs/next/core-concepts
============================================================
[Skip to main content](https://mikro-orm.io/docs/next/core-concepts#__docusaurus_skipToContent_fallback)
⭐️ If you like MikroORM, give it a star on [GitHub](https://github.com/mikro-orm/mikro-orm) and consider [sponsoring](https://github.com/sponsors/mikro-orm) its development! ⭐️
[![MikroORM](https://mikro-orm.io/img/logo.svg)](https://mikro-orm.io/)
[Next](https://mikro-orm.io/docs/next/core-concepts)
  * [Next](https://mikro-orm.io/docs/next/core-concepts)
  * [7.1](https://mikro-orm.io/docs/core-concepts)
  * [7.0](https://mikro-orm.io/docs/7.0/core-concepts)
  * [6.6](https://mikro-orm.io/docs/6.6/quick-start)
  * [5.9](https://mikro-orm.io/docs/5.9/installation)
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
    * [Architecture](https://mikro-orm.io/docs/next/architecture)
    * [Entity Manager](https://mikro-orm.io/docs/next/entity-manager)
    * [Unit of Work](https://mikro-orm.io/docs/next/unit-of-work)
    * [Identity Map](https://mikro-orm.io/docs/next/identity-map)
    * [Transactions and Concurrency](https://mikro-orm.io/docs/next/transactions)
    * [Entity Repository](https://mikro-orm.io/docs/next/repositories)
    * [Collections](https://mikro-orm.io/docs/next/collections)
    * [The wrap() Helper](https://mikro-orm.io/docs/next/wrap-helper)
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
For up-to-date documentation, see the **[latest version](https://mikro-orm.io/docs/core-concepts)** (7.1).
Version: Next
# Core Concepts
## [ 📄️Architecture This guide explains how MikroORM works internally. It's intended for users who want a deeper understanding of the ORM's behavior, as well as contributors looking to understand the codebase.](https://mikro-orm.io/docs/next/architecture)## [ 📄️Entity Manager Persist and Flush](https://mikro-orm.io/docs/next/entity-manager)## [ 📄️Unit of Work MikroORM uses the Identity Map pattern to track objects. Whenever you fetch an object from the database, MikroORM will keep a reference to this object inside its UnitOfWork.](https://mikro-orm.io/docs/next/unit-of-work)## [ 📄️Identity Map MikroORM uses identity map in background, so you will always get the same instance of one entity.](https://mikro-orm.io/docs/next/identity-map)## [ 📄️Transactions and Concurrency Transactions are also supported in MongoDB driver.](https://mikro-orm.io/docs/next/transactions)## [ 📄️Entity Repository Entity Repositories are thin layers on top of EntityManager. They act as an extension point, so you can add custom methods, or even alter the existing ones. The default EntityRepository implementation just forwards the calls to underlying EntityManager instance.](https://mikro-orm.io/docs/next/repositories)## [ 📄️Collections OneToMany and ManyToMany properties are stored in a Collection wrapper.](https://mikro-orm.io/docs/next/collections)## [ 📄️The wrap() Helper The wrap() helper provides access to useful methods for working with entities. It returns a WrappedEntity instance that exposes methods for checking entity state, loading relations, serializing, and updating values.](https://mikro-orm.io/docs/next/wrap-helper)[Previous Chapter 5: Type-safety](https://mikro-orm.io/docs/next/guide/type-safety)[Next Architecture](https://mikro-orm.io/docs/next/architecture)
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
# https://mikro-orm.io/docs/next/modeling
============================================================
[Skip to main content](https://mikro-orm.io/docs/next/modeling#__docusaurus_skipToContent_fallback)
⭐️ If you like MikroORM, give it a star on [GitHub](https://github.com/mikro-orm/mikro-orm) and consider [sponsoring](https://github.com/sponsors/mikro-orm) its development! ⭐️
[![MikroORM](https://mikro-orm.io/img/logo.svg)](https://mikro-orm.io/)
[Next](https://mikro-orm.io/docs/next/modeling)
  * [Next](https://mikro-orm.io/docs/next/modeling)
  * [7.1](https://mikro-orm.io/docs/modeling)
  * [7.0](https://mikro-orm.io/docs/7.0/modeling)
  * [6.6](https://mikro-orm.io/docs/6.6/quick-start)
  * [5.9](https://mikro-orm.io/docs/5.9/installation)
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
    * [Defining Entities](https://mikro-orm.io/docs/next/defining-entities)
    * [Modeling Entity Relationships](https://mikro-orm.io/docs/next/relationships)
    * [Type-Safe Relations](https://mikro-orm.io/docs/next/type-safe-relations)
    * [Inheritance Mapping](https://mikro-orm.io/docs/next/inheritance-mapping)
    * [Indexes and Unique Constraints](https://mikro-orm.io/docs/next/indexes)
    * [Embeddables](https://mikro-orm.io/docs/next/embeddables)
    * [Composite Primary Keys](https://mikro-orm.io/docs/next/composite-keys)
    * [JSON Properties](https://mikro-orm.io/docs/next/json-properties)
    * [Custom Types](https://mikro-orm.io/docs/next/custom-types)
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
For up-to-date documentation, see the **[latest version](https://mikro-orm.io/docs/modeling)** (7.1).
Version: Next
# Modeling
## [ 📄️Defining Entities Entities are simple javascript objects (so called POJO) without restrictions and without the need to extend base classes. Using entity constructors works as well - they are never executed for managed entities (loaded from database). Every entity is required to have a primary key.](https://mikro-orm.io/docs/next/defining-entities)## [ 📄️Modeling Entity Relationships There are 4 types of entity relationships in MikroORM:](https://mikro-orm.io/docs/next/relationships)## [ 📄️Type-Safe Relations Entity relations are mapped to entity references - instances of the entity that have at least the primary key available. This reference is stored in the identity map, so you will get the same object reference when fetching the same document from the database.](https://mikro-orm.io/docs/next/type-safe-relations)## [ 📄️Inheritance Mapping Mapped Superclasses](https://mikro-orm.io/docs/next/inheritance-mapping)## [ 📄️Indexes and Unique Constraints MikroORM provides comprehensive support for defining indexes and unique constraints on your entities. This guide covers everything from basic usage to advanced database-specific features.](https://mikro-orm.io/docs/next/indexes)## [ 📄️Embeddables Support for embeddables was added in version 4.0](https://mikro-orm.io/docs/next/embeddables)## [ 📄️Composite Primary Keys Support for composite keys was added in version 3.5](https://mikro-orm.io/docs/next/composite-keys)## [ 📄️JSON Properties Defining JSON properties](https://mikro-orm.io/docs/next/json-properties)## [ 📄️Custom Types You can define custom types by extending Type abstract class. It has several optional methods:](https://mikro-orm.io/docs/next/custom-types)[Previous The wrap() Helper](https://mikro-orm.io/docs/next/wrap-helper)[Next Defining Entities](https://mikro-orm.io/docs/next/defining-entities)
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
# https://mikro-orm.io/docs/next/querying
============================================================
[Skip to main content](https://mikro-orm.io/docs/next/querying#__docusaurus_skipToContent_fallback)
⭐️ If you like MikroORM, give it a star on [GitHub](https://github.com/mikro-orm/mikro-orm) and consider [sponsoring](https://github.com/sponsors/mikro-orm) its development! ⭐️
[![MikroORM](https://mikro-orm.io/img/logo.svg)](https://mikro-orm.io/)
[Next](https://mikro-orm.io/docs/next/querying)
  * [Next](https://mikro-orm.io/docs/next/querying)
  * [7.1](https://mikro-orm.io/docs/querying)
  * [7.0](https://mikro-orm.io/docs/7.0/querying)
  * [6.6](https://mikro-orm.io/docs/6.6/quick-start)
  * [5.9](https://mikro-orm.io/docs/5.9/installation)
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
    * [Query Conditions](https://mikro-orm.io/docs/next/query-conditions)
    * [Populating relations](https://mikro-orm.io/docs/next/populating-relations)
    * [Loading Strategies](https://mikro-orm.io/docs/next/loading-strategies)
    * [Filters](https://mikro-orm.io/docs/next/filters)
    * [Query Builder](https://mikro-orm.io/docs/next/query-builder)
    * [Using raw SQL query fragments](https://mikro-orm.io/docs/next/raw-queries)
    * [Kysely](https://mikro-orm.io/docs/next/kysely)
  * [Schema & Database](https://mikro-orm.io/docs/next/schema-database)
  * [Advanced](https://mikro-orm.io/docs/next/advanced)
  * [Configuration](https://mikro-orm.io/docs/next/configuration)
  * [Integrations](https://mikro-orm.io/docs/next/integrations)
  * [Recipes](https://mikro-orm.io/docs/next/recipes)
  * [Reference](https://mikro-orm.io/docs/next/reference)
  * [Example Integrations](https://mikro-orm.io/docs/next/examples)
  * [Upgrading](https://mikro-orm.io/docs/next/upgrading)
This is unreleased documentation for MikroORM **Next** version.
For up-to-date documentation, see the **[latest version](https://mikro-orm.io/docs/querying)** (7.1).
Version: Next
# Querying
## [ 📄️Query Conditions When you want to make complex queries, you can easily end up with a lot of boilerplate code full of curly brackets:](https://mikro-orm.io/docs/next/query-conditions)## [ 📄️Populating relations MikroORM is capable of loading large nested structures while maintaining good performance, querying each database table only once. Imagine you have this nested structure:](https://mikro-orm.io/docs/next/populating-relations)## [ 📄️Loading Strategies MikroORM supports three loading strategies:](https://mikro-orm.io/docs/next/loading-strategies)## [ 📄️Filters MikroORM has the ability to pre-define filter criteria and attach those filters to given entities. The application can then decide at runtime whether certain filters should be enabled and what their parameter values should be. Filters can be used like database views, but they are parameterized inside the application.](https://mikro-orm.io/docs/next/filters)## [ 📄️Query Builder To have access to createQueryBuilder() method, you need to import EntityManager from your driver package.](https://mikro-orm.io/docs/next/query-builder)## [ 📄️Using raw SQL query fragments raw() helper](https://mikro-orm.io/docs/next/raw-queries)## [ 📄️Kysely MikroORM provides first-class integration with Kysely, a type-safe SQL query builder. Through this integration, you can get a configured Kysely instance directly from EntityManager, leveraging MikroORM's metadata to drive Kysely's query transformation and type inference.](https://mikro-orm.io/docs/next/kysely)[Previous Custom Types](https://mikro-orm.io/docs/next/custom-types)[Next Query Conditions](https://mikro-orm.io/docs/next/query-conditions)
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
# https://mikro-orm.io/docs/next/schema-database
============================================================
[Skip to main content](https://mikro-orm.io/docs/next/schema-database#__docusaurus_skipToContent_fallback)
⭐️ If you like MikroORM, give it a star on [GitHub](https://github.com/mikro-orm/mikro-orm) and consider [sponsoring](https://github.com/sponsors/mikro-orm) its development! ⭐️
[![MikroORM](https://mikro-orm.io/img/logo.svg)](https://mikro-orm.io/)
[Next](https://mikro-orm.io/docs/next/schema-database)
  * [Next](https://mikro-orm.io/docs/next/schema-database)
  * [7.1](https://mikro-orm.io/docs/schema-database)
  * [7.0](https://mikro-orm.io/docs/7.0/schema-database)
  * [6.6](https://mikro-orm.io/docs/6.6/quick-start)
  * [5.9](https://mikro-orm.io/docs/5.9/installation)
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
    * [Schema Generator](https://mikro-orm.io/docs/next/schema-generator)
    * [Migrations](https://mikro-orm.io/docs/next/migrations)
    * [Seeding](https://mikro-orm.io/docs/next/seeding)
    * [Entity Generator](https://mikro-orm.io/docs/next/entity-generator)
    * [Naming Strategy](https://mikro-orm.io/docs/next/naming-strategy)
    * [Using Multiple Schemas](https://mikro-orm.io/docs/next/multiple-schemas)
    * [Virtual Entities](https://mikro-orm.io/docs/next/virtual-entities)
    * [View Entities](https://mikro-orm.io/docs/next/view-entities)
    * [Materialized Views](https://mikro-orm.io/docs/next/materialized-views)
    * [Stored Routines](https://mikro-orm.io/docs/next/stored-routines)
  * [Advanced](https://mikro-orm.io/docs/next/advanced)
  * [Configuration](https://mikro-orm.io/docs/next/configuration)
  * [Integrations](https://mikro-orm.io/docs/next/integrations)
  * [Recipes](https://mikro-orm.io/docs/next/recipes)
  * [Reference](https://mikro-orm.io/docs/next/reference)
  * [Example Integrations](https://mikro-orm.io/docs/next/examples)
  * [Upgrading](https://mikro-orm.io/docs/next/upgrading)
This is unreleased documentation for MikroORM **Next** version.
For up-to-date documentation, see the **[latest version](https://mikro-orm.io/docs/schema-database)** (7.1).
Version: Next
# Schema & Database
## [ 📄️Schema Generator SchemaGenerator can do harm to your database. It will drop or alter tables, indexes, sequences and such. Please use this tool with caution in development and not on a production server. It is meant for helping you develop your Database Schema, but NOT with migrating schema from A to B in production. A safe approach would be generating the SQL on development server and saving it into SQL Migration files that are executed manually on the production server.](https://mikro-orm.io/docs/next/schema-generator)## [ 📄️Migrations MikroORM has integrated support for migrations. It allows you to generate migrations based on the current schema difference.](https://mikro-orm.io/docs/next/migrations)## [ 📄️Seeding When initializing your application or testing it can be exhausting to create sample data for your database. The solution is to use seeding. Create factories for your entities and use them in the seed script or combine multiple seed scripts.](https://mikro-orm.io/docs/next/seeding)## [ 📄️Entity Generator To generate entities from existing database schema, you can use the EntityGenerator helper. It lives in its own package called @mikro-orm/entity-generator:](https://mikro-orm.io/docs/next/entity-generator)## [ 📄️Naming Strategy When mapping your entities to database tables and columns, their names will be defined by naming strategy. There are 3 basic naming strategies you can choose from:](https://mikro-orm.io/docs/next/naming-strategy)## [ 📄️Using Multiple Schemas In MySQL, PostgreSQL, and SQLite (via ATTACH DATABASE) it is possible to define your entities in multiple schemas. In MySQL terminology, it is called database, but from an implementation point of view, it is a schema.](https://mikro-orm.io/docs/next/multiple-schemas)## [ 📄️Virtual Entities Virtual entities don't represent any database table. Instead, they dynamically resolve to an SQL query (or an aggregation in MongoDB), allowing to map any kind of results onto an entity. Such entities are meant for read purposes, they don't have a primary key and therefore cannot be tracked for changes.](https://mikro-orm.io/docs/next/virtual-entities)## [ 📄️View Entities View entities represent actual database views that are created and managed by MikroORM's schema generator. Unlike virtual entities which evaluate expressions at query time, view entities create persistent CREATE VIEW statements in your database.](https://mikro-orm.io/docs/next/view-entities)## [ 📄️Materialized Views Materialized views store the results of a query physically, providing faster read performance at the cost of data freshness. Unlike regular views, materialized views must be explicitly refreshed to reflect changes in the underlying data.](https://mikro-orm.io/docs/next/materialized-views)## [ 📄️Stored Routines Stored-routine support landed in v7.1 and is considered experimental while we gather real-world feedback. The configuration types (RoutineConfig, RoutineParamConfig, RoutineReturns) and runtime behaviour may evolve in a patch release. Pin your MikroORM version if you rely on the exact API shape.](https://mikro-orm.io/docs/next/stored-routines)[Previous Kysely](https://mikro-orm.io/docs/next/kysely)[Next Schema Generator](https://mikro-orm.io/docs/next/schema-generator)
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
# https://mikro-orm.io/docs/next/advanced
============================================================
[Skip to main content](https://mikro-orm.io/docs/next/advanced#__docusaurus_skipToContent_fallback)
⭐️ If you like MikroORM, give it a star on [GitHub](https://github.com/mikro-orm/mikro-orm) and consider [sponsoring](https://github.com/sponsors/mikro-orm) its development! ⭐️
[![MikroORM](https://mikro-orm.io/img/logo.svg)](https://mikro-orm.io/)
[Next](https://mikro-orm.io/docs/next/advanced)
  * [Next](https://mikro-orm.io/docs/next/advanced)
  * [7.1](https://mikro-orm.io/docs/advanced)
  * [7.0](https://mikro-orm.io/docs/7.0/advanced)
  * [6.6](https://mikro-orm.io/docs/6.6/advanced)
  * [5.9](https://mikro-orm.io/docs/5.9/advanced)
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
    * [Events and Hooks](https://mikro-orm.io/docs/next/events)
    * [Cascading](https://mikro-orm.io/docs/next/cascading)
    * [Serializing](https://mikro-orm.io/docs/next/serializing)
    * [Result cache](https://mikro-orm.io/docs/next/caching)
    * [Dataloaders](https://mikro-orm.io/docs/next/dataloaders)
    * [Streaming](https://mikro-orm.io/docs/next/streaming)
    * [Query cancellation](https://mikro-orm.io/docs/next/query-cancellation)
    * [Read Replica Connections](https://mikro-orm.io/docs/next/read-connections)
    * [Propagation](https://mikro-orm.io/docs/next/propagation)
    * [Property Validation](https://mikro-orm.io/docs/next/property-validation)
  * [Configuration](https://mikro-orm.io/docs/next/configuration)
  * [Integrations](https://mikro-orm.io/docs/next/integrations)
  * [Recipes](https://mikro-orm.io/docs/next/recipes)
  * [Reference](https://mikro-orm.io/docs/next/reference)
  * [Example Integrations](https://mikro-orm.io/docs/next/examples)
  * [Upgrading](https://mikro-orm.io/docs/next/upgrading)
This is unreleased documentation for MikroORM **Next** version.
For up-to-date documentation, see the **[latest version](https://mikro-orm.io/docs/advanced)** (7.1).
Version: Next
# Advanced
## [ 📄️Events and Hooks There are two ways to hook into the lifecycle of an entity:](https://mikro-orm.io/docs/next/events)## [ 📄️Cascading Cascade merging is no longer configurable (and is kept enabled for all relations).](https://mikro-orm.io/docs/next/cascading)## [ 📄️Serializing By default, the ORM will define a toJSON method on all of your entity prototypes during discovery. This means that when you try to serialize your entity via JSON.stringify(), the ORM serialization will kick in automatically. The default implementation uses EntityTransformer.toObject() method, which converts an entity instance into a POJO. During this process, ORM specific constructs like the Reference or Collection wrappers are converted to their underlying values.](https://mikro-orm.io/docs/next/serializing)## [ 📄️Result cache MikroORM has a simple result caching mechanism. It works with those methods of EntityManager: find(), findOne(), findAndCount(), findOneOrFail(), count(), as well as with QueryBuilder result methods (including execute).](https://mikro-orm.io/docs/next/caching)## [ 📄️Dataloaders The n+1 problem is when multiple types of data are requested in one query, but where n requests are required instead of just one. This is typically encountered when data is nested, such as if you were requesting authors and the name of their books. It is an inherent problem of GraphQL APIs and can be solved by batching multiple requests into a single one. This can be automated via the dataloader library which will coalesce all individual loads which occur within a single frame of execution (a single tick of the event loop) and then call your batch function with all requested keys. That means writing a batch loading function for every db call that aggregates multiple queries into a single one, plus filtering the results to reassign them to the original queries. Fortunately, MikroORM has plenty of metadata to transparently automate this process so that you won't have to write your own batch loading functions.](https://mikro-orm.io/docs/next/dataloaders)## [ 📄️Streaming If you want to process large amount of entities without loading them all into memory at once, you can use em.stream() method. It returns an async iterable, so you can use it in for await ... of loop.](https://mikro-orm.io/docs/next/streaming)## [ 📄️Query cancellation Long-running queries can be cancelled via standard AbortSignal, either per-call or as a default for an EntityManager fork.](https://mikro-orm.io/docs/next/query-cancellation)## [ 📄️Read Replica Connections Users can specify multiple read connections via replicas option. You can provide only fields that differ from master connection, rest will be taken from it.](https://mikro-orm.io/docs/next/read-connections)## [ 📄️Propagation By default, MikroORM will propagate all changes made to one side of bidirectional relations to the other side, keeping them in sync. This works for all relations, including M1. As part of the discovery process, all M1 properties are re-defined as getter/setter.](https://mikro-orm.io/docs/next/propagation)## [ 📄️Property Validation Required properties](https://mikro-orm.io/docs/next/property-validation)[Previous Stored Routines](https://mikro-orm.io/docs/next/stored-routines)[Next Events and Hooks](https://mikro-orm.io/docs/next/events)
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
# https://mikro-orm.io/docs/next/configuration
============================================================
[Skip to main content](https://mikro-orm.io/docs/next/configuration#__docusaurus_skipToContent_fallback)
⭐️ If you like MikroORM, give it a star on [GitHub](https://github.com/mikro-orm/mikro-orm) and consider [sponsoring](https://github.com/sponsors/mikro-orm) its development! ⭐️
[ ![MikroORM](https://mikro-orm.io/img/logo.svg)![MikroORM](https://mikro-orm.io/img/logo-dark.svg) ](https://mikro-orm.io/)
[Next](https://mikro-orm.io/docs/next/configuration)
  * [Next](https://mikro-orm.io/docs/next/configuration)
  * [7.1](https://mikro-orm.io/docs/configuration)
  * [7.0](https://mikro-orm.io/docs/7.0/configuration)
  * [6.6](https://mikro-orm.io/docs/6.6/configuration)
  * [5.9](https://mikro-orm.io/docs/5.9/configuration)
[Docs](https://mikro-orm.io/docs/quick-start)[API](https://mikro-orm.io/api)[Blog](https://mikro-orm.io/blog)[Changelog](https://mikro-orm.io/changelog)
[latest: v7.1.3](https://mikro-orm.io/versions)[Discord](https://discord.gg/w8bjxFHS7X "Chat on Discord")[GitHub](https://github.com/mikro-orm/mikro-orm "View on GitHub")[Twitter](https://twitter.com/MikroORM "Twitter")
Search
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
    * [Logging](https://mikro-orm.io/docs/next/logging)
    * [Deployment](https://mikro-orm.io/docs/next/deployment)
    * [Defining Entities via defineEntity](https://mikro-orm.io/docs/next/define-entity)
    * [Using Decorators](https://mikro-orm.io/docs/next/using-decorators)
    * [Folder-based Discovery](https://mikro-orm.io/docs/next/folder-based-discovery)
    * [Metadata Providers](https://mikro-orm.io/docs/next/metadata-providers)
    * [Metadata Cache](https://mikro-orm.io/docs/next/metadata-cache)
    * [Canary & dev builds](https://mikro-orm.io/docs/next/canary-builds)
  * [Integrations](https://mikro-orm.io/docs/next/integrations)
  * [Recipes](https://mikro-orm.io/docs/next/recipes)
  * [Reference](https://mikro-orm.io/docs/next/reference)
  * [Example Integrations](https://mikro-orm.io/docs/next/examples)
  * [Upgrading](https://mikro-orm.io/docs/next/upgrading)
This is unreleased documentation for MikroORM **Next** version.
For up-to-date documentation, see the **[latest version](https://mikro-orm.io/docs/configuration)** (7.1).
Version: Next
On this page
# Configuration
## Entity Discovery[​](https://mikro-orm.io/docs/next/configuration#entity-discovery "Direct link to Entity Discovery")
You can either provide array of entity instances via `entities`, or let the ORM look up your entities in selected folders.
```
MikroORM.init({  
  entities: [Author, Book, Publisher, BookTag],  
});  
```
You can also use folder based discovery by providing list of paths to the entities you want to discover (globs are supported as well). This way you also need to specify `entitiesTs`, where you point the paths to the TS source files instead of the JS compiled files (see more at [Metadata Providers](https://mikro-orm.io/docs/next/metadata-providers)).
> The `entitiesTs` option is used when running the app in TypeScript mode (e.g. via `tsx` or `swc`), as the ORM needs to discover the TS files. Always specify this option if you use folder/file based discovery.
```
MikroORM.init({  
  entities: ['./dist/modules/users/entities', './dist/modules/projects/entities'],  
  entitiesTs: ['./src/modules/users/entities', './src/modules/projects/entities'],  
  // optionally you can override the base directory (defaults to `process.cwd()`)  
  baseDir: process.cwd(),  
});  
```
> Be careful when overriding the `baseDir` with dynamic values like `__dirname`, as you can end up with valid paths from dev mode, but invalid paths from production build. Ideally you should keep the default of `process.cwd()` there to always have the same base path regardless of how you run the app.
> You can also use the `mikro-orm discovery:export` CLI command to generate a barrel file with all entity imports from your source files. This works as a middle ground between folder-based discovery and manual entity arrays — see [Folder-based Discovery](https://mikro-orm.io/docs/next/folder-based-discovery#generating-a-barrel-file-with-discoveryexport) for details.
By default, `ReflectMetadataProvider` is used that leverages the `reflect-metadata`. You can also use `TsMorphMetadataProvider` by installing `@mikro-orm/reflection`. This provider will analyse your entity source files (or `.d.ts` type definition files). If you aim to use plain JavaScript instead of TypeScript, use `EntitySchema`.
> You can also implement your own metadata provider and use it instead. To do so, extend the `MetadataProvider` class.
```
import { MikroORM } from '@mikro-orm/core';  
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';  
  
MikroORM.init({  
  metadataProvider: TsMorphMetadataProvider,  
});  
```
There are also some additional options how you can adjust the discovery process:
```
MikroORM.init({  
  discovery: {  
    // by default, discovery throws when no entity is processed  
    warnWhenNoEntities: false,  
    // by default, discovery throws when duplicate table names are found  
    checkDuplicateTableNames: false,   
    // by default, discovery throws when duplicate field names are found  
    checkDuplicateFieldNames: false,  
    // by default, discovery throws when duplicate entities are found  
    checkDuplicateEntities: false,   
    // by default, discovery throws when composite primary keys are marked as `persist: false`  
    checkNonPersistentCompositeProps: false,  
    // by default, default values are inferred from property initializers (if it's possible to invoke the constructor without parameters)  
    inferDefaultValues: false,   
  },  
});  
```
Read more about this in [Metadata Providers](https://mikro-orm.io/docs/next/metadata-providers) sections.
### Adjusting default type mapping[​](https://mikro-orm.io/docs/next/configuration#adjusting-default-type-mapping "Direct link to Adjusting default type mapping")
You can alter how the ORM picks the default mapped type representation based on the inferred type of property. One example is a mapping of `foo: string` to `varchar(255)`. If you wanted to change this default to a `text` type in postgres, you can use the `discover.getMappedType` callback:
```
import { MikroORM, Platform, Type } from '@mikro-orm/core';  
  
const orm = await MikroORM.init({  
  discovery: {  
    getMappedType(type: string, platform: Platform) {  
      // override the mapping for string properties only  
      if (type === 'string') {  
        return Type.getType(TextType);  
      }  
  
      return platform.getDefaultMappedType(type);  
    },  
  },  
});  
```
###  `onMetadata` hook[​](https://mikro-orm.io/docs/next/configuration#onmetadata-hook "Direct link to onmetadata-hook")
Sometimes you might want to alter some behavior of the ORM on metadata level. You can use the `onMetadata` hook to modify the metadata. Let's say you want to use your entities with different drivers, and you want to use some driver specific feature. Using the `onMetadata` hook, you can modify the metadata dynamically to fit the drivers requirements.
The hook will be executed before the internal process of filling defaults, so you can think of it as modifying the property options in your entity definitions, they will be respected e.g. when inferring the column type.
> The hook can be async, but it will be awaited only if you use the async `MikroORM.init()` method, not with the `MikroORM` constructor directly.
```
import { EntityMetadata, MikroORM, Platform } from '@mikro-orm/sqlite';  
  
const orm = await MikroORM.init({  
  // ...  
  discovery: {  
    onMetadata(meta: EntityMetadata, platform: Platform) {  
      // sqlite driver does not support schemas  
      delete meta.schema;  
    },  
  },  
});  
```
Alternatively, you can also use the `afterDiscovered` hook, which is fired after the discovery process ends. You can access all the metadata there, and add or remove them as you wish.
```
import { EntityMetadata, MikroORM, Platform } from '@mikro-orm/sqlite';  
  
const orm = await MikroORM.init({  
  // ...  
  discovery: {  
    afterDiscovered(storage: MetadataStorage) {  
      // ignore FooBar entity in schema generator  
      storage.reset('FooBar');  
    },  
  },  
});  
```
## Extensions[​](https://mikro-orm.io/docs/next/configuration#extensions "Direct link to Extensions")
The ORM extensions like `SchemaGenerator`, `Migrator` or `EntityGenerator` can be registered via the `extensions` config option. This allows the shortcuts like `orm.migrator` to be available without dynamically requiring those dependencies or specifying them as optional peer dependencies (both of those things cause issues with various bundling tools like Webpack, or those used in Remix or Next.js).
```
import { defineConfig } from '@mikro-orm/postgresql';  
import { Migrator } from '@mikro-orm/migrations';  
import { EntityGenerator } from '@mikro-orm/entity-generator';  
import { SeedManager } from '@mikro-orm/seeder';  
  
export default defineConfig({  
  dbName: 'test',  
  extensions: [Migrator, EntityGenerator, SeedManager],  
});  
```
> The `SchemaGenerator` (as well as `MongoSchemaGenerator`) is registered automatically as it does not require any 3rd party dependencies to be installed.
Since v6.3, the extensions are again checked dynamically if not explicitly registered, so it should be enough to have the given package (e.g. `@mikro-orm/seeder`) installed.
## Driver[​](https://mikro-orm.io/docs/next/configuration#driver "Direct link to Driver")
To select driver, you can either use `type` option, or provide the driver class reference.  
| type  | driver name  | dependency  | note  |  
| --- | --- | --- | --- |  
| `mongo`  | `MongoDriver`  | `mongodb`  | -  |  
| `mysql`  | `MySqlDriver`  | `mysql2`  | compatible with MariaDB  |  
| `mariadb`  | `MariaDbDriver`  | `mariadb`  | compatible with MySQL  |  
| `postgresql`  | `PostgreSqlDriver`  | `pg`  | compatible with CockroachDB  |  
| `mssql`  | `MsSqlDriver`  | `tedious`  | -  |  
| `oracledb`  | `OracleDriver`  | `oracledb`  | -  |  
| `sqlite`  | `SqliteDriver`  | `better-sqlite3`  | -  |  
| `libsql`  | `LibSqlDriver`  | `libsql`  | -  |  
> Driver and connection implementations are not directly exported from `@mikro-orm/core` module. You can import them from the driver packages (e.g. `import { PostgreSqlDriver } from '@mikro-orm/postgresql'`).
> You can pass additional options to the underlying driver (e.g. `mysql2`) via `driverOptions`. The object will be deeply merged, overriding all internally used options.
```
import { MySqlDriver } from '@mikro-orm/mysql';  
  
MikroORM.init({  
  driver: MySqlDriver,  
  driverOptions: { timezone: '+02:00' },  
});  
```
For SQL drivers, you can also use `driverOptions` to pass an existing Kysely instance or a Kysely dialect directly (or a function returning one of those):
```
// Reusing an existing Kysely instance  
const kysely = orm.em.getKysely();  
  
MikroORM.init({  
  driverOptions: kysely,  
  // or as a function  
  driverOptions: () => kysely,  
});  
  
// Using a custom Kysely dialect  
MikroORM.init({  
  driverOptions: () => orm.driver.getConnection().createKyselyDialect({}),  
});  
```
For MongoDB, you can pass an existing `MongoClient` instance directly (or a function returning one):
```
const mongo = orm.em.getConnection().getClient();  
  
MikroORM.init({  
  driver: MongoDriver,  
  driverOptions: mongo,  
  // or as a function  
  driverOptions: () => mongo,  
});  
```
> You can also set the timezone directly in the ORM configuration:
> 
```
> 
MikroORM.init({  
> 
> 
> 
  timezone: '+02:00',  
> 
> 
> 
});  
> 
> 
```
## Connection[​](https://mikro-orm.io/docs/next/configuration#connection "Direct link to Connection")
Each platform (driver) provides default connection string, you can override it as a whole through `clientUrl`, or partially through one of following options:
```
export interface ConnectionOptions {  
  dbName?: string;  
  name?: string; // for logging only (when replicas are used)  
  clientUrl?: string;  
  host?: string;  
  port?: number;  
  user?: string;  
  password?: string | (() => string | Promise<string>);  
  charset?: string;  
  multipleStatements?: boolean; // for mysql driver  
  pool?: PoolConfig;  
  attachDatabases?: { name: string; path: string }[]; // SQLite/libSQL only  
}  
```
Following table shows default client connection strings:  
| type  | default connection url  |  
| --- | --- |  
| `mongo`  | `mongodb://127.0.0.1:27017`  |  
| `mysql`  | `mysql://root@127.0.0.1:3306`  |  
| `mariadb`  | `mysql://root@127.0.0.1:3306`  |  
| `postgresql`  | `postgresql://postgres@127.0.0.1:5432`  |  
### Read Replicas[​](https://mikro-orm.io/docs/next/configuration#read-replicas "Direct link to Read Replicas")
To set up read replicas, you can use `replicas` option. You can provide only those parts of the `ConnectionOptions` interface, they will be used to override the `master` connection options.
```
MikroORM.init({  
  dbName: 'my_db_name',  
  user: 'write-user',  
  host: 'master.db.example.com',  
  port: 3306,  
  replicas: [  
    { user: 'read-user-1', host: 'read-1.db.example.com', port: 3307 },  
    { user: 'read-user-2', host: 'read-2.db.example.com', port: 3308 },  
    { user: 'read-user-3', host: 'read-3.db.example.com', port: 3309 },  
  ],  
});  
```
Read more about this in [Installation](https://mikro-orm.io/docs/next/quick-start) and [Read Connections](https://mikro-orm.io/docs/next/read-connections) sections.
### Attached Databases (SQLite)[​](https://mikro-orm.io/docs/next/configuration#attached-databases-sqlite "Direct link to Attached Databases \(SQLite\)")
SQLite and libSQL drivers support attaching additional database files to a single connection via the `attachDatabases` option. Each attached database acts as a separate schema, allowing you to organize entities across multiple database files.
Read more about this in [Using Multiple Schemas](https://mikro-orm.io/docs/next/multiple-schemas#sqlite-attach-database) section.
### Using short-lived tokens[​](https://mikro-orm.io/docs/next/configuration#using-short-lived-tokens "Direct link to Using short-lived tokens")
Many cloud providers include alternative methods for connecting to database instances using short-lived authentication tokens. MikroORM supports dynamic passwords via a callback function, either synchronous or asynchronous. The callback function must resolve to a string.
```
MikroORM.init({  
  dbName: 'my_db_name',  
  password: async () => someCallToGetTheToken(),  
});  
```
### Connection reserve hook[​](https://mikro-orm.io/docs/next/configuration#connection-reserve-hook "Direct link to Connection reserve hook")
`onReserveConnection` is awaited every time a connection is acquired from the pool, before any query runs on it. It can be combined with `AsyncLocalStorage` to set request-scoped session variables before each query, for example when using row-level security policies.
It is supported by the PostgreSQL, MySQL/MariaDB, and MSSQL drivers; other drivers (SQLite, libSQL, Oracle) ignore it. For PostgreSQL and MySQL/MariaDB it is forwarded to Kysely's dialect; for MSSQL the hook runs on every checkout from the `tedious` pool. The example below uses PostgreSQL syntax — adapt the statement to your driver (e.g. `sp_set_session_context` on MSSQL).
```
import { PostgreSqlDriver } from '@mikro-orm/postgresql';  
import { CompiledQuery, type DatabaseConnection } from 'kysely';  
  
MikroORM.init({  
  driver: PostgreSqlDriver,  
  onReserveConnection: async connection => {  
    const db = connection as DatabaseConnection;  
    const tenantId = getTenantIdFromContext();  
  
    await db.executeQuery(  
      CompiledQuery.raw('select set_config($1, $2, false)', ['app.current_tenant_id', tenantId ?? '']),  
    );  
  },  
});  
```
###  `onQuery` hook and observability[​](https://mikro-orm.io/docs/next/configuration#onquery-hook-and-observability "Direct link to onquery-hook-and-observability")
Sometimes you might want to alter the generated queries. One use case for that might be adding contextual query hints to allow observability. Before a more native approach is added to the ORM, you can use the `onQuery` hook to modify all the queries by hand. The hook will be fired for every query before its execution.
```
import { AsyncLocalStorage } from 'node:async_hooks';  
  
const ctx = new AsyncLocalStorage();  
  
// provide the necessary data to the store in some middleware  
app.use((req, res, next) => {  
  const store = { endpoint: req.url };  
  ctx.run(store, next);  
});  
  
MikroORM.init({  
  onQuery: (sql: string, params: unknown[]) => {  
    const store = ctx.getStore();  
  
    if (!store) {  
      return sql;  
    }  
  
    // your function that generates the necessary query hint  
    const hint = createQueryHint(store);  
  
    return sql + hint;  
  },  
});  
```
## Naming Strategy[​](https://mikro-orm.io/docs/next/configuration#naming-strategy "Direct link to Naming Strategy")
When mapping your entities to database tables and columns, their names will be defined by naming strategy. There are 3 basic naming strategies you can choose from:
  * `UnderscoreNamingStrategy` - default of all SQL drivers
  * `MongoNamingStrategy` - default of `MongoDriver`
  * `EntityCaseNamingStrategy` - uses unchanged entity and property names
> You can also define your own custom `NamingStrategy` implementation.
```
MikroORM.init({  
  namingStrategy: EntityCaseNamingStrategy,  
});  
```
Read more about this in [Naming Strategy](https://mikro-orm.io/docs/next/naming-strategy) section.
## Auto-join of 1:1 owners[​](https://mikro-orm.io/docs/next/configuration#auto-join-of-11-owners "Direct link to Auto-join of 1:1 owners")
By default, owning side of 1:1 relation will be auto-joined when you select the inverse side so you can have the reference to it. You can disable this behaviour via `autoJoinOneToOneOwner` configuration toggle.
```
MikroORM.init({  
  autoJoinOneToOneOwner: false,  
});  
```
## Auto-join of M:1 and 1:1 relations with filters[​](https://mikro-orm.io/docs/next/configuration#auto-join-of-m1-and-11-relations-with-filters "Direct link to Auto-join of M:1 and 1:1 relations with filters")
Since v6, filters are applied to the relations too, as part of `JOIN ON` condition. If a filter exists on a M:1 or 1:1 relation target, such an entity will be automatically joined, and when the foreign key is defined as `NOT NULL`, it will result in an `INNER JOIN` rather than `LEFT JOIN`. This is especially important for implementing soft deletes via filters, as the foreign key might point to a soft-deleted entity. When this happens, the automatic `INNER JOIN` will result in such a record not being returned at all. You can disable this behavior via `autoJoinRefsForFilters` ORM option.
```
MikroORM.init({  
  autoJoinRefsForFilters: false,  
});  
```
## Forcing UTC Timezone[​](https://mikro-orm.io/docs/next/configuration#forcing-utc-timezone "Direct link to Forcing UTC Timezone")
The `forceUtcTimezone` option forces `Date` values to be stored in UTC for datetime columns without timezone. It works for MySQL (`datetime` type), PostgreSQL (`timestamp` type), and MSSQL (`datetime`/`datetime2` types). SQLite stores dates as numeric timestamps, which are inherently timezone-agnostic.
This option is enabled by default since v7. To disable it and store dates in local timezone:
```
MikroORM.init({  
  forceUtcTimezone: false,  
});  
```
## Mapping `null` values to `undefined`[​](https://mikro-orm.io/docs/next/configuration#mapping-null-values-to-undefined "Direct link to mapping-null-values-to-undefined")
By default `null` values from nullable database columns are hydrated as `null`. Using `forceUndefined` you can tell the ORM to convert those `null` values to `undefined` instead.
```
MikroORM.init({  
  forceUndefined: true,  
});  
```
## Initializing nullable properties to `null`[​](https://mikro-orm.io/docs/next/configuration#initializing-nullable-properties-to-null "Direct link to initializing-nullable-properties-to-null")
By default, nullable properties that are not provided in `em.create()` data remain `undefined` on the entity object. This can lead to a mismatch between the runtime value (`undefined`) and what the database returns after loading (`null`).
With `initNullableProperties` enabled, nullable properties are initialized to `null` (or `undefined` when `forceUndefined` is set) during `em.create()`. Properties with explicit `default`, `defaultRaw`, or `onCreate` are not affected.
```
MikroORM.init({  
  initNullableProperties: true,  
});  
```
## Ignoring `undefined` values in Find Queries[​](https://mikro-orm.io/docs/next/configuration#ignoring-undefined-values-in-find-queries "Direct link to ignoring-undefined-values-in-find-queries")
The ORM will treat explicitly defined `undefined` values in your `em.find()` queries as `null`s. If you want to ignore them instead, use `ignoreUndefinedInQuery` option:
```
MikroORM.init({  
  ignoreUndefinedInQuery: true,  
});  
  
// resolves to `em.find(User, {})`  
await em.find(User, { email: undefined, { profiles: { foo: undefined } } });  
```
## Serialization of new entities[​](https://mikro-orm.io/docs/next/configuration#serialization-of-new-entities "Direct link to Serialization of new entities")
After flushing a new entity, all relations are marked as populated, just like if the entity was loaded from the db. This aligns the serialized output of `e.toJSON()` of a loaded entity and just-inserted one.
This behaviour can be disabled via `populateAfterFlush: false`, which would result in the serialized form containing only FKs for relations.
```
MikroORM.init({  
  populateAfterFlush: false,  
});  
```
## Population where condition[​](https://mikro-orm.io/docs/next/configuration#population-where-condition "Direct link to Population where condition")
> This applies only to SELECT_IN strategy, as JOINED strategy implies the inference.
When you use populate hints in `em.find()` and similar methods, by default all related entities are populated. Consider the following example - it would find all authors that have books with given IDs, and populate their books collection with **all** books, not just those matching the condition:
```
// finds authors with books 1, 2, 3 - but populates ALL their books  
const a = await em.find(Author, { books: [1, 2, 3] }, { populate: ['books'] });  
```
If you wanted to populate only the books that match the filter condition, you can use `PopulateHint.INFER`:
```
// finds authors with books 1, 2, 3 - and populates ONLY those books  
const a = await em.find(Author, { books: [1, 2, 3] }, {  
  populate: ['books'],  
  populateWhere: PopulateHint.INFER,  
});  
```
This behaviour is configurable both globally and locally via `populateWhere` option. Globally you can specify one of `PopulateHint.ALL` (default) and `PopulateHint.INFER`. Locally (via `FindOptions`) you can also specify custom where condition that will be passed to `em.populate()` call.
```
MikroORM.init({  
  populateWhere: PopulateHint.INFER, // infer populate condition from the filter  
});  
```
## Custom Hydrator[​](https://mikro-orm.io/docs/next/configuration#custom-hydrator "Direct link to Custom Hydrator")
Hydrator is responsible for assigning values from the database to entities. You can implement your custom `Hydrator` (by extending the abstract `Hydrator` class):
```
MikroORM.init({  
  hydrator: MyCustomHydrator,  
});  
```
## Pre-compiled Functions[​](https://mikro-orm.io/docs/next/configuration#pre-compiled-functions "Direct link to Pre-compiled Functions")
MikroORM uses `new Function()` at runtime to generate optimized hydration, comparison, and serialization functions. Some runtimes (e.g. Cloudflare Workers) prohibit this. You can pre-compile these functions ahead of time using the CLI:
```
npx mikro-orm compile  
```
This generates a `compiled-functions.js` file next to your ORM config. Then pass it to your config:
```
import compiledFunctions from './compiled-functions.js';  
  
export default defineConfig({  
  compiledFunctions,  
});  
```
Use the `--out` option to customize the output path:
```
npx mikro-orm compile --out ./dist/compiled-functions.js  
```
## Custom Repository[​](https://mikro-orm.io/docs/next/configuration#custom-repository "Direct link to Custom Repository")
You can also register custom base repository (for all entities where you do not specify `repository` option) globally:
> You can still use entity specific repositories in combination with global base repository.
```
MikroORM.init({  
  entityRepository: CustomBaseRepository,  
});  
```
Read more about this in [Repositories](https://mikro-orm.io/docs/next/repositories) section.
## Strict Mode and property validation[​](https://mikro-orm.io/docs/next/configuration#strict-mode-and-property-validation "Direct link to Strict Mode and property validation")
> The validation needs to be explicitly enabled via `validate: true`. It has performance implications and usually should not be needed, as long as you don't modify your entities via `Object.assign()`.
`MikroORM` will validate your properties before actual persisting happens. It will try to fix wrong data types for you automatically. If automatic conversion fails, it will throw an error. You can enable strict mode to disable this feature and let ORM throw errors instead. Validation is triggered when persisting the entity.
```
MikroORM.init({  
  validate: true,  
  strict: true,  
});  
```
Read more about this in [Property Validation](https://mikro-orm.io/docs/next/property-validation) section.
## Required properties validation[​](https://mikro-orm.io/docs/next/configuration#required-properties-validation "Direct link to Required properties validation")
New entities are validated on runtime (just before executing insert queries), based on the entity metadata. This means that mongo users need to use `nullable: true` on their optional properties too.
This behaviour can be disabled globally via `validateRequired: false` in the ORM config.
```
MikroORM.init({  
  validateRequired: false,  
});  
```
## Debugging & Logging[​](https://mikro-orm.io/docs/next/configuration#debugging--logging "Direct link to Debugging & Logging")
You can enable logging with `debug` option. Either set it to `true` to log everything, or provide array of `'query' | 'query-params' | 'discovery' | 'info'` namespaces.
```
MikroORM.init({  
  logger: (message: string) => myLogger.info(message), // defaults to `console.log()`  
  debug: true, // or provide array like `['query', 'query-params']`  
  highlight: false, // defaults to true  
  highlightTheme: { ... }, // you can also provide custom highlight there  
});  
```
Read more about this in [Debugging](https://mikro-orm.io/docs/next/logging) section.
## Custom Fail Handler[​](https://mikro-orm.io/docs/next/configuration#custom-fail-handler "Direct link to Custom Fail Handler")
When no entity is found during `em.findOneOrFail()` call, a `NotFoundError` will be thrown. You can customize how the `Error` instance is created via `findOneOrFailHandler` (or `findExactlyOneOrFailHandler` if [strict mode](https://mikro-orm.io/docs/next/configuration#strict-mode-and-property-validation) is enabled):
```
MikroORM.init({  
  findOneOrFailHandler: (entityName: string, where: Dictionary | IPrimaryKey) => {  
    return new NotFoundException(`${entityName} not found!`);  
  },  
});  
```
Read more about this in [Entity Manager](https://mikro-orm.io/docs/next/entity-manager#handling-not-found-entities) docs.
## Schema Generator[​](https://mikro-orm.io/docs/next/configuration#schema-generator "Direct link to Schema Generator")
Following example shows all possible options and their defaults:
```
MikroORM.init({  
  schemaGenerator: {  
    disableForeignKeys: true, // try to disable foreign_key_checks (or equivalent)  
    createForeignKeyConstraints: true, // do not generate FK constraints  
    ignoreSchema: [], // allows ignoring some schemas when diffing  
    ignoreTriggers: false, // leave triggers unmanaged (never drop or alter existing ones)  
    ignoreRoutines: false, // leave stored routines unmanaged (never drop or alter existing ones)  
    skipTables: [], // ignore some database tables during schema generation  
    skipColumns: {}, // ignore some database table columns during schema generation  
  },  
});  
```
## Migrations[​](https://mikro-orm.io/docs/next/configuration#migrations "Direct link to Migrations")
Under the `migrations` namespace, you can adjust how the integrated migrations support works. Following example shows all possible options and their defaults:
```
MikroORM.init({  
  migrations: {  
    tableName: 'mikro_orm_migrations', // migrations table name  
    path: process.cwd() + '/migrations', // path to folder with migration files  
    glob: '!(*.d).{js,ts}', // how to match migration files (all .js and .ts files, but not .d.ts)  
    transactional: true, // run each migration inside transaction  
    disableForeignKeys: true, // try to disable foreign_key_checks (or equivalent)  
    allOrNothing: true, // run all migrations in current batch in master transaction  
    emit: 'ts', // migration generation mode  
  },  
});  
```
Read more about this in [Migrations](https://mikro-orm.io/docs/next/migrations) section.
## Seeder[​](https://mikro-orm.io/docs/next/configuration#seeder "Direct link to Seeder")
Following example shows all possible options and their defaults:
```
MikroORM.init({  
  seeder: {  
    path: './seeders',  
    defaultSeeder: 'DatabaseSeeder',  
  },  
});  
```
Read more about this in [seeding docs](https://mikro-orm.io/docs/next/seeding).
## Result Cache[​](https://mikro-orm.io/docs/next/configuration#result-cache "Direct link to Result Cache")
MikroORM supports caching of query results. You can configure the result cache globally via the `resultCache` option:
```
MikroORM.init({  
  resultCache: {  
    expiration: 1000, // default expiration time in ms  
    adapter: MemoryCacheAdapter, // you can provide your own implementation here, e.g. with redis  
    options: {}, // options will be passed to the constructor of `adapter` class  
    global: false, // enable global result caching for all queries  
  },  
});  
```
The `global` option can be:
  * `false` (default) - result caching is opt-in per query
  * `true` - cache all queries with default expiration
  * `number` - cache all queries with the specified expiration in ms
  * `[string, number]` - cache all queries with the specified key prefix and expiration
## Metadata Cache[​](https://mikro-orm.io/docs/next/configuration#metadata-cache "Direct link to Metadata Cache")
By default, metadata discovery results are cached. You can either disable caching, or adjust how it works. Following example shows all possible options and their defaults:
```
MikroORM.init({  
  metadataCache: {  
    enabled: true,  
    pretty: false, // allows to pretty print the JSON cache  
    adapter: FileCacheAdapter, // you can provide your own implementation here, e.g. with redis  
    options: { cacheDir: process.cwd() + '/temp' }, // options will be passed to the constructor of `adapter` class  
  },  
});  
```
Read more about this in [Metadata Cache](https://mikro-orm.io/docs/next/metadata-cache) section.
## Importing database dump files (MySQL and PostgreSQL)[​](https://mikro-orm.io/docs/next/configuration#importing-database-dump-files-mysql-and-postgresql "Direct link to Importing database dump files \(MySQL and PostgreSQL\)")
Using the `mikro-orm database:import db-file.sql` you can import a database dump file. This can be useful when kickstarting an application or could be used in tests to reset the database. Database dumps often have queries spread over multiple lines, and therefore you need the following configuration.
```
MikroORM.init({  
  ...  
  multipleStatements: true,  
  ...  
});  
```
> This should be disabled in production environments for added security.
## Using native private properties[​](https://mikro-orm.io/docs/next/configuration#using-native-private-properties "Direct link to Using native private properties")
If you want to use native private properties inside entities, the default approach of how MikroORM creates entity instances via `Object.create()` is not viable (more about this in the [issue](https://github.com/mikro-orm/mikro-orm/issues/1226)). To force usage of entity constructors, you can use `forceEntityConstructor` toggle:
```
MikroORM.init({  
  forceEntityConstructor: true, // or specify just some entities via `[Author, 'Book', ...]`  
});  
```
## Persist created entities automatically[​](https://mikro-orm.io/docs/next/configuration#persist-created-entities-automatically "Direct link to Persist created entities automatically")
When you create new entity instance via `em.create()`, it will be automatically marked for future persistence (`em.persist()` will be called on it before its returned to you). In case you want to disable this behavior, you can set `persistOnCreate: false` globally or override this locally via `em.create(Type, data, { persist: false })`.
> This flag affects only `em.create()`, entities created manually via constructor still need an explicit `em.persist()` call, or they need to be part of the entity graph of some already managed entity.
```
MikroORM.init({  
  persistOnCreate: false, // defaults to true  
});  
```
## Processing property `onCreate` hooks in `em.create()`[​](https://mikro-orm.io/docs/next/configuration#processing-property-oncreate-hooks-in-emcreate "Direct link to processing-property-oncreate-hooks-in-emcreate")
Property `onCreate` hooks are executed inside `em.create` (if used explicitly), or later during `flush` operation. You can use the `processOnCreateHooksEarly` option to disable this behavior and delay them to `em.flush()` method. This option can also be overridden locally via `em.create(Type, data, { processOnCreateHooks: false })`.
> This flag affects only `em.create()`, `onCreate` property hooks for entities created manually via constructor will be processed during `flush` regardless of this option.
```
MikroORM.init({  
  processOnCreateHooksEarly: false, // defaults to true since v7  
});  
```
## Using global Identity Map[​](https://mikro-orm.io/docs/next/configuration#using-global-identity-map "Direct link to Using global Identity Map")
It is no longer possible to use the global identity map. This was a common issue that led to weird bugs, as using the global EM without request context is almost always wrong, you always need to have a dedicated context for each request, so they do not interfere.
You can still disable this check via `allowGlobalContext` configuration, or a connected environment variable `MIKRO_ORM_ALLOW_GLOBAL_CONTEXT` - this can be handy especially in unit tests.
```
MikroORM.init({  
  allowGlobalContext: true,  
});  
```
## Deprecation warnings[​](https://mikro-orm.io/docs/next/configuration#deprecation-warnings "Direct link to Deprecation warnings")
By default, doing something that is deprecated will result in a deprecation warning being logged. The default logger will in turn show it on the console.
You can ignore all or only specific deprecation warnings. See [Logging's section on deprecation warnings](https://mikro-orm.io/docs/next/logging#deprecation-warnings) for details.
The full list of deprecation warnings:  
| label  | message  |  
| --- | --- |  
| D0001  | Path for config file was inferred from the command line arguments. Instead, you should set the `MIKRO_ORM_CLI_CONFIG` environment variable to specify the path, or if you really must use the command line arguments, import the config manually based on them, and pass it to init.  |  
## Using environment variables[​](https://mikro-orm.io/docs/next/configuration#using-environment-variables "Direct link to Using environment variables")
Most of the ORM options can be configured via environment variables. Environment variables override the config file, but explicit options passed to `MikroORM.init()` or the `MikroORM` constructor always have the highest precedence. The full priority order (highest to lowest) is: explicit options > env vars > config file > defaults.
Note that when you import your config file and pass it to `MikroORM.init(config)`, all values from the config file are treated as explicit options, so env vars won't override them. If you want env vars to take precedence over the config (e.g. for per-environment overrides in deployment), enable the `preferEnvVars` option:
```
export default defineConfig({  
  preferEnvVars: true,  
  host: 'localhost',  
  // MIKRO_ORM_HOST env var will override 'localhost'  
});  
```
Full list of supported options:  
| env variable  | config key  |  
| --- | --- |  
| `MIKRO_ORM_CONTEXT_NAME`  | `contextName`  |  
| `MIKRO_ORM_BASE_DIR`  | `baseDir`  |  
| `MIKRO_ORM_TYPE`  | `type`  |  
| `MIKRO_ORM_ENTITIES`  | `entities`  |  
| `MIKRO_ORM_ENTITIES_TS`  | `entitiesTs`  |  
| `MIKRO_ORM_CLIENT_URL`  | `clientUrl`  |  
| `MIKRO_ORM_HOST`  | `host`  |  
| `MIKRO_ORM_PORT`  | `port`  |  
| `MIKRO_ORM_USER`  | `user`  |  
| `MIKRO_ORM_PASSWORD`  | `password`  |  
| `MIKRO_ORM_DB_NAME`  | `dbName`  |  
| `MIKRO_ORM_SCHEMA`  | `schema`  |  
| `MIKRO_ORM_LOAD_STRATEGY`  | `loadStrategy`  |  
| `MIKRO_ORM_BATCH_SIZE`  | `batchSize`  |  
| `MIKRO_ORM_USE_BATCH_INSERTS`  | `useBatchInserts`  |  
| `MIKRO_ORM_USE_BATCH_UPDATES`  | `useBatchUpdates`  |  
| `MIKRO_ORM_AUTO_JOIN_ONE_TO_ONE_OWNER`  | `autoJoinOneToOneOwner`  |  
| `MIKRO_ORM_PROPAGATE_TO_ONE_OWNER`  | `propagateToOneOwner`  |  
| `MIKRO_ORM_POPULATE_AFTER_FLUSH`  | `populateAfterFlush`  |  
| `MIKRO_ORM_FORCE_ENTITY_CONSTRUCTOR`  | `forceEntityConstructor`  |  
| `MIKRO_ORM_FORCE_UNDEFINED`  | `forceUndefined`  |  
| `MIKRO_ORM_FORCE_UTC_TIMEZONE`  | `forceUtcTimezone`  |  
| `MIKRO_ORM_TIMEZONE`  | `timezone`  |  
| `MIKRO_ORM_ENSURE_INDEXES`  | `ensureIndexes`  |  
| `MIKRO_ORM_IMPLICIT_TRANSACTIONS`  | `implicitTransactions`  |  
| `MIKRO_ORM_DEBUG`  | `debug`  |  
| `MIKRO_ORM_COLORS`  | `colors`  |  
| `MIKRO_ORM_DISCOVERY_WARN_WHEN_NO_ENTITIES`  | `discovery.warnWhenNoEntities`  |  
| `MIKRO_ORM_DISCOVERY_CHECK_DUPLICATE_TABLE_NAMES`  | `discovery.checkDuplicateTableNames`  |  
| `MIKRO_ORM_DISCOVERY_CHECK_DUPLICATE_FIELD_NAMES`  | `discovery.checkDuplicateFieldNames`  |  
| `MIKRO_ORM_DISCOVERY_CHECK_DUPLICATE_ENTITIES`  | `discovery.checkDuplicateEntities`  |  
| `MIKRO_ORM_DISCOVERY_CHECK_NON_PERSISTENT_COMPOSITE_PROPS`  | `discovery.checkNonPersistentCompositeProps`  |  
| `MIKRO_ORM_DISCOVERY_INFER_DEFAULT_VALUES`  | `discovery.inferDefaultValues`  |  
| `MIKRO_ORM_DISCOVERY_TS_CONFIG_PATH`  | `discovery.tsConfigPath`  |  
| `MIKRO_ORM_MIGRATIONS_TABLE_NAME`  | `migrations.tableName`  |  
| `MIKRO_ORM_MIGRATIONS_PATH`  | `migrations.path`  |  
| `MIKRO_ORM_MIGRATIONS_PATH_TS`  | `migrations.pathTs`  |  
| `MIKRO_ORM_MIGRATIONS_GLOB`  | `migrations.glob`  |  
| `MIKRO_ORM_MIGRATIONS_TRANSACTIONAL`  | `migrations.transactional`  |  
| `MIKRO_ORM_MIGRATIONS_DISABLE_FOREIGN_KEYS`  | `migrations.disableForeignKeys`  |  
| `MIKRO_ORM_MIGRATIONS_ALL_OR_NOTHING`  | `migrations.allOrNothing`  |  
| `MIKRO_ORM_MIGRATIONS_DROP_TABLES`  | `migrations.dropTables`  |  
| `MIKRO_ORM_MIGRATIONS_SAFE`  | `migrations.safe`  |  
| `MIKRO_ORM_MIGRATIONS_EMIT`  | `migrations.emit`  |  
| `MIKRO_ORM_SCHEMA_GENERATOR_DISABLE_FOREIGN_KEYS`  | `migrations.disableForeignKeys`  |  
| `MIKRO_ORM_SCHEMA_GENERATOR_CREATE_FOREIGN_KEY_CONSTRAINTS`  | `migrations.createForeignKeyConstraints`  |  
| `MIKRO_ORM_SCHEMA_GENERATOR_IGNORE_TRIGGERS`  | `schemaGenerator.ignoreTriggers`  |  
| `MIKRO_ORM_SCHEMA_GENERATOR_IGNORE_ROUTINES`  | `schemaGenerator.ignoreRoutines`  |  
| `MIKRO_ORM_SEEDER_PATH`  | `seeder.path`  |  
| `MIKRO_ORM_SEEDER_PATH_TS`  | `seeder.pathTs`  |  
| `MIKRO_ORM_SEEDER_GLOB`  | `seeder.glob`  |  
| `MIKRO_ORM_SEEDER_EMIT`  | `seeder.emit`  |  
| `MIKRO_ORM_SEEDER_DEFAULT_SEEDER`  | `seeder.defaultSeeder`  |  
Note that setting `MIKRO_ORM_CONTEXT_NAME` without also setting another configuration environment variable from the table above has a slightly different effect. When combined with other environment variables, the final configuration object is considered to have this `contextName`. Without other environment variables, it is a value of `contextName` to search within the config file. The final config object is picked based on this value.
```
$ MIKRO_ORM_CONTEXT_NAME=example1 \  
  node ./dist/index.js  
```
This will look for a config file in the standard paths, and will expect the config file to be able to provide a config with `contextName` set to "example1".
If you also set other environment variables, MikroORM will still search for a config file and try to a find a config with this `contextName`, but if it can't find one, it will create a config based on this `contextName` and the rest of the environment variables.
### Using `.env` file[​](https://mikro-orm.io/docs/next/configuration#using-env-file "Direct link to using-env-file")
If you want to use a `.env` file, you can use the `dotenv` package to load it before initializing the ORM:
```
import 'dotenv/config';  
import { defineConfig } from '@mikro-orm/sqlite';  
  
export default defineConfig({  
  // ...  
});  
```
### CLI specific settings[​](https://mikro-orm.io/docs/next/configuration#cli-specific-settings "Direct link to CLI specific settings")
There are also env vars you can use to control the CLI settings (those you can set in your `package.json`):  
| env variable  | config key  |  
| --- | --- |  
| `MIKRO_ORM_CLI_CONFIG`  | (CLI only)  |  
| `MIKRO_ORM_CLI_TS_CONFIG_PATH`  | (CLI only)  |  
| `MIKRO_ORM_CLI_ALWAYS_ALLOW_TS`  | (CLI only)  |  
| `MIKRO_ORM_CLI_PREFER_TS`  | (CLI only)  |  
| `MIKRO_ORM_CLI_TS_LOADER`  | (CLI only)  |  
| `MIKRO_ORM_CLI_VERBOSE`  | (CLI only)  |  
[](https://github.com/mikro-orm/mikro-orm/edit/master/docs/docs/configuration.md)
Last updated on **May 31, 2026** by **Gordon L. Hempton**
[Previous Property Validation](https://mikro-orm.io/docs/next/property-validation)[Next Logging](https://mikro-orm.io/docs/next/logging)
  * [Entity Discovery](https://mikro-orm.io/docs/next/configuration#entity-discovery)
    * [Adjusting default type mapping](https://mikro-orm.io/docs/next/configuration#adjusting-default-type-mapping)
    * [`onMetadata` hook](https://mikro-orm.io/docs/next/configuration#onmetadata-hook)
  * [Extensions](https://mikro-orm.io/docs/next/configuration#extensions)
  * [Driver](https://mikro-orm.io/docs/next/configuration#driver)
  * [Connection](https://mikro-orm.io/docs/next/configuration#connection)
    * [Read Replicas](https://mikro-orm.io/docs/next/configuration#read-replicas)
    * [Attached Databases (SQLite)](https://mikro-orm.io/docs/next/configuration#attached-databases-sqlite)
    * [Using short-lived tokens](https://mikro-orm.io/docs/next/configuration#using-short-lived-tokens)
    * [Connection reserve hook](https://mikro-orm.io/docs/next/configuration#connection-reserve-hook)
    * [`onQuery` hook and observability](https://mikro-orm.io/docs/next/configuration#onquery-hook-and-observability)
  * [Naming Strategy](https://mikro-orm.io/docs/next/configuration#naming-strategy)
  * [Auto-join of 1:1 owners](https://mikro-orm.io/docs/next/configuration#auto-join-of-11-owners)
  * [Auto-join of M:1 and 1:1 relations with filters](https://mikro-orm.io/docs/next/configuration#auto-join-of-m1-and-11-relations-with-filters)
  * [Forcing UTC Timezone](https://mikro-orm.io/docs/next/configuration#forcing-utc-timezone)
  * [Mapping `null` values to `undefined`](https://mikro-orm.io/docs/next/configuration#mapping-null-values-to-undefined)
  * [Initializing nullable properties to `null`](https://mikro-orm.io/docs/next/configuration#initializing-nullable-properties-to-null)
  * [Ignoring `undefined` values in Find Queries](https://mikro-orm.io/docs/next/configuration#ignoring-undefined-values-in-find-queries)
  * [Serialization of new entities](https://mikro-orm.io/docs/next/configuration#serialization-of-new-entities)
  * [Population where condition](https://mikro-orm.io/docs/next/configuration#population-where-condition)
  * [Custom Hydrator](https://mikro-orm.io/docs/next/configuration#custom-hydrator)
  * [Pre-compiled Functions](https://mikro-orm.io/docs/next/configuration#pre-compiled-functions)
  * [Custom Repository](https://mikro-orm.io/docs/next/configuration#custom-repository)
  * [Strict Mode and property validation](https://mikro-orm.io/docs/next/configuration#strict-mode-and-property-validation)
  * [Required properties validation](https://mikro-orm.io/docs/next/configuration#required-properties-validation)
  * [Debugging & Logging](https://mikro-orm.io/docs/next/configuration#debugging--logging)
  * [Custom Fail Handler](https://mikro-orm.io/docs/next/configuration#custom-fail-handler)
  * [Schema Generator](https://mikro-orm.io/docs/next/configuration#schema-generator)
  * [Migrations](https://mikro-orm.io/docs/next/configuration#migrations)
  * [Seeder](https://mikro-orm.io/docs/next/configuration#seeder)
  * [Result Cache](https://mikro-orm.io/docs/next/configuration#result-cache)
  * [Metadata Cache](https://mikro-orm.io/docs/next/configuration#metadata-cache)
  * [Importing database dump files (MySQL and PostgreSQL)](https://mikro-orm.io/docs/next/configuration#importing-database-dump-files-mysql-and-postgresql)
  * [Using native private properties](https://mikro-orm.io/docs/next/configuration#using-native-private-properties)
  * [Persist created entities automatically](https://mikro-orm.io/docs/next/configuration#persist-created-entities-automatically)
  * [Processing property `onCreate` hooks in `em.create()`](https://mikro-orm.io/docs/next/configuration#processing-property-oncreate-hooks-in-emcreate)
  * [Using global Identity Map](https://mikro-orm.io/docs/next/configuration#using-global-identity-map)
  * [Deprecation warnings](https://mikro-orm.io/docs/next/configuration#deprecation-warnings)
  * [Using environment variables](https://mikro-orm.io/docs/next/configuration#using-environment-variables)
    * [Using `.env` file](https://mikro-orm.io/docs/next/configuration#using-env-file)
    * [CLI specific settings](https://mikro-orm.io/docs/next/configuration#cli-specific-settings)
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
# https://mikro-orm.io/docs/next/integrations
============================================================
[Skip to main content](https://mikro-orm.io/docs/next/integrations#__docusaurus_skipToContent_fallback)
⭐️ If you like MikroORM, give it a star on [GitHub](https://github.com/mikro-orm/mikro-orm) and consider [sponsoring](https://github.com/sponsors/mikro-orm) its development! ⭐️
[![MikroORM](https://mikro-orm.io/img/logo.svg)](https://mikro-orm.io/)
[Next](https://mikro-orm.io/docs/next/integrations)
  * [Next](https://mikro-orm.io/docs/next/integrations)
  * [7.1](https://mikro-orm.io/docs/integrations)
  * [7.0](https://mikro-orm.io/docs/7.0/integrations)
  * [6.6](https://mikro-orm.io/docs/6.6/quick-start)
  * [5.9](https://mikro-orm.io/docs/5.9/installation)
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
    * [Usage with SQL drivers](https://mikro-orm.io/docs/next/usage-with-sql)
    * [Usage with SQLite](https://mikro-orm.io/docs/next/usage-with-sqlite)
    * [Usage with PGlite](https://mikro-orm.io/docs/next/usage-with-pglite)
    * [Usage with CockroachDB](https://mikro-orm.io/docs/next/usage-with-cockroachdb)
    * [Usage with MongoDB](https://mikro-orm.io/docs/next/usage-with-mongo)
    * [Usage with NestJS](https://mikro-orm.io/docs/next/usage-with-nestjs)
    * [Usage with Next.js](https://mikro-orm.io/docs/next/usage-with-nextjs)
    * [Usage with AdonisJS](https://mikro-orm.io/docs/next/usage-with-adonis)
    * [Usage with Jest](https://mikro-orm.io/docs/next/usage-with-jest)
    * [Usage with Vanilla JS](https://mikro-orm.io/docs/next/usage-with-js)
    * [Usage with transpilers](https://mikro-orm.io/docs/next/usage-with-transpilers)
    * [Usage with AdminJS](https://mikro-orm.io/docs/next/usage-with-adminjs)
  * [Recipes](https://mikro-orm.io/docs/next/recipes)
  * [Reference](https://mikro-orm.io/docs/next/reference)
  * [Example Integrations](https://mikro-orm.io/docs/next/examples)
  * [Upgrading](https://mikro-orm.io/docs/next/upgrading)
This is unreleased documentation for MikroORM **Next** version.
For up-to-date documentation, see the **[latest version](https://mikro-orm.io/docs/integrations)** (7.1).
Version: Next
# Integrations
## [ 📄️Usage with SQL drivers MikroORM supports several SQL databases out of the box. Install the driver package for your database:](https://mikro-orm.io/docs/next/usage-with-sql)## [ 📄️Usage with SQLite MikroORM supports SQLite through dedicated driver packages and a generic SqliteDriver that works with any SQLite library via Kysely dialects.](https://mikro-orm.io/docs/next/usage-with-sqlite)## [ 📄️Usage with PGlite MikroORM supports PGlite — a WASM build of PostgreSQL that runs in Node.js, the browser, Bun and Deno without a separate database server. The @mikro-orm/pglite driver reuses the full @mikro-orm/postgresql SQL/schema/migrations stack via @mikro-orm/sql, so feature support matches the regular PostgreSQL driver.](https://mikro-orm.io/docs/next/usage-with-pglite)## [ 📄️Usage with CockroachDB MikroORM supports CockroachDB through the @mikro-orm/postgresql driver. CockroachDB is PostgreSQL wire-compatible, so most MikroORM features work out of the box. This guide covers configuration and the key differences you need to be aware of.](https://mikro-orm.io/docs/next/usage-with-cockroachdb)## [ 📄️Usage with MongoDB To use MikroORM with mongo database, do not forget to install @mikro-orm/mongodb dependency. Then call MikroORM.init() as part of bootstrapping your app:](https://mikro-orm.io/docs/next/usage-with-mongo)## [ 📄️Usage with NestJS Installation](https://mikro-orm.io/docs/next/usage-with-nestjs)## [ 📄️Usage with Next.js This guide covers integrating MikroORM with Next.js, addressing the unique challenges that arise from Next.js's bundler environment. For a complete working example, see the nextjs-example-app repository.](https://mikro-orm.io/docs/next/usage-with-nextjs)## [ 📄️Usage with AdonisJS This guide covers integrating MikroORM with AdonisJS, replacing the default Lucid ORM with MikroORM's Unit of Work and Identity Map patterns. For a complete working example, see the adonis-example-app repository.](https://mikro-orm.io/docs/next/usage-with-adonis)## [ 📄️Usage with Jest When testing your own code that uses Jest for the tests, and MikroORM for the database, there are some things to consider.](https://mikro-orm.io/docs/next/usage-with-jest)## [ 📄️Usage with Vanilla JS MikroORM can be used with vanilla JavaScript using the defineEntity helper or EntitySchema. Both approaches provide full functionality without requiring TypeScript or decorators.](https://mikro-orm.io/docs/next/usage-with-js)## [ 📄️Usage with transpilers Babel](https://mikro-orm.io/docs/next/usage-with-transpilers)## [ 📄️Usage with AdminJS Installation](https://mikro-orm.io/docs/next/usage-with-adminjs)[Previous Canary & dev builds](https://mikro-orm.io/docs/next/canary-builds)[Next Usage with SQL drivers](https://mikro-orm.io/docs/next/usage-with-sql)
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
# https://mikro-orm.io/docs/next/recipes
============================================================
[Skip to main content](https://mikro-orm.io/docs/next/recipes#__docusaurus_skipToContent_fallback)
⭐️ If you like MikroORM, give it a star on [GitHub](https://github.com/mikro-orm/mikro-orm) and consider [sponsoring](https://github.com/sponsors/mikro-orm) its development! ⭐️
[![MikroORM](https://mikro-orm.io/img/logo.svg)](https://mikro-orm.io/)
[Next](https://mikro-orm.io/docs/next/recipes)
  * [Next](https://mikro-orm.io/docs/next/recipes)
  * [7.1](https://mikro-orm.io/docs/recipes)
  * [7.0](https://mikro-orm.io/docs/7.0/recipes)
  * [6.6](https://mikro-orm.io/docs/6.6/recipes)
  * [5.9](https://mikro-orm.io/docs/5.9/recipes)
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
    * [Using Entity Constructors](https://mikro-orm.io/docs/next/entity-constructors)
    * [Schema First Guide](https://mikro-orm.io/docs/next/schema-first-guide)
    * [Transactional Outbox](https://mikro-orm.io/docs/next/transactional-outbox)
    * [Using native BigInt PKs (MySQL and PostgreSQL)](https://mikro-orm.io/docs/next/using-bigint-pks)
    * [Creating Custom Driver](https://mikro-orm.io/docs/next/custom-driver)
  * [Reference](https://mikro-orm.io/docs/next/reference)
  * [Example Integrations](https://mikro-orm.io/docs/next/examples)
  * [Upgrading](https://mikro-orm.io/docs/next/upgrading)
This is unreleased documentation for MikroORM **Next** version.
For up-to-date documentation, see the **[latest version](https://mikro-orm.io/docs/recipes)** (7.1).
Version: Next
# Recipes
## [ 📄️Using Entity Constructors Internally, MikroORM never calls entity constructor on managed entities (those loaded via EntityManager), so you are free to use it as you wish. The constructor will be called only when you instantiate the class yourself via new operator (or when using em.create() to create new entity instance), so it is a handy place to require your data when creating new entity.](https://mikro-orm.io/docs/next/entity-constructors)## [ 📄️Schema First Guide Although MikroORM is primarily a "code first" ORM, it can also be used in a "schema first" approach.](https://mikro-orm.io/docs/next/schema-first-guide)## [ 📄️Transactional Outbox When building event-driven applications, you often want to publish domain events (e.g., UserCreated, OrderPlaced) only after the corresponding database transaction commits. A naive approach — emitting events in an afterTransactionCommit hook — leaves a dangerous window: if the process crashes after commit but before the events are published, those events are lost, leading to an inconsistent state.](https://mikro-orm.io/docs/next/transactional-outbox)## [ 📄️Using native BigInt PKs (MySQL and PostgreSQL) Since v6, bigints are represented by the native BigInt type, and as such, they don't require explicit type in the decorator options:](https://mikro-orm.io/docs/next/using-bigint-pks)## [ 📄️Creating Custom Driver If you want to use a database that is not currently supported, you can implement your own driver. The driver architecture is split into several classes, each handling a different concern.](https://mikro-orm.io/docs/next/custom-driver)[Previous Usage with AdminJS](https://mikro-orm.io/docs/next/usage-with-adminjs)[Next Using Entity Constructors](https://mikro-orm.io/docs/next/entity-constructors)
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
# https://mikro-orm.io/docs/next/reference
============================================================
[Skip to main content](https://mikro-orm.io/docs/next/reference#__docusaurus_skipToContent_fallback)
⭐️ If you like MikroORM, give it a star on [GitHub](https://github.com/mikro-orm/mikro-orm) and consider [sponsoring](https://github.com/sponsors/mikro-orm) its development! ⭐️
[![MikroORM](https://mikro-orm.io/img/logo.svg)](https://mikro-orm.io/)
[Next](https://mikro-orm.io/docs/next/reference)
  * [Next](https://mikro-orm.io/docs/next/reference)
  * [7.1](https://mikro-orm.io/docs/reference)
  * [7.0](https://mikro-orm.io/docs/7.0/reference)
  * [6.6](https://mikro-orm.io/docs/6.6/reference)
  * [5.9](https://mikro-orm.io/docs/5.9/reference)
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
    * [EntityManager API](https://mikro-orm.io/api/core/class/EntityManager)
    * [EntityRepository API](https://mikro-orm.io/api/core/class/EntityRepository)
    * [QueryBuilder API](https://mikro-orm.io/api/sql/class/QueryBuilder)
    * [Decorators Reference](https://mikro-orm.io/docs/next/decorators)
  * [Example Integrations](https://mikro-orm.io/docs/next/examples)
  * [Upgrading](https://mikro-orm.io/docs/next/upgrading)
This is unreleased documentation for MikroORM **Next** version.
For up-to-date documentation, see the **[latest version](https://mikro-orm.io/docs/reference)** (7.1).
Version: Next
# Reference
## [ 📄️EntityManager API ](https://mikro-orm.io/api/core/class/EntityManager)## [ 📄️EntityRepository API ](https://mikro-orm.io/api/core/class/EntityRepository)## [ 📄️QueryBuilder API ](https://mikro-orm.io/api/sql/class/QueryBuilder)## [ 📄️Decorators Reference This page provides a complete reference for all decorators available in MikroORM.](https://mikro-orm.io/docs/next/decorators)[Previous Creating Custom Driver](https://mikro-orm.io/docs/next/custom-driver)[Next Decorators Reference](https://mikro-orm.io/docs/next/decorators)
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
# https://mikro-orm.io/docs/next/examples
============================================================
[Skip to main content](https://mikro-orm.io/docs/next/examples#__docusaurus_skipToContent_fallback)
⭐️ If you like MikroORM, give it a star on [GitHub](https://github.com/mikro-orm/mikro-orm) and consider [sponsoring](https://github.com/sponsors/mikro-orm) its development! ⭐️
[![MikroORM](https://mikro-orm.io/img/logo.svg)](https://mikro-orm.io/)
[Next](https://mikro-orm.io/docs/next/examples)
  * [Next](https://mikro-orm.io/docs/next/examples)
  * [7.1](https://mikro-orm.io/docs/examples)
  * [7.0](https://mikro-orm.io/docs/7.0/examples)
  * [6.6](https://mikro-orm.io/docs/6.6/examples)
  * [5.9](https://mikro-orm.io/docs/5.9/examples)
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
    * [Fastify + SQLite + TypeScript](https://github.com/mikro-orm/guide)
    * [RealWorld example app (Nest + MySQL)](https://github.com/mikro-orm/nestjs-realworld-example-app)
    * [Express + MongoDB + TypeScript](https://github.com/mikro-orm/express-ts-example-app)
    * [NestJS + MySQL + TypeScript](https://github.com/mikro-orm/nestjs-example-app)
    * [Express + SQLite + JavaScript](https://github.com/mikro-orm/express-js-example-app)
    * [Koa + SQLite + TypeScript](https://github.com/mikro-orm/koa-ts-example-app)
    * [Inversify + PostgreSQL](https://github.com/PodaruDragos/inversify-example-app)
    * [NextJS + SQLite](https://github.com/mikro-orm/nextjs-example-app)
    * [GraphQL + PostgreSQL + TypeScript](https://github.com/driescroons/mikro-orm-graphql-example)
    * [Accounts.js REST and GraphQL authentication + SQLite](https://github.com/darkbasic/mikro-orm-accounts-example)
    * [Nest + Shopify + PostgreSQL + GraphQL](https://github.com/Cloudshelf/Shopify_CSConnector)
    * [AdonisJS + SQLite + TypeScript](https://github.com/mikro-orm/adonis-example-app)
    * [Elysia.js + libSQL + Bun](https://github.com/mikro-orm/elysia-bun-example-app)
    * [Electron.js + PostgreSQL](https://github.com/adnanlah/electron-mikro-orm-example-app)
  * [Upgrading](https://mikro-orm.io/docs/next/upgrading)
This is unreleased documentation for MikroORM **Next** version.
For up-to-date documentation, see the **[latest version](https://mikro-orm.io/docs/examples)** (7.1).
Version: Next
# Example Integrations
## [ 🔗Fastify + SQLite + TypeScript ](https://github.com/mikro-orm/guide)## [ 🔗RealWorld example app (Nest + MySQL) ](https://github.com/mikro-orm/nestjs-realworld-example-app)## [ 🔗Express + MongoDB + TypeScript ](https://github.com/mikro-orm/express-ts-example-app)## [ 🔗NestJS + MySQL + TypeScript ](https://github.com/mikro-orm/nestjs-example-app)## [ 🔗Express + SQLite + JavaScript ](https://github.com/mikro-orm/express-js-example-app)## [ 🔗Koa + SQLite + TypeScript ](https://github.com/mikro-orm/koa-ts-example-app)## [ 🔗Inversify + PostgreSQL ](https://github.com/PodaruDragos/inversify-example-app)## [ 🔗NextJS + SQLite ](https://github.com/mikro-orm/nextjs-example-app)## [ 🔗GraphQL + PostgreSQL + TypeScript ](https://github.com/driescroons/mikro-orm-graphql-example)## [ 🔗Accounts.js REST and GraphQL authentication + SQLite ](https://github.com/darkbasic/mikro-orm-accounts-example)## [ 🔗Nest + Shopify + PostgreSQL + GraphQL ](https://github.com/Cloudshelf/Shopify_CSConnector)## [ 🔗AdonisJS + SQLite + TypeScript ](https://github.com/mikro-orm/adonis-example-app)## [ 🔗Elysia.js + libSQL + Bun ](https://github.com/mikro-orm/elysia-bun-example-app)## [ 🔗Electron.js + PostgreSQL ](https://github.com/adnanlah/electron-mikro-orm-example-app)[Previous Decorators Reference](https://mikro-orm.io/docs/next/decorators)[Next Upgrading](https://mikro-orm.io/docs/next/upgrading)
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
# https://mikro-orm.io/docs/next/upgrading
============================================================
[Skip to main content](https://mikro-orm.io/docs/next/upgrading#__docusaurus_skipToContent_fallback)
⭐️ If you like MikroORM, give it a star on [GitHub](https://github.com/mikro-orm/mikro-orm) and consider [sponsoring](https://github.com/sponsors/mikro-orm) its development! ⭐️
[![MikroORM](https://mikro-orm.io/img/logo.svg)](https://mikro-orm.io/)
[Next](https://mikro-orm.io/docs/next/upgrading)
  * [Next](https://mikro-orm.io/docs/next/upgrading)
  * [7.1](https://mikro-orm.io/docs/upgrading)
  * [7.0](https://mikro-orm.io/docs/7.0/upgrading)
  * [6.6](https://mikro-orm.io/docs/6.6/upgrading)
  * [5.9](https://mikro-orm.io/docs/5.9/upgrading)
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
    * [Upgrading from v6 to v7](https://mikro-orm.io/docs/next/upgrading-v6-to-v7)
    * [Upgrading from v5 to v6](https://mikro-orm.io/docs/next/upgrading-v5-to-v6)
    * [Upgrading from v4 to v5](https://mikro-orm.io/docs/next/upgrading-v4-to-v5)
This is unreleased documentation for MikroORM **Next** version.
For up-to-date documentation, see the **[latest version](https://mikro-orm.io/docs/upgrading)** (7.1).
Version: Next
# Upgrading
## [ 📄️Upgrading from v6 to v7 Following sections describe (hopefully) all breaking changes, most of them might be not valid for you, like if you do not use custom NamingStrategy implementation, you do not care about the interface being changed.](https://mikro-orm.io/docs/next/upgrading-v6-to-v7)## [ 📄️Upgrading from v5 to v6 Following sections describe (hopefully) all breaking changes, most of them might be not valid for you, like if you do not use custom NamingStrategy implementation, you do not care about the interface being changed.](https://mikro-orm.io/docs/next/upgrading-v5-to-v6)## [ 📄️Upgrading from v4 to v5 Following sections describe (hopefully) all breaking changes, most of them might be not valid for you, like if you do not use custom NamingStrategy implementation, you do not care about the interface being changed.](https://mikro-orm.io/docs/next/upgrading-v4-to-v5)[Previous Example Integrations](https://mikro-orm.io/docs/next/examples)[Next Upgrading from v6 to v7](https://mikro-orm.io/docs/next/upgrading-v6-to-v7)
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
# https://mikro-orm.io/docs/next/using-decorators
============================================================
[Skip to main content](https://mikro-orm.io/docs/next/using-decorators#__docusaurus_skipToContent_fallback)
⭐️ If you like MikroORM, give it a star on [GitHub](https://github.com/mikro-orm/mikro-orm) and consider [sponsoring](https://github.com/sponsors/mikro-orm) its development! ⭐️
[ ![MikroORM](https://mikro-orm.io/img/logo.svg)![MikroORM](https://mikro-orm.io/img/logo-dark.svg) ](https://mikro-orm.io/)
[Next](https://mikro-orm.io/docs/next/using-decorators)
  * [Next](https://mikro-orm.io/docs/next/using-decorators)
  * [7.1](https://mikro-orm.io/docs/using-decorators)
  * [7.0](https://mikro-orm.io/docs/7.0/using-decorators)
  * [6.6](https://mikro-orm.io/docs/6.6/quick-start)
  * [5.9](https://mikro-orm.io/docs/5.9/installation)
[Docs](https://mikro-orm.io/docs/quick-start)[API](https://mikro-orm.io/api)[Blog](https://mikro-orm.io/blog)[Changelog](https://mikro-orm.io/changelog)
[latest: v7.1.3](https://mikro-orm.io/versions)[Discord](https://discord.gg/w8bjxFHS7X "Chat on Discord")[GitHub](https://github.com/mikro-orm/mikro-orm "View on GitHub")[Twitter](https://twitter.com/MikroORM "Twitter")
Search
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
    * [Logging](https://mikro-orm.io/docs/next/logging)
    * [Deployment](https://mikro-orm.io/docs/next/deployment)
    * [Defining Entities via defineEntity](https://mikro-orm.io/docs/next/define-entity)
    * [Using Decorators](https://mikro-orm.io/docs/next/using-decorators)
    * [Folder-based Discovery](https://mikro-orm.io/docs/next/folder-based-discovery)
    * [Metadata Providers](https://mikro-orm.io/docs/next/metadata-providers)
    * [Metadata Cache](https://mikro-orm.io/docs/next/metadata-cache)
    * [Canary & dev builds](https://mikro-orm.io/docs/next/canary-builds)
  * [Integrations](https://mikro-orm.io/docs/next/integrations)
  * [Recipes](https://mikro-orm.io/docs/next/recipes)
  * [Reference](https://mikro-orm.io/docs/next/reference)
  * [Example Integrations](https://mikro-orm.io/docs/next/examples)
  * [Upgrading](https://mikro-orm.io/docs/next/upgrading)
This is unreleased documentation for MikroORM **Next** version.
For up-to-date documentation, see the **[latest version](https://mikro-orm.io/docs/using-decorators)** (7.1).
  * [](https://mikro-orm.io/)
  * [Configuration](https://mikro-orm.io/docs/next/configuration)
Version: Next
On this page
# Using Decorators
This guide covers using class decorators to define entities. While the [Getting Started guide](https://mikro-orm.io/docs/next/guide/first-entity) uses the `defineEntity` helper for its simplicity and full type inference, decorators remain a powerful and popular approach for entity definition.
## Decorator Types[​](https://mikro-orm.io/docs/next/using-decorators#decorator-types "Direct link to Decorator Types")
MikroORM v7 supports two types of decorators:  
| Feature  | Legacy (Experimental) Decorators  | ES Spec Decorators  |  
| --- | --- | --- |  
| TypeScript config  | `experimentalDecorators: true`  | No special config needed  |  
| Package  | `@mikro-orm/decorators/legacy`  | `@mikro-orm/decorators/es`  |  
| Metadata reflection  | Supported (with `reflect-metadata`)  | Not supported  |  
| ts-morph support  | Yes  | Yes  |  
| Transpiler support  | tsc, swc, babel (with plugins)  | tsc, esbuild, swc  |  
### Legacy (Experimental) Decorators[​](https://mikro-orm.io/docs/next/using-decorators#legacy-experimental-decorators "Direct link to Legacy \(Experimental\) Decorators")
Legacy decorators are the traditional TypeScript decorators that have been available for years. They require the `experimentalDecorators` compiler option.
tsconfig.json
```
{  
  "compilerOptions": {  
    "experimentalDecorators": true,  
    "emitDecoratorMetadata": true // only needed with reflect-metadata  
  }  
}  
```
./entities/User.ts
```
import { Entity, PrimaryKey, Property } from '@mikro-orm/decorators/legacy';  
  
@Entity()  
export class User {  
  
  @PrimaryKey()  
  id!: number;  
  
  @Property()  
  fullName!: string;  
  
  @Property()  
  email!: string;  
  
  @Property({ nullable: true })  
  age?: number;  
  
}  
```
### ES Spec Decorators (Stage 3)[​](https://mikro-orm.io/docs/next/using-decorators#es-spec-decorators-stage-3 "Direct link to ES Spec Decorators \(Stage 3\)")
ES spec decorators follow the [TC39 Stage 3 proposal](https://github.com/tc39/proposal-decorators) and are now supported natively by TypeScript 5.0+ without any configuration. They work with modern bundlers like esbuild out of the box.
./entities/User.ts
```
import { Entity, PrimaryKey, Property } from '@mikro-orm/decorators/es';  
  
@Entity()  
export class User {  
  
  @PrimaryKey()  
  id!: number;  
  
  @Property()  
  fullName!: string;  
  
  @Property()  
  email!: string;  
  
  @Property()  
  age?: number;  
  
}  
```
ES spec decorators do **not** support metadata reflection. This means:
  * You cannot use `reflect-metadata` with ES spec decorators
  * You must always provide the target entity type explicitly in relation decorators
  * The `TsMorphMetadataProvider` can still infer types from your source code
## Metadata Providers[​](https://mikro-orm.io/docs/next/using-decorators#metadata-providers "Direct link to Metadata Providers")
When using decorators, MikroORM needs a way to understand the types of your entity properties. This is handled by metadata providers.
### ReflectMetadataProvider[​](https://mikro-orm.io/docs/next/using-decorators#reflectmetadataprovider "Direct link to ReflectMetadataProvider")
The `ReflectMetadataProvider` uses the `reflect-metadata` package to read type information emitted by the TypeScript compiler. This approach is fast and lightweight, but has some limitations.
**Installation:**
  * npm
  * Yarn
  * pnpm
  * Bun
```
npm install reflect-metadata  
```
```
yarn add reflect-metadata  
```
```
pnpm add reflect-metadata  
```
```
bun add reflect-metadata  
```
**Configuration:**
mikro-orm.config.ts
```
import { ReflectMetadataProvider } from '@mikro-orm/decorators/legacy';  
import { defineConfig } from '@mikro-orm/sqlite';  
  
export default defineConfig({  
  metadataProvider: ReflectMetadataProvider,  
  entities: [User, Article], // explicit entity references recommended  
  // ...  
});  
```
**TypeScript Configuration:**
tsconfig.json
```
{  
  "compilerOptions": {  
    "experimentalDecorators": true,  
    "emitDecoratorMetadata": true  
  }  
}  
```
**Bootstrap:**
app.ts
```
import 'reflect-metadata'; // Must be imported before any entity  
import { MikroORM } from '@mikro-orm/sqlite';  
```
**Limitations:**
When using `reflect-metadata`, you need to be more explicit in your decorators:
```
import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/decorators/legacy';  
  
@Entity()  
export class Article {  
  
  @PrimaryKey()  
  id!: number;  
  
  @Property()  
  title!: string;  
  
  // Must specify `entity` and `nullable` explicitly  
  @ManyToOne(() => User, { nullable: true })  
  author?: User;  
  
  // Must specify `entity`, `nullable` and `ref` explicitly  
  @ManyToOne(() => Publisher, { ref: true, nullable: true })  
  publisher?: Ref<Publisher>;  
  
  // Array types need explicit items  
  @Property({ type: 'string[]' })  
  tags: string[] = [];  
  
}  
```
**Type inference limitations with reflect-metadata:**  
| Scenario  | ts-morph  | reflect-metadata  |  
| --- | --- | --- |  
| Scalar types  | Automatic  | Automatic  |  
| Optional properties  | Inferred as nullable  | Requires `nullable: true`  |  
| Relation targets  | Automatic  | Requires `entity: () => Entity`  |  
|  `Ref<T>` wrapper  | Automatic  | Requires `ref: true`  |  
|  `LazyRef<T>` marker  | Automatic (type-only, no wrapper)  | No metadata flag — type-only  |  
| Array element types  | Automatic  | Requires explicit `type`  |  
| Enums  | Automatic  | Requires `items: Enum`  |  
| Union types  | Supported  | Not supported  |  
`ReflectMetadataProvider` only works with legacy decorators. ES spec decorators do not support `emitDecoratorMetadata`, so you cannot use reflect-metadata with them.
### TsMorphMetadataProvider[​](https://mikro-orm.io/docs/next/using-decorators#tsmorphmetadataprovider "Direct link to TsMorphMetadataProvider")
The `TsMorphMetadataProvider` uses the TypeScript Compiler API (via [ts-morph](https://ts-morph.com)) to read type information directly from your source files. This is slower than `ReflectMetadataProvider`, but it supports inferring many options from the TypeScript source code.
**Installation:**
  * npm
  * Yarn
  * pnpm
  * Bun
```
npm install @mikro-orm/reflection  
```
```
yarn add @mikro-orm/reflection  
```
```
pnpm add @mikro-orm/reflection  
```
```
bun add @mikro-orm/reflection  
```
**Configuration:**
mikro-orm.config.ts
```
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';  
import { defineConfig } from '@mikro-orm/sqlite';  
  
export default defineConfig({  
  metadataProvider: TsMorphMetadataProvider,  
  entities: [User, Article],  
  // ...  
});  
```
**TypeScript Configuration:**
tsconfig.json
```
{  
  "compilerOptions": {  
    "declaration": true,  
    "experimentalDecorators": true  
  }  
}  
```
The `declaration: true` option is required because ts-morph reads `.d.ts` files when running from compiled JavaScript.
**Benefits:**
  * Automatically infers property types, including complex types and generics
  * Infers nullability from optional properties (`?`)
  * Works with both legacy and ES spec decorators
  * Allows DRY entity definitions (less decorator options needed)
**Considerations:**
  * Slower discovery (mitigated by metadata caching)
  * Requires `.d.ts` files to be generated
  * Not compatible with some bundlers (e.g., webpack in certain configurations)
**Folder-based discovery and ESM:**
When using folder-based discovery (glob patterns in `entities` option) in an ESM project with test runners like Vitest, you may encounter an error like `TypeError: Unknown file extension ".ts"` (ERR_UNKNOWN_FILE_EXTENSION). This happens because the dynamic import of your entities fails to resolve TypeScript files - MikroORM performs these imports internally, and tools like Vitest cannot automatically transform them.
To work around this, you can override the `dynamicImportProvider` option in your ORM config. This allows you to use an `import` call defined inside the context of your ESM application:
mikro-orm.config.ts
```
export default defineConfig({  
  // ...  
  // for vitest to get around `TypeError: Unknown file extension ".ts"` (ERR_UNKNOWN_FILE_EXTENSION)  
  dynamicImportProvider: id => import(id),  
});  
```
This tells MikroORM to use your application's import context instead of its own, allowing proper TypeScript file resolution.
**Example - DRY entity definition with ts-morph:**
```
import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/decorators/legacy';  
  
@Entity()  
export class Article {  
  
  @PrimaryKey()  
  id!: number;  
  
  @Property()  
  title!: string;  
  
  // ts-morph infers: type is User, nullable is true  
  @ManyToOne()  
  author?: User;  
  
  // ts-morph infers the Ref wrapper and target entity  
  @ManyToOne()  
  publisher?: Ref<Publisher>;  
  
}  
```
### Metadata Caching[​](https://mikro-orm.io/docs/next/using-decorators#metadata-caching "Direct link to Metadata Caching")
When using `TsMorphMetadataProvider`, the discovery process can be slow due to TypeScript parsing. MikroORM caches the metadata to speed up subsequent startups.
mikro-orm.config.ts
```
import { defineConfig } from '@mikro-orm/sqlite';  
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';  
  
export default defineConfig({  
  metadataProvider: TsMorphMetadataProvider,  
  metadataCache: {  
    enabled: true, // enabled by default for TsMorphMetadataProvider  
    // Cache is stored in `temp` folder by default  
    // Add this folder to .gitignore  
  },  
});  
```
For production deployments, you can generate the cache at build time:
```
npx mikro-orm cache:generate  
```
This creates a production-ready cache that eliminates the need for ts-morph at runtime.
See [Metadata Cache](https://mikro-orm.io/docs/next/metadata-cache) for more details.
### Comparison of Approaches[​](https://mikro-orm.io/docs/next/using-decorators#comparison-of-approaches "Direct link to Comparison of Approaches")  
| Approach  | Pros  | Cons  |  
| --- | --- | --- |  
| `defineEntity`  | Full type inference, no decorators, works everywhere  | Different syntax than traditional ORMs  |  
| ES decorators + ts-morph  | Modern standard, DRY definitions  | Slower startup, requires `.d.ts` files  |  
| Legacy decorators + ts-morph  | DRY definitions, familiar syntax  | Slower startup, requires config  |  
| Legacy decorators + reflect-metadata  | Fast startup, lightweight  | Verbose, limited type inference  |  
## Migration from v6[​](https://mikro-orm.io/docs/next/using-decorators#migration-from-v6 "Direct link to Migration from v6")
In MikroORM v7, decorators were moved to a separate package:
```
- import { Entity, PrimaryKey, Property } from '@mikro-orm/core';  
+ import { Entity, PrimaryKey, Property } from '@mikro-orm/decorators/legacy';  
```
For ES spec decorators:
```
import { Entity, PrimaryKey, Property } from '@mikro-orm/decorators/es';  
```
The `ReflectMetadataProvider` is also moved:
```
- import { ReflectMetadataProvider } from '@mikro-orm/core';  
+ import { ReflectMetadataProvider } from '@mikro-orm/decorators/legacy';  
```
See [Upgrading from v6 to v7](https://mikro-orm.io/docs/next/upgrading-v6-to-v7) for the complete migration guide.
[](https://github.com/mikro-orm/mikro-orm/edit/master/docs/docs/using-decorators.md)
Last updated on **May 17, 2026** by **Martin Adámek**
[Previous Defining Entities via defineEntity](https://mikro-orm.io/docs/next/define-entity)[Next Folder-based Discovery](https://mikro-orm.io/docs/next/folder-based-discovery)
  * [Decorator Types](https://mikro-orm.io/docs/next/using-decorators#decorator-types)
    * [Legacy (Experimental) Decorators](https://mikro-orm.io/docs/next/using-decorators#legacy-experimental-decorators)
    * [ES Spec Decorators (Stage 3)](https://mikro-orm.io/docs/next/using-decorators#es-spec-decorators-stage-3)
  * [Metadata Providers](https://mikro-orm.io/docs/next/using-decorators#metadata-providers)
    * [ReflectMetadataProvider](https://mikro-orm.io/docs/next/using-decorators#reflectmetadataprovider)
    * [TsMorphMetadataProvider](https://mikro-orm.io/docs/next/using-decorators#tsmorphmetadataprovider)
    * [Metadata Caching](https://mikro-orm.io/docs/next/using-decorators#metadata-caching)
    * [Comparison of Approaches](https://mikro-orm.io/docs/next/using-decorators#comparison-of-approaches)
  * [Migration from v6](https://mikro-orm.io/docs/next/using-decorators#migration-from-v6)
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
# https://mikro-orm.io/docs/next/folder-based-discovery
============================================================
[Skip to main content](https://mikro-orm.io/docs/next/folder-based-discovery#__docusaurus_skipToContent_fallback)
⭐️ If you like MikroORM, give it a star on [GitHub](https://github.com/mikro-orm/mikro-orm) and consider [sponsoring](https://github.com/sponsors/mikro-orm) its development! ⭐️
[ ![MikroORM](https://mikro-orm.io/img/logo.svg)![MikroORM](https://mikro-orm.io/img/logo-dark.svg) ](https://mikro-orm.io/)
[Next](https://mikro-orm.io/docs/next/folder-based-discovery)
  * [Next](https://mikro-orm.io/docs/next/folder-based-discovery)
  * [7.1](https://mikro-orm.io/docs/folder-based-discovery)
  * [7.0](https://mikro-orm.io/docs/7.0/folder-based-discovery)
  * [6.6](https://mikro-orm.io/docs/6.6/quick-start)
  * [5.9](https://mikro-orm.io/docs/5.9/installation)
[Docs](https://mikro-orm.io/docs/quick-start)[API](https://mikro-orm.io/api)[Blog](https://mikro-orm.io/blog)[Changelog](https://mikro-orm.io/changelog)
[latest: v7.1.3](https://mikro-orm.io/versions)[Discord](https://discord.gg/w8bjxFHS7X "Chat on Discord")[GitHub](https://github.com/mikro-orm/mikro-orm "View on GitHub")[Twitter](https://twitter.com/MikroORM "Twitter")
Search
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
    * [Logging](https://mikro-orm.io/docs/next/logging)
    * [Deployment](https://mikro-orm.io/docs/next/deployment)
    * [Defining Entities via defineEntity](https://mikro-orm.io/docs/next/define-entity)
    * [Using Decorators](https://mikro-orm.io/docs/next/using-decorators)
    * [Folder-based Discovery](https://mikro-orm.io/docs/next/folder-based-discovery)
    * [Metadata Providers](https://mikro-orm.io/docs/next/metadata-providers)
    * [Metadata Cache](https://mikro-orm.io/docs/next/metadata-cache)
    * [Canary & dev builds](https://mikro-orm.io/docs/next/canary-builds)
  * [Integrations](https://mikro-orm.io/docs/next/integrations)
  * [Recipes](https://mikro-orm.io/docs/next/recipes)
  * [Reference](https://mikro-orm.io/docs/next/reference)
  * [Example Integrations](https://mikro-orm.io/docs/next/examples)
  * [Upgrading](https://mikro-orm.io/docs/next/upgrading)
This is unreleased documentation for MikroORM **Next** version.
For up-to-date documentation, see the **[latest version](https://mikro-orm.io/docs/folder-based-discovery)** (7.1).
  * [](https://mikro-orm.io/)
  * [Configuration](https://mikro-orm.io/docs/next/configuration)
Version: Next
On this page
# Folder-based Discovery
Instead of explicitly listing all entities, you can use glob patterns to discover entities automatically based on file naming conventions.
## Configuration[​](https://mikro-orm.io/docs/next/folder-based-discovery#configuration "Direct link to Configuration")
mikro-orm.config.ts
```
import { defineConfig } from '@mikro-orm/sqlite';  
  
export default defineConfig({  
  // Glob patterns for compiled JavaScript files  
  entities: ['dist/**/*.entity.js'],  
  // Glob patterns for TypeScript source files (used in development)  
  entitiesTs: ['src/**/*.entity.ts'],  
  // ...  
});  
```
## How it works[​](https://mikro-orm.io/docs/next/folder-based-discovery#how-it-works "Direct link to How it works")
  1. When running from TypeScript (e.g., via tsx, or in tests), MikroORM uses `entitiesTs` patterns
  2. When running from compiled JavaScript, MikroORM uses `entities` patterns
  3. Files matching the patterns are dynamically imported and scanned for entity definitions
> It is important that `entities` points to the compiled JS files, and `entitiesTs` points to the TS source files. You should not mix those.
## File naming conventions[​](https://mikro-orm.io/docs/next/folder-based-discovery#file-naming-conventions "Direct link to File naming conventions")
A common convention is to use the `.entity.ts` suffix:
```
src/  
├── modules/  
│   ├── user/  
│   │   └── user.entity.ts  
│   ├── article/  
│   │   ├── article.entity.ts  
│   │   └── tag.entity.ts  
│   └── common/  
│       └── base.entity.ts  
└── mikro-orm.config.ts  
```
## Glob patterns[​](https://mikro-orm.io/docs/next/folder-based-discovery#glob-patterns "Direct link to Glob patterns")
The paths are resolved using native Node.js glob, so you can use standard globbing patterns:
```
const orm = await MikroORM.init({  
  // All .entity.js files in dist folder recursively  
  entities: ['./dist/**/*.entity.js'],  
  
  // Multiple patterns  
  entities: ['./dist/modules/**/*.entity.js', './dist/shared/**/*.entity.js'],  
  
  // Negative patterns to exclude files  
  entities: ['./dist/**/*.entity.js', '!./dist/**/*.test.entity.js'],  
});  
```
Native Node.js glob does not support brace expansion patterns like `src/{entities,modules}/*.ts`. If you need this feature, use `tinyglobby` directly:
```
import { glob } from 'tinyglobby';  
  
export default defineConfig({  
  entities: await glob(['src/{entities,modules}/*.ts']),  
});  
```
## Debugging discovery[​](https://mikro-orm.io/docs/next/folder-based-discovery#debugging-discovery "Direct link to Debugging discovery")
If you are experiencing problems with folder-based discovery, use the `mikro-orm debug` CLI command to check what paths are actually being used:
```
npx mikro-orm debug  
```
This will show you:
  * Which configuration file is being loaded
  * The resolved entity paths
  * Which entities were discovered
## Explicit vs Folder-based Discovery[​](https://mikro-orm.io/docs/next/folder-based-discovery#explicit-vs-folder-based-discovery "Direct link to Explicit vs Folder-based Discovery")  
| Aspect  | Explicit (`entities: [User]`)  | Folder-based (`entities: ['**/*.entity.js']`)  |  
| --- | --- | --- |  
| Setup complexity  | More code  | Less code  |  
| Refactoring  | IDE-supported  | Manual pattern updates  |  
| Build tools  | Works everywhere  | May need configuration  |  
| Performance  | Faster startup  | Slightly slower (file scanning)  |  
| Error detection  | Compile-time  | Runtime  |  
### When to use explicit references[​](https://mikro-orm.io/docs/next/folder-based-discovery#when-to-use-explicit-references "Direct link to When to use explicit references")
  * Small to medium projects
  * When using bundlers like webpack or esbuild
  * When you want maximum IDE support and type safety
  * When using `defineEntity` (recommended approach)
### When to use folder-based discovery[​](https://mikro-orm.io/docs/next/folder-based-discovery#when-to-use-folder-based-discovery "Direct link to When to use folder-based discovery")
  * Large projects with many entities
  * When using decorator-based entities with ts-morph
  * When entities are spread across many modules
  * When you want to avoid updating config when adding new entities
## Synchronous initialization limitation[​](https://mikro-orm.io/docs/next/folder-based-discovery#synchronous-initialization-limitation "Direct link to Synchronous initialization limitation")
When using the synchronous `new MikroORM()` constructor instead of `MikroORM.init()`, folder-based discovery is not supported:
```
// This works - async initialization supports folder-based discovery  
const orm = await MikroORM.init({  
  entities: ['dist/**/*.entity.js'],  
});  
  
// This does NOT work - must use explicit entity references  
const orm = new MikroORM({  
  entities: ['dist/**/*.entity.js'],  
  // use explicit references only with sync init  
  // entities: [User, Article],   
});  
```
## Multiple entity locations[​](https://mikro-orm.io/docs/next/folder-based-discovery#multiple-entity-locations "Direct link to Multiple entity locations")
You can combine multiple patterns and explicit references:
```
import { BaseEntity } from './entities/base.entity.js';  
  
export default defineConfig({  
  entities: [  
    BaseEntity, // explicit reference  
    'dist/modules/**/*.entity.js', // glob pattern  
  ],  
  entitiesTs: [  
    BaseEntity,  
    'src/modules/**/*.entity.ts',  
  ],  
});  
```
This is useful when you have base entities that need to be loaded first, or when mixing discovery approaches.
## Generating a barrel file with `discovery:export`[​](https://mikro-orm.io/docs/next/folder-based-discovery#generating-a-barrel-file-with-discoveryexport "Direct link to generating-a-barrel-file-with-discoveryexport")
Instead of manually maintaining entity arrays or relying on folder-based discovery at runtime, you can use the `discovery:export` CLI command to generate a TypeScript barrel file with explicit entity imports:
```
npx mikro-orm discovery:export  
```
This scans your entity source files (using `entitiesTs` or `entities` paths from your config) and generates a file like:
```
import { Article } from './entities/Article.js';  
import { User } from './entities/User.js';  
  
export const entities = [  
  Article,  
  User,  
] as const;  
```
You can then use the generated file in your config:
```
import { entities } from './entities.generated';  
  
export default defineConfig({ entities });  
```
This gives you the convenience of folder-based discovery (no manual updates when adding entities) with the benefits of explicit references (works with bundlers, faster startup, compile-time checking). The command also generates a `Database` type for use with [Kysely integration](https://mikro-orm.io/docs/next/kysely#generating-entity-exports-with-the-cli).
See the [Kysely guide](https://mikro-orm.io/docs/next/kysely#generating-entity-exports-with-the-cli) for the full command options.
[](https://github.com/mikro-orm/mikro-orm/edit/master/docs/docs/folder-based-discovery.md)
Last updated on **May 17, 2026** by **Martin Adámek**
[Previous Using Decorators](https://mikro-orm.io/docs/next/using-decorators)[Next Metadata Providers](https://mikro-orm.io/docs/next/metadata-providers)
  * [Configuration](https://mikro-orm.io/docs/next/folder-based-discovery#configuration)
  * [How it works](https://mikro-orm.io/docs/next/folder-based-discovery#how-it-works)
  * [File naming conventions](https://mikro-orm.io/docs/next/folder-based-discovery#file-naming-conventions)
  * [Glob patterns](https://mikro-orm.io/docs/next/folder-based-discovery#glob-patterns)
  * [Debugging discovery](https://mikro-orm.io/docs/next/folder-based-discovery#debugging-discovery)
  * [Explicit vs Folder-based Discovery](https://mikro-orm.io/docs/next/folder-based-discovery#explicit-vs-folder-based-discovery)
    * [When to use explicit references](https://mikro-orm.io/docs/next/folder-based-discovery#when-to-use-explicit-references)
    * [When to use folder-based discovery](https://mikro-orm.io/docs/next/folder-based-discovery#when-to-use-folder-based-discovery)
  * [Synchronous initialization limitation](https://mikro-orm.io/docs/next/folder-based-discovery#synchronous-initialization-limitation)
  * [Multiple entity locations](https://mikro-orm.io/docs/next/folder-based-discovery#multiple-entity-locations)
  * [Generating a barrel file with `discovery:export`](https://mikro-orm.io/docs/next/folder-based-discovery#generating-a-barrel-file-with-discoveryexport)
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
# https://mikro-orm.io/api/core/class/MikroORM
============================================================
[Skip to main content](https://mikro-orm.io/api/core/class/MikroORM#__docusaurus_skipToContent_fallback)
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
    * [Overview](https://mikro-orm.io/api/core)
    * [Classes](https://mikro-orm.io/api/core/class/AbstractNamingStrategy)
      * [AbstractNamingStrategy](https://mikro-orm.io/api/core/class/AbstractNamingStrategy)
      * [ArrayType](https://mikro-orm.io/api/core/class/ArrayType)
      * [BaseEntity](https://mikro-orm.io/api/core/class/BaseEntity)
      * [BigIntType](https://mikro-orm.io/api/core/class/BigIntType)
      * [BlobType](https://mikro-orm.io/api/core/class/BlobType)
      * [BooleanType](https://mikro-orm.io/api/core/class/BooleanType)
      * [ChangeSet](https://mikro-orm.io/api/core/class/ChangeSet)
      * [CharacterType](https://mikro-orm.io/api/core/class/CharacterType)
      * [CheckConstraintViolationException](https://mikro-orm.io/api/core/class/CheckConstraintViolationException)
      * [Collection](https://mikro-orm.io/api/core/class/Collection)
      * [Configuration](https://mikro-orm.io/api/core/class/Configuration)
      * [Connection](https://mikro-orm.io/api/core/class/Connection)
      * [ConnectionException](https://mikro-orm.io/api/core/class/ConnectionException)
      * [ConstraintViolationException](https://mikro-orm.io/api/core/class/ConstraintViolationException)
      * [Cursor](https://mikro-orm.io/api/core/class/Cursor)
      * [CursorError](https://mikro-orm.io/api/core/class/CursorError)
      * [DatabaseDriver](https://mikro-orm.io/api/core/class/DatabaseDriver)
      * [DatabaseObjectExistsException](https://mikro-orm.io/api/core/class/DatabaseObjectExistsException)
      * [DatabaseObjectNotFoundException](https://mikro-orm.io/api/core/class/DatabaseObjectNotFoundException)
      * [DateTimeType](https://mikro-orm.io/api/core/class/DateTimeType)
      * [DateType](https://mikro-orm.io/api/core/class/DateType)
      * [DeadlockException](https://mikro-orm.io/api/core/class/DeadlockException)
      * [DecimalType](https://mikro-orm.io/api/core/class/DecimalType)
      * [DefaultLogger](https://mikro-orm.io/api/core/class/DefaultLogger)
      * [DoubleType](https://mikro-orm.io/api/core/class/DoubleType)
      * [DriverException](https://mikro-orm.io/api/core/class/DriverException)
      * [EntityAssigner](https://mikro-orm.io/api/core/class/EntityAssigner)
      * [EntityCaseNamingStrategy](https://mikro-orm.io/api/core/class/EntityCaseNamingStrategy)
      * [EntityLoader](https://mikro-orm.io/api/core/class/EntityLoader)
      * [EntityManager](https://mikro-orm.io/api/core/class/EntityManager)
      * [EntityMetadata](https://mikro-orm.io/api/core/class/EntityMetadata)
      * [EntityRepository](https://mikro-orm.io/api/core/class/EntityRepository)
      * [EntitySchema](https://mikro-orm.io/api/core/class/EntitySchema)
      * [EntitySerializer](https://mikro-orm.io/api/core/class/EntitySerializer)
      * [EntityTransformer](https://mikro-orm.io/api/core/class/EntityTransformer)
      * [EnumArrayType](https://mikro-orm.io/api/core/class/EnumArrayType)
      * [EnumType](https://mikro-orm.io/api/core/class/EnumType)
      * [EventManager](https://mikro-orm.io/api/core/class/EventManager)
      * [ExceptionConverter](https://mikro-orm.io/api/core/class/ExceptionConverter)
      * [FloatType](https://mikro-orm.io/api/core/class/FloatType)
      * [ForeignKeyConstraintViolationException](https://mikro-orm.io/api/core/class/ForeignKeyConstraintViolationException)
      * [GeneratedCacheAdapter](https://mikro-orm.io/api/core/class/GeneratedCacheAdapter)
      * [Hydrator](https://mikro-orm.io/api/core/class/Hydrator)
      * [IntegerType](https://mikro-orm.io/api/core/class/IntegerType)
      * [IntervalType](https://mikro-orm.io/api/core/class/IntervalType)
      * [InvalidFieldNameException](https://mikro-orm.io/api/core/class/InvalidFieldNameException)
      * [JsonType](https://mikro-orm.io/api/core/class/JsonType)
      * [LoadableBaseEntity](https://mikro-orm.io/api/core/class/LoadableBaseEntity)
      * [LockWaitTimeoutException](https://mikro-orm.io/api/core/class/LockWaitTimeoutException)
      * [MediumIntType](https://mikro-orm.io/api/core/class/MediumIntType)
      * [MemoryCacheAdapter](https://mikro-orm.io/api/core/class/MemoryCacheAdapter)
      * [MetadataDiscovery](https://mikro-orm.io/api/core/class/MetadataDiscovery)
      * [MetadataError](https://mikro-orm.io/api/core/class/MetadataError)
      * [MetadataProvider](https://mikro-orm.io/api/core/class/MetadataProvider)
      * [MetadataStorage](https://mikro-orm.io/api/core/class/MetadataStorage)
      * [MikroORM](https://mikro-orm.io/api/core/class/MikroORM)
      * [MongoNamingStrategy](https://mikro-orm.io/api/core/class/MongoNamingStrategy)
      * [NonUniqueFieldNameException](https://mikro-orm.io/api/core/class/NonUniqueFieldNameException)
      * [NotFoundError](https://mikro-orm.io/api/core/class/NotFoundError)
      * [NotNullConstraintViolationException](https://mikro-orm.io/api/core/class/NotNullConstraintViolationException)
      * [NullCacheAdapter](https://mikro-orm.io/api/core/class/NullCacheAdapter)
      * [NullHighlighter](https://mikro-orm.io/api/core/class/NullHighlighter)
      * [OptimisticLockError](https://mikro-orm.io/api/core/class/OptimisticLockError)
      * [PlainObject](https://mikro-orm.io/api/core/class/PlainObject)
      * [Platform](https://mikro-orm.io/api/core/class/Platform)
      * [PolymorphicRef](https://mikro-orm.io/api/core/class/PolymorphicRef)
      * [RawQueryFragment](https://mikro-orm.io/api/core/class/RawQueryFragment)
      * [ReadOnlyException](https://mikro-orm.io/api/core/class/ReadOnlyException)
      * [Reference](https://mikro-orm.io/api/core/class/Reference)
      * [RequestContext](https://mikro-orm.io/api/core/class/RequestContext)
      * [Routine](https://mikro-orm.io/api/core/class/Routine)
      * [ScalarReference](https://mikro-orm.io/api/core/class/ScalarReference)
      * [SerializationContext](https://mikro-orm.io/api/core/class/SerializationContext)
      * [ServerException](https://mikro-orm.io/api/core/class/ServerException)
      * [SimpleLogger](https://mikro-orm.io/api/core/class/SimpleLogger)
      * [SmallIntType](https://mikro-orm.io/api/core/class/SmallIntType)
      * [StringType](https://mikro-orm.io/api/core/class/StringType)
      * [SyntaxErrorException](https://mikro-orm.io/api/core/class/SyntaxErrorException)
      * [TableExistsException](https://mikro-orm.io/api/core/class/TableExistsException)
      * [TableNotFoundException](https://mikro-orm.io/api/core/class/TableNotFoundException)
      * [TextType](https://mikro-orm.io/api/core/class/TextType)
      * [TimeType](https://mikro-orm.io/api/core/class/TimeType)
      * [TinyIntType](https://mikro-orm.io/api/core/class/TinyIntType)
      * [TransactionContext](https://mikro-orm.io/api/core/class/TransactionContext)
      * [TransactionEventBroadcaster](https://mikro-orm.io/api/core/class/TransactionEventBroadcaster)
      * [TransactionManager](https://mikro-orm.io/api/core/class/TransactionManager)
      * [TransactionStateError](https://mikro-orm.io/api/core/class/TransactionStateError)
      * [Type](https://mikro-orm.io/api/core/class/Type)
      * [Uint8ArrayType](https://mikro-orm.io/api/core/class/Uint8ArrayType)
      * [UnderscoreNamingStrategy](https://mikro-orm.io/api/core/class/UnderscoreNamingStrategy)
      * [UniqueConstraintViolationException](https://mikro-orm.io/api/core/class/UniqueConstraintViolationException)
      * [UnitOfWork](https://mikro-orm.io/api/core/class/UnitOfWork)
      * [UnknownType](https://mikro-orm.io/api/core/class/UnknownType)
      * [Utils](https://mikro-orm.io/api/core/class/Utils)
      * [UuidType](https://mikro-orm.io/api/core/class/UuidType)
      * [ValidationError](https://mikro-orm.io/api/core/class/ValidationError)
    * [Enumerations](https://mikro-orm.io/api/core/enum/Cascade)
    * [Functions](https://mikro-orm.io/api/core/function/assign)
    * [Interfaces](https://mikro-orm.io/api/core/interface/AbortQueryOptions)
    * [Namespaces](https://mikro-orm.io/api/core/namespace/DefineConfig)
    * [References](https://mikro-orm.io/api/core#Raw)
    * [Type Aliases](https://mikro-orm.io/api/core#AnyEntity)
    * [Variables](https://mikro-orm.io/api/core#ARRAY_OPERATORS)
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
Version: 7.1
On this page
#  <Driver, EM, Entities>
The main class used to configure and bootstrap the ORM. 
**@example**
    
```
// import from driver package  
import { MikroORM, defineEntity, p } from '@mikro-orm/sqlite';  
  
const User = defineEntity({  
  name: 'User',  
  properties: {  
    id: p.integer().primary(),  
    name: p.string(),  
  },  
});  
  
const orm = new MikroORM({  
  entities: [User],  
  dbName: 'my.db',  
});  
await orm.schema.update();  
  
const em = orm.em.fork();  
const u1 = em.create(User, { name: 'John' });  
const u2 = em.create(User, { name: 'Ben' });  
await em.flush();  
```
### Hierarchy
  * _MikroORM_
    * [MikroORM](https://mikro-orm.io/api/sql/class/MikroORM)
    * [MikroORM](https://mikro-orm.io/api/mongodb/class/MikroORM)
## Index [](https://mikro-orm.io/api/core/class/MikroORM#Index)
### Constructors
  * [](https://mikro-orm.io/api/core/class/MikroORM#constructor)
### Properties
  * [](https://mikro-orm.io/api/core/class/MikroORM#config)
  * [](https://mikro-orm.io/api/core/class/MikroORM#driver)
  * [](https://mikro-orm.io/api/core/class/MikroORM#em)
### Accessors
  * [](https://mikro-orm.io/api/core/class/MikroORM#entityGenerator)
  * [](https://mikro-orm.io/api/core/class/MikroORM#migrator)
  * [](https://mikro-orm.io/api/core/class/MikroORM#schema)
  * [](https://mikro-orm.io/api/core/class/MikroORM#seeder)
### Methods
  * [](https://mikro-orm.io/api/core/class/MikroORM#checkConnection)
  * [](https://mikro-orm.io/api/core/class/MikroORM#close)
  * [](https://mikro-orm.io/api/core/class/MikroORM#connect)
  * [](https://mikro-orm.io/api/core/class/MikroORM#discoverEntity)
  * [](https://mikro-orm.io/api/core/class/MikroORM#getMetadata)
  * [](https://mikro-orm.io/api/core/class/MikroORM#isConnected)
  * [](https://mikro-orm.io/api/core/class/MikroORM#reconnect)
  * [](https://mikro-orm.io/api/core/class/MikroORM#init)
## Constructors [](https://mikro-orm.io/api/core/class/MikroORM#Constructors)
###  [](https://mikro-orm.io/api/core/class/MikroORM#constructor)[](https://github.com/mikro-orm/mikro-orm/blob/7d70f0cead888bf33ea7b25c81d0b1bb014e47e9/packages/core/src/MikroORM.ts#L152)
  * **new MikroORM** <Driver, EM, Entities>(options): [MikroORM](https://mikro-orm.io/api/core/class/MikroORM)<Driver, EM, Entities>
  * Synchronous variant of the `init` method with some limitations:
    * folder-based discovery not supported
    * ORM extensions are not autoloaded
    * when metadata cache is enabled, `FileCacheAdapter` needs to be explicitly set in the config
* * *
#### Parameters
    * #####  Partial<[Options](https://mikro-orm.io/api/core/interface/Options)<Driver, EM, Entities>>
#### Returns [MikroORM](https://mikro-orm.io/api/core/class/MikroORM)<Driver, EM, Entities>
## Properties [](https://mikro-orm.io/api/core/class/MikroORM#Properties)
###  [](https://mikro-orm.io/api/core/class/MikroORM#config)[](https://github.com/mikro-orm/mikro-orm/blob/7d70f0cead888bf33ea7b25c81d0b1bb014e47e9/packages/core/src/MikroORM.ts#L111)readonlyconfig
:  [Configuration](https://mikro-orm.io/api/core/class/Configuration)<Driver, Driver[typeof [EntityManagerType](https://mikro-orm.io/api/core#EntityManagerType)] & [EntityManager](https://mikro-orm.io/api/core/class/EntityManager)<Driver>>
The ORM configuration instance.
###  [](https://mikro-orm.io/api/core/class/MikroORM#driver)[](https://github.com/mikro-orm/mikro-orm/blob/7d70f0cead888bf33ea7b25c81d0b1bb014e47e9/packages/core/src/MikroORM.ts#L109)readonlydriver
:  Driver
The database driver instance used by this ORM.
###  [](https://mikro-orm.io/api/core/class/MikroORM#em)[](https://github.com/mikro-orm/mikro-orm/blob/7d70f0cead888bf33ea7b25c81d0b1bb014e47e9/packages/core/src/MikroORM.ts#L107)
:  EM & { ~entities?: Entities }
The global EntityManager instance. If you are using `RequestContext` helper, it will automatically pick the request specific context under the hood
## Accessors [](https://mikro-orm.io/api/core/class/MikroORM#Accessors)
###  [](https://mikro-orm.io/api/core/class/MikroORM#entityGenerator)[](https://github.com/mikro-orm/mikro-orm/blob/7d70f0cead888bf33ea7b25c81d0b1bb014e47e9/packages/core/src/MikroORM.ts#L288)
  * get entityGenerator(): [IEntityGenerator](https://mikro-orm.io/api/core/interface/IEntityGenerator)
  * Gets the EntityGenerator.
* * *
#### Returns [IEntityGenerator](https://mikro-orm.io/api/core/interface/IEntityGenerator)
###  [](https://mikro-orm.io/api/core/class/MikroORM#migrator)[](https://github.com/mikro-orm/mikro-orm/blob/7d70f0cead888bf33ea7b25c81d0b1bb014e47e9/packages/core/src/MikroORM.ts#L281)
  * get migrator(): [IMigrator](https://mikro-orm.io/api/core/interface/IMigrator)
  * Gets the Migrator.
* * *
#### Returns [IMigrator](https://mikro-orm.io/api/core/interface/IMigrator)
###  [](https://mikro-orm.io/api/core/class/MikroORM#schema)[](https://github.com/mikro-orm/mikro-orm/blob/7d70f0cead888bf33ea7b25c81d0b1bb014e47e9/packages/core/src/MikroORM.ts#L267)
  * get schema(): ReturnType<ReturnType<Driver[getPlatform]>[getSchemaGenerator]>
  * Gets the SchemaGenerator.
* * *
#### Returns ReturnType<ReturnType<Driver[getPlatform]>[getSchemaGenerator]>
###  [](https://mikro-orm.io/api/core/class/MikroORM#seeder)[](https://github.com/mikro-orm/mikro-orm/blob/7d70f0cead888bf33ea7b25c81d0b1bb014e47e9/packages/core/src/MikroORM.ts#L274)
  * get seeder(): [ISeedManager](https://mikro-orm.io/api/core/interface/ISeedManager)
  * Gets the SeedManager
* * *
#### Returns [ISeedManager](https://mikro-orm.io/api/core/interface/ISeedManager)
## Methods [](https://mikro-orm.io/api/core/class/MikroORM#Methods)
###  [](https://mikro-orm.io/api/core/class/MikroORM#checkConnection)[](https://github.com/mikro-orm/mikro-orm/blob/7d70f0cead888bf33ea7b25c81d0b1bb014e47e9/packages/core/src/MikroORM.ts#L203)
  * **checkConnection**(): Promise<{ ok: true } | { error?: Error; ok: false; reason: string }>
  * Checks whether the database connection is active, returns the reason if not.
* * *
#### Returns Promise<{ ok: true } | { error?: Error; ok: false; reason: string }>
###  [](https://mikro-orm.io/api/core/class/MikroORM#close)[](https://github.com/mikro-orm/mikro-orm/blob/7d70f0cead888bf33ea7b25c81d0b1bb014e47e9/packages/core/src/MikroORM.ts#L210)
  * **close**(force): Promise<void>
  * Closes the database connection.
* * *
#### Parameters
    * #####  boolean = false
#### Returns Promise<void>
###  [](https://mikro-orm.io/api/core/class/MikroORM#connect)[](https://github.com/mikro-orm/mikro-orm/blob/7d70f0cead888bf33ea7b25c81d0b1bb014e47e9/packages/core/src/MikroORM.ts#L176)
  * **connect**(): Promise<Driver>
  * Connects to the database.
* * *
#### Returns Promise<Driver>
###  [](https://mikro-orm.io/api/core/class/MikroORM#discoverEntity)[](https://github.com/mikro-orm/mikro-orm/blob/7d70f0cead888bf33ea7b25c81d0b1bb014e47e9/packages/core/src/MikroORM.ts#L247)
  * **discoverEntity** <T>(entities, reset): void
  * Allows dynamically discovering new entity by reference, handy for testing schema diffing.
* * *
#### Parameters
    * #####  T | T[]
    * #####  optionalreset: [EntityName](https://mikro-orm.io/api/core#EntityName) | [EntityName](https://mikro-orm.io/api/core#EntityName)[]
#### Returns void
###  [](https://mikro-orm.io/api/core/class/MikroORM#getMetadata)[](https://github.com/mikro-orm/mikro-orm/blob/7d70f0cead888bf33ea7b25c81d0b1bb014e47e9/packages/core/src/MikroORM.ts#L219)[](https://github.com/mikro-orm/mikro-orm/blob/7d70f0cead888bf33ea7b25c81d0b1bb014e47e9/packages/core/src/MikroORM.ts#L224)[](https://github.com/mikro-orm/mikro-orm/blob/7d70f0cead888bf33ea7b25c81d0b1bb014e47e9/packages/core/src/MikroORM.ts#L229)
  * **getMetadata**(): [MetadataStorage](https://mikro-orm.io/api/core/class/MetadataStorage)
  * **getMetadata** <Entity>(entityName): [EntityMetadata](https://mikro-orm.io/api/core/class/EntityMetadata)<Entity, [EntityCtor](https://mikro-orm.io/api/core#EntityCtor)<Entity>>
  * Gets the `MetadataStorage`.
* * *
#### Returns [MetadataStorage](https://mikro-orm.io/api/core/class/MetadataStorage)
###  [](https://mikro-orm.io/api/core/class/MikroORM#isConnected)[](https://github.com/mikro-orm/mikro-orm/blob/7d70f0cead888bf33ea7b25c81d0b1bb014e47e9/packages/core/src/MikroORM.ts#L196)
  * **isConnected**(): Promise<boolean>
  * Checks whether the database connection is active.
* * *
#### Returns Promise<boolean>
###  [](https://mikro-orm.io/api/core/class/MikroORM#reconnect)[](https://github.com/mikro-orm/mikro-orm/blob/7d70f0cead888bf33ea7b25c81d0b1bb014e47e9/packages/core/src/MikroORM.ts#L184)
  * **reconnect**(options): Promise<void>
  * Reconnects, possibly to a different database.
* * *
#### Parameters
    * #####  Partial<[Options](https://mikro-orm.io/api/core/interface/Options)<Driver, EM, Entities>> = {}
#### Returns Promise<void>
###  [](https://mikro-orm.io/api/core/class/MikroORM#init)[](https://github.com/mikro-orm/mikro-orm/blob/7d70f0cead888bf33ea7b25c81d0b1bb014e47e9/packages/core/src/MikroORM.ts#L120)staticinit
  * **init** <D, EM, Entities>(options): Promise<[MikroORM](https://mikro-orm.io/api/core/class/MikroORM)<D, EM, Entities>>
  * Initialize the ORM, load entity metadata, create EntityManager and connect to the database. If you omit the `options` parameter, your CLI config will be used.
* * *
#### Parameters
    * #####  Partial<[Options](https://mikro-orm.io/api/core/interface/Options)<D, EM, Entities>>
#### Returns Promise<[MikroORM](https://mikro-orm.io/api/core/class/MikroORM)<D, EM, Entities>>
[Previous MetadataStorage](https://mikro-orm.io/api/core/class/MetadataStorage)[Next MongoNamingStrategy](https://mikro-orm.io/api/core/class/MongoNamingStrategy)
**Page Options**
Hide Inherited
  * [](https://mikro-orm.io/api/core/class/MikroORM#constructor)
  * [](https://mikro-orm.io/api/core/class/MikroORM#config)
  * [](https://mikro-orm.io/api/core/class/MikroORM#driver)
  * [](https://mikro-orm.io/api/core/class/MikroORM#em)
  * [](https://mikro-orm.io/api/core/class/MikroORM#entityGenerator)
  * [](https://mikro-orm.io/api/core/class/MikroORM#migrator)
  * [](https://mikro-orm.io/api/core/class/MikroORM#schema)
  * [](https://mikro-orm.io/api/core/class/MikroORM#seeder)
  * [](https://mikro-orm.io/api/core/class/MikroORM#checkConnection)
  * [](https://mikro-orm.io/api/core/class/MikroORM#close)
  * [](https://mikro-orm.io/api/core/class/MikroORM#connect)
  * [](https://mikro-orm.io/api/core/class/MikroORM#discoverEntity)
  * [](https://mikro-orm.io/api/core/class/MikroORM#getMetadata)
  * [](https://mikro-orm.io/api/core/class/MikroORM#isConnected)
  * [](https://mikro-orm.io/api/core/class/MikroORM#reconnect)
  * [](https://mikro-orm.io/api/core/class/MikroORM#init)
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
# https://mikro-orm.io/identity-map/
============================================================
[Skip to main content](https://mikro-orm.io/docs/identity-map/#__docusaurus_skipToContent_fallback)
⭐️ If you like MikroORM, give it a star on [GitHub](https://github.com/mikro-orm/mikro-orm) and consider [sponsoring](https://github.com/sponsors/mikro-orm) its development! ⭐️
[ ![MikroORM](https://mikro-orm.io/img/logo.svg)![MikroORM](https://mikro-orm.io/img/logo-dark.svg) ](https://mikro-orm.io/)
[7.1](https://mikro-orm.io/docs/identity-map)
  * [Next](https://mikro-orm.io/docs/next/identity-map)
  * [7.1](https://mikro-orm.io/docs/identity-map)
  * [7.0](https://mikro-orm.io/docs/7.0/identity-map)
  * [6.6](https://mikro-orm.io/docs/6.6/identity-map)
  * [5.9](https://mikro-orm.io/docs/5.9/identity-map)
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
# Identity Map and Request Context
`MikroORM` uses identity map in background, so you will always get the same instance of one entity.
## What is an "Identity Map"[​](https://mikro-orm.io/docs/identity-map/#what-is-an-identity-map "Direct link to What is an "Identity Map"")
You can think of an "identity map" as a sort of "in memory cache", in the sense that it starts off empty, gets filled and updated as you perform calls with the entity manager, and items in it get pulled out of it ("cache hit" of sorts) when an operation matches an ID the identity map is aware of. However, it is also different from an actual (result) cache, and should not be used as one (See [here](https://mikro-orm.io/docs/caching) for an actual result cache). Caches are generally meant to improve performance across requests. An identity map is instead meant to improve performance within a single request, by making it possible to compare entity objects trivially, which in turn enables the ORM to batch operations to the database. It also helps to reduce your application's memory footprint per request, by ensuring that even if you make multiple queries that match the same rows, those rows will only exist once in memory.
For example:
```
const authorRepository = em.getRepository(Author);  
const jon = await authorRepository.findOne({ name: 'Jon Snow' }, { populate: ['books'] });  
const authors = await authorRepository.findAll({ populate: ['books'] });  
  
// identity map in action  
console.log(jon === authors[0]); // true  
```
If you want to clear this identity map cache, you can do so via `em.clear()` method:
```
orm.em.clear();  
```
You should always keep unique identity map per each request. This basically means that you need to clone entity manager and use the clone in request context. There are two ways to achieve this:
## Forking Entity Manager[​](https://mikro-orm.io/docs/identity-map/#forking-entity-manager "Direct link to Forking Entity Manager")
With `fork()` method you can simply get clean entity manager with its own context and identity map:
```
const em = orm.em.fork();  
```
## Global Identity Map[​](https://mikro-orm.io/docs/identity-map/#global-identity-map "Direct link to Global Identity Map")
It is no longer possible to use the global identity map. This was a common issue that led to weird bugs, as using the global EM without request context is almost always wrong, you always need to have a dedicated context for each request, so they do not interfere.
You can still disable this check via `allowGlobalContext` configuration, or a connected environment variable `MIKRO_ORM_ALLOW_GLOBAL_CONTEXT` - this can be handy especially in unit tests.
##  `RequestContext` helper[​](https://mikro-orm.io/docs/identity-map/#request-context "Direct link to request-context")
If you use dependency injection container like `inversify` or the one in `nestjs` framework, it can be hard to achieve this, because you usually want to access your repositories via DI container, but it will always provide you with the same instance, rather than new one for each request.
To solve this, you can use `RequestContext` helper, that will use `node`'s [`AsyncLocalStorage`](https://nodejs.org/api/async_context.html#class-asynclocalstorage) in the background to isolate the request context. MikroORM will always use request specific (forked) entity manager if available, so all you need to do is to create new request context preferably as a middleware:
```
// `orm.em` is the global EntityManager instance  
  
app.use((req, res, next) => {  
  // calls `orm.em.fork()` and attaches it to the async context  
  RequestContext.create(orm.em, next);  
});  
  
app.get('/', async (req, res) => {  
  // uses fork from the async context automatically  
  const authors = await orm.em.find(Book, {});  
  res.json(authors);  
});  
```
You should register this middleware as the last one just before request handlers and before any of your custom middleware that is using the ORM. There might be issues when you register it before request processing middleware like `queryParser` or `bodyParser`, so definitely register the context after them.
Later on you can then access the request scoped `EntityManager` via `RequestContext.getEntityManager()`. This method is used under the hood automatically, so you should not need it.
> `RequestContext.getEntityManager()` will return `undefined` if the context was not started yet.
### How does `RequestContext` helper work?[​](https://mikro-orm.io/docs/identity-map/#how-does-requestcontext-helper-work "Direct link to how-does-requestcontext-helper-work")
Internally all `EntityManager` methods that work with the Identity Map (e.g. `em.find()` or `em.getReference()`) first call `em.getContext()` to access the contextual fork. This method will first check if you are running inside `RequestContext` handler and prefer the `EntityManager` fork from it.
```
// we call em.find() on the global EM instance  
const res = await orm.em.find(Book, {});  
  
// but under the hood this resolves to  
const res = await orm.em.getContext().find(Book, {});  
  
// which then resolves to  
const res = await RequestContext.getEntityManager().find(Book, {});  
```
The `RequestContext.getEntityManager()` method then checks `AsyncLocalStorage` static instance we use for creating new EM forks in the `RequestContext.create()` method.
> The context resolution works only on the global `EntityManager` instance, so if you use `em.fork()` directly, you will not get the request scoped `EntityManager` automatically unless you pass the `useContext: true` option to it.
> 
```
> 
// `em` will respect the async context  
> 
> 
> 
const em = orm.em.fork({ useContext: true });  
> 
> 
```
The [`AsyncLocalStorage`](https://nodejs.org/api/async_context.html#class-asynclocalstorage) class from Node.js core is the magician here. It allows you to track the context throughout the async calls. It allows you to decouple the `EntityManager` fork creation (usually in a middleware as shown in previous section) from its usage through the global `EntityManager` instance.
### Using custom `AsyncLocalStorage` instance[​](https://mikro-orm.io/docs/identity-map/#using-custom-asynclocalstorage-instance "Direct link to using-custom-asynclocalstorage-instance")
The `RequestContext` helper holds its own `AsyncLocalStorage` instance, which the ORM checks automatically when resolving `em.getContext()`. If you want to bring your own, you can do so by using the `context` option:
```
const storage = new AsyncLocalStorage<EntityManager>();  
  
const orm = await MikroORM.init({  
  context: () => storage.getStore(),  
  // ...  
});  
  
app.use((req, res, next) => {  
  storage.run(orm.em.fork({ useContext: true }), next);  
});  
```
##  `@CreateRequestContext()` decorator[​](https://mikro-orm.io/docs/identity-map/#createrequestcontext-decorator "Direct link to createrequestcontext-decorator")
> Before v6, `@CreateRequestContext()` was called `@UseRequestContext()`.
Middlewares are executed only for regular HTTP request handlers, what if you need a request scoped method outside of that? One example of that is queue handlers or scheduled tasks (e.g. CRON jobs).
In those cases, you can use the `@CreateRequestContext()` decorator. It requires you to first inject the `MikroORM` instance (or an `EntityManager` or some `EntityRepository`) to current context, it will then be used to create a new context for you. Under the hood, the decorator will register the new request context for your method and execute it inside the context (via `RequestContext.create()`).
> `@CreateRequestContext()` should be used only on the top level methods. It should not be nested - a method decorated with it should not call another method that is also decorated with it.
```
export class MyService {  
  
  // or `private readonly em: EntityManager`  
  constructor(private readonly orm: MikroORM) { }  
  
  @CreateRequestContext()  
  async doSomething() {  
    // this will be executed in a separate context  
  }  
  
}  
```
Alternatively you can provide a callback that will return one of `MikroORM`, `EntityManager` or `EntityRepository` instance.
```
import { DI } from '..';  
  
export class MyService {  
  
  @CreateRequestContext(() => DI.em)  
  async doSomething() {  
    // this will be executed in a separate context  
  }  
  
}  
```
The callback will receive current `this` in the first parameter. You can use it to link the `EntityManager` or `EntityRepository` too:
```
export class MyService {  
  
  constructor(private readonly userRepository: EntityRepository<User>) { }  
  
  @CreateRequestContext<MyService>(t => t.userRepository)  
  async doSomething() {  
    // this will be executed in a separate context  
  }  
  
}  
```
##  `@EnsureRequestContext()` decorator[​](https://mikro-orm.io/docs/identity-map/#ensurerequestcontext-decorator "Direct link to ensurerequestcontext-decorator")
Sometimes you may prefer to just ensure the method is executed inside a request context, and reuse the existing context if available. You can use the `@EnsureRequestContext()` decorator here, it behaves exactly like the `@CreateRequestContext`, but only creates new context if necessary, reusing the existing one if possible.
##  `@Transactional()` decorator[​](https://mikro-orm.io/docs/identity-map/#transactional-decorator "Direct link to transactional-decorator")
If you want to ensure that the method runs within a transaction scope, use `@Transactional()` decorator.
You can provide the same callback that can be used in the `@CreateRequestContext()` decorator via the `context` option, allowing you to handle the injection of the EntityManager in non-standard scenarios. The function is executed within a new transaction context, and upon completion, flush and commit are automatically executed. This decorator can also be used in a nested manner.
For more details about transactions, check the [Transactions section](https://mikro-orm.io/docs/identity-map/transactions).
## Why is Request Context needed?[​](https://mikro-orm.io/docs/identity-map/#why-is-request-context-needed "Direct link to Why is Request Context needed?")
Imagine you will use a single Identity Map throughout your application. It will be shared across all request handlers, that can possibly run in parallel.
### Problem 1 - growing memory footprint[​](https://mikro-orm.io/docs/identity-map/#problem-1---growing-memory-footprint "Direct link to Problem 1 - growing memory footprint")
As there would be only one shared Identity Map, you can't just clear it after your request ends. There can be another request working with it so clearing the Identity Map from one request could break other requests running in parallel. This will result in growing memory footprint, as every entity that became managed at some point in time would be kept in the Identity Map.
### Problem 2 - unstable response of API endpoints[​](https://mikro-orm.io/docs/identity-map/#problem-2---unstable-response-of-api-endpoints "Direct link to Problem 2 - unstable response of API endpoints")
Every entity has `toJSON()` method, that automatically converts it to serialized form. If you have only one shared Identity Map, the following situation may occur:
Let's say there are 2 endpoints
  1. `GET /book/:id` that returns just the book, without populating anything
  2. `GET /book-with-author/:id` that returns the book and its author populated
Now when someone requests same book via both of those endpoints, we could end up with both returning the same output:
  1. `GET /book/1` returns `Book` without populating its property `author` property
  2. `GET /book-with-author/1` returns `Book`, this time with `author` populated
  3. `GET /book/1` returns `Book`, but this time also with `author` populated
This happens because the information about entity association being populated is stored in the Identity Map.
[](https://github.com/mikro-orm/mikro-orm/edit/master/docs/versioned_docs/version-7.1/identity-map.md)
Last updated on **May 20, 2026** by **Martin Adámek**
[Previous Unit of Work](https://mikro-orm.io/docs/unit-of-work)[Next Transactions and Concurrency](https://mikro-orm.io/docs/transactions)
  * [What is an "Identity Map"](https://mikro-orm.io/docs/identity-map/#what-is-an-identity-map)
  * [Forking Entity Manager](https://mikro-orm.io/docs/identity-map/#forking-entity-manager)
  * [Global Identity Map](https://mikro-orm.io/docs/identity-map/#global-identity-map)
  * [`RequestContext` helper](https://mikro-orm.io/docs/identity-map/#request-context)
    * [How does `RequestContext` helper work?](https://mikro-orm.io/docs/identity-map/#how-does-requestcontext-helper-work)
    * [Using custom `AsyncLocalStorage` instance](https://mikro-orm.io/docs/identity-map/#using-custom-asynclocalstorage-instance)
  * [`@CreateRequestContext()` decorator](https://mikro-orm.io/docs/identity-map/#createrequestcontext-decorator)
  * [`@EnsureRequestContext()` decorator](https://mikro-orm.io/docs/identity-map/#ensurerequestcontext-decorator)
  * [`@Transactional()` decorator](https://mikro-orm.io/docs/identity-map/#transactional-decorator)
  * [Why is Request Context needed?](https://mikro-orm.io/docs/identity-map/#why-is-request-context-needed)
    * [Problem 1 - growing memory footprint](https://mikro-orm.io/docs/identity-map/#problem-1---growing-memory-footprint)
    * [Problem 2 - unstable response of API endpoints](https://mikro-orm.io/docs/identity-map/#problem-2---unstable-response-of-api-endpoints)
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
# https://mikro-orm.io/docs/next/identity-map
============================================================
[Skip to main content](https://mikro-orm.io/docs/next/identity-map#__docusaurus_skipToContent_fallback)
⭐️ If you like MikroORM, give it a star on [GitHub](https://github.com/mikro-orm/mikro-orm) and consider [sponsoring](https://github.com/sponsors/mikro-orm) its development! ⭐️
[![MikroORM](https://mikro-orm.io/img/logo.svg)](https://mikro-orm.io/)
[Next](https://mikro-orm.io/docs/next/identity-map)
  * [Next](https://mikro-orm.io/docs/next/identity-map)
  * [7.1](https://mikro-orm.io/docs/identity-map)
  * [7.0](https://mikro-orm.io/docs/7.0/identity-map)
  * [6.6](https://mikro-orm.io/docs/6.6/identity-map)
  * [5.9](https://mikro-orm.io/docs/5.9/identity-map)
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
    * [Architecture](https://mikro-orm.io/docs/next/architecture)
    * [Entity Manager](https://mikro-orm.io/docs/next/entity-manager)
    * [Unit of Work](https://mikro-orm.io/docs/next/unit-of-work)
    * [Identity Map](https://mikro-orm.io/docs/next/identity-map)
    * [Transactions and Concurrency](https://mikro-orm.io/docs/next/transactions)
    * [Entity Repository](https://mikro-orm.io/docs/next/repositories)
    * [Collections](https://mikro-orm.io/docs/next/collections)
    * [The wrap() Helper](https://mikro-orm.io/docs/next/wrap-helper)
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
For up-to-date documentation, see the **[latest version](https://mikro-orm.io/docs/identity-map)** (7.1).
  * [](https://mikro-orm.io/)
  * [Core Concepts](https://mikro-orm.io/docs/next/core-concepts)
Version: Next
On this page
# Identity Map and Request Context
`MikroORM` uses identity map in background, so you will always get the same instance of one entity.
## What is an "Identity Map"[​](https://mikro-orm.io/docs/next/identity-map#what-is-an-identity-map "Direct link to What is an "Identity Map"")
You can think of an "identity map" as a sort of "in memory cache", in the sense that it starts off empty, gets filled and updated as you perform calls with the entity manager, and items in it get pulled out of it ("cache hit" of sorts) when an operation matches an ID the identity map is aware of. However, it is also different from an actual (result) cache, and should not be used as one (See [here](https://mikro-orm.io/docs/next/caching) for an actual result cache). Caches are generally meant to improve performance across requests. An identity map is instead meant to improve performance within a single request, by making it possible to compare entity objects trivially, which in turn enables the ORM to batch operations to the database. It also helps to reduce your application's memory footprint per request, by ensuring that even if you make multiple queries that match the same rows, those rows will only exist once in memory.
For example:
```
const authorRepository = em.getRepository(Author);  
const jon = await authorRepository.findOne({ name: 'Jon Snow' }, { populate: ['books'] });  
const authors = await authorRepository.findAll({ populate: ['books'] });  
  
// identity map in action  
console.log(jon === authors[0]); // true  
```
If you want to clear this identity map cache, you can do so via `em.clear()` method:
```
orm.em.clear();  
```
You should always keep unique identity map per each request. This basically means that you need to clone entity manager and use the clone in request context. There are two ways to achieve this:
## Forking Entity Manager[​](https://mikro-orm.io/docs/next/identity-map#forking-entity-manager "Direct link to Forking Entity Manager")
With `fork()` method you can simply get clean entity manager with its own context and identity map:
```
const em = orm.em.fork();  
```
## Global Identity Map[​](https://mikro-orm.io/docs/next/identity-map#global-identity-map "Direct link to Global Identity Map")
It is no longer possible to use the global identity map. This was a common issue that led to weird bugs, as using the global EM without request context is almost always wrong, you always need to have a dedicated context for each request, so they do not interfere.
You can still disable this check via `allowGlobalContext` configuration, or a connected environment variable `MIKRO_ORM_ALLOW_GLOBAL_CONTEXT` - this can be handy especially in unit tests.
##  `RequestContext` helper[​](https://mikro-orm.io/docs/next/identity-map#request-context "Direct link to request-context")
If you use dependency injection container like `inversify` or the one in `nestjs` framework, it can be hard to achieve this, because you usually want to access your repositories via DI container, but it will always provide you with the same instance, rather than new one for each request.
To solve this, you can use `RequestContext` helper, that will use `node`'s [`AsyncLocalStorage`](https://nodejs.org/api/async_context.html#class-asynclocalstorage) in the background to isolate the request context. MikroORM will always use request specific (forked) entity manager if available, so all you need to do is to create new request context preferably as a middleware:
```
// `orm.em` is the global EntityManager instance  
  
app.use((req, res, next) => {  
  // calls `orm.em.fork()` and attaches it to the async context  
  RequestContext.create(orm.em, next);  
});  
  
app.get('/', async (req, res) => {  
  // uses fork from the async context automatically  
  const authors = await orm.em.find(Book, {});  
  res.json(authors);  
});  
```
You should register this middleware as the last one just before request handlers and before any of your custom middleware that is using the ORM. There might be issues when you register it before request processing middleware like `queryParser` or `bodyParser`, so definitely register the context after them.
Later on you can then access the request scoped `EntityManager` via `RequestContext.getEntityManager()`. This method is used under the hood automatically, so you should not need it.
> `RequestContext.getEntityManager()` will return `undefined` if the context was not started yet.
### How does `RequestContext` helper work?[​](https://mikro-orm.io/docs/next/identity-map#how-does-requestcontext-helper-work "Direct link to how-does-requestcontext-helper-work")
Internally all `EntityManager` methods that work with the Identity Map (e.g. `em.find()` or `em.getReference()`) first call `em.getContext()` to access the contextual fork. This method will first check if you are running inside `RequestContext` handler and prefer the `EntityManager` fork from it.
```
// we call em.find() on the global EM instance  
const res = await orm.em.find(Book, {});  
  
// but under the hood this resolves to  
const res = await orm.em.getContext().find(Book, {});  
  
// which then resolves to  
const res = await RequestContext.getEntityManager().find(Book, {});  
```
The `RequestContext.getEntityManager()` method then checks `AsyncLocalStorage` static instance we use for creating new EM forks in the `RequestContext.create()` method.
> The context resolution works only on the global `EntityManager` instance, so if you use `em.fork()` directly, you will not get the request scoped `EntityManager` automatically unless you pass the `useContext: true` option to it.
> 
```
> 
// `em` will respect the async context  
> 
> 
> 
const em = orm.em.fork({ useContext: true });  
> 
> 
```
The [`AsyncLocalStorage`](https://nodejs.org/api/async_context.html#class-asynclocalstorage) class from Node.js core is the magician here. It allows you to track the context throughout the async calls. It allows you to decouple the `EntityManager` fork creation (usually in a middleware as shown in previous section) from its usage through the global `EntityManager` instance.
### Using custom `AsyncLocalStorage` instance[​](https://mikro-orm.io/docs/next/identity-map#using-custom-asynclocalstorage-instance "Direct link to using-custom-asynclocalstorage-instance")
The `RequestContext` helper holds its own `AsyncLocalStorage` instance, which the ORM checks automatically when resolving `em.getContext()`. If you want to bring your own, you can do so by using the `context` option:
```
const storage = new AsyncLocalStorage<EntityManager>();  
  
const orm = await MikroORM.init({  
  context: () => storage.getStore(),  
  // ...  
});  
  
app.use((req, res, next) => {  
  storage.run(orm.em.fork({ useContext: true }), next);  
});  
```
##  `@CreateRequestContext()` decorator[​](https://mikro-orm.io/docs/next/identity-map#createrequestcontext-decorator "Direct link to createrequestcontext-decorator")
> Before v6, `@CreateRequestContext()` was called `@UseRequestContext()`.
Middlewares are executed only for regular HTTP request handlers, what if you need a request scoped method outside of that? One example of that is queue handlers or scheduled tasks (e.g. CRON jobs).
In those cases, you can use the `@CreateRequestContext()` decorator. It requires you to first inject the `MikroORM` instance (or an `EntityManager` or some `EntityRepository`) to current context, it will then be used to create a new context for you. Under the hood, the decorator will register the new request context for your method and execute it inside the context (via `RequestContext.create()`).
> `@CreateRequestContext()` should be used only on the top level methods. It should not be nested - a method decorated with it should not call another method that is also decorated with it.
```
export class MyService {  
  
  // or `private readonly em: EntityManager`  
  constructor(private readonly orm: MikroORM) { }  
  
  @CreateRequestContext()  
  async doSomething() {  
    // this will be executed in a separate context  
  }  
  
}  
```
Alternatively you can provide a callback that will return one of `MikroORM`, `EntityManager` or `EntityRepository` instance.
```
import { DI } from '..';  
  
export class MyService {  
  
  @CreateRequestContext(() => DI.em)  
  async doSomething() {  
    // this will be executed in a separate context  
  }  
  
}  
```
The callback will receive current `this` in the first parameter. You can use it to link the `EntityManager` or `EntityRepository` too:
```
export class MyService {  
  
  constructor(private readonly userRepository: EntityRepository<User>) { }  
  
  @CreateRequestContext<MyService>(t => t.userRepository)  
  async doSomething() {  
    // this will be executed in a separate context  
  }  
  
}  
```
##  `@EnsureRequestContext()` decorator[​](https://mikro-orm.io/docs/next/identity-map#ensurerequestcontext-decorator "Direct link to ensurerequestcontext-decorator")
Sometimes you may prefer to just ensure the method is executed inside a request context, and reuse the existing context if available. You can use the `@EnsureRequestContext()` decorator here, it behaves exactly like the `@CreateRequestContext`, but only creates new context if necessary, reusing the existing one if possible.
##  `@Transactional()` decorator[​](https://mikro-orm.io/docs/next/identity-map#transactional-decorator "Direct link to transactional-decorator")
If you want to ensure that the method runs within a transaction scope, use `@Transactional()` decorator.
You can provide the same callback that can be used in the `@CreateRequestContext()` decorator via the `context` option, allowing you to handle the injection of the EntityManager in non-standard scenarios. The function is executed within a new transaction context, and upon completion, flush and commit are automatically executed. This decorator can also be used in a nested manner.
For more details about transactions, check the [Transactions section](https://mikro-orm.io/docs/next/transactions).
## Why is Request Context needed?[​](https://mikro-orm.io/docs/next/identity-map#why-is-request-context-needed "Direct link to Why is Request Context needed?")
Imagine you will use a single Identity Map throughout your application. It will be shared across all request handlers, that can possibly run in parallel.
### Problem 1 - growing memory footprint[​](https://mikro-orm.io/docs/next/identity-map#problem-1---growing-memory-footprint "Direct link to Problem 1 - growing memory footprint")
As there would be only one shared Identity Map, you can't just clear it after your request ends. There can be another request working with it so clearing the Identity Map from one request could break other requests running in parallel. This will result in growing memory footprint, as every entity that became managed at some point in time would be kept in the Identity Map.
### Problem 2 - unstable response of API endpoints[​](https://mikro-orm.io/docs/next/identity-map#problem-2---unstable-response-of-api-endpoints "Direct link to Problem 2 - unstable response of API endpoints")
Every entity has `toJSON()` method, that automatically converts it to serialized form. If you have only one shared Identity Map, the following situation may occur:
Let's say there are 2 endpoints
  1. `GET /book/:id` that returns just the book, without populating anything
  2. `GET /book-with-author/:id` that returns the book and its author populated
Now when someone requests same book via both of those endpoints, we could end up with both returning the same output:
  1. `GET /book/1` returns `Book` without populating its property `author` property
  2. `GET /book-with-author/1` returns `Book`, this time with `author` populated
  3. `GET /book/1` returns `Book`, but this time also with `author` populated
This happens because the information about entity association being populated is stored in the Identity Map.
[](https://github.com/mikro-orm/mikro-orm/edit/master/docs/docs/identity-map.md)
Last updated on **Jan 31, 2026** by **Martin Adámek**
[Previous Unit of Work](https://mikro-orm.io/docs/next/unit-of-work)[Next Transactions and Concurrency](https://mikro-orm.io/docs/next/transactions)
  * [What is an "Identity Map"](https://mikro-orm.io/docs/next/identity-map#what-is-an-identity-map)
  * [Forking Entity Manager](https://mikro-orm.io/docs/next/identity-map#forking-entity-manager)
  * [Global Identity Map](https://mikro-orm.io/docs/next/identity-map#global-identity-map)
  * [`RequestContext` helper](https://mikro-orm.io/docs/next/identity-map#request-context)
    * [How does `RequestContext` helper work?](https://mikro-orm.io/docs/next/identity-map#how-does-requestcontext-helper-work)
    * [Using custom `AsyncLocalStorage` instance](https://mikro-orm.io/docs/next/identity-map#using-custom-asynclocalstorage-instance)
  * [`@CreateRequestContext()` decorator](https://mikro-orm.io/docs/next/identity-map#createrequestcontext-decorator)
  * [`@EnsureRequestContext()` decorator](https://mikro-orm.io/docs/next/identity-map#ensurerequestcontext-decorator)
  * [`@Transactional()` decorator](https://mikro-orm.io/docs/next/identity-map#transactional-decorator)
  * [Why is Request Context needed?](https://mikro-orm.io/docs/next/identity-map#why-is-request-context-needed)
    * [Problem 1 - growing memory footprint](https://mikro-orm.io/docs/next/identity-map#problem-1---growing-memory-footprint)
    * [Problem 2 - unstable response of API endpoints](https://mikro-orm.io/docs/next/identity-map#problem-2---unstable-response-of-api-endpoints)
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
# https://mikro-orm.io/docs/next/defining-entities
============================================================
[Skip to main content](https://mikro-orm.io/docs/next/defining-entities#__docusaurus_skipToContent_fallback)
⭐️ If you like MikroORM, give it a star on [GitHub](https://github.com/mikro-orm/mikro-orm) and consider [sponsoring](https://github.com/sponsors/mikro-orm) its development! ⭐️
[ ![MikroORM](https://mikro-orm.io/img/logo.svg)![MikroORM](https://mikro-orm.io/img/logo-dark.svg) ](https://mikro-orm.io/)
[Next](https://mikro-orm.io/docs/next/defining-entities)
  * [Next](https://mikro-orm.io/docs/next/defining-entities)
  * [7.1](https://mikro-orm.io/docs/defining-entities)
  * [7.0](https://mikro-orm.io/docs/7.0/defining-entities)
  * [6.6](https://mikro-orm.io/docs/6.6/defining-entities)
  * [5.9](https://mikro-orm.io/docs/5.9/defining-entities)
[Docs](https://mikro-orm.io/docs/quick-start)[API](https://mikro-orm.io/api)[Blog](https://mikro-orm.io/blog)[Changelog](https://mikro-orm.io/changelog)
[latest: v7.1.3](https://mikro-orm.io/versions)[Discord](https://discord.gg/w8bjxFHS7X "Chat on Discord")[GitHub](https://github.com/mikro-orm/mikro-orm "View on GitHub")[Twitter](https://twitter.com/MikroORM "Twitter")
Search
  * [Quick Start](https://mikro-orm.io/docs/next/quick-start)
  * [Getting Started](https://mikro-orm.io/docs/next/guide)
    * [Chapter 1: First Entity](https://mikro-orm.io/docs/next/guide/first-entity)
    * [Chapter 2: Relationships](https://mikro-orm.io/docs/next/guide/relationships)
    * [Chapter 3: Project Setup](https://mikro-orm.io/docs/next/guide/project-setup)
    * [Chapter 4: Advanced](https://mikro-orm.io/docs/next/guide/advanced)
    * [Chapter 5: Type-safety](https://mikro-orm.io/docs/next/guide/type-safety)
  * [Core Concepts](https://mikro-orm.io/docs/next/core-concepts)
  * [Modeling](https://mikro-orm.io/docs/next/modeling)
    * [Defining Entities](https://mikro-orm.io/docs/next/defining-entities)
    * [Modeling Entity Relationships](https://mikro-orm.io/docs/next/relationships)
    * [Type-Safe Relations](https://mikro-orm.io/docs/next/type-safe-relations)
    * [Inheritance Mapping](https://mikro-orm.io/docs/next/inheritance-mapping)
    * [Indexes and Unique Constraints](https://mikro-orm.io/docs/next/indexes)
    * [Embeddables](https://mikro-orm.io/docs/next/embeddables)
    * [Composite Primary Keys](https://mikro-orm.io/docs/next/composite-keys)
    * [JSON Properties](https://mikro-orm.io/docs/next/json-properties)
    * [Custom Types](https://mikro-orm.io/docs/next/custom-types)
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
For up-to-date documentation, see the **[latest version](https://mikro-orm.io/docs/defining-entities)** (7.1).
  * [](https://mikro-orm.io/)
  * [Modeling](https://mikro-orm.io/docs/next/modeling)
Version: Next
On this page
# Defining Entities
Entities are simple javascript objects (so called POJO) without restrictions and without the need to extend base classes. Using [entity constructors](https://mikro-orm.io/docs/next/entity-constructors) works as well - they are never executed for managed entities (loaded from database). Every entity is required to have a primary key.
Entities can be defined in two ways:
  * **`defineEntity`helper** - Define entities programmatically with full TypeScript type inference. You can use it with a class (recommended) or without one. Read more about this in the [`defineEntity` section](https://mikro-orm.io/docs/next/define-entity).
  * **Decorated classes** - the attributes of the entity, as well as each property are provided via decorators. You use `@Entity()` decorator on the class. Entity properties are decorated either with `@Property` decorator, or with one of reference decorators: `@ManyToOne`, `@OneToMany`, `@OneToOne` and `@ManyToMany`. Check out the full [decorator reference](https://mikro-orm.io/docs/next/decorators).
Moreover, how the metadata extraction from decorators happens is controlled via `MetadataProvider`. Three main metadata providers are:
  * `MetadataProvider` - default provider that only enforces the types are provided explicitly.
  * `ReflectMetadataProvider` - uses `reflect-metadata` to read the property types. Faster but simpler and more verbose.
  * `TsMorphMetadataProvider` - uses `ts-morph` to read the type information from the TypeScript compiled API. Heavier (requires full TS as a dependency), but allows DRY entity definition. With `ts-morph` you are able to extract the type as it is defined in the code, including interface names, as well as optionality of properties.
Read more about them in the [Metadata Providers section](https://mikro-orm.io/docs/next/metadata-providers). For a comprehensive guide on using decorators (including the new ES spec decorators in v7), see the [Using Decorators guide](https://mikro-orm.io/docs/next/using-decorators). For glob-based entity discovery, see [Folder-based Discovery](https://mikro-orm.io/docs/next/folder-based-discovery).
> Current set of decorators in MikroORM is designed to work with the `tsc`. Using `babel` and `swc` is also possible, but requires some additional setup. Read more about it [here](https://mikro-orm.io/docs/next/usage-with-transpilers). For notes about `webpack`, read the [deployment section](https://mikro-orm.io/docs/next/deployment).
> `ts-morph` is compatible only with the `tsc` approach.
Example definition of a `Book` entity follows. You can switch the tabs to see the difference for various ways:
  * defineEntity + class
  * defineEntity
  * reflect-metadata
  * ts-morph
./entities/Book.ts
```
import { defineEntity, p } from '@mikro-orm/core';  
  
const BookSchema = defineEntity({  
  name: 'Book',  
  extends: CustomBaseEntity,  
  properties: {  
    title: p.string(),  
    author: () => p.manyToOne(Author),  
    publisher: () => p.manyToOne(Publisher)  
      .ref()  
      .nullable(),  
    tags: () => p.manyToMany(BookTag)  
      .fixedOrder(),  
  },  
});  
  
export class Book extends BookSchema.class {}  
BookSchema.setClass(Book);  
```
./entities/Book.ts
```
import { type InferEntity, defineEntity, p } from '@mikro-orm/core';  
  
export const Book = defineEntity({  
  name: 'Book',  
  extends: CustomBaseEntity,  
  properties: {  
    title: p.string(),  
    author: () => p.manyToOne(Author),  
    publisher: () => p.manyToOne(Publisher)  
      .ref()  
      .nullable(),  
    tags: () => p.manyToMany(BookTag)  
      .fixedOrder(),  
  },  
});  
  
export type IBook = InferEntity<typeof Book>;  
```
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
  
  @ManyToMany(() => BookTag, { fixedOrder: true })  
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
> Including `{ ref: true }` in your `Ref` property definitions will wrap the reference, providing access to helper methods like `.load` and `.unwrap`, which can be helpful for loading data and changing the type of your references where you plan to use them.
> For a type-only alternative that keeps the runtime value as a plain entity (no `Reference` wrapper, no `.$` indirection) while still restricting access until `Loaded<>` narrows it, declare the property as `LazyRef<T>` instead. See [Type-safe Relations → `LazyRef<T>`](https://mikro-orm.io/docs/next/type-safe-relations#lazyreft--type-only-reference).
Here is another example of `Author` entity, that was referenced from the `Book` one, this time defined for mongo:
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
    _id: p.type(ObjectId).primary(),  
    id: p.string().serializedPrimaryKey(),  
    createdAt: p.datetime().onCreate(() => new Date()),  
    updatedAt: p.datetime()  
      .onCreate(() => new Date())  
      .onUpdate(() => new Date()),  
    name: p.string(),  
    email: p.string(),  
    age: p.integer().nullable(),  
    termsAccepted: p.boolean(),  
    identities: p.array().nullable(),  
    born: p.date().nullable(),  
    books: () => p.oneToMany(Book).mappedBy(book => book.author),  
    friends: () => p.manyToMany(Author),  
    favouriteBook: () => p.manyToOne(Book).nullable(),  
    version: p.integer().version(),  
  },  
});  
  
export class Author extends AuthorSchema.class {}  
AuthorSchema.setClass(Author);  
```
./entities/Author.ts
```
import { type InferEntity, defineEntity, p } from '@mikro-orm/core';  
  
export const Author = defineEntity({  
  name: 'Author',  
  properties: {  
    _id: p.type(ObjectId).primary(),  
    id: p.string().serializedPrimaryKey(),  
    createdAt: p.datetime().onCreate(() => new Date()),  
    updatedAt: p.datetime()  
      .onCreate(() => new Date())  
      .onUpdate(() => new Date()),  
    name: p.string(),  
    email: p.string(),  
    age: p.integer().nullable(),  
    termsAccepted: p.boolean(),  
    identities: p.array().nullable(),  
    born: p.date().nullable(),  
    books: () => p.oneToMany(Book).mappedBy(book => book.author),  
    friends: () => p.manyToMany(Author),  
    favouriteBook: () => p.manyToOne(Book).nullable(),  
    version: p.integer().version(),  
  },  
});  
  
export type IAuthor = InferEntity<typeof Author>;  
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
  
  @Property({ nullable: true })  
  age?: number;  
  
  @Property()  
  termsAccepted: boolean = false;  
  
  @Property({ nullable: true })  
  identities?: string[];  
  
  @Property({ nullable: true })  
  born?: string;  
  
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
  born?: string;  
  
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
More information about modelling relationships can be found on [modelling relationships page](https://mikro-orm.io/docs/next/relationships).
For an example of Vanilla JavaScript usage, take a look [here](https://mikro-orm.io/docs/next/usage-with-js).
## Optional Properties[​](https://mikro-orm.io/docs/next/defining-entities#optional-properties "Direct link to Optional Properties")
With the default `reflect-metadata` provider, you need to mark each optional property as `nullable: true`. When using `ts-morph`, if you define the property as optional (marked with `?`), this will be automatically considered as nullable property (mainly for SQL schema generator).
  * defineEntity + class
  * defineEntity
  * reflect-metadata
  * ts-morph
./entities/Author.ts
```
const SomeEntitySchema = defineEntity({  
  name: 'SomeEntity',  
  properties: {  
    favouriteBook: p.manyToOne(Book).nullable(),  
  },  
});  
  
export class SomeEntity extends SomeEntitySchema.class {}  
SomeEntitySchema.setClass(SomeEntity);  
```
./entities/Author.ts
```
const SomeEntity = defineEntity({  
  name: 'SomeEntity',  
  properties: {  
    favouriteBook: p.manyToOne(Book).nullable(),  
  },  
});  
  
export type ISomeEntity = InferEntity<typeof SomeEntity>;  
```
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
To make a nullable field required in methods like `em.create()` (i.e. you cannot omit the property), use `RequiredNullable` type. Such property needs to be provided explicitly in the `em.create()` method, but will accept a `null` value.
  * defineEntity + class
  * defineEntity
  * reflect-metadata
  * ts-morph
./entities/Book.ts
```
const BookSchema = defineEntity({  
  name: 'Book',  
  properties: {  
    title: p.string().$type<RequiredNullable<string>>(),  
  },  
});  
  
em.create(Book, { title: "Alice in Wonderland" }); // ok  
em.create(Book, { title: null }); // ok  
em.create(Book, {}); // compile error: missing title  
```
./entities/Book.ts
```
const Book = defineEntity({  
  name: 'Book',  
  properties: {  
    title: p.string().$type<RequiredNullable<string>>(),  
  },  
});  
  
em.create(Book, { title: "Alice in Wonderland" }); // ok  
em.create(Book, { title: null }); // ok  
em.create(Book, {}); // compile error: missing title  
```
./entities/Book.ts
```
class Book {  
  @Property()  
  title!: RequiredNullable<string>;  
}  
  
em.create(Book, { title: "Alice in Wonderland" }); // ok  
em.create(Book, { title: null }); // ok  
em.create(Book, {}); // compile error: missing title  
```
./entities/Book.ts
```
class Book {  
  @Property()  
  title!: RequiredNullable<string>;  
}  
  
em.create(Book, { title: "Alice in Wonderland" }); // ok  
em.create(Book, { title: null }); // ok  
em.create(Book, {}); // compile error: missing title  
```
## Default values[​](https://mikro-orm.io/docs/next/defining-entities#default-values "Direct link to Default values")
You can set default value of a property in 2 ways:
  1. Use a property initializer. This approach should be preferred as long as you are not using any native database function like `now()`. With this approach your entities will have the default value set even before it is actually persisted into the database (e.g. when you instantiate new entity via `new Author()` or `em.create(Author, { ... })`).
> This is only possible if you have an actual entity class, not an interface. If you use `defineEntity` without a class, you can use the `onCreate` option to set the default value.
  * defineEntity + class
  * defineEntity
  * reflect-metadata
  * ts-morph
./entities/Author.ts
```
const SomeEntitySchema = defineEntity({  
  name: 'SomeEntity',  
  properties: {  
    foo: p.integer().onCreate(() => 1),  
    bar: p.string().onCreate(() => 'abc'),  
    baz: p.datetime().onCreate(() => new Date()),  
  },  
});  
  
export class SomeEntity extends SomeEntitySchema.class {}  
SomeEntitySchema.setClass(SomeEntity);  
```
./entities/Author.ts
```
const SomeEntity = defineEntity({  
  name: 'SomeEntity',  
  properties: {  
    foo: p.integer().onCreate(() => 1),  
    bar: p.string().onCreate(() => 'abc'),  
    baz: p.datetime().onCreate(() => new Date()),  
  },  
});  
```
./entities/Author.ts
```
@Property()  
foo: number & Opt = 1;  
  
@Property()  
bar: string & Opt = 'abc';  
  
@Property()  
baz: Date & Opt = new Date();  
```
./entities/Author.ts
```
@Property()  
foo: number & Opt = 1;  
  
@Property()  
bar: string & Opt = 'abc';  
  
@Property()  
baz: Date & Opt = new Date();  
```
  1. Use `default` parameter of `@Property` decorator. This way the actual default value will be provided by the database, and automatically mapped to the entity property after it is being persisted (after flush). To use SQL functions like `now()`, use `defaultRaw`.
> Use `defaultRaw` for SQL functions, as `default` with string values will be automatically quoted.
  * defineEntity + class
  * defineEntity
  * reflect-metadata
  * ts-morph
./entities/Author.ts
```
const SomeEntitySchema = defineEntity({  
  name: 'SomeEntity',  
  properties: {  
    foo: p.integer().default(1),  
    bar: p.string().default('abc'),  
    baz: p.datetime().defaultRaw('now'),  
  },  
});  
  
export class SomeEntity extends SomeEntitySchema.class {}  
SomeEntitySchema.setClass(SomeEntity);  
```
./entities/Author.ts
```
const SomeEntity = defineEntity({  
  name: 'SomeEntity',  
  properties: {  
    foo: p.integer().default(1),  
    bar: p.string().default('abc'),  
    baz: p.datetime().defaultRaw('now'),  
  },  
});  
```
./entities/Author.ts
```
@Property({ default: 1 })  
foo!: number & Opt;  
  
@Property({ default: 'abc' })  
bar!: string & Opt;  
  
@Property({ defaultRaw: 'now' })  
baz!: Date & Opt;  
```
./entities/Author.ts
```
@Property({ default: 1 })  
foo!: number & Opt;  
  
@Property({ default: 'abc' })  
bar!: string & Opt;  
  
@Property({ defaultRaw: 'now' })  
baz!: Date & Opt;  
```
Note that the `Opt` type is used to intersect with the property type to tell the ORM (on type level) that the property should be considered optional for input types (e.g. in `em.create()`), but will be present for managed entities (e.g. `EntityDTO` type).
## Enums[​](https://mikro-orm.io/docs/next/defining-entities#enums "Direct link to Enums")
To define an enum property, use `@Enum()` decorator. Enums can be either numeric or string values.
For schema generator to work properly in case of string enums, you need to define the enum in the same file as where it is used, so its values can be automatically discovered. If you want to define the enum in another file, you should re-export it also in place where you use it.
You can also provide the reference to the enum implementation in the decorator via `@Enum(() => UserRole)`, or pass the enum object directly via `@Enum({ items: UserRole })` — the callback form is only needed when the enum is declared after the class it's used in.
> You can also set enum items manually via `items: string[]` attribute.
  * defineEntity + class
  * defineEntity
  * reflect-metadata
  * ts-morph
./entities/User.ts
```
const SomeEntitySchema = defineEntity({  
  name: 'SomeEntity',  
  properties: {  
    // string enum  
    role: p.enum(['admin', 'user']),  
    // numeric enum  
    status: p.enum(() => UserStatus),  
    // string enum defined outside of this file  
    outside: p.enum(() => OutsideEnum),  
    // string enum defined outside of this file, may be null  
    outsideNullable: p.enum(() => OutsideNullableEnum).nullable(),  
  },  
});  
  
export class SomeEntity extends SomeEntitySchema.class {}  
SomeEntitySchema.setClass(SomeEntity);  
```
./entities/User.ts
```
const SomeEntity = defineEntity({  
  name: 'SomeEntity',  
  properties: {  
    // string enum  
    role: p.enum(['admin', 'user']),  
    // numeric enum  
    status: p.enum(() => UserStatus),  
    // string enum defined outside of this file  
    outside: p.enum(() => OutsideEnum),  
    // string enum defined outside of this file, may be null  
    outsideNullable: p.enum(() => OutsideNullableEnum).nullable(),  
  },  
});  
```
./entities/User.ts
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
  
// or you could reexport OutsideEnum  
// export { OutsideEnum } from './OutsideEnum.ts';  
```
./entities/User.ts
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
  
// or you could reexport OutsideEnum  
// export { OutsideEnum } from './OutsideEnum.ts';  
```
### PostgreSQL native enums[​](https://mikro-orm.io/docs/next/defining-entities#postgresql-native-enums "Direct link to PostgreSQL native enums")
By default, the PostgreSQL driver, represents enums as a text columns with check constraints. Since v6, you can opt in for a native enums by setting the `nativeEnumName` option.
  * defineEntity + class
  * defineEntity
  * reflect-metadata
  * ts-morph
./entities/User.ts
```
export enum UserRole {  
  ADMIN = 'admin',  
  MODERATOR = 'moderator',  
  USER = 'user',  
}  
  
const SomeEntitySchema = defineEntity({  
  name: 'SomeEntity',  
  properties: {  
    role: p.enum(() => UserRole).nativeEnumName('user_role'),  
  },  
});  
  
export class SomeEntity extends SomeEntitySchema.class {}  
SomeEntitySchema.setClass(SomeEntity);  
```
./entities/User.ts
```
export enum UserRole {  
  ADMIN = 'admin',  
  MODERATOR = 'moderator',  
  USER = 'user',  
}  
  
export const SomeEntity = defineEntity({  
  name: 'SomeEntity',  
  properties: {  
    role: p.enum(() => UserRole).nativeEnumName('user_role'),  
  },  
});  
```
./entities/User.ts
```
@Entity()  
export class User {  
  
  @Enum({ items: () => UserRole, nativeEnumName: 'user_role' })  
  role!: UserRole;  
  
}  
  
export enum UserRole {  
  ADMIN = 'admin',  
  MODERATOR = 'moderator',  
  USER = 'user',  
}  
```
./entities/User.ts
```
@Entity()  
export class User {  
  
  @Enum({ items: () => UserRole, nativeEnumName: 'user_role' })  
  role!: UserRole;  
  
}  
  
export enum UserRole {  
  ADMIN = 'admin',  
  MODERATOR = 'moderator',  
  USER = 'user',  
}  
```
## Enum arrays[​](https://mikro-orm.io/docs/next/defining-entities#enum-arrays "Direct link to Enum arrays")
You can also use array of values for enum, in that case, `EnumArrayType` type will be used automatically, that will validate items on flush.
  * defineEntity + class
  * defineEntity
  * reflect-metadata
  * ts-morph
./entities/User.ts
```
enum Role {  
  User = 'user',  
  Admin = 'admin',  
}  
  
const SomeEntitySchema = defineEntity({  
  name: 'SomeEntity',  
  properties: {  
    roles: p.enum(() => Role).array().default([Role.User]),  
  },  
});  
  
export class SomeEntity extends SomeEntitySchema.class {}  
SomeEntitySchema.setClass(SomeEntity);  
```
./entities/User.ts
```
enum Role {  
  User = 'user',  
  Admin = 'admin',  
}  
  
export const SomeEntity = defineEntity({  
  name: 'SomeEntity',  
  properties: {  
    roles: p.enum(() => Role).array().default([Role.User]),  
  },  
});  
```
./entities/User.ts
```
enum Role {  
  User = 'user',  
  Admin = 'admin',  
}  
  
@Enum({ items: () => Role, array: true, default: [Role.User] })  
roles = [Role.User];  
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
## Mapping directly to primary keys[​](https://mikro-orm.io/docs/next/defining-entities#mapping-directly-to-primary-keys "Direct link to Mapping directly to primary keys")
Sometimes you might want to work only with the primary key of a relation. To do that, you can use `mapToPk` option on M:1 and 1:1 relations:
  * defineEntity + class
  * defineEntity
  * reflect-metadata
  * ts-morph
./entities/User.ts
```
const SomeEntitySchema = defineEntity({  
  name: 'SomeEntity',  
  properties: {  
    user: () => p.manyToOne(User).mapToPk(),  
  },  
});  
  
export class SomeEntity extends SomeEntitySchema.class {}  
SomeEntitySchema.setClass(SomeEntity);  
```
./entities/User.ts
```
export const SomeEntity = defineEntity({  
  name: 'SomeEntity',  
  properties: {  
    user: () => p.manyToOne(User).mapToPk(),  
  },  
});  
```
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
For composite keys, this will give us ordered tuple representing the raw PKs, which is the internal format of composite PK:
  * defineEntity + class
  * defineEntity
  * reflect-metadata
  * ts-morph
./entities/User.ts
```
const SomeEntitySchema = defineEntity({  
  name: 'SomeEntity',  
  properties: {  
    user: () => p.manyToOne(User).mapToPk(),  
  },  
});  
  
export class SomeEntity extends SomeEntitySchema.class {}  
SomeEntitySchema.setClass(SomeEntity);  
```
./entities/User.ts
```
export const SomeEntity = defineEntity({  
  name: 'SomeEntity',  
  properties: {  
    user: () => p.manyToOne(User).mapToPk(),  
  },  
});  
```
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
## Formulas[​](https://mikro-orm.io/docs/next/defining-entities#formulas "Direct link to Formulas")
`@Formula()` decorator can be used to map some SQL snippet to your entity. The SQL fragment can be as complex as you want and even include subselects.
  * defineEntity + class
  * defineEntity
  * reflect-metadata
  * ts-morph
./entities/Box.ts
```
const BoxSchema = defineEntity({  
  name: 'Box',  
  properties: {  
    objectVolume: p.integer().formula('obj_length * obj_height * obj_width'),  
  },  
});  
  
export class Box extends BoxSchema.class {}  
BoxSchema.setClass(Box);  
```
./entities/Box.ts
```
export const Box = defineEntity({  
  name: 'Box',  
  properties: {  
    objectVolume: p.integer().formula('obj_length * obj_height * obj_width'),  
  },  
});  
```
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
Formulas will be added to the select clause automatically. You can define the formula as a callback that receives a `columns` object mapping property names to their unquoted column references (e.g., `alias.field_name`). Use the `quote` helper for proper identifier quoting across all database platforms:
  * defineEntity + class
  * defineEntity
  * reflect-metadata
  * ts-morph
./entities/Box.ts
```
import { quote } from '@mikro-orm/core';  
  
const BoxSchema = defineEntity({  
  name: 'Box',  
  properties: {  
    objectVolume: p.integer().formula(cols => quote`${cols.objLength} * ${cols.objHeight} * ${cols.objWidth}`),  
  },  
});  
  
export class Box extends BoxSchema.class {}  
BoxSchema.setClass(Box);  
```
./entities/Box.ts
```
import { quote } from '@mikro-orm/core';  
  
export const Box = defineEntity({  
  name: 'Box',  
  properties: {  
    objectVolume: p.integer().formula(cols => quote`${cols.objLength} * ${cols.objHeight} * ${cols.objWidth}`),  
  },  
});  
```
./entities/Box.ts
```
import { quote } from '@mikro-orm/core';  
  
@Formula(cols => quote`${cols.objLength} * ${cols.objHeight} * ${cols.objWidth}`)  
objectVolume?: number;  
```
./entities/Box.ts
```
import { quote } from '@mikro-orm/core';  
  
@Formula(cols => quote`${cols.objLength} * ${cols.objHeight} * ${cols.objWidth}`)  
objectVolume?: number;  
```
The `columns` object:
  * Maps property names to fully-qualified `alias.field_name` references
  * Works correctly with TPT (Table-Per-Type) inheritance - inherited properties automatically use the parent table's alias
  * Has `toString()` returning the table alias for backwards compatibility
For more complex scenarios, you can use an enhanced callback signature that provides access to table metadata:
```
@Formula((cols, table) => {  
  return `(select count(*) from other_table where other_table.ref_id = ${table.qualifiedName}.${cols.id})`;  
})  
relatedCount?: number;  
```
The `table` parameter provides:
  * `alias`: The quoted table alias
  * `name`: The table name
  * `schema`: The schema name (if applicable)
  * `qualifiedName`: The schema-qualified table name (`schema.table` or just `table`)
  * `toString()`: Returns the alias for convenience in template literals
## Indexes[​](https://mikro-orm.io/docs/next/defining-entities#indexes "Direct link to Indexes")
You can define indexes via `@Index()` decorator, for unique indexes, you can use `@Unique()` decorator. You can use it either on entity class, or on entity property.
For advanced index features including column sort order, NULLS ordering, prefix length, covering indexes (INCLUDE), fill factor, invisible indexes, clustered indexes, and database-specific options, see the dedicated [Indexes and Unique Constraints](https://mikro-orm.io/docs/next/indexes) guide.
To define complex indexes, you can use index expressions. They allow you to specify the final `create index` query and an index name - this name is then used for index diffing, so the schema generator will only try to create it if it's not there yet, or remove it, if it's no longer defined in the entity. Index expressions are not bound to any property, rather to the entity itself (you can still define them on both entity and property level).
To define an index expression, you can either provide a raw SQL string, or use the expression callback to dynamically build the returned SQL.
  * defineEntity + class
  * defineEntity
  * reflect-metadata
  * ts-morph
./entities/Author.ts
```
const AuthorSchema = defineEntity({  
  name: 'Author',  
  properties: {  
    email: p.string().unique(),  
    age: p.integer().nullable().index(),  
    born: p.date().nullable().index('born_index'),  
    title: p.string(),  
    country: p.string(),  
  },  
  indexes: [  
    { properties: ['name', 'age'] }, // compound index, with generated name  
    { name: 'custom_idx_name', properties: ['name'] }, // simple index, with custom name  
    // Custom index using expression callback  
    // ${table.schema}, ${table.name}, and ${columns.title} return the unquoted identifiers.  
    { name: 'custom_index_country1', expression: (columns, table, indexName) => `create index \`${indexName}\` on \`${table.schema}\`.\`${table.name}\` (\`${columns.country}\`)` },  
    // Using quote helper to automatically quote identifiers.  
    { name: 'custom_index_country2', expression: (columns, table, indexName) => quote`create index ${indexName} on ${table} (${columns.country})` },  
    // Using raw function to automatically quote identifiers.  
    { name: 'custom_index_country3', expression: (columns, table, indexName) => raw(`create index ?? on ?? (??)`, [indexName, table, columns.country]) },  
  ],  
  uniques: [  
    { properties: ['name', 'email'] },  
  ],  
});  
  
export class Author extends AuthorSchema.class {}  
AuthorSchema.setClass(Author);  
```
./entities/Author.ts
```
export const Author = defineEntity({  
  name: 'Author',  
  properties: {  
    email: p.string().unique(),  
    age: p.integer().nullable().index(),  
    born: p.date().nullable().index('born_index'),  
    title: p.string(),  
    country: p.string(),  
  },  
  indexes: [  
    { properties: ['name', 'age'] }, // compound index, with generated name  
    { name: 'custom_idx_name', properties: ['name'] }, // simple index, with custom name  
    // Custom index using expression callback  
    // ${table.schema}, ${table.name}, and ${columns.title} return the unquoted identifiers.  
    { name: 'custom_index_country1', expression: (columns, table, indexName) => `create index \`${indexName}\` on \`${table.schema}\`.\`${table.name}\` (\`${columns.country}\`)` },  
    // Using quote helper to automatically quote identifiers.  
    { name: 'custom_index_country2', expression: (columns, table, indexName) => quote`create index ${indexName} on ${table} (${columns.country})` },  
    // Using raw function to automatically quote identifiers.  
    { name: 'custom_index_country3', expression: (columns, table, indexName) => raw(`create index ?? on ?? (??)`, [indexName, table, columns.country]) },  
  ],  
  uniques: [  
    { properties: ['name', 'email'] },  
  ],  
});  
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
  born?: string;  
  
  // Custom index using raw SQL string expression  
  @Index({ name: 'custom_index_expr', expression: 'alter table `author` add index `custom_index_expr`(`title`)' })  
  @Property()  
  title!: string;  
  
  // Custom index using expression callback  
  // ${table.schema}, ${table.name}, and ${columns.title} return the unquoted identifiers.  
  @Index({ name: 'custom_index_country1', expression: (columns, table, indexName) => `create index \`${indexName}\` on \`${table.schema}\`.\`${table.name}\` (\`${columns.country}\`)` })  
  // Using quote helper to automatically quote identifiers.  
  @Index({ name: 'custom_index_country2', expression: (columns, table, indexName) => quote`create index ${indexName} on ${table} (${columns.country})` })  
  // Using raw function to automatically quote identifiers.  
  @Index({ name: 'custom_index_country3', expression: (columns, table, indexName) => raw(`create index ?? on ?? (??)`, [indexName, table, columns.country]) })  
  @Property()  
  country!: string;  
  
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
  born?: string;  
  
  // Custom index using raw SQL string expression  
  @Index({ name: 'custom_index_expr', expression: 'alter table `author` add index `custom_index_expr`(`title`)' })  
  @Property()  
  title!: string;  
  
  // Custom index using expression callback  
  // ${table.schema}, ${table.name}, and ${columns.title} return the unquoted identifiers.  
  @Index({ name: 'custom_index_country1', expression: (columns, table, indexName) => `create index \`${indexName}\` on \`${table.schema}\`.\`${table.name}\` (\`${columns.country}\`)` })  
  // Using quote helper to automatically quote identifiers.  
  @Index({ name: 'custom_index_country2', expression: (columns, table, indexName) => quote`create index ${indexName} on ${table} (${columns.country})` })  
  // Using raw function to automatically quote identifiers.  
  @Index({ name: 'custom_index_country3', expression: (columns, table, indexName) => raw(`create index ?? on ?? (??)`, [indexName, table, columns.country]) })  
  @Property()  
  country!: string;  
  
}  
  
```
## Check constraints[​](https://mikro-orm.io/docs/next/defining-entities#check-constraints "Direct link to Check constraints")
You can define check constraints via `@Check()` decorator. You can use it either on entity class, or on entity property. It has a required `expression` property, that can be either a string or a callback, that receives map of property names to column names. Note that you need to use the generic type argument if you want TypeScript suggestions for the property names.
> Check constraints are currently supported only in postgres driver.
  * defineEntity + class
  * defineEntity
  * reflect-metadata
  * ts-morph
./entities/Book.ts
```
const BookSchema = defineEntity({  
  name: 'Book',  
  properties: {  
    id: p.integer().primary(),  
    price1: p.integer(),  
    price2: p.integer(),  
    price3: p.integer(),  
  },  
  checks: [  
    { expression: 'price1 >= 0' },  
    { name: 'foo', expression: columns => `${columns.price1} >= 0` },  
    { expression: columns => `${columns.price1} >= 0` },  
    { propertyName: 'price2', expression: 'price2 >= 0' },  
    { propertyName: 'price3', expression: columns => `${columns.price3} >= 0` },  
  ],  
});  
  
export class Book extends BookSchema.class {}  
BookSchema.setClass(Book);  
```
./entities/Book.ts
```
export const Book = defineEntity({  
  name: 'Book',  
  properties: {  
    id: p.integer().primary(),  
    price1: p.integer(),  
    price2: p.integer(),  
    price3: p.integer(),  
  },  
  checks: [  
    { expression: 'price1 >= 0' },  
    { name: 'foo', expression: columns => `${columns.price1} >= 0` },  
    { expression: columns => `${columns.price1} >= 0` },  
    { propertyName: 'price2', expression: 'price2 >= 0' },  
    { propertyName: 'price3', expression: columns => `${columns.price3} >= 0` },  
  ],  
});  
```
./entities/Book.ts
```
@Entity()  
// with generated name based on the table name  
@Check({ expression: 'price1 >= 0' })  
// with explicit name  
@Check({ name: 'foo', expression: (columns, table) => `${columns.price1} >= 0` })  
export class Book {  
  
  @PrimaryKey()  
  id!: number;  
  
  @Property()  
  price1!: number;  
  
  @Property()  
  @Check({ expression: 'price2 >= 0' })  
  price2!: number;  
  
  @Property({ check: (columns, table) => `${columns.price3} >= 0` })  
  price3!: number;  
  
}  
```
./entities/Book.ts
```
@Entity()  
// with generated name based on the table name  
@Check({ expression: 'price1 >= 0' })  
// with explicit name  
@Check({ name: 'foo', expression: (columns, table) => `${columns.price1} >= 0` })  
export class Book {  
  
  @PrimaryKey()  
  id!: number;  
  
  @Property()  
  price1!: number;  
  
  @Property()  
  @Check({ expression: 'price2 >= 0' })  
  price2!: number;  
  
  @Property({ check: (columns, table) => `${columns.price3} >= 0` })  
  price3!: number;  
  
}  
```
### Exclusion constraints (PostgreSQL)[​](https://mikro-orm.io/docs/next/defining-entities#exclusion-constraints-postgresql "Direct link to Exclusion constraints \(PostgreSQL\)")
PostgreSQL's [`EXCLUDE`](https://www.postgresql.org/docs/current/ddl-constraints.html#DDL-CONSTRAINTS-EXCLUSION) constraints share the same lifecycle as `CHECK` (table-level constraint, dropped via `ALTER TABLE … DROP CONSTRAINT`), so `@Check()` accepts a full constraint body as the `expression` and emits it verbatim when it starts with `EXCLUDE`:
```
@Entity()  
@Check({  
  name: 'room_booking_no_overlap',  
  expression: 'exclude using gist (room_id with =, during with &&)',  
})  
export class RoomBooking {  
  
  @PrimaryKey()  
  id!: number;  
  
  @Property()  
  room_id!: number;  
  
  @Property({ columnType: 'tstzrange' })  
  during!: string;  
  
}  
```
This requires the `btree_gist` extension when the constraint uses `=` on a non-range type. The schema generator round-trips EXCLUDE constraints through introspection just like check constraints — no extra diffing churn.
## Database Triggers[​](https://mikro-orm.io/docs/next/defining-entities#database-triggers "Direct link to Database Triggers")
You can define database triggers via the `@Trigger()` decorator or the `triggers` option in `defineEntity`/`EntitySchema`. Triggers are managed by the schema generator and migration system — they are created, updated, and removed automatically.
Each trigger requires a `timing` (`before`, `after`, or `instead of`), one or more `events` (`insert`, `update`, `delete`, `truncate`), and either a `body` (the SQL to execute) or an `expression` (raw DDL escape hatch).
The `body` can be a string or a callback that receives column name mappings, just like check constraints. The ORM generates the appropriate DDL for each database driver:
  * **PostgreSQL** : creates a separate function and trigger
  * **MySQL/MariaDB/SQLite** : creates one trigger per event (these databases require it)
  * **MSSQL** : creates a single trigger with multiple events (only `after` and `instead of` are supported — MSSQL does not support `before` triggers)
```
@Trigger({  
  name: 'update_timestamp',  
  timing: 'before',  
  events: ['insert', 'update'],  
  body: `NEW.updated_at = NOW(); RETURN NEW`,  
})  
@Entity()  
class Product {  
  @PrimaryKey()  
  id!: number;  
  
  @Property()  
  updatedAt!: Date;  
}  
```
With `defineEntity`:
```
const Product = defineEntity({  
  name: 'Product',  
  properties: {  
    id: p.integer().primary(),  
    updatedAt: p.date(),  
  },  
  triggers: [{  
    name: 'update_timestamp',  
    timing: 'before',  
    events: ['insert', 'update'],  
    body: columns => raw`NEW.${columns.updatedAt} = NOW(); RETURN NEW`,  
  }],  
});  
```
For full control over the generated DDL, use the `expression` escape hatch instead of `body`:
```
@Trigger({  
  name: 'my_trigger',  
  timing: 'after',  
  events: ['insert'],  
  expression: `create trigger "my_trigger" after insert on "product" for each row execute function my_existing_fn()`,  
})  
```
> Database triggers are only supported by SQL drivers. Defining triggers on a MongoDB entity will throw an error.
> When using `expression`, changes to the expression value are not detected by subsequent schema diffs. To update an expression-based trigger, drop and recreate it manually. Prefer `body` for triggers that should be fully managed by the migration system.
## Custom Types[​](https://mikro-orm.io/docs/next/defining-entities#custom-types "Direct link to Custom Types")
You can define custom types by extending `Type` abstract class. It has 4 optional methods:
  * `convertToDatabaseValue(value: any, platform: Platform): any`
Converts a value from its JS representation to its database representation of this type.
  * `convertToJSValue(value: any, platform: Platform): any`
Converts a value from its database representation to its JS representation of this type.
  * `toJSON(value: any, platform: Platform): any`
Converts a value from its JS representation to its serialized JSON form of this type. By default, converts to the database value.
  * `getColumnType(prop: EntityProperty, platform: Platform): string`
Gets the SQL declaration snippet for a field of this type.
More information can be found in [Custom Types](https://mikro-orm.io/docs/next/custom-types) section.
## Lazy scalar properties[​](https://mikro-orm.io/docs/next/defining-entities#lazy-scalar-properties "Direct link to Lazy scalar properties")
You can mark any property as `lazy: true` to omit it from the select clause. This can be handy for properties that are too large, and you want to have them available only sometimes, like a full text of an article.
  * defineEntity + class
  * defineEntity
  * reflect-metadata
  * ts-morph
./entities/Book.ts
```
const BookSchema = defineEntity({  
  name: 'Book',  
  properties: {  
    text: p.text().lazy(),  
  },  
});  
  
export class Book extends BookSchema.class {}  
BookSchema.setClass(Book);  
```
./entities/Book.ts
```
export const Book = defineEntity({  
  name: 'Book',  
  properties: {  
    text: p.text().lazy(),  
  },  
});  
```
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
You can use `populate` parameter to load them.
```
const b1 = await em.find(Book, 1); // this will omit the `text` property  
const b2 = await em.find(Book, 1, { populate: ['text'] }); // this will load the `text` property  
```
> If the entity is already loaded, and you need to populate a lazy scalar property, you might need to pass `refresh: true` in the `FindOptions`.
###  `ScalarReference` wrapper[​](https://mikro-orm.io/docs/next/defining-entities#scalarreference-wrapper "Direct link to scalarreference-wrapper")
Similarly to the `Reference` wrapper, you can also wrap lazy scalars with `Ref` into a `ScalarReference` object. The `Ref` type automatically resolves to `ScalarReference` for non-object types, so the below is correct:
```
@Property({ lazy: true, ref: true })  
passwordHash!: Ref<string>;  
```
```
const user = await em.findOne(User, 1);  
const passwordHash = await user.passwordHash.load();  
```
For object-like types, if you choose to use the reference wrappers, you should use the `ScalarRef<T>` type explicitly. For example, you might want to lazily load a large JSON value:
```
@Property({ type: 'json', nullable: true, lazy: true, ref: true })  
// ReportParameters is an object type, imagine it defined elsewhere.  
reportParameters!: ScalarRef<ReportParameters | null>;   
```
Keep in mind that once a scalar value is managed through a `ScalarReference`, accessing it through MikroORM managed objects will always return the `ScalarReference` wrapper. That can be confusing in case the property is also `nullable`, since the `ScalarReference` will always be truthy. In such cases, you should inform the type system of the nullability of the property through `ScalarReference<T>`'s type parameter as demonstrated above. Below is an example of how it all works:
```
// Say Report of id "1" has no reportParameters in the Database.  
const report = await em.findOne(Report, 1);  
if (report.reportParameters) {  
  // Logs Ref<?>, not the actual value. **Would always run***.  
  console.log(report.reportParameters);  
  //@ts-expect-error $/.get() is not available until the reference has been loaded.  
  // const mistake = report.reportParameters.$  
}  
const populatedReport = await em.populate(report, ['reportParameters']);  
// Logs `null`  
console.log(populatedReport.reportParameters.$);   
```
## Private property accessors[​](https://mikro-orm.io/docs/next/defining-entities#private-property-accessors "Direct link to Private property accessors")
When using a private property backed by a public get/set pair, use the `accessor` option to point to the other side.
> For scalar/embedded properties, the column name is inferred from the accessor name (e.g. `_email` with `accessor: 'email'` produces column `email`, not `_email`). For to-one relations, this inference only kicks in when the property name follows the conventional `_`-prefixed backing-field shape — `_draft` with `accessor: 'draft'` produces FK column `draft_id`, while a non-prefixed property name is kept as-is.
> Relying on the convention is fragile. Prefer setting the column name explicitly via `fieldName` (scalars) or `joinColumn` (to-one relations) — both override the inferred value.
If the `accessor` option points to something, the ORM will use the backing property directly:
  * defineEntity + class
  * defineEntity
  * reflect-metadata
  * ts-morph
./entities/User.ts
```
const UserSchema = defineEntity({  
  name: 'User',  
  properties: {  
    id: p.integer().primary(),  
    // the ORM will use the backing field directly  
    email: p.string().accessor('_email'),  
  },  
});  
  
export class User extends UserSchema.class {  
  private _email!: unknown;  
  
  get email(): unknown {  
    return this._email;  
  }  
  
  set email(email: unknown) {  
    this._email = email;  
  }  
}  
  
UserSchema.setClass(User);  
```
./entities/User.ts
```
export class User {  
  id!: number;  
  private _email!: unknown;  
  
  get email(): unknown {  
    return this._email;  
  }  
  
  set email(email: unknown) {  
    this._email = email;  
  }  
}  
  
export const UserSchema = defineEntity({  
  class: User,  
  properties: {  
    id: p.integer().primary(),  
    // the ORM will use the backing field directly  
    email: p.string().accessor('_email'),  
  },  
});  
```
./entities/User.ts
```
@Entity()  
export class User {  
  @PrimaryKey()  
  id!: number;  
  
  // the ORM will use the backing field directly  
  @Property({ accessor: 'email' })  
  private _email: string;  
  
  get email() {  
    return this._email;  
  }  
  
  set email(email: string) {  
    return this._email;  
  }  
}  
```
./entities/User.ts
```
@Entity()  
export class User {  
  @PrimaryKey()  
  id!: number;  
    
  // the ORM will use the backing field directly  
  @Property({ accessor: 'email' })  
  private _email: string;  
  
  get email() {  
    return this._email;  
  }  
  
  set email(email: string) {  
    return this._email;  
  }  
}  
```
If you want the ORM to use the accessor internally (e.g. for hydration or change tracking), use `accessor: true` on the get/set property instead. This is handy if you want to use a **native private property** for the backing field.
  * defineEntity + class
  * defineEntity
  * reflect-metadata
  * ts-morph
./entities/User.ts
```
const UserSchema = defineEntity({  
  name: 'User',  
  // constructors are required for native private fields  
  forceConstructor: true,  
  properties: {  
    id: p.integer().primary(),  
    // the ORM will use the accessor internally  
    email: p.string().accessor(),  
  },  
});  
  
export class User extends UserSchema.class {  
  #email!: string;  
  
  get email() {  
    return this.#email;  
  }  
  
  set email(email: string) {  
    this.#email = email;  
  }  
}  
  
UserSchema.setClass(User);  
```
./entities/User.ts
```
export class User {  
  id!: string;  
  #email!: string;  
  
  get email() {  
    return this.#email;  
  }  
  
  set email(email: string) {  
    this.#email = email;  
  }  
}  
  
export const UserSchema = defineEntity({  
  class: User,  
  // constructors are required for native private fields  
  forceConstructor: true,  
  properties: {  
    id: p.integer().primary(),  
    // the ORM will use the accessor internally  
    email: p.string().accessor(),  
  },  
});  
```
./entities/User.ts
```
@Entity({ forceConstructor: true })  
export class User {  
  @PrimaryKey()  
  id!: number;  
  
  #email!: string;  
  
  // the ORM will use the accessor internally  
  @Property({ accessor: true })  
  get email() {  
    return this.#email;  
  }  
  
  set email(email: string) {  
    this.#email = email;  
  }  
}  
```
./entities/User.ts
```
@Entity({ forceConstructor: true })  
export class User {  
  @PrimaryKey()  
  id!: number;  
  
  #email!: string;  
  
  // the ORM will use the accessor internally  
  @Property({ accessor: true })  
  get email() {  
    return this.#email;  
  }  
  
  set email(email: string) {  
    return this.#email;  
  }  
}  
```
## Virtual Properties[​](https://mikro-orm.io/docs/next/defining-entities#virtual-properties "Direct link to Virtual Properties")
You can define your properties as virtual, either as a method, or via JavaScript `get/set`.
Following example defines User entity with `firstName` and `lastName` database fields, that are both hidden from the serialized response, replaced with virtual properties `fullName` (defined as a classic method) and `fullName2` (defined as a JavaScript getter).
> For JavaScript getter you need to provide `{ persist: false }` option otherwise the value would be stored in the database.
  * defineEntity + class
  * defineEntity
  * reflect-metadata
  * ts-morph
./entities/User.ts
```
const UserSchema = defineEntity({  
  name: 'User',  
  properties: {  
    firstName: p.string().hidden(),  
    lastName: p.string().hidden(),  
    fullName: p.type('method').persist(false).getter().getterName('getFullName'),  
    fullName2: p.type('method').persist(false).getter(),  
  },  
});  
  
export class User extends UserSchema.class {  
  
  getFullName() {  
    return `${this.firstName} ${this.lastName}`;  
  }  
  
  // Opt return type marks the getter as non-required on entity creation  
  get fullName2(): Opt<string> {  
    return `${this.firstName} ${this.lastName}`;  
  }  
  
}  
  
UserSchema.setClass(User);  
```
./entities/User.ts
```
export class User {  
  
  [HiddenProps]?: 'firstName' | 'lastName';  
  
  firstName!: string;  
  lastName!: string;  
  
  getFullName() {  
    return `${this.firstName} ${this.lastName}`;  
  }  
  
  // Opt return type marks the getter as non-required on entity creation  
  get fullName2(): Opt<string> {  
    return `${this.firstName} ${this.lastName}`;  
  }  
}  
  
export const UserSchema = defineEntity({  
  class: User,  
  name: 'User',  
  properties: {  
    firstName: p.string().hidden(),  
    lastName: p.string().hidden(),  
    fullName: p.type('method').persist(false).getter().getterName('getFullName'),  
    fullName2: p.type('method').persist(false).getter(),  
  },  
});  
```
./entities/User.ts
```
@Entity()  
export class User {  
  
  [HiddenProps]?: 'firstName' | 'lastName';  
  
  @Property({ hidden: true })  
  firstName!: string;  
  
  @Property({ hidden: true })  
  lastName!: string;  
  
  @Property({ name: 'fullName' })  
  getFullName() {  
    return `${this.firstName} ${this.lastName}`;  
  }  
  
  // Opt return type marks the getter as non-required on entity creation  
  @Property({ persist: false })  
  get fullName2(): Opt<string> {  
    return `${this.firstName} ${this.lastName}`;  
  }  
  
}  
```
./entities/User.ts
```
@Entity()  
export class User {  
  
  [HiddenProps]?: 'firstName' | 'lastName';  
  
  @Property({ hidden: true })  
  firstName!: string;  
  
  @Property({ hidden: true })  
  lastName!: string;  
  
  @Property({ name: 'fullName' })  
  getFullName() {  
    return `${this.firstName} ${this.lastName}`;  
  }  
  
  // Opt return type marks the getter as non-required on entity creation  
  @Property({ persist: false })  
  get fullName2(): Opt<string> {  
    return `${this.firstName} ${this.lastName}`;  
  }  
  
}  
```
```
const repo = em.getRepository(User);  
const author = repo.create({ firstName: 'Jon', lastName: 'Snow' });  
  
console.log(author.getFullName()); // 'Jon Snow'  
console.log(author.fullName2); // 'Jon Snow'  
console.log(wrap(author).toJSON()); // { fullName: 'Jon Snow', fullName2: 'Jon Snow' }  
```
## Entity file names[​](https://mikro-orm.io/docs/next/defining-entities#entity-file-names "Direct link to Entity file names")
Starting with MikroORM 4.2, there is no limitation for entity file names. It is now also possible to define multiple entities in a single file using folder based discovery.
## Default entity ordering[​](https://mikro-orm.io/docs/next/defining-entities#default-entity-ordering "Direct link to Default entity ordering")
You can define a default ordering for an entity using the `orderBy` option in `@Entity()`. This ordering is automatically applied when:
  * Querying the entity directly via `em.find()`, `em.findAll()`, etc.
  * Populating the entity as a relation
All applicable orderings are combined together, with higher-priority orderings taking precedence for the same fields.
  * defineEntity + class
  * defineEntity
  * reflect-metadata
  * ts-morph
./entities/Comment.ts
```
import { defineEntity, p } from '@mikro-orm/core';  
  
const CommentSchema = defineEntity({  
  name: 'Comment',  
  orderBy: { createdAt: QueryOrder.DESC, id: QueryOrder.DESC },  
  properties: {  
    id: p.integer().primary(),  
    createdAt: p.datetime(),  
    text: p.string(),  
    post: () => p.manyToOne(Post),  
  },  
});  
  
export class Comment extends CommentSchema.class {}  
CommentSchema.setClass(Comment);  
```
./entities/Comment.ts
```
import { defineEntity, p } from '@mikro-orm/core';  
  
export const Comment = defineEntity({  
  name: 'Comment',  
  orderBy: { createdAt: QueryOrder.DESC, id: QueryOrder.DESC },  
  properties: {  
    id: p.integer().primary(),  
    createdAt: p.datetime(),  
    text: p.string(),  
    post: () => p.manyToOne(Post),  
  },  
});  
```
./entities/Comment.ts
```
@Entity({ orderBy: { createdAt: QueryOrder.DESC, id: QueryOrder.DESC } })  
export class Comment {  
  
  @PrimaryKey()  
  id!: number;  
  
  @Property()  
  createdAt!: Date;  
  
  @Property()  
  text!: string;  
  
  @ManyToOne(() => Post)  
  post!: Post;  
  
}  
```
./entities/Comment.ts
```
@Entity({ orderBy: { createdAt: QueryOrder.DESC, id: QueryOrder.DESC } })  
export class Comment {  
  
  @PrimaryKey()  
  id!: number;  
  
  @Property()  
  createdAt!: Date;  
  
  @Property()  
  text!: string;  
  
  @ManyToOne()  
  post!: Post;  
  
}  
```
The ordering precedence (from highest to lowest) is:
  1. **Runtime`orderBy`** - Passed to `em.find()`, `collection.init()`, or `collection.matching()`
  2. **Relation-level`orderBy`** - Defined on `@OneToMany()` or `@ManyToMany()` decorators
  3. **Entity-level`orderBy`** - Defined on the `@Entity()` decorator
All levels are combined together - if you specify `{ name: 'asc' }` at runtime and the entity has `{ createdAt: 'desc' }`, the result will order by `name` first, then by `createdAt`.
  * defineEntity + class
  * defineEntity
  * reflect-metadata
  * ts-morph
./entities/Post.ts
```
import { defineEntity, p } from '@mikro-orm/core';  
  
const PostSchema = defineEntity({  
  name: 'Post',  
  properties: {  
    id: p.integer().primary(),  
    comments: () => p.oneToMany(Comment).mappedBy('post'),  
    commentsAlphabetical: () => p.oneToMany(Comment).mappedBy('post').orderBy({ text: QueryOrder.ASC }),  
  },  
});  
  
export class Post extends PostSchema.class {}  
PostSchema.setClass(Post);  
```
./entities/Post.ts
```
import { defineEntity, p } from '@mikro-orm/core';  
  
export const Post = defineEntity({  
  name: 'Post',  
  properties: {  
    id: p.integer().primary(),  
    comments: () => p.oneToMany(Comment).mappedBy('post'),  
    commentsAlphabetical: () => p.oneToMany(Comment).mappedBy('post').orderBy({ text: QueryOrder.ASC }),  
  },  
});  
```
./entities/Post.ts
```
@Entity()  
export class Post {  
  
  @PrimaryKey()  
  id!: number;  
  
  @OneToMany(() => Comment, c => c.post)  
  comments = new Collection<Comment>(this);  
  
  @OneToMany(() => Comment, c => c.post, { orderBy: { text: QueryOrder.ASC } })  
  commentsAlphabetical = new Collection<Comment>(this);  
  
}  
```
./entities/Post.ts
```
@Entity()  
export class Post {  
  
  @PrimaryKey()  
  id!: number;  
  
  @OneToMany(() => Comment, c => c.post)  
  comments = new Collection<Comment>(this);  
  
  @OneToMany(() => Comment, c => c.post, { orderBy: { text: QueryOrder.ASC } })  
  commentsAlphabetical = new Collection<Comment>(this);  
  
}  
```
```
const comments = await em.find(Comment, {});  
// ordered by createdAt DESC (entity-level), then by id DESC  
  
const commentsAsc = await em.find(Comment, {}, { orderBy: { createdAt: QueryOrder.ASC } });  
// ordered by createdAt ASC (runtime), then by id DESC (entity-level)  
  
const post = await em.findOne(Post, 1, { populate: ['comments'] });  
// post.comments ordered by createdAt DESC, id DESC  
```
## Using custom base entity[​](https://mikro-orm.io/docs/next/defining-entities#using-custom-base-entity "Direct link to Using custom base entity")
You can define your own base entity with properties that are required on all entities, like primary key and created/updated time. MikroORM supports two inheritance mapping strategies:
  * **Single Table Inheritance (STI)** - All entities in the hierarchy share a single table with a discriminator column
  * **Table-Per-Type Inheritance (TPT)** - Each entity has its own table with foreign keys linking child tables to parent tables
Read more about this topic in [Inheritance Mapping](https://mikro-orm.io/docs/next/inheritance-mapping) section.
> If you are initializing the ORM via `entities` option, you need to specify all your base entities as well.
  * defineEntity + class
  * defineEntity
  * reflect-metadata
  * ts-morph
./entities/CustomBaseEntity.ts
```
const p = defineEntity.properties;  
const CustomBaseProperties = {  
  uuid: p.uuid().primary().onCreate(() => v4()),  
  createdAt: p.datetime()  
    .onCreate(() => new Date())  
    .nullable(),  
  updatedAt: p.datetime()  
    .onCreate(() => new Date())  
    .onUpdate(() => new Date())  
    .nullable(),  
}  
```
./entities/CustomBaseEntity.ts
```
const p = defineEntity.properties;  
const CustomBaseProperties = {  
  uuid: p.uuid().primary().onCreate(() => v4()),  
  createdAt: p.datetime()  
    .onCreate(() => new Date())  
    .nullable(),  
  updatedAt: p.datetime()  
    .onCreate(() => new Date())  
    .onUpdate(() => new Date())  
    .nullable(),  
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
  
export abstract class CustomBaseEntity {  
  
  @PrimaryKey()  
  uuid = v4();  
  
  @Property()  
  createdAt = new Date();  
  
  @Property({ onUpdate: () => new Date() })  
  updatedAt = new Date();  
  
}  
```
There is a special case, when you need to annotate the base entity - if you are using folder based discovery, and the base entity is not using any decorators (e.g. it does not define any decorated property). In that case, you need to mark it as abstract:
```
@Entity({ abstract: true })  
export abstract class CustomBaseEntity {  
  // ...  
}  
```
## SQL Generated columns[​](https://mikro-orm.io/docs/next/defining-entities#sql-generated-columns "Direct link to SQL Generated columns")
To use generated columns, you can either use the `generated` option, or specify it as part of the `columnType`:
  * defineEntity + class
  * defineEntity
  * reflect-metadata
  * ts-morph
./entities/User.ts
```
const UserSchema = defineEntity({  
  name: 'User',  
  properties: {  
    id: p.integer().primary(),  
    firstName: p.string().length(50),  
    lastName: p.string().length(50),  
    fullName: p.string()  
      .length(100)  
      .generated(cols => `(concat(${cols.firstName}, ' ', ${cols.lastName})) stored`),  
    fullName2: p.string()  
      .length(100)  
      .columnType(`varchar(100) generated always as (concat(first_name, ' ', last_name)) virtual`),  
  },  
});  
  
export class User extends UserSchema.class {}  
UserSchema.setClass(User);  
```
./entities/User.ts
```
export const User = defineEntity({  
  name: 'User',  
  properties: {  
    id: p.integer().primary(),  
    firstName: p.string().length(50),  
    lastName: p.string().length(50),  
    fullName: p.string()  
      .length(100)  
      .generated(cols => `(concat(${cols.firstName}, ' ', ${cols.lastName})) stored`),  
    fullName2: p.string()  
      .length(100)  
      .columnType(`varchar(100) generated always as (concat(first_name, ' ', last_name)) virtual`),  
  },  
});  
```
./entities/User.ts
```
@Entity()  
export class User {  
  
  @PrimaryKey()  
  id!: number;  
  
  @Property({ length: 50 })  
  firstName!: string;  
  
  @Property({ length: 50 })  
  lastName!: string;  
  
  @Property({ length: 100, generated: cols => `(concat(${cols.firstName}, ' ', ${cols.lastName})) stored` })  
  fullName!: string & Opt;  
  
  @Property({ columnType: `varchar(100) generated always as (concat(first_name, ' ', last_name)) virtual` })  
  fullName2!: string & Opt;  
  
}  
```
./entities/User.ts
```
@Entity()  
export class User {  
  
  @PrimaryKey()  
  id!: number;  
  
  @Property({ length: 50 })  
  firstName!: string;  
  
  @Property({ length: 50 })  
  lastName!: string;  
  
  @Property({ length: 100, generated: cols => `(concat(${cols.firstName}, ' ', ${cols.lastName})) stored` })  
  fullName!: string & Opt;  
  
  @Property({ columnType: `varchar(100) generated always as (concat(first_name, ' ', last_name)) virtual` })  
  fullName2!: string & Opt;  
  
}  
```
To use a generated identity column in PostgreSQL, set the `generated` option to `identity`:
> To allow providing the value explicitly, use `generated: 'by default as identity'`.
  * defineEntity + class
  * defineEntity
  * reflect-metadata
  * ts-morph
./entities/User.ts
```
const UserSchema = defineEntity({  
  name: 'User',  
  properties: {  
    id: p.integer().primary().generated('identity'),  
  },  
});  
  
export class User extends UserSchema.class {}  
UserSchema.setClass(User);  
```
./entities/User.ts
```
export const User = defineEntity({  
  name: 'User',  
  properties: {  
    id: p.integer().primary().generated('identity'),  
  },  
});  
```
./entities/User.ts
```
@Entity()  
export class User {  
  
  @PrimaryKey({ generated: 'identity' })  
  id!: number;  
  
}  
```
./entities/User.ts
```
@Entity()  
export class User {  
  
  @PrimaryKey({ generated: 'identity' })  
  id!: number;  
  
}  
```
## Examples of entity definition with various primary keys[​](https://mikro-orm.io/docs/next/defining-entities#examples-of-entity-definition-with-various-primary-keys "Direct link to Examples of entity definition with various primary keys")
### Using id as primary key (SQL drivers)[​](https://mikro-orm.io/docs/next/defining-entities#using-id-as-primary-key-sql-drivers "Direct link to Using id as primary key \(SQL drivers\)")
  * defineEntity + class
  * defineEntity
  * reflect-metadata
  * ts-morph
./entities/Book.ts
```
const BookSchema = defineEntity({  
  name: 'Book',  
  properties: {  
    id: p.integer().primary(),  
    title: p.string(),  
    author: () => p.manyToOne(Author),  
    publisher: () => p.manyToOne(Publisher).nullable(),  
  },  
});  
  
export class Book extends BookSchema.class {}  
BookSchema.setClass(Book);  
```
./entities/Book.ts
```
export const Book = defineEntity({  
  name: 'Book',  
  properties: {  
    id: p.integer().primary(),  
    title: p.string(),  
    author: () => p.manyToOne(Author),  
    publisher: () => p.manyToOne(Publisher).nullable(),  
  },  
});  
```
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
### Using UUID as primary key (SQL drivers)[​](https://mikro-orm.io/docs/next/defining-entities#using-uuid-as-primary-key-sql-drivers "Direct link to Using UUID as primary key \(SQL drivers\)")
  * defineEntity + class
  * defineEntity
  * reflect-metadata
  * ts-morph
./entities/Book.ts
```
const BookSchema = defineEntity({  
  name: 'Book',  
  properties: {  
    uuid: p.uuid().primary().onCreate(() => v4()),  
    title: p.string(),  
    author: () => p.manyToOne(Author),  
  },  
});  
  
export class Book extends BookSchema.class {}  
BookSchema.setClass(Book);  
```
./entities/Book.ts
```
export const Book = defineEntity({  
  name: 'Book',  
  properties: {  
    uuid: p.uuid().primary().onCreate(() => v4()),  
    title: p.string(),  
    author: () => p.manyToOne(Author),  
  },  
});  
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
### Using PostgreSQL built-in [gen_random_uuid](https://www.postgresql.org/docs/current/functions-uuid.html) function as primary key[​](https://mikro-orm.io/docs/next/defining-entities#using-postgresql-built-in-gen_random_uuid-function-as-primary-key "Direct link to using-postgresql-built-in-gen_random_uuid-function-as-primary-key")
  * defineEntity + class
  * defineEntity
  * reflect-metadata
  * ts-morph
./entities/Book.ts
```
const BookSchema = defineEntity({  
  name: 'Book',  
  properties: {  
    uuid: p.uuid().primary().defaultRaw('gen_random_uuid()'),  
    title: p.string(),  
    author: () => p.manyToOne(Author),  
  },  
});  
  
export class Book extends BookSchema.class {}  
BookSchema.setClass(Book);  
```
./entities/Book.ts
```
export const Book = defineEntity({  
  name: 'Book',  
  properties: {  
    uuid: p.uuid().primary().defaultRaw('gen_random_uuid()'),  
    title: p.string(),  
    author: () => p.manyToOne(Author),  
  },  
});  
```
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
### Using BigInt as primary key (MySQL and PostgreSQL)[​](https://mikro-orm.io/docs/next/defining-entities#using-bigint-as-primary-key-mysql-and-postgresql "Direct link to Using BigInt as primary key \(MySQL and PostgreSQL\)")
Since v6, `bigint`s are represented by the native `BigInt` type, and as such, they don't require explicit type in the decorator options:
```
@PrimaryKey()  
id: bigint;  
```
You can also specify the target type you want your bigints to be mapped to:
```
@PrimaryKey({ type: new BigIntType('bigint') })  
id1: bigint;  
  
@PrimaryKey({ type: new BigIntType('string') })  
id2: string;  
  
@PrimaryKey({ type: new BigIntType('number') })  
id3: number;  
```
> JavaScript cannot represent all the possible values of a `bigint` when mapping to the `number` type - only values up to `Number.MAX_SAFE_INTEGER` (2^53 - 1) are safely supported.
  * defineEntity + class
  * defineEntity
  * reflect-metadata
  * ts-morph
./entities/CustomBaseEntity.ts
```
const SomeEntitySchema = defineEntity({  
  name: 'SomeEntity',  
  properties: {  
    id: p.bigint().primary(),  
  },  
});  
  
export class SomeEntity extends SomeEntitySchema.class {}  
SomeEntitySchema.setClass(SomeEntity);  
```
./entities/CustomBaseEntity.ts
```
const SomeEntity = defineEntity({  
  name: 'SomeEntity',  
  properties: {  
    id: p.bigint().primary(),  
  },  
});  
```
./entities/CustomBaseEntity.ts
```
@Entity()  
export class Book {  
  
  @PrimaryKey()  
  id: bigint;  
  
}  
```
./entities/CustomBaseEntity.ts
```
@Entity()  
export class Book {  
  
  @PrimaryKey()  
  id: bigint;  
  
}  
```
If you want to use native `bigint`s, read the following guide: [Using native BigInt PKs](https://mikro-orm.io/docs/next/using-bigint-pks).
### Example of Mongo entity[​](https://mikro-orm.io/docs/next/defining-entities#example-of-mongo-entity "Direct link to Example of Mongo entity")
  * defineEntity + class
  * defineEntity
  * reflect-metadata
  * ts-morph
./entities/Book.ts
```
const BookSchema = defineEntity({  
  name: 'Book',  
  properties: {  
    _id: p.type(ObjectId).primary(),  
    id: p.string().serializedPrimaryKey(),  
    title: p.string(),  
  },  
});  
  
export class Book extends BookSchema.class {}  
BookSchema.setClass(Book);  
```
./entities/Book.ts
```
export const Book = defineEntity({  
  name: 'Book',  
  properties: {  
    _id: p.type(ObjectId).primary(),  
    id: p.string().serializedPrimaryKey(),  
    title: p.string(),  
  },  
});  
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
### Using MikroORM's BaseEntity (previously WrappedEntity)[​](https://mikro-orm.io/docs/next/defining-entities#using-mikroorms-baseentity-previously-wrappedentity "Direct link to Using MikroORM's BaseEntity \(previously WrappedEntity\)")
The `BaseEntity` class is provided with `init`, `isInitialized`, `assign` and other methods that are otherwise available via the `wrap()` helper.
> Usage of the `BaseEntity` is optional.
```
import { BaseEntity } from '@mikro-orm/core';  
  
@Entity()  
export class Book extends BaseEntity {  
  
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
Having the entities set up, you can now start [using entity manager](https://mikro-orm.io/docs/next/entity-manager) and [repositories](https://mikro-orm.io/docs/next/repositories) as described in following sections.
[](https://github.com/mikro-orm/mikro-orm/edit/master/docs/docs/defining-entities.md)
Last updated on **May 27, 2026** by **Martin Adámek**
[Previous Modeling](https://mikro-orm.io/docs/next/modeling)[Next Modeling Entity Relationships](https://mikro-orm.io/docs/next/relationships)
  * [Optional Properties](https://mikro-orm.io/docs/next/defining-entities#optional-properties)
  * [Default values](https://mikro-orm.io/docs/next/defining-entities#default-values)
  * [Enums](https://mikro-orm.io/docs/next/defining-entities#enums)
    * [PostgreSQL native enums](https://mikro-orm.io/docs/next/defining-entities#postgresql-native-enums)
  * [Enum arrays](https://mikro-orm.io/docs/next/defining-entities#enum-arrays)
  * [Mapping directly to primary keys](https://mikro-orm.io/docs/next/defining-entities#mapping-directly-to-primary-keys)
  * [Formulas](https://mikro-orm.io/docs/next/defining-entities#formulas)
  * [Indexes](https://mikro-orm.io/docs/next/defining-entities#indexes)
  * [Check constraints](https://mikro-orm.io/docs/next/defining-entities#check-constraints)
    * [Exclusion constraints (PostgreSQL)](https://mikro-orm.io/docs/next/defining-entities#exclusion-constraints-postgresql)
  * [Database Triggers](https://mikro-orm.io/docs/next/defining-entities#database-triggers)
  * [Custom Types](https://mikro-orm.io/docs/next/defining-entities#custom-types)
  * [Lazy scalar properties](https://mikro-orm.io/docs/next/defining-entities#lazy-scalar-properties)
    * [`ScalarReference` wrapper](https://mikro-orm.io/docs/next/defining-entities#scalarreference-wrapper)
  * [Private property accessors](https://mikro-orm.io/docs/next/defining-entities#private-property-accessors)
  * [Virtual Properties](https://mikro-orm.io/docs/next/defining-entities#virtual-properties)
  * [Entity file names](https://mikro-orm.io/docs/next/defining-entities#entity-file-names)
  * [Default entity ordering](https://mikro-orm.io/docs/next/defining-entities#default-entity-ordering)
  * [Using custom base entity](https://mikro-orm.io/docs/next/defining-entities#using-custom-base-entity)
  * [SQL Generated columns](https://mikro-orm.io/docs/next/defining-entities#sql-generated-columns)
  * [Examples of entity definition with various primary keys](https://mikro-orm.io/docs/next/defining-entities#examples-of-entity-definition-with-various-primary-keys)
    * [Using id as primary key (SQL drivers)](https://mikro-orm.io/docs/next/defining-entities#using-id-as-primary-key-sql-drivers)
    * [Using UUID as primary key (SQL drivers)](https://mikro-orm.io/docs/next/defining-entities#using-uuid-as-primary-key-sql-drivers)
    * [Using PostgreSQL built-in gen_random_uuid function as primary key](https://mikro-orm.io/docs/next/defining-entities#using-postgresql-built-in-gen_random_uuid-function-as-primary-key)
    * [Using BigInt as primary key (MySQL and PostgreSQL)](https://mikro-orm.io/docs/next/defining-entities#using-bigint-as-primary-key-mysql-and-postgresql)
    * [Example of Mongo entity](https://mikro-orm.io/docs/next/defining-entities#example-of-mongo-entity)
    * [Using MikroORM's BaseEntity (previously WrappedEntity)](https://mikro-orm.io/docs/next/defining-entities#using-mikroorms-baseentity-previously-wrappedentity)
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
# https://mikro-orm.io/docs/next/entity-manager
============================================================
[Skip to main content](https://mikro-orm.io/docs/next/entity-manager#__docusaurus_skipToContent_fallback)
⭐️ If you like MikroORM, give it a star on [GitHub](https://github.com/mikro-orm/mikro-orm) and consider [sponsoring](https://github.com/sponsors/mikro-orm) its development! ⭐️
[ ![MikroORM](https://mikro-orm.io/img/logo.svg)![MikroORM](https://mikro-orm.io/img/logo-dark.svg) ](https://mikro-orm.io/)
[Next](https://mikro-orm.io/docs/next/entity-manager)
  * [Next](https://mikro-orm.io/docs/next/entity-manager)
  * [7.1](https://mikro-orm.io/docs/entity-manager)
  * [7.0](https://mikro-orm.io/docs/7.0/entity-manager)
  * [6.6](https://mikro-orm.io/docs/6.6/entity-manager)
  * [5.9](https://mikro-orm.io/docs/5.9/entity-manager)
[Docs](https://mikro-orm.io/docs/quick-start)[API](https://mikro-orm.io/api)[Blog](https://mikro-orm.io/blog)[Changelog](https://mikro-orm.io/changelog)
[latest: v7.1.3](https://mikro-orm.io/versions)[Discord](https://discord.gg/w8bjxFHS7X "Chat on Discord")[GitHub](https://github.com/mikro-orm/mikro-orm "View on GitHub")[Twitter](https://twitter.com/MikroORM "Twitter")
Search
  * [Quick Start](https://mikro-orm.io/docs/next/quick-start)
  * [Getting Started](https://mikro-orm.io/docs/next/guide)
    * [Chapter 1: First Entity](https://mikro-orm.io/docs/next/guide/first-entity)
    * [Chapter 2: Relationships](https://mikro-orm.io/docs/next/guide/relationships)
    * [Chapter 3: Project Setup](https://mikro-orm.io/docs/next/guide/project-setup)
    * [Chapter 4: Advanced](https://mikro-orm.io/docs/next/guide/advanced)
    * [Chapter 5: Type-safety](https://mikro-orm.io/docs/next/guide/type-safety)
  * [Core Concepts](https://mikro-orm.io/docs/next/core-concepts)
    * [Architecture](https://mikro-orm.io/docs/next/architecture)
    * [Entity Manager](https://mikro-orm.io/docs/next/entity-manager)
    * [Unit of Work](https://mikro-orm.io/docs/next/unit-of-work)
    * [Identity Map](https://mikro-orm.io/docs/next/identity-map)
    * [Transactions and Concurrency](https://mikro-orm.io/docs/next/transactions)
    * [Entity Repository](https://mikro-orm.io/docs/next/repositories)
    * [Collections](https://mikro-orm.io/docs/next/collections)
    * [The wrap() Helper](https://mikro-orm.io/docs/next/wrap-helper)
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
For up-to-date documentation, see the **[latest version](https://mikro-orm.io/docs/entity-manager)** (7.1).
  * [](https://mikro-orm.io/)
  * [Core Concepts](https://mikro-orm.io/docs/next/core-concepts)
Version: Next
On this page
# Working with Entity Manager
## Persist and Flush[​](https://mikro-orm.io/docs/next/entity-manager#persist-and-flush "Direct link to Persist and Flush")
There are 2 methods you should first understand to learn how persisting works in MikroORM: `em.persist()` and `em.flush()`.
`em.persist(entity)` is used to mark new entities for future persisting. It will make the entity managed by given `EntityManager` and once `flush` will be called, it will be written to the database.
To understand `flush`, lets first define what managed entity is: An entity is managed if it’s fetched from the database (via `em.find()`, `em.findOne()` or via other managed entity) or registered as new through `em.persist()`.
`em.flush()` will go through all managed entities, compute appropriate change sets and perform according database queries. As an entity loaded from database becomes managed automatically, you do not have to call persist on those, and flush is enough to update them.
```
const book = await em.findOne(Book, 1);  
book.title = 'How to persist things...';  
  
// no need to persist `book` as its already managed by the EM  
await em.flush();  
```
## Persisting and Cascading[​](https://mikro-orm.io/docs/next/entity-manager#persisting-and-cascading "Direct link to Persisting and Cascading")
To save entity state to database, you need to persist it. Persist determines whether to use `insert` or `update` and computes appropriate change-set. Entity references that are not persisted yet (does not have identifier) will be cascade persisted automatically.
```
// use constructors in your entities for required parameters  
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
await em.persist([book1, book2, book3]).flush();  
  
// or one by one  
em.persist(book1);  
em.persist(book2);  
em.persist(book3);  
await em.flush(); // flush everything to database at once  
```
## Entity references[​](https://mikro-orm.io/docs/next/entity-manager#entity-references "Direct link to Entity references")
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
The concept can be combined with the so-called `Reference` wrapper for added type safety as described in the [Type-safe Relations section](https://mikro-orm.io/docs/next/type-safe-relations).
## Entity state and `WrappedEntity`[​](https://mikro-orm.io/docs/next/entity-manager#entity-state-and-wrappedentity "Direct link to entity-state-and-wrappedentity")
During entity discovery (which happens when you call `MikroORM.init()`), the ORM will patch the entity prototype and generate a lazy getter for the `WrappedEntity` - a class holding various metadata and state information about the entity. Each entity instance will have one, available under a hidden `__helper` property - to access its API in a type-safe way, use the `wrap()` helper:
```
import { wrap } from '@mikro-orm/core';  
  
const userRef = em.getReference(User, 1);  
console.log('userRef is initialized:', wrap(userRef).isInitialized()); // false  
  
await wrap(userRef).init();  
console.log('userRef is initialized:', wrap(userRef).isInitialized()); // true  
```
> You can also extend the `BaseEntity` provided by MikroORM. It defines all the public methods available via `wrap()` helper, so you could do `userRef.isInitialized()` or `userRef.init()`.
The `WrappedEntity` instance also holds the state of the entity at the time it was loaded or flushed - this state is then used by the Unit of Work during flush to compute the differences. Another use case is serialization, you can use the `toObject()`, `toPOJO()` and `toJSON()` methods to convert the entity instance to a plain JavaScript object.
## Removing entities[​](https://mikro-orm.io/docs/next/entity-manager#removing-entities "Direct link to Removing entities")
To delete entities via `EntityManager`, you have two possibilities:
  1. Mark entity instance via `em.remove()` - this means you first need to have the entity instance. But don't worry, you can get one even without loading it from the database - via `em.getReference()`.
  2. Fire `DELETE` query via `em.nativeDelete()` - when all you want is a simple delete query, it can be simple as that.
Let's test the first approach with removing by entity instance:
```
// using reference is enough, no need for a fully initialized entity  
const book1 = em.getReference(Book, 1);  
await em.remove(book1).flush();  
```
## Fetching Entities with EntityManager[​](https://mikro-orm.io/docs/next/entity-manager#fetching-entities-with-entitymanager "Direct link to Fetching Entities with EntityManager")
To fetch entities from database you can use `em.find()` and `em.findOne()`:
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
Alternatively, there is also `em.findAll()`, which does not have the second `where` parameter and defaults to returning all entities. You can still use the `where` option of this method though:
```
const books = await em.findAll(Book, {  
  where: { publisher: { $ne: null } }, // optional  
});  
```
To populate entity relations, you can use `populate` parameter.
```
const books = await em.findAll(Book, {  
  where: { publisher: { $ne: null } },  
  populate: ['author.friends'],  
});  
```
You can also use `em.populate()` helper to populate relations (or to ensure they are fully populated) on already loaded entities. This is also handy when loading entities via `QueryBuilder`:
```
const authors = await em.createQueryBuilder(Author).select('*').getResult();  
await em.populate(authors, ['books.tags']);  
  
// now the Author entities will have `books` collections populated,  
// as well as they will have their `tags` collections populated.  
console.log(authors[0].books[0].tags[0]); // initialized BookTag  
```
### Conditions Object (`FilterQuery<T>`)[​](https://mikro-orm.io/docs/next/entity-manager#conditions-object-filterqueryt "Direct link to conditions-object-filterqueryt")
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
As you can see in the fifth example, you can also use operators like `$and`, `$or`, `$gte`, `$gt`, `$lte`, `$lt`, `$in`, `$nin`, `$eq`, `$ne`, `$like`, `$re` and `$fulltext`. More about that can be found in [Query Conditions](https://mikro-orm.io/docs/next/query-conditions) section.
#### Using custom classes in `FilterQuery`[​](https://mikro-orm.io/docs/next/entity-manager#using-custom-classes-in-filterquery "Direct link to using-custom-classes-in-filterquery")
If you decide to abstract the filter options in your own object then you might run into the problem that the find option does not return the results you'd expect. This is due to the fact that the `FilterQuery` should be provided as a plain object (POJO), and not a class instance with prototype.
If you want to provide your own `FilterQuery` DTO, then your DTO class should extend the `PlainObject` class. This way MikroORM knows it should be treated as such.
```
import { PlainObject } from '@mikro-orm/core';  
  
class Filter extends PlainObject {  
  name: string;  
}  
  
const where = new Filter();  
where.name = 'Jon';  
const res = await em.find(Author, where);  
```
#### Mitigating `Type instantiation is excessively deep and possibly infinite.ts(2589)` error[​](https://mikro-orm.io/docs/next/entity-manager#mitigating-type-instantiation-is-excessively-deep-and-possibly-infinitets2589-error "Direct link to mitigating-type-instantiation-is-excessively-deep-and-possibly-infinitets2589-error")
Sometimes you might be facing TypeScript errors caused by too complex query for it to properly infer all types. Usually it can be solved by providing the type argument explicitly.
You can also opt in to use repository instead, as there the type inference should not be problematic.
> As a last resort, you can always type cast the query to `any`.
```
const books = await em.find<Book>(Book, { ... our complex query ... });  
// or  
const books = await em.getRepository(Book).find({ ... our complex query ... });  
// or  
const books = await em.find<any>(Book, { ... our complex query ... }) as Book[];  
```
Another problem you might be facing is `RangeError: Maximum call stack size exceeded` error thrown during TypeScript compilation (usually from file `node_modules/typescript/lib/typescript.js`). The solution to this is the same, just provide the type argument explicitly.
### Searching by referenced entity fields[​](https://mikro-orm.io/docs/next/entity-manager#searching-by-referenced-entity-fields "Direct link to Searching by referenced entity fields")
You can also search by referenced entity properties. Simply pass nested where condition like this and all requested relationships will be automatically joined. Currently, it will only join them so you can search and sort by those. To populate entities, do not forget to pass the populate parameter as well.
```
// find author of a book that has tag specified by name  
const author = await em.findOne(Author, { books: { tags: { name: 'Tag name' } } });  
console.log(author.books.isInitialized()); // false, as it only works for query and sort  
  
const author = await em.findOne(Author, { books: { tags: { name: 'Tag name' } } }, { populate: ['books.tags'] });  
console.log(author.books.isInitialized()); // true, because it was populated  
console.log(author.books[0].tags.isInitialized()); // true, because it was populated  
console.log(author.books[0].tags[0].isInitialized()); // true, because it was populated  
```
> This feature is fully available only for SQL drivers. In MongoDB you always need to query from the owning side - so in the example above, first load book tag by name, then associated book, then the author. Another option is to denormalize the schema.
### Partial loading[​](https://mikro-orm.io/docs/next/entity-manager#partial-loading "Direct link to Partial loading")
To fetch only some database columns, you can use the `fields` option:
```
const author = await em.findOne(Author, '...', {  
  fields: ['name', 'born'],  
});  
console.log(author.id); // PK is always selected  
console.log(author.name); // Jon Snow  
console.log(author.email); // undefined  
```
This works also for nested relations:
```
const author = await em.findOne(Author, '...', {  
  fields: ['name', 'books.title', 'books.author', 'books.price'],  
});  
```
Primary keys are always selected even if you omit them. On the other hand, you are responsible for selecting the foreign keys—if you omit such property, the relation might not be loaded properly. In the following example the books would not be linked the author, because you did not specify the `books.author` field to be loaded.
```
// this will load both author and book entities, but they won't be connected due to the missing FK in select  
const author = await em.findOne(Author, '...', {  
  fields: ['name', 'books.title', 'books.price'],  
});  
```
> The Same problem can occur in mongo with M:N collections—those are stored as array property on the owning entity, so you need to make sure to mark such properties too.
```
const author = await em.findOne(Author, '...', {  
  fields: ['name', 'books.title', 'books.author', 'books.price'],  
});  
```
Alternatively, you can use the `exclude` option, which will omit the provided properties and select everything else:
```
const author = await em.findOne(Author, '...', {  
  exclude: ['email', 'books.price'],  
  populate: ['books'], // unlike with `fields`, you need to explicitly populate the relation here  
});  
```
### Fetching Paginated Results[​](https://mikro-orm.io/docs/next/entity-manager#fetching-paginated-results "Direct link to Fetching Paginated Results")
If you are going to paginate your results, you can use `em.findAndCount()` that will return total count of entities before applying limit and offset.
```
const [authors, count] = await em.findAndCount(Author, { ... }, { limit: 10, offset: 50 });  
console.log(authors.length); // based on limit parameter, e.g. 10  
console.log(count); // total count, e.g. 1327  
```
### Cursor-based pagination[​](https://mikro-orm.io/docs/next/entity-manager#cursor-based-pagination "Direct link to Cursor-based pagination")
As an alternative to the offset based pagination with `limit` and `offset`, you can paginate based on a cursor. A cursor is an opaque string that defines specific place in ordered entity graph. You can use `em.findByCursor()` to access those options. Under the hood, it will call `em.find()` and `em.count()` just like the `em.findAndCount()` method, but will use the cursor options instead.
Supports `before`, `after`, `first` and `last` options while disallowing `limit` and `offset`. Explicit `orderBy` option is required. It also supports the `includeCount` (default to true) option. When explicitly set to false, entity manager will perform a `find` instead of `findAndCount`. The cursor `totalCount` will be set to null instead. This can be used as a performance optimization to avoid an expensive SQL count query, when knowing the exact number of pages is not important.
Use `first` and `after` for forward pagination, or `last` and `before` for backward pagination.
  * `first` and `last` are numbers and serve as an alternative to `offset`, those options are mutually exclusive, use only one at a time
  * `before` and `after` specify the previous cursor value, it can be one of the:
    * `Cursor` instance
    * opaque string provided by `startCursor/endCursor` properties
    * POJO/entity instance
```
const currentCursor = await em.findByCursor(User, {  
  first: 10,  
  after: previousCursor, // cursor instance  
  orderBy: { id: 'desc' },  
});  
  
// to fetch next page  
const nextCursor = await em.findByCursor(User, {  
  first: 10,  
  after: currentCursor.endCursor, // opaque string  
  orderBy: { id: 'desc' },  
});  
  
// to fetch next page  
const nextCursor2 = await em.findByCursor(User, {  
  first: 10,  
  after: { id: lastSeenId }, // entity-like POJO  
  orderBy: { id: 'desc' },  
});  
  
const currentCursorWithoutCount = await em.findByCursor(User, {  
  first: 10,  
  after: previousCursor, // cursor instance  
  orderBy: { id: 'desc' },  
  includeCount: false,  
});  
```
The `Cursor` object provides following interface:
```
Cursor<User> {  
  items: [  
    User { ... },  
    User { ... },  
    User { ... },  
    ...  
  ],  
  totalCount: 50, // not defined when `includeCount` is set to false  
  length: 10,  
  startCursor: 'WzRd',  
  endCursor: 'WzZd',  
  hasPrevPage: true,  
  hasNextPage: true,  
}  
```
### Streaming[​](https://mikro-orm.io/docs/next/entity-manager#streaming "Direct link to Streaming")
If you want to process large amount of entities without loading them all into memory at once, you can use `em.stream()` method. It returns an async iterable, so you can use it in `for await ... of` loop.
```
const stream = em.stream(Book, {  
  populate: ['author'],  
  where: { price: { $gt: 100 } },  
  orderBy: { id: 'ASC' },  
});  
  
for await (const book of stream) {  
  console.log(book.title);  
  console.log(book.author.name);  
}  
```
There are several constraints when using streaming:
  * Returned entities are not managed. Identity holds only for the returned entity graph.
  * Joined strategy is enforced for all populated relations.
  * When populating to-many relations, only fully hydrated entities will be returned.
  * You should provide an `orderBy` clause to ensure consistent ordering.
  * With mongodb driver, only root entities can be streamed, `populate` option is ignored.
To stream results row-by-row, use `mergeResults: false` option. In this mode, if you populate to-many relations, you will get duplicated root entities, one per each row (due to the cartesian product caused by the to-many join).
```
const stream = em.stream(Book, {  
  populate: ['author'],  
  where: { price: { $gt: 100 } },  
  orderBy: { id: 'ASC' },  
  mergeResults: false,  
});  
```
To stream raw results, use `QueryBuilder.stream()` or `driver.stream()` methods directly. Read more about this in the [Streaming guide](https://mikro-orm.io/docs/next/streaming).
### Handling Not Found Entities[​](https://mikro-orm.io/docs/next/entity-manager#handling-not-found-entities "Direct link to Handling Not Found Entities")
When you call `em.findOne()` and no entity is found based on your criteria, `null` will be returned. If you rather have an `Error` instance thrown, you can use `em.findOneOrFail()`:
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
  console.error(e); // your custom error  
}  
```
### Using custom SQL fragments[​](https://mikro-orm.io/docs/next/entity-manager#using-custom-sql-fragments "Direct link to Using custom SQL fragments")
Any SQL fragment in your `WHERE` query or `ORDER BY` clause need to be wrapped with `raw()` or `sql`:
```
const users = await em.find(User, { [sql`lower(email)`]: 'foo@bar.baz' }, {  
  orderBy: { [sql`(point(loc_latitude, loc_longitude) <@> point(0, 0))`]: 'ASC' },  
});  
```
This will produce following query:
```
select `e0`.*  
from `user` as `e0`  
where lower(email) = 'foo@bar.baz'  
order by (point(loc_latitude, loc_longitude) <@> point(0, 0)) asc  
```
Read more about this in [Using raw SQL query fragments](https://mikro-orm.io/docs/next/raw-queries) section.
### Counting by group[​](https://mikro-orm.io/docs/next/entity-manager#counting-by-group "Direct link to Counting by group")
Use `em.countBy()` to count entities grouped by one or more properties. Instead of N individual count queries, it issues a single `GROUP BY` query on SQL drivers and an aggregation pipeline on MongoDB:
```
// Count books per author  
const counts = await em.countBy(Book, 'author');  
// { '1': 2, '2': 1, '3': 3 }  
  
// Count with a filter  
const counts = await em.countBy(Book, 'author', { where: { active: true } });  
// { '1': 1, '3': 2 }  
  
// Composite groupBy — keys joined with ~~~  
const counts = await em.countBy(Order, ['status', 'country']);  
// { 'pending~~~US': 5, 'shipped~~~DE': 3 }  
```
The same method is available on the repository:
```
const counts = await em.getRepository(Book).countBy('author');  
```
### Query Options[​](https://mikro-orm.io/docs/next/entity-manager#query-options "Direct link to Query Options")
The `em.find()` and `em.count()` methods accept several driver-specific query options:
#### Collation[​](https://mikro-orm.io/docs/next/entity-manager#collation "Direct link to Collation")
Controls string comparison rules. The `collation` option accepts different types depending on the driver:
  * **SQL drivers** : Pass a collation name **string**. It will be applied as `COLLATE` to **every** column in the `ORDER BY` clause. Passing a `CollationOptions` object to a SQL driver will throw an error.
  * **MongoDB** : Pass a `CollationOptions` **object**. Passing a string to MongoDB will throw an error.
```
// SQL: applies COLLATE to ORDER BY  
const users = await em.find(User, {}, {  
  collation: 'utf8mb4_general_ci',  
  orderBy: { name: 'asc' },  
});  
// produces: ... ORDER BY `name` COLLATE `utf8mb4_general_ci` ASC  
  
// MongoDB: structured collation object  
const users = await em.find(User, {}, {  
  collation: { locale: 'en', strength: 2 },  
  orderBy: { name: QueryOrder.ASC },  
});  
```
To use collation in `WHERE` conditions (SQL only), use raw SQL fragments:
```
const users = await em.find(User, {  
  [sql`name collate utf8mb4_general_ci`]: 'john',  
});  
// produces: ... WHERE name collate `utf8mb4_general_ci` = 'john'  
```
For MongoDB, the `collation` option applies to the entire query (both filtering and sorting), which is the native MongoDB behavior.
#### Index Hints[​](https://mikro-orm.io/docs/next/entity-manager#index-hints "Direct link to Index Hints")
For SQL, pass a string to append to the `FROM` clause. For MongoDB, pass a string (index name) or object (index spec) as a `hint` to the native driver.
```
// SQL  
const users = await em.find(User, {}, {  
  indexHint: 'force index(my_index)',  
});  
  
// MongoDB  
const users = await em.find(User, {}, {  
  indexHint: 'name_1', // or { name: 1 }  
});  
```
#### Named Index Hints via `using`[​](https://mikro-orm.io/docs/next/entity-manager#named-index-hints-via-using "Direct link to named-index-hints-via-using")
The `using` option is a higher-level alternative to `indexHint`. You pass the **name** of a declared index and MikroORM does three things:
  1. Validates that the index exists on the entity.
  2. Validates that every property used in `where` / `orderBy` is covered by that index — typos and accidentally-unindexed queries become compile-time and runtime errors instead of silent table scans.
  3. Emits the driver-specific SQL hint for you (`USE INDEX (...)` on MySQL/MariaDB, `WITH (INDEX(...))` on MSSQL, `hint` option on MongoDB, validation-only on PostgreSQL / SQLite / libSQL).
```
// single index  
const users = await em.find(User, { name: 'foo' }, {  
  using: 'idx_user_name',  
});  
  
// multiple indexes — where/orderBy may use the union of their covered properties  
const users = await em.find(User, { name: 'foo', email: 'bar@x' }, {  
  using: ['idx_user_name', 'uniq_user_email'],  
});  
```
The option works on every read method: `find`, `findOne`, `findOneOrFail`, `findAndCount`, `findAll`, `findByCursor`, `stream`, and the matching `EntityRepository` methods.
For type-safe `using`, declare the available indexes on the entity — see [Query-time index hints](https://mikro-orm.io/docs/next/indexes#query-time-index-hints-using) on the indexes page.
`using` and `indexHint` can be used together: when both are set, `indexHint` wins and emits its raw string verbatim. `using` still validates `where` / `orderBy` against the named index, which is useful if you want the runtime check but need to spell out a non-standard hint manually:
```
await em.find(User, { name: 'foo' }, {  
  using: 'idx_user_name',                        // validation only  
  indexHint: 'force index for join (idx_user_name)', // emitted as-is  
});  
```
If the named index does not exist, or `where` / `orderBy` references a property the index doesn't cover, MikroORM throws a clear error listing the available indexes and the offending property.
MongoDB accepts only a single index per query — passing an array throws. For SQLite / libSQL the option is validation-only (the engines don't expose a public way to force an index from a `SELECT` statement).
#### MongoDB-only Options[​](https://mikro-orm.io/docs/next/entity-manager#mongodb-only-options "Direct link to MongoDB-only Options")
```
const users = await em.find(User, {}, {  
  maxTimeMS: 5000,     // query timeout in milliseconds  
  allowDiskUse: true,  // allow disk use for large sorts  
});  
```
#### Union Where (SQL only)[​](https://mikro-orm.io/docs/next/entity-manager#union-where-sql-only "Direct link to Union Where \(SQL only\)")
The `unionWhere` option provides an index-friendly alternative to `$or`. Instead of a single query with `OR` conditions (which can prevent index usage), it generates a `UNION ALL` subquery where each branch can independently use its own index.
```
// Instead of: { $or: [{ name: 'Alice' }, { email: 'bob@test.com' }] }  
// Use unionWhere for better index utilization:  
const users = await em.find(User, {}, {  
  unionWhere: [  
    { name: 'Alice' },  
    { email: 'bob@test.com' },  
  ],  
});  
```
This generates SQL like:
```
SELECT ... FROM `user` WHERE `id` IN (  
  (SELECT `id` FROM `user` WHERE `name` = 'Alice')  
  UNION ALL  
  (SELECT `id` FROM `user` WHERE `email` = 'bob@test.com')  
)  
```
You can use `unionWhereStrategy: 'union'` to deduplicate rows between branches at the database level. This adds a sort+dedup step, so it's only worth it when branch overlap is very high and the total row count is large:
```
const users = await em.find(User, {}, {  
  unionWhere: [  
    { name: 'Alice' },  
    { email: 'bob@test.com' },  
  ],  
  unionWhereStrategy: 'union',  
});  
```
`unionWhere` also works with `nativeUpdate` and `nativeDelete`:
```
// Update only users matching union branches  
await em.nativeUpdate(User, {}, { active: false }, {  
  unionWhere: [  
    { lastLogin: { $lt: oneYearAgo } },  
    { banned: true },  
  ],  
});  
  
// Delete only users matching union branches  
await em.nativeDelete(User, {}, {  
  unionWhere: [  
    { expired: true },  
    { email: { $like: '%@spam.com' } },  
  ],  
});  
```
Each branch in `unionWhere` is processed independently, so relation conditions and entity filters are applied within each branch's subquery.
> `unionWhere` is only supported on SQL drivers and will throw an error if used with MongoDB.
## Updating references (not loaded entities)[​](https://mikro-orm.io/docs/next/entity-manager#updating-references-not-loaded-entities "Direct link to Updating references \(not loaded entities\)")
You can update references via Unit of Work, just like if it was a loaded entity. This way it is possible to issue update queries without loading the entity.
```
const ref = em.getReference(Author, 123);  
ref.name = 'new name';  
ref.email = 'new email';  
await em.flush();  
```
This is a rough equivalent to calling `em.nativeUpdate()`, with one significant difference - it uses the flush operation which handles event execution, so all life cycle hooks as well as flush events will be fired.
## Atomic updates via `raw()` helper[​](https://mikro-orm.io/docs/next/entity-manager#atomic-updates-via-raw-helper "Direct link to atomic-updates-via-raw-helper")
When you want to issue an atomic update query via flush, you can use the static `raw()` helper:
```
const ref = em.getReference(Author, 123);  
ref.age = raw<number>(`age * 2`);  
  
await em.flush();  
console.log(ref.age); // real value is available after flush  
```
The `raw()` helper accepts a generic type parameter that specifies the return type. When assigning directly to entity properties, use `raw<T>()` where `T` matches the property type:
```
// Direct property assignment requires explicit type  
author.age = raw<number>(`age + 1`);  
author.name = raw<string>(`upper(name)`);  
book.price = raw<number>(`price * 1.1`);  
```
When using `em.create()`, `em.assign()`, or similar methods, the type parameter is not required as `RawQueryFragment` is accepted in entity data types:
```
// No explicit type needed with em.create/em.assign  
em.assign(author, { age: raw(`age + 1`) });  
const book = em.create(Book, { price: raw(`price * 1.1`) });  
```
The `raw()` helper returns special raw query fragment object. It disallows serialization (via `toJSON`) as well as working with the value (via [`valueOf()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/valueOf)). Only single use of this value is allowed, if you try to reassign it to another entity, an error will be thrown to protect you from mistakes like this:
```
order.number = raw<number>(`(select max(num) + 1 from orders)`);  
user.lastOrderNumber = order.number; // throws, it could resolve to a different value  
JSON.stringify(order); // throws, raw value cannot be serialized  
```
## Upsert[​](https://mikro-orm.io/docs/next/entity-manager#upsert "Direct link to Upsert")
You can use `em.upsert()` to create or update the entity, based on whether it is already present in the database. This method performs an `insert on conflict merge` query ensuring the database is in sync, returning a managed entity instance. The method accepts either `entityName` together with the entity `data`, or just entity instance.
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
You can also use detached entity instance, after the `em.upsert()` call it will become managed.
```
const author = em.create(Author, { email: 'foo@bar.com', age: 33 });  
await em.upsert(author);  
```
There is also `em.upsertMany()` with similar signature:
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
  * `onConflictWhere?: FilterQuery<T>` to allow conditional updates
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
The `onConflictWhere` option allows you to add a WHERE clause to the conflict target, enabling conditional updates based on existing data. This is useful for scenarios like optimistic locking or version-based updates where you only want to update if certain conditions are met.
```
await em.upsert(Document, {  
  name: 'doc1',  
  version: 2,  
  content: 'updated content',  
}, {  
  onConflictFields: ['name'],  
  onConflictWhere: { version: { $lt: 2 } },  
});  
```
## Cloning entities[​](https://mikro-orm.io/docs/next/entity-manager#cloning-entities "Direct link to Cloning entities")
`em.clone()` copies rows at the database level via `INSERT ... SELECT`, without round-tripping the data through Node.js. It returns a hydrated entity that is already registered in the identity map.
```
// clone(EntityClass, where, overrides?, options?)  
const cloned = await em.clone(Author, { id: 1 }, { email: 'new@email.com' });  
  
// clone(entity, overrides?, options?)  
const author = await em.findOneOrFail(Author, 1);  
const cloned = await em.clone(author, { email: 'new@email.com' });  
  
// pure clone (no overrides) — all non-PK fields are copied  
const cloned = await em.clone(Author, { id: 1 });  
```
The `where` argument is a regular `FilterQuery<T>` — the same shape `em.find()` accepts. When you pass an entity instance instead of an entity class, the entity's primary key is used as the where clause automatically.
The `overrides` argument is an `EntityData<T>` partial used to replace selected columns in the cloned row. It is typically used to satisfy unique constraints (e.g. a unique `email`) or to mark the clone with a new value:
```
const cloned = await em.clone(  
  Author,  
  { id: 1 },  
  { email: 'cloned@example.com', age: 99 },  
);  
```
What gets cloned:
  * Auto-increment primary keys are excluded — the database assigns a new PK to the cloned row.
  * Embedded properties are copied (they live on the same row).
  * M:1 foreign keys are preserved (both rows point at the same parent).
  * Version properties are reset to their initial value.
  * Generated / `persist: false` / formula columns are excluded.
  * M:N and 1:M relations are **not** cloned — pivot rows and inverse side rows stay attached to the original entity. If you need them, follow up with explicit `em.persist()` calls.
Cloning works across single-table-inheritance and table-per-type (TPT) inheritance — for TPT, MikroORM emits one `INSERT ... SELECT` per ancestor table so the full row is reconstructed in every table.
All SQL drivers (SQLite, libSQL, PostgreSQL, MySQL, MariaDB, MSSQL) execute a server-side `INSERT ... SELECT`. MongoDB falls back to a `find` + `insertOne` round-trip with the same end shape.
> For the lower-level building block, see [`qb.insertFrom()`](https://mikro-orm.io/docs/next/query-builder#insert-from-select-insertfrom) in the Query Builder — it generates the raw `INSERT ... SELECT` statement that `em.clone()` builds on top of.
## Refreshing entity state[​](https://mikro-orm.io/docs/next/entity-manager#refreshing-entity-state "Direct link to Refreshing entity state")
You can use `em.refresh(entity)` to synchronize the entity state with database. This is a shortcut for calling `em.findOne()` with `refresh: true` and disabled auto-flush.
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
## Batch inserts, updates and deletes[​](https://mikro-orm.io/docs/next/entity-manager#batch-inserts-updates-and-deletes "Direct link to Batch inserts, updates and deletes")
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
## Disabling identity map and change set tracking[​](https://mikro-orm.io/docs/next/entity-manager#disabling-identity-map-and-change-set-tracking "Direct link to Disabling identity map and change set tracking")
Sometimes you might want to disable identity map and change set tracking for some query. This is possible via `disableIdentityMap` option. Behind the scenes, it will create new context, load the entities inside that, and clear it afterwards, so the main identity map will stay clean.
> As opposed to _managed_ entities, such entities are called _detached_. To be able to work with them, you first need to merge them via `em.merge()`.
```
const users = await em.find(User, { email: 'foo@bar.baz' }, {  
  disableIdentityMap: true,  
  populate: ['cars.brand'],  
});  
users[0].name = 'changed';  
await em.flush(); // calling flush have no effect, as the entity is not managed  
```
> Keep in mind that this can also have [negative effect on the performance](https://stackoverflow.com/questions/9259480/entity-framework-mergeoption-notracking-bad-performance).
## Entity Repositories[​](https://mikro-orm.io/docs/next/entity-manager#entity-repositories "Direct link to Entity Repositories")
Although you can use `EntityManager` directly, a more convenient way is to use [`EntityRepository` instead](https://mikro-orm.io/repositories/). You can register your repositories in dependency injection container like [InversifyJS](http://inversify.io/) so you do not need to get them from `EntityManager` each time.
For more examples, take a look at [`tests/EntityManager.mongo.test.ts`](https://github.com/mikro-orm/mikro-orm/blob/master/tests/EntityManager.mongo.test.ts) or [`tests/EntityManager.mysql.test.ts`](https://github.com/mikro-orm/mikro-orm/blob/master/tests/EntityManager.mysql.test.ts).
## Custom Property Ordering[​](https://mikro-orm.io/docs/next/entity-manager#custom-property-ordering "Direct link to Custom Property Ordering")
Entity properties provide some support for custom ordering via the `customOrder` attribute. This is useful for values that have a natural order that doesn't align with their underlying data representation. Consider the code below, the natural sorting order would be `high`, `low`, `medium`. However, you can provide the `customOrder` to indicate how the enum values should be sorted.
```
enum Priority {  
  Low = 'low',  
  Medium = 'medium',  
  High = 'high',  
}  
  
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
  
em.create(Task, { label: 'A', priority: Priority.Low }),  
em.create(Task, { label: 'B', priority: Priority.Medium }),  
em.create(Task, { label: 'C', priority: Priority.High })  
await em.flush();  
  
const tasks = await em.find(Task, {}, { orderBy: { priority: QueryOrder.ASC } });  
for (const t of tasks) {  
  console.log(t.label);  
}  
// Logs A, B, C  
```
## Extending `EntityManager`[​](https://mikro-orm.io/docs/next/entity-manager#extending-entitymanager "Direct link to extending-entitymanager")
To extend the EntityManager with your own custom methods, you can use the `entityManager` ORM option:
```
import { MikroORM, EntityManager } from '@mikro-orm/sqlite';  
  
class MyEntityManager extends EntityManager {  
  
  myCustomMethod(base: number): number {  
    return base * Math.random();  
  }  
  
}  
  
const orm = await MikroORM.init({  
  entities: [...],  
  dbName: ':memory:',  
  entityManager: MyEntityManager,  
});  
console.log(orm.em instanceof MyEntityManager); // true  
const res = orm.em.myCustomMethod(123);  
```
[](https://github.com/mikro-orm/mikro-orm/edit/master/docs/docs/entity-manager.md)
Last updated on **May 20, 2026** by **Martin Adámek**
[Previous Architecture](https://mikro-orm.io/docs/next/architecture)[Next Unit of Work](https://mikro-orm.io/docs/next/unit-of-work)
  * [Persist and Flush](https://mikro-orm.io/docs/next/entity-manager#persist-and-flush)
  * [Persisting and Cascading](https://mikro-orm.io/docs/next/entity-manager#persisting-and-cascading)
  * [Entity references](https://mikro-orm.io/docs/next/entity-manager#entity-references)
  * [Entity state and `WrappedEntity`](https://mikro-orm.io/docs/next/entity-manager#entity-state-and-wrappedentity)
  * [Removing entities](https://mikro-orm.io/docs/next/entity-manager#removing-entities)
  * [Fetching Entities with EntityManager](https://mikro-orm.io/docs/next/entity-manager#fetching-entities-with-entitymanager)
    * [Conditions Object (`FilterQuery<T>`)](https://mikro-orm.io/docs/next/entity-manager#conditions-object-filterqueryt)
    * [Searching by referenced entity fields](https://mikro-orm.io/docs/next/entity-manager#searching-by-referenced-entity-fields)
    * [Partial loading](https://mikro-orm.io/docs/next/entity-manager#partial-loading)
    * [Fetching Paginated Results](https://mikro-orm.io/docs/next/entity-manager#fetching-paginated-results)
    * [Cursor-based pagination](https://mikro-orm.io/docs/next/entity-manager#cursor-based-pagination)
    * [Streaming](https://mikro-orm.io/docs/next/entity-manager#streaming)
    * [Handling Not Found Entities](https://mikro-orm.io/docs/next/entity-manager#handling-not-found-entities)
    * [Using custom SQL fragments](https://mikro-orm.io/docs/next/entity-manager#using-custom-sql-fragments)
    * [Counting by group](https://mikro-orm.io/docs/next/entity-manager#counting-by-group)
    * [Query Options](https://mikro-orm.io/docs/next/entity-manager#query-options)
  * [Updating references (not loaded entities)](https://mikro-orm.io/docs/next/entity-manager#updating-references-not-loaded-entities)
  * [Atomic updates via `raw()` helper](https://mikro-orm.io/docs/next/entity-manager#atomic-updates-via-raw-helper)
  * [Upsert](https://mikro-orm.io/docs/next/entity-manager#upsert)
  * [Cloning entities](https://mikro-orm.io/docs/next/entity-manager#cloning-entities)
  * [Refreshing entity state](https://mikro-orm.io/docs/next/entity-manager#refreshing-entity-state)
  * [Batch inserts, updates and deletes](https://mikro-orm.io/docs/next/entity-manager#batch-inserts-updates-and-deletes)
  * [Disabling identity map and change set tracking](https://mikro-orm.io/docs/next/entity-manager#disabling-identity-map-and-change-set-tracking)
  * [Entity Repositories](https://mikro-orm.io/docs/next/entity-manager#entity-repositories)
  * [Custom Property Ordering](https://mikro-orm.io/docs/next/entity-manager#custom-property-ordering)
  * [Extending `EntityManager`](https://mikro-orm.io/docs/next/entity-manager#extending-entitymanager)
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
