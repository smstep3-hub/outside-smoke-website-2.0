import ServiceCard from '@/components/ServiceCard';
import CTAButton from '@/components/CTAButton';

const services = [
  {
    title: 'Sponsorship & Partnership Development',
    headline: 'Build partnerships that create value for your organization and your sponsors.',
    description: 'Outside Smoke Consulting helps aquatic organizations identify their most valuable assets, package those opportunities effectively, establish sponsorship levels, identify potential partners, and create a sustainable system for generating partnership revenue.',
    helpWith: ['Sponsorship asset inventories', 'Sponsorship packets and presentations', 'Sponsorship tiers and pricing', 'Local and national partner strategy', 'Prospect identification and research', 'Outreach strategy and messaging', 'Scoreboard, facility, event and digital sponsorship opportunities', 'Sponsor activation', 'Renewal strategy', 'Partnership tracking and organization'],
    cta: 'Build Your Sponsorship Strategy',
    slug: 'sponsorship-partnership-development',
  },
  {
    title: 'Fundraising Blueprint & Campaign Planning',
    headline: 'We build the fundraiser. Your organization runs it.',
    description: 'Outside Smoke Consulting works with your leadership team to understand the campaign, revenue goal, audience and timeline, then builds the tools your organization needs to execute it successfully. From Swim-A-Thons to custom fundraising campaigns, we can eliminate much of the planning workload before the fundraiser ever launches.',
    helpWith: ['Fundraising strategy and revenue goals', 'Complete campaign timelines', 'Email and communication calendars', 'Parent and athlete communications', 'Social media content planning', 'Marketing materials', 'Staff and volunteer responsibilities', 'Campaign launch plans', 'Progress tracking', 'Post-campaign wrap-up'],
    cta: 'Plan Your Next Fundraiser',
    slug: 'fundraising-blueprint-campaign-planning',
  },
  {
    title: 'Digital Media & Livestream Development',
    headline: 'Make your meet presentation match the quality of your program.',
    description: 'Outside Smoke Consulting helps aquatic organizations improve livestreams and digital presentation while creating additional opportunities to showcase sponsors and organizational branding.',
    helpWith: ['YouTube and Facebook streaming', 'OBS setup and optimization', 'Branded broadcast graphics', 'Sponsor overlays', 'Automated sponsor rotations', 'Meet thumbnails', 'Digital advertising integration', 'Broadcast workflows', 'Staff training and documentation', 'Ongoing graphic and system updates'],
    cta: 'Upgrade Your Digital Experience',
    slug: 'digital-media-livestream-development',
  },
  {
    title: 'Club Growth & Organizational Audit',
    headline: 'Understand where your program stands—and where it can go next.',
    description: 'Outside Smoke Consulting provides an outside perspective on the health and direction of your organization, identifying opportunities for growth while helping leadership prioritize what matters most.',
    helpWith: ['Membership analysis', 'Recruitment strategy', 'Retention analysis', 'Program positioning', 'Operational review', 'Communication review', 'Revenue opportunity assessment', 'Digital presence review', 'Organizational strengths and weaknesses', 'Prioritized growth recommendations'],
    cta: 'Evaluate Your Program',
    slug: 'club-growth-organizational-audit',
  },
  {
    title: 'Coach & Staff Development',
    headline: 'Invest in the people responsible for delivering your program every day.',
    description: "Today's coaches are responsible for far more than writing workouts. Outside Smoke Consulting helps organizations develop stronger coaches, leaders and staff systems designed for the realities of today's aquatic environment.",
    helpWith: ['Coaching staff assessments', 'Coach development pathways', 'Leadership development', 'Staff expectations and accountability', 'Coach development resources', 'Communication skills', 'Conflict management', 'Workload and time management', 'Daily coaching processes', 'Multi-site leadership', 'Organizational culture development'],
    cta: 'Develop Your Staff',
    slug: 'coach-staff-development',
  },
  {
    title: 'Workshops & Team Development',
    headline: 'Professional development built around the challenges your staff actually faces.',
    description: 'Outside Smoke Consulting delivers customized workshops and team-development sessions for coaching staffs, leadership teams, retreats and organizational meetings. Rather than relying on generic presentations, sessions can be designed around the current needs and challenges of your organization.',
    helpWith: ['The Modern Coach', 'Communication, Conflict & Culture', 'Managing the Coaching Workload', 'Leadership Within a Multi-Site Organization', 'Building Staff Accountability', 'Creating Consistency Across a Coaching Staff', 'Daily Planning & Coaching Processes', 'Parent and Athlete Communication', 'Building Culture Beyond the Mission Statement'],
    cta: 'Build a Development Session',
    slug: 'workshops-team-development',
  },
  {
    title: 'Operational & Strategic Consulting',
    headline: "Sometimes the challenge doesn't fit neatly into a package.",
    description: 'Outside Smoke Consulting works alongside aquatic organizations facing operational challenges, organizational growth, leadership transitions, new initiatives, or projects requiring an experienced outside perspective. We start by understanding the problem, then determine what support actually makes sense.',
    helpWith: ['Strategic planning', 'Process development', 'Leadership implementation', 'Organizational structure', 'Communication systems', 'Parent and community engagement', 'Staff and volunteer processes', 'Project planning', 'New program implementation', 'Revenue strategy', 'Leadership advisory support'],
    cta: "Tell Us What You're Working On",
    slug: 'operational-strategic-consulting',
  },
];

export default function Services() {
  return (
    <div className="min-h-screen">
      <section className="bg-navy py-16 text-white md:py-24">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl">Services Built for Aquatic Organizations</h1>
          <p className="mx-auto max-w-3xl text-xl text-white/90">Practical support for the work that helps your organization grow outside the pool.</p>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.slug} {...service} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-100 py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 text-3xl font-bold text-navy md:text-4xl">Don&apos;t See Exactly What You Need?</h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-700">That&apos;s okay. Outside Smoke Consulting isn&apos;t built around forcing every organization into the same package. Tell us what you&apos;re trying to accomplish, where you&apos;re getting stuck, or what you simply don&apos;t have the bandwidth to build internally. We&apos;ll start with a conversation, identify the opportunity, and determine what an appropriate scope of work could look like.</p>
          <CTAButton text="Submit a Consultation Request" href="/contact" variant="primary" />
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 text-3xl font-bold text-navy md:text-4xl">Built Around Your Organization</h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-700">Every organization has different goals, resources, timelines and challenges. Outside Smoke Consulting engagements are scoped around the work required to accomplish your objectives. Following an initial consultation, we&apos;ll recommend a scope of work, deliverables, timeline and investment based on what your organization actually needs.</p>
          <CTAButton text="Start the Conversation" href="/contact" variant="primary" />
        </div>
      </section>
    </div>
  );
}
