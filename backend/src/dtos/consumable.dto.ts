import { ConsumableType } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';


export class ConsumableRequestDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    price: string;

    @IsNotEmpty()
    @IsEnum(ConsumableType)
    type: ConsumableType;
}

export class ConsumableResponseDto extends ConsumableRequestDto {

    @IsNumber()
    id: number;
}
