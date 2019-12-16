import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms'

import { DateService } from '../shared/date.service';
import { TaskService, Task } from '../shared/task.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-oranaizer',
  templateUrl: './oranaizer.component.html',
  styleUrls: ['./oranaizer.component.scss']
})
export class OranaizerComponent implements OnInit {

  form: FormGroup;

  tasks: Task[] = [];

  constructor(private dateService: DateService,
              private taskService: TaskService){}

  ngOnInit(){
    this.dateService.date.pipe(
      switchMap(value => this.taskService.load(value))
    ).subscribe( tasks => {
      this.tasks = tasks;
    })

    this.form = new FormGroup({
      title: new FormControl('', Validators.required)
    })
  }

  submit(){
    const {title} = this.form.value;

    const task: Task = {
      title,
      date: this.dateService.date.value.format("DD-MM-YYYY")
    }

    this.taskService.create(task).subscribe( task => {
      this.tasks.push(task);
      this.form.reset();
    }, err => console.log(err))

  }

  remove(task: Task){
    this.taskService.remove(task).subscribe( () => {
      this.tasks = this.tasks.filter(t => t.id !== task.id)
    }, err => console.log(err))
  }
  
}
