'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface ProjectItem {
  id: string;
  name: string;
  description?: string;
  default_tool_id?: string;
  cut_count: number;
  updated_at: string;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<ProjectItem[]>([]);

  useEffect(() => {
    fetch('/api/projects')
      .then((r) => r.json())
      .then(setProjects)
      .catch(() => {});
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('이 프로젝트를 삭제하시겠습니까?')) return;
    await fetch(`/api/projects/${id}`, { method: 'DELETE' });
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  const handleCreate = async () => {
    const name = prompt('프로젝트 이름:');
    if (!name) return;
    const res = await fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });
    const data = await res.json();
    setProjects((prev) => [{ ...data, cut_count: 0, updated_at: new Date().toISOString() }, ...prev]);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Projects</h1>
          <p className="text-sm text-text-secondary mt-1">프롬프트를 프로젝트별로 관리합니다</p>
        </div>
        <Button onClick={handleCreate}>+ 새 프로젝트</Button>
      </div>

      {projects.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-text-tertiary">프로젝트가 없습니다</p>
          <p className="text-xs text-text-tertiary mt-1">생성기에서 결과를 저장하면 프로젝트가 만들어집니다</p>
        </Card>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {projects.map((project) => (
            <Card key={project.id} hover className="p-4">
              <Link href={`/projects/${project.id}`} className="block">
                <h3 className="font-semibold">{project.name}</h3>
                {project.description && (
                  <p className="text-sm text-text-secondary mt-1 line-clamp-2">{project.description}</p>
                )}
                <div className="flex items-center gap-3 mt-2 text-xs text-text-tertiary">
                  {project.default_tool_id && (
                    <span className="bg-accent-subtle text-accent px-2 py-0.5 rounded">{project.default_tool_id}</span>
                  )}
                  <span>{project.cut_count} cuts</span>
                  <span>{new Date(project.updated_at).toLocaleDateString()}</span>
                </div>
              </Link>
              <div className="flex justify-end mt-2">
                <Button variant="ghost" size="sm" onClick={() => handleDelete(project.id)}>
                  삭제
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
