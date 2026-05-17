/**
 * ReelSection — Framer node 'ReelSection'.
 * Full-width video banner. Placeholder image until the reel asset URL is read
 * from the actual section XML.
 */
export default function ReelSection() {
  return (
    <section className="w-full bg-brand-white px-[72px] py-12">
      <div className="w-full max-w-[1920px] mx-auto rounded-[40px] overflow-hidden">
        <div
          className="w-full aspect-[16/7] bg-cover bg-center relative"
          style={{
            backgroundImage:
              'url(/images/download-24.jpeg)',
          }}
        >
          <button
            type="button"
            className="absolute inset-0 m-auto w-20 h-20 rounded-full bg-brand-white text-brand-orange flex items-center justify-center"
            aria-label="Play showreel"
          >
            <span className="ml-1 border-y-[10px] border-y-transparent border-l-[16px] border-l-brand-orange" />
          </button>
        </div>
      </div>
    </section>
  )
}
