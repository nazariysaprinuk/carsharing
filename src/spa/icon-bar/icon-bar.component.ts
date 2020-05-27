import { Component, OnInit } from '@angular/core';
import { SpaConfigService } from '../services/spa-config.service';
import { UserApi } from '../users/users-api';

@Component({
  selector: 'spa-icon-bar',
  templateUrl: './icon-bar.component.html',
  styleUrls: ['./icon-bar.component.css']
})
export class IconBarComponent implements OnInit {
  constructor(public appConfigService: SpaConfigService) { }

  ngOnInit() {
  }

  

}
