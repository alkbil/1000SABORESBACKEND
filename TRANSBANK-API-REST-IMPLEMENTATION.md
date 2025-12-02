z# Integración Correcta de Transbank WebPay Plus - API REST

## Resumen de Cambios

Se ha actualizado completamente el `TransbankService.java` para implementar correctamente la API REST oficial de Transbank WebPay Plus, siguiendo exactamente la documentación oficial publicada en https://www.transbankdevelopers.cl/referencia/webpay

## Problemas Corregidos

### ❌ ANTES (Implementación Incorrecta)
```java
// 1. Headers Incorrectos
headers.set("Authorization", "Basic " + encodedCredentials);

// 2. Content-Type Incorrecto
headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

// 3. Body form-urlencoded en lugar de JSON
body.append("buy_order=").append(buyOrder);
body.append("&session_id=").append(sessionId);
body.append("&amount=").append(amount);
body.append("&return_url=").append(returnUrl);

// 4. Endpoint Incorrecto
String initUrl = getBaseUrl() + "/webpayserver/initTransaction";

// 5. Procesamiento de XML en lugar de JSON
String token = extractXmlValue(responseBody, "token");
String transbankUrl = extractXmlValue(responseBody, "url");
```

### ✅ DESPUÉS (Implementación Correcta)

```java
// 1. Headers Correctos según Transbank
HttpHeaders headers = createHeaders(); // application/json
headers.set("Tbk-Api-Key-Id", commerceCode);
headers.set("Tbk-Api-Key-Secret", apiKey);

// 2. Content-Type correcto
// Ya se configura en createHeaders() como application/json

// 3. Body en JSON
Map<String, Object> requestBody = new HashMap<>();
requestBody.put("buy_order", buyOrder);
requestBody.put("session_id", sessionId);
requestBody.put("amount", amount);
requestBody.put("return_url", returnUrl);

String jsonBody = objectMapper.writeValueAsString(requestBody);

// 4. Endpoint Correcto
String initUrl = getBaseUrl() + "/rswebpaytransaction/api/webpay/v1.2/transactions";

// 5. Procesamiento de JSON
JsonNode responseNode = objectMapper.readTree(responseBody);
String token = responseNode.get("token").asText();
String transbankUrl = responseNode.get("url").asText();
```

## Documentación Oficial de Transbank

### Credenciales (Headers Requeridos)
```
Tbk-Api-Key-Id: Código de comercio
Tbk-Api-Key-Secret: Llave secreta
Content-Type: application/json
```

**NO** usar `Authorization: Basic` con Base64. Transbank usa headers específicos.

### Ambientes

| Ambiente | URL |
|----------|-----|
| Integración | https://webpay3gint.transbank.cl |
| Producción | https://webpay3g.transbank.cl |

### Credenciales de Prueba (Integración)

```
Tbk-Api-Key-Id: 597055555532
Tbk-Api-Key-Secret: 579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C
```

## Endpoints API REST Correctos

### 1. Crear Transacción
```
POST /rswebpaytransaction/api/webpay/v1.2/transactions

Headers:
  Tbk-Api-Key-Id: 597055555532
  Tbk-Api-Key-Secret: 579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C
  Content-Type: application/json

Body (JSON):
{
  "buy_order": "ordenCompra12345678",
  "session_id": "sesion1234557545",
  "amount": 10000,
  "return_url": "http://www.comercio.cl/webpay/retorno"
}

Response (200 OK):
{
  "token": "e9d555262db0f989e49d724b4db0b0af367cc415cde41f500a776550fc5fddd3",
  "url": "https://webpay3gint.transbank.cl/webpayserver/initTransaction"
}
```

