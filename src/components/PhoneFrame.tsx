import { type ReactNode, type CSSProperties } from 'react'

/* -------------------------------------------------------------------- */
/*  iPhone 17 Pro Max device frame (titanium bezel + Dynamic Island).    */
/*  Pure CSS, no images. Wraps a scrollable screen surface holding any   */
/*  arbitrary content (social-post simulators in our case).              */
/* -------------------------------------------------------------------- */

type PhoneFrameProps = {
  children: ReactNode
  /** Optional status-bar tint for dark UIs. Default: 'dark' (icons dark) */
  statusBar?: 'dark' | 'light'
  /** Optional accent for the titanium bezel. Default: graphite. */
  bezel?: 'graphite' | 'silver' | 'gold' | 'desert'
  /** Optional class for sizing override (defaults to ~340px wide). */
  className?: string
}

const bezelGradients: Record<NonNullable<PhoneFrameProps['bezel']>, string> = {
  graphite:
    'linear-gradient(145deg, #4a4a4d 0%, #2c2c2e 25%, #1c1c1e 50%, #2c2c2e 75%, #5a5a5d 100%)',
  silver:
    'linear-gradient(145deg, #d8d8da 0%, #b0b0b3 25%, #8c8c8f 50%, #b0b0b3 75%, #e6e6e8 100%)',
  gold:
    'linear-gradient(145deg, #e8d4a8 0%, #c9a86a 25%, #a88451 50%, #c9a86a 75%, #f0dcb0 100%)',
  desert:
    'linear-gradient(145deg, #c9b59a 0%, #a99478 25%, #8a7860 50%, #a99478 75%, #d4c0a4 100%)',
}

function StatusBar({ tint }: { tint: 'dark' | 'light' }) {
  const color = tint === 'light' ? '#ffffff' : '#0a0a0a'
  return (
    <div
      className="absolute inset-x-0 top-0 z-20 flex h-[44px] items-center justify-between px-7 pt-2 text-[14px] font-semibold pointer-events-none"
      style={{ color, fontFamily: '-apple-system, "SF Pro Display", system-ui, sans-serif' }}
    >
      <span className="tracking-tight">9:41</span>
      <div className="flex items-center gap-1.5">
        {/* Signal bars */}
        <svg width="17" height="11" viewBox="0 0 17 11" fill={color}>
          <rect x="0" y="7" width="3" height="4" rx="0.5" />
          <rect x="4.5" y="5" width="3" height="6" rx="0.5" />
          <rect x="9" y="2.5" width="3" height="8.5" rx="0.5" />
          <rect x="13.5" y="0" width="3" height="11" rx="0.5" />
        </svg>
        {/* WiFi */}
        <svg width="15" height="11" viewBox="0 0 15 11" fill={color}>
          <path d="M7.5 0C4.6 0 1.9 1 0 2.7l1.4 1.5C3 2.8 5.2 2 7.5 2s4.5.8 6.1 2.2L15 2.7C13.1 1 10.4 0 7.5 0zm0 3.6c-1.9 0-3.6.7-4.9 1.8l1.4 1.5c1-.8 2.2-1.3 3.5-1.3s2.5.5 3.5 1.3l1.4-1.5c-1.3-1.1-3-1.8-4.9-1.8zm0 3.6c-.9 0-1.7.3-2.4.9L7.5 11l2.4-2.9c-.7-.6-1.5-.9-2.4-.9z" />
        </svg>
        {/* Battery */}
        <div className="flex items-center">
          <div
            className="relative h-[11px] w-[24px] rounded-[3px] border"
            style={{ borderColor: color, borderWidth: 1 }}
          >
            <div
              className="absolute inset-[1.5px] rounded-[1.5px]"
              style={{ backgroundColor: color, width: 'calc(85% - 3px)' }}
            />
          </div>
          <div className="ml-[1.5px] h-[5px] w-[1.5px] rounded-r" style={{ backgroundColor: color }} />
        </div>
      </div>
    </div>
  )
}

