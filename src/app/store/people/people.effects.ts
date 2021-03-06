import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { map, switchMap, concatMap } from 'rxjs/operators';

import * as PeopleActions from "./people.actions";
import { Observable } from "rxjs";
import { PeopleService } from '@box/services/e-commerce/people.service';

@Injectable()
export class PeopleEffects {
    @Effect()
    fetchLoginPeople = this.actions$.pipe(
        ofType(PeopleActions.FETCH_LOGIN_PEOPLE),
        map((action: PeopleActions.FetchLoginPeople) => {
            return action.payload
        }),
        switchMap((payload) => {            
            return this.peopleService.checkProfile(payload).map(res => {
                console.log('success',res);
                return {
                    type: PeopleActions.FETCH_LOGIN_PEOPLE_SUCCESS, payload: res
                }
            }).catch(error => {
                console.log('error',error)
                return Observable.of(false);
            });
        })
    )

    constructor(private actions$: Actions, private peopleService: PeopleService) {
    }
}