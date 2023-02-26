import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumberString } from 'class-validator';
import { StocksType } from '../../../database/entity/Stock';

export class FindStocksYear {
  @ApiProperty()
  @IsNumberString({}, { message: 'Error: É esperado um ano.' })
  year: string;

  @ApiProperty()
  @IsEnum(StocksType, { message: 'Error: Ação ainda não adicionada'})
  type: StocksType;
}
