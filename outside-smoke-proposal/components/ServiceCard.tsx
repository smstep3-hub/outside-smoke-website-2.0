import Link from 'next/link';

interface ServiceCardProps {
  title: string;
  description: string;
  bestFor: string;
  inquiryPrompt: string;
}

export default function ServiceCard({ title, description, bestFor, inquiryPrompt }: ServiceCardProps) {
  const contactHref = `/contact?help=${encodeURIComponent(inquiryPrompt)}`;

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-100 p-6 flex flex-col h-full">
      {/* Card Header */}
      <div className="border-b-2 border-gold pb-4 mb-4">
        <h3 className="text-xl font-bold text-navy">{title}</h3>
      </div>

      {/* Card Content */}
      <p className="text-gray-700 flex-grow mb-4">{description}</p>

      {/* Best For */}
      <div className="mb-6">
        <p className="text-sm font-semibold text-gray-600 mb-1">Best For:</p>
        <p className="text-sm text-gray-700">{bestFor}</p>
      </div>

      {/* CTA Button */}
      <Link
        href={contactHref}
        className="inline-block bg-gold hover:bg-yellow-600 text-navy font-semibold py-2 px-4 rounded transition-colors duration-200 text-center"
      >
        Contact Us
      </Link>
    </div>
  );
}
