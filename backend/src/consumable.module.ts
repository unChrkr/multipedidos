import { Module } from "@nestjs/common";
import { PrismaService } from "prisma/prismaService";
import { ConsumableController } from "./controllers/consumable.controller";
import { ConsumableService } from "./services/consumable.service";

@Module({
    providers: [ConsumableService, PrismaService],
    controllers: [ConsumableController]
})

export class ConsumableModule {}