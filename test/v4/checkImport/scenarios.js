export const scenarios = [
    {
        name: "Default Import",
        content: "import routerFromapi from './api/routes.js';",
        expected: true
    },
    {
        name: "Named Import",
        content: "import { router } from './api/routes.js';",
        expected: true
    },
    {
        name: "Renamed Named Import",
        content: "import { router as routerFromapi } from './api/routes.js';",
        expected: true
    },
    {
        name: "Namespace/Star Import",
        content: "import * as apiRoutes from './api/routes.js';",
        expected: true
    },
    {
        name: "Direct/Empty Import",
        content: "import './api/routes.js';",
        expected: true
    },
    {
        name: "Mixed Default and Named Import",
        content: "import defaultRouter, { otherRoute } from './api/routes.js';",
        expected: true
    },
    {
        name: "Mixed Default and Namespace Import",
        content: "import defaultRouter, * as apiRoutes from './api/routes.js';",
        expected: true
    },
    {
        name: "No Extension Import",
        content: "import router from './api/routes';",
        expected: true
    },
    {
        name: "Double Quotes Import",
        content: 'import router from "./api/routes.js";',
        expected: true
    },
    {
        name: "Deep API Route Import",
        content: "import users from './api/v1/users.js';",
        expected: true
    },
    {
        name: "Parent Directory Relative Route Import",
        content: "import routes from '../api/routes.js';",
        expected: true
    },
    {
        name: "Multiline Import",
        content: `import {
    router,
    otherHandler
} from './api/routes.js';`,
        expected: true
    },
    {
        name: "Unrelated Import (Should fail)",
        content: "import express from 'express';",
        expected: false
    },
    {
        name: "Similar but Unrelated Import path (Should fail)",
        content: "import tapir from './tapir/routes.js';",
        expected: false
    }
];
