// Karma configuration para pruebas con salida visual mejorada
module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'node_modules/jasmine-core/lib/jasmine-core/jasmine.js',
      'node_modules/jasmine-core/lib/jasmine-core/jasmine-html.js',
      'node_modules/jasmine-core/lib/jasmine-core/boot.js',
      'src/tests/basic.test.js'
    ],
    exclude: [],
    preprocessors: {},
    
    // Múltiples reporters para máxima visualización
    reporters: ['spec', 'progress'],
    
    // Configuración del reporter spec para más detalles
    specReporter: {
      maxLogLines: 5,
      suppressErrorSummary: false,
      suppressFailed: false,
      suppressPassed: false,
      suppressSkipped: true,
      showSpecTiming: true,
      failFast: false
    },
    
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    
    // Configuración para navegador normal (interfaz visual)
    browsers: ['Chrome'],
    
    // Custom launchers para diferentes modos
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox', '--disable-web-security']
      },
      ChromeDebug: {
        base: 'Chrome',
        flags: ['--remote-debugging-port=9333'],
        debug: true
      }
    },
    
    singleRun: false,
    concurrency: Infinity,
    
    // Configuración del cliente para interfaz visual en navegador
    client: {
      clearContext: false, // mantener el output de Jasmine visible en el navegador
      jasmine: {
        random: false // ejecutar pruebas en orden determinístico
      }
    }
  })
}