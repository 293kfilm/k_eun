export interface ToolParameter {
  key: string;
  label: string;
  type: 'select' | 'number' | 'text';
  options?: string[];
  default: string | number;
}

export interface ToolPreset {
  id: string;
  name: string;
  description: string;
  promptOrder: string[];
  parameters: ToolParameter[];
  negativePromptSupport: boolean;
  maxPromptLength: number;
  examplePrompts: string[];
  knowledgeBase: string;
}

export interface KnowledgeDocument {
  id: string;
  tool_id: string;
  title: string;
  source_type: 'url' | 'text' | 'file';
  source_url?: string;
  raw_content: string;
  extracted_rules: string;
  created_at: string;
}

export interface ExtractedRules {
  promptStructure: string;
  bestPractices: string[];
  commonMistakes: string[];
  effectiveKeywords: string[];
  parameterTips: string[];
  examplePrompts: { prompt: string; why: string }[];
  summary: string;
}

export interface ToolKnowledge {
  tool_id: string;
  merged_knowledge: string;
  knowledge_summary: string;
  updated_at: string;
}

export interface Style {
  id: string;
  name: string;
  description?: string;
  tool_id?: string;
  reference_prompts: string[];
  style_summary: string;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  default_tool_id?: string;
  default_style_id?: string;
  created_at: string;
  updated_at: string;
}

export interface Cut {
  id: string;
  project_id: string;
  order_index: number;
  input_text: string;
  generated_prompt?: string;
  negative_prompt?: string;
  parameters?: string;
  created_at: string;
}

export interface HistoryEntry {
  id: string;
  tool_id: string;
  style_id?: string;
  input_cuts: { index: number; text: string }[];
  output_results: GeneratedResult[];
  created_at: string;
}

export interface GeneratedResult {
  cutNumber: number;
  prompt: string;
  negativePrompt?: string;
}

export interface CutInput {
  index: number;
  text: string;
  params?: Record<string, string | number>;
}

export interface ConsistencyLock {
  characterSheet: string;
  sceneAnchor: string;
}

export interface GenerateRequest {
  cuts: CutInput[];
  toolId: string;
  styleId?: string;
  globalParams?: Record<string, string | number>;
  consistency?: ConsistencyLock;
}
