#!/usr/bin/env python3

import os
import re

# Tailwind class replacements
tailwind_class_map = {
	# Backgrounds
	"bg-indigo-900": "bg-graybg1",
	"bg-indigo-800": "bg-graybg2",
	"bg-slate-900": "bg-graybg3",
	"bg-blue-600": "bg-primary",
	"bg-blue-500": "bg-secondary",
	
	# Text
	"text-white": "text-textlight",
	"text-gray-200": "text-textmed",
	"text-gray-400": "text-textdark",
	"text-blue-300": "text-accent",
	
	# Borders / Buttons
	"border-white": "border-textlight",
	"border-blue-500": "border-primary",
	"hover:bg-blue-600": "hover:bg-primary",
}

# Path
root_dir = os.path.expanduser("~/peb_stuff/gemini_site")

# Process HTML files
for subdir, _, files in os.walk(root_dir):
	for file in files:
		if file.endswith(".html"):
			full_path = os.path.join(subdir, file)
			with open(full_path, "r") as f:
				content = f.read()

			original_content = content

			# Replace Tailwind classes
			for old, new in tailwind_class_map.items():
				pattern = re.compile(rf"\b{re.escape(old)}\b")
				content = pattern.sub(new, content)

			if content != original_content:
				# Backup before overwrite
				with open(full_path + ".bak", "w") as f:
					f.write(original_content)
				with open(full_path, "w") as f:
					f.write(content)
				print(f"✅ Updated Tailwind classes in: {full_path}")

print("\n🎯 Tailwind classes updated.")