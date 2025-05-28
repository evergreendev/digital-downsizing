import React from 'react'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { FeaturedSectionType } from './config'

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
          <h2 className={`text-4xl md:text-6xl font-bold text-center mb-6 font-display ${textColorClass}`}>
            {heading}
          </h2>
        )}

        {subheading && (
          <p className={`text-xl md:text-2xl text-center mb-16 max-w-4xl mx-auto ${backgroundColor === 'brandPrimary' ? 'text-white/80' : 'text-gray-600'}`}>
            {subheading}
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {items && items.map((item, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border border-gray-100"
            >
              {item.image && (
                <div className="relative h-72 overflow-hidden">
                  <Media 
                    resource={item.image} 
                    imgClassName="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              )}

              <div className="p-8">
                <h3 className="text-2xl md:text-3xl font-bold mb-4 font-display">{item.title}</h3>

                {item.description && (
                  <div className="mb-6 text-gray-600 text-lg">
                    <RichText content={item.description} />
                  </div>
                )}

                {item.link && item.link.label && (
                  <div className="mt-6">
                    <CMSLink 
                      {...item.link} 
                      className="inline-block bg-brand-primary-600 hover:bg-brand-primary-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 hover:shadow-md"
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedSectionComponent
