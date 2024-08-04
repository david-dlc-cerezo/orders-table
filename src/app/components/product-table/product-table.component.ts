import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Product } from '../../models/product.model';
import { ProductLineTextPipe } from '../../pipes/product-line-text.pipe';
import { ProductsService } from '../../services/products.service';
import { StatusComponent } from '../status/status.component';

@Component({
  selector: 'cmx-product-table',
  standalone: true,
  imports: [StatusComponent, MatTableModule, DatePipe, ProductLineTextPipe],
  templateUrl: './product-table.component.html',
  styleUrl: './product-table.component.scss',
})
export class ProductTableComponent implements OnInit {
  public products: Product[] = [];

  public displayedColumns: Array<keyof Product> = [
    'status',
    'order_number',
    'product_line',
    'name',
    'quantity',
    'date_requested',
  ];

  constructor(private readonly productsService: ProductsService) {}

  ngOnInit(): void {
    this.productsService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
      },
      error: (error) => {
        console.error(error);
        this.products = [];
      },
    });
  }
}
