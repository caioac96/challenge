import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { response } from 'express';
import fs = require('fs');

@Injectable()
export class BalanceService {
    getBalance(account_id: string) {
        let ret;
        const id = Number(account_id);
        const database = fs.readFileSync(('./src/fakedatabase.txt'), 'utf8').split(/\r?\n/);
        for (const line of database) {
            if (line === 'accounts') continue;
            const account = JSON.parse(line);
            if (id === account?.account_id) {
                ret = account?.balance;
                break;
            }
            else ret = 0;
        }
        return ret;
    }
}
