# Full-Stack Developer Starter Workspace

This workspace is designed for learning and building full-stack web applications using free and open-source tools.

## Structure
- `frontend/` — For HTML, CSS, JS, and React projects
- `backend/` — For Python Flask backend projects

## Getting Started

### Frontend
1. Place your HTML, CSS, and JS files in the `frontend/` folder.
2. To use React, initialize a project with `npx create-react-app .` inside `frontend/` (optional).

### Backend
1. Place your Python files in the `backend/` folder.
2. To start a Flask app:
   - Install Flask: `pip install flask`
   - Create `app.py` with a basic Flask server (see below).
   - Run with `python app.py`.

### Example Flask App
```python
from flask import Flask
app = Flask(__name__)

@app.route('/')
def home():
    return "Hello, Flask!"

if __name__ == '__main__':
    app.run(debug=True)
```

## Version Control
- Use Git for version control. Initialize with `git init` and push to GitHub.

## Free Learning Resources
- [MDN Web Docs](https://developer.mozilla.org/)
- [freeCodeCamp](https://www.freecodecamp.org/)
- [roadmap.sh](https://roadmap.sh/)

## Next Steps
- Build and deploy small projects for your portfolio.
- Explore React for frontend and Flask for backend.
- Practice integrating frontend and backend via REST APIs.

---
Happy coding!
