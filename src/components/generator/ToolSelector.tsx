'use client';

import { useGeneratorStore } from '@/store/useGeneratorStore';
import { Select } from '@/components/ui/Select';
import { getToolOptions } from '@/lib/presets';

const TOOLS = getToolOptions();

export function ToolSelector() {
  const { toolId, setToolId } = useGeneratorStore();

  return (
    <Select
      label="AI 툴"
      options={TOOLS}
      value={toolId}
      onChange={(e) => setToolId(e.target.value)}
    />
  );
}
