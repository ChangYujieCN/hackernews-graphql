const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
async function main() {
    const allLinks = await prisma.link.findMany()
    console.log(allLinks)
}
const newLink = await prisma.link.create({
    data: {
        description: 'Fullstack tutorial for GraphQL',
        url: 'www.howtographql.com',
    }
})
main()
    .catch(e => {
        throw e
    })
    .finally(async () => {
        await prisma.$disconnect()
    })