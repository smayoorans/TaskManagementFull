
export interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  priority: string;
  assignee?: User;
}

export interface User {
  id: number;
  name:string;
  email: string;
  phone: string;
  password: string;
  address?: Address
  tasks: Task[];
}

export interface Address {
  id: number;
  addressLine1: string;
  addressLine2: string;
  city: string;
}
