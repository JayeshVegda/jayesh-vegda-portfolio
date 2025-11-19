import fs from "fs/promises";
import path from "path";

// Verify admin password
export function verifyAdminPassword(password: string): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123";
  return password === adminPassword;
}

// Read config file
export async function readConfigFile(filePath: string): Promise<string> {
  const fullPath = path.join(process.cwd(), filePath);
  return await fs.readFile(fullPath, "utf-8");
}

// Write config file
export async function writeConfigFile(filePath: string, content: string): Promise<void> {
  const fullPath = path.join(process.cwd(), filePath);
  await fs.writeFile(fullPath, content, "utf-8");
}

// Generate TypeScript array export from data
export function generateConfigExport(data: any, typeName: string, exportName: string): string {
  const dataString = JSON.stringify(data, null, 2);
  // Format dates properly
  const formatted = dataString.replace(/"(\d{4}-\d{2}-\d{2})T00:00:00.000Z"/g, 'new Date("$1")');
  
  return `import { ${typeName} } from "./types";

export const ${exportName}: ${typeName}[] = ${formatted};
`;
}

