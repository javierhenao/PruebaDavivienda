##PRUEBAS DAVIVIENDA
##Autor: Javier Leonardo Henao Zarazo
## 31/10/2025
#Feature Ingreso

@IngresoOrangeHRM
Feature: Pantalla ingreso Orange HRM
  Como usuario requiero iniciar sesion

  Scenario Outline: Inicio de sesión exitoso
    Given Ingreso al sitio
    When Ingreso el <username>, <password>, y pulso el botón Login
    Then Valido la autenticación en el sistema

    Examples:
      | username | password |
      ##@externaldata@./src/test/resources/DataDriven/Ingreso/Ingreso.xlsx@Caso01
|"Admin"|"admin123"|
