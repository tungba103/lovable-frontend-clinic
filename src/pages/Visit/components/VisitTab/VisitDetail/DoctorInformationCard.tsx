import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { visitDetailSchema } from '@/validations/VisitDetailSchema';
import { Skeleton } from '@/components/ui/skeleton';

interface DoctorInformationCardProps {
  form: UseFormReturn<z.infer<typeof visitDetailSchema>>;
  isLoading: boolean;
  disabled?: boolean;
}

const DoctorInformationCard = ({ form, isLoading, disabled }: DoctorInformationCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Thông tin dành cho bác sĩ</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='flex justify-start gap-4'>
          <div className='w-96'>
            <Label>Chẩn đoán</Label>
            {isLoading ? (
              <Skeleton className='h-10 w-full' />
            ) : (
              <Input
                disabled={disabled}
                className='my-2'
                placeholder='Chẩn đoán'
                {...form.register('diagnosis')}
              />
            )}
          </div>
          <div className='w-96'>
            <Label>Triệu chứng chính</Label>
            {isLoading ? (
              <Skeleton className='h-10 w-full' />
            ) : (
              <Input
                disabled={disabled}
                className='my-2'
                placeholder='Triệu chứng chính'
                {...form.register('symptoms')}
              />
            )}
          </div>
        </div>
        <div className='w-96'>
          <Label>Tiền sử bản thân/gia đình</Label>
          {isLoading ? (
            <Skeleton className='h-10 w-full' />
          ) : (
            <Input
              disabled={disabled}
              className='my-2'
              placeholder='Tiền sử bản thân/gia đình'
              {...form.register('personalMedicalHistory')}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DoctorInformationCard;
