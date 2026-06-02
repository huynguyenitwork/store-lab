import { defineEntity, type InferEntity, p } from '@mikro-orm/core';
import { MikroORM, SqliteDriver, NodeSqliteDialect } from '@mikro-orm/sql';
// define your entity
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
// config + init MikroORM

const orm = await MikroORM.init({
  driver: SqliteDriver,
  entities: [UserSchema],
  dbName: 'sqlite.sqlite3',
  driverOptions: new NodeSqliteDialect('sqlite.sqlite3'),
});

// recreate the database schema
await orm.schema.refresh();
// fork first to have a separate context
const em = orm.em.fork();

// create and persist the user in the forked context
const user = em.create(UserSchema, {
  email: 'foo@bar.com',
  fullName: 'Foo Bar',
  password: '123456',
});
await em.flush();



// after the entity is flushed, it becomes managed, and has the PK available
console.log('user id is:', user.id);