
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { InvoiceData } from '@/types/invoice';

interface ContractFormProps {
  invoiceData: InvoiceData;
  restrictions: {
    noAdvertising: boolean;
    noPrintedMaterials: boolean;
    noSocialMedia: boolean;
    otherRestrictions: string;
  };
  setRestrictions: React.Dispatch<React.SetStateAction<{
    noAdvertising: boolean;
    noPrintedMaterials: boolean;
    noSocialMedia: boolean;
    otherRestrictions: string;
  }>>;
}

const ContractForm: React.FC<ContractFormProps> = ({ 
  invoiceData, 
  restrictions, 
  setRestrictions 
}) => {
  return (
    <div className="space-y-6 font-neue">
      <Card>
        <CardContent className="pt-6">
          <h2 className="font-playfair text-xl mb-4">Contract Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <Label htmlFor="clientName">Client Name</Label>
              <div className="border border-gray-200 rounded-md p-2 bg-gray-50">
                {invoiceData.clientInfo.name || 'Not specified'}
              </div>
            </div>
            <div>
              <Label htmlFor="clientEmail">Client Email</Label>
              <div className="border border-gray-200 rounded-md p-2 bg-gray-50">
                {invoiceData.clientInfo.email || 'Not specified'}
              </div>
            </div>
            <div>
              <Label htmlFor="contractDate">Contract Date</Label>
              <div className="border border-gray-200 rounded-md p-2 bg-gray-50">
                {new Date().toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
            </div>
            <div>
              <Label htmlFor="photographerName">Photographer</Label>
              <div className="border border-gray-200 rounded-md p-2 bg-gray-50">
                Udaya Vijay Anand
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <h2 className="font-playfair text-xl mb-4">Usage Restrictions</h2>
          <p className="text-sm text-gray-600 mb-4">
            Select any restrictions that should apply to the photographer's usage rights:
          </p>
          
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="noAdvertising" 
                checked={restrictions.noAdvertising}
                onCheckedChange={(checked) => 
                  setRestrictions(prev => ({ ...prev, noAdvertising: checked === true }))
                }
              />
              <Label htmlFor="noAdvertising" className="font-normal cursor-pointer">
                No use in paid advertising
              </Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="noPrintedMaterials" 
                checked={restrictions.noPrintedMaterials}
                onCheckedChange={(checked) => 
                  setRestrictions(prev => ({ ...prev, noPrintedMaterials: checked === true }))
                }
              />
              <Label htmlFor="noPrintedMaterials" className="font-normal cursor-pointer">
                No use in printed marketing materials
              </Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="noSocialMedia" 
                checked={restrictions.noSocialMedia}
                onCheckedChange={(checked) => 
                  setRestrictions(prev => ({ ...prev, noSocialMedia: checked === true }))
                }
              />
              <Label htmlFor="noSocialMedia" className="font-normal cursor-pointer">
                No use on social media
              </Label>
            </div>
            
            <div className="mt-4">
              <Label htmlFor="otherRestrictions">Other Restrictions</Label>
              <Textarea 
                id="otherRestrictions"
                placeholder="Specify any other usage restrictions..."
                value={restrictions.otherRestrictions}
                onChange={(e) => 
                  setRestrictions(prev => ({ ...prev, otherRestrictions: e.target.value }))
                }
                className="mt-1"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContractForm;
