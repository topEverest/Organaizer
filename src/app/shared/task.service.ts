import { Injectable } from '@angular/core';
import * as moment from 'moment'
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
 
export interface Task {
    id?: string
    title: string
    date?: string
}

interface CreateRespone{
    name: string;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
    static url = 'https://angular-organizer-47323.firebaseio.com/tasks';

    constructor(private http: HttpClient){}

    load(date: moment.Moment): Observable<Task[]>{
        return this.http
            .get<Task[]>(`${TaskService.url}/${date.format('DD-MM-YYYY')}.json`)
            .pipe(map( tasks => {
                if(!tasks){
                    return []
                }
                return Object.keys(tasks).map( key => ({...tasks[key], id: key}))
            }))
    }

    create(task: Task): Observable<Task>{
        return this.http
            .post<CreateRespone>(`${TaskService.url}/${task.date}.json`, task)
            .pipe(map( res => {
                return {...task, id: res.name}
            }))
    }

    remove(task: Task): Observable<void>{
        return this.http.delete<void>(`${TaskService.url}/${task.date}/${task.id}.json`)
    }

}
