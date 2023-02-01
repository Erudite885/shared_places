export class Modal {
  constructor(contentId) {
    this.contentTemplateEl = document.getElementById(contentId);
    this.modalTemplateEl = document.getElementById("modal-template");
  }

  show() {
    const modalElements = document.importNode(
      this.modalTemplateEl.content,
      true
    );
    const modalElement = modalElements.querySelector(".modal");
    const backdropElement = modalElements.querySelector(".backdrop");
    const contentElement = document.importNode(
      this.contentTemplateEl.content,
      true
    );

    modalElement.appendChild(contentElement);

    document.body.insertAdjacentElement("afterbegin", modalElement);
    document.body.insertAdjacentElement("afterbegin", backdropElement);
  }

  hide() {}
}
