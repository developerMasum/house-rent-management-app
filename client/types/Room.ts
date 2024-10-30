export type TPayment = {
  id: string;
  amount: number;
  paymentDate: string; // or Date if you're converting strings to Date objects
  method: string;
  invoiceUrl: string;
  status: "PENDING" | "PAID" | "FAILED"; // Adjust statuses based on possible values
  createdAt: string;
  updatedAt: string;
  tenantId: string;
  roomId: string;
};

export type TMaintenanceRequest = {
  id: string;
  request: string;
  status: "PENDING" | "COMPLETED" | "IN_PROGRESS"; // Adjust statuses based on possible values
  createdAt: string;
  updatedAt: string;
  roomId: string;
};

export type TRoom = {
  id: string;
  roomNo: number;
  floorNo: number;
  roomRent: number;
  advancedRent: number;
  dueAmount: number;
  isAvailable: boolean;
  vacantFrom: string | null; // ISO date string or null
  vacantTo: string | null;
  house: {
    name: string;
  };
  payments: TPayment[];
  maintenanceRequests: TMaintenanceRequest[];
};
