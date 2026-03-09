import axios from "axios";

/**
 * Service to handle specific n8n interactions
 * (e.g., getting workflow status, manually triggering different nodes)
 */
export const n8nService = {
    triggerWorkflow: async (webhookPath: string, data: any) => {
        const baseUrl = process.env.N8N_URL || "http://localhost:5678";
        return axios.post(`${baseUrl}/webhook/${webhookPath}`, data);
    }
};
