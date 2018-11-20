import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css','../../node_modules/animate.css/animate.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  title = 'ng-my-app';

  ngOnInit(){
      console.log('rem');
      this.initRem();
  }

  // 初始化移动端布局
  initRem() : void {

    // 动态设置meta标签的方法倍数
    let scale: number = 1 / devicePixelRatio;
    document.querySelector('meta[name="viewport"]').setAttribute('content','initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');

     // 动态设置根节点的字体大小
    function getSize(): number {

        let html: any = document.documentElement || document.getElementsByTagName('html')[0];
        let htmlWidth: number = html.clientWidth;
        let fontSize: number = htmlWidth/15;
        html.style.fontSize = fontSize + 'px';

        return fontSize;
    }

    getSize();
    window.addEventListener('resize',getSize);
  }

}
