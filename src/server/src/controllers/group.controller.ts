import { RequestWithUser } from '@/interfaces/auth.interface';
import { CreateGroupDto, Group } from '@/interfaces/groups.interface';
import { GroupService } from '@/services/group.service';
import { NextFunction, Request, Response } from 'express';

export class GroupController {
  public groupService = new GroupService();

  public getGroups = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllGroupsData: Group[] = await this.groupService.findAll();
      res.status(200).json({ data: findAllGroupsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getGroupsWithPagination = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { limit, offset } = req.query;
      const { count, rows } = await this.groupService.findAndCountAllWithPagination(Number(limit), Number(offset));
      res.status(200).json({ data: { count, rows }, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getGroupById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const groupId: string = req.params.id;
      const findOneGroupData: Group = await this.groupService.findGroupById(groupId);
      res.status(200).json({ data: findOneGroupData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createGroup = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const groupData: CreateGroupDto = req.body;
      const userId: string = req.user.id;
      const createGroupData: Group = await this.groupService.createGroup({
        ...groupData,
        authorId: userId,
      });
      res.status(201).json({ data: createGroupData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateGroup = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const groupId: string = req.params.id;
      const groupData: CreateGroupDto = req.body;
      const updateGroupData: Group = await this.groupService.updateGroup(groupId, groupData);
      res.status(200).json({ data: updateGroupData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteGroup = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const groupId: string = req.params.id;
      const deleteGroupData: Group = await this.groupService.deleteGroup(groupId);
      res.status(200).json({ data: deleteGroupData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };

  public destroyGroup = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const groupId: string = req.params.id;
      const destroyGroupData: Group = await this.groupService.destroyGroup(groupId);
      res.status(200).json({ data: destroyGroupData, message: 'destroyed' });
    } catch (error) {
      next(error);
    }
  };
}
