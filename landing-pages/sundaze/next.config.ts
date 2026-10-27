import type { NextConfig } from "next";
import { existsSync, realpathSync } from "node:fs";
import path from "node:path";

const localDependencies = path.join(__dirname, "node_modules");
const dependencyRoot = existsSync(localDependencies)
  ? realpathSync(localDependencies)
  : localDependencies;
const linkedDependencies = dependencyRoot !== localDependencies;

const config: NextConfig = {
  devIndicators: false,
  turbopack: { root: __dirname },
  // Keep local shared installs inside Turbopack's resolution boundary.
  // A normal pnpm install uses this project's own node_modules directory.
  ...(linkedDependencies
    ? {
        experimental: {
          turbopackAdditionalRoots: {
            sharedDependencies: { path: dependencyRoot },
          },
        },
      }
    : {}),
};

export default config;
