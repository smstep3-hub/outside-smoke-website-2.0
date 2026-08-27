import Link from 'next/link';

interface ServiceCardProps {
  title: string;
  headline: string;
  description: string;
  helpWith: string[];
  cta: string;
  slug: string;
}

export default function ServiceCard({ title, headline, description, helpWith, cta, slug }: ServiceCardProps) {
  const contactHref = `/contact?service=${encodeURIComponent(slug)}`;

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-100 p-6 flex flex-col h-full">
      <div className="border-b-2 border-gold pb-4 mb-4">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gold">Outside Smoke Consulting</p>
        <h3 className="mt-2 text-xl font-bold text-navy">{title}</h3>
      </div>

      <h4 className="mb-3 text-lg font-semibold text-navy">{headline}</h4>
      <p className="mb-6 text-gray-700">{description}</p>

      <div className="mb-8 flex-grow">
        <p className="mb-3 text-sm font-semibold text-navy">We Can Help With:</p>
        <ul className="space-y-2 text-sm text-gray-700">
          {helpWith.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="text-gold" aria-hidden="true">+</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <Link
        href={contactHref}
        className="inline-block rounded bg-gold px-4 py-3 text-center font-semibold text-navy transition-colors duration-200 hover:bg-yellow-600"
      >
        {cta}
      </Link>
    </div>
  );
}
