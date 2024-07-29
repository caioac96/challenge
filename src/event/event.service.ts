import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import fs = require('fs');
import { EventDto } from './event.dto';

@Injectable()
export class EventService {
    transaction(data: EventDto) {
        let newBalance = 0;
        const destination = Number(data.destination);
        const type = data.type;
        const amount = data?.amount;

        if (!type) {
            throw new HttpException('We need a transaction type!', HttpStatus.NOT_FOUND);
        }

        const database = fs.readFileSync(('./src/fakedatabase.txt'), 'utf8').split(/\r?\n/);
        const existsDestination = database.filter((line) => {
            if (line.includes(`"account_id":${destination},`)) return line
        })

        if (type === "transfer") {
            const origin = Number(data.origin);

            const existsOrigin = database.filter((line) => {
                if (line.includes(`"account_id":${origin},`)) return line
            })
            if (existsOrigin.length === 0) {
                return existsOrigin.length;
            }
            fs.writeFileSync('./src/fakedatabase.txt', '');
            fs.writeFileSync('./src/fakedatabase.txt', 'accounts');
            let newBalanceOrigin = 0;
            let newBalanceDestination = 0;

            if (existsDestination.length == 0) {
                const newAccount = { "account_id": destination, "balance": data?.amount };
                newBalanceDestination = data?.amount;
                fs.appendFile("./src/fakedatabase.txt", `\n${JSON.stringify(newAccount)}`, (err) => {
                    return err;
                });
            }

            for (const line of database) {
                if (line === 'accounts') continue;
                const account = JSON.parse(line);
                if (destination === account?.account_id) {
                    newBalanceDestination = account?.balance + amount;
                    const newLine = { "account_id": destination, "balance": newBalanceDestination };
                    fs.appendFile("./src/fakedatabase.txt", `\n${JSON.stringify(newLine)}`, (err) => {
                        return err;
                    });
                }
                else if (origin === account?.account_id) {
                    newBalanceOrigin = account?.balance - amount;
                    const newLine = { "account_id": origin, "balance": newBalanceOrigin };
                    fs.appendFile("./src/fakedatabase.txt", `\n${JSON.stringify(newLine)}`, (err) => {
                        return err;
                    });
                }
                else {
                    fs.appendFile("./src/fakedatabase.txt", `\n${JSON.stringify(account)}`, (err) => {
                        return err;
                    });
                }
            }
            return { origin: { "id": `${origin}`, "balance": newBalanceOrigin }, destination: { "id": `${destination}`, "balance": newBalanceDestination } };
        }
        else if (type == "withdraw") {
            const origin = Number(data.origin);
            let newBalanceOrigin = 0;

            const existsOrigin = database.filter((line) => {
                if (line.includes(`"account_id":${origin},`)) return line
            })

            if (existsOrigin.length == 0) {
                return existsOrigin.length;
            }
            fs.writeFileSync('./src/fakedatabase.txt', '');
            fs.writeFileSync('./src/fakedatabase.txt', 'accounts');
            for (const line of database) {
                if (line === 'accounts') continue;
                const account = JSON.parse(line);
                if (origin === account?.account_id) {
                    newBalanceOrigin = account?.balance - amount;
                    const newLine = { "account_id": origin, "balance": newBalanceOrigin };
                    fs.appendFile("./src/fakedatabase.txt", `\n${JSON.stringify(newLine)}`, (err) => {
                        return err;
                    });
                }
                else {
                    fs.appendFile("./src/fakedatabase.txt", `\n${JSON.stringify(account)}`, (err) => {
                        return err;
                    });
                }
            }
            return { "origin": { "id": `${origin}`, "balance": newBalanceOrigin } };
        }
        else if (type === "deposit") {
            fs.writeFileSync('./src/fakedatabase.txt', '');
            fs.writeFileSync('./src/fakedatabase.txt', 'accounts');
            if (existsDestination.length == 0) {
                const newAccount = { "account_id": destination, "balance": data?.amount };
                newBalance = data?.amount;
                fs.appendFile("./src/fakedatabase.txt", `\n${JSON.stringify(newAccount)}`, (err) => {
                    return err;
                });
            }
            for (const line of database) {
                if (line === 'accounts') continue;
                const account = JSON.parse(line);
                if (destination === account?.account_id) {
                    if (type === "deposit") newBalance = account?.balance + amount;
                    const newLine = { "account_id": destination, "balance": newBalance };
                    fs.appendFile("./src/fakedatabase.txt", `\n${JSON.stringify(newLine)}`, (err) => {
                        return err;
                    });
                }
                else {
                    fs.appendFile("./src/fakedatabase.txt", `\n${JSON.stringify(account)}`, (err) => {
                        return err;
                    });
                }
            }
            return { "destination": { "id": `${destination}`, "balance": newBalance } };
        }
    }
}
