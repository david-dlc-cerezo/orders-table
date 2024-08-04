import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ProductStatus } from '../../models/product.model';

const statusTexts: Record<ProductStatus, string> = {
  [ProductStatus.Completed]: 'Completed',
  [ProductStatus.InProgress]: 'In Progress',
  [ProductStatus.Pending]: 'Pending',
};

@Component({
  selector: 'cmx-status',
  standalone: true,
  imports: [NgClass],
  templateUrl: './status.component.html',
  styleUrl: './status.component.scss',
})
export class StatusComponent {
  @Input() status?: ProductStatus;

  @Input() withColor = false;

  get statusText(): string {
    return this.status ? statusTexts[this.status] : '';
  }
}
