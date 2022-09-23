import { registerRootComponent } from 'expo';

import App from './App';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately

// Out of the box, transforming your files to JavaScript works via the same Babel infrastructure as a non-TypeScript 
// React Native project. We recommend that you use the TypeScript compiler only for type checking.
//  If you have existing TypeScript code being ported to React Native, there are one or two caveats to using Babel instead of TypeScript.

// 코드가 ts로 컴파일되는게 아니다, js로 그대로 컴파일하며 ts로 타입 체크만 한다.
// ts -> js 변환은 babel이 한다.
// rn-ts가 필수는 아니기 때문에

// ts로 변환해도 index.js는 그대로 유지한다.
registerRootComponent(App);
