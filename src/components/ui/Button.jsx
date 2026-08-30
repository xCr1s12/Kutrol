import Link from 'next/link';

export default function Button({ variant = 'primary', href, className = '', children, ...props }) {
  const base =
    'rounded-md px-4 py-2.5 text-sm font-medium text-center transition-opacity hover:opacity-90';

  const variants = {
    primary: 'bg-accent text-black font-bold',
    secondary: 'bg-transparent text-subtext border border-border hover:bg-border',
    ghost: 'bg-brand border border-border text-text hover:bg-border',
  };

  const cls = `${base} ${variants[variant] || variants.primary} ${className}`;

  if (href) {
    return (
      <Link href={href} className={cls} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button className={cls} {...props}>
      {children}
    </button>
  );
}