#!/bin/bash

# Colors for better output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Ask for project name
echo -e "${BLUE}Enter project name:${NC}"
read PROJECT_NAME

# Create project directory
npm create vite@latest . -- --template react-ts

# Install dependencies
npm install

# Install sass and sass-loader
npm install sass sass-loader --save-dev

# Install react-router-dom
npm install react-router-dom

# Install @reduxjs/toolkit
npm install @reduxjs/toolkit


mkdir -p src/components/base
mkdir -p src/components/elements
mkdir -p src/components/sections
mkdir -p src/components/templates
mkdir -p src/pages
mkdir -p src/hooks
mkdir -p src/utils
mkdir -p src/assets
mkdir -p src/features
mkdir -p src/types
mkdir -p src/styles
touch src/styles/variables.scss
touch src/styles/mixins.scss
touch src/styles/typography.scss
touch src/styles/global.scss

./scripts/create_component.sh templates MainTemplate

# Replace main.jsx file
cat > src/main.jsx << EOF
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/global.scss';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
        <Routes>
          <Route element={<MainTemplate />}>
            <Route path="/" element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

EOF

# Remove App.tsx file
rm src/App.tsx
rm src/main.tsx
rm src/index.css
rm src/App.css