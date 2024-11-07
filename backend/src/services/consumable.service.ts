import { Injectable } from "@nestjs/common";
import { PrismaService } from "prisma/prismaService";
import { ConsumableResponseDto } from "src/dtos/consumable.dto";


@Injectable() 
export class ConsumableService {
    constructor(private readonly prismaService: PrismaService) {}

    async getConsumables(): Promise<ConsumableResponseDto[]> {
        try {
            const allConsumable = await this.prismaService.consumableEntity.findMany()
             return allConsumable
        } catch (error) {
            console.error(error)
            throw new Error('Error at get all consumables')
        }
    }
}

