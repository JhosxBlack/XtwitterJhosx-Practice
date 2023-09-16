'use client'

import { Card, CardHeader, CardBody, CardFooter, Avatar, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from '@nextui-org/react'
import Link from 'next/link'
import { IconMessageCircle, IconHeart, IconRepeat } from '@tabler/icons-react'

export default function PostCard ({
  userFullName,
  userName,
  avatarUrl,
  content
}: {
  userFullName: string
  userName: string
  avatarUrl: string
  content: string
}) {
  return (
    <Card className="bg-transparent shadow-none hover:bg-slate-800 transition border-b rounded-none border-white/20 cursor-pointer">

      <CardHeader className="justify-between">
        <div className="flex gap-3">
          <Link href={`${avatarUrl}`} target={'_blank'}>
            <Avatar radius="full" size="md" src={avatarUrl} />
          </Link>
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">{userFullName}</h4>
            <h5 className="text-small tracking-tight text-default-400">@{userName}</h5>
          </div>
        </div>

        <div className="relative flex justify-end items-center gap-2">
          <Dropdown>
            <DropdownTrigger>
              <Button isIconOnly size="sm" variant="light" radius='lg'>
                <svg xmlns="http://www.w3.org/2000/svg" className="text-default-600 icon icon-tabler icon-tabler-dots" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M5 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
                  <path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
                  <path d="M19 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
                </svg>
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              <DropdownItem key="edit" className='text-white'>Edit post</DropdownItem>
              <DropdownItem key="delete" className="text-danger" color="danger">
                Delete post
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </CardHeader>

      <CardBody className="px-3 py-0 text-xs text-white">
        <p>
          {content}
        </p>
      </CardBody>

      <CardFooter className="gap-3">
        <button>
            <IconMessageCircle className='w-4 h-4'/>
        </button>
        <button>
            <IconHeart className='w-4 h-4'/>
        </button>
        <button>
            <IconRepeat className='w-4 h-4'/>
        </button>
      </CardFooter>
    </Card>
  )
}
