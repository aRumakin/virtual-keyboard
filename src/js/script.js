import keys from './keyboard-keys.js';
import {Key} from './class-Key.js';

class Keyboard {
  constructor(keysArray) {
    this.keys = keysArray;
    this.specialKeys = ['Backspace', 'Tab', 'CapsLock', 'Enter', 'ShiftLeft', 'ShiftRight', 'ControlLeft',
      'Alt', 'Space', 'Ctrl', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Delete'];
    this.textarea = '';
    this.state = {
      CapsLock: false,
      Shift: false,
      lang: 'eng',
    };
    this.current = {
      element: null,

    }
    this.currentCursorPos = 0;
    this.pressed = new Set();
    this.textarea = null;
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
      this.buttonOnClick(e);
    });
    document.addEventListener('keyup', (e) => {
      e.preventDefault();
      this.buttonUnClick(e);
    });
    this.textarea.focus();
    this.showCurrentLayer();
  }

  buttonOnClick(event) {
    let currKeyClass;
    if (event instanceof KeyboardEvent) {
      currKeyClass = event.code;
      this.current.element = document.querySelector(`.${currKeyClass}`);
    } else {
      [,, currKeyClass] = event.currentTarget.classList;
      this.current.element = event.currentTarget;
    }
    this.pressed.add(currKeyClass);
    if (this.pressed.has('ControlLeft') && this.pressed.has('AltLeft')) this.switchLanguage();
    const currentKey = document.querySelector(`.${currKeyClass}`);
    if (!currentKey) return;
    currentKey.classList.add('active');
 
    this.textarea.focus();

    const textAreaStart = this.textarea.selectionStart;
    const textAreaLast = this.textarea.selectionEnd;
    this.currentCursorPos = textAreaLast;
    this.textarea.setSelectionRange(this.currentCursorPos, this.ccurrentCursorPos);

    if (currKeyClass === 'CapsLock') {
      this.state.CapsLock = !this.state.CapsLock;
      currentKey.classList.toggle('caps_on');
      this.showCurrentLayer();
      return;
    }
    if (currKeyClass === 'ShiftRight' || currKeyClass === 'ShiftLeft') {
      this.state.Shift = true;
      this.showCurrentLayer();
    }
    if (currKeyClass === 'Backspace') {
      this.textarea.value = this.textarea.value
        .substring(0, textAreaStart - ((textAreaLast === this.textarea.value.length || textAreaStart === textAreaLast)
          ? 1 : 0)) + this.textarea.value.substring(textAreaLast, this.textarea.value.length);
      this.currentCursorPos = textAreaStart - (textAreaStart === textAreaLast ? 1 : 0);
      this.textarea.setSelectionRange(this.currentCursorPos, this.currentCursorPos);
      return;
    }
    if (currKeyClass === 'ArrowLeft') {
      this.currentCursorPos -= this.currentCursorPos > 0 ? 1 : 0;
      this.textarea.setSelectionRange(this.currentCursorPos, this.currentCursorPos);
      return;
    }
    if (currKeyClass === 'ArrowRight') {
      this.currentCursorPos += this.currentCursorPos < this.textarea.value.length ? 1 : 0;
      this.textarea.setSelectionRange(this.currentCursorPos, this.currentCursorPos);
      return;
    }
    if (currKeyClass === 'ArrowUp') {
      this.currentCursorPos = this.currentCursorPos - 55 > 0 ? this.currentCursorPos - 55 : 0;
      this.textarea.setSelectionRange(this.currentCursorPos, this.currentCursorPos);
      return;
    } 
    if (currKeyClass === 'ArrowDown') {
      this.currentCursorPos = this.currentCursorPos + 55 < this.textarea.value.length
        ? this.currentCursorPos + 55
        : this.textarea.value.length;
      this.textarea.setSelectionRange(this.currentCursorPos, this.currentCursorPos);
      return;
    }
    if (currKeyClass === 'Delete') {
      this.textarea.value = this.textarea.value.substring(0, textAreaStart)
        + this.textarea.value.substring(
          textAreaLast + (textAreaStart === textAreaLast ? 1 : 0),
          this.textarea.value.length,
        );
      this.textarea.setSelectionRange(textAreaStart, textAreaStart);
      return;
    }

    const keyContent = this.getContent(currentKey);
    if (currKeyClass === '') return;

    if (this.textarea.selectionStart || this.textarea.selectionStart === '0') {
      this.textarea.value = this.textarea.value.substring(0, textAreaStart) + keyContent
        + this.textarea.value.substring(textAreaLast, this.textarea.value.length);
      this.currentCursorPos = textAreaStart + keyContent.length;
      this.textarea.setSelectionRange(this.currentCursorPos, this.currentCursorPos);
    } else this.textarea.value += keyContent;

  }

  buttonUnClick(event) {
    let currKeyClass;
    if (event instanceof KeyboardEvent) {
      currKeyClass = event.code;
    } else {
      [,, currKeyClass] = event.currentTarget.classList;
    }
    this.current.element.classList.remove('active');
    
    this.pressed.delete(currKeyClass);
    const currentKey = document.querySelector(`.${currKeyClass}`);
    if (!currentKey) return;
    if (currentKey === 'ShiftRight' || currentKey === 'ShiftLeft') {
      this.state.Shift = false;
    }
    this.textarea.focus();
  }

  getContent(key) {
    let curElContent = '';
    key.querySelectorAll('span > span').forEach((el) => {
      if (!el.classList.contains('hidden') && !el.parentElement.classList.contains('hidden')) {
        curElContent = el.textContent;
      }
    });

    if (curElContent === 'Enter') return '\n';
    if (curElContent === 'Space') return ' ';
    if (curElContent === 'Tab') return '    ';
    
    if (this.specialKeys.includes(curElContent)) return '';
    if (this.state.CapsLock && this.state.Shift) {
      return curElContent;
    }
    if (this.state.CapsLock) return curElContent.toUpperCase();
    if (this.state.Shift) return curElContent;
    return curElContent;
  }

  showCurrentLayer() {
    const rusKeys = document.querySelectorAll('.rus');
    const engKeys = document.querySelectorAll('.eng');
    console.log(this.state.lang);
    if (this.state.lang === 'eng') {
      rusKeys.forEach((el) => el.classList.add('hidden'));
      engKeys.forEach((el) => el.classList.remove('hidden'));
    } else {
      rusKeys.forEach((el) => el.classList.remove('hidden'));
      engKeys.forEach((el) => el.classList.add('hidden'));
    }

    localStorage.setItem('lang', this.state.lang);

    const newActive = document.querySelectorAll(`.${this.state.lang} span`);
    newActive.forEach((el) => el.classList.remove('hidden'));
    if (this.state.CapsLock && this.state.Shift) {
      newActive.forEach((el) => {
        if (!el.classList.contains('shiftCaps')) {
          el.classList.add('hidden');
        }
      });
    } else if (this.state.CapsLock) {
      newActive.forEach((el) => {
        if (!el.classList.contains('capsOn')) {
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
    this.state.lang = this.state.lang  === 'eng' ? 'rus' : 'eng';
    localStorage.setItem('lang', this.state.lang);
    this.showCurrentLayer();
  }
}

new Keyboard(keys).create();
