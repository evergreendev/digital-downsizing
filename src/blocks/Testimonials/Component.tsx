import React from 'react'
import RichText from '@/components/RichText'
import { getPayload } from 'payload'
import config from '@payload-config'
import TestimonialsSliderWrapper from './TestimonialsSliderWrapper'
import { Testimonial } from '@/payload-types'
import { connection } from 'next/server'

// Define props type
type TestimonialsBlockProps = {
  blockType: 'testimonialsBlock'
  heading?: string
  displayType: 'count' | 'specific'
  testimonialsCount?: number
  selectedTestimonials?: Array<{ id: number }>
  showAsCarousel: boolean
  backgroundColor: 'white' | 'lightGray' | 'brandPrimary'
}

// Fetch testimonials function
const fetchTestimonials = async (
  displayType: string,
  testimonialsCount: number,
  selectedTestimonials: Array<{ id: number }> = [],
):Promise<Testimonial[]> => {
  const payload = await getPayload({ config })

  try {
    if (displayType === 'count') {
      const response = await payload.find({
        collection: 'testimonials',
        limit: testimonialsCount,
        sort: '-createdAt',
      })
      return response.docs || []
    } else if (displayType === 'specific' && selectedTestimonials.length > 0) {
      const ids = selectedTestimonials.map((item) => item.id)
      const response = await payload.find({
        collection: 'testimonials',
        where: {
          id: {
            in: ids,
          },
        },
      })

      const orderedTestimonials = ids
        .map((id) => response.docs.find((doc) => doc.id === id))
        .filter(doc => doc);

      return orderedTestimonials as Testimonial[] || []
    }
    return []
  } catch (error) {
    console.error('Error fetching testimonials:', error)
    return []
  }
}

// Main server component
const TestimonialsBlockComponent = async (props: TestimonialsBlockProps) => {
  const {
    heading,
    displayType,
    testimonialsCount = 3,
    selectedTestimonials = [],
    showAsCarousel,
    backgroundColor,
  } = props


  await connection();

  const testimonials = await fetchTestimonials(displayType, testimonialsCount, selectedTestimonials)

  const bgColorClass = {
    white: 'bg-white',
    lightGray: 'bg-gray-100',
    brandPrimary: 'bg-brand-primary-600',
  }[backgroundColor]

  if (!testimonials) return (
    <div>
      <p>No testimonials found.</p>
    </div>
  )

  return (
    <section className={`py-16 ${bgColorClass}`}>
      <div className="container mx-auto px-8 max-w-screen-xl">
        {heading && (
          <h2
            className={`text-3xl font-bold text-center mb-12 font-display ${backgroundColor === 'brandPrimary' ? 'text-white' : ''}`}
          >
            {heading}
          </h2>
        )}

        {testimonials && testimonials.length > 0 ? (
          showAsCarousel ? (
            <TestimonialsSliderWrapper testimonials={testimonials} />
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="bg-white text-gray-500 p-6 rounded-lg shadow-lg flex flex-col justify-center"
                >
                  <div className="mb-4">
                    <RichText content={testimonial.testimonial} />
                  </div>
                  <p className="font-bold text-right">— {testimonial.name}</p>
                </div>
              ))}
            </div>
          )
        ) : (
          <p className="text-center">No testimonials found.</p>
        )}
      </div>
    </section>
  )
}

export default TestimonialsBlockComponent
