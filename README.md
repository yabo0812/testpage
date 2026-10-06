# testpage

3대 모녀 맞춤 교토 힐링 & 덕질 여행(2026.10.21 – 10.24) 프레젠테이션 웹페이지입니다.

## 보기

`index.html`을 브라우저로 열거나, 정적 서버로 띄웁니다.

```bash
python3 -m http.server 8000
# http://localhost:8000
```

| 조작 | 키 |
| --- | --- |
| 다음 / 이전 | → / ←, Space, 클릭 버튼, 스와이프 |
| 처음 / 끝 | Home / End |
| 전체 화면 | F |
| PDF 저장 | 브라우저 인쇄(Ctrl+P) → PDF로 저장 |

## 관광지 이미지

`images/` 폴더에 아래 파일명으로 이미지를 넣으면 자동으로 표시됩니다. 없으면 자리표시 카드가 나옵니다.

| 파일명 | 장표 |
| --- | --- |
| `cover.jpg` | 표지 |
| `hotel.jpg` | 호텔 게이한 교토 하치조구치 |
| `inari.jpg` | 후시미 이나리 신사 |
| `animate.jpg` + `bath.jpg` | 휴식 & 덕질 타임 (사선 2분할) |
| `torokko.jpg` + `chikurin.jpg` + `tenryuji.jpg` + `togetsukyo.jpg` | 아라시야마 (4분할) |
| `kinkakuji.jpg` | 킨카쿠지 |
| `ryoanji.jpg` | 료안지 |
| `pontocho.jpg` | 폰토초 |
| `kiyomizu.jpg` + `sannenzaka.jpg` + `hokanji.jpg` | 기요미즈데라 · 산넨자카 · 호칸지 (3분할) |
| `gyoen.jpg` + `gosho.jpg` | 교토교엔 & 교토고쇼 (사선 2분할) |
| `nijo.jpg` | 니조성 |
| `kawaramachi.jpg` | 가와라마치 |
| `umekoji.jpg` | 우메코지 공원 |
| `haruka.jpg` | 간사이 공항으로 (하루카) |

여러 장을 쓰는 장표는 모든 파일이 있어야 표시됩니다. 사선 위치는 `styles.css`의 `.photo-diag` 변수(`--top`, `--bottom`, `--gap`)로 조절합니다.

일정 내용은 `data.js`에서 수정합니다.
