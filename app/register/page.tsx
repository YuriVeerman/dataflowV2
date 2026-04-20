// app/register/page.tsx
import { registerActions } from "../lib/user/register";
import UserForm from "../ui/user/UserForm";
import { createClient } from "@/app/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function Page() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    return (
        <UserForm
            isLoggedIn={!!user}
            userEmail={user?.email}
            title="Create Account"
            subtitle="Join our workspace today"
            inputs={[
                { label: "Email Address", name: "email", type: "email", placeholder: "name@company.com", required: true },
                { label: "Password", name: "password", type: "password", placeholder: "••••••••", required: true }
            ]}
            action={registerActions}
            buttonLabel="Create Account"
            footerText="Already have an account?"
            footerLinkText="Log In"
            footerLinkHref="/login"
        />
    )
}
