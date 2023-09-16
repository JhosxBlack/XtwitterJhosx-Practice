'use server'

import { cookies } from 'next/headers'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { revalidatePath } from 'next/cache'

export const addPost = async (formData: FormData) => {
  // Obtener el contenido del formData (nombre ---> 'content')
  const content = formData.get('content')

  if (content === null) return
  if (content === '') return

  // Ahora creamos el cliente de supabase
  const supabase = createServerActionClient({ cookies })
  // Revisar si el usuario se encuentra realmente autenticado Auth
  const { data: { user } } = await supabase.auth.getUser()
  if (user === null) return

  // Tabla posts y pasamos el contenido y el user_id
  await supabase.from('posts').insert({ content, user_id: user.id })

  // Recargar y cambiar los componentes que si tienen algun cambio en la ruta '/' revalidatePath('/')
  revalidatePath('/')
}
