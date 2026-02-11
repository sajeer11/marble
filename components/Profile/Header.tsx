
import React from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-border-soft px-6 md:px-10 py-4 bg-white sticky top-0 z-50">
      <div className="flex items-center gap-10">
        <Link href="/" className="flex items-center gap-3 text-primary">
          <div className="size-7">
            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 4H17.3334V17.3334H30.6666V30.6666H44V44H4V4Z" fill="currentColor"></path>
            </svg>
          </div>
          <h2 className="text-primary text-xl font-extrabold leading-tight tracking-[-0.02em] font-display">MARBLE & CO</h2>
        </Link>
        <div className="hidden md:flex items-center gap-9">
          <a className="text-slate-600 text-sm font-semibold hover:text-accent-green transition-colors" href="#">Shop</a>
          <a className="text-slate-600 text-sm font-semibold hover:text-accent-green transition-colors" href="#">Collections</a>
          <a className="text-slate-600 text-sm font-semibold hover:text-accent-green transition-colors" href="#">About</a>
          <a className="text-slate-600 text-sm font-semibold hover:text-accent-green transition-colors" href="#">Journal</a>
        </div>
      </div>
      <div className="flex flex-1 justify-end gap-5 items-center">
        <label className="hidden lg:flex flex-col min-w-40 h-10 max-w-64">
          <div className="flex w-full flex-1 items-stretch rounded-lg h-full overflow-hidden border border-border-soft bg-slate-50">
            <div className="text-slate-400 flex items-center justify-center pl-4">
              <span className="material-symbols-outlined text-[18px]">search</span>
            </div>
            <input 
              className="form-input flex w-full min-w-0 flex-1 border-none bg-transparent text-slate-900 focus:ring-0 placeholder:text-slate-400 px-4 pl-2 text-sm font-normal" 
              placeholder="Search collection..." 
            />
          </div>
        </label>
        <div className="flex gap-2">
          <button className="flex items-center justify-center rounded-full h-10 w-10 border border-border-soft text-slate-700 hover:bg-slate-50 transition-all">
            <span className="material-symbols-outlined text-[20px]">shopping_cart</span>
          </button>
          <button className="flex items-center justify-center rounded-full h-10 w-10 border border-border-soft text-slate-700 hover:bg-slate-50 transition-all">
            <span className="material-symbols-outlined text-[20px]">favorite</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
