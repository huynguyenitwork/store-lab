## cấu hình
### khởi tạo medusa với một db mới
* chạy lệnh
```bash
pnpm dlx create-medusa-app@2.15.3 --db-url "postgresql://neondb_owner:npg_flWHdC6ZM8NA@ep-floral-queen-aormxuwp-pooler.c-2.ap-southeast-1.aws.neon.tech/store-cloud?sslmode=require&channel_binding=require"
```
* tham khảo: https://humble-space-eureka-p7jg6744xqjvh6rg.github.dev

### thiết lập workspace cần cài
* file `pnpm-workspace.yaml`
```yaml
packages:
  - "apps/**"
  - "!apps/backend/.medusa/**"
```
### chọn approve-builds
| package               | vai trò                            | ảnh hưởng hiệu năng       |
| --------------------- | ---------------------------------- | ------------------------- |
| `@swc/core`           | transpiler rust thay babel/ts-node | rất cao                   |
| `sharp`               | xử lý ảnh                          | rất cao nếu có upload ảnh |
| `esbuild`             | bundler/transpiler cực nhanh       | cao                       |
| `unrs-resolver`       | module resolver rust               | trung bình                |
| `msgpackr-extract`    | serialization native               | thấp                      |
| `protobufjs`          | protobuf                           | thấp                      |
| `@medusajs/telemetry` | analytics                          | gần như không ảnh hưởng   |
```bash
pnpm approve-builds
```
* bắt buộc:
✔ @swc/core
✔ esbuild
✔ sharp
✔ unrs-resolver

### chạy kiểm tra dev
```bash
pnpm run dev
```
### migration dữ liệu
* tạo script lọc và gọi package @dtc/backend thực thi medusa cli
```json
pnpm --filter @dtc/backend exec medusa db:migrate
```
* chạy lệnh
```bash
pnpm run migrate
```

### tạo user admin mới
* tạo script khởi tạo user mới
```json
pnpm --filter @dtc/backend exec medusa user -e phuhuy.hnm@gmail.com -p Khong3119Nam
```
```bash
pnpm run create:user
```
### test backend dev
```bash
pnpm run backend:dev
```

## kiểm tra
### màn hình đăng nhập
* đường dẫn
```txt
https://ominous-computing-machine-xr594r77jqj6297w6-9000.app.github.dev/app/login
```
* page
```txt
https://ominous-computing-machine-xr594r77jqj6297w6-9000.app.github.dev/app/login
```
### test thành phần giao diện
* thiết lập pnpm toàn cục đặt cấu hình mặc định theo user (là tôi)
```bash
pnpm setup
source /home/codespace/.bashrc
```
* cài đặt playwright tối thiểu chạy test browser được
```bash
pnpm add -g playwright
playwright install --with-deps chromium
```
* kiểm tra danh sách cài đặt
```bash
pnpm list -g
```
### cài đặt task runner
```bash
npm install -g rust-just
```
