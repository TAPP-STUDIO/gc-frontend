import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AdvancedSearch, QuickSearch } from '../search/AdvancedSearch';
import type { SearchFilter } from '../search/AdvancedSearch';

const mockFilters: SearchFilter[] = [
  {
    id: 'type',
    label: 'Type',
    type: 'select',
    options: [
      { value: 'gc-cards', label: 'GC Cards' },
      { value: 'btc-bot', label: 'BTC Bot' },
      { value: 'algo-trader', label: 'Algo Trader' }
    ]
  },
  {
    id: 'price',
    label: 'Price Range',
    type: 'range',
    min: 0,
    max: 10000
  },
  {
    id: 'premium',
    label: 'Premium Only',
    type: 'boolean'
  }
];

describe('Search Components', () => {
  describe('AdvancedSearch', () => {
    const mockOnSearch = jest.fn();

    beforeEach(() => {
      mockOnSearch.mockClear();
    });

    it('renders search input', () => {
      render(
        <AdvancedSearch 
          filters={mockFilters}
          onSearch={mockOnSearch}
        />
      );
      
      expect(screen.getByPlaceholderText('Hledat...')).toBeInTheDocument();
    });

    it('shows filters when filter button is clicked', () => {
      render(
        <AdvancedSearch 
          filters={mockFilters}
          onSearch={mockOnSearch}
        />
      );
      
      const filterButton = screen.getByText('Filtry');
      fireEvent.click(filterButton);
      
      expect(screen.getByText('Type')).toBeInTheDocument();
      expect(screen.getByText('Price Range')).toBeInTheDocument();
      expect(screen.getByText('Premium Only')).toBeInTheDocument();
    });

    it('calls onSearch when query changes', async () => {
      render(
        <AdvancedSearch 
          filters={mockFilters}
          onSearch={mockOnSearch}
        />
      );
      
      const searchInput = screen.getByPlaceholderText('Hledat...');
      fireEvent.change(searchInput, { target: { value: 'test query' } });
      
      await waitFor(() => {
        expect(mockOnSearch).toHaveBeenCalledWith(
          expect.objectContaining({
            query: 'test query'
          })
        );
      }, { timeout: 500 });
    });

    it('handles filter changes', async () => {
      render(
        <AdvancedSearch 
          filters={mockFilters}
          onSearch={mockOnSearch}
        />
      );
      
      // Open filters
      fireEvent.click(screen.getByText('Filtry'));
      
      // Select a filter option
      const typeSelect = screen.getByDisplayValue('');
      fireEvent.change(typeSelect, { target: { value: 'gc-cards' } });
      
      await waitFor(() => {
        expect(mockOnSearch).toHaveBeenCalledWith(
          expect.objectContaining({
            filters: expect.objectContaining({
              type: 'gc-cards'
            })
          })
        );
      });
    });

    it('shows active filter chips', async () => {
      render(
        <AdvancedSearch 
          filters={mockFilters}
          onSearch={mockOnSearch}
        />
      );
      
      // Open filters and set a filter
      fireEvent.click(screen.getByText('Filtry'));
      
      const typeSelect = screen.getByDisplayValue('');
      fireEvent.change(typeSelect, { target: { value: 'gc-cards' } });
      
      await waitFor(() => {
        expect(screen.getByText(/Type: GC Cards/)).toBeInTheDocument();
      });
    });

    it('clears individual filters', async () => {
      render(
        <AdvancedSearch 
          filters={mockFilters}
          onSearch={mockOnSearch}
        />
      );
      
      // Open filters and set a filter
      fireEvent.click(screen.getByText('Filtry'));
      const typeSelect = screen.getByDisplayValue('');
      fireEvent.change(typeSelect, { target: { value: 'gc-cards' } });
      
      // Wait for filter chip to appear
      await waitFor(() => {
        expect(screen.getByText(/Type: GC Cards/)).toBeInTheDocument();
      });
      
      // Clear the filter
      const clearButton = screen.getByRole('button', { name: '' }); // X button
      fireEvent.click(clearButton);
      
      await waitFor(() => {
        expect(screen.queryByText(/Type: GC Cards/)).not.toBeInTheDocument();
      });
    });
  });

  describe('QuickSearch', () => {
    const mockOnSearch = jest.fn();
    const mockSuggestions = ['Bitcoin', 'Ethereum', 'NFT Collection'];

    beforeEach(() => {
      mockOnSearch.mockClear();
    });

    it('renders search input with placeholder', () => {
      render(
        <QuickSearch 
          onSearch={mockOnSearch}
          placeholder="Quick search..."
        />
      );
      
      expect(screen.getByPlaceholderText('Quick search...')).toBeInTheDocument();
    });

    it('shows suggestions when typing', async () => {
      render(
        <QuickSearch 
          onSearch={mockOnSearch}
          suggestions={mockSuggestions}
        />
      );
      
      const input = screen.getByPlaceholderText('Rychlé hledání...');
      fireEvent.change(input, { target: { value: 'Bit' } });
      fireEvent.focus(input);
      
      await waitFor(() => {
        expect(screen.getByText('Bitcoin')).toBeInTheDocument();
      });
    });

    it('filters suggestions based on input', async () => {
      render(
        <QuickSearch 
          onSearch={mockOnSearch}
          suggestions={mockSuggestions}
        />
      );
      
      const input = screen.getByPlaceholderText('Rychlé hledání...');
      fireEvent.change(input, { target: { value: 'eth' } });
      fireEvent.focus(input);
      
      await waitFor(() => {
        expect(screen.getByText('Ethereum')).toBeInTheDocument();
        expect(screen.queryByText('Bitcoin')).not.toBeInTheDocument();
      });
    });

    it('calls onSearch when suggestion is clicked', async () => {
      render(
        <QuickSearch 
          onSearch={mockOnSearch}
          suggestions={mockSuggestions}
        />
      );
      
      const input = screen.getByPlaceholderText('Rychlé hledání...');
      fireEvent.change(input, { target: { value: 'Bit' } });
      fireEvent.focus(input);
      
      await waitFor(() => {
        expect(screen.getByText('Bitcoin')).toBeInTheDocument();
      });
      
      fireEvent.click(screen.getByText('Bitcoin'));
      
      expect(mockOnSearch).toHaveBeenCalledWith('Bitcoin');
    });

    it('clears input when clear button is clicked', () => {
      render(
        <QuickSearch 
          onSearch={mockOnSearch}
        />
      );
      
      const input = screen.getByPlaceholderText('Rychlé hledání...');
      fireEvent.change(input, { target: { value: 'test' } });
      
      const clearButton = screen.getByRole('button');
      fireEvent.click(clearButton);
      
      expect(input).toHaveValue('');
      expect(mockOnSearch).toHaveBeenCalledWith('');
    });
  });
});
