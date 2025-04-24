import React from 'react';

type ClaimCardProps = {
    title: string;
    nextClaimDate: string;
    claimAmount: number;
    progressPercent: number;
    onClaim?: () => void;
};

const ClaimCard: React.FC<ClaimCardProps> = ({
                                                 title,
                                                 nextClaimDate,
                                                 claimAmount,
                                                 progressPercent,
                                                 onClaim = () => console.log('Claim button clicked')
                                             }) => {
    return (
        <div className="bg-[#151515] p-5 rounded-lg text-white">
            <div className="flex justify-between items-center mb-6">
                <div className="text-5xl font-bold text-[#F9D523]">
                    {claimAmount.toLocaleString()} $
                </div>
                <button
                    onClick={onClaim}
                    className="bg-[#F9D523] text-[#151515] font-bold py-3 px-6 rounded-lg"
                >
                    CLAIM
                </button>
            </div>

            <div>
                <h2 className="text-lg font-medium mb-2 text-white">{title}</h2>
                <div className="text-xl mb-2 text-white">{nextClaimDate}</div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                        className="bg-[#F9D523] h-2 rounded-full"
                        style={{ width: `${progressPercent}%` }}
                    ></div>
                </div>
            </div>
        </div>
    );
};

export default ClaimCard;