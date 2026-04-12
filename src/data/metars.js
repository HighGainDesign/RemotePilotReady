const metarExamples = [
  {
    id: 1,
    raw: "KJFK 121856Z 31012G20KT 10SM FEW045 SCT250 22/11 A3001 RMK AO2 SLP166 T02170111",
    categories: ["Weather"],
    breakdown: [
      { field: "KJFK", label: "Station ID", explanation: "John F. Kennedy International Airport" },
      { field: "121856Z", label: "Date/Time", explanation: "12th day of the month at 18:56 Zulu (UTC) time" },
      { field: "31012G20KT", label: "Wind", explanation: "Wind from 310° (northwest) at 12 knots, gusting to 20 knots" },
      { field: "10SM", label: "Visibility", explanation: "10 statute miles visibility" },
      { field: "FEW045", label: "Clouds", explanation: "Few clouds at 4,500 feet AGL (1-2 oktas coverage)" },
      { field: "SCT250", label: "Clouds", explanation: "Scattered clouds at 25,000 feet AGL (3-4 oktas coverage)" },
      { field: "22/11", label: "Temp/Dewpoint", explanation: "Temperature 22°C, dewpoint 11°C (spread of 11°C — low moisture)" },
      { field: "A3001", label: "Altimeter", explanation: "Altimeter setting 30.01 inches of mercury" },
      { field: "RMK AO2", label: "Remarks", explanation: "Automated station with precipitation discriminator" },
      { field: "SLP166", label: "Sea Level Pressure", explanation: "Sea level pressure 1016.6 hPa" },
      { field: "T02170111", label: "Precise Temp", explanation: "Temperature 21.7°C, dewpoint 11.1°C (more precise values)" }
    ],
    questions: [
      {
        question: "What is the visibility?",
        answer: "10 statute miles",
        options: ["5 statute miles", "10 statute miles", "3 statute miles", "Unlimited"],
        correctIndex: 1,
        explanation: "The '10SM' field in the METAR indicates 10 statute miles of visibility. This well exceeds the 3 SM minimum required for Part 107 operations."
      },
      {
        question: "Is this VFR or IFR?",
        answer: "VFR",
        options: ["VFR", "IFR", "MVFR", "LIFR"],
        correctIndex: 0,
        explanation: "VFR conditions require ceiling above 3,000 feet and visibility above 5 SM. With 10 SM visibility and clouds at 4,500 and 25,000 feet, this is clearly VFR."
      },
      {
        question: "Can you fly under Part 107 in these conditions?",
        answer: "Yes — visibility exceeds 3 SM and cloud clearance requirements are met",
        options: ["Yes — visibility exceeds 3 SM and cloud clearance requirements are met", "No — winds are too high", "No — gusts make it unsafe", "Only with a waiver"],
        correctIndex: 0,
        explanation: "Visibility is 10 SM (exceeds the 3 SM minimum) and the lowest clouds are at 4,500 feet AGL (well above the required 500-foot below-cloud clearance). The gusty winds are within normal operational limits."
      }
    ]
  },
  {
    id: 2,
    raw: "KORD 121953Z 18015KT 3SM -RA BR OVC008 18/16 A2987 RMK AO2 RAB35 SLP113",
    categories: ["Weather"],
    breakdown: [
      { field: "KORD", label: "Station ID", explanation: "Chicago O'Hare International Airport" },
      { field: "121953Z", label: "Date/Time", explanation: "12th day at 19:53 Zulu time" },
      { field: "18015KT", label: "Wind", explanation: "Wind from 180° (south) at 15 knots, no gusts" },
      { field: "3SM", label: "Visibility", explanation: "3 statute miles visibility" },
      { field: "-RA", label: "Weather", explanation: "Light rain" },
      { field: "BR", label: "Weather", explanation: "Mist (visibility 5/8 SM to 6 SM)" },
      { field: "OVC008", label: "Clouds", explanation: "Overcast at 800 feet AGL (full sky coverage)" },
      { field: "18/16", label: "Temp/Dewpoint", explanation: "Temperature 18°C, dewpoint 16°C (spread of only 2°C — very humid, fog likely)" },
      { field: "A2987", label: "Altimeter", explanation: "Altimeter setting 29.87 inches of mercury (below standard)" },
      { field: "RMK AO2", label: "Remarks", explanation: "Automated station with precipitation discriminator" },
      { field: "RAB35", label: "Remarks", explanation: "Rain began at 35 minutes past the hour" },
      { field: "SLP113", label: "Sea Level Pressure", explanation: "Sea level pressure 1011.3 hPa" }
    ],
    questions: [
      {
        question: "What is the ceiling?",
        answer: "800 feet AGL (OVC008)",
        options: ["No ceiling", "800 feet AGL (OVC008)", "3,000 feet AGL", "8,000 feet AGL"],
        correctIndex: 1,
        explanation: "OVC008 means overcast sky at 800 feet AGL. An overcast (or broken) layer defines the ceiling. The '008' multiplied by 100 gives 800 feet."
      },
      {
        question: "Is this VFR or IFR?",
        answer: "IFR",
        options: ["VFR", "IFR", "MVFR", "LIFR"],
        correctIndex: 1,
        explanation: "With an 800-foot overcast ceiling and 3 SM visibility in rain, conditions are IFR (ceiling below 1,000 feet or visibility below 3 SM). The ceiling alone (800 ft) puts this firmly in IFR."
      },
      {
        question: "Can you fly a Part 107 mission in these conditions?",
        answer: "Marginal — visibility meets the 3 SM minimum but 800 ft ceiling limits operations and cloud clearance (500 ft below) would restrict you to 300 ft AGL",
        options: ["Yes, no restrictions", "Marginal — visibility meets the 3 SM minimum but 800 ft ceiling limits operations and cloud clearance (500 ft below) would restrict you to 300 ft AGL", "No — visibility is too low", "No — rain prohibits all flight"],
        correctIndex: 1,
        explanation: "Visibility at exactly 3 SM meets the legal minimum, but the 800-foot ceiling combined with the required 500-foot below-cloud clearance restricts you to 300 feet AGL maximum. Rain itself does not prohibit flight, but conditions are operationally challenging."
      }
    ]
  },
  {
    id: 3,
    raw: "KDEN 121747Z 34008KT 10SM CLR 28/M03 A3042 RMK AO2 SLP283 T02830033",
    categories: ["Weather"],
    breakdown: [
      { field: "KDEN", label: "Station ID", explanation: "Denver International Airport" },
      { field: "121747Z", label: "Date/Time", explanation: "12th day at 17:47 Zulu time" },
      { field: "34008KT", label: "Wind", explanation: "Wind from 340° (north-northwest) at 8 knots" },
      { field: "10SM", label: "Visibility", explanation: "10 statute miles visibility" },
      { field: "CLR", label: "Clouds", explanation: "Clear skies (no clouds detected below 12,000 feet)" },
      { field: "28/M03", label: "Temp/Dewpoint", explanation: "Temperature 28°C, dewpoint -3°C (very dry air, large spread of 31°C)" },
      { field: "A3042", label: "Altimeter", explanation: "Altimeter setting 30.42 inches of mercury (above standard — high pressure)" },
      { field: "RMK AO2", label: "Remarks", explanation: "Automated station with precipitation discriminator" },
      { field: "SLP283", label: "Sea Level Pressure", explanation: "Sea level pressure 1028.3 hPa" },
      { field: "T02830033", label: "Precise Temp", explanation: "Temperature 28.3°C, dewpoint -3.3°C" }
    ],
    questions: [
      {
        question: "What is the wind direction and speed?",
        answer: "340° at 8 knots",
        options: ["340° at 8 knots", "34° at 8 knots", "340° at 80 knots", "North at 34 knots"],
        correctIndex: 0,
        explanation: "The wind group '34008KT' decodes as direction 340° (first three digits) at 8 knots (next two digits). Wind direction is always in magnetic degrees from which the wind is blowing."
      },
      {
        question: "Is there a ceiling?",
        answer: "No ceiling — sky is clear",
        options: ["No ceiling — sky is clear", "12,000 feet", "Clear above 3,000 feet", "Cannot determine"],
        correctIndex: 0,
        explanation: "CLR means no clouds detected below 12,000 feet by the automated sensor. There is no ceiling, which means excellent conditions for drone operations with no cloud-clearance restrictions."
      },
      {
        question: "What might you be concerned about for drone performance here?",
        answer: "High density altitude — Denver's elevation plus high temperature means thinner air and reduced drone performance",
        options: ["Nothing, conditions are perfect", "High density altitude — Denver's elevation plus high temperature means thinner air and reduced drone performance", "Low pressure concerns", "Wind shear from dry conditions"],
        correctIndex: 1,
        explanation: "Denver sits at about 5,400 feet MSL, and the 28°C temperature significantly increases density altitude. High density altitude reduces air density, degrading rotor efficiency, battery performance, and maximum payload capacity."
      }
    ]
  },
  {
    id: 4,
    raw: "KSFO 121856Z 28018G28KT 10SM FEW012 BKN025 16/10 A2998 RMK AO2 SLP154",
    categories: ["Weather"],
    breakdown: [
      { field: "KSFO", label: "Station ID", explanation: "San Francisco International Airport" },
      { field: "121856Z", label: "Date/Time", explanation: "12th day at 18:56 Zulu time" },
      { field: "28018G28KT", label: "Wind", explanation: "Wind from 280° (west) at 18 knots, gusting to 28 knots" },
      { field: "10SM", label: "Visibility", explanation: "10 statute miles visibility" },
      { field: "FEW012", label: "Clouds", explanation: "Few clouds at 1,200 feet AGL" },
      { field: "BKN025", label: "Clouds", explanation: "Broken clouds at 2,500 feet AGL (ceiling — 5-7 oktas)" },
      { field: "16/10", label: "Temp/Dewpoint", explanation: "Temperature 16°C, dewpoint 10°C" },
      { field: "A2998", label: "Altimeter", explanation: "Altimeter setting 29.98 inches of mercury" },
      { field: "RMK AO2", label: "Remarks", explanation: "Automated station with precipitation discriminator" },
      { field: "SLP154", label: "Sea Level Pressure", explanation: "Sea level pressure 1015.4 hPa" }
    ],
    questions: [
      {
        question: "What is the ceiling?",
        answer: "2,500 feet AGL (BKN025)",
        options: ["1,200 feet AGL", "2,500 feet AGL (BKN025)", "No ceiling", "12,000 feet AGL"],
        correctIndex: 1,
        explanation: "The ceiling is defined by the lowest broken (BKN) or overcast (OVC) layer. BKN025 means broken clouds at 2,500 feet AGL. The FEW012 layer below is not a ceiling because 'few' coverage (1-2 oktas) does not constitute a ceiling."
      },
      {
        question: "What is the maximum altitude you could fly while maintaining cloud clearance?",
        answer: "2,000 feet AGL (500 feet below the 2,500 ft broken ceiling)",
        options: ["2,500 feet AGL", "2,000 feet AGL (500 feet below the 2,500 ft broken ceiling)", "400 feet AGL", "1,200 feet AGL"],
        correctIndex: 1,
        explanation: "Part 107 requires 500 feet below clouds. With a 2,500-foot ceiling, the maximum altitude is 2,000 feet AGL. Note that the standard 400-foot AGL limit would apply in most practical situations, making the cloud clearance a non-factor here."
      },
      {
        question: "What operational concern do the winds present?",
        answer: "Gusts of 28 knots (32 mph) may exceed the wind resistance of many consumer drones",
        options: ["No concerns, winds are light", "Gusts of 28 knots (32 mph) may exceed the wind resistance of many consumer drones", "Wind direction is dangerous", "Crosswinds require a waiver"],
        correctIndex: 1,
        explanation: "Gusts of 28 knots (about 32 mph) are strong for most consumer drones, which typically have wind resistance ratings of 20-30 mph. Gusts create sudden load changes that can destabilize flight. Always check your drone's wind resistance specifications before flying."
      }
    ]
  },
  {
    id: 5,
    raw: "KATL 121753Z 00000KT 1/2SM FG VV002 14/14 A3010 RMK AO2 SLP193",
    categories: ["Weather"],
    breakdown: [
      { field: "KATL", label: "Station ID", explanation: "Hartsfield-Jackson Atlanta International Airport" },
      { field: "121753Z", label: "Date/Time", explanation: "12th day at 17:53 Zulu time" },
      { field: "00000KT", label: "Wind", explanation: "Calm wind (no wind)" },
      { field: "1/2SM", label: "Visibility", explanation: "1/2 statute mile visibility (very low)" },
      { field: "FG", label: "Weather", explanation: "Fog (visibility below 5/8 SM)" },
      { field: "VV002", label: "Clouds", explanation: "Vertical visibility 200 feet (sky obscured — indefinite ceiling)" },
      { field: "14/14", label: "Temp/Dewpoint", explanation: "Temperature 14°C, dewpoint 14°C (zero spread — saturated air)" },
      { field: "A3010", label: "Altimeter", explanation: "Altimeter setting 30.10 inches of mercury" },
      { field: "RMK AO2", label: "Remarks", explanation: "Automated station with precipitation discriminator" },
      { field: "SLP193", label: "Sea Level Pressure", explanation: "Sea level pressure 1019.3 hPa" }
    ],
    questions: [
      {
        question: "Can you fly under Part 107 in these conditions?",
        answer: "No — visibility is 1/2 SM, well below the 3 SM minimum",
        options: ["Yes, fog doesn't restrict drone operations", "No — visibility is 1/2 SM, well below the 3 SM minimum", "Yes, if you use a VO", "Only with anti-collision lights"],
        correctIndex: 1,
        explanation: "Part 107 requires a minimum of 3 statute miles visibility from the control station. At 1/2 SM, visibility is only one-sixth of the minimum. No provision (VO, lighting, etc.) can substitute for the visibility requirement."
      },
      {
        question: "What does VV002 mean?",
        answer: "Vertical visibility is 200 feet — the sky is obscured (e.g., fog), no true cloud layer visible",
        options: ["Variable visibility at 200 feet", "Vertical visibility is 200 feet — the sky is obscured (e.g., fog), no true cloud layer visible", "Clouds at 2,000 feet", "Visibility is 2 miles vertically"],
        correctIndex: 1,
        explanation: "VV followed by three digits indicates vertical visibility in an obscured sky. VV002 means vertical visibility of 200 feet, used when the sky is completely obscured (by fog, smoke, etc.) and no discrete cloud layers can be reported."
      },
      {
        question: "What does the temp/dewpoint spread tell you?",
        answer: "Zero spread (14/14) means the air is fully saturated — expect fog, mist, or low clouds",
        options: ["Cold temperature warning", "Zero spread (14/14) means the air is fully saturated — expect fog, mist, or low clouds", "Temperature inversion likely", "Conditions will improve soon"],
        correctIndex: 1,
        explanation: "When temperature and dewpoint are equal (zero spread), relative humidity is 100% and the air is fully saturated. This directly causes fog and low clouds. A spread of 4°C or less generally indicates high moisture and the potential for fog or precipitation."
      }
    ]
  },
  {
    id: 6,
    raw: "KMIA 151952Z 18012KT 6SM TSRA BKN035CB OVC080 29/24 A2971 RMK AO2 LTG DSNT S RAB30 TSB45 SLP082",
    categories: ["Weather"],
    breakdown: [
      { field: "KMIA", label: "Station ID", explanation: "Miami International Airport" },
      { field: "151952Z", label: "Date/Time", explanation: "15th day at 19:52 Zulu time" },
      { field: "18012KT", label: "Wind", explanation: "Wind from 180° (south) at 12 knots" },
      { field: "6SM", label: "Visibility", explanation: "6 statute miles visibility (reduced by thunderstorm)" },
      { field: "TSRA", label: "Weather", explanation: "Thunderstorm with moderate rain" },
      { field: "BKN035CB", label: "Clouds", explanation: "Broken cumulonimbus clouds at 3,500 feet AGL — CB tag indicates thunderstorm cell" },
      { field: "OVC080", label: "Clouds", explanation: "Overcast at 8,000 feet AGL" },
      { field: "29/24", label: "Temp/Dewpoint", explanation: "Temperature 29°C, dewpoint 24°C (small spread of 5°C — very humid, tropical)" },
      { field: "A2971", label: "Altimeter", explanation: "Altimeter setting 29.71 inches of mercury (low pressure associated with storm)" },
      { field: "RMK AO2", label: "Remarks", explanation: "Automated station with precipitation discriminator" },
      { field: "LTG DSNT S", label: "Remarks", explanation: "Lightning distant to the south" },
      { field: "RAB30", label: "Remarks", explanation: "Rain began at 30 minutes past the hour" },
      { field: "TSB45", label: "Remarks", explanation: "Thunderstorm began at 45 minutes past the hour" },
      { field: "SLP082", label: "Sea Level Pressure", explanation: "Sea level pressure 1008.2 hPa (below normal, consistent with storm system)" }
    ],
    questions: [
      {
        question: "What does 'TSRA' in this METAR indicate?",
        answer: "Thunderstorm with rain currently at or near the station",
        options: [
          "Thunderstorm reported at a distant location",
          "Thunderstorm with rain currently at or near the station",
          "Trace rain with no thunderstorm activity",
          "Tropical storm advisory"
        ],
        correctIndex: 1,
        explanation: "In METAR weather phenomena, 'TS' is the descriptor for thunderstorm and 'RA' is the precipitation type for rain. Combined as 'TSRA', it means thunderstorm with rain occurring at or in the vicinity of the station. A '+' prefix would indicate heavy; '-' would indicate light."
      },
      {
        question: "What does the 'CB' suffix on BKN035CB indicate, and why does it matter?",
        answer: "CB means cumulonimbus — an active thunderstorm cell with severe turbulence, icing, and lightning hazards",
        options: [
          "CB means ceiling below minimums — no special hazard",
          "CB means cloud base, a routine cloud type identifier",
          "CB means cumulonimbus — an active thunderstorm cell with severe turbulence, icing, and lightning hazards",
          "CB means coastal breeze, indicating sea-effect clouds"
        ],
        correctIndex: 2,
        explanation: "When a cloud layer is tagged with 'CB', it identifies the cloud type as cumulonimbus — the thunderstorm cloud. Cumulonimbus clouds contain severe turbulence, heavy precipitation, icing, and lightning. The CB tag is always significant and indicates an extreme hazard to all aircraft, including drones."
      },
      {
        question: "Based on this METAR, can you legally and safely fly under Part 107?",
        answer: "No — thunderstorm activity, lightning, and associated turbulence make this unsafe and potentially illegal",
        options: [
          "Yes — visibility is 6 SM which meets the 3 SM minimum",
          "Yes — the thunderstorm is distant to the south, so local flight is permitted",
          "No — thunderstorm activity, lightning, and associated turbulence make this unsafe and potentially illegal",
          "Only if you stay below 300 feet AGL to avoid the cloud ceiling"
        ],
        correctIndex: 2,
        categories: ["Weather", "Regulations"],
        explanation: "While visibility (6 SM) technically meets the Part 107 minimum, the remote PIC must not create a hazard to persons or property and must maintain VLOS. Active thunderstorms produce lightning, microburst winds, and severe turbulence — flying is both extremely dangerous and incompatible with the remote PIC's safety obligations under 14 CFR § 107.23. No reasonable remote PIC would fly in these conditions."
      }
    ]
  },
  {
    id: 7,
    raw: "KBOS 081756Z 04005KT 010V070 10SM SCT020 BKN150 18/12 A3015 RMK AO2 SLP208",
    categories: ["Weather"],
    breakdown: [
      { field: "KBOS", label: "Station ID", explanation: "Boston Logan International Airport" },
      { field: "081756Z", label: "Date/Time", explanation: "8th day at 17:56 Zulu time" },
      { field: "04005KT", label: "Wind", explanation: "Wind from 040° (northeast) at 5 knots — light wind" },
      { field: "010V070", label: "Variable Wind", explanation: "Wind direction varying between 010° and 070° — wind is light and shifting" },
      { field: "10SM", label: "Visibility", explanation: "10 statute miles visibility" },
      { field: "SCT020", label: "Clouds", explanation: "Scattered clouds at 2,000 feet AGL (3-4 oktas, not a ceiling)" },
      { field: "BKN150", label: "Clouds", explanation: "Broken clouds at 15,000 feet AGL (ceiling — 5-7 oktas)" },
      { field: "18/12", label: "Temp/Dewpoint", explanation: "Temperature 18°C, dewpoint 12°C (spread of 6°C — moderate humidity)" },
      { field: "A3015", label: "Altimeter", explanation: "Altimeter setting 30.15 inches of mercury" },
      { field: "RMK AO2", label: "Remarks", explanation: "Automated station with precipitation discriminator" },
      { field: "SLP208", label: "Sea Level Pressure", explanation: "Sea level pressure 1020.8 hPa" }
    ],
    questions: [
      {
        question: "What does the wind group '04005KT 010V070' tell you?",
        answer: "Wind is from 040° at 5 knots, but the direction is variable between 010° and 070°",
        options: [
          "Wind is from 040° at 5 knots with gusts to 70 knots",
          "Wind is from 040° at 5 knots, but the direction is variable between 010° and 070°",
          "Wind is variable from all directions at 10 mph",
          "Wind speed varies between 4 and 70 knots"
        ],
        correctIndex: 1,
        explanation: "When wind speed is 6 knots or less and the direction varies significantly, the METAR reports the mean direction followed by a variability group formatted as 'dddVddd', where V separates the two extreme directions. Here, wind is generally from 040° at 5 knots but varies between 010° (nearly north) and 070° (east-northeast). Variable winds are common in light, shifting conditions."
      },
      {
        question: "What is the ceiling in this METAR?",
        answer: "15,000 feet AGL (BKN150)",
        options: [
          "2,000 feet AGL (SCT020)",
          "No ceiling — sky is clear",
          "15,000 feet AGL (BKN150)",
          "Cannot be determined from this METAR"
        ],
        correctIndex: 2,
        explanation: "A ceiling is defined by the lowest broken (BKN) or overcast (OVC) layer. SCT (scattered, 3-4 oktas) does not constitute a ceiling. The lowest BKN layer here is BKN150, meaning a ceiling at 15,000 feet AGL. With the practical drone altitude limit of 400 feet AGL, cloud clearance is not an operational factor here."
      },
      {
        question: "Based on this METAR, can you fly under Part 107, and what is the maximum altitude considering cloud clearance?",
        answer: "Yes — 400 feet AGL is the practical limit and is well below the 2,000-foot scattered layer (500 ft below cloud = 1,500 ft, but 400 ft AGL governs)",
        options: [
          "No — scattered clouds at 2,000 feet prohibit flight",
          "Yes — 400 feet AGL is the practical limit and is well below the 2,000-foot scattered layer (500 ft below cloud = 1,500 ft, but 400 ft AGL governs)",
          "Yes — you can fly up to 1,500 feet AGL (500 feet below the SCT020 layer)",
          "Yes, but only up to 300 feet AGL due to the variable winds"
        ],
        correctIndex: 1,
        categories: ["Weather", "Regulations"],
        explanation: "Visibility is 10 SM (exceeds 3 SM minimum). The scattered layer at 2,000 feet would require 500-foot clearance below (1,500 ft max by cloud rule), but the standard 400-foot AGL ceiling under Part 107 is the binding constraint in practice. Conditions are excellent for drone operations. Variable light winds present no significant hazard."
      }
    ]
  },
  {
    id: 8,
    raw: "KSLC 221553Z 29006KT 1/4SM +FZRA FG OVC002 M02/M02 A3028 RMK AO2 SLP316 P0005",
    categories: ["Weather"],
    breakdown: [
      { field: "KSLC", label: "Station ID", explanation: "Salt Lake City International Airport, Utah" },
      { field: "221553Z", label: "Date/Time", explanation: "22nd day at 15:53 Zulu time" },
      { field: "29006KT", label: "Wind", explanation: "Wind from 290° (west-northwest) at 6 knots" },
      { field: "1/4SM", label: "Visibility", explanation: "1/4 statute mile visibility — extremely low" },
      { field: "+FZRA", label: "Weather", explanation: "Heavy freezing rain — liquid rain freezing on contact with surfaces" },
      { field: "FG", label: "Weather", explanation: "Fog (visibility below 5/8 SM)" },
      { field: "OVC002", label: "Clouds", explanation: "Overcast at 200 feet AGL — extremely low ceiling" },
      { field: "M02/M02", label: "Temp/Dewpoint", explanation: "Temperature −2°C, dewpoint −2°C (both below freezing — icing conditions)" },
      { field: "A3028", label: "Altimeter", explanation: "Altimeter setting 30.28 inches of mercury" },
      { field: "RMK AO2", label: "Remarks", explanation: "Automated station with precipitation discriminator" },
      { field: "SLP316", label: "Sea Level Pressure", explanation: "Sea level pressure 1031.6 hPa (high pressure)" },
      { field: "P0005", label: "Remarks", explanation: "Precipitation accumulation of 0.05 inches in the past hour" }
    ],
    questions: [
      {
        question: "What does '+FZRA' mean and why is it dangerous for drone operations?",
        answer: "Heavy freezing rain — supercooled liquid droplets freeze on contact, rapidly accreting ice on rotors and motors",
        options: [
          "Frozen rain forecast — conditions may deteriorate later",
          "Light freezing rain — minor concern for drone operations",
          "Heavy freezing rain — supercooled liquid droplets freeze on contact, rapidly accreting ice on rotors and motors",
          "Freezing rain advisory — fly at your discretion"
        ],
        correctIndex: 2,
        explanation: "The '+' prefix means heavy intensity, 'FZ' means freezing, and 'RA' means rain. Heavy freezing rain is one of the most dangerous weather conditions for aircraft. Ice accumulates rapidly on rotor blades, changing their aerodynamic profile and adding weight — this can cause loss of control. Most consumer drones are not designed for icing conditions."
      },
      {
        question: "Can you fly under Part 107 in these conditions?",
        answer: "No — visibility is 1/4 SM (far below the 3 SM minimum) and freezing rain creates extreme icing hazard",
        options: [
          "Yes — the airport conditions don't affect drone operations elsewhere",
          "No — visibility is 1/4 SM (far below the 3 SM minimum) and freezing rain creates extreme icing hazard",
          "Yes, if you use a VO to assist with visibility",
          "Only if your drone is rated for icing conditions"
        ],
        correctIndex: 1,
        categories: ["Weather", "Regulations"],
        explanation: "At 1/4 SM visibility, conditions are 12 times below the 3 SM Part 107 minimum. No exception exists for this. Additionally, freezing rain poses a catastrophic icing hazard to drone rotors. This is a clear no-fly situation on both regulatory and safety grounds."
      },
      {
        question: "The OVC002 ceiling is 200 feet AGL. If visibility were legal, what would the cloud clearance requirement limit your maximum altitude to?",
        answer: "Negative — you cannot fly at all; 500 feet below a 200-foot ceiling would be −300 feet (below ground)",
        options: [
          "200 feet AGL — right at the ceiling",
          "100 feet AGL (half the ceiling height)",
          "Negative — you cannot fly at all; 500 feet below a 200-foot ceiling would be −300 feet (below ground)",
          "Any altitude since the drone is small"
        ],
        correctIndex: 2,
        explanation: "Part 107 requires at least 500 feet below clouds. With an OVC ceiling at only 200 feet AGL, there is no altitude at which you could legally fly and maintain 500-foot cloud separation — even if visibility were adequate. This illustrates how ceiling and visibility work together to restrict operations."
      }
    ]
  }
];

export function getQuestionIds() {
  return metarExamples.flatMap(m =>
    m.questions.map((_, qi) => `metar_${m.id}_${qi}`)
  )
}

export default metarExamples;
