import { useMemo } from 'react';
import { createSearchParams, useSearchParams } from 'react-router-dom';

const useQueryString = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const queryString = useMemo(() => {
    const params: Record<string, string | string[]> = {};
    
    for (const [key, value] of searchParams.entries()) {
      const existing = params[key];
      
      if (existing) {
        if (Array.isArray(existing)) {
          existing.push(value);
        } else {
          params[key] = [existing, value];
        }
      } else {
        params[key] = value;
      }
    }
    
    return params;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams.toString()]); // Only re-run if the actual query string changes

  const parseQueryString = (queryStr: string) => createSearchParams(queryStr);

  return {
    queryString,
    setQueryString: setSearchParams,
    parseQueryString,
  };
};

export type QueryString = ReturnType<typeof useQueryString>['queryString'];
export type QueryParam = QueryString[keyof QueryString];

export default useQueryString;