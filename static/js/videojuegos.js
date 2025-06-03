document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("lista-videojuegos");

  async function cargarVideojuegos() {
    contenedor.innerHTML = `
      <p class="nes-text is-primary">Cargando videojuegos...</p>
    `;

    try {
      const response = await fetch("/videojuegos/");
      if (!response.ok) throw new Error("No se pudo cargar la lista.");

      const juegos = await response.json();

      if (juegos.length === 0) {
        contenedor.innerHTML = `
          <p class="nes-text is-warning">Aún no hay videojuegos registrados.</p>
        `;
        return;
      }

      contenedor.innerHTML = "";

      juegos.forEach(juego => {
        const tarjeta = document.createElement("div");
        tarjeta.className = "nes-container is-rounded tarjeta";

        tarjeta.innerHTML = `
          <h3 class="title">${juego.titulo}</h3>
          <p><strong>🎮 Género:</strong> ${juego.genero || "N/A"}</p>
          <p><strong>💲 Precio:</strong> $${juego.precio?.toFixed(2) || "0.00"}</p>
          <p><strong>⭐ Calificación:</strong> ${juego.calificacion || "Sin calificar"}</p>
          <p><strong>🏢 Desarrollador:</strong> ${juego.desarrollador?.nombre || "No asignado"}</p>
>
        `;

        contenedor.appendChild(tarjeta);
      });
    } catch (error) {
      contenedor.innerHTML = `
        <p class="nes-text is-error">❌ Error al cargar videojuegos: ${error.message}</p>
      `;
    }
  }

  cargarVideojuegos();
});
