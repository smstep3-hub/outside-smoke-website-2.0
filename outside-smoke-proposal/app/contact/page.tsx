"use client";

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import CTAButton from '@/components/CTAButton';

const usStates = [
  'Alabama',
  'Alaska',
  'Arizona',
  'Arkansas',
  'California',
  'Colorado',
  'Connecticut',
  'Delaware',
  'Florida',
  'Georgia',
  'Hawaii',
  'Idaho',
  'Illinois',
  'Indiana',
  'Iowa',
  'Kansas',
  'Kentucky',
  'Louisiana',
  'Maine',
  'Maryland',
  'Massachusetts',
  'Michigan',
  'Minnesota',
  'Mississippi',
  'Missouri',
  'Montana',
  'Nebraska',
  'Nevada',
  'New Hampshire',
  'New Jersey',
  'New Mexico',
  'New York',
  'North Carolina',
  'North Dakota',
  'Ohio',
  'Oklahoma',
  'Oregon',
  'Pennsylvania',
  'Rhode Island',
  'South Carolina',
  'South Dakota',
  'Tennessee',
  'Texas',
  'Utah',
  'Vermont',
  'Virginia',
  'Washington',
  'West Virginia',
  'Wisconsin',
  'Wyoming',
];

const usTimeZones = ['Eastern', 'Central', 'Mountain', 'Pacific'];

function ContactPageContent() {
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    swimTeamName: '',
    state: '',
    timeZone: '',
    helpText: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error' | null; message: string }>({
    type: null,
    message: '',
  });

  useEffect(() => {
    const helpPrompt = searchParams.get('help');
    if (helpPrompt) {
      setFormData((current) => ({
        ...current,
        helpText: helpPrompt,
      }));
    }
  }, [searchParams]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setFeedback({ type: null, message: '' });

    try {
      const response = await fetch('/api/consultation-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Unable to submit your request right now.');
      }

      setFeedback({
        type: 'success',
        message: 'Thanks! Your consultation request has been sent. We will reach out shortly.',
      });
      setFormData({
        name: '',
        email: '',
        swimTeamName: '',
        state: '',
        timeZone: '',
        helpText: '',
      });
    } catch (error) {
      setFeedback({
        type: 'error',
        message: error instanceof Error ? error.message : 'Unable to submit your request right now.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-navy text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Request a Consultation
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Share a few details about your program and we will reach out to start the conversation.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-bold text-navy mb-8">Contact Information</h2>

              <div className="mb-8">
                <h3 className="text-lg font-bold text-navy mb-2">Email</h3>
                <a
                  href="mailto:scott@outsidesmoke.net"
                  className="text-gold hover:text-yellow-600 text-xl font-semibold transition-colors"
                >
                  scott@outsidesmoke.net
                </a>
                <p className="text-gray-700 text-sm mt-2">
                  Best way to reach us. We typically respond within 24 hours.
                </p>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-bold text-navy mb-2">What We Help With</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>✓ Sponsorship strategy and outreach</li>
                  <li>✓ Fundraising campaigns and planning</li>
                  <li>✓ Social media content and strategy</li>
                  <li>✓ Club growth and optimization</li>
                  <li>✓ General business questions</li>
                </ul>
              </div>

              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-lg font-bold text-navy mb-2">Response Time</h3>
                <p className="text-gray-700">
                  We aim to respond to all inquiries within one business day. During busy seasons,
                  it may take up to 48 hours.
                </p>
              </div>
            </div>

            {/* Consultation Form */}
            <div>
              <h2 className="text-3xl font-bold text-navy mb-8">Submit for Consultation</h2>

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-navy mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent outline-none"
                    placeholder="Your name"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-navy mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent outline-none"
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="swimTeamName" className="block text-sm font-semibold text-navy mb-2">
                    Swim Team Name
                  </label>
                  <input
                    type="text"
                    id="swimTeamName"
                    name="swimTeamName"
                    value={formData.swimTeamName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent outline-none"
                    placeholder="Team name"
                    required
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="state" className="block text-sm font-semibold text-navy mb-2">
                      State
                    </label>
                    <select
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent outline-none"
                      required
                    >
                      <option value="">Select a state</option>
                      {usStates.map((state) => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="timeZone" className="block text-sm font-semibold text-navy mb-2">
                      Time Zone
                    </label>
                    <select
                      id="timeZone"
                      name="timeZone"
                      value={formData.timeZone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent outline-none"
                      required
                    >
                      <option value="">Select a time zone</option>
                      {usTimeZones.map((zone) => (
                        <option key={zone} value={zone}>
                          {zone}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="helpText" className="block text-sm font-semibold text-navy mb-2">
                    How can we help your program?
                  </label>
                  <textarea
                    id="helpText"
                    name="helpText"
                    rows={5}
                    value={formData.helpText}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent outline-none"
                    placeholder="Tell us about your goals, challenges, and what you'd like help with..."
                    required
                  />
                </div>

                {feedback.message ? (
                  <div
                    className={`rounded-lg border px-4 py-3 text-sm ${
                      feedback.type === 'success'
                        ? 'border-green-200 bg-green-50 text-green-700'
                        : 'border-red-200 bg-red-50 text-red-700'
                    }`}
                  >
                    {feedback.message}
                  </div>
                ) : null}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gold hover:bg-yellow-600 disabled:cursor-not-allowed disabled:opacity-70 text-navy font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                >
                  {isSubmitting ? 'Sending...' : 'Submit for Consultation'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Why Reach Out Section */}
      <section className="bg-gray-100 py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-navy text-center mb-12">
            Why Reach Out?
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-bold text-navy mb-3">Questions About Services?</h3>
              <p className="text-gray-700">
                Unsure which service package is right for your team? Let's talk through your situation
                and find the best fit.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-bold text-navy mb-3">Partnership Opportunities?</h3>
              <p className="text-gray-700">
                Interested in partnering with Outside Smoke? We're always open to collaborations that
                help swim teams grow.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-bold text-navy mb-3">Custom Needs?</h3>
              <p className="text-gray-700">
                Have a specific challenge not listed in our services? We're happy to discuss custom
                solutions tailored to your team.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-bold text-navy mb-3">Just Want to Chat?</h3>
              <p className="text-gray-700">
                Thinking about growth but not sure where to start? We're happy to have an exploratory
                conversation with no obligation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-navy text-white py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Explore What's Possible?
          </h2>
          <p className="text-lg text-white/90 mb-8">
            Share your needs and we will follow up about the right next step for your team.
          </p>
          <CTAButton text="Submit for Consultation" href="/contact" variant="primary" />
        </div>
      </section>
    </div>
  );
}

function ContactPageFallback() {
  return (
    <div className="min-h-screen">
      <section className="bg-navy text-white py-16 md:py-24" />
      <section className="py-16 md:py-20" />
    </div>
  );
}

export default function Contact() {
  return (
    <Suspense fallback={<ContactPageFallback />}>
      <ContactPageContent />
    </Suspense>
  );
}
