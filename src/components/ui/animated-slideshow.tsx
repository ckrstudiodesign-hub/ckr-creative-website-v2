"use client" 

import * as React from "react"
import { MotionConfig, motion, type HTMLMotionProps } from "motion/react"
import { cn } from "../../lib/utils"

interface TextStaggerHoverProps {
  text: string
  index: number
}
interface HoverSliderImageProps {
  index: number
  imageUrl: string
}
interface HoverSliderProps {}
interface HoverSliderContextValue {
  activeSlide: number
  changeSlide: (index: number) => void
}
function splitText(text: string) {
  const words = text.split(" ").map((word) => word.concat(" "))
  const characters = words.map((word) => word.split("")).flat(1)

  return {
    words,
    characters,
  }
}

const HoverSliderContext = React.createContext<
  HoverSliderContextValue | undefined
>(undefined)
function useHoverSliderContext() {
  const context = React.useContext(HoverSliderContext)
  if (context === undefined) {
    throw new Error(
      "useHoverSliderContext must be used within a HoverSliderProvider"
    )
  }
  return context
}

export const HoverSlider = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement> & HoverSliderProps
>(({ children, className, ...props }, ref) => {
  const [activeSlide, setActiveSlide] = React.useState<number>(0)
  const changeSlide = React.useCallback(
    (index: number) => setActiveSlide(index),
    [setActiveSlide]
  )
  return (
    <HoverSliderContext.Provider value={{ activeSlide, changeSlide }}>
      <div className={className} ref={ref as any} {...props}>{children}</div>
    </HoverSliderContext.Provider>
  )
})
HoverSlider.displayName = "HoverSlider"

const WordStaggerHover = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ children, className, ...props }, ref) => {
  return (
    <span
      className={cn("relative inline-block origin-bottom overflow-hidden")}
      {...props}
      ref={ref}
    >
      {children}
    </span>
  )
})
WordStaggerHover.displayName = "WordStaggerHover"

export const TextStaggerHover = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement> & TextStaggerHoverProps
>(({ text, index, children, className, ...props }, ref) => {
  const { activeSlide, changeSlide } = useHoverSliderContext()
  const { characters } = splitText(text)
  const isActive = activeSlide === index
  const handleMouse = () => changeSlide(index)
  return (
    <div
      className={cn("flex w-full items-center justify-between cursor-pointer group", className)}
      {...props}
      ref={ref as any}
      onMouseEnter={handleMouse}
    >
      <span className="relative inline-block origin-bottom overflow-hidden shrink-0">
        {characters.map((char, index) => (
          <span
            key={`${char}-${index}`}
            className="relative inline-block overflow-hidden"
          >
            <MotionConfig
              transition={{
                delay: index * 0.025,
                duration: 0.3,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <motion.span
                className="inline-block opacity-20"
                initial={{ y: "0%" }}
                animate={isActive ? { y: "-110%" } : { y: "0%" }}
              >
                {char}
                {char === " " && index < characters.length - 1 && <>&nbsp;</>}
              </motion.span>

              <motion.span
                className="absolute left-0 top-0 inline-block opacity-100"
                initial={{ y: "110%" }}
                animate={isActive ? { y: "0%" } : { y: "110%" }}
              >
                {char}
              </motion.span>
            </MotionConfig>
          </span>
        ))}
      </span>

      {/* Bullet shooting arrow effect */}
      <div className="ml-6 flex-1 flex items-center overflow-hidden h-10 pr-2">
        <motion.div
          className="flex items-center w-full"
          initial={{ x: "-100%" }}
          animate={isActive ? { x: "0%" } : { x: "-101%" }}
          transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
        >
          <div className="h-[3px] w-full bg-brand-orange rounded-full" />
          <svg
            className="text-brand-orange shrink-0 -ml-2"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m10 5 7 7-7 7" />
          </svg>
        </motion.div>
      </div>
    </div>
  )
})
TextStaggerHover.displayName = "TextStaggerHover"

export const clipPathVariants = {
  visible: {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
  },
  hidden: {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0px)",
  },
}
export const HoverSliderImageWrap = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "grid  overflow-hidden [&>*]:col-start-1 [&>*]:col-end-1 [&>*]:row-start-1 [&>*]:row-end-1 [&>*]:size-full",
        className
      )}
      {...props}
    />
  )
})
HoverSliderImageWrap.displayName = "HoverSliderImageWrap"

export const HoverSliderImage = React.forwardRef<
  HTMLImageElement,
  HTMLMotionProps<"img"> & HoverSliderImageProps
>(({ index, imageUrl, children, className, ...props }, ref) => {
  const { activeSlide } = useHoverSliderContext()
  return (
    <motion.img
      className={cn("inline-block align-middle", className)}
      transition={{ ease: [0.33, 1, 0.68, 1], duration: 0.8 }}
      variants={clipPathVariants}
      animate={activeSlide === index ? "visible" : "hidden"}
      ref={ref}
      {...props}
    />
  )
})
HoverSliderImage.displayName = "HoverSliderImage"

interface HoverSliderVideoProps {
  index: number
  videoUrl: string
}

export const HoverSliderVideo = React.forwardRef<
  HTMLVideoElement,
  HTMLMotionProps<"video"> & HoverSliderVideoProps
>(({ index, videoUrl, children, className, ...props }, forwardedRef) => {
  const { activeSlide } = useHoverSliderContext()
  const isActive = activeSlide === index
  const videoRef = React.useRef<HTMLVideoElement>(null)

  const setRefs = React.useCallback(
    (node: HTMLVideoElement) => {
      videoRef.current = node
      if (typeof forwardedRef === "function") {
        forwardedRef(node)
      } else if (forwardedRef) {
        forwardedRef.current = node
      }
    },
    [forwardedRef]
  )

  React.useEffect(() => {
    if (!videoRef.current) return
    if (isActive) {
      videoRef.current.currentTime = 0
      videoRef.current.play().catch(() => {})
    } else {
      videoRef.current.pause()
    }
  }, [isActive])

  return (
    <motion.video
      className={cn("inline-block align-middle", className)}
      transition={{ ease: [0.33, 1, 0.68, 1], duration: 0.8 }}
      variants={clipPathVariants}
      animate={isActive ? "visible" : "hidden"}
      ref={setRefs as any}
      loop
      muted
      playsInline
      autoPlay={isActive}
      {...props}
    >
      <source src={videoUrl} type="video/mp4" />
    </motion.video>
  )
})
HoverSliderVideo.displayName = "HoverSliderVideo"
