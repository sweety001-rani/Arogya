const items = [
    {
      name: "Men's T-shirt",
      image: "/images/mens-tshirt.jpeg",
      price: 29.99,
      discount: 0.1
    },
    {
      name: "Women's Jeans",
      image: "/images/mens-tshirt.jpeg",
      price: 49.99,
      discount: 0.2
    },
    {
      name: "Men's Sneakers",
      image: "/images/mens-tshirt.jpeg",
      price: 79.99,
      discount: 0
    },
    {
      name: "Women's Dress",
      image: "/images/mens-tshirt.jpeg",
      price: 89.99,
      discount: 0.15
    },
    {
      name: "Men's Watch",
      image: "/images/mens-tshirt.jpeg",
      price: 149.99,
      discount: 0.25
    },
    {
      name: "Women's Handbag",
      image: "/images/mens-tshirt.jpeg",
      price: 99.99,
      discount: 0.1
    },
    {
      name: "Men's T-shirt",
      image: "/images/mens-tshirt.jpeg",
      price: 29.99,
      discount: 0.1
    },
    {
      name: "Men's T-shirt",
      image: "/images/mens-tshirt.jpeg",
      price: 29.99,
      discount: 0.1
    },
    {
      name: "Men's T-shirt",
      image: "/images/mens-tshirt.jpeg",
      price: 29.99,
      discount: 0.1
    },
    {
      name: "Men's T-shirt",
      image: "/images/mens-tshirt.jpeg",
      price: 29.99,
      discount: 0.1
    },
    {
      name: "Men's T-shirt",
      image: "/images/mens-tshirt.jpeg",
      price: 29.99,
      discount: 0.1
    }
    ,
    {
      name: "Men's T-shirt",
      image: "/images/mens-tshirt.jpeg",
      price: 29.99,
      discount: 0.1
    }
    ,
    {
      name: "Men's T-shirt",
      image: "/images/mens-tshirt.jpeg",
      price: 29.99,
      discount: 0.1
    }
  ];

  function displayItems(pageNumber) {
    const itemsPerPage = 6;
    const startIndex = (pageNumber - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const itemsToDisplay = items.slice(startIndex, endIndex);
  
    const itemContainer = document.querySelector(".item-container");
    itemContainer.innerHTML = "";
  
    itemsToDisplay.forEach(item => {
      const discountedPrice = item.price * (1 - item.discount);
      const itemElement = `
        <div class="item">
          <img src="${item.image}" alt="${item.name}">
          <div class="item-details">
            <h3>${item.name}</h3>
            <p>Price: $${item.price.toFixed(2)}</p>
            <p>Discounted Price: $${discountedPrice.toFixed(2)}</p>
          </div>
        </div>
      `;
      itemContainer.innerHTML += itemElement;
    });
  
    const paginationContainer = document.querySelector(".pagination");
    paginationContainer.innerHTML = "";
  
    const totalPages = Math.ceil(items.length / itemsPerPage);
    for (let i = 1; i <= totalPages; i++) {
      const button = document.createElement("button");
      button.innerText = i;
      if (i === pageNumber) {
        button.classList.add("active");
      }
      button.addEventListener("click", () => displayItems(i));
      paginationContainer.appendChild(button);
    }
  }

  displayItems(1);
