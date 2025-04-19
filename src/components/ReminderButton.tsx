import React, { useState } from 'react';
import { Button } from './ui/button';
import { InvoiceData } from '../types/invoice';
import { ReminderType, sendReminderEmail } from '../utils/emailService';
import { useToast } from '../hooks/use-toast';
import { Mail } from 'lucide-react';

interface ReminderButtonProps {
  invoiceData: InvoiceData;
  reminderType: ReminderType;
  documentRef: React.RefObject<HTMLDivElement>;
  className?: string;
  generateDocument: (ref: React.RefObject<HTMLDivElement>, data: InvoiceData, filename?: string, saveFile?: boolean) => Promise<any>;
  documentName: string;
}

export const ReminderButton: React.FC<ReminderButtonProps> = ({
  invoiceData,
  reminderType,
  documentRef,
  generateDocument,
  documentName,
  className
}) => {
  const [isSending, setIsSending] = useState(false);
  const { toast } = useToast();

  const handleSendEmail = async () => {
    // Validate email
    if (!invoiceData.clientInfo.email) {
      toast({
        title: "Missing email address",
        description: "Please add a client email address first.",
        variant: "destructive"
      });
      return;
    }

    setIsSending(true);
    try {
      // Generate PDF without saving to disk
      const clientName = invoiceData.clientInfo.name?.replace(/\s+/g, '-') || 'Client';
      const today = new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
        .replace(/,\s/g, '-');
      
      const filename = reminderType === ReminderType.INVOICE 
        ? `TheSora_Invoice_${invoiceData.invoiceNumber}`
        : `TheSora_Agreement_${clientName}_${today}`;
      
      const pdfResult = await generateDocument(documentRef, invoiceData, filename, false);
      
      if (!pdfResult) {
        throw new Error("Failed to generate document");
      }

      // Send email with attachment
      const success = await sendReminderEmail({
        invoiceData,
        reminderType,
        attachment: {
          file: pdfResult.blob,
          name: pdfResult.filename
        }
      });

      if (success) {
        toast({
          title: "Email sent",
          description: `${documentName} has been emailed to ${invoiceData.clientInfo.email}`,
        });
      } else {
        throw new Error("Failed to send email");
      }
    } catch (error) {
      toast({
        title: "Error sending email",
        description: "Please check your email configuration and try again.",
        variant: "destructive"
      });
      console.error("Error sending email:", error);
    } finally {
      setIsSending(false);
    }
  };

  const buttonText = reminderType === ReminderType.INVOICE
    ? `Email Invoice`
    : `Email Contract`;

  return (
    <Button
      variant="outline"
      className={`flex items-center gap-2 ${className}`}
      onClick={handleSendEmail}
      disabled={isSending}
    >
      <Mail className="h-4 w-4" />
      {isSending ? "Sending..." : buttonText}
    </Button>
  );
};