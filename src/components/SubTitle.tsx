type SubTitleProps = {
  label: string
}

/**
 * Section eyebrow / tag label.
 * Mirrors the Framer SubTitle component (nodeId Vlmhi3ZJl, variant X2eVmLr0h)
 * used in Hero Top-Left. Static placeholder — full variant set will be
 * filled in once other instances are ported.
 */
export default function SubTitle({ label }: SubTitleProps) {
  return (
    <span className="dm-p14-semi text-brand-white uppercase opacity-80">
      ({label})
    </span>
  )
}
