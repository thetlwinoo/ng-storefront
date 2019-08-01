import { Component, OnInit } from '@angular/core';
import { CloudinaryModel } from '@box/models';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-review-details',
  templateUrl: './review-details.component.html',
  styleUrls: ['./review-details.component.scss']
})
export class ReviewDetailsComponent implements OnInit { 
  constructor() { }

  ngOnInit() {
  }
}
