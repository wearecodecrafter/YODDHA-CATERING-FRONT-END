import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Employee, AttendanceRecord } from '../../../interfaces/employee.interface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-attendance',
  imports: [CommonModule, FormsModule],
  templateUrl: './attendance.html',
  styleUrl: './attendance.css',
})
export class Attendance {
  employees: Employee[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', mobile: '1234567890', department: 'IT', designation: 'Developer', joiningDate: '2023-01-01', salary: 50000, status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', mobile: '1234567891', department: 'HR', designation: 'Manager', joiningDate: '2023-01-01', salary: 60000, status: 'Active' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', mobile: '1234567892', department: 'Finance', designation: 'Analyst', joiningDate: '2023-01-01', salary: 55000, status: 'Active' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', mobile: '1234567893', department: 'Operations', designation: 'Coordinator', joiningDate: '2023-01-01', salary: 45000, status: 'Active' },
  ];

  attendanceRecords: AttendanceRecord[] = [];
  searchTerm: string = '';

  markPresent(employeeId: number) {
    const existingRecord = this.attendanceRecords.find(r => r.employeeId === employeeId);
    if (existingRecord) {
      existingRecord.status = 'present';
    } else {
      this.attendanceRecords.push({
        employeeId,
        date: new Date().toISOString().split('T')[0],
        status: 'present'
      });
    }
  }

  markAbsent(employeeId: number) {
    const existingRecord = this.attendanceRecords.find(r => r.employeeId === employeeId);
    if (existingRecord) {
      existingRecord.status = 'absent';
    } else {
      this.attendanceRecords.push({
        employeeId,
        date: new Date().toISOString().split('T')[0],
        status: 'absent'
      });
    }
  }

  markAllPresent() {
    this.employees.forEach(employee => {
      this.markPresent(employee.id);
    });
  }

  markAllAbsent() {
    this.employees.forEach(employee => {
      this.markAbsent(employee.id);
    });
  }

  getAttendanceStatus(employeeId: number): string {
    const record = this.attendanceRecords.find(r => r.employeeId === employeeId);
    return record ? record.status : 'not marked';
  }

  get filteredEmployees(): Employee[] {
    if (!this.searchTerm) {
      return this.employees;
    }
    const term = this.searchTerm.toLowerCase();
    return this.employees.filter(employee =>
      employee.name.toLowerCase().includes(term) ||
      employee.email.toLowerCase().includes(term) ||
      employee.department.toLowerCase().includes(term) ||
      employee.designation.toLowerCase().includes(term)
    );
  }
}
