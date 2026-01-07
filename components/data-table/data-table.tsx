'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  type Table as TanStackTable,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';
import {
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  LayoutPanelLeft,
  MoreHorizontal,
  Settings2,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { DataTableHeader } from './data-table-header';
import type { DataTableConfig, FilterState, ViewMode } from './types';

// Add Bulk Action Interface
export interface BulkAction<T> {
  label: string;
  icon?: React.ReactNode;
  variant?: 'default' | 'destructive' | 'outline';
  onClick: (selectedRows: T[]) => void | Promise<void>;
}

interface EnhancedDataTableProps<T> extends DataTableConfig<T> {
  className?: string;
  title?: string;
  subtitle?: string;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  enableSelection?: boolean;
  showActions?: boolean;
  actionsColumnWidth?: string;
  filterState?: FilterState;
  onFilterChange?: (filterId: string, value: string) => void;
  searchValue?: string;
  showTableHeader?: boolean;
  onSearchChange?: (value: string) => void;
  maxVisibleColumns?: number;
  priorityColumns?: string[];
  // NEW PROPS
  bulkActions?: BulkAction<T>[];
  onSortingChange?: (sorting: SortingState) => void;
}

export function DataTable<T extends Record<string, any>>({
  columns,
  data,
  filters = [],
  actions = [],
  bulkActions = [], // New
  searchPlaceholder = 'Search...',
  showAddButton = true,
  addButtonLabel = 'Add Item',
  onAddClick,
  showViewToggle = true,
  isLoading = false,
  error = null,
  onRefresh,
  pageSize = 10,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  enableSelection = true,
  showActions = true,
  actionsColumnWidth = '80px',
  className,
  title = 'Data Management',
  subtitle = 'Manage your data efficiently.',
  filterState: externalFilterState,
  onFilterChange: externalOnFilterChange,
  searchValue: externalSearchValue,
  onSearchChange: externalOnSearchChange,
  maxVisibleColumns = 6,
  showTableHeader = true,
  priorityColumns = [],
  onSortingChange: externalOnSortingChange,
}: EnhancedDataTableProps<T>) {
  const [viewMode, setViewMode] = useState<ViewMode>('table');
  const [internalGlobalFilter, setInternalGlobalFilter] = useState('');
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [internalFilterState, setInternalFilterState] = useState<FilterState>(
    {}
  );
  const [showAllColumns, setShowAllColumns] = useState(false);

  // Initialize visibility: Only show priority or first 5 columns
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
    () => {
      const initial: VisibilityState = {};
      columns.forEach((col, index) => {
        const isPriority = priorityColumns.includes(col.id);
        initial[col.id] = isPriority || index < maxVisibleColumns;
      });
      return initial;
    }
  );

  const globalFilter =
    externalSearchValue !== undefined
      ? externalSearchValue
      : internalGlobalFilter;
  const setGlobalFilter = externalOnSearchChange || setInternalGlobalFilter;
  const filterState = externalFilterState || internalFilterState;

  const setFilterState = externalOnFilterChange
    ? (filterId: string, value: string) =>
        externalOnFilterChange(filterId, value)
    : (filterId: string, value: string) =>
        setInternalFilterState((prev) => ({ ...prev, [filterId]: value }));

  const activeFiltersCount = useMemo(() => {
    return Object.values(filterState).filter((v) => v && v !== 'all').length;
  }, [filterState]);

  const visibleColumns = useMemo(() => {
    if (showAllColumns || columns.length <= maxVisibleColumns) return columns;
    const prioritySet = new Set(priorityColumns);
    return [...columns]
      .sort(
        (a, b) =>
          (prioritySet.has(b.id) ? 1 : 0) - (prioritySet.has(a.id) ? 1 : 0)
      )
      .slice(0, maxVisibleColumns);
  }, [columns, maxVisibleColumns, priorityColumns, showAllColumns]);

  const tableColumns = useMemo<ColumnDef<T>[]>(() => {
    const cols: ColumnDef<T>[] = [];

    // 1. Selection
    if (enableSelection) {
      cols.push({
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllPageRowsSelected()}
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            className="translate-y-[2px] rounded-md border-zinc-300"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            className="translate-y-[2px] rounded-md border-zinc-300"
          />
        ),
        enableHiding: false, // Selection is always visible
      });
    }

    // 2. Map provided columns
    columns.forEach((col) => {
      cols.push({
        id: col.id,
        accessorKey: col.accessorKey as string,
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="-ml-4 h-8 font-bold text-[10px] uppercase tracking-widest text-zinc-500 hover:text-zinc-900"
          >
            {col.header}
            <ArrowUpDown className="ml-2 h-3 w-3" />
          </Button>
        ),
        cell: ({ row, getValue }) => (
          <div className="font-medium text-sm text-zinc-900">
            {col.cell
              ? col.cell(getValue(), row.original)
              : String(getValue() ?? '—')}
          </div>
        ),
      });
    });

    // 3. Actions
    if (showActions) {
      cols.push({
        id: 'actions',
        header: () => (
          <div className="flex justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 border-zinc-200 bg-white px-2 text-[10px] font-bold uppercase tracking-tighter shadow-sm hover:bg-zinc-50"
                >
                  <Settings2 className="mr-2 h-3 w-3" />
                  View
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-56 rounded-2xl p-2 font-sans"
              >
                <DropdownMenuLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
                  Display Columns
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => (
                    <DropdownMenuItem
                      key={column.id}
                      onSelect={(e) => e.preventDefault()}
                      className="group flex items-center gap-3 rounded-lg py-2"
                    >
                      <Checkbox
                        checked={column.getIsVisible()}
                        onCheckedChange={(checked) => {
                          column.toggleVisibility(!!checked);
                        }}
                        className={cn(
                          'h-5 w-5 rounded-md border-zinc-300 text-white transition-opacity'
                        )}
                      />

                      <span className="text-sm font-medium capitalize">
                        {column.id.replace(/_/g, ' ')}
                      </span>
                    </DropdownMenuItem>
                  ))}

                <DropdownMenuSeparator />
                <Button
                  variant="ghost"
                  className="w-full justify-start text-xs font-bold text-zinc-900 hover:bg-zinc-100"
                  onClick={() => table.toggleAllColumnsVisible(true)}
                >
                  Show All
                </Button>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ),
        cell: ({ row }) => (
          <div className="flex justify-end gap-1">
            {actions
              .filter((action) =>
                action.show ? action.show(row.original) : true
              )
              .map((action, i) => (
                <Button
                  key={i}
                  variant="ghost"
                  size="icon"
                  onClick={() => action.onClick(row.original)}
                  className="h-8 w-8 rounded-full"
                >
                  {action.icon || <MoreHorizontal className="h-4 w-4" />}
                </Button>
              ))}
          </div>
        ),
        enableHiding: false,
      });
    }

    return cols;
  }, [columns, columnVisibility]);

  const table = useReactTable({
    data,
    columns: tableColumns,
    state: { sorting, rowSelection, columnVisibility },
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  const selectedRows = table
    .getFilteredSelectedRowModel()
    .rows.map((r) => r.original);

  if (error) return <div className="p-20 text-center">{error}</div>;

  return (
    <div className={cn('w-full space-y-4 font-sans tracking-tight', className)}>
      {/* BULK ACTIONS TOOLBAR */}
      {selectedRows.length > 0 && bulkActions.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-zinc-900 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-6 animate-in fade-in slide-in-from-bottom-4">
          <span className="text-sm font-bold border-r border-white/20 pr-6">
            {selectedRows.length} Selected
          </span>
          <div className="flex items-center gap-2">
            {bulkActions.map((action, i) => (
              <Button
                key={i}
                variant={
                  action.variant === 'destructive' ? 'destructive' : 'secondary'
                }
                size="sm"
                className="h-9 px-4 rounded-xl text-xs uppercase tracking-widest font-bold"
                onClick={() => action.onClick(selectedRows)}
              >
                {action.icon && <span className="mr-2">{action.icon}</span>}
                {action.label}
              </Button>
            ))}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => table.resetRowSelection()}
            className="text-white/60 hover:text-white"
          >
            Cancel
          </Button>
        </div>
      )}

      {showTableHeader && (
        <DataTableHeader
          {...{
            title,
            subtitle,
            searchValue: globalFilter,
            onSearchChange: setGlobalFilter,
            viewMode,
            onViewModeChange: setViewMode,
            showViewToggle,
            showAddButton,
            addButtonLabel,
            onAddClick,
            filters,
            filterState,
            onFilterChange: setFilterState,
            activeFiltersCount,
            onClearFilters: () => setInternalFilterState({}),
            isLoading,
          }}
        />
      )}

      {isLoading ? (
        <DataTableSkeleton />
      ) : viewMode === 'table' ? (
        <div className="overflow-hidden bg-white rounded-2xl border border-zinc-200/80">
          <Table>
            <TableHeader className="bg-zinc-50/50">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow
                  key={headerGroup.id}
                  className="h-14 border-b border-zinc-100 px-6 hover:bg-transparent"
                >
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} className="px-6">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    className="group border-b border-zinc-50 last:border-0 hover:bg-zinc-50/30"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="px-6 py-4">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={tableColumns.length}
                    className="h-64 text-center"
                  >
                    <div className="flex flex-col items-center justify-center text-zinc-300">
                      <LayoutPanelLeft className="mb-4 h-12 w-12 opacity-20" />
                      <p className="text-xs font-black uppercase tracking-widest">
                        No Active Records
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      ) : (
        <GridView table={table} actions={actions} />
      )}

      <EnhancedDataTablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
        selectedCount={selectedRows.length}
        totalCount={data.length}
      />
    </div>
  );
}

