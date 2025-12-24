import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Employee } from '../../../interfaces/employee.interface';

@Component({
  selector: 'app-employees',
  imports: [CommonModule, FormsModule],
  templateUrl: './employees.html',
  styleUrl: './employees.css',
})
export class Employees {
  employees: Employee[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', mobile: '1234567890', department: 'IT', designation: 'Developer', joiningDate: '2023-01-01', salary: 50000, status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', mobile: '1234567891', department: 'HR', designation: 'Manager', joiningDate: '2023-01-01', salary: 60000, status: 'Active' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', mobile: '1234567892', department: 'Finance', designation: 'Analyst', joiningDate: '2023-01-01', salary: 55000, status: 'Active' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', mobile: '1234567893', department: 'Operations', designation: 'Coordinator', joiningDate: '2023-01-01', salary: 45000, status: 'Active' },
  ];

  showForm: boolean = false;

  // Form data
  employeeName: string = '';
  email: string = '';
  mobile: string = '';
  department: string = '';
  designation: string = '';
  joiningDate: string = '';
  salary: number = 0;
  status: 'Active' | 'Inactive' = 'Active';

  toggleForm() {
    this.showForm = !this.showForm;
  }

  submitEmployee() {
    if (!this.employeeName || !this.email || !this.mobile || !this.department || !this.designation || !this.joiningDate || !this.salary) {
      alert('Please fill in all fields');
      return;
    }

    const newEmployee: Employee = {
      id: this.employees.length + 1,
      name: this.employeeName,
      email: this.email,
      mobile: this.mobile,
      department: this.department,
      designation: this.designation,
      joiningDate: this.joiningDate,
      salary: this.salary,
      status: this.status
    };

    this.employees.push(newEmployee);

    // Reset form
    this.employeeName = '';
    this.email = '';
    this.mobile = '';
    this.department = '';
    this.designation = '';
    this.joiningDate = '';
    this.salary = 0;
    this.status = 'Active';
    this.showForm = false;

    alert('Employee registered successfully!');
  }

  resetForm() {
    this.employeeName = '';
    this.email = '';
    this.mobile = '';
    this.department = '';
    this.designation = '';
    this.joiningDate = '';
    this.salary = 0;
    this.status = 'Active';
  }
}
