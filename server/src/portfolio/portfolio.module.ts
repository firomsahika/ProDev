import { Module } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { PortfolioController } from './portfolio.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [PortfolioController],
  providers: [PortfolioService],
  imports:[DatabaseModule]
})
export class PortfolioModule {}
