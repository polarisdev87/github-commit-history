import React from 'react';

import { 
  Container,
  Content,
  Avatar,
  CommitId
} from './styles';

interface Props {
  commitmessage: string;
  committer: string;
  committime?: string;
  avatar?: string;
  commitsha: string;
}

const CommitHistory: React.FC<Props> = ({
  commitmessage,
  committer,
  committime,
  avatar,
  commitsha,
}) => {

  return (
    <Container>
      <Content>
        <div>
          <p>
            <b>{commitmessage}</b>
          </p>
          <div className="commitData">
            <Avatar src={avatar} alt={"avatar"} />
            <b>{committer}</b>
          <span> {committime} </span>
          </div>
        </div>
        <div>
          <CommitId>
            <div>{commitsha}</div>
          </CommitId>
        </div>
      </Content>
    </Container>
  );
};

export default CommitHistory;
