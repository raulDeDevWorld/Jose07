
{/* <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background: #f3f3f3;
        }
        .container {
            max-width: 960px;
            background: white;
            padding: 20px;
            margin: 20px auto;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        video {
            width: 100%;
            max-width: 640px;
            height: auto;
            display: block;
            margin: 20px auto;
        }
        table {
            width: 100%;
            margin-top: 20px;
            border-collapse: collapse;
            table-layout: fixed;
        }
        th, td {
            border: 1px solid #ccc;
            padding: 8px;
            text-align: left;
            word-wrap: break-word;
        }
        th {
            background-color: #f9f9f9;
        }
        caption {
            font-size: 1.2em;
            font-weight: bold;
            text-align: left;
            margin: 10px 0;
        }
        h2 {
            text-align: center;
            color: #333;
        }
    </style> */}


function Pages() {
    return <div class="container">
        <h1>Gama Completa de Contenedores - Logistics Gear</h1>

        <h2>Contenedor Standard de 20'</h2>
        <video controls>
            <source src="standard 20.mp4" type="video/mp4" />
            Tu navegador no soporta el elemento de video.
        </video>
        <table>
            <caption>Especificaciones del Contenedor Standard de 20'</caption>
            <tr>
                <th>Capacidad</th>
                <td>33.2 cbm / 1,172 cbft</td>
            </tr>
            <tr>
                <th>Grupo de Tipo ISO</th>
                <td>22 GP</td>
            </tr>
            <tr>
                <th>Tamaño de Tipo ISO</th>
                <td>22 G1</td>
            </tr>
            <tr>
                <th>Dimensiones Internas (LxAnxAl)</th>
                <td>5.9 m x 2.35 m x 2.39 m</td>
            </tr>
            <tr>
                <th>Apertura de Puerta (AnxAl)</th>
                <td>2.34 m x 2.29 m</td>
            </tr>
            <tr>
                <th>Peso Máximo</th>
                <td>Max Bruto: 30,480 kg, Tara: 2,350 kg, Capacidad Max: 28,130 kg</td>
            </tr>
        </table>
    </div>

}

export default Pages