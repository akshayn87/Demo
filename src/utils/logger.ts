type Level = 'INFO' | 'WARN' | 'ERROR' | 'DEBUG';

function emit(level: Level, message: string): void {
  const ts = new Date().toISOString();
  // eslint-disable-next-line no-console
  console.log(`[${ts}] [${level}] ${message}`);
}

export const logger = {
  info: (m: string) => emit('INFO', m),
  warn: (m: string) => emit('WARN', m),
  error: (m: string) => emit('ERROR', m),
  debug: (m: string) => process.env.DEBUG && emit('DEBUG', m),
};

