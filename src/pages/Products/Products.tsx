import CustomTable from './Table/Table';
import SearchInput from '@/components/SearchInput';
import CreateProductButton from './CreateProductButton';

function Products() {
  return (
    <div className='container mx-auto'>
      <div className='mb-6'>
        <p className='text-2xl font-bold'>Quản lý thuốc</p>
      </div>
      <div className='flex items-center gap-4 mb-6'>
        <CreateProductButton />
        <SearchInput />
      </div>
      <CustomTable />
    </div>
  );
}

export default Products;
