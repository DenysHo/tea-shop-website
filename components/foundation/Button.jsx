import { Link } from "@/i18n/navigation";

const variantClasses = {
  primary: "bg-ink text-paper hover:bg-matcha transition-colors duration-300 ease-calm px-8 py-3.5 rounded-none",
  ghost: "border border-ink text-ink hover:bg-ink hover:text-paper transition-colors duration-300 ease-calm px-8 py-3.5 rounded-none",
  "text-link": "text-ink underline underline-offset-4 decoration-bamboo hover:decoration-matcha transition-colors duration-300 ease-calm",
};

const baseClasses = "inline-flex items-center justify-center gap-2 font-body text-sm tracking-wide";

export function ButtonLink({ children, variant = "primary", className = "", ...rest }) {
  return (
    <Link className={`${baseClasses} ${variantClasses[variant]} ${className}`} {...rest}>
      {children}
    </Link>
  );
}

export function ButtonExternalLink({ children, variant = "primary", className = "", ...rest }) {
  return (
    <a
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      target="_blank"
      rel="noopener noreferrer"
      {...rest}
    >
      {children}
    </a>
  );
}

export function Button({ children, variant = "primary", className = "", ...rest }) {
  return (
    <button className={`${baseClasses} ${variantClasses[variant]} ${className}`} {...rest}>
      {children}
    </button>
  );
}
