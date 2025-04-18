
import React from 'react';
import { Button } from '@/components/ui/button';
import { FileText, Image } from 'lucide-react';
import { generatePDF, generateImage } from '@/utils/generatePDF';
import { InvoiceData } from '@/types/invoice';
import { useToast } from '@/components/ui/use-toast';

interface DownloadButtonsProps {
  invoiceRef: React.RefObject<HTMLDivElement>;
  invoiceData: InvoiceData;
}

const DownloadButtons: React.FC<DownloadButtonsProps> = ({ invoiceRef, invoiceData }) => {
  const { toast } = useToast();

  const handlePdfDownload = async () => {
    const result = await generatePDF(invoiceRef, invoiceData);
    if (result) {
      toast({
        title: "Success!",
        description: "Your invoice was successfully downloaded as a PDF.",
      });
    } else {
      toast({
        title: "Error",
        description: "Failed to generate PDF. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleImageDownload = async () => {
    const result = await generateImage(invoiceRef, invoiceData);
    if (result) {
      toast({
        title: "Success!",
        description: "Your invoice was successfully downloaded as an image.",
      });
    } else {
      toast({
        title: "Error",
        description: "Failed to generate image. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <Button 
        onClick={handlePdfDownload} 
        className="flex items-center gap-2"
      >
        <FileText className="h-4 w-4" />
        Download PDF
      </Button>
      <Button 
        onClick={handleImageDownload} 
        variant="outline"
        className="flex items-center gap-2"
      >
        <Image className="h-4 w-4" />
        Download Image
      </Button>
    </div>
  );
};

export default DownloadButtons;
