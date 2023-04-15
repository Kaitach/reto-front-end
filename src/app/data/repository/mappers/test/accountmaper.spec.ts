import { IAccountModel } from "src/app/domain";
import { IAccountEntity } from "../../entities";
import { AccountImplementationRepositoryMapper } from "../account.mapper";


describe("AccountImplementationRepositoryMapper", () => {
  let mapper: AccountImplementationRepositoryMapper;

  beforeEach(() => {
    mapper = new AccountImplementationRepositoryMapper();
  });

  describe("mapFrom", () => {
    it("should map an account entity to an account model", () => {
      // Arrange
      const entity: IAccountEntity = {
        id: "1",
        amount: 1000,
        type: "checking"
      };

      const expectedModel: IAccountModel = {
        id: "1",
        amount: 1000,
        type: "checking"
      };

      // Act
      const result = mapper.mapFrom(entity);

      // Assert
      expect(result).toEqual(expectedModel);
    });
  });

  describe("mapTo", () => {
    it("should map an account model to an account entity", () => {
      // Arrange
      const model: IAccountModel = {
        id: "1",
        amount: 1000,
        type: "checking"
      };

      const expectedEntity: IAccountEntity = {
        id: "1",
        amount: 1000,
        type: "checking"
      };

      // Act
      const result = mapper.mapTo(model);

      // Assert
      expect(result).toEqual(expectedEntity);
    });
  });
});
