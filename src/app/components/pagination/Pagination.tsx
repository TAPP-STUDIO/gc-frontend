import React from 'react';

type PaginationProps = {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
                                                   currentPage,
                                                   totalPages,
                                                   onPageChange
                                               }) => {
    const pageNumbers = [];

    // Vytvoření pole stránek k zobrazení
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    // Pro jednoduchost zobrazíme všechny stránky
    // V reálné aplikaci by bylo vhodné implementovat limitaci počtu zobrazených stránek

    return (
        <div className="flex justify-center mt-4 space-x-2">
            {/* Tlačítko předchozí */}
            <button
                onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`w-8 h-8 rounded-full flex items-center justify-center border ${
                    currentPage === 1 ? 'text-gray-500 border-gray-700 cursor-not-allowed' : 'text-gray-400 border-gray-700 hover:border-gray-500'
                }`}
            >
                &lt;
            </button>

            {/* Čísla stránek */}
            {pageNumbers.map(number => (
                <button
                    key={number}
                    onClick={() => onPageChange(number)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center border ${
                        currentPage === number
                            ? 'bg-[#151515] text-white border-gray-500'
                            : 'bg-[#151515] text-gray-400 border-gray-700 hover:border-gray-500'
                    }`}
                >
                    {number}
                </button>
            ))}

            {/* Tlačítko další */}
            <button
                onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`w-8 h-8 rounded-full flex items-center justify-center border ${
                    currentPage === totalPages ? 'text-gray-500 border-gray-700 cursor-not-allowed' : 'text-gray-400 border-gray-700 hover:border-gray-500'
                }`}
            >
                &gt;
            </button>
        </div>
    );
};

export default Pagination;