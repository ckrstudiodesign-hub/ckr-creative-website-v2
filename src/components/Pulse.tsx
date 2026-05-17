import { motion } from 'framer-motion'

type PulseProps = {
  /** CSS color string for both the dot and the expanding ring */
  color?: string
  /** Diameter of the static center dot in px */
  size?: number
  /** Max scale of the expanding ring */
  pulseSize?: number
  /** Peak opacity of the ring */
  pulseOpacity?: number
  /** Seconds of delay before the first pulse */
  delay?: number
  /** Seconds for one pulse cycle */
  duration?: number
}

/**
 * Port of Framer's Workshop/Pulse code component.
 * Renders a small filled dot with an infinite expanding ring behind it.
 * Sourced from node attributes: color="rgb(114, 255, 19)", delay=1,
 * pulseSize=8, pulseOpacity=0.5, radiusType="full".
 */
export default function Pulse({
  color = 'rgb(114, 255, 19)',
  size = 6,
  pulseSize = 8,
  pulseOpacity = 0.5,
  delay = 1,
  duration = 1.6,
}: PulseProps) {
  return (
    <span
      className="relative inline-block"
      style={{ width: size, height: size }}
    >
      <motion.span
        className="absolute inset-0 rounded-full"
        style={{ backgroundColor: color }}
        initial={{ scale: 1, opacity: pulseOpacity }}
        animate={{ scale: pulseSize, opacity: 0 }}
        transition={{
          duration,
          delay,
          repeat: Infinity,
          ease: 'easeOut',
        }}
      />
      <span
        className="absolute inset-0 rounded-full"
        style={{ backgroundColor: color }}
      />
    </span>
  )
}
