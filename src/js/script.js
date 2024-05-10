window.ct = function (selector) {
  const elements = document.querySelectorAll(selector);

  function createSearchInput(input, data) {
    // add search container if it doesn't exist
    if (!input.parentElement.classList.contains("search-container")) {
      const container = document.createElement("div");
      container.classList.add("search-container");
      input.parentElement.insertBefore(container, input);
      container.appendChild(input);
    }

    const container = input.parentElement;
    // Create UL for search results
    const ul = document.createElement("ul");
    ul.classList.add("search-results");
    container.appendChild(ul);

    // Populate data as li elements
    data.forEach(function (item) {
      const li = document.createElement("li");
      li.textContent = item.label;
      ul.appendChild(li);
    });
  }

  function createModal(modal, content) {
    // alert("hello 3 ");
    // Create modal content
    const modalContent = document.createElement("div");
    modalContent.classList.add("modal-content");

    // Close button
    const closeButton = document.createElement("span");
    closeButton.classList.add("close");
    closeButton.innerHTML = "&times;";

    closeButton.onclick = () => (modal.style.display = "none");
    modalContent.appendChild(closeButton);


    // Title
    // const titleElement = document.createElement("h2");
    // titleElement.textContent = modal.getAttribute("data-title") || "";
    // modalContent.appendChild(titleElement);

    // Body
    const bodyElement = document.createElement("div");
    bodyElement.classList.add("contents");
    bodyElement.innerHTML = modal.innerHTML;
    modal.innerHTML = "";
    modalContent.appendChild(bodyElement);

    //Footer
    const footerElement = document.createElement("div");
    footerElement.classList.add("modal-footer");
    const closeButtonFooter = document.createElement("button");
    closeButtonFooter.id = "modalCloseBtn";
    closeButtonFooter.textContent = "Close";
    closeButtonFooter.addEventListener("click", () => {
      modal.style.display = "none";
    });
    footerElement.appendChild(closeButtonFooter);
    modalContent.appendChild(footerElement);

    modal.appendChild(modalContent);
  }

  function convertSelectToDropdown(selectElement, { closeDropdownOnSelect }) {
    const divDropdown = document.createElement("div");
    divDropdown.classList.add("dropdown");

    const button = document.createElement("button");
    button.classList.add("dropdown-toggle");
    // button.type = "button";
    button.textContent = selectElement.getAttribute("data-label");

    const spanCaret = document.createElement("span");
    spanCaret.classList.add("caret");

    const spanBadge = document.createElement("span");
    spanBadge.classList.add("badge");
    spanBadge.textContent = selectElement.getAttribute("data-badge");

    const ulDropdownMenu = document.createElement("ul");
    ulDropdownMenu.classList.add("dropdown-menu");

    // Toggle dropdown menu on button click
    button.addEventListener("click", function (e) {
      e.preventDefault();
      if (
        ulDropdownMenu.style.display === "none" ||
        ulDropdownMenu.style.display === ""
      ) {
        ulDropdownMenu.style.display = "block";
      } else {
        ulDropdownMenu.style.display = "none";
      }
    });

    // Loop through each option in the select element
    Array.from(selectElement.options).forEach(function (option) {
      const liDropdownItem = document.createElement("li");
      liDropdownItem.classList.add("dropdown-item");

      // Clone all attributes of the option element and append them to the liDropdownItem
      Array.from(option.attributes).forEach(function (attribute) {
        liDropdownItem.setAttribute(attribute.nodeName, attribute.nodeValue);
      });

      // Clone all child nodes of the option and append them to the liDropdownItem
      Array.from(option.childNodes).forEach(function (childNode) {
        liDropdownItem.appendChild(childNode.cloneNode(true));
      });

      if (closeDropdownOnSelect) {
        liDropdownItem.addEventListener("click", function () {
          ulDropdownMenu.style.display = "none";
        });
      }

      ulDropdownMenu.appendChild(liDropdownItem);
    });
    // Append elements to form group div
    divDropdown.appendChild(button);
    divDropdown.appendChild(spanCaret);
    divDropdown.appendChild(ulDropdownMenu);

    // selectElement.remove();

    // Replace select element with form group div
    selectElement.parentNode.appendChild(divDropdown);
    selectElement.parentNode.appendChild(spanBadge);
    selectElement.remove();
  }

  elements.makeDropdown = function ({ closeDropdownOnSelect }) {
    this.forEach(el => convertSelectToDropdown(el, { closeDropdownOnSelect }));
  };

  elements.makeModal = function () {
    this.forEach(createModal);

    // When the user clicks anywhere outside of the modal, close it
    window.addEventListener("click", function (event) {
      elements.forEach(modal => {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      });
    });

    // Event listener to open each individual modal
    const modalTriggers = document.querySelectorAll("[data-open-modal-id]");
    modalTriggers.forEach(trigger => {
      trigger.addEventListener("click", function (e) {
        e.preventDefault();
        const modalId = this.getAttribute("data-open-modal-id");
        const modal = document.querySelector(`[data-modal-id="${modalId}"]`);
        if (modal) {
          modal.style.display = "block";
        }
      });
    });
  };

  elements.makeSearchInput = function ({ data }) {
    this.forEach(function (input) {
      createSearchInput(input, data);

      // Show search results when input is not empty or focused
      input.addEventListener("input", handleInput);
      input.addEventListener("focus", handleInput);

      function handleInput() {
        const container = this.parentElement;
        const ul = container.querySelector(".search-results");
        const searchText = this.value.trim().toLowerCase();
        // Filter data based on search text
        const filteredData = data.filter(item =>
          item.label.toLowerCase().includes(searchText)
        );
        ul.innerHTML = "";
        filteredData.forEach(function (item) {
          const li = document.createElement("li");
          const label = item.label;
          const startIndex = label.toLowerCase().indexOf(searchText);

          if (startIndex !== -1) {
            const endIndex = startIndex + searchText.length;
            const highlightedText =
              label.substring(0, startIndex) +
              '<span class="highlight">' +
              label.substring(startIndex, endIndex) +
              "</span>" +
              label.substring(endIndex);
            li.innerHTML = highlightedText;
          } else {
            li.textContent = label;
          }
          ul.appendChild(li);
        });
        // Show or hide search results based on matching results
        if (filteredData.length > 0 && searchText !== "") {
          ul.style.display = "block";
        } else {
          ul.style.display = "none";
        }
      }

      // Hide search results when input loses focus
      input.addEventListener("blur", function () {
        const container = this.parentElement;
        const ul = container.querySelector(".search-results");
        ul.style.display = "none";
      });
    });
  };

  return elements;
};

// Initialize components when document is ready
document.addEventListener("DOMContentLoaded", function () {
  const data = [
    {
      label: "Nowheresville, XX 00000"
    },
    {
      label: "California, XX 12345"
    },
    {
      label: "Fake Street, XX 68910"
    },
    {
      label: "Queensland, XX 11111"
    }
  ];

  ct(".search-input").makeSearchInput({
    data
  });

  ct(".select").makeDropdown({ closeDropdownOnSelect: true });
  ct(".modal").makeModal();
});
