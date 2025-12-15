Test Automation Solution Documentation
Overview

This project implements an automated test suite using Playwright, Cucumber (BDD), and TypeScript to validate the Practice Software Testing application.
The framework supports UI and API automation, runs against both main and buggy environments, and captures defects through automated failures and reports.

Project Structure(High Level)
features/      → Gherkin scenarios (UI & API)
src/pages/     → Page Object Model
src/steps/     → Step definitions & business logic
src/api/       → API client & API steps
src/support/   → Hooks & custom World
reports/       → HTML report & screenshots
helper/        → Actions
BUGS.md        → Documented defects

File Designed
features/
 ├── ui/                # UI feature files
 ├── api/               # API feature files

src/
 ├── pages/             # Page Object Model
 ├── steps/             # Step definitions & step services
 ├── api/               # API client & API steps
 ├── support/           # Hooks & custom World
 └── config/            # Environment configuration
 └── Action/            # Common methods


reports/
 ├── cucumber-report.json
 ├── cucumber-report.html
 └── screenshots/

BUGS.md                 # Document & defects
README.md

Tools and Technologies

TypeScript: Used as the primary language for strong typing, better maintainability, and scalable test development.
Playwright: Provides fast, reliable browser automation and built-in support for API testing via APIRequestContext.
Cucumber (BDD):Enables behavior-driven development using Gherkin syntax, improving test readability and collaboration.
cucumber-js: Executes Gherkin feature files and maps them to step definitions.
cucumber-html-reporter: Generates human-readable HTML test reports from Cucumber JSON output.
API Testing:The framework includes API-level automated tests implemented using Playwright’s APIRequestContext.
Node.js: JavaScript runtime used to execute the automation framework and manage dependencies.
rimraf: Utility used to clean report directories before test execution.

Environments:
| Environment | URL                                                                                            |
| ----------- | ---------------------------------------------------------------------------------------------- |
| Main UI     | [https://practicesoftwaretesting.com](https://practicesoftwaretesting.com)                     |
| Bug UI      | [https://with-bugs.practicesoftwaretesting.com](https://with-bugs.practicesoftwaretesting.com) |
| API         | [https://api.practicesoftwaretesting.com](https://api.practicesoftwaretesting.com)             |

Getting Started
1.Install Node.js (v18 or later) and npm.
2.Clone the repository and navigate to the project directory.
3.Run npm install to install project dependencies.
4.Install Playwright browsers using npx playwright install.
5.Install Cucumber extension
6.Build the project using npm run build.
Execute tests using the following commands:
    Main environment: SET TEST_ENV=main&& npm run test:main
    Bug environment:  SET TEST_ENV=bugs&& npm run test:bugs  
    API environment:  SET TEST_ENV=main&& npm run test:api

Dependencies

The following key dependencies are used in this project:
playwright – UI and API automation library
@playwright/test – Assertions and APIRequestContext support
@cucumber/cucumber – BDD framework for executing Gherkin scenarios
typescript – Strongly typed language for maintainable test code
ts-node – TypeScript execution support
cucumber-html-reporter – Generates HTML reports from Cucumber JSON output
rimraf – Utility for cleaning report directories before execution

Reporting

HTML and JSON reports generated after execution
Screenshots captured for both pass and fail UI scenarios
Reports available in reports/cucumber-report.html

Known issues or limitations :
 Bug environment tests are expected to fail

NOTE:The application contains multiple defects. For demonstration purposes and to showcase my testing experience, only a selected set of representative bugs has been documented in the BUGS.md file.







