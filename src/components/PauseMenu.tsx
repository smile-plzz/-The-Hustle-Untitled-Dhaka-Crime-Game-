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
} from 'lucide-react';

interface PauseMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSaveLoad: () => void;
  onOpenArchive: () => void;
  onOpenTimeline: () => void;
  onOpenSources: () => void;
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
            <h2 className="pause-title">PAUSED</h2>
            <p className="pause-subtitle">The Hustle: Dhaka Crime & Social Realism</p>
          </div>
          <button onClick={onClose} className="btn-close-overlay" title="Resume">
            <X size={20} />
          </button>
        </header>

        <nav className="pause-nav-list">
          <button onClick={onClose} className="pause-btn pause-btn-primary">
            <Play size={18} />
            <span>Resume Game</span>
          </button>

          <button onClick={onOpenSaveLoad} className="pause-btn">
            <Save size={18} />
            <span>Save / Load Game</span>
          </button>

          <button onClick={onOpenArchive} className="pause-btn">
            <BookOpen size={18} />
            <span>Historical Archive</span>
          </button>

          <button onClick={onOpenTimeline} className="pause-btn">
            <Clock size={18} />
            <span>2013–2025 Dual Timeline</span>
          </button>

          <button onClick={onOpenSources} className="pause-btn">
            <FileText size={18} />
            <span>Documentary Sources (29 Citations)</span>
          </button>

          <button onClick={onOpenHelp} className="pause-btn">
            <HeartHandshake size={18} />
            <span>Support & Treatment Services</span>
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
              <span>{isAudioActive ? 'Rain Ambience: ON' : 'Rain Ambience: OFF'}</span>
            </button>

            <button
              onClick={onToggleScanlines}
              className={`toggle-pill ${scanlinesActive ? 'active' : ''}`}
              title="Toggle retro CRT scanlines"
            >
              <Tv size={16} />
              <span>{scanlinesActive ? 'CRT Scanlines: ON' : 'CRT Scanlines: OFF'}</span>
            </button>
          </div>

          <div className="pause-divider" />

          <button
            onClick={() => {
              if (window.confirm('Restart game from Stage 1? Any unsaved progress will be lost.')) {
                onRestart();
                onClose();
              }
            }}
            className="pause-btn pause-btn-danger"
          >
            <RotateCcw size={18} />
            <span>Restart Playthrough</span>
          </button>
        </nav>
      </div>
    </div>
  );
};
