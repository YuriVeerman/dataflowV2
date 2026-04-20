// app/ui/user/registerActions.ts
"use server";

import { createClient } from "@/app/lib/supabase/server"
import { redirect } from 'next/navigation'

export async function registerActions(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  // Supabase signUp will send a confirmation email by default
  const { error } = await supabase.auth.signUp(data)

  if (error) {
    redirect('/Register?error=' + error.message)
  }

  // After successful registration, you can redirect to a "check your email" page
  // or back to login.
  redirect('/login?message=Check your email to confirm registration')
}