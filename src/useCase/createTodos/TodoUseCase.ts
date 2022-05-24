import { TodosRepository } from "../../repositories/implementation/TodosRepository";

interface IRequest {
  author: string;
  description: string;
}

class TodoUseCase {
  constructor(private todoRepository: TodosRepository) { }

  execute({ author, description }: IRequest): void {
    const authorAlreadyExist = this.todoRepository.findByAuthor(author);

    if (authorAlreadyExist) {
      throw new Error("Author Already Exists");
    }

    this.todoRepository.create({ author, description });
  }
}

export { TodoUseCase };