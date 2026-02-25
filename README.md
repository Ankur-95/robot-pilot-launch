# Ankur Rakesh Ujawane — Robotics Portfolio

A premium, aerospace-themed dark portfolio website built with React, Vite, Tailwind CSS, Three.js, and Framer Motion.

## ✏️ How to Edit Content (No Coding Required)

### Update Personal Info, Skills, Experience

1. Go to your GitHub repository
2. Navigate to `public/content/siteConfig.json`
3. Click the ✏️ pencil icon → edit any field → **Commit changes**

### Add a New Project

1. Go to `public/content/projects/`
2. Create a new `.json` file with this template:

```json
{
  "id": "your-project-name",
  "title": "Project Title",
  "summary": "Short description.",
  "tech": ["ROS", "Python"],
  "type": "simulation",
  "role": "Lead Developer",
  "image": "",
  "video": "",
  "githubUrl": "",
  "demoUrl": "",
  "has3DViewer": false,
  "featured": true
}
```

3. Add the filename to the `projectFiles` array in `src/hooks/useSiteConfig.ts`

### Replace Resume

Upload your PDF to `public/resume.pdf`

### Replace 3D Model

Place a `.glb` file in `public/models/` and update `src/components/RobotModel.tsx` to use `useGLTF`

### Contact Form

Sign up at [Formspree](https://formspree.io), get your form ID, and replace `YOUR_FORMSPREE_ID` in `siteConfig.json`

## 🛠 Tech Stack

React 18 • Vite • TypeScript • Tailwind CSS • Framer Motion • Three.js • react-three-fiber
