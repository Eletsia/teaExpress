# Tea Express
<br/>
https://tea-express.vercel.app/ <br/>
인상깊었던 카페 소개 피드 만들기 프로젝트
<br/>

<!-- 제목 -->
## :microphone: Project Introduction
기존의 뉴스피드 프로젝트에서 

kakao map api를 활용해 만든 사이트입니다.

<br/>

<!-- 기간 -->

### :heavy_check_mark: **Development Period**
2025/02/27 ~ 2025/03/05

<br/>

# 메인 페이지 (Home)
<img width="940" alt="image" src="https://github.com/user-attachments/assets/2403fe8e-0ff7-4438-aa45-a17583bc2a2c" />
<br/>
메인 페이지에서는 게시물 추가와 kakaoMap api를 통한 마커를 찍을 수 있습니다.<br/>
해당 마커의 위치정보를 기반으로 실제 주소를 얻어와 게시물 정보에 저장할 수 있습니다. <br/>

# 로그인 관리
![2025-03-05 12 22 43](https://github.com/user-attachments/assets/aaa570b3-a734-49b6-aace-90cf0dcfac1c)
![2025-03-05 12 22 33](https://github.com/user-attachments/assets/b963e27c-ab38-46fc-907d-df897d48f683)


supabase의 authentication api를 활용해서 만들었습니다<br/>
loginStore.js파일에서 로그인 상태및 사용자 정보를 관리합니다<br/>
텐스텍 쿼리의 useMutation으로 비동기 로그인 처리및 캐시정보를 관리합니다<br/>

# 게시물 상세페이지
<img width="505" alt="image" src="https://github.com/user-attachments/assets/2351be98-b4bc-4e85-8f54-42333a1806d7" />

<br/>
게시물 상세페이지에서는 댓글추가와 북마크 좋아요 삭제 기능을 이용할 수 있습니다<br/>
북마크와 좋아요 설정이 가능하며<br/>
삭제시 게시물에 있는 모든 유저의 좋아요 북마크 정보와 댓글 정보 모두 삭제됩니다.<br/>
<br/>

# 게시물 추가페이지
<img width="629" alt="image" src="https://github.com/user-attachments/assets/8ce2f28c-1354-4d96-8ba8-8a081f6184a7" />
<br/>
<br/>
추가 페이지에서는 업로드할 이미지를 선택하면 preview 이미지를 보여줍니다.<br/>
선택한 마커의 주소정보를 하단에 보여주고 제목과 내용을 입력하여 게시물을 추가할 수 있습니다.<br/>
<br/>

# 게시물 수정페이지
<img width="522" alt="image" src="https://github.com/user-attachments/assets/f1b04193-1954-479e-ae82-99f18d3031e9" />
<br/>
<br/>
게시물 수정페이지에서는 기존의 입력한 포스트의 제목과 내용정보를 보여주고 이미 업로드한 사진을 보여줍니다.<br/>

# 트러블 슈팅
이번에 깃레포지토리를 만들고 처음으로 배포를 해보다보니 <br/>
미처 신경쓰지못한 패키지 파일들이 많아서 충돌이 잦았습니다 <br/>
깃 이그노어에 추가하고 깃허브 파일에서 삭제하는등으로 <br/>
최대한 충돌을 줄여서 개발을 했습니다 <br/>
이번기회에 레포지토리를 만들때 고려해야할점을 많이 배웠습니다. <br/>

구현에서 아쉬운점은 <br/>
열심히 노력했지만 시간이 모자라 메인페이지에서 post 목록을 보여줄때 <br/>
전체가아닌 해당구역에대한 포스트만 구현하기로 약속되어있었는데 미처 구현하지 못한점이 아쉽습니다 <br/>
프로젝트 스케줄링을 다음프로젝트때는 좀더 구체적으로 세워야 할것 같습니다.  <br/>
