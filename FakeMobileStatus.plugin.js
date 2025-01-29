/**
 * @name FakeMobileStatus
 * @description Shows the mobile icon while using Discord on PC, even in calls.
 * @version 1.1.1
 * @author YourName
 * @source https://github.com/enxosins/FakeMobileStatus
 * @updateUrl https://raw.githubusercontent.com/enxosins/FakeMobileStatus/main/FakeMobileStatus.plugin.js
 */

const { Patcher, Logger } = BdApi;

module.exports = class FakeMobileStatus {
    start() {
        this.patchStatus();
        this.keepMobileActive();
    }

    stop() {
        this.unpatchStatus();
        clearInterval(this.interval);
    }

    patchStatus() {
        const statusModule = BdApi.findModuleByProps("setLocalPresence");
        if (!statusModule) {
            Logger.error("Failed to find status module.");
            return;
        }

        Patcher.before(statusModule, "setLocalPresence", (_, args) => {
            if (args[0]) {
                args[0].clientStatus = {
                    desktop: "online", // Keep PC controls
                    mobile: "online"   // Show mobile icon
                };
            }
        });

        Logger.log("FakeMobileStatus activated.");
    }

    keepMobileActive() {
        const statusModule = BdApi.findModuleByProps("setLocalPresence");
        if (!statusModule) {
            Logger.error("Failed to find status module on retry.");
            return;
        }

        // Reapply mobile status every second to prevent Discord from overriding
        this.interval = setInterval(() => {
            try {
                statusModule.setLocalPresence({
                    status: "online",
                    clientStatus: {
                        desktop: "online", // Keep PC controls
                        mobile: "online"   // Keep mobile icon visible
                    }
                });
                Logger.log("Forced mobile status.");
            } catch (error) {
                Logger.error("Failed to set presence:", error);
            }
        }, 1000);
    }

    unpatchStatus() {
        Patcher.unpatchAll();
        clearInterval(this.interval);
        Logger.log("FakeMobileStatus deactivated.");
    }
};
