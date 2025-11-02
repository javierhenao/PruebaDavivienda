# Prueba API
@PruebaAPI @Directory
Feature: Employee API validation in OrangeHRM

  Scenario: Buscar empleado por nombre y validar datos
    Given inicio sesión en la API con usuario "Admin" y clave "admin123"
    When consulto la API de empleados por nombre "Javier Henao"
    Then la respuesta debe tener status 200
    And la respuesta debe incluir el nombre "Javier" y el apellido "Henao"
