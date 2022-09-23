import "styled-components";

// styled theme에서 사용할 props의 타입을 여기서 선언한다.
declare module "styled-components"{
    export interface DefaultTheme{
        borderRaidus : string;
        mainBgColor : string,
        textColor : string;
        accentColor : string;
    }
}