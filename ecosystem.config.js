module.exports = {
    apps: [
        {
            name: "next-app",
            script: "npm.cmd", // Для Windows используем .cmd
            args: "run start",
            cwd: __dirname,
            windowsHide: true,
        },
    ],
};
