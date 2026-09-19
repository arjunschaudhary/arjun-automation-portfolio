import { spawn } from "node:child_process";

const incoming = process.argv.slice(2);
const args = ["dev"];

for (let index = 0; index < incoming.length; index += 1) {
  const value = incoming[index];
  if (value === "--host") {
    args.push("-H", incoming[index + 1]);
    index += 1;
  } else if (value === "--port") {
    args.push("-p", incoming[index + 1]);
    index += 1;
  } else if (value !== "--strictPort") {
    args.push(value);
  }
}

const child = spawn(process.execPath, ["node_modules/next/dist/bin/next", ...args], {
  stdio: "inherit",
});

child.on("exit", (code, signal) => {
  if (signal) process.kill(process.pid, signal);
  process.exit(code ?? 1);
});
