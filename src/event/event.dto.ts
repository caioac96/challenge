import { IsNumber, IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class EventDto {
    @IsNotEmpty()
    @IsString()
    type: string;

    @IsNotEmpty()
    @IsString()
    destination: string;

    @IsOptional()
    @IsString()
    origin: string;

    @IsNotEmpty()
    @IsNumber()
    amount: number;
}
