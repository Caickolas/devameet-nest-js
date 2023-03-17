import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument} from "./schemas/user.schema";
import * as CryptoJs from 'crypto-js'
import { RegisterDto } from "./dtos/register.dto";

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>){}

    async create(dto: RegisterDto){
        dto.password = CryptoJs.AES.encrypt(dto.password, process.env.USER_CYPHER_SECRET_KEY).toString();

        const createdUser = new this.userModel(dto);
        await createdUser.save();
    }

    async existsByEmail(email : String) : Promise<boolean>{
        const result = await this.userModel.findOne({ email });
         
        if(result){
            return true;
        }

        return false;
    }

    async getUserByLoginPassword(email: string, password: string) : Promise<UserDocument | null> {
        const user = await this.userModel.findOne({email}) as UserDocument;

        if(user){
            const bytes = CryptoJs.AES.decrypt(user.password, process.env.USER_CYPHER_SECRET_KEY);
            const savedPassword = bytes.toString(CryptoJs.enc.Utf8);

            if(password == savedPassword){
                return user;
            }
        }
        return null;
    }
}
