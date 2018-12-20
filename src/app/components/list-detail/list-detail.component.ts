import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import BScroll from 'better-scroll';
import $ from 'jquery';
import { tool } from 'scripts/tool'

@Component({
  selector: 'app-list-detail',
  templateUrl: './list-detail.component.html',
  styleUrls: ['./list-detail.component.scss']
})
export class ListDetailComponent implements OnInit {

  private scroll: BScroll;
  private scrollY: number;
  private headerHeight: number;
  private headerTitleHeight: number;
  private currentLabels : Array<string> = [];
  private labelIndex: number = 5;
  private labelClass: any = "";
  private lableOnoff: boolean = true;



  @ViewChild('scroll') scrollEl: ElementRef;
  @Input('detailLabels') lables: Array<string>;

  constructor() { }

  ngOnInit() {
    
    this.scrollEl.nativeElement.style.height = '';

    // 初始化
    let setTimer: any = setTimeout(() => {
      this.scroll = new BScroll(this.scrollEl.nativeElement, {bounce: true, probeType: 3,click: true});
      //初始化事件监听
      this.listenerEvent();
      // 初始化lables数组
      this.initLbales();
      //清除定时器
      window.clearTimeout(setTimer);
    }, 150); 

    // 定时执行lable动画
     this.labelAnimation();
  }

  // label 标签 定时循环动画
  labelAnimation(): void{
      let timer: any = setInterval(() => {
          this.labelIndex++;
          this.initLbales();
          this.activeLableMotion();
      },2000);
  }

  // 标签运动方法
  styleMethod01(i): any {
      const _class = { 
          'rotateOutUpRight': i == 0,
          'rotateInUpRight': i == this.currentLabels.length - 1,
          'fadeInUp': i == 3
      };
      return _class;
  }

  // 执行label 无缝滚动动效动画
  activeLableMotion(): void {

  }    


  // 初始化 lable选项
  initLbales(): void{
      let len: number = 5;
      this.currentLabels = tool.getTargetArrByIndex(this.lables,this.labelIndex,len);
  }


  listenerEvent(): void {

      //获取header的高度
      this.headerHeight = $('.detail-header').height();
      this.headerTitleHeight = $('.detail-header-title').height();

      this.scroll.on('scroll',(pos) => {
          this.scrollY = pos.y;

          if(this.scrollY < 0){  //判断在上半部分
              this.slideUpFn();
          }else{                 //判断在下半部分
              this.slideDownFn();
          }
      })
  }

  slideUpFn(): void {

      let checkHeight: number = this.headerTitleHeight;
      let disHeight: number = this.headerHeight + this.scrollY;
      let basicBlurPX: number = 15;
      let currentBlur: number = Math.floor((Math.abs(this.scrollY) / (this.headerHeight - checkHeight)) * basicBlurPX);

      if(disHeight < checkHeight){
          // 回到底层
          $('.detail-scroll-overflow').css({ 'zIndex': 0 });
          $('.detail-header').css({ 'transform':'translate3d(0,'+(checkHeight-this.headerHeight)+'px,0)' });

      }else{
          // 去到顶层
          $('.detail-scroll-overflow').css({'zIndex': 1});
          // 背景图片放大倍数归位
          $('.detail-header-img').css('transform','scale(1)');
          // 图片模糊
          $('.detail-header-img').css({'filter': 'blur('+currentBlur+'px)' });
          // header 跟随移动
          $('.detail-header').css({ 'transform':'translate3d(0,'+this.scrollY+'px,0)' });
          // 阴影层出现
          $('.dh-mask').css('opacity',currentBlur/basicBlurPX);
      }

  }

  slideDownFn(): void {
      let checkHeight: number = 0;
      let disHeiight: number = 700;
      let scaleValue: number = this.scrollY/disHeiight +1;
      
      if(scaleValue > 1){
          $('.detail-header').css({ 'transform': 'translate3d(0,0,0)' });
          $('.detail-header-img').css({ 'transform': 'scale('+scaleValue+')' });
      }else{
          $('.detail-header-img').css('transform','scale(1)');
      }
  }

}
