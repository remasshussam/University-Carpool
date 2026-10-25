export type Role = "Rider" | "Driver" | "Rider & Driver";

export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  faculty: string;
  role: Role;
  bio: string;
  memberSince: string;
};

export type HistoryRide = {
  id: string;
  from: string;
  to: string;
  date: string;
  time: string;
  role: "Rider" | "Driver";
  status: "Completed" | "Canceled";
  otherUser: string;
  fare: number;
  rated: boolean;
};

export type Review = {
  id: string;
  fromId: string;
  from: string;
  stars: number;
  comment: string;
  date: string;
  tags: string[];
};

export type Settings = {
  rideNotifications: boolean;
  messageNotifications: boolean;
  showPhone: boolean;
};

export type PublicUser = {
  id: string;
  name: string;
  faculty: string;
  role: string;
  memberSince: string;
  ridesCount: number;
  reviews: { id: string; from: string; stars: number; comment: string; date: string }[];
};

let user: User = {
  id: "u1",
  name: "Habiba Salem",
  email: "habiba@bue.edu.eg",
  phone: "01012345678",
  faculty: "Informatics & Computer Science",
  role: "Rider & Driver",
  bio: "I usually commute from Nasr City to campus in the morning.",
  memberSince: "Sep 2026",
};

let password = "habiba123";

let settings: Settings = {
  rideNotifications: true,
  messageNotifications: true,
  showPhone: true,
};

let rides: HistoryRide[] = [
  { id: "h1", from: "Nasr City", to: "BUE University", date: "Thu, Oct 20", time: "8:00 AM", role: "Rider", status: "Completed", otherUser: "Ahmed Mohamed", fare: 50, rated: false },
  { id: "h2", from: "Maadi", to: "BUE University", date: "Tue, Oct 18", time: "9:00 AM", role: "Driver", status: "Completed", otherUser: "Omar Khaled", fare: 40, rated: false },
  { id: "h3", from: "Heliopolis", to: "BUE University", date: "Sun, Oct 16", time: "10:00 AM", role: "Rider", status: "Canceled", otherUser: "Mona Ali", fare: 55, rated: false },
  { id: "h4", from: "New Cairo", to: "BUE University", date: "Wed, Oct 12", time: "7:45 AM", role: "Rider", status: "Completed", otherUser: "Salma Hany", fare: 35, rated: true },
  { id: "h5", from: "Madinaty", to: "BUE University", date: "Mon, Oct 10", time: "8:15 AM", role: "Driver", status: "Completed", otherUser: "Youssef Adel", fare: 45, rated: true },
  { id: "h6", from: "Sheraton", to: "BUE University", date: "Sat, Oct 8", time: "9:30 AM", role: "Driver", status: "Canceled", otherUser: "Nour Hassan", fare: 40, rated: false },
];

let reviews: Review[] = [
  { id: "r1", fromId: "p1", from: "Sara Mohamed", stars: 5, comment: "Very friendly and safe driver!", date: "Oct 10, 2026", tags: ["Safe", "Friendly"] },
  { id: "r2", fromId: "p2", from: "Omar Khaled", stars: 4, comment: "Comfortable ride and on time.", date: "Sep 28, 2026", tags: ["On time"] },
  { id: "r3", fromId: "p3", from: "Mona Ali", stars: 5, comment: "Highly recommended!", date: "Sep 20, 2026", tags: ["Friendly", "Clean car"] },
  { id: "r4", fromId: "p4", from: "Youssef Adel", stars: 4, comment: "Good ride, a little late.", date: "Sep 12, 2026", tags: ["Polite"] },
  { id: "r5", fromId: "p5", from: "Nour Hassan", stars: 5, comment: "Clear pickup point and great music.", date: "Sep 5, 2026", tags: ["On time", "Friendly"] },
  { id: "r6", fromId: "p6", from: "Karim Fathy", stars: 3, comment: "Okay ride, but the car was a bit warm.", date: "Aug 30, 2026", tags: [] },
];

