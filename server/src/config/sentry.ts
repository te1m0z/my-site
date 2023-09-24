import { init, Integrations } from '@sentry/node'
import { ProfilingIntegration } from '@sentry/profiling-node'
import { Express } from 'express'

function initSentry(app: Express) {
	//
	init({
		dsn: 'https://4538bd1796dbcad2f8f660ef4702ddc7@o4505818395377664.ingest.sentry.io/4505889992015872',
		integrations: [
			// enable HTTP calls tracing
			new Integrations.Http({ tracing: true }),
			// enable Express.js middleware tracing
			new Integrations.Express({ app }),
			//
			new ProfilingIntegration(),
		],
		// Performance Monitoring
		tracesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production!
		// Set sampling rate for profiling - this is relative to tracesSampleRate
		profilesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production!
	})
}

export {
	initSentry
}
