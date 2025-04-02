# App Roadmap: Language Learning Tool with Leitner System Integration

## App Description

This application is a language learning tool designed to help users translate and memorize vocabulary efficiently. It allows users to select text or individual words, retrieve translations and dictionary entries via APIs or a local database, and save words to a Leitner box system for spaced repetition. Key features include real-time translation, dictionary lookup, word saving/removal, and hover-based tooltips for quick reference.

---

## Development Phases

### **Phase 1: Core Dictionary Lookup**

**Goal:** Enable basic word definition retrieval.  
**Key Features:**  
[x] Select a single word → fetch and display its dictionary entry.  
**Technical Tasks:**

1. Build a simple UI for word selection.
2. Integrate dictionary API (e.g., Oxford or Merriam-Webster).
3. Display results in a minimalistic interface.  
   ![Phase-1](./assets/ROADMAP-CHARTS/Phase%201.png)

---

### **Phase 2: Database Integration**

**Goal:** Cache frequently accessed words locally.  
**Key Features:**

- [x]   Check if a word exists in the local database.  
   -  [x] If yes: Retrieve from DB.  
   -  [x] If no: Fetch from API, save to DB, then display.  
    **Technical Tasks:**

1. Set up a local database (e.g., SQLite or IndexedDB).
2. Implement CRUD operations for word storage.
3. Optimize API calls by reducing redundancy.  
   ![Phase-2](./assets/ROADMAP-CHARTS/Phase%202.png)

---

### **Phase 3: Text Processing & Hover Interactions**

**Goal:** Extend functionality to full text selections.  
**Key Features:**  
[ ] Split selected text into individual words.  
[ ] Process each word (check DB/API, save new entries).  
[ ] Show definitions via hover tooltips.  
**Technical Tasks:**

1. Develop text-splitting logic (split by spaces/punctuation).
2. Implement hover event listeners for dynamic tooltips.
3. Batch-save new words to the database.  
   ![Phase-3](./assets/ROADMAP-CHARTS/Phase%203.png)

---

### **Phase 4: Multi-Tab Interface & Translation Support**

**Goal:** Add translation and spaced repetition features.  
**Key Features:**  
[ ] Two-tab result box (dictionary + translation).  
[ ] "Save to Leitner Box" button for memorization.  
**Technical Tasks:**

1. Integrate translation API (e.g., Google Translate).
2. Design a tabbed UI component.
3. Implement Leitner box logic (scheduling algorithm).  
   ![Phase-4](./assets/ROADMAP-CHARTS/Phase%204.png)

---

### **Phase 5: Performance Refinement**

**Goal:** Optimize database and UI interactions.  
**Key Features:**  
[ ] Prioritize user-saved words in database queries.  
[ ] Streamline hover interactions for responsiveness.  
**Technical Tasks:**

1. Add database indexing for faster lookups.
2. Debounce API calls during text selection.
3. Refactor tooltip rendering for smoother performance.  
   ![Phase-5](./assets/ROADMAP-CHARTS/Phase%205.png)

---

### **Phase 6: Core Functionality Setup**

**Goal:** Establish basic translation and dictionary lookup with database integration.  
**Key Features:**  
[ ] Select text/word → retrieve translation/dictionary entry.  
[ ] Save words to Leitner box/database.  
[ ] Display results in two tabs (dictionary + translation).  
**Technical Tasks:**

1. Implement text selection detection.
2. Integrate API for dictionary/translation data.
3. Set up local database for word storage.
4. Create result display component with tabs.
5. Add "Save to Box" button functionality.  
   ![Phase-6](./assets/ROADMAP-CHARTS/Phase%206.png)

---

### **Phase 7: Enhanced Word Management**

**Goal:** Add bulk word saving and hover tooltips.  
**Key Features:**  
[ ] "Add All Words to Box" button for selected text.  
[ ] Hover tooltips showing word definitions.  
**Technical Tasks:**

1. Develop logic to split text into individual words.
2. Implement "Add All Words" button with database batch insertion.
3. Add event listeners for word hover interactions.
4. Integrate tooltip component with dictionary data.  
   ![Phase-7](./assets/ROADMAP-CHARTS/Phase%207.png)

---

### **Phase 8: Database Check & UI Updates**

**Goal:** Optimize performance and UI by checking existing database entries.  
**Key Features:**  
[ ] Check if words exist in the database before API calls.  
[ ] Toggle "Add/Remove from Box" buttons based on word status.  
**Technical Tasks:**

1. Query database before fetching API data for unknown words.
2. Update UI to show "Remove from Box" if word is already saved.
3. Refactor translation logic to prioritize database lookups.  
   ![Phase-8](./assets/ROADMAP-CHARTS/Phase%208.png)

---

### **Phase 9: Error Handling & Loading Animations**

**Goal:** Improve user experience with feedback and reliability.  
**Key Features:**  
[ ] Loading animations during API calls.  
[ ] Error messages for failed API requests.  
[ ] Retry mechanism for failed operations.  
**Technical Tasks:**

1. Implement loading state indicators (spinners/animations).
2. Add error handling middleware for API failures.
3. Display retry prompts for failed saves/removals.
4. Test edge cases (e.g., network issues, invalid inputs).  
   ![Phase-9](./assets/ROADMAP-CHARTS/Phase%209.png)

---

## Dependencies

[ ] **Phase 1-5**: Foundation for core functionality and database setup.  
[ ] **Phase 6** depends on Phase 1-5’s infrastructure.  
[ ] **Phase 7** requires Phase 6’s UI components.  
[ ] **Phase 8** builds on Phase 7’s word management logic.  
[ ] **Phase 9** integrates enhancements across all prior phases.

## Next Steps

1. Prioritize backend API stability and database optimization.
2. Conduct usability testing after Phase 9.
3. Plan future phases (e.g., mobile support, multi-language dictionaries).
