/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpStatus,
  HttpException,
  UseGuards,
} from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { AuthGuard } from '../auth/auth.guard';
import { Quiz as QuizModel } from '../generated/prisma/client';

@Controller('quizzes')
export class QuizzesController {
  constructor(private readonly QuizzesService: QuizzesService) {}

  @UseGuards(AuthGuard)
  @Get()
  async getAllQuizzes(): Promise<QuizModel[]> {
    return this.QuizzesService.quizzes({});
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async getQuizById(@Param('id') id: number): Promise<QuizModel | null> {
    const quiz = await this.QuizzesService.quiz({
      pk_quiz: Number(id),
    });

    if (quiz) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const questions = quiz['questions'];

      for (const question of questions) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        question['answers'].sort(() => 0.5 - Math.random());
      }
    }

    return Promise.resolve(quiz);
  }

  @UseGuards(AuthGuard)
  @Post('create')
  async createQuiz(
    @Body()
    quizData: {
      vc_title: string;
      vc_text: string;
    },
  ): Promise<QuizModel> {
    return this.QuizzesService.createQuiz(quizData);
  }

  @UseGuards(AuthGuard)
  @Put('update/:id')
  async updateQuiz(
    @Param('id') id: number,
    @Body()
    quizData: {
      vc_title: string;
      vc_text: string;
    },
  ): Promise<QuizModel> {
    return this.QuizzesService.updateQuiz({
      where: {
        pk_quiz: Number(id),
      },
      data: {
        vc_title: quizData.vc_title,
        vc_text: quizData.vc_text,
      },
    });
  }

  @UseGuards(AuthGuard)
  @Delete('delete/:id')
  async deleteQuiz(@Param('id') id: number): Promise<QuizModel> {
    const quizId = Number(id);

    if (Number.isNaN(quizId)) {
      throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST);
    }

    const quiz = await this.QuizzesService.quiz({
      pk_quiz: quizId,
    });

    if (!quiz) {
      throw new HttpException('Quiz not found', HttpStatus.NOT_FOUND);
    }

    return this.QuizzesService.deleteQuiz({
      pk_quiz: quizId,
    });
  }
}
