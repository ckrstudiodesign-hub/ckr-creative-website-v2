import SectionShell from '../components/SectionShell'

const locations = [
  { city: 'Hyderabad', country: 'India', tz: 'IST', tag: 'Studio' },
  { city: 'Remote', country: 'Worldwide', tz: 'Async', tag: 'Where you are' },
]

/**
 * LocationSection — Framer node 'LocationSection' (uses B27OJPb1x LocationContainer
 * and t99GIunPu LocationTag components).
 */
export default function LocationSection() {
  return (
    <SectionShell eyebrow="Studio" heading="Where we work">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {locations.map((l) => (
          <div
            key={l.city}
            className="rounded-[24px] bg-brand-off-white p-10 flex flex-col gap-3 min-h-[260px]"
          >
            <span className="dm-p14-semi text-brand-light-black uppercase tracking-wider">{l.tag}</span>
            <span className="zalando-h2-100 mt-auto">{l.city}</span>
            <div className="flex flex-row justify-between dm-p14-medium text-brand-light-black">
              <span>{l.country}</span>
              <span>{l.tz}</span>
            </div>
          </div>
        ))}
      </div>
    </SectionShell>
  )
}