export default function PhoneFrame({
  children,
  statusBar = 'dark',
  bezel = 'graphite',
  className = '',
}: PhoneFrameProps) {
  const bezelStyle: CSSProperties = {
    background: bezelGradients[bezel],
    boxShadow:
      '0 40px 90px -40px rgba(0,0,0,0.55), 0 18px 40px -20px rgba(0,0,0,0.35), inset 0 0 0 1px rgba(255,255,255,0.06), inset 0 0 24px rgba(0,0,0,0.3)',
  }

  return (
    <div className={`relative mx-auto ${className}`} style={{ width: 270, maxWidth: '100%' }}>
      {/* Side buttons (decorative) */}
      {/* Action button (left, upper) */}
      <span
        aria-hidden
        className="absolute left-[-3px] top-[110px] z-10 h-[26px] w-[4px] rounded-l-md"
        style={{ background: 'linear-gradient(90deg, #1a1a1c, #3a3a3d 60%, #1a1a1c)' }}
      />
      {/* Volume up (left) */}
      <span
        aria-hidden
        className="absolute left-[-3px] top-[160px] z-10 h-[44px] w-[4px] rounded-l-md"
        style={{ background: 'linear-gradient(90deg, #1a1a1c, #3a3a3d 60%, #1a1a1c)' }}
      />
      {/* Volume down (left) */}
      <span
        aria-hidden
        className="absolute left-[-3px] top-[215px] z-10 h-[44px] w-[4px] rounded-l-md"
        style={{ background: 'linear-gradient(90deg, #1a1a1c, #3a3a3d 60%, #1a1a1c)' }}
      />
      {/* Power (right) */}
      <span
        aria-hidden
        className="absolute right-[-3px] top-[150px] z-10 h-[68px] w-[4px] rounded-r-md"
        style={{ background: 'linear-gradient(-90deg, #1a1a1c, #3a3a3d 60%, #1a1a1c)' }}
      />

      {/* Titanium bezel */}
      <div className="relative rounded-[56px] p-[10px]" style={bezelStyle}>
        {/* Inner glass ring */}
        <div className="rounded-[48px] p-[2px] bg-black">
          {/* Screen — aspect ratio close to iPhone 17 Pro Max (≈ 9:19.5) */}
          <div
            className="relative overflow-hidden rounded-[46px] bg-white"
            style={{ aspectRatio: '9 / 19.5' }}
          >
            {/* Status bar (clock + signal/wifi/battery) */}
            <StatusBar tint={statusBar} />

            {/* Dynamic Island */}
            <div
              aria-hidden
              className="absolute left-1/2 top-[10px] z-30 -translate-x-1/2 rounded-full"
              style={{
                width: 118,
                height: 34,
                background:
                  'radial-gradient(ellipse at center, #0a0a0a 0%, #000 70%)',
                boxShadow:
                  'inset 0 0 6px rgba(20,20,22,0.9), 0 1px 2px rgba(0,0,0,0.6)',
              }}
            >
              {/* Camera lens */}
              <span
                className="absolute right-[10px] top-1/2 h-[10px] w-[10px] -translate-y-1/2 rounded-full"
                style={{
                  background:
                    'radial-gradient(circle at 30% 30%, #1f2a44 0%, #06070b 70%)',
                  boxShadow: 'inset 0 0 2px rgba(160,180,220,0.45)',
                }}
              />
              {/* Speaker/sensor */}
              <span
                className="absolute left-[12px] top-1/2 h-[6px] w-[6px] -translate-y-1/2 rounded-full"
                style={{ background: 'radial-gradient(circle, #111 0%, #000 70%)' }}
              />
            </div>

            {/* Scrollable screen content */}
            <div
              className="absolute inset-0 overflow-y-auto overflow-x-hidden"
              style={{
                paddingTop: 54, // clear status bar + island top
                paddingBottom: 22, // clear home indicator
                scrollbarWidth: 'thin',
              }}
            >
              {children}
            </div>

            {/* Home indicator */}
            <div
              aria-hidden
              className="absolute bottom-[8px] left-1/2 z-20 h-[5px] w-[120px] -translate-x-1/2 rounded-full pointer-events-none"
              style={{
                backgroundColor: statusBar === 'light' ? 'rgba(255,255,255,0.85)' : 'rgba(0,0,0,0.85)',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
