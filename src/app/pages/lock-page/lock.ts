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
    tipAnimationName: string; // 提示文字动画


    //入场动画
    intoMotion($?: any, classSelector?: string) : void{
        
    }


    //返回动画
    backMotion($?: any, classSelector?: string){

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
    successMotion($?: any, classSelector?: string) : void {
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


export const kb : any = new KeyBoard();