# Wonge-Right-Message-Identifier-Protocol

![Version](https://img.shields.io/badge/version-1.0.0-purple)
![License](https://img.shields.io/badge/license-MIT-blue)
![Platform](https://img.shields.io/badge/platform-web%20%7C%20instagram-lightgrey)

Wonge Right is a universal message identifier system designed to help creators, businesses, and support teams filter and prioritize incoming messages across Instagram DMs, website chats, contact forms, and support tickets.

---

##  Table of Contents

- [Demo](#demo)
- [What is Wonge Right?](#what-is-wonge-right)
- [Features](#features)
- [Quick Start](#quick-start)
- [Instagram](#instagram)
- [Website Chat](#website-chat)
- [Contact Forms](#contact-forms)
- [Code Integration](#code-integration)
- [Project Structure](#project-structure)
- [Customization](#customization)
- [Contributing](#contributing)
- [License](#license)

---
<img width="1882" height="1988" alt="image" src="https://github.com/user-attachments/assets/55de6090-5172-4528-a329-ab70a331396c" />


The demo includes:
- Interactive chat simulator with identifier detection
- Copy-paste ready code snippets
- Instagram DM templates
- Auto-reply preview

---

##  What is Wonge Right?

Wonge Right is a **keyword-based message routing system** that helps you:

-  **Flag priority messages** across all platforms
-  **Reduce response time** for important inquiries
-  **Filter spam** from genuine engagement
-  **Trigger automated workflows** when the identifier is detected

Think of it as a secret handshake for your inbox.

---

##  Features

|       Feature     | Instagram | Website | Contact Form |
|-------------------|-----------|---------|--------------|
| Priority flagging |    yes    |    yes  |       yes    |
| Auto-routing      |    yes    |    yes  |       yes    |
| Copy templates    |    yes    |    yes  |       yes    |
| Live detection    |   wrong   |    yes  |       yes    |
| Custom responses  |    yes    |    yes  |       yes    |

**Plus:**
-  Mobile responsive design
-  Modern glassmorphism UI
-  One-click code copying
-  Live chat simulator
-  Easy to customize

---

##  Quick Start

### Option 1: Use the HTML file directly

1. Download `index.html` from this repo
2. Open in any browser
3. Copy the identifier and start using

### Option 2: Deploy online

```bash
# Clone the repository
git clone https://github.com/yourusername/wonge-right.git

# Navigate to project
cd wonge-right

# Open with live server or deploy to Netlify/Vercel
```

### Option 3: Integrate into existing site

Copy the identifier badge code:

```html
<div class="wonge-badge">
   Start your message with: <strong>wonge right</strong>
</div>
```

---

##  Usage Guide
**In DMs:**
```
wonge right — hey loved your recent post! Would love to collab.
```

**In Story Replies:**
```
@username wonge right — that outfit is fire 
```

**In Comments:**
```
wonge right  when's the next drop?
```

**Auto-reply setup (business accounts):**
1. Go to Settings → Business → Saved Replies
2. Create new saved reply:
   - Shortcut: `#wongeright`
   - Message: *"Thanks for using 'wonge right'! You've been flagged as priority. Our team will reply within 2 hours."*

---

###  Website Chat

**HTML widget integration:**

```html
<div class="chat-widget">
  <div class="chat-header"> Support</div>
  <div class="chat-messages" id="messages">
    <div class="bot-msg">Start your message with "wonge right" for priority</div>
  </div>
  <input type="text" id="chatInput" placeholder="Type 'wonge right' + your message...">
</div>

<script>
  const input = document.getElementById('chatInput');
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && input.value.includes('wonge right')) {
      // Route to priority queue
      console.log('Priority message detected');
    }
  });
</script>
```

---

###  Contact Forms

**Add identifier hint to your forms:**

```html
<form action="/submit" method="POST">
  <label for="message">Your Message</label>
  <textarea 
    id="message" 
    name="message" 
    placeholder="Start with 'wonge right' for faster reply..."
    required
  ></textarea>
  
  <button type="submit">Send Message</button>
</form>

<script>
  document.getElementById('message').addEventListener('input', function() {
    if (this.value.toLowerCase().includes('wonge right')) {
      this.style.borderColor = '#8b5cf6';
      this.style.boxShadow = '0 0 0 3px rgba(139,92,246,0.2)';
    }
  });
</script>
```

**Backend filtering (Node.js example):**

```javascript
app.post('/contact', (req, res) => {
  const { message, email } = req.body;
  
  if (message.toLowerCase().includes('wonge right')) {
    // Send to priority inbox
    sendToVIPSupport({ message, email });
    res.json({ priority: true, responseTime: '< 1 hour' });
  } else {
    // Standard queue
    sendToGeneralQueue({ message, email });
    res.json({ priority: false, responseTime: '24-48 hours' });
  }
});
```

---

##  Code Integration

### JavaScript Detection Function

```javascript
/**
 * Check if message contains Wonge Right identifier
 * @param {string} message - The user's message
 * @returns {boolean} - True if identifier is present
 */
function hasWongeRight(message) {
  const patterns = [
    'wonge right',
    '#wongeright',
    'wongeright',
    'wonge-right'
  ];
  
  const lowerMsg = message.toLowerCase();
  return patterns.some(pattern => lowerMsg.includes(pattern));
}

// Usage
const userMessage = "wonge right — I need help with my order";
if (hasWongeRight(userMessage)) {
  routeToPrioritySupport(userMessage);
}
```

### React Component Example

```jsx
import { useState } from 'react';

function WongeContactForm() {
  const [message, setMessage] = useState('');
  const [isPriority, setIsPriority] = useState(false);

  const handleMessageChange = (e) => {
    const value = e.target.value;
    setMessage(value);
    setIsPriority(value.toLowerCase().includes('wonge right'));
  };

  return (
    <form className="contact-form">
      <textarea
        value={message}
        onChange={handleMessageChange}
        placeholder="Start with 'wonge right' for priority support..."
      />
      {isPriority && (
        <div className="priority-badge">
           Priority mode activated — fast response guaranteed
        </div>
      )}
      <button type="submit">Send</button>
    </form>
  );
}
```

---

##  Project Structure

wonge-right/
├── index.html              # Main landing page with demo
├── README.md               # This file
├── LICENSE                 # MIT License
├── assets/
│   ├── styles.css          # (optional) Separate CSS
│   └── script.js           # (optional) Separate JS
└── examples/
    ├── instagram-guide.md  # Detailed IG walkthrough
    ├── webhook-example.js  # Webhook integration
    └── zapier-template.json # Automation templates

##  Customization

### Change the identifier phrase

Edit the identifier throughout the HTML:

```javascript
// Find and replace in index.html
const IDENTIFIER = 'wonge right'; // Change to your phrase
```

### Modify colors

Update the CSS variables at the top of the `<style>` section:

```css
:root {
  --primary-purple: #8b5cf6;
  --dark-purple: #311b5a;
  --light-bg: #f9f5ff;
}
```

### Add custom auto-replies

```javascript
// In the chat simulator section
const customReplies = {
  priority: " Priority access granted! We'll reply within 30 minutes.",
  standard: "Thanks for reaching out. Response time: 24 hours."
};
```

---

##  Contributing

Contributions are welcome! Here's how:

1. **Fork** the repository
2. **Create a feature branch** (`git checkout -b feature/amazing-idea`)
3. **Commit changes** (`git commit -m 'Add amazing feature'`)
4. **Push to branch** (`git push origin feature/amazing-idea`)
5. **Open a Pull Request**

**Ideas for contributions:**
- Add more platform integrations (Twitter DMs, Telegram, WhatsApp)
- Create browser extension for auto-detection
- Build analytics dashboard for identifier usage
- Write API wrapper in Python/PHP

---

##  License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

##  Acknowledgments

- Inspired by priority inbox systems and secret menu codes
- Built with modern HTML/CSS/JS
- Icons and design inspiration from modern web trends

##  Contact

Om Gedam

GitHub: [https://github.com/itsomg134](https://github.com/itsomg134)

Email: [omgedam123098@gmail.com](mailto:omgedam123098@gmail.com)

Twitter (X): [https://twitter.com/omgedam](https://twitter.com/omgedam)

LinkedIn: [https://linkedin.com/in/omgedam](https://linkedin.com/in/omgedam)

Portfolio: [https://ogworks.lovable.app](https://ogworks.lovable.app)
