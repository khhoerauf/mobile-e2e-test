const { exec, spawn } = require("child_process");
const args = process.argv.slice(2);
const command = args[0];

require("dotenv").config();
const DEVICE_NAME = args[1] || process.env.DEVICE_NAME;
const emulatorPath = process.env.ANDROID_HOME
  ? `${process.env.ANDROID_HOME}/emulator/emulator`
  : "emulator";

const listEmulators = () => {
  exec(`${emulatorPath} -list-avds`, (err, stdout, stderr) => {
    if (err) {
      console.error(`Error listing emulators: ${stderr}`);
      return;
    }
    console.log("Available Emulators:\n\n", stdout.trim());
  });
};

const startEmulator = (DEVICE_NAME) => {
  if (!DEVICE_NAME) {
    console.error("Error: DEVICE_NAME is not provided.");
    process.exit(1);
  }

  console.log(`Starting emulator: ${DEVICE_NAME}`);

  const child = spawn(emulatorPath, ["-avd", DEVICE_NAME], {
    detached: true,
    stdio: "ignore",
  });

  child.unref(); // Completely detach the child process
  console.log(`Emulator ${DEVICE_NAME} started in the background.`);
};

const stopAllEmulators = () => {
  exec("pkill -f emulator", (err, stdout, stderr) => {
    if (err) {
      console.error(`Error stopping emulators: ${stderr}`);
      return;
    }
    console.log("All emulators stopped.");
  });
};

if (command === "list") {
  listEmulators();
} else if (command === "start" && DEVICE_NAME) {
  startEmulator(DEVICE_NAME);
} else if (command === "stop") {
  stopAllEmulators();
} else {
  console.log("Usage: node emulator.js <list|start|stop> [DEVICE_NAME]");
}
