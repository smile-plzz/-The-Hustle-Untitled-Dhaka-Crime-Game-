import React from 'react';
import { HeartHandshake, Shield, Hospital, Info, X } from 'lucide-react';

interface HelpScreenProps {
  onClose: () => void;
}

export const HelpScreen: React.FC<HelpScreenProps> = ({ onClose }) => {
  return (
    <div className="fullscreen-overlay">
      <div className="help-container">
        <header className="help-header">
          <div className="help-header-left">
            <HeartHandshake size={28} className="text-emerald-400" />
            <div>
              <h1 className="help-title">SUBSTANCE ABUSE TREATMENT & SUPPORT</h1>
              <p className="help-subtitle">
                Official services, treatment facilities, and public healthcare resources in Bangladesh
              </p>
            </div>
          </div>

          <button onClick={onClose} className="btn-close-overlay" title="Close Help">
            <X size={20} />
          </button>
        </header>

        <div className="help-content-grid">
          {/* Overview Card */}
          <div className="help-card primary-card">
            <div className="card-header">
              <Shield size={20} className="text-emerald-400" />
              <h2>Department of Narcotics Control (DNC)</h2>
            </div>
            <p>
              Founded on 2 January 1990 under the Ministry of Home Affairs, the Department of Narcotics
              Control oversees national treatment and rehabilitation facilities alongside prevention and enforcement.
            </p>
            <p className="mt-2 text-neutral-300">
              Drug dependency is a medical condition requiring structured clinical, psychological, and social rehabilitation
              support. Recovery is possible with proper healthcare intervention.
            </p>
          </div>

          {/* Central Government Center */}
          <div className="help-card">
            <div className="card-header">
              <Hospital size={20} className="text-amber-400" />
              <h2>Central Drug Addiction Treatment Centre</h2>
            </div>
            <p>
              Located in Tejgaon, Dhaka, this is Bangladesh’s primary government-operated specialized rehabilitation
              hospital offering detox, psychological counseling, and in-patient medical care.
            </p>
            <div className="help-info-box">
              <span className="info-label">Capacity & Network:</span>
              <span className="info-value">
                The DNC operates 4 specialized government treatment centres (including Dhaka, Chattogram, Rajshahi,
                and Khulna) with expanding bed facilities.
              </span>
            </div>
          </div>

          {/* Licensed Private Facilities */}
          <div className="help-card">
            <div className="card-header">
              <Info size={20} className="text-sky-400" />
              <h2>Licensed Private Treatment Facilities</h2>
            </div>
            <p>
              Across Bangladesh, there are over 365 government-licensed private addiction treatment and rehabilitation centres
              with approximately 5,000 beds, subject to regulatory inspection by the DNC.
            </p>
            <p className="mt-2 text-xs text-neutral-400">
              * Families seeking care are advised to verify that private treatment centres possess active DNC licensing
              and employ certified clinical medical officers and psychologists.
            </p>
          </div>

          {/* Notice to Owner & Public */}
          <div className="help-card disclaimer-card">
            <div className="card-header">
              <Info size={20} className="text-rose-400" />
              <h2>Official Verification Notice</h2>
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed">
              In accordance with project safety guidelines, emergency direct phone hotlines will be updated upon
              periodic direct verification with the Department of Narcotics Control (DNC) administration. If you or a
              loved one are in crisis in Bangladesh, contact local registered medical health officers or civil hospital
              psychiatric departments for confidential assistance.
            </p>
          </div>
        </div>

        <footer className="help-footer">
          <button onClick={onClose} className="btn-help-close">
            <span>Return to Game</span>
          </button>
        </footer>
      </div>
    </div>
  );
};
