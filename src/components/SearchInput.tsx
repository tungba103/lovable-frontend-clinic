import { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import useQueryString from '@/hooks/useQueryString';
import { Search } from 'lucide-react';

interface SearchInputProps {
  placeholder?: string;
}

const SearchInput = ({ placeholder = 'Tìm kiếm...' }: SearchInputProps) => {
  const { queryString, setQueryString } = useQueryString();
  const { search } = queryString;
  const [searchTerm, setSearchTerm] = useState(search || '');
  const isInitialMount = useRef(true);

  useEffect(() => {
    // Skip the first render
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const timer = setTimeout(() => {
      if (searchTerm !== search) {
        const newQueryString = { ...queryString };

        if (searchTerm) {
          newQueryString.search = searchTerm;
          newQueryString.page = '1';
        } else {
          if ('search' in newQueryString) {
            delete newQueryString.search;
            newQueryString.page = '1';
          }
        }

        setQueryString(newQueryString);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [searchTerm, queryString, setQueryString, search]);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  return (
    <div className='w-96 relative'>
      <Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
      <Input
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
        className='pl-8 rounded-lg'
      />
    </div>
  );
};

export default SearchInput;
