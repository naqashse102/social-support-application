
---

# Architecture & Design Decisions

### 1. The Tech Stack Choice

The goal was to keep the project lightweight but "production-ready." I avoided heavy UI libraries (like MUI or Ant design) to keep full control over the DOM, which is critical for government-standard accessibility and RTL support.

* **React + Vite + TS:** For the fastest dev loop and strict type safety.
* **Tailwind CSS (v4):** For styling without the overhead of CSS-in-JS.
* **Zod + React Hook Form:** Zod handles the source of truth for validation, and RHF keeps the interactive forms snappy by avoiding unnecessary re-renders.
* **Axios + Retry:** Since the OpenAI API can occasionally timeout or hit rate limits, I implemented a retry logic to make sure the "Help Me Write" feature doesn't just hang or fail on the first attempt.

### 2. Research & UX (The UAE Gov Standard)

Before coding, I did some R&D on existing UAE government portals. I noticed a pattern of clean, high-contrast layouts and specific accessibility requirements. This influenced:

* **Theme & Typography:** High readability and "safe" professional colors.
* **Direction Handler:** I didn't just flip the text; I created a dedicated `DirectionHandler`. It manages the `dir` attribute globally so that native browser elements (like scrollbars and inputs) behave correctly in Arabic.

### 3. Modular Folder Structure

I organized the `src` directory to be highly scalable. By separating `services`, `validations`, and `components/common`, we ensure that any new developer can find logic without hunting through giant files.

### 4. The Wizard

The `WizardContainer` is the orchestrator. Even though each step (Personal, Financial, Situation) is an isolated module, they all share a single `FormProvider`, they are logically independent, making it easy to add or remove steps in the future.

* **Step 1 & 2:** Use manual storage on "Next" click.
* **Step 3:** Since it involves long-form descriptions, I implemented auto-save logic to ensure the user doesn't lose their AI-generated content.

### 5. AI Integration Strategy

For the "Help Me Write" feature, I built a hybrid approach. If an OpenAI key is missing, it’s a one-line change in `api.https.ts` to switch to the Beeceptor mock.

* **UI Polish:** I added a typewriter effect to make the AI response feel interactive rather than just a sudden wall of text.
* **Error Handling:** Meaningful red alerts appear if the API fails, ensuring the user is never left wondering what happened.

### 6. Accessibility & Keyboard UX (A11y)

This was a major focus. I implemented:

* **Keyboard Navigation:** Standardized Tab and Enter handling.
* **Event Capturing:** I used a "Capture Phase" listener on the Modals. This stops the "Enter" key from triggering the background Wizard steps when a user is just trying to accept an AI suggestion.
* **ARIA Linking:** Every custom input is programmatically linked to its error message (`aria-describedby`), so screen readers announce errors immediately.

### 7. Testing Strategy

I swapped **Jest** for **Vitest**. As per the official Jest documentation, it has known compatibility issues with Vite's plugin system. Vitest provides the same API but runs significantly faster and shares the same config as the app.

### 8. Room for Optimization

While the current version is solid, But I see clear areas where we could push this further in a production environment:

* **Translation for Zod:** Currently, some validation messages are hardcoded. Moving these into the i18n JSON files would be the next step.
* **Advanced Animations:** While I used Tailwind for transitions, using a library like Framer Motion for the step-to-step "slide" would make the transitions even more fluid.
* **Tooltips & Notes:** Adding "Suggestion Notes" or helper tooltips next to complex financial fields would further reduce user friction.
* **Memoization:** I’ve used `useMemo` in parts for display purposes, but as the form grows to 10+ steps, more aggressive memoization of individual inputs would help maintain 60fps performance.

---
