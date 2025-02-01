import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import useQueryString from '@/hooks/useQueryString';
import { Search } from 'lucide-react';

interface SearchInputProps {
  placeholder?: string;
}

const SearchInput = ({ placeholder = 'Tìm kiếm...' }: SearchInputProps) => {
  const { queryString, setQueryString } = useQueryString();
  const { search } = queryString;

  // Local state for the input value (initializes with the current search query)
  const [searchTerm, setSearchTerm] = useState(search || '');

  // Update the URL query string after 1 second of no changes to the searchTerm.
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('searchTerm', searchTerm, searchTerm === '');
      console.log('search', search);
      // Update the query string with the new search term and reset the page to 1.
      if (searchTerm !== search) {
        setQueryString({
          ...queryString,
          search: searchTerm,
          page: '1', // or page: 1 if you're handling numbers
        });
      }
    }, 1000);

    // Clear the timer if the component unmounts or searchTerm changes before 1 second
    return () => clearTimeout(timer);
  }, [searchTerm, queryString, setQueryString, search]);

  // Update local state immediately on input change.
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
