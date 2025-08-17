// Import all workflow functions
import { ENUM_FRAMEWORK, ENUM_LANGUAGE } from '@/data/enum';
import { djangoWorkflow } from './django_workflow';
import { expressWorkflow } from './express_workflow';
import { nestjsWorkflow } from './nestjs_workflow';
import { nextjsWorkflow } from './nextjs_workflow';
import { reactWorkflow } from './react_workflow';
import { templateNodejs } from './template_nodejs';
import { htmlWorkflow } from './html_workflow';

// Export all workflow templates
export { djangoWorkflow } from './django_workflow';
export { expressWorkflow } from './express_workflow';
export { nestjsWorkflow } from './nestjs_workflow';
export { nextjsWorkflow } from './nextjs_workflow';
export { reactWorkflow } from './react_workflow';
export { templateNodejs } from './template_nodejs';
export { workflowProperties } from './workflow_propeties';
export { htmlWorkflow } from './html_workflow';

// Workflow map for easy access
export const workflowTemplates = {
  [ENUM_LANGUAGE.JAVASCRIPT_TYPESCRIPT]: {
    [ENUM_FRAMEWORK.EXPRESS]: expressWorkflow,
    [ENUM_FRAMEWORK.NESTJS]: nestjsWorkflow,
    [ENUM_FRAMEWORK.REACT]: reactWorkflow,
    [ENUM_FRAMEWORK.NEXTJS]: nextjsWorkflow,
    [ENUM_FRAMEWORK.NODEJS]: templateNodejs,
  },
  [ENUM_LANGUAGE.PYTHON]: {
    [ENUM_FRAMEWORK.DJANGO]: djangoWorkflow,
    [ENUM_FRAMEWORK.FLASK]: templateNodejs, // Tạm thời
  },
  [ENUM_LANGUAGE.JAVA]: {
    [ENUM_FRAMEWORK.SPRING_BOOT]: templateNodejs, // Tạm thời
  },
  [ENUM_LANGUAGE.DOTNET]: {
    [ENUM_FRAMEWORK.ASP_NET]: templateNodejs, // Tạm thời
  },
  [ENUM_LANGUAGE.STATIC]: {
    [ENUM_FRAMEWORK.HTML]: htmlWorkflow, // Tạm thời
  },
};
