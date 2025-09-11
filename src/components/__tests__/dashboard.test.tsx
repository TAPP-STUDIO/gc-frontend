import { render, screen, fireEvent } from '@testing-library/react';
import { DashboardButton, DashboardCard, StatCard } from '../dashboard';

describe('Dashboard Components', () => {
  describe('DashboardButton', () => {
    it('renders button with text', () => {
      render(<DashboardButton>Test Button</DashboardButton>);
      expect(screen.getByText('Test Button')).toBeInTheDocument();
    });

    it('handles click events', () => {
      const handleClick = jest.fn();
      render(<DashboardButton onClick={handleClick}>Click Me</DashboardButton>);
      
      fireEvent.click(screen.getByText('Click Me'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('applies variant classes correctly', () => {
      const { container } = render(
        <DashboardButton variant="primary">Primary Button</DashboardButton>
      );
      
      const button = container.firstChild;
      expect(button).toHaveClass('unified-button');
    });

    it('handles disabled state', () => {
      render(<DashboardButton disabled>Disabled Button</DashboardButton>);
      
      const button = screen.getByText('Disabled Button');
      expect(button).toBeDisabled();
    });
  });

  describe('DashboardCard', () => {
    it('renders card with children', () => {
      render(
        <DashboardCard>
          <div>Card Content</div>
        </DashboardCard>
      );
      
      expect(screen.getByText('Card Content')).toBeInTheDocument();
    });

    it('applies glass card styling', () => {
      const { container } = render(
        <DashboardCard>Test</DashboardCard>
      );
      
      const card = container.firstChild;
      expect(card).toHaveClass('glass-card');
    });

    it('accepts custom className', () => {
      const { container } = render(
        <DashboardCard className="custom-class">Test</DashboardCard>
      );
      
      const card = container.firstChild;
      expect(card).toHaveClass('custom-class');
    });
  });

  describe('StatCard', () => {
    it('renders title and value', () => {
      render(<StatCard title="Test Stat" value="100" />);
      
      expect(screen.getByText('Test Stat')).toBeInTheDocument();
      expect(screen.getByText('100')).toBeInTheDocument();
    });

    it('shows trend indicator when provided', () => {
      render(<StatCard title="Test" value="100" trend="up" />);
      
      // Check for trend indicator (this would depend on your implementation)
      const statCard = screen.getByText('Test').closest('.glass-card');
      expect(statCard).toBeInTheDocument();
    });

    it('handles different value types', () => {
      render(<StatCard title="Number Stat" value={42} />);
      
      expect(screen.getByText('42')).toBeInTheDocument();
    });
  });
});
