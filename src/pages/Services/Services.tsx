import CustomTable from './Table/Table';
import SearchInput from '@/components/SearchInput';
import CreateServiceButton from './CreateServiceButton';

function Services() {
  return (
    <div className='container mx-auto'>
      <div className='mb-6'>
        <p className='text-2xl font-bold'>Quản lý dịch vụ</p>
      </div>
      <div className='flex items-center gap-4 mb-6'>
        <CreateServiceButton />
        <SearchInput />
      </div>
      <CustomTable />
    </div>
  );
}

export default Services;
