import { Loader2 } from 'lucide-react';
import { Button, ButtonProps } from './ui/button';
import { cn } from '@/lib/utils';

const AsyncButton = ({
  children,
  onClick,
  isLoading,
  className,
  disabled,
  size,
  variant,
}: {
  children: React.ReactNode;
  onClick: () => void;
  isLoading: boolean;
  className?: string;
  disabled?: boolean;
  size?: ButtonProps['size'];
  variant?: ButtonProps['variant'];
}) => {
  return (
    <Button
      onClick={onClick}
      disabled={isLoading || disabled}
      className={cn('min-w-14', className)}
      size={size}
      variant={variant}
    >
      {isLoading ? <Loader2 className='w-6 h-4 animate-spin' /> : children}
    </Button>
  );
};

export default AsyncButton;
