# ruff-ai

> A GitHub App built with [Probot](https://github.com/probot/probot) that A code review bot using LLM to improve your code

## Setup

```sh
# Install dependencies
npm install

# Run the bot
npm start
```

## Docker

```sh
# 1. Build container
docker build -t ruff-ai .

# 2. Start container
docker run -e APP_ID=<app-id> -e PRIVATE_KEY=<pem-value> ruff-ai
```

## Contributing

If you have suggestions for how ruff-ai could be improved, or want to report a bug, open an issue! We'd love all and any contributions.

For more, check out the [Contributing Guide](CONTRIBUTING.md).

## License

[ISC](LICENSE) © 2025 ENGEDADOS
