import React from 'react'
import styled from '@emotion/styled'

interface SubtitleProps {
  text: string
}

const SubtitleStyle = styled.text`
  display: flex;
  white-space: nowrap;
  margin: calc(0.5vw+1rem) 0;
  color: ${({ theme }) => theme.colors.white.base};
  font-size: calc(0.25vw + 0.8rem);
`

export const Subtitle: React.FC<SubtitleProps> = ({ text }) => {
  return <SubtitleStyle>{text}</SubtitleStyle>
}
