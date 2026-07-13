export const scenarios = [
    {
        name: "Comprehensive multi-type import file",
        content: `// Line 1: Comment
import { exec } from "child_process";
import dotenv from 'dotenv'
dotenv.config({ path: '.env' })

import express from "express";

import {
    router as routerFromapi,
    otherRoute
} from './api/routes.js';

const app = express()
app.use('/api', routerFromapi);`,
        expectedImports: [
            {
                source: "child_process",
                startLine: 2,
                endLine: 2,
                isNamed: true,
                isDefault: false
            },
            {
                source: "dotenv",
                startLine: 3,
                endLine: 3,
                isNamed: false,
                isDefault: true
            },
            {
                source: "express",
                startLine: 6,
                endLine: 6,
                isNamed: false,
                isDefault: true
            },
            {
                source: "./api/routes.js",
                startLine: 8,
                endLine: 11,
                isNamed: true,
                isDefault: false
            }
        ],
        expectedBlockBounds: {
            startLine: 2,
            endLine: 11
        }
    }
];
