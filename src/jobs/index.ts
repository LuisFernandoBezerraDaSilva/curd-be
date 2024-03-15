export interface ScheduledJob {
    id: String;
    name: String;
    frequency: number;
    job: Function;
  }
  
  const jobs: Array<ScheduledJob> = [].map((job: ScheduledJob) => ({
    ...job,
    job() {
      console.log("A executar o job: ", job.name);
      try {
        job.job();
      } catch (err) {
        console.error(err);
      }
    },
  }));
  
  export default () =>
    jobs.forEach((job) => setInterval(() => job.job(), job.frequency * 1e3));
  