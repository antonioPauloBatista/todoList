import { Component } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from 'src/model/todo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public todos: Todo[] = []
  public title: String = "Minhas Tarefas"
  public liveForm: FormGroup
  public mode: string = 'list'


  constructor(private formBuilder: FormBuilder) {
    this.liveForm = this.formBuilder.group({
      tarefa: [null, Validators.compose([
        Validators.maxLength(60),
        Validators.minLength(3),
        Validators.required])
      ]
    });

    this.load();

  }

  remove(todo: Todo) {
    const index = this.todos.indexOf(todo);
    if (index != -1) {
      this.todos.splice(index, 1)
    }
    this.save()
  }

  markAsDone(todo: Todo) {
    todo.done = true
    this.save()
  }

  markAsUndone(todo: Todo) {
    todo.done = false
    this.save()
  }

  add() {
    const tarefa = this.liveForm.controls['tarefa'].value
    const id = this.todos.length + 1;

    this.todos.push(new Todo(id, tarefa, false))
    this.save();
    this.clear();
  }

  clear() {
    this.liveForm.reset();
  }

  save() {
    var data = JSON.stringify(this.todos);
    localStorage.setItem('todos', data);
    this.mode = 'list'
  }

  load() {
    const dados = localStorage.getItem('todos')
    console.log(dados)
    if (dados) {
      this.todos = JSON.parse(dados);
    } else {
      this.todos = []
    }

  }

  changeMode(mode: string) {
    this.mode = mode
  }
}
