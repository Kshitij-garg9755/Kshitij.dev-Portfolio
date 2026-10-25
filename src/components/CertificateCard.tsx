import type { Certificate } from '../data/certificates';
import { ArrowUpRight, DownloadIcon } from './Icons';

export function CertificateCard({ certificate }: { certificate: Certificate }) {
  return (
    <article className="certificate-card">
      {certificate.imageUrl && (
        <div className="certificate-card-image">
          <img src={certificate.imageUrl} alt={`Certificate: ${certificate.title}`} loading="lazy" />
        </div>
      )}
      <div className="certificate-card-copy">
        <span className="eyebrow"><span className="eyebrow-dot" />Verified learning</span>
        <h2>{certificate.title}</h2>
        {certificate.organization && <p className="certificate-organization">{certificate.organization}</p>}
        {certificate.issuedDate && <p className="certificate-date">Issued {certificate.issuedDate}</p>}
        {(certificate.credentialUrl || certificate.documentUrl) && (
          <div className="certificate-card-links">
            {certificate.credentialUrl && <a href={certificate.credentialUrl} target="_blank" rel="noreferrer">Verify credential <ArrowUpRight /></a>}
            {certificate.documentUrl && <a href={certificate.documentUrl} target="_blank" rel="noreferrer">View Certificate <ArrowUpRight /></a>}
            {certificate.documentUrl && <a href={certificate.documentUrl} download>Download Certificate <DownloadIcon /></a>}
          </div>
        )}
      </div>
    </article>
  );
}
