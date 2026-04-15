import fs from 'node:fs';
import path from 'node:path';

const KNOWLEDGE_DIR = path.join(process.cwd(), 'src/data/tool-knowledge');
const SHARED_FILENAME = '_shared.md';
const TRENDING_FILENAME = '_trending.md';

function readGuide(filename: string): string | null {
  try {
    const filePath = path.join(KNOWLEDGE_DIR, filename);
    if (!fs.existsSync(filePath)) return null;
    return fs.readFileSync(filePath, 'utf-8');
  } catch {
    return null;
  }
}

/**
 * Returns the bundled markdown knowledge guide for a tool, with the shared
 * preproduction guide and the current trending-prompt patterns appended when
 * present. Server-only — never imported by client components, so the multi-KB
 * markdown payloads stay out of the JS bundle.
 *
 * Per-tool files live at `src/data/tool-knowledge/{toolId}.md`. The shared
 * guide at `_shared.md` covers cross-cutting preproduction templates
 * (character sheets, 9-cut storyboards, etc.) and `_trending.md` covers
 * currently viral Reels/TikTok/Shorts patterns. Both are appended to every
 * tool so the AI can apply them whenever the user's brief calls for them.
 */
export function getBuiltinKnowledge(toolId: string): string | null {
  if (!toolId || /[^a-z0-9_-]/i.test(toolId)) return null;

  const toolGuide = readGuide(`${toolId}.md`);
  const sharedGuide = readGuide(SHARED_FILENAME);
  const trendingGuide = readGuide(TRENDING_FILENAME);

  if (!toolGuide && !sharedGuide && !trendingGuide) return null;

  const sections: string[] = [];
  if (toolGuide) {
    sections.push(`# ${toolId} — Tool-specific guide\n\n${toolGuide}`);
  }
  if (sharedGuide) {
    sections.push(
      `# Shared preproduction & template prompts (apply when relevant)\n\n${sharedGuide}`,
    );
  }
  if (trendingGuide) {
    sections.push(
      `# Trending viral prompt patterns — 2026 (apply when the brief calls for SNS/short-form/viral content)\n\n${trendingGuide}`,
    );
  }
  return sections.join('\n\n---\n\n');
}

export interface BuiltinKnowledgeBreakdown {
  toolGuide: { available: boolean; length: number; content: string | null };
  shared: { available: boolean; length: number };
  trending: { available: boolean; length: number };
  totalLength: number;
}

/**
 * Returns a structured breakdown of which built-in guides are loaded for a
 * given tool. Used by the Tool Knowledge UI to show users that the system
 * already ships with curated knowledge even when they haven't uploaded any
 * documents themselves. Includes the full tool-specific markdown content so
 * the UI can render a preview on demand.
 */
export function getBuiltinKnowledgeBreakdown(
  toolId: string,
): BuiltinKnowledgeBreakdown {
  const toolGuide = /[^a-z0-9_-]/i.test(toolId) ? null : readGuide(`${toolId}.md`);
  const shared = readGuide(SHARED_FILENAME);
  const trending = readGuide(TRENDING_FILENAME);

  return {
    toolGuide: {
      available: !!toolGuide,
      length: toolGuide?.length ?? 0,
      content: toolGuide,
    },
    shared: { available: !!shared, length: shared?.length ?? 0 },
    trending: { available: !!trending, length: trending?.length ?? 0 },
    totalLength:
      (toolGuide?.length ?? 0) + (shared?.length ?? 0) + (trending?.length ?? 0),
  };
}
