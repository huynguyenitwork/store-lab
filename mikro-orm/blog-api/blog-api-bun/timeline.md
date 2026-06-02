
### thêm phụ thuộc

```bash
bun add @mikro-orm/core @mikro-orm/sqlite fastify
```
### và phụ thuộc phát triển
```bash
bun add --dev @mikro-orm/cli typescript tsx @types/node vitest
```

### chạy
tham khảo: https://mikro-orm.io/docs/usage-with-sqlite#using-better-sqlite3
#### với better-sqlite3

* cài build c++ và node-gyp nếu dùng với better-sqlite3 run với npm thay vì bun (không hỗ trợ)
```bash
bun add @mikro-orm/sqlite
npx tsx mikro-orm.config.ts hoặc npm start
```
#### với node:sqlite
```bash
bun add @mikro-orm/sql kysely
npx tsx mikro-orm.config.ts hoặc node mikro-orm.config.ts
```