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
            let day: number = Math.ceil(disStamp/1000/60/60/24);
            return day;
        }

       
        return formatStamp(analysisDate(oldDay),currentDayStamp);
    }
}

// 实例化Tool类
export const tool = new Tool();