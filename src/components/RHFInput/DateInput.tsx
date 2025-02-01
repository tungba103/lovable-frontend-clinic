import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { format, parse, isValid } from 'date-fns';

interface DateInputProps {
  value?: Date;
  onChange?: (date: Date | null) => void;
}

const DateInput: React.FC<DateInputProps> = ({ value, onChange }) => {
  // Format the initial value if provided
  const initialText = value ? format(value, 'dd/MM/yyyy') : '';
  const [inputValue, setInputValue] = useState(initialText);
  const [error, setError] = useState<string | null>(null);

  // Update the input if the external value changes
  useEffect(() => {
    if (value) {
      setInputValue(format(value, 'dd/MM/yyyy'));
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setInputValue(text);

    // Parse the input text using the desired format
    const parsedDate = parse(text, 'dd/MM/yyyy', new Date());

    // Check if the parsed date is valid and matches the input (to avoid cases like 31/02/2020)
    if (isValid(parsedDate) && format(parsedDate, 'dd/MM/yyyy') === text) {
      setError(null);
      if (onChange) onChange(parsedDate);
    } else {
      setError('Invalid date. Please use the format DD/MM/YYYY');
      if (onChange) onChange(null);
    }
  };

  return (
    <div>
      <Input
        value={inputValue}
        onChange={handleChange}
        placeholder='DD/MM/YYYY'
        // You can remove type="date" because we're treating it as a text input.
        // type="text" is the default.
      />
      {error && <p className='text-sm text-red-500'>{error}</p>}
    </div>
  );
};

export default DateInput;
