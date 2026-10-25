import React, { useState } from 'react';
import { ARCHIVE_ENTRIES, SOURCES } from '../game/archiveData';
import { Lock, BookOpen, ExternalLink, AlertTriangle, X, Search } from 'lucide-react';

interface ArchiveScreenProps {
  unlockedIds: string[];
  onClose: () => void;
}

export const ArchiveScreen: React.FC<ArchiveScreenProps> = ({ unlockedIds, onClose }) => {
  const [filter, setFilter] = useState<'all' | 'unlocked' | 'locked'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEntries = ARCHIVE_ENTRIES.filter((entry) => {
    const isUnlocked = unlockedIds.includes(entry.id);
    if (filter === 'unlocked' && !isUnlocked) return false;
    if (filter === 'locked' && isUnlocked) return false;

    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      const matchTitle = entry.title.toLowerCase().includes(term);
      const matchSummary = isUnlocked && entry.summary.toLowerCase().includes(term);
      const matchYear = entry.year.toLowerCase().includes(term);
      return matchTitle || matchSummary || matchYear;
    }
    return true;
  });

  return (
    <div className="fullscreen-overlay">
      <div className="archive-container">
        <header className="archive-header">
          <div className="archive-header-left">
            <BookOpen size={24} className="text-amber-500" />
            <div>
              <h1 className="archive-title">HISTORICAL ARCHIVE</h1>
              <p className="archive-subtitle">
                Documented history, laws, operations, and public reporting in Bangladesh (2013–2025)
              </p>
            </div>
          </div>

          <button onClick={onClose} className="btn-close-overlay" title="Close Archive">
            <X size={20} />
          </button>
        </header>

        {/* Filter and Search Bar */}
        <div className="archive-controls">
          <div className="archive-tabs">
            <button
              onClick={() => setFilter('all')}
              className={`archive-tab ${filter === 'all' ? 'active' : ''}`}
            >
              All Records ({ARCHIVE_ENTRIES.length})
            </button>
            <button
              onClick={() => setFilter('unlocked')}
              className={`archive-tab ${filter === 'unlocked' ? 'active' : ''}`}
            >
              Unlocked ({unlockedIds.length})
            </button>
            <button
              onClick={() => setFilter('locked')}
              className={`archive-tab ${filter === 'locked' ? 'active' : ''}`}
            >
              Locked ({ARCHIVE_ENTRIES.length - unlockedIds.length})
            </button>
          </div>

          <div className="archive-search">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder="Search archive..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        {/* Entries Grid */}
        <div className="archive-grid">
          {filteredEntries.map((entry) => {
            const isUnlocked = unlockedIds.includes(entry.id);
            const entrySources = SOURCES.filter((s) => entry.sourceIds.includes(s.id));

            if (!isUnlocked) {
              return (
                <div key={entry.id} className="archive-card archive-card-locked">
                  <div className="locked-badge-header">
                    <span className="locked-id">{entry.id}</span>
                    <Lock size={16} className="text-neutral-500" />
                  </div>
                  <h3 className="locked-title">Classified Document</h3>
                  <p className="locked-hint">
                    Unlocks when reaching {entry.unlockSceneId === 'Ending screen' ? 'an ending' : `scene ${entry.unlockSceneId}`}.
                  </p>
                </div>
              );
            }

            return (
              <article key={entry.id} className="archive-card archive-card-unlocked">
                <div className="archive-card-meta">
                  <span className="entry-tag">{entry.id}</span>
                  <span className="entry-year">{entry.year}</span>
                </div>

                <h3 className="archive-entry-title">{entry.title}</h3>

                {entry.sensitive && (
                  <div className="sensitive-warning">
                    <AlertTriangle size={14} />
                    <span>Sensitive Subject: Child exploitation reporting. Handled with ethical care.</span>
                  </div>
                )}

                <p className="archive-entry-summary">{entry.summary}</p>

                <div className="archive-sources-footer">
                  <span className="sources-label">Sources:</span>
                  <div className="sources-tags">
                    {entrySources.map((source) => (
                      <a
                        key={source.id}
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="source-chip"
                        title={`${source.title} (${source.publisher})`}
                      >
                        {source.publisher} <ExternalLink size={10} className="inline ml-1" />
                      </a>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
};
