export const jobs = [
    {
      id: "job1",
      clientId: "user1", // Posted by client
      title: "E-commerce Website",
      description: "Build online store for local business",
      category: "tech",
      budget: 500000,
      numberOfSlots: 2,
      acceptedSlots: 1,
      status: "in_progress",
      createdAt: new Date("2024-02-01"),
    },
    {
      id: "job2",
      clientId: "user1", // Same client
      title: "Mobile App Translation",
      description: "English to French localization",
      category: "tech",
      budget: 250000,
      numberOfSlots: 3,
      acceptedSlots: 0,
      status: "open",
      createdAt: new Date("2024-02-15"),
    },
  ];