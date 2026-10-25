import React from 'react';
import { ARCHIVE_ENTRIES, SOURCES } from '../game/archiveData';
import { X, ExternalLink, AlertTriangle, BookOpen } from 'lucide-react';

interface HistoryDrawerProps {
  archiveIds: string[];
  isOpen: boolean;
  onClose: () => void;
}

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({
  archiveIds,
  isOpen,
  onClose,
}) => {
  if (!isOpen || archiveIds.length === 0) return null;

  const entries = ARCHIVE_ENTRIES.filter((e) => archiveIds.includes(e.id));

  return (
    <div className="drawer-backdrop" onClick={onClose}>
      <aside
        className="drawer-panel"
        onClick={(e) => e.stopPropagation()}
        aria-label="Historical Context Panel"
      >
        <div className="drawer-header">
          <div className="drawer-title-group">
            <BookOpen size={18} className="text-amber-500" />
            <h2 className="drawer-title">What's the history?</h2>
          </div>
          <button onClick={onClose} className="drawer-close-btn" title="Close panel">
            <X size={18} />
          </button>
        </div>

        <div className="drawer-body">
          <p className="drawer-intro">
            Documented historical events and news reporting grounding this moment in the game:
          </p>

          {entries.map((entry) => {
            const entrySources = SOURCES.filter((s) => entry.sourceIds.includes(s.id));

            return (
              <article key={entry.id} className="archive-entry-card">
                <div className="entry-header">
                  <span className="entry-id-badge">{entry.id}</span>
                  <span className="entry-year">{entry.year}</span>
                </div>

                <h3 className="entry-title">{entry.title}</h3>

                {entry.sensitive && (
                  <div className="sensitive-warning">
                    <AlertTriangle size={14} />
                    <span>Sensitive Subject: Handled responsibly in line with child protection ethics.</span>
                  </div>
                )}

                <p className="entry-summary">{entry.summary}</p>

                <div className="entry-sources">
                  <span className="sources-heading">Published Sources:</span>
                  <ul className="sources-list">
                    {entrySources.map((source) => (
                      <li key={source.id} className="source-item">
                        <span className="source-publisher">[{source.publisher}]</span>{' '}
                        <a
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="source-link"
                        >
                          {source.title} <ExternalLink size={12} className="inline ml-1" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>
      </aside>
    </div>
  );
};
