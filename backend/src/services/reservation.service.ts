import { Injectable, BadRequestException } from "@nestjs/common"
import { PrismaService } from "prisma/prismaService"
import { DateTime } from 'luxon'

@Injectable()
export class ReservationService {
    constructor(private readonly prismaService: PrismaService) {}

    async makeReservation(data: any, id: number) {
        try {
            const { date, numberOfPeople } = data
    
            const [dateWithoutSeconds] = date.split('.')
            const parsedDate = DateTime.fromISO(dateWithoutSeconds, { zone: 'America/Sao_Paulo' })
    
            if (!parsedDate.isValid) {
                throw new BadRequestException('Invalid reservation date')
            }
    
            const formattedDate = parsedDate.startOf('minute').toISO()
    
            const existingReservation = await this.prismaService.reservationEntity.findFirst({
                where: {
                    dayTime: formattedDate, 
                },
            });
    
            if (existingReservation) {
                throw new BadRequestException('Already exists a reservation for this date and time')
            }
    
            const user = await this.prismaService.userEntity.findUnique({ 
                where: { id: id },
                include: { reservation: true }
            });
    
            if (!user) {
                throw new BadRequestException('User not found')
            }
    
            if (user.reservation) {
                throw new BadRequestException('User already has a reservation')
            }
    
            const newReservation = await this.prismaService.reservationEntity.create({ 
                data: {
                    dayTime: formattedDate,
                    numberOfPeople: numberOfPeople,
                    user: { connect: { id: id } },
                }
            });
    
            return newReservation;
        
        } catch (error) {
            console.error(error)
            throw new Error ('Error at creating reservation')
        }
    }
}
