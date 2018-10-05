export default function makeAnimations(scene) {
  const bonanimation = [
    {key: 'stay_up', start: 6, end: 7},
    {key: 'stay_down', start: 0, end: 5 },
    {key: 'stay_left', start: 18, end: 23},
    {key: 'stay_right', start: 12, end: 17},
    {key: 'move_up', start: 30, end: 35},
    {key: 'move_down', start: 24, end: 29},
    {key: 'move_left', start: 42, end: 47},
    {key: 'move_right', start: 36, end: 41},
    {key: 'sit_up', start: 54, end: 55},
    {key: 'sit_down', start: 48, end: 53},
    {key: 'sit_left', start: 66, end: 70},
    {key: 'sit_right', start: 60, end: 65},
  ];

  bonanimation.forEach(({ key, start, end, frameRate = 10, repeat = -1 }) => {
    scene.anims.create({
      key,
      frames: scene.anims.generateFrameNumbers('bono', { start, end }),
      frameRate,
      repeat
    });
  });

  const ballanimation = [
    {key: 'ball_stay_up', start: 6, end: 7},
    {key: 'ball_stay_down', start: 0, end: 5 },
    {key: 'ball_stay_left', start: 18, end: 23},
    {key: 'ball_stay_right', start: 12, end: 17},
    {key: 'ball_move_up', start: 30, end: 35},
    {key: 'ball_move_down', start: 24, end: 29},
    {key: 'ball_move_left', start: 42, end: 47},
    {key: 'ball_move_right', start: 36, end: 41},
    {key: 'ball_sit_up', start: 54, end: 55},
    {key: 'ball_sit_down', start: 48, end: 53},
    {key: 'ball_sit_left', start: 66, end: 70},
    {key: 'ball_sit_right', start: 60, end: 65},
  ];

  ballanimation.forEach(({ key, start, end, frameRate = 10, repeat = -1 }) => {
    scene.anims.create({
      key,
      frames: scene.anims.generateFrameNumbers('ball_sprite', { start, end }),
      frameRate,
      repeat
    });
  })

  const coinanimation = [
    {key: 'coin_rotate', start: 0, end: 5},
  ];

  coinanimation.forEach(({ key, start, end, frameRate = 10, repeat = -1 }) => {
    scene.anims.create({
      key,
      frames: scene.anims.generateFrameNumbers('coin_sprite', { start, end }),
      frameRate,
      repeat
    });
  })
}
