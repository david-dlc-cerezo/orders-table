import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product, ProductLine, ProductStatus } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor() {}

  getProducts(): Observable<Product[]> {
    return of([
      {
        status: ProductStatus.InProgress,
        order_number: 3301,
        product_line: ProductLine.ReadyMix,
        name: '1-200-2-C-28-12-1-3-000',
        quantity: { amount: 12, units: 'm3' },
        date_requested: new Date('2022-10-22'),
      },
      {
        status: ProductStatus.Pending,
        order_number: 3305,
        product_line: ProductLine.Cement,
        name: 'Gris CPC 30 R Monterrey Extra 50Kg.',
        quantity: { amount: 10, units: 'TN' },
        date_requested: new Date('2022-10-10'),
      },
      {
        status: ProductStatus.Pending,
        order_number: 3290,
        product_line: ProductLine.Aggregates,
        name: 'Arena Triturada Caliza Malla 4',
        quantity: { amount: 2, units: 'TN' },
        date_requested: new Date('2022-09-29'),
      },
      {
        status: ProductStatus.Completed,
        order_number: 3184,
        product_line: ProductLine.Aggregates,
        name: 'Arena Triturada Caliza Malla 4',
        quantity: { amount: 5, units: 'TN' },
        date_requested: new Date('2022-05-14'),
      },
      {
        status: ProductStatus.Completed,
        order_number: 3295,
        product_line: ProductLine.Cement,
        name: 'Gris CPC30R Tolteca Extra 50Kg.',
        quantity: { amount: 12, units: 'TN' },
        date_requested: new Date('2022-04-05'),
      },
      {
        status: ProductStatus.Completed,
        order_number: 2994,
        product_line: ProductLine.ReadyMix,
        name: '1-200-2-C-28-12-1-3-000',
        quantity: { amount: 15.5, units: 'm3' },
        date_requested: new Date('2022-03-10'),
      },
    ]);
  }
}
