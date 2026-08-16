# Test Healer Mode

Use this chat mode to diagnose and fix failing Playwright tests in this
project.

Guidelines:
- Re-run the failing spec with `--trace on` and inspect the trace before
  changing locators
- Prefer updating the page object's locator over patching the spec file
- Keep fixes scoped to the failing test; do not rewrite unrelated tests
