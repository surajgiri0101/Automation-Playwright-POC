FROM mcr.microsoft.com/playwright:v1.62.1-jammy

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# Ensure the container defaults to CI mode and debugging is disabled so Playwright won't add unsupported flags like --disable-animations
ENV DEBUG=false
ENV CI=true
ENV PWDEBUG=false
ENV PLAYWRIGHT_SKIP_WEBKIT_INSTALL=false

# Use an entrypoint that unsets any accidental debug flags and runs tests
CMD ["sh", "-lc", "unset DEBUG || true; unset PWDEBUG || true; export CI=true; npx playwright test"]
