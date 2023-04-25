import { IsNotEmpty, Matches, MinLength } from "class-validator";
import { MeetMessagesHelper } from "../helpers/meetmessages.helper";


export class CreateMeetDto {

    @MinLength(2, {message: MeetMessagesHelper.CREATE_NAME_NOT_VALID})
    name: string;

    @IsNotEmpty({ message: MeetMessagesHelper.CREATE_COLOR_NOT_VALID })
    @Matches(/[0-9A-Fa-f]{6}/g, {
    message: MeetMessagesHelper.CREATE_COLOR_NOT_VALID})
    color:string;
}