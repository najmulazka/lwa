-- CreateTable
CREATE TABLE "Professions" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Professions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TaskProfessions" (
    "id" SERIAL NOT NULL,
    "professionId" INTEGER NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "TaskProfessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SelfCheckProfessions" (
    "id" SERIAL NOT NULL,
    "taskId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT false,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SelfCheckProfessions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Professions_name_key" ON "Professions"("name");

-- AddForeignKey
ALTER TABLE "TaskProfessions" ADD CONSTRAINT "TaskProfessions_professionId_fkey" FOREIGN KEY ("professionId") REFERENCES "Professions"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "SelfCheckProfessions" ADD CONSTRAINT "SelfCheckProfessions_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "TaskProfessions"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "SelfCheckProfessions" ADD CONSTRAINT "SelfCheckProfessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
