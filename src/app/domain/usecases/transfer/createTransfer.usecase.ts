import { Observable } from "rxjs";
import { UseCase } from "../../base/use-case";
import { TransferModel } from "../../models/transfer.model";
import { TransferRepository } from "../../repository/transfer.repository";

export class CreateTransferUseCase implements UseCase<TransferModel, TransferModel> {
  constructor(private transferRepository: TransferRepository) {}

  execute(transfer: TransferModel): Observable<TransferModel> {
    return this.transferRepository.createTransfer(transfer);
  }
}
