import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Allowance as AllowanceInterface } from '../../../interfaces/allowance.interface';
import { Employee } from '../../../interfaces/employee.interface';

@Component({
  selector: 'app-allowance',
  imports: [CommonModule, FormsModule],
  templateUrl: './allowance.html',
  styleUrl: './allowance.css',
})
export class Allowance {
  // Mock data for demonstration - in real app, this would come from backend

  employees: Employee[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', mobile: '1234567890', department: 'IT', designation: 'Developer', joiningDate: '2023-01-01', salary: 50000, status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', mobile: '1234567891', department: 'HR', designation: 'Manager', joiningDate: '2023-01-01', salary: 60000, status: 'Active' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', mobile: '1234567892', department: 'Finance', designation: 'Analyst', joiningDate: '2023-01-01', salary: 55000, status: 'Active' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', mobile: '1234567893', department: 'Operations', designation: 'Coordinator', joiningDate: '2023-01-01', salary: 45000, status: 'Active' },
  ];

  allowances: AllowanceInterface[] = [
    {
      id: 1,
      employeeId: 1,
      employeeName: 'John Doe',
      amount: 5000,
      type: 'Travel Allowance',
      allowanceDate: '2024-01-15'
    },
    {
      id: 2,
      employeeId: 2,
      employeeName: 'Jane Smith',
      amount: 10000,
      type: 'Medical Allowance',
      allowanceDate: '2024-01-20'
    },
    {
      id: 3,
      employeeId: 3,
      employeeName: 'Bob Johnson',
      amount: 3000,
      type: 'Conveyance Allowance',
      allowanceDate: '2024-01-22'
    }
  ];

  searchTerm: string = '';
  showForm: boolean = false;

  // Form data
  selectedEmployeeId: number = 0;
  requestAmount: number = 0;
  requestType: string = '';
  requestDate: string = new Date().toISOString().split('T')[0];

  get filteredAllowances(): AllowanceInterface[] {
    if (!this.searchTerm) {
      return this.allowances;
    }
    const term = this.searchTerm.toLowerCase();
    return this.allowances.filter(allowance =>
      allowance.employeeName.toLowerCase().includes(term) ||
      allowance.type.toLowerCase().includes(term)
    );
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  submitAllowanceRequest() {
    if (!this.selectedEmployeeId || !this.requestAmount || !this.requestType || !this.requestDate) {
      alert('Please fill in all fields');
      return;
    }

    const selectedEmployee = this.employees.find(emp => emp.id === this.selectedEmployeeId);
    if (!selectedEmployee) {
      alert('Selected employee not found');
      return;
    }

    const newAllowance: AllowanceInterface = {
      id: this.allowances.length + 1,
      employeeId: this.selectedEmployeeId,
      employeeName: selectedEmployee.name,
      amount: this.requestAmount,
      type: this.requestType,
      allowanceDate: this.requestDate
    };

    this.allowances.unshift(newAllowance);

    // Reset form
    this.selectedEmployeeId = 0;
    this.requestAmount = 0;
    this.requestType = '';
    this.requestDate = new Date().toISOString().split('T')[0];
    this.showForm = false;

    alert('Allowance request submitted successfully!');
  }
}
