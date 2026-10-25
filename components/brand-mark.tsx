import Image from "next/image";
import Link from "next/link";

type BrandMarkProps = {
  ariaLabel: string;
  className?: string;
  onClick?: () => void;
  eager?: boolean;
};

export function BrandMark({ ariaLabel, className = "", onClick, eager = false }: BrandMarkProps) {
  return (
    <Link className={`brand-mark ${className}`.trim()} href="/" aria-label={ariaLabel} onClick={onClick}>
      <Image className="brand-emblem" src="/images/valmont-emblem.png" alt="" width={48} height={56} loading={eager ? "eager" : "lazy"} />
      <span className="wordmark" aria-hidden="true">
        <span>VALMONT</span>
        <span className="wordmark-sub">FAMILY</span>
      </span>
    </Link>
  );
}
