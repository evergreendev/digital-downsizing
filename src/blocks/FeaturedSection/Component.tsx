import React from 'react'
import RichText from '@/components/RichText'
import { FeaturedSectionType } from './config'
import Link from 'next/link'
import Image from 'next/image'

const FeaturedSectionComponent: React.FC<FeaturedSectionType> = (props) => {
  const { heading, subheading, items, backgroundColor } = props

  const bgColorClass = {
    white: 'bg-white',
    lightGray: 'bg-gray-100',
    brandPrimary: 'bg-brand-primary-600',
  }[backgroundColor]

  const textColorClass = backgroundColor === 'brandPrimary' ? 'text-white' : 'text-gray-800'

  return (
    <section className={`py-24 ${bgColorClass}`}>
      <div className="container mx-auto px-6 max-w-screen-xl">
        {heading && (
          <h2
            className={`text-4xl md:text-6xl font-bold text-center mb-6 font-display ${textColorClass}`}
          >
            {heading}
          </h2>
        )}

        {subheading && (
          <p
            className={`text-xl md:text-2xl text-center mb-16 max-w-4xl mx-auto ${backgroundColor === 'brandPrimary' ? 'text-white/80' : 'text-gray-600'}`}
          >
            {subheading}
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
          {items &&
            items.map((item, index) => (
              <Link className="group" key={index} {...item.link} href={item.link?.url || ''}>
                <div className="bg-brand-accent-100/30 border  border-brand-accent-800 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                  {item.image && (
                    <div className="relative h-72 overflow-hidden">
                      <Image
                        className="w-full h-full object-cover group-hover:scale-105 group-hover:-translate-y-2 transition-transform duration-700"
                        src={item.image.url || ''}
                        alt={item.image.alt || ''}
                        width={item.image.width || 0}
                        height={item.image.height || 0}
                      />
                    </div>
                  )}

                  <div className="p-4">
                    <h3 className="text-2xl md:text-3xl font-bold mb-4 font-display">
                      {item.title}
                    </h3>

                    {item.description && (
                      <div className="mb-6 text-gray-600 text-lg">
                        <RichText content={item.description} />
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedSectionComponent
