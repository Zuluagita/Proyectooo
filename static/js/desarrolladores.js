document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("contenedor-desarrolladores");

  async function cargarDesarrolladores() {
    try {
      const res = await fetch("/desarrolladores/");
      const lista = await res.json();

      contenedor.innerHTML = "";

      lista.forEach(dev => {
        if (!dev.estado) return; // No mostrar si está desactivado

        const tarjeta = document.createElement("div");
        tarjeta.className = "nes-container is-rounded tarjeta";

        tarjeta.innerHTML = `
          <h3 class="title">${dev.nombre}</h3>
          <p><strong>🌍 País:</strong> ${dev.pais || "No registrado"}</p>
          <p><strong>🏷️ Categoría:</strong> ${dev.categoria || "N/A"}</p>
          <div style="margin-top: 1rem;">
            <a href="/registrar-desarrollador?id=${dev.id}" class="nes-btn is-warning">✏️ Editar</a>
            <button class="nes-btn is-error" onclick="eliminarDesarrollador(${dev.id})">🗑️ Eliminar</button>
          </div>
        `;

        contenedor.appendChild(tarjeta);
      });
    } catch (err) {
      contenedor.innerHTML = `<p class='nes-text is-error'>Error al cargar desarrolladores</p>`;
    }
  }

  cargarDesarrolladores();

  window.eliminarDesarrollador = async function (id) {
    if (!confirm("¿Estás seguro de que deseas desactivar este desarrollador?")) return;
    try {
      const res = await fetch(`/desarrolladores/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("No se pudo desactivar");
      alert("✅ Desarrollador desactivado correctamente");
      cargarDesarrolladores();
    } catch (err) {
      alert("❌ Error: " + err.message);
    }
  }
});
