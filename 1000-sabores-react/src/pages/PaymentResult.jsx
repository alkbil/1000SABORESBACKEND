// PaymentResult.jsx - Página para confirmar el resultado del pago de Transbank
import React, { useEffect, useState } from 'react';
import { useSearchParams, Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { confirmTransbankPayment } from '../services/transbankService';
import { useCart } from '../contexts/CartContext';
import '../styles/carrito.css';

const PaymentResult = () => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const { vaciarCarrito } = useCart();

  useEffect(() => {
    const token = searchParams.get('token_ws');
    
    if (!token) {
      Swal.fire({
        title: 'Error',
        text: 'Token de pago no encontrado',
        icon: 'error',
        confirmButtonColor: '#d2691e'
      }).then(() => {
        window.location.href = '/carrito';
      });
      return;
    }

    confirmarPago(token);
  }, [searchParams, vaciarCarrito]);

  const confirmarPago = async (token) => {
    try {
      const result = await confirmTransbankPayment(token);

      if (result.success) {
        setPaymentConfirmed(true);
        
        // Limpiar sesión
        sessionStorage.removeItem('transbankSession');
        
        Swal.fire({
          title: '✅ ¡Pago Exitoso!',
          html: `Tu pago ha sido procesado correctamente.<br>
                 Recibirás un correo con los detalles de tu compra.<br>
                 <strong>Número de orden: #${result.data.orderId || Math.floor(100000 + Math.random() * 900000)}</strong><br><br>
                 <small style="color: #666;">Monto: $${result.data.amount || 'N/A'}</small>`,
          icon: 'success',
          confirmButtonColor: '#d2691e',
          confirmButtonText: 'Ir al Inicio'
        }).then(() => {
          vaciarCarrito();
          window.location.href = '/';
        });
      } else {
        Swal.fire({
          title: '⚠️ Pago Pendiente',
          text: result.error || 'El pago está siendo procesado. Por favor verifica tu estado de cuenta.',
          icon: 'warning',
          confirmButtonColor: '#d2691e',
          confirmButtonText: 'Ir al Carrito'
        }).then(() => {
          window.location.href = '/carrito';
        });
      }
    } catch (error) {
      console.error('Error al confirmar pago:', error);
      Swal.fire({
        title: 'Error',
        text: 'Ocurrió un error al confirmar el pago. Por favor contacta con soporte.',
        icon: 'error',
        confirmButtonColor: '#d2691e',
        confirmButtonText: 'Ir al Carrito'
      }).then(() => {
        window.location.href = '/carrito';
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f5f5f5'
      }}>
        <div style={{
          textAlign: 'center',
          backgroundColor: 'white',
          padding: '40px',
          borderRadius: '8px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          <div style={{
            fontSize: '48px',
            marginBottom: '20px',
            animation: 'spin 2s linear infinite'
          }}>⏳</div>
          <h2>Procesando tu pago...</h2>
          <p>Por favor espera mientras confirmamos tu transacción con Transbank</p>
          <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      </div>
    );
  }

  if (paymentConfirmed) {
    return <Navigate to="/" replace />;
  }

  return null;
};

export default PaymentResult;
