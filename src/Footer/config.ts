import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'
import { Content } from '@/blocks/Content/config'
import { MediaBlock } from '@/blocks/MediaBlock/config'
import IFrame from '@/blocks/IFrame/config'
import { LinkBlock } from '@/blocks/LinkBlock/config'
import { ImageSliderBlock } from '@/blocks/ImageSliderBlock/config'
import { TestimonialBlock } from '@/blocks/Testimonials/config'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
        {
          name: 'content',
          type: 'blocks',
          blocks: [Content, MediaBlock, IFrame, LinkBlock, ImageSliderBlock, TestimonialBlock],
          required: false,
        },
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 6,
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
