import { MiddlewareConsumer, Module, RequestMethod } from "@nestjs/common";
import { PrismaService } from "prisma/prismaService";
import { ReservationService } from "./services/reservation.service";
import { ReservationController } from "./controllers/reservation.controller";
import { AuthMiddleware } from "./middleware/verifyToken";

@Module({
    providers: [ReservationService, PrismaService],
    controllers: [ReservationController]
  })
  export class ReservationModule {
    configure(consumer: MiddlewareConsumer) {
      consumer
        .apply(AuthMiddleware)
        .forRoutes({ path: 'reservation', method: RequestMethod.POST });
    }
  }
  