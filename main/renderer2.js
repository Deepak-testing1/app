window.addEventListener("DOMContentLoaded", () => {
  // Toggle sidebar
  document.getElementById("toggle-btn").addEventListener("click", function () {
    const sidebar = document.getElementById("sidebar");
    const mainContent = document.getElementById("main-content");
    //const toggleIcon = this.querySelector("i");
    const toggleIcon = this.querySelector("#toggle-btn img");

    sidebar.classList.toggle("collapsed");
    mainContent.classList.toggle("expanded");

    if (sidebar.classList.contains("collapsed")) {
      toggleIcon.classList.remove("menuon");
      toggleIcon.classList.add("menuoff");
      //toggleIcon.classList.add("fa-chevron-right");
    } else {
      toggleIcon.classList.remove("menuoff");
      toggleIcon.classList.add("menuon");
    }
  });

  // Switch between pages
  const menuItems = document.querySelectorAll(".menu-item:not(#exit-btn)");
  const pages = document.querySelectorAll(
    ".dashboard-container, .inventory-container, .invoice-container"
  );

  menuItems.forEach((item) => {
    item.addEventListener("click", function () {
      // Remove active class from all menu items
      menuItems.forEach((i) => i.classList.remove("active"));
      // Add active class to clicked item
      this.classList.add("active");

      // Hide all pages
      pages.forEach((page) => (page.style.display = "none"));

      // Show selected page
      const pageId = this.getAttribute("data-page") + "-page";
      document.getElementById(pageId).style.display = "block";
    });
  });

  // Exit button functionality
  document.getElementById("exit-btn").addEventListener("click", function () {
    window.close();
  });

  // Product modal functionality
  const productModal = document.getElementById("product-modal");
  const addProductBtn = document.getElementById("add-product-btn");
  const closeModal = document.querySelector(".close-modal");
  const cancelProductBtn = document.getElementById("cancel-product");

  addProductBtn.addEventListener("click", function () {
    productModal.style.display = "flex";
  });

  closeModal.addEventListener("click", function () {
    productModal.style.display = "none";
  });

  cancelProductBtn.addEventListener("click", function () {
    productModal.style.display = "none";
  });

  window.addEventListener("click", function (event) {
    if (event.target === productModal) {
      productModal.style.display = "none";
    }
  });

  // Form submission
  document
    .getElementById("product-form")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      const pname = document.getElementById("product-name").value;
      const category = document.getElementById("product-category").value;
      const price = document.getElementById("product-price").value;
      const stock = document.getElementById("product-stock").value;

      document.getElementById(
        "product-a"
      ).innerHTML = `<div style="  background-color: white; border-radius:0px; padding-top: 3px; padding-bottom:5px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
  
  <table>
  <tbody>
  <tr >
  <td style="width:20%; text-align: center;padding: 15px 0;border-bottom: 1px solid  #f8f9fa;">{image url} ₹</td>
 <td style="width:20%; text-align: center;padding: 15px 0;border-bottom: 1px solid  #f8f9fa;">${pname}</td>
  <td style="width:20%; text-align: center;padding: 15px 0;border-bottom: 1px solid  #f8f9fa;">${category}</td>
  <td style="width:20%;  text-align: center;padding: 15px 0;border-bottom: 1px solid  #f8f9fa;">${price} ₹</td>
  <td style="width:20%;  text-align: center;padding: 15px 0;border-bottom: 1px solid  #f8f9fa;">${stock}</td>
  <td> <button class="action-btn">
                    <img
                      src="images/edit-2-line.svg"
                      alt=""
                      height="25px"
                      width="25px"
                    />
                  </button></td>
                  <td>
                  <button class="action-btn">
                    <img
                      src="images/delete-bin-line.svg"
                      alt=""
                      height="25px"
                      width="25px"
                    />
                  </button></td>
   </tr>
   </tbody>
    </table>
    </div>
    `;

      // In a real app, you would save the product to a database
      console.log("product add section ");
      productModal.style.display = "none";
      this.reset();
    });

  // Generate invoice button
  let invoiceHistory = [];

  document.getElementById("form").addEventListener("submit", function (e) {
    e.preventDefault();
    //console.log("working");
    const id = document.getElementById("order-id").value;
    const cname = document.getElementById("customer-name").value;
    const email = document.getElementById("email").value;
    const address = document.getElementById("customer-address").value;
    const num = document.getElementById("cnumber").value;
    const date = new Date().toLocaleString();

    const invoice = {
      //id: invoiceHistory.length + 1,
      id,
      cname,
      email,
      address,
      num,
      date,
      comment,
      item,
      //qnt,
      // price,
      // total,
      // amount,
      //  subtotal,
      //tax,
    };
    invoiceHistory.push(invoice);
    renderInvoice(invoice);
    this.reset();
  });

  document.getElementById("form2").addEventListener("submit", function (e) {
    e.preventDefault();
    const item = document.getElementById("item").value;
    const comment = document.getElementById("comment").value;
    const price = +document.getElementById("price").value;
    const qnt = +document.getElementById("qnt").value;

    const amount = qnt * price;

    //const subtotal = 0;
    let subtotal = amount;
    document
      .querySelectorAll("#invoice-m table tbody tr td:last-child")
      .forEach((cell) => {
        const amountText = cell.textContent.trim().replace("₹", "");
        const amt = parseFloat(amountText);
        if (!isNaN(amt)) {
          subtotal += amt;
        }
      });

    const tax = subtotal * 0.08; // Assuming tax is 8%
    const total = subtotal + tax;

    document.getElementById(
      "invoice-h"
    ).innerHTML = `<div style="  background-color: white; border-radius:0px; padding-top: 3px; padding-bottom:5px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
  
  <table>
  <thead>
  <tr >
   <th  style=width:20%; text-align: center;padding: 15px 0;border-bottom: 1px solid #adb5bd;color: #adb5bd;font-weight: 500;">Item</th>
   <th  style=width:20%; text-align: center;padding: 158px 0;border-bottom: 1px solid #adb5bd;color: #adb5bd;font-weight: 500;">Description</th>
   <th style=width:20%; text-align: center;padding: 15px 0;border-bottom: 1px solid #adb5bd;color: #adb5bd;font-weight: 500;">Qty</th>
   <th style=width:20%; text-align: center;padding: 15px 0;border-bottom: 1px solid #adb5bd;color: #adb5bd;font-weight: 500;">Unit Price</th>
   <th style=width:20%; text-align: center;padding: 15px 0;border-bottom: 1px solid #adb5bd;color: #adb5bd;font-weight: 500;">Amount</th>
   </tr>
   </thead>
    </table>
    </div>
    `;
    const tbody = document.querySelector("#invoice-m table tbody");
    const newRow = document.createElement("tr");
    newRow.innerHTML = ` <td style="width:20%; text-align: center;padding: 15px 0;border-bottom: 1px solid  #f8f9fa;">${item}</td>
  <td style="width:20%; text-align: center;padding: 15px 0;border-bottom: 1px solid  #f8f9fa;">${comment}</td>
  <td style="width:20%;  text-align: center;padding: 15px 0;border-bottom: 1px solid  #f8f9fa;">${qnt}</td>
  <td style="width:20%;  text-align: center;padding: 15px 0;border-bottom: 1px solid  #f8f9fa;">${price}</td>
  <td style="width:20%; text-align: center;padding: 15px 0;border-bottom: 1px solid  #f8f9fa;">${amount} ₹</td>`;
    tbody.appendChild(newRow);

    document.getElementById("invoice-f").innerHTML = `
  <div style="  background-color: white; border-radius:0px; padding: 0 0; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);" >                           
  <div class="invoice-total">
                <div class="header">
                <table class="total-table">
                <tr>
                <td>Subtotal:</td>
                <td>${subtotal} ₹</td>
                </tr>
                <tr>
                <td>Tax(GST) (8%):</td>
                <td>${tax.toFixed(1)}</td>
                </tr>
                <tr>
                <td>Total:</td>
                <td>${total.toFixed(1)} ₹</td>
                </tr>
                </table>
                </div></div></div> 
                `;

    document.getElementById("item").value = "";
    document.getElementById("comment").value = "";
    document.getElementById("price").value = "";
    document.getElementById("qnt").value = "";
  });

  function renderInvoice(invoice) {
    document.getElementById("invoiceOutput").innerHTML = `
<div style="  background-color: white; border-radius:0px; padding-top: 30px; padding-bottom:5px; padding-left:30px; padding-right:30px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);" class="invoice-preview">

   <div style="  display: flex;  justify-content: space-between;  margin-bottom: 30px;" class="invoice-header">
            <div style="  font-size: 24px;
  font-weight: bold; color:#6c5ce7;" class="invoice-logo">company name</div>
            <div style="  text-align: right;" class="invoice-details">
              <div style="  font-size: 24px;
  margin-bottom: 10px; color: #343a40;" class="invoice-title">INVOICE</div>

              <div>${invoice.id}</div>
              <div>Date:${invoice.date}</div>
            </div>
          </div>

          <div style="  margin-bottom: 30px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;" class="invoice-info">
            <div>
              <h4>Bill To:</h4>
              <p>
                ${invoice.cname}<br />
                ${invoice.address}<br />
                ${invoice.email}<br />
                ${invoice.num}<br />
              </p>
            </div>
            <div>
              <h4>From:</h4>
              <p>
                company name<br />
                company address<br />
                company email<br />
                company number<br />
              </p>
            </div>
          </div>
          </div>
          </div>
            `;
  }

  document
    .getElementById("invoice-print")
    .addEventListener("click", function () {
      const content =
        document.getElementById("invoiceOutput").innerHTML +
        document.getElementById("invoice-h").innerHTML +
        document.getElementById("invoice-m").innerHTML +
        document.getElementById("invoice-f").innerHTML;
      if (!content.trim()) return alert("No invoice to print.");
      const win = window.open("", "", "width=800,height=700");
      win.document.write(`<html><body>${content}</body></html>`);
      win.document.close();
      win.print();
    });
  document.getElementById("reset").addEventListener("click", function () {
    const subtotal = 0;
    document.getElementById("invoiceOutput").innerHTML = ``;
    document.getElementById("invoice-h").innerHTML = ``;
    document.getElementById("invoice-m").innerHTML = `  <div
            style="
              background-color: white;
              padding-top: 5px;
              padding-bottom: 5px;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
            "
          >
            <table>
              <tbody></tbody>
            </table>
          </div>`;
    document.getElementById("invoice-f").innerHTML = ``;
  });

  document.getElementById("btn-view").addEventListener("click", function () {
    const id = document.getElementById("order-id").value;
    const cname = document.getElementById("customer-name").value;
    const date = new Date().toLocaleString();
    const price = +document.getElementById("price").value;
    const qnt = +document.getElementById("qnt").value;
    const amount = qnt * price;

    const tbody2 = document.querySelector("#recent-orders table tbody");
    const newRow2 = document.createElement("tr");
    newRow2.innerHTML = ` <td style="width:20%; text-align: center;padding: 15px 0;border-bottom: 1px solid  #f8f9fa;">${id}</td>
  <td style="width:20%; text-align: center;padding: 15px 0;border-bottom: 1px solid  #f8f9fa;">${cname}</td>
  <td style="width:20%;  text-align: center;padding: 15px 0;border-bottom: 1px solid  #f8f9fa;">${date}</td>
  <td style="width:20%;  text-align: center;padding: 15px 0;border-bottom: 1px solid  #f8f9fa;">
  ${amount} ₹
  </td>
  <td style="width:20%; text-align: center;padding: 15px 0;border-bottom: 1px solid  #f8f9fa;">completed</td>`;
    tbody2.appendChild(newRow2);
  });

  // Initialize the dashboard as the default page
  document.getElementById("dashboard-page").style.display = "block";
  document.getElementById("inventory-page").style.display = "none";
  document.getElementById("invoice-page").style.display = "none";
});
