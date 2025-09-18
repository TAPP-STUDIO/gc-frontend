// src/services/logger.service.ts

interface LogEntry {
  level: 'info' | 'warn' | 'error' | 'debug'
  message: string
  context?: string
  data?: unknown
  timestamp: string
  userId?: string
  walletAddress?: string
}

class LoggerService {
  private readonly API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://dvgjdqq5hh5x6.cloudfront.net/api/v1'
  private queue: LogEntry[] = []
  private isProcessing = false
  private flushInterval: NodeJS.Timeout | null = null

  constructor() {
    // Flush logs every 5 seconds if there are any
    if (typeof window !== 'undefined') {
      this.flushInterval = setInterval(() => {
        if (this.queue.length > 0 && !this.isProcessing) {
          this.flush()
        }
      }, 5000)
    }
  }

  private async sendToCloudWatch(logs: LogEntry[]) {
    try {
      const response = await fetch(`${this.API_BASE_URL}/logs/cloudwatch`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        },
        body: JSON.stringify({ logs })
      })

      if (!response.ok) {
        console.error('Failed to send logs to CloudWatch:', response.status)
      }
    } catch (error) {
      // Silently fail - we don't want logging to break the app
      console.error('CloudWatch logging error:', error)
    }
  }

  private getAuthToken(): string {
    // Try to get wallet token first, then admin token
    const walletTokens = localStorage.getItem('gc_wallet_tokens')
    if (walletTokens) {
      try {
        const parsed = JSON.parse(walletTokens)
        if (parsed.accessToken) return parsed.accessToken
      } catch {}
    }

    const adminTokens = localStorage.getItem('gc_admin_tokens')
    if (adminTokens) {
      try {
        const parsed = JSON.parse(adminTokens)
        if (parsed.accessToken) return parsed.accessToken
      } catch {}
    }

    return ''
  }

  private getUserContext() {
    const walletUser = localStorage.getItem('gc_wallet_user')
    if (walletUser) {
      try {
        const parsed = JSON.parse(walletUser)
        return {
          userId: parsed.id,
          walletAddress: parsed.walletAddress
        }
      } catch {}
    }
    return {}
  }

  private createLogEntry(
    level: LogEntry['level'],
    message: string,
    context?: string,
    data?: unknown
  ): LogEntry {
    const userContext = this.getUserContext()
    return {
      level,
      message,
      context,
      data,
      timestamp: new Date().toISOString(),
      ...userContext
    }
  }

  info(message: string, context?: string, data?: unknown) {
    const entry = this.createLogEntry('info', message, context, data)
    this.queue.push(entry)
    console.log(`[${context || 'INFO'}]`, message, data)
  }

  warn(message: string, context?: string, data?: unknown) {
    const entry = this.createLogEntry('warn', message, context, data)
    this.queue.push(entry)
    console.warn(`[${context || 'WARN'}]`, message, data)
  }

  error(message: string, context?: string, data?: unknown) {
    const entry = this.createLogEntry('error', message, context, data)
    this.queue.push(entry)
    console.error(`[${context || 'ERROR'}]`, message, data)
    
    // Immediately flush errors
    this.flush()
  }

  debug(message: string, context?: string, data?: unknown) {
    if (process.env.NODE_ENV === 'development') {
      const entry = this.createLogEntry('debug', message, context, data)
      this.queue.push(entry)
      console.debug(`[${context || 'DEBUG'}]`, message, data)
    }
  }

  async flush() {
    if (this.queue.length === 0 || this.isProcessing) return

    this.isProcessing = true
    const logsToSend = [...this.queue]
    this.queue = []

    try {
      await this.sendToCloudWatch(logsToSend)
    } finally {
      this.isProcessing = false
    }
  }

  destroy() {
    if (this.flushInterval) {
      clearInterval(this.flushInterval)
      this.flushInterval = null
    }
    this.flush()
  }
}

export const logger = new LoggerService()

// Wallet auth specific logger
export const walletAuthLogger = {
  info: (message: string, data?: unknown) => 
    logger.info(message, 'WalletAuth', data),
  
  warn: (message: string, data?: unknown) => 
    logger.warn(message, 'WalletAuth', data),
  
  error: (message: string, data?: unknown) => 
    logger.error(message, 'WalletAuth', data),
  
  debug: (message: string, data?: unknown) => 
    logger.debug(message, 'WalletAuth', data)
}
