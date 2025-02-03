import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useVisitMutation } from '@/hooks/data/useVisitMutation';
import { CreateVisitRequest } from '@/types/api/visit';
import { useState } from 'react';
import { existingVisitFormSchema, newCustomerVisitFormSchema } from '@/validations/VisitSchema';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCustomerMutation } from '@/hooks/data/useCustomerMutation';
import { CreateCustomerRequest } from '@/types/api/customer';
import ExistingCustomerVisitForm from './ExistingCustomerVisitForm';
import NewCustomerVisitForm from './NewCustomerVisitForm';

const CreateVisitButton = () => {
  const [open, setOpen] = useState(false);
  const { createMutation } = useVisitMutation();
  const { createMutation: createCustomerMutation } = useCustomerMutation();

  const existingCustomerForm = useForm<z.infer<typeof existingVisitFormSchema>>({
    resolver: zodResolver(existingVisitFormSchema),
  });

  const newCustomerForm = useForm<z.infer<typeof newCustomerVisitFormSchema>>({
    resolver: zodResolver(newCustomerVisitFormSchema),
    defaultValues: {
      gender: 'MALE',
    },
  });

  async function onSubmitExisting(values: z.infer<typeof existingVisitFormSchema>) {
    const visitData: CreateVisitRequest = {
      customerId: values.customerId,
    };

    createMutation.mutate(visitData, {
      onSuccess: () => {
        setOpen(false);
        existingCustomerForm.reset();
      },
    });
  }

  async function onSubmitNew(values: z.infer<typeof newCustomerVisitFormSchema>) {
    const customerData: CreateCustomerRequest = {
      name: values.name,
      gender: values.gender,
      birthDate: values.birthDate,
      parentName: values.parentName,
      parentPhone: values.parentPhone,
      address: values.address || '',
    };

    createCustomerMutation.mutate(customerData, {
      onSuccess: (newCustomer) => {
        // Create visit with new customer ID
        const visitData: CreateVisitRequest = {
          customerId: newCustomer.data.result.id,
        };
        createMutation.mutate(visitData, {
          onSuccess: () => {
            setOpen(false);
            newCustomerForm.reset();
          },
        });
      },
    });
  }

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger>
        <Button onClick={() => setOpen(true)}>
          <Plus />
          <span>Thêm lượt khám mới</span>
        </Button>
      </DialogTrigger>
      <DialogContent
        onCloseAutoFocus={(e) => {
          e.preventDefault();
          existingCustomerForm.reset();
          newCustomerForm.reset();
        }}
        // onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className='mb-8'>
            <span className='px-2 py-1.5 rounded-sm bg-blue-300 mr-2' />
            Thêm lượt khám mới
          </DialogTitle>
          <Tabs
            defaultValue='existing'
            className='w-full'
          >
            <TabsList className='grid w-full grid-cols-2'>
              <TabsTrigger value='existing'>Bệnh nhân cũ</TabsTrigger>
              <TabsTrigger value='new'>Bệnh nhân mới</TabsTrigger>
            </TabsList>
            <TabsContent value='existing'>
              <ExistingCustomerVisitForm
                form={existingCustomerForm}
                onSubmit={onSubmitExisting}
                onCancel={() => setOpen(false)}
                isLoading={createMutation.isPending}
              />
            </TabsContent>
            <TabsContent value='new'>
              <NewCustomerVisitForm
                form={newCustomerForm}
                onSubmit={onSubmitNew}
                onCancel={() => setOpen(false)}
                isLoading={createMutation.isPending}
              />
            </TabsContent>
          </Tabs>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CreateVisitButton;
