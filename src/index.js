export default class TagsSmall {
  constructor(arg1, arg2, arg3, arg4) {
    this.ul = document.querySelector(arg1);
    this.input = document.querySelector(arg2);
    this.erroFormato = document.querySelector(arg3);
    this.removeBtn = document.querySelector('.details button');
    this.tagsLength = arg4;

    this.tags = [];

    this.createTag();
    this.init();
  }

  init() {
    this.input.addEventListener('keyup', (e) => {
      this.addTag(e);
    });

    this.removeBtn.addEventListener('click', () => {
      this.tags.length = 0;
      this.ul.querySelectorAll('li').forEach((li) => li.remove());
    });
  }

  createTag() {
    this.ul.querySelectorAll('li').forEach((li) => li.remove());
    this.tags
      .slice()
      .reverse()
      .forEach((tag) => {
        let liTag = `<li>${tag} <i class="uit uit-multiply" onclick="remove(this, '${tag}')"></i></li>`;
        this.ul.insertAdjacentHTML('afterbegin', liTag);
      });
  }

  remove(element, tag) {
    let index = this.tags.indexOf(tag);
    this.tags = [...this.tags.slice(0, index), ...this.tags.slice(index + 1)];
    element.parentElement.remove();
  }

  addTag(e) {
    if (e.key == 'Enter') {
      let tag = e.target.value.replace(/\s+/g, ' ');
      if (tag.length > 1 && !this.tags.includes(tag)) {
        if (tag.length < this.tagsLength) {
          this.erroFormato.style.display = 'block';
        } else {
          this.erroFormato.style.display = 'none';
          tag.split(',').forEach((tag) => {
            this.tags.push(tag);
            this.createTag();
          });
        }
      }
      e.target.value = '';
    }
  }

  getValues() {
    return this.tags;
  }
}
