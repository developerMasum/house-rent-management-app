export interface TDonner {
  id: string;
  name: string;
  email: string;
  totalDonations: number;
  bloodType: string;
  location: string;
  availability: boolean;
  createdAt: string;
  updatedAt: string;
  DonorProfile: {
    lastDonationDate: string | null;
    profilePhoto:string | null;
  };
} 


  export const bloodGroups: string[] = [
    "A+",
    "A-",
    "B+",
    "B-",
    "AB+",
    "AB-",
    "O+",
    "O-",
  ];