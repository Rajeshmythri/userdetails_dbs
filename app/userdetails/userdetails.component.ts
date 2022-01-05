import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserdetailsService } from '../services/userdetails.service';
@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.css']
})
export class UserdetailsComponent implements OnInit {
  contactForm: FormGroup;
  userData: any;
  name: string = '';
  phone: number;
  email: string = '';
  website: string = '';
  updateuserdetails:boolean=false;
  constructor(private formBuilder: FormBuilder, private userservice: UserdetailsService) {
    this.createContactForm();
  }
  ngOnInit() {
    this.getUser();
  }
  createContactForm() {
    this.contactForm = this.formBuilder.group({
      name: [''],
      phone: [''],
      email: [''],
      website: ['']
    });
  }
  get f() {
    return this.contactForm.controls;
  }
  // fill with user details 
  onSubmit() {
    if (this.contactForm.invalid) {
      return;
    }
    this.userservice.saveUsersDetails(this.contactForm.value).subscribe(res => {
      console.log(res);
      if (res) {
        this.getUser();
      }
    })
  }
  // update the user details
  onUpdate(id: any) {
    this.updateuserdetails=true;
    this.userservice.getUsersDetails(id).subscribe((res: any) => {
      this.name = res.name;
      this.contactForm = this.formBuilder.group({
        name: [res.name],
        phone: [res.phone],
        email: [res.email],
        website: [res.website]
      });
    })
    this.userservice.updateUsersDetails(id,this.contactForm.value).subscribe(res => {
      console.log(res);
      if (res) {
        this.getUser();
      }
    })
  }
  // get the user details
  getUser() {
    this.userservice.getUsers().subscribe(res => {
      console.log(res);
      this.userData = res;
    })
  }
  // delete user details
  deleteUser(id: any) {
    this.userservice.removeUsersDetails(id).subscribe(res => {
      console.log(res);
      this.getUser();
    })
  }
}

