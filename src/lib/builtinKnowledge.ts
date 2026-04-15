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
