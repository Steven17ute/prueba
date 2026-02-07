// 1. DICCIONARIO DE TRADUCCIONES CENTRALIZADO
// Incluye las llaves para Index, Eventos, Contactos, Ubicaciones e Informe
const I18N = {
    esp: {
        nav_home: "Inicio",
        nav_events: "Eventos",
        nav_contacts: "Contactos",
        nav_locations: "Ubicaciones",
        title: "Gestor de Eventos UTE",
        welcome: "Bienvenido al Sistema de Gestión de Eventos",
        subtitle: "Seleccione la operación que desee registrar.",
        report_ask: "¿Deseas ver el informe de hoy?",
        view_report: "Ver Informe",
        report_desc: "Resumen total de registros",
        event_title: "Registro de Eventos",
        contact_title: "Gestión de Contactos",
        loc_title: "Ubicaciones de Eventos",
        report_title: "Informe General de Registros",
        btn_save: "Guardar Registro",
        footer: "2025 Universidad Tecnológica Equinoccial",
        // Alertas
        alert_success: "¡Registro guardado exitosamente!",
        confirm_delete: "¿Estás seguro de eliminar este elemento?"
    },
    eng: {
        nav_home: "Home",
        nav_events: "Events",
        nav_contacts: "Contacts",
        nav_locations: "Locations",
        title: "UTE Event Manager",
        welcome: "Welcome to the Event Management System",
        subtitle: "Select the operation you wish to register.",
        report_ask: "Do you want to see today's report?",
        view_report: "View Report",
        report_desc: "Total record summary",
        event_title: "Event Registration",
        contact_title: "Contact Management",
        loc_title: "Event Locations",
        report_title: "General Records Report",
        btn_save: "Save Record",
        footer: "2025 Equinoctial Technological University",
        // Alerts
        alert_success: "Record saved successfully!",
        confirm_delete: "Are you sure you want to delete this item?"
    }
};

/**
 * 2. FUNCIÓN DE TRADUCCIÓN
 * Cambia el texto de todos los elementos con el atributo 'data-i18n'
 */
function setLanguage(lang) {
    // Guardar la elección en el navegador para que persista al cambiar de página
    localStorage.setItem('lang', lang);
    
    // Cambiar el atributo de idioma en el HTML
    document.documentElement.lang = (lang === 'esp') ? 'es' : 'en';
    
    const texts = I18N[lang];

    // Traducir etiquetas de texto estándar
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (texts[key]) {
            el.textContent = texts[key];
        }
    });

    // Opcional: Traducir placeholders de inputs si existen
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (texts[key]) {
            el.placeholder = texts[key];
        }
    });
    
    console.log("Sistema traducido a:", lang);
}

/**
 * 3. INICIALIZACIÓN AUTOMÁTICA
 * Se ejecuta cada vez que se abre cualquier ventana del sitio
 */
document.addEventListener('DOMContentLoaded', () => {
    // Leer el idioma guardado en la sesión anterior o usar español por defecto
    const savedLang = localStorage.getItem('lang') || 'esp';
    setLanguage(savedLang);

    // Lógica para la tarjeta de Informe (Efecto visual)
    const card = document.getElementById('card-Informe');
    if (card) {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
            card.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.2)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        });
    }
});