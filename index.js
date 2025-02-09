#!/usr/bin/env node

import chalk from "chalk";
import { execSync } from "child_process";
import fs from "fs";
import { createRequire } from "module";
import path from "path";
import { fileURLToPath } from "url";

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Repository URLs
const REPOS = {
  prisma: "https://github.com/husseinmoqbel7/next-auth-prisma-starter",
  drizzle: "https://github.com/husseinmoqbel7/next-auth-drizzle-starter",
};

// Different env templates for each ORM
const ENV_TEMPLATES = {
  prisma: `DATABASE_URL=""
# Auth Secret from \`npx auth\`
AUTH_SECRET=""
# Google OAuth Credentials
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
# Github OAuth Credentials
GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""
# Resend API Key
RESEND_API_KEY=""
# Next.js App URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"
# Resend Email
RESEND_EMAIL=""`,
  drizzle: `DATABASE_URL=""
# Auth Secret from \`npx auth\`
AUTH_SECRET=""
# Google OAuth Credentials
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
# Github OAuth Credentials
GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""
# Resend API Key
RESEND_API_KEY=""
# Next.js App URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"
# Resend Email
RESEND_EMAIL=""
# Database Type (postgres, mysql, sqlite)
DATABASE_TYPE="postgres"`,
};

// Ensure dependencies are installed
const ensureDependencies = () => {
  const dependencies = ["rimraf", "chalk", "prompts"];
  for (const dep of dependencies) {
    try {
      require.resolve(dep);
    } catch (e) {
      console.log(chalk.yellow(`🔄 Installing ${dep}...`));
      execSync(`npm install ${dep}`, { stdio: "inherit" });
    }
  }
};
ensureDependencies();

const rimraf = require("rimraf");
const prompts = require("prompts");

// Create .env file with template
const createEnvFile = (projectPath, orm) => {
  const envTemplate = ENV_TEMPLATES[orm];

  try {
    fs.writeFileSync(path.join(projectPath, ".env.local"), envTemplate);
    console.log(chalk.green("✅ Created .env local file"));
  } catch (error) {
    console.error(
      chalk.red("❌ Failed to create .env local file:", error.message)
    );
    throw error;
  }
};

// Function to execute shell commands
const runCommand = (command) => {
  try {
    execSync(command, { stdio: "inherit", shell: true });
    return true;
  } catch (error) {
    console.error(chalk.red(`❌ Failed to execute: ${command}`));
    console.error(chalk.red(`Error: ${error.message}`));
    return false;
  }
};

// Validate project name
const validateProjectName = (name) => {
  if (!name) {
    console.error(chalk.red("❌ Please provide a project name!"));
    process.exit(1);
  }

  const invalidChars = /[^a-zA-Z0-9-_]/;
  if (invalidChars.test(name)) {
    console.error(
      chalk.red(
        "❌ Project name can only contain letters, numbers, hyphens, and underscores!"
      )
    );
    process.exit(1);
  }

  const reservedNames = [
    "node_modules",
    "public",
    "src",
    "test",
    "build",
    "dist",
  ];
  if (reservedNames.includes(name.toLowerCase())) {
    console.error(chalk.red(`❌ "${name}" is a reserved name!`));
    process.exit(1);
  }

  const targetDir = path.join(process.cwd(), name);
  if (fs.existsSync(targetDir)) {
    console.error(chalk.red(`❌ Directory "${name}" already exists!`));
    process.exit(1);
  }
};

// Cleanup in case of failure
const cleanup = (projectPath) => {
  if (fs.existsSync(projectPath)) {
    try {
      rimraf.sync(projectPath);
      console.log(
        chalk.yellow("\n🧹 Cleaned up project directory due to error.")
      );
    } catch (error) {
      console.warn(chalk.yellow(`\n⚠️ Failed to clean up: ${error.message}`));
    }
  }
};

