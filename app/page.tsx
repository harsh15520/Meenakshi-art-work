"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import InquiryLink from "@/components/InquiryLink";
import Reveal from "@/components/Reveal";
import GuestbookNote from "@/components/GuestbookNote";
import GuestbookCtaSticky from "@/components/GuestbookCtaSticky";
import EditorialStrip from "@/components/EditorialStrip";
import HeroAudioPlayer from "@/components/HeroAudioPlayer";
import { ServiceCardLink, GalleryTileLink } from "@/components/ghosts";
import { postcards, stickyNotes } from "@/data/testimonials";
import { phases } from "@/data/curriculum";
import { trackScrollDepth, trackEngagementTime } from "@/lib/analytics";
import { getRandomFounderNote, getAnotherFounderNote, type FounderNote } from "@/data/founderNotes";
import { HERO_BLUR } from "@/lib/image-optimization";
import { GOOGLE_MAPS_URL } from "@/lib/site";
import { useGhostHover } from "@/lib/useGhostHover";

const heroImage = "/images/hero-home.webp";
const services = [
  ["01", "Art Academy", "Structured fine-art training for girls and women aged 6+.", "/academy", "/images/academy-class.webp", "Explore Academy"],
  ["02", "Premium Paintings", "Original handmade artwork for homes, offices and meaningful gifts.", "/gallery", "/images/bal-gopal-krishna.webp", "View Collection"],
  ["03", "Custom Commissions", "Personal paintings created around your story, space and occasion.", "/custom-orders", "/images/custom/oil-painting-23.webp", "Start a Commission"],
  ["04", "School Art Projects", "Polished art support for assignments, competitions and exhibitions.", "/contact", "/images/school-work-1.webp", "See Projects"]
];
const gallery = [
  ["Oil Paintings", "/gallery", "/images/studio-exterior.webp"],
  ["Acrylic Art", "/gallery#exhibition-room-6", "/images/gallery-acrylic-01.webp"],
  ["Student Work", "/academy", "/images/academy-class.webp"],
  ["Custom Work", "/custom-orders", "/images/custom-art-work-2.webp"]
];

