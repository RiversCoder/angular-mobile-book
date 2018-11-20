import { Component, OnInit } from '@angular/core';
import { Lock , KeyBoard } from './lock'
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
      title: '锁屏界面',
      time: '12:56',
      
  };

  // 初始化键盘逻辑
  keyBoard: KeyBoard = {
    boards: [],
    tips: '',
    openTip: false,
    //初始化输入的密码
    passWord: [],
    //输入密码删除密码的状态
    enterPassword: true
  };

  // 生命周期
  ngOnInit() {
      this.initDate();
      this.initKeyBoards();
  }
  
  //初始化时间日期
  initDate() : void {
     this.lock.time = tool.getAllDaysFromTo()+' DAY';
  }

  // 初始化键盘数字 显示
  initKeyBoards() : void {
    
    let num: string = '123456789';
    let str: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let arr: Array<any> = [];

    let format: any = {
      title: '',
      detail: ''
    };

    arr.push({
      title: '1',
      detail: '',
      active: true
    });

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
    this.keyBoard.boards = arr;
  }

  // 显示提示
  showTip(notice: string) : void {
    this.keyBoard.tips = notice;
    this.keyBoard.openTip = true;
    $('.ib-text').removeClass('tada').addClass('tada');
  }

  // 点击 键盘获得的值
  onClickBoard(board: any): void {
    // 点击的是数字
    if(board.title.match(/^[0-9]{1}$/g)){
      this.keyBoard.passWord.push(board.title); 
    }else{
      if(this.keyBoard.passWord.join('') == '1234'){
        this.leaveMotion();
      }else{
        this.showTip('密码不对'+Math.random());
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

  //离开动画
  leaveMotion() : void{

  }
}
