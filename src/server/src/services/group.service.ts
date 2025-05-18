import { DB } from '@/database';
import { HttpException } from '@/exceptions/HttpException';
import { CreateGroupDto, Group } from '@/interfaces/groups.interface';
import { Op } from 'sequelize';
import Container, { Service } from 'typedi';
import { GroupMemberService } from './group_member.service';
import { logger } from '@/utils/logger';
import { group } from 'console';
@Service()
export class GroupService {
  public GroupMember = Container.get(GroupMemberService);

  public async findAll(): Promise<Group[]> {
    const allGroups: Group[] = await DB.Groups.findAll();
    return allGroups;
  }

  public async findAndCountAllWithPagination(
    page = 1,
    pageSize = 10,
    sortBy = 'created_at',
    sortOrder: 'ASC' | 'DESC' = 'DESC',
  ): Promise<{ count: number; rows: Group[] }> {
    const { count, rows }: { count: number; rows: Group[] } = await DB.Groups.findAndCountAll({
      limit: pageSize,
      offset: (page - 1) * pageSize,
      order: [[sortBy, sortOrder]],
      distinct: true,
      col: 'groups.id',
    });
    return { count, rows };
  }

  public async findGroupById(groupId: string): Promise<Group> {
    const findGroup: Group = await DB.Groups.findByPk(groupId);
    if (!findGroup) throw new HttpException(409, "Group doesn't exist");

    return findGroup;
  }

  public async createGroup(groupData: CreateGroupDto): Promise<Group> {
    // Kiểm tra xem topic đã có group chưa
    if (groupData.topicId) {
      const existingGroup = await DB.Groups.findOne({ where: { topicId: groupData.topicId } });
      if (existingGroup) {
        throw new HttpException(409, 'This topic already has a group');
      }
    }

    const createGroupData: Group = await DB.Groups.create(groupData);

    // Thêm tác giả vào nhóm với vai trò leader
    await this.GroupMember.createGroupMember({
      groupId: createGroupData.id,
      userId: groupData.authorId,
      role: 'leader',
    });

    // Thêm tất cả các member vào group
    if (groupData.members) {
      groupData.members.map(async member => {
        if (member !== groupData.authorId) {
          await this.GroupMember.createGroupMember({
            groupId: createGroupData.id,
            userId: member,
            role: 'member',
          });
        }
      });
    }

    return createGroupData;
  }

  public async updateGroup(groupId: string, groupData: Partial<Group>): Promise<Group> {
    const findGroup: Group = await DB.Groups.findByPk(groupId);
    if (!findGroup) throw new HttpException(409, "Group doesn't exist");

    // Kiểm tra xem topic mới đã có group khác chưa (nếu có cập nhật topicId)
    if (groupData.topicId && groupData.topicId !== findGroup.topicId) {
      const existingGroup = await DB.Groups.findOne({
        where: {
          topicId: groupData.topicId,
          id: { [Op.ne]: groupId }, // Không phải group hiện tại
        },
      });

      if (existingGroup) {
        throw new HttpException(409, 'This topic already has another group');
      }
    }

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
