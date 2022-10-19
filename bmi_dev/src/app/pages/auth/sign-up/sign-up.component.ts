import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@auth/services/authService';
import { ACTIONS } from '@shared/constants/constants';
import { ApiError, User, UserCredentials } from '@supabase/supabase-js';

export interface OptionsForm {
  id: string;
  label: string;
}

interface UserResponse extends User, ApiError { }

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})



export class SignUpComponent implements OnInit {
  signUpForm !: FormGroup;
  signUp = ACTIONS.signUp;
  @Input() options!: OptionsForm;


  constructor(
    private readonly authSvc: AuthService,
    private readonly fb: FormBuilder,
    private readonly router: Router,
  ) { }

  ngOnInit(): void {
    this.initSignUp();
  }

  async onSubmit(): Promise<void> {
    const credentials: UserCredentials = this.signUpForm.value;
    let actionToCall;

    actionToCall = this.authSvc.signUp(credentials);

    if (this.options.id === ACTIONS.signUp) {
      alert('Works');
    } else {
      alert('ERROR!');
    }
    try {
      const result = await actionToCall as UserResponse;
      if (result.email) {
        this.redirectUser();
      } else {
        alert('Notification: ' + result.message);
      }
    } catch (error) {
      console.log(error);
    }

  }

  private redirectUser(): void {
    this.router.navigate(['/registration']);

    /* const credentials: UserCredentials = this.signUpForm.value;
    if (credentials.password != credentials.password) {
      alert('No coinciden');
    } else {
      this.router.navigate(['/registration']);
    } */

  }

  private initSignUp() {
    this.signUpForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPass: ['', Validators.required]
    })
    /* 
        if ()) {
          
        } */
  }
}
