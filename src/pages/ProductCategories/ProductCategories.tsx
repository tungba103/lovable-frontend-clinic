import CustomTable from './Table/Table';
import SearchInput from '@/components/SearchInput';
import CreateProductCategoryButton from './CreateProductCategoryButton';

function ProductCategories() {
  return (
    <div className='container mx-auto'>
      <div className='mb-6'>
        <p className='text-2xl font-bold'>Quản lý danh mục sản phẩm</p>
      </div>
      <div className='flex items-center gap-4 mb-6'>
        <CreateProductCategoryButton />
        <SearchInput />
      </div>
      <CustomTable />
    </div>
  );
}

export default ProductCategories;
