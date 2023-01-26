export class Todo {
    public title: String
    public done: Boolean
    public id: Number

    constructor(id: Number, title: String, done: Boolean) {
        this.title = title
        this.done = done
        this.id = id
    }
}