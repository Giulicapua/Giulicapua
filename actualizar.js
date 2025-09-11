const fs = require('fs');

function actualizarFraseDelDia() {
  try {
    const frases = require('./frases.json');
    const total = frases.length;

    const rutaIndice = './ultima_posicion.json';
    let indice = 0;

    if (fs.existsSync(rutaIndice)) {
      const data = JSON.parse(fs.readFileSync(rutaIndice, 'utf-8'));
      indice = (data.indice + 1) % total; // rotacion
    }

    const { frase, autor } = frases[indice];

    const tarjetaHTML = `
<!--TARJETA_INICIO-->
<p align="center">
  <img src="https://readme-daily-quotes.vercel.app/api?author=${encodeURIComponent(autor)}&quote=${encodeURIComponent(frase)}&theme=dark&bg_color=2e1a47&author_color=9fa8da&accent_color=7e57c2" alt="Quote"/>
</p>
<!--TARJETA_FIN-->
`;

    const rutaReadme = './README.md';
    let contenidoReadme = fs.readFileSync(rutaReadme, 'utf-8');

    contenidoReadme = contenidoReadme.replace(
      /<!--TARJETA_INICIO-->[\s\S]*<!--TARJETA_FIN-->/,
      tarjetaHTML
    );

    fs.writeFileSync(rutaReadme, contenidoReadme);

    // guardar el indice
    fs.writeFileSync(rutaIndice, JSON.stringify({ indice }, null, 2));

    console.log(`Frase #${indice + 1}/${total} usada: ${frase} — ${autor}`);
  } catch (error) {
    console.error('Error actualizando la frase del día:', error);
  }
}

actualizarFraseDelDia();