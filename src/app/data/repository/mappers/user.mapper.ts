import { Mapper, UserModel } from "../../../../app/domain";
import { UserEntity } from "../entities";


export class UserImplementationRepositoryMapper extends Mapper<UserEntity, UserModel> {
    mapFrom(param: UserEntity): UserModel {
        return {
            id: param.id,
            Account: param.Account,
            document: param.document,
            email: param.email,
            name: param.name,
            password: param.password
        };
    }
    mapTo(param: UserModel): UserEntity {
        return {
            id: param.id,
            Account: param.Account,
            document: param.document,
            email: param.email,
            name: param.name,
            password: param.password
        }
    }
}