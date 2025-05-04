import { DB } from '@/database';
import { HttpException } from '@/exceptions/HttpException';
import { GroupMember } from '@/interfaces/groups.interface';
import { Service } from 'typedi';

@Service()
export class GroupMemberService {
  public async findAll(): Promise<GroupMember[]> {
    const allGroupMembers: GroupMember[] = await DB.GroupMembers.findAll();
    return allGroupMembers;
  }

  public async findAndCountAllWithPagination(limit: number, offset: number): Promise<{ count: number; rows: GroupMember[] }> {
    const { count, rows }: { count: number; rows: GroupMember[] } = await DB.GroupMembers.findAndCountAll({
      limit,
      offset,
    });
    return { count, rows };
  }

  public async findGroupMemberById(groupMemberId: string): Promise<GroupMember> {
    const findGroupMember: GroupMember = await DB.GroupMembers.findByPk(groupMemberId);
    if (!findGroupMember) throw new HttpException(409, "Group member doesn't exist");

    return findGroupMember;
  }

  public async findGroupMembersByGroupId(groupId: string): Promise<GroupMember[]> {
    const findGroupMembers: GroupMember[] = await DB.GroupMembers.findAll({ where: { groupId } });
    return findGroupMembers;
  }

  public async findGroupMembersByUserId(userId: string): Promise<GroupMember[]> {
    const findGroupMembers: GroupMember[] = await DB.GroupMembers.findAll({ where: { userId } });
    return findGroupMembers;
  }

  public async createGroupMember(groupMemberData: Partial<GroupMember>): Promise<GroupMember> {
    const createGroupMemberData: GroupMember = await DB.GroupMembers.create(groupMemberData);
    return createGroupMemberData;
  }

  public async updateGroupMember(groupMemberId: string, groupMemberData: Partial<GroupMember>): Promise<GroupMember> {
    const findGroupMember: GroupMember = await DB.GroupMembers.findByPk(groupMemberId);
    if (!findGroupMember) throw new HttpException(409, "Group member doesn't exist");

    await DB.GroupMembers.update(groupMemberData, { where: { id: groupMemberId } });

    const updateGroupMember: GroupMember = await DB.GroupMembers.findByPk(groupMemberId);
    return updateGroupMember;
  }

  public async deleteGroupMember(groupMemberId: string): Promise<GroupMember> {
    const findGroupMember: GroupMember = await DB.GroupMembers.findByPk(groupMemberId);
    if (!findGroupMember) throw new HttpException(409, "Group member doesn't exist");

    await DB.GroupMembers.destroy({ where: { id: groupMemberId } });

    const softDeletedGroupMember: GroupMember = await DB.GroupMembers.findByPk(groupMemberId);
    return softDeletedGroupMember;
  }

  public async destroyGroupMember(groupMemberId: string): Promise<GroupMember> {
    const findGroupMember: GroupMember = await DB.GroupMembers.findByPk(groupMemberId, { paranoid: false });
    if (!findGroupMember) throw new HttpException(409, "Group member doesn't exist");

    await DB.GroupMembers.destroy({ force: true, where: { id: groupMemberId } });

    return findGroupMember;
  }
}
