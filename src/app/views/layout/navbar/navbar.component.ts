import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {filter, map, mergeMap, Subject, takeUntil} from "rxjs";
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit, OnDestroy {
  data!: any;
  private _destroy$ = new Subject();

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private titleService: Title,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map(route => {
          while (route.firstChild) {
            route = route.firstChild;
          }

          return route;
        }),
        filter(route => route.outlet === 'primary'),
        mergeMap(route => route.data),
        takeUntil(this._destroy$)
      )
      .subscribe((event: any) => {
        this.data = event;
        this.titleService.setTitle(`Admin - ${event.title}`);
      });
  }

  ngOnInit(): void {
  }

  toggleSidebar(e: any) {
    e.preventDefault();
    this.document.body.classList.toggle('sidebar-open');
  }

  ngOnDestroy() {
    this._destroy$.next(null);
    this._destroy$.complete();
  }

}
