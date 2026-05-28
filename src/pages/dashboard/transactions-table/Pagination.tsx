import {
  Pagination as PaginationComponent,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const handlePrevious = (e: React.MouseEvent) => {
    e.preventDefault();
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  const handlePageClick = (e: React.MouseEvent, page: number) => {
    e.preventDefault();
    onPageChange(page);
  };

  return (
    <PaginationComponent>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            size={"default"}
            href="#"
            onClick={handlePrevious}
            className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
          />
        </PaginationItem>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              size={"default"}
              href="#"
              isActive={currentPage === page}
              onClick={(e) => handlePageClick(e, page)}
              className="cursor-pointer"
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            size={"default"}
            href="#"
            onClick={handleNext}
            className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
          />
        </PaginationItem>
      </PaginationContent>
    </PaginationComponent>
  );
}
export default Pagination;
