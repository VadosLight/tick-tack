// Константы для всех звуковых файлов
export const SOUNDS = {
  // Звуки интерфейса
  MENU_MUSIC: '/tick-tack/sound/музыка меню.mp3',
  GAME_MUSIC: '/tick-tack/sound/музыка игра.mp3',
  START_GAME: '/tick-tack/sound/начать игру.mp3',
  
  // Звуки игровых действий
  CLICK_NORMAL: '/tick-tack/sound/click обычный.mp3',
  CROSS_SOUND: '/tick-tack/sound/крестик.mp3',
  CIRCLE_SOUND: '/tick-tack/sound/нолик.mp3',
  
  // Звуки результатов игры
  WIN_SOUND: '/tick-tack/sound/выигрыш.mp3',
  LOSE_SOUND: '/tick-tack/sound/проигрыш.mp3',
} as const;

export type SoundKey = keyof typeof SOUNDS;
