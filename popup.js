function extractDomain(url) {
    try {
        const u = new URL(url);
        return u.origin; // e.g. https://example.com
    } catch (e) {
        return null;
    }
}

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const currentUrl = tabs[0].url;
    const domain = extractDomain(currentUrl);
    document.getElementById("current-domain").textContent = `対象ドメイン: ${domain}`;

    document.getElementById("add-rule").addEventListener("click", () => {
        const redirectUrl = document.getElementById("redirect-url").value;
        if (!redirectUrl) return alert("リダイレクト先を入力してください");
        if (!domain) return alert("ドメインを取得できませんでした");

        chrome.storage.local.get({ rules: [] }, (data) => {
            const rules = data.rules.filter(r => r.match !== domain);
            rules.push({ match: domain, redirectTo: redirectUrl });
            chrome.storage.local.set({ rules }, () => {
                alert("登録しました！");
                updateRulesList();
            });
        });
    });

    updateRulesList();
});

function updateRulesList() {
    chrome.storage.local.get({ rules: [] }, (data) => {
        const list = document.getElementById("rules-list");
        list.innerHTML = "";
        data.rules.forEach((rule, i) => {
            const li = document.createElement("li");
            li.textContent = `${rule.match} → ${rule.redirectTo}`;
            list.appendChild(li);
        });
    });
}
