import { Loader2 } from 'lucide-react';
import { Button } from './ui/button';

const AsyncButton = ({
  children,
  onClick,
  isLoading,
}: {
  children: React.ReactNode;
  onClick: () => void;
  isLoading: boolean;
}) => {
  return (
    <Button
      onClick={onClick}
      disabled={isLoading}
      className='w-14'
    >
      {isLoading ? <Loader2 className='w-6 h-4 animate-spin' /> : children}
    </Button>
  );
};

export default AsyncButton;
