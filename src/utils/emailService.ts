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
    // Create form data for email with attachment
    const formData = new FormData();
    
    // Format shoot date for template
    const shootDate = invoiceData.shootDate ? new Date(invoiceData.shootDate) : new Date();
    const shootDay = format(shootDate, 'EEEE');
    const shootMonth = format(shootDate, 'MMMM');
    const shootDateNum = format(shootDate, 'd');
    
    // Prepare template parameters matching the EmailJS template variables
    const templateParams = {
      to_email: invoiceData.clientInfo.email,
      name: invoiceData.clientInfo.name || 'Client',
      shoot_day: shootDay,
      shoot_month: shootMonth,
      shoot_date: shootDateNum,
      shoot_location: invoiceData.shootLocation || 'Hovde Hall',
      custom_message: customMessage || '',
      service_type: reminderType === ReminderType.INVOICE ? 'invoice payment' : 'contract signature',
    };

    // Add parameters to form data
    formData.append('service_id', EMAIL_SERVICE_ID);
    formData.append('template_id', EMAIL_TEMPLATE_ID);
    formData.append('user_id', EMAIL_PUBLIC_KEY);
    
    // Add template parameters
    Object.keys(templateParams).forEach(key => {
      formData.append(`template_params[${key}]`, templateParams[key as keyof typeof templateParams]);
    });
    
    // Send email using fetch to support file attachments
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send-form', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      console.log('Email sent successfully');
      return { success: true };
    } else {
      const errorText = await response.text();
      console.error('Email error response:', errorText);
      
      // Check for common errors
      if (errorText.includes('credit') || errorText.includes('quota') || errorText.includes('limit')) {
        return { 
          success: false, 
          error: 'EmailJS credit balance is too low. Please check your account.' 
        };
      } else if (errorText.includes('template')) {
        return { 
          success: false, 
          error: 'Template not found or template error. Please check your EmailJS template configuration.' 
        };
      } else {
        return { 
          success: false, 
          error: 'Failed to send email: ' + errorText
        };
      }
    }
  } catch (error) {
    console.error('Error sending email:', error);
    return { 
      success: false, 
      error: 'Network or configuration error. Please check your internet connection and EmailJS settings.' 
    };
  }
};

// Initialize EmailJS
export const initEmailService = () => {
  emailjs.init(EMAIL_PUBLIC_KEY);
};