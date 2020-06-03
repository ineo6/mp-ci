// @ts-ignore
import simpleGit from 'simple-git';

export function getLastCommitLog(gitProject: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const git = simpleGit(gitProject);

    git.log(
      {
        n: 1,
      },
      (error: any, listLogSummary: any) => {
        if (!error) {
          resolve(listLogSummary.latest);
        } else {
          reject(error);
        }
      }
    );
  });
}

export function getPackageName(name: string): string {
  if (name === '__FULL__') {
    return '整包';
  } else if (name === '__APP__') {
    return '主包';
  } else {
    return '分包';
  }
}

export function getFormatFileSize(bytes: number) {
  if (bytes === 0) {
    return {
      size: 0,
      measure: 'Bytes',
    };
  }

  bytes *= 1024;

  const K = 1024;
  const MEASURE = ['', 'Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(K));

  return {
    // eslint-disable-next-line no-restricted-properties
    size: parseFloat((bytes / Math.pow(K, i)).toFixed(2)),
    measure: MEASURE[i],
  };
}
