import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task, TaskDocument } from './schemas/task.schema';
import { Model } from 'mongoose';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

/**
 * Service responsible for handling task-related operations.
 * Provides methods to create, retrieve, update, delete, and search tasks.
 */
@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  /**
   * Creates a new task.
   * @param {CreateTaskDto} createTaskDto - The data transfer object containing task data.
   * @returns {Promise<Task>} A promise that resolves to the created task.
   */
  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const createdTask = new this.taskModel(createTaskDto);
    return createdTask.save();
  }

  /**
   * Retrieves all tasks.
   * @returns {Promise<Task[]>} A promise that resolves to an array of tasks.
   */
  async findAll(): Promise<Task[]> {
    return this.taskModel.find().exec();
  }

  /**
   * Retrieves a single task by its unique identifier.
   * @param {string} id - The unique identifier of the task to retrieve.
   * @returns {Promise<Task>} A promise that resolves to the retrieved task.
   */
  async findOne(id: string): Promise<Task> {
    return this.taskModel.findById(id).exec();
  }

  /**
   * Updates a task by its unique identifier.
   * @param {string} id - The unique identifier of the task to update.
   * @param {UpdateTaskDto} updateTaskDto - The data transfer object containing updated task data.
   * @returns {Promise<Task>} A promise that resolves to the updated task.
   */
  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    return this.taskModel
      .findByIdAndUpdate(id, updateTaskDto, { new: true })
      .exec();
  }

  /**
   * Deletes a task by its unique identifier.
   * @param {string} id - The unique identifier of the task to delete.
   * @returns {Promise<Task>} A promise that resolves to the deleted task.
   */
  async remove(id: string): Promise<Task> {
    return this.taskModel.findByIdAndDelete(id).exec();
  }

  /**
   * Searches for tasks that match a given query string.
   * @param {string} query - The search query string.
   * @returns {Promise<Task[]>} A promise that resolves to an array of tasks matching the query.
   */
  async searchTasks(query: string): Promise<Task[]> {
    return this.taskModel.aggregate([
      {
        $search: {
          index: 'default',
          text: {
            query: query,
            path: { wildcard: '*' },
          },
        },
      },
      {
        $sort: { score: { $meta: 'textScore' } },
      },
    ]);
  }
}
