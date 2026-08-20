"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import type { Testimonial } from "@/data/testimonials";

type Props = Testimonial & { index: number; rotation: number; delay: number };

export default function GuestbookNote({ name, quote, credibility, type, image, rotation, delay }: Props) {
  if (type === "postcard") {
    return (
      <motion.div
        className="guestbook-postcard"
        style={{ rotate: rotation }}
        initial={{ opacity: 0, y: -40, rotate: rotation + 10 }}
        whileInView={{ opacity: 1, y: 0, rotate: rotation }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay, type: "spring", damping: 12 }}
      >
        <div className="postcard-content">
          {image && <div className="postcard-image"><Image src={image} alt="Artwork" fill style={{ objectFit: "cover" }} /></div>}
          <p className="postcard-quote">{quote}</p>
          <div className="postcard-attribution">
            <p className="postcard-name">{name}</p>
            {credibility && <p className="postcard-credibility">{credibility}</p>}
          </div>
        </div>
        <div className="postcard-tape"></div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="guestbook-sticky"
      style={{ rotate: rotation }}
      initial={{ opacity: 0, y: -30, rotate: rotation + 5 }}
      whileInView={{ opacity: 1, y: 0, rotate: rotation }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5, delay, type: "spring", damping: 14 }}
    >
      <p className="sticky-quote">{quote}</p>
      <p className="sticky-name">{name}</p>
    </motion.div>
  );
}
