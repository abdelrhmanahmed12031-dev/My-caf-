// 1. كود تشغيل أزرار الزائد والناقص لكل كارت منتج منفصل
const cards = document.querySelectorAll('.photo-card');

cards.forEach(card => {
  const plusBtn = card.querySelector('.plus-btn');
  const minusBtn = card.querySelector('.minus-btn');
  const quantityNum = card.querySelector('.quantity-number');
  const orderBtn = card.querySelector('.order-now'); 
  
  // العداد هنا هيبدأ من 0 زي ما أنت عملته في الـ HTML
  let count = parseInt(quantityNum.innerText) || 0;

  plusBtn.addEventListener('click', () => {
    count++;
    quantityNum.innerText = count;
  });

  minusBtn.addEventListener('click', () => {
    if (count > 0) { // ينقص لحد ما يوصل لـ 0 ومينزلش بالسالب
      count--;
      quantityNum.innerText = count;
    }
  });

  // زرار الطلب المنفرد لكل منتج
  orderBtn.addEventListener('click', () => {
    if (count > 0) {
      const productName = card.querySelector('img').getAttribute('alt');
      const myPhoneNumber = "201288351370"; // اكتب رقمك هنا
      const message = `مرحباً كافيه السعادة، أريد طلب:\n• المنتج: ${productName}\n• العدد: ${count}`;
      const whatsappUrl = `https://wa.me/${myPhoneNumber}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    } else {
      alert('من فضلك حدد الكمية أولاً قبل الضغط على طلب!');
    }
  });
});


// 2. 🔥 كود الزرار الكبير (اطلب الكل) - بيجمع كل الكروت اللي العداد بتاعها أكبر من 0
const orderAllBtn = document.querySelector('.order-all-btn');

orderAllBtn.addEventListener('click', () => {
  const allCards = document.querySelectorAll('.photo-card');
  let finalOrder = "مرحباً كافيه السعادة، أريد طلب الآتي:\n";
  let hasOrders = false;

  allCards.forEach(card => {
    const quantity = parseInt(card.querySelector('.quantity-number').innerText) || 0;
    
    // التعديل بتاعك: لو الكمية أكبر من 0 يضيفها للرسالة المجمعة
    if (quantity > 0) {
      const productName = card.querySelector('img').getAttribute('alt');
      finalOrder += `• ${productName} - العدد: ${quantity}\n`;
      hasOrders = true;
    }
  });

  if (hasOrders) {
    const myPhoneNumber = "201288351370"; // اكتب رقمك هنا
    const whatsappUrl = `https://wa.me/${myPhoneNumber}?text=${encodeURIComponent(finalOrder)}`;
    window.open(whatsappUrl, '_blank');
  } else {
    alert('سلتك فارغة! من فضلك زود كمية المنتجات التي تريدها أولاً 🛒');
  }
});
