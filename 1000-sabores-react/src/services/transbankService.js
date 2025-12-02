// transbankService.js - Servicio para integración con Transbank
import api from './api';

const TRANSBANK_API = 'http://localhost:8080/api/payments/transbank';

/**
 * Inicia una transacción de pago con Transbank
 * @param {number} amount - Monto a pagar
 * @param {string} sessionId - ID único de la sesión
 * @returns {Promise} Token y URL de Transbank
 */
export const initiateTransbankPayment = async (amount, sessionId) => {
  try {
    const response = await api.post(`${TRANSBANK_API}/initiate`, {
      amount: amount,
      sessionId: sessionId,
      returnUrl: `${window.location.origin}/payment-result`
    });

    return {
      success: true,
      token: response.data.token,
      url: response.data.url,
      sessionId: response.data.sessionId
    };
  } catch (error) {
    console.error('Error al iniciar pago:', error);
    return {
      success: false,
      error: error.response?.data?.message || 'Error al iniciar el pago'
    };
  }
};

/**
 * Redirige al usuario a Transbank para completar el pago
 * @param {string} url - URL de redirección de Transbank
 * @param {string} token - Token de la transacción
 */
export const redirectToTransbank = (url, token) => {
  const transbankUrl = `${url}?token_ws=${token}`;
  window.location.href = transbankUrl;
};

/**
 * Confirma la transacción después de que Transbank redirige
 * @param {string} token - Token devuelto por Transbank
 * @returns {Promise} Resultado de la confirmación
 */
export const confirmTransbankPayment = async (token) => {
  try {
    const response = await api.post(`${TRANSBANK_API}/confirm`, {
      token: token
    });

    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error('Error al confirmar pago:', error);
    return {
      success: false,
      error: error.response?.data?.message || 'Error al confirmar el pago'
    };
  }
};

/**
 * Obtiene el estado de una transacción
 * @param {string} token - Token de la transacción
 * @returns {Promise} Estado de la transacción
 */
export const getTransactionStatus = async (token) => {
  try {
    const response = await api.get(`${TRANSBANK_API}/status/${token}`);
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error('Error al obtener estado:', error);
    return {
      success: false,
      error: error.response?.data?.message || 'Error al obtener estado'
    };
  }
};

/**
 * Revertir una transacción
 * @param {string} token - Token de la transacción
 * @param {number} amount - Monto a revertir
 * @returns {Promise} Resultado de la reversión
 */
export const refundTransbankPayment = async (token, amount) => {
  try {
    const response = await api.post(`${TRANSBANK_API}/refund`, {
      token: token,
      amount: amount
    });

    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error('Error al revertir pago:', error);
    return {
      success: false,
      error: error.response?.data?.message || 'Error al revertir el pago'
    };
  }
};

export default {
  initiateTransbankPayment,
  redirectToTransbank,
  confirmTransbankPayment,
  getTransactionStatus,
  refundTransbankPayment
};
