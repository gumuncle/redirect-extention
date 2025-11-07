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
                const input = document.getElementById("redirect-url");
                if (input) input.value = "";
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
        if (!data.rules.length) {
            const li = document.createElement("li");
            li.textContent = "ルールはまだありません";
            list.appendChild(li);
            return;
        }

        data.rules.forEach((rule, i) => {
            const li = document.createElement("li");
            li.className = "rule-item";

            const span = document.createElement("span");
            span.className = "rule-text";
            span.textContent = `${rule.match} → ${rule.redirectTo}`;

            const delBtn = document.createElement("button");
            delBtn.textContent = "削除";
            delBtn.className = "delete-btn";
            delBtn.addEventListener("click", () => deleteRule(i));

            li.appendChild(span);
            li.appendChild(delBtn);
            list.appendChild(li);
        });
    });
}

function deleteRule(index) {
    chrome.storage.local.get({ rules: [] }, (data) => {
        if (index < 0 || index >= data.rules.length) return;
        const target = data.rules[index];
        const ok = confirm(`このルールを削除しますか？\n${target.match} → ${target.redirectTo}`);
        if (!ok) return;
        const rules = data.rules.slice();
        rules.splice(index, 1);
        chrome.storage.local.set({ rules }, () => {
            updateRulesList();
        });
    });
}
