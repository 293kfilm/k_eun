'use client';

import { useState, useEffect } from 'react';
import { use } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import Link from 'next/link';

interface CutData {
  id: string;
  order_index: number;
  input_text: string;
  generated_prompt?: string;
  negative_prompt?: string;
}

interface ProjectData {
  id: string;
  name: string;
  description?: string;
  default_tool_id?: string;
  cuts: CutData[];
}

export default function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [project, setProject] = useState<ProjectData | null>(null);

  useEffect(() => {
    fetch(`/api/projects/${id}`)
      .then((r) => r.json())
      .then(setProject)
      .catch(() => {});
  }, [id]);

  const handleExport = (format: 'txt' | 'csv') => {
    if (!project) return;
    let content: string;

    if (format === 'txt') {
      content = project.cuts
        .map((c) => {
          let text = `[Cut ${c.order_index + 1}] ${c.input_text}\n${c.generated_prompt || ''}`;
          if (c.negative_prompt) text += `\nNegative: ${c.negative_prompt}`;
          return text;
        })
        .join('\n\n---\n\n');
    } else {
      const header = 'Cut,Input,Prompt,Negative Prompt';
      const rows = project.cuts.map(
        (c) =>
          `${c.order_index + 1},"${(c.input_text || '').replace(/"/g, '""')}","${(c.generated_prompt || '').replace(/"/g, '""')}","${(c.negative_prompt || '').replace(/"/g, '""')}"`
      );
      content = [header, ...rows].join('\n');
    }

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${project.name}.${format}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!project) {
    return <div className="text-text-tertiary">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Link href="/projects" className="text-xs text-text-tertiary hover:text-text-secondary transition-colors">
            &larr; Projects
          </Link>
          <h1 className="text-2xl font-bold mt-1">{project.name}</h1>
          {project.description && <p className="text-sm text-text-secondary mt-1">{project.description}</p>}
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" onClick={() => handleExport('txt')}>
            Export TXT
          </Button>
          <Button variant="secondary" size="sm" onClick={() => handleExport('csv')}>
            Export CSV
          </Button>
        </div>
      </div>

      {project.cuts.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-text-tertiary">컷이 없습니다</p>
        </Card>
      ) : (
        <div className="space-y-3">
          {project.cuts.map((cut) => (
            <Card key={cut.id} className="p-4 space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono bg-accent-subtle text-accent px-2 py-0.5 rounded">
                  Cut {cut.order_index + 1}
                </span>
                <span className="text-xs text-text-tertiary">{cut.input_text}</span>
              </div>
              {cut.generated_prompt && (
                <div
                  className="bg-bg-tertiary rounded-lg p-3 text-sm font-mono text-text-primary whitespace-pre-wrap"
                  style={{ fontFamily: 'var(--font-mono), monospace' }}
                >
                  {cut.generated_prompt}
                </div>
              )}
              {cut.negative_prompt && (
                <div className="text-xs text-text-tertiary">
                  <span className="font-medium">Negative:</span> {cut.negative_prompt}
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
