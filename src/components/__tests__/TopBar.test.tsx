import { render, screen, fireEvent } from '@testing-library/react';
import { TopBar } from '../layout/TopBar';

// Mock the UserProfileModal component
jest.mock('../profile/UserProfileModal', () => ({
  UserProfileModal: ({ isOpen }: { isOpen: boolean; onClose: () => void }) => 
    isOpen ? <div data-testid="user-profile-modal">Profile Modal</div> : null
}));

const mockUserProfile = {
  name: 'John Doe',
  email: 'john@example.com',
  address: '0x1234567890123456789012345678901234567890',
  kycVerified: true
};

describe('TopBar', () => {
  it('renders title correctly', () => {
    render(
      <TopBar 
        title="Test Dashboard" 
        userProfile={mockUserProfile}
        notificationCount={0}
      />
    );
    
    expect(screen.getByText('Test Dashboard')).toBeInTheDocument();
  });

  it('displays user name', () => {
    render(
      <TopBar 
        title="Dashboard" 
        userProfile={mockUserProfile}
        notificationCount={0}
      />
    );
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('shows notification count when greater than 0', () => {
    render(
      <TopBar 
        title="Dashboard" 
        userProfile={mockUserProfile}
        notificationCount={5}
      />
    );
    
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('opens profile modal when user avatar is clicked', () => {
    render(
      <TopBar 
        title="Dashboard" 
        userProfile={mockUserProfile}
        notificationCount={0}
      />
    );
    
    // Find and click the user avatar/button
    const userButton = screen.getByText('John Doe').closest('button');
    expect(userButton).toBeInTheDocument();
    
    if (userButton) {
      fireEvent.click(userButton);
      expect(screen.getByTestId('user-profile-modal')).toBeInTheDocument();
    }
  });

  it('shows KYC verified badge when user is verified', () => {
    render(
      <TopBar 
        title="Dashboard" 
        userProfile={mockUserProfile}
        notificationCount={0}
      />
    );
    
    // Look for KYC verification indicator
    expect(screen.getByText(/verified/i)).toBeInTheDocument();
  });

  it('handles mobile menu toggle', () => {
    const mockOnMenuToggle = jest.fn();
    
    render(
      <TopBar 
        title="Dashboard" 
        userProfile={mockUserProfile}
        notificationCount={0}
        onMenuToggle={mockOnMenuToggle}
      />
    );
    
    // Find mobile menu button
    const menuButton = screen.getByLabelText(/menu/i) || screen.getByRole('button', { name: /menu/i });
    
    if (menuButton) {
      fireEvent.click(menuButton);
      expect(mockOnMenuToggle).toHaveBeenCalledTimes(1);
    }
  });

  it('truncates long wallet addresses', () => {
    const longAddress = '0x1234567890123456789012345678901234567890';
    const userWithLongAddress = {
      ...mockUserProfile,
      address: longAddress
    };
    
    render(
      <TopBar 
        title="Dashboard" 
        userProfile={userWithLongAddress}
        notificationCount={0}
      />
    );
    
    // Check that full address is not displayed (should be truncated)
    expect(screen.queryByText(longAddress)).not.toBeInTheDocument();
    
    // Check for truncated format (0x1234...7890)
    expect(screen.getByText(/0x1234.*7890/)).toBeInTheDocument();
  });

  it('applies correct styling classes', () => {
    const { container } = render(
      <TopBar 
        title="Dashboard" 
        userProfile={mockUserProfile}
        notificationCount={0}
      />
    );
    
    const topBar = container.firstChild;
    expect(topBar).toHaveClass('glass-card');
  });
});
