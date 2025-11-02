##PRUEBAS DAVIVIENDA
##Autor: Javier Leonardo Henao Zarazo
## 31/10/2025
#Feature Crear y Validar Empleado

@CrearValidarEmpleado
Feature: Agrega un nuevo empleado y validar que se haya almacenado de manera correcta

  @CrearValidarEmpleadoExitoso @RegressionTests
  
	Scenario Outline: Agrega un nuevo empleado y validar que se haya almacenado de manera correcta adjuntado archivos
    
    Given Ingreso al sitio
    When Ingreso el <username>, <password>, y pulso el botón Login
    And Valido la autenticación en el sistema
    And Ingreso al módulo PIM 
    And Pulso el botón Add
    And Agregar nuevo empleado Nombre <nombreEmpleado> y Apellido <apellidoEmpleado>
    And Subo la foto del empleado
    And Pulso el botón Save
    And ingreso al modulo Directory
    And Ingreso al módulo PIM
    And Ejecuto busqueda empleado Nombre <nombreEmpleado> y Apellido <apellidoEmpleado>
    And Pulso el botón Search
    Then Valido que el empleado exista Nombre <nombreEmpleado> y Apellido <apellidoEmpleado>
    
    
    Examples: 
    | username | password | nombreEmpleado | apellidoEmpleado |
      ##@externaldata@./src/test/resources/DataDriven/CrearValidarEmpleado/CrearValidarEmpleado.xlsx@Caso01
|"Admin"|"admin123"|"Javier"|"Henao"|


