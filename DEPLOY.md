# 배포 가이드 (Vercel + Turso) — 완전 무료

회사/집 어디서든 웹브라우저로 접속해서 쓸 수 있도록 배포합니다.

## 준비물
- GitHub 계정
- 이메일 주소 하나

## STEP 1. GitHub 저장소 만들기

```bash
cd ai-video-prompt-studio
git add .
git commit -m "Initial commit"
```

GitHub에서 새 저장소 생성 → 아래 명령으로 push:
```bash
git remote add origin https://github.com/<your-username>/ai-video-prompt-studio.git
git branch -M main
git push -u origin main
```

## STEP 2. Turso 데이터베이스 생성 (무료)

1. https://turso.tech 접속 → **Sign up** (GitHub 계정으로 가입 가능)
2. 대시보드에서 **Create Database** 클릭
3. 이름 입력 (예: `ai-video-studio`), 지역은 가까운 곳 (`nrt` 도쿄 추천)
4. **Create Database** 클릭
5. 생성된 DB 클릭 → 상단의 복사 가능한 두 값 확인:
   - **Database URL**: `libsql://xxxxx-xxxxx.turso.io`
   - **Auth Token**: 아래 **Create Token** 버튼 클릭 후 생성되는 긴 문자열

두 값을 메모장에 잠깐 복사해두세요.

## STEP 3. Anthropic API Key 발급

1. https://console.anthropic.com 접속 → 가입/로그인
2. 좌측 **API Keys** → **Create Key**
3. `sk-ant-...` 형태의 키 복사 (한 번만 보이니 꼭 저장)
4. **Settings > Billing** 에서 최소 $5 정도 크레딧 충전 (신용카드 필요)
   - 프롬프트 생성 1회당 대략 $0.01~0.03 수준이라 $5로 수백 번 쓸 수 있습니다

## STEP 4. Vercel 배포 (무료)

1. https://vercel.com 접속 → GitHub 계정으로 로그인
2. **Add New... > Project** 클릭
3. GitHub 저장소 목록에서 `ai-video-prompt-studio` 선택 → **Import**
4. **Environment Variables** 섹션에 아래 4개를 추가:

| Key | Value |
|-----|-------|
| `ANTHROPIC_API_KEY` | `sk-ant-...` (STEP 3) |
| `TURSO_DATABASE_URL` | `libsql://...` (STEP 2) |
| `TURSO_AUTH_TOKEN` | 토큰 문자열 (STEP 2) |
| `APP_USERNAME` | 원하는 아이디 (예: `admin`) |
| `APP_PASSWORD` | 원하는 비밀번호 (강한 것) |

5. **Deploy** 클릭 → 2~3분 기다리면 완료
6. 완료 후 배포된 URL 확인: `https://ai-video-prompt-studio-xxxx.vercel.app`

## STEP 5. 접속 및 사용

1. 배포 URL 접속 → 브라우저가 ID/PW 묻는 창 표시
2. 위에서 설정한 `APP_USERNAME` / `APP_PASSWORD` 입력
3. 로그인 성공 → 이제 웹앱 사용 가능!

---

## 사용 방법

### 1. 툴 학습 (최초 1회, 선택)
- 좌측 사이드바 **설정 > Tool Knowledge Base** 진입
- 각 AI 영상 툴의 공식 프롬프트 가이드를 복사해서 "텍스트" 탭으로 붙여넣기
- **학습 시작** 클릭 → 자동으로 규칙 추출 및 저장

### 2. 내 스타일 등록 (최초 1회, 선택)
- **My Styles** 메뉴
- **스타일 추가** → 좋아하는 참고 프롬프트를 3개 이상 붙여넣기
- AI가 스타일 패턴을 자동 학습

### 3. 프롬프트 생성 (메인 사용법)
- **생성기** 메뉴 (홈)
- 상단: AI 툴 & 스타일 선택
- 컷별로 한 줄씩 입력 (예: "여자가 비 오는 골목을 걷는다")
- **Enter** 키로 다음 컷 추가 (최대 20컷)
- **Prompt Generate** 버튼 또는 `Cmd+Enter`
- 결과 카드에서 프롬프트 확인/편집/복사

### 4. 프로젝트 저장
- 생성된 결과 하단 **Save to Project** 버튼
- **Projects** 메뉴에서 관리, TXT/CSV 내보내기

### 5. 히스토리 확인
- **History** 메뉴에서 이전 생성 기록 날짜별로 확인
- 원하는 기록을 다시 프로젝트에 저장 가능

---

## 회사·집에서 같이 쓰기

- 배포된 **URL을 북마크**하세요 (회사 PC, 집 PC, 폰 모두)
- `APP_USERNAME` / `APP_PASSWORD`를 기억해두면 끝
- 모든 데이터는 Turso 클라우드 DB에 저장되므로 어디서 접속해도 같은 프로젝트·스타일·히스토리를 볼 수 있습니다

## 무료 한도 & 비용

| 서비스 | 무료 한도 | 초과 시 |
|--------|----------|---------|
| **Vercel Hobby** | 100GB 대역폭/월 | 개인용은 초과할 일 거의 없음 |
| **Turso** | 9GB 저장 / 10억 read/월 | 역시 개인용 충분 |
| **Anthropic API** | 없음 (종량제) | $5 크레딧으로 수백 번 생성 |

총 월 비용: **Anthropic 사용량만큼만** (대부분 $1~5/월 수준)

## 자동 재배포

- GitHub에 `git push`만 하면 Vercel이 자동으로 재배포합니다
- 2~3분 후 변경사항 반영

## 문제 해결

**Q. 접속 시 로그인 창이 안 나옴**
- `APP_USERNAME`, `APP_PASSWORD` 환경변수가 Vercel에 설정됐는지 확인
- Vercel 대시보드 > Settings > Environment Variables 확인 후 **Redeploy**

**Q. 프롬프트 생성이 실패함**
- `ANTHROPIC_API_KEY`가 올바른지, 크레딧이 남았는지 확인
- Vercel 대시보드 > Logs에서 에러 확인

**Q. DB가 안 보임**
- `TURSO_DATABASE_URL`과 `TURSO_AUTH_TOKEN`이 맞게 들어갔는지 확인
- Turso 대시보드에서 토큰이 만료되지 않았는지 확인
