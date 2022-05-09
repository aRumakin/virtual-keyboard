import keys from './keyboard-keys.js';
import {Key} from './class-Key.js';

class Keyboard {
  constructor(keysArray) {
    this.keys = keysArray;
    this.specialKeys = ['Backspace', 'Tab', 'CapsLock', 'Enter', 'ShiftLeft', 'ShiftRight', 'ControlLeft',
      'AltLeft', 'Space', 'ControlRight', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Delete'];
    this.textarea = '';
    this.state = {
      CapsLock: false,
      Shift: false,
      lang: 'eng',
    };
    this.current = {
      element: null,
      char: null,
      code: null,
    };
  }

  create() {
    this.state.lang = localStorage.getItem('lang') || 'eng';
    document.body.classList.add('body');
    const centralEl = document.createElement('div');
    centralEl.classList.add('centralizer');

    const titleEl = document.createElement('p');
    titleEl.classList.add('title');
    titleEl.textContent = 'RSS Виртуальная клавиатура';

    const textAreaEl = document.createElement('textarea');
    textAreaEl.classList.add('body--textarea', 'textarea');
    textAreaEl.id = 'textarea';
    textAreaEl.rows = '5';
    textAreaEl.cols = '50';

    const kbEl = document.createElement('div');
    kbEl.classList.add('body--keyboard', 'keyboard');
    kbEl.id = 'keyboard';

    const descriptionEl = document.createElement('p');
    descriptionEl.classList.add('description');
    descriptionEl.textContent = 'Клавиатура создана в операционной системе MacOS';

    const langEl = document.createElement('p');
    langEl.classList.add('language');
    langEl.textContent = 'Комбинация для переключения языка: левыe ctrl + alt';

    document.body.append(titleEl, textAreaEl, kbEl, descriptionEl, langEl);

    this.keys.forEach((element) => {
      const rowEl = document.createElement('div');
      rowEl.classList.add('keyboard--row', 'row');
      element.forEach((el) => {
        const newKey = new Key(el).addKey();
        newKey.addEventListener('mousedown', (e) => this.buttonOnClick(e));
        newKey.addEventListener('mouseup', (e) => this.buttonUnClick(e));
        rowEl.append(newKey);
      });
      kbEl.append(rowEl);
    });
    this.textarea = textAreaEl;
    document.addEventListener('keydown', (e) => {
      e.preventDefault();
      this.buttonOnClick(e.code);
    });
    document.addEventListener('keyup', (e) => {
      e.preventDefault();
      this.buttonUnClick(e.code);
    });
    this.textarea.focus();
    this.showCurrentLayer();
  }

  buttonOnClick(event) {
    event.preventDefault();
    event.currentTarget.classList.add('active');
    this.current.element = event.currentTarget;
  }

  buttonUnClick(event) {
    event.preventDefault();
    this.current.element.classList.remove('active');

  }


  showCurrentLayer() {
    const rusKeys = document.querySelectorAll('.rus');
    const engKeys = document.querySelectorAll('.eng');
    this.state.lang === 'eng'
      ? rusKeys.forEach((el) => el.classList.add('hidden'))
      : engKeys.forEach((el) => el.classList.remove('hidden'));
    const newActive = document.querySelectorAll(`.${this.state.lang} span`);
    if (this.state.CapsLock && this.state.Shift) {
      newActive.forEach((el) => {
        if (!el.classList.contains('shiftCaps')) {
          el.classList.add('hidden');
        }
      });
    } else if (this.state.CapsLock) {
      newActive.forEach((el) => {
        if (!el.classList.contains('caps')) {
          el.classList.add('hidden');
        }
      });
    } else if (this.state.Shift) {
      newActive.forEach((el) => {
        if (!el.classList.contains('caseUp')) {
          el.classList.add('hidden');
        }
      });
    } else {
      newActive.forEach((el) => {
        if (!el.classList.contains('caseDown')) {
          el.classList.add('hidden');
        }
      });
    }
  }

  switchLanguage() {
    this.state.lang = 'eng' ? 'rus' : 'eng';
    this.showCurrentLayer();
  }
}

new Keyboard(keys).create();
