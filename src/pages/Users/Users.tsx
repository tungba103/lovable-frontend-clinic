import CustomTable from './Table/Table';
import SearchInput from '@/components/SearchInput';
import CreateUserButton from './CreateUserButton';

function Users() {
  return (
    <div className='container mx-auto'>
      <div className='mb-6'>
        <p className='text-2xl font-bold'>Quản lý người dùng</p>
      </div>
      <div className='flex items-center gap-4 mb-6'>
        <CreateUserButton />
        <SearchInput />
      </div>
      <CustomTable />
    </div>
  );
}

export default Users;
