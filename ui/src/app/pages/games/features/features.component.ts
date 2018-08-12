import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss']
})
export class FeaturesComponent implements OnInit {
  tabs = [
    {
      title: 'Records',
      route: '/pages/features',
    }
  ];
  constructor() { }

  ngOnInit() {
  }

}
