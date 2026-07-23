export interface CountryLocationData {
  nationality: string;
  countryName: string;
  code: string;
  states: {
    name: string;
    cities: string[];
  }[];
}

export const locationDataset: CountryLocationData[] = [
  {
    nationality: "Indian",
    countryName: "India",
    code: "IN",
    states: [
      {
        name: "Andhra Pradesh",
        cities: ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Kurnool", "Tirupati", "Kakinada", "Rajahmundry", "Anantapur", "Eluru"],
      },
      {
        name: "Arunachal Pradesh",
        cities: ["Itanagar", "Naharlagun", "Pasighat", "Tawang", "Ziro", "Tezu"],
      },
      {
        name: "Assam",
        cities: ["Guwahati", "Silchar", "Dibrugarh", "Jorhat", "Nagaon", "Tinsukia", "Tezpur"],
      },
      {
        name: "Bihar",
        cities: ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Purnia", "Darbhanga", "Bihar Sharif", "Arrah", "Begusarai"],
      },
      {
        name: "Chhattisgarh",
        cities: ["Raipur", "Bhilai", "Bilaspur", "Korba", "Rajnandgaon", "Jagdalpur", "Raigarh"],
      },
      {
        name: "Goa",
        cities: ["Panaji", "Margao", "Vasco da Gama", "Mapusa", "Ponda"],
      },
      {
        name: "Gujarat",
        cities: ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar", "Jamnagar", "Junagadh", "Gandhinagar", "Anand", "Navsari"],
      },
      {
        name: "Haryana",
        cities: ["Gurugram", "Faridabad", "Panipat", "Ambala", "Yamunanagar", "Rohtak", "Hisar", "Karnal", "Panchkula"],
      },
      {
        name: "Himachal Pradesh",
        cities: ["Shimla", "Dharamshala", "Mandi", "Solan", "Kullu", "Manali", "Hamirpur", "Bilaspur"],
      },
      {
        name: "Jharkhand",
        cities: ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro", "Hazaribagh", "Deoghar", "Giridih"],
      },
      {
        name: "Karnataka",
        cities: ["Bengaluru", "Mysuru", "Hubballi-Dharwad", "Mangaluru", "Belagavi", "Davangere", "Ballari", "Tumakuru", "Shivamogga"],
      },
      {
        name: "Kerala",
        cities: ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur", "Kollam", "Palakkad", "Alappuzha", "Kannur", "Kottayam"],
      },
      {
        name: "Madhya Pradesh",
        cities: ["Bhopal", "Indore", "Gwalior", "Jabalpur", "Ujjain", "Sagar", "Dewas", "Satna", "Ratlam"],
      },
      {
        name: "Maharashtra",
        cities: ["Mumbai", "Pune", "Nagpur", "Thane", "Nashik", "Kalyan-Dombivli", "Vasai-Virar", "Aurangabad (Chhatrapati Sambhajinagar)", "Solapur", "Navi Mumbai", "Kolhapur"],
      },
      {
        name: "Manipur",
        cities: ["Imphal", "Churachandpur", "Thoubal", "Bishnupur"],
      },
      {
        name: "Meghalaya",
        cities: ["Shillong", "Tura", "Jowai", "Nongpoh"],
      },
      {
        name: "Mizoram",
        cities: ["Aizawl", "Lunglei", "Champhai", "Serchhip"],
      },
      {
        name: "Nagaland",
        cities: ["Kohima", "Dimapur", "Mokokchung", "Tuensang"],
      },
      {
        name: "Odisha",
        cities: ["Bhubaneswar", "Cuttack", "Rourkela", "Berhampur", "Sambalpur", "Puri", "Balasore"],
      },
      {
        name: "Punjab",
        cities: ["Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda", "Mohali (SAS Nagar)", "Pathankot", "Hoshiarpur"],
      },
      {
        name: "Rajasthan",
        cities: ["Jaipur", "Jodhpur", "Kota", "Bikaner", "Ajmer", "Udaipur", "Bhilwara", "Alwar", "Sikar"],
      },
      {
        name: "Sikkim",
        cities: ["Gangtok", "Namchi", "Geyzing", "Mangan"],
      },
      {
        name: "Tamil Nadu",
        cities: ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Tiruppur", "Erode", "Vellore", "Tirunelveli", "Thanjavur"],
      },
      {
        name: "Telangana",
        cities: ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar", "Khammam", "Ramagundam", "Mahbubnagar"],
      },
      {
        name: "Tripura",
        cities: ["Agartala", "Dharmanagar", "Udaipur", "Kailashahar"],
      },
      {
        name: "Uttar Pradesh",
        cities: ["Lucknow", "Kanpur", "Ghaziabad", "Agra", "Varanasi", "Meerut", "Prayagraj (Allahabad)", "Noida", "Bareilly", "Aligarh", "Gorakhpur", "Moradabad", "Ayodhya"],
      },
      {
        name: "Uttarakhand",
        cities: ["Dehradun", "Haridwar", "Roorkee", "Haldwani", "Rishikesh", "Nainital", "Kashipur"],
      },
      {
        name: "West Bengal",
        cities: ["Kolkata", "Howrah", "Asansol", "Siliguri", "Durgapur", "Bardhaman", "Malda", "Baharampur"],
      },
      {
        name: "Delhi (NCT)",
        cities: ["New Delhi", "North Delhi", "South Delhi", "East Delhi", "West Delhi", "Central Delhi"],
      },
      {
        name: "Chandigarh",
        cities: ["Chandigarh"],
      },
      {
        name: "Jammu and Kashmir",
        cities: ["Srinagar", "Jammu", "Anantnag", "Baramulla", "Udhampur"],
      },
      {
        name: "Ladakh",
        cities: ["Leh", "Kargil"],
      },
      {
        name: "Puducherry",
        cities: ["Puducherry", "Karaikal", "Mahe", "Yanam"],
      },
      {
        name: "Andaman and Nicobar Islands",
        cities: ["Port Blair"],
      },
      {
        name: "Dadra and Nagar Haveli and Daman and Diu",
        cities: ["Daman", "Diu", "Silvassa"],
      },
      {
        name: "Lakshadweep",
        cities: ["Kavaratti"],
      },
    ],
  },
  {
    nationality: "American",
    countryName: "United States",
    code: "US",
    states: [
      { name: "California", cities: ["Los Angeles", "San Francisco", "San Diego", "San Jose", "Sacramento"] },
      { name: "New York", cities: ["New York City", "Buffalo", "Rochester", "Albany", "Syracuse"] },
      { name: "Texas", cities: ["Houston", "Austin", "Dallas", "San Antonio", "Fort Worth"] },
      { name: "Florida", cities: ["Miami", "Orlando", "Tampa", "Jacksonville", "Tallahassee"] },
      { name: "Illinois", cities: ["Chicago", "Aurora", "Naperville", "Springfield"] },
      { name: "Washington", cities: ["Seattle", "Spokane", "Tacoma", "Bellevue"] },
    ],
  },
  {
    nationality: "British",
    countryName: "United Kingdom",
    code: "GB",
    states: [
      { name: "England", cities: ["London", "Birmingham", "Manchester", "Leeds", "Liverpool", "Bristol"] },
      { name: "Scotland", cities: ["Edinburgh", "Glasgow", "Aberdeen", "Dundee"] },
      { name: "Wales", cities: ["Cardiff", "Swansea", "Newport"] },
      { name: "Northern Ireland", cities: ["Belfast", "Derry", "Lisburn"] },
    ],
  },
  {
    nationality: "Canadian",
    countryName: "Canada",
    code: "CA",
    states: [
      { name: "Ontario", cities: ["Toronto", "Ottawa", "Mississauga", "Hamilton"] },
      { name: "British Columbia", cities: ["Vancouver", "Victoria", "Surrey", "Burnaby"] },
      { name: "Quebec", cities: ["Montreal", "Quebec City", "Laval", "Gatineau"] },
      { name: "Alberta", cities: ["Calgary", "Edmonton", "Red Deer", "Lethbridge"] },
    ],
  },
  {
    nationality: "Emirati",
    countryName: "United Arab Emirates",
    code: "AE",
    states: [
      { name: "Dubai", cities: ["Dubai City", "Jebel Ali", "Deira", "Jumeirah"] },
      { name: "Abu Dhabi", cities: ["Abu Dhabi City", "Al Ain", "Ruwais"] },
      { name: "Sharjah", cities: ["Sharjah City", "Khor Fakkan", "Kalba"] },
      { name: "Ajman", cities: ["Ajman City"] },
    ],
  },
  {
    nationality: "Australian",
    countryName: "Australia",
    code: "AU",
    states: [
      { name: "New South Wales", cities: ["Sydney", "Newcastle", "Wollongong"] },
      { name: "Victoria", cities: ["Melbourne", "Geelong", "Ballarat"] },
      { name: "Queensland", cities: ["Brisbane", "Gold Coast", "Cairns"] },
      { name: "Western Australia", cities: ["Perth", "Fremantle", "Mandurah"] },
    ],
  },
];

export const getNationalities = (): string[] => {
  return locationDataset.map((d) => d.nationality);
};

export const getStatesByNationality = (nationality: string): string[] => {
  const found = locationDataset.find(
    (d) => d.nationality.toLowerCase() === nationality.toLowerCase() || d.countryName.toLowerCase() === nationality.toLowerCase()
  );
  if (!found) return [];
  return found.states.map((s) => s.name);
};

export const getCitiesByState = (nationality: string, stateName: string): string[] => {
  const foundNation = locationDataset.find(
    (d) => d.nationality.toLowerCase() === nationality.toLowerCase() || d.countryName.toLowerCase() === nationality.toLowerCase()
  );
  if (!foundNation) return [];
  const foundState = foundNation.states.find(
    (s) => s.name.toLowerCase() === stateName.toLowerCase()
  );
  if (!foundState) return [];
  return foundState.cities;
};
