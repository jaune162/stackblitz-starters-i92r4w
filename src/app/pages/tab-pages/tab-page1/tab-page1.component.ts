import { Component } from '@angular/core';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab-page1',
  standalone: true,
    imports: [
        NzButtonComponent
    ],
  templateUrl: './tab-page1.component.html',
  styleUrl: './tab-page1.component.css'
})
export class TabPage1Component {

  constructor(private router: Router) {
  }

  gotoTab2() {
    this.router.navigate(['/tabs/page2'], {
      queryParams: {
        id: '001'
      }
    })
  }
}
