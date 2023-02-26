import { BadRequestException, Injectable } from '@nestjs/common';
import { Stocks } from '../../database/entity/Stock';
import { FindStocksYear } from './dto/find-stocks.dto';
import { StocksResponseInterface } from './stocks.interface';
import { StocksRepository } from './stocks.repository';

@Injectable()
export class StocksService {
  constructor(
    private stocksRepository: StocksRepository,
  ) { }

  public async findStocksByYear(data: FindStocksYear): Promise<StocksResponseInterface[]> {
    try {
      const { type, year } = data;
      const [initial_date, end_date] = [`${year}-01-01`, `${year}-12-31`];

      const stocks = await this.stocksRepository.findStocksByYear(initial_date, end_date, type);

      if (stocks.length === 0) {
        throw new Error('Error: Nenhuma ação encontrada nesse ano.')
      }

      const newStocks = this.formatMoth(stocks);

      const formatStocks = newStocks.map(it => this.format(it));

      return formatStocks.flat();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  private formatMoth(stocks: Stocks[]) {
    const months = [];
    const month = this.formatDate;

    stocks.map(it => {
      const lastInfo = months[months.length - 1];

      if (!lastInfo) {
        return months.push([it])
      }

      if (month(lastInfo[0].date) === month(it.date)) {
        return months[lastInfo.push(it)]
      }

      return months.push([it]);
    });
    return months;
  }

  private formatDate(value: string) {
    const mouth = value.split('-')[1];
    return mouth;
  }

  private format(stocks: Stocks[]) {
    const volume = stocks.reduce((total, number) => total + number.volume, 0)
    const open_price = stocks.map(it => it.open)[0];
    const close_price = stocks.map(it => it.close)[stocks.length - 1];
    const highest_price = Math.max(...stocks.map(it => it.high));
    const lowest_price = Math.min(...stocks.map(it => it.low));

    const response = {
      open_price, highest_price, lowest_price, volume, close_price,
    }

    return this.mouthName(stocks[0].date, response);
  }

  private mouthName(value: string, data: StocksResponseInterface) {
    const response = [];
    switch (this.formatDate(value)) {
      case '01':
        response.push({ month: 'January', ...data });
        return response;
      case '02':
        response.push({ mounth: 'February', ...data });
        return response;;
      case '03':
        response.push({ mounth: 'March', ...data });
        return response;
      case '04':
        response.push({ mounth: 'April', ...data });
        return response;
      case '05':
        response.push({ mounth: 'May', ...data });
        return response;
      case '06':
        response.push({ mounth: 'June', ...data });
        return response;
      case '07':
        response.push({ mounth: 'July', ...data });
        return response;
      case '08':
        response.push({ mounth: 'August', ...data });
        return response;
      case '09':
        response.push({ mounth: 'September', ...data });
        return response;
      case '10':
        response.push({ mounth: 'Octobe', ...data });
        return response;
      case '11':
        response.push({ mounth: 'November', ...data });
        return response;
      case '12':
        response.push({ mounth: 'December', ...data });
        return response;
      default:
        return;
    }
  }
}
