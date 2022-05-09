const keys = [
  [
    {
      type: 'letter', classAdd: 'Backquote', label: ['`', '~', 'ё', 'Ё'],
    },
    {
      type: 'letter', classAdd: 'Digit1', label: ['1', '!', '1', '!'],
    },
    {
      type: 'letter', classAdd: 'Digit2', label: ['2', '@', '2', '"'],
    },
    {
      type: 'letter', classAdd: 'Digit3', label: ['3', '#', '3', '№'],
    },
    {
      type: 'letter', classAdd: 'Digit4', label: ['4', '$', '4', ';'],
    },
    {
      type: 'letter', classAdd: 'Digit5', label: ['5', '%', '5', '%'],
    },
    {
      type: 'letter', classAdd: 'Digit6', label: ['6', '^', '6', ':'],
    },
    {
      type: 'letter', classAdd: 'Digit7', label: ['7', '&', '7', '?'],
    },
    {
      type: 'letter', classAdd: 'Digit8', label: ['8', '*', '8', '*'],
    },
    {
      type: 'letter', classAdd: 'Digit9', label: ['9', '(', '9', '('],
    },
    {
      type: 'letter', classAdd: 'Digit0', label: ['0', ')', '0', ')'],
    },
    {
      type: 'letter', classAdd: 'Minus', label: ['-', '_', '-', '_'],
    },
    {
      type: 'letter', classAdd: 'Equal', label: ['=', '+', '=', '+'],
    },
    {
      type: 'ctrl', classAdd: 'Backspace', label: 'Backspace',
    },
  ],
  [
    {
      type: 'ctrl', classAdd: 'Tab', label: 'Tab',
    },
    {
      type: 'letter', classAdd: 'KeyQ', label: ['q', 'Q', 'й', 'Й'],
    },
    {
      type: 'letter', classAdd: 'KeyW', label: ['w', 'W', 'ц', 'Ц'],
    },
    {
      type: 'letter', classAdd: 'KeyE', label: ['e', 'E', 'у', 'У'],
    },
    {
      type: 'letter', classAdd: 'KeyR', label: ['r', 'R', 'к', 'К'],
    },
    {
      type: 'letter', classAdd: 'KeyT', label: ['t', 'T', 'е', 'Е'],
    },
    {
      type: 'letter', classAdd: 'KeyY', label: ['y', 'Y', 'н', 'Н'],
    },
    {
      type: 'letter', classAdd: 'KeyU', label: ['u', 'U', 'г', 'Г'],
    },
    {
      type: 'letter', classAdd: 'KeyI', label: ['i', 'I', 'ш', 'Ш'],
    },
    {
      type: 'letter', classAdd: 'KeyO', label: ['o', 'O', 'щ', 'Щ'],
    },
    {
      type: 'letter', classAdd: 'KeyP', label: ['p', 'P', 'з', 'З'],
    },
    {
      type: 'letter', classAdd: 'BracketLeft', label: ['[', '{', 'х', 'Х'],
    },
    {
      type: 'letter', classAdd: 'BracketRight', label: [']', '}', 'ъ', 'Ъ'],
    },
    {
      type: 'letter', classAdd: 'Backslash', label: ['\\', '|', '\\', '/'],
    },
    {
      type: 'ctrl', classAdd: 'Delete', label: 'Del',
    },
  ],
  [
    {
      type: 'ctrl', classAdd: 'CapsLock', label: 'CapsLock',
    },
    {
      type: 'letter', classAdd: 'KeyA', label: ['a', 'A', 'ф', 'Ф'],
    },
    {
      type: 'letter', classAdd: 'KeyS', label: ['s', 'S', 'ы', 'Ы'],
    },
    {
      type: 'letter', classAdd: 'KeyD', label: ['d', 'D', 'в', 'В'],
    },
    {
      type: 'letter', classAdd: 'KeyF', label: ['f', 'F', 'а', 'А'],
    },
    {
      type: 'letter', classAdd: 'KeyG', label: ['g', 'G', 'п', 'П'],
    },
    {
      type: 'letter', classAdd: 'KeyH', label: ['h', 'H', 'р', 'Р'],
    },
    {
      type: 'letter', classAdd: 'KeyJ', label: ['j', 'J', 'о', 'О'],
    },
    {
      type: 'letter', classAdd: 'KeyK', label: ['k', 'K', 'л', 'Л'],
    },
    {
      type: 'letter', classAdd: 'KeyL', label: ['l', 'L', 'д', 'Д'],
    },
    {
      type: 'letter', classAdd: 'Semicolon', label: [';', ':', 'ж', 'Ж'],
    },
    {
      type: 'letter', classAdd: 'Quote', label: ["'", '"', 'э', 'Э'],
    },
    {
      type: 'ctrl', classAdd: 'Enter', size: 'l', label: 'Enter',
    },
  ],
  [
    {
      type: 'ctrl', classAdd: 'ShiftLeft', label: 'Shift',
    },
    {
      type: 'letter', classAdd: 'KeyZ', label: ['z', 'Z', 'я', 'Я'],
    },
    {
      type: 'letter', classAdd: 'KeyX', label: ['x', 'X', 'ч', 'Ч'],
    },
    {
      type: 'letter', classAdd: 'KeyC', label: ['c', 'C', 'с', 'С'],
    },
    {
      type: 'letter', classAdd: 'KeyV', label: ['v', 'V', 'м', 'М'],
    },
    {
      type: 'letter', classAdd: 'KeyB', label: ['b', 'B', 'и', 'И'],
    },
    {
      type: 'letter', classAdd: 'KeyN', label: ['n', 'N', 'т', 'Т'],
    },
    {
      type: 'letter', classAdd: 'KeyM', label: ['m', 'M', 'ь', 'Ь'],
    },
    {
      type: 'letter', classAdd: 'Comma', label: [',', '<', 'б', 'Б'],
    },
    {
      type: 'letter', classAdd: 'Period', label: ['.', '>', 'ю', 'Ю'],
    },
    {
      type: 'letter', classAdd: 'Slash', label: ['/', '?', '.', ','],
    },
    {
      type: 'arrow', classAdd: 'ArrowUp', label: '▲',
    },
    {
      type: 'ctrl', classAdd: 'ShiftRight', label: 'Shift',
    },
  ],
  [
    {
      type: 'ctrl', classAdd: 'ControlLeft', label: 'Ctrl',
    },
    {
      type: 'ctrl', classAdd: 'Win', label: 'Win',
    },
    {
      type: 'ctrl', classAdd: 'AltLeft', label: 'Alt',
    },
    {
      type: 'letter', classAdd: 'Space', label: ' ',
    },
    {
      type: 'ctrl', classAdd: 'AltRight', label: 'Alt',
    },
    {
      type: 'arrow', classAdd: 'ArrowLeft', label: '◄',
    },
    {
      type: 'arrow', classAdd: 'ArrowDown', label: '▼',
    },
    {
      type: 'arrow', classAdd: 'ArrowRight', label: '►',
    },
    {
      type: 'ctrl', classAdd: 'ControlRight', label: 'Ctrl',
    },
  ],
];

export default keys;
