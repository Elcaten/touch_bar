# AGENTS.md

## Cursor Cloud specific instructions

### Product

Single-package **VS Code extension** (`vscode-touch-bar`) that adds Touch Bar shortcuts for macOS MacBook Pro. There is no backend, database, or HTTP service. End-to-end Touch Bar UI testing requires **macOS hardware with a Touch Bar**; Linux cloud VMs can still validate packaging and extension activation logic.

### Services

| Service | Required? | Notes |
|---------|-----------|--------|
| VS Code / Cursor Extension Development Host | Yes (on Mac for real Touch Bar) | Use **Run Extension** in `.vscode/launch.json` (F5) or `--extensionDevelopmentPath=${workspaceFolder}` |
| Touch Bar hardware | Yes for UI E2E | Not available on Linux CI/Cloud VMs |
| npm registry | Optional | Only when running `npx @vscode/vsce` to package |

### Dependencies

`package.json` declares **no** `dependencies` or `devDependencies`. `npm install` is a no-op but safe to run on VM startup.

Global `vsce` install may fail with `EACCES`; use **`npx --yes @vscode/vsce package`** instead.

### Lint / test / build

| Task | Command | Notes |
|------|---------|--------|
| Syntax check | `node --check main.js` | No ESLint/Prettier in repo |
| Package (build) | `npx --yes @vscode/vsce package` | Produces `.vsix`; use `--allow-star-activation` if vsce blocks `activationEvents: ["*"]` |
| Tests | **Do not run** `npm test` | Script is `npm test` → infinite recursion |
| Extension tests | `.vscode/launch.json` **Extension Tests** | `test/suite` directory is **missing** |

### Non-obvious gotchas

1. **`vscodeignore` vs `.vscodeignore`**: Repo file is named `vscodeignore` (no leading dot). `vsce` warns it is ignored; packaging still works but may include extra files (e.g. old `.tgz` in repo root).
2. **`main.js` API casing**: Uses `registercommand` / `executecommand` (lowercase). Real VS Code API is `registerCommand` / `executeCommand`; back/forward commands may not register until fixed.
3. **No `code` / `cursor` CLI** in PATH on typical Cloud VMs; use Desktop pane F5 or a local Mac for Extension Host debugging.

### Hello-world validation (Linux-friendly)

```bash
node --check main.js
npx --yes @vscode/vsce package --out /tmp/vscode-touch-bar.vsix
```

Optional: smoke-test `activate()` with a mocked `vscode` module (see setup walkthrough logs).
