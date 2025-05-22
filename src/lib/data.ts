// src/lib/data.ts
// It's a good practice to keep shared data and types in a separate directory like 'lib' or 'utils' or 'data'.

// Define an interface for the player data
export interface Player {
  id: number;
  name: string;
  position: string; // This will store the combined position string e.g., "WR, DB"
  number: number;
  height: string;
  weight: number;
  class: string;
  imageUrl?: string; // Optional image URL
  // Removed hometown as requested
}

// Helper function to map grade to class
const mapGradeToClass = (grade: string): string => {
  switch (grade) {
    case 'FR': return 'Freshman';
    case 'SO': return 'Sophomore';
    case 'JR': return 'Junior';
    case 'SR': return 'Senior';
    default: return 'Unknown';
  }
};

// Helper function to get approximate measurables based on primary position
const getPlayerMeasurables = (position: string): { height: string; weight: number } => {
  const primaryPosition = position.split(',')[0].trim().toUpperCase();
  // Approximate measurables for high school players
  switch (primaryPosition) {
    case 'QB':
      return { height: `6'${Math.floor(Math.random() * 3) + 0}"`, weight: Math.floor(Math.random() * 31) + 170 }; // 6'0"-6'2", 170-200 lbs
    case 'WR':
      return { height: `5'${Math.floor(Math.random() * 4) + 9}"`, weight: Math.floor(Math.random() * 31) + 160 }; // 5'9"-6'0", 160-190 lbs
    case 'DB':
      return { height: `5'${Math.floor(Math.random() * 4) + 9}"`, weight: Math.floor(Math.random() * 31) + 160 }; // 5'9"-6'0", 160-190 lbs
    case 'RB':
      return { height: `5'${Math.floor(Math.random() * 3) + 8}"`, weight: Math.floor(Math.random() * 41) + 170 }; // 5'8"-5'10", 170-210 lbs
    case 'LB':
      return { height: `5'${Math.floor(Math.random() * 3) + 10}"`, weight: Math.floor(Math.random() * 41) + 180 }; // 5'10"-6'0", 180-220 lbs
    case 'OL':
      return { height: `6'${Math.floor(Math.random() * 4) + 1}"`, weight: Math.floor(Math.random() * 51) + 230 }; // 6'1"-6'4", 230-280 lbs
    case 'DL':
      return { height: `6'${Math.floor(Math.random() * 4) + 0}"`, weight: Math.floor(Math.random() * 51) + 220 }; // 6'0"-6'3", 220-270 lbs
    default:
      return { height: `5'10"`, weight: 175 }; // Default fallback
  }
};


