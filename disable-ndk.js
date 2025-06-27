const fs = require('fs');
const { execSync } = require('child_process');

function disableNdk() {
  try {
    console.log('🔧 Deshabilitando NDK en el proyecto...');
    
    // 1. Editar android/app/build.gradle
    const buildGradlePath = 'android/app/build.gradle';
    
    if (fs.existsSync(buildGradlePath)) {
      let buildGradle = fs.readFileSync(buildGradlePath, 'utf8');
      
      // Comentar ndkVersion si existe
      buildGradle = buildGradle.replace(/(\s*)ndkVersion\s+.*$/gm, '$1// ndkVersion commented out - NDK disabled');
      
      // Agregar configuración para evitar errores NDK
      if (!buildGradle.includes('packagingOptions')) {
        const androidBlock = buildGradle.indexOf('android {');
        if (androidBlock !== -1) {
          const insertPosition = buildGradle.indexOf('}', androidBlock);
          const newConfig = `
    packagingOptions {
        pickFirst "**/libc++_shared.so"
        pickFirst "**/libjsc.so"
    }
    
    // Disable NDK
    buildFeatures {
        renderScript false
    }

`;
          buildGradle = buildGradle.slice(0, insertPosition) + newConfig + buildGradle.slice(insertPosition);
        }
      }
      
      fs.writeFileSync(buildGradlePath, buildGradle);
      console.log('✅ NDK deshabilitado en build.gradle');
    }
    
    // 2. Editar android/build.gradle para versión NDK compatible
    const rootBuildGradlePath = 'android/build.gradle';
    if (fs.existsSync(rootBuildGradlePath)) {
      let rootBuildGradle = fs.readFileSync(rootBuildGradlePath, 'utf8');
      
      // Comentar configuración NDK si existe
      rootBuildGradle = rootBuildGradle.replace(/(\s*)ndkVersion\s+.*$/gm, '$1// ndkVersion disabled');
      
      fs.writeFileSync(rootBuildGradlePath, rootBuildGradle);
      console.log('✅ NDK deshabilitado en build.gradle raíz');
    }
    
    console.log('🧹 Limpiando proyecto...');
    
    // 3. Limpiar
    if (fs.existsSync('android')) {
      process.chdir('android');
      execSync('./gradlew clean', { stdio: 'inherit' });
      process.chdir('..');
    }
    
    // 4. Prebuild limpio
    execSync('npx expo prebuild --platform android --clear', { stdio: 'inherit' });
    
    console.log('🔨 Intentando build sin NDK...');
    execSync('npx expo run:android', { stdio: 'inherit' });
    
    console.log('✅ ¡APK construido exitosamente!');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.log('\n💡 Intenta instalar NDK desde Android Studio o usar EAS Build');
  }
}

disableNdk();