# Next-Generation CELPIP Practice App – Design & Architecture

This markdown document outlines a **comprehensive CELPIP preparation platform** built with the specified tech stack. It details the app’s features, user flows, UI design concepts, data models, and file structure. The app offers full mock tests (Listening, Reading, Writing, Speaking) with precise timers, AI-powered scoring/feedback, personalized progress dashboards, and a tiered subscription model. The interface will be a sleek **dark-themed**, modern design (inspired by \[x.ai]\[25]) with Tailwind CSS and engaging animations via Framer Motion. The app is fully responsive for desktop and mobile users.

* **Mock Tests & Section Practice:** Users can start a *complete timed test* (≈3 hours total) or choose individual sections (e.g. only Writing). Each section (Listening, Reading, Writing, Speaking) has its own page and UI. *Timers* run per section, mimicking the real exam flow.
* **Real-Time Scoring & Feedback:** Writing and Speaking responses are immediately sent to our AI services. We use **Whisper** for speech-to-text, **DeepSeek** for text analysis, and **Hume AI** for vocal emotion/tone analysis. Feedback is detailed: error highlights, suggestions, and a predicted CELPIP CLB score. (Listening/Reading are auto-graded MCQs, with correct answers shown after completion.)
* **Personalized Dashboard:** After any test, users see their scores, **trends over time**, and AI-identified weaknesses. The system suggests focus areas (e.g. “practice past tense”), adapting an individual study plan.
* **Subscription Model:** Free users get basic access; paid tiers unlock full tests, advanced AI feedback, and analytics. Stripe handles recurring billing.

Below we break down each part of the app: user flow, section flows, AI services integration, UI design notes, full database schema, and project file structure.

## User Flow & App Structure

1. **Onboarding & Authentication:**

   * **Signup/Login:** Using Supabase Auth (email/password or OAuth). New users fill a quick profile (name, native language, target CLB).
   * **Subscription Page:** Users can select Free, Standard, or Premium plans. Free tier allows limited tests and basic feedback. Plans are managed via Stripe (with pricing IDs stored in our DB).

2. **Dashboard:** After login, the user lands on a **Dashboard**. This shows overall progress (e.g. a line chart of CLB score by date), recent test results, and recommended practice tasks (e.g. “Improve your past-tense usage”). The UI is a dark-themed Tailwind layout with subtle neon highlights for metrics. Users can navigate to start a **Full Mock Test** or individual section practice.

   &#x20;*Figure: The development environment for our Next.js frontend (above) reflects our technology stack of React, TypeScript, and Tailwind. We will create pages/components for Authentication, Dashboard (with charts and progress), and Section Tests.*

3. **Selecting a Test:** On the Dashboard (or a “Practice Tests” page), users choose:

   * **Complete Test:** Runs all four sections in sequence (total \~3 hours).
   * **Section Practice:** Start only one section (e.g. “Writing Task 1” or “Multiple Speaking Tasks”). Useful for focused practice.

   A *modal or dropdown* lets them pick the desired component. Each choice displays instructions (e.g. “You have 47 minutes for Listening, 55 minutes for Reading,” etc., based on official format).

4. **Taking the Test – Sections (Listening/Reading/Writing/Speaking):**

   * **Listening Section:** User listens to 6 audio parts (total \~47 min) and answers corresponding MCQs. The audio player is custom HTML5 (no rewind once started, to mimic the real test). A section-level timer counts down. After time’s up or completion, answers are auto-graded and the user cannot go back to change answers. Correct answers are revealed at the end.

   * **Reading Section:** 4 parts (\~55 min) with passages and MCQs. Similar flow: read, answer, auto-score, show answers.

   * **Writing Section:** 2 tasks (\~53 min) where the user types responses in text fields. A rich text editor (or simple textarea) is provided with word count. A timer is visible. When done, the user submits. Their text is sent to our backend. This section page also has a tooltip or link to the official rubric.

     &#x20;*Figure: The Writing section’s interface allows users to type essay/email responses. As they write, a fixed timer remains visible. After submission, DeepSeek AI analyzes the content for grammar, coherence, and style.*

   * **Speaking Section:** 8 tasks (\~20 min). Each task provides a prompt (e.g. describe a situation) and a **Record** button. When the user clicks to speak, the browser’s audio stream is captured (via WebRTC `getUserMedia`). They see the question on screen and talk. After recording, they can play back if allowed (or move on). The audio file is saved directly to Supabase Storage (using Supabase JS client) as an MP3/WAV.

     &#x20;*Figure: During Speaking tasks, users record responses via microphone. The app captures audio in-browser and uploads it to Supabase Storage for AI processing.*

     Once all speaking tasks are done, the section ends. (Note: In the **practice environment** users *can* review or re-record, but a toggle “Once you move on you cannot return” warns of real-test constraints.) We also support an optional **audio playback** control per prompt (only once in practice mode).

