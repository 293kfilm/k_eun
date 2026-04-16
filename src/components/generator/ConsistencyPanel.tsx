'use client';

import { useState } from 'react';
import { useGeneratorStore } from '@/store/useGeneratorStore';

export function ConsistencyPanel() {
  const { consistency, setConsistency } = useGeneratorStore();
  const [isOpen, setIsOpen] = useState(false);

  const hasContent =
    consistency.characterSheet.trim() || consistency.sceneAnchor.trim();

  if (!isOpen) {
    return (
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={`
          w-full flex items-center justify-center gap-2 py-2.5 px-4 border rounded-xl text-sm transition-colors
          ${
            hasContent
              ? 'border-success/40 bg-success/5 text-success hover:bg-success/10'
              : 'border-dashed border-border text-text-secondary hover:border-accent hover:text-accent'
          }
        `}
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
        {hasContent ? '✓ 캐릭터/배경 일관성 락 설정됨' : '캐릭터/배경 일관성 락 — 모든 컷에 자동 적용'}
      </button>
    );
  }

  return (
    <div className="border border-border rounded-xl p-4 space-y-3 bg-bg-secondary">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-text-primary flex items-center gap-2">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
          캐릭터/배경 일관성 락
        </h3>
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="text-text-tertiary hover:text-text-primary text-xs transition-colors"
        >
          접기
        </button>
      </div>

      <p className="text-xs text-text-tertiary">
        여기에 정의한 캐릭터·배경 정보가 모든 컷 프롬프트에 자동 주입됩니다.
        영상 전체에서 인물 외형·의상·장소가 일관되게 유지됩니다.
      </p>

      <div>
        <label className="block text-xs uppercase tracking-wider text-text-secondary font-medium mb-1.5">
          캐릭터 시트
        </label>
        <textarea
          value={consistency.characterSheet}
          onChange={(e) => setConsistency({ characterSheet: e.target.value })}
          placeholder="예: 30대 초반 여성, 어깨 길이 웨이브 갈색 머리, 베이지 트렌치코트, 흰색 터틀넥, 브라운 앵클부츠. 피부 톤은 따뜻한 아이보리. 왼쪽 볼에 작은 점."
          rows={3}
          className="w-full bg-bg-tertiary border border-border rounded-lg px-3 py-2.5 text-sm text-text-primary placeholder:text-text-tertiary focus:border-border-focus focus:outline-none resize-y transition-colors"
        />
      </div>

      <div>
        <label className="block text-xs uppercase tracking-wider text-text-secondary font-medium mb-1.5">
          배경/씬 앵커
        </label>
        <textarea
          value={consistency.sceneAnchor}
          onChange={(e) => setConsistency({ sceneAnchor: e.target.value })}
          placeholder="예: 비 내리는 서울 이태원 뒷골목, 밤 11시. 네온 간판(파란색+분홍색) 반사되는 젖은 아스팔트. 좁은 골목, 양쪽에 오래된 2층 건물. 멀리 보이는 남산타워 불빛."
          rows={3}
          className="w-full bg-bg-tertiary border border-border rounded-lg px-3 py-2.5 text-sm text-text-primary placeholder:text-text-tertiary focus:border-border-focus focus:outline-none resize-y transition-colors"
        />
      </div>

      {hasContent && (
        <button
          type="button"
          onClick={() =>
            setConsistency({ characterSheet: '', sceneAnchor: '' })
          }
          className="text-xs text-text-tertiary hover:text-error transition-colors"
        >
          초기화
        </button>
      )}
    </div>
  );
}
