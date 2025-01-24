import CustomTable from './Table/Table';
import SearchInput from '@/components/SearchInput';
import CreateCustomerButton from './CreateCustomerButton';

function CustomersPage() {
  return (
    <div className='container mx-auto'>
      <div className='mb-6'>
        <p className='text-2xl font-bold'>Quản lý bệnh nhân</p>
      </div>
      <div className='flex items-center gap-4 mb-6'>
        <CreateCustomerButton />
        <SearchInput />
      </div>
      <CustomTable />
    </div>
  );
}

export default CustomersPage;
