import type { ToolPreset } from '@/types';
import klingPreset from '@/data/tool-presets/kling.json';
import seedancePreset from '@/data/tool-presets/seedance.json';
import higgsfieldPreset from '@/data/tool-presets/higgsfield.json';
import veo3Preset from '@/data/tool-presets/veo3.json';
import sora2Preset from '@/data/tool-presets/sora2.json';
import runwayPreset from '@/data/tool-presets/runway.json';
import hailuoPreset from '@/data/tool-presets/hailuo.json';
import pikaPreset from '@/data/tool-presets/pika.json';
import lumaPreset from '@/data/tool-presets/luma.json';

const presets: Record<string, ToolPreset> = {
  kling: klingPreset as ToolPreset,
  seedance: seedancePreset as ToolPreset,
  higgsfield: higgsfieldPreset as ToolPreset,
  veo3: veo3Preset as ToolPreset,
  sora2: sora2Preset as ToolPreset,
  runway: runwayPreset as ToolPreset,
  hailuo: hailuoPreset as ToolPreset,
  pika: pikaPreset as ToolPreset,
  luma: lumaPreset as ToolPreset,
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

/** For UI dropdowns: [{ value: id, label: name }] */
export function getToolOptions(): Array<{ value: string; label: string }> {
  return getAllToolPresets().map((p) => ({ value: p.id, label: p.name }));
}
