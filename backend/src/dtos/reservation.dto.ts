import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class MakeReservationDto {
    
    @IsNotEmpty()
    @IsDateString()
    @IsNotEmpty()
    date: string;

    @IsNotEmpty()
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsNumber()
    @IsNotEmpty()
    numberOfPeople: number;
}
