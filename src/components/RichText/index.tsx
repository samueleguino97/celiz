import { MediaBlock } from '@/blocks/MediaBlock/Component'
import {
  DefaultNodeTypes,
  SerializedBlockNode,
  SerializedLinkNode,
  type DefaultTypedEditorState,
} from '@payloadcms/richtext-lexical'
import {
  JSXConvertersFunction,
  RichText as ConvertRichText,
  LinkJSXConverter,
} from '@payloadcms/richtext-lexical/react'

import type { MediaBlock as MediaBlockProps, QuoteBlock } from '@/payload-types'
import { cn } from '@/utilities/ui'

type NodeTypes = DefaultNodeTypes | SerializedBlockNode<MediaBlockProps | QuoteBlock>

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { value, relationTo } = linkNode.fields.doc!
  if (typeof value !== 'object') {
    throw new Error('Expected value to be an object')
  }
  const slug = value.slug
  return relationTo === 'articulos' ? `/articulos/${slug}` : `/${slug}`
}
const jsxConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),

  horizontalrule: () => <div className="h-[2px] w-full bg-[#e0c46488] my-8" />,

  blocks: {
    mediaBlock: ({ node }) => (
      <MediaBlock
        className="col-start-1 col-span-3"
        imgClassName="m-0"
        {...node.fields}
        captionClassName="mx-auto max-w-[48rem]"
        enableGutter={false}
        disableInnerContainer={true}
      />
    ),
    quote: ({ node }) => (
      <div className="bg-[#e0c46422] text-[#00264d] p-8 rounded-lg my-12 ">
        <div className="text-2xl font-bold flex flex-col justify-start italic gap-4 my-0">
          <span className="text-[#00264d] font-light italic">
            <RichText
              data={node.fields.content}
              className="w-full max-w-full leading h-min px-0 text-[#00264d] text-xl font-light italic"
            />
          </span>
          <span className="capitalize">- {node.fields.author}</span>
        </div>
      </div>
    ),
  },
})

type Props = {
  data: DefaultTypedEditorState
  enableGutter?: boolean
  enableProse?: boolean
} & React.HTMLAttributes<HTMLDivElement>

export default function RichText(props: Props) {
  const { className, enableProse = true, enableGutter = true, ...rest } = props
  return (
    <ConvertRichText
      converters={jsxConverters}
      className={cn(
        'payload-richtext',
        {
          container: enableGutter,
          'max-w-none': !enableGutter,
          'mx-auto prose md:prose-md dark:prose-invert text-lg': enableProse,
        },
        className,
      )}
      {...rest}
    />
  )
}
