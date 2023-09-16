'use client'

import { addPost } from '../actions/add-post-action'
import { useEffect, useRef, useState } from 'react'
import { ComposePostButtonP } from './compose-post-buttonp'

export function ComposePost ({
  userName,
  userAvatarUrl
}: {
  userName: string
  userAvatarUrl: string
}) {
  const formRef = useRef<HTMLFormElement>(null)

  // Para habilitar el boton Postear si no está vacio
  const [isTextareaEmpty, setIsTextareaEmpty] = useState(true)
  // Para aumentar el tamaño del cuadro de text
  const [textAreaSize, setTextAreaSize] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Evento que se ejecutará cuando el usuarió esté escribiendo
  const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    // utilizar el método trim() para eliminar los espacios en blanco al inicio y al final del texto
    // luego verificar si el resultado es una cadena vacía.
    const value = event.target.value.trim()
    setIsTextareaEmpty(value === '')
    setTextAreaSize(event.target.value)
  }

  useEffect(() => {
    if (textareaRef.current != null) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'
    }
  }, [textAreaSize])

  // Para resetear el form:
  // ref={formRef} action={async (formData) => {
  //    await addPost(formData)
  //    formRef.current?.reset()
  //  }}
  return (
    <form
      ref={formRef}
      action={async (formData) => {
        await addPost(formData)
        formRef.current?.reset()

        // Una vez se hace reset esto es para volver el boton post disable
        setIsTextareaEmpty(true)
      }}
      className='flex flex-row p-3 border-b border-white/20'
    >

      <img className='rounded-full w-10 h-10 object-contain mr-4' src={userAvatarUrl} alt={userName}/>

      <div className='flex flex-1 flex-col gap-y-4'>
        <textarea
          ref={textareaRef}
          name='content'
          rows={4}
          style={{ resize: 'none', height: '100%' }}
          className='w-full text-xl bg-black placeholder-gray-500 text-white p-2'
          placeholder='¡¿Qué está pasando!?'
          onChange={handleTextareaChange}
        >
        </textarea>
        <ComposePostButtonP buttonPending={isTextareaEmpty}/>
      </div>
    </form>
  )
}
