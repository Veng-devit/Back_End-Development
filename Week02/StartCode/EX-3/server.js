// server.js
const http = require('http');
const fs = require('fs');
const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;

    console.log(`Received ${method} request for ${url}`);

    if (url === '/' && method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        return res.end('Welcome to the Home Page');
    }

    if (url === '/contact' && method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
          <form method="POST" action="/contact">
            <input type="text" name="name" placeholder="Your name" />
            <button type="submit">Submit</button>
          </form>
        `);
        return;
    }

    if (url === '/contact' && method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
    
        req.on('end', () => {
            const name = new URLSearchParams(body).get('name');
            if (name.length === 0){
                console.log("Name can not be empty!");
                res.writeHead(200, { 'Content-Type': 'text/html' });
                return res.end(`<h2> Name is empty! </h2>`)
            }
            console.log(name);
            // Save name to text file   
            try {
                fs.appendFileSync('submissions.txt', name + '\n');
                let data = [];
                if (fs.existsSync('submissions.json')) {
                    const fileContent = fs.readFileSync('submissions.json');
                    data = JSON.parse(fileContent);
                }
                data.push({ name: name });
                fs.writeFileSync('submissions.json', JSON.stringify(data, null, 2));
                res.writeHead(200, { 'Content-Type': 'text/html' });
                return res.end(`<h2>Thanks, ${name}! Your name has been saved.</h2>`);
            } catch (err) {
                console.error('Error saving submission:', err);
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                return res.end('Failed to save submission');
            }
        });
        return;
    }

    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        return res.end('404 Not Found');
    }
});

server.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
});
