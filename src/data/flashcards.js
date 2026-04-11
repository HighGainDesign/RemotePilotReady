const flashcards = [
  // === REGULATIONS ===
  {
    id: 1,
    category: "Regulations",
    question: "What is the maximum allowable altitude for sUAS operations under Part 107?",
    answer: "400 feet AGL (above ground level), or higher if within 400 feet of a structure.",
    reference: "14 CFR § 107.51(b)"
  },
  {
    id: 2,
    category: "Regulations",
    question: "What is the maximum groundspeed allowed for a small UAS under Part 107?",
    answer: "100 mph (87 knots).",
    reference: "14 CFR § 107.51(a)"
  },
  {
    id: 3,
    category: "Regulations",
    question: "What is the maximum takeoff weight for a small UAS under Part 107?",
    answer: "55 pounds (including everything onboard or attached at the time of takeoff).",
    reference: "14 CFR § 107.3"
  },
  {
    id: 4,
    category: "Regulations",
    question: "How old must a remote pilot in command be to operate under Part 107?",
    answer: "At least 16 years old.",
    reference: "14 CFR § 107.61(a)"
  },
  {
    id: 5,
    category: "Regulations",
    question: "How often must a remote pilot complete recurrent training or testing?",
    answer: "Every 24 calendar months.",
    reference: "14 CFR § 107.65"
  },
  {
    id: 6,
    category: "Regulations",
    question: "Can you fly a drone over people who are not directly participating in the operation under basic Part 107?",
    answer: "No, unless operating under one of the Category 1–4 classifications for operations over people (added in the 2021 rule update).",
    reference: "14 CFR § 107.39"
  },
  {
    id: 7,
    category: "Regulations",
    question: "What must a remote pilot do before operating in controlled airspace (Class B, C, D, or surface area of Class E)?",
    answer: "Obtain airspace authorization from the FAA, typically through LAANC or DroneZone.",
    reference: "14 CFR § 107.41"
  },
  {
    id: 8,
    category: "Regulations",
    question: "Is a remote pilot certificate required to fly a drone recreationally?",
    answer: "No. Recreational flyers operate under 49 USC § 44809 (the Exception for Limited Recreational Operations). However, they must pass The Recreational UAS Safety Test (TRUST).",
    reference: "49 USC § 44809"
  },
  {
    id: 9,
    category: "Regulations",
    question: "What are the visibility minimums for Part 107 operations?",
    answer: "3 statute miles from the control station.",
    reference: "14 CFR § 107.51(c)"
  },
  {
    id: 10,
    category: "Regulations",
    question: "When is night flight permitted under Part 107?",
    answer: "Night flight is permitted if the drone has anti-collision lighting visible for 3 statute miles and the remote pilot has completed updated initial or recurrent training.",
    reference: "14 CFR § 107.29"
  },

  // === AIRSPACE ===
  {
    id: 11,
    category: "Airspace",
    question: "What class of airspace surrounds the busiest airports (e.g., major international airports)?",
    answer: "Class B airspace. Shaped like an inverted wedding cake, extending from the surface up to typically 10,000 feet MSL.",
    reference: "AIM 3-2-3"
  },
  {
    id: 12,
    category: "Airspace",
    question: "In what airspace classes can a Part 107 pilot fly WITHOUT prior authorization?",
    answer: "Class G (uncontrolled airspace) and Class E airspace that does not extend to the surface.",
    reference: "14 CFR § 107.41"
  },
  {
    id: 13,
    category: "Airspace",
    question: "What is a TFR and how does it affect drone operations?",
    answer: "A Temporary Flight Restriction. UAS operations are prohibited within a TFR unless specifically authorized by the issuing authority. TFRs may be issued for presidential movement, sporting events, wildfires, etc.",
    reference: "14 CFR § 91.137–91.145"
  },
  {
    id: 14,
    category: "Airspace",
    question: "What does a dashed magenta line on a sectional chart indicate?",
    answer: "Class E airspace with a floor of 700 feet AGL.",
    reference: "FAA Sectional Chart Legend"
  },
  {
    id: 15,
    category: "Airspace",
    question: "What is LAANC?",
    answer: "Low Altitude Authorization and Notification Capability — an automated system that provides near-real-time airspace authorization for Part 107 operations in controlled airspace.",
    reference: "FAA LAANC Program"
  },
  {
    id: 16,
    category: "Airspace",
    question: "What are NOTAMs and why should drone pilots check them?",
    answer: "Notices to Air Missions. They contain time-critical aeronautical information including TFRs, airspace closures, and hazards that may affect drone operations.",
    reference: "14 CFR § 107.49(a)"
  },

  // === WEATHER ===
  {
    id: 17,
    category: "Weather",
    question: "What is the minimum cloud clearance requirement under Part 107?",
    answer: "500 feet below clouds and 2,000 feet horizontally from clouds.",
    reference: "14 CFR § 107.51(d)"
  },
  {
    id: 18,
    category: "Weather",
    question: "What does METAR stand for?",
    answer: "Meteorological Aerodrome Report — a standardized format for reporting weather observations at airports.",
    reference: "AIM 7-1-30"
  },
  {
    id: 19,
    category: "Weather",
    question: "What type of weather front typically produces the most severe weather including thunderstorms, heavy rain, and turbulence?",
    answer: "A cold front, especially a fast-moving cold front.",
    reference: "FAA PHAK Chapter 12"
  },
  {
    id: 20,
    category: "Weather",
    question: "What is density altitude and why does it matter for drone operations?",
    answer: "Density altitude is pressure altitude corrected for non-standard temperature. Higher density altitude reduces aircraft/drone performance because the air is less dense.",
    reference: "FAA PHAK Chapter 4"
  },
  {
    id: 21,
    category: "Weather",
    question: "What does a TAF provide that a METAR does not?",
    answer: "A TAF (Terminal Aerodrome Forecast) provides a forecast of expected weather conditions, while a METAR reports current/observed conditions.",
    reference: "AIM 7-1-31"
  },
  {
    id: 22,
    category: "Weather",
    question: "What is a microburst and why is it dangerous?",
    answer: "A microburst is a localized, intense downdraft that spreads outward on contact with the ground, producing sudden wind shear. It can cause loss of control of a drone.",
    reference: "AIM 7-1-24"
  },

  // === OPERATIONS ===
  {
    id: 23,
    category: "Operations",
    question: "What does VLOS mean and is it required under Part 107?",
    answer: "Visual Line of Sight. Yes, the remote PIC (or visual observer) must maintain unaided visual contact with the drone at all times during flight.",
    reference: "14 CFR § 107.31"
  },
  {
    id: 24,
    category: "Operations",
    question: "Can a single remote pilot operate multiple drones simultaneously under Part 107?",
    answer: "No. A person may not act as remote PIC or VO for more than one UA operation at a time.",
    reference: "14 CFR § 107.35"
  },
  {
    id: 25,
    category: "Operations",
    question: "What must a remote pilot do if there is an accident involving serious injury, loss of consciousness, or property damage exceeding $500?",
    answer: "Report the accident to the FAA within 10 calendar days.",
    reference: "14 CFR § 107.9"
  },
  {
    id: 26,
    category: "Operations",
    question: "Who has the right of way when a drone and a manned aircraft are converging?",
    answer: "The manned aircraft ALWAYS has the right of way. The remote pilot must yield and avoid.",
    reference: "14 CFR § 107.37(a)"
  },
  {
    id: 27,
    category: "Operations",
    question: "Can you fly a drone from a moving vehicle under Part 107?",
    answer: "Yes, but only over sparsely populated areas and the drone must not be flown over anyone not directly participating in the operation.",
    reference: "14 CFR § 107.25"
  },
  {
    id: 28,
    category: "Operations",
    question: "What preflight actions is the remote PIC required to perform?",
    answer: "Assess the operating environment (weather, airspace, flight restrictions, location of persons/property), ensure the drone is safe to operate, and check that the control link is adequate.",
    reference: "14 CFR § 107.49"
  },

  // === CREW ROLES ===
  {
    id: 29,
    category: "Crew Roles",
    question: "What is the role of a Visual Observer (VO)?",
    answer: "The VO assists the remote PIC by watching the airspace for hazards and maintaining visual contact with the drone. The VO must communicate drone position and hazards to the PIC.",
    reference: "14 CFR § 107.33"
  },
  {
    id: 30,
    category: "Crew Roles",
    question: "Is a Visual Observer required under Part 107?",
    answer: "No, a VO is not required. However, if a VO is not used, the remote PIC must maintain VLOS with the drone at all times.",
    reference: "14 CFR § 107.33"
  },
  {
    id: 31,
    category: "Crew Roles",
    question: "Does a Visual Observer need a remote pilot certificate?",
    answer: "No. The VO does not need a remote pilot certificate, but must be briefed by the remote PIC on the operation and communication procedures.",
    reference: "14 CFR § 107.33"
  },
  {
    id: 32,
    category: "Crew Roles",
    question: "Can the remote PIC transfer control of the drone to another person?",
    answer: "Yes, but only to another person who holds a valid remote pilot certificate. The transfer must not compromise the safety of the operation.",
    reference: "14 CFR § 107.19"
  },
  {
    id: 33,
    category: "Crew Roles",
    question: "Who is responsible for ensuring the drone operation complies with all applicable regulations?",
    answer: "The Remote Pilot in Command (Remote PIC) is directly responsible for and is the final authority for the safe operation of the small UAS.",
    reference: "14 CFR § 107.19"
  },
  {
    id: 34,
    category: "Crew Roles",
    question: "What is the role of a person manipulating the controls if they are not the Remote PIC?",
    answer: "They are a 'person manipulating the controls' and must operate under the direct supervision of the Remote PIC, who retains responsibility for the flight.",
    reference: "14 CFR § 107.19"
  },

  // === ADDITIONAL REGULATIONS ===
  {
    id: 35,
    category: "Regulations",
    question: "What is Remote ID and when is it required?",
    answer: "Remote ID is a broadcast identification system for drones. Standard Remote ID or a Remote ID broadcast module is required for most Part 107 operations (compliance required as of March 16, 2024).",
    reference: "14 CFR Part 89"
  },
  {
    id: 36,
    category: "Operations",
    question: "What blood alcohol content (BAC) level prohibits a person from operating a drone?",
    answer: "0.04% BAC. Also, no operation within 8 hours of consuming any alcoholic beverage ('8 hours bottle to throttle') or while under the influence of any substance that affects faculties.",
    reference: "14 CFR § 107.27"
  }
];

export const categories = ["All", "Regulations", "Airspace", "Weather", "Operations", "Crew Roles"];

export default flashcards;
