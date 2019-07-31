import { Component, OnInit } from '@angular/core';
import { User } from '../../Model/user.model';
import { UserdetailServiceService } from '../userdetail-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {
  users:User[];
  searchTerm : string;
  user:User;
  constructor(private uservice:UserdetailServiceService,private toastr:ToastrService) { }

  ngOnInit() {
    this.uservice.getAllUsers().subscribe(
      
      data=>{this.users=data;});

    // this.uservice.getUserById().subscribe(
    //   data=>{this.user=data;}
    // );
  }
  

  populateForm(u:User){
    this.uservice.userData=Object.assign({},u);
  }

  onDelete(id:number){
    this.uservice.deleteUser(id).subscribe(
      data=>{
        this.uservice.getAllUsers().subscribe(
          data=>{this.users=data;});
          this.toastr.error('Deleted successfully');
      });
  }
}
