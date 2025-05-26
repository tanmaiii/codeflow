# Components Directory

This directory contains all React components used in the application.

## Structure

- `common/`: Reusable UI components that are used across multiple features
- `features/`: Feature-specific components that are only used within a specific feature
- `layouts/`: Layout components that define the structure of pages

## Best Practices

1. Each component should be in its own directory with:
   - Component file (e.g., `Button.tsx`)
   - Styles (if needed)
   - Tests
   - Index file for exports

2. Use TypeScript for all components
3. Follow atomic design principles
4. Keep components small and focused
5. Use proper prop types and documentation 