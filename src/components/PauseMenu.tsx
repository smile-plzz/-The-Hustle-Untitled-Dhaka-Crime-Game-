import React from 'react';
import {
  Play,
  Save,
  BookOpen,
  Clock,
  FileText,
  HeartHandshake,
  RotateCcw,
  Volume2,
  VolumeX,
  Tv,
  X,
  Users,
} from 'lucide-react';

interface PauseMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSaveLoad: () => void;
  onOpenArchive: () => void;
  onOpenTimeline: () => void;
  onOpenSources: () => void;
  onOpenRelationships: () => void;
  onOpenHelp: () => void;
  onRestart: () => void;
  isAudioActive: boolean;
  onToggleAudio: () => void;
  scanlinesActive: boolean;
  onToggleScanlines: () => void;
}

export const PauseMenu: React.FC<PauseMenuProps> = ({
  isOpen,
  onClose,
  onOpenSaveLoad,
  onOpenArchive,
  onOpenTimeline,
  onOpenSources,
  onOpenRelationships,
  onOpenHelp,
  onRestart,
  isAudioActive,
  onToggleAudio,
  scanlinesActive,
  onToggleScanlines,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="pause-menu-card" onClick={(e) => e.stopPropagation()}>
        <header className="pause-header">
          <div>
            <h2 className="pause-title">বিরতি (PAUSED)</h2>
            <p className="pause-subtitle">দ্যা হাসল: ঢাকা ক্রাইম ও সোশাল রিয়ালিজম</p>
          </div>
          <button onClick={onClose} className="btn-close-overlay" title="Resume">
            <X size={20} />
          </button>
        </header>

        <nav className="pause-nav-list">
          <button onClick={onClose} className="pause-btn pause-btn-primary">
            <Play size={18} />
            <span>খেলা চালিয়ে যান (Resume Game)</span>
          </button>

          <button onClick={onOpenSaveLoad} className="pause-btn">
            <Save size={18} />
            <span>সেভ ও লোড (Save / Load Game)</span>
          </button>

          <button onClick={onOpenArchive} className="pause-btn">
            <BookOpen size={18} />
            <span>দলিল সংরক্ষণাগার (Historical Archive)</span>
          </button>

          <button onClick={onOpenTimeline} className="pause-btn">
            <Clock size={18} />
            <span>ঘটনাক্রম ২০১৩–২০২৫ (Dual Timeline)</span>
          </button>

          <button onClick={onOpenRelationships} className="pause-btn">
            <Users size={18} />
            <span>সম্পর্কের গতিপথ (Relationships & Memory)</span>
          </button>

          <button onClick={onOpenSources} className="pause-btn">
            <FileText size={18} />
            <span>ঐতিহাসিক তথ্যসূত্র (Documentary Sources)</span>
          </button>

          <button onClick={onOpenHelp} className="pause-btn">
            <HeartHandshake size={18} />
            <span>সাহায্য ও চিকিৎসা সেবা (Support Services)</span>
          </button>

          <div className="pause-divider" />

          {/* Quick Settings Toggles */}
          <div className="pause-toggles-row">
            <button
              onClick={onToggleAudio}
              className={`toggle-pill ${isAudioActive ? 'active' : ''}`}
              title="Toggle monsoon rain ambience"
            >
              {isAudioActive ? <Volume2 size={16} /> : <VolumeX size={16} />}
              <span>{isAudioActive ? 'বৃষ্টির শব্দ: চালু (Rain: ON)' : 'বৃষ্টির শব্দ: বন্ধ (Rain: OFF)'}</span>
            </button>

            <button
              onClick={onToggleScanlines}
              className={`toggle-pill ${scanlinesActive ? 'active' : ''}`}
              title="Toggle retro CRT scanlines"
            >
              <Tv size={16} />
              <span>{scanlinesActive ? 'সিআরটি ইফেক্ট: চালু (CRT: ON)' : 'সিআরটি ইফেক্ট: বন্ধ (CRT: OFF)'}</span>
            </button>
          </div>

          <div className="pause-divider" />

          <button
            onClick={() => {
              if (window.confirm('প্রথম ধাপ থেকে পুনরায় শুরু করবেন? (Restart game from Stage 1?)')) {
                onRestart();
                onClose();
              }
            }}
            className="pause-btn pause-btn-danger"
          >
            <RotateCcw size={18} />
            <span>নতুন করে শুরু করুন (Restart Playthrough)</span>
          </button>
        </nav>
      </div>
    </div>
  );
};
