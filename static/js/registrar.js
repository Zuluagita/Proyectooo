document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-videojuego");
  const selectDesarrollador = document.getElementById("desarrollador_id");

  // Cargar lista de desarrolladores
  async function cargarDesarrolladores() {
    try {
      const res = await fetch("/desarrolladores/");
      const lista = await res.json();

      selectDesarrollador.innerHTML = `<option value="">Selecciona uno</option>`;
      lista.forEach(dev => {
        const option = document.createElement("option");
        option.value = dev.id;
        option.textContent = dev.nombre;
        selectDesarrollador.appendChild(option);
      });
    } catch (err) {
      selectDesarrollador.innerHTML = `<option value="">Error al cargar</option>`;
    }
  }

  // Enviar formulario
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const datos = {
      titulo: document.getElementById("titulo").value,
      genero: document.getElementById("genero").value,
      precio: parseFloat(document.getElementById("precio").value),
      calificacion: parseFloat(document.getElementById("calificacion").value),
      desarrollador_id: parseInt(selectDesarrollador.value),
    };

    try {
      const res = await fetch("/videojuegos/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos)
      });

      if (!res.ok) throw new Error("No se pudo guardar");

      alert("🎉 Videojuego registrado con éxito");
      form.reset();
    } catch (err) {
      alert("❌ Error al registrar el videojuego");
    }
  });

  cargarDesarrolladores();
});
