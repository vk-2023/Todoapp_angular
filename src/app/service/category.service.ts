import { Injectable } from '@angular/core';
import { Category } from '../interface/categoryInterface';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  category_cnt: number = JSON.parse(localStorage.getItem('cat_cnt') || '0');

  constructor() {}

  categories: Category[] = [
    // {
    //   cat_id: 1,
    //   cat_name: 'GYM',
    //   todosCount: 0,
    //   todosUnDone: 0
    // },
  ];

  getCategories(): Category[] {
    this.categories = JSON.parse(
      localStorage.getItem('categoriesList') || '[]'
    );
    return this.categories;
  }

  addCategory(f: NgForm) {
    // this.category_cnt++;
    localStorage.setItem('cat_cnt', JSON.stringify(++this.category_cnt));
    this.categories.push({
      cat_id: this.category_cnt,
      cat_name: f.value.categoryName,
      todosCount: 0,
      todosUnDone: 0
    });
    localStorage.setItem('categoriesList', JSON.stringify(this.categories));
    console.log('Category Added...');
    console.log(this.categories);
  }
}
