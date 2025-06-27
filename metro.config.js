const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Extensiones de archivos que Metro debe procesar
config.resolver.sourceExts = ['ts', 'tsx', 'js', 'jsx', 'json'];
config.resolver.assetExts.push('bin');

module.exports = config;