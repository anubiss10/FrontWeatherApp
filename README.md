# FrontWeatherApp

**FrontWeatherApp** es una aplicación web para consultar información meteorológica en tiempo real. La aplicación utiliza [Angular](https://angular.io/) y [Angular Material](https://material.angular.io/) para proporcionar una interfaz de usuario moderna y responsiva.

## Descripción

FrontWeatherApp permite a los usuarios buscar y visualizar datos meteorológicos mediante la API de VisualCrossing y la API de Google Maps para autocompletar ubicaciones. La aplicación muestra el clima actual y las previsiones para los próximos días en una interfaz fácil de usar.

## Requisitos

Antes de comenzar, asegúrate de tener instalados los siguientes requisitos:

- [Node.js](https://nodejs.org/) (versión 14 o superior)
- [npm](https://www.npmjs.com/) (gestor de paquetes para Node.js)

## Tecnologías

- **Angular**: Framework para construir aplicaciones web de una sola página.
- **Angular Material**: Conjunto de componentes de interfaz de usuario basados en Material Design.
- **TypeScript**: Superset de JavaScript para un desarrollo más estructurado.
- **Sass**: Preprocesador CSS para un estilo más mantenible y modular.
- **VisualCrossing API**: Proporciona datos meteorológicos.
- **Google Maps API**: Utilizada para autocompletar ubicaciones.

## Instalación

Sigue estos pasos para instalar y ejecutar la aplicación localmente:

1. Clona el repositorio:

    ```bash
    git clone https://github.com/anubiss10/FrontWeatherApp.git
    ```

2. Navega al directorio del proyecto:

    ```bash
    cd FrontWeatherApp
    ```

3. Instala las dependencias:

    ```bash
    npm install
    ```

4. Inicia la aplicación en modo de desarrollo:

    ```bash
    ng serve
    ```

5. Abre tu navegador y accede a `http://localhost:4200` para ver la aplicación en funcionamiento.

## Uso

- **Buscar una ubicación**: Escribe el nombre de una ciudad o localidad en el campo de búsqueda y presiona "Buscar".
- **Ver detalles**: La aplicación mostrará el clima actual y las previsiones para los próximos días.
- **Configuración**: Cambia las unidades de medida y otros parámetros en la sección de configuración.

## Componentes

### 1. `AppComponent`

- **Descripción**: Componente principal de la aplicación. Actúa como el contenedor para otros componentes y maneja la navegación.
- **Funciones**: Inicializa la aplicación y define la estructura básica de la interfaz.

### 2. `WeatherDetailsComponent`

- **Descripción**: Muestra la información meteorológica para la ubicación actual.
- **Funciones**:
  - Muestra el clima actual, la temperatura y la previsión del tiempo.
  - Actualiza la vista cuando se selecciona una nueva ubicación.

### 3. `LocationAutocompleteComponent`

- **Descripción**: Proporciona un campo de entrada con autocompletado para la selección de ubicaciones.
- **Funciones**:
  - Utiliza la API de Google Maps para sugerir ubicaciones a medida que el usuario escribe.
  - Permite seleccionar una ubicación de la lista sugerida y la envía a `WeatherDetailsComponent` para obtener datos meteorológicos.

## Descripción de Variables

- **location**: `string` - La ubicación que el usuario desea consultar.
- **weatherData**: `WeatherData` - Un objeto que contiene la información meteorológica para la ubicación dada.
- **units**: `string` - Las unidades de medida para la temperatura (e.g., "metric" para Celsius, "imperial" para Fahrenheit).

## Integración con APIs

### VisualCrossing API

- **Descripción**: API utilizada para obtener datos meteorológicos.
- **Uso**: Se realizan solicitudes HTTP para obtener el clima actual y las previsiones basadas en la ubicación proporcionada por el usuario.

### Google Maps API

- **Descripción**: API utilizada para autocompletar ubicaciones en el campo de búsqueda.
- **Uso**: Se integra en `LocationAutocompleteComponent` para ofrecer sugerencias de ubicación a medida que el usuario escribe en el campo de entrada.

## Script de Google Maps

Asegúrate de incluir el siguiente script en el archivo `index.html` para que la funcionalidad de autocompletado de Google Maps funcione correctamente:

```html
<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places"></script>
