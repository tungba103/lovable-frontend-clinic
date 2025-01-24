import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useVisit } from '@/contexts/VisitContext';
import { useVisit as useVisitData } from '@/hooks/data/useVisit';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { visitDetailSchema } from '@/validations/VisitDetailSchema';
import { useVisitMutation } from '@/hooks/data/useVisitMutation';
import { z } from 'zod';
import { toast } from 'react-toastify';
import { PrescriptionItem, VisitStatus } from '@/types/api/visit';
import { useCallback, useEffect, useState } from 'react';
import { useListProducts } from '@/hooks/data/useListProducts';
import { CircleX } from 'lucide-react';
import { useListServices } from '@/hooks/data/useListServices';

const VisitDetail = () => {
  const { selectedVisitId } = useVisit();
  const { visit } = useVisitData(selectedVisitId);
  const { updateMutation } = useVisitMutation();
  const { products } = useListProducts();
  const { services } = useListServices();
  const [selectedProductId, setSelectedProductId] = useState<string>('');
  const [selectedServiceId, setSelectedServiceId] = useState<string>('');

  const form = useForm<z.infer<typeof visitDetailSchema>>({
    resolver: zodResolver(visitDetailSchema),
  });

  const onSubmit = (data: z.infer<typeof visitDetailSchema>) => {
    if (!selectedVisitId) return;

    console.log({
      visitId: selectedVisitId,
      data: {
        ...data,
        status: VisitStatus.IN_PROGRESS,
        prescription: {
          ...data.prescription,
          totalAmount: data.prescription.PrescriptionItem.reduce((acc, item) => acc + item.price * item.quantity, 0),
          totalDiscount: data.prescription.PrescriptionItem.reduce((acc, item) => acc + item.discount, 0),
        },
        serviceUsage: {
          ...data.serviceUsage,
          totalAmount: data.serviceUsage.ServiceUsageItem.reduce((acc, item) => acc + item.price * item.quantity, 0),
          totalDiscount: data.serviceUsage.ServiceUsageItem.reduce((acc, item) => acc + item.discount, 0),
        },
      },
    });

    updateMutation.mutate(
      {
        visitId: selectedVisitId,
        data: {
          ...data,
          status: VisitStatus.IN_PROGRESS,
          prescription: {
            ...data.prescription,
            totalAmount: data.prescription.PrescriptionItem.reduce((acc, item) => acc + item.price * item.quantity, 0),
            totalDiscount: data.prescription.PrescriptionItem.reduce((acc, item) => acc + item.discount, 0),
          },
          serviceUsage: {
            ...data.serviceUsage,
            totalAmount: data.serviceUsage.ServiceUsageItem.reduce((acc, item) => acc + item.price * item.quantity, 0),
            totalDiscount: data.serviceUsage.ServiceUsageItem.reduce((acc, item) => acc + item.discount, 0),
          },
        },
      },
      {
        onSuccess: () => {
          toast.success('Cập nhật thành công');
        },
      }
    );
  };

  const resetForm = useCallback(() => {
    if (!visit) return;
    console.log(visit);
    form.reset({
      diagnosis: visit?.diagnosis || '',
      symptoms: visit?.symptoms || '',
      personalMedicalHistory: visit?.personalMedicalHistory || '',
      familyMedicalHistory: visit?.familyMedicalHistory || '',
      prescription: {
        totalAmount: visit?.prescription?.totalAmount || 0,
        totalDiscount: visit?.prescription?.totalDiscount || 0,
        PrescriptionItem: visit?.prescription?.PrescriptionItem || [],
      },
      serviceUsage: {
        totalAmount: visit?.serviceUsage?.totalAmount || 0,
        totalDiscount: visit?.serviceUsage?.totalDiscount || 0,
        ServiceUsageItem: visit?.serviceUsage?.ServiceUsageItem || [],
      },
      reExaminationTime: visit?.reExaminationTime ? new Date(visit?.reExaminationTime).toISOString().split('T')[0] : '',
      advice: visit?.advice || '',
    });
  }, [visit, form]);

  useEffect(() => {
    resetForm();
  }, [resetForm]);

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
    };

    const currentItems = form.getValues('prescription.PrescriptionItem') || [];
    form.setValue('prescription.PrescriptionItem', [...currentItems, newItem]);
    updateTotalAmount();
    setSelectedProductId('');
  };

  const removePrescriptionItem = (index: number) => {
    const currentItems = form.getValues('prescription.PrescriptionItem') || [];
    form.setValue(
      'prescription.PrescriptionItem',
      currentItems.filter((_, i) => i !== index)
    );
    updateTotalAmount();
  };

  const updateQuantity = (index: number, quantity: number) => {
    const currentItems = form.getValues('prescription.PrescriptionItem') || [];
    currentItems[index].quantity = quantity;
    form.setValue('prescription.PrescriptionItem', currentItems);
    updateTotalAmount();
  };

  const updateTotalAmount = () => {
    const items = form.getValues('prescription.PrescriptionItem') || [];
    const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    form.setValue('prescription.totalAmount', total);
  };

  const addServiceItem = () => {
    if (!selectedServiceId) return;

    const service = services?.find((s) => s.id === Number(selectedServiceId));
    if (!service) return;

    const newItem = {
      serviceId: service.id,
      serviceName: service.name,
      quantity: 1,
      price: service.price,
      discount: 0,
    };

    const currentItems = form.getValues('serviceUsage.ServiceUsageItem') || [];
    form.setValue('serviceUsage.ServiceUsageItem', [...currentItems, newItem]);
    updateServiceTotalAmount();
    setSelectedServiceId('');
  };

  const removeServiceItem = (index: number) => {
    const currentItems = form.getValues('serviceUsage.ServiceUsageItem') || [];
    form.setValue(
      'serviceUsage.ServiceUsageItem',
      currentItems.filter((_, i) => i !== index)
    );
    updateServiceTotalAmount();
  };

  const updateServiceQuantity = (index: number, quantity: number) => {
    const currentItems = form.getValues('serviceUsage.ServiceUsageItem') || [];
    currentItems[index].quantity = quantity;
    form.setValue('serviceUsage.ServiceUsageItem', currentItems);
    updateServiceTotalAmount();
  };

  const updateServiceTotalAmount = () => {
    const items = form.getValues('serviceUsage.ServiceUsageItem') || [];
    const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    form.setValue('serviceUsage.totalAmount', total);
  };

  console.log(form.watch('prescription.PrescriptionItem'));

  return (
    <div className='w-full'>
      <p className='w-full bg-blue-200 ps-4 py-2 mb-4'>
        Ngày: {new Date(visit?.createdAt || '').toLocaleDateString('vi-VN')}
      </p>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-4 h-[80vh] overflow-y-scroll'
      >
        <Card>
          <CardHeader>
            <CardTitle>Thông tin dành cho bác sĩ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='flex justify-start gap-4'>
              <div className='w-96'>
                <Label>Chẩn đoán</Label>
                <Input
                  className='my-2'
                  placeholder='Chẩn đoán'
                  {...form.register('diagnosis')}
                />
              </div>
              <div className='w-96'>
                <Label>Triệu chứng chính</Label>
                <Input
                  className='my-2'
                  placeholder='Triệu chứng chính'
                  {...form.register('symptoms')}
                />
              </div>
            </div>
            <div className='w-96'>
              <Label>Tiền sử bản thân/gia đình</Label>
              <Input
                className='my-2'
                placeholder='Tiền sử bản thân/gia đình'
                {...form.register('personalMedicalHistory')}
              />
            </div>
          </CardContent>
        </Card>

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
                    className='w-full border rounded-md p-2'
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
                  disabled={!selectedProductId}
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
                  <tbody>
                    {form.watch('prescription.PrescriptionItem')?.map((item, index) => (
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
                          />
                        </td>
                        <td className='p-2'>{item.price.toLocaleString('vi-VN')}</td>
                        <td className='p-2'>{(item.price * item.quantity).toLocaleString('vi-VN')}</td>
                        <td className='p-2 text-center'>
                          <Button
                            variant='ghost'
                            size='sm'
                            onClick={() => removePrescriptionItem(index)}
                          >
                            <CircleX />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
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

        <Card>
          <CardHeader>
            <CardTitle>Thông tin về dịch vụ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              <div className='flex gap-4'>
                <div className='w-96'>
                  <Label>Chọn dịch vụ</Label>
                  <select
                    className='w-full border rounded-md p-2'
                    value={selectedServiceId}
                    onChange={(e) => setSelectedServiceId(e.target.value)}
                  >
                    <option value=''>Chọn dịch vụ...</option>
                    {services?.map((service) => (
                      <option
                        key={service.id}
                        value={service.id}
                      >
                        {service.name}
                      </option>
                    ))}
                  </select>
                </div>
                <Button
                  className='self-end'
                  onClick={addServiceItem}
                  disabled={!selectedServiceId}
                >
                  Thêm dịch vụ
                </Button>
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
                  <tbody>
                    {form.watch('serviceUsage.ServiceUsageItem')?.map((item, index) => (
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
                          />
                        </td>
                        <td className='p-2'>{item.price.toLocaleString('vi-VN')}</td>
                        <td className='p-2'>{(item.price * item.quantity).toLocaleString('vi-VN')}</td>
                        <td className='p-2 text-center'>
                          <Button
                            variant='ghost'
                            size='sm'
                            onClick={() => removeServiceItem(index)}
                          >
                            <CircleX />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className='border-t'>
                    <tr>
                      <td
                        className='p-2 font-medium'
                        colSpan={3}
                      >
                        Tổng tiền:
                      </td>
                      <td className='p-2 font-medium'>
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

        <Card>
          <CardHeader>
            <CardTitle>Tái khám</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='flex justify-start gap-4'>
              <div className='w-96'>
                <Label>Ngày tái khám</Label>
                <Input
                  className='my-2'
                  placeholder='Ngày tái khám'
                  type='date'
                  {...form.register('reExaminationTime')}
                />
              </div>
              <div className='w-96'>
                <Label>Lời dặn</Label>
                <Input
                  className='my-2'
                  placeholder='Lời dặn'
                  {...form.register('advice')}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className='flex flex-col justify-between items-start gap-4'>
          <div className='text-lg font-semibold'>
            Tổng tiền:{' '}
            {(
              (form.watch('prescription.totalAmount') || 0) + (form.watch('serviceUsage.totalAmount') || 0)
            ).toLocaleString('vi-VN')}{' '}
            VND
          </div>
          <Button type='submit'>
            <span>Hoàn tất lượt khám</span>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default VisitDetail;
