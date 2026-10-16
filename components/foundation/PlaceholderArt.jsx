import { useId } from "react";

export function PlaceholderArt({ accentColor, aspect = "portrait", className = "" }) {
  const gradientId = useId();
  const aspectClass = aspect === "portrait" ? "aspect-[4/5]" : "aspect-[16/9]";

  return (
    <div className={`relative overflow-hidden bg-linen ${aspectClass} ${className}`}>
      <svg viewBox="0 0 400 500" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id={gradientId} cx="50%" cy="45%" r="65%">
            <stop offset="0%" stopColor={accentColor} stopOpacity="0.55" />
            <stop offset="55%" stopColor={accentColor} stopOpacity="0.22" />
            <stop offset="100%" stopColor={accentColor} stopOpacity="0.06" />
          </radialGradient>
        </defs>
        <rect width="400" height="500" fill="#EDE7DC" />
        <circle cx="200" cy="220" r="160" fill={`url(#${gradientId})`} />
        <circle cx="200" cy="220" r="70" fill="none" stroke={accentColor} strokeOpacity="0.35" strokeWidth="1" />
      </svg>
    </div>
  );
}
