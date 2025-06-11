import React from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'

type Props = Extract<Page['layout'][0], { blockType: 'linkBlock' }>

export const LinkBlock: React.FC<
  Props & {
    id?: string
  }
> = ({ links }) => {
  if (!links || !links.length) return null
  return <div className="flex items-center justify-center w-full p-4">
    <CMSLink className="sm:w-auto" size="lg" {...links[0].link} />
  </div>
}
