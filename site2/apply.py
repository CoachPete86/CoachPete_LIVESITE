import os
import re

# --- Configuration: Colors and Fonts ---
NEW_COLORS = {
    'primary_orange': '#ff6b35',
    'secondary_orange': '#ff8c42',
    'accent_blue': '#00d4ff',
    'bg_dark_grey': '#1a1a1a',
    'bg_medium_grey': '#2d2d2d',
    'bg_light_grey': '#3d3d3d',
    'text_light': '#e0e0e0',
    'text_medium': '#b0b0b0',
    'text_dark': '#808080',
}

# --- Helper Functions ---
def replace_in_tailwind_config(content):
    """Updates the tailwind.config colors and fonts."""
    
    # Target the tailwind.config object
    config_pattern = re.compile(r"(tailwind\.config\s*=\s*\{[\s\S]*?theme:\s*\{[\s\S]*?extend:\s*\{)([\s\S]*?)(\}\s*\}\s*\})", re.DOTALL)
    config_match = config_pattern.search(content)

    if not config_match:
        print("Could not find tailwind.config extend block.")
        return content

    prefix = config_match.group(1)
    extend_content = config_match.group(2)
    suffix = config_match.group(3)

    # New colors string
    new_colors_str = f"""
        colors: {{
            'primary-orange': '{NEW_COLORS['primary_orange']}',
            'secondary-orange': '{NEW_COLORS['secondary_orange']}',
            'accent-blue': '{NEW_COLORS['accent_blue']}',
            'bgDarkGrey': '{NEW_COLORS['bg_dark_grey']}',
            'bgMediumGrey': '{NEW_COLORS['bg_medium_grey']}',
            'bgLightGrey': '{NEW_COLORS['bg_light_grey']}',
            'textLight': '{NEW_COLORS['text_light']}',
            'textMedium': '{NEW_COLORS['text_medium']}',
            'textDark': '{NEW_COLORS['text_dark']}',
        }},"""

    # New font family string
    new_font_family_str = f"""
        fontFamily: {{
            sans: ['Open Sans', 'sans-serif'],
            heading: ['Oswald', 'sans-serif'],
        }}"""

    # Replace or add colors block
    if re.search(r"colors:\s*\{", extend_content):
        extend_content = re.sub(r"colors:\s*\{[\s\S]*?\},?", new_colors_str, extend_content, 1, flags=re.DOTALL)
    else: # Add if not exists
        extend_content = new_colors_str + "\n" + extend_content.strip()

    # Replace or add fontFamily block
    if re.search(r"fontFamily:\s*\{", extend_content):
        extend_content = re.sub(r"fontFamily:\s*\{[\s\S]*?\},?", new_font_family_str, extend_content, 1, flags=re.DOTALL)
    else: # Add if not exists
        # Ensure it's added correctly within extend object, potentially after colors
        if extend_content.strip().endswith(','):
            extend_content += new_font_family_str
        else:
            extend_content += ",\n" + new_font_family_str


    # Clean up trailing commas before a closing brace if any were left by regex
    extend_content = re.sub(r",\s*(\})", r"\1", extend_content)
    
    return prefix + extend_content + suffix


