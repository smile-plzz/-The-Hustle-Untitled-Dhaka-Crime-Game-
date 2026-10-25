import React from 'react';
import { GameState } from '../types';
import { getRelationshipTrajectories } from '../game/engine';
import { Users, X, Heart, ShieldAlert, Award, Compass, Eye, Sparkles } from 'lucide-react';

interface RelationshipsModalProps {
  state: GameState;
  isOpen: boolean;
  onClose: () => void;
}

export const RelationshipsModal: React.FC<RelationshipsModalProps> = ({
  state,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const trajectories = getRelationshipTrajectories(state);

  const getCharacterIcon = (character: string) => {
    switch (character) {
      case 'Amena':
        return <Heart size={18} className="text-rose-400" />;
      case 'Noyon':
        return <Compass size={18} className="text-sky-400" />;
      case 'Reshma':
        return <Award size={18} className="text-amber-400" />;
      case 'Kalam':
        return <ShieldAlert size={18} className="text-red-500" />;
      case 'Babu':
        return <Eye size={18} className="text-neutral-400" />;
      case 'Shirin':
      default:
        return <Sparkles size={18} className="text-emerald-400" />;
    }
  };

  return (
    <div className="fullscreen-overlay" onClick={onClose}>
      <div className="relationships-container" onClick={(e) => e.stopPropagation()}>
        <header className="relationships-header">
          <div className="relationships-header-left">
            <Users size={24} className="text-amber-500" />
            <div>
              <h1 className="relationships-title">RELATIONSHIPS & MORAL MEMORY</h1>
              <p className="relationships-subtitle">
                "Not whether they like Rafiq, but what they still believe he is capable of."
              </p>
            </div>
          </div>

          <button onClick={onClose} className="btn-close-overlay" title="Close Relationships">
            <X size={20} />
          </button>
        </header>

        <div className="trajectories-grid">
          {trajectories.map((traj) => (
            <article key={traj.character} className="trajectory-card">
              <div className="trajectory-header">
                <div className="character-title-group">
                  {getCharacterIcon(traj.character)}
                  <h3 className="character-name">{traj.character}</h3>
                </div>
                <span className="trajectory-stage-badge">{traj.stage}</span>
              </div>

              <div className="trajectory-status-row">
                <span className="status-label">Status:</span>
                <span className="status-val">{traj.status}</span>
              </div>

              <div className="trajectory-perception-box">
                <p className="perception-text">"{traj.perception}"</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};
