import { useMemo } from 'react';
import { URLSearchParamsInit, createSearchParams, useSearchParams } from 'react-router-dom';

const useQueryString = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchParamsObject: URLSearchParamsInit = useMemo(() => {
    const searchParamsObject: URLSearchParamsInit = {};

    [...searchParams].forEach(([key, value]) => {
      if (searchParamsObject[key]) {
        if (Array.isArray(searchParamsObject[key])) {
          (searchParamsObject[key] as string[]).push(value);
        } else {
          searchParamsObject[key] = [searchParamsObject[key] as string, value];
        }
        return;
      }

      searchParamsObject[key] = value;
    });

    return searchParamsObject;
  }, [searchParams]);

  const parseQueryString = (queryString: string) => {
    const searchParams = createSearchParams(queryString);

    return searchParams;
  };

  return {
    queryString: { ...searchParamsObject },
    setQueryString: setSearchParams,
    parseQueryString,
  };
};

export type QueryString = ReturnType<typeof useQueryString>['queryString'];

export type QueryParam = QueryString[keyof QueryString];

export default useQueryString;
