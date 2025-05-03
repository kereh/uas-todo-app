import LoginForm from "@/components/login/login-form";
import { LoginFormMain } from "@/components/login/login-form-main";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <LoginFormMain />
      </div>
    </main>
  );
}
