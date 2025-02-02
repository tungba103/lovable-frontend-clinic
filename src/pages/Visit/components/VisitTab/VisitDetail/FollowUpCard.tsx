import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { visitDetailSchema } from '@/validations/VisitDetailSchema';
import { Skeleton } from '@/components/ui/skeleton';

interface FollowUpCardProps {
  form: UseFormReturn<z.infer<typeof visitDetailSchema>>;
  isLoading: boolean;
  disabled?: boolean;
}

const FollowUpCard = ({ form, isLoading, disabled }: FollowUpCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tái khám</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='flex justify-start gap-4'>
          <div className='w-96'>
            <Label>Ngày tái khám</Label>
            {isLoading ? (
              <Skeleton className='h-10 w-full' />
            ) : (
              <Input
                className='my-2'
                placeholder='Ngày tái khám'
                type='date'
                disabled={disabled}
                {...form.register('reExaminationTime')}
              />
            )}
          </div>
          <div className='w-96'>
            <Label>Lời dặn</Label>
            {isLoading ? (
              <Skeleton className='h-10 w-full' />
            ) : (
              <Input
                className='my-2'
                placeholder='Lời dặn'
                {...form.register('advice')}
                disabled={disabled}
              />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FollowUpCard;
