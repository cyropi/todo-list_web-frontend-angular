
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestBackendService } from '../_services/rest-backend/rest-backend.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TodoItem } from '../_services/rest-backend/todo-item.type';

@Component({
  selector: 'app-todo-detail',
  imports: [ReactiveFormsModule],
  templateUrl: './todo-detail.component.html',
  styleUrl: './todo-detail.component.scss',
})
export class TodoDetailComponent 
{
    todoItem?: TodoItem;
    id!: number;
    editTodoSubmitted = false;

    route = inject(ActivatedRoute);
    router = inject(Router);
    toastrService = inject(ToastrService);
    restService = inject(RestBackendService);

    editTodoForm = new FormGroup({
                                     todo: new FormControl('', Validators.required),
                                     done: new FormControl(false)
                                 });


    ngOnInit()
    {
        this.id = Number(this.route.snapshot.params["id"]); 

        this.restService.getTodoById(this.id)
                        .subscribe({
                                       next: (data: any) => {
                                                                const todo = data.item;

                                                                this.todoItem = todo;

                                                                this.editTodoForm.controls.todo.setValue(todo.todo);
                                                                this.editTodoForm.controls.done.setValue(todo.done);
                                                            },
                                       error: (err) => {
                                                           this.toastrService.error("Error when retrieving the to-do");
                                                       }
                                   });

    }


    handleEditTodoSubmit()
    {
        this.editTodoSubmitted = true;

        if (this.editTodoForm.invalid) 
        {
            this.toastrService.error("The data you provided is invalid!", "Oops! Invalid data!");
            return;
        } 

        if (this.todoItem)
        {
            this.todoItem.todo = this.editTodoForm.value.todo as string;
            this.todoItem.done = this.editTodoForm.value.done as boolean;

            this.restService.updateTodo(this.todoItem)
                            .subscribe({
                                           next: (data: any) => { 
                                                                    const todo = data.item;
                                                                    this.toastrService.success(`To-do item: ${todo.todo}`, 
                                                                                               "To-do edited correctly!")
                                                                },
                                           error: (err) => {
                                                               this.toastrService.error("Could not save the to-do item.", 
                                                                                        "Oops! Something went wrong.");
                                                           },
                                           complete: () => {
                                                               this.router.navigateByUrl("/todos"); 
                                                           }
                                       });
        }
    }
}
