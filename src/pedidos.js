"use strict";

import { getPedidos, postPedido } from './functions.js';

// Configurar navegación suave
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Funciones para el modal
window.mostrarModal = () => {
    const modal = document.getElementById('confirmacionModal');
    if (modal) {
        modal.classList.remove('hidden');
    } else {
        alert('¡Pedido enviado con éxito!');
    }
};

window.cerrarModal = () => {
    const modal = document.getElementById('confirmacionModal');
    if (modal) {
        modal.classList.add('hidden');
    }
};

/**
 * Renderiza las tarjetas con los pedidos
 * @param {Array} pedidos - Array de pedidos a mostrar
 */
const renderCards = (pedidos) => {
    const container = document.getElementById('pedidosLista');
    if (!container) return;

    container.innerHTML = '';

    if (!pedidos || pedidos.length === 0) {
        container.innerHTML = '<p class="text-center text-gray-500">No hay pedidos para mostrar.</p>';
        return;
    }

    pedidos.forEach(pedido => {
        const card = document.createElement('div');
        card.className = 'bg-white p-6 rounded-lg shadow-md mb-4 transform transition-transform hover:scale-102 hover:shadow-lg';
        card.innerHTML = `
            <div class="text-gray-600">
                <p><span class="font-semibold">Nombre:</span> ${pedido.nombre}</p>
                <p><span class="font-semibold">Email:</span> ${pedido.email}</p>
                <p><span class="font-semibold">Producto:</span> ${pedido.producto}</p>
                <p><span class="font-semibold">Talla:</span> ${pedido.talla}</p>
                <p><span class="font-semibold">Fecha:</span> ${pedido.fecha}</p>
                <p class="text-xs text-gray-400">ID: ${pedido.id}</p>
            </div>
        `;
        container.appendChild(card);
    });
};

/**
 * Carga los pedidos usando fetch GET
 */
const loadData = async () => {
    const container = document.getElementById('pedidosLista');
    if (!container) return;

    try {
        container.innerHTML = '<p class="text-center text-gray-500">Cargando pedidos...</p>';
        const pedidos = await getPedidos();
        console.log('Pedidos cargados:', pedidos);
        renderCards(pedidos);
    } catch (error) {
        console.error('Error al cargar pedidos:', error);
        container.innerHTML = `
            <p class="text-center text-red-500">
                Error al cargar los pedidos. Por favor, intenta más tarde.<br>
                <small class="text-gray-500">${error.message}</small>
            </p>`;
    }
};

/**
 * Maneja el envío del formulario usando fetch POST
 */
const handleFormSubmit = async (event) => {
    event.preventDefault();
    
    const form = event.target;
    const nuevoPedido = {
        nombre: form.nombre.value,
        email: form.email.value,
        producto: form.producto.value,
        talla: form.talla.value
    };

    try {
        const resultado = await postPedido(nuevoPedido);
        console.log('Pedido enviado:', resultado);
        mostrarModal();
        form.reset();
        await loadData();
    } catch (error) {
        console.error('Error al enviar pedido:', error);
        alert('Error al enviar el pedido. Por favor, intenta de nuevo.');
    }
};

// Inicializar la aplicación
(() => {
    console.log('Iniciando aplicación...');
    loadData();
    
    const form = document.getElementById('pedidoForm');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }
})();
