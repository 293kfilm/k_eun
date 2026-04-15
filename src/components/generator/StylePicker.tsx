'use client';

import { useEffect, useMemo, useState } from 'react';
import { useGeneratorStore } from '@/store/useGeneratorStore';
import {
  STYLE_PRESETS,
  type StyleCategory,
  type StylePreset,
} from '@/data/stylePresets';
import type { Style } from '@/types';

const PRESET_PREFIX = 'preset:';

const CATEGORY_ORDER: StyleCategory[] = [
  '장르',
  '감독',
  '시대',
  'K-스타일',
  '포맷',
];

type TabId = StyleCategory | 'mine';

const TABS: { id: TabId; label: string }[] = [
  ...CATEGORY_ORDER.map((c) => ({ id: c as TabId, label: c })),
  { id: 'mine', label: '내 스타일' },
];

export function StylePicker() {
  const { styleId, setStyleId } = useGeneratorStore();
  const [activeTab, setActiveTab] = useState<TabId>('장르');
  const [myStyles, setMyStyles] = useState<Style[]>([]);

  useEffect(() => {
    fetch('/api/styles')
      .then((r) => r.json())
      .then((data) => Array.isArray(data) && setMyStyles(data))
      .catch(() => {});
  }, []);

  const presetsByCategory = useMemo(() => {
    const out = {} as Record<StyleCategory, StylePreset[]>;
    for (const p of STYLE_PRESETS) {
      if (!out[p.category]) out[p.category] = [];
      out[p.category].push(p);
    }
    return out;
  }, []);

  const isPreset = styleId.startsWith(PRESET_PREFIX);
  const selectedPresetId = isPreset ? styleId.slice(PRESET_PREFIX.length) : null;
  const selectedPreset = selectedPresetId
    ? STYLE_PRESETS.find((p) => p.id === selectedPresetId)
    : null;
  const selectedMy = !isPreset && styleId
    ? myStyles.find((s) => s.id === styleId)
    : null;

  const togglePreset = (id: string) => {
    const fullId = `${PRESET_PREFIX}${id}`;
    setStyleId(styleId === fullId ? '' : fullId);
  };

  const toggleMyStyle = (id: string) => {
    setStyleId(styleId === id ? '' : id);
  };

  const renderPresetCard = (p: StylePreset) => {
    const fullId = `${PRESET_PREFIX}${p.id}`;
    const selected = styleId === fullId;
    return (
      <button
        key={p.id}
        type="button"
        onClick={() => togglePreset(p.id)}
        className={`
          group relative text-left rounded-xl border p-3 transition-all
          ${
            selected
              ? 'border-accent bg-accent-subtle ring-1 ring-accent'
              : 'border-border bg-bg-secondary hover:border-accent-hover hover:bg-bg-tertiary'
          }
        `}
      >
        <div className="flex items-start gap-2">
          <span className="text-xl leading-none mt-0.5" aria-hidden>
            {p.emoji}
          </span>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold text-text-primary truncate">
              {p.name}
            </div>
            <p className="text-xs text-text-tertiary mt-0.5 line-clamp-2">
              {p.description}
            </p>
            <div className="flex flex-wrap gap-1 mt-2">
              {p.keywords.slice(0, 3).map((k) => (
                <span
                  key={k}
                  className="text-[10px] px-1.5 py-0.5 rounded bg-bg-tertiary text-text-secondary"
                >
                  {k}
                </span>
              ))}
            </div>
          </div>
        </div>
        {selected && (
          <span className="absolute top-2 right-2 text-[10px] uppercase tracking-wider bg-accent text-bg-primary px-1.5 py-0.5 rounded font-semibold">
            ✓
          </span>
        )}
      </button>
    );
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h3 className="text-sm font-semibold text-text-primary">스타일 프리셋</h3>
          <p className="text-xs text-text-tertiary mt-0.5">
            한 번 클릭으로 시네마틱 톤을 자동 적용합니다. 다시 클릭하면 해제됩니다.
          </p>
        </div>
        {(selectedPreset || selectedMy) && (
          <div className="flex items-center gap-2 text-xs">
            <span className="text-text-secondary">선택:</span>
            <span className="px-2 py-1 rounded bg-accent-subtle text-accent font-medium">
              {selectedPreset
                ? `${selectedPreset.emoji} ${selectedPreset.name}`
                : selectedMy?.name}
            </span>
            <button
              type="button"
              onClick={() => setStyleId('')}
              className="text-text-tertiary hover:text-error transition-colors"
            >
              해제
            </button>
          </div>
        )}
      </div>

      <div className="flex border-b border-border overflow-x-auto no-scrollbar">
        {TABS.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`
                px-3 py-2 text-xs font-medium transition-colors cursor-pointer
                border-b-2 -mb-px whitespace-nowrap
                ${
                  isActive
                    ? 'border-accent text-text-primary'
                    : 'border-transparent text-text-secondary hover:text-text-primary'
                }
              `}
            >
              {tab.label}
              {tab.id !== 'mine' && (
                <span className="ml-1 text-text-tertiary">
                  {presetsByCategory[tab.id as StyleCategory]?.length ?? 0}
                </span>
              )}
              {tab.id === 'mine' && myStyles.length > 0 && (
                <span className="ml-1 text-text-tertiary">{myStyles.length}</span>
              )}
            </button>
          );
        })}
      </div>

      {activeTab !== 'mine' ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {(presetsByCategory[activeTab] ?? []).map(renderPresetCard)}
        </div>
      ) : myStyles.length === 0 ? (
        <div className="text-xs text-text-tertiary py-6 text-center bg-bg-secondary border border-dashed border-border rounded-lg">
          학습된 내 스타일이 없어요. 설정 → 스타일 학습에서 영상 한 편으로 나만의 톤을 만들 수 있어요.
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {myStyles.map((s) => {
            const selected = styleId === s.id;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => toggleMyStyle(s.id)}
                className={`
                  text-left rounded-xl border p-3 transition-all
                  ${
                    selected
                      ? 'border-accent bg-accent-subtle ring-1 ring-accent'
                      : 'border-border bg-bg-secondary hover:border-accent-hover hover:bg-bg-tertiary'
                  }
                `}
              >
                <div className="text-sm font-semibold text-text-primary truncate">
                  {s.name}
                </div>
                <p className="text-xs text-text-tertiary mt-1 line-clamp-2">
                  {s.description || '내가 학습시킨 스타일'}
                </p>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
