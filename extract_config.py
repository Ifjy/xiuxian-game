#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Extract configuration sections from game.js and create separate config files
"""

import re
import os

def extract_config_section(content, section_name):
    """Extract a specific configuration section from the CONFIG object"""
    # Pattern to match the section
    pattern = rf'    {section_name}:\s*\{{(.*?)(?=\n    \w+:|$)'
    match = re.search(pattern, content, re.DOTALL)

    if match:
        section_content = match.group(0)
        return section_content
    return None

def count_braces(text):
    """Count opening and closing braces to find matching pairs"""
    open_count = text.count('{')
    close_count = text.count('}')
    return open_count, close_count

def extract_complete_section(content, start_line):
    """Extract a complete section by counting braces"""
    lines = content.split('\n')
    section_lines = []
    brace_count = 0
    in_section = False

    for i, line in enumerate(lines[start_line:], start=start_line):
        section_lines.append(line)
        brace_count += line.count('{')
        brace_count -= line.count('}')

        # If we've closed all braces and we're in a section, we're done
        if in_section and brace_count == 0:
            break

        # Start counting after we find the first opening brace
        if '{' in line:
            in_section = True

    return '\n'.join(section_lines)

def main():
    # Read the game.js file
    game_js_path = 'E:/Code/game/game.js'
    with open(game_js_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Extract lines 2-2307 (CONFIG object)
    lines = content.split('\n')
    config_lines = lines[1:2307]  # Lines 2-2307 (0-indexed)
    config_content = '\n'.join(config_lines)

    # Remove the "const CONFIG = " part and the closing semicolon
    config_content = config_content.replace('const CONFIG = ', '')
    if config_content.rstrip().endswith(';'):
        config_content = config_content.rstrip()[:-1]

    # Find section starts
    sections = {}
    section_starts = {}

    for i, line in enumerate(config_lines):
        # Match section names at the start of a line with 4 spaces
        match = re.match(r'    (\w+):', line)
        if match:
            section_name = match.group(1)
            section_starts[section_name] = i

    print(f"Found {len(section_starts)} sections:")
    for name in sorted(section_starts.keys()):
        print(f"  - {name} at line {section_starts[name]}")

    # Extract each section
    extracted_sections = {}
    for section_name in sorted(section_starts.keys()):
        start_line = section_starts[section_name]
        section_content = extract_complete_section(config_content, start_line)
        extracted_sections[section_name] = section_content

    # Create config directory if it doesn't exist
    config_dir = 'E:/Code/game/js/config'
    os.makedirs(config_dir, exist_ok=True)

    # Group sections into files
    game_config_sections = [
        'spiritualRoots', 'realms', 'backgrounds', 'skills', 'combatSkills',
        'meditationEvents', 'adventures', 'jobs', 'secretRealms',
        'sects', 'sectRanks', 'sectTasks', 'sectShop',
        'npcs', 'storyQuests', 'pets'
    ]

    items_config_sections = [
        'items', 'artifacts', 'artifactEnhancement'
    ]

    monsters_config_sections = [
        'monsters', 'heavenlyTribulations'
    ]

    dungeons_config_sections = [
        'dungeons'
    ]

    # Write GameConfig.js
    game_config_path = os.path.join(config_dir, 'GameConfig.js')
    with open(game_config_path, 'w', encoding='utf-8') as f:
        f.write("// ==================== 游戏配置 ====================\n")
        f.write("// 从 game.js 提取的游戏核心配置\n")
        f.write("// 包含：灵根、境界、背景、功法、技能、事件、宗门、NPC、任务等\n\n")

        for section_name in game_config_sections:
            if section_name in extracted_sections:
                f.write(f"    {extracted_sections[section_name]}\n\n")
                print(f"[OK] Added {section_name} to GameConfig.js")

    # Write ItemsConfig.js
    items_config_path = os.path.join(config_dir, 'ItemsConfig.js')
    with open(items_config_path, 'w', encoding='utf-8') as f:
        f.write("// ==================== 物品配置 ====================\n")
        f.write("// 从 game.js 提取的物品相关配置\n")
        f.write("// 包含：物品、法宝、法宝强化等\n\n")

        for section_name in items_config_sections:
            if section_name in extracted_sections:
                f.write(f"    {extracted_sections[section_name]}\n\n")
                print(f"[OK] Added {section_name} to ItemsConfig.js")

    # Write MonstersConfig.js
    monsters_config_path = os.path.join(config_dir, 'MonstersConfig.js')
    with open(monsters_config_path, 'w', encoding='utf-8') as f:
        f.write("// ==================== 怪物配置 ====================\n")
        f.write("// 从 game.js 提取的怪物相关配置\n")
        f.write("// 包含：怪物、天劫等\n\n")

        for section_name in monsters_config_sections:
            if section_name in extracted_sections:
                f.write(f"    {extracted_sections[section_name]}\n\n")
                print(f"[OK] Added {section_name} to MonstersConfig.js")

    # Write DungeonsConfig.js
    dungeons_config_path = os.path.join(config_dir, 'DungeonsConfig.js')
    with open(dungeons_config_path, 'w', encoding='utf-8') as f:
        f.write("// ==================== 副本配置 ====================\n")
        f.write("// 从 game.js 提取的副本相关配置\n")
        f.write("// 包含：副本信息等\n\n")

        for section_name in dungeons_config_sections:
            if section_name in extracted_sections:
                f.write(f"    {extracted_sections[section_name]}\n\n")
                print(f"[OK] Added {section_name} to DungeonsConfig.js")

    print("\n[OK] Configuration files created successfully!")
    print(f"  - {game_config_path}")
    print(f"  - {items_config_path}")
    print(f"  - {monsters_config_path}")
    print(f"  - {dungeons_config_path}")

if __name__ == '__main__':
    main()
