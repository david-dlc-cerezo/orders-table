import { BreakpointObserver } from '@angular/cdk/layout';
import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {
  DateAdapter,
  MAT_DATE_LOCALE,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { debounceTime, Subscription, switchMap, tap } from 'rxjs';
import { Order, ProductLine, ProductStatus } from '../../models/product.model';
import { ProductLineTextPipe } from '../../pipes/product-line-text.pipe';
import { CustomDateAdapter } from '../../providers/custom-date-adpter.provider';
import { OrdersService } from '../../services/orders.service';
import { StatusComponent } from '../status/status.component';

@Component({
  selector: 'cmx-orders-table',
  standalone: true,
  imports: [
    StatusComponent,
    DatePipe,
    ProductLineTextPipe,
    ReactiveFormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatSelectModule,
    MatExpansionModule,
  ],
  providers: [
    provideNativeDateAdapter(),
    {
      provide: DateAdapter,
      useClass: CustomDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline', subscriptSizing: 'dynamic' },
    },
  ],
  templateUrl: './orders-table.component.html',
  styleUrl: './orders-table.component.scss',
})
export class OrdersTableComponent implements OnInit, OnDestroy {
  public orders: Order[] = [];

  public displayedColumns: Array<keyof Order> = [
    'status',
    'order_number',
    'product_line',
    'name',
    'quantity',
    'date_requested',
  ];

  public filterForm = new FormGroup({
    order_number: new FormControl<number | null>(null),
    status: new FormControl<ProductStatus[]>([]),
    product_line: new FormControl<ProductLine | ''>(''),
    date_requested: new FormGroup({
      from: new FormControl<Date | null>(null),
      to: new FormControl<Date | null>(null),
    }),
  });

  public filterExpanded = true;

  public allStatuses = Object.values(ProductStatus);

  public allProductLines = Object.values(ProductLine);

  private subscriptions = new Subscription();

  constructor(
    private readonly ordersService: OrdersService,
    private readonly breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
    // Initial data lodad
    this.ordersService.getOrders().subscribe({
      next: (orders) => {
        this.orders = orders;
      },
      error: (error) => {
        console.error(error);
        this.orders = [];
      },
    });

    // Screen Responsive
    this.subscriptions.add(
      this.breakpointObserver.observe(['(min-width: 1180px)']).subscribe({
        next: ({ matches }) => {
          this.filterExpanded = matches;
        },
        error: console.error,
      })
    );

    // Filter data
    this.subscriptions.add(
      this.filterForm.valueChanges
        .pipe(
          debounceTime(300),
          tap(console.debug),
          switchMap((filter) => this.ordersService.getOrders(filter))
        )
        .subscribe({
          next: (orders) => {
            this.orders = orders;
          },
          error: (error) => {
            console.error(error);
          },
        })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  updateSelectedStatuses(status: ProductStatus, checked: boolean): void {
    if (checked) {
      // Add checked
      if (!this.filterForm.value.status?.includes(status)) {
        this.filterForm.value.status?.push(status);
      }
    } else {
      // Remove unchecked
      this.filterForm.controls.status.setValue(
        this.filterForm.value.status?.filter((s) => s !== status) ?? []
      );
    }
    this.filterForm.controls.status.updateValueAndValidity();
  }
}
