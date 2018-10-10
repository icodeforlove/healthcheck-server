# healthcheck-server

create a basic raw-http healthcheck server

```javascript
let createHealtcheck = require('healthcheck-server');

let healthcheck = createHealtcheck({
    port: 8080,
    path: '/healthcheck',
    status: ({cpu, memory}) => {
        // logic...
        return true;
    }
});

healthcheck.close(); // kill the server
```

# response

200 (healthy)
```
{
    "healthy": true,
    "memory": 0.75,
    "cpu": 0.12
}
```

500 (unhealthy)
```
{
    "healthy": false,
    "memory": 0.75,
    "cpu": 0.12
}```