export interface Customer {
    id: number;
    fullName: string;
    email: string;
    phoneNumber: string;
    dateOfRegistration: string; // ISO date format (e.g., "2025-03-06T12:00:00Z")
    customerType: 'Individual' | 'Business';
    profilePicture: string; // Base64 string stored in localStorage
}
