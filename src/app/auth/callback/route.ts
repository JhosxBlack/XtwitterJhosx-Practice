import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { type NextRequest, NextResponse } from 'next/server'

// esto es una opción de Next.js, para evitar que cachee de forma
// estática la ruta, y que siempre se ejecute en el servidor
// export const dynamic = 'force-dynamic'

// Funcion GET <---
export async function GET (request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  // Comprobacion previa:
  if (code !== null) {
    const supabase = createRouteHandlerClient({ cookies })
    // Usando el codigo que le hemos pasado por URL
    // Nos devuelve la sesion del Usuario
    await supabase.auth.exchangeCodeForSession(code)
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(requestUrl.origin)
}
