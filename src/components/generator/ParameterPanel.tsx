'use client';

import { useState, useEffect } from 'react';
import { useGeneratorStore } from '@/store/useGeneratorStore';
import { Select } from '@/components/ui/Select';
import { Input } from '@/components/ui/Input';
import type { ToolPreset, ToolParameter } from '@/types';

export function ParameterPanel() {
  const { toolId, globalParams, setGlobalParam } = useGeneratorStore();
  const [preset, setPreset] = useState<ToolPreset | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    import(`@/data/tool-presets/${toolId}.json`)
      .then((mod) => {
        setPreset(mod.default);
        // Set defaults
        const defaults: Record<string, string | number> = {};
        for (const p of mod.default.parameters) {
          defaults[p.key] = p.default;
        }
        useGeneratorStore.getState().setGlobalParams(defaults);
      })
      .catch(() => setPreset(null));
  }, [toolId]);

  if (!preset) return null;

  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 text-sm text-text-secondary hover:bg-bg-tertiary transition-colors"
      >
        <span className="font-medium">파라미터 설정</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="px-4 pb-4 grid grid-cols-2 sm:grid-cols-4 gap-3 border-t border-border pt-3">
          {preset.parameters.map((param: ToolParameter) => {
            if (param.type === 'select' && param.options) {
              return (
                <Select
                  key={param.key}
                  label={param.label}
                  options={param.options.map((o) => ({ value: o, label: o }))}
                  value={String(globalParams[param.key] ?? param.default)}
                  onChange={(e) => setGlobalParam(param.key, e.target.value)}
                />
              );
            }
            return (
              <Input
                key={param.key}
                label={param.label}
                type={param.type === 'number' ? 'number' : 'text'}
                value={String(globalParams[param.key] ?? param.default)}
                onChange={(e) => setGlobalParam(param.key, e.target.value)}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
