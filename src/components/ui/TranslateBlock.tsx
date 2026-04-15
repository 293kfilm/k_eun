'use client';

import { useState } from 'react';
import { Button } from './Button';

interface TranslateBlockProps {
  /** The English text to translate to Korean. */
  text: string;
  /** Tailwind classes applied to the outer wrapper. */
  className?: string;
  /** Button size. */
  size?: 'sm' | 'md';
  /** Label shown before translation exists. Default "🇰🇷 한글". */
  label?: string;
}

/**
 * Reusable translate-to-Korean toggle. Caches the translation on first click,
 * subsequent toggles are instant. Safe to place in any card/result block.
 */
export function TranslateBlock({
  text,
  className = '',
  size = 'sm',
  label = '🇰🇷 한글',
}: TranslateBlockProps) {
  const [show, setShow] = useState(false);
  const [korean, setKorean] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleToggle = async () => {
    if (show) {
      setShow(false);
      return;
    }
    if (!korean) {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('/api/translate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text }),
        });
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.error || '번역 실패');
        }
        const data = await res.json();
        setKorean(data.translation);
      } catch (e) {
        setError(e instanceof Error ? e.message : '번역 실패');
        return;
      } finally {
        setLoading(false);
      }
    }
    setShow(true);
  };

  if (!text?.trim()) return null;

  return (
    <div className={className}>
      <Button
        variant="ghost"
        size={size}
        onClick={handleToggle}
        loading={loading}
      >
        {show ? '한글 접기' : label}
      </Button>
      {error && !show && (
        <p className="text-xs text-error mt-1">{error}</p>
      )}
      {show && korean && (
        <div className="mt-2 p-3 bg-bg-tertiary rounded-lg text-sm text-text-secondary whitespace-pre-wrap border-l-2 border-accent/40">
          {korean}
        </div>
      )}
    </div>
  );
}
