import type { StaticImageData } from 'next/image'

import { cn } from 'src/utilities/cn'
import React from 'react'

import type { Page } from '@/payload-types'

import { Media } from '@/components/Media'
import RichTextClient from '@/components/RichText/index.client'

type Props = Extract<Page['layout'][0], { blockType: 'mediaBlock' }> & {
  breakout?: boolean
  captionClassName?: string
  className?: string
  enableGutter?: boolean
  id?: string
  imgClassName?: string
  staticImage?: StaticImageData
  disableInnerContainer?: boolean
}

export const MediaBlock: React.FC<Props> = (props) => {
  const {
    captionClassName,
    className,
    enableGutter = true,
    imgClassName,
    media,
    position = 'default',
    staticImage,
    disableInnerContainer,
  } = props

  let caption
  if (media && typeof media === 'object') caption = media.caption

  return (
    <div
      className={cn(
        'py-8',
        {
          container: position === 'default' && enableGutter,
        },
        className,
      )}
    >
      {position === 'fullscreen' && (
        <div className="relative w-full">
          <Media resource={media} src={staticImage} />
        </div>
      )}
      {position === 'default' && (
        <div className="max-w-screen-xl mx-auto p-6">
          <Media 
            imgClassName={cn('rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300', imgClassName)} 
            resource={media} 
            src={staticImage} 
          />
        </div>
      )}
      {caption && (
        <div
          className={cn(
            'mt-8 max-w-screen-xl mx-auto px-6 text-center italic text-gray-600 text-lg',
            {
              container: position === 'fullscreen' && !disableInnerContainer,
            },
            captionClassName,
          )}
        >
          <RichTextClient content={caption} enableGutter={false} />
        </div>
      )}
    </div>
  )
}
