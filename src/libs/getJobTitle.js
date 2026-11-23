export async function getJobTitle(jobId, loadJob) {
  const job = await loadJob(jobId)

  if (!job) {
    throw new Error('Job not found')
  }

  return job.title
}