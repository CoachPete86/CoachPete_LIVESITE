#!/bin/bash

# update_live.sh
# Purpose: Synchronize website files between working directory and Live directory
# Usage: ./update_live.sh
#
# This script copies all files from the working website directory 
# to the Live directory to ensure the Live directory always has 
# the latest version of the site.
#
# Created: May 18, 2025

# Define source and destination directories
SOURCE_DIR="/Users/peb/peb_stuff/CoachPeteRyan-website"
LIVE_DIR="/Users/peb/peb_stuff/Stuff/Stuff/CoachPeteWebsite/Live"

# Display start message
echo "Starting website synchronization..."
echo "Copying files from $SOURCE_DIR to $LIVE_DIR"

# Ensure the Live directory exists
mkdir -p "$LIVE_DIR"

# Copy all files from source to destination
# -R: recursive (copy directories and their contents)
# -v: verbose (show files being copied)
cp -Rv "$SOURCE_DIR"/* "$LIVE_DIR"/

# Display completion message
echo ""
echo "Synchronization complete!"
echo "Website files have been updated in the Live directory."

