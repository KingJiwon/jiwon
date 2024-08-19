import React from 'react';
import style from '../style/components/Header.module.scss';

interface HeaderProps {
  onNavClick: (section: string) => void;
  activeSection: string;
}

export default function Header({ onNavClick, activeSection }: HeaderProps) {
  return (
    <div className={style.container}>
      <div className={style.inner}>
        <ul className={style.navigator}>
          {['Prologue', 'Info', 'Skills', 'Projects', 'Contact'].map(
            (section) => (
              <li key={section}>
                <button
                  type="button"
                  onClick={() => onNavClick(section)}
                  className={activeSection === section ? style.active : ''}
                >
                  {section}
                </button>
              </li>
            ),
          )}
        </ul>
      </div>
    </div>
  );
}
