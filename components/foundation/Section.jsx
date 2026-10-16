const toneClasses = {
  paper: "bg-paper",
  linen: "bg-linen",
};

const spacingClasses = {
  sm: "py-section-sm",
  default: "py-section",
  lg: "py-section-lg",
};

export function Section({ children, tone = "paper", spacing = "default", id, className = "" }) {
  return (
    <section id={id} className={`${toneClasses[tone]} ${spacingClasses[spacing]} ${className}`}>
      {children}
    </section>
  );
}
