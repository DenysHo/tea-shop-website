export function Eyebrow({ children, className = "" }) {
  return <p className={`label-eyebrow ${className}`}>{children}</p>;
}

const sizeClasses = {
  xl: "text-5xl md:text-7xl leading-[1.05]",
  lg: "text-4xl md:text-5xl leading-tight",
  md: "text-3xl md:text-4xl leading-tight",
  sm: "text-2xl md:text-3xl leading-snug",
};

export function Heading({ children, as: Tag = "h2", size = "md", className = "" }) {
  return (
    <Tag className={`font-display font-medium text-ink ${sizeClasses[size]} ${className}`}>
      {children}
    </Tag>
  );
}

const bodyToneClasses = {
  ink: "text-ink",
  stone: "text-stone",
};

const bodySizeClasses = {
  base: "text-base leading-relaxed",
  lg: "text-lg md:text-xl leading-relaxed",
};

export function BodyText({ children, tone = "stone", size = "base", className = "" }) {
  return (
    <p className={`font-body ${bodyToneClasses[tone]} ${bodySizeClasses[size]} ${className}`}>
      {children}
    </p>
  );
}
