# Custom AI Agent Skills

This directory is where you can drop your custom instructions, scripts, and resources to extend the AI's capabilities for specialized tasks.

## Structure 

Each skill must have its own directory containing at least a `SKILL.md` file. 

```
.agents/skills/
└── my-custom-skill/
    ├── SKILL.md       # (Required) Main instructions with YAML frontmatter
    ├── scripts/       # (Optional) Helper scripts & utilities
    ├── examples/      # (Optional) Reference implementations
    └── resources/     # (Optional) Files, templates, assets
```

## Creating `SKILL.md`

Your `SKILL.md` file needs YAML frontmatter with a **name** and **description**:

```markdown
---
name: my-custom-skill
description: Step-by-step instructions on how to do a specific custom task
---

Write your detailed markdown instructions here...
```
