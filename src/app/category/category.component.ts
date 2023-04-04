import { NgFor } from '@angular/common';
import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Category } from '../interface/categoryInterface';
import { Todo } from '../interface/todoInterface';
import { CategoryService } from '../service/category.service';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent{
  // onSubmit(f: NgForm){
  //   console.log(f.value)
  // }
  categoryText = '';
  isEmpty = true;
  categoryBeforeUpdate = '';
  isUpdate = false;
  todo: Todo[];
  categories: Category[];

  // ngOnChanges(changes: SimpleChanges): void{
  //   console.log(`changes: ${changes}`)
  // }


  constructor(private categoryService: CategoryService) {
    this.categories = categoryService.getCategories();
    this.todo = JSON.parse(localStorage.getItem('todosList') || '[]');
  }

  addCategory(f: NgForm) {
    this.categoryService.addCategory(f);
    // this.isEmpty = this.emptyCheck()
    this.categoryText = '';
    this.isEmpty=true
  }

  // emptyCheck() {
  //   return this.categoryText === '' ? true : false;
  // }

  updateCategory(category: Category) {
    console.log(category);
    this.categoryBeforeUpdate = category.cat_name;
    this.categoryText = category.cat_name;
    this.isUpdate = true;
  }

  addUpdatedCategory() {
    console.log(this.categoryBeforeUpdate);
    console.log(this.categoryText);
    // this.categories[this.categoryBeforeUpdate] = this.categoryText
    this.categories.forEach((cat) => {
      cat.cat_name === this.categoryBeforeUpdate
        ? (cat.cat_name = this.categoryText)
        : {};
    });

    localStorage.setItem('categoriesList', JSON.stringify(this.categories));
    this.categoryText = '';
    this.categoryBeforeUpdate = '';
    this.isUpdate = false;
  }

  deleteCategory(category: Category) {
    // console.log("categories array", this.categories)
    // console.log("category", category.cat_name)

    this.categories = this.categories.filter((cat) => {
      // console.log("cat", cat.cat_name)
      return cat.cat_id != category.cat_id;
    });
    // console.log(this.categories)

    //clearing the resp. category from LocalStorage
    localStorage.setItem('categoriesList', JSON.stringify(this.categories));


    //clearing all the Todos of this category to be deleted from LocalStorage

    this.todo = this.todo.filter((t) => {
      return t.cat_id != category.cat_id;
    });
    localStorage.setItem('todosList', JSON.stringify(this.todo));

    this.categoryService.categories = this.categories;

    return this.categories;
  }

  emptyCheck(onChangeCategoryText: string){
    this.isEmpty = onChangeCategoryText==="" ? true : false;
  }
}
