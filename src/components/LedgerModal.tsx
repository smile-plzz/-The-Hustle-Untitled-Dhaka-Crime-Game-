import React from 'react';
import { GameState } from '../types';
import { ArrowRight, BookOpen } from 'lucide-react';

interface LedgerModalProps {
  state: GameState;
  onDismiss: () => void;
}

export const LedgerModal: React.FC<LedgerModalProps> = ({ state, onDismiss }) => {
  if (!state.stageLedger) return null;

  const { stage, amount, text, age, metrics } = state.stageLedger;

  return (
    <div className="modal-backdrop">
      <div className="ledger-card psychological-ledger-card">
        <div className="ledger-header">
          <BookOpen size={20} className="text-amber-500" />
          <div>
            <h2 className="ledger-title">RAFIQ'S LEDGER — AGE {age || (stage === 2 ? 16 : stage === 3 ? 18 : 22)}</h2>
            <span className="ledger-subtitle">STAGE {stage} PSYCHOLOGICAL & FINANCIAL BALANCE SHEET</span>
          </div>
        </div>

        <p className="ledger-explanation">{text}</p>

        {/* Psychological Balance Sheet Metrics */}
        {metrics && metrics.length > 0 && (
          <div className="psychological-metrics-container">
            <span className="metrics-heading">CURRENT TALLY</span>
            <div className="metrics-grid">
              {metrics.map((metric, idx) => (
                <div key={idx} className={`metric-row metric-${metric.statusClass || 'neutral'}`}>
                  <span className="metric-label">{metric.label}</span>
                  <span className="metric-value">{metric.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="ledger-summary-box">
          <div className="ledger-row">
            <span className="ledger-row-label">Stage Net Settlement:</span>
            <span className="ledger-row-val font-mono text-emerald-400">
              +{amount.toLocaleString()} taka
            </span>
          </div>

          <div className="ledger-divider" />

          <div className="ledger-row ledger-total">
            <span className="ledger-row-label">Cash on Hand:</span>
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
