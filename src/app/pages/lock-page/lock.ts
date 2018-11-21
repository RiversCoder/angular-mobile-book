import { tool } from 'scripts/tool';

// 定义jquery引入的接口参数规范
interface JqueryFunc {
    ($?: any, classSelector?: string): void;
}


// 时间相关 属性方法
export class Lock {
    
    title?: string;
    time?: string;
    countdown?: number;
    datetime?: any;
    weather?: string;
    hour?: string;
    minute?: string;


    constructor(){
        
    }

    initCross?: JqueryFunc = function($?: any, classSelector?: string) : void {
        
    }

}


// 数字键盘相关 属性方法
export class KeyBoard {

    boards: Array<any>;  // 键盘按键
    tips: string;  // 提示信息
    openTip: boolean; // 提示开关
    passWord: Array<string>; //初始化输入的密码
    enterPassword: boolean; //输入密码删除密码的状态
    tipAnimationName: string; // 提示文字动画


    // 初始化数字键盘
    initKeyBoard?: () => any[] = function() : any[] {
        let num: string = '123456789';
        let str: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let arr: Array<any> = [];

        let format: any = {
          title: '',
          detail: ''
        };

        arr.push({title: '1',detail: '',active: true});

        for(var i=1;i<num.length;i++){
          arr.push({
            title: num[i],
            detail: str.substr((i-1)*3,3),
            active: true
          });
        }

        // 最后一行操作
        let lastLine: Array<any> = [
          { title: '', detail: '', active: false },
          { title: '0', detail: 'zy', active: true },
          { title: '√', detail: '', active: true }
        ];
        arr.push(...lastLine);
        return arr;
    }

    //入场动画
    intoMotion?: JqueryFunc = function($?: any, classSelector?: string) : void {
        if(true){
            console.log('123');
        }
    }

    //返回动画
    backMotion?: JqueryFunc = function($?: any, classSelector?: string) : void {

        //1. 聊天离开动画
        let len : number = $(classSelector).length;
        $(classSelector).each(function(index, Element){
          $(this).css('animation-delay',(len-index)*0.01+'s');
          $(this).removeClass('animated fadeOutUpBig').addClass('animated fadeOutDownBig');
        });

        // 2. 动画隐藏键盘界面
        let t : number = window.setTimeout(() => {
          $('.lp-interaction').removeClass('animated fadeOut').addClass('animated fadeOut');
        }, 10*len ); 

    }

    //登陆成功动画
    successMotion?: JqueryFunc = function($?: any, classSelector?: string) : void {
        $(classSelector).each(function(index, Element){
           $(this).css('animation-delay',index*0.01+'s');
           $(this).removeClass('animated fadeOutDown').addClass('animated fadeOutUp');
        });
        // 2. 动画隐藏键盘界面
        let t : number = window.setTimeout(() => {
          $('.lp-interaction').removeClass('animated fadeOut').addClass('animated fadeOut');
        }, 100 ); 
    }

    
}


export const kb : KeyBoard = new KeyBoard();
export const lk : Lock = new Lock();