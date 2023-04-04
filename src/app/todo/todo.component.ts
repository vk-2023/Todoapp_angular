import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Todo } from '../interface/todoInterface';
import { CategoryService } from '../service/category.service';
import { TodoService } from '../service/todo.service';
import { Category } from '../interface/categoryInterface';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  selTodo: Todo[] = [];
  catId: number;
  todoText: string = '';
  isEmpty = true
  categoryDetails: Category[];
  catName: string='';

  constructor(
    private route: ActivatedRoute,
    private todoService: TodoService,
    private categoryService: CategoryService
  ) {
    this.catId = Number(this.route.snapshot.paramMap.get('catId'));
    this.selTodo = todoService.getTodos(this.catId);

    this.categoryDetails = JSON.parse(localStorage.getItem('categoriesList') || '[]');
    console.log(`category details: ${this.categoryDetails}`);
  }



  ngOnInit(): void {
    this.categoryDetails.forEach((c)=>{
      if(c.cat_id==this.catId){
        this.catName = c.cat_name
      }
    })
  }

  addTodo() {
    // console.log("before setting todo..",this.todoText)
    this.todoService.setTodo(this.catId, this.todoText);
    this.selTodo = this.todoService.getTodos(this.catId);

    //clearing the input field
    this.todoText = '';
    this.isEmpty=true
     // Now changing "todo count" in respective category.
    // console.log(`before for loop category details: ${this.categoryDetails}`)
    this.changeTodoCnt(true)
    
  }

  deleteTodo(todoId: number) {
    console.log(todoId, this.catId, this.selTodo)
    this.selTodo = this.todoService.deleteTodo(todoId, this.catId, this.selTodo);
    console.log(`selTodo: ${this.selTodo}`);
    this.changeTodoCnt(false)
  }

  doneTodo(todoId: number){
    console.log(`TodoDone: ${todoId}`)
    this.manageDone(true, todoId )
  } 

  undoneTodo(todoId: number){
    console.log(`Todo UnDone: ${todoId}`)
    this.manageDone(false, todoId )
  }

  manageDone(isDone: boolean, todoId: number){
    this.todoService.todo.forEach((t)=>{
      if(t.todo_id===todoId){
        t.isDone = isDone
      }
    })
    localStorage.setItem("todosList", JSON.stringify(this.todoService.todo))
  }

  changeTodoCnt(isIncrement: boolean){
    console.log(`before foreach: ${this.categoryDetails}`)

    this.categoryDetails.forEach((cat: Category)=>{
      if(cat.cat_id===this.catId){
        isIncrement ? cat.todosCount++ : cat.todosCount--
      }
    })
    console.log(`category todo number changed.. ${this.categoryDetails}`)
    // this.categoryService.categories = this.categoryDetails
    localStorage.setItem('categoriesList', JSON.stringify(this.categoryDetails))
  }

  emptyCheck(onChangeCategoryText: string){
    this.isEmpty = onChangeCategoryText==="" ? true : false;
  }
}
