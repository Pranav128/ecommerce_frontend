import {CurrencyPipe, NgFor} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {ProductCategory} from '../../common/product-category';
import {ProductService} from '../../services/product.service';

@Component({
  selector: 'app-product-category-menu',
  templateUrl: './product-category-menu.component.html',
  styleUrls: ['./product-category-menu.component.css'],
  standalone: true,
  imports :[NgFor,RouterLink,CurrencyPipe]
})
export class ProductCategoryMenuComponent implements OnInit {

  productCategories!: ProductCategory[];
  
  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.listProductCategories();
  }

  listProductCategories() {

    this.productService.getProductCategories().subscribe(
      data => {
        console.log('Product Categories=' + JSON.stringify(data));
        this.productCategories = data;
      }
    );
  }

}
