import { Test, TestingModule } from '@nestjs/testing';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { BadRequestException } from '@nestjs/common';
import { Task } from './schemas/task.schema';

describe('TaskController', () => {
  let controller: TaskController;
  let service: TaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [
        {
          provide: TaskService,
          useValue: {
            findAll: jest.fn(),
            searchTasks: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            remove: jest.fn(),
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<TaskController>(TaskController);
    service = module.get<TaskService>(TaskService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of tasks', async () => {
      const result: Task[] = [
        {
          title: 'Test Task',
          description: '',
          completed: false,
          created_at: new Date(),
        },
      ];
      jest.spyOn(service, 'findAll').mockResolvedValue(result);

      expect(await controller.findAll()).toBe(result);
    });
  });

  describe('searchTasks', () => {
    it('should return an array of tasks matching the query', async () => {
      const query = 'test';
      const result: Task[] = [
        {
          title: 'Test Task',
          description: '',
          completed: false,
          created_at: new Date(),
        },
      ];
      jest.spyOn(service, 'searchTasks').mockResolvedValue(result);

      expect(await controller.searchTasks(query)).toBe(result);
      expect(service.searchTasks).toHaveBeenCalledWith(query);
    });

    it('should throw BadRequestException if query is empty', async () => {
      await expect(controller.searchTasks('')).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('findOne', () => {
    it('should return a single task', async () => {
      const result: Task = {
        title: 'Test Task',
        description: '',
        completed: false,
        created_at: new Date(),
      };
      const mockId = '507f1f77bcf86cd799439011'; // Example MongoDB ObjectId
      jest.spyOn(service, 'findOne').mockResolvedValue(result);

      expect(await controller.findOne({ id: mockId })).toBe(result);
      expect(service.findOne).toHaveBeenCalledWith(mockId);
    });
  });

  describe('create', () => {
    it('should create a new task', async () => {
      const createTaskDto: CreateTaskDto = { title: 'New Task' };
      const result: Task = {
        title: 'New Task',
        description: '',
        completed: false,
        created_at: new Date(),
      };
      jest.spyOn(service, 'create').mockResolvedValue(result);

      expect(await controller.create(createTaskDto)).toBe(result);
      expect(service.create).toHaveBeenCalledWith(createTaskDto);
    });
  });

  describe('remove', () => {
    it('should remove a task', async () => {
      const result: Task = {
        title: 'Deleted Task',
        description: '',
        completed: false,
        created_at: new Date(),
      };
      const mockId = '507f1f77bcf86cd799439011'; // Example MongoDB ObjectId
      jest.spyOn(service, 'remove').mockResolvedValue(result);

      expect(await controller.remove({ id: mockId })).toBe(result);
      expect(service.remove).toHaveBeenCalledWith(mockId);
    });
  });

  describe('update', () => {
    it('should update a task', async () => {
      const updateTaskDto: UpdateTaskDto = { title: 'Updated Task' };
      const result: Task = {
        title: 'Updated Task',
        description: '',
        completed: false,
        created_at: new Date(),
      };
      const mockId = '507f1f77bcf86cd799439011'; // Example MongoDB ObjectId
      jest.spyOn(service, 'update').mockResolvedValue(result);

      expect(await controller.update({ id: mockId }, updateTaskDto)).toBe(
        result,
      );
      expect(service.update).toHaveBeenCalledWith(mockId, updateTaskDto);
    });
  });
});
