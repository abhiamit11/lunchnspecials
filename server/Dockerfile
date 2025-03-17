FROM oven/bun:latest AS base
WORKDIR /usr/src/app

COPY package.json ./
COPY bun.lock ./

RUN bun install --frozen-lockfile

COPY . .

EXPOSE 5051

CMD ["bun", "run", "start"]