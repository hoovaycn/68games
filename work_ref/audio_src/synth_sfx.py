#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""合成 16 个 16-bit 芯片风 SFX（自有生成，无版权问题），输出 44.1k 16bit 单声道 WAV。"""
import os
import numpy as np

SR = 44100
OUT = "/Users/hoovay/Doubao/fx_game/work_ref/audio_src/sfx_wav"
os.makedirs(OUT, exist_ok=True)


def t(dur):
    return np.linspace(0, dur, int(SR * dur), endpoint=False)


def env(n, a=0.005, d=0.05, sustain=0.0, r=0.04, sr=SR):
    """简单 ADSR 包络（sustain 为电平比例）。"""
    na, nd, nr = int(a * sr), int(d * sr), int(r * sr)
    ns = max(0, n - na - nd - nr)
    e = np.zeros(n)
    i = 0
    if na:
        e[i:i + na] = np.linspace(0, 1, na); i += na
    if nd:
        e[i:i + nd] = np.linspace(1, sustain, nd); i += nd
    if ns:
        e[i:i + ns] = sustain; i += ns
    if nr:
        e[i:i + nr] = np.linspace(sustain, 0, nr)
    return e[:n]


def decay_env(n, rate=8.0):
    x = np.linspace(0, 1, n)
    return np.exp(-rate * x)


def fit(x, n):
    """把信号补齐/截断到 n 采样。"""
    if len(x) < n:
        return np.pad(x, (0, n - len(x)))
    return x[:n]


def square(freq, dur, duty=0.5, phase=0.0):
    x = t(dur)
    return np.where((2 * np.pi * freq * x + phase) % (2 * np.pi) < duty * 2 * np.pi, 1.0, -1.0)


def tri(freq, dur):
    x = t(dur)
    return 2 * np.abs(2 * ((freq * x) % 1) - 1) - 1


def sine(freq, dur):
    return np.sin(2 * np.pi * freq * t(dur))


def noise(dur):
    return np.random.uniform(-1, 1, int(SR * dur))


def sweep(f0, f1, dur, kind="square"):
    """频率上/下滑音。"""
    n = int(SR * dur)
    ph = 2 * np.pi * np.cumsum(np.linspace(f0, f1, n)) / SR
    if kind == "square":
        return np.where(ph % (2 * np.pi) < np.pi, 1.0, -1.0)
    return np.sin(ph)


def onepole_lp(x, cutoff=2000):
    """一阶低通，给噪声塑形。"""
    a = np.exp(-2 * np.pi * cutoff / SR)
    y = np.zeros_like(x)
    prev = 0.0
    for i in range(len(x)):  # 短音效，直接循环
        prev = (1 - a) * x[i] + a * prev
        y[i] = prev
    return y


def onepole_hp(x, cutoff=2000):
    a = np.exp(-2 * np.pi * cutoff / SR)
    y = np.zeros_like(x)
    prev_in = prev_out = 0.0
    for i in range(len(x)):
        y[i] = a * (prev_out + x[i] - prev_in)
        prev_in, prev_out = x[i], y[i]
    return y


def notes(freqs, dur_each=0.08, wave="square", gap=0.0, total=None):
    chunks = []
    for f in freqs:
        n = int(SR * dur_each)
        w = square(f, dur_each) if wave == "square" else (tri(f, dur_each) if wave == "tri" else sine(f, dur_each))
        w *= env(n, a=0.004, d=0.02, sustain=0.7, r=0.03)
        chunks.append(w)
        if gap:
            chunks.append(np.zeros(int(SR * gap)))
    y = np.concatenate(chunks)
    if total:
        n = int(SR * total)
        if len(y) < n:
            y = np.pad(y, (0, n - len(y)))
    return y


def save(name, y, peak=0.82):
    y = np.nan_to_num(y)
    m = np.max(np.abs(y)) or 1.0
    y = y / m * peak
    wav = (y * 32767).astype(np.int16)
    import wave
    with wave.open(os.path.join(OUT, name + ".wav"), "wb") as f:
        f.setnchannels(1); f.setsampwidth(2); f.setframerate(SR)
        f.writeframes(wav.tobytes())
    print(name, f"{len(y)/SR:.2f}s")


# ---------- 1. UI ----------
save("sfx_cursor", square(1250, 0.06) * env(int(SR*0.06), a=0.002, d=0.02, r=0.02))
save("sfx_confirm", notes([660, 990], 0.07, "square"))
save("sfx_cancel", notes([440, 330], 0.07, "square"))
save("sfx_text_blip", square(1900, 0.028) * decay_env(int(SR*0.028), 30))
save("sfx_menu_open", sweep(300, 900, 0.12) * env(int(SR*0.12), a=0.003, d=0.05, r=0.04))

# ---------- 2. 战斗 ----------
step = onepole_lp(noise(0.09), 500) * np.linspace(1, 0, int(SR*0.09))
save("sfx_step", step, 0.6)

sw = onepole_hp(noise(0.18), 800)
sw *= np.sin(np.linspace(0, np.pi, int(SR*0.18)))**2 * 1.4
save("sfx_attack_swing", sw)

hit = square(180, 0.12) * decay_env(int(SR*0.12), 18) * 0.8
hit += fit(onepole_lp(noise(0.12), 3000) * decay_env(int(SR*0.12), 25), len(hit))
save("sfx_hit_normal", hit)

crit = sweep(220, 60, 0.28, "tri") * decay_env(int(SR*0.28), 7) * 1.2
crit += fit(onepole_lp(noise(0.28), 1800) * decay_env(int(SR*0.28), 10), len(crit))
save("sfx_hit_crit", crit)

miss = onepole_hp(noise(0.2), 2500) * np.sin(np.linspace(0, np.pi, int(SR*0.2)))**2 * 0.7
save("sfx_miss", miss)

gulp = notes([300, 240], 0.09, "tri", gap=0.03)
save("sfx_item_use", gulp)

save("sfx_item_get", notes([1046, 1318, 1568, 2093], 0.07, "square", gap=0.01))
save("sfx_level_up", notes([523, 659, 784, 1046, 1318, 1568], 0.09, "square", gap=0.005))

down = notes([523, 440, 349, 262], 0.08, "tri", gap=0.01)
down += fit(onepole_lp(noise(0.34), 1200) * decay_env(int(SR*0.34), 6) * 0.4, len(down))
save("sfx_unit_down", down)

# ---------- 3. 悬疑特写 ----------
# 微信感消息提示：柔和双音
msg = sine(880, 0.09) * env(int(SR*0.09), a=0.005, d=0.03, sustain=0.6, r=0.04) * 0.7
msg2 = sine(1174, 0.12) * env(int(SR*0.12), a=0.005, d=0.04, sustain=0.6, r=0.06) * 0.7
gap = np.zeros(int(SR*0.05))
save("sfx_phone_msg", np.concatenate([msg, gap, msg2]))

# 惊悚刺音：高频不协和簇 + 低频重击 + 骤停长尾
n = int(SR*0.6)
sting = (square(1760, 0.6) + square(1860, 0.6) + square(92, 0.6, duty=0.25)) / 3
env_s = np.concatenate([np.linspace(0, 1, int(SR*0.004)),
                        np.exp(-np.linspace(0, 5, n - int(SR*0.004)))])
sting *= env_s
sting += fit(onepole_lp(noise(0.6), 4000), n) * env_s * 0.3
save("sfx_shock_sting", sting, 0.9)

print("ALL SFX DONE")
