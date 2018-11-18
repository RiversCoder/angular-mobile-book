import { Component, OnInit } from '@angular/core';
import { Lock , KeyBoard } from './lock'
import { tool } from 'scripts/tool';

@Component({
  selector: 'app-lock-page',
  templateUrl: './lock-page.component.html',
  styleUrls: ['./lock-page.component.scss']
})

export class LockPageComponent implements OnInit {

  //初始化时间逻辑
  lock: Lock = {
      title: '锁屏界面',
      time: '12:56'
  };

  // 初始化键盘逻辑
  keyBoard: KeyBoard = {
    boards: []
  };

  constructor() { }

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

  // 点击 键盘获得的值
  onClickBoard(board: any): void {
    console.log(board);
  }

}
