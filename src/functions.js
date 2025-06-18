"use strict";

const API_URL = 'https://685285cb0594059b23cdea1c.mockapi.io/ordenes';

/**
 * Realiza una petición HTTP GET para obtener datos
 * @returns {Promise<Array>} Array de pedidos
 */
export const getPedidos = async () => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('Error en la petición GET');
        }
        
        const data = await response.json();
        
        // Asegurarnos de que tenemos un array
        if (!Array.isArray(data)) {
            return [];
        }

        // Transformar y validar los datos
        return data.map(item => ({
            id: item.id,
            nombre: item.nombre || 'Sin nombre',
            email: item.email || 'Sin email',
            producto: item.producto || 'Sin producto',
            talla: item.talla || 'Sin talla',
            fecha: item.fecha || new Date().toLocaleDateString()
        }));
    } catch (error) {
        console.error('Error en GET:', error);
        return [];
    }
};

/**
 * Realiza una petición HTTP POST para enviar datos
 * @param {Object} pedido - Datos del pedido a enviar
 * @returns {Promise<Object>} Respuesta del servidor
 */
export const postPedido = async (pedido) => {
    try {
        const nuevoPedido = {
            nombre: pedido.nombre,
            email: pedido.email,
            producto: pedido.producto,
            talla: pedido.talla,
            fecha: new Date().toLocaleDateString()
        };

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(nuevoPedido)
        });

        if (!response.ok) {
            throw new Error('Error en la petición POST');
        }

        const data = await response.json();
        console.log('Pedido creado:', data);
        return data;
    } catch (error) {
        console.error('Error en POST:', error);
        throw error;
    }
};
