import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { UseFormReturn } from 'react-hook-form';
import { visitDetailSchema } from '@/validations/VisitDetailSchema';
import { z } from 'zod';
import { CircleX } from 'lucide-react';
import { useListServices } from '@/hooks/data/useListServices';
import { ServiceUsageItem } from '@/types/api/visit';
import { Skeleton } from '@/components/ui/skeleton';
import { Combobox } from '@/components/RHFInput/Combobox';
import { Service } from '@/types/api/service';

type ServiceFormProps = {
  form: UseFormReturn<z.infer<typeof visitDetailSchema>>;
  isLoading: boolean;
  disabled?: boolean;
};

const ServiceForm = ({ form, isLoading, disabled }: ServiceFormProps) => {
  const addServiceItem = (selectedService: Service) => {
    if (!selectedService) return;

    const currentItems = form.getValues('serviceUsage.serviceUsageItems') || [];
    const existingItemIndex = currentItems.findIndex((item) => item.serviceId === selectedService.id);

    if (existingItemIndex >= 0) {
      // If product exists, increment quantity
      currentItems[existingItemIndex].quantity += 1;
      form.setValue('serviceUsage.serviceUsageItems', currentItems);
    } else {
      // If product doesn't exist, add new item
      const newItem: ServiceUsageItem = {
        serviceId: selectedService.id,
        serviceName: selectedService.name,
        quantity: 1,
        price: selectedService.price,
        discount: 0,
      };

      form.setValue('serviceUsage.serviceUsageItems', [...currentItems, newItem]);
    }

    updateServiceTotalAmount();
  };

  const removeServiceItem = (index: number) => {
    const currentItems = form.getValues('serviceUsage.serviceUsageItems') || [];
    form.setValue(
      'serviceUsage.serviceUsageItems',
      currentItems.filter((_, i) => i !== index)
    );
    updateServiceTotalAmount();
  };

  const updateServiceQuantity = (index: number, quantity: number) => {
    const currentItems = form.getValues('serviceUsage.serviceUsageItems') || [];
    currentItems[index].quantity = quantity;
    form.setValue('serviceUsage.serviceUsageItems', currentItems);
    updateServiceTotalAmount();
  };

  const updateServiceTotalAmount = () => {
    const items = form.getValues('serviceUsage.serviceUsageItems') || [];
    const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    form.setValue('serviceUsage.totalAmount', total);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Thông tin về dịch vụ</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          <div className='flex gap-4'>
            <div className='w-96 flex items-center gap-2'>
              <Combobox
                disabled={disabled}
                useListData={useListServices}
                mapDataToItems={(services: Service[]) =>
                  services?.map((service: Service) => {
                    return {
                      key: service.id.toString(),
                      value: service,
                      label: `${service.name} - ${service.price}`,
                    };
                  })
                }
                onChange={(value) => addServiceItem(value)}
                placeholder='Tìm kiếm dịch vụ...'
              />
            </div>
          </div>

          <div className='border rounded-md'>
            <table className='w-full'>
              <thead className='bg-blue-50'>
                <tr>
                  <th className='text-left p-2'>ID</th>
                  <th className='text-left p-2'>Tên dịch vụ</th>
                  <th className='text-left p-2'>Số lượng</th>
                  <th className='text-left p-2'>Đơn giá</th>
                  <th className='text-left p-2'>Thành tiền</th>
                  <th className='p-2'></th>
                </tr>
              </thead>
              {isLoading ? (
                <tbody>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <tr key={index}>
                      <td
                        colSpan={5}
                        className='p-2'
                      >
                        <Skeleton className='h-10 w-full' />
                      </td>
                    </tr>
                  ))}
                </tbody>
              ) : (
                <tbody>
                  {form.watch('serviceUsage.serviceUsageItems')?.map((item, index) => (
                    <tr
                      key={index}
                      className='border-t'
                    >
                      <td className='p-2'>{item.serviceId}</td>
                      <td className='p-2'>{item.serviceName}</td>
                      <td className='p-2'>
                        <Input
                          type='number'
                          min='1'
                          value={item.quantity}
                          className='w-20'
                          onChange={(e) => updateServiceQuantity(index, Number(e.target.value))}
                          disabled={disabled}
                        />
                      </td>
                      <td className='p-2'>{item.price.toLocaleString('vi-VN')}</td>
                      <td className='p-2'>{(item.price * item.quantity).toLocaleString('vi-VN')}</td>
                      <td className='p-2 text-center'>
                        <Button
                          type='button'
                          variant='ghost'
                          size='sm'
                          onClick={() => removeServiceItem(index)}
                          disabled={disabled}
                        >
                          <CircleX />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
              <tfoot className='border-t'>
                <tr className='bg-blue-200'>
                  <td colSpan={1}></td>
                  <td
                    className='p-2 font-bold'
                    colSpan={3}
                  >
                    Tổng tiền:
                  </td>
                  <td className='p-2 font-bold'>
                    {form.watch('serviceUsage.totalAmount')?.toLocaleString('vi-VN') || 0} VND
                  </td>
                  <td></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceForm;
