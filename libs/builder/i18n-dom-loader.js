/**
 * Script para traducir elementos del DOM (HTML) usando los atributos data-i18n-*.
 * Espera a que i18n.js esté listo antes de inicializarse.
 */
(function() {
    'use strict';

    let i18nIsReady = (typeof window.i18n === 'function');
    let domIsReady = false;
    let translationDone = false; // Bandera para evitar doble ejecución

    // Lógica principal de traducción (la misma que ya tenías)
    const translateDom = function() {
        if (translationDone) return; 

        const elements = document.querySelectorAll('[data-i18n-title], [data-i18n-placeholder], [data-i18n-text], [data-i18n-aria-label], [data-i18n-label]');
        
        elements.forEach(el => {
            // Traducir el atributo title
            if (el.dataset.i18nTitle) {
                el.title = i18n(el.dataset.i18nTitle);
            }

            // Traducir el atributo placeholder
            if (el.dataset.i18nPlaceholder) {
                el.placeholder = i18n(el.dataset.i18nPlaceholder);
            }

            // Traducir el contenido de texto (innerText)
            if (el.dataset.i18nText) {
                const key = el.dataset.i18nText;
                let text = i18n(key);
                
                // Si el elemento contiene un icono, preservar la estructura
                const icon = el.querySelector('[class^="la-"]'); 
                if (icon) {
                    el.innerHTML = text + ' ' + icon.outerHTML;
                } else {
                    el.textContent = text;
                }
            }
            
            // Traducir el atributo aria-label
            if (el.dataset.i18nAriaLabel) {
                el.setAttribute('aria-label', i18n(el.dataset.i18nAriaLabel));
            }
            
            // Traducir el atributo label (usado en optgroup)
            if (el.dataset.i18nLabel) {
                el.label = i18n(el.dataset.i18nLabel);
            }
        });
    };

    function validateSession(){
        if(sessionStorage.getItem('vvveb_language')){
            translateDom();
            clearInterval(intervalId);
        }
    }

    const intervalId = setInterval(validateSession, 10);
})();