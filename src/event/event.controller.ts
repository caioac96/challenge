import { Body, Controller, Post, Response } from '@nestjs/common';
import { EventService } from './event.service';
import { EventDto } from './event.dto';
import { Response as IResponse } from 'express';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) { }

  @Post('/')
  transaction(@Response() res: IResponse, @Body() data: EventDto) {
    const transaction = this.eventService.transaction(data);
    if (!transaction) return res.status(404).send("0");
    else return res.status(201).send(`${JSON.stringify(transaction)}`);
  }
}
