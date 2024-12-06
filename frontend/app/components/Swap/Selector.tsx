// components/Selector.tsx
import React, { useState } from 'react';

interface Token {
  name: string;
  symbol: string;
  balance: number;
  icon: string;
}

interface SelectorProps {
  tokens: Token[];
  onSelectToken: (token: Token) => void;
}

const Selector: React.FC<SelectorProps> = ({ tokens, onSelectToken }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter tokens based on the search term
  const filteredTokens = tokens.filter((token) =>
    token.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="token-selector">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <div className="token-list">
        {filteredTokens.map((token) => (
          <div
            key={token.symbol}
            className="token-item"
            onClick={() => onSelectToken(token)}
          >
            <img src={token.icon} alt={token.name} className="token-icon" />
            <div className="token-info">
              <span className="token-name">{token.name}</span>
              <span className="token-symbol">{token.symbol}</span>
            </div>
            <span className="token-balance">
              ~{token.balance.toFixed(4)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Selector;
