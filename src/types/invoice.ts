export interface LineItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  isAdvancePayment?: boolean;
}

export interface ClientInfo {
  name: string;
  email: string;
  address: string;
  phone: string;
}

export interface InvoiceData {
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  date?: string;
  shootDate?: Date;
  shootLocation?: string;
  clientInfo: ClientInfo;
  businessInfo?: BusinessInfo;
  lineItems: LineItem[];
  totalAmount?: number;
  paymentDetails: string;
}

export interface BusinessInfo {
  businessName?: string;
  email?: string;
  phone?: string;
  address?: string;
}
