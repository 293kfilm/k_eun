'use client';

import { useEffect, useState } from 'react';
import { useGeneratorStore } from '@/store/useGeneratorStore';
import { Select } from '@/components/ui/Select';
import { getToolOptions } from '@/lib/presets';
import type { ToolParameter } from '@/types';

const TOOLS = getToolOptions();

export function ToolSelector() {
  const { toolId, setToolId, globalParams, setGlobalParam } = useGeneratorStore();
  const [modeParam, setModeParam] = useState<ToolParameter | null>(null);

  useEffect(() => {
    import(`@/data/tool-presets/${toolId}.json`)
      .then((mod) => {
        const genMode = mod.default.parameters.find(
          (p: ToolParameter) => p.key === 'generation_mode'
        );
        setModeParam(genMode ?? null);
      })
      .catch(() => setModeParam(null));
  }, [toolId]);

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
      {modeParam && modeParam.options && (
        <div className="flex-1">
          <Select
            label="생성 모드"
            options={modeParam.options.map((o) => ({
              value: o,
              label:
                o === 'text-to-video' ? '📝 텍스트 → 영상' :
                o === 'image-to-video' ? '🖼️ 이미지 → 영상' :
                o === 'omni' ? '🔮 Omni (멀티모달)' :
                o === 'multi' ? '🎬 Multi (멀티샷)' :
                o,
            }))}
            value={String(globalParams.generation_mode ?? modeParam.default)}
            onChange={(e) => setGlobalParam('generation_mode', e.target.value)}
          />
        </div>
      )}
    </div>
  );
}