const publicUsers: PublicUser[] = [
  { id: "p1", name: "Sara Mohamed", faculty: "Business Administration", role: "Rider", memberSince: "Aug 2026", ridesCount: 14, reviews: [
    { id: "a1", from: "Ali Hassan", stars: 5, comment: "Always on time at the pickup point.", date: "Oct 2, 2026" },
    { id: "a2", from: "Laila Samir", stars: 4, comment: "Nice and polite.", date: "Sep 19, 2026" },
  ] },
  { id: "p2", name: "Omar Khaled", faculty: "Engineering", role: "Rider & Driver", memberSince: "Sep 2026", ridesCount: 9, reviews: [
    { id: "a3", from: "Habiba Salem", stars: 4, comment: "Good company on the way.", date: "Oct 18, 2026" },
  ] },
  { id: "p3", name: "Mona Ali", faculty: "Pharmacy", role: "Rider", memberSince: "Jul 2026", ridesCount: 21, reviews: [
    { id: "a4", from: "Youssef Adel", stars: 5, comment: "Very respectful rider.", date: "Sep 30, 2026" },
    { id: "a5", from: "Nour Hassan", stars: 5, comment: "Great conversation!", date: "Sep 11, 2026" },
  ] },
  { id: "p4", name: "Youssef Adel", faculty: "Informatics & Computer Science", role: "Driver", memberSince: "Jun 2026", ridesCount: 32, reviews: [
    { id: "a6", from: "Mona Ali", stars: 4, comment: "Safe driver, clean car.", date: "Oct 5, 2026" },
  ] },
  { id: "p5", name: "Nour Hassan", faculty: "Mass Communication", role: "Rider & Driver", memberSince: "Sep 2026", ridesCount: 6, reviews: [] },
  { id: "p6", name: "Karim Fathy", faculty: "Law", role: "Rider", memberSince: "Oct 2026", ridesCount: 3, reviews: [
    { id: "a7", from: "Sara Mohamed", stars: 3, comment: "Was a few minutes late.", date: "Oct 1, 2026" },
  ] },
];

export function getInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function getUser(): User {
  return user;
}

export function updateUser(changes: Partial<User>) {
  user = { ...user, ...changes };
}

export function getRides(): HistoryRide[] {
  return rides;
}

export function getRideById(id: string): HistoryRide | undefined {
  return rides.find((ride) => ride.id === id);
}

export function rateRide(rideId: string) {
  rides = rides.map((ride) => (ride.id === rideId ? { ...ride, rated: true } : ride));
}

export function getReviews(): Review[] {
  return reviews;
}

export function getAverageRating(): number {
  if (reviews.length === 0) return 0;
  const total = reviews.reduce((sum, review) => sum + review.stars, 0);
  return total / reviews.length;
}

export function getSettings(): Settings {
  return settings;
}

export function updateSettings(changes: Partial<Settings>) {
  settings = { ...settings, ...changes };
}

export function isCurrentPassword(value: string): boolean {
  return value === password;
}

export function changePassword(newPassword: string) {
  password = newPassword;
}

export function getPublicUser(id: string): PublicUser | undefined {
  return publicUsers.find((person) => person.id === id);
}

export function deleteAccount() {
  rides = [];
  reviews = [];
  password = "";
  user = { ...user, name: "", email: "", phone: "", faculty: "", bio: "" };
}

export function createAccount(name: string, email: string, phone: string, newPassword: string, role: Role) {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const today = new Date();

  user = {
    id: Date.now().toString(),
    name,
    email,
    phone,
    faculty: "",
    role,
    bio: "",
    memberSince: `${months[today.getMonth()]} ${today.getFullYear()}`,
  };
  password = newPassword;
  rides = [];
  reviews = [];
}

export function loginUser(email: string, enteredPassword: string, chosenRole: "Rider" | "Driver"): boolean {
  const correct = user.email !== "" && email === user.email && enteredPassword === password;
  if (correct) user = { ...user, role: chosenRole };
  return correct;
}