5. **Timers & Navigation:** Each section page has a countdown timer (e.g. 47:00, 55:00, etc.). If time runs out, the section auto-submits. Navigation is **linear**; users cannot skip ahead or back mid-section. After submitting one section (or on timer expiry), the app automatically advances to the next section page, or to the Results page if it was the last section.

6. **Results & Feedback:** Once all chosen sections are completed, the user is taken to a **Results** dashboard. Here we display: overall test score, section scores (raw & CLB equivalent), and detailed AI feedback for Writing and Speaking. Listening/Reading sections show correct answers and the user’s answers (with right/wrong highlights).

   * **AI Scoring:** The user’s written texts and transcripts of spoken answers are sent to DeepSeek & Hume endpoints. We **simulate these with real API keys** so feedback is immediate (production-ready).

     * Writing: DeepSeek returns a numeric score plus line-by-line feedback (grammar mistakes, vocabulary suggestions, coherence tips). We display this inline under each response.
     * Speaking: Whisper (via Edge Function) transcribes the audio. DeepSeek analyzes the transcript (fluency, grammar, vocabulary). Hume AI analyzes the raw audio for tone/emotion (e.g. confidence vs hesitation). We show the CLB score and bullet-point feedback (e.g. “Pronunciation was clear, but watch your /th/ sounds,” “You hesitated 3 times, try to speak more fluidly”).

   &#x20;*Figure: After the test, the Speaking section results include AI feedback on pronunciation and tone. The AI has transcribed the audio and evaluated factors like confidence and fluency.*

7. **Dashboard Update & Recommendations:** The system logs the test data. On returning to the Dashboard, the user sees updated progress charts (e.g. CLB score trend line). An **AI Insights** panel highlights weaknesses: e.g. “Frequent past-tense errors in Writing,” “Needs more enthusiasm in Speaking,” or “Fell behind time in Listening.” We use simple analytics: aggregate past mistakes (stored in the DB) and identify patterns. Then we generate a recommended study plan (e.g. “Review verb tenses; try Sectional Listening exercises”).

   All of the above flows occur seamlessly thanks to our tech stack: Next.js handles routing and state (with React hooks for timers, Framer Motion for page transitions). Supabase Auth secures each page (Redirect to login if not signed in). Supabase Edge Functions handle AI calls: e.g. an Edge function `analyzeWriting` is triggered on submission to call DeepSeek’s API, parse results, and write feedback to the database. We cite the new Supabase Edge AI feature here as enabling efficient model inference close to the user. Stripe webhooks (via a Next.js API route) update user subscription status in our DB. Email notifications (e.g. “Your test feedback is ready”) can be sent via a background Edge Function or Supabase webhook. All pages and features are mobile-responsive with Tailwind’s utility classes.

## Section Details

