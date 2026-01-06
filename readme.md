# AI Flow Node Webpage

## Project Goal

This project demonstrates your ability to read documentation and integrate different technologies. It is a simple web application where a user can type a prompt into a box, click "Run Flow," and see the AI's response in another box. The two boxes are visually connected using a flow chart.

---

## Tech Stack

-   **Frontend:** React, React Flow
-   **Backend:** Node.js, Express.js
-   **Database:** MongoDB
-   **AI Integration:** OpenRouter API (Free AI models)

---

## Features

1. **Interactive Flow Chart:**

    - Two nodes:
        - **Input Node:** Accepts user prompts.
        - **Result Node:** Displays AI response.
    - Connected by a line (edge) for visualization.

2. **Run Flow Button:** Sends the prompt from the frontend to the backend and updates the result node with the AI's response.

3. **Save Button:** Saves the current prompt and AI response to MongoDB.

4. **Backend API:**
    - `/api/ask-ai`: Receives the prompt and calls OpenRouter API.
    - `/api/save-chat`: Saves the prompt and response to the database.

---

## Getting Started

### Prerequisites

-   Node.js (v18+ recommended)
-   MongoDB (local or Atlas cluster)
-   OpenRouter API key (free tier available)

---

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/Asif-siddiqui-1995/Ai-chat.git
cd <project-folder>
```
