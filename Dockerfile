FROM oven/bun:latest AS build

WORKDIR /workspace

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY . .
RUN bun run build

FROM beeman/static-server:latest

COPY --from=build /workspace/dist /workspace/app
