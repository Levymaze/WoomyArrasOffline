# Woomy-Arras Offline

## Background

Woomy-Arras Offline is a community continuation of the original offline Woomy project after it lost funding and had to be taken down.

This codebase is based on core server files from August 2020 combined with older Arras source files. The original game Woomy Arras was created by HellCat and Clarise. Later, Drako Hyena recovered and rebuilt offline versions of the game files around 2018, which became the foundation for many offline Woomy projects.

This repository was later forked and modified by Spade1354, and is currently being expanded and maintained by LevyMaze.

The goal of this project is to preserve Woomy-Arras in an offline form while also experimenting with new game modes, mechanics, and developer tools.

---

## History / Credits

This project has passed through several contributors:

- Clarise
  Original creator of Arras / Arras.io.

- Drako Hyena
  Recovered and rebuilt offline Arras files around 2018.

- Spade1354
  Restored many missing tanks and added AI and bot improvements. Also merged multiple legacy sources to make the project playable offline.

- LevyMaze
  Added Growth modes, testing tools, admin features, and continues active development.

---

## What I Added

### Game Modes

- Re-added Growth FFA.
- Added several Growth hybrid modes including:
  - Growth 4TDM
  - Growth Siege (Boss Rush)
  - Growth Maze FFA

These modes are mainly for experimentation and fun while keeping the original Arras feel.

---

### Testing Tools

- Improved Beta Testing Panel:

  - Score editing
  - Skill point editing

- Added World Edit options inside the testing panel:
  - Change total bot count
  - Change total polygon count

---

### Admin / Developer Commands (Dev Token Required)

Added multiple admin commands for testing and moderation:

- I - Increase entity score
- U - Decrease entity score
- H - Instantly heal any entity
- Q - Instant teleport with temporary immunity
- (+) - Increase Field of View
- (-) - Decrease Field of View

Also added:

- A button to spawn bosses on any map.

These tools are mainly meant for development and sandbox testing.

---

## Ongoing Development

This project is still being worked on.

More features may be added over time.

---

## Latest Tank Additions

### 21 February 2026

- Added two tanks: `Wrench` and `Spanner`.
- Added upgrade path: `Basic -> Flank Guard -> Auto-3 -> Wrench / Spanner`.
- Updated tree links so these tanks appear under Auto-3.
- Added gameplay support so both tanks are playable in game modes, including Growth modes.
- Added custom turret/mockup sync updates so UI and in-game turret behavior stay aligned.
