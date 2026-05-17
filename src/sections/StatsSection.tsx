import SectionShell from '../components/SectionShell'

const stats = [
  { value: '120+', label: 'Projects shipped' },
  { value: '18', label: 'Countries served' },
  { value: '6yr', label: 'In business' },
  { value: '94%', label: 'Repeat clients' },
]

/**
 * StatsSection — Framer node nVHp6AZ5D "Our Global Reach".
 * Stats values are representative; will be replaced with the real numbers
 * once StatsCard / StatsSection XML is fetched.
 */
export default function StatsSection() {
  return (
    <SectionShell eyebrow="Reach" heading="Our Global Reach" background="bg-brand-orange" textColor="text-brand-white">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col gap-3 border-t border-brand-white/20 pt-8">
            <span className="zalando-h1-88">{s.value}</span>
            <span className="dm-p18-semi opacity-70">{s.label}</span>
          </div>
        ))}
      </div>
    </SectionShell>
  )
}
