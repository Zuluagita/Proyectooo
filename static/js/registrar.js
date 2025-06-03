document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-videojuego");
  const selectDesarrollador = document.getElementById("desarrollador_id");
  const idField = document.getElementById("videojuego_id");

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

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const datos = {
      titulo: document.getElementById("titulo").value,
      genero: document.getElementById("genero").value,
      precio: parseFloat(document.getElementById("precio").value),
      calificacion: parseFloat(document.getElementById("calificacion").value),
      desarrollador_id: parseInt(selectDesarrollador.value)
    };

    const id = idField.value;
    const url = id ? `/videojuegos/${id}` : "/videojuegos/";
    const method = id ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos)
      });

      if (!res.ok) throw new Error("Error al guardar");

      alert(`✅ Videojuego ${id ? "actualizado" : "registrado"} correctamente`);
      form.reset();
      idField.value = "";
      form.querySelector("button").textContent = "Guardar";
    } catch (err) {
      alert("❌ Error: " + err.message);
    }
  });

  // Modo edición
  const params = new URLSearchParams(window.location.search);
  const editId = params.get("id");
  if (editId) {
    fetch(`/videojuegos/${editId}`)
      .then(res => res.json())
      .then(juego => {
        document.getElementById("titulo").value = juego.titulo;
        document.getElementById("genero").value = juego.genero || "";
        document.getElementById("precio").value = juego.precio || "";
        document.getElementById("calificacion").value = juego.calificacion || "";
        selectDesarrollador.value = juego.desarrollador_id || "";
        idField.value = juego.id;
        form.querySelector("button").textContent = "Actualizar";
      });
  }

  cargarDesarrolladores();
});
