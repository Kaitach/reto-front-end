import { Mapper, IDepositModel } from "../../../../app/domain";
import { DepositEntity } from "..";


export class DepositImplementationRepositoryMapper extends Mapper<DepositEntity, IDepositModel> {
    mapFrom(param: DepositEntity): IDepositModel {
        return {
            _id: param._id,
            accountId: param.accountId,
            amount: param.amount,
            reason: param.reason,
            userId: param.userId
          
        };
    }
    mapTo(param: IDepositModel): DepositEntity {
        return {
            _id: param._id,
            accountId: param.accountId,
            amount: param.amount,
            reason: param.reason,
            userId: param.userId
        }
    }
}