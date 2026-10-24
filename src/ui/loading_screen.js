export function drawLoadingScreen(ctx, width, height, label = '正在准备画面') {
  ctx.save();
  ctx.fillStyle = '#101014';
  ctx.fillRect(0, 0, width, height);

  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#f4e9d6';
  ctx.font = 'bold 24px "Microsoft YaHei", sans-serif';
  ctx.fillText('六（8）班异闻录', width / 2, height / 2 - 38);

  ctx.font = '15px "Microsoft YaHei", sans-serif';
  ctx.fillStyle = '#b5aaa0';
  ctx.fillText(label, width / 2, height / 2 + 10);

  const barW = 180;
  const x = (width - barW) / 2;
  const y = height / 2 + 42;
  ctx.fillStyle = '#353136';
  ctx.fillRect(x, y, barW, 2);
  ctx.fillStyle = '#d8b67a';
  const progress = (Date.now() % 1400) / 1400;
  ctx.fillRect(x + progress * (barW - 44), y, 44, 2);
  ctx.restore();
}
