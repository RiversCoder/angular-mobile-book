import { Component, OnInit, Input } from '@angular/core';
import * as $ from 'jquery';


interface Item {
  id?: number;
  img?: string;
  title?: string;
  content?: string;
  date?: string;
}


@Component({
  selector: 'app-list-box',
  templateUrl: './list-box.component.html',
  styleUrls: ['./list-box.component.scss']
})
export class ListBoxComponent implements OnInit {

  @Input() box: Item;
  @Input('activeStatus') active: boolean;

  item: Item;

  constructor() { }

  ngOnInit() {
    //this.getListArr(0);
    this.checkTouch();
  }


  // 点击触发卡片变大
  changeBigCard(event: any): void{
      // 1. 盒子变大 w 690 h 910
  }

  calcs(num: number): string {
      return Math.round(num/50)+'rem';
  }

  // 检测滑动操作
  checkTouch(){

  }    
  
}
