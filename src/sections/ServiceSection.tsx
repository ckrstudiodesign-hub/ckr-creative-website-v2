import { motion } from 'framer-motion'
import SectionShell from '../components/SectionShell'

const services = [
  {
    n: '01',
    title: 'Branding & Visual Identity',
    body: 'Luxury branding, logo design, brand strategy, visual identity systems, creative direction, typography, and modern brand experiences for businesses looking to stand out in competitive markets.',
    img: '/project image/Aurora Finance.png'
  },
  {
    n: '02',
    title: 'Website Design & Development',
    body: 'Custom website design, responsive web development, cinematic UI/UX systems, SEO-optimized websites, landing pages, business websites, portfolio websites, and high-performance digital experiences.',
    img: '/project image/Nova Studio.png'
  },
  {
    n: '03',
    title: 'SEO & Search Optimization',
    body: 'Advanced SEO services including technical SEO, local SEO, GEO optimization, AI search optimization, AEO (Answer Engine Optimization), semantic content strategy, structured data implementation, and search visibility enhancement.',
    img: '/project image/Monolith OS.png'
  },
  {
    n: '04',
    title: 'AI Automation & Smart Systems',
    body: 'AI-powered workflows, chatbot integrations, lead automation systems, intelligent business automation, AI customer engagement tools, and future-ready operational systems.',
    img: '/project image/Pulse.png'
  },
  {
    n: '05',
    title: 'Social Media & Content Marketing',
    body: 'Social media strategy, content creation, reels production, creative campaigns, short-form video content, visual storytelling, and performance-focused digital marketing systems.',
    img: '/project image/Helix Atelier.png'
  },
  {
    n: '06',
    title: 'Cybersecurity & Digital Protection',
    body: 'Website security, penetration testing, vulnerability assessments, digital infrastructure protection, and cybersecurity solutions for modern businesses.',
    img: '/project image/Vertex Robotics.png'
  },
]

export default function ServiceSection() {
  return (
    <SectionShell
      eyebrow="Services"
      heading="Our Digital Services"
      description="Six disciplines, one studio — every layer of a modern brand, built end-to-end."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {services.map((s, i) => (
          <motion.article
            key={s.n}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: i * 0.05, ease: 'easeOut' }}
            whileHover={{ y: -4 }}
            className="group rounded-[24px] bg-brand-off-white p-6 md:p-8 flex flex-col gap-5 min-h-[420px] cursor-default transition-all duration-300 hover:shadow-xl overflow-hidden relative"
          >
            {/* Image Background on Hover */}
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[24px]"
              style={{ backgroundImage: `url("${s.img}")` }}
            />
            {/* Dark gradient overlay for text readability on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />
            
            <div className="relative z-10 flex flex-col h-full gap-5">
              <span className="dm-p14-semi opacity-50 group-hover:opacity-100 group-hover:text-brand-orange">{s.n}</span>
              <h3 className="zalando-h3-44 leading-tight group-hover:text-brand-white transition-colors duration-300">{s.title}</h3>
              <p className="dm-p16-medium opacity-70 mt-auto group-hover:opacity-90 group-hover:text-brand-white transition-colors duration-300">{s.body}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </SectionShell>
  )
}
