# Stage 1: Compile Tailwind CSS
FROM oven/bun:1-alpine AS builder

WORKDIR /app

COPY package.json bun.lock bunfig.toml /app/
RUN bun install --frozen-lockfile

COPY *.html style.css /app/

# Compile Tailwind CSS (scans HTML files for used classes)
RUN bunx @tailwindcss/cli -i style.css -o style.compiled.css --minify

# Stage 2: Serve static files with nginx
FROM nginx:alpine

WORKDIR /usr/share/nginx/html

# Copy compiled CSS as style.css (HTML files reference ./style.css)
COPY --from=builder /app/style.compiled.css ./style.css

# Copy HTML files as-is
COPY --from=builder /app/*.html ./

RUN echo 'server { \
    listen 3000; \
    root /usr/share/nginx/html; \
    \
    location = / { try_files /index.html =404; } \
    location = /clicky-buttons { try_files /clicky-buttons.html =404; } \
    location = /theme-canvas { try_files /theme-canvas.html =404; } \
    location = /globes { try_files /globes.html =404; } \
    location = /sound-effects { try_files /sound-effects.html =404; } \
    location = /up { return 200 "OK"; add_header Content-Type text/plain; } \
    \
    location / { try_files $uri $uri.html $uri/ =404; } \
    \
    gzip on; \
    gzip_types text/plain text/css application/javascript application/json; \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
