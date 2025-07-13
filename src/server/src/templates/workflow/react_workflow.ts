export function reactWorkflow() {
  return `name: SonarCloud Analysis - React

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

      - name: Type check (if TypeScript)
        run: |
          if [ -f tsconfig.json ]; then
            npx tsc --noEmit
          else
            echo "No TypeScript configuration found"
          fi

      - name: Run tests
        run: npm test -- --coverage --watchAll=false
        continue-on-error: true

      - name: Build project
        run: npm run build

      - name: SonarCloud Scan
        uses: SonarSource/sonarcloud-github-action@v2
        env:
          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}
          SONAR_TOKEN: \${{ secrets.SONAR_TOKEN }}
  `;
}
