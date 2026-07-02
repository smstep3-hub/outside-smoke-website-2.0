import CTAButton from '@/components/CTAButton';

export default function About() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-navy text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            About Outside Smoke
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Built by someone who understands competitive swimming, coaching, and the real challenges swim teams face.
          </p>
        </div>
      </section>

      {/* Why We Exist */}
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">
            Why Outside Smoke Exists
          </h2>
          {/* EDIT: Update this text to match your story */}
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Outside Smoke Consulting was born from direct experience in competitive swimming. The founder spent years 
            in the pool as a competitive swimmer and understands the demands placed on coaches, administrators, and parent boards.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            We watched talented coaches get stretched too thin handling sponsorship pitches, fundraising logistics, 
            social media pressure, and membership growth—all while trying to prepare athletes for competition. We saw 
            parent boards and club directors wanting to grow but unsure where to start. We recognized a gap.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Outside Smoke Consulting exists to close that gap. We handle the business side of swimming so coaches can coach, 
            directors can lead, and teams can focus on what matters: competitive excellence and community.
          </p>
        </div>
      </section>

      {/* Built for Swim Teams */}
      <section className="bg-gray-100 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-navy text-center mb-12">
            Built for Swim Teams
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Coaching Workload */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h3 className="text-2xl font-bold text-navy mb-4">Understand Coaching Workload</h3>
              <p className="text-gray-700 leading-relaxed">
                Coaches are on deck early, coaching hard, and often handling administrative work after practice. 
                We respect that time constraint and design solutions that don't add to their burden.
              </p>
            </div>

            {/* Sponsorship Challenges */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h3 className="text-2xl font-bold text-navy mb-4">Know Sponsorship Challenges</h3>
              <p className="text-gray-700 leading-relaxed">
                Finding sponsors is hard. Maintaining relationships is harder. We've seen what works and 
                what doesn't—and we bring that knowledge to every engagement.
              </p>
            </div>

            {/* Fundraising Reality */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h3 className="text-2xl font-bold text-navy mb-4">Recognize Fundraising Reality</h3>
              <p className="text-gray-700 leading-relaxed">
                Parent fatigue is real. We design fundraising that generates revenue without burning out your community. 
                Sustainability matters as much as results.
              </p>
            </div>

            {/* Parent Communication */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h3 className="text-2xl font-bold text-navy mb-4">Value Parent Communication</h3>
              <p className="text-gray-700 leading-relaxed">
                Clear, consistent communication builds trust and community. Social media and consistent messaging 
                keep parents informed and engaged.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Goal */}
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-8">
            The Goal: Let Coaches Coach
          </h2>
          <p className="text-xl text-gray-700 leading-relaxed mb-8">
            The best teams have great coaches. The best coaches focus on coaching. Our job is to handle 
            everything else—sponsorships, fundraising, communications, strategy. So coaches can do what they 
            do best: develop swimmers and build winning programs.
          </p>
          <div className="bg-gold/10 border-2 border-gold rounded-lg p-8">
            <p className="text-lg font-semibold text-navy">
              When coaches coach and leaders lead, swim teams grow. That's the Outside Smoke difference.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-navy text-white py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Let's Grow Your Team Together
          </h2>
          <p className="text-lg text-white/90 mb-8">
            Ready to learn how Outside Smoke can support your swim team's growth?
          </p>
          <CTAButton text="Contact Us" href="/contact" variant="primary" />
        </div>
      </section>
    </div>
  );
}
