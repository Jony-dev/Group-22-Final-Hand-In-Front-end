import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ToastsService } from 'src/app/services/toasts.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditProfileMComponent } from '../../modals/editProfile/edit-profile-m/edit-profile-m.component';
import { AuthService } from 'src/app/services/auth.service';
import { View } from 'src/app/models/view';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  notificationToggle : boolean = false;
  managerToggle : boolean = false;
  hrToggle : boolean = false;
  configToggle : boolean = false;
  auditToggle : boolean = false;

  views : View [] = [];
  
  title : String = 'Dashboard-app';
  viewSideBar : Boolean = false;

  constructor(private api : ApiService, private toasts : ToastsService, private modal : NgbModal,private auth: AuthService){ 
  }

  ngOnInit(): void {
    this.views = this.auth.getViews();
    console.log(this.views);
  }
  logout(){
      this.auth.logOut();
  }
  
  public toggleSideBar(){

    this.viewSideBar = !this.viewSideBar;
    
  }

  retreiveError(error: any){
    let err = error.error;
    this.toasts.display({type:"Error",heading : err.Title, message : err.message});
  }
  editProfile(){
    const editProfileInstance = this.modal.open(EditProfileMComponent,  { windowClass : "largeModal"});
  }

  searchView(viewName : string){

    if( this.views.filter(el => el.view === viewName).length > 0)
      return true;
    
    else
      return false;
  }
  

}
