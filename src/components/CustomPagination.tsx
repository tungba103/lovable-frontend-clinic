import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import useQueryString from '@/hooks/useQueryString';

interface CustomPaginationProps {
  currentPage: number;
  totalPage: number;
}

const CustomPagination = ({ currentPage, totalPage }: CustomPaginationProps) => {
  const { queryString, setQueryString } = useQueryString();

  const handlePageChange = (page: number) => {
    setQueryString({ ...queryString, page: page.toString() });
  };

  return (
    <Pagination className='mt-4 mb-4'>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href='#'
            onClick={() => handlePageChange(currentPage - 1)}
            className={currentPage <= 1 ? 'pointer-events-none opacity-50' : ''}
          />
        </PaginationItem>

        {/* First page */}
        <PaginationItem>
          <PaginationLink
            href='#'
            onClick={() => handlePageChange(1)}
            isActive={currentPage === 1}
          >
            1
          </PaginationLink>
        </PaginationItem>

        {/* Show ellipsis if there are many pages before current */}
        {currentPage > 3 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {/* Show surrounding pages */}
        {Array.from({ length: 3 }, (_, i) => currentPage - 1 + i)
          .filter((page) => page > 1 && page < totalPage)
          .map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                href='#'
                onClick={() => handlePageChange(page)}
                isActive={currentPage === page}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

        {/* Show ellipsis if there are many pages after current */}
        {currentPage < totalPage - 2 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {/* Last page */}
        {totalPage > 1 && (
          <PaginationItem>
            <PaginationLink
              href='#'
              onClick={() => handlePageChange(totalPage)}
              isActive={currentPage === totalPage}
            >
              {totalPage}
            </PaginationLink>
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationNext
            href='#'
            onClick={() => handlePageChange(currentPage + 1)}
            className={currentPage >= totalPage ? 'pointer-events-none opacity-50' : ''}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default CustomPagination;
