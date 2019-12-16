import { Injectable } from '@angular/core';
import * as moment from 'moment'
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DateService {

  public date: BehaviorSubject<moment.Moment> = new BehaviorSubject(moment())

  changeMonth(num: number){
    const month = this.date.value.add(num, 'month');
    this.date.next(month);
  }

  changeDate(date: moment.Moment){
    // const value = this.date.value.set({
    //   date: date.date()
    // })

    this.date.next(date)
  }

}

