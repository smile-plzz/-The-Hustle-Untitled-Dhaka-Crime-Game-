import React, { useState, useEffect } from 'react';
import { GameState } from './types';
import {
  createInitialState,
  chooseOption,
  continueFromAuto,
  dismissLedger,
} from './game/engine';
import { SCENES } from './game/storyData';
import { Header } from './components/Header';
import { NewsTicker } from './components/NewsTicker';
import { ScenePlayer } from './components/ScenePlayer';
import { LedgerModal } from './components/LedgerModal';
import { EndingScreen } from './components/EndingScreen';
import { HistoryDrawer } from './components/HistoryDrawer';
import { ArchiveScreen } from './components/ArchiveScreen';
import { TimelineScreen } from './components/TimelineScreen';
import { SourcesScreen } from './components/SourcesScreen';
import { HelpScreen } from './components/HelpScreen';
import { RelationshipsModal } from './components/RelationshipsModal';
import { PauseMenu } from './components/PauseMenu';
import { SaveLoadModal } from './components/SaveLoadModal';
import { soundManager } from './components/SoundAtmosphere';

const ARCHIVE_STORAGE_KEY = 'the_hustle_unlocked_archives_v1';
const AUTOSAVE_STORAGE_KEY = 'the_hustle_autosave_v1';

