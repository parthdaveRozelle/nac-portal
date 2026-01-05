/* eslint-disable @typescript-eslint/no-explicit-any */
export const getMedicationStats = (medicines: unknown[], total: number) => {
  const availableLength = medicines.filter(
    (m: any) => m.available === true
  ).length;
  return [
    {
      statsTitle: "Total",
      statsCount: total,
    },
    {
      statsTitle: "Available",
      statsCount: availableLength,
    },
    {
      statsTitle: "Unavailable",
      statsCount: total - availableLength,
    },
    {
      statsTitle: "AIR/MART Eligible",
      statsCount: 0,
    },
  ];
};
