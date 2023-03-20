import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserService } from 'src/user/user.service';
import { CreateMeetDto } from './dtos/createmeet.dto';
import { GetMeetDto } from './dtos/getmeet.dto';
import { generateLink } from './helpers/linkgenerator.helper';
import { Meet, MeetDocument } from './schemas/meet.schema';

@Injectable()
export class MeetService {
    private readonly logger = new Logger(MeetService.name);

    constructor(
        @InjectModel(Meet.name) private readonly model: Model<MeetDocument>,
        private readonly userservice: UserService
    ){}

    async getMeetsByUser(userId: String){
        this.logger.debug('getMeetsByUser - ' + userId);
        return await this.model.find({user: userId});
    }

    async createMeet(userId:string, dto:CreateMeetDto){
        this.logger.debug('createMeet - ' + userId);

        const user = await this.userservice.getUserById(userId);

        const meet = {
            ...dto,
            user,
            link: generateLink()
        }

        const createdMeet = new this.model(meet);
        return await createdMeet.save() 
    }

    async deleteMeetsByUser(userId: String, meetId: string){
        this.logger.debug(`deleteMeetsByUser - ${userId} - ${meetId} `);
        return await this.model.deleteOne({user: userId, _id: meetId});
    }

    
}
