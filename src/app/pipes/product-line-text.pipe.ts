import { Pipe, PipeTransform } from '@angular/core';
import { ProductLine } from '../models/product.model';

const productLineTexts: Record<ProductLine, string> = {
  [ProductLine.Aggregates]: 'Aggregates',
  [ProductLine.Cement]: 'Cement',
  [ProductLine.ReadyMix]: 'Ready Mix',
};

@Pipe({
  name: 'productLineText',
  standalone: true,
})
export class ProductLineTextPipe implements PipeTransform {
  transform(productLine: ProductLine): string {
    return productLineTexts[productLine];
  }
}
