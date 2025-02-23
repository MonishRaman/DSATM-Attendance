export interface Student {
  id: string;
  usn: string;
  name: string;
  present: boolean;
}

export interface AttendanceRecord {
  date: string;
  students: Student[];
}