// storageの変更を監視してルール更新
chrome.storage.local.onChanged.addListener((changes) => {
    if (changes.rules) {
        updateRedirectRules(changes.rules.newValue);
    }
});

// 初期ロード時
chrome.runtime.onStartup.addListener(() => {
    chrome.storage.local.get({ rules: [] }, (data) => {
        updateRedirectRules(data.rules);
    });
});
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.get({ rules: [] }, (data) => {
        updateRedirectRules(data.rules);
    });
});

// declarativeNetRequest ルール更新関数
function updateRedirectRules(rules) {
    const declarativeRules = rules.map((rule, i) => ({
        id: i + 1,
        priority: 1,
        action: {
            type: "redirect",
            redirect: { url: rule.redirectTo }
        },
        condition: {
            urlFilter: rule.match.replace(/^https?:\/\//, ""), // ドメインのみ
            resourceTypes: ["main_frame"]
        }
    }));

    chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: Array.from({ length: 1000 }, (_, i) => i + 1),
        addRules: declarativeRules
    });
}
