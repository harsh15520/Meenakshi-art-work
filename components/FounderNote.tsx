"use client";

import { getRandomFounderNote } from '@/data/founderNotes';
import { useEffect, useState } from 'react';
import Reveal from './Reveal';

/**
 * FounderNote - Displays a random personal note from Meenakshi.
 * 
 * This component shows authentic, personal messages from the artist
 * to create an immediate emotional connection with visitors. The note
 * is randomly selected from a collection on each page load.
 * 
 * Features:
 * - Random note selection on each page load
 * - Handwritten styling for authenticity
 * - Subtle animation using existing Reveal system
 * - Personal "Meenakshi's Desk" labeling
 */
export default function FounderNote() {
  const [note, setNote] = useState<{ content: string } | null>(null);
  
  useEffect(() => {
    setNote(getRandomFounderNote());
  }, []);
  
  if (!note) return null;
  
  return (
    <div className="founder-note-section">
      <Reveal>
        <div className="founder-note-container">
          <div className="founder-note-label">Meenakshi&apos;s Desk</div>
          <p className="founder-note-text">{note.content}</p>
          <div className="founder-note-decoration"></div>
        </div>
      </Reveal>
    </div>
  );
}