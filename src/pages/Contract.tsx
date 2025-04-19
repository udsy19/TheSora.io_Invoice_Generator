
import React, { useState, useRef } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ContractForm from '@/components/ContractForm';
import ContractPreview from '@/components/ContractPreview';
import ContractDownloadButtons from '@/components/ContractDownloadButtons';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { InvoiceData } from '@/types/invoice';

const Contract = () => {
  const location = useLocation();
  const invoiceData = location.state?.invoiceData || {
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
    paymentDetails: '',
  };

  const contractRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState("form");
  
  const [restrictions, setRestrictions] = useState({
    noAdvertising: false,
    noPrintedMaterials: false,
    noSocialMedia: false,
    otherRestrictions: '',
  });

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
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
            Contract Generator
          </h1>
          <p className="text-center text-white/80 mt-2 font-neue">
            Create legally binding photography agreements
          </p>
        </div>
      </div>
      
      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10">
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <Link to="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6">
            <ArrowLeft className="h-4 w-4" />
            Back to Invoice Generator
          </Link>
          
          <Tabs defaultValue="form" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto">
              <TabsTrigger value="form">Edit Contract</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>
            
            <TabsContent value="form" className="space-y-6">
              <ContractForm 
                invoiceData={invoiceData} 
                restrictions={restrictions}
                setRestrictions={setRestrictions}
              />
              
              <div className="flex justify-end mt-8">
                <Button 
                  onClick={() => setActiveTab("preview")}
                  className="px-6 py-2 bg-sora-purple hover:bg-opacity-80 text-white rounded-md font-medium transition-colors"
                >
                  Preview Contract
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="preview" className="space-y-8">
              <div className="flex justify-center">
                <ContractPreview 
                  ref={contractRef} 
                  invoiceData={invoiceData} 
                  restrictions={restrictions}
                />
              </div>
              
              <div className="flex justify-center mt-8">
                <ContractDownloadButtons contractRef={contractRef} invoiceData={invoiceData} />
              </div>
              
              <div className="flex justify-center mt-4">
                <Button 
                  onClick={() => setActiveTab("form")}
                  variant="outline"
                  className="px-6 py-2 text-gray-800 rounded-md font-medium transition-colors"
                >
                  Back to Editor
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

export default Contract;
