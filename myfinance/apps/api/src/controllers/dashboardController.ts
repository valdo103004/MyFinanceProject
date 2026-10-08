import { RequestHandler } from 'express';
import * as DashboardService from '../services/dashboardService.js';

export const dashboard: RequestHandler = async (request, response, next) => {
  try {
    if (!request.UserId) {
      response.status(401).json({ Message: 'Sesi login tidak ditemukan.' });
      return;
    }
    response.json(await DashboardService.getDashboard(request.UserId));
  } catch (error) { next(error); }
};
