document.getElementById("contact-form").addEventListener("submit", function(e) {
  e.preventDefault();
  
  const ratingValue = this.rating.value;
  const alertBox = document.getElementById("contact-alert");
  
  alertBox.textContent = `¡Gracias por tu mensaje y tu calificación de ${ratingValue} estrella(s)! (Simulación).`;
  alertBox.className = "alert success";
  
  this.reset();
});