def update_html_content(content):
    """Applies color scheme and font changes to HTML content."""

    # 1. Add Google Fonts and Font Awesome CDN links to <head>
    google_fonts_link_css2 = '<link href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Open+Sans:wght@400;600;700&display=swap" rel="stylesheet">'
    google_fonts_preconnect1 = '<link rel="preconnect" href="https://fonts.googleapis.com">'
    google_fonts_preconnect2 = '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>'
    font_awesome_link = '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">'
    
    head_insertion_content = ""
    if google_fonts_preconnect1 not in content:
        head_insertion_content += f"  {google_fonts_preconnect1}\n"
    if google_fonts_preconnect2 not in content:
        head_insertion_content += f"  {google_fonts_preconnect2}\n"
    if google_fonts_link_css2 not in content:
        head_insertion_content += f"  {google_fonts_link_css2}\n"
    if font_awesome_link not in content:
        head_insertion_content += f"  {font_awesome_link}\n"
    
    if head_insertion_content:
        content = content.replace("</head>", head_insertion_content + "</head>", 1)
    # 2. Remove old dark mode script
    content = re.sub(r"<script>\s*if\s*\(window\.matchMedia\s*&&\s*window\.matchMedia\('\(prefers-color-scheme:\s*dark\)'\)\.matches\)\s*\{[\s\S]*?\}\s*window\.matchMedia\('\(prefers-color-scheme:\s*dark\)'\)\.addEventListener[\s\S]*?</script>", "", content, flags=re.DOTALL | re.IGNORECASE)
    # Simpler removal if the above is too specific
    content = re.sub(r"<script>\s*if\s*\(window\.matchMedia[\s\S]*?prefers-color-scheme[\s\S]*?</script>", "", content, flags=re.DOTALL | re.IGNORECASE)


    # 3. Update body class
    content = re.sub(r'<body class="[^"]*">', f'<body class="bg-bgDarkGrey text-textLight font-sans">', content)
    
    # 4. Add/Update base CSS styles for body and headings
    # Remove old style block content carefully, then insert new one
    # This aims to replace the content of the first <style> tag after tailwind config
    
    style_block_pattern = re.compile(r"(<style>)([\s\S]*?)(</style>)")
    style_match = style_block_pattern.search(content)

    base_styles_content = f"""
    body {{
        background-color: {NEW_COLORS['bg_dark_grey']}; /* bgDarkGrey */
        font-family: 'Open Sans', sans-serif;
        color: {NEW_COLORS['text_light']}; /* textLight */
    }}
    h1, h2, h3, h4, h5, h6 {{
        font-family: 'Oswald', sans-serif;
        color: {NEW_COLORS['text_light']}; /* Default heading color */
    }}
    .nav-link {{ transition: all 0.3s ease; color: {NEW_COLORS['text_medium']}; }}
    .nav-link:hover {{ color: {NEW_COLORS['primary_orange']}; }}
    .nav-link.active {{ color: {NEW_COLORS['primary_orange']}; font-weight: 600; }}
    
    .btn {{ /* Base button style, can be a class or apply to button tag */
        padding: 0.65rem 1.5rem; /* Adjusted padding */
        border-radius: 0.25rem; /* Slightly less rounded */
        font-weight: 600; /* Oswald is already bold, Open Sans might need this */
        font-family: 'Oswald', sans-serif; /* Ensure buttons use heading font */
        text-transform: uppercase; 
        letter-spacing: 0.05em;
        transition: all 0.2s ease-in-out;
        display: inline-block; /* Ensure buttons behave as expected */
        text-align: center;
        line-height: 1.25; /* Adjust for uppercase text */
    }}
    .btn-primary {{
        background-color: {NEW_COLORS['primary_orange']};
        color: {NEW_COLORS['bg_dark_grey']}; 
        border: 2px solid {NEW_COLORS['primary_orange']};
    }}
    .btn-primary:hover {{
        background-color: {NEW_COLORS['secondary_orange']};
        border-color: {NEW_COLORS['secondary_orange']};
    }}
    .btn-secondary-outline {{ /* For less prominent actions */
        background-color: transparent;
        border: 2px solid {NEW_COLORS['accent_blue']};
        color: {NEW_COLORS['accent_blue']};
    }}
    .btn-secondary-outline:hover {{
        background-color: {NEW_COLORS['accent_blue']};
        color: {NEW_COLORS['bg_dark_grey']};
    }}
    .btn-hero-main {{ /* Specific for hero "Start Your Journey" */
        background-color: {NEW_COLORS['accent_blue']};
        color: {NEW_COLORS['bg_dark_grey']};
        border: 2px solid {NEW_COLORS['accent_blue']};
    }}
    .btn-hero-main:hover {{
        background-color: {NEW_COLORS['primary_orange']};
        color: {NEW_COLORS['bg_dark_grey']};
        border-color: {NEW_COLORS['primary_orange']};
    }}
    .btn-hero-alt {{ /* Specific for hero "Free Assessment Tools" */
        background-color: transparent;
        color: {NEW_COLORS['text_light']}; 
        border: 2px solid {NEW_COLORS['text_light']};
    }}
    .btn-hero-alt:hover {{
        background-color: {NEW_COLORS['text_light']};
        color: {NEW_COLORS['primary_orange']}; 
    }}

    input[type="text"], input[type="email"], input[type="tel"], input[type="number"], input[type="date"], select, textarea {{
        background-color: {NEW_COLORS['bg_medium_grey']};
        border: 1px solid {NEW_COLORS['bg_light_grey']};
        color: {NEW_COLORS['text_light']};
        padding: 0.75rem 1rem;
        border-radius: 0.25rem;
    }}
    input::placeholder, textarea::placeholder {{
        color: {NEW_COLORS['text_dark']};
        opacity: 0.8;
    }}
    input:focus, select:focus, textarea:focus {{
        border-color: {NEW_COLORS['primary_orange']};
        box-shadow: 0 0 0 3px {NEW_COLORS['primary_orange']}4D; /* focus ring with opacity */
        outline: none;
    }}
    .hero-bg {{
        background: linear-gradient(135deg, {NEW_COLORS['primary_orange']}E6, {NEW_COLORS['secondary_orange']}D9), url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><defs><pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse"><path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(0,0,0,0.15)" stroke-width="1.5"/></pattern></defs><rect width="100%" height="100%" fill="url(%23grid)"/></svg>');
        /* background-blend-mode: overlay, normal; */ /* Example for texture */
    }}
    .sticky-nav {{ backdrop-filter: blur(10px); }}
    .counter {{ font-variant-numeric: tabular-nums; color: {NEW_COLORS['primary_orange']}; }}
    .progress-bar {{ background-color: {NEW_COLORS['primary_orange']}; }}
    #progress-circle {{ stroke: {NEW_COLORS['primary_orange']}; }}
    .progress-step.completed, .progress-step.current {{ background-color: {NEW_COLORS['primary_orange']}; color: {NEW_COLORS['bg_dark_grey']}; }}
    .progress-step.current {{ box-shadow: 0 0 0 4px {NEW_COLORS['primary_orange']}4D; }}
    
    .card-bg {{ background-color: {NEW_COLORS['bg_medium_grey']}; }}
    .section-bg-alt {{ background-color: {NEW_COLORS['bg_light_grey']}; }}
    .disabled-look {{
        opacity: 0.6;
        cursor: not-allowed !important;
        background-color: {NEW_COLORS['bg_light_grey']} !important;
        color: {NEW_COLORS['text_dark']} !important;
        border-color: {NEW_COLORS['bg_light_grey']} !important;
    }}
    /* High contrast for text on orange backgrounds if any */
    .text-on-orange {{ color: {NEW_COLORS['bg_dark_grey']}; }} 
    """
    if style_match:
        content = content.replace(style_match.group(0), f"<style>{base_styles_content}</style>", 1)
    else: # If no <style> tag, add it in <head>
        content = content.replace("</head>", f"<style>{base_styles_content}</style>\n</head>", 1)

    # 5. Update Tailwind classes
    replacements = [
        # Remove dark variants and old grays for backgrounds
        (r'\bdark:bg-gray-\d{2,3}\b', ''),
        (r'\bdark:bg-opacity-\d{1,3}\b', ''),
        (r'\bbg-white\b(?!\S*dark:)', 'bg-bgMediumGrey'), # Main card backgrounds
        (r'\bbg-gray-50\b', 'bg-bgLightGrey'),
        (r'\bbg-gray-100\b', 'bg-bgLightGrey'),
        (r'\bbg-gray-200\b', 'bg-bgLightGrey'),
        (r'\bbg-gray-300\b', 'bg-bgLightGrey'), # Used for some steps, buttons
        (r'\bbg-gray-800\b', 'bg-bgMediumGrey'), # Card backgrounds
        (r'\bbg-gray-900\b', 'bg-bgDarkGrey'),   # Footer, main bg
        (r'\bbg-white/90\b', f"bg-[{NEW_COLORS['bg_medium_grey']}]/90"), # Nav bg
        (r'\bdark:bg-gray-900/90\b', ''),

        # Text colors - remove dark variants, map old grays to new theme
        (r'\bdark:text-white\b', ''),
        (r'\bdark:text-gray-\d{2,3}\b', ''),
        (r'\btext-gray-900\b(?!\S*dark:)', 'text-textLight'),
        (r'\btext-gray-800\b', 'text-textLight'),
        (r'\btext-gray-700\b', 'text-textMedium'), # General purpose text
        (r'\btext-gray-600\b', 'text-textMedium'), # Subdued text
        (r'\btext-gray-500\b', 'text-textDark'),   # Placeholders, very subdued
        (r'\btext-gray-400\b', 'text-textDark'),   # Often used in footers, less important info
        (r'\btext-gray-300\b', 'text-textMedium'), # Was dark:text-gray-300

        # Primary/Secondary color classes
        (r'\b(bg-primary)\b', 'bg-primary-orange'),
        (r'\b(text-primary)\b', 'text-primary-orange'),
        (r'\b(hover:bg-primaryDark)\b', 'hover:bg-secondary-orange'),
        (r'\b(border-primary)\b', 'border-primary-orange'),
        (r'\b(focus:ring-primary)\b', 'focus:ring-primary-orange'),
        (r'\b(bg-primary/10)\b', f"bg-[{NEW_COLORS['primary_orange']}]/20"), # Make it a bit more visible
        (r'\b(dark:bg-primary/20)\b', ''),
        
        # Borders
        (r'\bdark:border-gray-\d{2,3}\b', ''),
        (r'\bborder-gray-200\b(?!\S*dark:)', 'border-bgLightGrey'),
        (r'\bborder-gray-300\b', 'border-bgLightGrey'), # Inputs
        (r'\bborder-gray-700\b', 'border-bgLightGrey'), # Was dark border
        (r'\bborder-gray-800\b', 'border-bgLightGrey'), # Footer border

        # Placeholders
        (r'\bplaceholder-gray-500\b', 'placeholder-textDark'),
        (r'\b(dark:placeholder-gray-400)\b', ''),

        # Specific component colors
        (r'bg-white text-primary rounded-lg', f'bg-white text-bgDarkGrey rounded-lg'), # Hero white button
        (r'border-2 border-white text-white rounded-lg', f'border-2 border-textLight text-textLight rounded-lg'), # Hero outline button
        (r'\btext-yellow-300\b', 'text-accent-blue'),
        (r'\btext-green-300\b', 'text-accent-blue'),
        (r'\btext-blue-300\b', 'text-accent-blue'),
        (r'\btext-yellow-400\b', 'text-accent-blue'), # Testimonial stars
        (r'\btext-yellow-500\b', 'text-accent-blue'), # Pause button text - needs bg change too
        (r'\bbg-yellow-500\b', 'bg-accent-blue'), # Pause button background
        (r'\bhover:bg-yellow-600\b', 'hover:bg-opacity-80'), # Hover for accent blue button

        # Green success messages (onboarding)
        (r'\bbg-green-50\b', f"bg-[{NEW_COLORS['accent_blue']}]/10"),
        (r'\bdark:bg-green-900/20\b', ''),
        (r'\bborder-green-200\b', f"border-[{NEW_COLORS['accent_blue']}]/30"),
        (r'\bdark:border-green-700\b', ''),
        (r'\btext-green-800\b', f"text-[{NEW_COLORS['accent_blue']}]"),
        (r'\bdark:text-green-200\b', ''),

        # Font Awesome Hamburger (if you replaced SVG before)
        (r'<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">\s*<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>\s*</svg>', '<i class="fas fa-bars fa-lg"></i>'),

        # Apply font-heading to main page titles if they are simple h1s
        # This is a bit broad, better to add class manually or adjust base h1 style
        # (r'(<h1[^>]*>)([^<]+)(</h1>)', r'\1<span class="font-heading">\2</span>\3'),
    ]

    for pattern, replacement in replacements:
        content = re.sub(pattern, replacement, content)

    # Clean up any remaining specific dark: classes that might cause issues or are now redundant
    content = re.sub(r'\bdark:[a-zA-Z0-9-/:]+\b', '', content)
    # Clean up multiple spaces that might result from empty class attributes
    content = re.sub(r'class="\s*"', '', content)
    content = re.sub(r'\s{2,}', ' ', content)


    return content

