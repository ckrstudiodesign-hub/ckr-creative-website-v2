import { LogoCloud } from '../components/ui/logo-cloud'

const logos = [
  {
    src: '/Trusted%20by/golden%20legacy%20corporate%20services.png',
    alt: 'Golden Legacy Corporate Services',
  },
  {
    src: '/Trusted%20by/golden%20legacy%20real%20estate.png',
    alt: 'Golden Legacy Real Estate',
  },
  {
    src: '/Trusted%20by/upyard.png',
    alt: 'Upyard Rooftop Lounge',
    className: 'scale-125 md:scale-150',
  },
  {
    src: '/Trusted%20by/vas.png',
    alt: 'VAS',
  },
]

export default function TrustedBySection() {
  return (
    <section className="w-full bg-[#FAFAFA] py-16 md:py-24 px-4 border-b border-brand-black/5 overflow-hidden">
      <div className="w-full max-w-[1400px] mx-auto space-y-10 md:space-y-16">
        <h2 className="text-center font-zalando text-sm md:text-base tracking-[0.2em] text-brand-black/40 uppercase font-bold">
          Trusted by premium brands
        </h2>
        <div className="px-4 md:px-12">
          <LogoCloud logos={logos} />
        </div>
      </div>
    </section>
  )
}
