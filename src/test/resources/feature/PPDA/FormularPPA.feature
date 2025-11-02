#Fecha creación 13/08/2021
#Feature de Formular una PPDA enviando con aprobacion con perfil: "Formulador de politicas"
#Version 1 (09/09/2021)- 1. Formular una PPDA enviando con aprobacion con perfil: "Formulador de politicas"

@FormularPPD
Feature: Formular PPDA

  @FormularPPDA 
  Scenario Outline: Formular una PPDA enviando con aprobacion - perfil Formulador de politicas
    ## Autenticación en el sistema
    Given Ingreso al sitio
    When Ingreso el <tipoDocumento>, <numeroDocumento>, <password> y pulso el botón Entrar
    Then Valido la autenticación en el sistema
    ## Mostrar menú izquierdo
    And Ingreso al menu modulo Gestion de PPDA
    And Ingreso a la opcion Formulacion de la PPDA
    ## Ver HOME procesos PPDA
    And Seleccionar Causa
    And En el HOME procesos PPDA selecciono la opción Formular PPDA
    ## Ingresa informacion de la formulacion de la PPDA
    ## Seccion Aquí puede formular su PPDA
    And En la seccion, Aqui puede formular Su PPDA seleccionar una opcion del campo Forma de divulgación de la PPDA <formaDivulgacionPPDA> 
    And En Area responsable, igreso informacion <areaResponsable>  
    And Pulso el botón Guardar 
    ## Creacion de Plan De accion
    ## Seccion Identificación de la Causa y Subcausa
    And Selecciono una opcion del campo Insumo <insumo>
    And Selecciono una opcion del campo Causa <causa>
    And Ingresar informacion en el campo Justificación <justificacion>
    And Ingresar informacion en el campo Subcausa <subcausa> 
    And Seleccionar el boton Guardar de la seccion Identificacion de la Causa y de la Subcausa
    ## Se ingresa informacion en la seccion Formulación del indicador de resultado - Medida
    And Seleccionar una opcion del campo Medida <medida>
    
    ## Se ingresa informacion en la seccion Descripción del indicador
    And Ingresar informacion en el campo Descripción de la medida a realizar en el periodo uno <descripcionMedidaRealizarPeriodo1>
    And Ingresar informacion en el campo Cantidad de medidas a realizar en el periodo uno <CantidadMedidasRealizarPeriodo1>
    And Seleccionar una opcon del campo Forma de implementación en el periodo uno <FormaImplementacionPeriodo1>
    And Seleccionar una opcon del campo Frecuencia de implementación en el periodo uno <FrecuenciaImplementacionPeriodo1>
    And Ingresar informacion en el campo Descripción de la medida a realizar en el periodo dos <DescripcionMedidaRealizarPeriodo2>
    And Ingresar informacion en el campo Cantidad de medidas a realizar en el periodo dos <CantidadMedidasRealizarPeriodo2>
    And Seleccionar una opcon del campo Forma de implementación en el periodo dos <FormaImplementacionPeriodo2>
    And Seleccionar una opcon del campo Frecuencia de implementación en el periodo dos <FrecuenciaImplementacionPeriodo2>
    And Pulso el botón Adicionar y guardar
    
    ##Formulación del indicador de gestión - Mecanismo
    And Seleccionar una opcion del campo Seleccione una de las medidas ingresadas
    And Seleccionar una opcion del campo Mecanismo
    And Ingresar informacion en el campo Explicacion del Mecanismo 
    
    ##Ingresar informacion seccion Descripcion del indicador
    And Ingresar informacion campo Descripción del mecanismo a realizar en el periodo uno
    And Ingresar informacion campo Cantidad de mecanismos a realizar en el periodo uno
    And Seleccionar informacion del campo Forma de implementación en el periodo uno
    ##And Seleccionar informacion del campo Frecuencia de	 implementación en el periodo uno
    And Ingresar informacion en el campo Descripción del mecanismo a realizar en el periodo Dos
    And Ingresar informacion en el campo Cantidad de mecanismos a realizar en el periodo Dos
    
    And Seleccion informacion Forma de implementación en el periodo dos
    And Seleccion informacion del campo Frecuencia de implementación en el periodo dos
    And Pulso el botón Adicionar y guardar Dos 
    ## And Pulso el boton Crear Nuevo Plan de Accion
    
    ##And Pulso el boton Eviar PPDA para aporbacion  
    
    
    
    
    Examples: 
      |tipoDocumento        |numeroDocumento |password    |formaDivulgacionPPDA|areaResponsable |insumo		|causa		| justificacion		|subcausa		|medida	|descripcionMedidaRealizarPeriodo1	|cantidadMedidasRealizarPeriodo1|formaImplementacionPeriodo1|frecuenciaImplementacionPeriodo1|descripcionMedidaRealizarPeriodo2	|cantidadMedidasRealizarPeriodo2|formaImplementacionPeriodo2|frecuenciaImplementacionPeriodo2|
      ##@externaldata@./src/test/resources/DataDriven/CrearProceso/
			|"Cédula de Ciudadania"|"52085267"|"Agentesoporte_16"|"forma Divulgacion PPDA"|"Prueba Automatizada"|"Litigiosidad"|"Desplazamieto Forzado"|"Pruebas automatizadas Justificacion"|"Pruebas automatizadas Subcasusa"|"Dar Instrucciones"|"Prueba Tuomatizada Descripcion de la Medida a Realizar Periodo1"|"100000"|"PERIODICA"|"ANUAL"|"Prueba automatizada Descripcion de la Medida a Realizar Periodo2"|"100000"|"UNICA IMPLEMENTACION"|"TRIMESTRE (ENERO, FEBRERO, MARZO)"|                              
    