# --- Main Script ---
def main():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    html_files = [f for f in os.listdir(script_dir) if f.endswith('.html')]
    
    if not html_files:
        print("No HTML files found in the script's directory.")
        return

    print("Starting theme update process...")
    print("IMPORTANT: Please ensure you have backed up your HTML files before proceeding.")
    
    # Python 2/3 compatibility for input
    try:
        # Python 3
        proceed = input("Type 'yes' to continue: ")
    except NameError:
        # Python 2
        proceed = raw_input("Type 'yes' to continue: ")

    if proceed.lower() != 'yes':
        print("Update cancelled.")
        return

    for filename in html_files:
        filepath = os.path.join(script_dir, filename)
        print(f"Processing {filepath}...")
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            original_content = content 

            # 1. Update Tailwind Config
            if "tailwind.config" in content:
                content = replace_in_tailwind_config(content)

            # 2. Update general HTML content, styles, classes
            content = update_html_content(content)
            
            if content != original_content:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f"Successfully updated {filename}")
            else:
                print(f"No changes made to {filename} (it might have been already updated or content did not match patterns).")

        except Exception as e:
            print(f"Error processing {filename}: {e}")

    print("\nTheme update process finished.")
    print("Please review the HTML files and test your website thoroughly.")
    print("ICON NOTE: Font Awesome CDN link has been added. You'll need to manually replace emoji/SVG icons with Font Awesome tags (e.g., <i class=\"fas fa-dumbbell\"></i>) where desired.")
    print("TEXTURE NOTE: For the 'gritty/industrial' feel and 'texture overlays', you'll need to add custom CSS.")
    print("Example CSS for texture (add to your <style> block or a separate CSS file):")
    print(""".texture-overlay {
    position: relative; /* Or apply to elements that should have texture */
}
.texture-overlay::before {
    content: "";
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background-image: url('path/to/your/gritty-texture.png'); /* You need to provide this image */
    opacity: 0.08; /* Adjust as needed */
    pointer-events: none; 
    mix-blend-mode: overlay; /* Experiment with 'multiply', 'screen', 'hard-light' etc. */
    z-index: -1; /* If applied to a container, to sit behind content */
}""")
    print("You can apply '.texture-overlay' to elements like body, .hero-bg, or .card-bg sections.")

if __name__ == '__main__':
    main()
