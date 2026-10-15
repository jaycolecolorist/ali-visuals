/*
  ALI. — site data. This is the one file to edit.

  Every fact here comes from Ali's own public pages, checked 15 October 2026:
  Instagram @ali_visualss (bio, post captions) and TikTok @ali_visualss (bio, counts).
  Titles are her captions (or her collaborator's caption) word for word.
  Nothing is invented: if a fact is not known, the field is null and the page hides it.
*/
window.ALI = {
  name: "ALI.",
  fullTitle: "ALI. Visual Creator",
  city: "Kampala, Uganda",
  // Her bio, Instagram: "Cinematic Visuals 🎥 Portraits• Films• Creative Direction• Kampala | DM for work"
  disciplines: ["Portraits", "Films", "Creative direction"],

  // The short summary shown on the home page, the About page and the Profile page.
  // Every claim maps to a post: genres from the work list, DOP/editor/colourist from the
  // Fit2Flaunt credit, S-Log3 and Sony A7 IV from her colour-grading post.
  summary: [
    "Ali is a cinematographer and photographer based in Kampala, Uganda. She films weddings and proposals, maternity and family stories, fashion and brand work and music artists, and she photographs portraits.",
    "She takes care of the whole picture. She shoots as director of photography, edits her own films and grades the colour herself, from S-Log3 on her Sony A7 IV to the final look. Her work has appeared on the pages of Spice Diana, Carol Nantongo, Christine Nampeera and Lucy Smize."
  ],
  whatsapp: "256759729167",          // from her TikTok bio (+256759729167)
  whatsappDisplay: "+256 759 729 167",
  instagram: "https://www.instagram.com/ali_visualss/",
  tiktok: "https://www.tiktok.com/@ali_visualss",
  email: null,                        // not published anywhere — fill in to show it
  // Ali's own portrait. Leave null until she sends one; the About block works without it.
  portrait: null,                     // e.g. "media/ali-portrait.jpg"
  figuresCheckedOn: "15 October 2026",

  following: {
    instagram: { followers: "5,948", posts: "80" },
    tiktok: { followers: "1,694", likes: "25.6K", videos: "89", topPlays: "24.4K" },
    // Sum of the Instagram followers of the accounts that published her work (partnerFollowers below): 3.2M.
    collabReach: "3 million"
  },

  categories: [
    { id: "all", label: "All" },
    { id: "weddings", label: "Weddings", long: "Weddings and proposals", cover: "media/posters/stratbridal-wedding.jpg" },
    { id: "family", label: "Family", long: "Maternity and family", cover: "media/posters/lucy-smize-motherhood.jpg" },
    { id: "fashion", label: "Fashion & portraits", long: "Fashion, music and portraits", cover: "media/posters/spice-diana-finally.jpg" },
    { id: "bts", label: "Behind the scenes", long: "Behind the scenes", cover: "media/posters/valentine-bts.jpg" }
  ],

  // Shoot types offered in the booking form.
  shootTypes: ["Wedding", "Proposal", "Maternity", "Family", "Fashion or brand", "Music video", "Portraits", "Something else"],

  /*
    type: "film"    — plays here (silent; the reel's music is licensed to Instagram only)
          "photos"  — a swipeable set of stills
          "post"    — cover frame here, the film itself plays on Instagram
  */
  work: [
    {
      id: "spice-diana-finally", partner: "Spice Diana", partnerFollowers: "2M", type: "post", cat: "fashion", book: "Music video",
      title: "Finally", client: "Spice Diana", role: "Shot by Ali", date: "August 2026",
      poster: "media/posters/spice-diana-finally.jpg",
      source: "https://www.instagram.com/spice_diana/reel/Dbp8xizokpI/",
      credits: [["Shot by", "@ali_visualss"]]
    },
    {
      id: "fit2flaunt", partner: "Fit2Flaunt by Jaymiek", partnerFollowers: "3,492", type: "film", cat: "fashion", book: "Fashion or brand",
      title: "BTS vs result", client: "Fit2Flaunt by Jaymiek", role: "DOP, editor and colourist", date: "June 2026",
      poster: "media/posters/fit2flaunt.jpg", preview: "media/previews/fit2flaunt.mp4", film: "media/films/fit2flaunt.mp4",
      source: "https://www.instagram.com/ali_visualss/reel/DaFYNaHIwVV/",
      credits: [["DOP, editor, colourist", "@ali_visualss"], ["Activewear", "@fit2flaunt_by_jaymiek"], ["Models", "@lubega_jowy_joan, @iranzsharon"]]
    },
    {
      id: "lucy-smize-motherhood", partner: "Lucy Smize", partnerFollowers: "194K", type: "film", cat: "family", book: "Maternity",
      title: "Motherhood. A sacred unfolding.", client: "Lucy Smize", role: "Film", date: "May 2026",
      poster: "media/posters/lucy-smize-motherhood.jpg", preview: "media/previews/lucy-smize-motherhood.mp4", film: "media/films/lucy-smize-motherhood.mp4",
      source: "https://www.instagram.com/lucy_smize/reel/DYMgbP8sJFG/",
      credits: [["Film", "@ali_visualss"], ["Dress", "@berylqouture"], ["Make-up", "@imani_makeup_studio"], ["Hair", "@mbajja_sean"], ["Photos", "@samiezweddings"]]
    },
    {
      id: "stratbridal-wedding", partner: "Stratbridal", partnerFollowers: "31K", type: "film", cat: "weddings", book: "Wedding",
      title: "The start of forever", client: "Stratbridal", role: "Video", date: "January 2025",
      poster: "media/posters/stratbridal-wedding.jpg", preview: "media/previews/stratbridal-wedding.mp4", film: "media/films/stratbridal-wedding.mp4",
      source: "https://www.instagram.com/stratbridal/reel/DEaD3uxoMJ6/",
      credits: [["Video", "@ali_visualss"], ["Gown", "@stratbridal"], ["Suit", "@stylebyjuan"], ["Make-up", "@monafaces"], ["Hair", "@mbajja_sean"], ["Accessories", "@her_options__ug"], ["Location", "@lepetitvillagehotel"]]
    },
    {
      id: "colour-grading", type: "film", cat: "bts", book: "Music video",
      title: "From S-Log3 to final look", client: "Colour grading", role: "Shot on Sony A7 IV, graded by Ali", date: "August 2026",
      poster: "media/posters/colour-grading.jpg", preview: "media/previews/colour-grading.mp4", film: "media/films/colour-grading.mp4",
      source: "https://www.instagram.com/ali_visualss/reel/DcDvXgvobcw/",
      credits: []
    },
    {
      id: "carol-nantongo", partner: "Carol Nantongo", partnerFollowers: "491K", type: "post", cat: "family", book: "Maternity",
      title: "Officially promoted to Mom & Dad", client: "Carol Nantongo", role: "Collaboration post", date: "May 2026",
      poster: "media/posters/carol-nantongo.jpg",
      source: "https://www.instagram.com/carol_nantongo/reel/DYsMR0VIsqn/",
      credits: [["Dress", "@kais_divo_collection"]]
    },
    {
      id: "christine-nampeera", partner: "Christine Nampeera", partnerFollowers: "481K", type: "post", cat: "fashion", book: "Portraits",
      title: "Leading the Change: Women Shaping a Sustainable Future", client: "Christine Nampeera", role: "Videography", date: "March 2026",
      poster: "media/posters/christine-nampeera.jpg",
      source: "https://www.instagram.com/christine_nampeera__/reel/DVoQOr4DJxi/",
      credits: [["Videography", "@ali_visualss"], ["Wardrobe", "@ilona__creationsug"], ["Photography", "@daville_256"], ["Hair", "@mbajja_sean"], ["Make-up", "@sammytouch_ug"]]
    },
    {
      id: "birthday-portraits", type: "photos", cat: "fashion", book: "Portraits",
      title: "A different kind of birthday", client: "Birthday portraits", role: "Portraits", date: "May 2026",
      poster: "media/photos/portrait-series-3.jpg",
      photos: [1, 2, 3, 4, 5, 6, 7].map(n => "media/photos/portrait-series-" + n + ".jpg"),
      source: "https://www.instagram.com/ali_visualss/p/DYWUdozCHXm/",
      credits: []
    },
    {
      id: "maternity-vic-media", partner: "Vic Media Studios", partnerFollowers: "2,282", type: "post", cat: "family", book: "Maternity",
      title: "A beautiful family, a growing love", client: "Maternity", role: "Videography", date: "June 2026",
      poster: "media/posters/maternity-vic-media.jpg",
      source: "https://www.instagram.com/ali_visualss/reel/DZPv9CjIEF2/",
      credits: [["Videography", "@ali_visualss"], ["Studio", "@vic_media_studios_"], ["Dress", "@stw_ug"]]
    },
    {
      id: "proposal", type: "post", cat: "weddings", book: "Proposal",
      title: "A quiet “yes” that changed everything", client: "Proposal", role: "Film", date: "March 2026",
      poster: "media/posters/proposal.jpg",
      source: "https://www.instagram.com/ali_visualss/reel/DVWnE3RCOiq/",
      credits: [["Decor", "@affluent_events_"]]
    },
    {
      id: "mothers-day", type: "film", cat: "family", book: "Family",
      title: "Happy Mother’s Day", client: "Family", role: "Film", date: "May 2026",
      poster: "media/posters/mothers-day.jpg", preview: "media/previews/mothers-day.mp4", film: "media/films/mothers-day.mp4",
      source: "https://www.instagram.com/ali_visualss/reel/DYJpG22Ime4/",
      credits: []
    },
    {
      id: "valentine-bts", type: "film", cat: "bts", book: "Portraits",
      title: "The process behind the final look", client: "Valentine shoot", role: "Behind the scenes", date: "March 2026",
      poster: "media/posters/valentine-bts.jpg", preview: "media/previews/valentine-bts.mp4", film: "media/films/valentine-bts.mp4",
      source: "https://www.instagram.com/ali_visualss/reel/DVttXJKCJ2F/",
      credits: []
    }
  ]
};
