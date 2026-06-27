## kịch bản
### 1. tạo dự án
```bash
pnpm create vite login-ui --template react-ts
```
### 2. nếu chưa install thư viện
```bash
cd login-ui
pnpm install
```
### 3. cài tailwind v4
```bash
pnpm add tailwindcss @tailwindcss/vite
```
### 4. cài shadcn
#### cấu hình trước khởi tạo
  * tham khảo tùy chọn preset: https://ui.shadcn.com/create
  * cấu hình `import-aliases`: https://ui.shadcn.com/docs/installation/manual#configure-import-aliases
#### khởi tạo
```bash
pnpm dlx shadcn@latest init
```
#### cài component cần thiết
```bash
pnpm dlx shadcn@latest add button
pnpm dlx shadcn@latest add card
pnpm dlx shadcn@latest add input
pnpm dlx shadcn@latest add label
```
#### cấu hình aliases cho vite.config.ts dùng từ source of truth `tsconfig`
```ts
resolve: {
  // Vite 8 tự động đồng bộ path từ tsconfig sang, cực kỳ mượt mà
  tsconfigPaths: true 
}
```
### cài form
```bash
pnpm add react-hook-form zod @hookform/resolvers
```
* App.tsx
```ts
import { LoginPage } from "./pages/login-page";

export default function App() {
  return <LoginPage />;
}
```
* src/pages/login-page.tsx
```ts
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const schema = z.object({
  email: z.email(),
  password: z.string().min(6),
});

type FormData = z.infer<typeof schema>;

export function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30">
      <Card className="w-full max-w-md">
        <CardContent className="space-y-6 p-6">
          <div>
            <h1 className="text-2xl font-semibold">
              Admin Login
            </h1>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <div>
              <Label>Email</Label>
              <Input
                {...register("email")}
                placeholder="admin@example.com"
              />
              <p className="text-sm text-red-500">
                {errors.email?.message}
              </p>
            </div>

            <div>
              <Label>Password</Label>
              <Input
                type="password"
                {...register("password")}
              />
              <p className="text-sm text-red-500">
                {errors.password?.message}
              </p>
            </div>

            <Button
              type="submit"
              className="w-full"
            >
              Sign In
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
```
### restart ts server intelligent import nếu cần thiết
* ctrl+shift+p 
  * typescript: restart ts server
  * typescript: open ts server log (kiểm tra lỗi)
### kiểm tra tsconfig
* có 2 bản tsconfig cho client và server cực kỳ lưu ý