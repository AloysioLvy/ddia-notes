# Designing Data-Intensive Applications Notes

An interactive study notebook for [Designing Data-Intensive Applications](https://dataintensive.net/) by Martin Kleppmann, built as a single-file HTML app.

## Features

- **Content** — Notes and key concepts for all 12 chapters, organized into 3 parts
- **Flashcards** — 15 review questions with reveal-on-click answers
- **Mind Map** — SVG visualization of the book's conceptual structure
- **Progress Tracker** — Per-chapter progress saved to `localStorage`

## Structure

The book is divided into three parts:

| Part | Chapters | Topic |
|------|----------|-------|
| I — Foundations | 1–4 | Reliability, Data Models, Storage, Encoding |
| II — Distributed Data | 5–9 | Replication, Partitioning, Transactions, Consensus |
| III — Derived Data | 10–12 | Batch Processing, Stream Processing, Future |

## Usage

Open `index.html` directly in a browser — no build step or server required.

## Stack

Plain HTML, CSS, and vanilla JavaScript. No dependencies.
