export interface Employee {
  id: number;
  name: string;
  email: string;
  mobile: string;
  department: string;
  designation: string;
  joiningDate: string;
  salary: number;
  status: 'Active' | 'Inactive';
}

export interface AttendanceRecord {
  employeeId: number;
  date: string;
  status: 'present' | 'absent';
}
