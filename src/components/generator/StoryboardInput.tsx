'use client';

import { useState } from 'react';
import { useGeneratorStore } from '@/store/useGeneratorStore';
import { Button } from '@/components/ui/Button';

const CUT_OPTIONS = [3, 4, 6, 9, 12];

export function StoryboardInput() {
  const { toolId, styleId, setCuts } = useGeneratorStore();
  const [brief, setBrief] = useState('');
  const [cutCount, setCutCount] = useState(6);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!brief.trim()) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/storyboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          brief: brief.trim(),
          cutCount,
          toolId,
          styleId: styleId || undefined,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed');
      }

      const data = await res.json();
      const newCuts = (data.cuts as string[]).map((text, i) => ({
        id: `sb-${Date.now()}-${i}`,
        text,
      }));
      setCuts(newCuts);
      setIsOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : '스토리보드 생성 실패');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="w-full flex items-center justify-center gap-2 py-3 px-4 border-2 border-dashed border-border rounded-xl text-sm text-text-secondary hover:border-accent hover:text-accent transition-colors"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 6h16M4 12h16M4 18h7" />
        </svg>
        한 줄로 시작하기 — AI가 자동으로 컷을 분해합니다
      </button>
    );
  }

  return (
    <div className="border border-accent/30 bg-accent-subtle rounded-xl p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-text-primary flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 6h16M4 12h16M4 18h7" />
          </svg>
          스토리보드 모드
        </h3>
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="text-text-tertiary hover:text-text-primary text-xs transition-colors"
        >
          닫기
        </button>
      </div>

      <p className="text-xs text-text-tertiary">
        영상의 한 줄 컨셉을 입력하면 AI가 촬영 가능한 컷 시퀀스로 분해합니다.
        분해된 컷은 아래 컷 리스트에 자동으로 채워집니다.
      </p>

      <textarea
        value={brief}
        onChange={(e) => setBrief(e.target.value)}
        placeholder="예: 비 오는 서울 골목에서 우연히 재회하는 남녀, 15초 릴스 / 화장품 세럼 신제품 광고 10초 / 판타지 용사가 드래곤과 마주하는 에픽 시퀀스"
        rows={2}
        className="w-full bg-bg-secondary border border-border rounded-lg px-3 py-2.5 text-sm text-text-primary placeholder:text-text-tertiary focus:border-border-focus focus:outline-none resize-none transition-colors"
      />

      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="text-xs text-text-secondary">컷 수:</span>
          <div className="flex gap-1">
            {CUT_OPTIONS.map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setCutCount(n)}
                className={`
                  px-2.5 py-1 text-xs rounded-md font-medium transition-colors
                  ${
                    cutCount === n
                      ? 'bg-accent text-bg-primary'
                      : 'bg-bg-secondary text-text-secondary hover:bg-bg-tertiary'
                  }
                `}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        <Button
          size="sm"
          onClick={handleGenerate}
          loading={loading}
          disabled={!brief.trim()}
          className="ml-auto"
        >
          {loading ? '분해 중...' : `${cutCount}컷으로 분해하기`}
        </Button>
      </div>

      {error && (
        <p className="text-xs text-error">{error}</p>
      )}
    </div>
  );
}
