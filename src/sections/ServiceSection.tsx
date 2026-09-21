import {
  HoverSlider,
  HoverSliderImage,
  HoverSliderVideo,
  HoverSliderImageWrap,
  TextStaggerHover,
} from "../components/ui/animated-slideshow"

const SLIDES = [
  {
    id: "slide-1",
    title: "Brand Identity",
    imageUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000&auto=format&fit=crop",
    videoUrl: "/videos/Brand.mp4?v=3",
  },
  {
    id: "slide-2",
    title: "Web & Mobile Design",
    imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop",
    videoUrl: "/videos/web.mp4?v=3",
  },
  {
    id: "slide-3",
    title: "SEO AEO GEO LLM ETC",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
    videoUrl: "/videos/seo.mp4?v=3",
  },
  {
    id: "slide-4",
    title: "AI & Smart Systems",
    imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2000&auto=format&fit=crop",
    videoUrl: "/videos/ai.mp4?v=3",
  },
  {
    id: "slide-5",
    title: "Social Media & Lead Generation",
    imageUrl: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1974&auto=format&fit=crop",
    videoUrl: "/videos/social%20media.mp4?v=3",
  },
  {
    id: "slide-6",
    title: "Content & Visual Storytelling",
    imageUrl: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=2070&auto=format&fit=crop",
    videoUrl: "/videos/content.mp4?v=3",
  },
  {
    id: "slide-7",
    title: "Cybersecurity",
    imageUrl: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=2070&auto=format&fit=crop",
    videoUrl: "/videos/cybersecurity.mp4?v=3",
  },
]

export default function ServiceSection() {
  return (
    <HoverSlider className="w-full bg-brand-light-white px-4 py-8 text-brand-black md:px-8 md:py-12 lg:px-10 xl:px-[56px] overflow-hidden">
      <div className="w-full max-w-[1300px] mx-auto">
        <div className="mb-4 flex flex-col items-start gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-4">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-brand-off-gray/80 bg-white px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-brand-black/75">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand-orange" />
              Services
            </span>
            <h2 className="font-zalando text-[32px] leading-[1.02] md:text-[42px] lg:text-[52px] font-semibold text-brand-black max-w-[820px]">
              What We Do.
            </h2>
          </div>
          <p className="max-w-[320px] dm-p14-semi text-brand-black/65 leading-relaxed">
            We combine strategy, speed, and skill to deliver exceptional design - every time.
          </p>
        </div>

        <div className="relative flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16 lg:py-8">
          <div className="relative z-10 flex flex-col space-y-3 md:space-y-4 w-full lg:w-3/5 py-10 px-4 lg:p-0">
            {SLIDES.map((slide, index) => (
              <TextStaggerHover
                key={slide.id}
                index={index}
                className="cursor-pointer text-2xl md:text-3xl lg:text-4xl font-bold uppercase tracking-tighter text-brand-black"
                text={slide.title}
              />
            ))}
          </div>
          <HoverSliderImageWrap className="absolute inset-0 z-0 lg:relative lg:inset-auto w-full h-full lg:h-auto lg:w-2/5 xl:w-[340px] aspect-auto lg:aspect-[9/16] rounded-[24px] overflow-hidden shadow-none lg:shadow-2xl mx-auto lg:mx-0 opacity-30 lg:opacity-100 pointer-events-none lg:pointer-events-auto">
            {SLIDES.map((slide, index) => (
              <div key={slide.id} className="size-full">
                {slide.videoUrl ? (
                  <HoverSliderVideo
                    index={index}
                    videoUrl={slide.videoUrl}
                    posterUrl={slide.imageUrl}
                    className="size-full object-cover"
                  />
                ) : (
                  <HoverSliderImage
                    index={index}
                    imageUrl={slide.imageUrl}
                    src={slide.imageUrl}
                    alt={slide.title}
                    className="size-full object-cover"
                    loading="eager"
                    decoding="async"
                  />
                )}
              </div>
            ))}
          </HoverSliderImageWrap>
        </div>
      </div>
    </HoverSlider>
  )
}
