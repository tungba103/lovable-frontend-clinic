import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { UseFormReturn } from 'react-hook-form';
import { visitDetailSchema } from '@/validations/VisitDetailSchema';
import { z } from 'zod';
import { CircleX } from 'lucide-react';
import { useListProducts } from '@/hooks/data/useListProducts';
import { useState } from 'react';
import { PrescriptionItem } from '@/types/api/visit';
import { Skeleton } from '@/components/ui/skeleton';

type PrescriptionFormProps = {
  form: UseFormReturn<z.infer<typeof visitDetailSchema>>;
  isLoading: boolean;
  disabled?: boolean;
};

const PrescriptionForm = ({ form, isLoading, disabled }: PrescriptionFormProps) => {
  const { products } = useListProducts();
  const [selectedProductId, setSelectedProductId] = useState<string>('');

  const addPrescriptionItem = () => {
    if (!selectedProductId) return;

    const product = products?.find((p) => p.id === Number(selectedProductId));
    if (!product) return;

    const newItem: PrescriptionItem = {
      productId: product.id,
      productName: product.name,
      quantity: 1,
      price: product.price,
      discount: 0,
      morningDosage: 0,
      noonDosage: 0,
      afternoonDosage: 0,
      eveningDosage: 0,
      usageInstructions: '',
      doctorNotes: '',
    };

    const currentItems = form.getValues('prescription.prescriptionItems') || [];
    form.setValue('prescription.prescriptionItems', [...currentItems, newItem]);
    updateTotalAmount();
    setSelectedProductId('');
  };

  const removePrescriptionItem = (index: number) => {
    const currentItems = form.getValues('prescription.prescriptionItems') || [];
    form.setValue(
      'prescription.prescriptionItems',
      currentItems.filter((_, i) => i !== index)
    );
    updateTotalAmount();
  };

  const updateQuantity = (index: number, quantity: number) => {
    const currentItems = form.getValues('prescription.prescriptionItems') || [];
    currentItems[index].quantity = quantity;
    form.setValue('prescription.prescriptionItems', currentItems);
    updateTotalAmount();
  };

  const updateTotalAmount = () => {
    const items = form.getValues('prescription.prescriptionItems') || [];
    const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    form.setValue('prescription.totalAmount', total);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Thông tin về đơn thuốc</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          <div className='flex gap-4'>
            <div className='w-96'>
              <Label>Chọn thuốc</Label>
              <select
                disabled={disabled}
                className={`w-full border rounded-md p-2 ${disabled && 'text-slate-300'}`}
                value={selectedProductId}
                onChange={(e) => setSelectedProductId(e.target.value)}
              >
                <option value=''>Chọn thuốc...</option>
                {products?.map((product) => (
                  <option
                    key={product.id}
                    value={product.id}
                  >
                    {product.name}
                  </option>
                ))}
              </select>
            </div>
            <Button
              className='self-end'
              onClick={addPrescriptionItem}
              disabled={!selectedProductId || disabled}
            >
              Thêm thuốc
            </Button>
          </div>

          <div className='border rounded-md'>
            <table className='w-full'>
              <thead className='bg-blue-50'>
                <tr>
                  <th className='text-left p-2'>ID</th>
                  <th className='text-left p-2'>Tên thuốc</th>
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
                  {form.watch('prescription.prescriptionItems')?.map((item, index) => (
                    <tr
                      key={index}
                      className='border-t'
                    >
                      <td className='p-2'>{item.productId}</td>
                      <td className='p-2'>{item.productName}</td>
                      <td className='p-2'>
                        <Input
                          type='number'
                          min='1'
                          value={item.quantity}
                          className='w-20'
                          onChange={(e) => updateQuantity(index, Number(e.target.value))}
                          disabled={disabled}
                        />
                      </td>
                      <td className='p-2'>{item.price.toLocaleString('vi-VN')}</td>
                      <td className='p-2'>{(item.price * item.quantity).toLocaleString('vi-VN')}</td>
                      <td className='p-2 text-center'>
                        <Button
                          variant='ghost'
                          size='sm'
                          onClick={() => removePrescriptionItem(index)}
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
                <tr>
                  <td
                    className='p-2 font-medium'
                    colSpan={3}
                  >
                    Tổng tiền:
                  </td>
                  <td className='p-2 font-medium'>
                    {form.watch('prescription.totalAmount')?.toLocaleString('vi-VN') || 0} VND
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

export default PrescriptionForm;
