import { inject, injectable } from "tsyringe";

import { TodosRepository } from "../../repositories/implementation/TodosRepository";

interface IRequest {
  author: string;
  description: string;
}

@injectable()
class TodoUseCase {
  constructor(
    @inject("todoRepository") private todoRepository: TodosRepository
  ) { }

  async execute({ author, description }: IRequest): Promise<void> {
    const authorAlreadyExist = await this.todoRepository.findByAuthor(author);

    if (authorAlreadyExist) {
      throw new Error("Author Already Exists");
    }

    this.todoRepository.create({ author, description });
  }
}

export { TodoUseCase };
