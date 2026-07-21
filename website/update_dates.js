const fs = require('fs');

let content = fs.readFileSync('src/lib/data/professionals.ts', 'utf8');

const newDates = `[
      {
        date: "2026-07-17",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-18",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-19",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-20",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-21",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-22",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-23",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-24",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-25",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      }
    ]`;

// This regex matches `availableDates: [` until the matching `]` of the availableDates array
// Since the slots array also has `[]`, we can't just match to the first `]`.
// However, the structure is very regular in the file.
// Let's use a simpler approach. We know the array ends with a newline and spaces then `]` followed by `\n    }`
// Actually we can just find `availableDates: [` and then find the next `    ]`
// Or even better, just replace everything between `availableDates: [\n` and the `    ]\n  }` (or whatever the indentation is).
// Wait! I'll just write a script that runs eval on the professionals data.
// Since it's typescript, we can strip the types or use ts-node.

// Let's just string match and replace manually.
let chunks = content.split('availableDates: [');
let newContent = chunks[0];
for (let i = 1; i < chunks.length; i++) {
  // Find the end of the availableDates array. It ends with a `]` that is at the same indentation level, 
  // or before a `\n  }` or `\n  },`.
  let chunk = chunks[i];
  let endIndex = -1;
  let bracketCount = 1;
  for (let j = 0; j < chunk.length; j++) {
    if (chunk[j] === '[') bracketCount++;
    else if (chunk[j] === ']') bracketCount--;
    
    if (bracketCount === 0) {
      endIndex = j;
      break;
    }
  }
  
  if (endIndex !== -1) {
    newContent += `availableDates: ${newDates}` + chunk.substring(endIndex + 1);
  } else {
    console.error("Could not find end of availableDates array");
    process.exit(1);
  }
}

fs.writeFileSync('src/lib/data/professionals.ts', newContent, 'utf8');
console.log("Replaced all availableDates!");
