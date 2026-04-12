const chartScenarios = [
  {
    id: 1,
    title: "Airport and Airspace — Class D",
    description: "Identify the airspace class and airport features indicated by a dashed blue circle",
    chartType: "airport_class_d",
    features: ["Class D airspace", "Control tower (CT)", "Hard surface runway", "Tower frequency"],
    categories: ["Airspace", "Airport Operations"],
    questions: [
      {
        question: "What class of airspace is indicated by the dashed blue line surrounding the airport?",
        options: ["Class B", "Class C", "Class D", "Class E"],
        correctIndex: 2,
        explanation: "A dashed blue line on a sectional chart indicates Class D airspace. Class D airspace typically extends from the surface up to 2,500 feet AGL around airports with an operating control tower. Part 107 pilots must obtain ATC authorization (via LAANC or DroneZone) before operating in Class D airspace."
      },
      {
        question: "The airport symbol is shown in blue (cyan). What does this indicate?",
        options: [
          "The airport has fuel services",
          "The airport has a control tower (towered)",
          "The airport is military",
          "The airport has instrument approaches"
        ],
        correctIndex: 1,
        explanation: "On sectional charts, airports shown in blue (cyan) have an operating control tower. Airports shown in magenta are non-towered. This distinction is critical for Part 107 pilots because towered airports always have controlled airspace requiring authorization."
      },
      {
        question: "You see 'CT 125.3' near the airport. What does this represent?",
        options: [
          "The CTAF frequency",
          "The control tower frequency",
          "The ATIS frequency",
          "The ground control frequency"
        ],
        correctIndex: 1,
        explanation: "CT followed by a frequency indicates the control tower (CT) communication frequency. This is the frequency you would use to contact the tower. While Part 107 pilots are not required to communicate with ATC, knowing the tower frequency is important for situational awareness."
      }
    ]
  },
  {
    id: 2,
    title: "Class C Airspace — Shelf Structure",
    description: "Identify the two-ring structure of Class C airspace shown with solid magenta lines",
    chartType: "airport_class_c",
    features: ["Class C inner ring (5 NM)", "Class C outer ring (10 NM)", "Solid magenta lines", "Altitude shelves"],
    categories: ["Airspace"],
    questions: [
      {
        question: "What type of airspace is indicated by the solid magenta circles?",
        options: ["Class B", "Class C", "Class D", "Class E"],
        correctIndex: 1,
        explanation: "Solid magenta lines on a sectional chart indicate Class C airspace. Class C typically has a two-layer 'upside-down wedding cake' structure with an inner circle (usually 5 NM radius) and an outer ring (usually 10 NM radius)."
      },
      {
        question: "The notation '40/SFC' appears inside the inner ring. What does this mean?",
        options: [
          "The airspace ceiling is 4,000 feet MSL, floor is the surface",
          "The airspace ceiling is 40,000 feet MSL",
          "The airspace is 40 nautical miles from the surface",
          "The surface wind is 40 knots"
        ],
        correctIndex: 0,
        explanation: "The notation '40/SFC' means the airspace extends from the surface (SFC) up to 4,000 feet MSL (the '40' represents hundreds of feet). Part 107 operations within this area require FAA airspace authorization."
      },
      {
        question: "The outer shelf shows '40/20'. What altitude range does this shelf cover?",
        options: [
          "Surface to 4,000 feet MSL",
          "2,000 feet MSL to 4,000 feet MSL",
          "2,000 feet AGL to 4,000 feet AGL",
          "200 feet to 400 feet AGL"
        ],
        correctIndex: 1,
        explanation: "The notation '40/20' means the outer shelf extends from 2,000 feet MSL (floor) to 4,000 feet MSL (ceiling). If you are flying beneath 2,000 feet MSL in the outer ring area, you are technically below the Class C shelf — but you should still verify this carefully and maintain awareness of traffic."
      }
    ]
  },
  {
    id: 3,
    title: "Class B Airspace — Wedding Cake",
    description: "Identify the multi-layered Class B airspace structure shown with solid blue lines",
    chartType: "class_b",
    features: ["Class B solid blue lines", "Multiple altitude shelves", "Wedding cake layers", "Mode C veil (30 NM)"],
    categories: ["Airspace"],
    questions: [
      {
        question: "What type of airspace is depicted by solid blue lines with altitude labels?",
        options: ["Class A", "Class B", "Class C", "Class D"],
        correctIndex: 1,
        explanation: "Solid blue lines on a sectional chart indicate Class B airspace. This is typically found around the nation's busiest airports (e.g., LAX, JFK, ORD). Class B has a multi-tiered 'wedding cake' structure with varying floor and ceiling altitudes."
      },
      {
        question: "The innermost area shows '100/SFC'. An outer tier shows '100/30'. Where could you legally fly a drone at 200 feet AGL without airspace authorization?",
        options: [
          "Inside the inner ring (100/SFC)",
          "Under the outer tier where the floor is 3,000 MSL, if your altitude stays below 3,000 MSL",
          "Anywhere inside the blue lines at 200 feet",
          "You always need authorization inside any blue line"
        ],
        correctIndex: 1,
        explanation: "Under the outer tier labeled '100/30', the Class B airspace floor is 3,000 feet MSL. If you are flying at 200 feet AGL and the ground elevation keeps you well below 3,000 feet MSL, you are beneath the Class B shelf and not inside the controlled airspace. However, you may still be within the Mode C veil (30 NM), which is an area of dense air traffic where situational awareness is especially important. Always check LAANC grid altitudes."
      },
      {
        question: "What is the 'Mode C veil' associated with Class B airspace?",
        options: [
          "A 10 NM ring requiring radio contact",
          "A 30 NM ring from the primary airport where transponders are normally required for manned aircraft",
          "The outer boundary of Class B airspace",
          "A restriction that only applies at night"
        ],
        correctIndex: 1,
        explanation: "The Mode C veil is a 30 NM radius area around Class B primary airports. Manned aircraft operating in this area must have an operating transponder with Mode C altitude reporting. For Part 107 pilots, awareness of the Mode C veil is important because it indicates an area of dense air traffic."
      }
    ]
  },
  {
    id: 4,
    title: "Class E Airspace Variations",
    description: "Distinguish between Class E to the surface and Class E starting at 700 ft AGL",
    chartType: "class_e",
    features: ["Dashed magenta line (Class E to surface)", "Faded magenta shading (Class E at 700 AGL)", "Transition areas"],
    categories: ["Airspace"],
    questions: [
      {
        question: "A dashed magenta line forms a circle around an airport. What does this indicate?",
        options: [
          "Class D airspace",
          "Class E airspace extending to the surface",
          "A TFR boundary",
          "Class C airspace"
        ],
        correctIndex: 1,
        explanation: "A dashed magenta line indicates Class E airspace that extends down to the surface. This is different from the standard Class E floor of 1,200 feet AGL. Part 107 pilots need LAANC authorization to operate in Class E airspace that extends to the surface."
      },
      {
        question: "You see a faded (shaded) magenta border on one side of a line. What does this represent?",
        options: [
          "Class E airspace beginning at 700 feet AGL on the shaded side",
          "Class D airspace",
          "A military operations area",
          "Class G airspace to the surface"
        ],
        correctIndex: 0,
        explanation: "A faded/shaded magenta edge indicates a transition area where Class E airspace begins at 700 feet AGL (on the side with the shading). On the non-shaded side, Class E typically starts at 1,200 feet AGL. Since Part 107 operations are limited to 400 feet AGL, you would be in Class G airspace below this Class E floor — no authorization needed."
      },
      {
        question: "If Class E airspace starts at 700 feet AGL in your area, and you fly at 350 feet AGL, what airspace are you in?",
        options: [
          "Class E",
          "Class G (uncontrolled)",
          "Class D",
          "Class A"
        ],
        correctIndex: 1,
        explanation: "If Class E begins at 700 feet AGL and you are flying at 350 feet AGL, you are in Class G (uncontrolled) airspace beneath the Class E floor. No airspace authorization is needed for Part 107 operations in Class G, though all other Part 107 rules still apply."
      }
    ]
  },
  {
    id: 5,
    title: "Obstructions and Towers",
    description: "Read obstruction symbols and understand MSL vs AGL height notations",
    chartType: "obstructions",
    features: ["Obstruction symbol", "MSL height (bold)", "AGL height (parentheses)", "Lighted vs unlighted", "Group obstructions"],
    categories: ["Operations"],
    questions: [
      {
        question: "An obstruction symbol shows '1548' in bold above '(305)' in lighter text. What do these numbers mean?",
        options: [
          "1548 feet AGL, 305 feet MSL",
          "1548 feet MSL (top of obstacle), 305 feet AGL (height above ground)",
          "Latitude 15.48, Longitude 305",
          "1548 MHz frequency, 305 foot setback"
        ],
        correctIndex: 1,
        explanation: "On sectional charts, obstruction heights are shown with the bold number representing the top of the obstacle in feet MSL (Mean Sea Level) and the number in parentheses showing the height AGL (Above Ground Level). So this tower stands 305 feet above the local terrain, and its top is at 1,548 feet MSL."
      },
      {
        question: "How can you tell if a charted obstruction is lighted?",
        options: [
          "It will be shown in red",
          "A small dot/lightning bolt symbol appears at the top, or it has a special symbol",
          "The AGL height will be underlined",
          "Lighted obstructions are not shown on sectional charts"
        ],
        correctIndex: 1,
        explanation: "On sectional charts, a lighted obstruction is indicated by a lightning bolt or flare symbol at the top of the obstruction icon. An unlighted obstruction lacks this symbol. Knowing whether towers are lighted helps with flight planning, especially for operations near dawn/dusk."
      },
      {
        question: "You plan to fly near a tower that shows '2150' bold and '(1000)' below. The ground elevation in your launch area is 1,200 feet MSL. How high above YOUR ground level is the top of this tower?",
        options: [
          "1,000 feet",
          "950 feet",
          "2,150 feet",
          "1,200 feet"
        ],
        correctIndex: 1,
        explanation: "The tower top is at 2,150 feet MSL. Your ground elevation is 1,200 feet MSL. So the top of the tower is 2,150 - 1,200 = 950 feet above your ground level. The (1,000) AGL figure is relative to the tower's base, not your position. Always calculate heights relative to your own launch site elevation for safe Part 107 operations."
      }
    ]
  },
  {
    id: 6,
    title: "VFR Waypoints and Landmarks",
    description: "Identify VFR waypoints and checkpoint symbols on sectional charts",
    chartType: "vfr_waypoints",
    features: ["VFR waypoint flag (magenta)", "VFR checkpoint", "Five-letter identifier", "GPS coordinates"],
    categories: ["Airport Operations"],
    questions: [
      {
        question: "What does a magenta flag symbol on a sectional chart represent?",
        options: [
          "A VFR reporting point",
          "A VFR waypoint",
          "A restricted area entry point",
          "An emergency landing zone"
        ],
        correctIndex: 1,
        explanation: "A magenta flag symbol represents a VFR waypoint. These are GPS-defined navigation points used by VFR pilots. They are identified by a five-letter name and can help Part 107 pilots understand where manned VFR traffic may be navigating."
      },
      {
        question: "A VFR waypoint is labeled 'VPBCH'. How would this be useful to a Part 107 pilot?",
        options: [
          "It is not relevant to Part 107 operations",
          "It indicates a no-fly zone for drones",
          "It helps understand where manned VFR traffic concentrates, improving situational awareness",
          "It is a mandatory reporting point for drone pilots"
        ],
        correctIndex: 2,
        explanation: "While Part 107 pilots don't navigate via VFR waypoints, knowing their locations improves situational awareness. VFR traffic often concentrates along routes between waypoints, so flying a drone near a VFR waypoint means you should be extra vigilant for manned aircraft."
      },
      {
        question: "A VFR checkpoint is shown as a magenta flag with a corner tick mark. What is the difference between a VFR waypoint and a VFR checkpoint?",
        options: [
          "There is no difference",
          "A checkpoint is associated with a visual landmark on the ground; a waypoint is GPS-only",
          "A waypoint is for helicopters; a checkpoint is for fixed-wing",
          "Checkpoints are only used in Class B airspace"
        ],
        correctIndex: 1,
        explanation: "A VFR checkpoint (flag with tick) is associated with a prominent visual landmark on the ground that pilots use for position reporting. A standalone VFR waypoint (flag without tick) is a GPS-defined point that may not have an obvious ground feature. Both appear as magenta flags on sectional charts."
      }
    ]
  },
  {
    id: 7,
    title: "Military Operations Area (MOA)",
    description: "Identify MOA boundaries and understand their significance for drone operations",
    chartType: "moa",
    features: ["Magenta hatched boundary", "MOA name and altitudes", "Controlling agency", "Operating hours"],
    categories: ["Airspace", "Regulations"],
    questions: [
      {
        question: "What type of boundary is indicated by magenta hatched lines on a sectional chart?",
        options: [
          "Restricted area",
          "Prohibited area",
          "Military Operations Area (MOA)",
          "Class C airspace"
        ],
        correctIndex: 2,
        explanation: "Magenta hatched lines indicate a Military Operations Area (MOA). MOAs contain military training activities such as aerobatics, air combat maneuvers, and high-speed intercepts. The hatching pattern is magenta (not blue, which would indicate restricted/prohibited areas)."
      },
      {
        question: "A MOA is labeled 'BRUSHY MOA — A: 500 AGL TO FL180'. Can a Part 107 pilot legally fly in this MOA?",
        options: [
          "No, all drone flights are prohibited in MOAs",
          "Yes, MOAs do not restrict Part 107 operations, but extreme caution is advised due to military traffic",
          "Only with a military waiver",
          "Only when the MOA is inactive"
        ],
        correctIndex: 1,
        explanation: "MOAs do not prohibit Part 107 operations. However, military aircraft in MOAs may be conducting high-speed, low-level training that creates a serious hazard. Part 107 pilots should contact the controlling agency (listed in the Chart Supplement) to determine if the MOA is active and exercise extreme caution."
      },
      {
        question: "Where can you find the schedule and controlling agency for a MOA?",
        options: [
          "On the sectional chart itself",
          "In the Chart Supplement (formerly Airport/Facility Directory)",
          "On the FAA DroneZone website only",
          "By calling 1-800-WX-BRIEF only"
        ],
        correctIndex: 1,
        explanation: "The Chart Supplement (formerly the Airport/Facility Directory, or A/FD) contains detailed information about Special Use Airspace, including MOA schedules, altitudes, controlling agencies, and contact frequencies. The sectional chart margin may also contain some information."
      }
    ]
  },
  {
    id: 8,
    title: "Restricted and Prohibited Areas",
    description: "Identify restricted/prohibited area boundaries and understand the differences",
    chartType: "restricted_area",
    features: ["Blue hatched boundary", "R- prefix (Restricted)", "P- prefix (Prohibited)", "Altitude and time limits"],
    categories: ["Airspace", "Regulations"],
    questions: [
      {
        question: "What type of special use airspace is indicated by blue hatched lines?",
        options: [
          "Military Operations Area",
          "Restricted or Prohibited area",
          "Alert area",
          "Class B airspace"
        ],
        correctIndex: 1,
        explanation: "Blue hatched lines on a sectional chart indicate Restricted (R-) or Prohibited (P-) areas. These are types of Special Use Airspace (SUA) with specific flight restrictions, shown distinctly from MOAs which use magenta hatching."
      },
      {
        question: "An area labeled 'R-2502 — SFC TO 8000 MSL' is shown with blue hatching. Can you fly your drone in this area?",
        options: [
          "Yes, restricted areas only apply to manned aircraft",
          "No, not without authorization from the controlling agency, as it extends from the surface",
          "Yes, Part 107 drones are exempt from restricted areas",
          "Only above 400 feet AGL"
        ],
        correctIndex: 1,
        explanation: "Restricted areas (R-) are established for activities like artillery firing, aerial gunnery, or missile testing. Since this one starts at the surface (SFC), your drone would be inside the restricted area at any altitude. You must obtain permission from the controlling agency listed in the Chart Supplement. Flying without authorization could be extremely dangerous and illegal."
      },
      {
        question: "What is the difference between a Restricted area (R-) and a Prohibited area (P-)?",
        options: [
          "There is no practical difference",
          "Restricted areas can sometimes be accessed with permission; Prohibited areas never allow any flight",
          "Prohibited areas are only active part-time",
          "Restricted areas are for military use; Prohibited areas are for civilian use"
        ],
        correctIndex: 1,
        explanation: "Restricted areas (R-) may be entered with permission from the controlling agency when the area is not 'hot' (active). Prohibited areas (P-), such as P-56 over the White House, never permit unauthorized flight — all aircraft, including drones, are prohibited at all times. There are very few Prohibited areas in the US."
      }
    ]
  },
  {
    id: 9,
    title: "TFR Recognition and NOTAMs",
    description: "Understand Temporary Flight Restrictions and how they appear on charts",
    chartType: "tfr",
    features: ["TFR boundary (not on printed charts)", "NOTAM reference", "Radius and altitude", "Common TFR triggers"],
    categories: ["Regulations", "Operations"],
    questions: [
      {
        question: "Where would you find active TFR information before a Part 107 flight?",
        options: [
          "Only on printed sectional charts",
          "FAA TFR website, NOTAM system, or apps like ForeFlight / B4UFLY",
          "By calling the local airport tower",
          "TFRs are only issued for presidential movements"
        ],
        correctIndex: 1,
        explanation: "TFRs are NOT printed on sectional charts because they are temporary. You must check the FAA TFR website (tfr.faa.gov), the NOTAM system, or apps such as ForeFlight, B4UFLY, or Aloft before every flight. This is a critical part of your preflight planning obligations under Part 107."
      },
      {
        question: "A TFR is issued for a wildfire. It has a 3 NM radius from the fire center, surface to 5,000 AGL. Can you fly your drone 2 NM from the fire at 300 feet AGL?",
        options: [
          "Yes, 300 feet is below the typical drone altitude limit",
          "No, you are within the TFR radius and altitude — flight is prohibited without authorization",
          "Yes, if you are helping with firefighting",
          "Yes, TFRs for wildfires only restrict manned aircraft"
        ],
        correctIndex: 1,
        explanation: "At 2 NM from the fire center, you are within the 3 NM TFR radius. At 300 feet AGL, you are below the 5,000 AGL ceiling. Therefore, you are inside the TFR and cannot fly without authorization. Unauthorized drone flights near wildfires are particularly dangerous and can cause firefighting aircraft to be grounded."
      },
      {
        question: "Which of the following is NOT a common reason for a TFR?",
        options: [
          "Sporting events with 30,000+ people",
          "Presidential/VIP movements",
          "Wildfires or disaster areas",
          "Scheduled airline maintenance"
        ],
        correctIndex: 3,
        explanation: "TFRs are issued for sporting events (30,000+ attendance), VIP movements (presidential travel), wildfires, disaster/hazard areas, space launch operations, and national security. Scheduled airline maintenance does not trigger a TFR. Always check NOTAMs before every flight."
      }
    ]
  },
  {
    id: 10,
    title: "Reading Airport Data on Sectional Charts",
    description: "Decode the airport information block found next to airport symbols",
    chartType: "airport_data",
    features: ["Airport name", "Field elevation", "Runway length", "CTAF/UNICOM frequency", "Lighting availability"],
    categories: ["Airport Operations"],
    questions: [
      {
        question: "Next to a magenta airport symbol, you see the data: 'SMITHVILLE (6J2)' with '1280' and 'L 72'. What is the field elevation?",
        options: [
          "72 feet MSL",
          "1,280 feet MSL",
          "6,200 feet MSL",
          "128 feet MSL"
        ],
        correctIndex: 1,
        explanation: "The number '1280' near the airport represents the field elevation in feet MSL. This is important for Part 107 pilots because your 400-foot AGL limit is measured from ground level, and knowing the field elevation helps correlate with MSL altitudes shown for airspace floors/ceilings and obstacles."
      },
      {
        question: "In the airport data, 'L 72' appears. What does the 'L' indicate?",
        options: [
          "Left traffic pattern",
          "The airport has runway lighting",
          "The longest runway is left-aligned",
          "Low-altitude approach available"
        ],
        correctIndex: 1,
        explanation: "The 'L' preceding the runway length indicates that the airport has runway lighting available. A star symbol (*) means the lighting is pilot-controlled. The '72' means the longest runway is 7,200 feet. This information helps Part 107 pilots understand airport operations during dawn/dusk flights."
      },
      {
        question: "The airport symbol is shown in magenta rather than blue. What does this tell you?",
        options: [
          "The airport is in Class C airspace",
          "The airport is non-towered (no operating control tower)",
          "The airport is closed",
          "The airport only allows military operations"
        ],
        correctIndex: 1,
        explanation: "A magenta airport symbol indicates a non-towered airport (no operating control tower). Blue symbols indicate towered airports. Non-towered airports may still have airspace restrictions (such as Class E to the surface), so always check for dashed magenta lines or other airspace indicators around the airport."
      }
    ]
  }
];

export function getQuestionIds() {
  return chartScenarios.flatMap(s =>
    s.questions.map((_, qi) => `charts_${s.id}_${qi}`)
  )
}

export default chartScenarios;
