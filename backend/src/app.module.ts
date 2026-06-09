import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TallerModule } from './taller/taller.module';
import { AgenteModule } from './agente/agente.module';
import { Taller } from './taller/taller.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
  type: 'sqlite',
  database: 'database.sqlite',
  entities: [Taller],
  synchronize: true,
})
    TallerModule,
    AgenteModule,
  ],
})
export class AppModule {}
