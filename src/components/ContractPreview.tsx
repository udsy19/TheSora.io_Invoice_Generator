
import React, { forwardRef } from 'react';
import { format } from 'date-fns';
import { InvoiceData } from '@/types/invoice';
import CloudDecoration from './CloudDecoration';
import StarIcon from './StarIcon';
import { Checkbox } from '@/components/ui/checkbox';

interface ContractPreviewProps {
  invoiceData: InvoiceData;
  restrictions: {
    noAdvertising: boolean;
    noPrintedMaterials: boolean;
    noSocialMedia: boolean;
    otherRestrictions: string;
  };
}

const ContractPreview = forwardRef<HTMLDivElement, ContractPreviewProps>(({ invoiceData, restrictions }, ref) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return format(new Date(), 'do MMMM yyyy');
    try {
      return format(new Date(dateString), 'do MMMM yyyy');
    } catch (error) {
      return format(new Date(), 'do MMMM yyyy');
    }
  };

  const today = formatDate(new Date().toISOString());
  const clientName = invoiceData.clientInfo.name || 'Client Name';

  return (
    <div 
      ref={ref}
      className="w-full bg-[#fff8f2] rounded-xl overflow-hidden shadow-md"
      style={{ maxWidth: '800px' }}
    >
      {/* Header with custom gradient background */}
      <div 
        className="relative h-[200px] flex items-center justify-center"
        style={{ 
          overflow: 'hidden'
        }}
      >
        {/* Banner image */}
        <img 
          src="/images/Banner.png" 
          alt="The Sora.io Photography" 
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => {
            // Fallback to logo if banner fails to load
            const target = e.target as HTMLImageElement;
            target.onerror = null; // Prevent infinite loop
            target.src = "/images/Logo.png";
          }}
        />
        
        {/* Overlay to ensure text readability */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.3) 100%)'
          }}
        />
      </div>
      
      <div className="p-12">
        {/* Title moved to the white area */}
        <h1 className="font-playfair text-center text-3xl font-bold mb-8">PHOTOGRAPHY AGREEMENT</h1>
        
        {/* Contract Content with improved line spacing */}
        <section className="mb-8">
          <h2 className="font-playfair text-xl font-bold mb-4">1. COPYRIGHT & OWNERSHIP</h2>
          <p className="font-neue text-sm mb-4 font-normal leading-relaxed">
            The Photographer, Udaya Vijay Anand, retains full rights to use and publish the images from this photoshoot on personal and professional platforms, including but not limited to social media accounts (e.g., Instagram), personal website, and any portfolio or online showcase. All photographs created during this session remain the intellectual property of The SORA.IO Photography, and copyright is not transferred with the delivery of images.
          </p>
          <p className="font-neue text-sm mb-4 font-normal leading-relaxed">
            By signing this agreement, the Client grants permission to the Photographer to use the Client's likeness and the resulting images for the following purposes:
          </p>
          <ul className="list-disc pl-8 font-neue text-sm mb-4 font-normal leading-relaxed">
            <li className="mb-1">Portfolio display (online and print)</li>
            <li className="mb-1">Social media marketing</li>
            <li className="mb-1">Website content</li>
            <li className="mb-1">Contest submissions</li>
            <li className="mb-1">Professional publications</li>
            <li>Advertising and promotional materials</li>
          </ul>
          <p className="font-neue text-sm mb-4 font-normal leading-relaxed">
            The Client may opt out of specific usage types by indicating their preferences below:
          </p>
          <div className="pl-8 mb-4">
            <div className="flex items-start space-x-2 mb-2">
              <Checkbox id="noAdvertising" checked={restrictions.noAdvertising} disabled />
              <label htmlFor="noAdvertising" className="font-neue text-sm font-normal">No use in paid advertising</label>
            </div>
            <div className="flex items-start space-x-2 mb-2">
              <Checkbox id="noPrintedMaterials" checked={restrictions.noPrintedMaterials} disabled />
              <label htmlFor="noPrintedMaterials" className="font-neue text-sm font-normal">No use in printed marketing materials</label>
            </div>
            <div className="flex items-start space-x-2 mb-2">
              <Checkbox id="noSocialMedia" checked={restrictions.noSocialMedia} disabled />
              <label htmlFor="noSocialMedia" className="font-neue text-sm font-normal">No use on social media</label>
            </div>
            <div className="flex items-start space-x-2">
              <div className="mt-1">□</div>
              <div className="font-neue text-sm font-normal">
                Other restrictions: {restrictions.otherRestrictions ? restrictions.otherRestrictions : "_____________________________"}
              </div>
            </div>
          </div>
          <p className="font-neue text-sm font-normal leading-relaxed">
            The Photographer may use these images for self-promotion, including marketing materials, future collaborations, and submissions to publications or competitions, provided these uses do not exploit the client in any way. The Photographer agrees to respect any opt-out choices indicated above.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-playfair text-xl font-bold mb-4">2. PHOTOGRAPHER'S USAGE RIGHTS</h2>
          <p className="font-neue text-sm font-normal leading-relaxed">
            The Client is granted a personal, non-exclusive right to post and share the images on personal or professional social media platforms and websites. If sharing on social media, credit to the Photographer ("Photo by Udaya Vijay Anand") is appreciated but not mandatory. The Client may not use the images for commercial purposes (e.g., advertising or resale) without additional written permission from the Photographer.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-playfair text-xl font-bold mb-4">3. PRIVACY & RELEASE</h2>
          <p className="font-neue text-sm font-normal leading-relaxed">
            The Photographer agrees not to use the images in a manner that may be harmful to the Client's reputation or privacy. Any image deemed sensitive by the Client (such as those involving private or confidential scenarios) will be excluded from the Photographer's public platforms upon the Client's request.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-playfair text-xl font-bold mb-4">4. IMAGE SELECTION & DELIVERY</h2>
          <p className="font-neue text-sm font-normal leading-relaxed">
            The Photographer will select and edit the final images to be delivered to the Client. The Client will receive a digital album of selected images within 5 - 7 days of the photoshoot date (unless the client has paid for the "Express Delivery" service). The quantity and quality of images are at the Photographer's discretion, ensuring a selection that best represents the Photographer's style and professionalism.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-playfair text-xl font-bold mb-4">5. PHOTO ALTERATIONS</h2>
          <p className="font-neue text-sm font-normal leading-relaxed">
            The Client agrees not to alter the images in any significant way (e.g., adding filters, heavy editing) before posting. Light adjustments (e.g., cropping) are acceptable, but any edits that alter the Photographer's work significantly are discouraged. If any alterations are made, the Client should acknowledge that these edits do not reflect the Photographer's original style.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-playfair text-xl font-bold mb-4">6. TERMINATION & MODIFICATIONS</h2>
          <p className="font-neue text-sm font-normal leading-relaxed">
            This agreement may only be modified or terminated by a written amendment signed by both parties. If either party wishes to use the images beyond the scope of this agreement (e.g., for commercial purposes), a separate written agreement shall be required.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-playfair text-xl font-bold mb-4">7. PAYMENT TERMS</h2>
          <p className="font-neue text-sm font-normal leading-relaxed">
            The Client agrees to pay a 30% advance of the total agreed hourly rate to confirm the booking. This advance must be received before the photoshoot date to secure the appointment. The remaining balance shall be paid in full upon delivery of the final edited images. Failure to make the advance payment may result in the cancellation of the booking without further notice.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-playfair text-xl font-bold mb-4">8. WATERMARKING</h2>
          <p className="font-neue text-sm font-normal leading-relaxed">
            All delivered images will include a small watermark of "The SORA.IO" logo. The watermark will be placed at the bottom, top, left, or right of the image in a manner that does not interfere with the subject or composition of the photograph. The watermark will be applied with reduced opacity to maintain the aesthetic integrity of the image while preserving the Photographer's branding.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="font-playfair text-xl font-bold mb-4">9. IMAGE EDITING REVISIONS</h2>
          <p className="font-neue text-sm font-normal leading-relaxed">
            The Photographer will provide up to three (3) rounds of reasonable revision requests per image following the initial edit. These revisions must be requested within 7 days of the initial image delivery. Additional revision requests beyond the three included rounds may incur additional fees at the Photographer's discretion. Extensive edits that significantly alter the nature of the image may be considered outside the scope of standard revisions (e.g., adding an absent member to a group picture, changing of background, outfit, etc...).
          </p>
        </section>

        {/* Signature */}
        <section className="mt-16">
          <h2 className="font-playfair text-xl font-bold text-center mb-6">SIGNATURE</h2>
          <p className="font-neue text-sm mb-12 text-center font-normal leading-relaxed">
            By signing below, both parties agree to the terms specified in this Photography Usage Agreement, granting the Photographer the rights to use and post images from the shoot and allowing the Client to share the images within the limits specified.
          </p>
          
          <div className="flex justify-between mt-12">
            <div className="w-64 text-center">
              <div className="mb-2">
                <img 
                  src="/images/signture.png" 
                  alt="Signature" 
                  className="h-16 mx-auto"
                  onError={(e) => {
                    // Fallback to logo if signature fails to load
                    const target = e.target as HTMLImageElement;
                    target.onerror = null; // Prevent infinite loop
                    target.src = "/images/Logo.png";
                  }}
                />
              </div>
              <div className="border-t border-black pt-2">
                <p className="font-neue text-sm font-bold">Udaya Vijay Anand</p>
                <p className="font-neue text-sm font-normal">Date: {today}</p>
              </div>
            </div>
            <div className="w-64 text-center">
              <div className="mb-2 h-16 flex items-end justify-center">
                {/* Empty space where client signature would go */}
              </div>
              <div className="border-t border-black pt-2">
                <p className="font-neue text-sm font-bold">{clientName}</p>
                <p className="font-neue text-sm font-normal">Date: {today}</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Footer with faint logo */}
        <footer className="mt-24 flex justify-center opacity-20">
          <img 
            src="/images/Logo.png" 
            alt="The Sora Photography" 
            className="w-32 h-auto"
          />
        </footer>
      </div>
    </div>
  );
});

ContractPreview.displayName = 'ContractPreview';

export default ContractPreview;

