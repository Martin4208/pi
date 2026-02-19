# piii 🧍🏻

A lightweight desktop app that quietly watches your posture from the top of your screen.

When you've been slouching too long, a small glass pill gently lets you know — without breaking your flow.

## Features

- Real-time posture detection via camera (MoveNet)
- Notifies you after 10 seconds of bad posture
- Click the pill to see your posture score and status
- Lives quietly at the top of your screen

## Tech Stack

- [Tauri v2](https://tauri.app/) — lightweight desktop runtime
- [React + TypeScript + Vite](https://vitejs.dev/)
- [TensorFlow.js + MoveNet](https://www.tensorflow.org/js) — pose estimation
- [Framer Motion](https://www.framer.com/motion/) — animations

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [Rust](https://rustup.rs/)
- [Visual Studio C++ Build Tools](https://visualstudio.microsoft.com/visual-cpp-build-tools/) — Windows only

### Install

\`\`\`bash
git clone https://github.com/yourusername/piii.git
cd piii
npm install --legacy-peer-deps
\`\`\`

### Dev

\`\`\`bash
npx tauri dev
\`\`\`

### Build

\`\`\`bash
npx tauri build
\`\`\`

Outputs \`.exe\` / \`.msi\` to \`src-tauri/target/release/bundle/\`.

## Usage

1. Launch the app — it will ask for camera permission
2. Grant permission and posture detection starts automatically
3. After 10 seconds of bad posture, a message appears
4. Click the pill to expand and see your score
5. Drag it anywhere on screen

## License

MIT
