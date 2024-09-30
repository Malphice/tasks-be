import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './schemas/task.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

/**
 * Controller responsible for handling task-related HTTP requests.
 * Uses TaskService for business logic and data operations.
 */
@Controller('task')
export class TaskController {
  constructor(private readonly tasksService: TaskService) {}

  /**
   * Retrieves all tasks.
   * @returns {Promise<Task[]>} A promise that resolves to an array of tasks.
   */
  @Get()
  async findAll(): Promise<Task[]> {
    return await this.tasksService.findAll();
  }

  /**
   * Searches for tasks that match a given query string.
   * @param {string} query - The search query string.
   * @returns {Promise<Task[]>} A promise that resolves to an array of tasks matching the query.
   * @throws {BadRequestException} If the query parameter is missing or empty.
   */
  @Get('search')
  async searchTasks(@Query('query') query: string): Promise<Task[]> {
    if (!query || query.trim() === '') {
      throw new BadRequestException('Search query must not be empty');
    }
    return await this.tasksService.searchTasks(query);
  }

  /**
   * Retrieves a single task by its unique identifier.
   * @param {Object} params - The route parameters.
   * @param {string} params.id - The unique identifier of the task to retrieve.
   * @returns {Promise<Task>} A promise that resolves to the retrieved task.
   */
  @Get(':id')
  async findOne(@Param() params: { id: string }): Promise<Task> {
    return await this.tasksService.findOne(params.id);
  }

  /**
   * Creates a new task.
   * @param {createTaskDto} createTaskDto A data transfer object containing task data.
   * @returns {Promise<Task>} A promise that resolves to the created task.
   */
  @Post()
  async create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return await this.tasksService.create(createTaskDto);
  }

  /**
   * Deletes a task by ID.
   * @param {Object} params - The route parameters.
   * @param {string} params.id - The unique identifier of the task to delete.
   * @returns {Promise<Task>} A promise that resolves to the deleted task.
   */
  @Delete(':id')
  async remove(@Param() params: { id: string }): Promise<Task> {
    return await this.tasksService.remove(params.id);
  }

  /**
   * Updates a task by ID.
   * @param {Object} params - The route parameters.
   * @param {string} params.id - The unique identifier of the task to update.
   * @param {UpdateTaskDto} updateTaskDto - A data transfer object containing updated task data.
   * @returns {Promise<Task>} A promise that resolves to the updated task.
   */
  @Patch(':id')
  async update(
    @Param() params: { id: string },
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    return await this.tasksService.update(params.id, updateTaskDto);
  }
}
