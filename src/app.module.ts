import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Database } from './database/data-source';
import { StocksModule } from './modules/stocks/stocks.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(Database),
    StocksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
