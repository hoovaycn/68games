#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""第三幕敌人立绘 + 头像批量后处理（复用角色脚本的清洗/裁切逻辑）。

用法： python scripts/build_act3_enemies.py
输出： assets/art/*.png|@2x、assets/portraits/*.png|@2x
"""
import os
import sys
from PIL import Image

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from build_act3_characters import clean, fit_solid, portrait_from  # noqa: E402

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
GEN = os.path.join(ROOT, 'generated-images')
ART = os.path.join(ROOT, 'assets/art')
POR = os.path.join(ROOT, 'assets/portraits')

JOBS = [
    ('Bright_vivid_16_bit_pixel_art__2026-10-31T03-56-43.png', 'enforcer_abiao'),
    ('Bright_vivid_16_bit_pixel_art__2026-10-31T03-56-53.png', 'porter_blueeye'),
    ('Bright_vivid_16_bit_pixel_art__2026-10-31T03-57-12.png', 'boss_viper_smuggler'),
    ('Bright_vivid_16_bit_pixel_art__2026-10-31T03-57-25.png', 'sailor_berserk'),
    ('Bright_vivid_16_bit_pixel_art__2026-10-31T03-57-46.png', 'boss_exam_captain'),
    ('High_resolution_32_bit_era_pix_2026-11-04T12-04-49.png', 'officer_100'),
    ('Redraw_this_exact_same_enemy_c_2026-11-04T12-08-19.png', 'probe_machine'),
    ('Bright_vivid_16_bit_pixel_art__2026-10-31T03-58-27.png', 'boss_hunter_alpha'),
    ('Bright_vivid_16_bit_pixel_art__2026-10-31T03-58-48.png', 'patrol_robot_exam'),
    ('Bright_vivid_16_bit_pixel_art__2026-10-31T03-59-48.png', 'boss_ai_topstudent'),
    ('Bright_vivid_16_bit_pixel_art__2026-10-31T03-59-05.png', 'boss_storm_mech'),
    ('Bright_vivid_16_bit_pixel_art__2026-10-31T03-59-22.png', 'alloy_deathsworn'),
    ('Bright_vivid_16_bit_pixel_art__2026-10-31T03-59-59.png', 'hound_riot'),
    ('Bright_vivid_16_bit_pixel_art__2026-10-31T04-00-11.png', 'boss_iron_scorpion'),
    ('Bright_vivid_16_bit_pixel_art__2026-10-31T04-01-17.png', 'fanatic_bomber'),
    ('Bright_vivid_16_bit_pixel_art__2026-10-31T04-00-35.png', 'hold_gate_guard'),
    ('High_resolution_32_bit_era_pix_2026-11-04T12-05-22.png', 'pillar_neural_lock'),
    ('High_resolution_32_bit_era_pix_2026-11-04T12-06-04.png', 'chronos_puppet'),
    ('Bright_vivid_16_bit_pixel_art__2026-10-31T04-00-56.png', 'repair_spider'),
    ('Bright_vivid_16_bit_pixel_art__2026-10-31T04-01-29.png', 'boss_judgement_core'),
    ('Bright_vivid_16_bit_pixel_art__2026-10-31T04-01-44.png', 'capital_guard_mech'),
]


def main():
    ok = 0
    for src, name in JOBS:
        p = os.path.join(GEN, src)
        if not os.path.exists(p):
            print('  MISSING', src)
            continue
        im = clean(Image.open(p))
        fit_solid(im, 240, 320).save(os.path.join(ART, name + '.png'))
        art2 = fit_solid(im, 480, 640)
        art2.save(os.path.join(ART, name + '@2x.png'))
        portrait_from(art2, 96).save(os.path.join(POR, name + '.png'))
        portrait_from(art2, 192).save(os.path.join(POR, name + '@2x.png'))
        ok += 1
    print('DONE', ok, '/', len(JOBS))


if __name__ == '__main__':
    main()