* **Listening:** 6 audio clips, mix of dialogues and monologues. After each clip, user answers MCQs. The UI is simple: a Play button and multiple-choice form. We disable playbar and back (to mimic test rules). Each question may have an *info* button for pronunciation or vocabulary hints (premium feature).
* **Reading:** Passages + MCQs. The UI scrolls through passages, each question below. We enforce the 55-minute limit.
* **Writing:** Two prompts (Email and Opinion). The user sees a prompt and a large text box. Real-time word count is shown. Grammar suggestions appear *only after submission* (to simulate the “no spell check” rule in testing). We then run DeepSeek and display **rich feedback**: corrected sentences, vocabulary alternatives, structure advice. For example, it might highlight “you was → you were” or suggest synonyms.
* **Speaking:** Eight prompts (describing a photo, giving advice, telling a story, etc.). Each prompt is on one page, with a **Record** button. We use the \[MediaRecorder API] to capture audio chunks, then send the blob to Supabase Storage when the user stops recording. (An Edge Function can invoke Whisper on upload.) The system optionally transcribes in real-time for the user’s review (as text preview), but the final evaluation is done by DeepSeek/Hume post-test.

## AI-Powered Feedback Pipeline

1. **Speech-to-Text (Whisper):** Each recorded audio from Speaking tasks is sent to an Edge Function (`whisperTranscribe`) which calls OpenAI’s Whisper API (or a hosted Whisper model) to get text transcripts. This transcript is saved in the DB linked to that speaking response.

2. **DeepSeek Text Analysis:** For Writing and for each speaking transcript, we send the text to DeepSeek’s API. DeepSeek returns a detailed analysis (fluency, grammar, vocabulary richness, coherence). We parse and display:

   * A **CLB score** estimate for each response (and section average).
   * A breakdown of criteria (e.g. “Grammar: 7/10”, “Content Relevance: 8/10”).
   * **Error highlights**: red-underlined grammar issues, blue suggestions, etc.
   * **Positive notes**: e.g. “Good use of vocabulary.”
     This mimics the official rubric categories (Content, Vocabulary, Readability).

3. **Hume AI Emotion/Tone Analysis:** We send the raw audio (or even the transcript with timing) to Hume’s API to get emotional tone scores (confidence, nervousness, enthusiasm). Hume returns e.g. {joy:0.2, enthusiasm:0.7, confidence:0.6}. We translate this into feedback like “Your tone was somewhat neutral; adding more enthusiasm could improve clarity.” This is unique to our app as **Hume AI adds an emotion dimension** not present in traditional CELPIP scoring.

4. **Feedback Delivery:** All feedback is assembled and shown on the Results page. We ensure it’s *actionable*: bullet lists of “tips” (e.g. “Review present perfect tense usage”, “Try to speak more slowly to improve clarity”, “Use transitional phrases (“however”, “for example”)).

## Progress Tracking & Study Plan

* **Dashboard Charts:** Use a React chart library (or custom SVGs) to plot past scores per section, showing CLB level improvements. Each section’s history can be toggled.
* **Weakness Analytics:** The system logs common errors from DeepSeek feedback (e.g. number of times a specific grammar rule was marked). Over multiple tests, we count frequencies. E.g. “Used past tense incorrectly 15 times in last 3 tests.” We surface the top 3 issues.
* **Adaptive Plan:** Based on weak areas, the app suggests targeted practice: e.g. if speaking shows low scores in fluency, recommend extra speaking drills or an interactive tutor. If writing shows poor organization, suggest an outline exercise. These suggestions could be links to specialized mini-lessons (not built yet, but placeholder for future modules).

## UI/UX Design

* **Theme:** Dark mode by default (CSS classes `dark:bg-gray-900`, `text-white`, etc.). Accent colors are subtle neon blues/greens for highlights, matching an “intelligent” feel.
* **Navigation:** A persistent header/nav bar (showing logo, user menu) and a sidebar or breadcrumbs on larger screens for test sections. Framer Motion provides smooth transitions (e.g. page fade or slide between sections, subtle animations on feedback highlights).
* **Responsiveness:** Layout stacks on mobile: navigation collapses into a hamburger menu. Question and answer areas expand full width on small screens. Audio recording UI adapts (bigger buttons, easier tap targets). Tailwind’s breakpoints (sm/md/lg) will be used throughout.
* **Sample Screens:** (Images above are conceptual; we did not embed actual UI mocks, but illustrations of activities.)

