import React, { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage } from "blitz"
import getProject from "app/projects/queries/getProject"
import getProjects from "app/projects/queries/getProjects"
import deleteProject from "app/projects/mutations/deleteProject"

export async function getStaticPaths() {
  const projects = await getProjects({})

  const paths = projects.map((project) => ({
    params: { id: `${project.id}` },
  }))

  return {
    paths,
    fallback: true,
  }
}

export async function getStaticProps(context) {
  const projectId = parseInt(context.params.id)

  const project = await getProject({
    where: { id: projectId },
  })

  return {
    props: {
      project,
    },
    revalidate: 60,
  }
}

export const Project = ({ project }) => {
  return (
    <div>
      <h1>Project {project.id}</h1>
      <pre>{JSON.stringify(project, null, 2)}</pre>

      <Link href="/projects/[projectId]/edit" as={`/projects/${project.id}/edit`}>
        <a>Edit</a>
      </Link>

      <button
        type="button"
        onClick={async () => {
          if (window.confirm("This will be deleted")) {
            await deleteProject({ where: { id: project.id } })
            router.push("/projects")
          }
        }}
      >
        Delete
      </button>
    </div>
  )
}

const ShowProjectPage: BlitzPage = ({ project }) => {
  return (
    <div>
      <Head>
        <title>Project</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <p>
          <Link href="/projects">
            <a>Projects</a>
          </Link>
        </p>

        <Project project={project} />
      </main>
    </div>
  )
}

ShowProjectPage.getLayout = (page) => <Layout title={"Project"}>{page}</Layout>

export default ShowProjectPage
