/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface ComboboxItem {
  key: string;
  value: any;
  label: string;
}

interface ComboboxProps {
  useListData: (props: any) => {
    data: any[] | undefined;
    isLoading: boolean;
  };
  mapDataToItems: (data: any[]) => ComboboxItem[];
  value?: any;
  onChange: (value: any) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  className?: string;
  disabled?: boolean;
}

export function Combobox({
  disabled,
  useListData,
  mapDataToItems,
  value,
  onChange,
  placeholder = 'Chọn một tùy chọn...',
  searchPlaceholder = 'Tìm kiếm...',
  emptyText = 'Không tìm thấy kết quả.',
  className,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState('');
  const [debouncedSearch, setDebouncedSearch] = React.useState('');

  // Setup debouncing for search
  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [search]);

  // Use the provided hook with debounced search parameter
  const { data, isLoading } = useListData({
    search: debouncedSearch,
    useQueryString: false,
  });

  // Map the data to ComboboxItems using the provided mapper
  const items = React.useMemo(() => {
    if (!data) return [];
    const result = mapDataToItems(data);
    return result;
  }, [data, mapDataToItems]);

  // Find the selected item label
  const selectedLabel = React.useMemo(() => {
    if (!value) return '';
    return items.find((item) => item.value === value)?.label || '';
  }, [items, value]);

  // Handle item selection
  const handleSelect = React.useCallback(
    (itemValue: any) => {
      onChange(itemValue);
      setOpen(false);
    },
    [onChange]
  );

  console.log('render');

  return (
    <Popover
      open={open}
      onOpenChange={setOpen}
    >
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          disabled={disabled}
          role='combobox'
          aria-expanded={open}
          className={cn('w-full justify-between', className)}
        >
          {selectedLabel || placeholder}
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-full p-0'>
        <Command
          shouldFilter={false}
          className='min-w-[400px]'
        >
          <CommandInput
            placeholder={searchPlaceholder}
            value={search}
            onValueChange={(val) => setSearch(val)}
            className='h-9'
          />
          <CommandList>
            {isLoading ? (
              <CommandEmpty>Loading...</CommandEmpty>
            ) : items.length === 0 ? (
              <CommandEmpty>{emptyText}</CommandEmpty>
            ) : (
              <CommandGroup>
                {items.map((item) => (
                  <CommandItem
                    key={item.key}
                    // value={String(item.value)}
                    onSelect={() => handleSelect(item.value)}
                  >
                    {item.label}
                    <Check className={cn('ml-auto h-4 w-4', value === item.value ? 'opacity-100' : 'opacity-0')} />
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
