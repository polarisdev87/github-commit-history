import styled from "styled-components";

export const Container = styled.li`
  padding: 8px 16px;
  border-top: grey solid 1px; 
`;

export const Content = styled.div`
  display: flex;
  justify-content: space-between;
  
  .commitData {
    font-size: 12px;
    display: flex;
    align-items: center;
    padding: 5px 0px;

    span {
      text-indent: 5px
    }
  }
`;

export const Avatar = styled.img`
  width: 20px;
  border-radius: 50%;
  margin-right: 5px;
`;

export const CommitId = styled.a`
  div {
    border: grey 1px solid;
    border-radius: 5px;
    padding: 5px;
    margin: 5px;
    color: #1b6ca8;
    min-width: 80px;
    text-align: center;
  }
`;