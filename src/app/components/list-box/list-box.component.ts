import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-list-box',
  templateUrl: './list-box.component.html',
  styleUrls: ['./list-box.component.scss']
})
export class ListBoxComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  }

  // 点击触发卡片变大
  changeBigCard(event: any): void{
      //1. 盒子变大
      
  }

  calcs(num: number): string {
      return Math.round(num/50)+'rem';
  }

}
