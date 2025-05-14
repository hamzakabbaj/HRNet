#!/bin/bash

# Colors for better output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Root directory for components
COMPONENTS_DIR="src/components"

# Function to get component type from choice
get_component_type() {
  case $1 in
    1) echo "base" ;;
    2) echo "elements" ;;
    3) echo "sections" ;;
    4) echo "templates" ;;
    5) echo "pages" ;;
    *) echo "" ;;
  esac
}

# Function to get component type choice from type
get_component_type_choice() {
  case $1 in
    "base") echo "1" ;;
    "elements") echo "2" ;;
    "sections") echo "3" ;;
    "templates") echo "4" ;;
    "pages") echo "5" ;;
    *) echo "" ;;
  esac
}

# Check if arguments are provided
if [ $# -eq 2 ]; then
  # Non-interactive mode
  COMPONENT_TYPE=$1
  COMPONENT_NAME=$2
  
  # Validate component type
  if [[ -z "$(get_component_type_choice $COMPONENT_TYPE)" ]]; then
    echo -e "${YELLOW}Invalid component type. Must be one of: base, elements, sections, templates${NC}"
    exit 1
  fi
else
  # Interactive mode
  echo -e "${BLUE}Select component type:${NC}"
  echo "1) base"
  echo "2) element"
  echo "3) section"
  echo "4) template"
  echo "5) page"
  read -p "Enter choice (1-5): " COMPONENT_TYPE_CHOICE

  # Set component type based on choice
  COMPONENT_TYPE=$(get_component_type $COMPONENT_TYPE_CHOICE)
  if [[ -z "$COMPONENT_TYPE" ]]; then
    echo -e "${YELLOW}Invalid choice. Exiting.${NC}"
    exit 1
  fi

  # Ask for component name
  echo -e "${BLUE}Enter component name (PascalCase recommended, e.g. Button):${NC}"
  read COMPONENT_NAME
fi

# Validate component name
if [[ -z "$COMPONENT_NAME" ]]; then
  echo -e "${YELLOW}Component name cannot be empty. Exiting.${NC}"
  exit 1
fi

# Create component directory and files based on type
if [ "$COMPONENT_TYPE" = "pages" ]; then
  # For pages, create only JSX file in src/pages
  COMPONENT_PATH="src/pages"
  mkdir -p "$COMPONENT_PATH"
  
  # Create page JSX file
  cat > "$COMPONENT_PATH/$COMPONENT_NAME.jsx" << EOF
import React from 'react';

const $COMPONENT_NAME = () => {
  return (
    <div>
      <h1>$COMPONENT_NAME Page</h1>
    </div>
  );
};

export default $COMPONENT_NAME;
EOF

  echo -e "${GREEN}✅ Page created successfully at $COMPONENT_PATH/$COMPONENT_NAME.jsx${NC}"
else
  # For other components, create full structure
  COMPONENT_PATH="$COMPONENTS_DIR/$COMPONENT_TYPE/$COMPONENT_NAME"
  mkdir -p "$COMPONENT_PATH"

  # Create component JSX file
  cat > "$COMPONENT_PATH/$COMPONENT_NAME.jsx" << EOF
import React from 'react';
import styles from './$COMPONENT_NAME.module.scss';

const $COMPONENT_NAME = () => {
  return (
    <div className={styles.container}>
      <h1>$COMPONENT_NAME Component</h1>
    </div>
  );
};

export default $COMPONENT_NAME;
EOF

  # Create component SCSS module file
  cat > "$COMPONENT_PATH/$COMPONENT_NAME.module.scss" << EOF
.container {
  // Add your styles here
}
EOF

  # Create index.js for easy imports
  cat > "$COMPONENT_PATH/index.js" << EOF
export { default } from './$COMPONENT_NAME';
EOF

  echo -e "${GREEN}✅ Component created successfully at $COMPONENT_PATH${NC}"
  echo -e "${GREEN}Files created:${NC}"
  echo -e "  - $COMPONENT_PATH/$COMPONENT_NAME.jsx"
  echo -e "  - $COMPONENT_PATH/$COMPONENT_NAME.module.scss"
  echo -e "  - $COMPONENT_PATH/index.js"
fi
