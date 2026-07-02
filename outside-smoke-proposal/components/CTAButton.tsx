import Link from 'next/link';

interface CTAButtonProps {
  text: string;
  href: string;
  variant?: 'primary' | 'secondary';
}

export default function CTAButton({ text, href, variant = 'primary' }: CTAButtonProps) {
  const baseClasses = 'inline-block font-semibold py-3 px-6 rounded transition-colors duration-200 text-center';
  
  const variantClasses = {
    primary: 'bg-gold hover:bg-yellow-600 text-navy',
    secondary: 'bg-navy hover:bg-blue-900 text-white border-2 border-navy'
  };

  return (
    <Link href={href} className={`${baseClasses} ${variantClasses[variant]}`}>
      {text}
    </Link>
  );
}
