---
title: "How to deploy AI securely at work"
date: "2026-11-10"
description: "Stop writing vague one-liners. Learn the structure of a prompt that produces line-level findings, working exploits, and actionable incident-response steps."
tags: [AI, Prompting, Security Engineering]
image: /images/cover-1.svg
featured: true
---


## TL'DR - Key Points
- AI lives on a separate VM isolated environment away from corporate network
- AI has  its own identity, tokens, and are short lived+
- Never work with live data, always obscure, redact emails, phone, names, any PII
- Decided the solution you are trying to solve, is it a visualization, a correlation, web application?
- Work with the languages you are familiar with, don't just spray and pray with your agent
- Mock-up fast, stick to simple features first and get a working project with sample data running
- Document your application as you are developing it, this will help you and your agent
- Find a way to track features, bugs, requests, improvements
- Plan before you decide on what technology stack to use, if time allows try different ones
- Use version control this is your best friend(ie: github, git, gitlabs)

## A practical guide to building with AI without compromising security, quality, or control


AI tools are changing the way we work. However...

**We've become so focused on what AI can build that we sometimes forget to consider how it should be built.**

Let's have a high level view of some basic house keepings you want to do when using AI tools on to develop in a corporate environment.


## 1. Isolation First

One of the most important principles is to separate your AI development environment from your corporate infrastructure.

**My preferred approach is to run AI development tools inside a dedicated virtual machine (VM).**

Ideally, this environment should have:
- A separate, isolated network with no unrestricted access to corporate systems.
- No direct access to production databases, file shares, or sensitive internal resources.
- Restricted outbound internet connectivity where appropriate.
- Snapshots or a straightforward way to restore the environment.
- Only the applications, dependencies, and permissions necessary for development.

## 2. Give AI Its Own Identity, Not Yours
When integrating AI agents with APIs, repositories, cloud services, or other development tools, avoid allowing them to operate using your personal administrative credentials.

- **Least privilege:** Only grant the permissions necessary for the task.
- **Short-lived credentials:** Prefer temporary tokens that expire automatically.
- **Restricted scope:** Limit credentials to specific resources.
- **Credential rotation:** Regularly rotate or revoke tokens.
- **Auditability:** Make AI-related actions identifiable in logs.
- **Human approval:** Require explicit confirmation for sensitive operations.

## 3. Never Develop Against Live Corporate Data
This is particularly important when working with cybersecurity tools, reporting systems, databases, and internal applications.

Your dataset could contain employee names, email addresses, phone numbers, internal IP addresses, hostnames, customer information, infrastructure details, or other sensitive information.

**Use synthetic or appropriately anonymised data instead.**

|Original data|Development sample|
|---|---|
|[john.smith@company.com](mailto:john.smith@company.com)|[user01@example.com](mailto:user01@example.com)|
|John Smith|Employee_001|
|+44 7700 900123|+44 1122 000123|
|Internal server hostname|SERVER-001|
|Customer organisation|CUSTOMER-A|
|Production API token|MOCK_TOKEN|

For relational datasets, keep consistent mappings between records so that correlations continue working, or create a separate script that will help you to anonymised the data so its consistent.

## 4. Understand the Problem Before Asking AI to Solve It

Before opening your favourite AI agent, ask yourself a simple question:

**What exactly am I trying to achieve?**

Are you trying to:
- Visualise relationships between different datasets?
- Correlate records from multiple sources?
- Automate a repetitive administrative task?
- Build a web application?
- Generate reports?
- Create a searchable knowledge base?

## 5. Work With Technologies You Understand
Everything might work beautifully while the agent is generating code.

But what happens when something breaks?

My recommendation is simple:

**Start with programming languages and frameworks you're already comfortable with.**

If you know PowerShell, use PowerShell for automation tasks.
If you're comfortable with Python, use it for data processing and backend services.
If you know JavaScript and Node.js, consider those for web applications.

The goal is not simply to generate working code.
**The goal is to generate code that you can understand, troubleshoot, secure, and maintain.**

## 6. Prototype Quickly, Then Build Incrementally

AI tools are fantastic for rapid prototyping.

Take advantage of that.

Your first version might only need to:

1. Load a sample CSV file.
2. Display the records in a searchable table.
3. Filter assets by business unit.
4. Show a few useful statistics.

That's it.

Get those four features working reliably before introducing complex ownership graphs, external integrations, authentication, or advanced reporting.

**Start small. Make it work. Understand it. Then expand.**


## 7. Documentation Is Part of Development, Not an Afterthought

One of the best habits you can develop when working with AI coding agents is documenting your project as you build it.

AI agents work much more effectively when they have clear, structured information about the application.

Without documentation, you may find yourself repeatedly explaining the same requirements, project structure, design decisions, and technical constraints.

A simple project documentation structure could look like this, but you could also document each API individually.

```text
project/
├── README.md
├── docs/
│   ├── architecture.md
│   ├── requirements.md
│   ├── data-model.md
│   ├── decisions.md
│   └── security.md
├── src/
├── tests/
└── package.json
```

