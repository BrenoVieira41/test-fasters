import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

export enum StocksType {
  MGLU3 = 'MGLU3',
  PETR4 = 'PETR4',
  VALE3 = 'VALE3',
}

@Entity({ name: 'stocks' })
export class Stocks {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  date: string;

  @Column({ type: 'float' })
  open: number;

  @Column({ type: 'float' })
  high: number;

  @Column({ type: 'float' })
  low: number;

  @Column({ type: 'float' })
  close: number;

  @Column({ type: 'float' })
  adj_close: number;

  @Column({ type: 'float' })
  volume: number;

  @Column({ type: 'enum', enum: StocksType })
  type: StocksType;
}
