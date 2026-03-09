export interface Check {
    id: string;
    monitorId: string;
    status: 'unchanged' | 'changed' | 'error';
    hash: string;
    responseTime: number | null;
    timestamp: Date | string;
}

export interface Monitor {
    id: string;
    name: string;
    url: string;
    interval: number;
    lastStatus: string | null;
    createdAt: Date | string;
    updatedAt: Date | string;
    checks?: Check[];
}

export interface CreateMonitorInput {
    name: string;
    url: string;
    interval?: number;
}
