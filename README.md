## 시연 페이지
[Live Demo](https://youtube-xi-nine.vercel.app/)

## 프로젝트 소개
<p>
  React, TypeScript 학습과 API 연동을 익히기 위해 YouTube Data API를 사용해 유튜브 사이트를 클론 코딩하였으며, 반응형으로 작업을 완료했습니다.
</p>

<br>

## 기술 스택

| JavaScript | TypeScript |  React   |
| :--------: | :--------: | :------: |
|   ![js]    |   ![ts]    | ![react] |

<br>

## 주요 기능

### 기능 1
<p>React Query를 이용해 반복적인 데이터 요청을 방지하고, 데이터를 효율적으로 캐싱하여 관리했습니다.</p>

### 기능 2
<p>Recognition API를 사용해 음성으로도 검색이 가능하도록 구현했으며, 이 기능은 크롬에서만 동작하기 때문에 크롬이 아닌 브라우저에서는 해당 버튼을 숨겼습니다.</p>

### 기능 3
<p>React Query의 useInfiniteQuery를 사용해 전체 비디오 목록과 비디오 디테일 페이지에서 댓글 리스트(CommentList)와 관련 비디오 리스트(RelatedVideoList)를 무한 스크롤로 구현했습니다. 무한 스크롤이 반복되는 로직이어서 커스텀 훅으로 분리하여 최적화했습니다.</p>

### 기능 4
<p>Light 모드와 Dark 모드를 Context API를 이용해 구현했습니다.</p>


<br>

<!-- Stack Icon Refernces -->

[js]: /stacks/javascript.svg
[ts]: /stacks/typescript.svg
[react]: /stacks/react.svg
