import { v4 as uuidv4 } from 'uuid';

const SESSION_KEY = 'freedom2026_anon_id';

export function getSessionId(): string {
  if (typeof window === 'undefined') {
    return 'server-side'; // Fallback for server-side renders if accidentally called
  }
  
  let sessionId = localStorage.getItem(SESSION_KEY);
  if (!sessionId) {
    sessionId = uuidv4();
    localStorage.setItem(SESSION_KEY, sessionId);
  }
  return sessionId;
}

export async function trackClientEvent(eventName: string, properties: Record<string, any> = {}) {
  try {
    const sessionId = getSessionId();
    
    // Non-blocking, fire and forget
    fetch('/api/analytics/event', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        eventName,
        sessionId,
        ...properties,
      }),
      // keepalive ensures the request finishes even if the user navigates away
      keepalive: true,
    }).catch((err) => {
      // Silently fail to not disrupt user experience
      console.warn('Analytics event failed to send', err);
    });
  } catch (error) {
    // Catch any synchronous errors (like localStorage access issues)
    console.warn('Failed to track client event', error);
  }
}
