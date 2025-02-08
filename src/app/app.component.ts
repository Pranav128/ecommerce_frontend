import { Component } from '@angular/core';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { SearchComponent } from './components/search/search.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { LoginStatusComponent } from './components/login-status/login-status.component';
import { LoginComponent } from './components/login/login.component';
import { CartStatusComponent } from './components/cart-status/cart-status.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone:true,
  imports :[ProductCategoryMenuComponent,SearchComponent,RouterOutlet,CartDetailsComponent,LoginStatusComponent,LoginComponent,CartStatusComponent,RouterLink]
})
export class AppComponent {
  title = 'angular-ecommerce';
}
