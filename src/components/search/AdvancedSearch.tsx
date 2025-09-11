'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Search, Filter, X, ChevronDown, Calendar } from 'lucide-react';
import { DashboardButton } from '@/components/dashboard';

export interface SearchFilter {
  id: string;
  label: string;
  type: 'text' | 'select' | 'range' | 'date' | 'multiselect' | 'boolean';
  options?: { value: string; label: string }[];
  min?: number;
  max?: number;
  placeholder?: string;
  defaultValue?: string | number | boolean | string[] | number[];
}

export interface SearchState {
  query: string;
  filters: Record<string, string | number | boolean | string[] | number[]>;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

interface AdvancedSearchProps {
  filters: SearchFilter[];
  onSearch: (searchState: SearchState) => void;
  loading?: boolean;
  placeholder?: string;
  showSortOptions?: boolean;
  sortOptions?: { value: string; label: string }[];
  className?: string;
  defaultState?: Partial<SearchState>;
}

export function AdvancedSearch({
  filters,
  onSearch,
  loading = false,
  placeholder = "Hledat...",
  showSortOptions = true,
  sortOptions = [
    { value: 'relevance', label: 'Relevance' },
    { value: 'date_desc', label: 'Nejnovější' },
    { value: 'date_asc', label: 'Nejstarší' },
    { value: 'price_desc', label: 'Cena (nejvyšší)' },
    { value: 'price_asc', label: 'Cena (nejnižší)' }
  ],
  className = '',
  defaultState = {}
}: AdvancedSearchProps) {
  const [searchState, setSearchState] = useState<SearchState>({
    query: '',
    filters: {},
    sortBy: 'relevance',
    sortOrder: 'desc',
    ...defaultState
  });
  
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Set<string>>(new Set());
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Debounced search
  const debouncedSearch = useCallback(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      onSearch(searchState);
    }, 300);
  }, [searchState, onSearch]);

  useEffect(() => {
    debouncedSearch();
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [debouncedSearch]);

  const handleQueryChange = (query: string) => {
    setSearchState(prev => ({ ...prev, query }));
  };

  const handleFilterChange = (filterId: string, value: string | number | boolean | string[] | number[]) => {
    setSearchState(prev => ({
      ...prev,
      filters: { ...prev.filters, [filterId]: value }
    }));
    
    if (value !== undefined && value !== null && value !== '') {
      setActiveFilters(prev => new Set([...prev, filterId]));
    } else {
      setActiveFilters(prev => {
        const newSet = new Set(prev);
        newSet.delete(filterId);
        return newSet;
      });
    }
  };

  const handleSortChange = (sortBy: string) => {
    setSearchState(prev => ({ ...prev, sortBy }));
  };

  const clearFilter = (filterId: string) => {
    const newFilters = { ...searchState.filters };
    delete newFilters[filterId];
    setSearchState(prev => ({ ...prev, filters: newFilters }));
    setActiveFilters(prev => {
      const newSet = new Set(prev);
      newSet.delete(filterId);
      return newSet;
    });
  };

  const clearAllFilters = () => {
    setSearchState(prev => ({ ...prev, filters: {}, query: '' }));
    setActiveFilters(new Set());
  };

  const getFilterValueDisplay = (filter: SearchFilter, value: string | number | boolean | string[] | number[]) => {
    if (filter.type === 'select' && filter.options) {
      const option = filter.options.find(opt => opt.value === value);
      return option?.label || value;
    }
    if (filter.type === 'multiselect' && Array.isArray(value)) {
      return `${value.length} vybraných`;
    }
    if (filter.type === 'range' && Array.isArray(value)) {
      return `${value[0]} - ${value[1]}`;
    }
    if (filter.type === 'boolean') {
      return value ? 'Ano' : 'Ne';
    }
    return value;
  };

  return (
    <div className={`space-y-4 ${className}`}>
      
      {/* Main search bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-4 h-4" />
          <input
            type="text"
            placeholder={placeholder}
            value={searchState.query}
            onChange={(e) => handleQueryChange(e.target.value)}
            className="input-glass pl-10 w-full"
            disabled={loading}
          />
          {loading && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <div className="w-4 h-4 border-2 border-[#F9D523] border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </div>
        
        <div className="flex space-x-2">
          <DashboardButton
            onClick={() => setShowFilters(!showFilters)}
            variant={showFilters ? 'primary' : 'secondary'}
            className="relative"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filtry
            {activeFilters.size > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {activeFilters.size}
              </span>
            )}
          </DashboardButton>
          
          {showSortOptions && (
            <select
              value={searchState.sortBy}
              onChange={(e) => handleSortChange(e.target.value)}
              className="input-glass min-w-[140px]"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      {/* Active filters chips */}
      {activeFilters.size > 0 && (
        <div className="flex flex-wrap gap-2">
          {Array.from(activeFilters).map(filterId => {
            const filter = filters.find(f => f.id === filterId);
            const value = searchState.filters[filterId];
            if (!filter || !value) return null;
            
            return (
              <div
                key={filterId}
                className="flex items-center space-x-2 bg-[#F9D523]/20 border border-[#F9D523]/40 rounded-lg px-3 py-1"
              >
                <span className="text-sm text-white">
                  {filter.label}: {getFilterValueDisplay(filter, value)}
                </span>
                <button
                  onClick={() => clearFilter(filterId)}
                  className="text-white/60 hover:text-white"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            );
          })}
          <button
            onClick={clearAllFilters}
            className="text-sm text-white/60 hover:text-white underline"
          >
            Vymazat vše
          </button>
        </div>
      )}

      {/* Expanded filters */}
      {showFilters && (
        <div className="glass-card p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filters.map(filter => (
              <FilterField
                key={filter.id}
                filter={filter}
                value={searchState.filters[filter.id]}
                onChange={(value) => handleFilterChange(filter.id, value)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Individual filter field component
interface FilterFieldProps {
  filter: SearchFilter;
  value: string | number | boolean | string[] | number[];
  onChange: (value: string | number | boolean | string[] | number[]) => void;
}

function FilterField({ filter, value, onChange }: FilterFieldProps) {
  const [rangeValues, setRangeValues] = useState<[number, number]>([
    filter.min || 0,
    filter.max || 100
  ]);

  useEffect(() => {
    if (filter.type === 'range' && Array.isArray(value) && value.length === 2) {
      // Ensure values are numbers before setting
      const numericValues: [number, number] = [
        typeof value[0] === 'number' ? value[0] : Number(value[0]),
        typeof value[1] === 'number' ? value[1] : Number(value[1])
      ];
      setRangeValues(numericValues);
    }
  }, [value, filter.type]);

  const handleRangeChange = (index: number, newValue: number) => {
    const newRangeValues: [number, number] = [...rangeValues];
    newRangeValues[index] = newValue;
    setRangeValues(newRangeValues);
    onChange(newRangeValues);
  };

  switch (filter.type) {
    case 'text':
      return (
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            {filter.label}
          </label>
          <input
            type="text"
            value={typeof value === 'string' ? value : ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={filter.placeholder}
            className="input-glass w-full"
          />
        </div>
      );

    case 'select':
      return (
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            {filter.label}
          </label>
          <select
            value={typeof value === 'string' ? value : ''}
            onChange={(e) => onChange(e.target.value)}
            className="input-glass w-full"
          >
            <option value="">Všechny</option>
            {filter.options?.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      );

    case 'multiselect':
      return (
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            {filter.label}
          </label>
          <MultiSelect
            options={filter.options || []}
            value={(Array.isArray(value) && typeof value[0] === 'string' ? value : []) as string[]}
            onChange={onChange}
            placeholder="Vyberte..."
          />
        </div>
      );

    case 'range':
      return (
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            {filter.label}
          </label>
          <div className="space-y-2">
            <div className="flex space-x-2">
              <input
                type="number"
                value={rangeValues[0]}
                onChange={(e) => handleRangeChange(0, Number(e.target.value))}
                placeholder="Od"
                className="input-glass flex-1"
                min={filter.min}
                max={filter.max}
              />
              <input
                type="number"
                value={rangeValues[1]}
                onChange={(e) => handleRangeChange(1, Number(e.target.value))}
                placeholder="Do"
                className="input-glass flex-1"
                min={filter.min}
                max={filter.max}
              />
            </div>
            <div className="text-xs text-white/60">
              {filter.min} - {filter.max}
            </div>
          </div>
        </div>
      );

    case 'date':
      return (
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            {filter.label}
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-4 h-4" />
            <input
              type="date"
              value={typeof value === 'string' ? value : ''}
              onChange={(e) => onChange(e.target.value)}
              className="input-glass w-full pl-10"
            />
          </div>
        </div>
      );

    case 'boolean':
      return (
        <div>
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={typeof value === 'boolean' ? value : false}
              onChange={(e) => onChange(e.target.checked)}
              className="w-4 h-4 text-[#F9D523] bg-transparent border-white/30 rounded focus:ring-[#F9D523] focus:ring-2"
            />
            <span className="text-sm text-white">{filter.label}</span>
          </label>
        </div>
      );

    default:
      return null;
  }
}

// Multi-select dropdown component
interface MultiSelectProps {
  options: { value: string; label: string }[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
}

function MultiSelect({ options, value, onChange, placeholder = "Vyberte..." }: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleOption = (optionValue: string) => {
    const newValue = value.includes(optionValue)
      ? value.filter(v => v !== optionValue)
      : [...value, optionValue];
    onChange(newValue);
  };

  const getDisplayText = () => {
    if (value.length === 0) return placeholder;
    if (value.length === 1) {
      const option = options.find(opt => opt.value === value[0]);
      return option?.label || value[0];
    }
    return `${value.length} vybraných`;
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="input-glass w-full text-left flex items-center justify-between"
      >
        <span className={value.length === 0 ? 'text-white/50' : 'text-white'}>
          {getDisplayText()}
        </span>
        <ChevronDown className={`w-4 h-4 text-white/60 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 glass-card border border-white/20 rounded-lg z-50 max-h-60 overflow-y-auto">
          {options.map(option => (
            <label
              key={option.value}
              className="flex items-center space-x-3 p-3 hover:bg-white/10 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={value.includes(option.value)}
                onChange={() => toggleOption(option.value)}
                className="w-4 h-4 text-[#F9D523] bg-transparent border-white/30 rounded focus:ring-[#F9D523] focus:ring-2"
              />
              <span className="text-sm text-white">{option.label}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

// Quick search component for simple use cases
interface QuickSearchProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  suggestions?: string[];
  loading?: boolean;
  className?: string;
}

export function QuickSearch({
  onSearch,
  placeholder = "Rychlé hledání...",
  suggestions = [],
  loading = false,
  className = ''
}: QuickSearchProps) {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (query) {
      const filtered = suggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setShowSuggestions(false);
    }
  }, [query, suggestions]);

  const handleInputChange = (value: string) => {
    setQuery(value);
    
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    
    debounceRef.current = setTimeout(() => {
      onSearch(value);
    }, 300);
  };

  const selectSuggestion = (suggestion: string) => {
    setQuery(suggestion);
    setShowSuggestions(false);
    onSearch(suggestion);
    inputRef.current?.blur();
  };

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-4 h-4" />
        <input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={() => query && setShowSuggestions(filteredSuggestions.length > 0)}
          className="input-glass pl-10 pr-10 w-full"
          disabled={loading}
        />
        {loading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div className="w-4 h-4 border-2 border-[#F9D523] border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        {query && !loading && (
          <button
            onClick={() => {
              setQuery('');
              onSearch('');
              setShowSuggestions(false);
            }}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/40 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Suggestions dropdown */}
      {showSuggestions && (
        <div className="absolute top-full left-0 right-0 mt-1 glass-card border border-white/20 rounded-lg z-50 max-h-60 overflow-y-auto">
          {filteredSuggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => selectSuggestion(suggestion)}
              className="w-full text-left p-3 hover:bg-white/10 text-white text-sm"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
