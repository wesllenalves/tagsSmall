class TagsSmall {
  constructor(seletor, mesage) {
    if (seletor === null || seletor === undefined) {
      throw new Error('Um seletor deve ser fornecido para o construtor!');
    }
    this.input = document.querySelector(seletor);
    this.mensage = mesage;
    this.tags = [];
    this.classeRemove = '.glyphicon-remove';
    this.mensageDefault =
      'Telefone com erro. Formato suportado: (00) 0000-0000';
    this.lengthTags = 14;
    this.init();
  }

  init() {
    if (this.input != null || this.input != undefined) {
      this.createTag();
      this.createElementErro();

      this.input.addEventListener('keyup', (e) => {
        this.addTag(e);
      });

      this.input.parentElement.addEventListener('click', (e) => {
        this.removerTag(e);
      });

      this.input.parentElement.parentElement.parentElement
        .querySelector('.details')
        .addEventListener('click', (e) => {
          if (e.target.matches('.remove-all')) {
            this.removerAllTags();
          }
        });
    }
  }

  createElementErro() {
    const ul = this.input.parentElement;
    let spanErro = `<span><p style="font-size: 12px; color: red; display: none" id="tagsSamllErro">${
      this.mensage === undefined ? this.mensageDefault : this.mensage
    }</p></span>`;
    ul.insertAdjacentHTML('afterend', spanErro);
  }

  createTag() {
    const ul = this.input.parentElement;
    ul.querySelectorAll('li').forEach((li) => li.remove());
    this.tags
      .slice()
      .reverse()
      .forEach((tag) => {
        let liTag = `<li id="tagsSamll-li">${tag} <i class="glyphicon glyphicon-remove" id="tagsSamllRemove"></i></li>`;
        ul.insertAdjacentHTML('afterbegin', liTag);
      });
  }

  addTag(e) {
    if (e.key == 'Enter') {
      let erroFormato = document.getElementById('tagsSamllErro');
      let tag = e.target.value.replace(/\s+/g, ' ');
      if (tag.length > 1 && !this.tags.includes(tag)) {
        if (tag.length < this.lengthTags) {
          erroFormato.style.display = 'block';
        } else {
          erroFormato.style.display = 'none';
          tag.split(',').forEach((tag) => {
            this.tags.push(tag);
            this.createTag();
          });
        }
      }
      e.target.value = '';
    }
  }

  removerTag(e) {
    if (e.target && e.target.matches(this.classeRemove)) {
      const elementoFilho = e.target.parentElement;
      let index = this.tags.indexOf(elementoFilho.textContent.trim());
      this.tags = [...this.tags.slice(0, index), ...this.tags.slice(index + 1)];
      elementoFilho.remove();
    }
  }

  removerAllTags() {
    this.tags.length = 0;
    const ul = this.input.parentElement;
    ul.querySelectorAll('li').forEach((li) => li.remove());
  }

  getValues() {
    return this.tags.join(';');
  }

  addValues(item) {
    let erroFormato = document.getElementById('tagsSamllErro');
    let tag = item.replace(/\s+/g, ' ');
    if (tag.length > 1 && !this.tags.includes(tag)) {
      if (tag.length < this.lengthTags) {
        erroFormato.style.display = 'block';
      } else {
        erroFormato.style.display = 'none';
        tag.split(tag.includes(',') ? ',' : ';').forEach((tag) => {
          this.tags.push(tag);
          this.createTag();
        });
      }
    }
  }
}
