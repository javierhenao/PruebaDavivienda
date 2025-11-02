# 🚀 Automatización Davivienda (UI + API)  
> Framework de pruebas automatizadas desarrollado con **Java, Maven, Serenity BDD, Selenium y Cucumber**, integrado con **GitHub Actions** para CI/CD.

---

## 🧩 Estructura del proyecto

```
Davivienda-automatizacion-master/
│
├── src/
│   └── test/java/davivienda/com/
│       ├── steps/              # Lógica de los pasos (UI y API)
│       ├── definitions/        # Definiciones de Cucumber
│       ├── runners/            # Clases Runner para ejecutar features
│       ├── Api/                # Clases relacionadas con llamadas API
│       └── hooks/              # Configuraciones y pre/post condiciones
│
├── src/test/resources/feature/  # Archivos .feature de Cucumber
│   ├── Api/empleados_api.feature
│   └── CrearValidarEmpleado/
│
├── target/site/serenity/        # Reportes Serenity (HTML)
│
├── pom.xml                      # Dependencias Maven y configuración Serenity
└── .github/workflows/ci-ui.yml  # Pipeline CI/CD en GitHub Actions
```

---

## ⚙️ Tecnologías utilizadas

| Componente         | Versión / Descripción |
|--------------------|-----------------------|
| **Java**           | 8 (Temurin) |
| **Maven**          | Gestor de dependencias y build |
| **Serenity BDD**   | Framework para reportes y pruebas automatizadas |
| **Selenium WebDriver** | Automatización de UI (Chrome Headless) |
| **Cucumber**       | Definición de escenarios Gherkin (BDD) |
| **JUnit**          | Ejecutor de pruebas |
| **GitHub Actions** | Integración Continua (CI/CD) |
| **RestAssured**    | Pruebas automatizadas de API REST |

---

## 🧪 Ejecución local

### 🔧 Requisitos previos

1. Tener instalado:
   - [Java JDK 8 o superior](https://adoptium.net/)
   - [Maven 3.8+](https://maven.apache.org/download.cgi)
   - [Git](https://git-scm.com/)
   - [Google Chrome](https://www.google.com/chrome/)

2. Clonar el repositorio:
   ```bash
   git clone https://github.com/javierhenao/PruebaDavivienda.git
   cd PruebaDavivienda/davivienda
   ```

3. (Opcional) Configurar credenciales o variables en un archivo `serenity.properties`:
   ```properties
   webdriver.driver=chrome
   serenity.take.screenshots=AFTER_EACH_STEP
   serenity.outputDirectory=target/site/serenity
   base.url=https://opensource-demo.orangehrmlive.com
   ui.user=Admin
   ui.pass=admin123
   ```

---

### ▶️ Ejecutar pruebas desde línea de comandos

```bash
# Limpia, compila y ejecuta todas las pruebas (UI + API)
mvn clean verify
```

O puedes ejecutar solo una suite específica:

```bash
# Solo pruebas UI
mvn verify -Dcucumber.options="--tags @CrearValidarEmpleado"

# Solo pruebas API
mvn verify -Dcucumber.options="--tags @PruebaAPI"
```

Los **reportes HTML Serenity** se generarán en:
```
target/site/serenity/index.html
```

---

## ☁️ Ejecución automática (CI/CD)

El proyecto incluye un flujo de integración continua en **GitHub Actions**, definido en:

```
.github/workflows/ci-ui.yml
```

### ⚙️ Flujo del pipeline

1. **Disparadores (Triggers)**  
   El workflow se ejecuta automáticamente al:
   - Hacer `push` a ramas `main`, `develop`, o `feature/**`
   - Crear un `pull request` hacia `main` o `develop`

2. **Etapas del pipeline**
   | Etapa | Descripción |
   |--------|-------------|
   | **Checkout** | Descarga el código del repositorio |
   | **Setup Java** | Configura el JDK 8 (Temurin) |
   | **Setup Chrome** | Instala navegador Chrome en el runner |
   | **Build & Test** | Ejecuta pruebas con Maven en modo headless |
   | **Publicar Reportes** | Sube los reportes Serenity/Surefire como artefactos descargables |

3. **Ejecución headless**
   Las pruebas UI se ejecutan sin interfaz gráfica usando:
   ```
   --headless=new --no-sandbox --disable-dev-shm-usage --window-size=1920,1080
   ```

4. **Resultados**
   Una vez completada la ejecución, podrás descargar los reportes desde la pestaña  
   **Actions → CI - UI (Serenity + Maven) → Artifacts → serenity-ui-report.zip**

---

## 📊 Reportes generados

| Tipo de reporte | Ubicación local | Descripción |
|-----------------|----------------|--------------|
| **Serenity BDD** | `target/site/serenity/` | Reporte HTML con evidencias paso a paso |
| **Surefire** | `target/surefire-reports/` | Logs XML/JUnit estándar para CI |
| **API/REST** | `target/serenity/` | Respuestas y logs de pruebas de servicios |

---

## 🧠 Buenas prácticas y consideraciones

- Mantén el **nombre de los features y tags** claros (`@UI`, `@PruebaAPI`, `@Smoke`, etc.).
- Usa **PageObjects o Screenplay Pattern** para la capa de UI.
- Los **selectores XPath/CSS** deben ser estables y legibles.
- Configura variables sensibles (credenciales, tokens) como **GitHub Secrets**.
- No subas datos sensibles ni credenciales reales al repositorio.
- Asegúrate de limpiar (`mvn clean`) antes de cada ejecución CI.

---

## 💡 Próximas mejoras (sugeridas)

- Añadir un job paralelo para **API Testing**.
- Publicar el reporte Serenity automáticamente en **GitHub Pages**.
- Integrar **notificaciones Slack o correo** ante fallas de pipeline.
- Generar métricas de cobertura y tendencias con **Allure o SonarQube**.

---

## 👨‍💻 Autor

**Javier Leonardo Henao Zarazo**  
Especialista en Automatización QA y Pruebas de Software  
📍 Bogotá, Colombia  
📧 [Contacto Profesional](mailto:leonardo.henaoz@hotmail.com)
