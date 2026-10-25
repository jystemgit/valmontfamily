// Publication guard: no information becomes public merely because it exists in the repository.
// Fails the build if files that could expose non-public Family material are deployable.
import { readdir, readFile } from "node:fs/promises";
import { extname, join, relative } from "node:path";

const root = process.cwd();
const publicDirectory = join(root, "public");
const sourceDirectories = ["app", "components", "lib", "public"].map((directory) => join(root, directory));

const allowedPublicExtensions = new Set([".png", ".jpg", ".jpeg", ".webp", ".avif", ".svg", ".ico", ".woff", ".woff2"]);
const allowedRootFiles = new Set([".DS_Store"]);

const restrictedNamePatterns = [
  /constitution/i,
  /codex/i,
  /government/i,
  /capital/i,
  /marriage/i,
  /chronicle/i,
  /sovereign[-_ ]?(family|path)/i,
  /genealog/i,
  /acta|minutes/i,
  /private|privad|confiden|internal|interno/i,
];

const secretPatterns = [
  { name: "private key", pattern: /-----BEGIN [A-Z ]*PRIVATE KEY-----/ },
  { name: "AWS access key", pattern: /\bAKIA[0-9A-Z]{16}\b/ },
  { name: "GitHub token", pattern: /\bgh[pousr]_[A-Za-z0-9]{36,}\b/ },
  { name: "Stripe secret key", pattern: /\bsk_(live|test)_[A-Za-z0-9]{16,}\b/ },
  { name: "generic secret assignment", pattern: /\b(api[_-]?key|secret|password|passwd|token)\s*[:=]\s*["'][^"'\s]{12,}["']/i },
  { name: "IBAN", pattern: /\b[A-Z]{2}\d{2}(?: ?[A-Z0-9]{4}){3,7}\b/ },
  { name: "public environment secret", pattern: /NEXT_PUBLIC_[A-Z0-9_]*(SECRET|TOKEN|KEY|PASSWORD)/ },
];

async function listFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true }).catch(() => []);
  const files = await Promise.all(
    entries.map((entry) => {
      const path = join(directory, entry.name);
      return entry.isDirectory() ? listFiles(path) : [path];
    }),
  );
  return files.flat();
}

const problems = [];

for (const file of await listFiles(publicDirectory)) {
  const name = relative(publicDirectory, file);
  if (allowedRootFiles.has(name.split("/").pop())) continue;
  if (!allowedPublicExtensions.has(extname(file).toLowerCase())) {
    problems.push(`public/${name}: file type is not approved for public distribution`);
  }
  if (restrictedNamePatterns.some((pattern) => pattern.test(name))) {
    problems.push(`public/${name}: filename suggests an internal Family document`);
  }
}

for (const directory of sourceDirectories) {
  for (const file of await listFiles(directory)) {
    if (!/\.(tsx?|jsx?|mjs|css|json|md|txt|xml|svg)$/i.test(file)) continue;
    const content = await readFile(file, "utf8");
    for (const { name, pattern } of secretPatterns) {
      if (pattern.test(content)) problems.push(`${relative(root, file)}: possible ${name}`);
    }
  }
}

if (problems.length > 0) {
  console.error("Publication check failed. Remove these files or obtain explicit authorization:\n");
  for (const problem of problems) console.error(`  - ${problem}`);
  process.exit(1);
}

console.log("Publication check passed");
