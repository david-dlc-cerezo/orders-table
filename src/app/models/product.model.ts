export enum ProductStatus {
  InProgress = 'IN_PROGRESS',
  Pending = 'PENDING',
  Completed = 'COMPLETED',
}

export enum ProductLine {
  ReadyMix = 'REAY_MIX',
  Cement = 'CEMENT',
  Aggregates = 'AGGREGATES',
}

export type Order = {
  status: ProductStatus;
  order_number: number;
  product_line: ProductLine;
  name: string;
  quantity: {
    amount: number;
    units: 'm3' | 'TN';
  };
  date_requested: Date;
};
