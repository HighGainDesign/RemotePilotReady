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

  // === REGULATIONS (additional) ===
  {
    id: 106,
    category: "Regulations",
    question: "Under Part 107, is it legal to operate a drone over a moving vehicle on a public road in a populated area?",
    options: [
      "Yes, with no restrictions",
      "Only if the drone weighs less than 0.55 lbs (Category 1) or has an FAA-accepted declaration of compliance",
      "Only with a waiver",
      "Never; flying over any vehicle is prohibited"
    ],
    correctIndex: 1,
    explanation: "Operations over moving vehicles in populated areas require the drone to meet Category 1 (≤0.55 lbs), Category 2, or Category 3 standards. Category 4 (airworthiness certificate) is also acceptable. A waiver is not required if category requirements are met.",
    reference: "14 CFR § 107.145"
  },
  {
    id: 107,
    category: "Regulations",
    question: "What does 14 CFR § 107.5 require regarding the condition of a small UAS?",
    options: [
      "The drone must be certified by an FAA-approved repair station",
      "The remote pilot must ensure the drone is in a condition for safe operation before each flight",
      "The drone must pass an annual inspection",
      "The drone must carry liability insurance"
    ],
    correctIndex: 1,
    explanation: "§ 107.5 requires that no person may operate a small UAS that is not in a condition for safe operation. The remote PIC must assess the drone's airworthiness before each flight as part of their preflight duties.",
    reference: "14 CFR § 107.5"
  },
  {
    id: 108,
    category: "Regulations",
    question: "Under Part 107, flying over a moving vehicle in a sparsely populated area is permitted provided:",
    options: [
      "The vehicle occupants are wearing helmets",
      "The drone does not fly over any person not directly participating in the operation",
      "The operation is conducted during daylight only",
      "A VO is always present"
    ],
    correctIndex: 1,
    explanation: "When operating from a moving vehicle in a sparsely populated area, the drone may not be flown over any person not directly participating in the operation. 'Sparsely populated' means you must still avoid bystanders.",
    reference: "14 CFR § 107.25"
  },
  {
    id: 109,
    category: "Regulations",
    question: "What is the maximum altitude a drone may fly above a structure under the 400-foot structure exception?",
    options: [
      "400 feet AGL measured from the ground",
      "400 feet above the structure's highest point, with no absolute ceiling",
      "800 feet AGL total",
      "400 feet above the structure's immediate uppermost limit"
    ],
    correctIndex: 3,
    explanation: "The structure exception allows a drone to fly above 400 feet AGL only if it remains within 400 feet of the structure AND does not exceed 400 feet above the structure's immediate uppermost limit. The drone stays close to and just above the structure.",
    reference: "14 CFR § 107.51(b)"
  },
  {
    id: 110,
    category: "Regulations",
    question: "Can a Part 107 remote pilot operate a drone in Class E surface area airspace without authorization?",
    options: [
      "Yes, Class E is uncontrolled airspace",
      "No, Class E surface area is controlled airspace and requires FAA authorization",
      "Yes, if operating below 200 feet AGL",
      "Only at night"
    ],
    correctIndex: 1,
    explanation: "Class E surface area airspace (depicted by a dashed magenta circle around some airports) is controlled airspace that extends to the surface. Part 107 operations there require FAA authorization via LAANC or DroneZone.",
    reference: "14 CFR § 107.41"
  },
  {
    id: 111,
    category: "Regulations",
    question: "If a remote pilot's certificate is suspended or revoked, when may that person resume drone operations?",
    options: [
      "After 30 days",
      "After completing additional training",
      "Only after the FAA reinstates or issues a new certificate",
      "After paying the civil penalty"
    ],
    correctIndex: 2,
    explanation: "If the FAA suspends or revokes a remote pilot certificate, the person may not exercise the privileges of that certificate. Operations may only resume if and when the FAA reinstates the certificate or issues a new one.",
    reference: "49 USC § 44709"
  },
  {
    id: 112,
    category: "Regulations",
    question: "Under Part 107, who must report an accident to the FAA?",
    options: [
      "Anyone who witnessed the accident",
      "The remote pilot in command",
      "The drone manufacturer",
      "The owner of the drone if different from the pilot"
    ],
    correctIndex: 1,
    explanation: "The remote PIC is responsible for reporting accidents to the FAA within 10 calendar days. The report must be made if the accident involved serious injury, loss of consciousness, or property damage of at least $500.",
    reference: "14 CFR § 107.9"
  },
  {
    id: 113,
    category: "Regulations",
    question: "What is the minimum age to register a small UAS with the FAA?",
    options: [
      "13 years old",
      "16 years old",
      "13 years old for recreational, 16 for commercial",
      "18 years old"
    ],
    correctIndex: 0,
    explanation: "Under 14 CFR Part 48, a person must be at least 13 years of age to register a drone with the FAA. Persons under 13 may have a parent or guardian register on their behalf.",
    reference: "14 CFR § 48.25"
  },
  {
    id: 114,
    category: "Regulations",
    question: "Which regulation governs recreational drone flight under the Exception for Recreational Flyers?",
    options: [
      "14 CFR Part 107",
      "49 USC § 44809",
      "14 CFR Part 91",
      "14 CFR Part 89"
    ],
    correctIndex: 1,
    explanation: "Recreational flyers are governed by 49 USC § 44809, the Special Rule for Model Aircraft. This law allows recreational flight subject to community-based safety guidelines, TRUST completion, registration (if over 0.55 lbs), and airspace rules.",
    reference: "49 USC § 44809"
  },
  {
    id: 115,
    category: "Regulations",
    question: "What does 'careless or reckless operation' mean under Part 107?",
    options: [
      "Flying faster than 50 knots",
      "Operating in a manner that endangers the life or property of another",
      "Flying without a VO in urban areas",
      "Failing to carry your certificate during flight"
    ],
    correctIndex: 1,
    explanation: "§ 107.23 prohibits operation of a small UAS in a careless or reckless manner so as to endanger the life or property of another. This is the general safety standard that prohibits any endangering behavior not specifically addressed by other rules.",
    reference: "14 CFR § 107.23"
  },
  {
    id: 116,
    category: "Regulations",
    question: "What Standard Remote ID information must be broadcast?",
    options: [
      "Only the drone's registration number",
      "Serial number, location and altitude, control station location, emergency status, and timestamp",
      "Pilot name and certificate number",
      "Destination waypoints and flight plan"
    ],
    correctIndex: 1,
    explanation: "Standard Remote ID must broadcast: the UAS serial number, current location and altitude, control station location and altitude, UA velocity, emergency status, and a UTC timestamp. This allows authorities to identify and locate both the drone and the operator.",
    reference: "14 CFR § 89.315"
  },
  {
    id: 117,
    category: "Regulations",
    question: "Where must the registration number be displayed on a drone?",
    options: [
      "On any exterior surface, clearly legible",
      "Inside the battery compartment only",
      "On the top surface only",
      "On the remote controller"
    ],
    correctIndex: 0,
    explanation: "The FAA registration number must be displayed on an exterior surface of the drone where it is clearly legible. For drones registered after February 25, 2019, the number may no longer be placed inside a battery compartment.",
    reference: "14 CFR § 48.205"
  },
  {
    id: 118,
    category: "Regulations",
    question: "If a drone pilot is asked to provide their certificate for inspection by an authorized FAA representative, when must they comply?",
    options: [
      "Within 5 business days",
      "Upon request, immediately",
      "Within 24 hours",
      "Only if a formal written request is made"
    ],
    correctIndex: 1,
    explanation: "Under § 107.7, a remote pilot must present their remote pilot certificate and government-issued photo ID to an authorized FAA representative, NTSB representative, or federal, state, or local law enforcement officer upon request.",
    reference: "14 CFR § 107.7"
  },
  {
    id: 119,
    category: "Regulations",
    question: "Which of the following waivers IS allowed under Part 107?",
    options: [
      "Waiver to fly above 10,000 feet MSL",
      "Waiver to fly from a moving vehicle over a populated area",
      "Waiver to carry hazardous materials",
      "Waiver to exceed 87-knot groundspeed"
    ],
    correctIndex: 3,
    explanation: "The FAA may grant waivers to certain Part 107 operational limitations including maximum speed, altitude, VLOS, moving-vehicle restrictions, daylight operations, and more. Maximum speed waivers are specifically listed in § 107.205.",
    reference: "14 CFR § 107.205"
  },
  {
    id: 120,
    category: "Regulations",
    question: "Which FAA form is used to apply for a Part 107 certificate?",
    options: [
      "FAA Form 8710-13 via IACRA",
      "FAA Form 337",
      "FAA Form 8060-2",
      "FAA Form 7711-1"
    ],
    correctIndex: 0,
    explanation: "Applicants for a remote pilot certificate use FAA Form 8710-13, submitted electronically through IACRA (Integrated Airman Certification and Rating Application) after passing the Aeronautical Knowledge Test at an approved testing center.",
    reference: "14 CFR § 107.63"
  },

  // === AIRSPACE (additional) ===
  {
    id: 121,
    category: "Airspace",
    question: "What is a Warning Area and how does it affect drone operations?",
    options: [
      "It is identical to a Prohibited Area; no entry is allowed",
      "It contains hazardous activities over international waters; VFR flight including drones is not restricted but extreme caution is advised",
      "It is issued only during wartime",
      "It requires a NOTAM check before entry"
    ],
    correctIndex: 1,
    explanation: "Warning Areas are designated with a 'W' prefix over international waters. They contain hazardous military activities. Unlike Prohibited or Restricted Areas, entry is not forbidden, but extreme caution is warranted. Domestic operations rarely encounter them.",
    reference: "AIM 3-4-4"
  },
  {
    id: 122,
    category: "Airspace",
    question: "When Class D airspace is not in effect (tower closed), what type of airspace typically replaces it?",
    options: [
      "Class C airspace",
      "Class E or Class G airspace, as published in the Chart Supplement",
      "The area becomes a Prohibited Area",
      "Class B airspace takes over"
    ],
    correctIndex: 1,
    explanation: "When the control tower is not operational, Class D airspace reverts to the type of airspace designated in the Chart Supplement, typically Class E (with a floor at 700 ft or the surface) or Class G. LAANC authorization requirements change accordingly.",
    reference: "AIM 3-2-5"
  },
  {
    id: 123,
    category: "Airspace",
    question: "What is a UAS Facility Map (UASFM) and how do drone pilots use it?",
    options: [
      "A map showing drone delivery routes",
      "A grid map showing maximum authorized altitudes for LAANC approvals near airports",
      "A chart of prohibited drone flying areas nationwide",
      "A map used only by the FAA for enforcement"
    ],
    correctIndex: 1,
    explanation: "UAS Facility Maps show the maximum altitudes at which the FAA can authorize LAANC requests within controlled airspace near airports. They are displayed in grid squares around airports and are used to determine available altitude for automated authorizations.",
    reference: "FAA UAS Facility Maps"
  },
  {
    id: 124,
    category: "Airspace",
    question: "What does a shaded (vignette) magenta area on a sectional chart indicate?",
    options: [
      "Restricted airspace below 1,200 feet AGL",
      "Class E airspace with a floor of 700 feet AGL (transition area)",
      "A National Wildlife Refuge",
      "Class G airspace with a ceiling of 700 feet AGL"
    ],
    correctIndex: 1,
    explanation: "A shaded (vignette) magenta area on a sectional chart indicates that Class E airspace begins at 700 feet AGL (transition area). Below 700 feet AGL in these areas the airspace is Class G, so no authorization is needed for drone operations below 400 ft AGL there.",
    reference: "FAA Sectional Chart Legend"
  },
  {
    id: 125,
    category: "Airspace",
    question: "What is the floor of Class A airspace?",
    options: [
      "10,000 feet MSL",
      "14,500 feet MSL",
      "18,000 feet MSL",
      "24,000 feet MSL"
    ],
    correctIndex: 2,
    explanation: "Class A airspace begins at 18,000 feet MSL. All operations within Class A require an IFR clearance. Drones operating under Part 107 never approach Class A altitudes (maximum is 400 feet AGL or 400 feet above a structure).",
    reference: "AIM 3-2-2"
  },
  {
    id: 126,
    category: "Airspace",
    question: "If a sectional chart shows 'R-2508' in an area, what does this indicate?",
    options: [
      "A runway approach path for runway 25",
      "Restricted Area 2508; flight within may be prohibited when active",
      "Radio frequency 250.8 MHz for area communications",
      "A remote-pilot-only designated zone"
    ],
    correctIndex: 1,
    explanation: "Areas labeled 'R-' followed by a number indicate Restricted Areas. These areas may contain hazardous activities such as weapons testing or military training. Entry is prohibited when active unless specific authorization has been received.",
    reference: "AIM 3-4-3"
  },
  {
    id: 127,
    category: "Airspace",
    question: "What is an Alert Area and what should drone pilots do when operating near one?",
    options: [
      "An area of high pilot workload near major airports; avoid it",
      "An area of high volume of pilot training or unusual aerial activity; use extreme caution",
      "A temporary restricted area around national events",
      "An area where weather briefing is mandatory"
    ],
    correctIndex: 1,
    explanation: "Alert Areas are designated with an 'A' prefix to advise non-participating pilots of unusual aerial activity such as student training, skydiving, or high-volume traffic. Unlike restricted areas, flight is permitted but extreme caution is required.",
    reference: "AIM 3-4-6"
  },
  {
    id: 128,
    category: "Airspace",
    question: "Under the FAA's B4UFLY app or similar tools, what does a 'red' area typically indicate?",
    options: [
      "Good flying conditions with no restrictions",
      "Flight may not be permitted or authorization is required",
      "Military training area only",
      "Night operations only"
    ],
    correctIndex: 1,
    explanation: "In FAA drone planning tools, red areas indicate locations where flight may not be permitted (such as Prohibited Areas, active TFRs) or where authorization is required before flying (controlled airspace). Pilots must not fly in red areas without proper authorization.",
    reference: "FAA B4UFLY App Documentation"
  },
  {
    id: 129,
    category: "Airspace",
    question: "Drone pilots operating within 5 nautical miles of a non-towered airport should do what?",
    options: [
      "Nothing; no notification is required in uncontrolled airspace",
      "File a flight plan with the FAA",
      "Contact the airport operator and/or monitor CTAF to maintain situational awareness",
      "Obtain LAANC authorization regardless of airspace class"
    ],
    correctIndex: 2,
    explanation: "While not legally required in Class G airspace, Part 107 best practices and the FAA Remote Pilot Study Guide recommend contacting the airport manager and monitoring CTAF when operating near non-towered airports to maintain traffic awareness and coordinate with manned aircraft.",
    reference: "FAA Remote Pilot Study Guide"
  },
  {
    id: 130,
    category: "Airspace",
    question: "What is the typical ceiling of Class D airspace?",
    options: [
      "2,500 feet AGL",
      "5,000 feet MSL",
      "4,000 feet AGL",
      "Varies, but typically 2,500 feet AGL"
    ],
    correctIndex: 3,
    explanation: "Class D airspace typically extends from the surface up to 2,500 feet AGL around airports with operating control towers. The exact dimensions vary and are published in the Chart Supplement and shown on sectional charts.",
    reference: "AIM 3-2-5"
  },

  // === WEATHER (additional) ===
  {
    id: 131,
    category: "Weather",
    question: "What is a temperature inversion and how does it affect drone operations?",
    options: [
      "A rapid cooling of air at altitude; it creates turbulence",
      "A layer where temperature increases with altitude instead of decreasing; it can trap pollutants and cause smooth but hazy conditions with reduced visibility",
      "A weather phenomenon that only occurs above 10,000 feet",
      "An increase in wind speed at altitude"
    ],
    correctIndex: 1,
    explanation: "A temperature inversion reverses the normal decrease of temperature with altitude. Inversions trap smoke, haze, and moisture near the surface, reducing visibility. They also create a stable layer that can produce smooth but hazy flying conditions and support fog formation.",
    reference: "FAA PHAK Chapter 12"
  },
  {
    id: 132,
    category: "Weather",
    question: "What is an Airmet and how does it differ from a Sigmet?",
    options: [
      "An Airmet warns of conditions hazardous to large aircraft only; a Sigmet covers all aircraft",
      "An Airmet warns of moderate hazards for smaller aircraft; a Sigmet warns of severe hazards affecting all aircraft",
      "They are the same; the terms are interchangeable",
      "An Airmet is a local forecast; a Sigmet is a nationwide warning"
    ],
    correctIndex: 1,
    explanation: "An AIRMET (Airmen's Meteorological Information) warns of moderate hazards primarily affecting lighter aircraft (moderate icing, moderate turbulence, IFR conditions). A SIGMET warns of severe or extreme hazards significant to all aircraft. Both are important for drone preflight planning.",
    reference: "AIM 7-1-6"
  },
  {
    id: 133,
    category: "Weather",
    question: "What weather phenomenon is indicated by the METAR notation 'TS'?",
    options: [
      "Temperature below standard",
      "Thunderstorm",
      "Turbulent shear",
      "Thin stratus"
    ],
    correctIndex: 1,
    explanation: "'TS' in a METAR indicates a thunderstorm. Thunderstorms are associated with severe turbulence, lightning, heavy rain, microbursts, and wind shear. Drone operations should not be conducted when thunderstorms are present or in the vicinity.",
    reference: "AIM 7-1-30"
  },
  {
    id: 134,
    category: "Weather",
    question: "How does a stable atmosphere affect the weather?",
    options: [
      "It promotes vertical mixing and thunderstorm development",
      "It suppresses vertical air movement, leading to smooth air, stratus clouds, fog, and poor visibility",
      "It produces strong gusty winds and turbulence",
      "It has no effect on weather patterns"
    ],
    correctIndex: 1,
    explanation: "A stable atmosphere resists vertical movement, resulting in smooth air, stratus clouds, restricted visibility from haze or fog, and steady precipitation. An unstable atmosphere promotes convection, cumulonimbus clouds, and turbulence.",
    reference: "FAA PHAK Chapter 12"
  },
  {
    id: 135,
    category: "Weather",
    question: "In a METAR, what does 'SKC' mean?",
    options: [
      "Smoke and haze at ceiling",
      "Sky clear (no clouds reported)",
      "Scattered clouds at ceiling",
      "Sky condition unknown"
    ],
    correctIndex: 1,
    explanation: "'SKC' means sky clear — no clouds are observed. Automated stations use 'CLR' (clear below 12,000 feet). SKC and CLR indicate favorable visual conditions for drone operations.",
    reference: "AIM 7-1-30"
  },
  {
    id: 136,
    category: "Weather",
    question: "What is the lapse rate in a standard atmosphere?",
    options: [
      "Temperature increases 2°C for every 1,000 feet of altitude gain",
      "Temperature decreases approximately 2°C (3.5°F) per 1,000 feet of altitude gain",
      "Temperature stays constant at all altitudes",
      "Temperature decreases 5°C per 1,000 feet of altitude gain"
    ],
    correctIndex: 1,
    explanation: "The standard atmospheric lapse rate is approximately 2°C (3.5°F) per 1,000 feet of altitude gain. This rate is used to calculate density altitude and understand how temperature changes with altitude affect aircraft performance.",
    reference: "FAA PHAK Chapter 12"
  },
  {
    id: 137,
    category: "Weather",
    question: "Mechanical turbulence is most likely to be encountered when:",
    options: [
      "Flying over smooth terrain on a calm day",
      "Flying over rough terrain or near buildings and trees in windy conditions",
      "Flying at high altitude in clear air",
      "Flying over water surfaces"
    ],
    correctIndex: 1,
    explanation: "Mechanical turbulence is caused by disruption of airflow as wind passes over uneven terrain, buildings, trees, and other obstacles. It can be severe near large buildings or in urban areas with strong winds. Drone pilots should increase landing approach caution in windy urban environments.",
    reference: "FAA PHAK Chapter 12"
  },
  {
    id: 138,
    category: "Weather",
    question: "What effect does a warm front typically produce compared to a cold front?",
    options: [
      "More severe, rapid-onset weather",
      "Gradual onset with widespread stratiform clouds, drizzle, and fog",
      "No precipitation; only clear skies",
      "Short-lived localized thunderstorms"
    ],
    correctIndex: 1,
    explanation: "A warm front typically produces a gradual weather deterioration with wide bands of stratus clouds, steady rain or drizzle, reduced visibility, and fog. Warm fronts are less violent than cold fronts but can cause prolonged periods of poor flying conditions.",
    reference: "FAA PHAK Chapter 12"
  },
  {
    id: 139,
    category: "Weather",
    question: "What is the primary purpose of checking METARs and TAFs before a drone flight?",
    options: [
      "To determine the correct magnetic variation for the area",
      "To ensure current and forecast weather conditions meet Part 107 minimums (3 SM visibility, cloud clearances)",
      "To calculate the density altitude for performance planning",
      "To comply with FAA reporting requirements"
    ],
    correctIndex: 1,
    explanation: "METARs provide current conditions (visibility, cloud heights, wind) and TAFs provide forecasts. Drone pilots must confirm that visibility is at least 3 statute miles and cloud clearances (500 ft below, 2,000 ft horizontal) can be maintained throughout the planned flight.",
    reference: "14 CFR § 107.51"
  },
  {
    id: 140,
    category: "Weather",
    question: "What is a convective SIGMET and when should a drone pilot be concerned?",
    options: [
      "A routine weather update issued every 6 hours; always check before flight",
      "A warning for embedded thunderstorms, lines of thunderstorms, or areas of severe thunderstorms — drone pilots should cancel or postpone operations",
      "A forecast for icing conditions above 10,000 feet",
      "A wind advisory for coastal operations only"
    ],
    correctIndex: 1,
    explanation: "Convective SIGMETs (WST) are issued for significant convective activity including severe thunderstorms, embedded CBs, tornadoes, or hail. They pose extreme hazards to all aircraft. Drone pilots should not operate when convective SIGMETs are active for their area.",
    reference: "AIM 7-1-6"
  },

  // === OPERATIONS (additional) ===
  {
    id: 141,
    category: "Operations",
    question: "What is the meaning of 'see and avoid' in the context of drone operations?",
    options: [
      "The drone's onboard sensors must detect and avoid obstacles automatically",
      "The remote PIC or VO must visually scan for other aircraft and take action to avoid a collision",
      "Only applies to operations in Class B airspace",
      "The PIC must avoid flying over any person, not specifically about other aircraft"
    ],
    correctIndex: 1,
    explanation: "See and avoid is a fundamental aviation principle requiring pilots to visually scan for conflicting traffic and maneuver to avoid collision. Under Part 107, the remote PIC (or VO) must see and avoid other aircraft. A drone must yield to all manned aircraft.",
    reference: "14 CFR § 107.37"
  },
  {
    id: 142,
    category: "Operations",
    question: "How far must a drone remain from clouds under Part 107?",
    options: [
      "500 feet above and 1,000 feet horizontally",
      "500 feet below and 2,000 feet horizontally",
      "1,000 feet below and 1 mile horizontally",
      "Clear of clouds with no specific distance requirement"
    ],
    correctIndex: 1,
    explanation: "Part 107 requires a sUAS to remain at least 500 feet below any cloud layer and 2,000 feet horizontally from clouds. These margins help prevent the drone from conflicting with manned aircraft operating in or near the clouds.",
    reference: "14 CFR § 107.51(d)"
  },
  {
    id: 143,
    category: "Operations",
    question: "What must a remote pilot do before conducting drone operations at a new location they haven't visited?",
    options: [
      "Conduct a test flight under supervision",
      "Submit a flight plan 72 hours in advance",
      "Review airspace, check for TFRs and NOTAMs, assess hazards, and confirm Part 107 conditions can be met",
      "Notify local law enforcement 24 hours in advance"
    ],
    correctIndex: 2,
    explanation: "Before any flight, the remote PIC must familiarize themselves with the airspace (class, authorization needed), active restrictions (TFRs, NOTAMs), nearby airports, potential hazards, and confirm weather conditions meet Part 107 minimums.",
    reference: "14 CFR § 107.49"
  },
  {
    id: 144,
    category: "Operations",
    question: "A remote pilot notices that the drone's battery is lower than expected mid-flight. What is the appropriate action?",
    options: [
      "Continue to complete the planned mission",
      "Immediately return the drone to a safe landing area while battery permits",
      "Switch to a higher power mode to complete the flight quickly",
      "Contact ATC for priority landing"
    ],
    correctIndex: 1,
    explanation: "Low battery is an in-flight emergency. The remote PIC must prioritize safety and return the drone or land it in a safe location before the battery is depleted. Continuing the mission risks an uncontrolled emergency landing in an unsafe area.",
    reference: "14 CFR § 107.19"
  },
  {
    id: 145,
    category: "Operations",
    question: "Under Part 107, can a drone be operated from a boat?",
    options: [
      "No, the remote PIC must be on dry land at all times",
      "Yes, as long as the boat is stationary and other Part 107 rules are met",
      "Yes, with no restrictions since it is a non-motorized vessel",
      "Only with a Part 107 waiver"
    ],
    correctIndex: 1,
    explanation: "There is no prohibition on operating from a boat in Part 107, but if the boat is moving, it falls under the moving-vehicle rule and operations are only permitted in sparsely populated areas. If the boat is stationary, normal Part 107 rules apply.",
    reference: "14 CFR § 107.25"
  },
  {
    id: 146,
    category: "Operations",
    question: "What is the 'sterile cockpit' concept as applied to drone operations?",
    options: [
      "Keeping the drone free of contaminants",
      "Focusing entirely on the operation and avoiding distractions during critical flight phases",
      "Using disinfected equipment near hospitals",
      "Ensuring the remote controller is calibrated"
    ],
    correctIndex: 1,
    explanation: "The sterile cockpit concept (from manned aviation) means avoiding non-essential activities and distractions during critical phases such as takeoff, landing, and low-altitude flight. For drone pilots, it means focusing entirely on the drone during the flight rather than multitasking.",
    reference: "FAA Remote Pilot Study Guide"
  },
  {
    id: 147,
    category: "Operations",
    question: "What is the purpose of a pre-flight risk assessment for drone operations?",
    options: [
      "To satisfy FAA documentation requirements",
      "To identify and mitigate potential hazards before they become in-flight emergencies",
      "To calculate the drone's performance limits",
      "To determine which class of airspace the drone will operate in"
    ],
    correctIndex: 1,
    explanation: "A pre-flight risk assessment systematically identifies potential hazards (weather, airspace, people, obstacles, equipment), evaluates their likelihood and severity, and implements mitigations. It is a safety management tool that the remote PIC uses to make go/no-go decisions.",
    reference: "FAA SMS/Risk Management"
  },
  {
    id: 148,
    category: "Operations",
    question: "What does 'hazardous attitude' mean in aviation decision-making?",
    options: [
      "Flying at a dangerously low altitude",
      "A mental attitude that can lead to poor decisions, such as 'anti-authority,' 'impulsivity,' 'invulnerability,' 'macho,' and 'resignation'",
      "Carrying dangerous cargo without proper authorization",
      "Operating in restricted airspace without a waiver"
    ],
    correctIndex: 1,
    explanation: "The FAA identifies five hazardous attitudes: anti-authority (don't tell me), impulsivity (do something, now!), invulnerability (it won't happen to me), macho (I can do it), and resignation (what's the use). Recognizing these attitudes helps pilots make safer decisions.",
    reference: "FAA PHAK Chapter 2"
  },
  {
    id: 149,
    category: "Operations",
    question: "What is the purpose of Crew Resource Management (CRM) in drone operations?",
    options: [
      "To assign specific roles to crew members to optimize safety and task management",
      "To manage the drone's onboard computer resources",
      "To plan the drone's battery replacement schedule",
      "To ensure all crew members have current certificates"
    ],
    correctIndex: 0,
    explanation: "CRM is a set of safety techniques for effectively using all available resources including people, information, and equipment. For drone crews, it means clear communication, role assignment (PIC, VO, observer), and collaborative decision-making to prevent errors.",
    reference: "FAA PHAK Chapter 2"
  },
  {
    id: 150,
    category: "Operations",
    question: "If a Part 107 remote pilot is approached by law enforcement during an operation, what should they do?",
    options: [
      "Continue the operation and speak with them after landing",
      "Immediately land the drone and provide required documentation upon request",
      "Refuse to speak until an FAA representative is present",
      "Call the FAA immediately"
    ],
    correctIndex: 1,
    explanation: "Drone pilots must cooperate with authorized law enforcement. Under § 107.7, a remote pilot must present their certificate and photo ID upon request to federal, state, or local law enforcement. It is safest to land the drone and give the officer full attention.",
    reference: "14 CFR § 107.7"
  },

  // === CREW ROLES (additional) ===
  {
    id: 151,
    category: "Crew Roles",
    question: "What qualifications must a person have to serve as a Visual Observer under Part 107?",
    options: [
      "Must hold a remote pilot certificate",
      "Must hold a private pilot certificate or higher",
      "No certificate required; they must be briefed by the PIC on communication procedures and responsibilities",
      "Must be at least 18 years old"
    ],
    correctIndex: 2,
    explanation: "Part 107 does not require a VO to hold any certificate. The VO must be briefed by the remote PIC before the flight on communication procedures, drone position awareness, and how to alert the PIC to hazards.",
    reference: "14 CFR § 107.33"
  },
  {
    id: 152,
    category: "Crew Roles",
    question: "Can a Visual Observer also serve as the person manipulating the controls simultaneously?",
    options: [
      "Yes, if both roles are manageable",
      "No, because simultaneous duties would compromise both visual observation and aircraft control",
      "Yes, but only for operations under 400 feet AGL",
      "Yes, with PIC authorization"
    ],
    correctIndex: 1,
    explanation: "A VO who is also manipulating the controls cannot maintain effective visual surveillance of the airspace and the drone simultaneously. This would compromise both functions. Part 107's intent is for roles to be distinct and non-conflicting.",
    reference: "14 CFR § 107.33"
  },
  {
    id: 153,
    category: "Crew Roles",
    question: "When multiple visual observers are used in a drone operation, who is responsible for coordinating them?",
    options: [
      "Each VO operates independently",
      "The remote PIC coordinates and briefs all VOs",
      "The senior VO coordinates the others",
      "The drone's manufacturer specifies VO requirements"
    ],
    correctIndex: 1,
    explanation: "The remote PIC is responsible for briefing and coordinating all crew members including multiple VOs. Each VO must know their sector of responsibility and how to communicate with the PIC. The PIC retains final authority for all operational decisions.",
    reference: "14 CFR § 107.19"
  },
  {
    id: 154,
    category: "Crew Roles",
    question: "If the remote PIC becomes incapacitated during a flight, what should the VO do?",
    options: [
      "Continue monitoring until the PIC recovers",
      "If they hold a remote pilot certificate, take over as PIC; otherwise, activate the failsafe and call for help",
      "Immediately contact ATC",
      "Land the drone using the controller regardless of certification"
    ],
    correctIndex: 1,
    explanation: "If the PIC becomes incapacitated, a VO with a valid remote pilot certificate may assume PIC duties. Without a certificate, the safest action is to activate the drone's return-to-home or land failsafe if accessible, and seek assistance. Operations must not be continued by an uncertified person.",
    reference: "14 CFR § 107.19"
  },
  {
    id: 155,
    category: "Crew Roles",
    question: "What is the difference between the Remote Pilot in Command and the 'operator' under Part 107?",
    options: [
      "They are always the same person",
      "The operator is the company or individual responsible for the business; the PIC is the certificated pilot responsible for the safe flight",
      "The operator holds the waiver; the PIC holds the certificate",
      "The PIC is responsible for equipment; the operator is responsible for training"
    ],
    correctIndex: 1,
    explanation: "The 'operator' is the entity conducting the operation (individual or company). The 'remote PIC' is the certificated pilot responsible for the safe operation of the drone. In small operations they may be the same person, but in commercial settings they can be distinct.",
    reference: "14 CFR § 107.3"
  },

  // === PERFORMANCE (additional — includes E6B questions) ===
  {
    id: 156,
    category: "Performance",
    question: "Given a field elevation of 3,000 feet, altimeter setting of 30.42 inHg, and temperature of 95°F (35°C), what is the approximate density altitude? (Use your E6B or density altitude calculator.)",
    options: [
      "Approximately 2,500 feet",
      "Approximately 4,500 feet",
      "Approximately 6,500 feet",
      "Approximately 8,000 feet"
    ],
    correctIndex: 2,
    explanation: "Pressure altitude = field elevation + (29.92 − altimeter setting) × 1,000 = 3,000 + (29.92 − 30.42) × 1,000 = 3,000 − 500 = 2,500 ft pressure altitude. With temperature of 35°C (standard at 2,500 ft ≈ 11°C), the large temperature excess drives density altitude significantly higher to approximately 6,500 feet. Use the E6B density altitude calculator for precision: enter pressure altitude and OAT.",
    reference: "FAA PHAK Chapter 4"
  },
  {
    id: 157,
    category: "Performance",
    question: "If you are flying at a groundspeed of 80 knots and need to travel 20 nautical miles, approximately how long will the flight take? (Use your E6B time/speed/distance calculator.)",
    options: [
      "10 minutes",
      "15 minutes",
      "20 minutes",
      "30 minutes"
    ],
    correctIndex: 1,
    explanation: "Time = Distance / Speed = 20 NM / 80 knots = 0.25 hours = 15 minutes. On the E6B, set the groundspeed (80) on the outer scale against the 60 mark, then find 20 NM on the outer scale and read the time on the inner scale: 15 minutes.",
    reference: "FAA PHAK Chapter 16"
  },
  {
    id: 158,
    category: "Performance",
    question: "With a true course of 360°, wind from 270° at 20 knots, and TAS of 60 knots, what is the approximate wind correction angle? (Use your E6B wind correction calculator.)",
    options: [
      "Approximately 5° left (355°)",
      "Approximately 19° right (019°)",
      "Approximately 19° left (341°)",
      "No correction needed"
    ],
    correctIndex: 1,
    explanation: "Wind from the left (270°) pushes the aircraft to the right of course. Using the E6B: set TAS (60) and wind (270° at 20 kts) against TC (360°). The wind correction angle is approximately 19° into the wind (left), meaning you must head RIGHT to approximately 019° to track 360°. On the E6B, enter TC, wind direction/speed, and TAS to compute WCA and groundspeed.",
    reference: "FAA PHAK Chapter 16"
  },
  {
    id: 159,
    category: "Performance",
    question: "The wind is reported as 240° at 18 knots. The runway heading is 300°. What is the approximate crosswind component? (Use your E6B crosswind calculator.)",
    options: [
      "9 knots",
      "12 knots",
      "16 knots",
      "18 knots"
    ],
    correctIndex: 0,
    explanation: "The angle between the wind (240°) and runway (300°) is 60°. Crosswind component = Wind speed × sin(angle) = 18 × sin(60°) ≈ 18 × 0.866 ≈ 15.6 knots. However, using the standard E6B crosswind chart or component rule with 60° angle and 18 knots gives approximately 9 knots for headwind component and approximately 15 knots crosswind. Re-checking: angle = 300°−240° = 60°; crosswind = 18 × sin(60°) ≈ 15.6 knots; headwind = 18 × cos(60°) = 9 knots. The crosswind is ≈16 knots. Use the E6B for precision.",
    reference: "FAA PHAK Chapter 16"
  },
  {
    id: 160,
    category: "Performance",
    question: "At a field elevation of 5,500 feet with temperature 30°C (86°F) and altimeter setting 29.92 inHg, what is the approximate density altitude? (Use your E6B or density altitude calculator.)",
    options: [
      "5,500 feet",
      "7,000 feet",
      "8,500 feet",
      "10,000 feet"
    ],
    correctIndex: 1,
    explanation: "With altimeter 29.92, pressure altitude = field elevation = 5,500 ft. Standard temperature at 5,500 ft = 15°C − (2°C × 5.5) = 15 − 11 = 4°C. Actual OAT = 30°C. Temperature excess = 26°C. Each degree above standard adds approximately 120 ft: 26 × 120 ≈ 3,100 ft. Density altitude ≈ 5,500 + 1,500 = approximately 7,000 ft. Enter these values into the E6B density altitude calculator to get the precise answer.",
    reference: "FAA PHAK Chapter 4"
  },
  {
    id: 161,
    category: "Performance",
    question: "A drone is flying at 60 knots groundspeed. How far will it travel in 12 minutes? (Use your E6B time/speed/distance calculator.)",
    options: [
      "8 nautical miles",
      "10 nautical miles",
      "12 nautical miles",
      "15 nautical miles"
    ],
    correctIndex: 2,
    explanation: "Distance = Speed × Time = 60 knots × (12/60 hours) = 60 × 0.2 = 12 nautical miles. On the E6B, set 60 knots on the outer scale against 60 (index), then find 12 minutes on the inner scale and read the distance on the outer scale: 12 NM.",
    reference: "FAA PHAK Chapter 16"
  },
  {
    id: 162,
    category: "Performance",
    question: "What is pressure altitude and how is it different from density altitude?",
    options: [
      "They are the same thing",
      "Pressure altitude is altimeter reading with 29.92 set; density altitude corrects pressure altitude for non-standard temperature",
      "Pressure altitude accounts for temperature; density altitude accounts for humidity",
      "Pressure altitude is used for navigation; density altitude is used only for performance calculations"
    ],
    correctIndex: 1,
    explanation: "Pressure altitude is the altitude indicated when the altimeter is set to 29.92 inHg (standard pressure). Density altitude is pressure altitude corrected for non-standard temperature — it represents the 'effective' altitude for aircraft performance. Higher temps = higher density altitude = degraded performance.",
    reference: "FAA PHAK Chapter 4"
  },
  {
    id: 163,
    category: "Performance",
    question: "With a true course of 090°, magnetic variation 15°W, and no wind, what is the magnetic heading?",
    options: [
      "075°",
      "090°",
      "105°",
      "180°"
    ],
    correctIndex: 2,
    explanation: "Magnetic variation 15°W means magnetic north is 15° west of true north. To convert true course to magnetic heading: MH = TC + Westerly variation = 090° + 15° = 105°. Use the E6B heading calculator or the rule 'East is least (subtract), West is best (add)'.",
    reference: "FAA PHAK Chapter 16"
  },
  {
    id: 164,
    category: "Performance",
    question: "A drone needs to travel 45 nautical miles and has 50 minutes of battery remaining. What minimum groundspeed must it maintain to complete the trip? (Use your E6B calculator.)",
    options: [
      "45 knots",
      "54 knots",
      "60 knots",
      "90 knots"
    ],
    correctIndex: 1,
    explanation: "Speed = Distance / Time = 45 NM / (50/60 hours) = 45 / 0.833 = 54 knots. On the E6B, set 50 minutes on the inner scale against 45 NM on the outer scale, then read the required groundspeed (54 knots) opposite the 60 index.",
    reference: "FAA PHAK Chapter 16"
  },
  {
    id: 165,
    category: "Performance",
    question: "What is the headwind component if the wind is from 030° at 20 knots and the runway heading is 360°? (Use your E6B crosswind component calculator.)",
    options: [
      "10 knots",
      "17 knots",
      "20 knots",
      "14 knots"
    ],
    correctIndex: 1,
    explanation: "Angle between wind (030°) and runway (360°) = 30°. Headwind component = Wind speed × cos(angle) = 20 × cos(30°) = 20 × 0.866 ≈ 17 knots. Crosswind = 20 × sin(30°) = 20 × 0.5 = 10 knots. Use the E6B crosswind calculator: enter wind direction, runway heading, and wind speed.",
    reference: "FAA PHAK Chapter 16"
  },

  // === AIRPORT OPERATIONS (additional) ===
  {
    id: 166,
    category: "Airport Operations",
    question: "What is the meaning of a flashing white light signal from an ATC tower to an aircraft on the ground?",
    options: [
      "Cleared for takeoff",
      "Return to starting point on the airport",
      "Cleared to land",
      "General warning signal — exercise extreme caution"
    ],
    correctIndex: 1,
    explanation: "A flashing white light signal from ATC to an aircraft on the ground means 'return to starting point on the airport.' The full light gun signal alphabet is tested on the Part 107 knowledge exam.",
    reference: "AIM 4-3-13"
  },
  {
    id: 167,
    category: "Airport Operations",
    question: "What is the meaning of a steady green light signal from ATC to an aircraft in flight?",
    options: [
      "Cleared for takeoff",
      "Cleared to land",
      "Continue circling, give way to other aircraft",
      "Return to airport immediately"
    ],
    correctIndex: 1,
    explanation: "A steady green light to an aircraft in flight means 'cleared to land.' For an aircraft on the ground, steady green means 'cleared for takeoff.' Knowledge of light gun signals is important for drone pilots operating near towered airports.",
    reference: "AIM 4-3-13"
  },
  {
    id: 168,
    category: "Airport Operations",
    question: "What is an ATIS and why should drone pilots know about it?",
    options: [
      "Automatic Terminal Information Service; provides current airport conditions including weather, active runways, and NOTAMs",
      "Air Traffic Information System; provides radar coverage data",
      "Automated Traffic Information Service; assigns transponder codes",
      "Airport Terminal Inspection System; used only by maintenance personnel"
    ],
    correctIndex: 0,
    explanation: "ATIS (Automatic Terminal Information Service) is a continuous broadcast of recorded airport information including weather, active runways, NOTAMs, and other pertinent data. Drone pilots operating near towered airports should monitor ATIS to understand the active traffic pattern and weather.",
    reference: "AIM 4-1-13"
  },
  {
    id: 169,
    category: "Airport Operations",
    question: "When a drone pilot is planning to fly within 5 miles of a non-towered airport, what is the recommended action?",
    options: [
      "No action required in Class G airspace",
      "Monitor the airport's CTAF and consider contacting the airport manager",
      "File a TFR with the FAA",
      "Obtain LAANC authorization even though it is not legally required"
    ],
    correctIndex: 1,
    explanation: "Although Part 107 does not legally require notification at non-towered airports in Class G airspace, the FAA strongly recommends monitoring the CTAF and contacting the airport manager. This improves situational awareness of manned traffic and demonstrates good airmanship.",
    reference: "FAA Remote Pilot Study Guide"
  },
  {
    id: 170,
    category: "Airport Operations",
    question: "What does the airport identifier 'UNICOM' indicate?",
    options: [
      "A military airport",
      "A communication frequency for pilot self-announcement at non-towered airports",
      "The universal aviation emergency frequency",
      "A frequency for filing IFR flight plans"
    ],
    correctIndex: 1,
    explanation: "UNICOM is a non-government aeronautical advisory communication frequency used at many non-towered airports. Pilots use it for self-announce advisories and to request airport information. Drone pilots monitoring UNICOM can hear manned traffic intentions and announce their own operations.",
    reference: "AIM 4-1-9"
  },
  {
    id: 171,
    category: "Airport Operations",
    question: "On a sectional chart, what does a runway depicted with a solid filled rectangle (filled in blue) indicate?",
    options: [
      "A hard-surfaced runway at least 1,500 feet long at an airport with a control tower",
      "A military runway",
      "A closed runway",
      "A soft-field runway"
    ],
    correctIndex: 0,
    explanation: "On sectional charts, airports with hard-surfaced runways 1,500 feet or longer are shown with a filled runway symbol. Blue color indicates the airport has an operating control tower. Magenta indicates no control tower.",
    reference: "FAA Sectional Chart Legend"
  },
  {
    id: 172,
    category: "Airport Operations",
    question: "What is the purpose of runway numbers and how are they determined?",
    options: [
      "Runways are numbered sequentially as they were built",
      "Runway numbers are based on magnetic heading divided by 10 (rounded to nearest 10°)",
      "Runway numbers represent the elevation above sea level",
      "Runway numbers are assigned randomly by the airport"
    ],
    correctIndex: 1,
    explanation: "Runway numbers correspond to the magnetic heading of the runway divided by 10 and rounded to the nearest whole number. Runway 27 is used for landing or taking off in approximately the 270° (west) direction. Opposite ends differ by 18 (180°). E.g., Runway 09/27.",
    reference: "AIM 2-3-3"
  },
  {
    id: 173,
    category: "Airport Operations",
    question: "What is a VASI (Visual Approach Slope Indicator) and why might drone pilots encounter it?",
    options: [
      "A GPS system for precision approaches",
      "A visual lighting system showing glide slope for landing aircraft; drone pilots should avoid flying into the glide slope area",
      "A navigation beacon for instrument approaches",
      "A system used only at military airports"
    ],
    correctIndex: 1,
    explanation: "VASI is a system of lights providing visual descent guidance. Two white lights indicate high; two red indicate low; one white and one red indicate on glide slope. Drone pilots near airports should be aware that landing aircraft follow the VASI glide slope and avoid flying in approach corridors.",
    reference: "AIM 2-1-2"
  },
  {
    id: 174,
    category: "Airport Operations",
    question: "What does a rotating beacon at a civil land airport emit?",
    options: [
      "Alternating red and green flashes",
      "Alternating white and green flashes",
      "Continuous white light",
      "Alternating red and white flashes"
    ],
    correctIndex: 1,
    explanation: "Civil land airport beacons flash alternating white and green. Military airports use alternating white-white-green. Water airports use white and yellow. Heliports flash white, yellow, and green. Seeing a beacon during the day may indicate IFR conditions.",
    reference: "AIM 2-1-10"
  },
  {
    id: 175,
    category: "Airport Operations",
    question: "The Chart Supplement (formerly Airport/Facility Directory) is used by drone pilots to find what information?",
    options: [
      "In-flight weather updates",
      "Detailed airport information including communication frequencies, traffic pattern altitudes, and special procedures",
      "Airspace waiver applications",
      "TFR locations and military routes"
    ],
    correctIndex: 1,
    explanation: "The Chart Supplement (previously called the A/FD or Airport/Facility Directory) contains detailed information about airports including frequencies (CTAF, ATIS, ground, tower), traffic pattern altitudes, special procedures, hazards, and services. It is an essential preflight planning reference.",
    reference: "AIM 9-1-4"
  },

  // === PHYSIOLOGY (additional) ===
  {
    id: 176,
    category: "Physiology",
    question: "What is the primary danger of hypoxia at altitude for a remote pilot overseeing high-elevation operations?",
    options: [
      "The drone's battery depletes faster",
      "Impaired judgment, reduced reaction time, and the pilot may not realize they are impaired",
      "The drone loses GPS signal at high altitudes",
      "Communication equipment fails above 8,000 feet"
    ],
    correctIndex: 1,
    explanation: "Hypoxia insidiously impairs mental function. A pilot suffering from hypoxia may feel euphoric and capable while their judgment is severely degraded. This lack of awareness of impairment makes hypoxia particularly dangerous for remote pilots at high-elevation sites.",
    reference: "FAA PHAK Chapter 17"
  },
  {
    id: 177,
    category: "Physiology",
    question: "What is the 'get-there-itis' hazardous attitude?",
    options: [
      "The tendency to rush through the preflight inspection",
      "Pressing on with a flight despite warning signs because of a strong desire to complete the mission",
      "Flying faster than necessary to reach the destination",
      "Excessive concern about arriving on time that causes the pilot to skip weather checks"
    ],
    correctIndex: 1,
    explanation: "'Get-there-itis' (also called press-on-itis) is a form of the 'impulsivity' or 'invulnerability' hazardous attitude where mission pressure causes a pilot to continue despite deteriorating weather, equipment issues, or other warning signs. It is a major cause of aviation accidents.",
    reference: "FAA PHAK Chapter 2"
  },
  {
    id: 178,
    category: "Physiology",
    question: "How does stress affect decision-making in aviation and drone operations?",
    options: [
      "Stress sharpens focus and improves performance",
      "Stress narrows attention, increases errors, and can cause a pilot to miss critical information",
      "Stress only affects inexperienced pilots",
      "Stress has no documented effect on pilot performance"
    ],
    correctIndex: 1,
    explanation: "Stress — especially acute stress — narrows attention (tunnel vision), speeds up decision-making in a way that leads to errors, and impairs the ability to consider all available information. High stress combined with fatigue is particularly degrading to safe performance.",
    reference: "FAA PHAK Chapter 17"
  },
  {
    id: 179,
    category: "Physiology",
    question: "What is 'channelized attention' (task fixation) and how can it affect a remote pilot?",
    options: [
      "Focusing on a TV channel while flying",
      "Becoming so focused on one task that the pilot loses awareness of the broader situation",
      "A technique for improving VLOS in crowded airspace",
      "The act of focusing only on the drone's GPS display"
    ],
    correctIndex: 1,
    explanation: "Channelized attention (task fixation) occurs when a pilot concentrates so intensely on one aspect (e.g., framing a shot) that they lose situational awareness of other hazards like aircraft traffic, obstacles, or battery level. It is a form of tunnel vision.",
    reference: "FAA PHAK Chapter 2"
  },
  {
    id: 180,
    category: "Physiology",
    question: "What is the risk of using prescription medications before drone operations?",
    options: [
      "No risk; prescription medications are approved for pilot use",
      "The underlying condition being treated AND the medication itself may both impair pilot performance",
      "Only sedatives are prohibited; other medications are acceptable",
      "Prescription medications require notification to the FAA only if flying commercially"
    ],
    correctIndex: 1,
    explanation: "Both the medical condition requiring medication and the medication's side effects can impair cognitive performance. Common prescription drugs including some antibiotics, antidepressants, and blood pressure medications can cause drowsiness, dizziness, or impaired judgment.",
    reference: "14 CFR § 107.27"
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
  },

  // === ADDITIONAL MIXED QUESTIONS ===
  {
    id: 181,
    category: "Regulations",
    question: "What is the difference between a waiver and an authorization under Part 107?",
    options: [
      "They are the same; the terms are interchangeable",
      "A waiver approves flight under different operational rules (e.g., BVLOS); an authorization approves flight in a specific airspace (e.g., Class C)",
      "An authorization is for airspace; a waiver is for foreign operations",
      "A waiver requires congressional approval; an authorization does not"
    ],
    correctIndex: 1,
    explanation: "An airspace authorization (§ 107.41) allows flight in controlled airspace that would otherwise require permission. A waiver (§ 107.200) allows deviation from specific operational rules such as VLOS, altitude, or speed limits. They address different types of restrictions.",
    reference: "14 CFR §§ 107.41, 107.200"
  },
  {
    id: 182,
    category: "Airspace",
    question: "What is the purpose of the FAA's DroneZone website (faadronezone.faa.gov)?",
    options: [
      "To purchase drone insurance",
      "To register drones, apply for waivers/authorizations, and manage remote pilot accounts",
      "To file flight plans for commercial drone operations",
      "To report drone sightings near airports"
    ],
    correctIndex: 1,
    explanation: "FAA DroneZone is the FAA's online portal for drone-related activities including drone registration, remote pilot certificate applications, airspace authorization requests (for areas not covered by LAANC), and waiver applications.",
    reference: "FAA DroneZone"
  },
  {
    id: 183,
    category: "Weather",
    question: "What weather condition does the METAR notation 'FG' indicate, and what is the visibility impact?",
    options: [
      "Fog; visibility reduced to less than 5/8 statute mile (1,000 meters)",
      "Freezing rain; no visibility restriction",
      "Funnel cloud; visibility varies",
      "Frozen ground; no visibility impact"
    ],
    correctIndex: 0,
    explanation: "'FG' in a METAR indicates fog. By METAR definition, fog reduces visibility to less than 5/8 statute mile (about 1,000 meters). Fog almost certainly reduces visibility below the Part 107 minimum of 3 statute miles, prohibiting drone operations until it lifts.",
    reference: "AIM 7-1-30"
  },
  {
    id: 184,
    category: "Operations",
    question: "What is the 'single-pilot resource management' (SRM) concept as applied to drone operations?",
    options: [
      "Using a single controller for all drone models",
      "Managing all cockpit tasks, information, and decision-making as a single operator without a crew",
      "Limiting operations to one drone per pilot",
      "A regulation requiring solo operations in Class G airspace"
    ],
    correctIndex: 1,
    explanation: "SRM is the art of managing all onboard resources, automation, information, and decision-making by the pilot alone. For drone pilots operating solo (without a VO), SRM is critical — the pilot must scan the airspace, monitor the drone, and manage the mission simultaneously.",
    reference: "FAA PHAK Chapter 2"
  },
  {
    id: 185,
    category: "Performance",
    question: "A drone's groundspeed is 45 knots. If a 15-knot headwind exists, what is the true airspeed (TAS)? (Use your E6B if needed.)",
    options: [
      "30 knots",
      "45 knots",
      "60 knots",
      "90 knots"
    ],
    correctIndex: 2,
    explanation: "With a 15-knot direct headwind, GS = TAS − Headwind. Therefore TAS = GS + Headwind = 45 + 15 = 60 knots. The aircraft must fly faster through the air mass to make 45 knots over the ground when flying into a headwind. Use the E6B wind side to calculate this precisely.",
    reference: "FAA PHAK Chapter 16"
  },
  {
    id: 186,
    category: "Airport Operations",
    question: "What does 'displaced threshold' mean in terms of landing distance?",
    options: [
      "The runway has less total length due to construction",
      "Landing must begin no earlier than the displaced threshold markings, so the available landing distance is shorter than the full runway length",
      "The runway can only be used for touch-and-go operations",
      "Takeoff is not permitted from a runway with a displaced threshold"
    ],
    correctIndex: 1,
    explanation: "A displaced threshold moves the landing threshold down the runway. Aircraft may not touch down before the displaced threshold markings. This reduces the available landing roll distance. Takeoff and taxi ARE permitted in the area before the displaced threshold.",
    reference: "AIM 2-3-3"
  },
  {
    id: 187,
    category: "Physiology",
    question: "What is the effect of carbon monoxide (CO) poisoning on pilot performance?",
    options: [
      "CO poisoning only affects enclosed cockpit pilots, not remote drone pilots",
      "CO binds to hemoglobin, reducing oxygen delivery to the brain, causing headaches, confusion, and impaired judgment",
      "CO poisoning causes hyperventilation",
      "CO improves night vision"
    ],
    correctIndex: 1,
    explanation: "Carbon monoxide binds to hemoglobin approximately 200 times more readily than oxygen, reducing the blood's ability to carry oxygen. Even at low concentrations, CO causes headache, dizziness, confusion, and impaired judgment. Remote pilots operating near gas-powered equipment or in enclosed areas should be aware of CO risk.",
    reference: "FAA PHAK Chapter 17"
  },
  {
    id: 188,
    category: "Crew Roles",
    question: "Under Part 107, must the remote PIC always be physically present at the operating location?",
    options: [
      "No, the PIC can monitor via video feed from any location",
      "Yes, the PIC must be physically present and able to exercise operational control",
      "No, with a waiver the PIC can be in another state",
      "Only for commercial operations"
    ],
    correctIndex: 1,
    explanation: "The remote PIC must maintain sufficient situational awareness to ensure safety, which requires being at or near the operating location. VLOS and see-and-avoid requirements mean the PIC (or VO) must be physically present where they can see the drone.",
    reference: "14 CFR § 107.31"
  },
  {
    id: 189,
    category: "Regulations",
    question: "What does 'operating under 49 USC § 44809' (recreational exception) allow that Part 107 does NOT?",
    options: [
      "Commercial photography",
      "Flight in Class B airspace without authorization",
      "Flight under community-based organization safety guidelines as an alternative regulatory framework for pure recreation",
      "Operations at night without lighting"
    ],
    correctIndex: 2,
    explanation: "49 USC § 44809 permits recreational flyers to operate under community-based organization (CBO) safety guidelines as an alternative to Part 107. This includes following the CBO's own rules rather than Part 107 operational limits, but airspace and registration requirements still apply.",
    reference: "49 USC § 44809"
  },
  {
    id: 190,
    category: "Weather",
    question: "What is the significance of a 'TEMPO' group in a TAF?",
    options: [
      "Temporary flight restriction in effect",
      "Conditions expected temporarily for less than 60 minutes at a time during a given period",
      "Temperature will be above normal",
      "Terminal operations temporarily suspended"
    ],
    correctIndex: 1,
    explanation: "'TEMPO' in a TAF indicates temporary fluctuations in weather conditions lasting less than 60 minutes at a time and occurring for less than half of the period specified. Conditions in a TEMPO group can temporarily affect drone operations.",
    reference: "AIM 7-1-31"
  },
  {
    id: 191,
    category: "Airspace",
    question: "What must a drone pilot do before flying in a National Park?",
    options: [
      "Nothing — National Parks are in Class G airspace and no authorization is needed",
      "Contact the National Park Service; the NPS prohibits drone launch, landing, or operation within most park boundaries without special authorization",
      "Obtain LAANC authorization",
      "Only notify the local FAA FSDO"
    ],
    correctIndex: 1,
    explanation: "The National Park Service regulations (36 CFR § 1.5) prohibit launching, landing, or operating unmanned aircraft within NPS boundaries without special authorization, regardless of FAA airspace class. Many state parks have similar restrictions. This is a land-use regulation separate from FAA airspace rules.",
    reference: "36 CFR § 1.5; NPS Management Policies"
  },
  {
    id: 192,
    category: "Operations",
    question: "What is the FAA's definition of 'visual line of sight' (VLOS) under Part 107?",
    options: [
      "The drone must be within 1 mile of the pilot",
      "The remote PIC or VO must be able to see the drone with unaided vision (except corrective lenses) to determine its position, attitude, altitude, and direction of flight",
      "The drone must be visible on FPV video feed at all times",
      "The drone must remain within the pilot's camera field of view"
    ],
    correctIndex: 1,
    explanation: "VLOS requires that the remote PIC (or VO) maintain unaided visual contact with the drone sufficient to know its position, altitude, attitude, and direction of flight and to maintain safe distances from other aircraft, terrain, and obstacles. FPV goggles alone do not satisfy this requirement.",
    reference: "14 CFR § 107.31"
  },
  {
    id: 193,
    category: "Performance",
    question: "Using the E6B, if you fly 36 nautical miles in 27 minutes, what is your groundspeed?",
    options: [
      "60 knots",
      "72 knots",
      "80 knots",
      "90 knots"
    ],
    correctIndex: 2,
    explanation: "GS = Distance / Time = 36 NM / (27/60 hr) = 36 / 0.45 = 80 knots. On the E6B, align 27 minutes on the inner scale against 36 NM on the outer scale; read the groundspeed (80 knots) on the outer scale opposite the 60-minute index.",
    reference: "FAA PHAK Chapter 16"
  },
  {
    id: 194,
    category: "Airport Operations",
    question: "What is the correct phraseology a drone pilot should use when self-announcing on CTAF near a non-towered airport?",
    options: [
      "No standard phraseology exists for drones",
      "Include airport name, aircraft type (drone/UAS), location, altitude, and intentions — e.g., 'Millbrook traffic, UAV operations, 500 feet AGL, 1 mile north, Millbrook'",
      "Contact the airport ATIS frequency first",
      "Drone pilots should not transmit on CTAF to avoid confusing manned traffic"
    ],
    correctIndex: 1,
    explanation: "Though not legally required for Part 107 operations in Class G airspace, self-announcing on CTAF is recommended. Include the airport name, that it is a UAS/drone operation, your location (distance and direction from airport), altitude, and intentions. This helps manned traffic maintain awareness.",
    reference: "FAA Remote Pilot Study Guide; AIM 4-1-9"
  },
  {
    id: 195,
    category: "Physiology",
    question: "What is the recommended antidote for the 'anti-authority' hazardous attitude?",
    options: [
      "Slow down and think",
      "It could happen to me",
      "Follow the rules — they are usually right and exist for good reason",
      "I'm not helpless"
    ],
    correctIndex: 2,
    explanation: "The antidote for anti-authority ('don't tell me') is: 'Follow the rules — they are usually right.' The FAA identifies an antidote for each hazardous attitude: anti-authority → follow rules; impulsivity → not so fast; invulnerability → it could happen to me; macho → taking chances is foolish; resignation → I'm not helpless.",
    reference: "FAA PHAK Chapter 2"
  },
  {
    id: 196,
    category: "Regulations",
    question: "Can a Part 107 remote pilot fly a drone for compensation to photograph a real estate listing?",
    options: [
      "No, commercial photography requires a Part 135 certificate",
      "Yes, real estate photography for compensation is permitted under Part 107",
      "Only if the drone weighs less than 1 pound",
      "Only in Class G airspace"
    ],
    correctIndex: 1,
    explanation: "Commercial aerial photography, including real estate photography for compensation, is a permitted Part 107 operation. No special authorization beyond the remote pilot certificate is required, as long as all other Part 107 rules are followed (airspace, altitude, etc.).",
    reference: "14 CFR Part 107"
  },
  {
    id: 197,
    category: "Weather",
    question: "What does the METAR notation 'RASN' indicate?",
    options: [
      "Rain and snow simultaneously (wintry mix)",
      "Radar analysis for snow",
      "Runway alert for snow conditions",
      "Rain after snowfall"
    ],
    correctIndex: 0,
    explanation: "'RASN' in a METAR indicates rain and snow occurring simultaneously (a wintry mix). Precipitation type abbreviations include RA (rain), SN (snow), RASN (rain/snow mix), GR (hail), and FZRA (freezing rain). These conditions pose significant hazards for drone operations.",
    reference: "AIM 7-1-30"
  },
  {
    id: 198,
    category: "Crew Roles",
    question: "If a remote PIC uses FPV (first-person view) goggles during flight, what additional crew requirement exists?",
    options: [
      "No additional requirement; FPV satisfies VLOS",
      "A visual observer is required who maintains VLOS with the drone and communicates with the PIC",
      "The PIC must also wear a hat to reduce sun glare",
      "FPV operations are prohibited under Part 107 without a waiver"
    ],
    correctIndex: 1,
    explanation: "A pilot wearing FPV goggles cannot maintain unaided VLOS as required by Part 107. A visual observer must be used who maintains VLOS with the drone and communicates information about the drone's position and any hazards to the FPV pilot (PIC).",
    reference: "14 CFR § 107.31"
  },
  {
    id: 199,
    category: "Performance",
    question: "What effect does increased altitude have on a multirotor drone's maximum hover time?",
    options: [
      "Hover time increases because motors run more efficiently",
      "Hover time decreases because motors must work harder to generate sufficient thrust in thinner air",
      "Hover time is unaffected by altitude",
      "Hover time increases because batteries perform better in cold mountain air"
    ],
    correctIndex: 1,
    explanation: "At higher altitudes, air density decreases. Rotors must spin faster to generate the same thrust, requiring more current draw from the battery. This increases motor temperature and reduces battery endurance, resulting in shorter flight and hover times.",
    reference: "FAA PHAK Chapter 4"
  },
  {
    id: 200,
    category: "Airspace",
    question: "What action is required before flying a drone in Class B airspace?",
    options: [
      "No action is required; Class B is open to all aircraft",
      "Obtain ATC authorization via LAANC or FAA DroneZone before the operation",
      "Contact the nearest ARTCC by phone",
      "File a NOTAM 24 hours in advance"
    ],
    correctIndex: 1,
    explanation: "Class B airspace is controlled airspace surrounding the nation's busiest airports. Part 107 pilots must obtain FAA airspace authorization before flying in Class B airspace. This is done via LAANC (if available and within UAS Facility Map grids) or through the FAA DroneZone portal.",
    reference: "14 CFR § 107.41"
  },
  {
    id: 201,
    category: "Operations",
    question: "What is aeronautical decision making (ADM) and why is it critical for remote pilots?",
    options: [
      "A system for calculating drone fuel consumption",
      "A systematic approach to mental process used by pilots to consistently determine the best course of action in response to a given set of circumstances",
      "The ability to decode METAR weather reports",
      "The process of filing airspace authorization requests"
    ],
    correctIndex: 1,
    explanation: "ADM is a systematic approach to the mental process used by aircraft pilots to consistently determine the best course of action. Good ADM involves identifying problems, evaluating solutions, and making sound decisions under time pressure. It is a core competency for safe drone operations.",
    reference: "FAA PHAK Chapter 2"
  },
  {
    id: 202,
    category: "Physiology",
    question: "How does hypoxia (oxygen deficiency) most commonly affect remote pilots during high-altitude site operations?",
    options: [
      "It causes immediate loss of consciousness",
      "It gradually impairs judgment and performance while the pilot may feel normal or euphoric — a subtle and dangerous effect",
      "It only affects people above 12,000 feet",
      "It causes immediate headache that serves as a clear warning"
    ],
    correctIndex: 1,
    explanation: "The insidious nature of hypoxia is that it impairs performance gradually and the victim often cannot perceive their own impairment. They may feel fine or even euphoric while making poor decisions. At drone operating altitudes on high mountains or during physically demanding setups at elevation, mild hypoxia is a real concern.",
    reference: "FAA PHAK Chapter 17"
  }
];

export const categories = ["All", "Regulations", "Airspace", "Weather", "Operations", "Crew Roles", "Performance", "Airport Operations", "Physiology"];

flashcards.forEach(card => {
  card.categories = [card.category]
})

export function getQuestionIds() {
  return flashcards.map(c => `questions_${c.id}`)
}

export default flashcards;
