document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("contenedor-desarrolladores");
  const form = document.getElementById("form-desarrollador");
  const btnSubmit = form.querySelector("button[type='submit']");

  async function cargarDesarrolladores() {
    try {
      const res = await fetch("/desarrolladores/");
      const lista = await res.json();

      contenedor.innerHTML = "";

      lista.forEach(dev => {
        if (dev.estado === false) return;

        const tarjeta = document.createElement("div");
        tarjeta.className = "nes-container is-rounded tarjeta";

        tarjeta.innerHTML = `
          <h3 class="title">🏢 ${dev.nombre}</h3>
          <p><strong>🌎 País:</strong> ${dev.pais || "N/A"}</p>
          <p><strong>🎯 Tipo:</strong> ${dev.tipo || "Sin tipo"}</p>
          <p><strong>📅 Fundación:</strong> ${dev.fundacion || "Desconocido"}</p>
          <div style="margin-top: 1rem;">
            <button type="button" class="nes-btn is-warning" onclick='editarDesarrollador(${JSON.stringify(dev)})'>✏️ Editar</button>
            <button type="button" class="nes-btn is-error" onclick="eliminarDesarrollador(${dev.id})">🗑️ Eliminar</button>
          </div>
        `;

        contenedor.appendChild(tarjeta);
      });
    } catch (err) {
      contenedor.innerHTML = `<p class='nes-text is-error'>Error al cargar desarrolladores</p>`;
    }
  }

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const id = document.getElementById("desarrollador_id").value;
    const nombre = document.getElementById("nombre").value;
    const tipo = document.getElementById("tipo").value;
    const pais = document.getElementById("pais").value;
    const fundacion = parseInt(document.getElementById("fundacion").value) || null;

    const datos = { nombre, tipo, pais, fundacion };

    try {
      let url = "/desarrolladores/";
      let metodo = "POST";

      if (id) {
        url += id;
        metodo = "PUT";
      }

      const res = await fetch(url, {
        method: metodo,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos)
      });

      if (!res.ok) throw new Error("Error al guardar el desarrollador");

      alert("✅ Desarrollador guardado correctamente");
      form.reset();
      document.getElementById("desarrollador_id").value = "";
      btnSubmit.textContent = "Registrar Desarrollador";
      cargarDesarrolladores();
    } catch (err) {
      alert("❌ Error: " + err.message);
    }
  });

  window.editarDesarrollador = function (dev) {
    document.getElementById("desarrollador_id").value = dev.id;
    document.getElementById("nombre").value = dev.nombre;
    document.getElementById("tipo").value = dev.tipo;
    document.getElementById("pais").value = dev.pais || "";
    document.getElementById("fundacion").value = dev.fundacion || "";
    btnSubmit.textContent = "Actualizar Desarrollador";
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  window.eliminarDesarrollador = async function (id) {
    if (!confirm("¿Deseas desactivar este desarrollador?")) return;
    try {
      const res = await fetch(`/desarrolladores/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("No se pudo desactivar");
      alert("✅ Desarrollador desactivado correctamente");
      cargarDesarrolladores();
    } catch (err) {
      alert("❌ Error: " + err.message);
    }
  };

  cargarDesarrolladores();
});
