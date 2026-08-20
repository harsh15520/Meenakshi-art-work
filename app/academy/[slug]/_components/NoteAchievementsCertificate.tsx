import Image from "next/image";
import Reveal from "@/components/Reveal";
import { CertificateDownloadButton } from "@/components/CertificateDownloadButton";
import { STATIC_ACHIEVEMENTS } from "@/data/artists";
import type { Artist } from "./types";

export default function NoteAchievementsCertificate({
  artist,
  slug,
  qrDataUrl,
}: {
  artist: Artist;
  slug: string;
  qrDataUrl: string;
}) {
  return (
    <section className="section-wrap">
      <Reveal>
        <div className="note-achievements-certificate-row">
          <div className="note-column">
            {artist.teacherNoteImage ? (
              <div className="teacher-note-image-container">
                <Image
                  src={artist.teacherNoteImage}
                  alt="A Note from Ma'am"
                  width={900}
                  height={672}
                  style={{ objectFit: "contain" }}
                  className="teacher-note-image"
                />
              </div>
            ) : (
              <div className="teacher-note-layout">
                <div className="teacher-photo-crop">
                  <Image
                    src="/images/founder-meena.webp"
                    alt="Meenakshi, Founder"
                    fill
                    sizes="120px"
                    style={{ objectFit: "cover", objectPosition: "50% 15%" }}
                    className="photo-lifestyle"
                  />
                </div>
                <blockquote className="teacher-message">
                  <p>{artist.teacherNote.text}</p>
                  <footer>— {artist.teacherNote.attribution}</footer>
                </blockquote>
              </div>
            )}
          </div>

          <div className="achievements-column">
            <p className="artist-section-label">Achievements & Milestones</p>
            <div className="achievements-grid achievements-grid-compact">
              {STATIC_ACHIEVEMENTS.map((achievement, i) => (
                <div key={i} className="achievement-card">
                  <span className="achievement-icon-badge"><span className="achievement-icon">{achievement.icon}</span></span>
                  <h4>{achievement.title}</h4>
                  <p>{achievement.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="certificate-column">
            <div className="certificate-box">
              <Reveal variant="stamp" className="certificate-seal-graphic">
                <svg viewBox="0 0 60 76" width="56" height="70">
                  <path d="M8 30v34l14-8 8 8 8-8 14 8V30" fill="none" stroke="var(--wine)" strokeWidth="1.4" />
                  <circle cx="30" cy="22" r="19" fill="var(--ivory)" stroke="var(--gold)" strokeWidth="2" />
                  <circle cx="30" cy="22" r="14" fill="none" stroke="var(--gold)" strokeWidth="1" />
                  <path d="M30 13l2.6 6.2 6.7.6-5.1 4.4 1.5 6.5L30 27l-5.7 3.7 1.5-6.5-5.1-4.4 6.7-.6z" fill="var(--gold)" />
                </svg>
              </Reveal>
              <h3>Certified Artist</h3>
              <p className="certificate-text">{artist.certificate.text}</p>
              <div className="certificate-meta">
                <span>Certificate ID: {artist.certificate.certificateId}</span>
                <span>Issued: {new Date(artist.certificate.issuedDate).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}</span>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={qrDataUrl} alt="Scan to verify" className="certificate-qr-image" />
              <CertificateDownloadButton
                href={`/academy/${slug}/certificate`}
                fileName={`${artist.name}-Certificate.png`}
              />
              {artist.shareCode ? (
                <div className="student-share-code">
                  <span className="student-share-code__label">Your story code</span>
                  <span className="student-share-code__value">{artist.shareCode}</span>
                  <span className="student-share-code__hint">Enter this on the academy page to open your chest.</span>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
