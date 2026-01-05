import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Trash2, Edit2 } from 'lucide-react';
import { Button } from './ui/button';

export interface TableColumn {
  key: string;
  label: string;
  render?: (value: any, item: any) => React.ReactNode;
  sortable?: boolean;
  width?: string;
}

export interface CRUDTableProps<T extends { id: string }> {
  title: string;
  data: T[];
  columns: TableColumn[];
  loading?: boolean;
  onAdd?: () => void;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  addButtonLabel?: string;
  emptyMessage?: string;
}

export function CRUDTable<T extends { id: string }>({
  title,
  data,
  columns,
  loading = false,
  onAdd,
  onEdit,
  onDelete,
  addButtonLabel = 'Add New',
  emptyMessage = 'No data available',
}: CRUDTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Filter data based on search
  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) return data;

    return data.filter((item) =>
      columns.some((col) => {
        const value = item[col.key as keyof T];
        if (value === null || value === undefined) return false;
        return String(value).toLowerCase().includes(searchTerm.toLowerCase());
      })
    );
  }, [data, searchTerm, columns]);

  // Sort data
  const sortedData = useMemo(() => {
    if (!sortKey) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aValue = a[sortKey as keyof T];
      const bValue = b[sortKey as keyof T];

      if (aValue === null || aValue === undefined) return 1;
      if (bValue === null || bValue === undefined) return -1;

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
      }

      return 0;
    });
  }, [filteredData, sortKey, sortOrder]);

  // Pagination
  const totalPages = Math.ceil(sortedData.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = sortedData.slice(startIndex, startIndex + pageSize);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
    setCurrentPage(1);
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);

    if (endPage - startPage + 1 < maxVisible) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    if (startPage > 1) {
      pages.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className="px-2 py-1 text-sm text-blue-600 hover:bg-gray-100 rounded"
        >
          1
        </button>
      );
      if (startPage > 2) {
        pages.push(
          <span key="dots-start" className="px-2 py-1 text-gray-500">
            ...
          </span>
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-2 py-1 text-sm rounded ${
            i === currentPage
              ? 'bg-blue-600 text-white font-bold'
              : 'text-blue-600 hover:bg-gray-100'
          }`}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(
          <span key="dots-end" className="px-2 py-1 text-gray-500">
            ...
          </span>
        );
      }
      pages.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className="px-2 py-1 text-sm text-blue-600 hover:bg-gray-100 rounded"
        >
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="space-y-4">
      {/* Header with Add Button */}
      {onAdd && (
        <div className="flex justify-end">
          <Button
            onClick={onAdd}
            variant="default"
            size="sm"
            className="gap-1 sm:gap-2 text-xs sm:text-sm"
          >
            <span className="text-base sm:text-lg leading-none">+</span>
            <span className="hidden xs:inline">{addButtonLabel}</span>
            <span className="xs:hidden">Add</span>
          </Button>
        </div>
      )}

      {/* Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-white p-3 sm:p-4 rounded-lg border border-gray-200">
        <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 flex-wrap">
          <label htmlFor="pageSize" className="font-medium">
            Show
          </label>
          <select
            id="pageSize"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="border border-gray-300 rounded px-2 py-1 text-xs sm:text-sm font-medium hover:border-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          <span className="font-medium">entries</span>
        </div>

        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full sm:w-auto px-3 sm:px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition-all text-xs sm:text-sm"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg border border-gray-200">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-600">Loading...</p>
          </div>
        ) : paginatedData.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-500">{emptyMessage}</p>
          </div>
        ) : (
          <table className="w-full text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-2 sm:px-4 py-2 sm:py-3 text-left font-semibold text-gray-900 w-8 sm:w-12">#</th>
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className={`px-2 sm:px-4 py-2 sm:py-3 text-left font-semibold text-gray-900 ${
                      col.sortable ? 'cursor-pointer hover:bg-gray-100' : ''
                    }`}
                    onClick={() => col.sortable && handleSort(col.key)}
                    style={{ width: col.width }}
                  >
                    <div className="flex items-center gap-1 sm:gap-2">
                      <span>{col.label}</span>
                      {col.sortable && sortKey === col.key && (
                        <span className="text-xs">
                          {sortOrder === 'asc' ? '▲' : '▼'}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
                <th className="px-2 sm:px-4 py-2 sm:py-3 text-left font-semibold text-gray-900 w-16 sm:w-24">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginatedData.map((item, index) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-2 sm:px-4 py-2 sm:py-4 text-gray-600 font-medium text-xs sm:text-sm">{startIndex + index + 1}</td>
                  {columns.map((col) => (
                    <td key={`${item.id}-${col.key}`} className="px-2 sm:px-4 py-2 sm:py-4 text-gray-700 text-xs sm:text-sm">
                      {col.render ? col.render(item[col.key as keyof T], item) : String(item[col.key as keyof T] || '-')}
                    </td>
                  ))}
                  <td className="px-2 sm:px-4 py-2 sm:py-4">
                    <div className="flex gap-1 sm:gap-2 flex-wrap">
                      {onEdit && (
                        <Button
                          onClick={() => onEdit(item)}
                          variant="default"
                          size="sm"
                          title="Edit"
                        >
                          <Edit2 className="w-3 h-3" />
                          Edit
                        </Button>
                      )}
                      {onDelete && (
                        <button
                          onClick={() => {
                            if (confirm('Are you sure you want to delete this item?')) {
                              onDelete(item);
                            }
                          }}
                          className="inline-flex items-center gap-1 bg-white border border-red-600 hover:bg-red-50 text-red-600 px-3 py-1 rounded transition-colors text-xs font-medium"
                          title="Delete"
                        >
                          <Trash2 className="w-3 h-3" />
                          Delete
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-white p-3 sm:p-4 rounded-lg border border-gray-200">
          <div className="text-xs sm:text-sm text-gray-600">
            Showing {startIndex + 1} to {Math.min(startIndex + pageSize, sortedData.length)} of{' '}
            {sortedData.length} entries
            {searchTerm && ` (filtered from ${data.length} total)`}
          </div>

          <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="inline-flex items-center gap-1 px-2 py-1 text-xs sm:text-sm rounded border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              title="Previous"
            >
              <ChevronLeft className="w-3 sm:w-4 h-3 sm:h-4" />
              <span className="hidden sm:inline">Previous</span>
            </button>

            <div className="flex gap-1">{renderPageNumbers()}</div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="inline-flex items-center gap-1 px-2 py-1 text-xs sm:text-sm rounded border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              title="Next"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="w-3 sm:w-4 h-3 sm:h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
