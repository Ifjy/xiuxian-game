#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Format extracted configuration files as ES6 modules
"""

import os

def format_config_file(input_path, export_name):
    """Format a config file as an ES6 module"""
    with open(input_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Remove header lines to get just the config sections
    lines = content.split('\n')
    config_lines = []
    in_config = False

    for line in lines:
        # Skip header comments
        if line.startswith('//') or line.strip() == '':
            if not in_config:
                continue
        # Start collecting from the first config section
        if '    ' in line or line.strip().startswith('spiritualRoots') or line.strip().startswith('items') or line.strip().startswith('monsters') or line.strip().startswith('dungeons'):
            in_config = True
            # Fix indentation (remove extra spaces)
            if line.startswith('        '):
                line = '    ' + line[8:]
            elif line.startswith('    ') and not line.strip().startswith('//'):
                line = line[4:]
        if in_config:
            config_lines.append(line)

    config_content = '\n'.join(config_lines).strip()

    # Create the formatted content
    formatted_content = f"""// ==================== 游戏配置 ====================
// 从 game.js 提取的配置文件
// 使用 ES6 模块导出语法

export const {export_name} = {{
{config_content}
}};
"""

    return formatted_content

def main():
    config_dir = 'E:/Code/game/js/config'

    # Format GameConfig.js
    game_config_path = os.path.join(config_dir, 'GameConfig.js')
    formatted_game = format_config_file(game_config_path, 'GAME_CONFIG')
    with open(game_config_path, 'w', encoding='utf-8') as f:
        f.write(formatted_game)
    print(f"[OK] Formatted {game_config_path}")

    # Format ItemsConfig.js
    items_config_path = os.path.join(config_dir, 'ItemsConfig.js')
    formatted_items = format_config_file(items_config_path, 'ITEMS_CONFIG')
    with open(items_config_path, 'w', encoding='utf-8') as f:
        f.write(formatted_items)
    print(f"[OK] Formatted {items_config_path}")

    # Format MonstersConfig.js
    monsters_config_path = os.path.join(config_dir, 'MonstersConfig.js')
    formatted_monsters = format_config_file(monsters_config_path, 'MONSTERS_CONFIG')
    with open(monsters_config_path, 'w', encoding='utf-8') as f:
        f.write(formatted_monsters)
    print(f"[OK] Formatted {monsters_config_path}")

    # Format DungeonsConfig.js
    dungeons_config_path = os.path.join(config_dir, 'DungeonsConfig.js')
    formatted_dungeons = format_config_file(dungeons_config_path, 'DUNGEONS_CONFIG')
    with open(dungeons_config_path, 'w', encoding='utf-8') as f:
        f.write(formatted_dungeons)
    print(f"[OK] Formatted {dungeons_config_path}")

    print("\n[OK] All configuration files formatted successfully!")

if __name__ == '__main__':
    main()
