import { Mapper, IAccountModel } from "../../../../app/domain";
import { IAccountEntity } from "..";


export class AccountImplementationRepositoryMapper extends Mapper<IAccountEntity, IAccountModel> {
    mapFrom(param: IAccountEntity): IAccountModel {
        return {
            id: param.id,
           amount: param.amount,
           type: param.type
        };
    }
    mapTo(param: IAccountModel): IAccountEntity {
        return {
            id: param.id,
            amount: param.amount,
            type: param.type
        }
    }
}