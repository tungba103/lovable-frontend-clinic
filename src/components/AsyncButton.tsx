import { Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

const AsyncButton = ({
  children,
  onClick,
  isLoading,
  className,
  disabled,
}: {
  children: React.ReactNode;
  onClick: () => void;
  isLoading: boolean;
  className?: string;
  disabled?: boolean;
}) => {
  return (
    <Button
      onClick={onClick}
      disabled={isLoading || disabled}
      className={cn('min-w-14', className)}
    >
      {isLoading ? <Loader2 className='w-6 h-4 animate-spin' /> : children}
    </Button>
  );
};

export default AsyncButton;
