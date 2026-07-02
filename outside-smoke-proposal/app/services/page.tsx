import ServiceCard from '@/components/ServiceCard';
import CTAButton from '@/components/CTAButton';

export default function Services() {
  const services = [
    {
      title: 'Sponsorship Kickstart',
      description: 'Launch your sponsorship program with a strategic plan. We identify potential sponsors, develop sponsorship packages, and create outreach templates.',
      bestFor: 'Clubs just starting sponsorship efforts or looking to formalize existing relationships',
      inquiryPrompt: 'I would like help building a sponsorship strategy for our team and learning how to approach potential sponsors.'
    },
    {
      title: 'Fundraising Launch Plan',
      description: 'Design a multi-channel fundraising strategy. From event planning to online campaigns, we help you maximize revenue while minimizing team burden.',
      bestFor: 'Teams seeking sustainable, repeatable fundraising that doesn\'t rely on coach time',
      inquiryPrompt: 'I would like help creating a fundraising plan that brings in reliable revenue without taking too much coach time.'
    },
    {
      title: 'Social Media Templates',
      description: 'Get professionally designed, editable social media content (graphics, captions, posting calendars) ready to post across your channels.',
      bestFor: 'Teams wanting consistent, professional social presence without hiring a full-time manager',
      inquiryPrompt: 'I would like help developing a social media content system and templates for our program.'
    },
    {
      title: 'Club Growth Audit',
      description: 'We analyze your current sponsorships, fundraising, communications, and member experience. Receive a detailed report with actionable recommendations.',
      bestFor: 'Established clubs wanting to identify growth opportunities and optimize operations',
      inquiryPrompt: 'I would like a growth audit to identify opportunities to improve sponsorships, fundraising, communications, and member experience.'
    },
    {
      title: 'Monthly Retainer Package',
      description: 'Ongoing support: strategy, content creation, sponsor relationship management, and performance tracking. We become an extension of your team.',
      bestFor: 'Clubs ready for sustained growth and wanting consistent guidance and updates',
      inquiryPrompt: 'I would like ongoing support from Outside Smoke to help with strategy, content, sponsor relationships, and growth planning.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-navy text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Services Built for Swim Teams
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Whether you're just starting out or scaling up, we have a service package designed for your stage of growth.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* EDIT: Customize services by updating the services array above */}
            {services.map((service, idx) => (
              <ServiceCard
                key={idx}
                title={service.title}
                description={service.description}
                bestFor={service.bestFor}
                inquiryPrompt={service.inquiryPrompt}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gray-100 py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-navy text-center mb-12">
            How We Work With You
          </h2>
          
          <div className="space-y-8">
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-gold text-navy font-bold">
                  1
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-navy mb-2">Understand Your Needs</h3>
                <p className="text-gray-700">
                  You tell us about your team's challenges, goals, and current stage so we can recommend the right service package.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-gold text-navy font-bold">
                  2
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-navy mb-2">Develop a Plan</h3>
                <p className="text-gray-700">
                  We create a customized proposal detailing the services that best fit your situation and timeline.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-gold text-navy font-bold">
                  3
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-navy mb-2">Execute & Support</h3>
                <p className="text-gray-700">
                  We deliver the services, keep you updated, and iterate based on your feedback and results.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-navy text-white py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Find Your Perfect Service Mix?
          </h2>
          <p className="text-lg text-white/90 mb-8">
            Tell us what you are working on and we will help recommend the best next step for your team.
          </p>
          <CTAButton text="Contact Us" href="/contact" variant="primary" />
        </div>
      </section>
    </div>
  );
}
