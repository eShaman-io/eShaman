#!/usr/bin/env node

// Simple test script to validate GraphQL setup
const http = require('http');

const testGraphQL = () => {
  const postData = JSON.stringify({
    query: '{ health }'
  });

  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/graphql',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    }
  };

  const req = http.request(options, (res) => {
    console.log(`Status: ${res.statusCode}`);
    
    let body = '';
    res.on('data', (chunk) => {
      body += chunk;
    });
    
    res.on('end', () => {
      try {
        const response = JSON.parse(body);
        console.log('GraphQL Response:', response);
        
        if (response.data && response.data.health === 'OK') {
          console.log('✅ GraphQL health check passed!');
          process.exit(0);
        } else {
          console.log('❌ GraphQL health check failed');
          process.exit(1);
        }
      } catch (error) {
        console.log('❌ Failed to parse response:', error.message);
        console.log('Raw response:', body);
        process.exit(1);
      }
    });
  });

  req.on('error', (error) => {
    console.log('❌ Request failed:', error.message);
    process.exit(1);
  });

  req.write(postData);
  req.end();
};

console.log('Testing GraphQL endpoint...');
testGraphQL();