import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {
  tabs = [
    {
      title: 'Records',
      route: '/pages/sales',
    }
  ];
  constructor() { }

  ngOnInit() {
  }

}
