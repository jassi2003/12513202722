const logs = [];

export const logEvent = (eventType, data) => {
  const logEntry = {
    timestamp: new Date().toISOString(),
    eventType,
    data,
  };
  logs.push(logEntry);
};

export const getLogs = () => logs;
