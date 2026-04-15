'use client';

import { useGeneratorStore } from '@/store/useGeneratorStore';
import { Select } from '@/components/ui/Select';
import { useEffect, useState } from 'react';
import type { Style } from '@/types';
import { getToolOptions } from '@/lib/presets';

const TOOLS = getToolOptions();

export function ToolSelector() {
  const { toolId, setToolId, styleId, setStyleId } = useGeneratorStore();
  const [styles, setStyles] = useState<Style[]>([]);

  useEffect(() => {
    fetch('/api/styles')
      .then((r) => r.json())
      .then(setStyles)
      .catch(() => {});
  }, []);

  const styleOptions = [
    { value: '', label: '스타일 없음' },
    ...styles.map((s) => ({ value: s.id, label: s.name })),
  ];

  return (
    <div className="flex gap-3 items-end">
      <div className="flex-1">
        <Select
          label="AI 툴"
          options={TOOLS}
          value={toolId}
          onChange={(e) => setToolId(e.target.value)}
        />
      </div>
      <div className="flex-1">
        <Select
          label="스타일"
          options={styleOptions}
          value={styleId}
          onChange={(e) => setStyleId(e.target.value)}
        />
      </div>
    </div>
  );
}
