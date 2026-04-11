const metarExamples = [
  {
    id: 1,
    raw: "KJFK 121856Z 31012G20KT 10SM FEW045 SCT250 22/11 A3001 RMK AO2 SLP166 T02170111",
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
      { question: "What is the visibility?", answer: "10 statute miles", options: ["5 statute miles", "10 statute miles", "3 statute miles", "Unlimited"] },
      { question: "Is this VFR or IFR?", answer: "VFR", options: ["VFR", "IFR", "MVFR", "LIFR"] },
      { question: "Can you fly under Part 107 in these conditions?", answer: "Yes — visibility exceeds 3 SM and cloud clearance requirements are met", options: ["Yes — visibility exceeds 3 SM and cloud clearance requirements are met", "No — winds are too high", "No — gusts make it unsafe", "Only with a waiver"] }
    ]
  },
  {
    id: 2,
    raw: "KORD 121953Z 18015KT 3SM -RA BR OVC008 18/16 A2987 RMK AO2 RAB35 SLP113",
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
      { question: "What is the ceiling?", answer: "800 feet AGL (OVC008)", options: ["No ceiling", "800 feet AGL (OVC008)", "3,000 feet AGL", "8,000 feet AGL"] },
      { question: "Is this VFR or IFR?", answer: "IFR", options: ["VFR", "IFR", "MVFR", "LIFR"] },
      { question: "Can you fly a Part 107 mission in these conditions?", answer: "Marginal — visibility meets the 3 SM minimum but 800 ft ceiling limits operations and cloud clearance (500 ft below) would restrict you to 300 ft AGL", options: ["Yes, no restrictions", "Marginal — visibility meets the 3 SM minimum but 800 ft ceiling limits operations and cloud clearance (500 ft below) would restrict you to 300 ft AGL", "No — visibility is too low", "No — rain prohibits all flight"] }
    ]
  },
  {
    id: 3,
    raw: "KDEN 121747Z 34008KT 10SM CLR 28/M03 A3042 RMK AO2 SLP283 T02830033",
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
      { question: "What is the wind direction and speed?", answer: "340° at 8 knots", options: ["340° at 8 knots", "34° at 8 knots", "340° at 80 knots", "North at 34 knots"] },
      { question: "Is there a ceiling?", answer: "No ceiling — sky is clear", options: ["No ceiling — sky is clear", "12,000 feet", "Clear above 3,000 feet", "Cannot determine"] },
      { question: "What might you be concerned about for drone performance here?", answer: "High density altitude — Denver's elevation plus high temperature means thinner air and reduced drone performance", options: ["Nothing, conditions are perfect", "High density altitude — Denver's elevation plus high temperature means thinner air and reduced drone performance", "Low pressure concerns", "Wind shear from dry conditions"] }
    ]
  },
  {
    id: 4,
    raw: "KSFO 121856Z 28018G28KT 10SM FEW012 BKN025 16/10 A2998 RMK AO2 SLP154",
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
      { question: "What is the ceiling?", answer: "2,500 feet AGL (BKN025)", options: ["1,200 feet AGL", "2,500 feet AGL (BKN025)", "No ceiling", "12,000 feet AGL"] },
      { question: "What is the maximum altitude you could fly while maintaining cloud clearance?", answer: "2,000 feet AGL (500 feet below the 2,500 ft broken ceiling)", options: ["2,500 feet AGL", "2,000 feet AGL (500 feet below the 2,500 ft broken ceiling)", "400 feet AGL", "1,200 feet AGL"] },
      { question: "What operational concern do the winds present?", answer: "Gusts of 28 knots (32 mph) may exceed the wind resistance of many consumer drones", options: ["No concerns, winds are light", "Gusts of 28 knots (32 mph) may exceed the wind resistance of many consumer drones", "Wind direction is dangerous", "Crosswinds require a waiver"] }
    ]
  },
  {
    id: 5,
    raw: "KATL 121753Z 00000KT 1/2SM FG VV002 14/14 A3010 RMK AO2 SLP193",
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
      { question: "Can you fly under Part 107 in these conditions?", answer: "No — visibility is 1/2 SM, well below the 3 SM minimum", options: ["Yes, fog doesn't restrict drone operations", "No — visibility is 1/2 SM, well below the 3 SM minimum", "Yes, if you use a VO", "Only with anti-collision lights"] },
      { question: "What does VV002 mean?", answer: "Vertical visibility is 200 feet — the sky is obscured (e.g., fog), no true cloud layer visible", options: ["Variable visibility at 200 feet", "Vertical visibility is 200 feet — the sky is obscured (e.g., fog), no true cloud layer visible", "Clouds at 2,000 feet", "Visibility is 2 miles vertically"] },
      { question: "What does the temp/dewpoint spread tell you?", answer: "Zero spread (14/14) means the air is fully saturated — expect fog, mist, or low clouds", options: ["Cold temperature warning", "Zero spread (14/14) means the air is fully saturated — expect fog, mist, or low clouds", "Temperature inversion likely", "Conditions will improve soon"] }
    ]
  }
];

export default metarExamples;
