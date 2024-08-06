import { Component } from '@angular/core';
import { OrdersTableComponent } from './components/orders-table/orders-table.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [OrdersTableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
