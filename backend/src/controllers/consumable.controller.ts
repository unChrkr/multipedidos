import { Controller, Get } from "@nestjs/common";
import { ConsumableResponseDto } from "src/dtos/consumable.dto";
import { ConsumableService } from "src/services/consumable.service";

@Controller('menu')
export class ConsumableController{
    constructor( private readonly consumableService: ConsumableService) {}

    @Get()
    async getAllConsumablesType(): Promise<ConsumableResponseDto[]> {
        const allConsumables = await this.consumableService.getConsumables()
        return allConsumables
    }
}