## Tech Stack Summary

* **Frontend:** Next.js (React) with TypeScript. Uses **pages** directory for routes: e.g. `/dashboard`, `/test/complete`, `/test/reading`, etc. Tailwind CSS for styling and dark mode. Framer Motion for animations.
* **Backend:** Supabase as BaaS. We use Supabase Auth for user accounts, Supabase Postgres for data storage, and Supabase Storage for audio files.
* **Serverless Functions:** Supabase Edge Functions (written in TypeScript) handle calls to Whisper, DeepSeek, Hume, and also background tasks like generating transcripts and emails. We leverage Supabase’s new AI inference support to run any small models or to orchestrate API calls.
* **Payments:** Stripe for subscription billing. A Next.js API route (`/pages/api/stripe-webhook.ts`) listens to webhooks (payment success, subscription change) and updates the Supabase database. The frontend uses Stripe.js to handle checkout flows.
* **Audio Handling:** We record with the Web Audio API in-browser, then upload to Supabase Storage (with appropriate metadata linking to `user_id` and `response_id`).

All environment variables (Supabase URL/Key, Stripe keys, API keys for Whisper/DeepSeek/Hume) are stored in `.env.local`. CI/CD should ensure these are securely provided.

## Database Schema

All data is stored in Supabase (PostgreSQL). Key tables and columns are:

* **users**: *Stores user accounts.* Columns:

  * `id (UUID, PK)`, `email (unique)`, `password_hash` (handled by Supabase Auth), `first_name`, `last_name`, `created_at`, `subscription_id` (FK to subscription), etc.

* **subscriptions**: *Subscription plans.*

  * `id (PK)`, `name (e.g. Free/Standard/Premium)`, `stripe_product_id`, `stripe_price_id`, `features_json` (what features each tier gets).

* **tests**: *Definition of test sets.*

  * `id`, `name` (e.g. “Practice Test A”), `description`, `total_time` (e.g. 159 minutes).

* **sections**: *Sections within a test (LSRW).*

  * `id`, `test_id` (FK), `name` (Listening/Reading/etc.), `order_index`, `time_limit_min` (47, 55, 53, 20).

* **questions**: *All questions/prompts.*

  * `id`, `section_id` (FK), `prompt_text` (question or passage), `question_type` (enum: 'mcq','audio','text'), `options_json` (for MCQ choices), `correct_answer` (for MCQs), `media_url` (if the question has an audio or image resource).

* **user\_tests**: *An instance of a user taking a test.*

  * `id`, `user_id`, `test_id`, `started_at`, `completed_at`, `score_overall`, `clb_overall`.

* **user\_section\_results**: *User’s result for one section.*

  * `id`, `user_test_id` (FK), `section_id` (FK), `score_raw`, `score_clb`, `started_at`, `finished_at`.

* **user\_answers**: *User’s answers to MCQs.*

  * `id`, `user_section_result_id` (FK), `question_id` (FK), `answer` (text), `is_correct` (bool).

* **writing\_responses**: *Text submissions for writing tasks.*

  * `id`, `user_section_result_id` (FK), `question_id` (FK), `content_text`, `ai_score` (numeric), `ai_feedback_json`.

* **speaking\_responses**: *Audio submissions for speaking tasks.*

  * `id`, `user_section_result_id` (FK), `question_id` (FK), `audio_url` (Supabase Storage path), `transcript_text`, `ai_score`, `ai_feedback_json`.

* **ai\_feedback\_details**: *Detailed feedback entries (optional).*

  * `id`, `response_id` (FK to writing or speaking), `type` ('grammar','vocab','pronunciation', etc.), `feedback_text`.

* **progress\_insights**: *Aggregated user performance stats.*

  * `id`, `user_id`, `metric` (e.g. 'common\_grammar\_error'), `detail` (JSON or text describing issue), `frequency`.

* **recommendations**: *Study recommendations.*

  * `id`, `user_id`, `recommendation_text`, `created_at`.

