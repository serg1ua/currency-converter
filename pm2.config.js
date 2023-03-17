module.exports = {
  apps: [{
    name: 'currency-converter',
    script: 'dist/main.js',
    instances: 3,
    exec_mode: 'cluster',
    autorestart: true,
    watch: false,
    max_memory_restart: '2G'
  }]
};