// Update package.json
const updatePackageJson = (projectPath, projectName) => {
  const packageJsonPath = path.join(projectPath, "package.json");
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));

  packageJson.name = projectName;
  packageJson.version = "0.1.0";
  delete packageJson.bin;

  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
};

// Get ORM-specific setup instructions
const getSetupInstructions = (orm) => {
  const commonSteps = [
    "  2️⃣ Update your .env file with your credentials",
    "  3️⃣ Generate an AUTH_SECRET using: npx auth secret",
    "  5️⃣ Get your Resend API key from resend.com",
    "  6️⃣ Update RESEND_API_KEY and RESEND_EMAIL in .env",
  ];

  const ormSteps = {
    prisma: [
      "  4️⃣ Set up your database and update DATABASE_URL",
      "  7️⃣ Run prisma generate and prisma db push",
      "  8️⃣ Run the project with: npm run dev",
    ],
    drizzle: [
      "  4️⃣ Set up your database, choose DATABASE_TYPE, and update DATABASE_URL",
      "  7️⃣ Run npm run db:push to push the schema",
      "  8️⃣ Run the project with: npm run dev",
    ],
  };

  return [...commonSteps, ...ormSteps[orm]];
};

// Main function
const createTemplate = async () => {
  const projectName = process.argv[2];
  validateProjectName(projectName);

  // Prompt for ORM choice
  const response = await prompts({
    type: "select",
    name: "orm",
    message: "Select your preferred ORM:",
    choices: [
      { title: "Prisma", value: "prisma" },
      { title: "Drizzle", value: "drizzle" },
    ],
    initial: 0,
  });

  const orm = response.orm;
  const repoUrl = REPOS[orm];
  const projectPath = path.join(process.cwd(), projectName);

  console.log(chalk.cyan(`\n🚀 Initializing ${orm} project setup...\n`));

  // Clone the repository
  console.log(chalk.cyan("📥 Cloning template repository..."));
  if (!runCommand(`git clone ${repoUrl} ${projectName}`)) {
    cleanup(projectPath);
    process.exit(1);
  }

  // Navigate to project directory for subsequent commands
  process.chdir(projectPath);

  // Update package.json
  console.log(chalk.cyan("📝 Updating package.json..."));
  updatePackageJson(projectPath, projectName);

  // Create .env files
  console.log(chalk.cyan("📄 Creating environment files..."));
  try {
    createEnvFile(projectPath, orm);
  } catch (error) {
    cleanup(projectPath);
    process.exit(1);
  }

  // Install dependencies
  console.log(chalk.cyan("📦 Installing dependencies..."));
  if (!runCommand("npm install")) {
    cleanup(projectPath);
    process.exit(1);
  }

  // Remove .git folder using rimraf
  console.log(chalk.cyan("🗑 Cleaning up Git history..."));
  rimraf.sync(path.join(projectPath, ".git"));

  // Initialize fresh Git repo
  console.log(chalk.cyan("🌱 Initializing fresh Git repository..."));
  runCommand('git init && git add . && git commit -m "Initial commit"');

  console.log(
    chalk.green(
      `\n✅ Project "${projectName}" created successfully with ${orm}!\n`
    )
  );
  console.log(chalk.cyan("🚀 Next Steps:"));
  console.log(chalk.yellow(`  1️⃣ cd ${projectName}`));

  // Get and display ORM-specific instructions
  const instructions = getSetupInstructions(orm);
  instructions.forEach((instruction) => console.log(chalk.yellow(instruction)));

  console.log(chalk.green("\n🎉 Happy coding!\n"));
};

// Handle process termination
process.on("SIGINT", () => {
  console.log(chalk.yellow("\nProcess terminated by user."));
  process.exit(1);
});

// Run the main function
createTemplate().catch((error) => {
  console.error(chalk.red("An unexpected error occurred:", error));
  cleanup(path.join(process.cwd(), process.argv[2] || ""));
  process.exit(1);
});
