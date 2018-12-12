/* 时间类接口 */

interface Time {
  year: number;
  month: number;
  day: number;
}


/**
* 工具类Tool 
*/
class Tool{

    // 补零操作
    addZoom(time: number) : string {
        if(time > 9){
            return '' + time;
        }else{
            return '0' + time;
        }
    }

    // 获取时间 ( 格式 xx:xx )
    getTime(): string {

        let date: Date = new Date();
        let hour: string = this.addZoom(date.getHours());
        let minute: string = this.addZoom(date.getMinutes());

        return hour+':'+minute;
    }

    // 获取时间段的天数
    getAllDaysFromTo(day1? : Time, day2? : Time) : number { 


        // 当前的时间
        let currentDayStamp: number = (new Date()).getTime();

        // 过去的时间
        let oldDay: Time = {
             year: 2008,
             month: 11,
             day: 25
        };

        // 格式化过去时间
        function analysisDate(v: any): number{

            let oldDayStamp: number = new Date(v.year + '-' + v.month + '-' + v.day).getTime();

            return oldDayStamp;
        }

        // 格式化两个时间点的时间段
        function formatStamp(stamp1? :number, stamp2? : number): number{
            let disStamp: number = stamp2 - stamp1;
            let day: number = Math.ceil(disStamp/1000/60); // /60/24
            return day;
        }

       
        return formatStamp(analysisDate(oldDay),currentDayStamp);
    }


    //  获取年月日星期 2018年11月21日 星期六
    getFullDate(): any {
        
        let weeks: string[] = ['Sun','Mon','Tues','Wed','Thur','Fri','Sat'];

        let date: Date = new Date();
        let year: number = date.getFullYear();
        let month: number = date.getMonth()+1;
        let day: number = date.getDate();
        let week: string = weeks[date.getDay()];

        return {year,month,day,week};
    }


    // 切换显示对应的Layer On/Off
    toggleLayer(showPanelClassName,hidePanelClassName): void{
        let elShow = document.querySelector(showPanelClassName);
        let elHide = document.querySelector(hidePanelClassName);

        elShow.style.display = 'block';
        elHide.style.display = 'none';
    }


    //已知 x , y 坐标，求出角度
    getDegByPostion(x: number,y: number): number{
        //let tan = Math.tan(x/y);
        let hudu: number = Math.atan(x/y);
        let deg: number = hudu/Math.PI*180;
        
        return Math.floor(deg);
    }

    // 获取 x, y 坐标，判断移动的距离是否越界
    checkDisCross(x: number,y: number,cross: number): boolean{
        let dis: number = Math.floor(Math.sqrt(Math.pow(x,2)+Math.pow(x,2)));
        if(dis >= cross){
            return true;
        }else{
            return false;
        }
    }

    // 获取css样式里面的值
    getStyle(obj: any,attr: string): any{
        if(obj.currentStyle){      //IE
            return obj.currentStyle[attr]; 
        }else{
            return getComputedStyle(obj,'')[attr];     //Firefox
        }
    }

    // 计算rem值
    calcRemValue(value: number): number{
        let basic : number = 750/15;
        return (value/basic);
    }
}

// 实例化Tool类
export const tool: Tool = new Tool();