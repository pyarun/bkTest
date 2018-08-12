import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'games',
  template: `
  <router-outlet></router-outlet>
  `,
  styles: []
})
export class GamesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
