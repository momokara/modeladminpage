import { Component, OnInit, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-edit-user-default',
  templateUrl: './edit-user-default.component.html',
  styleUrls: ['./edit-user-default.component.scss']
})
export class EditUserDefaultComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private actrouter: ActivatedRoute,
    @Inject('AjaxServer') private AjaxServer
  ) {

  }

  ngOnInit(): void {
  }
}
