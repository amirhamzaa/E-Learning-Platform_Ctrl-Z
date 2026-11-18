export function Container({ children, className = "" }) {
  return (
    <div className={`max-w-7xl mx-auto ${className}`.trim()}>{children}</div>
  );
}
