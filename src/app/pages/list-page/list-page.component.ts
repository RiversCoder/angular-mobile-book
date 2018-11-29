import { Component, OnInit } from '@angular/core';
import { Lists } from './lists';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss']
})
export class ListPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
      
  }

  lists: Array<any> = Lists;
  cindex: number = 0;
  needLists: Array<any> = this.getListArr(0);


  // 获取需要的5个显示项
  getListArr(index: number): any[] {
    let backupArr: any[] = JSON.parse(JSON.stringify(this.lists));  
    let arr : Array<any> = [...backupArr.reverse().slice(index,index+2).reverse(),...this.lists.slice(index,index+3)];
    return arr;
  }



}
