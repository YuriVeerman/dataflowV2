// app/ui/user/logoutAction.ts
"use server";

import { createClient } from "@/app/lib/supabase/server";
import { redirect } from "next/navigation";

export async function logoutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}
