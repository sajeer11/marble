
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { MOCK_USER } from '../../constants';

interface Props {
  onClose?: () => void;
}

const Sidebar: React.FC<Props> = ({ onClose }) => {
  const navItems = [
    { to: '/dashboard', label: 'Overview', icon: 'dashboard' },
    { to: '/orders', label: 'My Orders', icon: 'package_2' },
    { to: '/track/MC-94281', label: 'Track Order', icon: 'local_shipping' },
    { to: '/address-book', label: 'Address Book', icon: 'menu_book' },
    { to: '/settings', label: 'Settings', icon: 'settings' },
  ];
  const location = useLocation();

  return (
    <aside className="w-full max-w-xs md:w-72 h-full bg-white border-r border-border-soft flex flex-col p-6 md:p-8 gap-6 overflow-y-auto">
      <div className="flex items-center justify-between md:hidden">
        <div />
        <button onClick={onClose} className="p-2 rounded-md text-slate-600 hover:bg-slate-100">
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>
      <div className="flex flex-col gap-8">
        <div className="flex gap-4 items-center px-2">
          <div 
            className="bg-center bg-no-repeat bg-cover rounded-full h-12 w-12 ring-1 ring-slate-100 shadow-sm" 
            style={{ backgroundImage: `url("${MOCK_USER.avatar}")` }}
          />
          <div className="flex flex-col">
            <h3 className="text-slate-900 text-base font-bold leading-none">{MOCK_USER.name}</h3>
            <p className="text-accent-green text-[10px] font-bold mt-1.5 tracking-[0.05em] uppercase">{MOCK_USER.membershipType}</p>
          </div>
        </div>
        <nav className="flex flex-col gap-1.5">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} onClick={() => onClose && onClose()}>
              {({ isActive }) => (
                <div className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${isActive ? 'bg-slate-50 text-slate-900 border border-slate-100 shadow-sm' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'}`}>
                  <span className="material-symbols-outlined text-[22px] group-hover:text-primary transition-colors">
                    {item.icon}
                  </span>
                  <p className={`text-sm ${isActive ? 'font-bold' : 'font-medium'}`}>
                    {item.label}
                  </p>
                </div>
              )}
            </NavLink>
          ))}
        </nav>
      </div>
      <div className="mt-auto pt-6 border-t border-slate-50">
        <button className="flex items-center gap-3 px-4 py-3 rounded-xl w-full text-red-500 hover:bg-red-50 transition-colors">
          <span className="material-symbols-outlined text-[22px]">logout</span>
          <p className="text-sm font-bold">Logout</p>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
