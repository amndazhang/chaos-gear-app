'use client'
import { supabase } from '@/lib/supabaseClient'

export default function Login() {
  const signIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google'
    })
  }

  return (
    <main>
      <h1>CHAOS Gear Shed</h1>
      <button onClick={signIn}>Sign in with CalNet</button>
    </main>
  )
}
