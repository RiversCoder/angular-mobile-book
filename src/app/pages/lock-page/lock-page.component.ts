import { Component, OnInit } from '@angular/core';
import { Lock , KeyBoard, kb, lk } from './lock'
import { tool } from 'scripts/tool';
import * as $ from 'jquery';


@Component({
  selector: 'app-lock-page',
  templateUrl: './lock-page.component.html',
  styleUrls: ['./lock-page.component.scss']
})

export class LockPageComponent implements OnInit {

  //初始化时间逻辑
  lock: Lock = {
    time: '12:00',
    hour: '',
    minute: '',
    datetime: null
  };

  // 初始化键盘逻辑
  keyBoard: KeyBoard = {
    boards: [],
    tips: '12312312',
    openTip: false,
    //初始化输入的密码
    passWord: [],
    //输入密码删除密码的状态
    enterPassword: true, 
    tipAnimationName: 'tada'
  };

  // 生命周期
  ngOnInit() {
      this.initDate();
      this.initKeyBoards();
      this.initEvents();
  }
  

  // 初始化事件操作
  initEvents() : void {
     lk.initCross($,'.lp-show');
  }


  //初始化时间日期
  initDate() : void {
     
     let self : any = this;

     let gt: () => void = function(): void {
       self.lock.time = tool.getTime();
       self.lock.hour = self.lock.time.split(':')[0].toString();
       self.lock.minute = self.lock.time.split(':')[1].toString();
     }
     
     gt();

     this.lock.datetime = tool.getFullDate();
     // 定时请求刷新时间
     let t: number = window.setInterval(gt,1000*30);
  }

  // 初始化键盘数字 显示
  initKeyBoards() : void {
    this.keyBoard.boards = kb.initKeyBoard();
  }

  // 显示提示
  showTip(notice: string, animationName?: string) : void {
    this.keyBoard.openTip = false;
    this.keyBoard.tips = notice;
    if(animationName){
      this.keyBoard.tipAnimationName = animationName;
    }
    let t: number = window.setTimeout(()=>{
      this.keyBoard.openTip = true;
      window.clearTimeout(t);
    },300);
  }

  // 点击 键盘获得的值
  onClickBoard(board: any): void {
    // 点击的是数字
    if(board.title.match(/^[0-9]{1}$/g)){
      if(this.keyBoard.passWord.length >= 8){
          this.showTip('密码不能超过8位 ~','bounceIn');
          return;
      } 
      this.keyBoard.passWord.push(board.title);
    }else{
      if(this.keyBoard.passWord.join('') == '1234'){
        this.leaveMotion();
      }else{
        this.showTip('亲，密码不对哟~','jackInTheBox');
      }
    }
    // 点击的是确定
    this.keyBoard.enterPassword = true;
  }

  // 点击删除 输入的值
  onClickDelete() : void {
    if(this.keyBoard.passWord.length <= 0){
      return;
    }else{
      //并非输入状态
      this.keyBoard.enterPassword = false;
      this.keyBoard.passWord.pop();
    }
  }  

  // 点击返回主页面
  onClickBack() : void {
    kb.backMotion($,'.leave-enter-motion');
  }

  //离开去其他页面的动画
  leaveMotion() : void{
    kb.successMotion($,'.leave-enter-motion');
  }
}
