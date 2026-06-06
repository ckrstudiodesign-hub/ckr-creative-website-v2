import SectionShell from '../components/SectionShell'
import { TestimonialsColumn, type Testimonial } from '../components/ui/testimonials-columns-1'

const testimonials: Testimonial[] = [
  {
    text: 'CKR Creatives transformed our online presence into a premium, highly optimized digital experience. The results speak for themselves.',
    image: 'https://randomuser.me/api/portraits/women/68.jpg',
    name: 'Layla Hassan',
    role: 'Founder, Aurora Finance',
  },
  {
    text: 'Our new website feels futuristic, loads incredibly fast, and finally ranks where we belong on search.',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    name: 'Omar Khalid',
    role: 'CEO, NovaGrid Systems',
  },
  {
    text: 'Branding, SEO, and design came together into one system that elevated our whole business.',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    name: 'Sara Meedan',
    role: 'Marketing Lead, Veloré',
  },
  {
    text: 'Their AI automation cut our manual work in half. This team genuinely understands modern operations.',
    image: 'https://randomuser.me/api/portraits/men/45.jpg',
    name: 'Daniel Reyes',
    role: 'COO, Monolith OS',
  },
  {
    text: 'From strategy to launch, every detail felt intentional. A genuinely premium creative partner.',
    image: 'https://randomuser.me/api/portraits/women/65.jpg',
    name: 'Priya Nair',
    role: 'Brand Director, Élevare',
  },
  {
    text: 'We went from invisible to being cited by AI search engines within weeks. Incredible technical depth.',
    image: 'https://randomuser.me/api/portraits/men/76.jpg',
    name: 'Yusuf Rahman',
    role: 'Growth Lead, AetherX',
  },
  {
    text: 'The cinematic web design doubled our time-on-site and lifted conversions across the funnel.',
    image: 'https://randomuser.me/api/portraits/women/29.jpg',
    name: 'Hana Suzuki',
    role: 'Product Manager, Pulse',
  },
  {
    text: 'Professional, fast, and creative. CKR delivered a brand system we are proud to grow into.',
    image: 'https://randomuser.me/api/portraits/men/12.jpg',
    name: 'Marcus Bauer',
    role: 'Founder, Blackstone Quantum',
  },
  {
    text: 'Security hardening plus a beautiful site — rare to find both done this well by one team.',
    image: 'https://randomuser.me/api/portraits/women/90.jpg',
    name: 'Aisha Mahmoud',
    role: 'CTO, SentinelCore',
  },
]

const firstColumn = testimonials.slice(0, 3)
const secondColumn = testimonials.slice(3, 6)
const thirdColumn = testimonials.slice(6, 9)

export default function TestimonialSection() {
  return (
    <SectionShell eyebrow="Testimonials" heading="Trusted By Modern Businesses & Growing Brands">
      <div className="flex max-h-[460px] justify-center gap-5 overflow-hidden [-webkit-mask-image:linear-gradient(to_bottom,transparent,black_18%,black_82%,transparent)] [mask-image:linear-gradient(to_bottom,transparent,black_18%,black_82%,transparent)]">
        <TestimonialsColumn testimonials={firstColumn} duration={15} />
        <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
        <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
      </div>
    </SectionShell>
  )
}
