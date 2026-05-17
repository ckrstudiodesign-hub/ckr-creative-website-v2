import SectionShell from '../components/SectionShell'

const awards = [
  { year: '2024', name: 'Awwwards — Site of the Day', category: 'Web Design' },
  { year: '2024', name: 'CSSDA — Special Kudos', category: 'Brand Identity' },
  { year: '2023', name: 'FWA — FWA of the Day', category: 'Interaction' },
  { year: '2023', name: 'Brand New — Noted', category: 'Brand System' },
]

/**
 * AwardSection — Framer node euojcANVm "Industry & Honors".
 * Award row content is representative placeholder.
 */
export default function AwardSection() {
  return (
    <SectionShell eyebrow="Honors" heading="Industry & Honors">
      <ul className="flex flex-col divide-y divide-brand-off-gray border-t border-brand-off-gray">
        {awards.map((a) => (
          <li key={a.name} className="flex flex-row items-center justify-between py-8">
            <span className="dm-p18-semi text-brand-light-black">{a.year}</span>
            <span className="zalando-h3-44">{a.name}</span>
            <span className="dm-p18-semi text-brand-light-black">{a.category}</span>
          </li>
        ))}
      </ul>
    </SectionShell>
  )
}
