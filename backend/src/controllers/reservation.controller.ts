import { Controller, Post, Body, Req } from '@nestjs/common';
import { ReservationService } from 'src/services/reservation.service';
import { Request } from 'express';



@Controller('reservation')
export class ReservationController {
    constructor(private readonly reservationService: ReservationService) {}

    @Post()
    async makeReservation(@Body() data: any, @Req() req: Request) {
        const { id } = req.user
        const reservation = await this.reservationService.makeReservation(data, id);
        return reservation;
    }
}
