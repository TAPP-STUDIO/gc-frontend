import React from 'react';

type ClaimButtonProps = {
    amount: number;
    onClaim?: () => void;
};

const ClaimButton: React.FC<ClaimButtonProps> = ({
                                                     amount,
                                                     onClaim = () => console.log('Claim button clicked')
                                                 }) => {
    return (
        <button
            onClick={onClaim}
            className="bg-[#F9D523] text-[#151515] font-bold py-2 px-4 rounded"
        >
            CLAIM<br />{amount.toLocaleString()} $
        </button>
    );
};

export default ClaimButton;