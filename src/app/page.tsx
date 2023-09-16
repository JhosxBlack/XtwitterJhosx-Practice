import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { AuthButtonServer } from '@/app/components/auth-button-server'
import { redirect } from 'next/navigation'
import { PostLists } from './components/post-list'
import { type Database } from './types/database'
import { ComposePost } from './components/compose-post'

export default async function Home () {
  const supabase = createServerComponentClient<Database>({ cookies })
  // podemos renombrar --> nombre: NombredelaTabla(CAMPOS QUE QUEREMOS)
  const { data } = await supabase
    .from('posts')
    .select('*, user: users(name, user_name, avatar_url)')
    .order('created_at', { ascending: false }) // ordenar del mas actual al mas viejo

  const posts =
    data?.map(post => ({
      ...post,
      user: Array.isArray(post.user) ? post.user[0] : post.user
    })) ?? []

  const { data: { session } } = await supabase.auth.getSession()

  if (session === null) {
    redirect('/login')
  }

  return (
    <main>
      <div>
        <section className='max-w-[600px] w-full mx-auto border-l border-r border-white/20 h-full'>
          <div className="flex flex-row items-center justify-between py-1 px-1">
            <h1 className="text-2xl font-bold text-white">Inicio</h1>
            <AuthButtonServer />
          </div>
        </section>
      </div>

      <div className="flex min-h-screen flex-col items-center justify-between">
        <section className='max-w-[600px] w-full mx-auto border-l border-r border-t border-white/20 h-full min-h-screen'>
          <div className="flex flex-row items-center justify-between py-1 px-1">
            <h2 className="text-lg font-bold text-white">Posts</h2>
          </div>
          <ComposePost userAvatarUrl={session.user?.user_metadata?.avatar_url} userName={session.user?.user_metadata?.user_name}/>
          <PostLists posts={ posts }/>
        </section>
      </div>
    </main>
  )
}
