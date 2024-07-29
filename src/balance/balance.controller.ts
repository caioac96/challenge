import { Controller, Get, Query, Response } from '@nestjs/common';
import { BalanceService } from './balance.service';
import { Response as IResponse } from 'express';

@Controller('balance')
export class BalanceController {
    constructor(private readonly balanceService: BalanceService) { }

    @Get('/')
    getBalance(@Response() res: IResponse, @Query('account_id') account_id: string) {
        if (!account_id) return { message: "Invalid ID" };
        const balance = this.balanceService.getBalance(account_id);
        if (!balance) return res.status(404).send("0");
        else return res.status(200).send(`${balance}`);
    }

}
