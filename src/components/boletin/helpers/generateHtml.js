
const generateHtmlContent = (boleta, fontSize, fontSizeTitle, isExplore, docente, membrete) => {


    const html = `
<html>
<head>
<meta charset="UTF-8">
<title>Boleta de ${boleta.estudiante}</title>
<style>
*{margin:0;padding:0;box-sizing:border-box;}
body{font-family:'Times New Roman',serif;color:#000;font-size:10pt;background:#fff;}
img{display:block;max-width:100%;height:auto;}
.marco{border:4px solid gold;padding:0.5rem 1rem;margin:0 auto;}
.header{text-align:center;margin-bottom:0.5rem;}
.header p{margin:0;line-height:1;font-weight:bold;}
.title-info{text-align:center;margin-bottom:0.5rem;font-size:9pt;}
.student-info div{margin-bottom:0.3rem;}
.student-info div div{display:flex;flex-wrap:wrap;gap:0.3rem;align-items:center;}
table{width:100%;border-collapse:collapse;margin-bottom:0.5rem;font-size:9pt;}
th,td{border:1px solid #000;padding:0.2rem 0.3rem;text-align:left;vertical-align:top;}
th{text-align:center;background:#fff;font-weight:bold;}
.font-size {font-size:${fontSize}pt; text-align:justify} /* <-- Solo tbody */
tbody td, tbody th {
    vertical-align: middle; /* opcional: centra verticalmente */
  }
@media print{body{margin:0;padding:0;}.marco{margin: 5px 0 0 0;;}button,.no-print{display:none!important;}}
</style>
</head>
<body>
<div class="marco">
<div class="header">
<img src="${membrete}" alt="Membrete" style="width:100%;height:auto;margin-bottom:0.2rem;">
<p style="font-size:${fontSizeTitle}pt;">REPÚBLICA BOLIVARIANA DE VENEZUELA</p>
<p style="font-size:${fontSizeTitle}pt;">MINISTERIO DEL PODER POPULAR PARA LA EDUCACIÓN</p>
<p style="font-size:${fontSizeTitle}pt;">UNIDAD EDUCATIVA COLEGIO PRIVADO "LATINOAMÉRICA"</p>
</div>
<div class="title-info">
<p style="font-weight:bold; font-size:${fontSizeTitle - 3}pt ">BOLETÍN INFORMATIVO 1er MOMENTO PEDAGÓGICO</p>
<p style="font-weight:bold; font-size:${fontSizeTitle - 3}pt"  >EDUCACIÓN PRIMARIA</p>
</div>
<div class="student-info">
<div><strong style="font-size:${fontSizeTitle - 3}pt">NOMBRES Y APELLIDOS DEL REPRESENTANTE:</strong> <span style="text-decoration:underline; font-size:${fontSize}">${boleta.representante}</span></div>
<div><strong style="font-size:${fontSizeTitle - 3}pt">NOMBRES Y APELLIDOS DEL ESTUDIANTE:</strong> <span style="text-decoration:underline; font-size:${fontSize}">${boleta.estudiante}</span> 
<strong style="font-size:${fontSizeTitle - 3}pt">EDAD:</strong> <span style="text-decoration:underline; font-size:${fontSize}">${boleta.edad}</span></div>
<div><strong style="font-size:${fontSizeTitle - 3}pt">CÉDULA ESCOLAR:</strong> <span style="text-decoration:underline; font-size:${fontSize}">${boleta.cedulaEscolar}</span>
<strong style="font-size:${fontSizeTitle - 3}pt">GRADO:</strong> <span style="text-decoration:underline;font-size:${fontSize}">${docente.grado}</span>
<strong style="font-size:${fontSizeTitle - 3}pt">SECCIÓN:</strong> <span style="text-decoration:underline;font-size:${fontSize}">${docente.seccion}</span>
<strong style="font-size:${fontSizeTitle - 3}pt">DOCENTE:</strong> <span style="text-decoration:underline;font-size:${fontSize}">${docente.nombre}</span></div>
<div><strong style="font-size:${fontSizeTitle - 3}pt">AÑO ESCOLAR:</strong> <span style="text-decoration:underline;font-size:${fontSize}">${docente.anoEscolar}</span></div>
</div>
<table>
<thead>
<tr><th style="font-size:${fontSizeTitle - 3}pt; white-space: nowrap; text-align:center;">ASPECTOS A EVALUAR</th><th style="font-size:${fontSizeTitle - 3}pt">JUICIO VALORATIVO</th></tr>
</thead>
<tbody>
<tr><td style=" font-size:${fontSizeTitle - 3}pt; text-align:center;font-weight:bold;">SER – CONVIVIR</td><td class="font-size">${boleta.serConvivir || ''}</td></tr>
<tr><td style=" font-size:${fontSizeTitle - 3}pt; text-align:center;font-weight:bold;">CONOCER – HACER</td><td class="font-size">${boleta.conocerHacer || ''}</td></tr>
<tr><td colspan="2" style="font-size:${fontSizeTitle - 3}pt;  text-align:left;font-weight:bold;">ÁREAS DE FORMACIÓN</td></tr>
<tr><th style="font-size:${fontSizeTitle - 3}pt;  ">LENGUAJE, COMUNICACIÓN Y LITERATURA</th><td class="font-size">${boleta.lenguaje || ''}</td></tr>
<tr><th style="font-size:${fontSizeTitle - 3}pt;  ">MATEMÁTICA</th><td class="font-size">${boleta.matematica || ''}</td></tr>
<tr><th style="font-size:${fontSizeTitle - 3}pt;  ">CIENCIAS NATURALES</th><td class="font-size">${boleta.cienciasNaturales || ''}</td></tr>
<tr><th style="font-size:${fontSizeTitle - 3}pt;  ">CIENCIAS SOCIALES</th><td class="font-size">${boleta.cienciasSociales || ''}</td></tr>
<tr><th style="font-size:${fontSizeTitle - 3}pt;  " >IDENTIDAD Y ORIENTACIÓN VOCACIONAL</th><td class="font-size">${boleta.identidad || ''}</td></tr>
</tbody>

</table>
</div>

<div class="marco page-break">
  <table style="width:100%; border-collapse: collapse; border: 1px solid #000;">
    <!-- Sección Educación Física -->
    <tr>
      <th colspan="2" style="font-size:${fontSizeTitle}pt; white-space: nowrap; text-align:center; border:1px solid #000;">
        EDUCACIÓN FÍSICA, DEPORTE Y RECREACIÓN
      </th>
    </tr>
    <tr>
      <td colspan="2" style="font-size:${fontSizeTitle - 3}pt; text-align:justify; border:1px solid #000;">
        ${boleta.educacionFisica || ''}
      </td>
    </tr>

    <!-- Sección Ajedrez -->
    <tr>
      <th colspan="2" style="font-size:${fontSizeTitle}pt; white-space: nowrap; text-align:center; border:1px solid #000;">
        AJEDREZ
      </th>
    </tr>
    <tr>
      <td colspan="2" style="font-size:${fontSizeTitle - 3}pt; text-align:justify; border:1px solid #000;">
        ${boleta.ajedrez || ''}
      </td>
    </tr>

    <!-- Sección Inglés -->
    <tr>
      <th colspan="2" style="font-size:${fontSizeTitle - 3}pt; white-space: nowrap; text-align:center; border:1px solid #000;">
        INGLÉS (INSTITUTO CLEVELAND)
      </th>
    </tr>
    <tr>
      <td colspan="2" style=" text-align:justify; border:1px solid #000;">
        <span style="font-size:${fontSize}pt;">${boleta.ingles || ''}</span>
      </td>
    </tr>

    <!-- Sección Matific -->
    <tr>
      <th colspan="2" style="font-size:${fontSizeTitle - 3}pt; white-space: nowrap; text-align:center; border:1px solid #000;">
        MATIFIC – ESTRELLAS ALCANZADAS
      </th>
    </tr>
    <tr>
      <td colspan="2" style=" text-align:center; border:1px solid #000;">
        <span style="font-size:${fontSize}pt;">${boleta.matific || ''}</span>
      </td>
    </tr>

     <!-- Sección Recomendacion -->
    <tr>
      <th colspan="2" style="font-size:${fontSizeTitle - 3}pt; white-space: nowrap; text-align:center; border:1px solid #000;">
        RECOMENDACIONES PARA EL REPRESENTANTE
      </th>
    </tr>
    <tr>
      <td colspan="2" style=" text-align:justify; border:1px solid #000;">
        <span style="font-size:${fontSize}pt;">${boleta.recomendaciones || ''}</span>
      </td>
    </tr>
    
  
      <!-- Deberes de los Niños -->
    <tr>
      <th colspan="2" style="font-size:${fontSizeTitle - 3}pt; white-space: nowrap; text-align:center; border:1px solid #000;">
        DEBERES DE LOS NIÑOS (AS) Y ADOLESCENTES
      </th>
    </tr>
    <tr>
      <td colspan="2" style="font-size:${fontSizeTitle - 3}pt; text-align:left; border:1px solid #000;">
        <span style="font-weight:bold; font-size:${fontSize}pt;" >${boleta.deberes.slice(0, 33) || ''}</span>
        <span style="font-size:${fontSize}pt;">${boleta.deberes.slice(33, 85) || ''}</span>
      </td>
          
    </tr>
    <tr>
     <td colspan="2" style="font-size:${fontSizeTitle - 3}pt; border:1px solid #000; text-align:center;">

    <span style="font-weight:bold; font-size:${fontSize}pt;">
        Total de inasistencias: % (0) FALTAS
    </span>

  <br>

 <span style="display:block; text-align:left; font-size:${fontSize}pt;">
  <span style="font-weight:bold; ">
    ${boleta.deberes.slice(85, 111) || ''}
  </span>
  ${boleta.deberes.slice(111) || ''}
</span>


</td>

    </tr>
  </table>
<table style="
  width:40%;
  border-collapse:collapse;
  margin: 1.2rem auto 0 auto;
">
  <thead>
    <tr>
      <th colspan="3"
          style="border:1px solid #000; font-size:${fontSizeTitle - 3}pt; text-align:center;">
        ESCALA
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td style="  border:1px solid #000; font-size:${fontSize}pt; text-align:left;">
        INICIADO
      </td>
      <td style="font-weight:bold;border:1px solid #000; font-size:${fontSize}pt; text-align:center;">
        I
      </td>
      <td style="border:1px solid #000 ; font-size:${fontSize}pt;">
      ${boleta.escalaGeneral === "I" ? "X" : ""}
        
      </td>
    </tr>
    <tr>
      <td style="border:1px solid #000; font-size:${fontSize}pt; text-align:left;">
        REQUIERE AYUDA
      </td>
      <td style=" font-weight:bold;border:1px solid #000; font-size:${fontSize}pt; text-align:center;">
        RA
      </td>
      <td style="border:1px solid #000 ; font-size:${fontSize}pt;">
      ${boleta.escalaGeneral === "RA" ? "X" : ""}
        
      </td>
    </tr>
     <tr>
      <td style="border:1px solid #000; font-size:${fontSize}pt; text-align:left;">
        PROCESO LENTO
      </td>
      <td style=" font-weight:bold;border:1px solid #000; font-size:${fontSize}pt; text-align:center;">
        PL
      </td>
      <td style="border:1px solid #000 ; font-size:${fontSize}pt;">
      ${boleta.escalaGeneral === "PL" ? "X" : ""}
        
      </td>
    </tr>
     <tr>
      <td style="border:1px solid #000; font-size:${fontSize}pt; text-align:left;">
        EN PROCESO
      </td>
      <td style=" font-weight:bold;border:1px solid #000; font-size:${fontSize}pt; text-align:center;">
        EP
      </td>
      <td style="border:1px solid #000 ; font-size:${fontSize}pt;">
      ${boleta.escalaGeneral === "EP" ? "X" : ""}
        
      </td>
    </tr>
    <tr>
      <td style="border:1px solid #000; font-size:${fontSize}pt; text-align:left;">
        CONSOLIDADO
      </td>
      <td style="font-weight:bold;border:1px solid #000; font-size:${fontSize}pt; text-align:center;">
        C
      </td>
      <td style="border:1px solid #000 ; font-size:${fontSize}pt;">
      ${boleta.escalaGeneral === "C" ? "X" : ""}
        
      </td>
    </tr>
    <tr>
      <td style="border:1px solid #000; font-size:${fontSize}pt; text-align:left;">
       MAS QUE CONSOLIDADO
      </td>
      <td style="  font-weight:bold; border:1px solid #000; font-size:${fontSize}pt; text-align:center;">
        +C
      </td>
      <td style=" border:1px solid #000 ; font-size:${fontSize}pt;">
      ${boleta.escalaGeneral === "+C" ? "X" : ""}
        
      </td>
    </tr>
  </tbody>
</table>

<div style="
  margin-top: 2.5rem;
  width:100%;
  display:flex;
  justify-content:space-between;
  align-items:flex-start;
">

  <!-- DIRECTORA (un poco más arriba) -->
  <div style="width:30%; text-align:center; font-weight:bold; margin-top:5rem;">
    <div style="border-top:1px solid #000; padding-top:4px; font-size:${fontSize}pt;">
        FRANCIS GUTIÉRREZ
        DIRECTORA
    </div>
  </div>
 
  <!-- DOCENTE + SELLO (centro) -->
  <div style=" font-weight:bold;width:30%; text-align:center; margin-top:50px; background-color: blck">
   <div style="  padding-bottom:5.5rem; font-size:${fontSize}pt;">
      SELLO
    </div>
    <div style="  border-top:1px solid #000; padding-top:4px; font-size:${fontSize}pt;">
     YRIS RAMÍREZ 
     DOCENTE
    </div>
  </div>

  <!-- COORDINADOR (un poco más arriba) -->
  <div style=" font-weight:bold;width:30%; text-align:center; margin-top:5rem; ">
    <div style="border-top:1px solid #000; padding-top:4px; font-size:${fontSize}pt;">
    LIZMARY PÉREZ  
    COORD. EDUC. PRIMARIA
    </div>
  </div>

</div>




</div>

<script>
    window.onload = function() {
        ${isExplore === false ? "  window.print(); //window.close(); " : ""}
      
    }
</script>
</body>
</html>
`;

    return html

}


export default generateHtmlContent;