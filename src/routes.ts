import { Router } from "express";
import { AnswerController } from "./controllers/AnswerController";
import { NpsController } from "./controllers/NpsController";
import { SendMailController } from "./controllers/SendMailController";
import { SurveysController } from "./controllers/SurveysController";
import { UserController } from "./controllers/UserController";

const router = Router();

const userController = new UserController();
const serveysController = new SurveysController();
const sendMailController = new SendMailController();
const answerController = new AnswerController();
const npsController = new NpsController();

router.post('/users', userController.create);

router.post('/surveys', serveysController.create);
router.get('/surveys', serveysController.show);

router.post('/sendmail', sendMailController.execute);

router.get('/answers/:value', answerController.execute);

router.get('/nps/:survey_id', npsController.execute)

export { router }