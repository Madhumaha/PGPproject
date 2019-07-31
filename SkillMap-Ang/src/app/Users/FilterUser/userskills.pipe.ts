import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../../Model/user.model';
import { UserdetailServiceService } from '../userdetail-service.service';

@Pipe({
  name: 'userskills'
})
export class UserskillsPipe implements PipeTransform {
  users:User[];
  constructor(private uservice:UserdetailServiceService) { }

  ngOnInit() {
    this.uservice.getAllUsers().subscribe(
      
      data=>{this.users=data;});
  }

  transform(users: User[],searchTerm:string):User[]{
    if(!users||!searchTerm)
    {
    return users;
    }
    return users.filter(userdetail=>
      userdetail.skill.toLocaleLowerCase().indexOf(searchTerm.toLocaleLowerCase())!==-1);
  
  }

}
