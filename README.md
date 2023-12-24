## 🧇 Waffle(프로젝트 수행을 위한 협업 웹서비스)
프로젝트 관리를 위한 협업 웹서비스로 다음의 목표로 개발하게 되었습니다.
<br>
- 팀원들 간 소통 기능 확대 및 편리한 기능 제공
- 프로젝트시 일정 관리, 진행 사항 관리 편의성 향상
- 팀 프로젝트시 생기는 부담감 해소

<br>

### Description
프로젝트 수행을 위한 협업 웹서비스로, 실시간 채팅, 화상채팅, 그룹, 룸 생성, 게시판 기능, 프로필 기능 등을 제공합니다. <br/>
평소에 자주 사용하던 프로젝트 협업 공간을 다른 컨셉으로 다시 개발해보는 성취를 경험하였습니다. <br/>
<br>


## 📝 상세 

### Waffle?
- 와플 기계로 찍어먹으면 무엇이든 맛있고 성공하듯이 우리의 서비스를 이용하면 어떠한 프로젝트라도 성공할 수 있다는 의미
- "이리와 플젝할래?"의 줄임말
### 개발 기간
- 2023.02 ~ 2023.07
### 개발 인원
- 3명(프론트 1명, 백 2명)

### 시연영상
https://www.youtube.com/watch?v=53iTT8urirE&t=5s
<br>

## 📸 Waffle의 주요 기능

### 회원가입 및 로그인
![image](https://github.com/judahhh/Waffle-FrontEnd/assets/96521594/764f7dc7-8051-4f21-bb01-a06ec30c3f61)
### 캘린더
![image](https://github.com/judahhh/Waffle-FrontEnd/assets/96521594/369c7fd6-a4e9-4f41-a9bd-178aa19fd081)
### 그룹
![image](https://github.com/judahhh/Waffle-FrontEnd/assets/96521594/4572fc00-452e-410a-9e8e-c87c411db954)
### 룸
![image](https://github.com/judahhh/Waffle-FrontEnd/assets/96521594/b05a21d0-734f-4aa4-aad5-18c62589826f)
### DM 및 화상채팅
![image](https://github.com/judahhh/Waffle-FrontEnd/assets/96521594/eec12c3b-7ca8-4b48-90e8-d025640d8918)
### 프로필
![image](https://github.com/judahhh/Waffle-FrontEnd/assets/96521594/d5139261-a9aa-4ed8-a322-bd8ec0625e57)

## 🛠 FrontEnd Stacks

<table>
<tr>
 <td align="center">Language</td>
 <td>
  <img src="https://img.shields.io/badge/JavaScript-Yellow?style=for-the-badge&logo=JavaScript&logoColor=ffffff"/>
 </td>
</tr>
<tr>
 <td align="center">Library</td>
 <td>
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=ffffff"/>&nbsp;
<img src="https://img.shields.io/badge/Axios-6028e0?style=for-the-badge&logo=Axios&logoColor=ffffff"/>&nbsp;
<img src="https://img.shields.io/badge/Styled-Components-pink?style=for-the-badge&logo=Styled-Components&logoColor=ffffff"/>&nbsp;
<img src="https://img.shields.io/badge/Stomp-red?style=for-the-badge&logo=Stomp&logoColor=ffffff"/>&nbsp;
<img src="https://img.shields.io/badge/OpenVidu-black?style=for-the-badge&logo=Open-Vidu&logoColor=ffffff"/>&nbsp;

  </td>
</tr>
<tr>
 <td align="center">Package</td>
 <td>
    <img src="https://img.shields.io/badge/NPM-CB3837?style=for-the-badge&logo=Npm&logoColor=white"/>&nbsp 
  </td>
</tr>
<tr>
 <td align="center">Formatter</td>
 <td>
  <img src="https://img.shields.io/badge/Prettier-373338?style=for-the-badge&logo=Prettier&logoColor=ffffff"/>&nbsp 
  <img src="https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=ESLint&logoColor=ffffff"/>&nbsp 
 </td>
</tr>
<tr>
 <td align="center">Tools</td>
 <td>
    <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white"/>&nbsp 
    <img src="https://img.shields.io/badge/Notion-5a5d69?style=for-the-badge&logo=Notion&logoColor=white"/>&nbsp
    <img src="https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=Slack&logoColor=white"/>&nbsp 
    <img src="https://img.shields.io/badge/Figma-d90f42?style=for-the-badge&logo=Figma&logoColor=white"/>&nbsp  
 </td>
</tr>
<tr>
 <td align="center">IDE</td>
 <td>
    <img src="https://img.shields.io/badge/VSCode-007ACC?style=for-the-badge&logo=Visual%20Studio%20Code&logoColor=white"/>&nbsp
</tr>
</table>
<br>

### Flow
![image](https://github.com/judahhh/Waffle-FrontEnd/assets/96521594/66d9a6de-94d0-4ad5-ad5e-8654847d154a)

### 기술
- WebRTC(Openvidu)
-- 웹 상에서 유연하게 실시간 화상채팅을 가능하게 하는 플랫폼
-- 화상채팅 버튼을 누르면 채팅방 내의 사용자들이 모두 같은 화상채팅방으로 접속되도록 함
-- 카메라, 마이크 사용 가능
- WebSocket, STOMP
-- 실시간 통신이 가능하도록 하는 웹소켓 통신, 메시지 전송을 쉽게 하는 STOMP(Simple Text Oriented Messaging Protocol)
-- publisher-subscriber 방식을 이용하여 연결하고 통신
-- 최대 6명까지 입장 가능
- Redis
-- Spring Security, JWT를 이용하여 인증 구현, 사용자 로그아웃시 토큰을 만료되도록 하여 다시 인증 불가하도록 구현

### 화면 설계서
![image](https://github.com/judahhh/Waffle-FrontEnd/assets/96521594/d6c62293-a9cc-4bee-a199-e2739215359c)

### 최종 테스트 케이스
![image](https://github.com/judahhh/Waffle-FrontEnd/assets/96521594/b7f88ec4-5e22-40f6-a7ec-0084b6af8fb3)
![image](https://github.com/judahhh/Waffle-FrontEnd/assets/96521594/5f25ce72-a4bb-4582-8ce2-361833f70a39)



## 💁‍♀️ Members

|     백엔드    |     백엔드     |    프론트엔드    |  
| :-----------------------------------------: | :----------------------------------------------: | :---------------------------------------------: | 
| ![](https://github.com/HoGyeongC.png?size=100) | ![](https://github.com/Seohyun-0206.png?size=300) | ![](https://github.com/judahhh.png?size=300) | 
|  | |  | 
|     [최호경](https://github.com/HoGyeongC)     |     [전서현](https://github.com/Seohyun-0206)     |     [주다현](https://github.com/judahhh)     |  
<br>
<br>
