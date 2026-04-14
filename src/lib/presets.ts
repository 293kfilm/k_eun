import type { ToolPreset } from '@/types';
import klingPreset from '@/data/tool-presets/kling.json';
import seedancePreset from '@/data/tool-presets/seedance.json';

const presets: Record<string, ToolPreset> = {
  kling: klingPreset as ToolPreset,
  seedance: seedancePreset as ToolPreset,
};

export function getToolPreset(toolId: string): ToolPreset | undefined {
  return presets[toolId];
}

export function getAllToolPresets(): ToolPreset[] {
  return Object.values(presets);
}

export function getToolIds(): string[] {
  return Object.keys(presets);
}
