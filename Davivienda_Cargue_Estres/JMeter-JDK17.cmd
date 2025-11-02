@echo off
rem === Configurar temporalmente JAVA_HOME para usar JDK 17 ===
set "JAVA_HOME=C:\Program Files\Java\jdk-17"
set "PATH=%JAVA_HOME%\bin;%PATH%"

rem === Iniciar Apache JMeter con Java 17 ===
call "C:\Cargue_Estres\apache-jmeter-5.6.3\bin\jmeter.bat"