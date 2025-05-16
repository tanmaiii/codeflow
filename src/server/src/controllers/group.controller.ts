import { RequestWithUser } from '@/interfaces/auth.interface';
import { CreateGroupDto, Group, GroupMember } from '@/interfaces/groups.interface';
import { GroupService } from '@/services/group.service';
import { GroupMemberService } from '@/services/group_member.service';
import { NextFunction, Request, Response } from 'express';

export class GroupController {
  public groupService = new GroupService();
  public groupMemberService = new GroupMemberService();

  public getGroups = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { page = 1, limit = 10, sortBy = 'created_at', order = 'DESC' } = req.query;
      const { count, rows } = await this.groupService.findAndCountAllWithPagination(
        Number(page),
        Number(limit),
        String(sortBy),
        order as 'ASC' | 'DESC',
      );
      res.status(200).json({
        data: rows,
        pagination: {
          totalItems: count,
          totalPages: Math.ceil(count / Number(limit)),
          currentPage: Number(page),
          pageSize: Number(limit),
        },
        message: 'findAll',
      });
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

  public addMemberToGroup = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const groupId: string = req.params.id;
      const userId: string = req.body.userId;
      const addMemberToGroupData: GroupMember = await this.groupMemberService.createGroupMember({
        groupId,
        userId,
        role: 'member',
      });
      res.status(201).json({ data: addMemberToGroupData, message: 'added' });
    } catch (error) {
      next(error);
    }
  };
}
