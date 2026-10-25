import React, { useState } from 'react';
import { SOURCES } from '../game/archiveData';
import { FileText, ExternalLink, X, Search } from 'lucide-react';

interface SourcesScreenProps {
  onClose: () => void;
}

export const SourcesScreen: React.FC<SourcesScreenProps> = ({ onClose }) => {
  const [search, setSearch] = useState('');

  const filteredSources = SOURCES.filter(
    (s) =>
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.publisher.toLowerCase().includes(search.toLowerCase()) ||
      s.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fullscreen-overlay">
      <div className="sources-container">
        <header className="sources-header">
          <div className="sources-header-left">
            <FileText size={24} className="text-amber-500" />
            <div>
              <h1 className="sources-title">DOCUMENTARY SOURCES</h1>
              <p className="sources-subtitle">
                All 29 published investigations, news reports, and academic research anchoring the narrative
              </p>
            </div>
          </div>

          <button onClick={onClose} className="btn-close-overlay" title="Close Sources">
            <X size={20} />
          </button>
        </header>

        <div className="sources-search-bar">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Search by publication, title, or ID (e.g. Daily Star, Dhaka Tribune)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="sources-table-wrapper">
          <table className="sources-table">
            <thead>
              <tr>
                <th style={{ width: '80px' }}>ID</th>
                <th>Article / Investigation Title</th>
                <th style={{ width: '180px' }}>Publisher</th>
                <th style={{ width: '120px' }}>Link</th>
              </tr>
            </thead>
            <tbody>
              {filteredSources.map((source) => (
                <tr key={source.id}>
                  <td className="source-id-cell">{source.id}</td>
                  <td className="source-title-cell">{source.title}</td>
                  <td className="source-publisher-cell">{source.publisher}</td>
                  <td className="source-action-cell">
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-external-link"
                    >
                      <span>Read</span>
                      <ExternalLink size={12} className="inline ml-1" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
