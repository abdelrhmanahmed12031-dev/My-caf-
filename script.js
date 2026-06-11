const cards = document.querySelectorAll('.photo-card');
const myPhoneNumber = "201288351370"; // 👈 حط رقمك هنا بالصيغة الدولية

function getSelectedOptions(card) {
  let details = "";
  const radioChecked = card.querySelector('input[type="radio"]:checked');
  if (radioChecked) {
    details += ` (${radioChecked.value})`;
  }
  const checkboxChecked = card.querySelector('input[type="checkbox"]:checked');
  if (checkboxChecked) {
    details += ` + ${checkboxChecked.value}`;
  }
  return details;
}

cards.forEach(card => {
  const plusBtn = card.querySelector('.plus-btn');
  const minusBtn = card.querySelector('.minus-btn');
  const quantityNum = card.querySelector('.quantity-number');
  const orderBtn = card.querySelector('.order-now'); 
  
  let count = parseInt(quantityNum.innerText) || 0;

  plusBtn.addEventListener('click', () => {
    count++;
    quantityNum.innerText = count;
  });

  minusBtn.addEventListener('click', () => {
    if (count > 0) {
      count--;
      quantityNum.innerText = count;
    }
  });

  orderBtn.addEventListener('click', () => {
    if (count > 0) {
      const productName = card.querySelector('img').getAttribute('alt');
      const options = getSelectedOptions(card);
      const message = `مرحباً كافيه السعادة، أريد طلب:\n• المنتج: ${productName}${options}\n• العدد: ${count}`;
      const whatsappUrl = `https://wa.me/${myPhoneNumber}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    } else {
      alert('من فضلك حدد الكمية أولاً قبل الضغط على طلب!');
    }
  });
});

const orderAllBtn = document.querySelector('.order-all-btn');
if(orderAllBtn) {
  orderAllBtn.addEventListener('click', () => {
    const allCards = document.querySelectorAll('.photo-card');
    let finalOrder = "مرحباً كافيه السعادة، أريد طلب الآتي:\n";
    let hasOrders = false;

    allCards.forEach(card => {
      const quantity = parseInt(card.querySelector('.quantity-number').innerText) || 0;
      if (quantity > 0) {
        const productName = card.querySelector('img').getAttribute('alt');
        const options = getSelectedOptions(card);
        finalOrder += `• ${productName}${options} - العدد: ${quantity}\n`;
        hasOrders = true;
      }
    });

    if (hasOrders) {
      const whatsappUrl = `https://wa.me/${myPhoneNumber}?text=${encodeURIComponent(finalOrder)}`;
      window.open(whatsappUrl, '_blank');
    } else {
      alert('سلتك فارغة! من فضلك زود كمية المنتجات التي تريدها أولاً 🛒');
    }
  });
}
