import { Mapper, TransferModel } from '../../../../app/domain';
import { TransferEntity } from '..';

export class TransferImplementationRepositoryMapper extends Mapper<
  TransferEntity,
  TransferModel
> {
  mapFrom(param: TransferEntity): TransferModel {
    return {
      amount: param.amount,
      id: param.id,
      receiverAccountId: param.receiverAccountId,
      senderAccountId: param.senderAccountId,
    };
  }
  mapTo(param: TransferModel): TransferEntity {
    return {
      amount: param.amount,
      id: param.id,
      receiverAccountId: param.receiverAccountId,
      senderAccountId: param.senderAccountId,
    };
  }
}
