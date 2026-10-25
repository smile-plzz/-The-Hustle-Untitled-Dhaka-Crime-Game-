import React from 'react';
import { GameState } from '../types';
import { ShieldCheck, HeartHandshake, Skull, AlertOctagon, UserX, RotateCcw, BookOpen, Clock } from 'lucide-react';

interface EndingScreenProps {
  state: GameState;
  onOpenHelp: () => void;
  onOpenArchive: () => void;
  onOpenTimeline: () => void;
  onRestart: () => void;
}

export const EndingScreen: React.FC<EndingScreenProps> = ({
  state,
  onOpenHelp,
  onOpenArchive,
  onOpenTimeline,
  onRestart,
}) => {
  const { endingResult, stats } = state;
  if (!endingResult) return null;

  const getEndingIcon = () => {
    switch (endingResult.ending) {
      case 'Redemption':
        return <HeartHandshake size={32} className="text-emerald-400" />;
      case 'The Untouchable Kingpin':
        return <ShieldCheck size={32} className="text-amber-400" />;
      case 'Caught':
        return <AlertOctagon size={32} className="text-rose-500" />;
      case 'Killed in the Turf War':
        return <Skull size={32} className="text-red-500" />;
      case 'Ghost':
      default:
        return <UserX size={32} className="text-neutral-400" />;
    }
  };

  return (
    <main className="ending-container">
      <div className="ending-card">
        <header className="ending-header">
          <div className="ending-icon-wrapper">{getEndingIcon()}</div>
          <span className="ending-pretitle">FINAL RESOLUTION</span>
          <h1 className="ending-title">{endingResult.ending.toUpperCase()}</h1>
          {endingResult.variant && (
            <span className="ending-variant-badge">
              [{endingResult.variant.toUpperCase()} VARIANT]
            </span>
          )}
        </header>

        {/* Core Epilogue */}
        <section className="epilogue-core-section">
          <h2 className="section-label">THE OUTCOME</h2>
          <p className="epilogue-core-text">{endingResult.coreText}</p>
        </section>

        {/* Character Fates */}
        <section className="character-fates-section">
          <h2 className="section-label">WHAT BECAME OF THEM</h2>
          <div className="fates-grid">
            {endingResult.characterLines.map((line, idx) => (
              <div key={idx} className="fate-item">
                <span className="fate-character">{line.character}:</span>
                <span className="fate-line">{line.line}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Final Stats Summary */}
        <section className="final-stats-section">
          <h2 className="section-label">FINAL RECORD</h2>
          <div className="final-stats-grid">
            <div className="final-stat-box">
              <span className="final-stat-label">Total Money</span>
              <span className="final-stat-val text-amber-300">৳ {stats.money.toLocaleString()}</span>
            </div>
            <div className="final-stat-box">
              <span className="final-stat-label">Loyalty</span>
              <span className="final-stat-val">{stats.loyalty}/100</span>
            </div>
            <div className="final-stat-box">
              <span className="final-stat-label">Heat</span>
              <span className="final-stat-val">{stats.heat}/100</span>
            </div>
            <div className="final-stat-box">
              <span className="final-stat-label">Morality</span>
              <span className="final-stat-val">{stats.morality}/100</span>
            </div>
          </div>
        </section>

        {/* Action Controls */}
        <footer className="ending-actions">
          <button onClick={onOpenHelp} className="btn-help-highlight">
            <HeartHandshake size={18} />
            <span>Support & Treatment Services (A-15)</span>
          </button>

          <div className="ending-secondary-actions">
            <button onClick={onOpenArchive} className="btn-secondary">
              <BookOpen size={16} />
              <span>Full Archive</span>
            </button>

            <button onClick={onOpenTimeline} className="btn-secondary">
              <Clock size={16} />
              <span>Timeline</span>
            </button>

            <button onClick={onRestart} className="btn-secondary">
              <RotateCcw size={16} />
              <span>Play Again</span>
            </button>
          </div>
        </footer>
      </div>
    </main>
  );
};
