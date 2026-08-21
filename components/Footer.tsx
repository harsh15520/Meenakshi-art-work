import Image from "next/image";
import Link from "next/link";
import PinterestEmbed from "./PinterestEmbed";
import { InstagramIcon, YouTubeIcon, GoogleIcon } from "./SocialIcons";
import { GOOGLE_MAPS_URL } from "@/lib/site";

/**
 * Footer - Site footer with navigation links, contact information, and social media cards.
 * 
 * Displays:
 * - Contact CTA with WhatsApp link
 * - Social media cards (Instagram, YouTube, Google, Pinterest)
 * - Navigation links
 * - Studio address and hours
 * - Copyright information
 */
export default function Footer() {
  return <footer className="site-footer">
    <div className="footer-lead"><p>MEENAKSHI ART WORK</p><h2>Let&rsquo;s create something<br/><em>beautiful.</em></h2><a href="https://wa.me/917017512686?text=Hello%2C%20I%20would%20like%20to%20discuss%20art%20classes%20or%20a%20painting." target="_blank" rel="noopener noreferrer">Begin on WhatsApp <span>↗</span></a></div>
    <div className="footer-social"><p className="eyebrow">FOLLOW THE STUDIO</p><div className="footer-social-grid"><a href="https://www.instagram.com/meenakshiartwork/" target="_blank" rel="noopener noreferrer" className="social-card"><div className="social-card-image"><Image src="/images/social/instagram-preview.webp" alt="Instagram preview" fill sizes="(max-width: 640px) 100vw, 140px" style={{objectFit:"cover",objectPosition:"center"}} /></div><div className="social-card-body"><div className="social-icon"><InstagramIcon /></div><h3>Instagram</h3><p>Behind the scenes & studio stories</p></div></a><a href="https://www.youtube.com/@meenakshiartwork6709" target="_blank" rel="noopener noreferrer" className="social-card"><div className="social-card-image"><Image src="/images/social/youtube-preview.webp" alt="YouTube preview" fill sizes="(max-width: 640px) 100vw, 140px" style={{objectFit:"cover",objectPosition:"center"}} /></div><div className="social-card-body"><div className="social-icon"><YouTubeIcon /></div><h3>YouTube</h3><p>Academy tutorials & artist interviews</p></div></a><a href={GOOGLE_MAPS_URL} target="_blank" rel="noopener noreferrer" className="social-card"><div className="social-card-image"><Image src="/images/studio-exterior.webp" alt="Studio exterior" fill sizes="(max-width: 640px) 100vw, 140px" style={{objectFit:"cover",objectPosition:"center"}} /></div><div className="social-card-body"><div className="social-icon"><GoogleIcon /></div><h3>Google</h3><p>Studio location & 5-star reviews</p></div></a><div className="social-card"><div style={{flex:1,display:"flex",flexDirection:"column",justifyContent:"center",padding:"20px"}}><PinterestEmbed /></div></div></div></div>
    <div className="footer-grid"><div><b>Visit</b><p>H.no.11/280B, Bansal Wali Gali,<br/>Pratap Nagar, Saharanpur</p></div><div><b>Explore</b><Link href="/academy">Art Academy</Link><Link href="/gallery">Gallery</Link><Link href="/custom-orders">Custom Orders</Link><Link href="/journal">Studio Journal</Link></div><div><b>Hours</b><p>Classes: 4:30&ndash;5:30 PM<br/>Painting sales: 9 AM&ndash;5 PM</p></div></div>
    <div className="footer-bottom"><span>© 2026 Meenakshi Oil Painting</span><span>Handmade with patience in Saharanpur.</span></div>
  </footer>;
}
