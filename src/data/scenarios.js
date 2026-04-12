const scenarios = [
  {
    id: 1,
    title: "Downtown Real Estate Shoot",
    situation: "A real estate company hires you to photograph a high-rise building in a downtown area. The building is in Class G airspace, 6 miles from the nearest airport. It's 2:00 PM, visibility is 5 SM, and there are scattered clouds at 3,000 ft. Pedestrians are walking on sidewalks below.",
    question: "Can you legally fly this mission?",
    options: [
      "Yes, no restrictions apply",
      "Yes, but you must comply with Operations Over People rules",
      "No, you cannot fly over people under any circumstances",
      "No, you need a waiver for urban areas"
    ],
    correctIndex: 1,
    categories: ["Operations", "Regulations"],
    explanation: "This flight is in Class G airspace with adequate visibility and cloud clearance, so no airspace authorization is needed. However, since pedestrians are below, you must comply with the Operations Over People rules (14 CFR § 107.39). Your drone must meet Category 1, 2, 3, or 4 requirements, or you must ensure no person who is not directly participating in the operation is beneath the drone.",
    references: ["14 CFR § 107.39", "14 CFR § 107.51"]
  },
  {
    id: 2,
    title: "Sunset Beach Mapping",
    situation: "You're hired to create an aerial map of a beach restoration project. The location is in Class G airspace, away from any airports. It's 7:45 PM and civil twilight ends at 7:30 PM. Visibility is 4 SM. Your drone has anti-collision lights visible for 3 statute miles.",
    question: "Can you fly this mission?",
    options: [
      "No, it's after civil twilight so no flying is allowed",
      "Yes, anti-collision lights visible for 3 SM allow night operations",
      "Yes, Part 107 has no time-of-day restrictions",
      "No, you need a separate night waiver in addition to lights"
    ],
    correctIndex: 1,
    categories: ["Operations", "Regulations"],
    explanation: "Since the 2021 rule update, night operations are permitted under Part 107 without a waiver, provided the drone is equipped with anti-collision lighting visible for at least 3 statute miles and the remote pilot has completed updated initial or recurrent training that covers night operations.",
    references: ["14 CFR § 107.29", "14 CFR § 107.65"]
  },
  {
    id: 3,
    title: "Airport Inspection Job",
    situation: "An airport authority wants you to inspect a taxiway at a towered airport. The airport has Class D airspace from the surface to 2,500 ft MSL. They have given you written permission to be on airport property. Visibility is 10 SM, clear skies.",
    question: "What authorization do you need?",
    options: [
      "Just the airport's written permission is sufficient",
      "FAA airspace authorization via LAANC or DroneZone, plus coordination with ATC",
      "A Part 107 waiver for airport operations",
      "No authorization needed since the airport invited you"
    ],
    correctIndex: 1,
    categories: ["Airspace", "Regulations"],
    explanation: "The airport's permission allows you on their property, but Class D airspace authorization requires FAA approval. You must obtain airspace authorization through LAANC or the FAA DroneZone and coordinate with the airport's air traffic control. The airport's permission alone is not sufficient for the airspace.",
    references: ["14 CFR § 107.41", "FAA LAANC"]
  },
  {
    id: 4,
    title: "Foggy Morning Construction Site",
    situation: "A construction company wants you to survey their site first thing in the morning. It's 6:30 AM, still within civil twilight. Surface visibility is 2 SM due to fog. The site is in uncontrolled (Class G) airspace. Cloud ceiling is 800 feet.",
    question: "Can you fly this mission?",
    options: [
      "Yes, Class G has no weather minimums",
      "No, visibility is below the 3 SM minimum",
      "Yes, as long as you stay below the clouds",
      "No, because it's during civil twilight"
    ],
    correctIndex: 1,
    categories: ["Weather", "Operations"],
    explanation: "Part 107 requires a minimum visibility of 3 statute miles from the control station. At 2 SM visibility, this flight is not legal regardless of the airspace class. The pilot should wait for conditions to improve. Note that civil twilight operations are permitted with proper anti-collision lighting.",
    references: ["14 CFR § 107.51(c)", "14 CFR § 107.29"]
  },
  {
    id: 5,
    title: "Emergency Response Support",
    situation: "A local fire department asks you to fly your drone to help locate a missing person in a state park. The park is in Class G airspace. It's daytime with good visibility. However, a TFR has been issued over the area for the search and rescue operation.",
    question: "Can you fly to assist?",
    options: [
      "Yes, emergency situations override all restrictions",
      "Yes, but only if the incident commander authorizes your operation within the TFR",
      "No, all drone flights are prohibited in a TFR",
      "Yes, Part 107 pilots are automatically authorized for emergency support"
    ],
    correctIndex: 1,
    categories: ["Regulations", "Airspace"],
    explanation: "A TFR restricts flight operations in the area. However, you may operate within a TFR if you are authorized by the agency that requested the TFR (in this case, through the incident commander or Air Boss). You cannot self-authorize. Having a Part 107 certificate alone does not grant access to a TFR.",
    references: ["14 CFR § 91.137", "14 CFR § 107.47"]
  },
  {
    id: 6,
    title: "Rooftop Inspection at 500 ft Structure",
    situation: "You're hired to inspect the roof of a 500-foot radio tower. You plan to fly within 400 feet of the structure. The tower is in Class G airspace, 15 miles from any airport. Visibility is 6 SM, clear skies.",
    question: "What is the maximum altitude you can fly?",
    options: [
      "400 feet AGL, no exceptions",
      "500 feet AGL since that's the top of the structure",
      "Up to 900 feet AGL (400 feet above the 500-foot structure), as long as you stay within 400 feet of the structure",
      "No altitude limit when inspecting structures"
    ],
    correctIndex: 2,
    categories: ["Operations", "Performance"],
    explanation: "Under Part 107, you may fly higher than 400 feet AGL if you remain within a 400-foot radius of a structure. In this case, you could legally fly up to 900 feet AGL (the top of the 500-foot structure plus 400 feet), as long as you remain within 400 feet laterally of the tower.",
    references: ["14 CFR § 107.51(b)"]
  },
  {
    id: 7,
    title: "Multi-Drone Crop Survey",
    situation: "A farm owner wants you to survey 200 acres quickly by flying two drones simultaneously. You are the only certified remote pilot on site but have an experienced assistant. The farm is in Class G airspace, miles from any airport.",
    question: "Is this operation legal?",
    options: [
      "Yes, you can fly two drones if you have an assistant",
      "Yes, Part 107 allows multiple drones for agricultural use",
      "No, one pilot cannot operate more than one drone at a time without a waiver",
      "Yes, as long as both drones stay within VLOS"
    ],
    correctIndex: 2,
    categories: ["Regulations", "Crew Roles"],
    explanation: "Under Part 107, a person may not act as remote PIC or VO for more than one unmanned aircraft operation at a time. To fly two drones simultaneously, you would need a waiver (14 CFR § 107.35) or a second certified remote pilot to act as PIC for the second drone.",
    references: ["14 CFR § 107.35"]
  },
  {
    id: 8,
    title: "Football Game Flyover",
    situation: "A sports network wants aerial footage of a college football game with 35,000 fans. The stadium is in Class G airspace. It's a clear Saturday afternoon. The network offers to triple your rate.",
    question: "Can you fly this mission?",
    options: [
      "Yes, Class G airspace means no restrictions",
      "No, stadiums with 30,000+ people have a TFR during events",
      "Yes, if your drone meets Category 4 for operations over people",
      "Yes, with a standard Part 107 waiver"
    ],
    correctIndex: 1,
    categories: ["Airspace", "Regulations"],
    explanation: "The FAA issues a TFR (Temporary Flight Restriction) over stadiums and major sporting events with 30,000 or more people. This TFR extends 3 nautical miles around and up to 3,000 feet AGL above the venue, beginning one hour before and ending one hour after the event. No Part 107 waiver can override a TFR of this type.",
    references: ["14 CFR § 91.145", "NOTAMs/TFR"]
  },
  {
    id: 9,
    title: "Delivery Across a Highway",
    situation: "A company wants you to deliver a small package (2 lbs) from their warehouse to a facility across a busy highway. The flight path would cross over moving vehicles on the highway. Both locations are in Class G airspace. Clear day, good visibility.",
    question: "Is this delivery flight legal under standard Part 107?",
    options: [
      "Yes, there are no restrictions on crossing highways",
      "No, flying over moving vehicles requires a waiver or Operations Over People category compliance",
      "Yes, as long as the drone weighs under 55 lbs",
      "No, Part 107 prohibits all package delivery"
    ],
    correctIndex: 1,
    categories: ["Operations", "Regulations"],
    explanation: "Part 107 prohibits sustained flight over moving vehicles with people inside unless operating under Category 3 or 4 of the Operations Over People rules (which have specific requirements for the drone) or a waiver. Transiting over moving vehicles on a highway with the drone carrying a payload requires compliance with these rules.",
    references: ["14 CFR § 107.39", "14 CFR § 107.110–107.140"]
  },
  {
    id: 10,
    title: "Post-Accident Responsibilities",
    situation: "During a commercial roof inspection, your drone malfunctions and crashes into a parked car, causing approximately $600 in damage. No one is injured. You recover the drone and the property owner says they won't press charges.",
    question: "What is your reporting obligation?",
    options: [
      "No reporting required since no one was hurt and the owner isn't pressing charges",
      "File a police report within 24 hours",
      "Report to the FAA within 10 calendar days since property damage exceeds $500",
      "Report to the NTSB immediately"
    ],
    correctIndex: 2,
    categories: ["Regulations", "Operations"],
    explanation: "Under Part 107, the remote PIC must report any operation that results in serious injury, loss of consciousness, or property damage (other than to the drone) of $500 or more to the FAA within 10 calendar days. The property owner's willingness to press charges is irrelevant to your FAA reporting obligation.",
    references: ["14 CFR § 107.9"]
  },
  {
    id: 11,
    title: "Night Lighting Check",
    situation: "You are planning an evening real estate shoot. Civil twilight ends at 8:15 PM and you intend to fly at 8:30 PM. Your drone has a built-in LED status light visible from about 1 mile away. You have completed FAA-approved Part 107 recurrent training that includes night operations.",
    question: "Can you legally conduct this night operation?",
    options: [
      "Yes, any lighting on the drone satisfies the night operations requirement",
      "Yes, because you completed recurrent training that covers night operations",
      "No, because your anti-collision light is only visible for 1 mile, not the required 3 statute miles",
      "No, night operations always require a waiver regardless of lighting"
    ],
    correctIndex: 2,
    categories: ["Operations", "Regulations"],
    explanation: "Part 107 permits night operations without a waiver, but the drone must be equipped with anti-collision lighting visible for at least 3 statute miles. A status light visible for only 1 mile does not meet this requirement. You would need to add supplemental anti-collision lighting that meets the 3 SM visibility threshold before flying after civil twilight.",
    references: ["14 CFR § 107.29(b)"]
  },
  {
    id: 12,
    title: "Operations Over People — Category Classification",
    situation: "A marketing company wants you to fly your drone directly over a crowd of spectators at an outdoor festival. Your drone weighs 0.45 lbs (204 grams) with no exposed rotating parts that could lacerate skin. The drone has no FAA-accepted means of compliance declaration on file.",
    question: "Under the Operations Over People rules, which category applies and what is required?",
    options: [
      "Category 1 — no additional requirements since the drone weighs under 0.55 lbs with no laceration risk",
      "Category 2 — you must have an FAA-accepted declaration of compliance",
      "Category 3 — you must restrict access below the flight path",
      "No category applies; operations over crowds are always prohibited"
    ],
    correctIndex: 0,
    categories: ["Regulations", "Operations"],
    explanation: "Category 1 operations allow flight over people with no additional requirements as long as the drone weighs 0.55 lbs (250 grams) or less and does not have any exposed rotating parts that could lacerate human skin. At 0.45 lbs with no laceration hazard, this drone qualifies for Category 1. No declaration of compliance or waiver is needed.",
    references: ["14 CFR § 107.110", "14 CFR § 107.115"]
  },
  {
    id: 13,
    title: "Remote ID Compliance",
    situation: "You are flying a commercial inspection mission with a drone manufactured in 2022. A law enforcement officer on the ground asks you to demonstrate Remote ID compliance. Your drone does not have built-in Remote ID and you did not bring a Remote ID broadcast module.",
    question: "Are you in compliance with Remote ID requirements?",
    options: [
      "Yes, Remote ID is only required for recreational flyers",
      "Yes, Remote ID only applies within 5 miles of an airport",
      "No, drones manufactured after the compliance date must broadcast Remote ID or use a broadcast module; flying without either is a violation",
      "No, but you can comply by flying only in FAA-recognized identification areas (FRIAs)"
    ],
    correctIndex: 2,
    categories: ["Regulations"],
    explanation: "The FAA Remote ID rule requires that all drones flown under Part 107 either have built-in Remote ID capability, use a Remote ID broadcast module, or operate exclusively within an FAA-recognized identification area (FRIA). Flying a standard Part 107 commercial mission without Remote ID capability is a violation. You could use a broadcast module as an add-on, or fly only within a FRIA if your drone lacks built-in Remote ID.",
    references: ["14 CFR § 89.110", "14 CFR § 89.115", "14 CFR § 89.120"]
  },
  {
    id: 14,
    title: "Density Altitude and Drone Performance",
    situation: "You are hired to photograph a mountain resort in Colorado. The resort is at 8,500 feet MSL. The current temperature is 95°F (35°C). Standard temperature at sea level is 59°F (15°C), with a lapse rate of approximately 3.5°F per 1,000 feet.",
    question: "What is the approximate density altitude, and how should it affect your flight planning?",
    options: [
      "Density altitude equals field elevation — no adjustment needed",
      "Density altitude is approximately 13,000 feet MSL; expect significantly reduced rotor efficiency, shorter battery life, and reduced payload capacity",
      "Density altitude is lower than field elevation because it's warm and dry",
      "Density altitude only matters for fixed-wing aircraft, not drones"
    ],
    correctIndex: 1,
    categories: ["Performance", "Weather"],
    explanation: "Density altitude is pressure altitude corrected for non-standard temperature. At 8,500 ft MSL, standard temperature (ISA) = 15°C − (2°C × 8.5) = 15 − 17 = −2°C. Actual temperature is 35°C, which is 37°C above standard. Density altitude ≈ 8,500 + (120 × 37) = 8,500 + 4,440 ≈ 12,940 ft, roughly 13,000 feet MSL. High density altitude means thinner air, which reduces rotor thrust, extends battery drain, and lowers maximum payload. Plan for shorter flight times and potentially multiple batteries.",
    references: ["FAA-H-8083-25 Pilot's Handbook of Aeronautical Knowledge Ch. 4"]
  },
  {
    id: 15,
    title: "Visual Observer Coordination",
    situation: "You are conducting a linear infrastructure inspection (a pipeline) with a Visual Observer (VO). The VO radios you that the drone is approaching a bird flock on the right side and suggests you bank left immediately. At the same moment, you notice a manned helicopter in your area on the left.",
    question: "What is the correct crew coordination action?",
    options: [
      "Always follow the VO's instructions immediately since that is their job",
      "Ignore the VO and climb to avoid the helicopter",
      "Communicate the helicopter conflict to the VO, retain final authority as remote PIC, and maneuver to avoid both hazards safely",
      "Land immediately since there are two simultaneous hazards"
    ],
    correctIndex: 2,
    categories: ["Crew Roles", "Operations"],
    explanation: "The remote PIC retains final authority over the flight at all times — the VO assists but does not command. The correct action is to communicate the helicopter conflict to the VO, share situational awareness, and make a coordinated decision. The remote PIC has the ultimate responsibility for safety of flight and must give way to manned aircraft under all circumstances.",
    references: ["14 CFR § 107.33", "14 CFR § 107.37(a)"]
  },
  {
    id: 16,
    title: "LAANC Authorization in Class C Airspace",
    situation: "You need to fly a drone at 200 feet AGL for a construction survey near a regional airport with Class C airspace. The FAA UAS Facility Map shows a 200-foot ceiling authorization grid for your location. You submit a LAANC request through an authorized app.",
    question: "If your LAANC request is automatically approved, what does this allow?",
    options: [
      "LAANC approval is only advisory — you still need to call the tower for permission",
      "Automatic LAANC approval grants you real-time authorization to fly at or below the approved ceiling in that grid square without further ATC contact",
      "LAANC approval allows flight in any airspace class up to 400 feet AGL",
      "You must still file a flight plan with the FAA before flying"
    ],
    correctIndex: 1,
    categories: ["Airspace", "Regulations"],
    explanation: "LAANC (Low Altitude Authorization and Notification Capability) provides real-time airspace authorization for drone operations in controlled airspace. An automatic approval for your grid square at or below the UAS Facility Map ceiling grants immediate authorization to fly without additional ATC contact. This satisfies the 14 CFR § 107.41 requirement for operating in controlled airspace.",
    references: ["14 CFR § 107.41", "FAA LAANC Program"]
  },
  {
    id: 17,
    title: "Physiological Impairment — Fatigue and Medication",
    situation: "You have a commercial drone shoot scheduled for 8:00 AM. The previous night you slept only 3 hours due to a personal emergency. You also took an over-the-counter antihistamine (diphenhydramine/Benadryl) before bed for allergy symptoms.",
    question: "What should you do regarding the scheduled flight?",
    options: [
      "Fly as planned — over-the-counter medications are not regulated under Part 107",
      "Fly but limit the mission to under 30 minutes to reduce fatigue risk",
      "Do not fly — both fatigue and diphenhydramine can impair judgment and reaction time, violating the prohibition on flying while impaired",
      "Fly only if you have a Visual Observer present to compensate for your impairment"
    ],
    correctIndex: 2,
    categories: ["Physiology", "Regulations"],
    explanation: "Part 107 prohibits acting as remote PIC while impaired by any physical or mental condition that could interfere with safe operations. Diphenhydramine (Benadryl) is a sedating antihistamine known to cause drowsiness and impaired reaction time — the FAA considers it impairing. Combined with severe fatigue from only 3 hours of sleep, flying would be unsafe and unlawful. The responsible and legal action is to postpone the flight until you are rested and the medication has cleared your system.",
    references: ["14 CFR § 107.17", "FAA AM-400-10/1 (Medications and Flying)"]
  }
];

export function getQuestionIds() {
  return scenarios.map(s => `scenarios_${s.id}`)
}

export default scenarios;
