import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { UseFormReturn } from 'react-hook-form';
import { visitDetailSchema } from '@/validations/VisitDetailSchema';
import { z } from 'zod';
import { CircleX, ChevronDown, ChevronRight } from 'lucide-react';
import { useListProducts } from '@/hooks/data/useListProducts';
import { PrescriptionItem } from '@/types/api/visit';
import { Skeleton } from '@/components/ui/skeleton';
import { Combobox } from '@/components/RHFInput/Combobox';
import { Product } from '@/types/api/product';
import { useState, Fragment } from 'react';

type PrescriptionFormProps = {
  form: UseFormReturn<z.infer<typeof visitDetailSchema>>;
  isLoading: boolean;
  disabled?: boolean;
};

const PrescriptionForm = ({ form, isLoading, disabled }: PrescriptionFormProps) => {
  const [expandedRows, setExpandedRows] = useState<number[]>([]);

  const toggleRow = (index: number) => {
    setExpandedRows((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]));
  };

  const addPrescriptionItem = (selectedProduct: Product) => {
    console.log('selectedProduct', selectedProduct);
    if (!selectedProduct) return;

    const currentItems = form.getValues('prescription.prescriptionItems') || [];
    const existingItemIndex = currentItems.findIndex((item) => item.productId === selectedProduct.id);

    if (existingItemIndex >= 0) {
      // If product exists, increment quantity
      currentItems[existingItemIndex].quantity += 1;
      form.setValue('prescription.prescriptionItems', currentItems);
    } else {
      // If product doesn't exist, add new item
      const newItem: PrescriptionItem = {
        productId: selectedProduct.id,
        productName: selectedProduct.name,
        quantity: 1,
        price: selectedProduct.price,
        discount: 0,
        morningDosage: 0,
        noonDosage: 0,
        afternoonDosage: 0,
        eveningDosage: 0,
        usageInstructions: '',
        doctorNotes: '',
      };
      form.setValue('prescription.prescriptionItems', [...currentItems, newItem]);
    }

    updateTotalAmount();
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
            <div className='w-96 flex items-center gap-2'>
              {/* <Label className='w-28'>Chọn thuốc</Label> */}
              <Combobox
                disabled={disabled}
                useListData={useListProducts}
                mapDataToItems={(products: Product[]) =>
                  products?.map((product: Product) => {
                    return {
                      key: product.id.toString(),
                      value: product,
                      label: `${product.name} - ${product.price}`,
                    };
                  })
                }
                // value={selectedProduct}
                onChange={(value) => addPrescriptionItem(value)}
                placeholder='Tìm kiếm thuốc...'
              />
            </div>
            {/* <Button
              className='self-end'
              onClick={addPrescriptionItem}
              disabled={!selectedProduct || disabled}
            >
              Thêm thuốc
            </Button> */}
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
                    <Fragment key={index}>
                      <tr
                        className={`border-t cursor-pointer hover:bg-gray-50 ${
                          expandedRows.includes(index) ? 'bg-gray-50' : ''
                        }`}
                        onClick={() => toggleRow(index)}
                      >
                        <td className='p-2'>
                          <div className='flex items-center gap-2'>
                            {expandedRows.includes(index) ? (
                              <ChevronDown className='w-5 h-5' />
                            ) : (
                              <ChevronRight className='w-5 h-5' />
                            )}
                            {item.productId}
                          </div>
                        </td>
                        <td className='p-2'>{item.productName}</td>
                        <td className='p-2'>
                          <Input
                            type='number'
                            min='1'
                            value={item.quantity}
                            className='w-20'
                            onChange={(e) => {
                              e.stopPropagation();
                              updateQuantity(index, Number(e.target.value));
                            }}
                            disabled={disabled}
                            onClick={(e) => e.stopPropagation()}
                          />
                        </td>
                        <td className='p-2'>{item.price.toLocaleString('vi-VN')}</td>
                        <td className='p-2'>{(item.price * item.quantity).toLocaleString('vi-VN')}</td>
                        <td className='p-2 text-center'>
                          <Button
                            type='button'
                            variant='ghost'
                            size='sm'
                            onClick={(e) => {
                              e.stopPropagation();
                              removePrescriptionItem(index);
                            }}
                            disabled={disabled}
                          >
                            <CircleX />
                          </Button>
                        </td>
                      </tr>
                      {expandedRows.includes(index) && (
                        <tr className='bg-gray-50 w-full'>
                          <td
                            colSpan={6}
                            className='p-4'
                          >
                            <div className='space-y-4'>
                              <div className='flex items-center gap-20'>
                                <div className='flex items-center gap-2'>
                                  <label className='w-16'>Sáng:</label>
                                  <Input
                                    type='number'
                                    min='0'
                                    className='w-20'
                                    value={item.morningDosage}
                                    onChange={(e) => {
                                      const currentItems = form.getValues('prescription.prescriptionItems');
                                      currentItems[index].morningDosage = Number(e.target.value);
                                      form.setValue('prescription.prescriptionItems', currentItems);
                                    }}
                                    disabled={disabled}
                                  />
                                </div>
                                <div className='flex items-center gap-2'>
                                  <label className='w-16'>Trưa:</label>
                                  <Input
                                    type='number'
                                    min='0'
                                    className='w-20'
                                    value={item.noonDosage}
                                    onChange={(e) => {
                                      const currentItems = form.getValues('prescription.prescriptionItems');
                                      currentItems[index].noonDosage = Number(e.target.value);
                                      form.setValue('prescription.prescriptionItems', currentItems);
                                    }}
                                    disabled={disabled}
                                  />
                                </div>
                                <div className='flex items-center gap-2'>
                                  <label className='w-16'>Chiều:</label>
                                  <Input
                                    type='number'
                                    min='0'
                                    className='w-20'
                                    value={item.afternoonDosage}
                                    onChange={(e) => {
                                      const currentItems = form.getValues('prescription.prescriptionItems');
                                      currentItems[index].afternoonDosage = Number(e.target.value);
                                      form.setValue('prescription.prescriptionItems', currentItems);
                                    }}
                                    disabled={disabled}
                                  />
                                </div>
                                <div className='flex items-center gap-2'>
                                  <label className='w-16'>Tối:</label>
                                  <Input
                                    type='number'
                                    min='0'
                                    className='w-20'
                                    value={item.eveningDosage}
                                    onChange={(e) => {
                                      const currentItems = form.getValues('prescription.prescriptionItems');
                                      currentItems[index].eveningDosage = Number(e.target.value);
                                      form.setValue('prescription.prescriptionItems', currentItems);
                                    }}
                                    disabled={disabled}
                                  />
                                </div>
                              </div>

                              <div className='space-y-2'>
                                <div className='flex items-center gap-2'>
                                  <label className='w-32'>Hướng dẫn dùng:</label>
                                  <Input
                                    className='w-[800px]'
                                    value={item.usageInstructions}
                                    onChange={(e) => {
                                      const currentItems = form.getValues('prescription.prescriptionItems');
                                      currentItems[index].usageInstructions = e.target.value;
                                      form.setValue('prescription.prescriptionItems', currentItems);
                                    }}
                                    disabled={disabled}
                                    placeholder='Nhập hướng dẫn sử dụng thuốc...'
                                  />
                                </div>
                                <div className='flex items-center gap-2'>
                                  <label className='w-32'>Ghi chú:</label>
                                  <Input
                                    className='w-[800px]'
                                    value={item.doctorNotes}
                                    onChange={(e) => {
                                      const currentItems = form.getValues('prescription.prescriptionItems');
                                      currentItems[index].doctorNotes = e.target.value;
                                      form.setValue('prescription.prescriptionItems', currentItems);
                                    }}
                                    disabled={disabled}
                                    placeholder='Nhập ghi chú của bác sĩ...'
                                  />
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </Fragment>
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
                    Tổng tiền
                  </td>
                  <td className='p-2 font-bold'>
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
