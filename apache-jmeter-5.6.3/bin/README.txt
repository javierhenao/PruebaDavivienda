Guía rápida - Siemplea (pruebas) con JMeter
1) Abre este JMX en JMeter.
2) En 'HTTP(S) Test Script Recorder' usa puerto 8888. Configura el proxy del navegador e instala el certificado temporal de JMeter (solo para grabar).
3) Elige 'Recording Controller' como Target y navega https://pruebas.siemplea.gov.co para grabar la funcionalidad.
4) Limpia recursos estáticos, parametriza con 'datos.csv', añade Assertions.
5) Ejecuta en no-GUI: jmeter -n -t siemplea_pruebas_template.jmx -l results.jtl -Jthreads=50 -Jrampup=60 -Jloop=2
