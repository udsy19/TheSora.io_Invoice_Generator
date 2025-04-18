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
  clientInfo: ClientInfo;
  lineItems: LineItem[];
  paymentDetails: string;
}
