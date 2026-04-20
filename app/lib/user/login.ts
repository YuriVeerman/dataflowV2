'use server';

import { createClient } from "@/app/lib/supabase/server"
import { redirect } from 'next/navigation'

export async function loginActions(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect('/login?error=' + error.message)
  }

  redirect('/spaces')
}