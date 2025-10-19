export interface Vehicle {
  id: number;
  name: string;
  percentage: number;
  contributors: number;
  state: 'empty' | 'in-progress' | 'full';
}

export interface DonationFormData {
  amount: number;
  customAmount: string;
  selectedVehicle: number;
}