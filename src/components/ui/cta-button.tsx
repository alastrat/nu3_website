'use client';

import React from 'react';
import { Link } from '@/i18n/routing';
import { ChevronsRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const ctaButtonVariants = cva(
  "inline-flex items-center gap-4 rounded-full font-bold transition-all hover:scale-105 group whitespace-nowrap border-2",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground border-primary hover:bg-transparent hover:text-primary",
        white: "bg-white text-foreground border-white hover:bg-transparent hover:text-white",
        outline: "bg-transparent text-white border-white hover:bg-white hover:text-foreground",
      },
      size: {
        default: "px-8 py-4 text-lg",
        sm: "px-6 py-2.5 text-sm",
        lg: "px-10 py-5 text-xl",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

interface CtaButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof ctaButtonVariants> {
  href?: string;
  icon?: React.ReactNode;
}

const CtaButton = React.forwardRef<HTMLButtonElement, CtaButtonProps>(
  ({ className, variant, size, href, icon, children, ...props }, ref) => {
    
    // Icon container styles logic
    const getIconStyles = () => {
      switch (variant) {
        case 'primary':
          return "bg-white text-primary group-hover:bg-primary group-hover:text-white";
        case 'white':
          return "bg-primary text-white group-hover:bg-white group-hover:text-primary";
        case 'outline':
          return "bg-white text-primary group-hover:bg-primary group-hover:text-white";
        default:
          return "bg-white text-primary";
      }
    };
    
    const content = (
      <>
        <div className={cn(
          "flex h-8 w-8 items-center justify-center rounded-full transition-all group-hover:translate-x-1 shrink-0",
          getIconStyles()
        )}>
          {icon || <ChevronsRight className="h-5 w-5" strokeWidth={3} />}
        </div>
        {children}
      </>
    );

    if (href) {
      return (
        <Link 
          href={href} 
          className={cn(ctaButtonVariants({ variant, size, className }))}
        >
          {content}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        className={cn(ctaButtonVariants({ variant, size, className }))}
        {...props}
      >
        {content}
      </button>
    );
  }
);

CtaButton.displayName = 'CtaButton';

export { CtaButton };
