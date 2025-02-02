import { useListCustomers } from '@/hooks/data/useListCustomers';
import { Customer } from '@/types/api/customer';
import { useMemo, useState } from 'react';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';

type Item = {
  id: number;
  name: string;
};

const AutocompleteSearch = () => {
  const [search, setSearch] = useState('');
  const { data, isLoading } = useListCustomers({ page: '1', pageSize: '100', search, useQueryString: false });

  const items = useMemo(() => {
    if (!data || isLoading) return [];
    return data.map((customer: Customer) => ({
      id: customer.id,
      name: customer.name,
    }));
  }, [data, isLoading]);

  const handleOnSearch = (string: string, results: Item[]) => {
    setSearch(string);
    console.log(string, results);
  };

  const handleOnHover = (result: Item) => {
    // the item hovered
    console.log('hover', result);
  };

  const handleOnSelect = (item: Item) => {
    // the item selected
    console.log('select', item);
  };

  const handleOnFocus = () => {
    console.log('Focused');
  };

  console.log(items);

  const formatResult = (item: Item) => {
    return (
      <>
        <span style={{ display: 'block', textAlign: 'left' }}>id: {item.id}</span>
        <span style={{ display: 'block', textAlign: 'left' }}>name: {item.name}</span>
      </>
    );
  };

  return (
    <div className='App'>
      <header className='App-header'>
        <div style={{ width: 400 }}>
          <ReactSearchAutocomplete
            items={items}
            onSearch={handleOnSearch}
            onHover={handleOnHover}
            onSelect={handleOnSelect}
            onFocus={handleOnFocus}
            autoFocus
            formatResult={formatResult}
          />
        </div>
      </header>
    </div>
  );
};

export default AutocompleteSearch;
