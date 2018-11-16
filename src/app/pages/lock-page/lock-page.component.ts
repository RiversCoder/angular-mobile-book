import { Component, OnInit } from '@angular/core';
import { Lock } from './lock'
import { tool } from 'scripts/tool';

@Component({
  selector: 'app-lock-page',
  templateUrl: './lock-page.component.html',
  styleUrls: ['./lock-page.component.scss']
})

export class LockPageComponent implements OnInit {

  //初始化逻辑
  lock: Lock = {
      title: '锁屏界面',
      time: '12:56'
  };

  constructor() { }

  ngOnInit() {
      this.initDate();
  }
  
  //初始化时间日期
  initDate() : void {
     this.lock.time = tool.getAllDaysFromTo()+' DAY';
  }

}
