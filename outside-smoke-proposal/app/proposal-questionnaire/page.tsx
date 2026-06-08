import Link from 'next/link';

export default function ProposalLanding() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-navy">Proposal Questionnaire</h1>
      <p className="text-lg text-gray-700">
        Thanks for your interest. This questionnaire helps Outside Smoke Consulting gather the
        information needed to prepare a customized proposal for your swim team.
      </p>

      <ul className="list-disc pl-5 space-y-2 text-gray-700">
        <li>Estimate program size and demographics</li>
        <li>Describe current challenges and goals</li>
        <li>Share sponsorship, fundraising, and communications details</li>
      </ul>

      <div className="pt-4">
        <Link href="/proposal-questionnaire/start" className="btn btn-gold">
          Start Questionnaire
        </Link>
      </div>
    </div>
  );
}
