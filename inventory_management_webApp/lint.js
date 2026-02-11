
const { ESLint } =require("eslint");

async function runLinter() {
  const eslint = new ESLint(); 
  const results = await eslint.lintFiles(["."]);

  const formatter = await eslint.loadFormatter("stylish");
  const resultText = formatter.format(results);

  console.log(resultText);

  const hasErrors = results.some(result => result.errorCount > 0);
  if (hasErrors) {
    process.exitCode = 1;
  }
}

runLinter().catch((error) => {
  console.error("Linting failed:", error);
  process.exit(1);
});
