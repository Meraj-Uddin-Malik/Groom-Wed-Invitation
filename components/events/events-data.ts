export type WeddingEvent = {
  id: "nikkah" | "mehndi" | "baraat" | "walima";
  name: string;
  date: string;
  venue: string;
  theme: {
    background: string;
    accent: string;
  };
  schedule: {
    time: string;
    activity: string;
  }[];
};

export const weddingEvents: WeddingEvent[] = [
  {
    id: "nikkah",
    name: "Nikkah",
    date: "Friday, 08 January 2027",
    venue: "Bride's Residence",
    theme: {
      background: "pearl-ivory",
      accent: "antique-gold",
    },
    schedule: [
      { time: "5:30 PM", activity: "Arrival of Guests" },
      { time: "6:00 PM", activity: "Nikkah Ceremony" },
      { time: "7:30 PM", activity: "Dinner" },
    ],
  },
  {
    id: "mehndi",
    name: "Mehndi",
    date: "Saturday, 09 January 2027",
    venue: "AG Malik Residence",
    theme: {
      background: "dusty-rose",
      accent: "burgundy",
    },
    schedule: [
      { time: "6:15 PM", activity: "Arrival of Guests" },
      { time: "6:45 PM", activity: "Mehndi Celebration" },
      { time: "9:00 PM", activity: "Dinner" },
    ],
  },
  {
    id: "baraat",
    name: "Baraat",
    date: "Sunday, 10 January 2027",
    venue: "AGM Home",
    theme: {
      background: "champagne",
      accent: "royal-bronze",
    },
    schedule: [
      { time: "9:30 AM", activity: "Gathering" },
      { time: "10:00 AM", activity: "Departure" },
    ],
  },
  {
    id: "walima",
    name: "Walima",
    date: "Sunday, 10 January 2027",
    venue: "Rose Mehal Banquet",
    theme: {
      background: "deep-emerald",
      accent: "champagne-gold",
    },
    schedule: [
      { time: "11:00 AM", activity: "Guest Arrival" },
      { time: "12:00 PM", activity: "Reception" },
      { time: "1:30 PM", activity: "Lunch" },
      { time: "4:00 PM", activity: "Conclusion" },
    ],
  },
];
