FROM oven/bun:1-alpine

WORKDIR /app

COPY package.json bun.lock bunfig.toml tsconfig.json /app/
RUN bun install --frozen-lockfile

COPY index.ts style.css /app/
COPY *.html /app/

RUN addgroup -S app \
    && adduser -S -G app app \
    && chown -R app:app /app

ENV HOST=0.0.0.0
ENV PORT=3000
ENV NODE_ENV=production

EXPOSE 3000

USER app

CMD ["bun", "run", "/app/index.ts"]
