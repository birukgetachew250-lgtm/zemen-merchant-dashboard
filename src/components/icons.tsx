import Image from 'next/image';

export const Logo = ({ className, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <Image
      src="/logo.png"
      alt="Zemen Bank Logo"
      width={64}
      height={64}
      className={className}
      {...props}
    />
  );
  