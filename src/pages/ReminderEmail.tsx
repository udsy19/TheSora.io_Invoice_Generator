import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { sendReminderEmail } from '@/utils/emailService';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format, addDays } from 'date-fns';
import { CalendarIcon, SendIcon } from 'lucide-react';
import { ReminderType } from '@/utils/emailService';
import { cn } from '@/lib/utils';
import Navigation from '@/components/Navigation';

const ReminderEmail = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const defaultShootDate = addDays(new Date(), 7);

  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    shootDate: defaultShootDate,
    shootLocation: 'Hovde Hall',
    customMessage: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (newDate: Date | undefined) => {
    if (newDate) {
      setFormData(prev => ({ ...prev, shootDate: newDate }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.clientEmail) {
      toast({
        title: "Missing information",
        description: "Please enter the client's email address.",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Prepare data in format expected by the email service
      const emailData = {
        invoiceData: {
          clientInfo: {
            name: formData.clientName,
            email: formData.clientEmail,
            address: '',
            phone: ''
          },
          businessInfo: {
            businessName: 'The Sora Photography',
            email: 'hello@thesora.io'
          },
          shootDate: formData.shootDate,
          shootLocation: formData.shootLocation,
          invoiceNumber: '',
          issueDate: '',
          dueDate: '',
          lineItems: [],
          paymentDetails: ''
        },
        reminderType: ReminderType.INVOICE,
        customMessage: formData.customMessage
      };
      
      const result = await sendReminderEmail(emailData);
      
      if (result.success) {
        toast({
          title: "Success!",
          description: `Reminder email sent to ${formData.clientEmail}.`,
        });
        
        // Reset form
        setFormData({
          clientName: '',
          clientEmail: '',
          shootDate: defaultShootDate,
          shootLocation: 'Hovde Hall',
          customMessage: '',
        });
      } else {
        throw new Error(result.error || "Failed to send email");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send reminder email. Please check your configuration.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <Navigation />
      
      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-playfair font-bold text-gray-900">
              Send Reminder Email
            </h1>
            <p className="text-gray-500 mt-1 font-neue">
              Send gentle follow-up emails to your clients
            </p>
          </div>
          <img 
            src="/images/Banner.png" 
            alt="The Sora Photography" 
            className="hidden md:block h-16 object-contain rounded-md scale-[0.8]"
            style={{ transformOrigin: "right center" }}
          />
        </div>
        
        <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-6 md:p-8">
          <div className="max-w-xl mx-auto">
            <div className="mb-6">
              <h2 className="text-xl font-playfair font-medium text-gray-900 mb-1">Client Reminder Form</h2>
              <p className="text-sm text-gray-500">
                Send a follow-up email to remind clients about contracts and invoices
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="clientName" className="text-gray-700">Client Name</Label>
                  <Input 
                    id="clientName"
                    name="clientName"
                    value={formData.clientName}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                    className="border-gray-200 focus:border-pink-300 focus:ring focus:ring-pink-100"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="clientEmail" className="text-gray-700">Client Email</Label>
                  <Input 
                    id="clientEmail"
                    name="clientEmail"
                    value={formData.clientEmail}
                    onChange={handleChange}
                    placeholder="client@example.com"
                    required
                    type="email"
                    className="border-gray-200 focus:border-pink-300 focus:ring focus:ring-pink-100"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="shootDate" className="text-gray-700">Shoot Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal border-gray-200 hover:bg-gray-50",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4 text-gray-500" />
                        {formData.shootDate ? format(formData.shootDate, "EEEE, MMMM d, yyyy") : <span className="text-gray-500">Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={formData.shootDate}
                        onSelect={handleDateChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="shootLocation" className="text-gray-700">Shoot Location</Label>
                  <Input 
                    id="shootLocation"
                    name="shootLocation"
                    value={formData.shootLocation}
                    onChange={handleChange}
                    placeholder="Hovde Hall"
                    className="border-gray-200 focus:border-pink-300 focus:ring focus:ring-pink-100"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="customMessage" className="text-gray-700">Custom Message (Optional)</Label>
                <Textarea 
                  id="customMessage"
                  name="customMessage"
                  value={formData.customMessage}
                  onChange={handleChange}
                  placeholder="Add a personal message to your client..."
                  rows={3}
                  className="border-gray-200 focus:border-pink-300 focus:ring focus:ring-pink-100"
                />
                <p className="text-xs text-gray-500 italic">
                  Your message will be added to the standard template shown in the preview below.
                </p>
              </div>
              
              <div className="pt-4">
                <Button 
                  type="submit" 
                  className="w-full bg-pink-600 hover:bg-pink-700 text-white"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      <SendIcon className="mr-2 h-5 w-5" />
                      Send Reminder Email
                    </span>
                  )}
                </Button>
              </div>
            </form>
          </div>
          
          <div className="mt-10 rounded-lg overflow-hidden">
            <div className="bg-pink-50 px-4 py-2 border border-pink-100 rounded-t-lg flex items-center justify-between">
              <h3 className="text-base font-medium text-pink-800">Email Preview</h3>
              <div className="flex space-x-1">
                <div className="h-2 w-2 rounded-full bg-pink-300"></div>
                <div className="h-2 w-2 rounded-full bg-pink-300"></div>
                <div className="h-2 w-2 rounded-full bg-pink-300"></div>
              </div>
            </div>
            <div className="p-5 bg-white rounded-b-lg border border-t-0 border-gray-200 shadow-sm">
              <div className="mb-4 pb-3 border-b border-gray-100">
                <div className="text-sm text-gray-600 flex items-baseline space-x-2 mb-1">
                  <span className="font-medium w-12">To:</span>
                  <span className="text-gray-800">{formData.clientEmail || 'client@example.com'}</span>
                </div>
                <div className="text-sm text-gray-600 flex items-baseline space-x-2">
                  <span className="font-medium w-12">Subject:</span>
                  <span className="text-gray-800">Just a gentle reminder 🌸</span>
                </div>
              </div>
              <div className="prose prose-sm max-w-none text-gray-700">
                <p>Dear <strong className="text-gray-900">{formData.clientName || 'Client'}</strong>,</p>
                <p>Hope you're doing well! I just wanted to check in regarding your upcoming graduation shoot on <strong className="text-gray-900">{formData.shootDate ? format(formData.shootDate, "EEEE, MMMM d") : 'your scheduled date'}</strong> at {formData.shootLocation}.</p>
                <p>We're all set on our end — just waiting to receive the signed contract and invoice from you. If you've already sent it, feel free to ignore this note. If not, no rush — just a friendly nudge to help wrap things up smoothly.</p>
                {formData.customMessage && (
                  <p className="bg-gray-50 p-2 rounded border-l-2 border-pink-200 italic">{formData.customMessage}</p>
                )}
                <p>Looking forward to working with you!</p>
                <p className="mt-4">Warmly,<br/><strong className="text-pink-700">TheSora.io</strong></p>
                <div className="mt-4 pt-4 border-t border-gray-100 text-center text-xs text-gray-500">
                  <p>Sent with ♥ from The Sora Photography</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="mt-16 pb-8 text-center text-gray-500 font-neue border-t border-gray-100 pt-8">
        <img 
          src="/images/White_Typography_Logo.png" 
          alt="The Sora" 
          className="h-8 mx-auto mb-2" 
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src = "/images/Logo.png";
          }}
        />
        <p className="text-sm">© {new Date().getFullYear()} The Sora Photography. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ReminderEmail;