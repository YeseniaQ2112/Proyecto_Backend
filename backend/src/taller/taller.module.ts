import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Taller } from './taller.entity';
import { TallerService } from './taller.service';
import { TallerController } from './taller.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Taller])],
  providers: [TallerService],
  controllers: [TallerController],
})
export class TallerModule {}
