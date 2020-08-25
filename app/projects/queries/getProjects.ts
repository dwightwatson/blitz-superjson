import { SessionContext } from "blitz"
import db, { FindManyProjectArgs } from "db"

type GetProjectsInput = {
  where?: FindManyProjectArgs["where"]
  orderBy?: FindManyProjectArgs["orderBy"]
  cursor?: FindManyProjectArgs["cursor"]
  take?: FindManyProjectArgs["take"]
  skip?: FindManyProjectArgs["skip"]
  // Only available if a model relationship exists
  // include?: FindManyProjectArgs['include']
}

export default async function getProjects(
  { where, orderBy, cursor, take, skip }: GetProjectsInput,
  ctx: { session?: SessionContext } = {}
) {
  ctx.session!.authorize()

  const projects = await db.project.findMany({
    where,
    orderBy,
    cursor,
    take,
    skip,
  })

  return projects
}
