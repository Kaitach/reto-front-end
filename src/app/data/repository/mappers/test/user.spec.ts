import { UserModel } from "src/app/domain";
import { UserEntity } from "../../entities";
import { UserImplementationRepositoryMapper } from "../user.mapper";

describe('UserImplementationRepositoryMapper', () => {
  let mapper: UserImplementationRepositoryMapper;

  beforeEach(() => {
    mapper = new UserImplementationRepositoryMapper();
  });

  it('should map from entity to model', () => {
    const entity: UserEntity = {
      id: '123',
      Account: [],
      document: '789',
      email: 'test@example.com',
      name: 'Test User',
      password: '123456',
    };
    const expectedModel: UserModel = {
      id: '123',
      Account: [],
      document: '789',
      email: 'test@example.com',
      name: 'Test User',
      password: '123456',
    };
    const result = mapper.mapFrom(entity);
    expect(result).toEqual(expectedModel);
  });

  it('should map from model to entity', () => {
    const model: UserModel = {
      id: '123',
      Account: [],
      document: '789',
      email: 'test@example.com',
      name: 'Test User',
      password: '123456',
    };
    const expectedEntity: UserEntity = {
      id: '123',
      Account: [],
      document: '789',
      email: 'test@example.com',
      name: 'Test User',
      password: '123456',
    };
    const result = mapper.mapTo(model);
    expect(result).toEqual(expectedEntity);
  });
});

