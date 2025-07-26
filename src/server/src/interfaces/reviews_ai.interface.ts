export interface ReviewAI {
  id: string;
  pullRequestId: string;
  authorId: string;
  score: number;
  reviews: string; //json
}
