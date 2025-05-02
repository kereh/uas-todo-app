import type React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { signIn } from "@/server/auth";
import { providerMap } from "@/server/auth/providers";

export default function LoginForm() {
  return (
    <Card className="w-full">
      <CardHeader className="space-y-1">
        <CardTitle className="text-center text-2xl font-bold">
          To-Do App
        </CardTitle>
        <CardDescription className="text-center">
          Silahkan login menggunakan provider yang anda inginkan
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {Object.values(providerMap).map((provider, i) => (
          <form
            key={i}
            action={async () => {
              "use server";
              try {
                await signIn(provider.id, {
                  redirectTo: "/",
                });
              } catch (error) {
                throw error;
              }
            }}
          >
            <Button
              variant="outline"
              className="flex w-full items-center justify-center gap-2 border-2 hover:border-indigo-600 hover:bg-indigo-100 hover:text-indigo-600"
            >
              <span>Login Dengan {provider.name}</span>
            </Button>
          </form>
        ))}
      </CardContent>
      <CardFooter className="flex flex-col">
        <p className="text-center text-sm text-gray-500">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </CardFooter>
    </Card>
  );
}
