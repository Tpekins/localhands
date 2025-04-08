export class Availabilty {
  id: number; // Unique identifier for the availability
  providerId: number; // ID of the provider
  dayOfWeek: number; // Day of the week (0 = Sunday, 6 = Saturday)
  startTime: Date; // Start time of availability
  endTime: Date; // End time of availability
  createdAt: Date; // Timestamp when the availability was created
}
