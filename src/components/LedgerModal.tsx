import React from 'react';
import { GameState } from '../types';
import { ArrowRight, BookOpen } from 'lucide-react';

interface LedgerModalProps {
  state: GameState;
  onDismiss: () => void;
}

export const LedgerModal: React.FC<LedgerModalProps> = ({ state, onDismiss }) => {
  if (!state.stageLedger) return null;

  const { stage, amount, text } = state.stageLedger;

  return (
    <div className="modal-backdrop">
      <div className="ledger-card">
        <div className="ledger-header">
          <BookOpen size={20} className="text-amber-500" />
          <h2 className="ledger-title">STAGE {stage} FINANCIAL LEDGER</h2>
        </div>

        <p className="ledger-explanation">{text}</p>

        <div className="ledger-summary-box">
          <div className="ledger-row">
            <span className="ledger-row-label">Stage Net Settlement:</span>
            <span className="ledger-row-val font-mono text-emerald-400">
              +{amount.toLocaleString()} taka
            </span>
          </div>

          <div className="ledger-divider" />

          <div className="ledger-row ledger-total">
            <span className="ledger-row-label">Updated Balance:</span>
            <span className="ledger-row-val font-mono text-amber-300">
              ৳ {(state.stats.money + amount).toLocaleString()}
            </span>
          </div>
        </div>

        <button onClick={onDismiss} className="btn-ledger-continue">
          <span>Close Ledger & Enter Stage {stage + 1}</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};
