import { DB } from '@/database';
import { HttpException } from '@/exceptions/HttpException';
import { Group } from '@/interfaces/groups.interface';
import { Service } from 'typedi';

@Service()
export class GroupService {
  public async findAll(): Promise<Group[]> {
    const allGroups: Group[] = await DB.Groups.findAll();
    return allGroups;
  }

  public async findAndCountAllWithPagination(limit: number, offset: number): Promise<{ count: number; rows: Group[] }> {
    const { count, rows }: { count: number; rows: Group[] } = await DB.Groups.findAndCountAll({
      limit,
      offset,
    });
    return { count, rows };
  }

  public async findGroupById(groupId: string): Promise<Group> {
    const findGroup: Group = await DB.Groups.findByPk(groupId);
    if (!findGroup) throw new HttpException(409, "Group doesn't exist");

    return findGroup;
  }

  public async createGroup(groupData: Partial<Group>): Promise<Group> {
    const createGroupData: Group = await DB.Groups.create(groupData);
    return createGroupData;
  }

  public async updateGroup(groupId: string, groupData: Partial<Group>): Promise<Group> {
    const findGroup: Group = await DB.Groups.findByPk(groupId);
    if (!findGroup) throw new HttpException(409, "Group doesn't exist");

    await DB.Groups.update(groupData, { where: { id: groupId } });

    const updateGroup: Group = await DB.Groups.findByPk(groupId);
    return updateGroup;
  }

  public async deleteGroup(groupId: string): Promise<Group> {
    const findGroup: Group = await DB.Groups.findByPk(groupId);
    if (!findGroup) throw new HttpException(409, "Group doesn't exist");

    await DB.Groups.destroy({ where: { id: groupId } });

    const softDeletedGroup: Group = await DB.Groups.findByPk(groupId);
    return softDeletedGroup;
  }

  public async destroyGroup(groupId: string): Promise<Group> {
    const findGroup: Group = await DB.Groups.findByPk(groupId, { paranoid: false });
    if (!findGroup) throw new HttpException(409, "Group doesn't exist");

    await DB.Groups.destroy({ force: true, where: { id: groupId } });

    return findGroup;
  }
}
