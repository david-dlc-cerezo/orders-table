import { Component } from '@angular/core';
import { ProductTableComponent } from './components/product-table/product-table.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProductTableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
