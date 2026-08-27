import CTAButton from '@/components/CTAButton';

export default function TestimonialsPage() {
  return (
    <div className="min-h-screen">
      <section className="bg-navy py-16 text-white md:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-gold">Outside Smoke Consulting</p>
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">Testimonials</h1>
          <p className="mx-auto max-w-2xl text-xl text-white/90">We&apos;re proud to partner with aquatic organizations working to grow outside the pool. Check back soon to hear directly from the teams we&apos;ve worked with.</p>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <div className="border-y-2 border-gold py-12">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-gold">Client stories</p>
            <h2 className="mb-8 text-4xl font-bold text-navy md:text-5xl">Coming Soon</h2>
            <CTAButton text="Start the Conversation" href="/contact" variant="primary" />
          </div>
        </div>
      </section>
    </div>
  );
}