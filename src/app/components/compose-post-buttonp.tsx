'use client'

import { experimental_useFormStatus as useFormStatus } from 'react-dom'
import { Button } from '@nextui-org/react'

// { buttonPending }: { buttonPending: boolean }
export function ComposePostButtonP ({ buttonPending }: { buttonPending: boolean }) {
  const { pending } = useFormStatus()

  return (
    <Button
        disabled={pending || buttonPending}
        isLoading={pending}
        type='submit'
        size="sm"
        style={ { backgroundColor: '#1D9BF0', minHeight: '36px' } }
        className='text-medium disabled:opacity-50 disabled:pointer-events-none font-bold rounded-full self-end text-white px-5 py-2'
    >
        {pending ? 'Posteando..' : ' Postear '}
    </Button>
  )
}
