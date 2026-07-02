import Image from 'next/image';
import CTAButton from '@/components/CTAButton';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-navy text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mx-auto mb-10 w-full max-w-xs sm:max-w-sm">
            <div className="rounded-[48px] bg-white p-6 shadow-[0_32px_90px_-40px_rgba(11,37,69,0.55)] ring-2 ring-gold/25">
              <Image
                src="/logo.png"
                alt="Outside Smoke Consulting logo"
                width={320}
                height={320}
                className="mx-auto h-36 w-auto object-contain sm:h-44"
              />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Helping Swim Teams Grow
            </h1>
            <p className="text-xl md:text-2xl text-gold font-semibold mb-2">
              Outside The Pool
            </p>
            <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
              Outside Smoke Consulting helps swim teams and clubs tackle sponsorships, fundraising,
              social media, and growth challenges — so coaches can focus on what they do best: coaching.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CTAButton text="Submit for Consultation" href="/contact" variant="primary" />
              <CTAButton text="View Services" href="/services" variant="secondary" />
            </div>
          </div>
        </div>
      </section>

      {/* Who We Help Section */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-navy text-center mb-12">
            Who We Help
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Swim Clubs */}
            <div className="bg-white rounded-lg shadow p-6 border-t-4 border-gold">
              <h3 className="text-xl font-bold text-navy mb-3">Swim Clubs & Teams</h3>
              <p className="text-gray-700">
                Competitive swim clubs juggling growth, sponsorships, and member retention while staying focused on competitive excellence.
              </p>
            </div>

            {/* Coaches */}
            <div className="bg-white rounded-lg shadow p-6 border-t-4 border-gold">
              <h3 className="text-xl font-bold text-navy mb-3">Coaches & Directors</h3>
              <p className="text-gray-700">
                Leaders wearing too many hats. We handle the business side so you can lead your team on the deck.
              </p>
            </div>

            {/* Youth Organizations */}
            <div className="bg-white rounded-lg shadow p-6 border-t-4 border-gold">
              <h3 className="text-xl font-bold text-navy mb-3">Youth Organizations</h3>
              <p className="text-gray-700">
                Parent-led boards and youth sports groups looking to expand reach, secure funding, and build community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Handle Section */}
      <section className="bg-slate-50 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-navy text-center mb-12">
            What We Handle
          </h2>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { src: '/icon-sponsorships.jpg', alt: 'Sponsorships', title: 'Sponsorships', desc: 'Building and managing sponsor relationships' },
              { src: '/icon-fundraising.jpg', alt: 'Fundraising', title: 'Fundraising', desc: 'Strategic fundraising campaigns and planning' },
              { src: '/icon-socialmedia.jpg', alt: 'Social Media', title: 'Social Media', desc: 'Content strategy and social templates' },
              { src: '/icon-growth.jpg', alt: 'Growth', title: 'Growth', desc: 'Club audits and growth strategies' }
            ].map((item, idx) => (
              <div key={idx} className="bg-white rounded-[32px] border border-slate-200 shadow-sm p-8 text-center transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg">
                <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full border-2 border-navy bg-slate-50 shadow-sm">
                  <Image src={item.src} alt={item.alt} width={88} height={88} className="h-14 w-14 object-contain" />
                </div>
                <h3 className="text-xl font-semibold text-navy mb-3">{item.title}</h3>
                <div className="mx-auto mb-4 h-1.5 w-16 rounded-full bg-gold"></div>
                <p className="text-sm leading-6 text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-navy text-white py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Grow Your Team?
          </h2>
          <p className="text-lg text-white/90 mb-8">
            Share a few details about your program and we’ll reach out to start the conversation.
          </p>
          <CTAButton text="Submit for Consultation" href="/contact" variant="primary" />
        </div>
      </section>
    </div>
  );
}
