import { Component, OnInit, Input } from '@angular/core';
import { SpaConfigService } from 'src/spa/services/spa-config.service';
import { UserApi } from 'src/spa/users/users-api';

@Component({
  selector: 'spa-nav-profile',
  templateUrl: './nav-profile.component.html',
  styleUrls: ['./nav-profile.component.css']
})
export class NavProfileComponent implements OnInit {
  showLoader: boolean; 

  @Input() showIcon

  constructor(public appConfigService: SpaConfigService, private userApi: UserApi) { }

  ngOnInit() {
    this.showLoader = false;
  }

  signOut() {
    this.showLoader = true;
    setTimeout(() => {this.userApi.signOut(); }, 2000)
    console.log('Sign out!')
  }

}
