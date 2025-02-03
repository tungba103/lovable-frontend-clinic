import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';

interface CustomDateInputProps {
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
  disabled?: boolean;
}

const CustomDateInput: React.FC<CustomDateInputProps> = ({ value, onChange, disabled }) => {
  // Convert date to display format
  const formatDateToString = (date: Date | undefined): string => {
    if (!date) return '';
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Local state to handle input value
  const [inputValue, setInputValue] = useState(formatDateToString(value));
  const [isUserEditing, setIsUserEditing] = useState(false);
  const [lastLength, setLastLength] = useState(inputValue.length);

  // Update internal state when value prop changes and user is not editing
  useEffect(() => {
    if (!isUserEditing) {
      setInputValue(formatDateToString(value));
      setLastLength(formatDateToString(value).length);
    }
  }, [value, isUserEditing]);

  // Parse string date to Date object
  const parseDate = (dateStr: string): Date | undefined => {
    if (!dateStr) return undefined;
    // Check if the input matches DD/MM/YYYY format
    const dateRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    const match = dateStr.match(dateRegex);
    if (!match) return undefined;
    const [, day, month, year] = match;
    const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));

    // Validate if the date is valid
    if (
      date.getDate() === parseInt(day) &&
      date.getMonth() === parseInt(month) - 1 &&
      date.getFullYear() === parseInt(year)
    ) {
      // Validate date is within reasonable range (1970-01-01 to 100 years from now)
      const minDate = new Date(1970, 0, 1);
      const maxDate = new Date(new Date().getFullYear() + 100, 11, 31);
      if (date < minDate || date > maxDate) return undefined;
      return date;
    }
    return undefined;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsUserEditing(true);
    let newValue = e.target.value;
    const isDeleting = newValue.length < lastLength;
    setLastLength(newValue.length);

    // Only auto-format when adding characters, not when deleting
    if (!isDeleting && (newValue.length === 2 || newValue.length === 5) && !newValue.endsWith('/')) {
      newValue = newValue + '/';
      setLastLength(newValue.length);
    }

    setInputValue(newValue);

    // Only parse and update parent when we have a complete valid date or empty string
    if (newValue === '') {
      onChange(undefined);
    } else {
      const parsedDate = parseDate(newValue);
      if (parsedDate) {
        onChange(parsedDate);
      }
    }
  };

  const handleBlur = () => {
    setIsUserEditing(false);
    // Reformat the date on blur to ensure consistent display
    const parsedDate = parseDate(inputValue);
    if (!parsedDate && inputValue !== '') {
      // Reset to the current value from props if invalid
      setInputValue(formatDateToString(value));
      setLastLength(formatDateToString(value).length);
    } else {
      setInputValue(formatDateToString(parsedDate));
      setLastLength(formatDateToString(parsedDate).length);
    }
  };

  return (
    <Input
      value={inputValue}
      onChange={handleInputChange}
      onBlur={handleBlur}
      onFocus={() => setIsUserEditing(true)}
      placeholder='DD/MM/YYYY'
      className='w-full'
      disabled={disabled}
    />
  );
};

export default CustomDateInput;
