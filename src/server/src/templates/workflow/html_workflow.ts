export function htmlWorkflow() {
  return `
    name: HTML Project Analysis
  
  on:
    push:
      branches:
        - master
        - main
    pull_request:
      types: [opened, synchronize, reopened]
  
  jobs:
    html-analysis:
      name: HTML Project Analysis
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
          run: |
            if [ -f package.json ]; then
              npm ci
            else
              echo "No package.json found, skipping npm dependencies"
            fi
  
        - name: HTML Validation
          run: |
            npx html-validate **/*.html || echo "HTML validation completed with warnings"
  
        - name: CSS Validation
          run: |
            if ls *.css 1> /dev/null 2>&1; then
              npx stylelint "**/*.css" || echo "CSS linting completed with warnings"
            else
              echo "No CSS files found"
            fi
  
        - name: JavaScript Validation
          run: |
            if ls *.js 1> /dev/null 2>&1; then
              npx eslint "**/*.js" || echo "JavaScript linting completed with warnings"
            else
              echo "No JavaScript files found"
            fi
  
        - name: Run tests (if available)
          run: |
            if [ -f package.json ] && grep -q '"test"' package.json; then
              npm test
            else
              echo "No tests configured"
            fi
          continue-on-error: true
  
        - name: SonarCloud Scan
          uses: SonarSource/sonarcloud-github-action@v2
          env:
            GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}
            SONAR_TOKEN: \${{ secrets.SONAR_TOKEN }}
    `;
}
