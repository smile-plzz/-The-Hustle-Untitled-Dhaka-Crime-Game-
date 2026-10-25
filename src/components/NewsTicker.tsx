import React from 'react';
import { NEWS_TICKERS } from '../game/archiveData';
import { Radio } from 'lucide-react';

interface NewsTickerProps {
  tickerId?: string;
}

export const NewsTicker: React.FC<NewsTickerProps> = ({ tickerId }) => {
  if (!tickerId) return null;

  const ticker = NEWS_TICKERS[tickerId];
  if (!ticker) return null;

  return (
    <div className="news-ticker-container">
      <div className="ticker-badge">
        <Radio size={12} className="ticker-pulse-icon" />
        <span>NEWS WIRE</span>
      </div>
      <div className="ticker-date">{ticker.dateShown}</div>
      <div className="ticker-content">
        <span className="ticker-text">{ticker.line}</span>
      </div>
    </div>
  );
};
