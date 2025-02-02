import { useVisit as useVisitData } from '@/hooks/data/useVisit';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { visitDetailSchema } from '@/validations/VisitDetailSchema';
import { useVisitMutation } from '@/hooks/data/useVisitMutation';
import { z } from 'zod';
import { VisitStatus } from '@/types/api/visit';
import { useEffect, useMemo } from 'react';
import { customFormatDate } from '@/utils/format-date.util';
import PrescriptionForm from './PrescriptionForm';
import ServiceForm from './ServiceForm';
import FollowUpCard from './FollowUpCard';
import DoctorInformationCard from './DoctorInformationCard';
import AsyncButton from '@/components/AsyncButton';
import { useVisitContext } from '../useVisitContext';
import { useCustomerModal } from '@/contexts/CustomerModal/CustomerModalContext';

const VisitDetail = () => {
  const { closeCustomerModal } = useCustomerModal();
  const { selectedVisitId } = useVisitContext();
  const { visit } = useVisitData(selectedVisitId);
  const { updateMutation } = useVisitMutation();

  const form = useForm<z.infer<typeof visitDetailSchema>>({
    resolver: zodResolver(visitDetailSchema),
    defaultValues: {
      // ... your default values ...
    },
  });

  const onSubmit = (data: z.infer<typeof visitDetailSchema>) => {
    if (!selectedVisitId) return;

    const body = {
      visitId: selectedVisitId,
      data: {
        ...data,
        status: VisitStatus.COMPLETED,
        prescription: {
          ...data.prescription,
          totalAmount: data.prescription.prescriptionItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
          totalDiscount: data.prescription.prescriptionItems.reduce((acc, item) => acc + item.discount, 0),
          prescriptionItems: data.prescription.prescriptionItems.map((item) => ({
            ...item,
            usageInstructions: item.usageInstructions || '',
            doctorNotes: item.doctorNotes || '',
          })),
        },
        serviceUsage: {
          ...data.serviceUsage,
          serviceUsageItems: data.serviceUsage.serviceUsageItems,
          totalAmount: data.serviceUsage.serviceUsageItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
          totalDiscount: data.serviceUsage.serviceUsageItems.reduce((acc, item) => acc + item.discount, 0),
        },
      },
    };

    updateMutation.mutate(body, {
      onSuccess: async () => {
        closeCustomerModal();
      },
    });
  };

  useEffect(() => {
    if (!visit) return;
    form.reset({
      diagnosis: visit?.diagnosis || '',
      symptoms: visit?.symptoms || '',
      personalMedicalHistory: visit?.personalMedicalHistory || '',
      prescription: {
        totalAmount: visit?.prescription?.totalAmount || 0,
        totalDiscount: visit?.prescription?.totalDiscount || 0,
        prescriptionItems: visit?.prescription?.prescriptionItems || [],
      },
      serviceUsage: {
        totalAmount: visit?.serviceUsage?.totalAmount || 0,
        totalDiscount: visit?.serviceUsage?.totalDiscount || 0,
        serviceUsageItems: visit?.serviceUsage?.serviceUsageItems || [],
      },
      reExaminationTime: visit?.reExaminationTime ? new Date(visit?.reExaminationTime).toISOString().split('T')[0] : '',
      advice: visit?.advice || '',
    });
  }, [form, visit]);

  console.log('Visit Detail ----------------------', selectedVisitId);

  const totalAmount = useMemo(() => {
    return (form.watch('prescription.totalAmount') || 0) + (form.watch('serviceUsage.totalAmount') || 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.watch('prescription.totalAmount'), form.watch('serviceUsage.totalAmount')]);

  const isDisabled = useMemo(() => {
    return visit?.status === VisitStatus.COMPLETED;
  }, [visit?.status]);

  return (
    <div className='w-full'>
      <p className='w-full bg-blue-200 ps-4 py-2 mb-4 rounded-lg border border-slate-300'>
        Ngày: {visit?.createdAt ? customFormatDate(new Date(visit.createdAt)) : '--/--/----'}
      </p>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-4 h-[80vh] overflow-y-scroll'
      >
        <DoctorInformationCard
          form={form}
          isLoading={!visit}
          disabled={isDisabled}
        />
        <PrescriptionForm
          form={form}
          isLoading={!visit}
          disabled={isDisabled}
        />
        <ServiceForm
          form={form}
          isLoading={!visit}
          disabled={isDisabled}
        />
        <FollowUpCard
          form={form}
          isLoading={!visit}
          disabled={isDisabled}
        />

        <div className='flex flex-col justify-between items-start gap-4'>
          <div className='text-lg font-semibold'>Tổng tiền: {totalAmount.toLocaleString('vi-VN')} VND</div>
          <AsyncButton
            isLoading={updateMutation.isPending}
            onClick={() => form.handleSubmit(onSubmit)}
            disabled={isDisabled}
            className='w-40'
          >
            <span>Hoàn tất lượt khám</span>
          </AsyncButton>
        </div>
      </form>
    </div>
  );
};

export default VisitDetail;
