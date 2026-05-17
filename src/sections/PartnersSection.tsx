import SectionShell from '../components/SectionShell'

const partners = ['Acme', 'Polar', 'Northwind', 'Vertex', 'Lumen', 'Helix', 'Atlas', 'Coral']

/**
 * PartnersSection — Framer node 'PartnersSection' (fB1SkbXuQ component).
 * Logo grid placeholder until partner SVG assets are pulled.
 */
export default function PartnersSection() {
  return (
    <SectionShell eyebrow="Partners" heading="Trusted by ambitious brands">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-4">
        {partners.map((p) => (
          <div
            key={p}
            className="aspect-[5/2] rounded-2xl bg-brand-off-white flex items-center justify-center"
          >
            <span className="zalando-h3-44 text-brand-light-black/70">{p}</span>
          </div>
        ))}
      </div>
    </SectionShell>
  )
}
