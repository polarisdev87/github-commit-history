import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import {
  Container,
  Breadcrumb,
  RepoIcon,
  Stats,
  StarIcon,
  ForkIcon,
  LinkButton,
  GithubIcon,
  CommitHistoryContainer
} from './styles';

import CommitHistory from '../../components/CommitHistory';

import { APIRepo, APICommit } from '../../@types';

interface Data {
  repo?: APIRepo;
  error?: string;
}

interface CommitData {
  commits?: APICommit[];
  error?: string;
}

const Repo: React.FC = () => {
  const { username, reponame } = useParams();
  const [data, setData] = useState<Data>();
const [commitData, setCommitData] = useState<CommitData>();

  const sliceSHA = (sha:string) => {
    return sha.slice(0, 7);
  }

  const generateTime = (time:string) => {
    var now = new Date();
    var commit = new Date(time);
    var nowTime = now.getTime();
    var commitTime = commit.getTime();
    var timeScale = "";
    const diffSecond =  Math.floor((nowTime - commitTime) / 1000);
    const diffMin = Math.floor(diffSecond / 60);
    if (diffMin > 1) {
      const diffHour = Math.floor(diffMin / 60);
      if (diffHour > 1) {
        const diffDay = Math.floor(diffHour / 24);
        if (diffDay > 1) {
          const diffMonth = Math.floor(diffDay / 30);
          if (diffMonth > 1) {
            const diffYear = Math.floor(diffMonth / 12);
            if (diffYear > 1) {
              timeScale = diffYear + " years ago";
            } else {
              if (diffYear === 1) {
                timeScale = diffYear + " year ago";
              } else {
                timeScale = diffMonth + " months ago";
              }
            }
          } else {
            if (diffMonth === 1) {
              timeScale = diffMonth + " month ago";
            } else {
              timeScale = diffDay + " days ago";
            }
          }
        } else {
          if (diffDay === 1) {
            timeScale = "yesterday";
          } else {
            timeScale = diffHour + " hours ago";
          }
        }
      } else {
        if (diffHour === 1) {
          timeScale = diffHour + " hour ago";
        } else {
          timeScale = diffMin + " mins ago";
        }
      }
    } else {
      if (diffMin === 1) {
        timeScale = diffMin + " minute ago";
      } else {
        timeScale = diffSecond + " seconds ago";
      }
    }
    
    return "committed " + timeScale;
  }

  useEffect(() => {
    Promise.all([
      fetch(`https://api.github.com/repos/${username}/${reponame}`),
      fetch(`https://api.github.com/repos/${username}/${reponame}/commits`),
    ])
      .then(
        async (responses) => {
          const [repoResponse, commitResponse] = responses;

          const commitHistory = await commitResponse.json();
          setCommitData(
            commitResponse.status === 404
            ? { error: 'Commit history not found!'}
            : { commits: commitHistory }
            );
          setData(
            repoResponse.status === 404
              ? { error: 'Repository not found!' }
              : { repo: await repoResponse.json() }
          );
        }
      );
  }, [reponame, username]);

  if (data?.error ) {
    return <h1>{data.error}</h1>;
  }

  if (!data?.repo) {
    return <h1>Loading...</h1>;
  }
  
  if (commitData?.error ) {
    return <h1>{commitData.error}</h1>;
  }

  if (!commitData?.commits) {
    return <h1>Loading...</h1>;
  }

  return (
    <Container>
      <Breadcrumb>
        <RepoIcon />

        <Link className={'username'} to={`/${username}`}>
          {username}
        </Link>

        <span>/</span>

        <Link className={'reponame'} to={`/${username}/${reponame}`}>
          {reponame}
        </Link>
      </Breadcrumb>

      <p>{data.repo.description}</p>

      <Stats>
        <li>
          <StarIcon />
          <b>{data.repo.stargazers_count}</b>
          <span>stars</span>
        </li>
        <li>
          <ForkIcon />
          <b>{data.repo.forks}</b>
          <span>forks</span>
        </li>
      </Stats>

      <LinkButton href={data.repo.html_url}>
        <GithubIcon />
        <span>View on GitHub</span>
      </LinkButton>
      <CommitHistoryContainer>
        <ol>
          {
            commitData.commits.map((item, index) => (
              <CommitHistory
                key = {index}
                commitmessage={item.commit.message}
                committer={item.commit.author.name}
                committime={generateTime(item.commit.author.date)}
                avatar={item.author.avatar_url}
                commitsha={sliceSHA(item.sha)}
              />
          ))}
        </ol>
      </CommitHistoryContainer>
    </Container>
  );
};

export default Repo;
