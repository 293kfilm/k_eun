'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { useThemeStore } from '@/store/useThemeStore';

export default function SettingsPage() {
  const { theme, setTheme } = useThemeStore();
  const [apiKey, setApiKey] = useState('');
  const [defaultTool, setDefaultTool] = useState('kling');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedKey = localStorage.getItem('google_api_key') || '';
    const savedTool = localStorage.getItem('default_tool') || 'kling';
    setApiKey(savedKey);
    setDefaultTool(savedTool);
  }, []);

  const handleSave = () => {
    localStorage.setItem('google_api_key', apiKey);
    localStorage.setItem('default_tool', defaultTool);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    if (!confirm('모든 데이터를 초기화하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) return;
    localStorage.clear();
    alert('로컬 설정이 초기화되었습니다. DB 초기화는 data/studio.db 파일을 삭제하세요.');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-sm text-text-secondary mt-1">앱 설정을 관리합니다</p>
      </div>

      <Card className="p-5 space-y-4">
        <h2 className="text-lg font-semibold">API 설정</h2>
        <Input
          label="Google Gemini API Key"
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="AIza..."
        />
        <p className="text-xs text-text-tertiary">
          API Key는 브라우저 로컬 스토리지에 저장됩니다. 서버 환경변수(.env.local)에 설정하는 것을 권장합니다.
        </p>
      </Card>

      <Card className="p-5 space-y-4">
        <h2 className="text-lg font-semibold">기본 설정</h2>
        <Select
          label="기본 AI 툴"
          options={[
            { value: 'kling', label: 'Kling AI' },
            { value: 'seedance', label: 'Seedance' },
          ]}
          value={defaultTool}
          onChange={(e) => setDefaultTool(e.target.value)}
        />
        <Select
          label="테마"
          options={[
            { value: 'dark', label: 'Dark' },
            { value: 'light', label: 'Light' },
          ]}
          value={theme}
          onChange={(e) => setTheme(e.target.value as 'dark' | 'light')}
        />
      </Card>

      <Card className="p-5 space-y-4">
        <h2 className="text-lg font-semibold">Tool Knowledge Base</h2>
        <p className="text-sm text-text-secondary">
          AI 영상 툴의 프롬프트 작성 가이드를 학습시켜 생성 품질을 높입니다
        </p>
        <Link href="/settings/tools">
          <Button variant="secondary">Knowledge Base 관리</Button>
        </Link>
      </Card>

      <div className="flex gap-3">
        <Button onClick={handleSave}>
          {saved ? 'Saved!' : '설정 저장'}
        </Button>
        <Button variant="danger" onClick={handleReset}>
          데이터 초기화
        </Button>
      </div>
    </div>
  );
}
