# Github Search with Graphql

## 실행전

1. [Github Token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) 사이트에서 토큰을 발급받아서 기록해주세요

## 실행법

1. .env.example 파일을 (cp .env.example .env) 명령어를 통해 .env 파일로 복사 및 관련 내용을 적절히 수정합니다.
2. yarn install(또는 npm install, 하지만 yarn을 권장합니다.)
3. yarn dev(또는 npm run dev)

## 프로젝트 세팅

1. 앱, 환경변수, SEO와 관련된 데이터는 src/core/config 폴더에 있습니다. 필요시 수정하시면 됩니다.
2. 해당 앱은 기본적으로 모바일 친화적으로 제작되었습니다. 만약 max-width를 변경하고 싶으시다면 src/core/config/appConfig 파일에서 mobileAppMaxWidth 변수를 수정하시면 됩니다.
3. 새로운 환경변수를 추가하고 싶다면, 우선 다른 사람을 위해서 .env.example에 예시를 추가해주세요. 그 후 .env 파일에 추가, next.config.js에 추가(서버사이드에서도 사용할 수 있도록 하기 위함), src/core/config/envConfig.ts에도 추가해주세요.

## 추가 내용

1. eslint, prettier, typescript, husky 세팅이 되어 있습니다.(만약 vscode를 사용한다면 eslint, prettier 플러그인을 설치 및 자신의 vscode 앱의 setting.json 파일을 적절히 수정해주세요)
2. graphql 관련 파일들을 compile 하기 위해서 yarn dev/start/build시 relay-compiler를 실행하여 graphql 코드를 compile 합니다. dev/build/start 명령어 실행시 자동으로 compile 되며, dev의 경우 실시간 compile이 됩니다.

## 기타(고친점)

1. useWindowReSize hook을 useCallback을 통해 memoization 했습니다.(src/hooks/useWindowReSize.ts)
2. Immutable.js와 immer.js의 차이점은 다음과 같습니다

- Immutable.js의 경우, JS 기본 객체를 사용하지 않고 자체적으로 만든 List 객체를 사용합니다.(자료구조는 Trie로 되어있으며 이는 O(log(branching_factor)n)의 시간복잡도를 가집니다.)
- Immer의 경우 JS 기본 객체를 사용합니다. Immer의 경우 Proxy를 사용하여 객체를 감싸고, 이를 통해 객체의 변경을 감지합니다. 이는 O(n)의 시간복잡도를 가집니다.
- 하지만 실제 사용시에는 Immutable.js의 경우, Plain Object로 만드는 과정이 필요하기 때문에 실제 사용시 Immer.js의 경우보다 느린 경우가 많습니다.
- [관련자료](https://immerjs.github.io/immer/performance/)

## 퍼포먼스 체크

1. ![LightHouse](https://d.pr/i/odcVdT.png)
