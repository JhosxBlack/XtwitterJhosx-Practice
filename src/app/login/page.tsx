import { AuthButtonServer } from '@/app/components/auth-button-server' // <--- '../components/auth-button-server'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { type Database } from '../types/database'
import { redirect } from 'next/navigation'

export default async function Login () {
  const supabase = createServerComponentClient<Database>({ cookies })

  const { data: { session } } = await supabase.auth.getSession()

  if (session !== null) {
    redirect('/')
  }

  return (
    <section className="grid place-content-center min-h-screen">
      <h1 className='text-xl fond-bold mb-4 text-white'>Inicia sesión en TwitterJhosx</h1>
      <AuthButtonServer/>
    </section>
  )
}