### 2. Confirmar Transacción
```
PUT /rswebpaytransaction/api/webpay/v1.2/transactions/{token}

Headers:
  Tbk-Api-Key-Id: 597055555532
  Tbk-Api-Key-Secret: 579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C
  Content-Type: application/json

Body: (vacío)

Response (200 OK):
{
  "vci": "TSY",
  "amount": 10000,
  "status": "AUTHORIZED",
  "buy_order": "ordenCompra12345678",
  "session_id": "sesion1234557545",
  "card_detail": {
    "card_number": "6623"
  },
  "accounting_date": "0522",
  "transaction_date": "2019-05-22T16:41:21.063Z",
  "authorization_code": "1213",
  "payment_type_code": "VN",
  "response_code": 0,
  "installments_number": 0
}
```

### 3. Obtener Estado de Transacción
```
GET /rswebpaytransaction/api/webpay/v1.2/transactions/{token}

Headers:
  Tbk-Api-Key-Id: 597055555532
  Tbk-Api-Key-Secret: 579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C
  Content-Type: application/json

Response: (igual al de Confirmar Transacción)
```

### 4. Revertir/Anular Transacción
```
POST /rswebpaytransaction/api/webpay/v1.2/transactions/{token}/refunds

Headers:
  Tbk-Api-Key-Id: 597055555532
  Tbk-Api-Key-Secret: 579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C
  Content-Type: application/json

Body (JSON):
{
  "amount": 1000
}

Response (200 OK):
{
  "type": "NULLIFIED",
  "authorization_code": "123456",
  "authorization_date": "2019-03-20T20:18:20Z",
  "nullified_amount": 1000.00,
  "balance": 0.00,
  "response_code": 0
}
```

## Tarjetas de Prueba (Integración)

| Tarjeta | Número | CVV | Resultado |
|---------|--------|-----|-----------|
| VISA | 4051 8856 0044 6623 | 123 | ✅ Aprobada |
| AMEX | 3700 0000 0002 032 | 1234 | ✅ Aprobada |
| MASTERCARD | 5186 0595 5959 0568 | 123 | ❌ Rechazada |

**RUT y Clave de Prueba:**
- RUT: 11.111.111-1
- Clave: 123

## Métodos Actualizados en TransbankService

### ✅ initiatePayment()
- Usa headers correctos `Tbk-Api-Key-Id` y `Tbk-Api-Key-Secret`
- Envía body en JSON
- Llama al endpoint correcto `/rswebpaytransaction/api/webpay/v1.2/transactions`
- Parsea respuesta JSON
- Manejo robusto de errores HTTP (4xx y 5xx)

### ✅ confirmPayment()
- Usa método HTTP `PUT`
- Parsea respuesta JSON completa de Transbank
- Extrae todos los campos relevantes (vci, authorization_code, payment_type_code, etc.)

### ✅ getTransactionStatus()
- Usa método HTTP `GET`
- Obtiene estado actual de la transacción

### ✅ refundPayment()
- Usa método HTTP `POST`
- Endpoint `/transactions/{token}/refunds`
- Maneja reversas totales y parciales

## Importaciones Actualizadas

Se removió:
- `import java.util.Base64;` (ya no es necesario)

Se mantuvieron:
- `import com.fasterxml.jackson.databind.ObjectMapper;`
- `import com.fasterxml.jackson.databind.JsonNode;`

Se removió método:
- `extractXmlValue()` - Ya no es necesario (JSON parsing)

## Validación de Compilación

✅ Compilación exitosa con Maven:
```
[INFO] BUILD SUCCESS
```

## Próximos Pasos

1. **Configurar credenciales en `application.properties` o variables de entorno:**
   ```properties
   transbank.commerce.code=597055555532
   transbank.api.key=579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C
   transbank.environment=integration
   ```

2. **Usar las tarjetas de prueba proporcionadas** para realizar transacciones de prueba

3. **Proceder con validación de integración** en https://www.transbankdevelopers.cl/documentacion/como_empezar#el-proceso-de-validacion

4. **Obtener credenciales de producción** después de validación exitosa

## Referencias

- Documentación Oficial: https://www.transbankdevelopers.cl/referencia/webpay
- Cómo Empezar: https://www.transbankdevelopers.cl/documentacion/como_empezar
- Comunidad Slack: https://invitacion-slack.transbankdevelopers.cl/slack_community
