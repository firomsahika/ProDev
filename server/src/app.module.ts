import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModuleModule } from './auth-module/auth-module.module';
import { PortfolioModule } from './portfolio/portfolio.module';
import { UserModule } from './user/user.module';
import { FeedModule } from './feed/feed.module';

@Module({
  imports: [AuthModuleModule, PortfolioModule, UserModule, FeedModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
