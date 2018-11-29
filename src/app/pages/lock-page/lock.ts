import { tool } from 'scripts/tool';

// 定义jquery引入的接口参数规范
interface JqueryFunc {
    ($?: any, classSelector?: string, callback?: any): void;
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
    motionStatus?: false; // 运动切换开关状态


    constructor(){
        
    }

    // 滑屏事件监控
    initCross?: JqueryFunc = function($?: any, classSelector?: string, callback?: any ) : any {

        let x1 : number;
        let y1 : number;
        let x2 : number;
        let y2 : number;
        let dis : number;

        $(classSelector).on('touchstart',function(e){
            let c = e.touches[0];
            x1 = c.clientX;
            y1 = c.clientY;
        });

        $(classSelector).on('touchend',function(e){

            let c = e.changedTouches[0];
            x2 = c.clientX;
            y2 = c.clientY;
            dis = Math.sqrt(Math.pow(Math.abs(x1-x2),2) + Math.pow(Math.abs(y1-y2),2));
        
            if( y2 <= y1 ){
                callback({dis,direct:1});
            } 
            else{
                callback({dis,direct:-1});
            }
                
        });
    }

    // 消失动画
    outMotion?: JqueryFunc = function ( $?: any, classSelector?: string, callback?: any ) : void {

        // 隐藏时间控件动画
        let len = $('.date-motion-box').length;
        $('.lp-hg').addClass('animated fadeOutDown');
        $('.date-motion-box').removeClass('animated fadOutUp').removeClass('animated fadeOut');
        $('.date-motion-box').each(function(index,el){
            if(index !== 0){
                $(this).css('animation-delay',(len-index)*0.03+'s');
                $(this).addClass('animated fadeOutDown');
            }else{
                $(this).addClass('animated fadeOut');
            }
        });
        this.motionStatus = false;
        // 动画完成后回调
        let t : number = window.setTimeout(()=>{
            // 关闭时间展示层
            
            //清除时间动画class
            $('.date-motion-box').removeAttr('style').removeClass('animated fadeOut').removeClass('animated fadeOutDown');
            $('.lp-hg').removeClass('animated fadeOutDown');
            this.motionStatus = true;
            callback();
            window.clearTimeout(t);
        },1000);
    }

    // 初始化入场动画
    initMotion?: JqueryFunc = function ( $?: any, classSelector?: string, callback?: any ) : void {
        
        // 隐藏时间控件动画
        let len = $('.date-motion-box').length;
        $('.lp-hg').addClass('animated fadeInUp');
        $('.lp-show').css('display','block').addClass('animated fadeIn');
        // $('.date-motion-box').removeClass('animated fadInUp').removeClass('animated fadeIn');
        $('.date-motion-box').each(function(index,el){
            if(index !== 0){
                $(this).css('animation-delay',(len-index)*0.03+'s');
                $(this).addClass('animated fadeInUp');
            }else{
                $(this).addClass('animated fadeIn');
            }
        });

        // 动画完成后回调
        let t : number = window.setTimeout(()=>{
            // 关闭时间展示层
            $('.lp-show').removeAttr('style').removeClass('animated fadeIn lp-display-none').addClass('lp-display-show');

            //清除时间动画class
            $('.date-motion-box').removeAttr('style').removeClass('animated fadeOut fadeIn').removeClass('animated fadeInUp');
            $('.lp-hg').removeClass('animated fadeInUp ');

            callback();
            window.clearTimeout(t);
        },1000);
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
    motionStatus?: false; // 运动切换开关状态


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

        let timer: number;
        tool.toggleLayer('.lp-interaction','.lp-show');
        $('.lp-interaction').addClass('animated fadeIn');
        $('.leave-enter-motion').each(function(index, Element){
           $(this).css('animation-duration','.5s');
           $(this).css('animation-delay',index*0.01+'s');
           $(this).addClass('animated fadeInUpBig');
        });
        this.motionStatus = false;
        // 清除运动 animation class
        timer = window.setTimeout(() => {
           $('.lp-interaction').removeClass('animated fadeIn');
           $('.leave-enter-motion').removeAttr('style').removeClass('animated fadeInUpBig').removeClass('animated fadeOutDownBig');
           window.clearTimeout(timer);
           this.motionStatus = true;
        },1500); 

    }

    //返回动画
    backMotion?: JqueryFunc = function($?: any, classSelector?: string, callback?: any) : void {

        let len : number = $(classSelector).length;
        $('.lp-interaction').addClass('animated fadeOut');
        $(classSelector).each(function(index, Element){
          $(this).css('animation-duration','.5s');
          $(this).css('animation-delay',(len-index)*0.02+'s');
          $(this).addClass('animated fadeOutDownBig');
        });

        this.motionStatus = false;

        // 2. 清除运动 animation class
        let t : number = window.setTimeout(() => {

           this.motionStatus = true;
           $(classSelector).removeAttr('style').removeClass('animated fadeOutDownBig');
           $('.lp-interaction').removeClass('animated fadeOut').css('display','none');
           /*$('.back-command').html('').append('<span class="circle-mask"></span>');*/
           window.clearTimeout(t);
           callback();
            
        }, 1000 ); 
    }

    //登陆成功动画
    successMotion?: JqueryFunc = function($?: any, classSelector?: string, callback?: any) : void {
        $(classSelector).each(function(index, Element){
           $(this).css('animation-delay',index*0.01+'s');
           $(this).addClass('animated fadeOutUp');
        });
        
        // 2. 动画隐藏键盘界面
        let t1 : number = window.setTimeout(() => {
          $('.lp-interaction').addClass('animated fadeOut');
          window.clearTimeout(t1);
        }, 100 ); 

        // 3. 动画
        let t2 : number =window.setTimeout(() => {
          $('.lp-interaction').removeClass('animated fadeOut').css('display','none');
          $(classSelector).removeClass('animated fadeOutUp');
          callback();
          window.clearTimeout(t2);
        }, 1100 ); 

    }

    
}


export const kb : KeyBoard = new KeyBoard();
export const lk : Lock = new Lock();