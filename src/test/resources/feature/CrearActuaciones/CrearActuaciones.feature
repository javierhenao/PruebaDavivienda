#Fecha creación 04/12/2020
#Feature de asignar procesos
#Version 1 (04/12/2020)- 3. Crear actuaciones a procesos terminados asignados - perfil "Abogado"

@CrearActuaciones
Feature: Crear actuaciones

  @CrearActuacionesTerminadosPerfilAbogado @RegressionTests
  Scenario Outline: Crear actuaciones a procesos terminados asignados - perfil "Abogado"
    ## Autenticación en el sistema
    Given Ingreso al sitio
    When Ingreso el <tipoDocumento>, <numeroDocumento>, <password> y pulso el botón Entrar
    Then Valido la autenticación en el sistema
    ## Mostrar menú izquierdo
    And Ingreso al menú módulo Procesos judiciales
    And Ingreso a la opción Home - módulo Procesos judiciales
    ## Opción "Terminados asignados"
    And Selecciono opcion Terminados asignados
    And selecciona registro <CUP>
    ##  Actualizar contenido del proceso judicial desde la entidad - Actuación = LIQUIDACION SENTENCIA
    And En proceso Activo Actualizacion procesal añado <InstanciaEscenario1>, <EtapaEscenario1>, <ActuacionProcesalEscenario1>
    ##Plural
    And Adjunto los documentos de soporte <DocumentoSoporte>
    And En Actuacion de procesos judiciales añado <despachoJudicialEscenario1>, <observacionesEscenario1>, <unidadMonetaria>, <valor>, <descripcion>, <interesMonetario>, <interesCorreinte> para procesos terminados
    And Pulso el boton Guardar
    And Selecciono SI en la ventana de confirmación

    Examples: 
      | tipoDocumento          | numeroDocumento | password           | CUP                       | DocumentoSoporte       | InstanciaEscenario1                   | EtapaEscenario1 | ActuacionProcesalEscenario1 | despachoJudicialEscenario1                                   | observacionesEscenario1             | unidadMonetaria | valor     | descripcion                       | interesMonetario | interesCorreinte |
      ##@externaldata@./src/test/resources/DataDriven/CrearActuacion/Actuacion.xlsx@Caso01
|"Cédula de Ciudadania"|"72325075"|"Agentesoporte_16"|"18001333300520200003900"|"ADMISION Ejemplo.pdf"|"PRIMERA INSTANCIA O UNICA INSTANCIA"|"FALLO"|"LIQUIDACION SENTENCIA"|"DESPACHO 00 DE LA SALA CIVIL DEL TRIBUNAL SUPERIOR DE CALI"|"Observaciones ingresada por robot"|"PESOS"|"3000000"|"Descripción ingresada por robot"|"1000000"|"2000000"|
