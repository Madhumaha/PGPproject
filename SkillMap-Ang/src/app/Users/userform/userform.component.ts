import { Component, OnInit } from '@angular/core';
import { User } from '../../Model/user.model';
import { NgForm } from '@angular/forms';
import { UserdetailServiceService } from '../userdetail-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-userform',
  templateUrl: './userform.component.html',
  styleUrls: ['./userform.component.css']
})
export class UserformComponent implements OnInit {

  users:User[];
  userobj:User;
  constructor(private uservice:UserdetailServiceService,private toastr: ToastrService) { }

  ngOnInit() {
    this.resetForm();

  }

  resetForm(form?:NgForm)
  {
    if(form!=null)
    form.resetForm();
    this.uservice.userData={
      empid:null,
      name:'',
      phoneno:'',
      emailid:'',
      address:'',
      skill:''
      
    };
  }

  onSubmit(form:NgForm)
  {
    if(form.value.empid==null)
    this.addUser(form);
   //this.addUser();
   else
    this.updateUser(form);
  }

  addUser(form:NgForm)
 // addUser()
  {
    // var userdetail=new user();
    // userdetail.name=this.uservice.userData.name;
    // userdetail.phoneno='00000';
    // userdetail.emailid='john@gmail.com';
    // userdetail.address='JYN';
    // userdetail.skill='C,C++,.NET';
    this.uservice.saveUser(form.value).subscribe(
      data=>{
        
        this.userobj=data;
        this.toastr.success('Employee is added!');
        this.resetForm(form);
        this.users= this.getAllUsers();
      });
  }

  updateUser(form:NgForm)
  {
    this.uservice.editUser(form.value).subscribe(
      data=>{
        
        this.toastr.warning("Employee details are updated successfully");
        this.resetForm(form);
        this.users= this.getAllUsers();
      });
  }

  getAllUsers():User[]
  {
    this.uservice.getAllUsers().subscribe(
      data=>{this.users=data;}
    );
    return this.users;
  }


}
