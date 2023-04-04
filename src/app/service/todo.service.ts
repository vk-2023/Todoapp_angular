import { Injectable } from '@angular/core';
import { Category } from '../interface/categoryInterface';
import { Todo } from '../interface/todoInterface';
import { CategoryService } from './category.service';

@Injectable({
  providedIn: 'root',
})

export class TodoService {
  constructor() {}

  // todocnt = 0;
  todocnt: number = JSON.parse(localStorage.getItem('todo_cnt')!)
  

  todo: Todo[] = [
    // {
    //   todo_id: 1,
    //   cat_id: 2,
    //   data: 'This is Todo 1',
    //   isDone: false
    // },
  ];

  // todoCatBind: any = [];

  getTodos(catId: number) {
    this.todo = JSON.parse(localStorage.getItem('todosList') || '[]');
    return this.todo.filter((t) => {
      return t.cat_id == catId;
    });
  }

  // getTodosNumber() {}

  setTodo(catId: number, todoText: string) {
    // this.todocnt++;
    localStorage.setItem("todo_cnt", JSON.stringify(++this.todocnt))
    this.todo.push({
      todo_id: this.todocnt,
      cat_id: catId,
      data: todoText,
      isDone: false
    });
    localStorage.setItem('todosList', JSON.stringify(this.todo));
    console.log('Todo Added...');
    console.log(this.todo);
  }

  deleteTodo(todoId: number, catId: number, selTodo: Todo[]) {
    // this.todocnt--
    localStorage.setItem("todo_cnt", JSON.stringify(--this.todocnt))
    this.todo = this.todo.filter((t) => {
      return t.todo_id !== todoId;
    });
    
    localStorage.setItem('todosList', JSON.stringify(this.todo));
    return selTodo.filter((t) => {
      return t.todo_id !== todoId;
    });;
  }
}
