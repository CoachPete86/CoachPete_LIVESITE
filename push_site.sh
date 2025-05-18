#!/bin/bash

# push_site.sh
# Purpose: Automate website deployment process
# Usage: ./push_site.sh [commit message]
#
# This script:
# 1. Checks for changes in the repository
# 2. Adds all changes
# 3. Creates a commit with timestamp and optional message
# 4. Pushes changes to GitHub
# 5. Updates the Live directory
#
# Created: May 18, 2025

# Define colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Define directories
WEBSITE_DIR="/Users/peb/peb_stuff/CoachPeteRyan-website"
LIVE_DIR="/Users/peb/peb_stuff/Stuff/Stuff/CoachPeteWebsite/Live"

# Navigate to website directory
cd "$WEBSITE_DIR" || {
    echo -e "${RED}Error: Could not navigate to $WEBSITE_DIR${NC}"
    exit 1
}

echo -e "${GREEN}=== Coach Pete Ryan Website Deployment Tool ===${NC}"
echo "Current directory: $(pwd)"
echo ""

# Step 1: Check if there are changes to commit
echo -e "${YELLOW}Checking for changes...${NC}"
if [[ -z $(git status -s) ]]; then
    echo -e "${GREEN}No changes detected. Repository is clean.${NC}"
    
    # Ask if user still wants to push
    read -p "No changes to commit. Push anyway? (y/n): " push_anyway
    if [[ $push_anyway != "y" && $push_anyway != "Y" ]]; then
        echo "Deployment cancelled."
        exit 0
    fi
else
    echo -e "${GREEN}Changes detected. Proceeding with deployment.${NC}"
    
    # Step 2: Add all changes
    echo -e "${YELLOW}Adding changes to staging area...${NC}"
    if git add .; then
        echo -e "${GREEN}Changes added successfully.${NC}"
    else
        echo -e "${RED}Error: Failed to add changes.${NC}"
        exit 1
    fi
    
    # Step 3: Create commit
    echo -e "${YELLOW}Creating commit...${NC}"
    
    # Use provided commit message or default with timestamp
    timestamp=$(date "+%Y-%m-%d %H:%M:%S")
    if [ -n "$1" ]; then
        commit_message="$1 - $timestamp"
    else
        commit_message="Website update - $timestamp"
    fi
    
    if git commit -m "$commit_message"; then
        echo -e "${GREEN}Commit created: '$commit_message'${NC}"
    else
        echo -e "${RED}Error: Failed to create commit.${NC}"
        exit 1
    fi
fi

# Step 4: Push to GitHub
echo -e "${YELLOW}Pushing to GitHub...${NC}"
if git push origin main; then
    echo -e "${GREEN}Successfully pushed to GitHub!${NC}"
else
    echo -e "${RED}Error: Failed to push to GitHub.${NC}"
    echo "Please check your internet connection and repository permissions."
    exit 1
fi

# Step 5: Update Live directory
echo -e "${YELLOW}Updating Live directory...${NC}"
if [ -f "$WEBSITE_DIR/update_live.sh" ]; then
    if bash "$WEBSITE_DIR/update_live.sh"; then
        echo -e "${GREEN}Live directory updated successfully.${NC}"
    else
        echo -e "${RED}Error: Failed to update Live directory.${NC}"
        exit 1
    fi
else
    echo -e "${RED}Error: update_live.sh script not found.${NC}"
    echo "Creating a simplified update process..."
    
    # Fallback to direct copy if update_live.sh is missing
    mkdir -p "$LIVE_DIR"
    if cp -R "$WEBSITE_DIR"/* "$LIVE_DIR"/; then
        echo -e "${GREEN}Live directory updated successfully (fallback method).${NC}"
    else
        echo -e "${RED}Error: Failed to update Live directory.${NC}"
        exit 1
    fi
fi

echo ""
echo -e "${GREEN}=== Deployment Complete! ===${NC}"
echo "Your website has been:"
echo "1. Committed to the local repository"
echo "2. Pushed to GitHub"
echo "3. Updated in the Live directory"
echo ""
echo "Thank you for using Coach Pete Ryan Website Deployment Tool!"

