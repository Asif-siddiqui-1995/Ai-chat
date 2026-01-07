module.exports = {
    apps: [
        {
            name: "ai-backend",
            script: "server.js", // 👈 change if different
            instances: 1,
            exec_mode: "fork",

            watch: true,
            ignore_watch: ["node_modules", "logs"],

            // Logs
            error_file: "./logs/err.log",
            out_file: "./logs/out.log",
            log_file: "./logs/combined.log",
            time: true,

            // Restart safety
            max_restarts: 10,
            restart_delay: 3000,
            autorestart: true,

            env: {
                NODE_ENV: "development",
                PORT: 5000,
            },
            env_production: {
                NODE_ENV: "production",
            },
        },
    ],
};
