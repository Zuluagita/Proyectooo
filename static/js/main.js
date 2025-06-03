document.addEventListener("DOMContentLoaded", () => {
  const formulario = document.getElementById("form-videojuego-form");
  const contenedor = document.getElementById("videojuegos-contenedor");

  // Función para mostrar todos los videojuegos
  async function cargarVideojuegos() {
    contenedor.innerHTML = ""; // Limpiar antes de cargar
    try {
      const response = await fetch("/videojuegos/");
      const juegos = await response.json();

      if (juegos.length === 0) {
        contenedor.innerHTML = "<p class='nes-text is-warning'>No hay videojuegos registrados aún.</p>";
        return;
      }

      juegos.forEach(juego => {
        const card = document.createElement("div");
        card.classList.add("nes-container", "is-rounded", "with-title", "is-dark");
        card.style.marginBottom = "1rem";
        card.innerHTML = `
          <p class="title">${juego.titulo}</p>
          <p><strong>Género:</strong> ${juego.genero || "N/A"}</p>
          <p><strong>Precio:</strong> $${juego.precio?.toFixed(2) || "0.00"}</p>
          <p><strong>Calificación:</strong> ${juego.calificacion || "Sin calificar"}</p>
          <p><strong>Desarrollador ID:</strong> ${juego.desarrollador_id || "No asignado"}</p>
          <button class="nes-btn is-error" data-id="${juego.id}">Eliminar</button>
        `;
        contenedor.appendChild(card);

        // Añadir evento al botón de eliminar
        card.querySelector("button").addEventListener("click", async () => {
          if (confirm(`¿Eliminar "${juego.titulo}"?`)) {
            await fetch(`/videojuegos/${juego.id}`, { method: "DELETE" });
            cargarVideojuegos(); // Recargar lista
          }
        });
      });
    } catch (error) {
      contenedor.innerHTML = `<p class="nes-text is-error">Error al cargar videojuegos.</p>`;
    }
  }

  // Envío del formulario
  formulario.addEventListener("submit", async (e) => {
    e.preventDefault();

    const datos = {
      titulo: document.getElementById("titulo").value,
      genero: document.getElementById("genero").value,
      precio: parseFloat(document.getElementById("precio").value),
      calificacion: parseFloat(document.getElementById("calificacion").value),
      desarrollador_id: parseInt(document.getElementById("desarrollador_id").value),
    };

    try {
      const response = await fetch("/videojuegos/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || "Error al guardar el videojuego.");
      }

      alert("✅ Videojuego registrado correctamente.");
      formulario.reset();
      cargarVideojuegos();
    } catch (error) {
      alert("❌ Error: " + error.message);
    }
  });

  // Cargar videojuegos al iniciar
  cargarVideojuegos();
});
