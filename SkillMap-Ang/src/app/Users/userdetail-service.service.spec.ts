// import { TestBed, async, inject } from '@angular/core/testing';
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserdetailServiceService } from './userdetail-service.service';
import { HttpClientModule } from '@angular/common/http';
import { User } from '../Model/user.model';



describe('UserdetailServiceService', () => {
  let httpmock:HttpTestingController;
  let service: UserdetailServiceService;
  beforeEach(() => {TestBed.configureTestingModule({
    imports: [HttpClientModule,HttpClientTestingModule],
    providers:[UserdetailServiceService]
  });
  httpmock=getTestBed().get(HttpTestingController);
  service= TestBed.get(UserdetailServiceService);
  });

  afterEach(()=>{
    httpmock.verify();
  })

  it('should be created', () => {
    service= TestBed.get(UserdetailServiceService);
    expect(service).toBeTruthy();
  });

  it('Should get all employees from http ', ()=>{
    let dummyUsers:User[]=[
      {empid:5,name:'Maha',phoneno:'99999',emailid:'madhu@gmail.com',address:'Bangalore',skill:'c,c++'}
    ];

    service.getAllUsers().subscribe(
      res=>{
        expect(res.length).toBe(1);
        expect(res).toEqual(dummyUsers);
      });

      //http mock
      let req=httpmock.expectOne(service.Rest_URL+'/allusers');
      expect(req.request.method).toBe('GET');
      req.flush(dummyUsers);

  });

  it('Should add one employee from http ', ()=>{
    let dummyUser:User={empid:1,name:'Madhu',phoneno:'99999',emailid:'madhu@gmail.com',address:'Bangalore',skill:'c,c++'};

    service.saveUser(dummyUser).subscribe(
      res=>{
       
        expect(res).toEqual(dummyUser);
      });

         //http mock
      let req=httpmock.expectOne(service.Rest_URL+'/registerUser');
      expect(req.request.method).toBe('POST');
      req.flush(dummyUser);

  });

  it('Should modify one employee from http ', ()=>{
    let dummyUser:User={empid:5,name:'Maha',phoneno:'9999900',emailid:'madhu@gmail.com',address:'Bangalore',skill:'c,c++'};

    service.editUser(dummyUser).subscribe(
      res=>{
       
        expect(res).toEqual(dummyUser);
      });

         //http mock
      let req=httpmock.expectOne(service.Rest_URL+'/updateuser');
      expect(req.request.method).toBe('PUT');
      req.flush(dummyUser);

  });

  it('Should remove one employee from http ', ()=>{
    let dummyUser:User={empid:5,name:'Maha',phoneno:'99999',emailid:'madhu@gmail.com',address:'Bangalore',skill:'c,c++'};
    let eid:number=5;

    service.deleteUser(eid).subscribe(
      res=>{
       
        expect(res).toEqual(dummyUser);
      });

         //http mock
      let req=httpmock.expectOne(service.Rest_URL+'/deleteuser/'+eid);
      console.log(req.request.url);
      //expect(req.request.url.endsWith("/deleteuser/5")).toEqual(true);
      expect(req.request.method).toBe('DELETE');
      req.flush(dummyUser);

  });

});
