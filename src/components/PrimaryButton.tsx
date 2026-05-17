import { motion } from 'framer-motion'

type PrimaryButtonProps = {
  label: string
  href: string
  external?: boolean
}

/**
 * Port of Framer's Primary Button component (xwZvBsE0q, variant jnBm2QsyN).
 * Used in Hero Bottom-Right as "BOOK A CALL". Hover state is best-guess —
 * Framer's exact transition curves aren't exposed in the XML.
 */
export default function PrimaryButton({
  label,
  href,
  external = true,
}: PrimaryButtonProps) {
  return (
    <motion.a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className="inline-flex items-center justify-center rounded-full bg-brand-white px-6 py-4 dm-p14-semi text-brand-black uppercase tracking-[0.5px] cursor-pointer"
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
    >
      {label}
    </motion.a>
  )
}
