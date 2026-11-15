import { CertificateCard } from '../components/CertificateCard';
import { certificates } from '../data/certificates';

export default function CertificatesSection() {
  return (
    <section className="inner-page wrap certificates-page">
      {certificates.length > 0 ? (
        <>
          <div className="section-heading">
            <span className="eyebrow"><span className="eyebrow-dot" />Certificates</span>
            <h1>Learning. Building.<br /><span className="serif-accent">Growing.</span></h1>
            <p>Certificates and learning credentials listed in my resume. Open a credential to view its certificate or verification page.</p>
          </div>
          <div className="certificate-grid">
            {certificates.map((certificate) => <CertificateCard key={`${certificate.title}-${certificate.organization}`} certificate={certificate} />)}
          </div>
        </>
      ) : (
        <div className="certificate-empty-panel">
          <div className="certificate-empty-copy">
            <span className="eyebrow"><span className="eyebrow-dot" />Certificates</span>
            <h1>Learning. Building.<br /><span className="serif-accent">Growing.</span></h1>
            <p>My learning journey is ongoing. This section will showcase verified certificates and professional achievements as they are added.</p>
            <span className="learning-caption"><span className="eyebrow-dot" />A PRACTICE OF CURIOSITY</span>
          </div>
          <div className="certificate-empty-state" aria-hidden="true">
            <div className="learning-orbit learning-orbit-outer"><span /><span /><span /></div>
            <div className="learning-orbit learning-orbit-inner"><span /><span /></div>
            <div className="learning-core"><i /><i /><i /></div>
            <span className="learning-index">01 — ∞</span>
          </div>
        </div>
      )}
    </section>
  );
}
