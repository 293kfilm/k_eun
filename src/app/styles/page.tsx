'use client';

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import type { Style } from '@/types';
import { getToolOptions } from '@/lib/presets';

const TOOLS = [{ value: '', label: '툴 무관' }, ...getToolOptions()];

export default function StylesPage() {
  const [styles, setStyles] = useState<Style[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [toolId, setToolId] = useState('');
  const [prompts, setPrompts] = useState<string[]>(['', '', '']);
  const [rules, setRules] = useState('');
  const [loading, setLoading] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const fetchStyles = useCallback(async () => {
    const res = await fetch('/api/styles');
    const data = await res.json();
    setStyles(data);
  }, []);

  useEffect(() => { fetchStyles(); }, [fetchStyles]);

  const resetForm = () => {
    setName('');
    setDescription('');
    setToolId('');
    setPrompts(['', '', '']);
    setRules('');
    setEditingId(null);
  };

  const handleSave = async () => {
    const validPrompts = prompts.filter((p) => p.trim());
    if (!name.trim() || validPrompts.length < 1) return;

    setLoading(true);
    try {
      const body = {
        name,
        description,
        toolId: toolId || undefined,
        referencePrompts: validPrompts,
        rules: rules || undefined,
      };

      if (editingId) {
        await fetch(`/api/styles/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
      } else {
        await fetch('/api/styles', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
      }

      setShowModal(false);
      resetForm();
      fetchStyles();
    } catch {
      alert('저장 실패');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('이 스타일을 삭제하시겠습니까?')) return;
    await fetch(`/api/styles/${id}`, { method: 'DELETE' });
    fetchStyles();
  };

  const handleEdit = (style: Style) => {
    setEditingId(style.id);
    setName(style.name);
    setDescription(style.description || '');
    setToolId(style.tool_id || '');
    setPrompts(
      style.reference_prompts.length >= 3
        ? style.reference_prompts
        : [...style.reference_prompts, ...Array(3 - style.reference_prompts.length).fill('')]
    );
    setRules('');
    setShowModal(true);
  };

  const handleDuplicate = async (style: Style) => {
    await fetch('/api/styles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: `${style.name} (copy)`,
        description: style.description,
        toolId: style.tool_id,
        referencePrompts: style.reference_prompts,
      }),
    });
    fetchStyles();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">My Styles</h1>
          <p className="text-sm text-text-secondary mt-1">
            자신만의 프롬프트 스타일을 등록하고 관리합니다
          </p>
        </div>
        <Button onClick={() => { resetForm(); setShowModal(true); }}>
          + 스타일 추가
        </Button>
      </div>

      {styles.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-text-tertiary">등록된 스타일이 없습니다</p>
          <p className="text-xs text-text-tertiary mt-1">
            참고 프롬프트를 등록하면 AI가 스타일 패턴을 분석합니다
          </p>
        </Card>
      ) : (
        <div className="grid gap-3">
          {styles.map((style) => (
            <Card key={style.id} className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{style.name}</h3>
                    {style.tool_id && (
                      <span className="text-xs bg-accent-subtle text-accent px-2 py-0.5 rounded">
                        {style.tool_id}
                      </span>
                    )}
                  </div>
                  {style.description && (
                    <p className="text-sm text-text-secondary mt-1">{style.description}</p>
                  )}
                  <p className="text-xs text-text-tertiary mt-1">
                    참고 프롬프트 {style.reference_prompts.length}개
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="sm" onClick={() => handleEdit(style)}>
                    편집
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDuplicate(style)}>
                    복제
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(style.id)}>
                    삭제
                  </Button>
                </div>
              </div>
              {style.style_summary && (
                <div className="mt-3">
                  <button
                    onClick={() => setExpandedId(expandedId === style.id ? null : style.id)}
                    className="text-xs text-accent hover:text-accent-hover transition-colors"
                  >
                    {expandedId === style.id ? '스타일 요약 접기' : '스타일 요약 보기'}
                  </button>
                  {expandedId === style.id && (
                    <div className="mt-2 bg-bg-tertiary rounded-lg p-3 text-sm text-text-secondary whitespace-pre-wrap max-h-[200px] overflow-y-auto">
                      {style.style_summary}
                    </div>
                  )}
                </div>
              )}
            </Card>
          ))}
        </div>
      )}

      <Modal
        isOpen={showModal}
        onClose={() => { setShowModal(false); resetForm(); }}
        title={editingId ? '스타일 편집' : '스타일 추가'}
      >
        <div className="space-y-4">
          <Input
            label="스타일 이름"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="예: Cinematic Dark Mood"
          />

          <Input
            label="설명 (선택)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="이 스타일에 대한 간단한 설명"
          />

          <Select
            label="기본 AI 툴"
            options={TOOLS}
            value={toolId}
            onChange={(e) => setToolId(e.target.value)}
          />

          <div>
            <label className="block text-xs uppercase tracking-wider text-text-secondary font-medium mb-2">
              참고 프롬프트 (최소 1개)
            </label>
            {prompts.map((prompt, i) => (
              <div key={i} className="mb-2 flex gap-2">
                <textarea
                  value={prompt}
                  onChange={(e) => {
                    const next = [...prompts];
                    next[i] = e.target.value;
                    setPrompts(next);
                  }}
                  placeholder={`참고 프롬프트 ${i + 1}`}
                  rows={2}
                  className="flex-1 bg-bg-secondary border border-border rounded-lg px-3 py-2 text-sm text-text-primary placeholder:text-text-tertiary focus:border-border-focus focus:outline-none resize-y transition-colors"
                />
                {prompts.length > 1 && (
                  <button
                    onClick={() => setPrompts(prompts.filter((_, j) => j !== i))}
                    className="text-text-tertiary hover:text-error self-start mt-2"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            ))}
            {prompts.length < 10 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setPrompts([...prompts, ''])}
              >
                + 프롬프트 추가
              </Button>
            )}
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-text-secondary font-medium mb-1.5">
              스타일 규칙 메모 (선택)
            </label>
            <textarea
              value={rules}
              onChange={(e) => setRules(e.target.value)}
              placeholder="추가적인 스타일 규칙이 있다면 입력하세요..."
              rows={3}
              className="w-full bg-bg-secondary border border-border rounded-lg px-3 py-2 text-sm text-text-primary placeholder:text-text-tertiary focus:border-border-focus focus:outline-none resize-y transition-colors"
            />
          </div>

          <Button className="w-full" onClick={handleSave} loading={loading}>
            {editingId ? '수정' : '저장 및 분석'}
          </Button>
        </div>
      </Modal>
    </div>
  );
}
