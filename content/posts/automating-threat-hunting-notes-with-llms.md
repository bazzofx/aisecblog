---
title: "Automating Threat-Hunting Notes with LLMs"
date: "2026-09-15"
description: "Turn raw telemetry into structured, searchable hunting hypotheses instead of a wall of copy-pasted command output."
tags: [AI, Threat Hunting, Automation]
image: /images/cover-3.svg
---

Good threat hunting produces a lot of fragments: a suspicious command line, a rare parent-child process pair, an odd DNS query. The hard part is turning those fragments into a narrative another analyst can follow six months later.

An LLM is genuinely useful here — not to "detect threats," but to structure, summarize, and connect the fragments you already found.

## The workflow

1. **Collect** — pull the raw evidence for a single hypothesis (a host, a process, a time window).
2. **Structured digest** — ask the model to normalize the evidence into a fixed template.
3. **Narrative** — ask it to write a short assessment of what the evidence does and does not show.

## The digest template

Give the model a strict schema so every note looks identical:

```text
Summarize the evidence below into exactly this format:

## Hypothesis
One sentence.

## Evidence
- [source] observation

## Gaps
What we still need to confirm.

## Confidence
High / Medium / Low, with one sentence of reasoning.

<evidence>
...
</evidence>
```

Here is a sample output:

| Field | Example |
| --- | --- |
| Hypothesis | PowerShell beaconing via scheduled task persistence |
| Evidence | schtasks.exe spawned by wmiprvse.exe at 03:12 UTC |
| Gaps | No outbound C2 destination confirmed yet |
| Confidence | Medium — timing and parent are unusual, no second host |

The value is consistency. When every analyst uses the same template, hunting notes become searchable and diffable, and handoffs stop being a game of telephone.

## Why not let it "find" threats?

Raw detection is where LLMs overreach. They will confidently connect dots that are not connected and invent evidence to fill gaps. Keep the model on the **summary side** of the pipeline, and keep the detection logic in tools you can test and audit.

> The model organizes the evidence; it does not collect it.

## Automating the boring parts

The same pattern works for:

- **Alert triage** — normalize vendor alerts into the template above.
- **Case notes** — turn chat logs into a clean incident timeline.
- **Reports** — expand a structured digest into a first-draft writeup.

In each case the rule is the same: fixed schema in, consistent document out.

## Getting started

Start with one hypothesis and a single host. Run the digest prompt manually, tweak the schema until it matches how your team actually works, then script it against your SIEM or EDR query output. The goal is a library of clean notes, not a magic black box.
