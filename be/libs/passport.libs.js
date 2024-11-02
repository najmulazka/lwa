const prisma = require('./prisma.libs');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK_URL } = process.env;

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: GOOGLE_CALLBACK_URL,
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        const taskLandingJobs = await prisma.taskLandingJob.findMany();

        let user = await prisma.users.upsert({
          where: { email: profile.emails[0].value },
          update: { name: profile.displayName, profilePicture: profile.photos[0].value, googleId: profile.id },
          create: {
            name: profile.displayName,
            profilePicture: profile.photos[0].value,
            email: profile.emails[0].value,
            googleId: profile.id,
          },
        });

        const existSelfCheckLandingJob = await prisma.selfCheckLandingJob.findMany({
          where: {
            userId: user.id,
          },
        });

        if (existSelfCheckLandingJob.length === 0) {
          await prisma.selfCheckLandingJob.createMany({
            data: taskLandingJobs.map((task) => ({
              userId: user.id,
              taskId: task.id,
              status: false,
            })),
          });
        }

        done(null, user);
      } catch (err) {
        done(err, null);
      }
    }
  )
);

module.exports = passport;
