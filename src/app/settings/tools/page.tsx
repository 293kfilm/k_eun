'use client';

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Modal } from '@/components/ui/Modal';
import { Tabs } from '@/components/ui/Tabs';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import type { KnowledgeDocument, ToolKnowledge } from '@/types';

const TOOLS = [
  { id: 'kling', name: 'Kling AI' },
  { id: 'seedance', name: 'Seedance' },
];

interface ToolData {
  documents: KnowledgeDocument[];
  knowledge: ToolKnowledge | null;
}

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

  const fetchData = useCallback(async () => {
    for (const tool of TOOLS) {
      try {
        const res = await fetch(`/api/knowledge/${tool.id}`);
        const data = await res.json();
        setToolData((prev) => ({
          ...prev,
          [tool.id]: { documents: data.documents || [], knowledge: data.knowledge || null },
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
          AI 영상 툴의 프롬프트 가이드 문서를 학습시켜 생성 품질을 높입니다
        </p>
      </div>

      {TOOLS.map((tool) => {
        const data = toolData[tool.id];
        const docCount = data?.documents?.length || 0;

        return (
          <Card key={tool.id} className="p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">{tool.name}</h2>
                <p className="text-xs text-text-tertiary">학습된 문서: {docCount}개</p>
              </div>
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
