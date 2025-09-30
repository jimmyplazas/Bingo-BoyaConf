# **App Name**: BoyaConf Bingo Bonanza

## Core Features:

- Google Login: Authenticate users via Google Sign-In using Firebase Authentication.
- Board Generation and Assignment: Automatically assign a randomly chosen, pre-defined 5x5 Bingo board to each user upon login. The possible boards are pre-defined by the administrator. The user's board is saved.
- Phrase Population: Populate the Bingo board squares with phrases that the administrator can customize.
- QR/ID Scanner: Scan another user's QR code, or manually input the user's ID, to mark a square.
- Self-Validation: Validate whether users are trying to sign themselves or are trying to add the same user's ID multiple times on their board. Display an appropriate message to the user when these scenarios occur.
- Bingo Detection Tool: Tool to automatically detect Bingo patterns (horizontal, vertical, diagonal, X, full board) as squares are marked. A LLM is not strictly necessary to perform this detection, but it might add interest by responding differently to each winning scenario.
- Admin Panel: Provide a basic admin panel to view players, manage Bingo boards, and track winners in real time.

## Style Guidelines:

- Primary color: Dark Blue (#2B182F), evoking the collaborative spirit of a conference and originality.
- Background color: Light lavender (#FFFFFF), for a soft, inviting backdrop.
- Accent color: Green (#4DCC89), providing contrast and highlighting interactive elements.
- Body and headline font: 'Inter', a grotesque Manrope for a neutral, contemporary style.
- Use clean, modern icons to represent actions (scanning, submitting) and status (marked, completed).
- Design a clear, responsive grid layout for the Bingo board to ensure easy interaction on all devices.
- Incorporate subtle animations to celebrate pattern completions and provide user feedback on interactions.