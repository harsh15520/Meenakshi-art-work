import type { Metadata } from "next";
import InteriorPage from "@/components/InteriorPage";
import { schoolProjectsImages } from "@/data/categoryImages";
import { GOOGLE_MAPS_URL } from "@/lib/site";
export const metadata: Metadata = { title: "Contact the Saharanpur Art Studio" };
export default function ContactPage() {
  return (
    <>
      <InteriorPage
        eyebrow="VISIT • CALL • WHATSAPP"
        title="The studio door"
        italic="is always warm."
        intro="Visit Meenakshi Art Work in Pratap Nagar, Saharanpur, or begin your academy, purchase or commission inquiry on WhatsApp."
        message="Hello Meenakshi Art Work, I would like to plan a studio visit."
        image="/images/studio-exterior.webp"
        carouselImages={schoolProjectsImages}
        marqueeEyebrow="SCHOOL ART SUPPORT"
        marqueeTitle="Student assignments, guided by Meenakshi"
        marqueeCaption="School projects completed with our studio's guidance."
        heroNote={{
          href: "/journal",
          label: "Want to know the studio before visiting?",
          text: "Read today's studio journal →",
        }}
        items={[
          { title: "WhatsApp", text: "7017512686 — the quickest way to ask about classes, art or a custom order. We reply within a few hours." },
          { title: "Email", text: "studio@meenakshiartwork.com — for longer questions, commission briefs, or academy enquiries. Expect a reply within 24 hours." },
          { title: "Studio address", text: "H.no.11/280B, Bansal Wali Gali, Pratap Nagar, near Raiwala Market, Saharanpur." },
          { title: "Class hour", text: "Women-only academy classes run from 4:30 PM to 5:30 PM, Monday to Saturday." },
          { title: "Purchase visits", text: "Painting inquiries and studio visits are welcome between 9 AM and 5 PM, Monday to Saturday." },
          { title: "Academy enquiry", text: "New students start with a WhatsApp message or a studio visit. We'll match you to the right phase and share the schedule." },
          { title: "Custom commission", text: "Share your vision on WhatsApp or email — room size, theme, colours, occasion. Meenakshi replies with a sketch idea and timeline." },
          { title: "Follow the studio", text: "Instagram @meenakshiartwork for behind-the-scenes. YouTube @meenakshiartwork6709 for tutorials and interviews. Pinterest @meenakshiartstudio for colour palettes and inspiration boards." },
        ]}
      />
      <section className="contact-map section-wrap">
        <p className="eyebrow">FIND THE STUDIO</p>
        <h2>Open the map and<br/><em>plan your visit.</em></h2>
        <a className="button-primary contact-map__link" href={GOOGLE_MAPS_URL} target="_blank" rel="noopener noreferrer">Open in Google Maps <span>↗</span></a>
      </section>
    </>
  );
}
