import SectionShell from '../components/SectionShell'

const team = [
  { name: 'Keshav Achenna', role: 'Founder & Creative Director' },
  { name: 'Alex Park', role: 'Design Lead' },
  { name: 'Riley Kwan', role: 'Motion Designer' },
  { name: 'Sam Rivera', role: 'Engineer' },
]

/**
 * TeamMembersSection — Framer node 'TeamMembersSection' (qSGC2ZkdX MemberCardSection).
 * Roster is placeholder — replace with real team data when ready.
 */
export default function TeamMembersSection() {
  return (
    <SectionShell eyebrow="Studio" heading="The team behind the work">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {team.map((m) => (
          <div key={m.name} className="flex flex-col gap-4">
            <div className="aspect-square rounded-[24px] bg-brand-off-white" />
            <div className="flex flex-col gap-1 px-1">
              <span className="dm-p18-semi">{m.name}</span>
              <span className="dm-p14-medium text-brand-light-black">{m.role}</span>
            </div>
          </div>
        ))}
      </div>
    </SectionShell>
  )
}
