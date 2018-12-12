import { Component, OnInit } from '@angular/core';
import { Lists } from './lists';
import * as $ from 'jquery';
import { tool } from 'scripts/tool';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss']
})
export class ListPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
      this.touchEvenet();
  }

  lists: Array<any> = Lists;
  cindex: number = 2;
  clist: number = 0;
  needLists: Array<any> = this.getListArr(this.clist);


  // 获取需要的5个显示项
  getListArr(index: number): any[] {
    let center = this.lists.length + index;
    let length = 5;
    let backupArr1: any[] = JSON.parse(JSON.stringify([...this.lists,...this.lists]));

    // 向右超出边界
    if(center+3 >= backupArr1.length){
      center = this.lists.length - 3;
      this.clist = -3;
    }

    // 向左超出边界
    if(center - 2 <= 0){
      center = this.lists.length + 2;
      this.clist = 2;
    }

    let arr : Array<any> = backupArr1.slice(center-2,center+length-2);

    return arr;
  }

  //初始化位置及其状态
  initPoistionStatus(): void{

  }

  // 滑动事件触发
  touchEvenet(): void{
    
    let startX: number = 0;
    let startY: number = 0;
    let disX: number = 0;
    let disY: number = 0;
    let self: ListPageComponent = this;
    let touchOnoff: boolean = true;

    $('.list-motion-box').on('touchstart',function(e){
     
      if(!touchOnoff){
        return;
      }
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      disX = 0;
      disY = 0;
      $('.list-box-container-active').css({'transition':'0s'});

    });
    $('.list-motion-box').on('touchmove',function(e){
      
      if(!touchOnoff){
        return;
      }

      let endX = e.targetTouches[0].clientX;
      let endY = e.targetTouches[0].clientY;

      disX = endX - startX;
      disY = endY - startY;

      let deg = tool.getDegByPostion(disX,-disY);
      $('.list-box-container-active').css({
        'transform': `translate3d(${disX}px,${disY}px,0) rotate3d(0,0,1,${deg/10}deg)`,
        'filter': `blur(${5}px)`
      });

    });
    $('.list-motion-box').on('touchend',function(e){
      
      //如果没有越界
      if(!tool.checkDisCross(disX,disY,120)){
        // 恢复之前状态
        $('.list-box-container-active').css({
          'transition': 'ease .5s',
          'transform': `translate3d(0,0,0) rotate3d(0,0,1,0deg)`,
          'filter': 'blur(0)'
        });
        return;
      }

      touchOnoff = false;

      // 整体位置移动 且修改cindex的值
      let basicWidth : number = parseInt($('.list-box-container').css('width'));
      let basicRem: number = tool.calcRemValue(basicWidth);
      let direc = 1;

      if(disX <= 0 ){
        direc = -1;
      }else{
        direc = 1;
      }

       $('.list-box-container').each(function(index,item){
          $(item).removeClass('list-box-container-active');
          $(item).css({
            'transition': '.8s ease',
            'transform': `translate3d(${direc*basicRem}rem,0,0) scale(0.88)`
          });
      });

      let virtualIndex: number = self.cindex - direc;
      $('.list-box-container').eq(virtualIndex).addClass('list-box-container-active').css('transform',`translate3d(${direc*basicRem}rem,0,0) scale(1)`);

      let timer: number = window.setTimeout(() => {
        touchOnoff = true;
        $('.list-box-container').attr('style','').removeClass('list-box-container-active');
        self.clist = self.clist - direc;
        self.needLists = self.getListArr(self.clist);
        window.clearTimeout(timer);
      },800);

    });

  }
}
