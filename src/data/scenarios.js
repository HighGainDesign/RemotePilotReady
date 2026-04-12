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
  }
];

export function getQuestionIds() {
  return scenarios.map(s => `scenarios_${s.id}`)
}

export default scenarios;
