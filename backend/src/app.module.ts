import { Module } from '@nestjs/common';
import { AuthModule } from './auth.module';
import { ConsumableModule } from './consumable.module';
import { ReservationModule } from './reservations.module';

@Module({
  imports: [
    ConsumableModule,
    ReservationModule,
    AuthModule,
  ]
})
export class AppModule {}
