// Logger universal super simples
type LogLevel = 'error' | 'warn' | 'info' | 'debug';

class SimpleLogger {
  private level: LogLevel;
  private levels: LogLevel[] = ['error', 'warn', 'info', 'debug'];

  constructor(level: LogLevel = 'info') {
    this.level = level;
  }

  private shouldLog(level: LogLevel): boolean {
    return this.levels.indexOf(level) <= this.levels.indexOf(this.level);
  }

  private formatMessage(level: string, message: string): string {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] [${level.toUpperCase()}] ${message}`;
  }

  info(message: string, data?: any): void {
    if (this.shouldLog('info')) {
      console.log(this.formatMessage('info', message), data || '');
      this.sendToDatadog('info', message, data);
    }
  }

  error(message: string, error?: any): void {
    if (this.shouldLog('error')) {
      console.error(this.formatMessage('error', message), error || '');
      this.sendToDatadog('error', message, error);
    }
  }

  warn(message: string, data?: any): void {
    if (this.shouldLog('warn')) {
      console.warn(this.formatMessage('warn', message), data || '');
      this.sendToDatadog('warn', message, data);
    }
  }

  debug(message: string, data?: any): void {
    if (this.shouldLog('debug')) {
      console.debug(this.formatMessage('debug', message), data || '');
      this.sendToDatadog('debug', message, data);
    }
  }

  private async sendToDatadog(level: string, message: string, data?: any): Promise<void> {
    // Só envia para Datadog em produção e se a chave API existir
    if (process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_DATADOG_API_KEY) {
      try {
        const logData = {
          ddsource: 'browser',
          ddtags: `env:${process.env.NODE_ENV},service:todo-app`,
          message: message,
          service: 'todo-app',
          status: level,
          ...data
        };

        // Envia via fetch para a API do Datadog
        await fetch('https://http-intake.logs.datadoghq.com/api/v2/logs', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'DD-API-KEY': process.env.NEXT_PUBLIC_DATADOG_API_KEY
          },
          body: JSON.stringify(logData)
        });
      } catch (err) {
        // Não loga o erro para evitar loop infinito
        console.debug('Failed to send log to Datadog (this is normal in development)');
      }
    }
  }
}

// Cria instância do logger
const logLevel = (process.env.LOG_LEVEL as LogLevel) || 'info';
export const log = new SimpleLogger(logLevel);
export default log;