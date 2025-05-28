import { Block } from 'payload/types'

export type FeaturedSectionType = {
  blockType: 'featuredSection'
  heading?: string
  subheading?: string
  items: Array<{
    title: string
    description?: {
      [k: string]: unknown
    }[]
    image?: {
      id: string
      alt: string
      filename: string
      mimeType: string
      filesize: number
      width: number
      height: number
      createdAt: string
      updatedAt: string
      url: string
    }
    link?: {
      type?: 'reference' | 'custom'
      label?: string
      reference?: {
        value: string
        relationTo: 'pages'
      }
      url?: string
      newTab?: boolean
    }
  }>
  backgroundColor: 'white' | 'lightGray' | 'brandPrimary'
}

export const FeaturedSectionConfig: Block = {
  slug: 'featuredSection',
  labels: {
    singular: 'Featured Section',
    plural: 'Featured Sections',
  },
  fields: [
    {
      name: 'heading',
      label: 'Heading',
      type: 'text',
    },
    {
      name: 'subheading',
      label: 'Subheading',
      type: 'text',
    },
    {
      name: 'items',
      label: 'Featured Items',
      type: 'array',
      minRows: 1,
      maxRows: 6,
      fields: [
        {
          name: 'title',
          label: 'Title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          label: 'Description',
          type: 'richText',
        },
        {
          name: 'image',
          label: 'Image',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'link',
          label: 'Link',
          type: 'group',
          fields: [
            {
              name: 'type',
              label: 'Link Type',
              type: 'radio',
              options: [
                {
                  label: 'Reference',
                  value: 'reference',
                },
                {
                  label: 'Custom URL',
                  value: 'custom',
                },
              ],
              defaultValue: 'reference',
              admin: {
                layout: 'horizontal',
              },
            },
            {
              name: 'label',
              label: 'Label',
              type: 'text',
            },
            {
              name: 'reference',
              label: 'Reference',
              type: 'relationship',
              relationTo: 'pages',
              required: true,
              admin: {
                condition: (_, siblingData) => siblingData?.type === 'reference',
              },
            },
            {
              name: 'url',
              label: 'Custom URL',
              type: 'text',
              required: true,
              admin: {
                condition: (_, siblingData) => siblingData?.type === 'custom',
              },
            },
            {
              name: 'newTab',
              label: 'Open in new tab',
              type: 'checkbox',
            },
          ],
        },
      ],
    },
    {
      name: 'backgroundColor',
      label: 'Background Color',
      type: 'select',
      defaultValue: 'white',
      options: [
        {
          label: 'White',
          value: 'white',
        },
        {
          label: 'Light Gray',
          value: 'lightGray',
        },
        {
          label: 'Brand Primary',
          value: 'brandPrimary',
        },
      ],
    },
  ],
}
