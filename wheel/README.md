# Wheel of Names

A modern, customizable React application that replicates the functionality of wheelofnames.com. Built with React, TypeScript, and Vite.

## Features

- Interactive spinning wheel with smooth animations
- Dark mode support
- Name list management with add/remove functionality
- Winner history with timestamps
- Confetti celebration effect
- Responsive design
- Local storage persistence

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd wheel
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

1. Enter names in the text area (one per line or use Shift+Enter for multiple lines)
2. Press Enter to add names to the wheel
3. Click the "Spin" button to start the wheel
4. The winner will be displayed and added to the history
5. Toggle dark mode using the button in the top right

## Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Technologies Used

- React
- TypeScript
- Vite
- Framer Motion
- React Confetti

## License

MIT
