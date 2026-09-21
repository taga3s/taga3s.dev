# taga3s-dev

[![deploy](https://github.com/taga3s/taga3s.dev/actions/workflows/deploy.yaml/badge.svg)](https://github.com/taga3s/taga3s.dev/actions/workflows/deploy.yaml)

Monorepo for https://taga3s.dev.

## 📌 packages

| name                                         | description                                              |
| -------------------------------------------- | -------------------------------------------------------- |
| [website](./packages/website)                | Worker to deliver website                                |
| [dispatcher](./packages/dispatcher)          | Worker to handle events and invoke RPCs                  |
| [blog-engine](./packages/blog-engine/)       | Worker to generate blog assets (OGP Images and RSS feed) |
| [metrics-engine](./packages/metrics-engine/) | Worker to query metrics and create reports               |
| [mdx2json](./packages/mdx2json)              | CLI to convert `.mdx` to `.json`                         |