Each file serves a purpose.
**README.md** explains what the application does, how to install it, and how to run it.
**architecture.md** describes the major components and how they communicate.
**requirements.md** tracks the application's objectives and expected behaviour.
**data-model.md** explains the structure of the data and relationships between records.
**decisions.md** records why particular technologies or approaches were chosen.
**security.md** documents security boundaries, authentication requirements, and known risks.


## 8. Track Features, Bugs, and Improvements

As your project grows, so will the number of ideas, issues, and feature requests.

You don't need an expensive enterprise platform.

GitHub Issues, GitLab Issues, or even a simple Markdown file can be enough.

Consider tracking work using categories such as:

|Category|Example|
|---|---|
|Feature|Add asset filtering by business unit|
|Bug|Search results contain duplicate hostnames|
|Improvement|Optimise CSV lookup performance|
|Security|Remove unnecessary API permissions|
|Documentation|Update deployment instructions|
|Technical debt|Refactor duplicated validation logic|

Give each task a clear description and a definition of what successful completion looks like.

When asking an AI agent to implement a change, reference the specific task and define its boundaries.
For example:

*"Implement the asset filtering feature described in issue #12. Avoid modifying unrelated components. Add tests and update the relevant documentation."*


## 9. Plan Your Technology Stack Before Committing

AI tools make it easy to experiment with unfamiliar technologies.

That's a great opportunity, but it doesn't mean every project needs the latest framework.

Before selecting a stack, consider:

- What is the application's purpose?
- How much data will it process?
- Will it have one user or hundreds?
- Does it require real-time updates?
- Where will it be hosted?
- What security requirements apply?
- Who will maintain it?
- How complicated will deployment become?

For a lightweight internal application, a simple stack may be perfectly sufficient.
**Always remember, to perform optimization stage on your code, to avoid bottle necks on performance**

## 10. Version Control Is Your Best Friend
If there's one development practice I would strongly encourage everyone using AI coding agents to adopt, it's version control.

If there's one development practice I would strongly encourage everyone using AI coding agents to adopt, it's version control.

AI agents can make enormous numbers of changes in a short period.

Sometimes those changes are excellent.

Sometimes they break your application.

Make sure you are familiar on how to restore back to a previous version.
I recommend keeping the version control always a manual task, so you exactly where you are within the code tree.

A simple workflow might look like this:

```bash
# Initialise your repository
git init

# Create a branch for a new feature
git switch -c feature/asset-search

# Review what changed
git diff

# Stage and commit reviewed changes
git add .
git commit -m "Add asset search functionality"
```

Or if you want to be cool, c**reate a function to encapsulate all the commands into one.**
```powershell
function update-git($messagr){
git add * ; git -commit -m $message ; git push origin main
}
```

## 11. Never Confuse Working Code With Secure Code

There's another important point worth discussing.

Just because an AI-generated application works doesn't mean it's secure.
A successful build tells you very little about the security of the resulting software.
AI-generated code can still contain:

- SQL injection vulnerabilities.
- Cross-site scripting (XSS).
- Insecure authentication or authorisation.
- Hardcoded secrets.
- Unsafe file handling.
- Outdated or vulnerable dependencies.
- Excessive permissions.
- Missing input validation.

Treat AI-generated code like any other contribution to your codebase.

Review it, test it, and validate it against your security requirements.

Use automated dependency scanning, static analysis, and security testing where appropriate.

For web applications, the OWASP Application Security Verification Standard (ASVS) and Web Security Testing Guide (WSTG) provide useful references.

And don't let an AI agent deploy applications to production without appropriate testing, review, and approval.

**AI can accelerate development, but it cannot take ownership of your security responsibilities.**

## 12. Stay in Control of Your Agent

Finally, remember that AI agents are tools, not autonomous engineering authorities.

You should be making the important decisions.
The agent should be helping you implement them.

Rather than asking:
*"Build me an entire enterprise application for managing infrastructure."*

Try a more controlled approach:

*"Create a minimal web application using Node.js and the existing project structure. Use synthetic data to display an inventory table with search and filtering. Do not add authentication or external integrations at this stage. Explain any new dependencies, add basic tests, and document your changes."*

The second instruction provides clear boundaries, technical expectations, and a measurable outcome.

As you become more experienced, you can give agents more autonomy within well-defined limits.
The objective is to create a development process where AI improves your productivity without introducing unnecessary risk while keeping you in control of development.

## Final Thoughts: AI Should Accelerate Good Engineering, Not Replace It

We're entering an era where building software is becoming easier than ever.

Tasks that once required days of development can sometimes be prototyped in hours.

That's exciting, particularly for engineers who have ideas but limited time to implement them.

However, faster development doesn't automatically mean better engineering.

Security, documentation, architecture, testing, and maintainability remain just as important as they were before AI coding agents became widely available.

Keep your AI environment isolated. Protect your data. Control identities and permissions. Define the problem. Choose technologies you understand. Start small. Document your decisions. Track your work. Use version control. And always review what the agent produces.

**The correct way to use AI at work isn't to let it do everything. It's to use it to accomplish more while remaining responsible for what you build.**

AI should be your engineering assistant, not your replacement for engineering judgement. 

Build conscious