'use client';

import { useGeneratorStore } from '@/store/useGeneratorStore';
import { Button } from '@/components/ui/Button';
import { useCallback, useRef, useState } from 'react';

type ViewMode = 'list' | 'timeline';

export function CutList() {
  const { cuts, addCut, removeCut, updateCutText } = useGeneratorStore();
  const inputRefs = useRef<Map<string, HTMLTextAreaElement>>(new Map());
  const [viewMode, setViewMode] = useState<ViewMode>('list');

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, cutId: string, index: number) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        if (index === cuts.length - 1 && cuts.length < 20) {
          addCut();
          setTimeout(() => {
            const allRefs = Array.from(inputRefs.current.values());
            allRefs[allRefs.length - 1]?.focus();
          }, 50);
        }
      }
      if (e.key === 'Backspace' && cuts.length > 1) {
        const textarea = e.target as HTMLTextAreaElement;
        if (textarea.value === '') {
          e.preventDefault();
          removeCut(cutId);
        }
      }
    },
    [cuts.length, addCut, removeCut]
  );

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs uppercase tracking-wider text-text-secondary font-medium">
          컷 리스트
        </label>
        <div className="flex items-center gap-1 bg-bg-secondary border border-border rounded-lg p-0.5">
          <button
            type="button"
            onClick={() => setViewMode('list')}
            className={`p-1.5 rounded transition-colors ${
              viewMode === 'list'
                ? 'bg-bg-tertiary text-text-primary'
                : 'text-text-tertiary hover:text-text-secondary'
            }`}
            title="리스트 뷰"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('timeline')}
            className={`p-1.5 rounded transition-colors ${
              viewMode === 'timeline'
                ? 'bg-bg-tertiary text-text-primary'
                : 'text-text-tertiary hover:text-text-secondary'
            }`}
            title="타임라인 뷰"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="3" width="7" height="7" rx="1" />
              <rect x="3" y="14" width="7" height="7" rx="1" />
              <rect x="14" y="14" width="7" height="7" rx="1" />
            </svg>
          </button>
        </div>
      </div>

      {viewMode === 'list' ? (
        /* ─── List View ─── */
        <div className="space-y-2">
          {cuts.map((cut, index) => (
            <div key={cut.id} className="flex items-start gap-2 group">
              <span className="flex-shrink-0 w-8 h-10 flex items-center justify-center text-xs text-text-tertiary font-mono">
                {index + 1}
              </span>
              <textarea
                ref={(el) => {
                  if (el) inputRefs.current.set(cut.id, el);
                  else inputRefs.current.delete(cut.id);
                }}
                value={cut.text}
                onChange={(e) => updateCutText(cut.id, e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, cut.id, index)}
                placeholder="씬을 간단히 묘사하세요. 예: 여자가 비 오는 골목을 걷는다"
                rows={1}
                className="flex-1 bg-bg-secondary border border-border rounded-lg px-3 py-2.5 text-sm text-text-primary placeholder:text-text-tertiary focus:border-border-focus focus:outline-none resize-none transition-colors"
                style={{ minHeight: '40px' }}
              />
              {cuts.length > 1 && (
                <button
                  onClick={() => removeCut(cut.id)}
                  className="flex-shrink-0 w-8 h-10 flex items-center justify-center text-text-tertiary hover:text-error opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          ))}
        </div>
      ) : (
        /* ─── Timeline View ─── */
        <div className="relative">
          {/* Timeline track line */}
          <div className="absolute top-4 left-0 right-0 h-0.5 bg-border z-0" />

          <div className="flex gap-3 overflow-x-auto pb-3 no-scrollbar relative z-10">
            {cuts.map((cut, index) => (
              <div
                key={cut.id}
                className="flex-shrink-0 w-48 group"
              >
                {/* Timeline dot */}
                <div className="flex items-center justify-center mb-2">
                  <div className={`w-3 h-3 rounded-full border-2 transition-colors ${
                    cut.text.trim()
                      ? 'bg-accent border-accent'
                      : 'bg-bg-primary border-border'
                  }`} />
                </div>

                {/* Card */}
                <div className="bg-bg-secondary border border-border rounded-xl p-3 space-y-2 hover:border-accent-hover transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-semibold text-accent bg-accent-subtle px-1.5 py-0.5 rounded">
                      C{String(index + 1).padStart(2, '0')}
                    </span>
                    {cuts.length > 1 && (
                      <button
                        onClick={() => removeCut(cut.id)}
                        className="text-text-tertiary hover:text-error opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                  </div>
                  <textarea
                    ref={(el) => {
                      if (el) inputRefs.current.set(cut.id, el);
                      else inputRefs.current.delete(cut.id);
                    }}
                    value={cut.text}
                    onChange={(e) => updateCutText(cut.id, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, cut.id, index)}
                    placeholder="씬 묘사..."
                    rows={3}
                    className="w-full bg-bg-tertiary border-none rounded-lg px-2.5 py-2 text-xs text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-1 focus:ring-accent/50 resize-none transition-colors"
                    style={{ minHeight: '60px' }}
                  />
                </div>
              </div>
            ))}

            {/* Add cut card */}
            {cuts.length < 20 && (
              <div className="flex-shrink-0 w-48">
                <div className="flex items-center justify-center mb-2">
                  <div className="w-3 h-3 rounded-full border-2 border-dashed border-border" />
                </div>
                <button
                  type="button"
                  onClick={addCut}
                  className="w-full h-[104px] border-2 border-dashed border-border rounded-xl flex items-center justify-center text-text-tertiary hover:border-accent hover:text-accent transition-colors"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {viewMode === 'list' && cuts.length < 20 && (
        <Button variant="ghost" size="sm" onClick={addCut}>
          + 컷 추가
        </Button>
      )}
      <p className="text-xs text-text-tertiary">
        Enter로 다음 컷 추가 / 최대 20컷 / 현재 {cuts.length}컷
      </p>
    </div>
  );
}
