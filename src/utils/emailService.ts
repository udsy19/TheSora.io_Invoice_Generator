import emailjs from '@emailjs/browser';
import { InvoiceData } from '../types/invoice';
import { format } from 'date-fns';

// EmailJS credentials
const EMAIL_SERVICE_ID = 'service_1ue686r';
const EMAIL_TEMPLATE_ID = 'template_x79uf6b'; // Updated to the correct template ID
const EMAIL_PUBLIC_KEY = 'CVAoJiccelkwIf9NY';

export enum ReminderType {
  INVOICE = 'invoice',
  CONTRACT = 'contract'
}

interface Attachment {
  file: Blob;
  name: string;
}

interface SendReminderEmailParams {
  invoiceData: InvoiceData;
  reminderType: ReminderType;
  attachment?: Attachment;
  customMessage?: string;
}

export const sendReminderEmail = async ({ 
  invoiceData, 
  reminderType,
  attachment,
  customMessage
}: SendReminderEmailParams): Promise<{ success: boolean, error?: string }> => {
  try {
    // Format shoot date for template
    const shootDate = invoiceData.shootDate ? new Date(invoiceData.shootDate) : new Date();
    const shootDay = format(shootDate, 'EEEE');
    const shootMonth = format(shootDate, 'MMMM');
    const shootDateNum = format(shootDate, 'd');
    
    // Debug info
    console.log('Client email:', invoiceData.clientInfo.email);
    
    // Prepare template parameters matching the EmailJS template variables
    const templateParams = {
      to_email: invoiceData.clientInfo.email,
      to_name: invoiceData.clientInfo.name || 'Client',
      from_name: 'The Sora Photography',
      from_email: 'hello@thesora.io',
      shoot_day: shootDay,
      shoot_month: shootMonth,
      shoot_date: shootDateNum,
      shoot_location: invoiceData.shootLocation || 'Hovde Hall',
      custom_message: customMessage || '',
      service_type: reminderType === ReminderType.INVOICE ? 'invoice payment' : 'contract signature',
    };
    
    // Make sure recipient email is set
    if (!templateParams.to_email) {
      return { 
        success: false, 
        error: "The recipient's address is empty. Please provide a valid email address." 
      };
    }

    // Try direct send method
    console.log('Template params:', JSON.stringify(templateParams, null, 2));
    
    const response = await emailjs.send(
      EMAIL_SERVICE_ID,
      EMAIL_TEMPLATE_ID,
      templateParams,
      EMAIL_PUBLIC_KEY
    );

    console.log('Email sent successfully:', response);
    return { success: true };
    
  } catch (error) {
    console.error('Error sending email:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error sending email'
    };
  }
};

// Initialize EmailJS
export const initEmailService = () => {
  emailjs.init(EMAIL_PUBLIC_KEY);
};