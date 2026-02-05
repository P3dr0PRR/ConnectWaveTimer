import { Timer, ScrollText } from 'lucide-react';
import { NavLink } from 'react-router-dom';

export function Header() {
  return (
    <div className="w-full flex pb-8 items-center justify-between">
      <div className="flex justify-start">
        <img src="/ConectWave.svg" width={64} height={64} alt="" />
      </div>

      <nav className="flex items-center justify-end gap-6">
        <NavLink
          to="/"
          title="Timer"
          className={({ isActive }) =>
            `p-2 border-2 border-transparent hover:border-b-emerald-500 transition-colors ${
              isActive ? 'text-emerald-500 border-emerald-500' : 'text-white'
            }`
          }
        >
          <Timer size={30} />
        </NavLink>

        <NavLink
          to="/history"
          title="Historico"
          className={({ isActive }) =>
            `p-2 border-2 border-transparent hover:border-b-emerald-500 transition-colors ${
              isActive ? 'text-emerald-500 border-emerald-500' : 'text-white'
            }`
          }
        >
          <ScrollText size={30} />
        </NavLink>
      </nav>
    </div>
  );
}