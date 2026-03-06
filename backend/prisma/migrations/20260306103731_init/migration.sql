-- CreateTable
CREATE TABLE "User" (
    "pk_user" SERIAL NOT NULL,
    "vc_username" VARCHAR(64) NOT NULL,
    "vc_password" VARCHAR(256) NOT NULL,
    "fk_role" INTEGER NOT NULL DEFAULT 1,
    "nu_exp_points" INTEGER NOT NULL DEFAULT 0,
    "dt_created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dt_updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("pk_user")
);

-- CreateTable
CREATE TABLE "Role" (
    "pk_role" SERIAL NOT NULL,
    "vc_description" VARCHAR(64) NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("pk_role")
);

-- CreateTable
CREATE TABLE "Quiz" (
    "pk_quiz" SERIAL NOT NULL,
    "vc_title" VARCHAR(64) NOT NULL,
    "vc_text" VARCHAR(128) NOT NULL,
    "dt_created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dt_updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Quiz_pkey" PRIMARY KEY ("pk_quiz")
);

-- CreateTable
CREATE TABLE "Question" (
    "pk_question" SERIAL NOT NULL,
    "vc_text" VARCHAR(256) NOT NULL,
    "fk_category" INTEGER NOT NULL,
    "nu_right_answer" INTEGER NOT NULL,
    "dt_created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dt_updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("pk_question")
);

-- CreateTable
CREATE TABLE "Answer" (
    "pk_answer" SERIAL NOT NULL,
    "vc_option" VARCHAR(64) NOT NULL,
    "fk_category" INTEGER NOT NULL,
    "dt_created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dt_updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Answer_pkey" PRIMARY KEY ("pk_answer")
);

-- CreateTable
CREATE TABLE "Category" (
    "pk_category" SERIAL NOT NULL,
    "vc_description" VARCHAR(64) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("pk_category")
);

-- CreateTable
CREATE TABLE "_QuestionToQuiz" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_QuestionToQuiz_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_AnswerToQuestion" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_AnswerToQuestion_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_vc_username_key" ON "User"("vc_username");

-- CreateIndex
CREATE UNIQUE INDEX "User_vc_password_key" ON "User"("vc_password");

-- CreateIndex
CREATE UNIQUE INDEX "Role_vc_description_key" ON "Role"("vc_description");

-- CreateIndex
CREATE UNIQUE INDEX "Question_vc_text_key" ON "Question"("vc_text");

-- CreateIndex
CREATE UNIQUE INDEX "Answer_vc_option_key" ON "Answer"("vc_option");

-- CreateIndex
CREATE UNIQUE INDEX "Category_vc_description_key" ON "Category"("vc_description");

-- CreateIndex
CREATE INDEX "_QuestionToQuiz_B_index" ON "_QuestionToQuiz"("B");

-- CreateIndex
CREATE INDEX "_AnswerToQuestion_B_index" ON "_AnswerToQuestion"("B");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_fk_role_fkey" FOREIGN KEY ("fk_role") REFERENCES "Role"("pk_role") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_fk_category_fkey" FOREIGN KEY ("fk_category") REFERENCES "Category"("pk_category") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_fk_category_fkey" FOREIGN KEY ("fk_category") REFERENCES "Category"("pk_category") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_QuestionToQuiz" ADD CONSTRAINT "_QuestionToQuiz_A_fkey" FOREIGN KEY ("A") REFERENCES "Question"("pk_question") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_QuestionToQuiz" ADD CONSTRAINT "_QuestionToQuiz_B_fkey" FOREIGN KEY ("B") REFERENCES "Quiz"("pk_quiz") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnswerToQuestion" ADD CONSTRAINT "_AnswerToQuestion_A_fkey" FOREIGN KEY ("A") REFERENCES "Answer"("pk_answer") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnswerToQuestion" ADD CONSTRAINT "_AnswerToQuestion_B_fkey" FOREIGN KEY ("B") REFERENCES "Question"("pk_question") ON DELETE CASCADE ON UPDATE CASCADE;
