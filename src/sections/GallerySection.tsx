import InteractiveBentoGallery from '../components/ui/interactive-bento-gallery'

/**
 * GallerySection — CKR Creatives studio showcase wrapping the InteractiveBentoGallery.
 * Drag/swap items, click to expand into a modal with a draggable thumbnail dock.
 * Media URLs are well-known Unsplash photos; replace with real client work once available.
 */

const mediaItems = [
  {
    id: 1,
    type: 'image',
    title: 'Brand Identity',
    desc: 'Luxury wordmarks and visual systems built for premium positioning.',
    url: 'https://images.unsplash.com/photo-1561070791-2526d30994b8?w=900&auto=format&fit=crop',
    span: 'md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2',
  },
  {
    id: 2,
    type: 'image',
    title: 'Cinematic Web',
    desc: 'High-fidelity sites with motion-driven storytelling.',
    url: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1200&auto=format&fit=crop',
    span: 'md:col-span-2 md:row-span-2 col-span-1 sm:col-span-2 sm:row-span-2',
  },
  {
    id: 3,
    type: 'image',
    title: 'Type & Print',
    desc: 'Editorial typography for posters, lookbooks, and decks.',
    url: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=900&auto=format&fit=crop',
    span: 'md:col-span-1 md:row-span-3 sm:col-span-2 sm:row-span-2',
  },
  {
    id: 4,
    type: 'image',
    title: 'AI Systems',
    desc: 'Workflow automations and intelligent business tools.',
    url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&auto=format&fit=crop',
    span: 'md:col-span-2 md:row-span-2 sm:col-span-1 sm:row-span-2',
  },
  {
    id: 5,
    type: 'image',
    title: 'Motion Design',
    desc: 'Cinematic transitions, micro-interactions, and reels.',
    url: 'https://images.unsplash.com/photo-1620207418302-439b387441b0?w=900&auto=format&fit=crop',
    span: 'md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2',
  },
  {
    id: 6,
    type: 'image',
    title: 'Product Mockups',
    desc: 'Interface and app concepts presented in real-world context.',
    url: 'https://images.unsplash.com/photo-1512446816042-444d641267d4?w=1200&auto=format&fit=crop',
    span: 'md:col-span-2 md:row-span-2 sm:col-span-1 sm:row-span-2',
  },
  {
    id: 7,
    type: 'image',
    title: 'Studio Capture',
    desc: 'Photography for brand campaigns and product launches.',
    url: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=900&auto=format&fit=crop',
    span: 'md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2',
  },
]

export default function GallerySection() {
  return (
    <section className="w-full bg-brand-white py-[100px]">
      <div className="w-full max-w-[1920px] mx-auto px-[72px]">
        <div className="flex flex-col gap-4 mb-4 max-w-[820px]">
          <span className="dm-p18-semi opacity-70">(Gallery)</span>
          <h2 className="zalando-h2-lh69">Studio Showcase</h2>
          <p className="dm-p18-semi text-brand-light-black">
            Drag tiles to rearrange, click any image to expand. A curated look at the disciplines we
            work across — identity, web, motion, AI, and brand photography.
          </p>
        </div>
      </div>
      <InteractiveBentoGallery
        mediaItems={mediaItems}
        title="Recent Work, Up Close"
        description="Drag and explore — every tile is a discipline we ship"
      />
    </section>
  )
}
