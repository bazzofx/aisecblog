---
title: Building an AI-Assisted Code Review Workflow
date: 2026-10-28
description: A repeatable pipeline that pairs an LLM with a deterministic scanner so you get the depth of AI without the noise and false positives.
tags:
  - AI
  - Tooling
  - Code-Review
image: /images/cover2.png
---

Automated code review falls apart in two ways: a static analyzer flags everything, or an LLM flags nothing you can trust. The fix is to stop choosing between them and run them in sequence.

The pipeline I use has three stages:

- **Stage 1 — deterministic scan.** Run the scanner first (`semgrep`, `gitleaks`, `trufflehog`). It finds the mechanically detectable issues fast and cheap.
- **Stage 2 — AI triage.** Hand the scanner's findings to an LLM to confirm, de-duplicate, and prioritize. This is where the false positives die.
- **Stage 3 — AI deep review.** Give the LLM the changed files *plus* the confirmed findings, and ask it to find what the scanner cannot: logic flaws, authz gaps, and race conditions.

## Wiring it together

A minimal loop looks like this:

```bash
# Stage 1
semgrep scan --json > findings.json

# Stage 2 — triage with an LLM CLI
cat findings.json | claude "Confirm each finding. Drop false positives.
Return a table: Severity | Finding | File:Line | Confirmed?"
```

```text
You are reviewing a pull request for a web service.

Focus areas, in order:
1. Authentication and authorization checks
2. Injection and unsafe deserialization
3. Secrets and insecure defaults
4. Logic errors in critical paths

For each issue return:
- File and line
- Severity (Critical/High/Medium/Low)
- One-sentence fix
```

The key detail is the **ordered focus list**. Unordered, the model drifts toward style nits and naming. Ordered, it spends its budget on the categories that actually matter.

## What the AI is good at

- Spotting missing authorization checks (`if` blocks that never run).
- Explaining *why* a finding matters in business terms.
- Writing a suggested patch with the correct library call.

## What it is bad at

- Enumerating every sink across a 100-file codebase in one pass — it truncates.
- Replacing a real scanner — it misses and hallucinates.
- Judging performance or concurrency without running code.

> Use the scanner for recall and the model for precision.

## Reducing false positives

Feed the model your project conventions so it stops flagging things you already accept:

```text
Our project rules:
- We accept HTTP for internal-only services behind a mesh.
- Hardcoded test credentials under tests/ are acceptable.
- We pin dependencies with Dependabot; ignore CVEs already fixed.
```

Ten lines of context removes half the noise. Store it in a `review-context.md` file and prepend it to every run so the whole team reviews against the same baseline.

## The result

On a typical pull request the combined flow gives me a triaged list I can act on in minutes, with a confirmation trail for every finding. The scanner guarantees I do not miss the easy stuff; the model turns that raw list into a ranked, human-readable review.
