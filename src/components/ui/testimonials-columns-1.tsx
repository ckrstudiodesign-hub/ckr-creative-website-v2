import React from 'react'
import { motion } from 'framer-motion'

export type Testimonial = {
  text: string
  image: string
  name: string
  role: string
}

/**
 * Infinite vertical-scroll testimonial column. Duplicates its items so the
 * `translateY: -50%` loop reads as a seamless marquee. Styled for the brand's
 * dark glassmorphism card (translucent white tiles, soft shadow, blur).
 */
export const TestimonialsColumn = (props: {
  className?: string
  testimonials: Testimonial[]
  duration?: number
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{ translateY: '-50%' }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: 'linear',
          repeatType: 'loop',
        }}
        className="flex flex-col gap-5 pb-5"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, image, name, role }, i) => (
                <div
                  key={i}
                  className="w-full max-w-xs rounded-2xl border border-white/15 bg-white/[0.07] p-6 text-brand-white shadow-[0_24px_70px_rgba(0,0,0,0.18)] backdrop-blur-xl"
                >
                  <p className="dm-p14-semi leading-relaxed text-brand-white/85">{text}</p>
                  <div className="mt-5 flex items-center gap-3">
                    <img
                      width={40}
                      height={40}
                      src={image}
                      alt={name}
                      loading="lazy"
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <div className="flex flex-col">
                      <div className="font-medium leading-5 tracking-tight text-brand-white">{name}</div>
                      <div className="text-sm leading-5 tracking-tight text-brand-white/60">{role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  )
}
