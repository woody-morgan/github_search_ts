# Greenlabs Graphql Assignment

## 실행법

1. .env.example 파일을 (cp .env.example .env) 명령어를 통해 .env 파일로 복사 및 관련 내용을 적절히 수정합니다.
2. yarn install(또는 npm install, 하지만 yarn을 권장합니다.)
3. yarn dev(또는 npm run dev)

## 관련 내용

1. eslint, prettier, typescript, husky 세팅이 되어 있습니다.(만약 vscode를 사용한다면 eslint, prettier 플러그인을 설치 및 setting.json 파일을 적절히 수정해주세요))
2. graphql 관련 파일들을 compile 하기 위해서 yarn dev/start/build시 relay-compiler를 실행하여 graphql 파일들을 compile 합니다.
