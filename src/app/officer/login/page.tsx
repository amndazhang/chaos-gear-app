export default function LoginPage() {
  return (
    <div>
      <h1>Login Page</h1>
    </div>
  );
}


// 'use client'
// import { supabase } from '@/lib/supabaseClient'

// export default function Login() {
//   const signIn = async () => {
//     await supabase.auth.signInWithOAuth({
//       provider: 'google'
//     })
//   }

//   return (
//     <main>
//       <h1>CHAOS Gear Shed</h1>
//       <button onClick={signIn}>Sign in with CalNet</button>
//     </main>
//   )
// }
