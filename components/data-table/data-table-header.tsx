'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import type { DataTableFilter, FilterState, ViewMode } from './types';
import {
  Filter,
  Grid3X3,
  List,
  Loader2,
  Plus,
  RefreshCw,
  Search,
  SlidersHorizontal,
  X,
} from 'lucide-react';
import { useState } from 'react';

interface DataTableHeaderProps {
  title: string;
  subtitle?: string;
  searchValue: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  showViewToggle?: boolean;
  showAddButton?: boolean;
  addButtonLabel?: string;
  onAddClick?: () => void;
  filters?: DataTableFilter[];
  filterState: FilterState;
  onFilterChange: (filterId: string, value: string) => void;
  activeFiltersCount?: number;
  onClearFilters?: () => void;
  onRefresh?: () => void;
  isLoading?: boolean;
  className?: string;
}

export function DataTableHeader({
  title,
  subtitle,
  searchValue,
  onSearchChange,
  searchPlaceholder = 'Search...',
  viewMode,
  onViewModeChange,
  showViewToggle = true,
  showAddButton = true,
  addButtonLabel = 'Add Item',
  onAddClick,
  filters = [],
  filterState,
  onFilterChange,
  activeFiltersCount = 0,
  onClearFilters,
  onRefresh,
  isLoading = false,
  className,
}: DataTableHeaderProps) {
  const [showFilters, setShowFilters] = useState(false);

  const handleClearAllFilters = () => {
    filters.forEach((filter) => {
      onFilterChange(filter.id, 'all');
    });
    onClearFilters?.();
  };

  return (
    <div className={cn('space-y-4 mb-6', className)}>
      {/* Top Bar: Identity & Primary Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900">
            {title}
          </h1>
          {subtitle && (
            <p className="text-sm text-zinc-500 font-medium">{subtitle}</p>
          )}
        </div>

        <div className="flex items-center gap-2">
          {onRefresh && (
            <Button
              variant="outline"
              size="sm"
              onClick={onRefresh}
              disabled={isLoading}
              className="h-10 px-4 rounded-xl border-zinc-200 bg-white text-zinc-600 hover:text-zinc-900 transition-all"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <RefreshCw className="h-4 w-4 mr-2" />
              )}
              <span className="font-semibold text-xs uppercase tracking-wider">
                Refresh
              </span>
            </Button>
          )}

          {showAddButton && (
            <Button
              size="sm"
              onClick={onAddClick}
              className="h-10 px-5 rounded-xl bg-zinc-900 text-white hover:bg-zinc-800 transition-all shadow-sm"
            >
              <Plus className="h-4 w-4 mr-2" />
              <span className="font-semibold text-xs uppercase tracking-wider">
                {addButtonLabel}
              </span>
            </Button>
          )}
        </div>
      </div>

      {/* Control Bar: Search, Filter Toggle, View Toggle */}
      <div className="flex flex-col sm:flex-row items-center gap-3 bg-zinc-50/50 p-2 rounded-2xl border border-zinc-200/60 shadow-xs">
        {/* Search Input */}
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <Input
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            className="h-10 pl-10 bg-white border-zinc-200 rounded-xl transition-all"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          {/* Filter Toggle */}
          {filters.length > 0 && (
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className={cn(
                'h-10 rounded-xl border-zinc-200 bg-white font-semibold text-xs uppercase tracking-wider px-4 transition-all',
                showFilters || activeFiltersCount > 0
                  ? 'border-zinc-900 bg-zinc-900 text-white hover:bg-zinc-800'
                  : 'text-zinc-600 hover:bg-zinc-50',
              )}
            >
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filters
              {activeFiltersCount > 0 && (
                <Badge className="ml-2 bg-white text-zinc-900 hover:bg-white px-1.5 min-w-5 h-5 rounded-md">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
          )}

          {/* View Mode Toggle */}
          {showViewToggle && (
            <div className="flex bg-white border border-zinc-200 p-1 rounded-xl h-10 shadow-sm">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onViewModeChange('table')}
                className={cn(
                  'h-full px-3 rounded-lg transition-all',
                  viewMode === 'table'
                    ? 'bg-zinc-100 text-zinc-900'
                    : 'text-zinc-400 hover:text-zinc-600',
                )}
              >
                <List className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onViewModeChange('grid')}
                className={cn(
                  'h-full px-3 rounded-lg transition-all',
                  viewMode === 'grid'
                    ? 'bg-zinc-100 text-zinc-900'
                    : 'text-zinc-400 hover:text-zinc-600',
                )}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Expanded Filters Drawer */}
      {showFilters && filters.length > 0 && (
        <div className="bg-white border border-zinc-200 rounded-2xl p-5 shadow-sm animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-zinc-100">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-zinc-900" />
              <span className="text-sm font-bold text-zinc-900 uppercase tracking-tight">
                Filter Options
              </span>
            </div>
            {activeFiltersCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearAllFilters}
                className="text-zinc-500 hover:text-red-600 font-bold text-xs uppercase"
              >
                Reset All
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filters.map((filter) => (
              <div key={filter.id} className="space-y-2">
                <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                  {filter.label}
                </label>
                <Select
                  value={filterState[filter.id] || 'all'}
                  onValueChange={(value) => onFilterChange(filter.id, value)}
                >
                  <SelectTrigger className="h-10 rounded-xl bg-zinc-50 border-zinc-200 focus:ring-zinc-900/5">
                    <SelectValue placeholder={`Select ${filter.label}`} />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl shadow-xl border-zinc-200">
                    <SelectItem value="all" className="text-sm font-medium">
                      All {filter.label}s
                    </SelectItem>
                    {filter.options.map((opt) => (
                      <SelectItem
                        key={opt.value}
                        value={opt.value}
                        className="text-sm"
                      >
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Active Filter Chips */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap items-center gap-2 pt-2">
          <span className="text-xs font-bold text-zinc-400 uppercase tracking-tight mr-2">
            Active:
          </span>
          {filters.map((filter) => {
            const value = filterState[filter.id];
            if (!value || value === 'all') return null;
            const option = filter.options.find((o) => o.value === value);
            return (
              <Badge
                key={filter.id}
                className="bg-zinc-900 text-white hover:bg-zinc-800 px-3 py-1 rounded-full flex items-center gap-2 border-0"
              >
                <span className="text-[10px] opacity-60 uppercase">
                  {filter.label}:
                </span>
                <span className="text-xs font-medium">
                  {option?.label || value}
                </span>
                <button
                  onClick={() => onFilterChange(filter.id, 'all')}
                  className="hover:bg-white/20 rounded-full p-0.5 transition-colors"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            );
          })}
        </div>
      )}
    </div>
  );
}
