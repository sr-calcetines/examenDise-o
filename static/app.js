document.addEventListener("DOMContentLoaded", function () {
    const paradasList = document.getElementById("jsonParadas");

    axios.get("static/datos.json")
        .then(response => {
            const taxi = response.data.features;

            const map = L.map("map").setView([36.7212, -4.4218], 13);

            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                attribution: '© OpenStreetMap contributors'
            }).addTo(map);

            taxi.forEach(parada => {
                const coordenadas = parada.geometry.coordinates;
                const nombre = parada.properties.NOMBRE;
                const direccion = parada.properties.DIRECCION;

                const marker = L.marker([coordenadas[1], coordenadas[0]]);
                marker.bindPopup(`<b>${nombre}</b><br>${direccion}`).addTo(map);

                const listItem = document.createElement("li");
                listItem.innerHTML = `<hr><strong>${nombre}</strong><br><br>${direccion}`;
                listItem.addEventListener("mouseover", function () {
                    marker.openPopup();
                    map.setView([coordenadas[1], coordenadas[0]], 16);
                });
                listItem.addEventListener("mouseout", function () {
                    marker.closePopup();
                });
                paradasList.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error("Error cargando los datos:", error);
        });
});

function openPopup(){
    modal.style.display = "block"
}

function closePopup(){
    modal.style.display = "none"
}