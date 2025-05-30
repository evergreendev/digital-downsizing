'use client'
import React, { useEffect, useState } from 'react'

import type { Header, Media } from '@/payload-types'

import { HeaderNav } from './Nav'
import { MobileNav } from '@/Header/Nav/MobileNav'
import { Menu, XCircle } from 'lucide-react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

interface HeaderClientProps {
  header: Header
  logo: Media
  lightLogo?: Media
  centerNav: boolean
  children?: React.ReactNode
}

export const HeaderClient: React.FC<HeaderClientProps> = ({
  header,
  logo,
  centerNav,
  children,
}) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme] = useState<string | null>(null)
  const [mobileNavIsOpen, setMobileNavIsOpen] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)
  const handleScroll = () => {
    if (window.scrollY > 0) {
      setHasScrolled(true)
    } else {
      setHasScrolled(false)
    }
  }
  const pathname = usePathname()

  useEffect(() => {
    setMobileNavIsOpen(false)
  }, [pathname])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <div className="bg-brand-neutral-800 text-white">
        <div className="text-brand-accent-600 p-2 flex gap-4 flex-wrap text-sm sm:text-base w-full items-center justify-center bg-brand-neutral-500">
          <a href="tel:605-431-1771">605-431-1771</a>
          <a href="https://www.google.com/maps/dir//2040+W+Main+St+Ste+309,+Rapid+City,+SD+57702/@44.081651,-103.2947869,17894m/data=!3m1!1e3!4m9!4m8!1m0!1m5!1m1!1s0x877d5cb2190fffff:0x67e74a5d150efa2f!2m2!1d-103.2535877!2d44.0815967!3e0!5m1!1e1?entry=ttu&g_ep=EgoyMDI1MDUyNy4wIKXMDSoASAFQAw%3D%3D">
            2040 W Main St Ste #309 Rapid City, SD 57702
          </a>
        </div>
        <div className="container flex flex-wrap justify-between py-1 items-center gap-3">
          <div className="flex flex-col gap-2">
            <Link href="/" className={`w-32 transition-all ${centerNav ? 'hidden' : ''}`}>
              <Image
                src={logo.url || ''}
                alt={logo?.alt || 'Logo'}
                width={200}
                height={200}
                priority
                className="h-auto"
              />
            </Link>
          </div>

          <div className="hidden sm:block">{children}</div>
          <header
            className={`hidden md:block sticky transition-colors top-0 z-50 ${!centerNav || hasScrolled ? 'bg-brand-neutral-700 text-white border-b border-blue-950' : ''}`}
            {...(theme ? { 'data-theme': theme } : {})}
          >
            <div className="container relative z-20 py-2 flex justify-between text-3xl ">
              <HeaderNav header={header} centerNav={centerNav} />
            </div>
          </header>
        </div>
      </div>

      <header className={`md:hidden`}>
        <button
          onClick={() => setMobileNavIsOpen(!mobileNavIsOpen)}
          className="fixed z-50 top-4 right-4 bg-white/60 rounded text-brand-primary-500"
        >
          {mobileNavIsOpen ? (
            <XCircle size="34" className="text-brand-primary-500" />
          ) : (
            <Menu size="34" className="text-brand-primary-500" />
          )}
        </button>
        <div
          className={`fixed transition-transform inset-0 bg-brand-neutral-700 z-40 bg-opacity-95 ${mobileNavIsOpen ? '' : '-translate-x-full'}`}
        >
          <MobileNav header={header} />
        </div>
      </header>
    </>
  )
}
