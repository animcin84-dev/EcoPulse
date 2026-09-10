type PulseHeartProps = {
  size?: number;
  className?: string;
  labelled?: boolean;
};

export function PulseHeart({ size = 28, className = '', labelled = false }: PulseHeartProps) {
  return (
    <svg
      className={`pulse-heart ${className}`.trim()}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      role={labelled ? 'img' : undefined}
      aria-label={labelled ? 'EcoPulse heart' : undefined}
      aria-hidden={labelled ? undefined : true}
    >
      <path
        d="M32 55C27 49.8 9 37.5 9 22.2C9 13.8 15 9 22.2 9C26.7 9 30 11.4 32 14.4C34 11.4 37.3 9 41.8 9C49 9 55 13.8 55 22.2C55 37.5 37 49.8 32 55Z"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      <path
        d="M15.5 31.5H24L27.2 25L32.1 38L36.6 28.5L39.2 31.5H49"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
