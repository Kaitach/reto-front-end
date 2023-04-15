import { HttpTestingController, HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { UserModel } from "src/app/domain";
import { UserEntity } from "../entities";
import { UserImplementationRepository } from "../user-implementation.repository";


describe('UserImplementationRepository', () => {
  let repository: UserImplementationRepository;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserImplementationRepository],
    });

    repository = TestBed.inject(UserImplementationRepository);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('login', () => {
    it('should return a token when given a valid email and password', () => {
      const email = 'test@example.com';
      const password = 'password';

      repository.login(email, password).subscribe((token) => {
        expect(token).toEqual('test_token');
      });

      const req = httpMock.expectOne('https://banco-backend.onrender.com/users/login');
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual({ email, password });

      req.flush('test_token', { status: 200, statusText: 'OK' });
    });
  });

  describe('createUser', () => {
    it('should create a user', () => {
      const user: UserModel = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password',
        Account: [],
        document: 2,
        id: 'test'
      };

      repository.createUser(user).subscribe((createdUser) => {
        expect(createdUser.name).toEqual(user.name);
        expect(createdUser.email).toEqual(user.email);
      });

      const req = httpMock.expectOne('https://banco-backend.onrender.com/users');
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(user);

      const userEntity: UserEntity = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password',
        Account: [],
        document: 2,
        id: 'test'
      };
      req.flush(userEntity, { status: 201, statusText: 'Created' });
    });
  });

  describe('updateUser', () => {
    it('should update a user', () => {
      const user: UserModel = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password',
        Account: [],
        document: 2,
        id: 'test'
      };
      const id = '1';

      repository.updateUser(id, user).subscribe((updatedUser) => {
        expect(updatedUser.name).toEqual(user.name);
        expect(updatedUser.email).toEqual(user.email);
      });

      const req = httpMock.expectOne(`https://banco-backend.onrender.com/users/${id}`);
      expect(req.request.method).toEqual('PUT');
      expect(req.request.body).toEqual(user);

      const userEntity: UserEntity = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password',
        Account: [],
        document: 2,
        id: 'test'
      };
      req.flush(userEntity, { status: 200, statusText: 'OK' });
    });
  });
  describe('getUserById', () => {
    it('should return a user by ID', () => {
      const userEntity: UserEntity = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password',
        Account: [],
        document: 2,
        id: 'test'
      };

      repository.getUserById(userEntity.id).subscribe((user) => {
        expect(user.name).toEqual(userEntity.name);
        expect(user.email).toEqual(userEntity.email);
      });

      const req = httpMock.expectOne(`https://banco-backend.onrender.com/users/${userEntity.id}`);
      expect(req.request.method).toEqual('GET');

      req.flush(userEntity, { status: 200, statusText: 'OK' });
    });
  })


  describe('getAllUsers', () => {
    it('should return an array of users', () => {
      const userEntities: UserEntity[] = [
        {
          name: 'Test User 1',
          email: 'test1@example.com',
          password: 'password',
          Account: [],
          document: 1,
          id: '1'
        },
        {
          name: 'Test User 2',
          email: 'test2@example.com',
          password: 'password',
          Account: [],
          document: 2,
          id: '2'
        },
        {
          name: 'Test User 3',
          email: 'test3@example.com',
          password: 'password',
          Account: [],
          document: 3,
          id: '3'
        },
      ];
  
      repository.getAllUsers().subscribe((users) => {
        expect(users.length).toEqual(userEntities.length);
        users.forEach((user, index) => {
          expect(user.name).toEqual(userEntities[index].name);
          expect(user.email).toEqual(userEntities[index].email);
        });
      });
  
      const req = httpMock.expectOne('https://banco-backend.onrender.com/users');
      expect(req.request.method).toEqual('GET');
  
      req.flush(userEntities, { status: 200, statusText: 'OK' });
    });
  });
  
  describe('deleteUser', () => {
    it('should delete a user', () => {
      const id = '1';
  
      repository.deleteUserById(id).subscribe((response) => {
        expect(response).toBeUndefined();
      });
  
      const req = httpMock.expectOne(`https://banco-backend.onrender.com/users/${id}`);
      expect(req.request.method).toEqual('DELETE');
  
      req.flush(null, { status: 204, statusText: 'No Content' });
    });
  });
  describe('getUserByEmail', () => {
    it('should return a user by email', () => {
      const email = 'test@example.com';
      const userEntity: UserEntity = {
        name: 'Test User',
        email: email,
        password: 'password',
        Account: [],
        document: 2,
        id: 'test'
      };
  
      repository.getUserByEmail(email).subscribe((user) => {
        expect(user.name).toEqual(userEntity.name);
        expect(user.email).toEqual(userEntity.email);
      });
  
      const req = httpMock.expectOne(`https://banco-backend.onrender.com/users?email=${email}`);
      expect(req.request.method).toEqual('GET');
  
      req.flush([userEntity], { status: 200, statusText: 'OK' });
    });
  });

  
});