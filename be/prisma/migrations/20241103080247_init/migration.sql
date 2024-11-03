-- DropForeignKey
ALTER TABLE "SelfCheckLandingJob" DROP CONSTRAINT "SelfCheckLandingJob_taskId_fkey";

-- DropForeignKey
ALTER TABLE "SelfCheckLandingJob" DROP CONSTRAINT "SelfCheckLandingJob_userId_fkey";

-- AddForeignKey
ALTER TABLE "SelfCheckLandingJob" ADD CONSTRAINT "SelfCheckLandingJob_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "TaskLandingJob"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "SelfCheckLandingJob" ADD CONSTRAINT "SelfCheckLandingJob_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
