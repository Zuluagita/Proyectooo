// ✅ videojuegos.js completo con soporte para edición y eliminación lógica

document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("lista-videojuegos");

  async function cargarVideojuegos() {
    try {
      const res = await fetch("/videojuegos/");
      const lista = await res.json();

      contenedor.innerHTML = "";

      lista.forEach(juego => {
        if (juego.estado === false) return; // No mostrar desactivados

        const tarjeta = document.createElement("div");
        tarjeta.className = "nes-container is-rounded tarjeta";

        tarjeta.innerHTML = `
          <h3 class="title">${juego.titulo}</h3>
          <p><strong>🎮 Género:</strong> ${juego.genero || "N/A"}</p>
          <p><strong>💲 Precio:</strong> $${juego.precio?.toFixed(2) || "0.00"}</p>
          <p><strong>⭐ Calificación:</strong> ${juego.calificacion || "Sin calificar"}</p>
          <p><strong>🏢 Desarrollador:</strong> ${juego.desarrollador?.nombre || "No asignado"}</p>
          <div style="margin-top: 1rem;">
            <a href="/registrar?id=${juego.id}" class="nes-btn is-warning">✏️ Editar</a>
            <button class="nes-btn is-error" onclick="eliminarVideojuego(${juego.id})">🗑️ Eliminar</button>
          </div>
        `;

        contenedor.appendChild(tarjeta);
      });
    } catch (err) {
      contenedor.innerHTML = `<p class='nes-text is-error'>Error al cargar videojuegos</p>`;
    }
  }

  cargarVideojuegos();

  window.eliminarVideojuego = async function (id) {
    if (!confirm("¿Estás seguro de que deseas desactivar este videojuego?")) return;
    try {
      const res = await fetch(`/videojuegos/${id}/desactivar`, { method: "PATCH" });
      if (!res.ok) throw new Error("No se pudo desactivar");
      alert("✅ Videojuego desactivado correctamente");
      cargarVideojuegos();
    } catch (err) {
      alert("❌ Error: " + err.message);
    }
  }
});
