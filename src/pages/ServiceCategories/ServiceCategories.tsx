import CustomTable from './Table/Table';
import SearchInput from '@/components/SearchInput';
import CreateServiceCategoryButton from './CreateServiceCategoryButton';

function ServiceCategories() {
  return (
    <div className='container mx-auto'>
      <div className='mb-6'>
        <p className='text-2xl font-bold'>Quản lý danh mục dịch vụ</p>
      </div>
      <div className='flex items-center gap-4 mb-6'>
        <CreateServiceCategoryButton />
        <SearchInput />
      </div>
      <CustomTable />
    </div>
  );
}

export default ServiceCategories;
