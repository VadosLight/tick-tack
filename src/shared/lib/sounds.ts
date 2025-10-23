// Константы для всех звуковых файлов
export const SOUNDS = {
  // Звуки интерфейса
  MENU_MUSIC: '/tick-tack/sound/menu_music.mp3',
  GAME_MUSIC: '/tick-tack/sound/game_music.mp3',
  START_GAME: '/tick-tack/sound/start_game.mp3',
  
  // Звуки игровых действий
  CLICK_NORMAL: '/tick-tack/sound/click.mp3',
  CROSS_SOUND: '/tick-tack/sound/cross.mp3',
  CIRCLE_SOUND: '/tick-tack/sound/circle.mp3',
  
  // Звуки результатов игры
  WIN_SOUND: '/tick-tack/sound/win_game.mp3',
  LOSE_SOUND: '/tick-tack/sound/lose_game.mp3',
} as const;

export type SoundKey = keyof typeof SOUNDS;
