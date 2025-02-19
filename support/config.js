const envAndroidDeviceName = process.env.ANDROID_DEVICE_NAMES
  ? process.env.ANDROID_DEVICE_NAMES.split(",")
  : [];
const envIosDevices = process.env.UDID ? process.env.UDID.split(",") : [];

async function setUpAndroidDevices() {
  let androidDevices = [];

  envAndroidDeviceName.forEach((deviceName, index) => {
    androidDevices.push({
      name: deviceName,
      udid: `emulator-555${index * 2 + 4}`,
      fullReset: false,
    });
  });

  return androidDevices;
}

async function setUpIosDevices() {
  let iosDevices = [];

  envIosDevices.forEach((deviceUdid) => {
    iosDevices.push({
      udid: deviceUdid,
      fullReset: false,
    });
  });

  return iosDevices;
}

module.exports = {
  setUpAndroidDevices,
  setUpIosDevices,
};
