
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthRequest } from './auth-request.type';
import { TodoItem } from './todo-item.type';

@Injectable({
  providedIn: 'root',
})
export class RestBackendService {
    url = 'http://localhost:3000';

    httpOptions = {
                      headers: new HttpHeaders({
                                                   'Content-Type': 'application/json'
                                               })
                  };


    constructor(private http: HttpClient) {}


    login(loginRequest: AuthRequest)
    {
        const url = `${this.url}/auth`; 
        return this.http.post(url, loginRequest, this.httpOptions);
    }


    signup(signupRequest: AuthRequest)
    {
        const url = `${this.url}/signup`; 
        return this.http.post(url, signupRequest, this.httpOptions);
    }


    getTodos() 
    {
        const url = `${this.url}/todos`; 
        return this.http.get<TodoItem[]>(url, this.httpOptions);
    }


    getTodoById(id: number) 
    {
        const url = `${this.url}/todos/${id}`; 
        return this.http.get<TodoItem>(url, this.httpOptions);
    }


    createTodo(todoItem: TodoItem)
    {
        const url = `${this.url}/todos`;
        return this.http.post<TodoItem>(url, todoItem, this.httpOptions);
    }
    

    updateTodo(todoItem: TodoItem) 
    {
        const url = `${this.url}/todos/${todoItem.id}`; 
        return this.http.put<TodoItem>(url, todoItem, this.httpOptions);
    }


    delete(todoItem: TodoItem) 
    {
        const url = `${this.url}/todos/${todoItem.id}`; 
        return this.http.delete(url, this.httpOptions);
    }
}
