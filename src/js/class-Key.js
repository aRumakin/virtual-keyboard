export class Key {
  constructor(data) {
    const {
      type, classAdd, label,
    } = data;
    this.type = type;
    this.classAdd = classAdd;
    this.label = label;

    if (Array.isArray(label)) {
      this.eng = { low: label[0], up: label[1] };
      this.rus = { low: label[2], up: label[3] };
    } else {
      this.eng = { low: label, up: label };
      this.rus = { low: label, up: label };
    }
  }

  addKey() {
    const keyDivEl = document.createElement('div');
    keyDivEl.classList.add('keyboard--key', 'key', this.classAdd);
    ['eng', 'rus'].forEach((el) => {
      const langWrapperEl = document.createElement('span');
      langWrapperEl.classList.add(el);

      const caseDownEl = document.createElement('span');
      caseDownEl.classList.add('caseDown');
      caseDownEl.textContent = this[el].low;

      const caseUpEl = document.createElement('span');
      caseUpEl.classList.add('caseUp');
      caseUpEl.textContent = this[el].up;

      const capsEl = document.createElement('span');
      capsEl.classList.add('caps');
      capsEl.textContent = this[el].low.match(/A-za-zА-Яа-я/) ? this[el].up : this[el].low;

      const shiftCapsEl = document.createElement('span');
      shiftCapsEl.classList.add('shiftCaps');
      shiftCapsEl.textContent = this[el].low.match(/A-za-zА-Яа-я/) ? this[el].low : this[el].up;

      langWrapperEl.append(caseDownEl, caseUpEl, capsEl, shiftCapsEl);
      keyDivEl.append(langWrapperEl);
    });
    return keyDivEl;
  }
}
