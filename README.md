# 📅 BookEase — React Native Appointment Scheduling App

**4N EcoTech | Part II Assignment Submission**
**Candidate:** vvraghuram
**Email:** vvraghuram@gmail.com | **Phone:** +91 91828 38497

---

## Overview

BookEase is a React Native mobile application that allows users to book appointments with service providers. Users can register, browse verified providers across 5 categories, pick available time slots, and manage all their bookings — fully offline using mock data and AsyncStorage.

---

## Features

### Implemented (All Required + Extras)

| Feature | Status | Details |
|---|---|---|
| User Registration | ✅ | Name, email, password, confirm-password with validation |
| User Login | ✅ | Email + password, AsyncStorage session persistence |
| Auto-login | ✅ | Session restored on app launch automatically |
| Logout | ✅ | Clears session, redirects to Login |
| Provider Listing | ✅ | 10 providers with avatar, name, category, rating, experience |
| Search | ✅ | Full-text search across name, specialisation, category, location |
| Category Filter | ✅ | All, Doctor, Lawyer, Salon, Plumber, Tutor |
| Provider Detail | ✅ | Bio, specialisation, fee, location, working hours |
| Date Selection | ✅ | 7-day strip of working days (Mon–Sat), weekends excluded |
| Slot Selection | ✅ | 30–60 min slots, 9 AM–5 PM, booked slots greyed out |
| Appointment Booking | ✅ | Saved with unique ID, timestamp, status: UPCOMING |
| Upcoming Appointments | ✅ | Tab in My Appointments screen |
| Past Appointments | ✅ | Cancelled bookings in Past tab |
| Cancel Booking | ✅ | Confirmation Alert → status → CANCELLED |
| Profile Screen | ✅ | Stats (Upcoming / Completed / Cancelled), account details |

---

## Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | React Native + Expo | SDK 51 |
| Navigation | React Navigation | v6.x |
| Storage | AsyncStorage | 1.23.1 |
| UI Components | React Native Paper | v5.x |
| Icons | Expo Vector Icons (MaterialCommunityIcons) | v14 |
| Date Utils | date-fns | v3.x |
| Build Tool | EAS Build | latest |

---

## Project Structure

```
BookEase/
├── App.js                          # Root entry, providers
├── app.json                        # Expo config
├── eas.json                        # EAS build config (APK)
├── package.json
└── src/
    ├── screens/
    │   ├── LoginScreen.js          # Email + password login
    │   ├── RegisterScreen.js       # New account registration
    │   ├── HomeScreen.js           # Provider list + search + filter
    │   ├── ProviderDetailScreen.js # Profile + date strip + slot picker
    │   ├── BookingConfirmScreen.js # Booking review + confirm
    │   ├── AppointmentsScreen.js   # Upcoming / Past tabs
    │   └── ProfileScreen.js        # User info + stats + logout
    ├── navigation/
    │   └── index.js                # Auth gate + Stack + Bottom Tabs
    ├── context/
    │   ├── AuthContext.js          # User session state + login/logout
    │   └── AppointmentContext.js   # Bookings CRUD + slot conflict check
    ├── data/
    │   └── providers.js            # 10 mock providers + CATEGORIES
    ├── components/
    │   ├── ProviderCard.js         # Card for the provider list
    │   ├── AppointmentCard.js      # Card for appointments list
    │   ├── StarRating.js           # Star rating display
    │   └── CategoryChip.js        # Colour-coded category badge
    └── utils/
        ├── storage.js              # AsyncStorage CRUD helpers
        ├── dateUtils.js            # Slot generation + date formatting
        └── theme.js                # Colours, Paper theme, category styles
```

---

## Data Models

### User (AsyncStorage key: `bookease_user`)
```json
{
  "id": "u_1712345678",
  "name": "Raghu Ram",
  "email": "raghu@example.com",
  "password": "password123",
  "createdAt": "2026-04-08T10:00:00.000Z"
}
```

### Appointment (AsyncStorage key: `bookease_appointments`)
```json
{
  "id": "appt_1712345678",
  "userId": "u_1712345678",
  "userName": "Raghu Ram",
  "providerId": "p1",
  "providerName": "Dr. Priya Sharma",
  "providerCategory": "Doctor",
  "providerSpecialisation": "General Physician",
  "providerImage": "https://i.pravatar.cc/150?img=47",
  "date": "2026-04-09",
  "slot": "10:00",
  "status": "UPCOMING",
  "bookedAt": "2026-04-08T10:05:00.000Z"
}
```

---

## How to Run (Local Dev)

### Prerequisites
- Node.js 18+
- Expo CLI: `npm install -g expo-cli`
- Expo Go app on your Android phone

### Steps
```bash
# 1. Clone the repo
git clone https://github.com/vvraghuram/bookease-rn
cd bookease-rn

# 2. Install dependencies
npm install

# 3. Start Expo dev server
npx expo start

# 4. Scan the QR code with Expo Go (Android)
#    OR press 'a' to open on Android emulator
```

---

## Build APK

```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo account
eas login

# Build APK (preview profile = .apk direct install)
eas build --platform android --profile preview

# Download APK from the EAS dashboard link provided after build
```

---

## Assumptions

1. **Mock backend** — Provider data is a static array in `src/data/providers.js`. No API calls needed.
2. **Local auth** — Passwords stored in AsyncStorage (plain text) per the problem statement: *"you may use local storage or mock data"*.
3. **Slot conflict** — A slot is considered booked if the same userId has an UPCOMING appointment for the same providerId + date + slot. Other users' bookings do not conflict (no shared backend).
4. **Working days** — Providers work Monday–Saturday (configurable per provider). Sundays excluded.
5. **APK** — Built using `eas build --platform android --profile preview`. Tested on Android 11 (API 30) and Android 13 (API 33).

---

## Submission Checklist

- [x] Source code (this repository)
- [x] README.md (this file)
- [x] APK file (see Releases tab / EAS build link)
- [x] PPTX presentation (Part I + Part II)

---

*Built with ❤️ by vvraghuram for 4N EcoTech — April 2026*
