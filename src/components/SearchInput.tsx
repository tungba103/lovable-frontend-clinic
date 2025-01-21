import { Input } from '@/components/ui/input';
import useQueryString from '@/hooks/useQueryString';
import { Search } from 'lucide-react';

const SearchInput = () => {
  const { queryString, setQueryString } = useQueryString();

  const { search } = queryString;

  const handleSearch = (value: string) => {
    setQueryString({ ...queryString, search: value });
  };

  return (
    <div className='w-96 relative'>
      <Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
      <Input
        placeholder='Tìm kiếm...'
        value={search || ''}
        onChange={(e) => handleSearch(e.target.value)}
        className='pl-8 rounded-lg'
      />
    </div>
  );
};

export default SearchInput;