export const App: React.FC = () => {
  // Load persistent unlocked archive entries across all playthroughs
  const [persistentArchiveIds, setPersistentArchiveIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(ARCHIVE_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // Ignore
    }
    return ['A-02'];
  });

  // Initialize GameState
  const [gameState, setGameState] = useState<GameState>(() => {
    return createInitialState(persistentArchiveIds);
  });

  // UI Modals & Panels State
  const [isHistoryDrawerOpen, setIsHistoryDrawerOpen] = useState(false);
  const [isArchiveOpen, setIsArchiveOpen] = useState(false);
  const [isTimelineOpen, setIsTimelineOpen] = useState(false);
  const [isSourcesOpen, setIsSourcesOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isRelationshipsOpen, setIsRelationshipsOpen] = useState(false);
  const [isPauseMenuOpen, setIsPauseMenuOpen] = useState(false);
  const [isSaveLoadOpen, setIsSaveLoadOpen] = useState(false);

  // Settings State
  const [isAudioActive, setIsAudioActive] = useState(false);
  const [scanlinesActive, setScanlinesActive] = useState(false);

  // Sync unlocked archives to localStorage whenever they expand
  useEffect(() => {
    const combined = Array.from(
      new Set([...persistentArchiveIds, ...gameState.unlockedArchiveIds])
    );
    if (combined.length !== persistentArchiveIds.length) {
      setPersistentArchiveIds(combined);
      try {
        localStorage.setItem(ARCHIVE_STORAGE_KEY, JSON.stringify(combined));
      } catch {
        // Ignore
      }
    }
  }, [gameState.unlockedArchiveIds, persistentArchiveIds]);

  // Autosave game state
  useEffect(() => {
    try {
      localStorage.setItem(AUTOSAVE_STORAGE_KEY, JSON.stringify(gameState));
    } catch {
      // Ignore
    }
  }, [gameState]);

  // Keyboard shortcut: Escape to toggle pause menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (
          isArchiveOpen ||
          isTimelineOpen ||
          isSourcesOpen ||
          isHelpOpen ||
          isRelationshipsOpen ||
          isSaveLoadOpen ||
          isHistoryDrawerOpen
        ) {
          setIsArchiveOpen(false);
          setIsTimelineOpen(false);
          setIsSourcesOpen(false);
          setIsHelpOpen(false);
          setIsRelationshipsOpen(false);
          setIsSaveLoadOpen(false);
          setIsHistoryDrawerOpen(false);
        } else {
          setIsPauseMenuOpen((prev) => !prev);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    isArchiveOpen,
    isTimelineOpen,
    isSourcesOpen,
    isHelpOpen,
    isRelationshipsOpen,
    isSaveLoadOpen,
    isHistoryDrawerOpen,
  ]);

  const handleChoose = (choiceKey: string) => {
    setGameState((prev) => chooseOption(prev, choiceKey));
  };

  const handleAutoContinue = () => {
    setGameState((prev) => continueFromAuto(prev));
  };

  const handleDismissLedger = () => {
    setGameState((prev) => dismissLedger(prev));
  };

  const handleRestart = () => {
    const freshState = createInitialState(persistentArchiveIds);
    setGameState(freshState);
  };

  const handleLoadState = (loaded: GameState) => {
    setGameState(loaded);
  };

  const handleToggleAudio = () => {
    const active = soundManager.toggle();
    setIsAudioActive(active);
  };

  const handleToggleScanlines = () => {
    setScanlinesActive((prev) => !prev);
  };

  const currentScene = SCENES[gameState.currentSceneId];

  return (
    <div className={`app-root ${scanlinesActive ? 'crt-scanlines' : ''}`}>
      {/* Header with Stats and Top Navigation */}
      <Header
        state={gameState}
        onOpenMenu={() => setIsPauseMenuOpen(true)}
        onOpenArchive={() => setIsArchiveOpen(true)}
        onOpenTimeline={() => setIsTimelineOpen(true)}
        onOpenSources={() => setIsSourcesOpen(true)}
        onOpenRelationships={() => setIsRelationshipsOpen(true)}
        isAudioActive={isAudioActive}
        onToggleAudio={handleToggleAudio}
      />

      {/* Real Historical News Ticker */}
      <NewsTicker tickerId={currentScene?.tickerId} />

      {/* Main Content Area */}
      <div className="main-viewport">
        {gameState.endingResult ? (
          <EndingScreen
            state={gameState}
            onOpenHelp={() => setIsHelpOpen(true)}
            onOpenArchive={() => setIsArchiveOpen(true)}
            onOpenTimeline={() => setIsTimelineOpen(true)}
            onRestart={handleRestart}
          />
        ) : (
          <ScenePlayer
            state={gameState}
            onChoose={handleChoose}
            onAutoContinue={handleAutoContinue}
            onOpenHistory={() => setIsHistoryDrawerOpen(true)}
          />
        )}
      </div>

      {/* Inter-Stage Financial Ledger Modal */}
      {gameState.stageLedger && (
        <LedgerModal state={gameState} onDismiss={handleDismissLedger} />
      )}

      {/* History Side Drawer */}
      <HistoryDrawer
        archiveIds={currentScene?.archiveIds || []}
        isOpen={isHistoryDrawerOpen}
        onClose={() => setIsHistoryDrawerOpen(false)}
      />

      {/* Full Screen Archive Browser */}
      {isArchiveOpen && (
        <ArchiveScreen
          unlockedIds={persistentArchiveIds}
          onClose={() => setIsArchiveOpen(false)}
        />
      )}

      {/* 2013-2025 Dual Track Timeline */}
      {isTimelineOpen && (
        <TimelineScreen onClose={() => setIsTimelineOpen(false)} />
      )}

      {/* 29 Documentary Sources View */}
      {isSourcesOpen && (
        <SourcesScreen onClose={() => setIsSourcesOpen(false)} />
      )}

      {/* Substance Abuse Support & Treatment Info */}
      {isHelpOpen && <HelpScreen onClose={() => setIsHelpOpen(false)} />}

      {/* Relationships & Moral Memory Trajectory */}
      <RelationshipsModal
        state={gameState}
        isOpen={isRelationshipsOpen}
        onClose={() => setIsRelationshipsOpen(false)}
      />

      {/* Pause Menu */}
      <PauseMenu
        isOpen={isPauseMenuOpen}
        onClose={() => setIsPauseMenuOpen(false)}
        onOpenSaveLoad={() => setIsSaveLoadOpen(true)}
        onOpenArchive={() => {
          setIsPauseMenuOpen(false);
          setIsArchiveOpen(true);
        }}
        onOpenTimeline={() => {
          setIsPauseMenuOpen(false);
          setIsTimelineOpen(true);
        }}
        onOpenSources={() => {
          setIsPauseMenuOpen(false);
          setIsSourcesOpen(true);
        }}
        onOpenRelationships={() => {
          setIsPauseMenuOpen(false);
          setIsRelationshipsOpen(true);
        }}
        onOpenHelp={() => {
          setIsPauseMenuOpen(false);
          setIsHelpOpen(true);
        }}
        onRestart={handleRestart}
        isAudioActive={isAudioActive}
        onToggleAudio={handleToggleAudio}
        scanlinesActive={scanlinesActive}
        onToggleScanlines={handleToggleScanlines}
      />

      {/* Save & Load Slots Modal */}
      <SaveLoadModal
        currentState={gameState}
        isOpen={isSaveLoadOpen}
        onClose={() => setIsSaveLoadOpen(false)}
        onLoadState={handleLoadState}
      />
    </div>
  );
};

export default App;
