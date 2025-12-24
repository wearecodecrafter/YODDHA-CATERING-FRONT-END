import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Employee } from '../../../interfaces/employee.interface';

@Component({
  selector: 'app-report',
  imports: [CommonModule],
  templateUrl: './report.html',
  styleUrl: './report.css',
})
export class Report {
  // Mock data for demonstration - in real app, this would come from backend

  showReport: boolean = false;

  contractors: Employee[] = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      mobile: '1234567890',
      department: 'IT',
      designation: 'Developer',
      joiningDate: '2023-01-01',
      salary: 50000,
      status: 'Active'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      mobile: '0987654321',
      department: 'HR',
      designation: 'Manager',
      joiningDate: '2022-05-15',
      salary: 60000,
      status: 'Active'
    },
    {
      id: 3,
      name: 'Bob Johnson',
      email: 'bob@example.com',
      mobile: '1122334455',
      department: 'Finance',
      designation: 'Accountant',
      joiningDate: '2021-08-20',
      salary: 55000,
      status: 'Active'
    }
  ];

  selectedEmployee: Employee = this.contractors[0];

  selectedMonth: string = 'January 2024';

  attendanceData = {
    totalDays: 30,
    presentDays: 28,
    absentDays: 2,
    lateDays: 1,
    overtimeHours: 5
  };

  allowanceData = [
    { type: 'Travel Allowance', amount: 5000, date: '2024-01-15' },
    { type: 'Medical Allowance', amount: 3000, date: '2024-01-20' },
    { type: 'Conveyance Allowance', amount: 2000, date: '2024-01-25' }
  ];

  advanceData = [
    { reason: 'Medical emergency', amount: 10000, date: '2024-01-10' },
    { reason: 'Home renovation', amount: 15000, date: '2024-01-18' }
  ];

  currentDate: Date = new Date();

  get totalAllowance(): number {
    return this.allowanceData.reduce((sum, allowance) => sum + allowance.amount, 0);
  }

  get totalAdvance(): number {
    return this.advanceData.reduce((sum, advance) => sum + advance.amount, 0);
  }

  get netSalary(): number {
    return this.selectedEmployee.salary + this.totalAllowance - this.totalAdvance;
  }

  viewReport(employee: Employee): void {
    this.selectedEmployee = employee;
    this.showReport = true;
  }

  backToList(): void {
    this.showReport = false;
  }

  printReport(): void {
    window.print();
  }
}
