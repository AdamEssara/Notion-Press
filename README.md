# Notion-Press 
###  **Book Quote Shorts**

A small web app that displays **short quotes/snippets from books** — like "reels for books".  
Users can auto-play quotes, navigate with arrows, like/share quotes, and enjoy a smooth reading experience.

---

##Features

- Shorts-style viewer– displays quotes one at a time, like reels.
- Auto-play mode-with adjustable interval (3s / 5s / 8s).
- Navigation controls– Prev/Next buttons + keyboard shortcuts.
- Like system – persistent with localStorage.
- Share button – Web Share API (mobile) or clipboard fallback.
- Clean UI– responsive, card-based layout with smooth transitions.
- Lightweight– Vanilla JS, CSS, HTML. No frameworks.

---
### Project Structure

book-quote-shorts/
│
├── index.html    # App layout & markup
├── styles.css    # Styling (dark theme, responsive layout)
├── app.js        # Core functionality: autoplay, navigation, likes, share
└── README.md     # Documentation

---

### Detail Explanatiions


**Shorts-Style Viewer**

-       Inspired by modern apps (YouTube Shorts, Instagram Reels).     
-       Instead of scrolling through a list, users focus on one quote at a time.      
-       Ensures minimal distraction and maximum impact of each quote.

**Autoplay with Adjustable Interval**

-     Default = 5 seconds (balanced reading speed).
-     Users can switch to 3s (fast) or 8s (slow).
-     Implemented with setInterval in JS, restartable when interval changes.

**Navigation Controls**

-       
-     Prev/Next buttons (‹, ›) + keyboard shortcuts.
-     Improves accessibility and allows fast manual navigation.
-     Keyboard (ArrowLeft, ArrowRight, Space) ensures desktop usability.
-   

**Like System (LocalStorage)**

-     Implemented via localStorage for persistence.
-     Even after refresh, likes are saved.
-     This simulates a real backend database, but lightweight for demo.

    
**Share Button (Web Share API + Clipboard)**

-   Uses Web Share API on mobile for native sharing (WhatsApp, etc).
-   Falls back to clipboard copy for desktop browsers.
-   Ensures graceful degradation.
- 

**Clean & Responsive UI**

-   Centered card layout: keeps quotes at the visual focus.
-   CSS transitions: smooth fade/slide when quotes change.
-   Responsive design: adjusts font size, padding, and buttons below 600px.
