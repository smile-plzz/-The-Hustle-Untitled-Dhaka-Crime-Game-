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

  const getEndingTitle = (ending: string) => {
    switch (ending) {
      case 'Redemption':
        return 'মুক্তি ও প্রায়শ্চিত্ত (REDEMPTION)';
      case 'The Untouchable Kingpin':
        return 'অস্পৃশ্য মহাজন (THE UNTOUCHABLE KINGPIN)';
      case 'Caught':
        return 'গ্রেফতার ও কারাদণ্ড (CAUGHT)';
      case 'Killed in the Turf War':
        return 'যাত্রাবাড়ীর গলিতে লাশ (KILLED IN TURF WAR)';
      case 'Ghost':
      default:
        return 'অদৃশ্য কুয়াশা (GHOST)';
    }
  };

  const getEndingVariant = (variant?: string) => {
    if (!variant) return null;
    switch (variant) {
      case 'surrendered':
        return 'আত্মসমর্পণ (SURRENDERED)';
      case 'fled':
        return 'পলাতক (FLED)';
      case 'betrayed':
        return 'বিশ্বাসঘাতকতা (BETRAYED)';
      default:
        return variant.toUpperCase();
    }
  };

  return (
    <main className="ending-container">
      <div className="ending-card">
        <header className="ending-header">
          <div className="ending-icon-wrapper">{getEndingIcon()}</div>
          <span className="ending-pretitle">চূড়ান্ত পরিণতি (FINAL RESOLUTION)</span>
          <h1 className="ending-title">{getEndingTitle(endingResult.ending)}</h1>
          {endingResult.variant && (
            <span className="ending-variant-badge">
              [{getEndingVariant(endingResult.variant)}]
            </span>
          )}
        </header>

        {/* Core Epilogue */}
        <section className="epilogue-core-section">
          <h2 className="section-label">ফলাফল (THE OUTCOME)</h2>
          <p className="epilogue-core-text">{endingResult.coreText}</p>
        </section>

        {/* Character Fates */}
        <section className="character-fates-section">
          <h2 className="section-label">কার কী পরিণতি হলো (WHAT BECAME OF THEM)</h2>
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
          <h2 className="section-label">চূড়ান্ত খতিয়ান (FINAL RECORD)</h2>
          <div className="final-stats-grid">
            <div className="final-stat-box">
              <span className="final-stat-label">মোট নগদ টাকা (Total Money)</span>
              <span className="final-stat-val text-amber-300">৳ {stats.money.toLocaleString()}</span>
            </div>
            <div className="final-stat-box">
              <span className="final-stat-label">আনুগত্য (Loyalty)</span>
              <span className="final-stat-val">{stats.loyalty}/100</span>
            </div>
            <div className="final-stat-box">
              <span className="final-stat-label">পুলিশি নজরদারি (Heat)</span>
              <span className="final-stat-val">{stats.heat}/100</span>
            </div>
            <div className="final-stat-box">
              <span className="final-stat-label">নৈতিকতা (Morality)</span>
              <span className="final-stat-val">{stats.morality}/100</span>
            </div>
          </div>
        </section>

        {/* Action Controls */}
        <footer className="ending-actions">
          <button onClick={onOpenHelp} className="btn-help-highlight">
            <HeartHandshake size={18} />
            <span>সাহায্য ও চিকিৎসা সেবা (Support & Treatment - A-15)</span>
          </button>

          <div className="ending-secondary-actions">
            <button onClick={onOpenArchive} className="btn-secondary">
              <BookOpen size={16} />
              <span>সংরক্ষণাগার (Archive)</span>
            </button>

            <button onClick={onOpenTimeline} className="btn-secondary">
              <Clock size={16} />
              <span>ঘটনাক্রম (Timeline)</span>
            </button>

            <button onClick={onRestart} className="btn-secondary">
              <RotateCcw size={16} />
              <span>পুনরায় খেলুন (Play Again)</span>
            </button>
          </div>
        </footer>
      </div>
    </main>
  );
};
