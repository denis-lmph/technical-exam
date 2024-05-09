window.ct = function(selector) {
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
      data.forEach(function(item) {
          const li = document.createElement("li");
          li.textContent = item.label;
          ul.appendChild(li);
      });
  }

  elements.makeSearchInput = function({
      data
  }) {
      this.forEach(function(input) {
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
              filteredData.forEach(function(item) {
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
          input.addEventListener("blur", function() {
              const container = this.parentElement;
              const ul = container.querySelector(".search-results");
              ul.style.display = "none";
          });
      });
  };

  return elements;
};

// Initialize components when document is ready
document.addEventListener("DOMContentLoaded", function() {
  const data = [{
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


  // Get the modal
  var modal = document.getElementById("myModal");

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // Get the modal content elements
  var modalContent1 = document.getElementById("modalContent1");
  var modalContent2 = document.getElementById("modalContent2");
  var modalContent3 = document.getElementById("modalContent3");

  // Get the buttons
  var category = document.getElementById("category");
  var clickhere = document.getElementById("clickhere");
  var reviewButton = document.querySelectorAll(".review-link");
  var catitem = document.querySelectorAll(".dropdown-item");

  // category.addEventListener("change", function () {
  //   modalContent1.style.display = "block";
  //   modalContent2.style.display = "none";
  //   modalContent3.style.display = "none";
  //   modal.style.display = "block";
  // });



  catitem.forEach(function(button) {
      button.addEventListener("click", function() {
          modalContent1.style.display = "block";
          modalContent2.style.display = "none";
          modalContent3.style.display = "none";
          modal.style.display = "block";
      });
  });

  reviewButton.forEach(function(button) {
      button.addEventListener("click", function() {
          modalContent1.style.display = "none";
          modalContent2.style.display = "block";
          modalContent3.style.display = "none";
          modal.style.display = "block";
      });
  });

  clickhere.addEventListener("click", function() {
      modalContent1.style.display = "none";
      modalContent2.style.display = "none";
      modalContent3.style.display = "block";
      modal.style.display = "block";
  });

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
      modal.style.display = "none";
  };

  var btnclose = document.getElementById("modalCloseBtn");
  btnclose.onclick = function() {
      modal.style.display = "none";
  };


  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
      if (event.target == modal) {
          modal.style.display = "none";
      }
  };




  var dropdownToggle = document.querySelector('.dropdown-toggle');
  var dropdownMenu = document.querySelector('.dropdown-menu');

  dropdownToggle.addEventListener('click', function() {
      event.preventDefault(); // Prevent default behavior
      if (dropdownMenu.style.display === 'block') {


          dropdownMenu.style.display = 'none';
      } else {
          dropdownMenu.style.display = 'block';
      }
  });

  document.addEventListener('click', function(event) {
      if (!dropdownToggle.contains(event.target) && !dropdownMenu.contains(event.target)) {
          dropdownMenu.style.display = 'none';
      }
  });




});