import React, { useState } from "react";
import styled, { css } from "styled-components";
import Customheaderfont from "./fonts/AGoblinAppears-o2aV.ttf";
import Custombodyfont from "./fonts/Kreasi-YqEjO.otf";

const Section = styled.section`
  margin: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SectionHeading = styled.h2`
  @font-face {
    font-family: "CustomHeaderFont";
    src: url(${Customheaderfont}) format("woff2");
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }
  text-align: center;
  font-weight: bold;
  cursor: pointer;
  font-family: "CustomHeaderFont", cursive;
  font-size: 38px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;

const VideoContainer = styled.div`
  position: relative;
  height: ${({ isExpanded }) => (isExpanded ? "350px" : "0")};
  width: 100%;
  max-width: 800px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  overflow: hidden;
  transition: height 0.3s ease-in-out;

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

const VideoDescription = styled.p`
  @font-face {
    font-family: "CustomContentFont";
    src: url(${Custombodyfont}) format("woff2");
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }
  margin-top: 20px;
  font-size: 24px;
  line-height: 1.6;
  font-family: "Comic-Sans MS", cursive;
  text-align: center;
  max-width: 800px;
  height: ${({ isExpanded }) => (isExpanded ? "auto" : "0")};
  overflow: hidden;
  transition: height 0.3s ease-in-out;
`;

const SafetyVideoSection = ({ darkMode }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const embedCode = `<iframe width="560" height="315" src="https://www.youtube.com/embed/xVu_I6WCsto?si=ti2mKHH3Ga98payc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Section>
      <SectionHeading darkMode={darkMode} onClick={toggleExpand}>
        Tips to stay safe.
      </SectionHeading>
      <VideoContainer
        isExpanded={isExpanded}
        dangerouslySetInnerHTML={{ __html: embedCode }}
      ></VideoContainer>
      <VideoDescription darkMode={darkMode} isExpanded={isExpanded}>
        Watch this informative video to learn essential tips and guidelines for
        staying safe during a pandemic. Follow the recommended precautions and
        stay informed to protect yourself and your loved ones.
      </VideoDescription>
    </Section>
  );
};

export default SafetyVideoSection;
