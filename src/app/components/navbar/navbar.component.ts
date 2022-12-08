import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  
  navItems: any[] = [
    {
      label: 'Home',
      routerLink: '/',
      isRouterActiveExact: true,
    },
    {
      label: 'Login',
      routerLink: '/login',
      isRouterActiveExact: false,
    },
  ];
}
