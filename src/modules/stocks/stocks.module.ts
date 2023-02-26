import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stocks } from '../../database/entity/Stock';
import { StocksController } from './stocks.controller';
import { StocksService } from './stocks.service';
import { StocksRepository } from './stocks.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Stocks]),
  ],
  controllers: [StocksController],
  providers: [StocksService, StocksRepository],
  exports: [TypeOrmModule]
})
export class StocksModule {}

