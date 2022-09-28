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
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  authForm !: FormGroup;
  signIn = ACTIONS.signIn;
  signUp = ACTIONS.signUp;
  @Input() options!: OptionsForm;

  constructor(
    private readonly authSvc: AuthService,
    private readonly fb: FormBuilder,
    private readonly router: Router,
  ) { }


  ngOnInit(): void {
    this.initForm();
  }

  async onSubmit(): Promise<void> {
    const credentials: UserCredentials = this.authForm.value;
    let actionToCall;

    if (this.options.id === ACTIONS.signIn) {
      actionToCall = this.authSvc.signIn(credentials);
    } else {
      actionToCall = this.authSvc.signUp(credentials);
    }

    try {
      const result = await actionToCall as UserResponse;
      if (result.email) {
        this.redirectUser();
      } else {
        //TODO notification
        console.log('Notification');
      }
    } catch (error) {
      console.log(error);
    }


  }

  private initForm() {
    this.authForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  private redirectUser():void {
    this.router.navigate(['/home']);
  }

}
