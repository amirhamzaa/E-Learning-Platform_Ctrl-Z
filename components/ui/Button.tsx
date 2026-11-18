import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "primary-deep" | "secondary" | "sage" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    "bg-primary-container text-on-primary hover:bg-primary shadow-sm",
  "primary-deep":
    "bg-primary text-on-primary hover:bg-primary-container shadow-md",
  secondary:
    "bg-surface-container-lowest text-on-surface hover:bg-surface-container shadow-sm",
  sage: "bg-tertiary-fixed text-on-tertiary-fixed hover:bg-tertiary-fixed-dim shadow-md",
  ghost:
    "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface",
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: "px-space-md py-space-sm rounded-lg font-label-md text-label-md",
  md: "px-space-md py-2 rounded-lg font-label-md text-label-md",
  lg: "px-space-xl py-3.5 rounded-lg font-title-md text-title-md",
};

interface SharedProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
}

type ButtonElementProps = SharedProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type AnchorElementProps = SharedProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

export type ButtonProps = ButtonElementProps | AnchorElementProps;

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const combinedClasses = [
    "inline-flex items-center justify-center gap-space-sm transition-all cursor-pointer",
    VARIANT_CLASSES[variant],
    SIZE_CLASSES[size],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if ("href" in props && typeof props.href === "string") {
    const { href, ...anchorProps } = props;
    return (
      <a href={href} className={combinedClasses} {...anchorProps}>
        {children}
      </a>
    );
  }

  const buttonProps = props as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button
      type={buttonProps.type ?? "button"}
      className={combinedClasses}
      {...buttonProps}
    >
      {children}
    </button>
  );
}
