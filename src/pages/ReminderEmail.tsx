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
      
      const success = await sendReminderEmail(emailData);
      
      if (success) {
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
        throw new Error("Failed to send email");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send reminder email. Please check your configuration.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
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
            />
          </div>
          <h1 className="text-3xl md:text-4xl font-playfair font-bold text-center text-white mt-6">
            Send Reminder Email
          </h1>
          <p className="text-center text-white/80 mt-2 font-neue">
            Send gentle follow-up emails to your clients
          </p>
        </div>
      </div>
      
      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10">
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <Card className="border-none shadow-none">
            <CardHeader>
              <CardTitle className="text-2xl font-playfair">Client Reminder</CardTitle>
              <CardDescription>
                Send a follow-up email to remind clients about contracts and invoices
              </CardDescription>
            </CardHeader>
            
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="clientName">Client Name</Label>
                    <Input 
                      id="clientName"
                      name="clientName"
                      value={formData.clientName}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="clientEmail">Client Email</Label>
                    <Input 
                      id="clientEmail"
                      name="clientEmail"
                      value={formData.clientEmail}
                      onChange={handleChange}
                      placeholder="client@example.com"
                      required
                      type="email"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="shootDate">Shoot Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.shootDate ? format(formData.shootDate, "EEEE, MMMM d, yyyy") : <span>Pick a date</span>}
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
                    <Label htmlFor="shootLocation">Shoot Location</Label>
                    <Input 
                      id="shootLocation"
                      name="shootLocation"
                      value={formData.shootLocation}
                      onChange={handleChange}
                      placeholder="Hovde Hall"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="customMessage">Custom Message (Optional)</Label>
                  <Textarea 
                    id="customMessage"
                    name="customMessage"
                    value={formData.customMessage}
                    onChange={handleChange}
                    placeholder="Add a personal message to your client..."
                    rows={3}
                  />
                  <p className="text-sm text-gray-500">
                    The email will include the standard gentle reminder about contracts and invoices.
                    Any custom message will be added to the standard template.
                  </p>
                </div>
              </CardContent>
              
              <CardFooter>
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <SendIcon className="mr-2 h-5 w-5" />
                      Send Reminder Email
                    </span>
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
          
          <div className="mt-8 p-4 rounded-lg bg-gray-50 border border-gray-100">
            <h3 className="text-lg font-medium mb-2">Email Preview</h3>
            <div className="p-4 bg-white rounded-md border border-gray-200">
              <div className="mb-3 pb-3 border-b border-gray-100">
                <div><strong>To:</strong> {formData.clientEmail || 'client@example.com'}</div>
                <div><strong>Subject:</strong> Just a gentle reminder 🌸</div>
              </div>
              <div className="prose prose-sm max-w-none">
                <p>Dear <strong>{formData.clientName || 'Client'}</strong>,</p>
                <p>Hope you're doing well! I just wanted to check in regarding your upcoming graduation shoot on <strong>{formData.shootDate ? format(formData.shootDate, "EEEE, MMMM d") : 'your scheduled date'}</strong> at {formData.shootLocation}.</p>
                <p>We're all set on our end — just waiting to receive the signed contract and invoice from you. If you've already sent it, feel free to ignore this note. If not, no rush — just a friendly nudge to help wrap things up smoothly.</p>
                {formData.customMessage && (
                  <p>{formData.customMessage}</p>
                )}
                <p>Looking forward to working with you!</p>
                <p>Warmly,<br/><strong>TheSora.io</strong></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="mt-16 pb-8 text-center text-gray-500 font-neue">
        <p className="text-sm">© {new Date().getFullYear()} The Sora Photography. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ReminderEmail;