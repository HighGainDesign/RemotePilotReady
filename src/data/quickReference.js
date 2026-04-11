const quickReference = [
  {
    title: "Flight Limits",
    icon: "gauge",
    items: [
      { label: "Max Altitude", value: "400 ft AGL", note: "Higher allowed within 400 ft of a structure" },
      { label: "Max Speed", value: "100 mph (87 kts)", note: "" },
      { label: "Max Takeoff Weight", value: "55 lbs", note: "Including payload and attachments" },
      { label: "Min Visibility", value: "3 statute miles", note: "From the control station" }
    ]
  },
  {
    title: "Cloud Clearance",
    icon: "cloud",
    items: [
      { label: "Below Clouds", value: "500 ft", note: "Minimum vertical clearance" },
      { label: "Horizontal from Clouds", value: "2,000 ft", note: "Minimum horizontal clearance" }
    ]
  },
  {
    title: "Airspace Cloud Clearance (Manned Aircraft Reference)",
    icon: "airspace",
    items: [
      { label: "Class B", value: "Clear of clouds", note: "No specific distance required — just stay clear" },
      { label: "Class C", value: "500 ft below, 1,000 ft above, 2,000 ft horiz.", note: "" },
      { label: "Class D", value: "500 ft below, 1,000 ft above, 2,000 ft horiz.", note: "" },
      { label: "Class E (≥1,200 AGL)", value: "500 ft below, 1,000 ft above, 2,000 ft horiz.", note: "" },
      { label: "Class G (day, ≤1,200 AGL)", value: "Clear of clouds", note: "1 SM visibility" },
      { label: "Class G (night, ≤1,200 AGL)", value: "500 ft below, 1,000 ft above, 2,000 ft horiz.", note: "3 SM visibility" }
    ]
  },
  {
    title: "Night Operations",
    icon: "moon",
    items: [
      { label: "Anti-Collision Lights", value: "Required", note: "Visible for 3 statute miles" },
      { label: "Training", value: "Required", note: "Updated initial or recurrent training" },
      { label: "Waiver Required?", value: "No", note: "Since April 2021 rule update" }
    ]
  },
  {
    title: "Operations Over People — Categories",
    icon: "people",
    items: [
      { label: "Category 1", value: "≤ 0.55 lbs", note: "No exposed rotating parts that could lacerate" },
      { label: "Category 2", value: "≤ 0.55 lbs", note: "Or meets impact energy limits with declaration of compliance" },
      { label: "Category 3", value: "≤ 0.55 lbs or DOC", note: "No sustained flight over open-air assemblies; must not be over people unless transiting" },
      { label: "Category 4", value: "Airworthiness cert.", note: "FAA airworthiness certificate required, operating limitations apply" }
    ]
  },
  {
    title: "Pilot Requirements",
    icon: "pilot",
    items: [
      { label: "Minimum Age", value: "16 years old", note: "" },
      { label: "Certificate", value: "Remote Pilot", note: "Pass initial aeronautical knowledge test" },
      { label: "Recurrent Training", value: "Every 24 months", note: "Complete online via FAA" },
      { label: "Must Carry", value: "Pilot cert. + photo ID", note: "Present to FAA/law enforcement on request" }
    ]
  },
  {
    title: "Reporting Requirements",
    icon: "report",
    items: [
      { label: "Accident Report Threshold", value: "$500 property damage", note: "Other than damage to the drone itself" },
      { label: "Serious Injury / Loss of Consciousness", value: "Must report", note: "" },
      { label: "Reporting Deadline", value: "10 calendar days", note: "Report to the FAA" },
      { label: "Address / Name Change", value: "30 days", note: "Notify FAA of certificate holder changes" }
    ]
  },
  {
    title: "Alcohol & Drugs",
    icon: "prohibition",
    items: [
      { label: "Max BAC", value: "0.04%", note: "" },
      { label: "Bottle to Throttle", value: "8 hours", note: "No flying within 8 hrs of consuming alcohol" },
      { label: "Substances", value: "Prohibited", note: "Cannot operate under influence of any impairing substance" }
    ]
  },
  {
    title: "Remote ID",
    icon: "broadcast",
    items: [
      { label: "Compliance Date", value: "March 16, 2024", note: "" },
      { label: "Standard Remote ID", value: "Built-in broadcast", note: "Broadcasts ID, location, altitude, velocity" },
      { label: "Remote ID Module", value: "Add-on broadcast", note: "For drones without built-in Remote ID" },
      { label: "FRIA", value: "FAA-Recognized ID Area", note: "Fixed sites where Remote ID is not required" }
    ]
  }
];

export default quickReference;
