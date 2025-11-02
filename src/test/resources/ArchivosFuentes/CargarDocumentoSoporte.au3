; CargarDocumentoSoporte_FIJO.au3  (SIN parámetros)
Opt("WinTitleMatchMode", 2) ; substring
Global $TIMEOUT = 10

; ?? RUTA FIJA DEL ARCHIVO A SUBIR (ajústala a la tuya, sin tildes)
Local $file = "C:\Automatizacion\Davivienda-automatizacion-master\davivienda\src\test\resources\ArchivosFuentes\Foto.jpeg"

; (Opcional) Log para depurar
Local $log = "C:\AutoItProyectos\upload.log"
FileWrite($log, @CRLF & "---- " & @HOUR & ":" & @MIN & ":" & @SEC & " Inicia ----" & @CRLF)
FileWrite($log, "Ruta: " & $file & @CRLF)

If Not FileExists($file) Then
    MsgBox(16, "Error", "La ruta fija NO existe: " & $file)
    FileWrite($log, "ERROR: no existe la ruta" & @CRLF)
    Exit 1
EndIf

; Espera el diálogo Abrir/Open (#32770)
Local $hWnd = WinWaitActive("[CLASS:#32770]", "", $TIMEOUT)
If $hWnd = 0 Then
    MsgBox(16, "Error", "No se encontró la ventana 'Abrir/Open' (#32770)")
    FileWrite($log, "ERROR: no apareció ventana Abrir" & @CRLF)
    Exit 2
EndIf
FileWrite($log, "Ventana 'Abrir' detectada" & @CRLF)

; Escribir la ruta y pulsar Abrir
ControlFocus($hWnd, "", "Edit1")
ControlSetText($hWnd, "", "Edit1", $file)
ControlClick($hWnd, "", "Button1")

FileWrite($log, "OK: ruta escrita y botón Abrir clickeado" & @CRLF)
Exit 0
