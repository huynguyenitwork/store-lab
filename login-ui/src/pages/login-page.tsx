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