// Enhanced Skeleton component
function DataTableSkeleton() {
  return (
    <div className="rounded-lg sm:rounded-xl border border-gray-200 bg-white overflow-hidden">
      <div className="bg-gray-50/50 border-b border-gray-200 p-4 sm:p-6">
        <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
          <Skeleton className="h-4 w-4 rounded-sm" />
          <Skeleton className="h-4 w-20 sm:w-32" />
          <Skeleton className="h-4 w-16 sm:w-24" />
          <Skeleton className="h-4 w-12 sm:w-20" />
          <Skeleton className="h-4 w-10 sm:w-16" />
          <Skeleton className="h-4 w-14 sm:w-20" />
        </div>
      </div>
      <div className="divide-y divide-gray-100">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className={cn(
              'flex items-center gap-2 sm:gap-4 p-3 sm:p-6 transition-colors',
              i % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'
            )}
          >
            <Skeleton className="h-4 w-4 rounded-sm shrink-0" />
            <div className="flex-1 space-y-2 min-w-0">
              <Skeleton className="h-4 w-32 sm:w-48" />
              <Skeleton className="h-3 w-24 sm:w-32" />
            </div>
            <Skeleton className="h-4 w-16 sm:w-20 shrink-0" />
            <Skeleton className="h-4 w-12 sm:w-16 shrink-0" />
            <Skeleton className="h-4 sm:h-6 w-20 sm:w-24 rounded-full shrink-0" />
            <div className="flex items-center gap-1 sm:gap-2 shrink-0">
              <Skeleton className="h-6 sm:h-8 w-12 sm:w-20 rounded-md" />
              <Skeleton className="h-6 sm:h-8 w-6 sm:w-8 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Enhanced Grid View component
function GridView<T extends Record<string, any>>({
  table,
  actions,
}: {
  table: TanStackTable<T>;
  actions: any[];
}) {
  const rows = table.getRowModel().rows;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {rows.map((row) => {
        const item = row.original;
        const isSelected = row.getIsSelected();

        return (
          <div
            key={row.id}
            onClick={() => row.toggleSelected()}
            className={cn(
              'relative p-5 bg-white rounded-2xl border transition-all cursor-pointer group',
              isSelected
                ? 'border-zinc-900 ring-1 ring-zinc-900 shadow-md'
                : 'border-zinc-200/70 hover:border-zinc-400'
            )}
          >
            {/* Selection Checkbox - Top Right */}
            <div className="absolute top-4 right-4 z-10">
              <Checkbox
                checked={isSelected}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                onClick={(e) => e.stopPropagation()} // Prevent double toggle
                className={cn(
                  'h-5 w-5 rounded-md border-zinc-300 transition-opacity',
                  !isSelected && 'opacity-0 group-hover:opacity-100'
                )}
              />
            </div>

            <div className="flex justify-between items-start mb-4">
              <div className="pr-8">
                {' '}
                {/* Room for checkbox */}
                <h3 className="font-semibold text-zinc-900 text-sm">
                  {item.name || item.applicantName || 'Item'}
                </h3>
                <p className="text-xs text-zinc-500 mt-0.5 truncate max-w-[180px]">
                  {item.email || item.code || 'No details'}
                </p>
              </div>
            </div>

            {/* Dynamic Content Mapping */}
            <div className="space-y-2 mb-4">
              {/* Add logic here to show specific fields based on columns */}
            </div>

            <div
              className="flex gap-2 mt-4 border-t border-zinc-50 pt-4"
              onClick={(e) => e.stopPropagation()}
            >
              {actions
                .filter((action) => (action.show ? action.show(item) : true))
                .map((action, i) => (
                  <Button
                    key={i}
                    variant="secondary"
                    size="sm"
                    onClick={() => action.onClick(item)}
                    className="flex-1 bg-zinc-100 hover:bg-zinc-200 text-zinc-900 border-0 h-8 rounded-lg text-xs font-medium"
                  >
                    {action.label}
                  </Button>
                ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Enhanced Pagination component
function EnhancedDataTablePagination({
  currentPage,
  totalPages,
  onPageChange,
  selectedCount,
  totalCount,
  filteredCount,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
  selectedCount: number;
  totalCount: number;
  filteredCount?: number;
}) {
  const displayCount = filteredCount !== undefined ? filteredCount : totalCount;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 py-3 sm:py-4 px-3 sm:px-4 bg-white rounded-lg border border-gray-200">
      <div className="text-xs sm:text-sm text-gray-600 text-center sm:text-left">
        <span className="font-medium text-gray-800">{selectedCount}</span> of{' '}
        <span className="font-medium text-gray-800">{displayCount}</span> row(s)
        selected
        {filteredCount !== undefined && filteredCount !== totalCount && (
          <span className="text-gray-500 ml-1 sm:ml-2">
            ({totalCount} total)
          </span>
        )}
      </div>
      <div className="flex items-center space-x-1 sm:space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange?.(currentPage - 1)}
          disabled={currentPage <= 1}
          className="border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-gray-400 disabled:opacity-50 transition-colors h-8 sm:h-9 text-xs"
        >
          <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
          <span className="hidden xs:inline">Previous</span>
        </Button>
        <div className="flex items-center space-x-1">
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            const pageNumber = i + 1;
            const isCurrentPage = currentPage === pageNumber;
            return (
              <Button
                key={i}
                variant={isCurrentPage ? 'default' : 'outline'}
                size="sm"
                onClick={() => onPageChange?.(pageNumber)}
                className={cn(
                  'w-7 h-7 sm:w-9 sm:h-9 p-0 text-xs sm:text-sm transition-colors',
                  isCurrentPage
                    ? 'bg-primary hover:bg-primary text-white'
                    : 'border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-gray-400'
                )}
              >
                {pageNumber}
              </Button>
            );
          })}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange?.(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-gray-400 disabled:opacity-50 transition-colors h-8 sm:h-9 text-xs"
        >
          <span className="hidden xs:inline">Next</span>
          <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 ml-1" />
        </Button>
      </div>
    </div>
  );
}

// Utility functions
function getStringValue(obj: any, key: string, fallback = ''): string {
  const value = obj?.[key];
  return typeof value === 'string' ? value : fallback;
}

function getNumberValue(obj: any, key: string, fallback = 0): number {
  const value = obj?.[key];
  return typeof value === 'number' ? value : fallback;
}
