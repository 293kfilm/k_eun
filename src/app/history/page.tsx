'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import type { HistoryEntry } from '@/types';

export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/history')
      .then((r) => r.json())
      .then(setHistory)
      .catch(() => {});
  }, []);

  // Group by date
  const grouped = history.reduce<Record<string, HistoryEntry[]>>((acc, entry) => {
    const date = new Date(entry.created_at).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    if (!acc[date]) acc[date] = [];
    acc[date].push(entry);
    return acc;
  }, {});

  const handleCopyAll = (entry: HistoryEntry) => {
    const text = entry.output_results
      .map((r) => `[Cut ${r.cutNumber}]\n${r.prompt}${r.negativePrompt ? `\nNegative: ${r.negativePrompt}` : ''}`)
      .join('\n\n---\n\n');
    navigator.clipboard.writeText(text);
  };

  const handleSaveToProject = async (entry: HistoryEntry) => {
    const name = prompt('프로젝트 이름:');
    if (!name) return;

    const cuts = entry.output_results.map((r, i) => ({
      order_index: i,
      input_text: entry.input_cuts[i]?.text || '',
      generated_prompt: r.prompt,
      negative_prompt: r.negativePrompt || '',
    }));

    await fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, defaultToolId: entry.tool_id, cuts }),
    });
    alert('프로젝트에 저장되었습니다!');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">History</h1>
        <p className="text-sm text-text-secondary mt-1">프롬프트 생성 기록을 확인합니다</p>
      </div>

      {history.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-text-tertiary">아직 생성 기록이 없습니다</p>
        </Card>
      ) : (
        Object.entries(grouped).map(([date, entries]) => (
          <div key={date}>
            <h2 className="text-sm font-medium text-text-secondary mb-2">{date}</h2>
            <div className="space-y-2">
              {entries.map((entry) => (
                <Card key={entry.id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-xs bg-accent-subtle text-accent px-2 py-0.5 rounded">
                        {entry.tool_id}
                      </span>
                      <span className="text-sm text-text-primary">
                        {entry.input_cuts.length} cuts
                      </span>
                      <span className="text-xs text-text-tertiary">
                        {new Date(entry.created_at).toLocaleTimeString('ko-KR', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" onClick={() => handleCopyAll(entry)}>
                        복사
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleSaveToProject(entry)}>
                        프로젝트 저장
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setExpandedId(expandedId === entry.id ? null : entry.id)}
                      >
                        {expandedId === entry.id ? '접기' : '보기'}
                      </Button>
                    </div>
                  </div>

                  {/* Preview */}
                  <div className="mt-2 text-xs text-text-tertiary truncate">
                    {entry.input_cuts.map((c) => c.text).join(' / ')}
                  </div>

                  {expandedId === entry.id && (
                    <div className="mt-3 space-y-2 border-t border-border pt-3">
                      {entry.output_results.map((result, i) => (
                        <div key={i} className="bg-bg-tertiary rounded-lg p-3">
                          <div className="text-xs text-text-tertiary mb-1">
                            Cut {result.cutNumber}: {entry.input_cuts[i]?.text || ''}
                          </div>
                          <div
                            className="text-sm font-mono text-text-primary"
                            style={{ fontFamily: 'var(--font-mono), monospace' }}
                          >
                            {result.prompt}
                          </div>
                          {result.negativePrompt && (
                            <div className="text-xs text-text-tertiary mt-1">
                              Negative: {result.negativePrompt}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
