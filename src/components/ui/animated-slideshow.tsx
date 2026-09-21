"use client" 

import * as React from "react"
import { MotionConfig, motion, AnimatePresence, type HTMLMotionProps } from "motion/react"
import { cn } from "../../lib/utils"

interface TextStaggerHoverProps {
  text: string
  index: number
  videoUrl?: string
  imageUrl?: string
  layoutId?: string
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
>(({ text, index, videoUrl, imageUrl, layoutId, children, className, ...props }, ref) => {
  const { activeSlide, changeSlide } = useHoverSliderContext()
  const { words, characters } = splitText(text)
  const isActive = activeSlide === index
  const handleMouse = () => changeSlide(index)
  return (
    <div
      className={cn("flex flex-col lg:flex-row w-full items-center justify-between cursor-pointer group", className)}
      {...props}
      ref={ref as any}
      onMouseEnter={handleMouse}
    >
      <span className="relative flex flex-wrap origin-bottom overflow-hidden">
        {words.map((word, wordIndex) => {
          const startIndex = words.slice(0, wordIndex).reduce((acc, w) => acc + w.length, 0);
          return (
            <span key={wordIndex} className="inline-block whitespace-pre">
              {word.split("").map((char, charIndex) => {
                const index = startIndex + charIndex;
                return (
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
                )
              })}
            </span>
          )
        })}
      </span>

      {/* Mobile Inline Video Thumbnail */}
      <AnimatePresence>
        {isActive && videoUrl && layoutId && (
          <motion.div
            layoutId={layoutId}
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: "auto", marginTop: 24 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            className="flex lg:hidden w-full max-w-[280px] aspect-[9/16] rounded-2xl overflow-hidden relative shadow-2xl"
          >
            <video
              src={videoUrl}
              poster={imageUrl}
              autoPlay
              loop
              muted
              playsInline
              className="size-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center backdrop-blur-[1px]">
              <div className="bg-brand-orange/90 p-4 rounded-full flex flex-col items-center justify-center text-white shadow-2xl animate-pulse scale-90">
                <svg
                  className="w-6 h-6 mb-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                </svg>
                <span className="text-[10px] font-bold uppercase tracking-wider">Tap Here</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bullet shooting arrow effect */}
      <div className="hidden lg:flex ml-6 flex-1 items-center overflow-hidden h-10 pr-2">
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
  posterUrl?: string
}

export const HoverSliderVideo = React.forwardRef<
  HTMLVideoElement,
  HTMLMotionProps<"div"> & HoverSliderVideoProps
>(({ index, videoUrl, posterUrl, children, className, ...props }, forwardedRef) => {
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
    if (videoRef.current) {
      videoRef.current.defaultMuted = true
      videoRef.current.muted = true
      videoRef.current.playsInline = true
    }
  }, [])

  React.useEffect(() => {
    if (!videoRef.current) return
    if (isActive) {
      videoRef.current.currentTime = 0
      const playPromise = videoRef.current.play()
      if (playPromise !== undefined) {
        playPromise.catch(() => {})
      }
    } else {
      videoRef.current.pause()
    }
  }, [isActive])

  return (
    <motion.div
      className={cn("inline-block align-middle", className)}
      transition={{ ease: [0.33, 1, 0.68, 1], duration: 0.8 }}
      variants={clipPathVariants}
      animate={isActive ? "visible" : "hidden"}
      {...props}
    >
      <video
        ref={setRefs as any}
        loop
        muted
        playsInline
        autoPlay
        src={videoUrl}
        poster={posterUrl}
        className="size-full object-cover"
      />
    </motion.div>
  )
})
HoverSliderVideo.displayName = "HoverSliderVideo"
