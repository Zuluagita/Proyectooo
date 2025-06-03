document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-busqueda");
  const resultados = document.getElementById("resultados");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    resultados.innerHTML = `<p class="nes-text is-primary">🔄 Buscando...</p>`;

    const titulo = document.getElementById("titulo").value.trim();
    const genero = document.getElementById("genero").value.trim();

    const params = new URLSearchParams();
    if (titulo) params.append("titulo", titulo);
    if (genero) params.append("genero", genero);

    try {
      const res = await fetch(`/videojuegos/?${params.toString()}`);
      if (!res.ok) throw new Error("Error en la búsqueda");

      const juegos = await res.json();
      if (juegos.length === 0) {
        resultados.innerHTML = `<p class="nes-text is-warning">No se encontraron videojuegos.</p>`;
        return;
      }

      resultados.innerHTML = "";
      juegos.forEach(juego => {
        const tarjeta = document.createElement("div");
        tarjeta.className = "nes-container is-rounded tarjeta";

        tarjeta.innerHTML = `
          <h3 class="title">${juego.titulo}</h3>
          <p><strong>🎮 Género:</strong> ${juego.genero || "N/A"}</p>
          <p><strong>💲 Precio:</strong> $${juego.precio?.toFixed(2) || "0.00"}</p>
          <p><strong>⭐ Calificación:</strong> ${juego.calificacion || "Sin calificar"}</p>
          <p><strong>🏢 Desarrollador:</strong> ${juego.desarrollador?.nombre || "No asignado"}</p>
        `;

        resultados.appendChild(tarjeta);
      });
    } catch (error) {
      resultados.innerHTML = `<p class="nes-text is-error">❌ Error al buscar: ${error.message}</p>`;
    }
  });
});
