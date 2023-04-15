import { TransferModel } from "src/app/domain";
import { TransferEntity } from "../../entities";
import { TransferImplementationRepositoryMapper } from "../transfer.mapper";


describe('TransferImplementationRepositoryMapper', () => {
  const mapper = new TransferImplementationRepositoryMapper();

  it('should return TransferModel object when mapFrom is called', () => {
    const entity: TransferEntity = {
      id: '1',
      amount: 100,
      senderAccountId: 'sender',
      receiverAccountId: 'receiver',
    };
    const model: TransferModel = mapper.mapFrom(entity);

    expect(model.id).toEqual(entity.id);
    expect(model.amount).toEqual(entity.amount);
    expect(model.senderAccountId).toEqual(entity.senderAccountId);
    expect(model.receiverAccountId).toEqual(entity.receiverAccountId);
  });

  it('should return TransferEntity object when mapTo is called', () => {
    const model: TransferModel = {
      id: '1',
      amount: 100,
      senderAccountId: 'sender',
      receiverAccountId: 'receiver',
    };
    const entity: TransferEntity = mapper.mapTo(model);

    expect(entity.id).toEqual(model.id);
    expect(entity.amount).toEqual(model.amount);
    expect(entity.senderAccountId).toEqual(model.senderAccountId);
    expect(entity.receiverAccountId).toEqual(model.receiverAccountId);
  });
});
