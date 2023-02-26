import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Database } from '../../database/data-source';
import { Stocks, StocksType } from '../../database/entity/Stock';
import { StocksRepository } from './stocks.repository';
import { StocksService } from './stocks.service';

describe('Stocks', () => {
  let stocksService: StocksService;
  let stocksRepository: StocksService;

  beforeAll(async () => {
    const stocks: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(Database), TypeOrmModule.forFeature([Stocks])],
      providers: [StocksRepository, StocksService],
    }).compile();

    stocksService = stocks.get<StocksService>(StocksService);
    stocksRepository = stocks.get<StocksService>(StocksService);
  });

  describe('Find stocks', () => {

    it("Stocks found successfully.", async () => {
      const expected = { year: 2012, type: StocksType.MGLU3 }
      //@ts-ignore
      const response = await stocksService.findStocksByYear(expected);
      expect(response.length > 1).toBe(true);
    });

    it("In case the year is invalid.", async () => {
      const expected = { year: 'j', type: StocksType.VALE3 }
      try {
        await stocksService.findStocksByYear(expected);
      } catch (error) {
        expect(error.status).toBe(400);
      }
    });

    it("In case the type is wrong.", async () => {
      const expected = { year: 2012, type: 'test' }
      try {
        //@ts-ignore
        await stocksService.findStocksByYear(expected)
      } catch (error) {
        expect(error.status).toBe(400);
      }
    });

    it("When not finding the year in the database.", async () => {
      const expected = { year: 1997, type: StocksType.VALE3 }
      try {
        // @ts-ignore
        await stocksService.findStocksByYear(expected)
      } catch (error) {
        expect(error.message).toBe('Error: Nenhuma ação encontrada nesse ano.');
      }
    });

  });


});
