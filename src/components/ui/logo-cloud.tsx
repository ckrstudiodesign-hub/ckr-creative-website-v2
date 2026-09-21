import { cn } from '../../lib/utils'

export type Logo = {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
}

type LogoCloudProps = React.ComponentProps<'div'> & {
  logos: Logo[]
}

export function LogoCloud({ logos, className, ...props }: LogoCloudProps) {
  return (
    <div
      className={cn(
        'mx-auto grid max-w-6xl grid-cols-2 rounded-2xl bg-white shadow-sm border border-brand-black/5 md:grid-cols-4 overflow-hidden',
        className
      )}
      {...props}
    >
      {logos.map((logo, i) => (
        <div
          className={cn(
            "flex items-center justify-center bg-white p-6 md:p-10 transition-colors hover:bg-brand-light-white",
            // Add subtle borders between grid items
            "border-r border-b border-brand-black/5",
            (i + 1) % 2 === 0 ? "border-r-0 md:border-r" : "",
            (i + 1) % 4 === 0 ? "md:border-r-0" : "",
            i >= logos.length - (logos.length % 4 || 4) ? "md:border-b-0" : "",
            i >= logos.length - (logos.length % 2 || 2) ? "border-b-0" : ""
          )}
          key={logo.alt}
        >
          <img
            alt={logo.alt}
            className={cn("pointer-events-none block h-16 md:h-24 w-auto max-w-full object-contain select-none", logo.className)}
            height={logo.height ?? 'auto'}
            loading="lazy"
            src={logo.src}
            width={logo.width ?? 'auto'}
          />
        </div>
      ))}
    </div>
  )
}

export default LogoCloud
