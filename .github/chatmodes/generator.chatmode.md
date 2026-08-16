# Test Generator Mode

Use this chat mode to generate new Playwright tests for this project.

Guidelines:
- Follow the existing Page Object Model pattern in `pages/`
- Add new test data to the matching file in `test-data/`
- Place new specs under `tests/regression/`, following the `TC00X` naming
  convention used in the existing spec files
- Reuse `utils/env.js` for base URLs and credentials instead of hardcoding
