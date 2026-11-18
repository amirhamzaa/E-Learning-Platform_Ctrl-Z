const VARIANT_CLASSES = {
  primary: "bg-primary-container text-on-primary hover:bg-primary shadow-sm",
  "primary-deep":
    "bg-primary text-on-primary hover:bg-primary-container shadow-md",
  secondary:
    "bg-surface-container-lowest text-on-surface hover:bg-surface-container shadow-sm",
  sage: "bg-tertiary-fixed text-on-tertiary-fixed hover:bg-tertiary-fixed-dim shadow-md",
  ghost:
    "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface",
};

const SIZE_CLASSES = {
  sm: "px-space-md py-space-sm rounded-lg font-label-md text-label-md",
  md: "px-space-md py-2 rounded-lg font-label-md text-label-md",
  lg: "px-space-xl py-3.5 rounded-lg font-title-md text-title-md",
};

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  href,
  type = "button",
  ...props
}) {
  const combinedClasses = [
    "inline-flex items-center justify-center gap-space-sm transition-all cursor-pointer",
    VARIANT_CLASSES[variant] || VARIANT_CLASSES.primary,
    SIZE_CLASSES[size] || SIZE_CLASSES.md,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (typeof href === "string") {
    return (
      <a href={href} className={combinedClasses} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={combinedClasses} {...props}>
      {children}
    </button>
  );
}
