/**
 * Testimonial - Customer review or testimonial data.
 * 
 * @property name - Name of the person providing the testimonial
 * @property quote - The testimonial text
 * @property credibility - Optional credibility indicator (e.g., review count)
 * @property type - Display type: 'postcard' for featured reviews, 'sticky' for quick notes
 * @property image - Optional path to an artwork image associated with the testimonial
 */
export type Testimonial = {
  name: string;
  quote: string;
  credibility?: string;
  type: "postcard" | "sticky";
  image?: string;
};

/**
 * Featured testimonials displayed as postcards on the homepage.
 * These are more detailed reviews with higher credibility indicators.
 */
export const postcards: Testimonial[] = [
  {
    name: "Dr. Snigdha Aggarwal",
    quote: "I can't tell you how much Meenakshi mam have improved my painting skills! Not only does she show you how to paint, she also critiques student's work. You will not find a better bang for your buck in art instruction.",
    credibility: "6 reviews",
    type: "postcard",
  },
  {
    name: "Raj Kumar Gayen",
    quote: "It was an absolute honor to get a first hand learning experience at Meenakshi Oil Painting Center. Her encouragement and wisdom enabled me to bring my first oil painting to life. It's the BEST in the town.",
    credibility: "9 reviews",
    type: "postcard",
  },
  {
    name: "Pulkit Gulati",
    quote: "Amazing work. I have one of them in my drawing room gifted to me by Meenakshi Aunty. The artwork is simply extraordinary.",
    credibility: "6 reviews",
    type: "postcard",
    image: "/images/custom/oil-painting-23.webp",
  },
  {
    name: "Kanika Gupta",
    quote: "These beautiful paintings are worth buying. Each and every art is just lovely. Can't get over my eyes from these attractive Artwork. Loved it.",
    credibility: "2 reviews",
    type: "postcard",
  },
  {
    name: "Prashant Garg",
    quote: "If you want paintings with perfection, then go there. The quality is unmatched.",
    credibility: "8 reviews, 1 photo",
    type: "postcard",
  },
  {
    name: "Keshav Bansal",
    quote: "Great place to learn. Worth a try. Believe me.",
    credibility: "2 reviews",
    type: "postcard",
  },
  {
    name: "Kajal Gupta",
    quote: "Unbelievable. Amazing. Lovely. Fabulous. I have no words for this talent. You are great in all fields.",
    credibility: "2 reviews",
    type: "postcard",
  },
  {
    name: "Abbas Xaidi",
    quote: "Lovely painting.",
    credibility: "Local Guide · 277 reviews",
    type: "postcard",
  },
];

/**
 * Quick testimonials displayed as sticky notes on the homepage.
 * These are shorter, more casual reviews.
 */
export const stickyNotes: Testimonial[] = [
  { name: "Manish Garg", quote: "Very nice and amazing paintings. Wonderful 👍", credibility: "4 reviews", type: "sticky" },
  { name: "Krish Bansal", quote: "Awesome amazing fantastic mind-blowing paintings 🫶👌👌", credibility: "1 review", type: "sticky" },
  { name: "Niyati Mittal", quote: "The paintings were very beautifully made with perfect detailings.", credibility: "1 review", type: "sticky" },
  { name: "Deepak Goel", quote: "Amazing collection of paintings. Show ur imagination with colours is awesome❤️", credibility: "1 review", type: "sticky" },
  { name: "Sanchi Gupta", quote: "Beautiful and colorful paintings. Great work.", credibility: "2 reviews", type: "sticky" },
  { name: "Rubal Singhal", quote: "These ara amazing and awesome paintings", credibility: "1 review", type: "sticky" },
  { name: "Sahil Madeshiya", quote: "Amazing collection of paintings😍👍", credibility: "6 reviews", type: "sticky" },
  { name: "Sameer Rao", quote: "Great paintings", credibility: "2 reviews, 11 photos", type: "sticky" },
  { name: "Kanishka Goel", quote: "Amazing paintings", credibility: "1 review", type: "sticky" },
  { name: "Rudresh Singhal", quote: "Nice.", credibility: "3 reviews, 1 photo", type: "sticky" },
  { name: "Him Singh", quote: "Beautiful Creation by a beautiful person", credibility: "6 reviews", type: "sticky" },
  { name: "Akshat Singhal", quote: "Wonderful Paintings👌👌👌👌", credibility: "4 reviews, 1 photo", type: "sticky" },
  { name: "Wali Mohammad", quote: "Good", credibility: "5 reviews", type: "sticky" },
  { name: "MD Nizamuddin", quote: "Excellent service 👌", credibility: "Local Guide · 19 reviews", type: "sticky" },
  { name: "Sagar Humnekar", quote: "Superb", credibility: "2 reviews", type: "sticky" },
  { name: "Atishay Jain", quote: "Awesome Paintings", credibility: "Local Guide · 37 reviews", type: "sticky" },
  { name: "Shiv Pratap Singh", quote: "Appreciable works", credibility: "Local Guide · 11 reviews", type: "sticky" },
  { name: "Ritu Goel", quote: "Nice", credibility: "Local Guide · 490 reviews", type: "sticky" },
  { name: "Enter Tainment", quote: "Good", credibility: "4 reviews, 1 photo", type: "sticky" },
  { name: "Rakesh Gumber", quote: "Appreciable work", credibility: "1 review", type: "sticky" },
];
