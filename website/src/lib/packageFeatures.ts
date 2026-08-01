export function getPackageFeaturesByCategory(
  category: string | undefined,
  tier: "basic" | "professional" | "premium" | "custom",
  hours: number = 1
): string[] {
  const cat = category || "photographer";

  switch (cat) {
    case "videographer":
      if (tier === "basic") {
        return ["1 Hour Video Recording", "Full HD 1080p Event Video", "Highlight Video Reel", "3 Days Delivery"];
      }
      if (tier === "professional") {
        return ["2 Hours Video Recording", "4K Ultra HD Video Film", "Color Graded Highlight Cut", "2 Days Fast Delivery"];
      }
      if (tier === "premium") {
        return ["3 Hours Full Coverage", "Cinematic Multi-Angle Edit", "Raw Footage Access", "Same-Week Delivery"];
      }
      return [`${hours} Hours Video Recording`, "Custom Video Length", "4K Render & Edits", "Direct Coordination"];

    case "singer":
      if (tier === "basic") {
        return ["1 Hour Live Vocal Performance", "Acoustic / Stage Setup", "Custom Song Setlist", "Vocal Mic & PA System"];
      }
      if (tier === "professional") {
        return ["2 Hours Stage Performance", "Dual Musician / Band Duo", "Interactive Audience Songs", "Pro Sound Gear Included"];
      }
      if (tier === "premium") {
        return ["3 Hours Full Concert Set", "Full Band Stage Performance", "Custom Requested Songs", "Pro Audio Crew Included"];
      }
      return [`${hours} Hours Live Show`, "Custom Performance Set", "Sound Gear Setup", "Direct Coordination"];

    case "Cinematic":
      if (tier === "basic") {
        return ["1 Hour 4K Cinema Capture", "Aerial Drone Shots Included", "Movie-Grade Color Grading", "3 Days Fast Delivery"];
      }
      if (tier === "professional") {
        return ["2 Hours Cinema Coverage", "4K Drone + Multi-Cam Shoot", "Teaser Reel & Film Cut", "2 Days Fast Delivery"];
      }
      if (tier === "premium") {
        return ["3 Hours Full Feature Shoot", "Full Cinema Production Team", "Feature Length Master Cut", "Same-Week Delivery"];
      }
      return [`${hours} Hours Cinema Capture`, "Custom Aerial & Camera Plan", "Master Color Grading", "Direct Coordination"];

    case "choreographer":
      if (tier === "basic") {
        return ["1 Hour Dance Rehearsal", "Custom Song Choreography", "Group & Couple Step Tutorial", "Recorded Practice Video"];
      }
      if (tier === "professional") {
        return ["2 Hours Dance Training", "Sangeet & Couple Routines", "Custom Audio Song Mixing", "Step-by-Step Video Guide"];
      }
      if (tier === "premium") {
        return ["3 Hours Masterclass & Shoot", "Full Family Sangeet Routine", "On-Stage Dress Rehearsal", "Final Performance Cut"];
      }
      return [`${hours} Hours Rehearsal Time`, "Custom Event Choreography", "Audio Track Edit", "Direct Coordination"];

    case "podcast":
      if (tier === "basic") {
        return ["1 Hour Studio Recording", "4K Multi-Camera Setup", "Rodecaster Audio Stems", "Raw 4K Video Files"];
      }
      if (tier === "professional") {
        return ["2 Hours Studio Recording", "Multi-Mic & Teleprompter", "Edited Show Cut & Reels", "Fast 2-Day Delivery"];
      }
      if (tier === "premium") {
        return ["3 Hours Full Recording", "Pro Sound Engineer Included", "Full Episode Master + Clips", "Same-Week Express Delivery"];
      }
      return [`${hours} Hours Studio Time`, "Multi-Mic & 4K Recording", "Full Audio/Video Stems", "Direct Coordination"];

    case "photographer":
    default:
      if (tier === "basic") {
        return ["1 Hour Photo Shoot", "25 Color Graded Photos", "Digital High-Res Gallery", "3 Days Delivery"];
      }
      if (tier === "professional") {
        return ["2 Hours Photo Shoot", "60 Color Graded Photos", "Highlight Portrait Reel", "2 Days Fast Delivery"];
      }
      if (tier === "premium") {
        return ["3 Hours Full Shoot", "100+ Premium Edits", "Cinematic Teaser & Album", "Same-Week Delivery"];
      }
      return [`${hours} Hours Coverage`, "Tailored Photo Edits", "Digital High-Res Gallery", "Direct Coordination"];
  }
}
