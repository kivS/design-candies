FROM oven/bun:1-alpine AS builder

WORKDIR /app

COPY index.ts /app/
COPY *.html /app/
COPY style.css /app/
COPY build.ts /app/

RUN printf '{ "name": "design-candies-build", "private": true, "devDependencies": { "bun-plugin-tailwind": "^0.1.2", "tailwindcss": "^4.1.18" } }' > /app/package.json \
    && bun install \
    && bun run /app/build.ts

FROM alpine:3.20

WORKDIR /app

RUN apk add --no-cache libstdc++ libgcc \
    && addgroup -S app \
    && adduser -S -G app app

COPY --from=builder /app/design-candies /app/design-candies
COPY --from=builder /app/*.html /app/
COPY --from=builder /app/style.css /app/style.css

ENV PORT=3000
EXPOSE 3000

USER app

CMD ["/app/design-candies"]
