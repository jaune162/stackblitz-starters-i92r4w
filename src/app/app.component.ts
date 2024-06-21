import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, ActivationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzTabsModule } from 'ng-zorro-antd/tabs';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, RouterOutlet, NzIconModule, NzLayoutModule, NzMenuModule, NzTabsModule, RouterLink],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    isCollapsed = false;
    selectedTabIndex = 0;
    tabs: any[] = [
        {
            name: '首页',
            routerLink: '/welcome',
            queryParams: {},
            closable: false
        }
    ];

    constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.router.events.subscribe(event => {
            if (event instanceof ActivationEnd) {
                const path = this.router.routerState.snapshot.url;
                const routerTitle = event.snapshot.routeConfig?.title as string;
                let tabTitle = routerTitle || '新标签页';
                if (tabTitle && path) {
                    this.addTab(tabTitle, this.tripePath(path), event.snapshot.queryParams);
                }
            }
        });

        // first load
        const path = this.router.routerState.snapshot.url;
        if (path) {
            let route = this.activatedRoute;
            while (route.firstChild) {
                route = route.firstChild;
            }
            const routerTitle = route.snapshot.routeConfig?.title as string;
            let tabTitle = routerTitle || '新标签页';
            if (tabTitle && path) {
                this.addTab(tabTitle, this.tripePath(path), route.snapshot.queryParams);
            }
        }
    }

    private tripePath(path: string) {
        if (path.indexOf('?') > 0) {
            return path.substring(0, path.indexOf('?'))
        }
        return path;
    }

    closeTab({ index }: { index: number }): void {
        this.selectedTabIndex = index - 1;
        const selectTab = this.tabs[this.selectedTabIndex];
        this.router.navigateByUrl(selectTab.routerLink).then(() => {
            this.tabs.splice(index, 1);
        })
    }

    addTab(title: string, url: string, params: any) {
        const exist = this.tabs.some((val) => val.routerLink == url);
        if (!exist) {
            this.tabs.push({
                name: title,
                routerLink: url,
                queryParams: {
                    ...params
                },
                closable: true
            })
            this.selectedTabIndex = this.tabs.length - 1;
            console.log(this.tabs);
        }
    }

}
