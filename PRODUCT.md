# Product

<!-- impeccable:product-schema 1 -->

## Platform
web

## Users
Vietnamese students preparing for midterm, final, and national high school graduation exams.

## Product Purpose
Help students organize their own learning materials, review subjects, generate practice questions, and evaluate written answers from a locally running web app.

## Positioning
Study support is grounded in student-provided sources and a local Ollama model; the app separates generated guidance from cited source material and offers a second-pass consistency check.

## Operating Context
Students select one or more exam subject combinations, add study sources, and work subject by subject. The default interface language is Vietnamese, with an English option.

## Capabilities and Constraints
The app runs on the student's computer, stores documents in a local SQLite database, and calls Ollama on loopback. AI tasks use a second local-model pass to check the first draft against available source excerpts and mark unsupported claims. Runtime network access is limited to the local app and Ollama; the app does not fetch news or public web pages. Appearance preferences and custom themes stay in the local browser profile. Model output may still be wrong and requires student verification. OCR and unsupported document formats are not promised.

## Brand Commitments
The requested product name is "LocalNote". The interface should be minimal, lively with restrained subject emojis, bilingual, and Vietnamese-first.

## Evidence on Hand
No user-provided study documents or institutional endorsement are available at build time.

## Product Principles
- Keep study data on the student's computer.
- Show which materials informed generated study help.
- Distinguish evidence, uncertainty, and model-generated suggestions.
- Make subject and exam-combination selection explicit.
- Keep everyday study flows simple and approachable.
