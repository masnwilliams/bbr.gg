'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NavBar = () => {
  const pathname = usePathname()

  const navItems = [
    {
      href: '/',
      text: 'Home',
    },
    {
      href: '/servers',
      text: 'Servers',
    },
    {
      href: '/auth',
      text: 'Auth',
    },
  ]

  const linkClasses = (href: string) => {
    return pathname === href
      ? 'text-blue-500 hover:text-blue-700'
      : 'text-black hover:text-gray-500'
  }

  return (
    <div className={'flex justify-center my-10 gap-5'}>
      {navItems.map((item) => (
        <Link
          href={item.href}
          key={item.href}
          className={`${linkClasses(item.href)} font-bold text-xl`}
        >
          {item.text}
        </Link>
      ))}
    </div>
  )
}

export default NavBar
