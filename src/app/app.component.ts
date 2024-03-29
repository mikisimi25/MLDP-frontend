import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  public title = 'MLDP';

  constructor(
    private as: AuthService,
    private primengConfig: PrimeNGConfig
  ) {
    this.as.recoverUserData()
  }

  ngOnInit() {
    this.primengConfig.ripple = true;
  }

}
