import React from 'react';
import { GameState } from '../types';
import { SCENES, ERA_BANNERS } from '../game/storyData';
import { MapPin, Calendar, HelpCircle, ArrowRight, ShieldCheck, Feather } from 'lucide-react';

interface ScenePlayerProps {
  state: GameState;
  onChoose: (choiceKey: string) => void;
  onAutoContinue: () => void;
  onOpenHistory: () => void;
}

export const ScenePlayer: React.FC<ScenePlayerProps> = ({
  state,
  onChoose,
  onAutoContinue,
  onOpenHistory,
}) => {
  const scene = SCENES[state.currentSceneId];
  if (!scene) {
    return (
      <div className="scene-error">
        <h2>Error: Scene {state.currentSceneId} not found</h2>
      </div>
    );
  }

  const eraBannerText = ERA_BANNERS[scene.stage]?.text;
  const setupText = scene.getSetupText(state);
  const reflection = scene.reflectionText ? scene.reflectionText(state) : null;
  const hasArchive = scene.archiveIds && scene.archiveIds.length > 0;

  return (
    <main className="scene-container">
      {/* Era Banner */}
      {eraBannerText && (
        <div className="era-banner" role="region" aria-label="Era information">
          <span className="era-banner-stage">STAGE {scene.stage}</span>
          <span className="era-banner-divider">•</span>
          <span className="era-banner-text">{eraBannerText}</span>
        </div>
      )}

      {/* Scene Header */}
      <section className="scene-header">
        <div className="scene-meta">
          <div className="meta-item">
            <Calendar size={14} className="meta-icon" />
            <span>
              {scene.month ? `${scene.month} ` : ''}
              {scene.year}
            </span>
          </div>

          <div className="meta-item">
            <MapPin size={14} className="meta-icon" />
            <span>
              {scene.locationName}, {scene.locationArea}
            </span>
          </div>
        </div>

        <div className="scene-tags">
          {/* Fact Tag */}
          <span
            className={`fact-tag ${scene.factTag === 'real' ? 'fact-real' : 'fact-fictional'}`}
            title={
              scene.factTag === 'real'
                ? 'Based on documented historical occurrences and reporting'
                : 'Fictional narrative scenario set within the historical setting'
            }
          >
            {scene.factTag === 'real' ? (
              <>
                <ShieldCheck size={12} className="inline mr-1" />
                Based on real events
              </>
            ) : (
              <>
                <Feather size={12} className="inline mr-1" />
                Fictional
              </>
            )}
          </span>

          {/* History Button */}
          {hasArchive && (
            <button
              onClick={onOpenHistory}
              className="btn-history"
              title="Read verified historical reporting for this event"
            >
              <HelpCircle size={14} />
              <span>What's the history?</span>
            </button>
          )}
        </div>
      </section>

      {/* Pre-Scene Notice (e.g., loan payoff/tanvir result) */}
      {state.preSceneNotice && (
        <div className="pre-scene-notice">
          <p>{state.preSceneNotice}</p>
        </div>
      )}

      {/* Last Choice Outcome */}
      {state.lastChoiceResult && (
        <div className="last-outcome-banner">
          <p className="outcome-text">"{state.lastChoiceResult}"</p>
        </div>
      )}

      {/* Scene Setup Narrative Text */}
      <article className="scene-narrative-card">
        <h1 className="scene-title-heading">{scene.id}: {scene.locationName}</h1>
        <p className="scene-text">{setupText}</p>

        {reflection && (
          <div className="scene-reflection">
            <p className="reflection-italic">"{reflection}"</p>
          </div>
        )}
      </article>

      {/* Choices Area */}
      <section className="choices-section">
        {scene.choices && scene.choices.length > 0 && (
          <div className="choices-grid">
            {scene.choices.map((choice) => {
              const availability = choice.isAvailable
                ? choice.isAvailable(state)
                : { available: true };
              const isBlocked = !availability.available;

              return (
                <button
                  key={choice.key}
                  disabled={isBlocked}
                  onClick={() => onChoose(choice.key)}
                  className={`choice-button ${isBlocked ? 'choice-disabled' : ''}`}
                >
                  <div className="choice-key-badge">{choice.key}</div>
                  <div className="choice-content">
                    <span className="choice-label">{choice.label}</span>
                    {isBlocked && (
                      <span className="choice-disabled-reason">
                        ({availability.reason})
                      </span>
                    )}
                  </div>
                  {!isBlocked && <ArrowRight size={16} className="choice-arrow" />}
                </button>
              );
            })}
          </div>
        )}

        {/* Auto Continue Button */}
        {scene.autoContinue && (
          <div className="auto-continue-container">
            <button onClick={onAutoContinue} className="btn-continue">
              <span>{scene.autoContinue.buttonLabel || 'Continue'}</span>
              <ArrowRight size={18} />
            </button>
          </div>
        )}
      </section>
    </main>
  );
};
