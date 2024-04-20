const jwt = require(`jsonwebtoken`)

const {PrismaClient} = require(`@prisma/client`)
const prisma = new PrismaClient()


const submitVote = async (req, res) => {
    const token = req.cookies.token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const reportId = req.body.reportId

    const existingVote = await prisma.vote.findUnique({
        where : {
            reportId,
            userId : decoded.userId
        }
    })

    if(existingVote){
        await prisma.vote.delete({
            where : {
                reportId,
                userId : decoded.userId
            }
        })

        await prisma.raport.update({
            where : {
                report_id : reportId,
                userId : decoded.userId
            },
            data : {
                nbr_Of_Votes : {
                    decrement : 1
                }
            }
        })

        res.status(200).send(`The vote has been removed`);
    }
    else{
        await prisma.vote.create({
            data : {
                reportId, 
                userId : decoded.userId
            }
        })

        await prisma.raport.update({
            where : {
                report_id : reportId,
                userId : decoded.userId
            },
            data : {
                nbr_Of_Votes : {
                    increment : 1
                }
            }
        })

        res.status(201).send("Your vote has been registered");
    }
}

//get user votes
const getUserVotes = async (userId) => {
    return await prisma.vote.findMany({
      where: {
        userId
      },
      include: {
        report: true
      }
    });
};

//get number of votes
const getReportVotes = async (reportId) => {
    return await prisma.vote.count({
      where: {
        reportId
      }
    });
};

module.exports = {submitVote, getUserVotes, getReportVotes}

// const vote = async (req, res) => {
//   const reportId = req.body.report_id;
//   const userId = req.body.user_id

//   try {
//     // Check if the user has already voted for this report
//     const existingVote = await prisma.vote.findUnique({
//       where: {
//         reportId_userId: {
//           reportId,
//           userId
//         }
//       }
//     });

//     if (existingVote) {
//       return res.status(400).json({
//         error: 'User has already voted for this report'
//       });
//     }

//     // Create a new vote
//     const vote = await prisma.vote.create({
//       data: {
//         reportId,
//         userId
//       }
//     });

//     // Increment the number of votes for the report
//     const report = await prisma.raport.update({
//       where: {
//         report_id: reportId
//       },
//       data: {
//         nbr_Of_Votes: {
//           increment: 1
//         }
//       }
//     });

//     // Return the updated report
//     res.json(report);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       error: 'An error occurred while processing the vote'
//     });
//   }
// };


// const getUsersWhoVoted = async (reportId) => {
//   return await prisma.vote.findMany({
//     where: {
//       reportId
//     },
//     select: {
//       userId: true
//     }
//   });
// };

// const getReportsWithVotes = async () => {
//   return await prisma.raport.findMany({
//     include: {
//       votes: {
//         select: {
//           userId: true
//         }
//       }
//     }
//   });
// };

// module.exports = {
//   vote,
//   getUserVotes,
//   getReportVotes,
//   getUsersWhoVoted,
//   getReportsWithVotes
// };