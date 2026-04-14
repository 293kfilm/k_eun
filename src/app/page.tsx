'use client';

import { useGeneratorStore } from '@/store/useGeneratorStore';
import { ToolSelector } from '@/components/generator/ToolSelector';
import { ParameterPanel } from '@/components/generator/ParameterPanel';
import { CutList } from '@/components/generator/CutList';
import { ResultList } from '@/components/generator/ResultList';
import { Button } from '@/components/ui/Button';
import { useCallback, useEffect } from 'react';

export default function GeneratorPage() {
  const { cuts, toolId, styleId, globalParams, isGenerating, setIsGenerating, setResults } =
    useGeneratorStore();

  const handleGenerate = useCallback(async () => {
    const validCuts = cuts.filter((c) => c.text.trim());
    if (!validCuts.length) return;

    setIsGenerating(true);
    setResults([]);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cuts: validCuts.map((c, i) => ({ index: i + 1, text: c.text })),
          toolId,
          styleId: styleId || undefined,
          globalParams,
        }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || 'Generation failed');
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error('No stream');

      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          try {
            const data = JSON.parse(line.slice(6));
            if (data.type === 'done' && data.results) {
              setResults(data.results);
            } else if (data.type === 'error') {
              throw new Error(data.error);
            }
          } catch (e) {
            if (e instanceof Error && e.message !== 'Unexpected end of JSON input') {
              console.error('Parse error:', e);
            }
          }
        }
      }
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Generation failed');
    } finally {
      setIsGenerating(false);
    }
  }, [cuts, toolId, styleId, globalParams, setIsGenerating, setResults]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        e.preventDefault();
        handleGenerate();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [handleGenerate]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Prompt Generator</h1>
        <p className="text-sm text-text-secondary mt-1">
          씬을 간단히 묘사하면 AI 영상 툴에 최적화된 프롬프트를 자동 생성합니다
        </p>
      </div>

      <ToolSelector />
      <ParameterPanel />
      <CutList />

      <Button
        size="lg"
        className="w-full"
        onClick={handleGenerate}
        loading={isGenerating}
        disabled={!cuts.some((c) => c.text.trim())}
      >
        {isGenerating ? '생성 중...' : 'Prompt Generate (Cmd+Enter)'}
      </Button>

      <ResultList />
    </div>
  );
}
