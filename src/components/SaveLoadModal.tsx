import React, { useState, useEffect } from 'react';
import { GameState } from '../types';
import { Save, FolderOpen, Trash2, X, Check } from 'lucide-react';

interface SaveSlot {
  id: number;
  label: string;
  timestamp: string;
  stage: number;
  sceneId: string;
  money: number;
  state: GameState;
}

interface SaveLoadModalProps {
  currentState: GameState;
  isOpen: boolean;
  onClose: () => void;
  onLoadState: (state: GameState) => void;
}

const STORAGE_KEY = 'the_hustle_saves_v1';

export const SaveLoadModal: React.FC<SaveLoadModalProps> = ({
  currentState,
  isOpen,
  onClose,
  onLoadState,
}) => {
  const [slots, setSlots] = useState<(SaveSlot | null)[]>([null, null, null, null]);
  const [activeTab, setActiveTab] = useState<'save' | 'load'>('save');
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    loadSlotsFromStorage();
  }, [isOpen]);

  const loadSlotsFromStorage = () => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        setSlots(JSON.parse(data));
      }
    } catch {
      // Ignore parse error
    }
  };

  const handleSave = (index: number) => {
    const newSlot: SaveSlot = {
      id: index,
      label: `Stage ${currentState.currentSceneId.startsWith('S') ? currentState.currentSceneId.charAt(1) : '1'} - ${currentState.currentSceneId}`,
      timestamp: new Date().toLocaleString(),
      stage: parseInt(currentState.currentSceneId.charAt(1), 10) || 1,
      sceneId: currentState.currentSceneId,
      money: currentState.stats.money,
      state: currentState,
    };

    const updated = [...slots];
    updated[index] = newSlot;
    setSlots(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setMessage(`Game successfully saved to Slot ${index + 1}!`);
    setTimeout(() => setMessage(null), 3000);
  };

  const handleLoad = (slot: SaveSlot) => {
    onLoadState(slot.state);
    onClose();
  };

  const handleDelete = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = [...slots];
    updated[index] = null;
    setSlots(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="save-load-modal" onClick={(e) => e.stopPropagation()}>
        <header className="save-modal-header">
          <div className="save-tabs">
            <button
              onClick={() => setActiveTab('save')}
              className={`save-tab ${activeTab === 'save' ? 'active' : ''}`}
            >
              <Save size={16} />
              <span>Save Progress</span>
            </button>
            <button
              onClick={() => setActiveTab('load')}
              className={`save-tab ${activeTab === 'load' ? 'active' : ''}`}
            >
              <FolderOpen size={16} />
              <span>Load Game</span>
            </button>
          </div>

          <button onClick={onClose} className="btn-close-overlay" title="Close">
            <X size={18} />
          </button>
        </header>

        {message && (
          <div className="save-alert-success">
            <Check size={16} />
            <span>{message}</span>
          </div>
        )}

        <div className="save-slots-list">
          {slots.map((slot, idx) => (
            <div
              key={idx}
              className={`slot-card ${slot ? 'slot-occupied' : 'slot-empty'}`}
              onClick={() => {
                if (activeTab === 'save') {
                  handleSave(idx);
                } else if (slot) {
                  handleLoad(slot);
                }
              }}
            >
              <div className="slot-number">Slot {idx + 1}</div>

              {slot ? (
                <div className="slot-info">
                  <div className="slot-title">{slot.label}</div>
                  <div className="slot-meta">
                    <span>৳ {slot.money.toLocaleString()}</span>
                    <span>•</span>
                    <span>{slot.timestamp}</span>
                  </div>
                </div>
              ) : (
                <div className="slot-empty-text">
                  {activeTab === 'save' ? 'Click to Save' : 'Empty Slot'}
                </div>
              )}

              {slot && (
                <button
                  onClick={(e) => handleDelete(idx, e)}
                  className="btn-slot-delete"
                  title="Delete Save"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
