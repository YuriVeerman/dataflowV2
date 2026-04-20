// app/login/page.tsx
import { loginActions } from "../lib/user/login";
import UserForm from "../ui/user/UserForm";
import { createClient } from "@/app/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

    return (
        <UserForm
            isLoggedIn={!!user}
            userEmail={user?.email || ""}
            title="Welcome Back"
            subtitle="Please sign in to your account"
            inputs={[
                { label: "Email Address", name: "email", type: "email", placeholder: "you@example.com", required: true },
                { label: "Password", name: "password", type: "password", placeholder: "••••••••", required: true }
            ]}
            action={loginActions}
            buttonLabel="Sign In"
            footerText="Dont have an account?"
            footerLinkText="Register"
            footerLinkHref="/register"
        />
    )
}