import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, UserService } from '../_services';
import { CustomValidator } from '../_helpers/custom-validator';
import { User } from '../_models';

@Component({ templateUrl: 'register.component.html', styleUrls: ['register.component.css'] })
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  registrationForm: any;
  cd: any;
  imagePath: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    },
      {
        validator: CustomValidator.matchPassword
      });
  }

  get regForm() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (!this.registerForm.valid) {
      this.alertService.error('Form is invalid , please fill all the mandatory fields');
      return;
    } else {
      const newUser = new User();
      for (const field in this.registerForm.controls) {
        if (this.registerForm.controls[field]) {
          newUser[field] = this.registerForm.controls[field].value;
        }
      }
      if (this.userService.addNewUser(newUser)) {
        // this.alertService.success('Registration completed , please login');
        this.router.navigate(['/login']);
      } else {
        this.alertService.error('Form is invalid , user already exists');
      }
    }
  }


  showThumbnail(selectedFiles) {
    if (selectedFiles.length === 0) {
      return;
    }
    const fileReader = new FileReader();
    this.imagePath = selectedFiles;
    fileReader.readAsDataURL(selectedFiles[0]);
    fileReader.onload = () => {
      this.imagePath = fileReader.result;
    };
  }

}
