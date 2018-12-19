import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import BScroll from 'better-scroll';
//declare let BScroll;

@Component({
  selector: 'app-better-scroll',
  templateUrl: './better-scroll.component.html',
  styleUrls: ['./better-scroll.component.scss']
})
export class BetterScrollComponent implements OnInit {

  @ViewChild('scroll') scrollEl: ElementRef;
  @Input()
  private height: number;

  public scroll;  
  constructor() { }

  ngOnInit() {
      
      // 设置高度
    this.scrollEl.nativeElement.style.height = `${this.height}px`; 

      // 初始化
    setTimeout(() => {
      this.scroll = new BScroll(this.scrollEl.nativeElement, {click: true});
    }, 20); 
  }


}
