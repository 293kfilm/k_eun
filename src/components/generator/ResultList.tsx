'use client';

import { useGeneratorStore } from '@/store/useGeneratorStore';
import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';
import { useState } from 'react';

function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text);
}

export function ResultList() {
  const { results, isGenerating, cuts, toolId, styleId } = useGeneratorStore();
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);

  const handleCopy = (text: string, index: number) => {
    copyToClipboard(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleCopyAll = () => {
    const allText = results
      .map((r) => {
        let text = `[Cut ${r.cutNumber}]\n${r.prompt}`;
        if (r.negativePrompt) text += `\n\nNegative: ${r.negativePrompt}`;
        return text;
      })
      .join('\n\n---\n\n');
    copyToClipboard(allText);
    setCopiedIndex(-1);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleSaveToProject = async () => {
    const name = prompt('프로젝트 이름을 입력하세요:');
    if (!name) return;
    setSaving(true);
    try {
      const projectCuts = results.map((r, i) => ({
        order_index: i,
        input_text: cuts[i]?.text || '',
        generated_prompt: r.prompt,
        negative_prompt: r.negativePrompt || '',
      }));
      await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          defaultToolId: toolId,
          defaultStyleId: styleId || undefined,
          cuts: projectCuts,
        }),
      });
      alert('프로젝트에 저장되었습니다!');
    } catch {
      alert('저장 실패');
    } finally {
      setSaving(false);
    }
  };

  if (isGenerating) {
    return (
      <div className="space-y-3 mt-6">
        <h3 className="text-sm font-medium text-text-secondary">생성 중...</h3>
        {cuts.map((_, i) => (
          <div key={i} className="border border-border rounded-xl p-4 space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-16 w-full" />
          </div>
        ))}
      </div>
    );
  }

  if (!results.length) return null;

  return (
    <div className="space-y-3 mt-6">
      <h3 className="text-sm font-medium text-text-secondary">생성 결과</h3>
      {results.map((result, i) => (
        <div key={i} className="border border-border rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono bg-accent-subtle text-accent px-2 py-0.5 rounded">
                Cut {result.cutNumber}
              </span>
              {cuts[i] && (
                <span className="text-xs text-text-tertiary truncate max-w-[300px]">
                  {cuts[i].text}
                </span>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleCopy(result.prompt, i)}
            >
              {copiedIndex === i ? 'Copied!' : 'Copy'}
            </Button>
          </div>
          <textarea
            defaultValue={result.prompt}
            className="w-full bg-bg-secondary border border-border rounded-lg px-3 py-2.5 text-sm text-text-primary font-mono focus:border-border-focus focus:outline-none resize-y min-h-[80px] transition-colors"
            style={{ fontFamily: 'var(--font-mono), monospace' }}
            rows={3}
          />
          {result.negativePrompt && (
            <div>
              <label className="text-xs text-text-tertiary mb-1 block">Negative Prompt</label>
              <textarea
                defaultValue={result.negativePrompt}
                className="w-full bg-bg-secondary border border-border rounded-lg px-3 py-2 text-xs text-text-secondary font-mono focus:border-border-focus focus:outline-none resize-y transition-colors"
                rows={2}
              />
            </div>
          )}
        </div>
      ))}
      <div className="flex gap-2">
        <Button variant="secondary" size="sm" onClick={handleCopyAll}>
          {copiedIndex === -1 ? 'Copied!' : 'Copy All'}
        </Button>
        <Button variant="secondary" size="sm" onClick={handleSaveToProject} loading={saving}>
          Save to Project
        </Button>
      </div>
    </div>
  );
}
