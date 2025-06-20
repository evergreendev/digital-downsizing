import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

import type { Footer, SiteOption } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import RichText from '@/components/RichText'

export async function Footer() {
  const footer: Footer = await getCachedGlobal('footer', 1)()
  const siteOptions: SiteOption = (await getCachedGlobal('siteOptions', 1)()) as SiteOption
  const siteLogo = siteOptions.siteLogo

  const navItems = footer?.navItems || []

  return (
    <footer className="text-white">
      <div className="mx-auto py-8 max-w-screen-xl">
        <div className="flex flex-wrap sm:flex-nowrap gap-0">          {/* Hours Section */}
          <div className="min-w-96 grow text-center sm:text-left flex flex-col justify-center bg-brand-accent-800">
            {footer.hoursTitle && <h3 className="text-2xl px-8 font-bold mb-4">{footer.hoursTitle}</h3>}
            {footer.hours && (
              <RichText content={footer.hours} />
            )}
          </div>
          {/* Map Section */}
          <div className="w-full">
            <iframe
              title="google map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4870.106165257795!2d-103.25625272263245!3d44.08158992461695!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x877d5cb2190ef13b%3A0x45e904abd8832e27!2040%20W%20Main%20St%2C%20Rapid%20City%2C%20SD%2057702!5e1!3m2!1sen!2sus!4v1748468150435!5m2!1sen!2sus"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              data-gtm-yt-inspected-10="true"
            ></iframe>
          </div>


        </div>
      </div>

      <div className="bg-brand-neutral-700 prose-a:text-brand-accent-500 py-8 gap-8 flex flex-col md:flex-row md:justify-between">
        <div className="flex flex-col gap-4 container">
          {typeof siteLogo !== 'number' && (
            <Link className="flex items-center" href="/">
              <Image src={siteLogo?.url || ''} alt="Description" width={200} height={200} />
            </Link>
          )}
        </div>
        <div>
          {navItems.map(({ link }, i) => {
            return <CMSLink className="text-xl" key={i} {...link} />
          })}
        </div>

        <div>{footer.content && <RenderBlocks blocks={footer.content} />}</div>
      </div>
    </footer>
  )
}
