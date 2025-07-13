export function expressWorkflow() {
  return `
  name: SonarCloud Analysis

on:
  push:
    branches:
      - main
      - master
      - develop
  pull_request:
    types: [opened, synchronize, reopened]

jobs:
  sonarcloud:
    name: SonarCloud Analysis
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Type check(only for typescript)
        run: |
          if [ -f tsconfig.json ]; then
            npx tsc --noEmit
          else
            echo "No typescript project"
          fi

      - name: Run tests (optional)
        run: npm test
        continue-on-error: true

      - name: SonarCloud Scan
        uses: SonarSource/sonarcloud-github-action@v2
        env:
          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}
          SONAR_TOKEN: \${{ secrets.SONAR_TOKEN }}
  `;
}
