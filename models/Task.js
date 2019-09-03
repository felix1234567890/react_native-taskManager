export class Task {
  constructor(id, title, description, difficulty, dueDate, completed) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.difficulty = difficulty;
    this.dueDate = dueDate;
    this.completed = completed;
  }
}
