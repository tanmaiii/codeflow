import createHttpClient from "@/lib/createHttpClient";
import { AxiosInstance } from "axios";

class TopicService {
    private client: AxiosInstance;

    constructor() {
        this.client = createHttpClient("topics");
    }
    
    
}

export default new TopicService() as TopicService;

