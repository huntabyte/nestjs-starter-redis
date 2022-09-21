import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { UsersModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item, User } from 'src/utils/typeorm';
import { Services } from 'src/utils/constants';

@Module({
  imports: [TypeOrmModule.forFeature([Item, User]), UsersModule],
  providers: [
    {
      provide: Services.ITEMS,
      useClass: ItemsService,
    },
  ],
  controllers: [ItemsController],
})
export class ItemsModule {}
