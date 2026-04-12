const flashcards = [
  // === REGULATIONS (20) ===
  {
    id: 1,
    category: "Regulations",
    question: "What is the maximum allowable altitude for sUAS operations under Part 107?",
    options: [
      "200 feet AGL",
      "400 feet AGL, or higher if within 400 feet of a structure",
      "500 feet AGL",
      "400 feet MSL"
    ],
    correctIndex: 1,
    explanation: "Part 107 limits sUAS operations to 400 feet AGL. The exception allows flight above 400 feet if the drone remains within 400 feet of a structure and does not fly higher than 400 feet above the structure's immediate uppermost limit.",
    reference: "14 CFR § 107.51(b)"
  },
  {
    id: 2,
    category: "Regulations",
    question: "What is the maximum groundspeed allowed for a small UAS under Part 107?",
    options: [
      "87 knots (100 mph)",
      "60 knots (69 mph)",
      "120 knots (138 mph)",
      "100 knots (115 mph)"
    ],
    correctIndex: 0,
    explanation: "The maximum groundspeed for sUAS under Part 107 is 87 knots (100 mph). This limit helps ensure safe operations and adequate reaction time for the remote pilot.",
    reference: "14 CFR § 107.51(a)"
  },
  {
    id: 3,
    category: "Regulations",
    question: "What is the maximum takeoff weight for a small UAS under Part 107?",
    options: [
      "25 pounds",
      "44 pounds",
      "55 pounds including everything onboard or attached",
      "55 pounds not including payload"
    ],
    correctIndex: 2,
    explanation: "A small UAS is defined as weighing less than 55 pounds at takeoff, including everything that is on board or otherwise attached to the aircraft at the time of takeoff.",
    reference: "14 CFR § 107.3"
  },
  {
    id: 4,
    category: "Regulations",
    question: "How old must a remote pilot in command be to operate under Part 107?",
    options: [
      "14 years old",
      "16 years old",
      "18 years old",
      "21 years old"
    ],
    correctIndex: 1,
    explanation: "A person must be at least 16 years of age to obtain a remote pilot certificate and act as remote PIC under Part 107.",
    reference: "14 CFR § 107.61(a)"
  },
  {
    id: 5,
    category: "Regulations",
    question: "How often must a remote pilot complete recurrent training or testing to maintain their certificate?",
    options: [
      "Every 12 calendar months",
      "Every 24 calendar months",
      "Every 36 calendar months",
      "Every 60 calendar months"
    ],
    correctIndex: 1,
    explanation: "Remote pilots must complete recurrent training or pass a recurrent knowledge test every 24 calendar months to maintain the privileges of their certificate.",
    reference: "14 CFR § 107.65"
  },
  {
    id: 6,
    category: "Regulations",
    question: "Under the Operations Over People rule, which category allows flight over people with a drone weighing 0.55 pounds or less?",
    options: [
      "Category 1",
      "Category 2",
      "Category 3",
      "Category 4"
    ],
    correctIndex: 0,
    explanation: "Category 1 allows operations over people if the small UAS weighs 0.55 pounds (250 grams) or less, including everything on board or attached at takeoff, and has no exposed rotating parts that could lacerate human skin.",
    reference: "14 CFR § 107.110"
  },
  {
    id: 7,
    category: "Regulations",
    question: "What is required for night operations under the current Part 107 rules?",
    options: [
      "A waiver from the FAA is always required",
      "Anti-collision lighting visible for 3 statute miles and updated training",
      "Operations at night are prohibited under Part 107",
      "Only a Visual Observer is required"
    ],
    correctIndex: 1,
    explanation: "Since the 2021 rule update, night flight is permitted without a waiver if the drone has anti-collision lighting visible for at least 3 statute miles, and the remote pilot has completed updated initial or recurrent training that covers night operations.",
    reference: "14 CFR § 107.29"
  },
  {
    id: 8,
    category: "Regulations",
    question: "What is Remote ID and when was compliance required?",
    options: [
      "A registration number; required since 2020",
      "A broadcast identification system; compliance required as of March 16, 2024",
      "A tracking device required only for commercial operations over 25 lbs",
      "An optional identification system recommended by the FAA"
    ],
    correctIndex: 1,
    explanation: "Remote ID is a broadcast identification system that transmits the drone's identity, location, altitude, and control station location. Standard Remote ID or a Remote ID broadcast module has been required for most Part 107 operations since March 16, 2024.",
    reference: "14 CFR Part 89"
  },
  {
    id: 9,
    category: "Regulations",
    question: "What are the minimum visibility requirements for Part 107 operations?",
    options: [
      "1 statute mile from the control station",
      "2 statute miles from the control station",
      "3 statute miles from the control station",
      "5 statute miles from the control station"
    ],
    correctIndex: 2,
    explanation: "The minimum flight visibility as observed from the control station must be no less than 3 statute miles.",
    reference: "14 CFR § 107.51(c)"
  },
  {
    id: 10,
    category: "Regulations",
    question: "Is a remote pilot certificate required to fly a drone recreationally?",
    options: [
      "Yes, all drone pilots must hold a Part 107 certificate",
      "No, but recreational flyers must pass TRUST",
      "No, recreational flyers have no requirements",
      "Yes, unless the drone weighs less than 1 pound"
    ],
    correctIndex: 1,
    explanation: "Recreational flyers operate under 49 USC § 44809 and do not need a Part 107 certificate. However, they must pass The Recreational UAS Safety Test (TRUST) before flying.",
    reference: "49 USC § 44809"
  },
  {
    id: 11,
    category: "Regulations",
    question: "Under Part 107, when can a remote pilot deviate from the regulations?",
    options: [
      "Never; all regulations must be followed at all times",
      "When a waiver has been obtained for any rule",
      "In response to an in-flight emergency requiring immediate action",
      "Whenever the PIC determines it is safe to do so"
    ],
    correctIndex: 2,
    explanation: "In an in-flight emergency requiring immediate action, the remote PIC may deviate from any rule of Part 107 to the extent necessary to meet that emergency. The PIC must report the deviation to the FAA upon request.",
    reference: "14 CFR § 107.21"
  },
  {
    id: 12,
    category: "Regulations",
    question: "Which of the following operations requires a Part 107 waiver?",
    options: [
      "Flying at night with anti-collision lights",
      "Operating from a moving vehicle in a sparsely populated area",
      "Flying beyond visual line of sight (BVLOS)",
      "Flying in Class G airspace"
    ],
    correctIndex: 2,
    explanation: "BVLOS operations are not permitted under standard Part 107 rules and require a waiver. Night operations and moving vehicle operations (in sparsely populated areas) are now permitted without a waiver under the updated rules.",
    reference: "14 CFR § 107.200"
  },
  {
    id: 13,
    category: "Regulations",
    question: "What must a remote pilot have in their possession when operating under Part 107?",
    options: [
      "Only the drone's registration certificate",
      "Remote pilot certificate and government-issued photo ID",
      "Remote pilot certificate, photo ID, and a logbook",
      "Only a government-issued photo ID"
    ],
    correctIndex: 1,
    explanation: "The remote PIC must have their remote pilot certificate and a government-issued photo ID in their personal possession or readily accessible during all UAS operations.",
    reference: "14 CFR § 107.7"
  },
  {
    id: 14,
    category: "Regulations",
    question: "Under Category 2 of Operations Over People, what is required regarding the drone?",
    options: [
      "The drone must weigh 0.55 lbs or less",
      "The drone must have an FAA-accepted declaration of compliance and not cause injury above a certain severity threshold",
      "The drone must have a parachute system",
      "The drone must be operated only over participants"
    ],
    correctIndex: 1,
    explanation: "Category 2 requires that the drone has an FAA-accepted declaration of compliance and that it would not cause injury to a person that is greater than a certain severity threshold. No exposed rotating parts may lacerate human skin.",
    reference: "14 CFR § 107.115"
  },
  {
    id: 15,
    category: "Regulations",
    question: "What is the penalty for operating a drone in an unsafe manner?",
    options: [
      "A written warning only",
      "Suspension or revocation of the remote pilot certificate and/or civil penalties",
      "A mandatory 30-day grounding period",
      "Criminal penalties only"
    ],
    correctIndex: 1,
    explanation: "The FAA can take certificate action (suspension or revocation) and/or assess civil penalties against a remote pilot who operates carelessly or recklessly. Criminal penalties may also apply in extreme cases.",
    reference: "14 CFR § 107.19"
  },
  {
    id: 16,
    category: "Regulations",
    question: "When must a small UAS be registered with the FAA?",
    options: [
      "Only if used for commercial purposes",
      "Only if it weighs more than 1 pound",
      "If it weighs more than 0.55 pounds (250 grams)",
      "All drones must be registered regardless of weight"
    ],
    correctIndex: 2,
    explanation: "All small UAS weighing more than 0.55 pounds (250 grams) and less than 55 pounds must be registered with the FAA before operation.",
    reference: "14 CFR Part 48"
  },
  {
    id: 17,
    category: "Regulations",
    question: "Category 3 operations over people have what additional restriction?",
    options: [
      "Must be flown only at night",
      "Must not maintain sustained flight over open-air assemblies of people",
      "Must always have a Visual Observer present",
      "Must only fly above 200 feet AGL"
    ],
    correctIndex: 1,
    explanation: "Category 3 allows flight over people but prohibits sustained flight directly over open-air assemblies. The drone must also have an FAA-accepted declaration of compliance.",
    reference: "14 CFR § 107.120"
  },
  {
    id: 18,
    category: "Regulations",
    question: "What type of certificate does a remote pilot hold under Part 107?",
    options: [
      "Remote Pilot Certificate with a small UAS rating",
      "Commercial Drone License",
      "UAS Operator Permit",
      "Drone Pilot License with multi-rotor endorsement"
    ],
    correctIndex: 0,
    explanation: "The FAA issues a Remote Pilot Certificate with a small UAS rating to pilots who pass the initial aeronautical knowledge test or complete equivalent training.",
    reference: "14 CFR § 107.53"
  },
  {
    id: 19,
    category: "Regulations",
    question: "Category 4 operations over people require what type of airworthiness certificate?",
    options: [
      "Standard airworthiness certificate",
      "Special airworthiness certificate",
      "Type certificate or airworthiness certificate issued under Part 21",
      "No airworthiness certificate is needed"
    ],
    correctIndex: 2,
    explanation: "Category 4 requires the drone to have an airworthiness certificate issued under Part 21, including type certification. This is the most stringent category for operations over people.",
    reference: "14 CFR § 107.125"
  },
  {
    id: 20,
    category: "Regulations",
    question: "How long does it take for a temporary remote pilot certificate to be issued after passing the knowledge test?",
    options: [
      "Immediately at the testing center",
      "Within 24 hours via email",
      "Typically within 1-2 weeks via IACRA",
      "30 days by mail"
    ],
    correctIndex: 2,
    explanation: "After passing the knowledge test, the applicant completes an application through IACRA. Once the TSA background check is complete, a temporary certificate is issued, typically within 1-2 weeks. The permanent card arrives by mail afterward.",
    reference: "14 CFR § 107.63"
  },

  // === AIRSPACE (15) ===
  {
    id: 21,
    category: "Airspace",
    question: "What class of airspace surrounds the busiest airports such as major international airports?",
    options: [
      "Class A",
      "Class B",
      "Class C",
      "Class D"
    ],
    correctIndex: 1,
    explanation: "Class B airspace surrounds the nation's busiest airports. It is depicted on sectional charts as solid blue lines and is shaped like an inverted wedding cake, typically extending from the surface to 10,000 feet MSL.",
    reference: "AIM 3-2-3"
  },
  {
    id: 22,
    category: "Airspace",
    question: "In which airspace class(es) can a Part 107 pilot fly WITHOUT prior FAA authorization?",
    options: [
      "Class G only",
      "Class G and Class E that does not extend to the surface",
      "Class G, D, and E",
      "All airspace classes below 400 feet AGL"
    ],
    correctIndex: 1,
    explanation: "Part 107 pilots may operate in Class G (uncontrolled) airspace and in Class E airspace that does not extend to the surface without prior authorization. Operations in Class B, C, D, or surface-area Class E require FAA authorization.",
    reference: "14 CFR § 107.41"
  },
  {
    id: 23,
    category: "Airspace",
    question: "What does a dashed magenta line on a sectional chart indicate?",
    options: [
      "Class C airspace boundary",
      "Class D airspace boundary",
      "Class E airspace with a floor of 700 feet AGL",
      "Prohibited area boundary"
    ],
    correctIndex: 2,
    explanation: "A dashed magenta line indicates Class E airspace that begins at 700 feet AGL. This is important for drone pilots because sUAS operating below 700 feet in these areas are in Class G airspace and do not need authorization.",
    reference: "FAA Sectional Chart Legend"
  },
  {
    id: 24,
    category: "Airspace",
    question: "What is LAANC?",
    options: [
      "Low Altitude Airspace Navigation Control",
      "Low Altitude Authorization and Notification Capability",
      "Local Airport Advisory Notification Center",
      "Limited Airspace Access for Non-Crewed aircraft"
    ],
    correctIndex: 1,
    explanation: "LAANC (Low Altitude Authorization and Notification Capability) is an automated system that provides near-real-time airspace authorization for Part 107 operations in controlled airspace near airports.",
    reference: "FAA LAANC Program"
  },
  {
    id: 25,
    category: "Airspace",
    question: "What is a TFR and how does it affect drone operations?",
    options: [
      "Terminal Flight Route; it designates preferred drone corridors",
      "Temporary Flight Restriction; UAS operations are prohibited within it unless specifically authorized",
      "Tactical Flight Region; it applies only to military operations",
      "Total Flight Radius; it defines the maximum distance from the operator"
    ],
    correctIndex: 1,
    explanation: "A Temporary Flight Restriction (TFR) prohibits all aircraft, including drones, from operating in a defined area. TFRs are issued for events like presidential movement, sporting events, wildfires, and space operations.",
    reference: "14 CFR § 91.137-91.145"
  },
  {
    id: 26,
    category: "Airspace",
    question: "What color are the solid lines that depict Class B airspace on a sectional chart?",
    options: [
      "Magenta",
      "Blue",
      "Red",
      "Green"
    ],
    correctIndex: 1,
    explanation: "Class B airspace is depicted with solid blue lines on sectional charts. Class C uses solid magenta lines, and Class D uses dashed blue lines.",
    reference: "FAA Sectional Chart Legend"
  },
  {
    id: 27,
    category: "Airspace",
    question: "What is Class G airspace?",
    options: [
      "Government-restricted airspace",
      "Controlled airspace above 18,000 feet MSL",
      "Uncontrolled airspace where ATC has no authority",
      "Airspace designated for general aviation only"
    ],
    correctIndex: 2,
    explanation: "Class G is uncontrolled airspace. ATC does not exercise authority over aircraft in Class G. Most sUAS Part 107 operations occur in Class G airspace, which typically extends from the surface up to the base of overlying controlled airspace.",
    reference: "AIM 3-3-1"
  },
  {
    id: 28,
    category: "Airspace",
    question: "A solid magenta line on a sectional chart surrounding an airport indicates what type of airspace?",
    options: [
      "Class B",
      "Class C",
      "Class D",
      "Class E surface area"
    ],
    correctIndex: 1,
    explanation: "Solid magenta lines indicate Class C airspace, which surrounds airports with operational control towers and radar approach control. Part 107 pilots need authorization to operate in Class C airspace.",
    reference: "FAA Sectional Chart Legend"
  },
  {
    id: 29,
    category: "Airspace",
    question: "What is the ceiling of Class A airspace?",
    options: [
      "18,000 feet MSL",
      "60,000 feet MSL (FL600)",
      "45,000 feet MSL",
      "There is no upper limit"
    ],
    correctIndex: 1,
    explanation: "Class A airspace extends from 18,000 feet MSL up to and including FL600 (approximately 60,000 feet MSL). Part 107 drones do not operate in Class A airspace.",
    reference: "AIM 3-2-2"
  },
  {
    id: 30,
    category: "Airspace",
    question: "What type of airspace authorization can be requested through the FAA DroneZone for areas not covered by LAANC?",
    options: [
      "Blanket authorization for all controlled airspace",
      "Airspace authorization or waiver via Part 107 online portal",
      "Verbal authorization from local ATC",
      "Authorization is not available outside of LAANC"
    ],
    correctIndex: 1,
    explanation: "For areas not covered by LAANC, pilots can request airspace authorization through the FAA DroneZone portal. These requests may take up to 90 days to process.",
    reference: "14 CFR § 107.41"
  },
  {
    id: 31,
    category: "Airspace",
    question: "A dashed blue line on a sectional chart indicates what type of airspace?",
    options: [
      "Class B",
      "Class C",
      "Class D",
      "Class E"
    ],
    correctIndex: 2,
    explanation: "Dashed blue lines indicate Class D airspace, which surrounds airports with an operating control tower. Class D typically extends from the surface to 2,500 feet AGL.",
    reference: "FAA Sectional Chart Legend"
  },
  {
    id: 32,
    category: "Airspace",
    question: "What are NOTAMs and why should drone pilots check them before flight?",
    options: [
      "Notices to Air Marshals; they relate to security operations only",
      "Notices to Air Missions; they contain time-critical information including TFRs and airspace changes",
      "Notes About Terrain and Mapping; they provide elevation data",
      "Network Operations Technical Advisory Messages; they relate to GPS status"
    ],
    correctIndex: 1,
    explanation: "NOTAMs (Notices to Air Missions) contain time-critical aeronautical information about temporary hazards, TFRs, airspace closures, and other conditions that could affect the safety of a drone operation.",
    reference: "14 CFR § 107.49(a)"
  },
  {
    id: 33,
    category: "Airspace",
    question: "What is the purpose of a MOA (Military Operations Area)?",
    options: [
      "To permanently restrict all civilian aircraft",
      "To separate certain military training activities from IFR traffic",
      "To designate airspace for drone testing only",
      "To restrict airspace above 18,000 feet MSL"
    ],
    correctIndex: 1,
    explanation: "A MOA separates certain military training activities from IFR traffic. VFR flight (including drones) is not prohibited in a MOA, but extreme caution should be exercised. Pilots should check NOTAMs for MOA activity.",
    reference: "AIM 3-4-5"
  },
  {
    id: 34,
    category: "Airspace",
    question: "Which type of special-use airspace completely prohibits all aircraft entry?",
    options: [
      "Restricted area",
      "Warning area",
      "Prohibited area",
      "Military Operations Area"
    ],
    correctIndex: 2,
    explanation: "Prohibited areas (designated with a 'P' prefix, e.g., P-56 around the White House) prohibit all flight. No aircraft, including drones, may enter a prohibited area without specific permission.",
    reference: "AIM 3-4-2"
  },
  {
    id: 35,
    category: "Airspace",
    question: "If a Part 107 pilot receives LAANC authorization to fly at a maximum altitude of 100 feet in controlled airspace, what does this mean?",
    options: [
      "They may fly up to 100 feet AGL within the authorized area",
      "They may fly up to 100 feet MSL anywhere in the area",
      "They may fly up to 400 feet but must stay 100 feet from the airport",
      "They may exceed 100 feet if they maintain visual line of sight"
    ],
    correctIndex: 0,
    explanation: "LAANC authorizations specify a maximum altitude AGL for a specific area near the airport. The pilot must stay at or below the authorized altitude within the designated grid area.",
    reference: "FAA LAANC Program"
  },

  // === WEATHER (15) ===
  {
    id: 36,
    category: "Weather",
    question: "What are the minimum cloud clearance requirements under Part 107?",
    options: [
      "500 feet above and 1,000 feet horizontally",
      "500 feet below and 2,000 feet horizontally",
      "1,000 feet below and 1 statute mile horizontally",
      "Clear of clouds with 1 mile visibility"
    ],
    correctIndex: 1,
    explanation: "Part 107 requires the small UAS to remain at least 500 feet below clouds and 2,000 feet horizontally from clouds. These distances help maintain separation from manned aircraft operating in the clouds.",
    reference: "14 CFR § 107.51(d)"
  },
  {
    id: 37,
    category: "Weather",
    question: "What does METAR stand for?",
    options: [
      "Measured Environmental Terrain and Aeronautical Report",
      "Meteorological Aerodrome Report",
      "Meteorological Aviation Terminal Report",
      "Main Environmental Terminal Assessment Record"
    ],
    correctIndex: 1,
    explanation: "METAR stands for Meteorological Aerodrome Report. It is a standardized format for reporting current weather observations at airports, typically updated hourly.",
    reference: "AIM 7-1-30"
  },
  {
    id: 38,
    category: "Weather",
    question: "In a METAR, what does the abbreviation 'OVC025' mean?",
    options: [
      "Overcast clouds at 25,000 feet MSL",
      "Overcast clouds at 2,500 feet AGL",
      "Occasional visibility at 25 miles",
      "Overcast clouds at 250 feet AGL"
    ],
    correctIndex: 1,
    explanation: "OVC025 means overcast cloud layer at 2,500 feet AGL. Cloud heights in METARs are reported in hundreds of feet above ground level. OVC indicates 8/8 sky coverage.",
    reference: "AIM 7-1-30"
  },
  {
    id: 39,
    category: "Weather",
    question: "What type of weather front typically produces the most severe weather?",
    options: [
      "Warm front",
      "Stationary front",
      "Fast-moving cold front",
      "Occluded front"
    ],
    correctIndex: 2,
    explanation: "A fast-moving cold front produces the most severe weather, including thunderstorms, heavy rain, turbulence, and wind shear. The steep frontal slope forces rapid lifting of warm air, creating intense convective activity.",
    reference: "FAA PHAK Chapter 12"
  },
  {
    id: 40,
    category: "Weather",
    question: "What is density altitude?",
    options: [
      "The altitude indicated on the altimeter",
      "The height above mean sea level",
      "Pressure altitude corrected for non-standard temperature",
      "The altitude above the nearest terrain"
    ],
    correctIndex: 2,
    explanation: "Density altitude is pressure altitude corrected for non-standard temperature. Higher density altitude (caused by high temperature, high altitude, or high humidity) means less dense air, which reduces drone performance.",
    reference: "FAA PHAK Chapter 4"
  },
  {
    id: 41,
    category: "Weather",
    question: "What does a TAF provide that a METAR does not?",
    options: [
      "Current wind speed and direction",
      "Current altimeter setting",
      "A forecast of expected weather conditions",
      "Current cloud heights"
    ],
    correctIndex: 2,
    explanation: "A TAF (Terminal Aerodrome Forecast) provides a forecast of expected weather conditions for a 24-30 hour period, while a METAR reports current observed conditions. Both are essential for flight planning.",
    reference: "AIM 7-1-31"
  },
  {
    id: 42,
    category: "Weather",
    question: "What is a microburst?",
    options: [
      "A small area of high pressure that creates calm winds",
      "A localized intense downdraft that spreads outward on contact with the ground",
      "A short burst of rain lasting less than 5 minutes",
      "A small tornado that forms over water"
    ],
    correctIndex: 1,
    explanation: "A microburst is a localized, intense downdraft that produces sudden wind shear when it spreads outward upon hitting the ground. It can produce wind speed changes of 30-45 knots over a very short distance, posing extreme danger to aircraft and drones.",
    reference: "AIM 7-1-24"
  },
  {
    id: 43,
    category: "Weather",
    question: "What conditions are most likely to produce radiation fog?",
    options: [
      "Strong winds, cloudy skies, and dry air",
      "Clear skies, light wind, high humidity, and a small temperature-dewpoint spread",
      "Heavy rain followed by cold front passage",
      "High altitude and low humidity"
    ],
    correctIndex: 1,
    explanation: "Radiation fog forms on clear nights with light winds and high relative humidity, when the ground cools rapidly by radiation. A small temperature-dewpoint spread indicates the air is near saturation.",
    reference: "FAA PHAK Chapter 12"
  },
  {
    id: 44,
    category: "Weather",
    question: "What effect does high density altitude have on drone performance?",
    options: [
      "Increased battery life and thrust",
      "No significant effect on multirotor drones",
      "Decreased thrust and reduced battery efficiency",
      "Improved climb performance"
    ],
    correctIndex: 2,
    explanation: "High density altitude means less dense air, which reduces propeller efficiency and thrust. Motors must work harder to produce the same lift, consuming more battery power and reducing flight time and payload capacity.",
    reference: "FAA PHAK Chapter 4"
  },
  {
    id: 45,
    category: "Weather",
    question: "In a METAR, wind reported as '18010G20KT' means:",
    options: [
      "Wind from 180 degrees true at 10 knots, gusting to 20 knots",
      "Wind from 180 degrees magnetic at 10 mph, gusting to 20 mph",
      "Wind variable from 180 to 200 degrees at 10 knots",
      "Wind from 018 degrees at 10 knots, gusting to 20 knots"
    ],
    correctIndex: 0,
    explanation: "METAR winds are reported as direction (true) in three digits, speed in knots, and gusts if applicable. 18010G20KT means wind from 180 degrees true at 10 knots, gusting to 20 knots.",
    reference: "AIM 7-1-30"
  },
  {
    id: 46,
    category: "Weather",
    question: "What is wind shear?",
    options: [
      "The prevailing wind direction at an airport",
      "A sudden, drastic change in wind speed and/or direction over a short distance",
      "The maximum gust recorded in a METAR",
      "The difference between surface wind and wind aloft"
    ],
    correctIndex: 1,
    explanation: "Wind shear is a sudden, drastic change in wind speed and/or direction over a short distance. It can occur at any altitude and is especially dangerous near thunderstorms and microbursts.",
    reference: "AIM 7-1-24"
  },
  {
    id: 47,
    category: "Weather",
    question: "What is the standard atmospheric pressure at sea level?",
    options: [
      "28.92 inches of mercury",
      "29.92 inches of mercury",
      "30.92 inches of mercury",
      "31.00 inches of mercury"
    ],
    correctIndex: 1,
    explanation: "Standard atmospheric pressure at sea level is 29.92 inches of mercury (Hg) or 1013.25 millibars. This is used as a reference for pressure altitude calculations.",
    reference: "FAA PHAK Chapter 4"
  },
  {
    id: 48,
    category: "Weather",
    question: "Which cloud type is associated with thunderstorms?",
    options: [
      "Stratus",
      "Cirrus",
      "Cumulonimbus",
      "Nimbostratus"
    ],
    correctIndex: 2,
    explanation: "Cumulonimbus (CB) clouds are associated with thunderstorms and produce heavy rain, lightning, hail, strong winds, microbursts, and turbulence. Drone pilots should avoid operating near CB clouds.",
    reference: "FAA PHAK Chapter 12"
  },
  {
    id: 49,
    category: "Weather",
    question: "What is the dewpoint and why is it important for drone pilots?",
    options: [
      "The temperature at which dew forms on the drone; it affects electronics",
      "The temperature at which air becomes saturated and moisture begins to condense; it indicates fog and cloud potential",
      "The maximum temperature during the day; it affects battery performance",
      "The temperature at which ice forms on propellers; it indicates icing risk"
    ],
    correctIndex: 1,
    explanation: "The dewpoint is the temperature at which air becomes saturated and water vapor begins to condense. When the temperature-dewpoint spread is small (within a few degrees), fog or low clouds are likely, reducing visibility below Part 107 minimums.",
    reference: "FAA PHAK Chapter 12"
  },
  {
    id: 50,
    category: "Weather",
    question: "A SIGMET is issued to warn pilots of which type of weather?",
    options: [
      "Light rain and moderate turbulence",
      "Thunderstorms affecting a small area",
      "Severe or extreme weather hazards such as severe turbulence, volcanic ash, or widespread dust storms",
      "Temperature inversions causing fog"
    ],
    correctIndex: 2,
    explanation: "SIGMETs (Significant Meteorological Information) warn of severe weather hazards that could affect all aircraft, including severe icing, severe or extreme turbulence, volcanic ash, and widespread dust or sandstorms.",
    reference: "AIM 7-1-6"
  },

  // === OPERATIONS (15) ===
  {
    id: 51,
    category: "Operations",
    question: "What does VLOS mean and is it required under Part 107?",
    options: [
      "Virtual Line of Sight; no, it is optional with FPV equipment",
      "Visual Line of Sight; yes, the remote PIC or VO must maintain unaided visual contact at all times",
      "Verified Location of System; yes, GPS tracking is required",
      "Visual Line of Sight; no, it is recommended but not required"
    ],
    correctIndex: 1,
    explanation: "VLOS means Visual Line of Sight. Under Part 107, the remote PIC or a visual observer must maintain unaided visual contact with the drone at all times during flight. FPV goggles alone do not satisfy this requirement.",
    reference: "14 CFR § 107.31"
  },
  {
    id: 52,
    category: "Operations",
    question: "Can a single remote pilot operate multiple drones simultaneously under Part 107?",
    options: [
      "Yes, up to three drones at once",
      "Yes, with a waiver",
      "No, a person may not act as PIC or VO for more than one UA at a time without a waiver",
      "Yes, if a Visual Observer is used for each drone"
    ],
    correctIndex: 2,
    explanation: "Under standard Part 107 rules, a person may not act as remote PIC or VO for more than one unmanned aircraft operation at a time. A waiver may be obtained for simultaneous operations.",
    reference: "14 CFR § 107.35"
  },
  {
    id: 53,
    category: "Operations",
    question: "What must a remote pilot do if there is an accident involving serious injury or property damage exceeding $500?",
    options: [
      "Report it to local law enforcement within 24 hours",
      "Report it to the FAA within 10 calendar days",
      "Report it to the NTSB within 48 hours",
      "File a report with the drone manufacturer within 30 days"
    ],
    correctIndex: 1,
    explanation: "The remote PIC must report any accident involving serious injury to any person, loss of consciousness, or property damage (other than to the drone) of at least $500 to the FAA within 10 calendar days.",
    reference: "14 CFR § 107.9"
  },
  {
    id: 54,
    category: "Operations",
    question: "Who has the right of way when a drone and a manned aircraft are converging?",
    options: [
      "The drone, if it was there first",
      "The manned aircraft always has the right of way",
      "The aircraft at the lower altitude",
      "Whichever aircraft is on the right"
    ],
    correctIndex: 1,
    explanation: "The remote pilot must always yield the right of way to all manned aircraft. The drone must give way and may not pass over, under, or ahead of the manned aircraft unless well clear.",
    reference: "14 CFR § 107.37(a)"
  },
  {
    id: 55,
    category: "Operations",
    question: "Under what conditions can a drone be operated from a moving vehicle?",
    options: [
      "Never; the pilot must be stationary",
      "Only over sparsely populated areas",
      "Over any area with a Visual Observer present",
      "Only with a Part 107 waiver"
    ],
    correctIndex: 1,
    explanation: "Operations from a moving vehicle are permitted but only over sparsely populated areas. The drone may not fly over anyone not directly participating in the operation.",
    reference: "14 CFR § 107.25"
  },
  {
    id: 56,
    category: "Operations",
    question: "What preflight actions is the remote PIC required to perform?",
    options: [
      "Only check battery levels",
      "File a flight plan with the FAA",
      "Assess the operating environment, ensure the drone is safe, and verify the control link is adequate",
      "Notify local air traffic control of the planned operation"
    ],
    correctIndex: 2,
    explanation: "The remote PIC must assess weather, airspace, flight restrictions, and the location of persons and property. They must also ensure the drone is in a condition for safe operation and that the control link between the station and drone is adequate.",
    reference: "14 CFR § 107.49"
  },
  {
    id: 57,
    category: "Operations",
    question: "What blood alcohol content (BAC) level prohibits a person from operating a drone?",
    options: [
      "0.08%",
      "0.04%",
      "0.02%",
      "Any detectable amount"
    ],
    correctIndex: 1,
    explanation: "A person may not operate a drone with a BAC of 0.04% or greater. Additionally, the 8-hour 'bottle to throttle' rule prohibits operation within 8 hours of consuming any alcohol, or while under the influence of any substance affecting faculties.",
    reference: "14 CFR § 107.27"
  },
  {
    id: 58,
    category: "Operations",
    question: "Can a Part 107 drone be operated over a moving vehicle on a public road?",
    options: [
      "Yes, without restriction",
      "No, operations over moving vehicles are always prohibited",
      "Yes, if the people in the vehicle are direct participants or the drone is a Category 1-3 aircraft",
      "Yes, but only during daylight hours"
    ],
    correctIndex: 2,
    explanation: "Under the Operations Over People rules, a drone may operate over a moving vehicle if the people inside are direct participants in the operation or if the drone meets Category 1, 2, or 3 requirements.",
    reference: "14 CFR § 107.145"
  },
  {
    id: 59,
    category: "Operations",
    question: "What should a remote pilot do if they lose the control link to the drone during flight?",
    options: [
      "Immediately call the FAA",
      "Follow the pre-programmed lost-link procedures and attempt to regain control",
      "Leave the area immediately",
      "Wait 30 minutes and file a report"
    ],
    correctIndex: 1,
    explanation: "The remote PIC should have lost-link procedures established as part of preflight planning. Most drones have programmable failsafe actions (return to home, land, hover). The PIC should attempt to regain control and ensure safety of other aircraft and people.",
    reference: "14 CFR § 107.49"
  },
  {
    id: 60,
    category: "Operations",
    question: "Is it legal to drop an object from a drone under Part 107?",
    options: [
      "No, dropping objects is always prohibited",
      "Yes, if it does not create an undue hazard to persons or property",
      "Yes, but only with a waiver",
      "Yes, but only in unpopulated areas"
    ],
    correctIndex: 1,
    explanation: "Part 107 permits transporting and dropping objects from a drone as long as the object is not dropped in a manner that creates an undue hazard to other persons or property.",
    reference: "14 CFR § 107.23"
  },
  {
    id: 61,
    category: "Operations",
    question: "Under Part 107, can a drone be used to carry property for compensation?",
    options: [
      "No, carrying property for compensation is prohibited",
      "Yes, Part 107 allows carriage of property for compensation with no additional requirements",
      "Yes, but only with a specific Part 135 certificate",
      "Yes, but only for deliveries under 5 pounds"
    ],
    correctIndex: 1,
    explanation: "Part 107 permits the carriage of property by a small UAS for compensation or hire, provided all other Part 107 rules are followed. No additional certification beyond the Part 107 remote pilot certificate is required.",
    reference: "14 CFR § 107.23"
  },
  {
    id: 62,
    category: "Operations",
    question: "What is the first action a remote pilot should take upon discovering an in-flight emergency?",
    options: [
      "Contact the FAA immediately",
      "Land the drone immediately regardless of location",
      "Ensure the safety of people on the ground and other aircraft",
      "Activate the return-to-home function"
    ],
    correctIndex: 2,
    explanation: "The remote PIC's first priority in an emergency is the safety of people and other aircraft. The PIC may deviate from any Part 107 rule to the extent necessary to address the emergency.",
    reference: "14 CFR § 107.21"
  },
  {
    id: 63,
    category: "Operations",
    question: "How close can a Part 107 drone operate to a Federal facility or military installation?",
    options: [
      "No closer than 5 miles without permission",
      "No closer than 3 miles",
      "There is no specific distance restriction, but NOTAMs and TFRs may restrict access",
      "No closer than 400 feet horizontally"
    ],
    correctIndex: 2,
    explanation: "Part 107 does not specify a blanket distance restriction from federal facilities. However, TFRs, NOTAMs, and other airspace restrictions may prohibit operations near sensitive facilities. Always check for active restrictions during preflight planning.",
    reference: "14 CFR § 107.49"
  },
  {
    id: 64,
    category: "Operations",
    question: "What are the remote PIC's duties regarding see-and-avoid?",
    options: [
      "The drone must have an onboard detect-and-avoid system",
      "The PIC must see and avoid other aircraft, using a VO if needed",
      "See-and-avoid only applies to manned aircraft",
      "ATC is responsible for separation from other aircraft"
    ],
    correctIndex: 1,
    explanation: "The remote PIC is responsible for seeing and avoiding other aircraft. This can be accomplished directly by the PIC or through a visual observer who communicates the traffic to the PIC.",
    reference: "14 CFR § 107.37"
  },
  {
    id: 65,
    category: "Operations",
    question: "Can vision-enhancing devices such as binoculars be used to satisfy the VLOS requirement?",
    options: [
      "Yes, any vision-enhancing device is permitted",
      "Yes, but only corrective lenses (glasses or contacts) are permitted",
      "No, VLOS must be maintained with unaided vision (except corrective lenses)",
      "Yes, if the PIC also uses a ground-based radar system"
    ],
    correctIndex: 2,
    explanation: "VLOS must be maintained with vision unaided by any device other than corrective lenses (glasses or contact lenses). Binoculars, telescopes, and FPV goggles do not satisfy the VLOS requirement.",
    reference: "14 CFR § 107.31"
  },

  // === CREW ROLES (10) ===
  {
    id: 66,
    category: "Crew Roles",
    question: "What is the role of a Visual Observer (VO)?",
    options: [
      "To operate the drone controls while the PIC navigates",
      "To maintain visual contact with the drone and alert the PIC to hazards",
      "To communicate with ATC on behalf of the PIC",
      "To file NOTAMs for the operation"
    ],
    correctIndex: 1,
    explanation: "The VO assists the remote PIC by watching the airspace for hazards and maintaining visual contact with the drone. The VO must be able to communicate drone position and any hazards to the PIC.",
    reference: "14 CFR § 107.33"
  },
  {
    id: 67,
    category: "Crew Roles",
    question: "Is a Visual Observer required under Part 107?",
    options: [
      "Yes, all Part 107 operations require a VO",
      "No, but if a VO is not used, the PIC must maintain VLOS at all times",
      "Yes, unless operating in Class G airspace",
      "No, but a VO is required for night operations"
    ],
    correctIndex: 1,
    explanation: "A VO is not required under Part 107. However, if a VO is not used, the remote PIC is solely responsible for maintaining VLOS with the drone at all times.",
    reference: "14 CFR § 107.33"
  },
  {
    id: 68,
    category: "Crew Roles",
    question: "Does a Visual Observer need a remote pilot certificate?",
    options: [
      "Yes, all crew members must hold certificates",
      "No, but the VO must be briefed by the PIC on the operation",
      "Yes, unless they are a licensed private pilot",
      "No, and no briefing is required"
    ],
    correctIndex: 1,
    explanation: "The VO does not need a remote pilot certificate. However, the remote PIC must ensure the VO is briefed on the operation, communication procedures, and their responsibilities before the flight.",
    reference: "14 CFR § 107.33"
  },
  {
    id: 69,
    category: "Crew Roles",
    question: "Can the remote PIC transfer control of the drone to another person?",
    options: [
      "Yes, to anyone present at the operation",
      "Yes, but only to another person who holds a valid remote pilot certificate",
      "No, the PIC must maintain control throughout the entire flight",
      "Yes, but only in an emergency"
    ],
    correctIndex: 1,
    explanation: "The remote PIC may transfer control to another person, but that person must hold a valid remote pilot certificate. The transfer must not compromise the safety of the operation, and the new PIC assumes all PIC responsibilities.",
    reference: "14 CFR § 107.19"
  },
  {
    id: 70,
    category: "Crew Roles",
    question: "Who is directly responsible for the safe conduct of a Part 107 flight?",
    options: [
      "The person manipulating the controls",
      "The Visual Observer",
      "The Remote Pilot in Command",
      "The drone operator's employer"
    ],
    correctIndex: 2,
    explanation: "The Remote Pilot in Command is directly responsible for and is the final authority for the safe operation of the small UAS. This responsibility cannot be delegated, even when another person is manipulating the controls.",
    reference: "14 CFR § 107.19"
  },
  {
    id: 71,
    category: "Crew Roles",
    question: "What is the role of a 'person manipulating the controls' who is not the Remote PIC?",
    options: [
      "They share equal responsibility with the PIC",
      "They operate under the direct supervision of the PIC, who retains responsibility",
      "They must hold a separate operator's license",
      "They serve as the backup PIC in case of emergency"
    ],
    correctIndex: 1,
    explanation: "A person manipulating the controls operates under the direct supervision of the remote PIC. The PIC retains ultimate responsibility for the flight. This person does not need a remote pilot certificate.",
    reference: "14 CFR § 107.19"
  },
  {
    id: 72,
    category: "Crew Roles",
    question: "Can a Visual Observer serve as VO for multiple simultaneous drone operations?",
    options: [
      "Yes, as long as all drones are in their field of view",
      "No, a person cannot serve as VO for more than one UA operation at a time",
      "Yes, up to three drones",
      "Yes, with the PIC's authorization"
    ],
    correctIndex: 1,
    explanation: "A person may not act as a visual observer for more than one unmanned aircraft operation at a time, just as a PIC cannot oversee more than one operation at a time.",
    reference: "14 CFR § 107.35"
  },
  {
    id: 73,
    category: "Crew Roles",
    question: "Must the VO and remote PIC be able to communicate throughout the flight?",
    options: [
      "No, they only need to communicate before takeoff",
      "Yes, they must maintain effective communication throughout the entire flight",
      "Only if operating in controlled airspace",
      "Only if the drone is more than 1,000 feet away"
    ],
    correctIndex: 1,
    explanation: "The remote PIC and VO must be able to communicate effectively throughout the entire flight to coordinate drone position, traffic, and hazards. This communication can be direct verbal or through an electronic means.",
    reference: "14 CFR § 107.33"
  },
  {
    id: 74,
    category: "Crew Roles",
    question: "Does the person manipulating the controls need to maintain VLOS with the drone?",
    options: [
      "Yes, they must always maintain VLOS",
      "No, only the PIC or VO must maintain VLOS",
      "Only if there is no VO present",
      "Only during takeoff and landing"
    ],
    correctIndex: 1,
    explanation: "The VLOS requirement is fulfilled by either the remote PIC or the visual observer. The person manipulating the controls is not required to maintain VLOS as long as the PIC or VO does.",
    reference: "14 CFR § 107.31"
  },
  {
    id: 75,
    category: "Crew Roles",
    question: "Who determines whether it is safe to continue a flight operation?",
    options: [
      "The Visual Observer",
      "The person manipulating the controls",
      "The Remote Pilot in Command",
      "Any crew member by consensus"
    ],
    correctIndex: 2,
    explanation: "The Remote PIC has the final authority regarding the conduct of the flight and is responsible for determining whether the operation can be conducted safely. Any crew member can alert the PIC to hazards, but the PIC makes the final decision.",
    reference: "14 CFR § 107.19"
  },

  // === PERFORMANCE (10) ===
  {
    id: 76,
    category: "Performance",
    question: "How does an increase in weight affect a multirotor drone's performance?",
    options: [
      "It has no effect on flight time or maneuverability",
      "It increases flight time due to greater momentum",
      "It decreases flight time, reduces climb rate, and decreases maneuverability",
      "It only affects maximum speed"
    ],
    correctIndex: 2,
    explanation: "Increased weight requires more power to maintain flight, reducing battery endurance and flight time. Heavier drones also have reduced climb rates and decreased maneuverability due to higher inertia and wing loading.",
    reference: "FAA PHAK Chapter 5"
  },
  {
    id: 77,
    category: "Performance",
    question: "What is the center of gravity (CG) and why is it important for drone operations?",
    options: [
      "The point where the drone contacts the ground; it affects takeoff speed",
      "The point at which the drone's weight is balanced; it affects stability and control",
      "The center of the propeller disc; it affects thrust output",
      "The midpoint of the battery; it affects flight duration"
    ],
    correctIndex: 1,
    explanation: "The CG is the point at which the drone would balance if suspended. An improper CG causes the flight controller to work harder to maintain stability, reducing efficiency and potentially leading to loss of control.",
    reference: "FAA PHAK Chapter 5"
  },
  {
    id: 78,
    category: "Performance",
    question: "What effect does high humidity have on drone performance?",
    options: [
      "It improves performance by cooling the motors",
      "It has no significant effect on performance",
      "It slightly reduces performance because moist air is less dense than dry air",
      "It increases lift because water molecules provide more buoyancy"
    ],
    correctIndex: 2,
    explanation: "Humid air is less dense than dry air at the same temperature and pressure because water molecules are lighter than nitrogen and oxygen molecules. This slightly reduces propeller efficiency and available thrust.",
    reference: "FAA PHAK Chapter 4"
  },
  {
    id: 79,
    category: "Performance",
    question: "What is load factor?",
    options: [
      "The weight of the payload divided by the battery weight",
      "The ratio of the lift generated to the actual weight of the aircraft",
      "The maximum weight the drone can carry",
      "The drag force divided by the thrust force"
    ],
    correctIndex: 1,
    explanation: "Load factor is the ratio of the total lift generated to the weight of the aircraft. In a level turn, load factor increases, meaning the drone must produce more lift (and use more power) than in straight-and-level flight.",
    reference: "FAA PHAK Chapter 5"
  },
  {
    id: 80,
    category: "Performance",
    question: "How does cold temperature affect lithium polymer (LiPo) battery performance?",
    options: [
      "Cold temperatures improve battery efficiency",
      "Cold temperatures have no effect on modern LiPo batteries",
      "Cold temperatures reduce battery capacity and can cause voltage sag",
      "Cold temperatures only affect charging, not discharging"
    ],
    correctIndex: 2,
    explanation: "Cold temperatures reduce the chemical reaction rate inside LiPo batteries, lowering available capacity and causing voltage sag under load. This can lead to unexpected power loss and shortened flight times. Pre-warming batteries before cold-weather operations is recommended.",
    reference: "FAA-H-8083-25B"
  },
  {
    id: 81,
    category: "Performance",
    question: "What happens to drone performance when operating at a high-altitude airport on a hot day?",
    options: [
      "Performance improves due to thinner air reducing drag",
      "Performance is significantly degraded due to high density altitude",
      "Performance is unaffected if the drone has GPS lock",
      "Performance improves because propellers spin faster in thin air"
    ],
    correctIndex: 1,
    explanation: "High altitude and hot temperature both increase density altitude, meaning less dense air. Propellers are less efficient in thinner air, requiring more power to generate the same thrust. This reduces climb rate, maximum altitude, and flight time.",
    reference: "FAA PHAK Chapter 4"
  },
  {
    id: 82,
    category: "Performance",
    question: "Why is it important to attach a payload at or near the drone's center of gravity?",
    options: [
      "It reduces the drone's total weight",
      "It prevents electromagnetic interference with the GPS",
      "It maintains proper balance and reduces the flight controller's workload",
      "It increases the maximum speed of the drone"
    ],
    correctIndex: 2,
    explanation: "Mounting a payload at the CG keeps the drone balanced. An off-center payload shifts the CG, forcing the flight controller to constantly compensate, which wastes battery power and may exceed the controller's ability to maintain stable flight.",
    reference: "FAA PHAK Chapter 5"
  },
  {
    id: 83,
    category: "Performance",
    question: "What is the effect of a forward CG on a fixed-wing UAS?",
    options: [
      "The aircraft will be more stable but require more energy to maintain level flight",
      "The aircraft will be less stable and harder to control",
      "The aircraft will be easier to turn",
      "There is no effect on a fixed-wing UAS"
    ],
    correctIndex: 0,
    explanation: "A forward CG makes a fixed-wing aircraft more nose-heavy, increasing longitudinal stability. However, the tail must produce more downforce to maintain level flight, increasing drag and requiring more power.",
    reference: "FAA PHAK Chapter 5"
  },
  {
    id: 84,
    category: "Performance",
    question: "What is the primary risk of overloading a drone beyond its maximum takeoff weight?",
    options: [
      "The GPS may not function correctly",
      "The radio control range is reduced",
      "Structural failure, motor burnout, or inability to maintain controlled flight",
      "The camera gimbal will malfunction"
    ],
    correctIndex: 2,
    explanation: "Exceeding the maximum takeoff weight can overstress the airframe, overheat motors and ESCs leading to failure, and make the drone unable to maintain stable flight or arrest a descent. This poses a serious safety risk to people and property below.",
    reference: "14 CFR § 107.49"
  },
  {
    id: 85,
    category: "Performance",
    question: "In a steep banked turn, a drone's effective load factor increases. What practical effect does this have?",
    options: [
      "The drone will climb during the turn",
      "The drone will lose altitude unless power is increased to compensate",
      "The drone's airspeed will increase",
      "The drone's battery usage will decrease"
    ],
    correctIndex: 1,
    explanation: "In a banked turn, part of the lift vector is directed horizontally to turn the aircraft. Less vertical lift remains to support the aircraft's weight, so the drone will lose altitude unless additional power is applied to increase total lift.",
    reference: "FAA PHAK Chapter 5"
  },

  // === AIRPORT OPERATIONS (10) ===
  {
    id: 86,
    category: "Airport Operations",
    question: "What is the standard direction of traffic in an airport traffic pattern?",
    options: [
      "Clockwise (right turns)",
      "Counterclockwise (left turns)",
      "It varies by airport and is always published",
      "Alternating directions based on wind"
    ],
    correctIndex: 1,
    explanation: "The standard airport traffic pattern uses left turns (counterclockwise). Right-hand patterns exist at some airports and are indicated on the airport diagram and in the Chart Supplement.",
    reference: "AIM 4-3-3"
  },
  {
    id: 87,
    category: "Airport Operations",
    question: "What does a segmented circle at an airport indicate?",
    options: [
      "The location of the control tower",
      "A helicopter landing area",
      "Traffic pattern information including landing direction and pattern entry",
      "The boundary of the airport's restricted area"
    ],
    correctIndex: 2,
    explanation: "A segmented circle is a visual ground-based indicator that provides traffic pattern information at non-towered airports, including the landing runway, traffic pattern direction, and wind direction via the wind sock or tetrahedron.",
    reference: "AIM 4-3-3"
  },
  {
    id: 88,
    category: "Airport Operations",
    question: "What color are runway hold short lines and what do they mean?",
    options: [
      "White dashed lines; they indicate the runway centerline",
      "Yellow lines with two solid and two dashed; no aircraft may cross without ATC clearance",
      "Red solid lines; they indicate a closed runway",
      "White solid lines; they indicate the runway threshold"
    ],
    correctIndex: 1,
    explanation: "Runway holding position markings consist of two solid yellow lines and two dashed yellow lines. No aircraft (or vehicle, including drones on the ground) may cross these lines without ATC authorization at towered airports.",
    reference: "AIM 2-3-5"
  },
  {
    id: 89,
    category: "Airport Operations",
    question: "What does CTAF stand for and when is it used?",
    options: [
      "Common Traffic Advisory Frequency; used at all airports",
      "Common Traffic Advisory Frequency; used for communicating at non-towered airports",
      "Controlled Tower Advisory Frequency; used at towered airports only",
      "Central Terminal Area Frequency; used for ground operations"
    ],
    correctIndex: 1,
    explanation: "CTAF (Common Traffic Advisory Frequency) is the frequency used for pilot self-announce procedures at non-towered airports. Drone pilots should monitor CTAF when operating near non-towered airports to maintain awareness of manned traffic.",
    reference: "AIM 4-1-9"
  },
  {
    id: 90,
    category: "Airport Operations",
    question: "What does a displaced threshold on a runway indicate?",
    options: [
      "The runway is closed",
      "The area before the threshold is available for takeoff and taxi but not for landing",
      "The runway has a steep approach angle",
      "The runway is only for military use"
    ],
    correctIndex: 1,
    explanation: "A displaced threshold means the landing portion of the runway does not begin at the physical start. The area before the displaced threshold may be used for takeoff, taxi, and rollout but not for landing.",
    reference: "AIM 2-3-3"
  },
  {
    id: 91,
    category: "Airport Operations",
    question: "What do red and white airport location markers on a sectional chart indicate?",
    options: [
      "A private airport",
      "A military airport",
      "A public-use airport with a hard-surface runway longer than 1,500 feet",
      "An airport with an operating control tower"
    ],
    correctIndex: 3,
    explanation: "On sectional charts, airports with control towers are shown in blue. Airports without towers are shown in magenta. The airport symbol shape indicates runway type (hard surface vs. soft). Blue indicates tower operations.",
    reference: "FAA Sectional Chart Legend"
  },
  {
    id: 92,
    category: "Airport Operations",
    question: "What does a flashing red light signal from the control tower mean to an aircraft on the ground?",
    options: [
      "Cleared to taxi",
      "Cleared for takeoff",
      "Taxi clear of the runway in use",
      "Stop"
    ],
    correctIndex: 2,
    explanation: "A flashing red light signal from the tower to an aircraft on the ground means 'taxi clear of the runway in use.' Light gun signals are important for drone pilots to know for operations near towered airports.",
    reference: "AIM 4-3-13"
  },
  {
    id: 93,
    category: "Airport Operations",
    question: "What does a windsock at an airport indicate?",
    options: [
      "The direction aircraft should taxi",
      "The wind direction and approximate wind speed",
      "The active runway number",
      "The location of the airport beacon"
    ],
    correctIndex: 1,
    explanation: "A windsock shows the direction the wind is blowing FROM and provides a rough indication of wind speed. A fully extended windsock indicates wind speeds of approximately 15 knots or greater.",
    reference: "AIM 4-3-3"
  },
  {
    id: 94,
    category: "Airport Operations",
    question: "What does a yellow chevron marking on a runway indicate?",
    options: [
      "A taxiway crossing",
      "Blast pad or stopway area — not for aircraft use",
      "The runway centerline",
      "A touch-and-go zone"
    ],
    correctIndex: 1,
    explanation: "Yellow chevron markings indicate a blast pad, stopway, or overrun area. These areas are not suitable for aircraft operations including taxiing, takeoff, or landing. They are designed to prevent erosion from jet blast or provide an overrun area.",
    reference: "AIM 2-3-3"
  },
  {
    id: 95,
    category: "Airport Operations",
    question: "What is the standard traffic pattern altitude at most non-towered airports?",
    options: [
      "500 feet AGL",
      "800 feet AGL",
      "1,000 feet AGL",
      "1,500 feet AGL"
    ],
    correctIndex: 2,
    explanation: "The standard traffic pattern altitude is 1,000 feet AGL for propeller-driven aircraft. Some airports may designate different pattern altitudes. Drone pilots should be especially cautious at or below pattern altitude when operating near airports.",
    reference: "AIM 4-3-3"
  },

  // === PHYSIOLOGY (10) ===
  {
    id: 96,
    category: "Physiology",
    question: "What is hypoxia?",
    options: [
      "A condition caused by excessive oxygen in the blood",
      "A state of insufficient oxygen supply to the body's tissues",
      "A condition caused by dehydration during flight operations",
      "An inner ear disorder causing vertigo"
    ],
    correctIndex: 1,
    explanation: "Hypoxia is a condition where the body or a region of the body is deprived of adequate oxygen supply. While more common at higher altitudes in manned aircraft, remote pilots should understand its symptoms, especially when operating at high-elevation locations.",
    reference: "FAA PHAK Chapter 17"
  },
  {
    id: 97,
    category: "Physiology",
    question: "What is hyperventilation and how can it affect a remote pilot?",
    options: [
      "Slow breathing that causes drowsiness",
      "Rapid breathing that reduces CO2 levels, causing dizziness and tingling",
      "A condition caused by high cabin pressure",
      "An allergic reaction to pollen during outdoor operations"
    ],
    correctIndex: 1,
    explanation: "Hyperventilation is abnormally rapid or deep breathing that lowers carbon dioxide levels in the blood, causing lightheadedness, tingling, and impaired judgment. Stress can trigger it. Treatment involves slowing the breathing rate.",
    reference: "FAA PHAK Chapter 17"
  },
  {
    id: 98,
    category: "Physiology",
    question: "How long before operating a drone must a pilot abstain from alcohol?",
    options: [
      "4 hours",
      "8 hours",
      "12 hours",
      "24 hours"
    ],
    correctIndex: 1,
    explanation: "The '8-hour bottle to throttle' rule requires that a pilot not consume any alcoholic beverage within 8 hours of operating a drone. Additionally, the pilot must not have a BAC of 0.04% or greater and must not be under the influence of alcohol.",
    reference: "14 CFR § 107.27"
  },
  {
    id: 99,
    category: "Physiology",
    question: "What is spatial disorientation?",
    options: [
      "Inability to read a sectional chart correctly",
      "Confusion about the drone's position due to GPS failure",
      "The inability to correctly interpret aircraft attitude, altitude, or airspeed, usually caused by sensory conflicts",
      "A condition where the pilot cannot determine their own geographic location"
    ],
    correctIndex: 2,
    explanation: "Spatial disorientation occurs when sensory inputs conflict, leading to incorrect perception of an aircraft's attitude or motion. For drone pilots, this can manifest as confusion about the drone's orientation, especially at distance or in low-contrast conditions.",
    reference: "FAA PHAK Chapter 17"
  },
  {
    id: 100,
    category: "Physiology",
    question: "What is the IMSAFE checklist used for?",
    options: [
      "Inspecting the drone before each flight",
      "Evaluating the pilot's fitness to fly (Illness, Medication, Stress, Alcohol, Fatigue, Emotion/Eating)",
      "Checking airspace restrictions",
      "Verifying weather conditions are suitable"
    ],
    correctIndex: 1,
    explanation: "IMSAFE is a personal checklist for evaluating pilot fitness: Illness, Medication, Stress, Alcohol, Fatigue, and Emotion (or Eating). Pilots should assess themselves before each flight to ensure they are physically and mentally fit to operate safely.",
    reference: "FAA PHAK Chapter 17"
  },
  {
    id: 101,
    category: "Physiology",
    question: "Which over-the-counter medications may impair a remote pilot's ability to safely operate a drone?",
    options: [
      "Only prescription medications can impair flying ability",
      "Antihistamines, sleep aids, and some cold medications can cause drowsiness and impair judgment",
      "No over-the-counter medications affect flying ability",
      "Only pain relievers affect flying ability"
    ],
    correctIndex: 1,
    explanation: "Many OTC medications can impair pilot performance. Antihistamines (allergy medications), sleep aids, and cold/flu medications can cause drowsiness, impaired reaction time, and reduced decision-making ability. Pilots should read labels for warnings about operating machinery.",
    reference: "14 CFR § 107.27"
  },
  {
    id: 102,
    category: "Physiology",
    question: "How does fatigue affect a remote pilot's performance?",
    options: [
      "Fatigue has minimal effect on drone operations since the pilot is on the ground",
      "Fatigue slows reaction time, impairs judgment, and reduces situational awareness",
      "Fatigue only affects long-duration flights over 4 hours",
      "Fatigue improves focus by narrowing attention"
    ],
    correctIndex: 1,
    explanation: "Fatigue significantly degrades a pilot's ability to operate safely. It slows reaction time, impairs decision-making and judgment, reduces situational awareness, and increases the likelihood of errors. Rest is essential before flight operations.",
    reference: "FAA PHAK Chapter 17"
  },
  {
    id: 103,
    category: "Physiology",
    question: "What visual illusion may affect a remote pilot when operating a drone at a great distance?",
    options: [
      "Autokinesis — a stationary light appears to move",
      "Size constancy — the drone appears smaller, making it difficult to judge distance and orientation",
      "Coriolis illusion — the drone appears to spin",
      "Somatogravic illusion — the drone appears to climb"
    ],
    correctIndex: 1,
    explanation: "At great distances, the drone appears very small, making it difficult to judge its orientation, direction of flight, and distance from obstacles. This is a key reason for the VLOS requirement and the importance of not flying beyond unaided visual range.",
    reference: "FAA PHAK Chapter 17"
  },
  {
    id: 104,
    category: "Physiology",
    question: "What effect does dehydration have on pilot performance?",
    options: [
      "No effect if the pilot is on the ground",
      "Reduced concentration, headaches, dizziness, and impaired decision-making",
      "Only affects performance at high altitudes",
      "Improved alertness due to stress response"
    ],
    correctIndex: 1,
    explanation: "Dehydration reduces cognitive performance, causing headaches, reduced concentration, dizziness, and impaired decision-making. Remote pilots should stay hydrated, especially during hot weather operations or extended outdoor flights.",
    reference: "FAA PHAK Chapter 17"
  },
  {
    id: 105,
    category: "Physiology",
    question: "What should a remote pilot do if they experience unexpected stress or emotional upset before a planned flight?",
    options: [
      "Proceed with the flight since drone operations are low-risk",
      "Use the IMSAFE checklist and consider postponing if they cannot focus properly",
      "Fly the drone but reduce the planned flight time",
      "Have a VO take over as PIC for the flight"
    ],
    correctIndex: 1,
    explanation: "Emotional stress significantly impairs judgment and decision-making. The IMSAFE checklist includes Emotion/Stress as a factor. If a pilot cannot maintain proper focus and judgment, the safe decision is to postpone the flight.",
    reference: "FAA PHAK Chapter 17"
  }
];

export const categories = ["All", "Regulations", "Airspace", "Weather", "Operations", "Crew Roles", "Performance", "Airport Operations", "Physiology"];

export default flashcards;
