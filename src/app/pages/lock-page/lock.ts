export class Lock {
    
    title?: string;
    time: string;
    countdown?: number;
    datetime?: string;
    weather?: string;


    constructor(){}
}


export class KeyBoard {

    boards: Array<any>;  // 键盘按键
    tips: string;  // 提示信息
    openTip: boolean; // 提示开关
    passWord: Array<string>; //初始化输入的密码
    enterPassword: boolean; //输入密码删除密码的状态
}