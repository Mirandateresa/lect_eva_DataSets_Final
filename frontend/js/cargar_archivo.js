window.addEventListener("DOMContentLoaded", () => {
    // ================================
    // ELEMENTOS DEL DOM
    // ================================
    const input = document.getElementById("DataSetInput");
    const status = document.getElementById("uploadStatus");
    const indicator = document.getElementById("datasetIndicator");
    const resetBtn = document.getElementById("resetDataset");

    // Usar API_BASE_URL de config.js o default
    const API_BASE_URL = window.API_BASE_URL || "http://localhost:8000";
    console.log("Usando API URL:", API_BASE_URL);

    // ================================
    // ACTUALIZAR UI
    // ================================
    function actualizarEstadoUI() {
        const datasetId = sessionStorage.getItem("dataset_id");
        console.log("Dataset en sessionStorage:", datasetId);

        if (datasetId) {
            status.textContent = "Dataset cargado y listo para procesar";
            indicator?.classList.remove("hidden");
            resetBtn?.classList.remove("hidden");

            document.querySelectorAll(".menu-btn").forEach(btn => {
                btn.classList.remove("disabled");
            });

        } else {
            status.textContent = "Ningún archivo cargado";
            indicator?.classList.add("hidden");
            resetBtn?.classList.add("hidden");

            document.querySelectorAll(".menu-btn").forEach(btn => {
                btn.classList.add("disabled");
            });
        }
    }

    // ================================
    // SUBIR DATASET CON FALLBACK A SIMULACIÓN
    // ================================
    input?.addEventListener("change", async () => {
        const file = input.files[0];
        if (!file) return;

        status.textContent = "Subiendo archivo...";
        indicator?.classList.add("hidden");
        resetBtn?.classList.add("hidden");

        // Primero intentar con el backend real
        try {
            console.log("Intentando subir a:", API_BASE_URL);
            
            // Probar si el backend está disponible
            const testResponse = await fetch(API_BASE_URL, { 
                method: 'HEAD',
                mode: 'cors',
                cache: 'no-cache'
            }).catch(e => {
                console.log("Backend no disponible, usando simulación");
                throw new Error("Backend offline");
            });
            
            // Si llegamos aquí, backend está disponible
            const formData = new FormData();
            formData.append("file", file);

            const response = await fetch(`${API_BASE_URL}/apis/upload_dataset/`, {
                method: "POST",
                body: formData
            });

            if (!response.ok) throw new Error(`HTTP ${response.status}`);

            const data = await response.json();
            sessionStorage.setItem("dataset_id", data.dataset_id);
            status.textContent = "✅ Dataset subido al servidor";
            
        } catch (err) {
            // FALLBACK: Modo simulación
            console.log("Usando modo simulación:", err.message);
            
            // Simular procesamiento
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Crear ID simulado
            const simulatedId = "simulated_" + Date.now() + "_" + 
                              file.name.replace(/[^a-zA-Z0-9]/g, '_');
            sessionStorage.setItem("dataset_id", simulatedId);
            sessionStorage.setItem("dataset_name", file.name);
            sessionStorage.setItem("dataset_size", file.size);
            
            status.textContent = "✅ Dataset en modo simulación: " + file.name;
            
            alert("⚠️  Backend no disponible.\nUsando MODO SIMULACIÓN.\nArchivo: " + file.name);
        }

        actualizarEstadoUI();
        input.value = "";
    });

    // ================================
    // RESET DATASET
    // ================================
    resetBtn?.addEventListener("click", () => {
        sessionStorage.removeItem("dataset_id");
        sessionStorage.removeItem("dataset_name");
        sessionStorage.removeItem("dataset_size");
        status.textContent = "Dataset eliminado. Puedes subir otro.";
        actualizarEstadoUI();
    });

    // ================================
    // PROTECCIÓN DE BOTONES
    // ================================
    document.querySelectorAll('[data-requiere-dataset]').forEach(btn => {
        btn.addEventListener("click", e => {
            const datasetId = sessionStorage.getItem("dataset_id");

            if (!datasetId) {
                e.preventDefault();
                alert("Primero debes cargar un dataset.");
            }
        });
    });

    // ================================
    // ESTADO INICIAL
    // ================================
    actualizarEstadoUI();
});
