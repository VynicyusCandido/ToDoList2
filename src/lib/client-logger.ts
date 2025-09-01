// Logger simplificado para o lado do cliente
const createClientLogger = () => {
  const logLevel = process.env.LOG_LEVEL || 'info';
  
  const shouldLog = (level: string) => {
    const levels = ['error', 'warn', 'info', 'debug', 'silly'];
    return levels.indexOf(level) <= levels.indexOf(logLevel);
  };

  return {
    info: (message: string, metadata?: any) => {
      if (shouldLog('info')) {
        console.log(`ℹ️ INFO: ${message}`, metadata || '');
      }
    },
    error: (message: string, error?: any) => {
      if (shouldLog('error')) {
        console.error(`❌ ERROR: ${message}`, error || '');
      }
    },
    warn: (message: string, metadata?: any) => {
      if (shouldLog('warn')) {
        console.warn(`⚠️ WARN: ${message}`, metadata || '');
      }
    },
    debug: (message: string, metadata?: any) => {
      if (shouldLog('debug')) {
        console.debug(`🐛 DEBUG: ${message}`, metadata || '');
      }
    }
  };
};

export const log = createClientLogger();