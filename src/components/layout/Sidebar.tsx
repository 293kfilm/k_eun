'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from './ThemeToggle';

interface NavItem {
  icon: string;
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { icon: '\u26A1', label: '\uC0DD\uC131\uAE30', href: '/' },
  { icon: '\uD83D\uDCC1', label: '\uD504\uB85C\uC81D\uD2B8', href: '/projects' },
  { icon: '\uD83C\uDFA8', label: 'My Styles', href: '/styles' },
  { icon: '\uD83D\uDCDA', label: '\uD788\uC2A4\uD1A0\uB9AC', href: '/history' },
];

const settingsItem: NavItem = {
  icon: '\u2699\uFE0F',
  label: '\uC124\uC815',
  href: '/settings',
};

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  // Mobile bottom tab bar
  if (isMobile) {
    const allItems = [...navItems, settingsItem];
    return (
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-bg-primary border-t border-border">
        <div className="flex items-center justify-around h-14">
          {allItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex flex-col items-center justify-center gap-0.5 px-2 py-1.5 rounded-lg text-xs transition-colors
                ${
                  isActive(item.href)
                    ? 'text-accent'
                    : 'text-text-tertiary hover:text-text-secondary'
                }
              `}
            >
              <span className="text-lg leading-none">{item.icon}</span>
              <span className="truncate">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    );
  }

  // Desktop sidebar
  return (
    <aside
      className={`
        flex flex-col h-screen bg-bg-primary border-r border-border transition-all duration-200 ease-in-out shrink-0
        ${collapsed ? 'w-16' : 'w-60'}
      `}
    >
      {/* Header */}
      <div className="flex items-center h-14 px-3 border-b border-border gap-2">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-accent text-white font-bold text-sm shrink-0">
          AI
        </div>
        {!collapsed && (
          <span className="text-sm font-semibold text-text-primary truncate">
            AI Video Prompt Studio
          </span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col gap-1 p-2 overflow-y-auto">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            title={collapsed ? item.label : undefined}
            className={`
              flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors
              ${
                isActive(item.href)
                  ? 'bg-accent-subtle text-accent'
                  : 'text-text-secondary hover:bg-bg-tertiary hover:text-text-primary'
              }
              ${collapsed ? 'justify-center px-0' : ''}
            `}
          >
            <span className="text-base leading-none shrink-0">{item.icon}</span>
            {!collapsed && <span className="truncate">{item.label}</span>}
          </Link>
        ))}
      </nav>

      {/* Bottom section */}
      <div className="flex flex-col gap-1 p-2 border-t border-border">
        {/* Settings */}
        <Link
          href={settingsItem.href}
          title={collapsed ? settingsItem.label : undefined}
          className={`
            flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors
            ${
              isActive(settingsItem.href)
                ? 'bg-accent-subtle text-accent'
                : 'text-text-secondary hover:bg-bg-tertiary hover:text-text-primary'
            }
            ${collapsed ? 'justify-center px-0' : ''}
          `}
        >
          <span className="text-base leading-none shrink-0">{settingsItem.icon}</span>
          {!collapsed && <span className="truncate">{settingsItem.label}</span>}
        </Link>

        {/* Theme toggle and collapse button */}
        <div
          className={`flex items-center ${collapsed ? 'flex-col gap-1' : 'justify-between'} px-1`}
        >
          <ThemeToggle />
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-lg hover:bg-bg-tertiary transition-colors text-text-tertiary hover:text-text-secondary"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`transition-transform duration-200 ${collapsed ? 'rotate-180' : ''}`}
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
        </div>
      </div>
    </aside>
  );
}
