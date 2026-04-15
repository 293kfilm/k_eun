'use client';

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Modal } from '@/components/ui/Modal';
import { Tabs } from '@/components/ui/Tabs';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import type { KnowledgeDocument, ToolKnowledge } from '@/types';
import { getAllToolPresets } from '@/lib/presets';

const TOOLS = getAllToolPresets().map((p) => ({ id: p.id, name: p.name }));

interface BuiltinBreakdown {
  toolGuide: { available: boolean; length: number; content: string | null };
  shared: { available: boolean; length: number };
  trending: { available: boolean; length: number };
  totalLength: number;
}

interface ToolData {
  documents: KnowledgeDocument[];
  knowledge: ToolKnowledge | null;
  builtin?: BuiltinBreakdown;
}

const formatKB = (bytes: number) =>
  bytes >= 1024 ? `${(bytes / 1024).toFixed(1)} KB` : `${bytes} B`;

export default function ToolKnowledgePage() {
  const [toolData, setToolData] = useState<Record<string, ToolData>>({});
  const [showModal, setShowModal] = useState(false);
  const [selectedTool, setSelectedTool] = useState('kling');
  const [activeTab, setActiveTab] = useState('text');
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [textContent, setTextContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [previewToolId, setPreviewToolId] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    for (const tool of TOOLS) {
      try {
        const res = await fetch(`/api/knowledge/${tool.id}`);
        const data = await res.json();
        setToolData((prev) => ({
          ...prev,
          [tool.id]: {
            documents: data.documents || [],
            knowledge: data.knowledge || null,
            builtin: data.builtin,
          },
        }));
      } catch { /* ignore */ }
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleLearn = async () => {
    setLoading(true);
    setError('');
    try {
      const body: Record<string, string> = {
        toolId: selectedTool,
        title: title || 'Untitled Document',
        sourceType: activeTab,
      };
      if (activeTab === 'url') body.sourceUrl = url;
      if (activeTab === 'text' || activeTab === 'file') body.content = textContent;

      const res = await fetch('/api/knowledge/learn', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error);
      }

      setShowModal(false);
      setTitle('');
      setUrl('');
      setTextContent('');
      fetchData();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (toolId: string, documentId: string) => {
    if (!confirm('이 문서를 삭제하시겠습니까?')) return;
    await fetch(`/api/knowledge/${toolId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ documentId }),
    });
    fetchData();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Tool Knowledge Base</h1>
        <p className="text-sm text-text-secondary mt-1">
          모든 툴은 <span className="text-accent">내장된 공식 프롬프트 가이드 + 공통 사전제작 템플릿 + 2026 트렌딩 패턴</span>을
          기본으로 사용합니다. 추가로 자체 문서를 업로드해 가이드를 보강할 수 있습니다.
        </p>
      </div>

      {TOOLS.map((tool) => {
        const data = toolData[tool.id];
        const docCount = data?.documents?.length || 0;
        const builtin = data?.builtin;
        const isPreviewing = previewToolId === tool.id;

        return (
          <Card key={tool.id} className="p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <h2 className="text-lg font-semibold">{tool.name}</h2>
                <div className="flex items-center flex-wrap gap-1.5 mt-2">
                  {builtin?.toolGuide.available && (
                    <span className="text-[10px] uppercase tracking-wider bg-success/15 text-success px-1.5 py-0.5 rounded font-medium">
                      ✓ 공식 가이드 ({formatKB(builtin.toolGuide.length)})
                    </span>
                  )}
                  {builtin?.shared.available && (
                    <span className="text-[10px] uppercase tracking-wider bg-accent-subtle text-accent px-1.5 py-0.5 rounded">
                      ✓ 공통 템플릿
                    </span>
                  )}
                  {builtin?.trending.available && (
                    <span className="text-[10px] uppercase tracking-wider bg-accent-subtle text-accent px-1.5 py-0.5 rounded">
                      ✓ 트렌딩 패턴
                    </span>
                  )}
                  <span className="text-xs text-text-tertiary ml-1">
                    내 추가 문서: {docCount}개
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {builtin?.toolGuide.content && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      setPreviewToolId(isPreviewing ? null : tool.id)
                    }
                  >
                    {isPreviewing ? '가이드 접기' : '내장 가이드 보기'}
                  </Button>
                )}
                <Button
                  size="sm"
                  onClick={() => {
                    setSelectedTool(tool.id);
                    setShowModal(true);
                  }}
                >
                  + 문서 추가
                </Button>
              </div>
            </div>

            {isPreviewing && builtin?.toolGuide.content && (
              <div className="bg-bg-tertiary rounded-lg p-3 text-xs text-text-secondary whitespace-pre-wrap max-h-[400px] overflow-y-auto font-mono leading-relaxed border-l-2 border-accent/40">
                {builtin.toolGuide.content}
              </div>
            )}

            {data?.documents?.length > 0 && (
              <div className="space-y-2">
                {data.documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between py-2 px-3 bg-bg-tertiary rounded-lg text-sm"
                  >
                    <div>
                      <span className="text-text-primary">{doc.title}</span>
                      <span className="text-text-tertiary text-xs ml-2">
                        {doc.source_type} &middot; {new Date(doc.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <button
                      onClick={() => handleDelete(tool.id, doc.id)}
                      className="text-text-tertiary hover:text-error text-xs transition-colors"
                    >
                      삭제
                    </button>
                  </div>
                ))}
              </div>
            )}

            {data?.knowledge?.knowledge_summary && (
              <div className="mt-3">
                <h3 className="text-xs uppercase tracking-wider text-text-secondary font-medium mb-2">
                  학습된 규칙 요약
                </h3>
                <div className="bg-bg-tertiary rounded-lg p-3 text-sm text-text-secondary whitespace-pre-wrap max-h-[200px] overflow-y-auto">
                  {data.knowledge.knowledge_summary}
                </div>
              </div>
            )}
          </Card>
        );
      })}

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="문서 추가">
        <div className="space-y-4">
          <Select
            label="연결 AI 툴"
            options={TOOLS.map((t) => ({ value: t.id, label: t.name }))}
            value={selectedTool}
            onChange={(e) => setSelectedTool(e.target.value)}
          />

          <Input
            label="문서 제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="예: Seedance 공식 프롬프트 가이드"
          />

          <Tabs
            tabs={[
              { id: 'text', label: '텍스트' },
              { id: 'url', label: 'URL' },
              { id: 'file', label: '파일' },
            ]}
            activeTab={activeTab}
            onChange={setActiveTab}
          />

          {activeTab === 'url' && (
            <Input
              label="URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://..."
            />
          )}

          {activeTab === 'text' && (
            <div>
              <label className="block text-xs uppercase tracking-wider text-text-secondary font-medium mb-1.5">
                문서 내용
              </label>
              <textarea
                value={textContent}
                onChange={(e) => setTextContent(e.target.value)}
                placeholder="프롬프트 가이드 문서의 내용을 복사하여 붙여넣기 하세요..."
                rows={10}
                className="w-full bg-bg-secondary border border-border rounded-lg px-3 py-2.5 text-sm text-text-primary placeholder:text-text-tertiary focus:border-border-focus focus:outline-none resize-y transition-colors"
              />
            </div>
          )}

          {activeTab === 'file' && (
            <div>
              <label className="block text-xs uppercase tracking-wider text-text-secondary font-medium mb-1.5">
                파일 업로드
              </label>
              <div
                className="border-2 border-dashed border-border rounded-lg p-8 text-center text-text-tertiary text-sm cursor-pointer hover:border-border-focus transition-colors"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const file = e.dataTransfer.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (ev) => {
                      setTextContent(ev.target?.result as string);
                      setTitle(title || file.name);
                    };
                    reader.readAsText(file);
                  }
                }}
              >
                <p>.txt, .md 파일을 드래그하거나 클릭하세요</p>
                <input
                  type="file"
                  accept=".txt,.md"
                  className="hidden"
                  id="file-upload"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (ev) => {
                        setTextContent(ev.target?.result as string);
                        setTitle(title || file.name);
                      };
                      reader.readAsText(file);
                    }
                  }}
                />
                <label htmlFor="file-upload" className="cursor-pointer text-accent mt-2 inline-block">
                  파일 선택
                </label>
              </div>
            </div>
          )}

          {error && (
            <p className="text-sm text-error">{error}</p>
          )}

          <Button
            className="w-full"
            onClick={handleLearn}
            loading={loading}
            disabled={
              (activeTab === 'url' && !url) ||
              (activeTab === 'text' && !textContent) ||
              (activeTab === 'file' && !textContent)
            }
          >
            학습 시작
          </Button>
        </div>
      </Modal>
    </div>
  );
}
