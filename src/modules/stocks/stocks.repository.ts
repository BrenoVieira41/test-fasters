import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { Stocks, StocksType } from '../../database/entity/Stock';

export class StocksRepository {
  constructor(
    @InjectRepository(Stocks)
    private stocksRepository: Repository<Stocks>,
  ) {}

  async findStocksByYear(initial_date, end_date, type): Promise<Stocks[]> {
    return this.stocksRepository.find({
      where: {
        date: Between(initial_date, end_date),
        type: type
      },
      order: { date: 'ASC' }
    })
  }
}

