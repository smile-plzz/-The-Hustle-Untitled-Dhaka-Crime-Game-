import React from 'react';
import { GameState } from '../types';
import {
  ShieldAlert,
  Heart,
  Users,
  Menu,
  BookOpen,
  Volume2,
  VolumeX,
  Clock,
  FileText,
} from 'lucide-react';

interface HeaderProps {
  state: GameState;
  onOpenMenu: () => void;
  onOpenArchive: () => void;
  onOpenTimeline: () => void;
  onOpenSources: () => void;
  isAudioActive: boolean;
  onToggleAudio: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  state,
  onOpenMenu,
  onOpenArchive,
  onOpenTimeline,
  onOpenSources,
  isAudioActive,
  onToggleAudio,
}) => {
  const { stats, crew, unlockedArchiveIds, currentSceneId } = state;
  const isStage4Or5 = currentSceneId.startsWith('S4') || currentSceneId.startsWith('S5');

  return (
    <header className="header-container">
      <div className="header-top">
        <div className="title-section">
          <span className="game-title">THE HUSTLE</span>
          <span className="game-subtitle">DHAKA 2013–2025</span>
        </div>

        <div className="actions-section">
          <button
            onClick={onToggleAudio}
            className={`btn-icon ${isAudioActive ? 'active' : ''}`}
            title={isAudioActive ? 'Mute ambient sound' : 'Play ambient rain'}
          >
            {isAudioActive ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>

          <button onClick={onOpenTimeline} className="btn-icon" title="Timeline">
            <Clock size={16} />
            <span className="btn-label-desktop">Timeline</span>
          </button>

          <button onClick={onOpenArchive} className="btn-icon" title="Historical Archive">
            <BookOpen size={16} />
            <span className="btn-label-desktop">
              Archive ({unlockedArchiveIds.length}/15)
            </span>
          </button>

          <button onClick={onOpenSources} className="btn-icon" title="Historical Sources">
            <FileText size={16} />
            <span className="btn-label-desktop">Sources</span>
          </button>

          <button onClick={onOpenMenu} className="btn-icon" title="Menu">
            <Menu size={16} />
            <span className="btn-label-desktop">Menu</span>
          </button>
        </div>
      </div>

      <div className="stats-bar">
        {/* Money */}
        <div className="stat-item stat-money" title="Current accumulated wealth">
          <span className="stat-label">MONEY</span>
          <span className="stat-value">৳ {stats.money.toLocaleString()}</span>
        </div>

        {/* Loyalty */}
        <div className="stat-item" title="Trust with family, crew, and friends">
          <div className="stat-header">
            <span className="stat-label">
              <Users size={13} className="inline mr-1" />
              LOYALTY
            </span>
            <span className="stat-value">{stats.loyalty}/100</span>
          </div>
          <div className="stat-meter">
            <div
              className="stat-fill fill-loyalty"
              style={{ width: `${stats.loyalty}%` }}
            />
          </div>
        </div>

        {/* Heat */}
        <div
          className={`stat-item ${stats.heat >= 70 ? 'danger-heat' : stats.heat >= 40 ? 'warning-heat' : ''}`}
          title="Police and law enforcement attention. 70+ is critical risk."
        >
          <div className="stat-header">
            <span className="stat-label">
              <ShieldAlert size={13} className="inline mr-1" />
              HEAT
            </span>
            <span className="stat-value">{stats.heat}/100</span>
          </div>
          <div className="stat-meter">
            <div
              className="stat-fill fill-heat"
              style={{ width: `${stats.heat}%` }}
            />
          </div>
        </div>

        {/* Morality */}
        <div className="stat-item" title="Psychological toll and ethical boundaries">
          <div className="stat-header">
            <span className="stat-label">
              <Heart size={13} className="inline mr-1" />
              MORALITY
            </span>
            <span className="stat-value">{stats.morality}/100</span>
          </div>
          <div className="stat-meter">
            <div
              className="stat-fill fill-morality"
              style={{ width: `${stats.morality}%` }}
            />
          </div>
        </div>

        {/* Crew Status if in Stage 4 or 5 */}
        {isStage4Or5 && (
          <div className="stat-item stat-crew" title="Crew individual loyalties">
            <span className="stat-label">CREW</span>
            <div className="crew-badges">
              <span className="crew-chip">
                Noyon: <strong>{crew.noyon}</strong>
              </span>
              <span
                className={`crew-chip ${state.flags.reshmaDefected ? 'chip-defected' : ''}`}
              >
                Reshma: <strong>{state.flags.reshmaDefected ? 'Defected' : crew.reshma}</strong>
              </span>
              <span className="crew-chip">
                Kalam: <strong>{crew.kalam}</strong>
              </span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
