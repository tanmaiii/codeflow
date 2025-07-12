export function workflowProperties({ organization, projectKey }: { organization: string; projectKey: string }) {
  return `sonar.organization=${organization}
sonar.projectKey=${projectKey}

# relative paths to source directories. More details and properties are described
# in https://sonarcloud.io/documentation/project-administration/narrowing-the-focus/
sonar.sources=.
`;
}
