"use client";
import {
    Pagination as ShadPagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
    PaginationEllipsis,
} from "@/components/ui/pagination";


export const Pagination = ({
    currentPage,
    totalPages,
    onPageChange,
    isLoading = false
}: {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    isLoading?: boolean;
}) => {
    
    const handlePrevious = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        if (currentPage > 1 && !isLoading) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        if (currentPage < totalPages && !isLoading) { 
            onPageChange(currentPage + 1);
        }
    };

    const handlePageClick = (page: number) => (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        if (page !== currentPage && !isLoading) { 
            onPageChange(page);
        }
    };

    const renderItems = () => {
        const items = [];
        let ellipsisAdded = false;

        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
                items.push(
                    <PaginationItem key={i}>
                        <PaginationLink
                            isActive={i === currentPage}
                            href="#"
                            onClick={handlePageClick(i)}
                            className={i === currentPage ? "pointer-events-none opacity-50" : ""}
                        >
                            {i}
                        </PaginationLink>
                    </PaginationItem>
                );
                ellipsisAdded = false;
            } else if (!ellipsisAdded) {
                items.push(
                    <PaginationItem key={`ellipsis-${i}`}>
                        <PaginationEllipsis />
                    </PaginationItem>
                );
                ellipsisAdded = true;
            }
        }

        return items;
    };

    return (
        <ShadPagination className="mt-8">
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        href="#"
                        onClick={handlePrevious}
                        className={currentPage <= 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                </PaginationItem>

                {renderItems()}

                <PaginationItem>
                    <PaginationNext
                        href="#"
                        onClick={handleNext}
                        className={currentPage >= totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                </PaginationItem>
            </PaginationContent>
        </ShadPagination>
    );
};