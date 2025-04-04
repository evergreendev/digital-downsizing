import { CollectionConfig } from 'payload';
import {
  AlignFeature,
  BlocksFeature, FixedToolbarFeature,
  HeadingFeature, HorizontalRuleFeature, InlineToolbarFeature,
  lexicalEditor, OrderedListFeature,
  ParagraphFeature, UnorderedListFeature,
} from '@payloadcms/richtext-lexical'
import { MediaBlock } from '@/blocks/MediaBlock/config'
import { FormBlock } from '@/blocks/Form/config'
import { LinkBlock } from '@/blocks/LinkBlock/config'

// Define the Hours collection
const Hours: CollectionConfig = {
  slug: 'hours',
  admin: {
    useAsTitle: 'label',
    defaultColumns: ['label', 'hoursStart', 'hoursEnd'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'label',
      type: 'text',
      label: 'Label',
      required: true,
      admin: {
        description: 'A descriptive label for this hours entry (e.g., "Summer Hours", "Holiday Hours")',
      },
    },
    {
      name: 'hoursStart',
      type: 'date',
      label: 'Hours Start Date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: 'd MMM yyy',
        },
        description: 'Select the start date',
      },
    },
    {
      name: 'hoursEnd',
      type: 'date',
      label: 'Hours End Date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: 'd MMM yyy',
        },
        description: 'Select the end date',
      },
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Content',
      required: true,
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            AlignFeature(),
            ParagraphFeature(),
            HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
            BlocksFeature({ blocks: [MediaBlock, FormBlock, LinkBlock] }),
            OrderedListFeature(),
            UnorderedListFeature(),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
            HorizontalRuleFeature(),
            AlignFeature(),
          ]
        },
      }),
      admin: {
        description: 'The detailed information about these hours',
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      label: 'Active',
      defaultValue: true,
      admin: {
        description: 'Check this to make these hours visible on the site',
        position: 'sidebar',
      },
    },
    {
      name: 'sortOrder',
      type: 'number',
      label: 'Sort Order',
      defaultValue: 0,
      admin: {
        description: 'Lower numbers appear first',
        position: 'sidebar',
      },
    },
  ],
};

export default Hours;