* **payments**: *Stripe payment records.*

  * `id`, `user_id`, `stripe_payment_id`, `stripe_sub_id`, `amount`, `currency`, `status`, `created_at`.

* **logs** (optional): *System logs or email logs.*

Each table includes timestamps (`created_at`, `updated_at`) as needed. Foreign keys enforce relationships (e.g. `user_section_results` → `user_tests` → `users`). This schema supports tracking complete test sessions, detailed responses, and AI analysis results.

## Project Structure

A suggested Next.js project layout is shown below. We place pages in `/pages` for routing; Edge Functions in a `/supabase/functions` folder; and other utilities as needed. Tailwind config and other boilerplate are set up in the root.

```
/celpip-practice-app
├── /public
│   ├── favicon.ico
│   └── audio/             # (Optional) static audio files or icons
├── /src
│   ├── /components
│   │   ├── Layout.tsx     # Main layout (header/footer)
│   │   ├── Timer.tsx      # Countdown timer component
│   │   ├── QuestionCard.tsx 
│   │   ├── AudioRecorder.tsx
│   │   └── ... 
│   ├── /pages
│   │   ├── index.tsx      # Landing page / login prompt
│   │   ├── signup.tsx
│   │   ├── login.tsx
│   │   ├── dashboard.tsx
│   │   ├── subscription.tsx  # plan selection / billing
│   │   ├── /test
│   │   │   ├── complete-test.tsx  # Start full test
│   │   │   ├── listening.tsx
│   │   │   ├── reading.tsx
│   │   │   ├── writing.tsx
│   │   │   └── speaking.tsx
│   │   ├── /results
│   │   │   └── [userTestId].tsx  # Shows scores and feedback
│   │   └── /api
│   │       ├── stripe-webhook.ts
│   │       ├── ...            # any Next.js API routes if needed
│   ├── /styles
│   │   └── globals.css
│   ├── /utils
│   │   ├── supabaseClient.ts
│   │   ├── timerUtils.ts
│   │   └── audioUtils.ts
│   └── /hooks
│       └── useAuth.ts
├── /supabase
│   ├── /functions
│   │   ├── whisperTranscribe.ts    # Edge Function for Whisper API
│   │   ├── deepscoreAnalysis.ts    # calls DeepSeek API
│   │   ├── humeEmotion.ts          # calls Hume API
│   │   └── sendFeedbackEmail.ts
│   ├── /migrations
│   │   └── schema.sql             # SQL to create the above tables
│   └── /seed
│       └── initialData.sql        # (Optional) seed sample test questions
├── .env.local          # Contains Supabase/Stripe/API keys (not committed)
├── tailwind.config.js
├── next.config.js
├── tsconfig.json
├── package.json
└── README.md
```

This structure cleanly separates components, pages, and backend logic. The `/supabase/functions` folder is where we write TypeScript edge functions that can be deployed via the Supabase CLI. The `/src/pages` follow Next.js conventions for routing. The `/components` folder holds reusable UI parts (headers, timers, question layouts). Utility modules handle things like recording audio or formatting time.

All communications to AI services occur through these edge functions to keep secrets safe and allow server-side processing. The React frontend calls them via fetch (e.g. `await fetch('/api/runDeepSeek', { ... })`).

## Summary

This design outlines a **production-ready** CELPIP practice app. It supports full-length mock tests with realistic timing, leverages AI for instant, deep feedback on writing/speaking (with transcription and emotional analysis), and tracks user progress over time. The dark-themed Tailwind UI and Framer Motion animations ensure a polished user experience. Our schema and file structure lay a clear roadmap for developers to build and scale the platform. All features are scoped for an MVP **but built fully out**: including Stripe billing, email notifications, retry/error handling, and analytics, ensuring no steps are missing before a launch-ready release.

**Sources:** The CELPIP test format and sample test guidance inform our timing and structure. Supabase’s AI Edge Functions capability supports our AI integrations. The user interface design is inspired by modern UI principles and example projects using Tailwind CSS (dark mode) and Framer Motion (animations).
