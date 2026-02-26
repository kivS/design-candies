FROM oven/bun:1-alpine

# Create app user and directory BEFORE installing dependencies
RUN addgroup -S app && adduser -S -G app app && mkdir -p /app && chown app:app /app

WORKDIR /app

# Copy package files and install as app user to avoid chown
COPY --chown=app:app package.json bun.lock bunfig.toml tsconfig.json /app/

USER app

# Install production dependencies only
RUN bun install --frozen-lockfile --production

COPY --chown=app:app index.ts style.css /app/
COPY --chown=app:app *.html /app/

ENV HOST=0.0.0.0
ENV PORT=3000
ENV NODE_ENV=production

EXPOSE 3000

CMD ["bun", "run", "/app/index.ts"]
