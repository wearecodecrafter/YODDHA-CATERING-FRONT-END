import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdvanceRequest } from '../../../interfaces/advance.interface';
import { Employee } from '../../../interfaces/employee.interface';

@Component({
  selector: 'app-advance',
  imports: [CommonModule, FormsModule],
  templateUrl: './advance.html',
  styleUrl: './advance.css',
})
export class Advance {
  // Mock data for demonstration - in real app, this would come from backend

  employees: Employee[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', mobile: '1234567890', department: 'IT', designation: 'Developer', joiningDate: '2023-01-01', salary: 50000, status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', mobile: '1234567891', department: 'HR', designation: 'Manager', joiningDate: '2023-01-01', salary: 60000, status: 'Active' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', mobile: '1234567892', department: 'Finance', designation: 'Analyst', joiningDate: '2023-01-01', salary: 55000, status: 'Active' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', mobile: '1234567893', department: 'Operations', designation: 'Coordinator', joiningDate: '2023-01-01', salary: 45000, status: 'Active' },
  ];

  advanceRequests: AdvanceRequest[] = [
    {
      id: 1,
      employeeId: 1,
      employeeName: 'John Doe',
      amount: 5000,
      reason: 'Medical emergency',
      advanceDate: '2024-01-15'
    },
    {
      id: 2,
      employeeId: 2,
      employeeName: 'Jane Smith',
      amount: 10000,
      reason: 'Home renovation',
      advanceDate: '2024-01-20'
    },
    {
      id: 3,
      employeeId: 3,
      employeeName: 'Bob Johnson',
      amount: 3000,
      reason: 'Education fees',
      advanceDate: '2024-01-22'
    }
  ];

  searchTerm: string = '';
  showForm: boolean = false;

  // Form data
  selectedEmployeeId: number = 0;
  requestAmount: number = 0;
  requestReason: string = '';
  requestDate: string = new Date().toISOString().split('T')[0];

  get filteredRequests(): AdvanceRequest[] {
    if (!this.searchTerm) {
      return this.advanceRequests;
    }
    const term = this.searchTerm.toLowerCase();
    return this.advanceRequests.filter(request =>
      request.employeeName.toLowerCase().includes(term) ||
      request.reason.toLowerCase().includes(term)
    );
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  submitAdvanceRequest() {
    if (!this.selectedEmployeeId || !this.requestAmount || !this.requestReason || !this.requestDate) {
      alert('Please fill in all fields');
      return;
    }

    const selectedEmployee = this.employees.find(emp => emp.id === this.selectedEmployeeId);
    if (!selectedEmployee) {
      alert('Selected employee not found');
      return;
    }

    const newRequest: AdvanceRequest = {
      id: this.advanceRequests.length + 1,
      employeeId: this.selectedEmployeeId,
      employeeName: selectedEmployee.name,
      amount: this.requestAmount,
      reason: this.requestReason,
      advanceDate: this.requestDate
    };

    this.advanceRequests.unshift(newRequest);

    // Reset form
    this.selectedEmployeeId = 0;
    this.requestAmount = 0;
    this.requestReason = '';
    this.requestDate = new Date().toISOString().split('T')[0];
    this.showForm = false;

    alert('Advance request submitted successfully!');
  }
}
