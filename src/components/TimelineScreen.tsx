import React from 'react';
import { X, Clock } from 'lucide-react';

interface TimelineScreenProps {
  onClose: () => void;
}

interface TimelineMarker {
  year: string;
  realEvent: {
    title: string;
    description: string;
  };
  rafiqMilestone: {
    title: string;
    description: string;
  };
}

const TIMELINE_DATA: TimelineMarker[] = [
  {
    year: '2013',
    realEvent: {
      title: 'Rana Plaza Collapse',
      description: 'Nine-storey garment factory collapses in Savar; over 1,100 dead. Garment sector in crisis.',
    },
    rafiqMilestone: {
      title: 'Rafiq (Age 14) - The Medical Debt',
      description: 'Father hurt in workshop accident; Rafiq accepts Babu’s offer of 200 taka for a delivery.',
    },
  },
  {
    year: '2015',
    realEvent: {
      title: 'Dhaka Drug Trade Reshuffle',
      description: 'Cannabis and codeine syrups dominate urban hubs; growing youth involvement in distribution.',
    },
    rafiqMilestone: {
      title: 'Rafiq (Age 16) - First Hustle',
      description: 'Learns rules of the lane in Kalshi and Jhilpar. Sells weed in 100-200 taka packets.',
    },
  },
  {
    year: '2016',
    realEvent: {
      title: 'India Phensedyl Ban',
      description: 'India bans codeine syrup. Over 500,000 bottles seized along Bangladesh border.',
    },
    rafiqMilestone: {
      title: 'Rafiq (Age 17) - Close Calls',
      description: 'Weed and syrup customer demands; hospital debt is paid off, but Amena grows suspicious.',
    },
  },
  {
    year: '2017',
    realEvent: {
      title: 'Refugee Influx & Border Surge',
      description: 'August 2017 Myanmar military crackdown; 1M Rohingya shelter near Teknaf. Yaba flood begins.',
    },
    rafiqMilestone: {
      title: 'Rafiq (Age 18) - The Meeting with Shuvo',
      description: 'Introduced to Shuvo’s Jatrabari syndicate. The trade shifts from weed to methamphetamine.',
    },
  },
  {
    year: '2018',
    realEvent: {
      title: 'Anti-Drug Drive & Death Penalty Law',
      description: 'May 2018 drive: 200+ dead in gunfights, 25,000 held. October: Narcotics Control Act imposes death penalty.',
    },
    rafiqMilestone: {
      title: 'Rafiq (Age 19) - Inspector Haque & Babu Arrest',
      description: 'First raid at Jhilpar Outpost. Babu is locked up. Amena discovers pills in Rafiq’s bag.',
    },
  },
  {
    year: '2019',
    realEvent: {
      title: 'Record 53M Meth Pill Seizure',
      description: 'Department of Narcotics Control records unprecedented pill seizures despite ongoing crackdowns.',
    },
    rafiqMilestone: {
      title: 'Rafiq (Age 20) - Building the Crew',
      description: 'Rents Jatrabari warehouse on the highway. Recruits Noyon, Reshma, and Kalam.',
    },
  },
  {
    year: '2020',
    realEvent: {
      title: 'Teknaf Surrender, COVID, Sinha Killing',
      description: '102 godfathers surrender in Feb; March lockdown thins police; Major Sinha shot in July.',
    },
    rafiqMilestone: {
      title: 'Rafiq (Age 21) - Shuvo’s Ultimatum & Lockdown',
      description: 'Shuvo squeezes for higher cuts; lockdown drives street prices up; Kalam uses violence.',
    },
  },
  {
    year: '2022',
    realEvent: {
      title: 'Highway Supply Consolidation',
      description: 'Trafficking routes entrench along Dhaka-Chattogram highway into regional depots.',
    },
    rafiqMilestone: {
      title: 'Rafiq (Age 23) - Empire or Fronts',
      description: 'Consolidates routes or attempts to disguise profits through legitimate market fronts.',
    },
  },
  {
    year: '2024',
    realEvent: {
      title: 'August Political Upheaval',
      description: 'State policing collapses temporarily; thanas empty; reports of ice rising beside yaba.',
    },
    rafiqMilestone: {
      title: 'Rafiq (Age 25) - The Quiet Streets',
      description: 'Police presence recedes; Haque demands intelligence bribes; street volume peaks.',
    },
  },
  {
    year: '2025',
    realEvent: {
      title: 'Child Carriers & Official Scrutiny',
      description: 'DNC reveals 25% of carriers are children; arrests of police personnel with yaba in Chattogram.',
    },
    rafiqMilestone: {
      title: 'Rafiq (Age 26) - Reckoning at the Bridge',
      description: 'Confronts twelve-year-old child carrier in Jatrabari. The final knock at Shah Amanat Bridge.',
    },
  },
];

export const TimelineScreen: React.FC<TimelineScreenProps> = ({ onClose }) => {
  return (
    <div className="fullscreen-overlay">
      <div className="timeline-container">
        <header className="timeline-header">
          <div className="timeline-header-left">
            <Clock size={24} className="text-amber-500" />
            <div>
              <h1 className="timeline-title">DUAL-TRACK TIMELINE (2013–2025)</h1>
              <p className="timeline-subtitle">
                Parallel tracks: Documented Bangladesh historical milestones (top) vs. Rafiq’s life trajectory (bottom)
              </p>
            </div>
          </div>

          <button onClick={onClose} className="btn-close-overlay" title="Close Timeline">
            <X size={20} />
          </button>
        </header>

        <div className="timeline-scroll-area">
          <div className="timeline-track">
            {TIMELINE_DATA.map((node, index) => (
              <div key={index} className="timeline-node">
                {/* Top Row: Real History */}
                <div className="timeline-card real-card">
                  <div className="card-badge real-badge">Real Event</div>
                  <h3 className="card-title">{node.realEvent.title}</h3>
                  <p className="card-desc">{node.realEvent.description}</p>
                </div>

                {/* Central Year Axis */}
                <div className="axis-year-marker">
                  <div className="axis-point" />
                  <span className="axis-year">{node.year}</span>
                  <div className="axis-point" />
                </div>

                {/* Bottom Row: Rafiq's Story */}
                <div className="timeline-card story-card">
                  <div className="card-badge story-badge">Rafiq's Milestone</div>
                  <h3 className="card-title">{node.rafiqMilestone.title}</h3>
                  <p className="card-desc">{node.rafiqMilestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
