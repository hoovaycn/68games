#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""合成 6.5s FE 式胜利号角 bgm_victory（自有生成），输出 WAV。"""
import wave
import numpy as np

SR = 44100


def note(freq, dur, wave_kind="square", vol=1.0):
    n = int(SR * dur)
    x = np.linspace(0, dur, n, endpoint=False)
    if wave_kind == "square":
        w = np.where(np.sin(2*np.pi*freq*x) >= 0, 1.0, -1.0)
        # 叠一个高八度轻音增加明亮度
        w = w*0.75 + np.where(np.sin(2*np.pi*freq*2*x) >= 0, 1.0, -1.0)*0.25
    elif wave_kind == "tri":
        w = 2*np.abs(2*((freq*x) % 1)-1)-1
    else:
        w = np.sin(2*np.pi*freq*x)
    a = int(0.008*SR); r = int(0.05*SR)
    e = np.ones(n)
    e[:a] = np.linspace(0, 1, a)
    e[-r:] = np.linspace(1, 0, r)
    return w*e*vol


def seq(notes, kind, vol):
    return np.concatenate([note(f, d, kind, vol) for f, d in notes])


melody = [
    (523, .18), (659, .18), (784, .36), (659, .36),
    (784, .36), (880, .18), (784, .18), (659, .72),
    (698, .36), (659, .36), (587, .36), (659, .36),
    (1046, .72), (784, .36), (659, .36),
    (1046, 1.08),
]
bass = [(131, 1.08), (196, 1.44), (175, 1.44), (131, 1.44), (131, 1.08)]

m = seq(melody, "square", 0.55)
b = seq(bass, "tri", 0.5)
n = len(m)
if len(b) < n:
    b = np.pad(b, (0, n-len(b)))
# 结尾和弦垫（最后 1.44s）：E4+G4
pad = np.zeros(n)
tail = seq([(330, .72), (392, .72)], "tri", 0.28)
pad[n-len(tail):] += tail
y = m + b[:n]*0.8 + pad
# 轻微整体混响尾（单 tap 延迟）
echo = np.zeros(n)
d = int(0.13*SR)
echo[d:] = y[:-d]*0.18
y = y + echo
# 结尾淡出
y[-int(0.5*SR):] *= np.linspace(1, 0, int(0.5*SR))
y = y/(np.max(np.abs(y)))*0.85
with wave.open("/Users/hoovay/Doubao/fx_game/work_ref/audio_src/bgm_victory.wav", "wb") as f:
    f.setnchannels(1); f.setsampwidth(2); f.setframerate(SR)
    f.writeframes((y*32767).astype(np.int16).tobytes())
print(f"victory {len(y)/SR:.2f}s")
