# 🌐 Domain Redirector (Chrome Extension)

A simple Chrome extension that automatically redirects specific domains to custom URLs.  
You can register the current domain directly from the popup window — no need to edit the code manually.

---

## 🚀 Features

- Redirect any domain to a specified URL  
- Add redirect rules directly from the popup  
- Persistent rules (saved in Chrome local storage)  
- Uses **Declarative Net Request API** (Manifest V3 compliant)  
- Lightweight and fast (no background polling)

---

## 📦 Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/yourname/domain-redirector.git
   cd domain-redirector
   ```

2. Open Chrome and go to:
   ```
   chrome://extensions/
   ```

3. Enable **Developer mode** (top-right corner).  
4. Click **Load unpacked** and select this folder.

---

## 🧭 Usage

1. Open any website (e.g. `https://example.com`)
2. Click the extension icon  
3. Enter the redirect destination (e.g. `https://newsite.com`)  
4. Click **Add**  
5. Next time you visit `example.com`, it will automatically redirect to `newsite.com`

---

## 🛠️ Project Structure

```
redirect-extension/
 ├── manifest.json      # Extension manifest (v3)
 ├── background.js      # Service worker that updates redirect rules
 ├── popup.html         # Popup UI
 ├── popup.js           # Popup logic
 └── README.md          # This file
```

---

## ⚙️ Tech Stack

- **Manifest V3**
- **Declarative Net Request API**
- **Chrome Storage API**
- **Vanilla JavaScript (ES6)**

---

## 🧩 Example Rule

If you add this rule in the popup:
```
match: https://example.com
redirectTo: https://newsite.com
```

Then any request to:
```
https://example.com/page1
https://example.com/foo/bar
```
will automatically redirect to:
```
https://newsite.com
```

---

## 🧠 Notes

- Rules are domain-based (e.g., all pages under the same origin are redirected)
- Subdomains are also matched automatically (e.g., `www.example.com`, `blog.example.com`)
- Redirects are handled natively by Chrome for maximum performance

---

## 🪪 License

MIT License © 2025 gumuncle

---

## 💡 Future Ideas

- Add “Delete rule” feature in popup  
- Support regex or path-based redirects  
- Sync rules across devices using `chrome.storage.sync`

---

> ⚡ Built for developers who need to auto-redirect domains quickly and efficiently.
