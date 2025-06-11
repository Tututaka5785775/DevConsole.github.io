const inputElement = document.getElementById("input");
const outputElement = document.getElementById("output");

const commands = {
    hello: "Hello, developer!",
    help: "Available commands: /help, /hello, /about, /clear, /clearhistory, /echo, /random, /calc, /quote, /systeminfo, /os, /version, /log, /debug, /exit, /clearcache, /ping, /uptime, /env, /network, /debugmode, /clearlogs, /save, /load, /status, /execute, /watch, /pause, /ipcnf",
    about: "This is a developer console. It contains commands to assist in web projects.",
    clear: "Clearing screen...",
    clearhistory: "Command history cleared!",
    echo: "This command will echo a message back.",
    random: `Random number: ${Math.floor(Math.random() * 100) + 1}`,
    calc: "Calculation: type like [expression] (e.g.: /calc 5 + 10).",
    quote: `"Well begun is half done." - Aristotle`,
    systeminfo: `System: ${navigator.platform}, Browser: ${navigator.userAgent}`,
    os: `Operating System: ${navigator.platform}`,
    version: "Application Version: 1.0.0",
    log: "Log message: This is a developer log message.",
    debug: "Debug message: This message is used for error detection.",
    exit: "Exiting console...",
    clearcache: "Clearing cache...",
    ping: "Ping successful! Connected to server.",
    uptime: `System uptime: ${Math.floor(Math.random() * 100)} days`,
    env: "Environment variables: NODE_ENV=production, DATABASE_URL=localhost",
    network: "Network status: Connection successful.",
    debugmode: "Debug mode is active.",
    clearlogs: "Logs cleared.",
    save: "Project saved.",
    load: "Project loaded.",
    status: "System status: Running.",
    execute: "Executing code...",
    watch: "Watching for file changes...",
    pause: "Console application paused...",
    ipcnf: "Loading your IP address..."
};

inputElement.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        const userInput = inputElement.value;
        addToOutput(userInput);
        processCommand(userInput);
        inputElement.value = ""; // Clear the input after processing
    }
});

function addToOutput(text) {
    const newOutput = document.createElement("div");
    newOutput.textContent = `> ${text}`;
    outputElement.appendChild(newOutput);
    outputElement.scrollTop = outputElement.scrollHeight;
}

async function processCommand(command) {
    const cleanedCommand = command.toLowerCase().replace(/^\/+/, "");

    if (commands[cleanedCommand]) {
        if (cleanedCommand === "clear") {
            outputElement.innerHTML = "";
        } else if (cleanedCommand === "clearhistory") {
            outputElement.innerHTML = "";
        } else if (cleanedCommand === "echo") {
            const message = command.slice(command.indexOf(" ") + 1);
            addToOutput(message);
        } else if (cleanedCommand.startsWith("calc")) {
            const expression = command.slice(command.indexOf(" ") + 1);
            try {
                const result = eval(expression);
                addToOutput(`Result: ${result}`);
            } catch (e) {
                addToOutput("Invalid expression!");
            }
        } else if (cleanedCommand === "ipcnf") {
            getIpAddress();
        } else if (cleanedCommand.startsWith("execute")) {
            const code = command.slice(command.indexOf(" ") + 1);
            try {
                eval(code);
                addToOutput(`Code executed successfully: ${code}`);
            } catch (e) {
                addToOutput(`Error: ${e.message}`);
            }
        } else {
            addToOutput(commands[cleanedCommand]);
        }
    } else {
        addToOutput("Unknown command. Use /help to see available commands.");
    }
}

async function getIpAddress() {
    const proxy = 'https://cors-anywhere.herokuapp.com/';
    try {
        const ipv4Response = await fetch(proxy + 'https://api.ipify.org?format=json');
        const ipv4Data = await ipv4Response.json();
        const ipv6Response = await fetch(proxy + 'https://api6.ipify.org?format=json');
        const ipv6Data = await ipv6Response.json();
        
        addToOutput(`Your IPv4 Address: ${ipv4Data.ip}`);
        addToOutput(`Your IPv6 Address: ${ipv6Data.ip}`);
    } catch (error) {
        addToOutput("An error occurred while retrieving IP address.");
    }
}
