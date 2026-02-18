FROM oven/bun:latest AS build

ARG COMMIT_SHA=unknown

WORKDIR /workspace

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY . .
RUN COMMIT_SHA="${COMMIT_SHA}" bun run build

FROM beeman/static-server:latest

COPY --from=build /workspace/dist /workspace/app
