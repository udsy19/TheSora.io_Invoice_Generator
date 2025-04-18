import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Trash2 } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { InvoiceData, LineItem } from '@/types/invoice';

interface InvoiceFormProps {
  invoiceData: InvoiceData;
  setInvoiceData: React.Dispatch<React.SetStateAction<InvoiceData>>;
}

const InvoiceForm: React.FC<InvoiceFormProps> = ({ invoiceData, setInvoiceData }) => {
  const addLineItem = () => {
    const newItem: LineItem = {
      id: crypto.randomUUID(),
      description: '',
      quantity: 1,
      rate: 0,
      isAdvancePayment: false,
    };
    
    setInvoiceData(prev => ({
      ...prev,
      lineItems: [...prev.lineItems, newItem],
    }));
  };
  
  const removeLineItem = (id: string) => {
    setInvoiceData(prev => ({
      ...prev,
      lineItems: prev.lineItems.filter(item => item.id !== id),
    }));
  };
  
  const updateLineItem = (id: string, field: keyof LineItem, value: string | number | boolean) => {
    setInvoiceData(prev => ({
      ...prev,
      lineItems: prev.lineItems.map(item => 
        item.id === id ? { ...item, [field]: value } : item
      ),
    }));
  };
  
  const updateClientInfo = (field: keyof typeof invoiceData.clientInfo, value: string) => {
    setInvoiceData(prev => ({
      ...prev,
      clientInfo: {
        ...prev.clientInfo,
        [field]: value,
      },
    }));
  };

  return (
    <div className="space-y-6 font-neue">
      <Card>
        <CardContent className="pt-6">
          <h2 className="font-playfair text-xl mb-4">Invoice Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <Label htmlFor="invoiceNumber">Invoice Number</Label>
              <Input 
                id="invoiceNumber" 
                value={invoiceData.invoiceNumber} 
                onChange={(e) => setInvoiceData(prev => ({ ...prev, invoiceNumber: e.target.value }))}
                placeholder="TS-2025-001"
              />
            </div>
            <div>
              <Label htmlFor="issueDate">Issue Date</Label>
              <Input 
                id="issueDate" 
                type="date" 
                value={invoiceData.issueDate} 
                onChange={(e) => setInvoiceData(prev => ({ ...prev, issueDate: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="dueDate">Due Date</Label>
              <Input 
                id="dueDate" 
                type="date" 
                value={invoiceData.dueDate} 
                onChange={(e) => setInvoiceData(prev => ({ ...prev, dueDate: e.target.value }))}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <h2 className="font-playfair text-xl mb-4">Client Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="clientName">Client Name</Label>
              <Input 
                id="clientName" 
                value={invoiceData.clientInfo.name} 
                onChange={(e) => updateClientInfo('name', e.target.value)}
                placeholder="Jane Doe"
              />
            </div>
            <div>
              <Label htmlFor="clientEmail">Client Email</Label>
              <Input 
                id="clientEmail" 
                type="email" 
                value={invoiceData.clientInfo.email} 
                onChange={(e) => updateClientInfo('email', e.target.value)}
                placeholder="jane@example.com"
              />
            </div>
            <div>
              <Label htmlFor="clientPhone">Client Phone</Label>
              <Input 
                id="clientPhone" 
                value={invoiceData.clientInfo.phone} 
                onChange={(e) => updateClientInfo('phone', e.target.value)}
                placeholder="(123) 456-7890"
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="clientAddress">Client Address</Label>
              <Textarea 
                id="clientAddress" 
                value={invoiceData.clientInfo.address} 
                onChange={(e) => updateClientInfo('address', e.target.value)}
                placeholder="Purdue University, West Lafayette, Indiana, 47906"
                rows={2}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-playfair text-xl">Services</h2>
            <Button onClick={addLineItem} size="sm" variant="outline" className="flex items-center gap-1">
              <Plus className="h-4 w-4" /> Add Item
            </Button>
          </div>
          
          {invoiceData.lineItems.length === 0 ? (
            <div className="text-center py-6 text-muted-foreground">
              No items added yet. Click "Add Item" to add services.
            </div>
          ) : (
            <div className="space-y-4">
              {invoiceData.lineItems.map((item) => (
                <div key={item.id} className="grid grid-cols-12 gap-2 items-end">
                  <div className="col-span-4">
                    <Label htmlFor={`description-${item.id}`}>Description</Label>
                    <Input 
                      id={`description-${item.id}`}
                      value={item.description} 
                      onChange={(e) => updateLineItem(item.id, 'description', e.target.value)}
                      placeholder="Photography Session"
                    />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor={`quantity-${item.id}`}>Qty</Label>
                    <Input 
                      id={`quantity-${item.id}`}
                      type="number" 
                      min="1"
                      value={item.quantity} 
                      onChange={(e) => updateLineItem(item.id, 'quantity', parseInt(e.target.value) || 0)}
                    />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor={`rate-${item.id}`}>Rate ($)</Label>
                    <Input 
                      id={`rate-${item.id}`}
                      type="number" 
                      min="0"
                      step="0.01"
                      value={item.rate} 
                      onChange={(e) => updateLineItem(item.id, 'rate', parseFloat(e.target.value) || 0)}
                    />
                  </div>
                  <div className="col-span-2 flex items-center gap-2">
                    <Checkbox 
                      id={`advance-${item.id}`}
                      checked={item.isAdvancePayment}
                      onCheckedChange={(checked) => 
                        updateLineItem(item.id, 'isAdvancePayment', checked === true)
                      }
                    />
                    <Label htmlFor={`advance-${item.id}`} className="text-sm">
                      Advance (30%)
                    </Label>
                  </div>
                  <div className="col-span-2 flex justify-end">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-destructive hover:text-destructive/90 h-9 w-9"
                      onClick={() => removeLineItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <h2 className="font-playfair text-xl mb-4">Payment Instructions</h2>
          <Textarea 
            value={invoiceData.paymentDetails} 
            onChange={(e) => setInvoiceData(prev => ({ ...prev, paymentDetails: e.target.value }))}
            placeholder="Enter payment instructions and any additional notes..."
            rows={3}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default InvoiceForm;
