**frontend folder structure**
crop-ai-frontend/
├── public/                     # Static files
│   ├── favicon.ico
│   ├── logo.png                # App ka main logo
│   └── manifest.json           # PWA details
├── src/
│   ├── i18n/                   # --- LANGUAGE TRANSLATIONS ---
│   │   ├── locales/
│   │   │   ├── en.json         # English UI text (Home, Scan, Buttons)
│   │   │   └── hi.json         # Hindi UI text (Ghar, Scan karein, Buttons)
│   │   └── config.js           # i18next configuration setup
│   │
│   ├── assets/                 # --- STATIC MEDIA ---
│   │   ├── images/             # Leaf placeholders, background banners
│   │   ├── icons/              # Weather icons, social media svgs
│   │   └── styles/             # Global.css (Tailwind directives)
│   │
│   ├── components/             # --- SHARED UI (GLOBAL) ---
│   │   ├── layout/             # Navbar.jsx, Footer.jsx, Sidebar.jsx
│   │   └── ui/                 # Button.jsx, Input.jsx, Modal.jsx, Loader.jsx, Badge.jsx
│   │
│   ├── features/               # --- FEATURE LOGIC (THE BRAINS) ---
│   │   ├── auth/               
│   │   │   ├── components/     # LoginForm.jsx, SignupForm.jsx
│   │   │   ├── hooks/          # useAuth.js (Login/Logout logic)
│   │   │   └── api/            # authService.js (API requests)
│   │   ├── dashboard/          
│   │   │   ├── components/     # StatsGrid.jsx, RecentActivity.jsx, HealthChart.jsx
│   │   │   └── hooks/          # useDashboard.js (Fetch summary stats)
│   │   ├── detection/          
│   │   │   ├── components/     # Dropzone.jsx, ResultCard.jsx, ConfidenceMeter.jsx
│   │   │   ├── utils/          # generatePDF.js (Download report logic)
│   │   │   └── api/            # scanService.js (Send image to AI)
│   │   ├── history/            
│   │   │   ├── components/     # HistoryList.jsx, HistoryCard.jsx, SearchBar.jsx
│   │   │   └── hooks/          # useHistory.js (Fetch past scans)
│   │   ├── weather/            
│   │   │   ├── components/     # WeatherWidget.jsx, ForecastTable.jsx, AgriAlerts.jsx
│   │   │   └── api/            # weatherService.js (OpenWeather calls)
│   │   ├── help/               
│   │   │   ├── components/     # FAQAccordion.jsx, SupportGuide.jsx
│   │   │   └── data/           # faqData.js (Hardcoded questions/answers)
│   │   ├── community/          
│   │   │   ├── components/     # PostList.jsx, CommentBox.jsx, ExpertBio.jsx
│   │   │   └── api/            # communityService.js
│   │   ├── profile/            
│   │   │   ├── components/     # EditProfileForm.jsx, SecuritySettings.jsx
│   │   │   └── hooks/          # useProfile.js
│   │   └── contact/            
│   │       └── components/     # ContactForm.jsx, LocationMap.jsx
│   │
│   ├── pages/                  # --- DIRECT ROUTE PAGES ---
│   │   ├── Home.jsx            # Landing Page (Hero, Features, CTA)
│   │   ├── Dashboard.jsx       # User Control Center
│   │   ├── Scan.jsx            # Main AI Detection Tool
│   │   ├── Weather.jsx         # Detailed Weather & Forecast
│   │   ├── History.jsx         # User's Saved Diagnosis Records
│   │   ├── Community.jsx       # Forum & Expert Interaction
│   │   ├── Help.jsx            # Support & Help Center
│   │   ├── About.jsx           # Team & Mission Info
│   │   ├── Contact.jsx         # Contact Us Page
│   │   ├── Profile.jsx         # User Account & Settings
│   │   ├── Login.jsx           # Authentication Page
│   │   ├── Signup.jsx          # Registration Page
│   │   ├── Terms.jsx           # Terms of Service (Legal)
│   │   ├── Privacy.jsx         # Privacy Policy (Legal)
│   │   └── NotFound.jsx        # 404 Error Page
│   │
│   ├── routes/                 # --- NAVIGATION HUB ---
│   │   ├── AppRoutes.jsx       # All route definitions in one place
│   │   └── PrivateRoute.jsx    # Protection (Redirect to Login if not authenticated)
│   │
│   ├── context/                # --- GLOBAL STATE ---
│   │   ├── AuthContext.jsx     # Logged-in user data & status
│   │   └── ScanContext.jsx     # Current scan result shared across components
│   │
│   ├── services/               # --- EXTERNAL INTEGRATIONS ---
│   │   └── api.js              # Axios instance with Base URL & Auth headers
│   │
│   ├── utils/                  # --- SHARED HELPERS ---
│   │   ├── formatDate.js       # Convert ISO dates to readable format
│   │   └── validateFile.js     # Image size/type validation logic
│   │
│   ├── App.jsx                 # Main Layout & Provider Wrapper
│   └── main.jsx                # React DOM Render entry point
│
├── .env                        # VITE_API_URL, VITE_WEATHER_KEY
├── tailwind.config.js          # Design system & Theme colors
├── package.json                # List of all installed libraries
└── vite.config.js              # Vite server & build configuration

