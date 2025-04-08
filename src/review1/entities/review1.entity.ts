export class Review1 {
  id: number; // Unique identifier for the review
  contractId: number; // ID of the associated contract
  reviewerId: number; // ID of the user who wrote the review
  rating: number; // Rating given in the review (1-5)
  comment?: string; // Optional comment for the review
  createdAt: Date; // Timestamp when the review was created
}
