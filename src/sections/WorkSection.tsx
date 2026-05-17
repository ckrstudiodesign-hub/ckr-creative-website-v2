import SectionShell from '../components/SectionShell'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

// Each img maps to a file in /public/project image/ — note the URL-encoded
// space (%20) and é (%C3%A9) so CSS/browser URL parsers don't break.
const work = [
  { slug: 'novagrid-systems', title: 'NovaGrid Systems', category: 'AI Infrastructure', img: '/project%20image/NovaGrid%20System.png' },
  { slug: 'velore-dynamics', title: 'Veloré Dynamics', category: 'Luxury Mobility', img: '/project%20image/Velor%C3%A9%20Dynamics.png' },
  { slug: 'aetherx-aerospace', title: 'AetherX Aerospace', category: 'Space Technology', img: '/project%20image/AetherX.png' },
  { slug: 'blackstone-quantum', title: 'Blackstone Quantum', category: 'Fintech Platform', img: '/project%20image/Blackstone.png' },
  { slug: 'neurovia-health', title: 'Neurovia Health', category: 'AI Healthcare', img: '/project%20image/Neurovia.png' },
  { slug: 'sentinelcore-labs', title: 'SentinelCore Labs', category: 'Cybersecurity', img: '/project%20image/SentinelCore.png' },
  { slug: 'elevare-collection', title: 'Élevare Collection', category: 'Luxury Hospitality', img: '/project%20image/%C3%89levare.png' },
  { slug: 'kairo-robotics', title: 'Kairo Robotics', category: 'Autonomous Robotics', img: '/project%20image/Kairo.png' },
  { slug: 'axisone-developments', title: 'AxisOne Developments', category: 'Proptech Platform', img: '/project%20image/AxisOne.png' },
  { slug: 'omniflux-commerce', title: 'OmniFlux Commerce', category: 'AI Commerce', img: '/project%20image/omniflux.png' },
]

export default function WorkSection() {
  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.8, 
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number]
      } 
    },
  }

  return (
    <SectionShell
      eyebrow="Portfolio"
      heading="Selected Digital Projects"
      description="Explore a collection of modern branding projects, SEO-focused websites, AI-powered systems, and immersive digital experiences created for ambitious brands and businesses."
    >
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12"
      >
        {work.map((w) => (
          <motion.div key={w.slug} variants={itemVariants}>
            <Link
              to={`/work/${w.slug}`}
              className="group flex flex-col gap-5 block overflow-hidden"
            >
              <div className="relative overflow-hidden rounded-[28px] aspect-[4/3] w-full bg-brand-white">
                <motion.div
                  className="absolute inset-4 bg-contain bg-no-repeat bg-center mix-blend-multiply"
                  style={{ backgroundImage: `url("${w.img}")` }}
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
                {/* Hover overlay with a little view project button badge */}
                <motion.div 
                  className="absolute inset-0 bg-brand-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-[2px]"
                >
                  <span className="bg-brand-white text-brand-black px-6 py-3 rounded-full font-dm font-bold uppercase tracking-wider text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    View Project
                  </span>
                </motion.div>
              </div>
              <div className="flex flex-row justify-between items-center px-1">
                <span className="zalando-h3-44 text-brand-black group-hover:text-brand-orange transition-colors duration-300">
                  {w.title}
                </span>
                <span className="dm-p14-semi text-brand-light-black/80 border border-brand-light-black/20 px-4 py-1.5 rounded-full">
                  {w.category}
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </SectionShell>
  )
}
