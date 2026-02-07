// 1. DICCIONARIO DE TRADUCCIONES (Centralizado y versátil)
const I18N = {
    esp: {
        nav_home: "Inicio",
        nav_events: "Eventos",
        nav_contacts: "Contactos",
        nav_locations: "Ubicaciones",
        alert_success: "¡Registro guardado exitosamente!",
        alert_delete: "Elemento eliminado exitosamente",
        alert_error_email: "Por favor ingresa un correo electrónico válido",
        alert_error_phone: "El teléfono debe tener 10 dígitos",
        alert_clear_all: "Todos los datos han sido eliminados",
        list_empty: "No hay registros aún. ¡Agrega el primero!",
        confirm_delete: "¿Estás seguro de eliminar este elemento?",
        confirm_clear: "¿Estás seguro de eliminar TODOS los datos?",
        btn_delete: "Eliminar"
    },
    eng: {
        nav_home: "Home",
        nav_events: "Events",
        nav_contacts: "Contacts",
        nav_locations: "Locations",
        alert_success: "Record saved successfully!",
        alert_delete: "Item deleted successfully",
        alert_error_email: "Please enter a valid email address",
        alert_error_phone: "The phone must have 10 digits",
        alert_clear_all: "All data has been deleted",
        list_empty: "No records yet. Add the first one!",
        confirm_delete: "Are you sure you want to delete this item?",
        confirm_clear: "Are you sure you want to delete ALL data?",
        btn_delete: "Delete"
    }
};

// 2. CONFIGURACIÓN Y LLAVES
const STORAGE_KEYS = {
    eventos: 'eventos',
    contactos: 'contactos',
    ubicaciones: 'ubicaciones'
};

// 3. FUNCIONES DE IDIOMA
function setLanguage(lang) {
    localStorage.setItem('lang', lang);
    document.documentElement.lang = (lang === 'esp') ? 'es' : 'en';
    
    const texts = I18N[lang];

    // Traducir elementos con data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (texts[key]) el.textContent = texts[key];
    });

    // Re-renderizar listas para actualizar mensajes de "lista vacía" y botones
    Object.keys(STORAGE_KEYS).forEach(type => updateAllViews(type));
}

// 4. FUNCIONES DE GESTIÓN DE DATOS (LocalStorage)
const saveData = (key, data) => localStorage.setItem(key, JSON.stringify(data));
const loadData = (key) => JSON.parse(localStorage.getItem(key)) || [];

// 5. ALERTAS PERSONALIZADAS
function showAlert(messageKey, type = 'info') {
    const lang = localStorage.getItem('lang') || 'esp';
    const message = I18N[lang][messageKey] || messageKey;

    const alertDiv = document.createElement('div');
    alertDiv.className = `custom-alert alert-${type}`;
    alertDiv.textContent = message;
    alertDiv.style.cssText = `
        position: fixed; top: 80px; right: 20px; padding: 1rem 1.5rem;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white; border-radius: 0.5rem; box-shadow: 0 10px 15px rgba(0,0,0,0.1);
        z-index: 9999; animation: slideIn 0.3s ease-out; font-weight: 600;
    `;
    
    document.body.appendChild(alertDiv);
    setTimeout(() => {
        alertDiv.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => alertDiv.remove(), 300);
    }, 3000);
}

// 6. RENDERIZADO DE INTERFAZ
function renderList(containerId, data, type) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const lang = localStorage.getItem('lang') || 'esp';
    container.innerHTML = '';
    
    if (data.length === 0) {
        const li = document.createElement('li');
        li.textContent = I18N[lang].list_empty;
        li.style.cssText = 'text-align: center; color: #64748b; font-style: italic;';
        container.appendChild(li);
        return;
    }
    
    data.forEach((item, index) => {
        const li = document.createElement('li');
        li.style.display = 'flex';
        li.style.justifyContent = 'space-between';
        li.style.alignItems = 'center';
        li.style.marginBottom = '0.5rem';

        let content = (type === 'eventos') ? `<strong>${item.titulo}</strong> - ${item.fecha_hora}` :
                      (type === 'contactos') ? `<strong>${item.nombre}</strong> - ${item.email}` :
                      `<strong>${item.titulo}</strong> - ${item.direccion}`;
        
        li.innerHTML = `<div>${content}</div>
                        <button class="delete-btn" onclick="deleteItem('${type}', ${index})" 
                        style="background:#fee2e2; color:#ef4444; border:none; padding:4px 8px; border-radius:4px; cursor:pointer;">
                        ${I18N[lang].btn_delete}</button>`;
        container.appendChild(li);
    });
}

function updateAllViews(type) {
    const data = loadData(STORAGE_KEYS[type]);
    const containerId = `${type}-registrados`;
    renderList(containerId, data, type);
    
    // Si existe tabla (en ver_datos.html)
    const tableBody = document.querySelector(`#tabla-${type} tbody`);
    if (tableBody) {
        tableBody.innerHTML = data.map((item, i) => `
            <tr>
                <td>${item.titulo || item.nombre || '-'}</td>
                <td>${item.fecha_hora || item.email || item.direccion || '-'}</td>
                <td><button onclick="deleteItem('${type}', ${i})">${I18N[localStorage.getItem('lang') || 'esp'].btn_delete}</button></td>
            </tr>
        `).join('') || `<tr><td colspan="3" style="text-align:center">${I18N[localStorage.getItem('lang') || 'esp'].list_empty}</td></tr>`;
    }
}

// 7. ACCIONES
function deleteItem(type, index) {
    const lang = localStorage.getItem('lang') || 'esp';
    if (confirm(I18N[lang].confirm_delete)) {
        const data = loadData(STORAGE_KEYS[type]);
        data.splice(index, 1);
        saveData(STORAGE_KEYS[type], data);
        showAlert('alert_delete', 'success');
        updateAllViews(type);
    }
}

function clearAllData() {
    const lang = localStorage.getItem('lang') || 'esp';
    if (confirm(I18N[lang].confirm_clear)) {
        localStorage.clear();
        location.reload();
    }
}

// 8. INICIALIZACIÓN
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('lang') || 'esp';
    setLanguage(savedLang);

    // Manejo de formularios automático
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            const entry = Object.fromEntries(formData.entries());
            
            // Determinar tipo por campos
            let type = formData.has('email') ? 'contactos' : formData.has('coordenadas') ? 'ubicaciones' : 'eventos';
            
            // Validaciones básicas
            if (type === 'contactos' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(entry.email)) {
                return showAlert('alert_error_email', 'error');
            }

            const data = loadData(STORAGE_KEYS[type]);
            data.push(entry);
            saveData(STORAGE_KEYS[type], data);
            
            showAlert('alert_success', 'success');
            form.reset();
            updateAllViews(type);
        });
    }
});