Project Management & Task Tracker
This is a frontend-heavy dashboard I built to manage multiple projects and their specific tasks. I wanted to create a tool that stays fast and works entirely in the browser without needing a backend database.

It helps me keep track of my placement preparation and different coding projects in one place.

🚀 Why I Built This
Most task apps are either too simple or too complex. I wanted to build something where:

I could manage nested data (tasks inside projects).

The data doesn't disappear when I refresh the page.

The UI is clean and shows me exactly how much of a project is finished via a progress bar.

🛠️ Tech Stack
React.js (Functional Components)

Tailwind CSS (for the styling and layout)

Context API & useReducer (for managing the global state)

Local Storage (for data persistence)

Vite (Build tool)

💡 Key Features I Implemented
Centralized State: I used useReducer to handle all the complex logic like moving tasks between columns and deleting projects. It keeps the code much cleaner than having 10 different useState hooks.

Persistent Data: I hooked the app into the browser’s localStorage. I used lazy initialization so the app only reads from the disk once when it starts up, which is better for performance.

Progress Tracking: Each project has a dynamic progress bar that calculates completion based on how many tasks are moved to the "DONE" column.

Responsive Sidebar: You can switch between different projects instantly, and each project maintains its own set of tasks.

How to Run Locally
Clone this repo: https://github.com/PriyanshuSing-h/project-management-dashboard

Install the dependencies:  npm install

Run the development server:  npm run dev

🧠 What I Learned
While building this, I got much more comfortable with the React Context API. Managing an array of objects that contains another array of objects (projects -> tasks) was challenging, especially when updating a single task's status without mutating the rest of the state. I also learned how to handle CORS and API issues in my previous projects, which helped me structure the logic here more efficiently.