export default function Home() {
  const [founderQuote, setFounderQuote] = useState("Art teaches patience, observation and the confidence to express what words cannot.");
  const founderNoteRef = useRef<FounderNote | undefined>(undefined);
  const heroCtaRef = useRef<HTMLAnchorElement>(null);

  useGhostHover(heroCtaRef);

  const showAnotherNote = () => {
    const next = getAnotherFounderNote(founderNoteRef.current);
    founderNoteRef.current = next;
    setFounderQuote(next.content);
  };

  useEffect(() => {
    founderNoteRef.current = getRandomFounderNote();

    let engagementStartTime = Date.now();
    // Throttle scroll handling to one dispatch per animation frame so rapid
    // scroll events don't fire many analytics calls in a row (OS scheduling).
    let scrollFrame = 0;

    const handleScroll = () => {
      if (scrollFrame) return;
      scrollFrame = requestAnimationFrame(() => {
        scrollFrame = 0;
        const scrollPercent = Math.round(
          (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
        );

        // Track at 25%, 50%, 75%, and 100% scroll depth
        if ([25, 50, 75, 100].includes(scrollPercent)) {
          trackScrollDepth("/", scrollPercent);
        }
      });
    };

    const handleEngagement = () => {
      const now = Date.now();
      const duration = Math.round((now - engagementStartTime) / 1000);
      if (duration >= 30) { // Track every 30 seconds
        trackEngagementTime("/", duration);
        // Log by wall-clock window, not cumulative, so overlapping sends
        // (e.g. a tab restored after being suspended) can't fire duplicates.
        engagementStartTime = now;
      }
    };

    window.addEventListener("scroll", handleScroll);
    const scrollTimeout = setInterval(handleEngagement, 30000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollFrame) cancelAnimationFrame(scrollFrame);
      clearInterval(scrollTimeout);
    };
  }, []);

  const renderGuestbookNotes = () => [
    ...postcards.map((card, i) => (
      <GuestbookNote
        key={card.name}
        {...card}
        index={i}
        rotation={((i * 7 - 21) % 360) as number}
        delay={i * 0.05}
      />
    )),
    ...stickyNotes.map((note, i) => (
      <GuestbookNote
        key={note.name}
        {...note}
        index={postcards.length + i}
        rotation={(((i + postcards.length) * 5 - 30) % 360) as number}
        delay={(postcards.length + i) * 0.04}
      />
    ))
  ];

  return <main>
    <section className="home-hero">
      <div className="hero-copy"><div><p className="eyebrow">FINE ART • SAHARANPUR • EST. 2017</p><h1>Where passion<br/>becomes <span className="hero-em-wrap"><em>art.</em><svg className="hero-flourish" viewBox="0 0 120 20" aria-hidden="true" focusable="false"><path d="M4 14 Q30 4 62 10 T116 6" /></svg></span></h1><p className="hero-sub">A trusted women-only academy and fine-art studio creating confident artists and timeless handmade paintings.</p><div className="hero-actions"><InquiryLink ref={heroCtaRef} message="Hello Meenakshi Art Work, I would like details about academy enrollment.">Join Academy</InquiryLink><HeroAudioPlayer /></div></div></div>
      <div className="hero-art" aria-label="Artist painting on canvas"><div className="hero-art-image"><Image src={heroImage} alt="Artist in studio" className="hero-photo" fill style={{ objectFit: "cover", objectPosition: "center" }} sizes="(min-width: 980px) 54vw, 100vw" priority placeholder="blur" blurDataURL={HERO_BLUR} /></div><div className="hero-glow hero-glow-a"></div><div className="hero-glow hero-glow-b"></div><div className="hero-glow hero-glow-c"></div><div className="hero-shine"></div><div className="hero-dust" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span><span></span></div><div className="paint-swatch one"></div><div className="paint-swatch two"></div><span className="vertical-type">MEENAKSHI ART WORK</span><div className="since-seal">SINCE<br/><b>2017</b><br/>SAHARANPUR</div></div>
    </section>

    <section className="trust-strip"><span>Since 2017</span><i></i><span>5-Star Rated</span><i></i><span>Women-Only Academy</span><i></i><span>Saharanpur Trusted</span></section>

    <EditorialStrip />

    <section className="services section-wrap"><Reveal className="section-heading"><div><p className="eyebrow">WHAT WE CREATE</p><h2>Art for your hands,<br/>home and <em>heart.</em></h2></div><p>Whether you want to learn, collect or commission, every experience is guided personally.</p></Reveal><div className="services-grid">{services.map(([n, title, text, href, image, cta], i) => <Reveal key={title} className="service-card" delay={i * .08}><ServiceCardLink href={href}><div className="service-image"><Image src={image} alt={title} fill sizes="(min-width: 980px) 25vw, 50vw" style={{ objectFit: "cover", objectPosition: "center" }} className="service-image-bg" /><span>{n}</span></div><h3>{title}</h3><p>{text}</p><b>{cta} →</b></ServiceCardLink></Reveal>)}</div></section>

    <section className="founder-section" id="meet-the-artist"><div className="founder-portrait"><div className="portrait-image"><Image
      src="/images/founder-meena.webp"
      alt="Meenakshi portrait"
      fill
      style={{ objectFit: "cover", objectPosition: "center" }}
      sizes="(min-width: 980px) 40vw, 100vw"
      priority
    /></div><p>Meenakshi · Founder & Lead Instructor</p></div><Reveal className="founder-copy"><p className="eyebrow">MEET THE ARTIST</p><h2>The heart behind<br/><em>every brushstroke.</em></h2><p>Founded in 2017, Meenakshi Oil Painting was built with a vision to teach fine art in a secure, disciplined environment—while creating premium handcrafted artwork for people who value originality.</p><blockquote><p className="founder-quote-text">&ldquo;{founderQuote}&rdquo;</p><div className="founder-quote-signature"><svg viewBox="0 0 200 80" className="founder-signature-svg"><text x="10" y="60" className="founder-signature-name">Meenakshi</text><path className="founder-signature-flourish" d="M10,68 C60,78 120,78 175,66 C185,64 190,68 182,72" /></svg></div></blockquote><button type="button" className="founder-quote-more" onClick={showAnotherNote}>Another note <span>↻</span></button><Link href="/journal" className="line-link">Our story & studio <span>→</span></Link></Reveal></section>

    <section className="journey section-wrap"><Reveal className="section-heading"><div><p className="eyebrow">THE ACADEMY JOURNEY</p><h2>From first line to<br/><em>finished canvas.</em></h2></div><p>A progressive five-phase path that builds strong foundations before advanced techniques.</p></Reveal><div className="phase-list">{phases.map(([n, title, text]) => <div className="phase" key={n}><span>{n}</span><h3>{title}</h3><p>{text}</p></div>)}</div><InquiryLink message="Hello, I would like to know the academy fees, schedule and admission process." className="button-outline">Get academy details</InquiryLink></section>

    <section className="gallery-section"><div className="gallery-head"><p className="eyebrow">SELECTED WORK</p><h2>Made slowly.<br/><em>Remembered forever.</em></h2><Link href="/gallery">View full gallery →</Link></div><div className="gallery-grid">{gallery.map(([label, href, image], i) => <GalleryTileLink href={href} className={`gallery-tile tile-${i + 1}`} key={label}><Image src={image} alt={label} fill sizes="50vw" style={{ objectFit: "cover", objectPosition: "center" }} className="gallery-tile-bg" /><span>{label}</span><b>View Collection →</b></GalleryTileLink>)}</div></section>

    <section className="guestbook section-wrap" id="guestbook"><Reveal><p className="eyebrow">WORDS FROM OUR COMMUNITY</p><h2>Trust, painted over<br/><em>nine beautiful years.</em></h2></Reveal><div className="guestbook-wall">{renderGuestbookNotes()}</div><div className="guestbook-footer"><a href={GOOGLE_MAPS_URL} target="_blank" rel="noopener noreferrer" className="guestbook-link">★ 4.9 · 50+ reviews on Google <span>↗</span></a></div><GuestbookCtaSticky /></section>

    <section className="faq section-wrap"><Reveal><p className="eyebrow">GOOD TO KNOW</p><h2>Frequently asked<br/><em>questions.</em></h2></Reveal><div className="faq-list"><details><summary>What are the academy fees?<span>+</span></summary><p>Fees depend on the student&apos;s level and learning plan. Message us on WhatsApp for the current fee structure.</p></details><details><summary>Who can join the classes?<span>+</span></summary><p>Girls aged 6+ and women can enroll. Beginners are warmly welcomed.</p></details><details><summary>What are the class timings?<span>+</span></summary><p>Regular classes are held from 4:30 PM to 5:30 PM. Contact us to confirm batch availability.</p></details><details><summary>How long does a custom painting take?<span>+</span></summary><p>Most commissions require 1–4 weeks depending on size, medium and detail. A timeline is confirmed before work begins.</p></details></div></section>

    <section className="contact-band"><div><p className="eyebrow">VISIT THE STUDIO</p><h2>A quiet corner of<br/>Saharanpur, full of <em>colour.</em></h2></div><div className="contact-details"><p><b>ADDRESS</b>H.no.11/280B, Bansal Wali Gali, Near Meenakshi Garg Eye Hospital, Pratap Nagar, near Raiwala Market, Saharanpur</p><p><b>CLASS TIMING</b>4:30 PM – 5:30 PM</p><p><b>PAINTING PURCHASES</b>9:00 AM – 5:00 PM</p><div><InquiryLink message="Hello, I would like to visit Meenakshi Art Work. Please share directions and a suitable time.">Plan your visit</InquiryLink><a className="map-link" href={GOOGLE_MAPS_URL} target="_blank" rel="noopener noreferrer">Open map ↗</a></div></div></section>
  </main>;
}
