
export interface ITopic {
    id: string;
    title: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface ITopicCreateDto {
    title: string;
    description: string;
}

