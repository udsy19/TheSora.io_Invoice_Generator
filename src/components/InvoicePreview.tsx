import React, { forwardRef } from 'react';
import { format } from 'date-fns';
import { InvoiceData } from '@/types/invoice';
import CloudDecoration from './CloudDecoration';
import StarIcon from './StarIcon';

interface InvoicePreviewProps {
  invoiceData: InvoiceData;
}

const InvoicePreview = forwardRef<HTMLDivElement, InvoicePreviewProps>(({ invoiceData }, ref) => {
  const calculateItemTotal = (quantity: number, rate: number, isAdvancePayment: boolean = false) => {
    const total = quantity * rate;
    return isAdvancePayment ? total * 0.3 : total;
  };

  const calculateInvoiceTotal = () => {
    return invoiceData.lineItems.reduce((total, item) => {
      return total + calculateItemTotal(item.quantity, item.rate, item.isAdvancePayment);
    }, 0);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    try {
      return format(new Date(dateString), 'MMMM d, yyyy');
    } catch (error) {
      return dateString;
    }
  };

  return (
    <div 
      ref={ref}
      className="w-full bg-[#fff8f2] rounded-xl overflow-hidden shadow-md"
      style={{ maxWidth: '800px' }}
    >
      <div className="relative h-[200px] overflow-hidden bg-[#fff3ea]">
        <div className="absolute inset-0 flex items-center justify-center">
          <img 
            src="/images/Banner.png"
            alt="The Sora Photography Banner"
            className="max-w-full max-h-full object-cover"
            style={{ 
              width: '100%',
              height: '100%'
            }}
            onError={(e) => {
              // Fallback to typography logo if banner fails to load
              const target = e.target as HTMLImageElement;
              target.onerror = null; // Prevent infinite loop
              target.src = "/images/White_Typography_Logo.png";
            }}
          />
        </div>
      </div>
      
      <div className="p-12">
        <div className="flex justify-between items-start mb-14">
          <h1 className="font-playfair text-7xl font-bold text-black">INVOICE</h1>
          
          <div className="text-right">
            <div className="mb-3">
              <span className="font-neue text-lg font-bold mr-4">INVOICE #</span>
              <span className="font-neue text-lg">{invoiceData.invoiceNumber || '001'}</span>
            </div>
            <div className="mb-3">
              <span className="font-neue text-lg font-bold mr-4">DATE</span>
              <span className="font-neue text-lg">{formatDate(invoiceData.issueDate) || 'April 24, 2024'}</span>
            </div>
            <div>
              <span className="font-neue text-lg font-bold mr-4">DUE DATE</span>
              <span className="font-neue text-lg">{formatDate(invoiceData.dueDate) || 'May 8, 2024'}</span>
            </div>
          </div>
        </div>
        
        <div className="mb-12">
          <h2 className="font-neue text-3xl font-bold mb-2">{invoiceData.clientInfo.name || 'Client Name'}</h2>
          <p className="font-neue text-xl">{invoiceData.clientInfo.address || 'Purdue University, West Lafayette, Indiana, 47906'}</p>
          <p className="font-neue text-xl">{invoiceData.clientInfo.phone || '(123) 456-7890'}</p>
        </div>
        
        <div className="border-t border-black py-4">
          <div className="grid grid-cols-12 font-neue text-xl font-bold mb-2">
            <div className="col-span-6">DESCRIPTION</div>
            <div className="col-span-2 text-center">QTY</div>
            <div className="col-span-2 text-right">RATE</div>
            <div className="col-span-2 text-right">AMOUNT</div>
          </div>
          
          {invoiceData.lineItems.map((item) => (
            <div key={item.id} className="grid grid-cols-12 font-neue text-xl py-6">
              <div className="col-span-6">
                {item.description || 'Photography Session'}
                {item.isAdvancePayment && <span className="text-sm text-gray-600 ml-2">(30% Advance)</span>}
              </div>
              <div className="col-span-2 text-center">{item.quantity}</div>
              <div className="col-span-2 text-right">{formatCurrency(item.rate)}</div>
              <div className="col-span-2 text-right">
                {formatCurrency(calculateItemTotal(item.quantity, item.rate, item.isAdvancePayment))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="border-t border-black my-8"></div>
        
        <div className="flex justify-end">
          <div className="text-right">
            <span className="font-neue text-2xl font-bold mr-8">TOTAL DUE</span>
            <span className="font-neue text-2xl">{formatCurrency(calculateInvoiceTotal())}</span>
          </div>
        </div>
        
        {invoiceData.paymentDetails && (
          <div className="mt-16 font-neue text-lg">
            <p className="whitespace-pre-line">{invoiceData.paymentDetails}</p>
          </div>
        )}
        
        <div className="mt-24 text-center font-neue">
          <p className="text-lg">https://thesora.io/</p>
        </div>
      </div>
    </div>
  );
});

InvoicePreview.displayName = 'InvoicePreview';

export default InvoicePreview;
