import { IsNumber, IsNotEmpty } from 'class-validator';

export class BalanceDto {
    @IsNotEmpty()
    @IsNumber()
    account_id: number;
}
