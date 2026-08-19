export const siteConfig = {
  recipientName: "Alizzay",
  nickname: "Shashiiii",
  senderName: "Zeus",
  friendshipStartDate: "August 2, 2026",
  birthday: "September 10, 2026",
  daysSince: 39, // From Aug 2 to Sep 10

  // Theme colors - Navy blue, maroon, teal, beige, rose gold, lavender and plum
  colors: {
    background: "#0f172a", // Navy blue
    primary: "#b76e79",    // Rose gold
    secondary: "#0d9488",  // Teal
    accent: "#dda0dd",     // Plum/Lavender
    text: "#f5f5dc",       // Beige
    textMuted: "#e6e6fa",  // Lavender
    maroon: "#800000"      // Maroon
  },

  // Mascot Images
  mascot: {
    curious: "/mascot_curious.png",
    happy: "/mascot_happy.png",
    confused: "/mascot_confused.png",
    gamer: "/mascot_gamer.png",
    soft: "/mascot_soft.png",
  },

  // Audio files (place your files in the public/audio folder and update these paths)
  audio: {
    backgroundMusic: "/audio/kochiyan-live.mp3", // Make sure this exists in public/audio
    soundEffects: {
      openGift: "/audio/open-gift.mp3",
      cakeFound: "/audio/cake-found.mp3",
      buttonClick: "/audio/button-click.mp3",
      fireworks: "/audio/fireworks.mp3",
    },
  },

  // Story Chat Messages for Scene 3
  storyMessages: [
    { sender: "Zeus", text: "Hey! 👋", delay: 800 },
    { sender: "Shashiiii", text: "Who are you?", delay: 1800 },
    { sender: "Zeus", text: "Just a random person on the internet. 🤷‍♂️", delay: 3000 },
    { sender: "Shashiiii", text: "Sus 🤨", delay: 4200 },
    { sender: "Zeus", text: "Wait, give it a few weeks...", delay: 5500 },
    { sender: "Shashiiii", text: "And then?", delay: 6800 },
    { sender: "Zeus", text: "We become besties. 😂", delay: 8000 },
  ],

  // Personal Letter
  letter: [
    "Dear Shashiiii, ❤️",
    "I know we've only been friends since August 2nd, but honestly, it's crazy how quickly you've become one of my besties.",
    "You're genuinely one of those special friends that I'll always want to see happy.",
    "Even though we've only known each other for a short time, I really hope our friendship lasts for a long, long time.",
    "And please, always remember one thing:",
    "Never trust strangers too easily. 😭",
    "Take care of yourself, stay safe, and always be careful about who you let into your life.",
    "I genuinely pray that you stay happy, that good things find you, and that you always have reasons to smile.",
    "I'm really glad I met you, Shashiiii. 🫶",
    "Happy Birthday! 🎂🎉",
    "— Zeus",
  ],

  // Final Scene Text
  finalScene: {
    part1: "Some people take years to become important.",
    part2: "Somehow, you managed it in 39 days.",
    part3: "SHASHIIII ❤️",
    part4: "HAPPY BIRTHDAY 🎂",
    part5: [
      "Stay happy.",
      "Stay safe.",
      "And don't trust random strangers. 😭",
    ],
    signoff: "— Zeus",
  }
};
