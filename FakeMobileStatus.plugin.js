// iPhoneEmulator.plugin.js
/**
 * @name iPhoneEmulator
 * @description Emulate being on an iPhone in Discord calls
 * @version 1.0.0
 * @author YourName
 */

module.exports = (() => {
    const config = {
        info: {
            name: "iPhoneEmulator",
            authors: [
                {
                    name: "YourName",
                    discord_id: "YourDiscordID",
                    github: "YourGitHubProfile",
                },
            ],
            version: "1.0.0",
            description: "Emulate being on an iPhone in Discord calls",
            changelog: [
                {
                    title: "Initial Release",
                    items: ["Emulates iPhone in calls"],
                },
            ],
        },
        main: "iPhoneEmulator.plugin.js",
    };

    return class {
        start() {
            // Create a MutationObserver to watch for changes in the call icon
            const observer = new MutationObserver(() => {
                const callIcons = document.querySelectorAll('.call-icon'); // Select call icons
                callIcons.forEach((icon) => {
                    // Check if the icon already has the 'mobile' class
                    if (!icon.classList.contains('mobile')) {
                        icon.classList.add('mobile'); // Add mobile class
                    }
                });
            });

            // Start observing the body for changes
            observer.observe(document.body, {
                childList: true,
                subtree: true,
            });
            console.log("iPhone Emulator Plugin Started");
        }

        stop() {
            console.log("iPhone Emulator Plugin Stopped");
            // You can clean up the observer here if needed
        }
    };
})();
