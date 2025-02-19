const { exec, spawn } = require("child_process");
require("dotenv").config();
const args = process.argv.slice(2);
const command = args[0];

const DEVICE_NAMES = process.env.ANDROID_DEVICE_NAMES
  ? process.env.ANDROID_DEVICE_NAMES.split(",").map(name => name.trim())
  : [];
  
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

const startEmulator = (deviceNames) => {
  if (!Array.isArray(deviceNames) || deviceNames.length === 0) {
    console.error("Error: DEVICE_NAMES must be a non-empty array.");
    process.exit(1);
  }

  deviceNames.forEach((deviceName) => {
    console.log(`Starting emulator: ${deviceName}`);

    const child = spawn(emulatorPath, ["-avd", deviceName], {
      detached: true,
      stdio: "ignore",
    });

    child.unref(); // Completely detach the child process
    console.log(`Emulator ${deviceName} started in the background.`);
  });
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
} else if (command === "start" && DEVICE_NAMES) {
  startEmulator(DEVICE_NAMES);
} else if (command === "stop") {
  stopAllEmulators();
} else {
  console.log("Usage: node emulator.js <list|start|stop> [DEVICE_NAMES]");
}