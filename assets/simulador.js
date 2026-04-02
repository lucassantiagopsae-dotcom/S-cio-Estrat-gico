(function() {
    // Inject CSS for simulator
    const style = document.createElement('style');
    style.innerHTML = `
        #test-simulator {
            position: fixed;
            bottom: 24px;
            right: 24px;
            background: rgba(10, 15, 12, 0.95);
            border: 1px solid var(--ouro);
            border-radius: 8px;
            padding: 16px 20px;
            z-index: 999999;
            font-family: 'DM Sans', sans-serif;
            color: white;
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
            backdrop-filter: blur(10px);
            display: flex;
            flex-direction: column;
            gap: 12px;
            min-width: 250px;
        }
        #test-simulator h4 {
            font-family: 'Cormorant Garamond', serif;
            font-style: italic;
            color: var(--ouro-claro);
            margin: 0;
            font-size: 20px;
        }
        #test-simulator label {
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            color: var(--cinza-claro);
        }
        #test-simulator input[type="date"] {
            background: rgba(255,255,255,0.05);
            border: 1px solid var(--glass-border);
            color: white;
            padding: 8px;
            border-radius: 4px;
            font-family: 'DM Sans', sans-serif;
            width: 100%;
        }
        #test-simulator button {
            background: var(--ouro);
            color: var(--preto);
            border: none;
            padding: 8px 16px;
            border-radius: 4px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
            font-family: 'DM Sans', sans-serif;
        }
        #test-simulator button:hover {
            background: var(--ouro-claro);
        }
        #test-simulator .close-btn {
            position: absolute;
            top: 4px;
            right: 4px;
            background: transparent;
            color: white;
            padding: 4px;
            font-size: 18px;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            border: none;
            line-height: 1;
        }
    `;
    document.head.appendChild(style);

    // Inject HTML Simulator
    const simulator = document.createElement('div');
    simulator.id = 'test-simulator';
    simulator.innerHTML = `
        <button class="close-btn" onclick="document.getElementById('test-simulator').style.display='none'">×</button>
        <h4>Máquina do Tempo</h4>
        <div>
            <label>Viajar para a data:</label>
            <input type="date" id="sim-date" value="${new Date().toISOString().split('T')[0]}">
        </div>
        <button id="sim-btn">Aplicar Simulação</button>
        <button id="sim-reset" style="background: transparent; border: 1px solid var(--cinza); color: var(--cinza-claro); margin-top: -4px;">Voltar para o Presente</button>
    `;
    document.body.appendChild(simulator);

    // Logic
    document.getElementById('sim-btn').addEventListener('click', () => {
        const val = document.getElementById('sim-date').value;
        if(val) {
            // Need to parse date correctly treating as local time to avoid timezone mismatch
            const [y, m, d] = val.split('-');
            window.DEBUG_DATE = new Date(y, m - 1, d);
            window.render(); // Re-render everything with the new simulated date
        }
    });

    document.getElementById('sim-reset').addEventListener('click', () => {
        window.DEBUG_DATE = null;
        document.getElementById('sim-date').value = new Date().toISOString().split('T')[0];
        window.render();
    });
})();
