import styled from 'styled-components';

const NewButton = styled.div`
  padding: 0 16px;
  border: 1px solid #ea9000;
  color: #ea9000;
  min-width: 150px;
  background: white;
  border-radius: 4px;
  display: flex;
  align-items: center;
  position: relative;
  top: -8px;
  cursor: pointer;
  min-height: 30px;
`;

const Label = styled.div`
  margin: 0;
  padding: 0 0 8px;
  line-height: 1.5715;
  white-space: initial;
  color: #8d9aad;
  text-align: left;
`;

export { NewButton, Label };
