import React, { useState, useRef } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import InvoiceForm from '@/components/InvoiceForm';
import InvoicePreview from '@/components/InvoicePreview';
import DownloadButtons from '@/components/DownloadButtons';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';
import { InvoiceData } from '@/types/invoice';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';

const Index = () => {
  const navigate = useNavigate();
  const invoiceRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState("form");
  
  const [invoiceData, setInvoiceData] = useState<InvoiceData>({
    invoiceNumber: 'TS-2025-001',
    issueDate: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    clientInfo: {
      name: '',
      email: '',
      address: '',
      phone: '',
    },
    lineItems: [
      {
        id: crypto.randomUUID(),
        description: 'Photography Session',
        quantity: 1,
        rate: 500,
      }
    ],
    paymentDetails: 'Payment is due within 14 days of the invoice date.\nAccepted payment methods: Bank Transfer, PayPal, Venmo\n\nThank you for your business!',
  });

  const handleGenerateContract = () => {
    navigate('/contract', { state: { invoiceData } });
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <Navigation />
      
      {/* Header with gradient background */}
      <div className="bg-sora-gradient pt-12 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center mb-6">
            <img 
              src="/images/Logo.png" 
              alt="The Sora Photography" 
              className="h-24 object-contain"
              onError={(e) => {
                // Fallback to this path if the first one fails
                const target = e.target as HTMLImageElement;
                target.onerror = null; // Prevent infinite loop
                target.src = "/images/logo.png";
              }}
            />
          </div>
          <h1 className="text-3xl md:text-4xl font-playfair font-bold text-center text-white mt-6">
            Invoice Generator
          </h1>
          <p className="text-center text-white/80 mt-2 font-neue">
            Create beautiful invoices for your photography business
          </p>
        </div>
      </div>
      
      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10">
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <Tabs defaultValue="form" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto">
              <TabsTrigger value="form">Edit Invoice</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>
            
            <TabsContent value="form" className="space-y-6">
              <InvoiceForm 
                invoiceData={invoiceData} 
                setInvoiceData={setInvoiceData} 
              />
              
              <div className="flex flex-col sm:flex-row justify-end items-center gap-3 mt-8">
                <Button 
                  onClick={handleGenerateContract}
                  variant="outline"
                  className="w-full sm:w-auto flex items-center gap-2"
                >
                  <FileText className="h-4 w-4" />
                  Generate Contract
                </Button>
                <Button 
                  onClick={() => setActiveTab("preview")}
                  className="w-full sm:w-auto bg-sora-purple hover:bg-opacity-80 text-white"
                >
                  Preview Invoice
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="preview" className="space-y-8">
              <div className="flex justify-center">
                <InvoicePreview ref={invoiceRef} invoiceData={invoiceData} />
              </div>
              
              <div className="flex justify-center mt-8">
                <DownloadButtons invoiceRef={invoiceRef} invoiceData={invoiceData} />
              </div>
              
              <div className="flex justify-center mt-4 gap-4">
                <Button 
                  onClick={() => setActiveTab("form")}
                  variant="outline"
                  className="px-6 py-2 text-gray-800"
                >
                  Back to Editor
                </Button>
                
                <Button 
                  onClick={handleGenerateContract}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <FileText className="h-4 w-4" />
                  Generate Contract
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="mt-16 pb-8 text-center text-gray-500 font-neue">
        <p className="text-sm">© {new Date().getFullYear()} The Sora Photography. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Index;