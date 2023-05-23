import {
  WebSocketGateway,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { RoomService } from './room.service';
import { Logger } from '@nestjs/common';

@WebSocketGateway({ cors: true })
export class RoomGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly service: RoomService) {}

  private logger = new Logger(RoomGateway.name);

  handleDisconnect(client: any) {
    this.logger.debug(`Client: ${client.id} disconnected`);
  }
  handleConnection(client: any, ...args: any[]) {
    this.logger.debug(`Client: ${client.id} connected`);
  }
  afterInit(server: any) {
    this.logger.log('Gateway initializes');
  }
}