// New player data based on your list
const newRosterData = [
  { number: 1, name: "Ryon Lyons", position: "WR, DB", grade: "FR" },
  { number: 2, name: "Jordan Parker", position: "QB, DB", grade: "JR" },
  { number: 3, name: "Marquez Chalfant", position: "WR, DB", grade: "SR" },
  { number: 4, name: "Andrew Dakas", position: "RB, LB", grade: "JR" },
  { number: 6, name: "Cole Bain", position: "RB, LB", grade: "JR" },
  { number: 7, name: "Tucker Webb", position: "RB, LB", grade: "FR" },
  { number: 9, name: "Ari White", position: "RB, LB", grade: "SR" },
  { number: 10, name: "Jon Hendrix", position: "WR, DB", grade: "JR" },
  { number: 11, name: "Ty Webb", position: "WR, DB", grade: "SR" },
  { number: 12, name: "Bryson Trapp", position: "WR, DB", grade: "SR" },
  { number: 14, name: "Hunter Buchanan", position: "RB, LB", grade: "JR" },
  { number: 15, name: "Malachi Trapp", position: "RB, LB", grade: "SR" },
  { number: 16, name: "Jesse Foutch", position: "QB, DB", grade: "FR" },
  { number: 17, name: "Austin Nicholson", position: "WR, DB", grade: "SR" },
  { number: 18, name: "Briz Trapp", position: "QB, DB", grade: "SR" },
  { number: 19, name: "Rylan Cooper", position: "WR, DB", grade: "FR" },
  { number: 20, name: "Wyatt Carter", position: "RB, LB", grade: "SO" },
  { number: 21, name: "Jarett Hamilton", position: "OL, DL", grade: "SO" },
  { number: 22, name: "Trace Hamilton", position: "WR, DB", grade: "SR" },
  { number: 23, name: "Jon Pulley", position: "WR, DB", grade: "SO" },
  { number: 24, name: "Cecil Ketchum", position: "RB, LB", grade: "FR" },
  { number: 27, name: "Cameron Stanley", position: "WR, DB", grade: "FR" },
  { number: 28, name: "Connor Talley", position: "WR, DB", grade: "FR" },
  { number: 29, name: "Isaiah Whitlock", position: "WR, DB", grade: "SR" },
  { number: 30, name: "Kaleb Gomez", position: "WR, DB", grade: "JR" },
  { number: 31, name: "Colin Dickens", position: "WR, DB", grade: "SR" },
  { number: 34, name: "Wesley Kent", position: "OL, DL", grade: "SO" },
  { number: 35, name: "Aiden Lawrence", position: "WR, DB", grade: "SO" },
  { number: 41, name: "Koda Jenkins", position: "RB, LB", grade: "FR" },
  { number: 44, name: "Adam Johnson", position: "WR, DB", grade: "FR" },
  { number: 45, name: "Nik Daw", position: "RB, LB", grade: "FR" },
  { number: 50, name: "Blaine Atnip", position: "OL, DL", grade: "FR" },
  { number: 52, name: "Aiden Turner", position: "OL, DL", grade: "SO" },
  { number: 54, name: "Victor Locklear", position: "OL, DL", grade: "SR" },
  { number: 55, name: "Wil Farris", position: "OL, DL", grade: "SR" },
  { number: 56, name: "Aaron Hattfield", position: "OL, DL", grade: "SR" },
  { number: 57, name: "James Hannah", position: "OL, DL", grade: "SO" },
  { number: 58, name: "Bryson Arnold", position: "OL, DL", grade: "SO" },
  { number: 59, name: "Zach Boldin", position: "OL, DL", grade: "SR" },
  { number: 60, name: "Kobe Roller", position: "OL, DL", grade: "JR" },
  { number: 61, name: "Jaxson Kleparek", position: "OL, DL", grade: "SR" },
  { number: 62, name: "Connor McClure", position: "OL, DL", grade: "SO" },
  { number: 64, name: "Caydin Hecker", position: "OL, DL", grade: "FR" },
  { number: 65, name: "Brownie Johnson", position: "OL, DL", grade: "SO" },
  { number: 66, name: "Christopher Pulley", position: "OL, DL", grade: "SR" },
  { number: 67, name: "Kollin Young", position: "OL, DL", grade: "FR" },
  { number: 69, name: "Josh Hernandez", position: "OL, DL", grade: "SR" },
  { number: 73, name: "Hunter Ballew", position: "OL, DL", grade: "SO" },
  { number: 74, name: "Chase Young", position: "OL, DL", grade: "FR" },
  { number: 75, name: "Chase Sullivan", position: "OL, DL", grade: "SR" },
  { number: 77, name: "Johnathan Hernandez", position: "OL, DL", grade: "SR" },
  { number: 79, name: "Gadiel Gomez", position: "OL, DL", grade: "SR" },
  { number: 86, name: "Brandon Cook", position: "WR, DB", grade: "FR" },
  { number: 88, name: "Zachary Cook", position: "WR, DB", grade: "FR" },
];

// Transformed player data
export const playerData: Player[] = newRosterData.map((player, index) => {
  const measurables = getPlayerMeasurables(player.position);
  const nameForImage = player.name.split(" ").map(n => n[0]).join("");
  return {
    id: index + 1, // Assign a simple incremental ID
    name: player.name,
    position: player.position,
    number: player.number,
    class: mapGradeToClass(player.grade),
    height: measurables.height,
    weight: measurables.weight,
    imageUrl: `https://placehold.co/64x64/374151/E5E7EB?text=${nameForImage}`, // Placeholder image with initials
  };
});

// Helper function to get a player by ID
export const getPlayerById = (id: number): Player | undefined => {
  return playerData.find(player => player.id === id);
};
