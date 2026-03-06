import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Request,
  HttpStatus,
  HttpException,
  UseGuards,
} from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { UsersService } from './../users/users.service';
import { AuthGuard } from '../auth/auth.guard';
import { Question as QuestionModel } from '../generated/prisma/client';

@Controller('questions')
export class QuestionsController {
  constructor(
    private readonly QuestionsService: QuestionsService,
    private readonly UsersService: UsersService,
  ) {}

  @UseGuards(AuthGuard)
  @Get()
  async getAllQuestions(): Promise<QuestionModel[]> {
    return this.QuestionsService.questions({});
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async getQuestionById(
    @Param('id') id: number,
  ): Promise<QuestionModel | null> {
    return this.QuestionsService.question({
      pk_question: Number(id),
    });
  }

  @UseGuards(AuthGuard)
  @Post(':id/answer/:option')
  async checkAnswer(
    @Param('id') id: number,
    @Param('option') option: number,
    @Request() req: any,
  ): Promise<object> {
    const answerOption = Number(option);

    const question = await this.QuestionsService.question({
      pk_question: Number(id),
    });

    if (!question) {
      return Promise.resolve({
        isAnswerCorrect: false,
        newExpPoints: 0,
        theAnswer: 0,
      });
    }

    const isCorrect = question.nu_right_answer === answerOption;

    const user = await this.UsersService.user({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      pk_user: Number(req.userJwt.userId),
    });

    let newExpPoints = 0;
    if (user) {
      newExpPoints = user.nu_exp_points + (isCorrect ? 50 : -15);

      await this.UsersService.updateUser({
        where: {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          pk_user: Number(req.userJwt.userId),
        },
        data: {
          nu_exp_points: newExpPoints,
        },
      });
    }

    return Promise.resolve({
      isAnswerCorrect: isCorrect,
      newExpPoints: newExpPoints,
      theAnswer: question.nu_right_answer,
    });
  }

  @UseGuards(AuthGuard)
  @Post('create')
  async createQuestion(
    @Body()
    questionData: {
      fk_category: number;
      vc_text: string;
      nu_right_answer: number;
    },
  ): Promise<QuestionModel> {
    return this.QuestionsService.createQuestion(questionData);
  }

  @UseGuards(AuthGuard)
  @Put('update/:id')
  async updateQuestion(
    @Param('id') id: number,
    @Body()
    questionData: {
      fk_category: number;
      vc_text: string;
      nu_right_answer: number;
    },
  ): Promise<QuestionModel> {
    return this.QuestionsService.updateQuestion({
      where: {
        pk_question: Number(id),
      },
      data: {
        fk_category: questionData.fk_category,
        vc_text: questionData.vc_text,
        nu_right_answer: questionData.nu_right_answer,
      },
    });
  }

  @UseGuards(AuthGuard)
  @Delete('delete/:id')
  async deleteQuestion(@Param('id') id: number): Promise<QuestionModel> {
    const questionId = Number(id);

    if (Number.isNaN(questionId)) {
      throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST);
    }

    const question = await this.QuestionsService.question({
      pk_question: questionId,
    });

    if (!question) {
      throw new HttpException('Question not found', HttpStatus.NOT_FOUND);
    }

    return this.QuestionsService.deleteQuestion({
      pk_question: questionId,
    });
  }
}
