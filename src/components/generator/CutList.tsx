'use client';

import { useGeneratorStore } from '@/store/useGeneratorStore';
import { Button } from '@/components/ui/Button';
import { useCallback, useRef } from 'react';

export function CutList() {
  const { cuts, addCut, removeCut, updateCutText } = useGeneratorStore();
  const inputRefs = useRef<Map<string, HTMLTextAreaElement>>(new Map());

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, cutId: string, index: number) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        if (index === cuts.length - 1 && cuts.length < 20) {
          addCut();
          // Focus new input after render
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
      <label className="text-xs uppercase tracking-wider text-text-secondary font-medium">
        컷 리스트
      </label>
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
      {cuts.length < 20 && (
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
