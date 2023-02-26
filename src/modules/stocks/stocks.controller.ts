import { Controller, Get, Query } from '@nestjs/common';
import { FindStocksYear } from './dto/find-stocks.dto';
import { StocksService } from './stocks.service';

@Controller('stocks')
export class StocksController {
  constructor(private readonly stocksService: StocksService) {}

  @Get()
  async findStocks(@Query() params: FindStocksYear) {
    return this.stocksService.findStocksByYear(params);
  }
}
