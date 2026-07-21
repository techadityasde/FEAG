# FEAG (Find Events & Gigs)

A comprehensive Next.js web application designed to connect users with event professionals (Photographers, Videographers, Singers, DJs, etc.). The platform features advanced searching, real-time filtering, interactive portfolios, and a robust date/time slot booking engine.

## 🌊 Application Flow & Pages

### 1. Landing / Home Page
- **Hero Section**: Introduces the platform with a dynamic, aesthetic interface.
- **Advanced Search Bar (`SearchFormPlan.tsx`)**: The core discovery engine. Users can select:
  - **Category**: (e.g., Photographer, Singer).
  - **Location**: Fetches geographic coordinates for proximity sorting.
  - **Event Type & Function**: Cascading selection (e.g., Event: *Wedding* -> Function: *Haldi*).
  - **Date & Time Slot**: Users can select predefined standard slots (e.g., 10:00 AM - 01:00 PM) OR toggle to a **Custom Slot** picker (12-hour AM/PM format).
- **Recommendations**: Displays curated lists of top-rated professionals.

### 2. Services / Listings Page (`/services/[category]`)
- **Dynamic Filtering (`useFilteredProfessionals.ts`)**: 
  - Reads directly from the global Redux store (Location, Booking, Category).
  - Filters professionals by category.
  - Calculates the geographic distance from the user's searched location to the professional and sorts by proximity.
  - Enforces the **Slot Booking Pattern** (see below) to ensure only available professionals are shown.

### 3. Professional Portfolio Page (`/portfolio/[slug]`)
- **Detailed Profile**: Displays the professional's rating, pricing packages (Basic, Professional, Premium), and biography.
- **Media Gallery**: Features images, videos, and audio tracks with a Lightbox modal.
- **Availability Calendar (`CalendarSection.tsx`)**:
  - Interactive calendar displaying the professional's schedule.
  - Greys out past dates and fully booked dates.
  - If a user searched for a **Custom Time Slot**, the calendar highlights the selected date in dark green and prominently displays the requested custom hours instead of the standard time slots.
- **Checkout / Custom Request**: Users can instantly book a standard package via a side panel, or open a Custom Booking Modal for tailored event requirements.

### 4. User Dashboard & Orders
- Tracks active bookings, wishlisted professionals, and past orders.

---

## 📅 The Slot Booking Pattern

FEAG uses a highly specific logical pattern to handle the complex reality of event booking, accommodating both standard preset slots and bespoke custom hours.

### Data Structure (`professionals.ts`)
Each professional has an `availableDates` array. Each date object looks like this:
```typescript
{
  date: "2026-07-10",
  isSlotBooked: true, // Represents a Day-Level Custom/Exclusive Booking
  slots: [
    { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: true },
    { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false }
  ]
}
```

### The Filtering Logic
Managed by `useFilteredProfessionals.ts`, the filtering ensures users never double-book a professional.

1. **Global Day Block (`isSlotBooked`)**: 
   - If `isSlotBooked` is `true` on a specific date, it means the professional has accepted a custom booking or exclusive event for that day. 
   - **Result**: The professional is *entirely filtered out* of search results for that date, regardless of whether the user is searching for a Custom Slot or a Standard Slot.

2. **Custom Slot Searches (`isCustomSlot === true`)**:
   - If a user searches for a custom time range (e.g., 11:00 AM to 4:00 PM), the system only checks `!availableDate.isSlotBooked`. As long as the day hasn't been blocked off entirely, the professional will appear in the results.

3. **Standard Slot Searches**:
   - If the user searches for a standard slot (e.g., 10:00 AM), the system first ensures the day isn't blocked (`isSlotBooked: false`), and then verifies that the specific standard slot inside the `.slots` array has `isBooked: false`.

---

## 💾 State Management (Redux)

The application relies on a robust Redux Toolkit architecture to pass data between the search bar, listings, and portfolio pages without prop drilling.

- **`bookingSlice`**: The source of truth for time. Stores `selectedDate`, `selectedSlot`, `isCustomSlot`, `customStartTime`, and `customEndTime`.
- **`eventSlice`**: Stores the selected `eventType` (e.g., Wedding) and specific `eventFunction` (e.g., Reception).
- **`locationSlice`**: Stores the user's searched coordinates (`lat`, `lng`) for distance sorting.
- **`tabSlice`**: Tracks the currently active primary category.
- **`authSlice` & `onboardingSlice`**: Manages JWTs, user sessions, and the multi-step signup process.

## 🛠 Tech Stack
- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS / Vanilla CSS
- **State**: Redux Toolkit
- **Icons**: Lucide React
- **Forms**: React Hook Form
- **Notifications**: React Hot Toast
