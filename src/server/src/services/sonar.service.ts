import { HttpException } from '@/exceptions/HttpException';
import { logger } from '@/utils/logger';
import axios from 'axios';
import qs from 'qs';
import { Service } from 'typedi';

@Service()
export class SonarService {
  private baseUrl = 'https://sonarcloud.io/api';
  private organization = 'organization-codeflow';

  private headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  public async createProject(projectName: string) {
    try {
      const formData = qs.stringify({
        name: projectName,
        project: projectName.toLowerCase().replace(/\s+/g, '-'), // bạn có thể tuỳ chỉnh
        organization: this.organization,
      });

      const response = await axios.post(`${this.baseUrl}/projects/create`, formData, {
        headers: this.headers,
        auth: {
          username: process.env.SONAR_ORG_TOKEN || '',
          password: '',
        },
      });

      logger.info(`[Sonar Service] Created project: ${JSON.stringify(response.data, null, 2)}`);

      return response.data;
    } catch (err: any) {
      if (err.response?.data) {
        logger.error(`❌ Failed: ${JSON.stringify(err.response.data, null, 2)}`);
        throw new HttpException(500, err.response.data);
      } else {
        logger.error(`❌ Error: ${err.message}`);
        throw new HttpException(500, err.message);
      }
    }
  }
}
