import { TokenInfo } from "@solana/spl-token-registry";
import React, { useState } from "react";

function CustomDropdown({ tokens, selectedToken, onSelect }: {
    tokens: TokenInfo[];
    selectedToken: TokenInfo;
    onSelect: (token: TokenInfo) => void;
}) {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => setIsOpen(!isOpen);
    const handleSelect = (token: TokenInfo) => {
        onSelect(token);
        setIsOpen(false); // Close dropdown after selection
    };

    return (
        <div className="relative">
            {/* Trigger Button */}
            <button
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 flex items-center"
                onClick={handleToggle}
            >
                <img
                    src={selectedToken.logoURI}
                    alt={selectedToken.symbol}
                    className="w-6 h-6 mr-2"
                />
                {selectedToken.symbol}
                <span className="ml-auto">&#9662;</span> {/* Down Arrow */}
            </button>

            {/* Dropdown Options */}
            {isOpen && (
                <ul className="absolute z-10 bg-white border border-gray-300 rounded-lg shadow-lg mt-1 w-full max-h-60 overflow-auto">
                    {tokens.map((token) => (
                        <li
                            key={token.symbol}
                            className="p-2 flex items-center cursor-pointer hover:bg-gray-100"
                            onClick={() => handleSelect(token)}
                        >
                            <img
                                src={token.logoURI}
                                alt={token.symbol}
                                className="w-6 h-6 mr-2"
                            />
                            {token.symbol}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default CustomDropdown;
